import { CacheModule as NestCacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    NestCacheModule.register({
      isGlobal: true,
      ttl: 0,
    }),
  ],
})
export class CacheModule {}
