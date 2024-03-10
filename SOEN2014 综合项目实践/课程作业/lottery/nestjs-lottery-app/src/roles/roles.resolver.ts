import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateRoleInput } from './dto/create-role.input';
import { RoleDto } from './dto/role.dto';
import { UpdateRoleInput } from './dto/update-role.input';
import { RolesService } from './roles.service';

import { Roles } from '@/common/auth/constants/role';
import { RequiresRole } from '@/common/auth/decorators/requires-role';

@Resolver(() => RoleDto)
export class RolesResolver {
  constructor(private readonly rolesService: RolesService) {}

  @Mutation(() => RoleDto)
  @RequiresRole(Roles.ADMIN)
  async createRole(@Args('input') input: CreateRoleInput): Promise<RoleDto> {
    const role = await this.rolesService.create(input);
    return RoleDto.from(role);
  }

  @Query(() => [RoleDto], { name: 'roles' })
  async findAll(): Promise<RoleDto[]> {
    const roles = await this.rolesService.findAll();
    return roles.map(RoleDto.from);
  }

  @Query(() => RoleDto, { name: 'role' })
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<RoleDto> {
    const role = await this.rolesService.findOne(id);
    return RoleDto.from(role);
  }

  @Mutation(() => RoleDto)
  @RequiresRole(Roles.ADMIN)
  async updateRole(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateRoleInput,
  ): Promise<RoleDto> {
    const role = await this.rolesService.update(id, input);
    return RoleDto.from(role);
  }

  @Mutation(() => RoleDto)
  @RequiresRole(Roles.ADMIN)
  async removeRole(@Args('id', { type: () => Int }) id: number): Promise<RoleDto> {
    const role = await this.rolesService.findOne(id);
    await this.rolesService.remove(id);
    return RoleDto.from(role);
  }
}
