import { queryString } from 'graphql-intuitive-request';

import type { Role, User } from '@prisma/client';

export const GET_USER_OPERATION_NAME = 'user';

export const GET_USER_QUERY = queryString(GET_USER_OPERATION_NAME)
  .variables({ id: 'Int!' })
  .select<User & { roles: Role[] }>((user) => [
    user.id,
    user.username,
    user.roles((role) => [role.name]),
  ])
  .build();

export const generateGetUserVariable = (options: { id: number }) => {
  const { id } = options;

  return {
    id,
  };
};
