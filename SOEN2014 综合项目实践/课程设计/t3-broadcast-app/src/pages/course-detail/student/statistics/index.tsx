import { Box } from '@chakra-ui/react';
import { type Course } from '@prisma/client';

import type { NextPage } from 'next';

export interface StatisticsPageProps {
  course: Course;
}

const StatisticsPage: NextPage<StatisticsPageProps> = ({ course }) => {
  return (
    <>
      <Box h="40%" w="full" rounded="lg" border="gray" bg="white" mb="4">
        Statistics
      </Box>
      <Box h="full" w="full" rounded="lg" border="gray" bg="white">
        Statistics
      </Box>
    </>
  );
};

export default StatisticsPage;
