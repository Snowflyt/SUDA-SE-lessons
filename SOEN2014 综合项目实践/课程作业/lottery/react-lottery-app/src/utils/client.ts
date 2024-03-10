/* eslint-disable sonarjs/no-duplicate-string */

import { createClient } from 'graphql-intuitive-request';

import { getToken, setToken } from './auth';

export const { mutation, query } = createClient('http://localhost:3000/graphql', {
  requestMiddleware: (request) => {
    const token = getToken();
    if (token !== null && token !== '' && request.operationName !== 'loginUser')
      request.headers = { ...request.headers, Authorization: `Bearer ${token}` };
    return request;
  },
  responseMiddleware: (response) => {
    if (response instanceof Error) return;
    const token = response.headers.get('Authorization') ?? null;
    if (token != null) setToken(token);
  },
}).withSchema({
  DateTime: 'String',

  UserDto: {
    id: 'Int!',
    username: 'String!',
    roles: '[RoleDto!]!',
    createdAt: 'DateTime!',
    updatedAt: 'DateTime!',
  },
  RoleDto: {
    id: 'Int!',
    name: 'String!',
    description: 'String',
    permissions: '[PermissionDto!]!',
    createdAt: 'DateTime!',
    updatedAt: 'DateTime!',
  },
  PermissionDto: {
    id: 'Int!',
    name: 'String!',
    description: 'String',
    createdAt: 'DateTime!',
    updatedAt: 'DateTime!',
  },

  LoginInput: {
    username: 'String!',
    password: 'String',
  },
  LoginOutput: {
    token: 'String!',
    user: 'UserDto!',
  },

  CreateUserInput: {
    username: 'String!',
    password: 'String!',
    roleNames: '[String!]!',
  },
  UpdateUserInput: {
    username: 'String',
    password: 'String',
    roleNames: '[String!]',
  },
  CreateRoleInput: {
    name: 'String!',
    description: 'String',
    permissionNames: '[String!]',
  },
  UpdateRoleInput: {
    name: 'String',
    description: 'String',
    permissionNames: '[String!]',
  },
  CreatePermissionInput: {
    name: 'String!',
    description: 'String',
  },
  UpdatePermissionInput: {
    name: 'String',
    description: 'String',
  },

  Participant: {
    name: 'String!',
  },
  WinnersCount: {
    first: 'Int!',
    second: 'Int!',
    third: 'Int!',
  },

  Query: {
    me: [{}, 'UserDto!'],
    user: [{ id: 'Int!' }, 'UserDto!'],
    users: [{}, '[UserDto!]!'],
    role: [{ id: 'Int!' }, 'RoleDto!'],
    roles: [{}, '[RoleDto!]!'],
    permission: [{ id: 'Int!' }, 'PermissionDto!'],
    permissions: [{}, '[PermissionDto!]!'],

    participants: [{}, '[Participant!]!'],
    winnersCount: [{}, 'WinnersCount!'],
  },

  Mutation: {
    login: [{ input: 'LoginInput!' }, 'LoginOutput!'],

    createUser: [{ input: 'CreateUserInput!' }, 'UserDto!'],
    updateUser: [{ id: 'Int!', input: 'UpdateUserInput!' }, 'UserDto!'],
    removeUser: [{ id: 'Int!' }, 'UserDto!'],
    createRole: [{ input: 'CreateRoleInput!' }, 'RoleDto!'],
    updateRole: [{ id: 'Int!', input: 'UpdateRoleInput!' }, 'RoleDto!'],
    removeRole: [{ id: 'Int!' }, 'RoleDto!'],
    createPermission: [{ input: 'CreatePermissionInput!' }, 'PermissionDto!'],
    updatePermission: [{ id: 'Int!', input: 'UpdatePermissionInput!' }, 'PermissionDto!'],
    removePermission: [{ id: 'Int!' }, 'PermissionDto!'],

    addParticipant: [{ name: 'String!' }, 'Participant!'],
    removeParticipant: [{ name: 'String!' }, 'Participant!'],
    setWinnersCount: [{ 'first?': 'Int!', 'second?': 'Int!', 'third?': 'Int!' }, 'void'],
    draw: [{ count: 'Int!', level: 'Int!' }, '[Participant!]!'],
    reset: [{}, 'void'],
  },
});
