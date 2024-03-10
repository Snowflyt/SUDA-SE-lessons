import * as Chance from 'chance';
import { mutationString } from 'graphql-intuitive-request';

import type { Role, User } from '@prisma/client';

import { CreateUserInput } from '@/users/dto/create-user.input';
import { UsersResolver } from '@/users/users.resolver';

const chance = new Chance();

const primaryRole = 'admin';

export const CREATE_USER_OPERATION_NAME = UsersResolver.prototype.createUser.name;

export const CREATE_USER_MUTATION = mutationString(CREATE_USER_OPERATION_NAME)
  .variables({ input: `${CreateUserInput.name}!` })
  .select<User & { roles: Role[] }>((user) => [
    user.id,
    user.username,
    user.roles((role) => [role.name]),
  ])
  .build();

export const generateCreateUserVariables = (
  options: {
    roleNames?: string[];
  } = {},
) => {
  const { roleNames = [primaryRole] } = options;

  return {
    input: {
      username: chance.name(),
      password: chance.string({ length: 15 }),
      roleNames,
    } satisfies CreateUserInput,
  };
};
