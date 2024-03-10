import {
  Avatar,
  Button,
  Card,
  HStack,
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
import Link from 'next/link';
import { useRouter } from 'next/router';

import { api } from '@/utils/api';
import { hashSelect } from '@/utils/hash';

import QuitCourseAlertDialog from './QuitCourseAlertDialog';

import type { Course } from '@prisma/client';

const colors = ['#4d7ff6', '#2ecdaa', '#ff7889', '#9b6ffb'];
const selectColor = hashSelect(colors);

export interface CourseCardProps {
  course: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
  const router = useRouter();

  const { data: teacher } = api.course.getTeacher.useQuery(course.id);
  const { data: currentLesson } = api.course.getCurrentLesson.useQuery(
    course.id,
  );

  const isIdle = currentLesson !== undefined && currentLesson === null;

  const {
    isOpen: isQuitCourseAlertDialogOpen,
    onClose: onQuitCourseAlertDialogClose,
    onOpen: onQuitCourseAlertDialogOpen,
  } = useDisclosure();

  return (
    <>
      <QuitCourseAlertDialog
        course={course}
        isOpen={isQuitCourseAlertDialogOpen}
        onClose={onQuitCourseAlertDialogClose}
      />

      <LinkBox>
        <Card
          className="space-y-10"
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
            <LinkOverlay as={Link} href={`/course-detail/student/${course.id}`}>
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
                    bg: '#feedec',
                    textColor: '#f84f41',
                  }}
                  onClick={onQuitCourseAlertDialogOpen}>
                  退出
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
                  ? // eslint-disable-next-line @typescript-eslint/no-empty-function
                    () => {}
                  : () =>
                      void router.push(
                        `/live/student/${currentLesson!.roomId!}`,
                      )
              }>
              {isIdle ? '' : '进入直播间'}
            </Button>
          </HStack>
          <HStack pr="3">
            <Avatar size="sm" />
            <Text>{teacher?.name}</Text>
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
