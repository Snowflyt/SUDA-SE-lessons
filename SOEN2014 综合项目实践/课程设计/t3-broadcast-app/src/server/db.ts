import { PrismaClient } from '@prisma/client';
import { parseISO } from 'date-fns';

import { Roles } from '@/constants/auth';
import { env } from '@/env.mjs';
import { hash } from '@/utils/crypto';

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  });

if (env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

// Insert default user if none exists
void (async () => {
  const adminUser = await prisma.user.findUnique({
    where: { username: 'admin' },
  });
  if (adminUser === null)
    await prisma.user.create({
      data: {
        username: 'admin',
        password: hash('admin'),
        role: Roles.ADMIN,
      },
    });

  let testTeacher = await prisma.user.findUnique({
    where: { username: 'tea' },
  });
  if (testTeacher === null)
    testTeacher = await prisma.user.create({
      data: {
        username: 'tea',
        name: '教师1',
        password: hash('123456'),
        role: Roles.TEACHER,
      },
    });

  let testStudent = await prisma.user.findUnique({
    where: { username: 'stu' },
  });
  if (testStudent === null)
    testStudent = await prisma.user.create({
      data: {
        studentNumber: '2011111111',
        username: 'stu',
        name: '学生1',
        password: hash('123456'),
        role: Roles.STUDENT,
      },
    });

  const courses = await prisma.course.findMany({
    where: { name: '测试课程' },
  });
  const testCourse =
    courses[0] ??
    (await prisma.course.create({
      data: {
        name: '测试课程',
        teacherId: testTeacher.id,
        startDate: parseISO('2023-02-01'),
        endDate: parseISO('2023-06-15'),
        invitationCode: hash('123456'),
      },
    }));

  await prisma.course.update({
    where: { id: testCourse.id },
    data: {
      students: {
        connect: { id: testStudent.id },
      },
    },
  });
})();
