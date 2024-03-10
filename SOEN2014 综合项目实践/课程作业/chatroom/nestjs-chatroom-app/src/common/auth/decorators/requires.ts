import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Inject, Injectable, UnauthorizedException, UseInterceptors } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Cache } from 'cache-manager';

import type { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import type { PrismaClient } from '@prisma/client';
import type { Observable } from 'rxjs';

import { PrismaService } from '@/common/prisma/services/prisma.service';

export interface JwtUserPayload {
  userId: number;
  username: string;
  roleNames: string[];
}

export type RequiresPredicate<T> = (
  userInfo: JwtUserPayload,
  operationArguments: T,
  prisma: PrismaClient,
  cacheManager: Cache,
) => boolean | Promise<boolean>;

export interface RequiresDecorator<T = unknown> extends MethodDecorator, ClassDecorator {
  And: <F extends T>(predicate: RequiresPredicate<F>) => RequiresDecorator<F>;
  Or: <F extends T>(predicate: RequiresPredicate<F>) => RequiresDecorator<F>;
  AndNot: <F extends T>(predicate: RequiresPredicate<F>) => RequiresDecorator<F>;
  OrNot: <F extends T>(predicate: RequiresPredicate<F>) => RequiresDecorator<F>;
}

export const Requires = <T = unknown>(predicate: RequiresPredicate<T>): RequiresDecorator<T> => {
  const thisPredicate = predicate;

  @Injectable()
  class RequiresInterceptor implements NestInterceptor {
    constructor(
      private readonly prisma: PrismaService,
      @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    ) {}

    async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
      const ctx = GqlExecutionContext.create(context);
      const { req } = ctx.getContext();

      const userInfo: JwtUserPayload = {
        userId: req.user.userId as number,
        username: req.user.payload.username as string,
        roleNames: req.user.payload.roleNames as string[],
      };

      const operationArguments: T = context.getArgByIndex(1);

      if (!(await predicate(userInfo, operationArguments, this.prisma, this.cacheManager))) {
        throw new UnauthorizedException();
      }

      return next.handle();
    }
  }

  const result = UseInterceptors(RequiresInterceptor) as RequiresDecorator<T>;

  result.And = <F extends T>(predicate: RequiresPredicate<F>): RequiresDecorator<F> =>
    Requires(
      async (userInfo, operationArguments, dataSource, cacheManager) =>
        (await thisPredicate(userInfo, operationArguments, dataSource, cacheManager)) &&
        (await predicate(userInfo, operationArguments, dataSource, cacheManager)),
    );

  result.Or = <F extends T>(predicate: RequiresPredicate<F>): RequiresDecorator<F> =>
    Requires(
      async (userInfo, operationArguments, dataSource, cacheManager) =>
        (await thisPredicate(userInfo, operationArguments, dataSource, cacheManager)) ||
        (await predicate(userInfo, operationArguments, dataSource, cacheManager)),
    );

  result.AndNot = <F extends T>(predicate: RequiresPredicate<F>): RequiresDecorator<F> =>
    Requires(
      async (userInfo, operationArguments, dataSource, cacheManager) =>
        (await thisPredicate(userInfo, operationArguments, dataSource, cacheManager)) &&
        !(await predicate(userInfo, operationArguments, dataSource, cacheManager)),
    );

  result.OrNot = <F extends T>(predicate: RequiresPredicate<F>): RequiresDecorator<F> =>
    Requires(
      async (userInfo, operationArguments, dataSource, cacheManager) =>
        (await thisPredicate(userInfo, operationArguments, dataSource, cacheManager)) ||
        !(await predicate(userInfo, operationArguments, dataSource, cacheManager)),
    );

  return result;
};
