import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class LoginInput {
  @Field()
  username: string;

  @Field({ nullable: true })
  password?: string;
}
