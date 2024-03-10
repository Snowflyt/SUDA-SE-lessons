import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { PermissionsResolver } from './permissions.resolver';
import { PermissionsService } from './permissions.service';

import type { CreatePermissionInput } from './dto/create-permission.input';
import type { UpdatePermissionInput } from './dto/update-permission.input';
import type { TestingModule } from '@nestjs/testing';

import { BasicTestingModule } from '@/test-utils/basic.module';

const chance = new Chance();

const permissionId = chance.integer({ min: 1, max: 1000 });

const createPermissionInput: CreatePermissionInput = {
  name: chance.name(),
  description: chance.sentence(),
};

const updatePermissionInput: UpdatePermissionInput = {
  name: chance.name(),
  description: chance.sentence(),
};

describe('PermissionsResolver', () => {
  let resolver: PermissionsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // The imports actually doesn't matter for this test,
      // they are just here to inject the dependencies of authentication decorators
      imports: [BasicTestingModule],
      providers: [
        PermissionsResolver,
        {
          provide: PermissionsService,
          useValue: {
            create: jest.fn(() => ({
              id: permissionId,
              ...createPermissionInput,
            })),
            findAll: jest.fn(() => [
              {
                id: permissionId,
                ...createPermissionInput,
              },
            ]),
            findOne: jest.fn(() => ({
              id: permissionId,
              ...createPermissionInput,
            })),
            update: jest.fn(() => ({
              id: permissionId,
              ...createPermissionInput,
              ...updatePermissionInput,
            })),
            remove: jest.fn(() => ({})),
          },
        },
      ],
    }).compile();

    resolver = module.get<PermissionsResolver>(PermissionsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should be able to create a permission', async () => {
    const newPermission = await resolver.createPermission(createPermissionInput);
    expect(newPermission.id).toBeDefined();
    expect(newPermission.id).toBe(permissionId);
    expect(newPermission.name).toBe(createPermissionInput.name);
    expect(newPermission.description).toBe(createPermissionInput.description);
  });

  it('should be able to list all permissions', async () => {
    const permissions = await resolver.findAll();
    expect(permissions).toBeDefined();
    expect(Array.isArray(permissions)).toBe(true);
    expect(permissions[0].id).toBe(permissionId);
  });

  it('should be able to find one permission by id', async () => {
    const foundPermission = await resolver.findOne(permissionId);
    expect(foundPermission).toBeDefined();
    expect(foundPermission.id).toBe(permissionId);
  });

  it('should be able to update a permission ', async () => {
    const updatedPermission = await resolver.updatePermission(permissionId, updatePermissionInput);
    expect(updatedPermission).toBeDefined();
    expect(updatedPermission.name).toBe(updatePermissionInput.name);
    expect(updatedPermission.description).toBe(updatePermissionInput.description);
  });

  it('should be able to remove a permission ', async () => {
    const removedPermission = await resolver.removePermission(permissionId);
    expect(removedPermission).toBeDefined();
  });
});
