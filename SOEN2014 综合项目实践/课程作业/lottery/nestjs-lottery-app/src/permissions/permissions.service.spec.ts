import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { PermissionsService } from './permissions.service';

import type { CreatePermissionInput } from './dto/create-permission.input';
import type { UpdatePermissionInput } from './dto/update-permission.input';
import type { TestingModule } from '@nestjs/testing';

import { BasicTestingModule } from '@/test-utils/basic.module';

const chance = new Chance();

const createPermissionInput: CreatePermissionInput = {
  name: chance.name(),
  description: chance.sentence(),
};
let permissionId = -1;

const updatePermissionInput: UpdatePermissionInput = {
  name: chance.name(),
  description: chance.sentence(),
};

describe('PermissionsService', () => {
  let service: PermissionsService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BasicTestingModule],
      providers: [PermissionsService],
    }).compile();

    service = module.get<PermissionsService>(PermissionsService);
    await module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a permission with createPermissionInput', async () => {
    const permission = await service.create(createPermissionInput);
    expect(permission.id).toBeDefined();
    expect(permission.name).toBe(createPermissionInput.name);
    permissionId = permission.id;
  });

  it('should get a list of permissions', async () => {
    const permissions = await service.findAll();
    expect(permissions).toBeDefined();
    expect(Array.isArray(permissions)).toBe(true);
    const permission = permissions.find((permission) => permission.id === permissionId);
    expect(permission.name).toBe(createPermissionInput.name);
    expect(permission.description).toBe(createPermissionInput.description);
  });

  it('should get the permission by its own permissionId', async () => {
    const permission = await service.findOne(permissionId);
    expect(permission.id).toBe(permissionId);
    expect(permission.name).toBe(createPermissionInput.name);
    expect(permission.description).toBe(createPermissionInput.description);
  });

  it('should update some permission properties', async () => {
    const updatedPermission1 = await service.update(permissionId, updatePermissionInput);
    expect(updatedPermission1.id).toBe(permissionId);
    expect(updatedPermission1.name).toBe(updatePermissionInput.name);
    expect(updatedPermission1.description).toBe(updatePermissionInput.description);

    // Change the name back to the original one
    updatePermissionInput.name = createPermissionInput.name;
    updatePermissionInput.description = createPermissionInput.description;
    const updatedPermission2 = await service.update(permissionId, updatePermissionInput);
    expect(updatedPermission2.id).toBe(permissionId);
    expect(updatedPermission2.name).toBe(updatePermissionInput.name);
    expect(updatedPermission2.description).toBe(updatePermissionInput.description);
  });

  it('should delete the testing permission', async () => {
    await service.remove(permissionId);
    try {
      await service.findOne(permissionId);
    } catch (err) {
      expect(err.message).toBe(`Permission(id=${permissionId}) not found`);
    }
  });

  it('should receive not found error for getting the deleted permission', async () => {
    try {
      await service.findOne(permissionId);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should not be able to update a non existing permission', async () => {
    try {
      await service.update(permissionId, updatePermissionInput);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });
});
