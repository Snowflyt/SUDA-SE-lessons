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
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

export interface JoinCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const JoinCourseModal: React.FC<JoinCourseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const invitationCode = useReactiveValue('');

  const utils = api.useContext();
  const { mutate: joinCourse } = api.course.join.useMutation();

  const toast = useToast();

  const onJoin = () => {
    joinCourse(invitationCode.value, {
      onSuccess: (course) => {
        if (course === null) {
          toast({
            title: '无效的邀请码',
            status: 'error',
          });
          return;
        }

        toast({
          title: `加入课程 ${course.name}`,
          status: 'success',
        });
        onClose();
        void utils.user.getCourses.invalidate();
      },
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>加入课程</ModalHeader>
        <ModalCloseButton />
        <ModalBody className="flex w-full flex-col space-y-4 p-6">
          <div className="flex flex-col space-y-2">
            <Text fontWeight="bold">课程邀请码</Text>
            <Reactive.Input model={invitationCode}></Reactive.Input>
          </div>
        </ModalBody>

        <ModalFooter className="space-x-2">
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button colorScheme="blue" mr={3} onClick={onJoin}>
            加入
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default JoinCourseModal;
