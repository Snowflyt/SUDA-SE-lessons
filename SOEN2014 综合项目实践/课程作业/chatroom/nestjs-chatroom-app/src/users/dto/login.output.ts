import { Field, ObjectType } from '@nestjs/graphql';

import { UserDto } from '@/users/dto/user.dto';

@ObjectType()
export class LoginOutput {
  @Field()
  token: string;

  @Field(() => UserDto)
  user: UserDto;
}
