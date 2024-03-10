import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

import type { Permission, Role } from '@prisma/client';

import { PermissionDto } from '@/permissions/dto/permission.dto';

@ObjectType()
export class RoleDto {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => GraphQLISODateTime)
  createdAt: Date;

  @Field(() => GraphQLISODateTime)
  updatedAt: Date;

  @Field(() => [PermissionDto])
  permissions: PermissionDto[];

  static from = (role: Role & { permissions: Permission[] }): RoleDto => {
    const { createdAt, description, id, name, permissions, updatedAt } = role;

    const roleDto = new RoleDto();
    roleDto.id = id;
    roleDto.name = name;
    roleDto.description = description;
    roleDto.createdAt = createdAt;
    roleDto.updatedAt = updatedAt;
    roleDto.permissions = permissions.map(PermissionDto.from);

    return roleDto;
  };
}
