/* eslint-disable sonarjs/no-duplicate-string */

import { infer, schema } from 'graphql-intuitive-request';

export const $ = schema({
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

  Chatroom: {
    id: 'Int!',
    name: 'String!',
    messages: '[Message!]!',
    users: '[UserDto!]!',
  },
  Message: {
    mentioned: 'UserDto',
    sender: 'UserDto!',
    text: 'String!',
    timestamp: 'DateTime!',
  },

  CreateChatroomInput: {
    name: 'String!',
  },
  CreateMessageInput: {
    mentionedId: 'Int',
    text: 'String!',
  },

  Query: {
    me: [{}, 'UserDto!'],
    user: [{ id: 'Int!' }, 'UserDto!'],
    users: [{}, '[UserDto!]!'],
    role: [{ id: 'Int!' }, 'RoleDto!'],
    roles: [{}, '[RoleDto!]!'],
    permission: [{ id: 'Int!' }, 'PermissionDto!'],
    permissions: [{}, '[PermissionDto!]!'],

    chatroom: [{ id: 'Int!' }, 'Chatroom!'],
    chatrooms: [{}, '[Chatroom!]!'],
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

    createChatroom: [{ input: 'CreateChatroomInput!' }, 'Chatroom!'],
    joinChatroom: [{ id: 'Int!' }, 'Chatroom!'],
    quitChatroom: [{ id: 'Int!' }, 'Chatroom!'],
    addMessage: [{ chatroomId: 'Int!', input: 'CreateMessageInput!' }, 'Message!'],
  },

  Subscription: {
    messageAdded: [{ chatroomId: 'Int!' }, 'Message!'],
  },
});

const $$ = infer($);

export type UserDto = typeof $$.UserDto;

export type Chatroom = typeof $$.Chatroom;
export type Message = typeof $$.Message;

export type CreateChatroomInput = typeof $$.CreateChatroomInput;
