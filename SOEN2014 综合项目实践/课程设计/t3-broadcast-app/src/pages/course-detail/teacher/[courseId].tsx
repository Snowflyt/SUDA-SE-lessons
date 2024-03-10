import { Avatar, HStack, Tab, TabList, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

import LearningResourcesPage from './learning-resources';
import MemberManagementPage from './member-management';
import QuizzesPage from './quizzes';

import type { Course } from '@prisma/client';
import type { NextPage } from 'next';

const TeacherCourseDetailPage: NextPage = () => {
  const {
    query: { courseId },
  } = useRouter() as unknown as { query: { courseId: string | undefined } };

  const { data: students } = api.course.getStudents.useQuery(courseId);

  const tabIndex = useReactiveValue(0);

  const utils = api.useContext();

  const course = useReactiveValue<Course | null>(null);

  useEffect(() => {
    if (!courseId) return;
    void utils.course.getById.fetch(courseId).then((c) => {
      course.value = c;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  return (
    <>
      <VStack
        className="space-y-4"
        px="5"
        pt="5"
        alignItems="start"
        w="full"
        shadow="base">
        <Text fontWeight="bold" fontSize="xl">
          {course.value?.name}
        </Text>
        <HStack>
          <Avatar size="2xs" />
          <Text fontSize="sm">{students?.length}</Text>
        </HStack>
        <Reactive.Tabs model={tabIndex}>
          <TabList>
            <Tab>学习资源</Tab>
            <Tab>题库</Tab>
            <Tab>成员管理</Tab>
          </TabList>
        </Reactive.Tabs>
      </VStack>

      <div className="flex h-[calc(100%-9rem)] w-full flex-col items-center bg-[#f5f5f5] p-4">
        {course.value &&
          (tabIndex.value === 0 ? (
            <LearningResourcesPage course={course.value} />
          ) : tabIndex.value === 1 ? (
            <QuizzesPage course={course.value} />
          ) : (
            <MemberManagementPage course={course.value} />
          ))}
      </div>
    </>
  );
};

export default TeacherCourseDetailPage;
