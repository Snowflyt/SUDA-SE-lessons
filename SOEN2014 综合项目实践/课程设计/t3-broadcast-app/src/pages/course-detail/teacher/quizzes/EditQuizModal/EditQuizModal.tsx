import { AddIcon, DeleteIcon } from '@chakra-ui/icons';
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
  TableContainer,
  Table,
  Tr,
  Thead,
  Th,
  Tbody,
  Td,
  Checkbox,
  Input,
  IconButton,
  Center,
} from '@chakra-ui/react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import type { Choice, Course, Quiz } from '@prisma/client';

export interface EditQuizModalProps {
  course: Course;
  quiz: Quiz & { choices: Choice[] };
  isOpen: boolean;
  onClose: () => void;
}

const EditQuizModal: React.FC<EditQuizModalProps> = ({
  course,
  isOpen,
  onClose,
  quiz,
}) => {
  const utils = api.useContext();
  const { mutateAsync: updateQuiz } = api.quiz.update.useMutation();

  const name = useReactiveValue(quiz.name);
  const classification = useReactiveValue(quiz.classification);
  const description = useReactiveValue(quiz.description);

  const choices = useReactiveValue<
    Array<{
      description: string;
      isAnswer: boolean;
    }>
  >(
    quiz.choices.map((choice) => ({
      description: choice.description,
      isAnswer: choice.isAnswer,
    })),
  );

  const currentOptionDescription = useReactiveValue('');
  const isCurrentOptionAnswer = useReactiveValue(false);

  const toast = useToast();

  const onUpdate = wrapAsyncCallback(async () => {
    await updateQuiz({
      id: quiz.id,
      courseId: course.id,
      name: name.value,
      classification: classification.value,
      description: description.value,
      choices: choices.value,
    });
    toast({
      title: '修改成功',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
    await utils.course.getQuizzes.invalidate(course.id);
    onClose();
  });

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>修改题目</ModalHeader>
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
              <Text fontWeight="bold">题目</Text>
              <Reactive.Input model={description} />
            </VStack>
            <VStack className="space-y-2" alignItems="start">
              <Text fontWeight="bold">选项</Text>
              <TableContainer w="full">
                <Table variant="simple">
                  <Thead>
                    <Tr>
                      <Th>序号</Th>
                      <Th>描述</Th>
                      <Th>是否为答案</Th>
                      <Th>操作</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {choices.value.map((choice, index) => (
                      <Tr key={index}>
                        <Td>
                          {String.fromCharCode(index + 'A'.charCodeAt(0))}
                        </Td>
                        <Td>
                          <Input
                            variant="ghost"
                            pl="-4"
                            value={choice.description}
                            onChange={(e) => {
                              choice.description = e.target.value;
                            }}
                          />
                        </Td>
                        <Td>
                          <Center>
                            <Checkbox
                              isChecked={choice.isAnswer}
                              onChange={(e) => {
                                choice.isAnswer = e.target.checked;
                              }}
                            />
                          </Center>
                        </Td>
                        <Td>
                          <IconButton
                            ml="-2"
                            variant="ghost"
                            aria-label="删除选项"
                            icon={<DeleteIcon color="red.600" />}
                            onClick={() => {
                              choices.value.splice(index, 1);
                            }}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              </TableContainer>
              <HStack w="full">
                <Reactive.Input
                  model={currentOptionDescription}
                  placeholder="请输入选项描述"
                />
                <Reactive.Checkbox
                  w="28"
                  model={isCurrentOptionAnswer}
                  fontSize="sm"
                  fontColor="gray.600">
                  答案
                </Reactive.Checkbox>
                <IconButton
                  aria-label="添加选项"
                  icon={<AddIcon color="blue.600" />}
                  onClick={() => {
                    choices.value.push({
                      description: currentOptionDescription.value,
                      isAnswer: isCurrentOptionAnswer.value,
                    });
                    currentOptionDescription.value = '';
                    isCurrentOptionAnswer.value = false;
                  }}
                />
              </HStack>
            </VStack>
          </ModalBody>

          <ModalFooter className="space-x-2">
            <Button variant="ghost" onClick={onClose}>
              取消
            </Button>
            <Button colorScheme="blue" mr="3" onClick={onUpdate}>
              确认
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditQuizModal;
