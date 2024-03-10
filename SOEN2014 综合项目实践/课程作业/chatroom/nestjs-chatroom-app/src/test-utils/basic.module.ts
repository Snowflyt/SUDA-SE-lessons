import { Module } from '@nestjs/common';

import { CacheModule } from '@/common/cache.module';
import { PrismaModule } from '@/common/prisma.module';
import { ValidatorModule } from '@/common/validator.module';

@Module({
  imports: [CacheModule, PrismaModule, ValidatorModule],
  exports: [CacheModule, PrismaModule, ValidatorModule],
})
export class BasicTestingModule {}
