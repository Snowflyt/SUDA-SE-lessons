import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { JwtStrategy } from './jwt.strategy.service';

import type { TestingModule } from '@nestjs/testing';
import type { Permission, Role } from '@prisma/client';

const chance = new Chance();

const primaryRole: Role & { permissions: Permission[] } = {
  id: chance.integer({ min: 1, max: 1000 }),
  name: 'admin',
  description: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  permissions: [],
};

const userPayload = {
  sub: chance.integer({ min: 1, max: 1000 }),
  username: chance.name(),
  roles: [primaryRole],
};

describe('JwtStrategyService', () => {
  let service: JwtStrategy;
  let module: TestingModule;
  const JWT_SECRET = chance.string({ length: 15 });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: JWT_SECRET })],
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn(() => {
              return chance.string({ length: 15 });
            }),
          },
        },
      ],
    }).compile();

    service = module.get<JwtStrategy>(JwtStrategy);
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return an object with userId and payload', async () => {
    const user = await service.validate(userPayload);
    expect(user.userId).toBe(userPayload.sub);
  });
});
