import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

import type { CreateUserInput } from './dto/create-user.input';
import type { LoginInput } from './dto/login.input';
import type { UpdateUserInput } from './dto/update-user.input';
import type { TestingModule } from '@nestjs/testing';
import type { Permission, Role, User } from '@prisma/client';

import { BasicTestingModule } from '@/test-utils/basic.module';

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

const createUserInput: CreateUserInput = {
  username: user.username,
  password: user.password,
  roleNames: ['admin'],
};

const updateUserInput: UpdateUserInput = {
  username: chance.name(),
};

describe('UsersResolver', () => {
  let resolver: UsersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // The imports actually doesn't matter for this test,
      // they are just here to inject the dependencies of authentication decorators
      imports: [BasicTestingModule],
      providers: [
        UsersResolver,
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(() => user),
            findAll: jest.fn(() => [user]),
            findOne: jest.fn(() => user),
            update: jest.fn(() => ({
              ...user,
              ...updateUserInput,
            })),
            remove: jest.fn(() => ({})),
            login: jest.fn(() => ({ token: '', user })),
          },
        },
      ],
    }).compile();

    resolver = module.get<UsersResolver>(UsersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to create a user', async () => {
    const newUser = await resolver.createUser(createUserInput);
    expect(newUser.id).toBeDefined();
    expect(newUser.id).toBe(user.id);
    expect(newUser.username).toBe(createUserInput.username);
    expect(newUser.roles.map((role) => role.name)).toEqual(createUserInput.roleNames);
  });

  it('should be able to list all users', async () => {
    const users = await resolver.findAll();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    expect(users[0].id).toBe(user.id);
  });

  it('should be able to find one user by id', async () => {
    const foundUser = await resolver.findOne(user.id);
    expect(foundUser).toBeDefined();
    expect(foundUser.id).toBe(user.id);
  });

  it('should be able to update a user ', async () => {
    const updatedUser = await resolver.updateUser(user.id, updateUserInput);
    expect(updatedUser).toBeDefined();
    expect(updatedUser.username).toBe(updateUserInput.username);
  });

  it('should be able generate an access token', async () => {
    const loginUserInput: LoginInput = {
      username: createUserInput.username,
      password: createUserInput.password,
    };
    const { token } = await resolver.login(loginUserInput);
    expect(token).toBeDefined();
  });

  it('should be able to remove a user ', async () => {
    const removedUser = await resolver.removeUser(user.id);
    expect(removedUser).toBeDefined();
  });
});
