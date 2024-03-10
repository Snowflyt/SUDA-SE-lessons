import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { RolesResolver } from './roles.resolver';
import { RolesService } from './roles.service';

import type { CreateRoleInput } from './dto/create-role.input';
import type { UpdateRoleInput } from './dto/update-role.input';
import type { TestingModule } from '@nestjs/testing';
import type { Permission, Role } from '@prisma/client';

import { BasicTestingModule } from '@/test-utils/basic.module';

const chance = new Chance();

const role: Role & { permissions: Permission[] } = {
  id: chance.integer({ min: 1, max: 1000 }),
  name: 'admin',
  description: chance.sentence(),
  createdAt: new Date(),
  updatedAt: new Date(),
  permissions: [
    {
      id: chance.integer({ min: 1, max: 1000 }),
      name: 'CREATE_USER',
      description: chance.sentence(),
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
};

const createRoleInput: CreateRoleInput = {
  name: role.name,
  permissionNames: ['CREATE_USER'],
};

const updateRoleInput: UpdateRoleInput = {
  name: chance.name(),
  description: chance.sentence(),
};

describe('RolesResolver', () => {
  let resolver: RolesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // The imports actually doesn't matter for this test,
      // they are just here to inject the dependencies of authentication decorators
      imports: [BasicTestingModule],
      providers: [
        RolesResolver,
        {
          provide: RolesService,
          useValue: {
            create: jest.fn(() => role),
            findAll: jest.fn(() => [role]),
            findOne: jest.fn(() => role),
            update: jest.fn(() => ({
              ...role,
              ...updateRoleInput,
            })),
            remove: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();

    resolver = module.get<RolesResolver>(RolesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to create a role', async () => {
    const newRole = await resolver.createRole(createRoleInput);
    expect(newRole.id).toBeDefined();
    expect(newRole.id).toBe(role.id);
    expect(newRole.name).toBe(createRoleInput.name);
    expect(newRole.description).toBe(role.description);
    expect(newRole.permissions.map((permission) => permission.name)).toEqual(
      createRoleInput.permissionNames,
    );
  });

  it('should be able to list all roles', async () => {
    const roles = await resolver.findAll();
    expect(roles).toBeDefined();
    expect(Array.isArray(roles)).toBe(true);
    expect(roles[0].id).toBe(role.id);
  });

  it('should be able to find one role by id', async () => {
    const foundRole = await resolver.findOne(role.id);
    expect(foundRole).toBeDefined();
    expect(foundRole.id).toBe(role.id);
  });

  it('should be able to update a role ', async () => {
    const updatedRole = await resolver.updateRole(role.id, updateRoleInput);
    expect(updatedRole).toBeDefined();
    expect(updatedRole.name).toBe(updateRoleInput.name);
    expect(updatedRole.description).toBe(updateRoleInput.description);
  });

  it('should be able to remove a role ', async () => {
    const removedRole = await resolver.removeRole(role.id);
    expect(removedRole).toBeDefined();
  });
});
