import { createParamDecorator } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

import type { JwtUserPayload } from '@/common/auth/decorators/requires';
import type { ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const ctx = GqlExecutionContext.create(context);
  const { req } = ctx.getContext();

  const userInfo: JwtUserPayload = {
    userId: req.user.userId as number,
    username: req.user.payload.username as string,
    roleNames: req.user.payload.roleNames as string[],
  };

  return userInfo;
});
