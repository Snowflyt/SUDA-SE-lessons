import {
  Avatar,
  Button,
  Card,
  HStack,
  Link,
  LinkBox,
  LinkOverlay,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Spacer,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';

import { api } from '@/utils/api';
import { hashSelect } from '@/utils/hash';

import CreateLessonModal from './CreateLessonModal';
import DeleteCourseAlertDialog from './DeleteCourseAlertDialog';
import EditCourseModal from './EditCourseModal';

import type { Course } from '@prisma/client';

const colors = ['#4d7ff6', '#2ecdaa', '#ff7889', '#9b6ffb'];
const selectColor = hashSelect(colors);

export interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

  const { data: students } = api.course.getStudents.useQuery(course.id);
  const { data: currentLesson } = api.course.getCurrentLesson.useQuery(
    course.id,
  );

  const {
    isOpen: isEditCourseModalOpen,
    onClose: onEditCourseModalClose,
    onOpen: onEditCourseModalOpen,
  } = useDisclosure();
  const {
    isOpen: isDeleteCourseAlertDialogOpen,
    onClose: onDeleteCourseAlertDialogClose,
    onOpen: onDeleteCourseAlertDialogOpen,
  } = useDisclosure();
  const {
    isOpen: isCreateLessonModalOpen,
    onClose: onCreateLessonModalClose,
    onOpen: onCreateLessonModalOpen,
  } = useDisclosure();

  const isIdle = currentLesson !== undefined && currentLesson === null;

  return (
    <>
      <EditCourseModal
        course={course}
        isOpen={isEditCourseModalOpen}
        onClose={onEditCourseModalClose}
      />
      <DeleteCourseAlertDialog
        course={course}
        isOpen={isDeleteCourseAlertDialogOpen}
        onClose={onDeleteCourseAlertDialogClose}
      />
      <CreateLessonModal
        course={course}
        isOpen={isCreateLessonModalOpen}
        onClose={onCreateLessonModalClose}
      />

      <LinkBox>
        <Card
          className="space-y-3"
          bgColor={selectColor(course.name)}
          key={course.id}
          display="flex"
          flexDir="column"
          justifyContent="space-between"
          p="4"
          rounded="base"
          shadow="xs"
          textColor="white"
          _hover={{
            cursor: 'pointer',
            shadow: 'base',
            transform: 'translateY(-0.15rem)',
          }}
          transition="all 0.2s">
          <HStack>
            <LinkOverlay as={Link} href={`/course-detail/teacher/${course.id}`}>
              <Text fontSize="lg">{course.name}</Text>
            </LinkOverlay>
            <Spacer />
            <Popover trigger="hover">
              <PopoverTrigger>
                <Button
                  variant="unstyled"
                  fontWeight="bold"
                  fontSize="2xl"
                  transform="rotateX(180deg)">
                  ...
                </Button>
              </PopoverTrigger>
              <PopoverContent
                w="16"
                mt="-4"
                py="2"
                textColor="gray.900"
                rounded="base">
                <Button
                  w="full"
                  h="8"
                  rounded="none"
                  bg="transparent"
                  fontSize="sm"
                  fontWeight="normal"
                  _hover={{
                    bg: '#edf4fe',
                    textColor: '#5096f5',
                  }}
                  onClick={onEditCourseModalOpen}>
                  编辑
                </Button>
                <Button
                  w="full"
                  h="8"
                  rounded="none"
                  bg="transparent"
                  fontSize="sm"
                  fontWeight="normal"
                  _hover={{
                    bg: '#feedec',
                    textColor: '#f84f41',
                  }}
                  onClick={onDeleteCourseAlertDialogOpen}>
                  删除
                </Button>
              </PopoverContent>
            </Popover>
          </HStack>
          <HStack>
            <Spacer />
            <Button
              variant="ghost"
              size="sm"
              onClick={
                isIdle
                  ? onCreateLessonModalOpen
                  : () =>
                      void router.push(
                        `/live/teacher/${currentLesson!.roomId!}`,
                      )
              }>
              {isIdle ? '上课' : '进入直播间'}
            </Button>
          </HStack>
          <HStack pr="3">
            <Avatar size="2xs" />
            <Text>{students?.length}</Text>
            <Spacer />
            <Text fontSize="xs">{`${format(
              course.startDate,
              'yyyy-MM-dd',
            )}~${format(course.endDate, 'yyyy-MM-dd')}`}</Text>
          </HStack>
        </Card>
      </LinkBox>
    </>
  );
};

export default CourseCard;
