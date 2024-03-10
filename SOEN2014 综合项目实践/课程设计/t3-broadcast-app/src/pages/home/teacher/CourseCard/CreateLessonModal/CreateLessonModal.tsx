import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { useRouter } from 'next/router';
import { useReactiveStore, useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import globalStore from '@/store/global';
import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import type { Course } from '@prisma/client';

export interface CreateLessonModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const CreateLessonModal: React.FC<CreateLessonModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const router = useRouter();

  const globalState = useReactiveStore(globalStore);

  const name = useReactiveValue(format(new Date(), 'M月d日授课'));

  const utils = api.useContext();
  const { mutateAsync: createLesson } = api.lesson.create.useMutation();

  const toast = useToast();

  const onCreate = wrapAsyncCallback(async () => {
    const lesson = await createLesson({
      name: name.value,
      courseId: course.id,
    });
    toast({
      title: '创建成功',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    await utils.course.getCurrentLesson.invalidate(course.id);
    onClose();
    const roomId = lesson.roomId!;
    globalState.roomId = roomId;
    globalState.menuTabIndex = 1;
    await router.push(`/live/${roomId}`);
  });

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>创建直播</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex w-full flex-col space-y-4 p-6">
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">标题</Text>
            <Reactive.Input model={name}></Reactive.Input>
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onCreate}>
            确认
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateLessonModal;
