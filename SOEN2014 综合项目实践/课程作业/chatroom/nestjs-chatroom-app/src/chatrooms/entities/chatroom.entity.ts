import { Field, Int, ObjectType } from '@nestjs/graphql';

import { Message } from './message.entity';

import { UserDto } from '@/users/dto/user.dto';

@ObjectType()
export class Chatroom {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field(() => [UserDto])
  users: UserDto[];

  @Field(() => [Message])
  messages: Message[];
}
