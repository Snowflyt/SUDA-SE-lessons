import { DeleteIcon } from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  Table,
  TableContainer,
  Tbody,
  Th,
  Thead,
  Tr,
  useToast,
} from '@chakra-ui/react';
import { type Course } from '@prisma/client';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';

import type { NextPage } from 'next';

export interface MemberManagementPageProps {
  course: Course;
}

const MemberManagementPage: NextPage<MemberManagementPageProps> = ({
  course,
}) => {
  const utils = api.useContext();
  const { data: students } = api.course.getStudents.useQuery(course.id);
  const { mutateAsync: removeStudent } = api.course.removeStudent.useMutation();

  const searchInput = useReactiveValue('');

  const toast = useToast();

  const handleRemoveStudent = async (studentId: string) => {
    await removeStudent({
      courseId: course.id,
      studentId,
    });
    await utils.course.getStudents.invalidate(course.id);
    toast({
      title: '移除学生成功',
      status: 'success',
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <>
      <Reactive.SearchInput
        model={searchInput}
        placeholder="输入学生姓名或学号"
        bg="white"
        maxW="64"
        mb="4"
      />

      <Box
        h="full"
        w="full"
        rounded="lg"
        border="gray"
        bg="white"
        shadow="base">
        <TableContainer>
          <Table>
            <Thead>
              <Tr>
                <Th w="12">学号</Th>
                <Th w="12">姓名</Th>
                <Th w="full">
                  <Box w="full" />
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {students
                ?.filter(
                  (student) =>
                    student.name?.includes(searchInput.value) ||
                    student.studentNumber?.includes(searchInput.value),
                )
                .map((student) => (
                  <Tr key={student.id}>
                    <Th>{student.studentNumber}</Th>
                    <Th>{student.name}</Th>
                    <Th w="full">
                      <HStack w="full">
                        <Spacer />
                        <IconButton
                          variant="ghost"
                          aria-label="移除学生"
                          icon={<DeleteIcon color="red.600" />}
                          onClick={() => void handleRemoveStudent(student.id)}
                        />
                      </HStack>
                    </Th>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
};

export default MemberManagementPage;
