import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateRoleInput {
  @Field()
  name: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  permissionNames?: string[];
}
