import { type } from 'arktype';

import {
  authedProcedure,
  createTRPCRouter,
  teacherProcedure,
} from '@/server/api/trpc';

export const lessonRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      type({
        courseId: 'string',
        name: 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      const roomId = Math.random().toString(36).substring(2, 15);
      return await ctx.prisma.lesson.create({
        data: {
          teacherId: ctx.session.user.id,
          roomId: roomId,
          courseId: input.courseId,
          name: input.name,
          startDateTime: new Date(),
        },
      });
    }),

  endLesson: teacherProcedure
    .input(type('string').assert)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.lesson.update({
        where: {
          id: input,
        },
        data: {
          endDateTime: new Date(),
          roomId: null,
        },
      });
    }),

  getAll: authedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.lesson.findMany();
  }),

  getById: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.lesson.findUnique({
        where: {
          id: input,
        },
      });
    }),
});
