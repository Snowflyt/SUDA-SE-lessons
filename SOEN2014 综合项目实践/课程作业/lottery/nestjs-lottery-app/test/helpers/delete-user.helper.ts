import { mutationString } from 'graphql-intuitive-request';

import type { User } from '@prisma/client';

import { UsersResolver } from '@/users/users.resolver';

export const DELETE_USER_OPERATION_NAME = UsersResolver.prototype.removeUser.name;

export const DELETE_USER_MUTATION = mutationString(DELETE_USER_OPERATION_NAME)
  .variables({ id: 'Int!' })
  .select<User>((user) => [user.id])
  .build();

export const generateRemoveUserVariable = (options: { id: number }) => {
  const { id } = options;

  return {
    id,
  };
};
