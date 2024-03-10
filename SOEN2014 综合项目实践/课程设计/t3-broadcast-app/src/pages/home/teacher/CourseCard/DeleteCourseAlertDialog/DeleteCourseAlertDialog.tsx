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

export interface DeleteCourseAlertDialogProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const DeleteCourseAlertDialog: React.FC<DeleteCourseAlertDialogProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const cancelRef = useRef<HTMLButtonElement | null>(null);

  const utils = api.useContext();
  const { mutate: deleleCourse } = api.course.delete.useMutation();

  const onDelete = () => {
    deleleCourse(course.id, {
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
            删除课程
          </AlertDialogHeader>

          <AlertDialogBody>
            你确定要删除课程 {course.name} 吗？此操作不可撤销。
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              删除
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteCourseAlertDialog;
