import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreatePermissionInput } from './dto/create-permission.input';
import { PermissionDto } from './dto/permission.dto';
import { UpdatePermissionInput } from './dto/update-permission.input';
import { PermissionsService } from './permissions.service';

import { Roles } from '@/common/auth/constants/role';
import { RequiresRole } from '@/common/auth/decorators/requires-role';

@Resolver(() => PermissionDto)
export class PermissionsResolver {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Mutation(() => PermissionDto)
  @RequiresRole(Roles.ADMIN)
  async createPermission(@Args('input') input: CreatePermissionInput): Promise<PermissionDto> {
    const permission = await this.permissionsService.create(input);
    return PermissionDto.from(permission);
  }

  @Query(() => [PermissionDto], { name: 'permissions' })
  async findAll(): Promise<PermissionDto[]> {
    const permissions = await this.permissionsService.findAll();
    return permissions.map(PermissionDto.from);
  }

  @Query(() => PermissionDto, { name: 'permission' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<PermissionDto> {
    const permission = await this.permissionsService.findOne(id);
    return PermissionDto.from(permission);
  }

  @Mutation(() => PermissionDto)
  @RequiresRole(Roles.ADMIN)
  async updatePermission(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdatePermissionInput,
  ): Promise<PermissionDto> {
    const permission = await this.permissionsService.update(id, input);
    return PermissionDto.from(permission);
  }

  @Mutation(() => PermissionDto)
  @RequiresRole(Roles.ADMIN)
  async removePermission(@Args('id', { type: () => Int }) id: number): Promise<PermissionDto> {
    const permission = await this.permissionsService.findOne(id);
    await this.permissionsService.remove(id);
    return PermissionDto.from(permission);
  }
}
