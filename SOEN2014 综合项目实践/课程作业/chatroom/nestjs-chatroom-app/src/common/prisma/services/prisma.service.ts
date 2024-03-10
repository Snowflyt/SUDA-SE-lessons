import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

import type { OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
  }
}
