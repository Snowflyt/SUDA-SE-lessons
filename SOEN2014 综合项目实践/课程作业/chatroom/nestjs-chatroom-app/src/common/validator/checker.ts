import type { DelegateOf, ModelOf } from '@/types/prisma';
import type { Prisma } from '@prisma/client';

import { EntityAlreadyExistsException } from '@/exceptions/entity';

export class Checker<S extends Prisma.ModelName> {
  constructor(
    private readonly modelName: S,
    private readonly delegate: DelegateOf<S>,
  ) {}

  async checkConflict<K extends keyof ModelOf<S>>(
    propertyName: K,
    propertyValue: ModelOf<S>[K],
  ): Promise<void> {
    const propertyExists =
      (await (this.delegate as any).count({
        where: {
          [propertyName]: propertyValue,
        },
      })) > 0;
    if (propertyExists) {
      throw new EntityAlreadyExistsException(this.modelName, propertyName, propertyValue);
    }
  }

  async checkConflicts(properties: {
    [P in keyof ModelOf<S>]?: ModelOf<S>[P];
  }): Promise<void> {
    const propertyExists =
      (await (this.delegate as any).count({
        where: properties,
      })) > 0;
    if (propertyExists) {
      throw new EntityAlreadyExistsException(this.modelName, properties);
    }
  }
}
