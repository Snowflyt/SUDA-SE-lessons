import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateUserInput } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
  @Field({ nullable: true })
  username?: string;

  @Field({ nullable: true })
  password?: string;

  @Field(() => [String], { nullable: true })
  roleNames?: string[];
}
