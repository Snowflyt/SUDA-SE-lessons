import { observable } from '@trpc/server/observable';
import { type } from 'arktype';

import { ee } from '@/constants/trpc';
import {
  createTRPCRouter,
  authedProcedure,
  teacherProcedure,
  publicProcedure,
} from '@/server/api/trpc';

interface Message {
  datetime: string;
  username: string;
  text: string;
}
const chatrooms: Record<
  string,
  {
    enabled: boolean;
    messages: Message[];
  }
> = {};

export const chatroomRouter = createTRPCRouter({
  isEnabled: authedProcedure.input(type('string').assert).query(({ input }) => {
    return chatrooms[input]?.enabled ?? true;
  }),

  setEnabled: teacherProcedure
    .input(
      type({
        roomId: 'string',
        enabled: 'boolean',
      }).assert,
    )
    .mutation(({ input }) => {
      if (!chatrooms[input.roomId])
        chatrooms[input.roomId] = { enabled: true, messages: [] };
      const chatroom = chatrooms[input.roomId]!;
      chatroom.enabled = input.enabled;
    }),

  sendMessage: authedProcedure
    .input(type({ roomId: 'string', text: 'string' }).assert)
    .mutation(({ ctx, input }) => {
      if (!chatrooms[input.roomId])
        chatrooms[input.roomId] = { enabled: true, messages: [] };
      const chatroom = chatrooms[input.roomId]!;
      chatroom.messages.push({
        datetime: new Date().toLocaleTimeString(),
        username: ctx.session.user.name ?? 'Anonymous',
        text: input.text,
      });
      ee.emit(
        `add$${input.roomId}`,
        chatroom.messages[chatroom.messages.length - 1],
      );
    }),

  onMessageAdded: publicProcedure
    .input(type('string | undefined').assert)
    .subscription(({ input }) => {
      return observable<Message>((emit) => {
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        if (input === undefined) return () => {};

        const onAdd = (data: Message) => {
          // emit data to client
          emit.next(data);
        };
        // trigger `onAdd()` when `add` is triggered in our event emitter
        ee.on(`add$${input}`, onAdd);
        // unsubscribe function when client disconnects or stops subscribing
        return () => {
          ee.off(`add$${input}`, onAdd);
        };
      });
    }),

  getAllMessages: authedProcedure
    .input(type('string').assert)
    .query(({ input }) => {
      if (!chatrooms[input]) chatrooms[input] = { enabled: true, messages: [] };
      const chatroom = chatrooms[input]!;
      return chatroom.messages;
    }),
});
