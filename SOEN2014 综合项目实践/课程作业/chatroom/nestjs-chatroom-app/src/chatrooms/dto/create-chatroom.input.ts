import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateChatroomInput {
  @Field()
  name: string;
}
