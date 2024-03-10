import { Tab } from '@chakra-ui/react';

export interface MenuTabProps {
  children: React.ReactNode;
}

const MenuTab: React.FC<MenuTabProps> = ({ children }) => (
  <Tab
    className="flex flex-col items-center justify-center space-y-2"
    bg="transparent"
    textColor="#99a0bf"
    _selected={{
      bg: '#1c223b',
      textColor: 'white',
    }}
    _hover={{
      textColor: 'white',
    }}
    w="full">
    {children}
  </Tab>
);

export default MenuTab;
