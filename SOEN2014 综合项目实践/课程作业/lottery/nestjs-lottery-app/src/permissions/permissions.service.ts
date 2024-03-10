import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';

import type { CreatePermissionInput } from './dto/create-permission.input';
import type { UpdatePermissionInput } from './dto/update-permission.input';
import type { Permission } from '@prisma/client';

import { PrismaService } from '@/common/prisma/services/prisma.service';
import { Validator } from '@/common/validator/services/validator.service';
import { EntityNotFoundException } from '@/exceptions/entity';

@Injectable()
export class PermissionsService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    private readonly validator: Validator,
  ) {}

  async create(input: CreatePermissionInput): Promise<Permission> {
    await this.validator.validate('Permission').checkConflict('name', input.name);

    return await this.prisma.permission.create({ data: input });
  }

  async findAll(): Promise<Permission[]> {
    return await this.prisma.permission.findMany();
  }

  async findOne(id: number): Promise<Permission> {
    const permission = await this.prisma.permission.findUnique({
      where: { id },
    });
    if (permission === null) {
      throw new EntityNotFoundException('Permission', 'id', id);
    }

    return permission;
  }

  async update(id: number, input: UpdatePermissionInput): Promise<Permission> {
    if (input.name !== undefined)
      await this.validator.validate('Permission').checkConflict('name', input.name);

    const oldPermission = await this.findOne(id);
    await this.prisma.permission.update({
      where: { id },
      data: input,
    });

    // Update role-to-permission mapping in cache
    if (input.name !== undefined)
      (await this.cacheManager.store.keys())
        .filter((key) => key.startsWith(`role:`) && key.endsWith(`:permissions`))

        .forEach(async (key) => {
          const rolePermissions = await this.cacheManager.get<string[]>(key);
          if (rolePermissions.includes(oldPermission.name)) {
            await this.cacheManager.set(
              key,
              rolePermissions.map((rolePermission) =>
                rolePermission === oldPermission.name ? input.name : rolePermission,
              ),
            );
          }
        });

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.permission.delete({ where: { id } });
  }
}
