import { type } from 'arktype';

import {
  authedProcedure,
  createTRPCRouter,
  studentProcedure,
  teacherProcedure,
} from '@/server/api/trpc';
import { hash, verify } from '@/utils/crypto';

export const courseRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      type({
        name: 'string',
        'description?': 'string',
        startDate: 'Date',
        endDate: 'Date',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      const invitationCode =
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);

      await ctx.prisma.course.create({
        data: {
          ...input,
          teacherId: ctx.session.user.id,
          invitationCode: hash(invitationCode),
        },
      });

      return invitationCode;
    }),

  update: teacherProcedure
    .input(
      type({
        id: 'string',
        'name?': 'string',
        'description?': 'string',
        'startDate?': 'Date',
        'endDate?': 'Date',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.course.update({
        where: {
          id: input.id,
        },
        data: input,
      });
    }),

  delete: teacherProcedure
    .input(type('string').assert)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.course.delete({
        where: {
          id: input,
        },
      });
    }),

  join: studentProcedure
    .input(type('string').assert)
    .mutation(async ({ ctx, input }) => {
      const courses = await ctx.prisma.course.findMany();
      for (const course of courses) {
        if (verify(input).withHash(course.invitationCode)) {
          await ctx.prisma.course.update({
            where: {
              id: course.id,
            },
            data: {
              students: {
                connect: {
                  id: ctx.session.user.id,
                },
              },
            },
          });
          return course;
        }
      }

      return null;
    }),

  quit: studentProcedure
    .input(type('string').assert)
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.course.update({
        where: {
          id: input,
        },
        data: {
          students: {
            disconnect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),

  removeStudent: teacherProcedure
    .input(
      type({
        courseId: 'string',
        studentId: 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.course.update({
        where: {
          id: input.courseId,
        },
        data: {
          students: {
            disconnect: {
              id: input.studentId,
            },
          },
        },
      });
    }),

  getAll: authedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.course.findMany();
  }),

  getById: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.course.findUnique({
        where: {
          id: input,
        },
      });
    }),

  getCurrentLesson: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      const lessons = await ctx.prisma.lesson.findMany({
        where: {
          courseId: input,
        },
      });
      return lessons.find((lesson) => lesson.roomId !== null) ?? null;
    }),

  getStudents: authedProcedure
    .input(type('string | undefined').assert)
    .query(async ({ ctx, input }) => {
      if (input === undefined) return [];
      return await ctx.prisma.user.findMany({
        where: {
          studentCourses: {
            some: {
              id: input,
            },
          },
        },
      });
    }),

  getTeacher: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      const course = await ctx.prisma.course.findUnique({
        where: {
          id: input,
        },
      });
      return await ctx.prisma.user.findUnique({
        where: {
          id: course?.teacherId,
        },
      });
    }),

  getCourseWares: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.courseWare.findMany({
        where: {
          courseId: input,
        },
      });
    }),

  getQuizzes: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.quiz.findMany({
        where: {
          courseId: input,
        },
        include: {
          choices: true,
        },
      });
    }),
});
