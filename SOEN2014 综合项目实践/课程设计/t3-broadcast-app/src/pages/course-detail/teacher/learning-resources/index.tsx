import {
  DeleteIcon,
  DownloadIcon,
  HamburgerIcon,
  TriangleDownIcon,
  TriangleUpIcon,
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
import * as R from 'ramda';

import { api } from '@/utils/api';
import { downloadFileModel } from '@/utils/file';
import { wrapAsyncCallback } from '@/utils/wrappers';

import UploadResourceModal from './UploadResourceModal';

import type { Course } from '@prisma/client';
import type { NextPage } from 'next';

export interface LearningResourcesPageProps {
  course: Course;
}

const LearningResourcesPage: NextPage<LearningResourcesPageProps> = ({
  course,
}) => {
  const utils = api.useContext();
  const { data: courseWares } = api.course.getCourseWares.useQuery(course.id);
  const { mutateAsync: deleteCourseWareById } =
    api.courseWare.deleteById.useMutation();
  const { mutateAsync: deleteCourseWareByClassificationAndCourseId } =
    api.courseWare.deleteByClassificationAndCourseId.useMutation();

  const {
    isOpen: isUploadResourceModalOpen,
    onClose: onCloseUploadResourceModal,
    onOpen: onOpenUploadResourceModal,
  } = useDisclosure();

  const handleDownloadFile = async (fileId: string) => {
    const fileModel = await utils.file.getFileById.fetch(fileId);
    await downloadFileModel(fileModel);
  };

  return (
    <Box h="full" w="full" rounded="lg" border="gray" bg="white" shadow="base">
      <UploadResourceModal
        course={course}
        isOpen={isUploadResourceModalOpen}
        onClose={onCloseUploadResourceModal}
      />

      <VStack alignItems="start" p="5">
        <HStack>
          <Button
            colorScheme="blue"
            size="sm"
            onClick={onOpenUploadResourceModal}>
            <TriangleUpIcon mr="1" />
            上传资源
          </Button>
        </HStack>
        {Object.entries(
          R.groupBy(R.prop('classification'), courseWares ?? []),
        ).map(([classification, courseWares]) => (
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
                  await deleteCourseWareByClassificationAndCourseId({
                    classification,
                    courseId: course.id,
                  });
                  await utils.course.getCourseWares.invalidate(course.id);
                })}
              />
            </HStack>
            {courseWares.map((courseWare) => (
              <HStack key={courseWare.id} w="full" pl="4">
                <HamburgerIcon />
                <Text>{courseWare.name}</Text>
                <Spacer />
                <IconButton
                  variant="unstyled"
                  aria-label="删除"
                  size="sm"
                  icon={<DeleteIcon color="red.600" />}
                  onClick={wrapAsyncCallback(async () => {
                    await deleteCourseWareById(courseWare.id);
                    await utils.course.getCourseWares.invalidate(course.id);
                  })}
                />
                <IconButton
                  variant="unstyled"
                  aria-label="下载"
                  size="sm"
                  icon={<DownloadIcon color="green.600" />}
                  onClick={() => void handleDownloadFile(courseWare.fileId)}
                />
              </HStack>
            ))}
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default LearningResourcesPage;
