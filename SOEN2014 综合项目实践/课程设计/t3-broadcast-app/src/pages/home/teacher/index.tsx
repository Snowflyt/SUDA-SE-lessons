import { Button, Tab, TabList, Tabs, useDisclosure } from '@chakra-ui/react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

import CourseCard from './CourseCard';
import CreateCourseModal from './CreateCourseModal';

const TeacherHome: React.FC = () => {
  const { data: courses } = api.user.getCourses.useQuery();

  const {
    isOpen: isCreateCourseModalOpen,
    onClose: onCreateCourseModalClose,
    onOpen: onCreateCourseModalOpen,
  } = useDisclosure();

  const searchInput = useReactiveValue('');

  return (
    <>
      <CreateCourseModal
        isOpen={isCreateCourseModalOpen}
        onClose={onCreateCourseModalClose}
      />

      <div className="flex h-12 w-full flex-row items-center space-x-2 px-8 shadow">
        <div className="flex w-full flex-row justify-start">
          <Tabs colorScheme="blue">
            <TabList>
              <Tab>我教的课</Tab>
            </TabList>
          </Tabs>
        </div>
        <div className="flex w-full flex-row justify-end space-x-2">
          <Button
            variant="ghost"
            fontWeight="normal"
            onClick={onCreateCourseModalOpen}>
            ＋创建课程
          </Button>
        </div>
      </div>
      <div className="h-full space-y-8 px-8 py-6">
        <Reactive.SearchInput model={searchInput} placeholder="搜索课程" />
        <div className="mt-4 grid grid-cols-3 gap-4">
          {courses
            ?.filter((course) => course.name.includes(searchInput.value))
            .map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
        </div>
      </div>
    </>
  );
};

export default TeacherHome;
