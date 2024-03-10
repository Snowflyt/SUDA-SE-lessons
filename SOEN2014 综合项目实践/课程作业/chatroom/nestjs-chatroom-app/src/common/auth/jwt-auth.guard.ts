import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import * as R from 'ramda';

import type { ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    // Fix BUG caused by NestJS’s way of handling headers when enabling GraphQL Subscriptions
    // that is, `headers` is not in the `req` object. To fix this, we can assign `req.headers`
    // by using `connectionParams.headers` from the context object.
    const { connectionParams, req } = ctx.getContext();
    return req.headers
      ? req
      : {
          ...req,
          headers: R.fromPairs(
            Object.entries(connectionParams.headers).map(([key, value]) => [
              key.toLowerCase(),
              value,
            ]),
          ),
        };
  }

  override canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // Skip authentication for resolvers with the @SkipAuth() decorator
    const isPublic = this.reflector.get<boolean>('skipAuth', context.getHandler());
    if (isPublic) return true;

    return super.canActivate(context);
  }
}
