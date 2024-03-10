import { type } from 'arktype';

import { Roles } from '@/constants/auth';
import {
  authedProcedure,
  createTRPCRouter,
  publicProcedure,
} from '@/server/api/trpc';
import { hash } from '@/utils/crypto';
import { enumValuesType } from '@/utils/type';

const onlineUserIds = new Set<string>();

export const userRouter = createTRPCRouter({
  setCurrentOnline: authedProcedure.mutation(async ({ ctx }) => {
    onlineUserIds.add(ctx.session.user.id);
  }),

  setCurrentOffline: authedProcedure.mutation(async ({ ctx }) => {
    onlineUserIds.delete(ctx.session.user.id);
  }),

  isOnline: publicProcedure.input(type('string').assert).query(({ input }) => {
    return onlineUserIds.has(input);
  }),

  create: publicProcedure
    .input(
      type({
        username: 'string',
        password: 'string',
        role: enumValuesType(Roles),
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      if (input.role === Roles.ADMIN) {
        throw new Error('Admins cannot be created');
      }

      await ctx.prisma.user.create({
        data: {
          username: input.username,
          password: hash(input.password),
          role: input.role,
        },
      });
    }),

  getCurrent: authedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        username: ctx.session.user.name!,
      },
    });
  }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),

  getCourses: authedProcedure.query(async ({ ctx }) => {
    const userRole = ctx.session.user.role;
    if (userRole === Roles.TEACHER)
      return await ctx.prisma.course.findMany({
        where: {
          teacherId: ctx.session.user.id,
        },
      });
    if (userRole === Roles.STUDENT)
      return await ctx.prisma.course.findMany({
        where: {
          students: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    return [];
  }),

  update: authedProcedure
    .input(
      type({
        'username?': 'string',
        'name?': 'string',
        'studentNumber?': 'string',
        'password?': 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.user.update({
        where: {
          username: ctx.session.user.name!,
        },
        data: {
          ...input,
          ...(input.studentNumber
            ? { studentNumber: input.studentNumber }
            : {}),
          ...(input.password ? { password: hash(input.password) } : {}),
        },
      });
    }),
});
