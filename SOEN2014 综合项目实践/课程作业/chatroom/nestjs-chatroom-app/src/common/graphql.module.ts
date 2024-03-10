import { join } from 'node:path';

import { ApolloDriver } from '@nestjs/apollo';
import { Global, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

import type { ApolloDriverConfig } from '@nestjs/apollo';

import { PUB_SUB } from '@/constants/graphql';

@Global()
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      context: ({ connectionParams, extra, req }) => ({ connectionParams, extra, req }),
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
  providers: [{ provide: PUB_SUB, useValue: new PubSub() }],
  exports: [PUB_SUB],
})
export class GraphqlModule {}
