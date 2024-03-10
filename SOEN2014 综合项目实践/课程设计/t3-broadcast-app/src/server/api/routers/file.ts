import { type } from 'arktype';

import { createTRPCRouter, authedProcedure } from '@/server/api/trpc';

export const fileRouter = createTRPCRouter({
  upload: authedProcedure
    .input(
      type({
        filename: 'string',
        dataURL: 'string',
      }).assert,
    )
    .mutation(async ({ ctx, input }) => {
      const file = await ctx.prisma.file.create({
        data: {
          filename: input.filename,
          dataURL: input.dataURL,
          uploaderId: ctx.session.user.id,
        },
      });
      return file;
    }),

  getFileById: authedProcedure
    .input(type('string').assert)
    .query(async ({ ctx, input }) => {
      const fileModel = await ctx.prisma.file.findUnique({
        where: {
          id: input,
        },
      });
      if (!fileModel) {
        throw new Error('File not found');
      }
      return fileModel;
    }),
});
