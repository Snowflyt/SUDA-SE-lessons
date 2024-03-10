import { useSession } from 'next-auth/react';

const useUser = () => {
  const { data: sessionData } = useSession();

  return sessionData?.user ?? null;
};

export { useUser };
export default useUser;
