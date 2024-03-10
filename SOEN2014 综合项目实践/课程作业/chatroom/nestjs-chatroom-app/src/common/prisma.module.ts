import { Global, Module } from '@nestjs/common';

import { PrismaService } from '@/common/prisma/services/prisma.service';

@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule {}
