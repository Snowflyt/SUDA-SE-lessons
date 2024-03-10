import { Field, GraphQLISODateTime, Int, ObjectType } from '@nestjs/graphql';

import type { Permission } from '@prisma/client';

@ObjectType()
export class PermissionDto {
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

  static from = (permission: Permission): PermissionDto => {
    const { createdAt, description, id, name, updatedAt } = permission;

    const permissionDto = new PermissionDto();
    permissionDto.id = id;
    permissionDto.name = name;
    permissionDto.description = description;
    permissionDto.createdAt = createdAt;
    permissionDto.updatedAt = updatedAt;

    return permissionDto;
  };
}
