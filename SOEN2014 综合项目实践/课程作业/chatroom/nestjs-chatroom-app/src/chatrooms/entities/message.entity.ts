import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '@/users/dto/user.dto';

@ObjectType()
export class Message {
  @Field(() => Date)
  timestamp: Date;

  @Field(() => UserDto)
  sender: UserDto;

  @Field(() => UserDto, { nullable: true })
  mentioned?: UserDto;

  @Field()
  text: string;
}
