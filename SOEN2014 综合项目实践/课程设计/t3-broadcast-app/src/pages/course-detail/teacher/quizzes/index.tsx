import {
  AddIcon,
  DeleteIcon,
  EditIcon,
  HamburgerIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react';
import { type Course, type Quiz, type Choice } from '@prisma/client';
import * as R from 'ramda';
import { useReactiveValue } from 'react-reactive-hooks';

import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import CreateQuizModal from './CreateQuizModal';
import EditQuizModal from './EditQuizModal';

import type { NextPage } from 'next';

export interface QuizzesPageProps {
  course: Course;
}

const QuizzesPage: NextPage<QuizzesPageProps> = ({ course }) => {
  const utils = api.useContext();
  const { data: quizzes } = api.course.getQuizzes.useQuery(course.id);
  const { mutateAsync: deleteQuiz } = api.quiz.delete.useMutation();

  const {
    isOpen: isCreateQuizModalOpen,
    onClose: onCloseCreateQuizModal,
    onOpen: onOpenCreateQuizModal,
  } = useDisclosure();
  const {
    isOpen: isEditQuizModalOpen,
    onClose: onCloseEditQuizModal,
    onOpen: onOpenEditQuizModal,
  } = useDisclosure();

  const selectedQuiz = useReactiveValue<(Quiz & { choices: Choice[] }) | null>(
    null,
  );

  return (
    <Box h="full" w="full" rounded="lg" border="gray" bg="white" shadow="base">
      <CreateQuizModal
        course={course}
        isOpen={isCreateQuizModalOpen}
        onClose={onCloseCreateQuizModal}
      />
      {selectedQuiz.value && (
        <EditQuizModal
          course={course}
          quiz={selectedQuiz.value}
          isOpen={isEditQuizModalOpen}
          onClose={onCloseEditQuizModal}
        />
      )}

      <VStack alignItems="start" p="5">
        <HStack>
          <Button colorScheme="blue" size="sm" onClick={onOpenCreateQuizModal}>
            <AddIcon mr="1" />
            新建题目
          </Button>
        </HStack>
        {Object.entries(R.groupBy(R.prop('classification'), quizzes ?? [])).map(
          ([classification, quizzes]) => (
            <Box key={classification} w="full" fontSize="sm">
              <HStack w="full">
                <TriangleDownIcon />
                <Text>{classification}</Text>
                <Spacer />
                <IconButton
                  variant="unstyled"
                  aria-label="删除类别"
                  size="sm"
                  icon={<DeleteIcon color="red.600" />}
                  onClick={wrapAsyncCallback(async () => {
                    await deleteQuiz({
                      classification,
                      courseId: course.id,
                    });
                    await utils.course.getQuizzes.invalidate(course.id);
                  })}
                />
              </HStack>
              {quizzes.map((quiz) => (
                <VStack key={quiz.id} alignItems="start">
                  <HStack w="full" pl="4">
                    <TriangleDownIcon />
                    <HamburgerIcon />
                    <Text>{quiz.name}</Text>
                    <Spacer />
                    <IconButton
                      variant="unstyled"
                      aria-label="删除"
                      size="sm"
                      icon={<DeleteIcon color="red.600" />}
                      onClick={wrapAsyncCallback(async () => {
                        await deleteQuiz({ id: quiz.id });
                        await utils.course.getQuizzes.invalidate(course.id);
                      })}
                    />
                    <IconButton
                      variant="unstyled"
                      aria-label="编辑"
                      size="sm"
                      icon={<EditIcon color="green.600" />}
                      onClick={() => {
                        selectedQuiz.value = quiz;
                        onOpenEditQuizModal();
                      }}
                    />
                  </HStack>
                  <Text pl="8" fontWeight="bold">
                    {quiz.description}
                  </Text>
                  <Box className="space-y-1">
                    {quiz.choices.map((choice, index) => (
                      <HStack key={choice.id} w="full" pl="8">
                        <Text
                          textColor={
                            choice.isAnswer ? 'green.600' : 'gray.600'
                          }>
                          {String.fromCharCode(index + 'A'.charCodeAt(0)) +
                            '. ' +
                            choice.description}
                        </Text>
                      </HStack>
                    ))}
                  </Box>
                  <Spacer h="12" />
                </VStack>
              ))}
            </Box>
          ),
        )}
      </VStack>
    </Box>
  );
};

export default QuizzesPage;
