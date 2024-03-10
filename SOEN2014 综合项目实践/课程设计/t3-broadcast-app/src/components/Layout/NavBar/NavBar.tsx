import { CalendarIcon, ChatIcon } from '@chakra-ui/icons';
import {
  Avatar,
  TabList,
  Stack,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  Button,
  Tabs,
  PopoverFooter,
} from '@chakra-ui/react';
import Link from 'next/link';
import { useReactiveStore } from 'react-reactive-hooks';

import { useUser } from '@/hooks';
import globalStore from '@/store/global';
import { api } from '@/utils/api';

import MenuTab from './MenuTab';

const LeftBar = () => {
  const user = useUser();

  const globalState = useReactiveStore(globalStore);

  const { mutate: setCurrentOffline } =
    api.user.setCurrentOffline.useMutation();

  return (
    <div className="fixed left-0 top-0 z-10 flex h-full w-20 flex-col items-center bg-[#31364d] py-8 text-white">
      <Popover placement="right" trigger="hover">
        <PopoverTrigger>
          <Avatar size="sm" mb="6" />
        </PopoverTrigger>
        <Portal>
          <PopoverContent w="36" zIndex="50">
            <PopoverArrow />
            <PopoverHeader className="mt-1 flex flex-col items-center text-sm text-gray-400">
              你好，{user?.name}
            </PopoverHeader>
            <PopoverBody px="none">
              <Link href="/personal-info">
                <Button
                  w="full"
                  rounded="none"
                  bg="transparent"
                  _hover={{
                    bg: '#edf4fe',
                    textColor: '#5096f5',
                  }}
                  onClick={() => {
                    setCurrentOffline();
                  }}>
                  <div className="text-sm font-normal">个人中心</div>
                </Button>
              </Link>
            </PopoverBody>
            <PopoverFooter className="text-sm" px="none">
              <Link href="/login">
                <Button
                  w="full"
                  rounded="none"
                  bg="transparent"
                  _hover={{
                    bg: '#feedec',
                    textColor: '#f84f41',
                  }}>
                  <div className="text-sm font-normal">退出</div>
                </Button>
              </Link>
            </PopoverFooter>
          </PopoverContent>
        </Portal>
      </Popover>
      <Tabs
        variant="unstyled"
        className="w-full"
        tabIndex={globalState.menuTabIndex}
        onChange={(index) => {
          globalState.menuTabIndex = index;
        }}>
        <TabList>
          <Stack className="space-y-0" direction="column">
            <Link href="/">
              <MenuTab>
                <CalendarIcon boxSize="5" />
                <div className="text-xs">我的课程</div>
              </MenuTab>
            </Link>
            <Link href={`/live/${globalState.roomId}`}>
              <MenuTab>
                <ChatIcon boxSize="5" />
                <div className="text-xs">直播课堂</div>
              </MenuTab>
            </Link>
          </Stack>
        </TabList>
      </Tabs>
    </div>
  );
};

export default LeftBar;
