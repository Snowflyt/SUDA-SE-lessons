import { Module } from '@nestjs/common';

import { AuthModule } from './auth.module';
import { CacheModule } from './cache.module';
import { ConfigModule } from './config.module';
import { GraphqlModule } from './graphql.module';
import { PrismaModule } from './prisma.module';
import { ValidatorModule } from './validator.module';

@Module({
  imports: [ConfigModule, GraphqlModule, PrismaModule, AuthModule, CacheModule, ValidatorModule],
  exports: [ConfigModule, GraphqlModule, PrismaModule, AuthModule, CacheModule, ValidatorModule],
})
export class CommonModule {}
