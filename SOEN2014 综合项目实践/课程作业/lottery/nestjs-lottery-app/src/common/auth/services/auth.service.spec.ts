import { JwtModule } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { AuthService } from './auth.service';

import type { TestingModule } from '@nestjs/testing';
import type { Permission, Role, User } from '@prisma/client';

import { UsersService } from '@/users/users.service';
import { encryptPassword } from '@/utils/auth';

const chance = new Chance();

const primaryRole: Role & { permissions: Permission[] } = {
  id: chance.integer({ min: 1, max: 1000 }),
  name: 'admin',
  description: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  permissions: [],
};

const user: User & { roles: Array<Role & { permissions: Permission[] }> } = {
  id: chance.integer({ min: 1, max: 1000 }),
  username: chance.name(),
  password: chance.string({ length: 15 }),
  createdAt: new Date(),
  updatedAt: new Date(),
  roles: [primaryRole],
};

describe('AuthService', () => {
  let service: AuthService;
  let module: TestingModule;
  const JWT_SECRET = chance.string({ length: 15 });

  beforeEach(async () => {
    module = await Test.createTestingModule({
      imports: [JwtModule.register({ secret: JWT_SECRET })],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useValue: {
            findOneByUsername: jest.fn(async (username: string) => {
              if (username) {
                return {
                  ...user,
                  password: await encryptPassword(user.password),
                };
              } else {
                return null;
              }
            }),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  afterEach(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate user credentials', async () => {
    const isUserValid = await service.validateUser(user.username, user.password);
    expect(isUserValid).toBeDefined();
    expect(isUserValid.username).toBe(user.username);
  });

  it('should not validate user credentials', async () => {
    const isUserValid = await service.validateUser(null, user.password);
    expect(isUserValid).toBe(null);
  });

  it('should be able to generate an access token', async () => {
    const token = await service.generateUserCredentials(user);
    expect(token).toBeDefined();
    expect(typeof token).toBe('string');
  });
});
