import { Test } from '@nestjs/testing';
import * as Chance from 'chance';

import { RolesService } from './roles.service';

import type { CreateRoleInput } from './dto/create-role.input';
import type { UpdateRoleInput } from './dto/update-role.input';
import type { TestingModule } from '@nestjs/testing';

import { BasicTestingModule } from '@/test-utils/basic.module';

const chance = new Chance();

const createRoleInput: CreateRoleInput = {
  name: chance.name(),
  description: chance.sentence(),
  permissionNames: ['CREATE_USER'],
};
let roleId = -1;

const updateRoleInput: UpdateRoleInput = {
  name: chance.name(),
  description: chance.sentence(),
  permissionNames: ['UPDATE_USER'],
};

describe('RolesService', () => {
  let service: RolesService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [BasicTestingModule],
      providers: [RolesService],
    }).compile();

    service = module.get<RolesService>(RolesService);
    await module.init();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a role with createRoleInput', async () => {
    const role = await service.create(createRoleInput);
    expect(role.id).toBeDefined();
    expect(role.name).toBe(createRoleInput.name);
    roleId = role.id;
  });

  it('should get a list of roles', async () => {
    const roles = await service.findAll();
    expect(roles).toBeDefined();
    expect(Array.isArray(roles)).toBe(true);
    const role = roles.find((role) => role.id === roleId);
    expect(role.name).toBe(createRoleInput.name);
    expect(role.description).toBe(createRoleInput.description);
    expect(role.permissions.map((permission) => permission.name)).toEqual(
      createRoleInput.permissionNames,
    );
  });

  it('should get the role by its own roleId', async () => {
    const role = await service.findOne(roleId);
    expect(role.id).toBe(roleId);
    expect(role.name).toBe(createRoleInput.name);
    expect(role.description).toBe(createRoleInput.description);
    expect(role.permissions.map((permission) => permission.name)).toEqual(
      createRoleInput.permissionNames,
    );
  });

  it('should update some role properties', async () => {
    const updatedRole1 = await service.update(roleId, updateRoleInput);
    expect(updatedRole1.id).toBe(roleId);
    expect(updatedRole1.name).toBe(updateRoleInput.name);
    expect(updatedRole1.description).toBe(updateRoleInput.description);
    expect(updatedRole1.permissions.map((permission) => permission.name)).toEqual(
      updateRoleInput.permissionNames ?? createRoleInput.permissionNames,
    );

    // Change the name back to the original one
    updateRoleInput.name = createRoleInput.name;
    updateRoleInput.description = createRoleInput.description;
    updateRoleInput.permissionNames = createRoleInput.permissionNames;
    const updatedRole2 = await service.update(roleId, updateRoleInput);
    expect(updatedRole2.id).toBe(roleId);
    expect(updatedRole2.name).toBe(updateRoleInput.name);
    expect(updatedRole2.description).toBe(updateRoleInput.description);
    expect(updatedRole2.permissions.map((permission) => permission.name)).toEqual(
      updateRoleInput.permissionNames ?? createRoleInput.permissionNames,
    );
  });

  it('should delete the testing role', async () => {
    await service.remove(roleId);
    try {
      await service.findOne(roleId);
    } catch (err) {
      expect(err.message).toBe(`Role(id=${roleId}) not found`);
    }
  });

  it('should receive not found error for getting the deleted role', async () => {
    try {
      await service.findOne(roleId);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });

  it('should not be able to update a non existing role', async () => {
    try {
      await service.update(roleId, updateRoleInput);
    } catch (err) {
      expect(err).toBeDefined();
      expect(err.response).toBeDefined();
      expect(err.response.statusCode).toBe(404);
    }
  });
});
