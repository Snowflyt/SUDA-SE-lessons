import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  VStack,
  Text,
  useToast,
  HStack,
} from '@chakra-ui/react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { useFileUploader } from '@/hooks';
import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import type { Course } from '@prisma/client';

export interface UploadResourceModalProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
}

const UploadResourceModal: React.FC<UploadResourceModalProps> = ({
  course,
  isOpen,
  onClose,
}) => {
  const utils = api.useContext();
  const { mutateAsync: createCourseWare } = api.courseWare.create.useMutation();
  const { mutateAsync: uploadFile } = api.file.upload.useMutation();

  const name = useReactiveValue('');
  const classification = useReactiveValue('');

  const filename = useReactiveValue('');
  const dataURL = useReactiveValue('');

  const { fileInput, openDialog } = useFileUploader({
    onUpload: (file, data) => {
      filename.value = file.name;
      dataURL.value = data;
    },
  });

  const toast = useToast();

  const onUpload = wrapAsyncCallback(async () => {
    const fileModel = await uploadFile({
      filename: filename.value,
      dataURL: dataURL.value,
    });
    await createCourseWare({
      name: name.value,
      classification: classification.value,
      fileId: fileModel.id,
      courseId: course.id,
    });
    toast({
      title: '上传成功',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    await utils.course.getCourseWares.invalidate(course.id);
    onClose();
  });

  return (
    <>
      {fileInput}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>上传资源</ModalHeader>
          <ModalCloseButton />
          <ModalBody
            className="space-y-4"
            display="flex"
            flexDir="column"
            w="full"
            p="6">
            <VStack className="space-y-2" alignItems="start">
              <Text fontWeight="bold">名称</Text>
              <Reactive.Input model={name} />
            </VStack>
            <VStack className="space-y-2" alignItems="start">
              <Text fontWeight="bold">类别</Text>
              <Reactive.Input model={classification} />
            </VStack>
            <VStack className="space-y-2" alignItems="start">
              <Text fontWeight="bold">文件</Text>
              <HStack w="full">
                <Reactive.Input model={filename} isDisabled />
                <Button onClick={openDialog}>选择文件</Button>
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <Button variant="ghost" onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="blue" mr="3" onClick={onUpload}>
              上传
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default UploadResourceModal;
