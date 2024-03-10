import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

import type { Permission, Role, User } from '@prisma/client';

import { RoleDto } from '@/roles/dto/role.dto';

@ObjectType()
export class UserDto {
  @Field(() => Int)
  id: number;

  @Field()
  username: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [RoleDto])
  roles: RoleDto[];

  static from = (
    user: Omit<User & { roles: Array<Role & { permissions: Permission[] }> }, 'password'>,
  ): UserDto => {
    const { createdAt, id, roles, updatedAt, username } = user;

    const userDto = new UserDto();
    userDto.id = id;
    userDto.username = username;
    userDto.createdAt = createdAt;
    userDto.updatedAt = updatedAt;
    userDto.roles = roles.map(RoleDto.from);

    return userDto;
  };
}
