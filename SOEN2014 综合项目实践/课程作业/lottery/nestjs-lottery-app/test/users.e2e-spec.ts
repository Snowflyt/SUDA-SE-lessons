import { ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';

import {
  CREATE_USER_MUTATION,
  CREATE_USER_OPERATION_NAME,
  generateCreateUserVariables,
} from './helpers/create-user.helper';
import { DELETE_USER_MUTATION, DELETE_USER_OPERATION_NAME } from './helpers/delete-user.helper';
import {
  GET_USER_OPERATION_NAME,
  GET_USER_QUERY,
  generateGetUserVariable,
} from './helpers/get-user.helper';
import { GET_USERS_OPERATION_NAME, GET_USERS_QUERY } from './helpers/get-users.helper';
import {
  LOGIN_USER_MUTATION,
  LOGIN_USER_OPERATION_NAME,
  generateLoginVariables,
} from './helpers/login.helper';
import {
  UPDATE_USER_MUTATION,
  UPDATE_USER_OPERATION_NAME,
  generateUpdateUserVariables,
} from './helpers/update-user.helper';

import type { LoginOutput } from '@/users/dto/login.output';
import type { INestApplication } from '@nestjs/common';
import type { TestingModule } from '@nestjs/testing';
import type { Role, User } from '@prisma/client';

import { AppModule } from '@/app.module';

const GRAPHQL_ENDPOINT = '/graphql';

describe('Users resolver (e2e)', () => {
  let app: INestApplication;
  let user: User & { roles: Role[] };
  let BEARER_JWT: string;
  let USER_PASSWORD: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    // Login test admin user
    const configService = app.get<ConfigService>(ConfigService);
    const response = await request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        operationName: LOGIN_USER_OPERATION_NAME,
        query: LOGIN_USER_MUTATION,
        variables: generateLoginVariables({
          username: configService.get<string>('TEST_ADMIN_USERNAME'),
          password: configService.get<string>('TEST_ADMIN_PASSWORD'),
        }),
      });
    expect(response.status).toBe(200);
    const loginOutput = response.body?.data?.[LOGIN_USER_OPERATION_NAME] as LoginOutput;
    expect(loginOutput).toBeDefined();
    const token = loginOutput.token;
    expect(token).toBeDefined();

    BEARER_JWT = `Bearer ${token}`;
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create an user with user mutation', () => {
    const { input } = generateCreateUserVariables();
    USER_PASSWORD = input.password;

    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: CREATE_USER_OPERATION_NAME,
        query: CREATE_USER_MUTATION,
        variables: { input },
      })
      .expect(200)
      .expect((res) => {
        user = res.body.data[CREATE_USER_OPERATION_NAME];
        expect(user).toBeDefined();
        expect(user.id).toBeDefined();
        expect(user.username).toBe(input.username);
        expect(user.roles.map((role) => role.name)).toEqual(input.roleNames);
      });
  });

  it('should login the new user with login user mutation', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .send({
        operationName: LOGIN_USER_OPERATION_NAME,
        query: LOGIN_USER_MUTATION,
        variables: generateLoginVariables({
          username: user.username,
          password: USER_PASSWORD,
        }),
      })
      .expect(200)
      .expect((res) => {
        const loginOutput = res.body.data[LOGIN_USER_OPERATION_NAME] as LoginOutput;
        expect(loginOutput).toBeDefined();
        const token = loginOutput.token;
        expect(token).toBeDefined();

        BEARER_JWT = `Bearer ${token}`;
      });
  });

  it('should get the user by the generated userId', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: GET_USER_OPERATION_NAME,
        query: GET_USER_QUERY,
        variables: generateGetUserVariable({ id: user.id }),
      })
      .expect(200)
      .expect((res) => {
        const fetchedUser = res.body.data[GET_USER_OPERATION_NAME] as User & { roles: Role[] };
        expect(fetchedUser).toBeDefined();
        expect(fetchedUser.id).toBeDefined();
        expect(fetchedUser.username).toBe(fetchedUser.username);
        expect(fetchedUser.roles.map((role) => role.name)).toEqual(
          user.roles.map((role) => role.name),
        );
      });
  });

  it('should update the user', () => {
    const updatedUsername = 'John Doe';
    const { id, input } = generateUpdateUserVariables({
      id: user.id,
      username: updatedUsername,
    });

    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: UPDATE_USER_OPERATION_NAME,
        query: UPDATE_USER_MUTATION,
        variables: { id, input },
      })
      .expect(200)
      .expect((res) => {
        const updatedUser = res.body.data[UPDATE_USER_OPERATION_NAME] as User & { roles: Role[] };
        expect(updatedUser).toBeDefined();
        expect(updatedUser.id).toBeDefined();
        expect(updatedUser.username).toBe(updatedUsername);
        user = { ...updatedUser };
      });
  });

  it('should not be able to update an user with different id', () => {
    const updatedUsername = 'John Doe';
    const { id, input } = generateUpdateUserVariables({
      id: 114514,
      username: updatedUsername,
    });

    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: UPDATE_USER_OPERATION_NAME,
        query: UPDATE_USER_MUTATION,
        variables: { id, input },
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors.length).toBe(1);
      });
  });

  it('should list users', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: GET_USERS_OPERATION_NAME,
        query: GET_USERS_QUERY,
      })
      .expect(200)
      .expect((res) => {
        const users = res.body.data[GET_USERS_OPERATION_NAME] as User[];
        expect(users).toBeDefined();
        expect(users[0].username).toBeDefined();
      });
  });

  it('should remove our testing user by id', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: DELETE_USER_OPERATION_NAME,
        query: DELETE_USER_MUTATION,
        variables: generateGetUserVariable({ id: user.id }),
      })
      .expect(200)
      .expect((res) => {
        const removedUser = res.body.data[DELETE_USER_OPERATION_NAME] as User;
        expect(removedUser).toBeDefined();
        expect(removedUser.id).toBeDefined();
      });
  });

  it('should not be able to get the user after it was deleted', () => {
    return request(app.getHttpServer())
      .post(GRAPHQL_ENDPOINT)
      .set('Authorization', BEARER_JWT)
      .send({
        operationName: GET_USER_OPERATION_NAME,
        query: GET_USER_QUERY,
        variables: generateGetUserVariable({ id: user.id }),
      })
      .expect(200)
      .expect((res) => {
        expect(res.body.errors).toBeDefined();
        expect(res.body.errors.length).toBe(1);
        expect(res.body.errors[0].message).toBe(`User(id=${user.id}) not found`);
      });
  });
});
