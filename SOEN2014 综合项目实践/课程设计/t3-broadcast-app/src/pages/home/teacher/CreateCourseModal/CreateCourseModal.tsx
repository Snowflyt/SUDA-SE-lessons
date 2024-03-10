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
  useDisclosure,
} from '@chakra-ui/react';
import { parseISO } from 'date-fns';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import InvitationCodeAlertDialog from './InvitationCodeAlertDialog';

export interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
}) => {
  const name = useReactiveValue('');
  const description = useReactiveValue('');
  const startDate = useReactiveValue('');
  const endDate = useReactiveValue('');

  const utils = api.useContext();
  const { data: invitationCode, mutate: createCourse } =
    api.course.create.useMutation();

  const {
    isOpen: isInvitationCodeAlertDialogOpen,
    onClose: onInvitationCodeAlertDialogClose,
    onOpen: onInvitationCodeAlertDialogOpen,
  } = useDisclosure();

  const onCreate = () => {
    createCourse(
      {
        name: name.value,
        description: description.value,
        startDate: parseISO(startDate.value),
        endDate: parseISO(endDate.value),
      },
      {
        onSuccess: () => {
          onClose();
          onInvitationCodeAlertDialogOpen();
          void utils.user.getCourses.invalidate();
        },
      },
    );
  };

  return (
    <>
      <InvitationCodeAlertDialog
        invitationCode={invitationCode!}
        isOpen={isInvitationCodeAlertDialogOpen}
        onClose={onInvitationCodeAlertDialogClose}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>创建课程</ModalHeader>
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
            <Button colorScheme="blue" mr={3} onClick={onCreate}>
              创建
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateCourseModal;
