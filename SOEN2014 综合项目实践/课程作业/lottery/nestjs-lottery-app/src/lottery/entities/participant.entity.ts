import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Participant {
  @Field()
  name: string;
}
