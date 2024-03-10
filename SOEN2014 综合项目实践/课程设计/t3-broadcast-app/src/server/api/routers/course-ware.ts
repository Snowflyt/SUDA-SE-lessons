import { type } from 'arktype';

import {
  authedProcedure,
  createTRPCRouter,
  teacherProcedure,
} from '@/server/api/trpc';

export const courseWareRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      type({
        courseId: 'string',
        name: 'string',
        classification: 'string',
        fileId: 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      const courseWare = await ctx.prisma.courseWare.create({
        data: {
          ...input,
          uploaderId: ctx.session.user.id,
        },
      });
      return courseWare;
    }),

  getAll: authedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.courseWare.findMany();
  }),

  deleteByClassificationAndCourseId: teacherProcedure
    .input(
      type({
        classification: 'string',
        courseId: 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      const courseWares = await ctx.prisma.courseWare.findMany({
        where: {
          classification: input.classification,
          courseId: input.courseId,
        },
      });
      await ctx.prisma.courseWare.deleteMany({
        where: {
          classification: input.classification,
          courseId: input.courseId,
        },
      });
      await ctx.prisma.file.deleteMany({
        where: {
          id: {
            in: courseWares.map((courseWare) => courseWare.fileId),
          },
        },
      });
    }),

  deleteById: teacherProcedure
    .input(type('string').assert)
    .mutation(async ({ ctx, input }) => {
      const courseWare = await ctx.prisma.courseWare.findUnique({
        where: {
          id: input,
        },
      });
      if (!courseWare) throw new Error('CourseWare not found');
      await ctx.prisma.courseWare.delete({
        where: {
          id: input,
        },
      });
      await ctx.prisma.file.delete({
        where: {
          id: courseWare.fileId,
        },
      });
    }),
});
