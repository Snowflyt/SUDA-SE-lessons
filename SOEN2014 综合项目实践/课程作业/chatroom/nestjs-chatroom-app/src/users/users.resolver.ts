import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CreateUserInput } from './dto/create-user.input';
import { LoginInput } from './dto/login.input';
import { LoginOutput } from './dto/login.output';
import { UpdateUserInput } from './dto/update-user.input';
import { UserDto } from './dto/user.dto';
import { UsersService } from './users.service';

import type { RequiresPredicate } from '@/common/auth/decorators/requires';

import { chatrooms } from '@/chatrooms/chatrooms.resolver';
import { Roles } from '@/common/auth/constants/role';
import { CurrentUser } from '@/common/auth/decorators/current-user';
import { JwtUserPayload } from '@/common/auth/decorators/requires';
import { RequiresRole } from '@/common/auth/decorators/requires-role';
import { SkipAuth } from '@/common/auth/decorators/skip-auth';
import { EntityNotFoundException } from '@/exceptions/entity';

const SameUserById: RequiresPredicate<
  | { id: number }
  | {
      [key: string]: {
        id: number;
      };
    }
> = ({ userId }, operationArguments) =>
  operationArguments.id !== undefined
    ? userId === operationArguments.id
    : userId === Object.values(operationArguments)[0].id;

const OperatingAnotherAdmin: RequiresPredicate<
  | { id: number }
  | {
      [key: string]: {
        id: number;
      };
    }
> = async ({ userId }, operationArguments, prisma) => {
  const userToOperateId: number = operationArguments.id ?? Object.values(operationArguments)[0].id;

  const userToOperate = await prisma.user.findUnique({
    where: { id: userToOperateId },
    include: { roles: true },
  });
  if (userToOperate === null) {
    throw new EntityNotFoundException('User', 'id', userToOperateId);
  }

  return (
    userToOperate.id !== userId &&
    userToOperate.roles.map((role) => role.name).includes(Roles.ADMIN)
  );
};

@Resolver(() => UserDto)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => LoginOutput)
  @SkipAuth()
  async login(@Args('input') input: LoginInput): Promise<LoginOutput> {
    const { token, user } = await this.usersService.login(input);
    // Add user to public chatroom on login
    chatrooms.find((chatroom) => chatroom.name === 'c/public')?.users.push(user);
    return { token, user: UserDto.from(user) };
  }

  @Query(() => UserDto)
  async me(@CurrentUser() user: JwtUserPayload): Promise<UserDto> {
    return await this.usersService.findOne(user.userId);
  }

  @Mutation(() => UserDto)
  @RequiresRole(Roles.ADMIN)
  async createUser(@Args('input') input: CreateUserInput): Promise<UserDto> {
    const user = await this.usersService.create(input);
    return UserDto.from(user);
  }

  @Query(() => [UserDto], { name: 'users' })
  @RequiresRole(Roles.ADMIN)
  async findAll(): Promise<UserDto[]> {
    const users = await this.usersService.findAll();
    return users.map(UserDto.from);
  }

  @Query(() => UserDto, { name: 'user' })
  @RequiresRole(Roles.ADMIN).Or(SameUserById)
  async findOne(@Args('id', { type: () => Int }) id: number): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    return UserDto.from(user);
  }

  @Mutation(() => UserDto)
  @RequiresRole(Roles.ADMIN).Or(SameUserById).AndNot(OperatingAnotherAdmin)
  async updateUser(
    @Args('id', { type: () => Int }) id: number,
    @Args('input') input: UpdateUserInput,
  ): Promise<UserDto> {
    const user = await this.usersService.update(id, input);
    return UserDto.from(user);
  }

  @Mutation(() => UserDto)
  @RequiresRole(Roles.ADMIN).Or(SameUserById).AndNot(OperatingAnotherAdmin)
  async removeUser(@Args('id', { type: () => Int }) id: number): Promise<UserDto> {
    const user = await this.usersService.findOne(id);
    await this.usersService.remove(id);
    return UserDto.from(user);
  }
}
