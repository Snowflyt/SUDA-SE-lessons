import { mutationString } from 'graphql-intuitive-request';

import type { LoginOutput } from '@/users/dto/login.output';

import { LoginInput } from '@/users/dto/login.input';
import { UsersResolver } from '@/users/users.resolver';

export const LOGIN_USER_OPERATION_NAME = UsersResolver.prototype.login.name;

export const LOGIN_USER_MUTATION = mutationString(LOGIN_USER_OPERATION_NAME)
  .variables({ input: `${LoginInput.name}!` })
  .select<LoginOutput>((output) => [output.token])
  .build();

export const generateLoginVariables = (options: { username: string; password: string }) => {
  const { password, username } = options;

  return {
    input: {
      username,
      password,
    } satisfies LoginInput,
  };
};
