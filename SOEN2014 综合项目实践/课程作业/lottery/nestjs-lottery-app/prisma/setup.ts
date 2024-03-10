import { PrismaClient } from '@prisma/client';

import { encryptPassword } from '../src/utils/auth';

const ADMIN_ROLE_NAME = 'admin';
const USER_ROLE_NAME = 'user';

const prisma = new PrismaClient();

void (async () => {
  await prisma.role.upsert({
    where: { name: ADMIN_ROLE_NAME },
    create: {
      name: ADMIN_ROLE_NAME,
      description: '',
    },
    update: {},
  });
  await prisma.role.upsert({
    where: { name: USER_ROLE_NAME },
    create: {
      name: USER_ROLE_NAME,
      description: '',
    },
    update: {},
  });

  await prisma.user.upsert({
    where: { username: process.env['TEST_ADMIN_USERNAME'] },
    create: {
      username: process.env['TEST_ADMIN_USERNAME'],
      password: await encryptPassword(process.env['TEST_ADMIN_PASSWORD']),
      roles: {
        connect: { name: ADMIN_ROLE_NAME },
      },
    },
    update: {
      password: await encryptPassword(process.env['TEST_ADMIN_PASSWORD']),
      roles: {
        connect: { name: ADMIN_ROLE_NAME },
      },
    },
  });
})();
