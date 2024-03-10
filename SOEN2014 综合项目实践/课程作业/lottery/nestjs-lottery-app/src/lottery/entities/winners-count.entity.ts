import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class WinnersCount {
  @Field(() => Int)
  first: number;

  @Field(() => Int)
  second: number;

  @Field(() => Int)
  third: number;
}
