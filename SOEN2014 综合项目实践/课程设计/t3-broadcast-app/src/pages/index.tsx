import { useUser } from '@/hooks';

import StudentHome from './home/student';
import TeacherHome from './home/teacher';

import type { NextPage } from 'next';

const HomePage: NextPage = () => {
  const user = useUser();

  return user?.role === 'TEACHER' ? (
    <TeacherHome />
  ) : user?.role === 'STUDENT' ? (
    <StudentHome />
  ) : null;
};

export default HomePage;
