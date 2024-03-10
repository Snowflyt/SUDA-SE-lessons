import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GraphQLVoid } from 'graphql-scalars';

import { Participant } from './entities/participant.entity';
import { WinnersCount } from './entities/winners-count.entity';

import { EntityAlreadyExistsException, EntityNotFoundException } from '@/exceptions/entity';

const INVALID_LEVEL_ERROR_MESSAGE = 'Invalid level';
const INVALID_COUNT_ERROR_MESSAGE = 'Invalid count';
const NOT_ENOUGH_PARTICIPANTS_ERROR_MESSAGE = 'Not enough participants';

// 这次作业没要求把 winners 和 participants 存储到数据库，所以直接用变量存储
const winnersCount: WinnersCount = {
  first: 1,
  second: 2,
  third: 3,
};
const winners = {
  first: [] as Participant[],
  second: [] as Participant[],
  third: [] as Participant[],
};
const participants: Participant[] = [{ name: '张三' }, { name: '李四' }];

@Resolver()
export class LotteryResolver {
  @Mutation(() => Participant)
  addParticipant(@Args('name') name: string) {
    if (participants.find((participant) => participant.name === name))
      // HACK: 这里的类型断言是因为 `EntityAlreadyExistsException` 做了一些类型体操, 仅接受 Prisma 实体类型,
      // 而这里的 `Participant` 是普通的对象, 所以用了一些 `as never` 来绕过类型检查
      throw new EntityAlreadyExistsException('Participant' as never, 'name', name as never);
    const participant = { name };
    participants.push(participant);
    return participant;
  }

  @Query(() => [Participant], { name: 'participants' })
  findAll() {
    return participants;
  }

  @Mutation(() => Participant)
  removeParticipant(@Args('name') name: string) {
    const result = participants.find((participant) => participant.name === name);
    // HACK: 这里的类型断言是因为 `EntityNotFoundException` 做了一些类型体操, 仅接受 Prisma 实体类型,
    // 而这里的 `Participant` 是普通的对象, 所以用了一些 `as never` 来绕过类型检查
    if (!result) throw new EntityNotFoundException('Participant' as never, 'name', name as never);
    participants.splice(participants.indexOf(result), 1);
    return result;
  }

  @Mutation(() => GraphQLVoid)
  setWinnersCount(
    @Args('first', { type: () => Int, nullable: true }) first: number | null,
    @Args('second', { type: () => Int, nullable: true }) second: number | null,
    @Args('third', { type: () => Int, nullable: true }) third: number | null,
  ) {
    winnersCount.first = first ?? winnersCount.first;
    winnersCount.second = second ?? winnersCount.second;
    winnersCount.third = third ?? winnersCount.third;
    return true;
  }

  @Query(() => WinnersCount, { name: 'winnersCount' })
  getWinnersCount() {
    return winnersCount;
  }

  @Mutation(() => [Participant])
  draw(
    @Args('level', { type: () => Int }) level: number,
    @Args('count', { type: () => Int }) count: number,
  ) {
    if (level < 1 || level > 3) throw new Error(INVALID_LEVEL_ERROR_MESSAGE);
    if (count < 1) throw new Error(INVALID_COUNT_ERROR_MESSAGE);

    const winnersKey = ['first', 'second', 'third'][level - 1];
    const winnersCountKey = ['first', 'second', 'third'][level - 1];
    const winnersCountValue = winnersCount[winnersCountKey];
    if (winnersCountValue < count) throw new Error(INVALID_COUNT_ERROR_MESSAGE);
    if (winners[winnersKey].length + count > winnersCountValue)
      throw new Error(INVALID_COUNT_ERROR_MESSAGE);
    if (
      count >
      participants.length - winners.first.length - winners.second.length - winners.third.length
    )
      throw new Error(NOT_ENOUGH_PARTICIPANTS_ERROR_MESSAGE);

    const result = [];
    // 随机抽取加入结果，不能与已抽取的重复
    for (let i = 0; i < count; i++) {
      let randomIndex = Math.floor(Math.random() * participants.length);
      while (
        Object.values(winners)
          .flatMap((item) => item)
          .concat(result)
          .some((item) => item.name === participants[randomIndex].name)
      )
        randomIndex = Math.floor(Math.random() * participants.length);
      result.push(participants[randomIndex]);
    }
    winners[winnersKey].push(...result);
    return result;
  }

  @Mutation(() => GraphQLVoid)
  reset() {
    winners.first = [];
    winners.second = [];
    winners.third = [];
    return true;
  }
}
