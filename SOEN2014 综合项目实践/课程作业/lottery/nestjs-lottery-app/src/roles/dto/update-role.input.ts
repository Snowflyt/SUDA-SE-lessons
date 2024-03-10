import { Field, InputType, PartialType } from '@nestjs/graphql';

import { CreateRoleInput } from './create-role.input';

@InputType()
export class UpdateRoleInput extends PartialType(CreateRoleInput) {
  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  description?: string;

  @Field(() => [String], { nullable: true })
  permissionNames?: string[];
}
