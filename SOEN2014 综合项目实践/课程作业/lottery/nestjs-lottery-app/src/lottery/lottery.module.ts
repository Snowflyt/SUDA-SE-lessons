import { Module } from '@nestjs/common';

import { LotteryResolver } from './lottery.resolver';

@Module({
  providers: [LotteryResolver],
})
export class LotteryModule {}
