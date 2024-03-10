import { Inject } from '@nestjs/common';
import { Args, Int, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import { CreateChatroomInput } from './dto/create-chatroom.input';
import { CreateMessageInput } from './dto/create-message.input';
import { Chatroom } from './entities/chatroom.entity';
import { Message } from './entities/message.entity';

import { CurrentUser } from '@/common/auth/decorators/current-user';
import { JwtUserPayload } from '@/common/auth/decorators/requires';
import { PrismaService } from '@/common/prisma/services/prisma.service';
import { PUB_SUB } from '@/constants/graphql';
import { EntityNotFoundException } from '@/exceptions/entity';
import { UserDto } from '@/users/dto/user.dto';

export const chatrooms: Chatroom[] = [
  {
    id: 1,
    name: 'c/public',
    users: [],
    messages: [],
  },
  {
    id: 2,
    name: 'c/foo',
    users: [],
    messages: [],
  },
  {
    id: 3,
    name: 'c/bar',
    users: [],
    messages: [],
  },
];

@Resolver()
export class ChatroomsResolver {
  constructor(
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
    private readonly prisma: PrismaService,
  ) {}

  @Mutation(() => Chatroom)
  async createChatroom(
    @Args('input') input: CreateChatroomInput,
    @CurrentUser() jwtUser: JwtUserPayload,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: jwtUser.userId },
      include: { roles: { include: { permissions: true } } },
    });

    const chatroom: Chatroom = {
      id: chatrooms.length + 1,
      name: input.name,
      users: [UserDto.from(user)],
      messages: [],
    };
    chatrooms.push(chatroom);

    return chatroom;
  }

  @Query(() => [Chatroom], { name: 'chatrooms' })
  findAll() {
    return chatrooms;
  }

  @Query(() => Chatroom, { name: 'chatroom' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return chatrooms.find((chatroom) => chatroom.id === id);
  }

  @Mutation(() => Chatroom)
  async joinChatroom(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() jwtUser: JwtUserPayload,
  ) {
    const user = await this.prisma.user.findUnique({
      where: { id: jwtUser.userId },
      include: { roles: { include: { permissions: true } } },
    });

    const chatroom = chatrooms.find((chatroom) => chatroom.id === id);
    chatroom.users.push(UserDto.from(user));

    return chatroom;
  }

  @Mutation(() => Chatroom)
  quitChatroom(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() jwtUser: JwtUserPayload,
  ) {
    const chatroom = chatrooms.find((chatroom) => chatroom.id === id);
    chatroom.users = chatroom.users.filter((u) => u.id !== jwtUser.userId);
    return chatroom;
  }

  @Mutation(() => Message)
  async addMessage(
    @Args('chatroomId', { type: () => Int }) chatroomId: number,
    @Args('input') input: CreateMessageInput,
    @CurrentUser() jwtUser: JwtUserPayload,
  ) {
    const currUser = await this.prisma.user.findUnique({
      where: { id: jwtUser.userId },
      include: { roles: { include: { permissions: true } } },
    });

    let mentionedUser: typeof currUser | undefined = undefined;
    if (input.mentionedId) {
      mentionedUser = await this.prisma.user.findUnique({
        where: { id: input.mentionedId },
        include: { roles: { include: { permissions: true } } },
      });
      if (!mentionedUser) throw new EntityNotFoundException('User', 'id', input.mentionedId);
    }

    const message: Message = {
      timestamp: new Date(),
      sender: UserDto.from(currUser),
      mentioned: mentionedUser ? UserDto.from(mentionedUser) : undefined,
      text: input.text,
    };

    chatrooms.find((chatroom) => chatroom.id === chatroomId).messages.push(message);

    void this.pubSub
      .publish(`messageAdded$${chatroomId}`, { messageAdded: message })
      .catch(console.error);

    return message;
  }

  @Subscription(() => Message)
  messageAdded(@Args('chatroomId', { type: () => Int }) chatroomId: number) {
    return this.pubSub.asyncIterator(`messageAdded$${chatroomId}`);
  }
}
