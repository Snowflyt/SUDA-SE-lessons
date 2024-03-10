import { ConflictException, NotFoundException } from '@nestjs/common';

import type { ModelOf } from '@/types/prisma';
import type { Prisma } from '@prisma/client';

const stringify = (value: any) => {
  if (typeof value === 'string') return `"${value}"`;
  if (typeof value === 'object') return JSON.stringify(value);
  return String(value);
};

export class EntityNotFoundException<
  S extends Prisma.ModelName,
  K extends keyof ModelOf<S>,
> extends NotFoundException {
  constructor(modelName: S, propertyName: K, propertyValue: ModelOf<S>[K]) {
    super(`${modelName}(${String(propertyName)}=${stringify(propertyValue)}) not found`);
  }
}

export class EntityAlreadyExistsException<
  S extends Prisma.ModelName,
  K extends keyof ModelOf<S>,
> extends ConflictException {
  constructor(modelName: S, propertyName: K, propertyValue: ModelOf<S>[K]);
  constructor(modelName: S, properties: { [P in keyof ModelOf<S>]?: ModelOf<S>[P] });
  constructor(
    modelName: S,
    propertyNameOrProperties: K | { [P in keyof ModelOf<S>]?: ModelOf<S>[P] },
    propertyValue?: ModelOf<S>[K],
  ) {
    if (typeof propertyNameOrProperties === 'string') {
      super(
        `${modelName}(${String(propertyNameOrProperties)}=${stringify(
          propertyValue,
        )}) already exists`,
      );
    } else {
      // Convert properties to format like "Something(name=xxx, description=yyy and status=zzz)"
      const message = Object.entries(propertyNameOrProperties)
        .map(([key, value]) => {
          if (typeof value !== 'object') return `${key}=${stringify(value)}`;
          if (value.id !== undefined) return `${key}Id=${stringify(value.id)}`;
          return `${key} ${JSON.stringify(value)}`;
        })
        .join(', ');
      super(`${modelName}(${message}) already exists`);
    }
  }
}
