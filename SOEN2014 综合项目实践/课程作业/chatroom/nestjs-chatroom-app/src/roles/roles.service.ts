import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import type { CreateRoleInput } from './dto/create-role.input';
import type { UpdateRoleInput } from './dto/update-role.input';
import type { Permission, Role } from '@prisma/client';

import { PrismaService } from '@/common/prisma/services/prisma.service';
import { Validator } from '@/common/validator/services/validator.service';
import { EntityNotFoundException } from '@/exceptions/entity';

@Injectable()
export class RolesService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly validator: Validator,
  ) {
    // Cache role-to-permission mapping
    void this.prisma.role
      .findMany({
        include: { permissions: true },
      })
      .then((roles) => {
        for (const role of roles)
          void this.cacheManager.set(
            `role:${role.name}:permissions`,
            role.permissions.map((permission) => permission.name),
          );
      });
  }

  async create(input: CreateRoleInput): Promise<Role & { permissions: Permission[] }> {
    await this.validator.validate('Role').checkConflict('name', input.name);

    const newRole = this.prisma.role.create({
      data: {
        name: input.name,
        description: input.description,
        permissions: {
          connect: input.permissionNames
            ? await this.findPermissionsByNames(input.permissionNames)
            : [],
        },
      },
      include: { permissions: true },
    });

    // Cache role-to-permission mapping
    await this.cacheManager.set(`role:${input.name}:permissions`, input.permissionNames);

    return newRole;
  }

  async findAll(): Promise<Array<Role & { permissions: Permission[] }>> {
    return await this.prisma.role.findMany({
      include: { permissions: true },
    });
  }

  async findOne(id: number): Promise<Role & { permissions: Permission[] }> {
    const role = await this.prisma.role.findUnique({
      where: { id },
      include: { permissions: true },
    });
    if (role === null) throw new EntityNotFoundException('Role', 'id', id);
    return role;
  }

  async update(id: number, input: UpdateRoleInput): Promise<Role & { permissions: Permission[] }> {
    if (input.name !== undefined)
      await this.validator.validate('Role').checkConflict('name', input.name);

    if (input.name !== undefined || input.description !== undefined) {
      try {
        await this.prisma.role.update({
          where: { id },
          data: {
            name: input.name,
            description: input.description,
          },
        });
      } catch {
        throw new EntityNotFoundException('Role', 'id', id);
      }
    }

    // Update role-to-permission mapping in cache when roleName is updated
    if (input.name !== undefined) {
      const oldRole = await this.prisma.role.findUnique({
        where: { id },
      });
      await this.cacheManager.set(
        `role:${input.name}:permissions`,
        (await this.cacheManager.get(`role:${oldRole.name}:permissions`)) ?? [],
      );
      await this.cacheManager.del(`role:${oldRole.name}:permissions`);
    }

    // Handle permissions
    if (input.permissionNames !== undefined) {
      // Remove unused permissions
      const oldPermissions = await this.prisma.role
        .findUnique({
          where: { id },
          include: { permissions: true },
        })
        .then((role) => role.permissions);
      await this.prisma.role.update({
        where: { id },
        data: {
          permissions: {
            disconnect: oldPermissions.filter(
              (permission) => !input.permissionNames.includes(permission.name),
            ),
          },
        },
      });
      // Add new permissions
      const newPermissions = await this.findPermissionsByNames(
        input.permissionNames.filter(
          (permissionName) =>
            !oldPermissions.map((permission) => permission.name).includes(permissionName),
        ),
      );
      await this.prisma.role.update({
        where: { id },
        data: {
          permissions: {
            connect: newPermissions,
          },
        },
      });

      // Update role-to-permission mapping in cache
      const oldRole = await this.prisma.role.findUnique({
        where: { id },
      });
      await this.cacheManager.set(`role:${oldRole.name}:permissions`, input.permissionNames);
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const role = await this.findOne(id);
    await this.prisma.role.delete({ where: { id } });

    // Remove role-to-permission mapping in cache
    await this.cacheManager.del(`role:${role.name}:permissions`);
  }

  private async findPermissionsByNames(permissionNames: string[]): Promise<Permission[]> {
    return await this.prisma.permission.findMany({
      where: { name: { in: permissionNames } },
    });
  }
}
