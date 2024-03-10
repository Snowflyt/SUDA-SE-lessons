import { Avatar, HStack, Tab, TabList, Text, VStack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

import LearningResourcesPage from './learning-resources';

import type { Course, User } from '@prisma/client';
import type { NextPage } from 'next';

const TeacherCourseDetailPage: NextPage = () => {
  const {
    query: { courseId },
  } = useRouter() as unknown as { query: { courseId: string | undefined } };

  const tabIndex = useReactiveValue(0);

  const utils = api.useContext();

  const course = useReactiveValue<Course | null>(null);
  const teacher = useReactiveValue<User | null>(null);

  useEffect(() => {
    if (!courseId) return;
    void utils.course.getById.fetch(courseId).then((c) => {
      course.value = c;
    });
    void utils.course.getTeacher.fetch(courseId).then((t) => {
      teacher.value = t;
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
        <HStack>
          <Text fontWeight="bold" fontSize="xl">
            {course.value?.name}
          </Text>
          <Avatar size="xs" />
          <Text fontSize="sm" textColor="gray.500">
            {teacher.value?.name}
          </Text>
        </HStack>
        <Reactive.Tabs model={tabIndex}>
          <TabList>
            <Tab>学习资源</Tab>
          </TabList>
        </Reactive.Tabs>
      </VStack>

      <div className="flex h-[calc(100%-7rem)] w-full flex-col items-center bg-[#f5f5f5] p-4">
        {course.value && <LearningResourcesPage course={course.value} />}
      </div>
    </>
  );
};

export default TeacherCourseDetailPage;
