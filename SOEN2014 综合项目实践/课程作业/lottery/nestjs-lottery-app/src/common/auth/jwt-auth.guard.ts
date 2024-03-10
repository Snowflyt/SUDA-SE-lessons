import { Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

import type { ExecutionContext } from '@nestjs/common';
import type { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  getRequest(context: ExecutionContext): any {
    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
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
