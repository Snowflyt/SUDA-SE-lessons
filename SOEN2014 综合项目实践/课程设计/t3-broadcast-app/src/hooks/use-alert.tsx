import { useReactiveValue } from 'react-reactive-hooks';

import type { Alert } from '@chakra-ui/react';

const useAlert = (element: React.ReactElement<typeof Alert>) => {
  const isOpen = useReactiveValue(false);

  const openAlert = () => {
    isOpen.value = true;
  };
  const closeAlert = () => {
    isOpen.value = false;
  };
  const toggleAlert = () => {
    isOpen.value = !isOpen.value;
  };

  return {
    alert: <>{isOpen.value && element}</>,
    openAlert,
    closeAlert,
    toggleAlert,
  };
};

export { useAlert };
export default useAlert;
