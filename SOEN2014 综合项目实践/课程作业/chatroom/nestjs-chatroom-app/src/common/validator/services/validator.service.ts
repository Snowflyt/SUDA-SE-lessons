import { Injectable } from '@nestjs/common';

import { Checker } from '../checker';

import type { DelegateOf } from '@/types/prisma';
import type { Prisma } from '@prisma/client';

import { PrismaService } from '@/common/prisma/services/prisma.service';
import { uncapitalize } from '@/utils/case';

@Injectable()
export class Validator {
  constructor(private readonly prisma: PrismaService) {}

  validate<S extends Prisma.ModelName>(modelName: S) {
    return new Checker(modelName, this.prisma[uncapitalize(modelName)] as DelegateOf<S>);
  }
}
