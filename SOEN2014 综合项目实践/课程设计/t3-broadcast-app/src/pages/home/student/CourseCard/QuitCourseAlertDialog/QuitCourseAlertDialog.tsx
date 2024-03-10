import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { useRef } from 'react';

import { api } from '@/utils/api';

import type { Course } from '@prisma/client';

export interface QuitCourseAlertDialogProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const QuitCourseAlertDialog: React.FC<QuitCourseAlertDialogProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const utils = api.useContext();
  const { mutate: quitCourse } = api.course.quit.useMutation();

  const onDelete = () => {
    quitCourse(course.id, {
      onSuccess: () => {
        onClose();
        void utils.user.getCourses.invalidate();
      },
    });
  };

  return (
    <AlertDialog
      isOpen={isOpen}
      leastDestructiveRef={cancelRef}
      onClose={onClose}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            退出课程
          </AlertDialogHeader>

          <AlertDialogBody>你确定要退出课程 {course.name} 吗？</AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              确认
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default QuitCourseAlertDialog;
