import { queryString } from 'graphql-intuitive-request';

import type { Role, User } from '@prisma/client';

export const GET_USERS_OPERATION_NAME = 'users';

export const GET_USERS_QUERY = queryString(GET_USERS_OPERATION_NAME)
  .select<User & { roles: Role[] }>((user) => [
    user.id,
    user.username,
    user.roles((role) => [role.name]),
  ])
  .build();
