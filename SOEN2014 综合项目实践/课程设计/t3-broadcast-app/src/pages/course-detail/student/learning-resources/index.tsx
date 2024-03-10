import {
  DownloadIcon,
  HamburgerIcon,
  TriangleDownIcon,
} from '@chakra-ui/icons';
import {
  Box,
  HStack,
  IconButton,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';
import * as R from 'ramda';

import { api } from '@/utils/api';
import { downloadFileModel } from '@/utils/file';

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

  const handleDownloadFile = async (fileId: string) => {
    const fileModel = await utils.file.getFileById.fetch(fileId);
    await downloadFileModel(fileModel);
  };

  return (
    <Box h="full" w="full" rounded="lg" border="gray" bg="white" shadow="base">
      <VStack alignItems="start" p="5">
        {Object.entries(
          R.groupBy(R.prop('classification'), courseWares ?? []),
        ).map(([classification, courseWares]) => (
          <Box key={classification} w="full" fontSize="sm">
            <HStack w="full">
              <TriangleDownIcon />
              <Text>{classification}</Text>
              <Spacer />
            </HStack>
            {courseWares.map((courseWare) => (
              <HStack key={courseWare.id} w="full" pl="4">
                <HamburgerIcon />
                <Text>{courseWare.name}</Text>
                <Spacer />
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
