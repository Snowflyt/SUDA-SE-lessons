import { ClientError, createClient, infer, schema } from 'graphql-intuitive-request';

const $ = schema({
  Chatroom: {
    name: 'String!',
    messages: '[Message!]!',
    users: '[String!]!',
  },
  Message: {
    sender: 'String!',
    content: 'String!',
    mentionedUser: 'String',
    createdAt: 'DateTime!',
  },
  DateTime: 'String',

  CreateChatroomInput: {
    name: 'String!',
  },
  CreateMessageInput: {
    content: 'String!',
    mentionedUser: 'String',
  },

  Query: {
    chatroom: [{ name: 'String!' }, 'Chatroom'],
    chatrooms: [{}, '[Chatroom!]!'],
  },
  Mutation: {
    createChatroom: [{ input: 'CreateChatroomInput!' }, 'Chatroom!'],
    joinChatroom: [{ name: 'String!' }, 'Chatroom!'],
    quitChatroom: [{ name: 'String!' }, 'Chatroom!'],
    sendMessage: [{ chatroomName: 'String!', input: 'CreateMessageInput!' }, 'Message!'],
  },
  Subscription: {
    messageAdded: [{ chatroomName: 'String!' }, 'Message!'],
  },
});

const $$ = infer($);
export type Message = typeof $$.Message;
export type Chatroom = typeof $$.Chatroom;

export const { mutation, query, subscription } = createClient('http://localhost:3000/graphql')
  .withWebSocketClient({ url: 'ws://localhost:3000/graphql' })
  .withSchema($);

const room = (await query('chatroom')
  .select((room) => [
    room.name,
    room.users,
    room.messages((message) => [
      message.sender,
      message.content,
      message.mentionedUser,
      message.createdAt,
    ]),
  ])
  .byName('general'))!;

const unsubscribe = subscription('messageAdded')
  .select((message) => [message.sender, message.content, message.mentionedUser, message.createdAt])
  .byChatroomName('general')
  .subscribe((data) => {
    room.messages.push(data);
    console.log(`Received message: ${data.content} at ${data.createdAt} from ${data.sender}`);
  });

try {
  const message = await mutation('sendMessage').by({
    chatroomName: room.name,
    input: { content: 'Hello', mentionedUser: 'Alice' },
  });
  console.log(
    `Send message: ${message.content} at ${message.createdAt} to ${message.mentionedUser}`,
  );
} catch (error) {
  console.error(`Failed to send message: ${(error as ClientError).response.errors}`);
}

setTimeout(async () => {
  unsubscribe();
  await mutation('quitChatroom').byName(room.name);
}, 10000);
