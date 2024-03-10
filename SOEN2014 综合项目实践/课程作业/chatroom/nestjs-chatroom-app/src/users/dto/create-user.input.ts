import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field()
  username: string;

  @Field()
  password: string;

  @Field(() => [String])
  roleNames: string[];
}
