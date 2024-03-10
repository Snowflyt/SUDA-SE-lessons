import { PrismaClient } from '@prisma/client';

import { encryptPassword } from '../src/utils/auth';

const prisma = new PrismaClient();

void (async () => {
  const createUserPermission = await prisma.permission.create({
    data: {
      name: 'CREATE_USER',
      description: '',
    },
  });

  const updateUserPermission = await prisma.permission.create({
    data: {
      name: 'UPDATE_USER',
      description: '',
    },
  });

  await prisma.role.create({
    data: {
      name: 'admin',
      description: '',
      permissions: {
        connect: [createUserPermission, updateUserPermission],
      },
    },
  });

  await prisma.user.upsert({
    where: { username: process.env['TEST_ADMIN_USERNAME'] },
    create: {
      username: process.env['TEST_ADMIN_USERNAME'],
      password: await encryptPassword(process.env['TEST_ADMIN_PASSWORD']),
      roles: {
        connect: { name: 'admin' },
      },
    },
    update: {
      password: await encryptPassword(process.env['TEST_ADMIN_PASSWORD']),
      roles: {
        connect: { name: 'admin' },
      },
    },
  });
})();
