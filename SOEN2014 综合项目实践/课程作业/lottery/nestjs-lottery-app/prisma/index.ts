import { createSchema } from 'schemix';

console.log('Generating Prisma schema...');

createSchema({
  basePath: __dirname,
  datasource: {
    provider: 'sqlite',
    url: process.env.NODE_ENV === 'test' ? 'file:./test.db' : { env: 'DATABASE_URL' },
  },
  generator: {
    provider: 'prisma-client-js',
  },
}).export(__dirname, 'schema');
