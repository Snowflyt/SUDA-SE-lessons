import { type } from 'arktype';

import {
  createTRPCRouter,
  publicProcedure,
  authedProcedure,
} from '@/server/api/trpc';

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(type({ text: 'string' }).assert)
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: authedProcedure.query(() => {
    return 'you can now see this secret message!';
  }),
});
