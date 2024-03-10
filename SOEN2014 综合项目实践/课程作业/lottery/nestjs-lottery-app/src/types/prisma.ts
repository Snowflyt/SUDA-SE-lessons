import type { ToList, UnsafeGet, UnsafeReturnType } from './tools';
import type { Prisma, PrismaClient } from '@prisma/client';

export type Model = Awaited<
  ReturnType<PrismaClient[Uncapitalize<Prisma.ModelName>]['findFirstOrThrow']>
>;

export type ModelOf<T extends Prisma.ModelName | Delegate> = T extends Prisma.ModelName
  ? Awaited<ReturnType<UnsafeGet<UnsafeGet<PrismaClient, Uncapitalize<T>>, 'findFirstOrThrow'>>>
  : Awaited<UnsafeReturnType<UnsafeGet<T, 'findFirstOrThrow'>>>;

export type Delegate = PrismaClient[Uncapitalize<Prisma.ModelName>];

export type DelegateOf<T extends Prisma.ModelName | Model> = T extends Prisma.ModelName
  ? UnsafeGet<PrismaClient, Uncapitalize<T>>
  : DelegateOfHelper<T>;
type DelegateOfHelper<T, TDelegates extends Delegate[] = ToList<Delegate>> = TDelegates extends [
  infer TDelegate extends Delegate,
  ...infer TRest extends Delegate[],
]
  ? ModelOf<TDelegate> extends T
    ? TDelegate
    : DelegateOfHelper<T, TRest>
  : never;
