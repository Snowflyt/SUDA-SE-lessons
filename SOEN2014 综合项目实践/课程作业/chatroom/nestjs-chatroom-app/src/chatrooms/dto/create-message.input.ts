import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateMessageInput {
  @Field()
  text: string;

  @Field(() => Int, { nullable: true })
  mentionedId?: number;
}
