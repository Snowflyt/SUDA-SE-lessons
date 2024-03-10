import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { UsersService } from './users.service';

import type { CreateUserInput } from './dto/create-user.input';
import type { UpdateUserInput } from './dto/update-user.input';
import type { TestingModule } from '@nestjs/testing';

import { AuthService } from '@/common/auth/services/auth.service';
import { BasicTestingModule } from '@/test-utils/basic.module';

const chance = new Chance();

const createUserInput: CreateUserInput = {
  username: chance.name(),
  password: chance.string({ length: 15 }),
  roleNames: ['admin'],
};
let userId = -1;

const updateUserInput: UpdateUserInput = {
  username: chance.name(),
};

describe('UsersService', () => {
  let service: UsersService;
  let module: TestingModule;

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [BasicTestingModule],
      providers: [
        UsersService,
        {
          provide: AuthService,
          useValue: {
            validateUser: jest.fn((username: string, password: string) => {
              if (username !== createUserInput.username || password !== createUserInput.password) {
                return null;
              } else {
                return createUserInput;
              }
            }),
            generateUserCredentials: jest.fn(() => ({ token: '' })),
          },
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    await module.init();
  });

  afterAll(async () => {
    if (module) {
      await module.close();
    }
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an user with createUserInput', async () => {
    const user = await service.create(createUserInput);
    expect(user.id).toBeDefined();
    expect(user.username).toBe(createUserInput.username);
    userId = user.id;
  });

  it('should get a list of users', async () => {
    const users = await service.findAll();
    expect(users).toBeDefined();
    expect(Array.isArray(users)).toBe(true);
    const user = users.find((user) => user.id === userId);
    expect(user.username).toBe(createUserInput.username);
    expect(user.roles.map((role) => role.name)).toEqual(createUserInput.roleNames);
  });

  it('should get the user by its own userId', async () => {
    const user = await service.findOne(userId);
    expect(user.id).toBe(userId);
    expect(user.username).toBe(createUserInput.username);
    expect(user.roles.map((role) => role.name)).toEqual(createUserInput.roleNames);
  });

  it('should update some user properties', async () => {
    const updatedUser1 = await service.update(userId, updateUserInput);
    expect(updatedUser1.id).toBe(userId);
    expect(updatedUser1.username).toBe(updateUserInput.username);

    // Change the username back to the original one
    updateUserInput.username = createUserInput.username;
    const updatedUser2 = await service.update(userId, updateUserInput);
    expect(updatedUser2.id).toBe(userId);
    expect(updatedUser2.username).toBe(updateUserInput.username);
  });

  it('should be able to find one by username', async () => {
    const user = await service.findOneByUsername(createUserInput.username);
    expect(user).toBeDefined();
    expect(user.username).toBe(createUserInput.username);
  });

  it('should delete the testing user', async () => {
    await service.remove(userId);
    try {
      await service.findOne(userId);
    } catch (err) {
      expect(err.message).toBe(`User(id=${userId}) not found`);
    }
  });

  it('should not be able to find one by username', async () => {
    try {
      await service.findOneByUsername(createUserInput.username);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should receive not found error for getting the deleted user', async () => {
    try {
      await service.findOne(userId);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should not be able to update an non existing user', async () => {
    try {
      await service.update(userId, updateUserInput);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should be able to generate an access token', async () => {
    const { token } = await service.login({
      username: createUserInput.username,
      password: createUserInput.password,
    });
    expect(token).toBeDefined();
  });

  it('should not be able to generate an access token', async () => {
    try {
      await service.login({
        username: chance.name(),
        password: createUserInput.password,
      });
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(400);
    }
  });
});
