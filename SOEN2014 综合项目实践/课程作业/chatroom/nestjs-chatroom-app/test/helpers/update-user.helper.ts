import { mutationString } from 'graphql-intuitive-request';

import type { User } from '@prisma/client';

import { UpdateUserInput } from '@/users/dto/update-user.input';
import { UsersResolver } from '@/users/users.resolver';

export const UPDATE_USER_OPERATION_NAME = UsersResolver.prototype.updateUser.name;

export const UPDATE_USER_MUTATION = mutationString(UPDATE_USER_OPERATION_NAME)
  .variables({ id: 'Int!', input: `${UpdateUserInput.name}!` })
  .select<User>((user) => [user.id, user.username])
  .build();

export const generateUpdateUserVariables = (options: { id: number; username: string }) => {
  const { id, username } = options;

  return {
    id,
    input: {
      username,
    } satisfies UpdateUserInput,
  };
};
