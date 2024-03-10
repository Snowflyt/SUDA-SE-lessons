import {
  Badge,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

import type { Course } from '@prisma/client';

export interface EditCourseModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const EditCourseModal: React.FC<EditCourseModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const name = useReactiveValue(course.name);
  const description = useReactiveValue(course.description);
  const startDate = useReactiveValue(format(course.startDate, 'yyyy-MM-dd'));
  const endDate = useReactiveValue(format(course.endDate, 'yyyy-MM-dd'));

  const utils = api.useContext();
  const { mutate: updateCourse } = api.course.update.useMutation();

  const onUpdate = () => {
    updateCourse(
      {
        id: course.id,
        name: name.value,
        description: description.value,
        startDate: parseISO(startDate.value),
        endDate: parseISO(endDate.value),
      },
      {
        onSuccess: () => {
          onClose();
          void utils.user.getCourses.invalidate();
        },
      },
    );
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>编辑课程</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex w-full flex-col space-y-4 p-6">
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">
              课程名称<Badge colorScheme="red">必填</Badge>
            </Text>
            <Reactive.Input model={name}></Reactive.Input>
          </div>
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">
              课程描述<Badge colorScheme="green">选填</Badge>
            </Text>
            <Reactive.Input model={description}></Reactive.Input>
          </div>
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">
              开始日期<Badge colorScheme="red">必填</Badge>
            </Text>
            <Reactive.Input
              placeholder="选择日期"
              type="date"
              model={startDate}
            />
          </div>
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">
              结束日期<Badge colorScheme="red">必填</Badge>
            </Text>
            <Reactive.Input
              placeholder="选择日期"
              type="date"
              model={endDate}
            />
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onUpdate}>
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCourseModal;
