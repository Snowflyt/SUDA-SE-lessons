import { arrayOf, type } from 'arktype';
import { union } from 'arktype';

import { createTRPCRouter, teacherProcedure } from '@/server/api/trpc';

export const quizRouter = createTRPCRouter({
  create: teacherProcedure
    .input(
      type({
        courseId: 'string',
        name: 'string',
        classification: 'string',
        description: 'string',
        choices: arrayOf({
          description: 'string',
          isAnswer: 'boolean',
        }),
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.quiz.create({
        data: {
          name: input.name,
          classification: input.classification,
          description: input.description,
          courseId: input.courseId,
          choices: {
            create: input.choices,
          },
        },
      });
    }),

  update: teacherProcedure
    .input(
      type({
        id: 'string',
        'courseId?': 'string',
        'name?': 'string',
        'classification?': 'string',
        'description?': 'string',
        'choices?': arrayOf({
          description: 'string',
          isAnswer: 'boolean',
        }),
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      if (input.choices)
        await ctx.prisma.choice.deleteMany({
          where: {
            quizId: input.id,
          },
        });
      return await ctx.prisma.quiz.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          classification: input.classification,
          description: input.description,
          courseId: input.courseId,
          ...(input.choices && {
            choices: {
              create: input.choices,
            },
          }),
        },
      });
    }),

  delete: teacherProcedure
    .input(
      union({ id: 'string ' }, { courseId: 'string', classification: 'string' })
        .assert,
    )
    .mutation(async ({ ctx, input }) => {
      if ('id' in input) {
        await ctx.prisma.quiz.delete({
          where: {
            id: input.id,
          },
        });
        return;
      }

      await ctx.prisma.quiz.deleteMany({
        where: {
          courseId: input.courseId,
          classification: input.classification,
        },
      });
    }),
});
