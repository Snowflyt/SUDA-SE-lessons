import { BadRequestException, Inject, Injectable, forwardRef } from '@nestjs/common';

import type { CreateUserInput } from './dto/create-user.input';
import type { LoginInput } from './dto/login.input';
import type { UpdateUserInput } from './dto/update-user.input';
import type { Permission, Role, User } from '@prisma/client';

import { AuthService } from '@/common/auth/services/auth.service';
import { PrismaService } from '@/common/prisma/services/prisma.service';
import { Validator } from '@/common/validator/services/validator.service';
import { EntityNotFoundException } from '@/exceptions/entity';
import { encryptPassword } from '@/utils/auth';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly validator: Validator,
  ) {}

  async login(loginUserInput: LoginInput): Promise<{
    token: string;
    user: Omit<User & { roles: Array<Role & { permissions: Permission[] }> }, 'password'>;
  }> {
    const user = await this.authService.validateUser(
      loginUserInput.username,
      loginUserInput.password ?? '',
    );

    if (!user) throw new BadRequestException(`Username or password is invalid`);

    return {
      token: await this.authService.generateUserCredentials(user),
      user,
    };
  }

  async create(
    input: CreateUserInput,
  ): Promise<User & { roles: Array<Role & { permissions: Permission[] }> }> {
    await this.validator.validate('User').checkConflict('username', input.username);

    return await this.prisma.user.create({
      data: {
        username: input.username,
        password: input.password === '' ? '' : await encryptPassword(input.password),
        roles: {
          connect: await this.findRolesByNames(input.roleNames),
        },
      },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async findAll(): Promise<Array<User & { roles: Array<Role & { permissions: Permission[] }> }>> {
    return await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async findOne(
    id: number,
  ): Promise<User & { roles: Array<Role & { permissions: Permission[] }> }> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
    if (user === null) {
      throw new EntityNotFoundException('User', 'id', id);
    }

    return user;
  }

  async findOneByUsername(
    username: string,
  ): Promise<(User & { roles: Array<Role & { permissions: Permission[] }> }) | null> {
    return await this.prisma.user.findUnique({
      where: { username },
      include: {
        roles: {
          include: {
            permissions: true,
          },
        },
      },
    });
  }

  async update(
    id: number,
    input: UpdateUserInput,
  ): Promise<User & { roles: Array<Role & { permissions: Permission[] }> }> {
    if (input.username !== undefined)
      await this.validator.validate('User').checkConflict('username', input.username);

    if (input.username !== undefined || input.password !== undefined) {
      try {
        await this.prisma.user.update({
          where: { id },
          data: {
            username: input.username,
            password: input.password ? await encryptPassword(input.password) : undefined,
          },
        });
      } catch {
        throw new EntityNotFoundException('User', 'id', id);
      }
    }

    // Handle roles
    if (input.roleNames !== undefined) {
      // Remove unused roles
      const oldRoles = await this.prisma.user.findUnique({ where: { id } }).roles();
      await this.prisma.user.update({
        where: { id },
        data: {
          roles: {
            disconnect: oldRoles.filter((role) => !input.roleNames.includes(role.name)),
          },
        },
      });

      // Add new roles
      const newRoles = await this.findRolesByNames(
        input.roleNames.filter((roleName) => !oldRoles.map((role) => role.name).includes(roleName)),
      );
      await this.prisma.user.update({
        where: { id },
        data: {
          roles: {
            connect: newRoles,
          },
        },
      });
    }

    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  private async findRolesByNames(roleNames: string[]): Promise<Role[]> {
    return await this.prisma.role.findMany({
      where: { name: { in: roleNames } },
    });
  }
}
