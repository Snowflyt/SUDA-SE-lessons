import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import type { Permission, Role, User } from '@prisma/client';

import { Roles } from '@/common/auth/constants/role';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService,
    private jwtTokenService: JwtService,
  ) {}

  async validateUser(
    username: string,
    password: string,
  ): Promise<Omit<
    User & { roles: Array<Role & { permissions: Permission[] }> },
    'password'
  > | null> {
    let user = await this.usersService.findOneByUsername(username);

    // If user doesn't exist and password is empty, create a new user
    if (!user && password === '')
      user = await this.usersService.create({
        username,
        password,
        roleNames: [Roles.USER],
      });

    if (
      user &&
      // If password is empty, meaning that the user doesn't have one,
      // simply return the user
      ((password === '' && user.password === '') || (await bcrypt.compare(password, user.password)))
    ) {
      delete user.password;
      return user;
    }

    return null;
  }

  async generateUserCredentials(user: Omit<User & { roles: Role[] }, 'password'>): Promise<string> {
    const payload = {
      username: user.username,
      roleNames: user.roles.map((role) => role.name),
      sub: user.id,
    };

    return this.jwtTokenService.sign(payload);
  }
}
