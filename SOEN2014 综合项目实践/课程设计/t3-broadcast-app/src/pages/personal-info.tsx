import { InfoIcon } from '@chakra-ui/icons';
import { Button, Text } from '@chakra-ui/react';
import { useEffect } from 'react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { Roles } from '@/constants/auth';
import { api } from '@/utils/api';

import type { NextPage } from 'next';

const PersonalInfoPage: NextPage = () => {
  const { data: currentUser, isLoading } = api.user.getCurrent.useQuery();
  const { mutate: updateUser } = api.user.update.useMutation();

  const username = useReactiveValue('');
  const name = useReactiveValue('');
  const studentNumber = useReactiveValue('');
  const password = useReactiveValue('');

  const editPasswordOn = useReactiveValue(false);

  useEffect(() => {
    if (!isLoading) {
      username.value = currentUser?.username ?? '';
      name.value = currentUser?.name ?? '';
      studentNumber.value = currentUser?.studentNumber ?? '';
      password.value = currentUser?.password ?? '';
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoading]);

  return (
    <>
      <div className="flex h-12 w-full flex-row items-center space-x-2 p-6 shadow">
        <div>
          <InfoIcon color="blue.300" boxSize="5" />
        </div>
        <span className="text-lg">个人中心</span>
      </div>
      <div className="flex h-[calc(100%-3rem)] w-full flex-col items-center bg-[#f5f5f5] p-4">
        <div className="flex h-full w-full flex-col items-center rounded-lg border bg-white shadow">
          <div className="mb-2 h-12 w-full p-4">个人信息</div>
          <hr />
          <div className="flex h-full w-[50%] flex-col items-center space-y-6 py-8">
            <div className="flex w-full flex-row items-center">
              <Text w="24">用户名</Text>
              <Reactive.Input size="sm" rounded="md" model={username} />
            </div>
            <div className="flex w-full flex-row items-center">
              <Text w="24">姓名</Text>
              <Reactive.Input size="sm" rounded="md" model={name} />
            </div>
            {currentUser?.role === Roles.STUDENT && (
              <div className="flex w-full flex-row items-center">
                <Text w="24">学号</Text>
                <Reactive.Input size="sm" rounded="md" model={studentNumber} />
              </div>
            )}
            <div className="flex w-full flex-row items-center">
              <Text w="24">密码</Text>
              <div className="flex w-full flex-row items-center space-x-2">
                <Reactive.Input
                  type="password"
                  isDisabled={!editPasswordOn.value}
                  size="sm"
                  rounded="md"
                  model={password}
                />
                {editPasswordOn.value && (
                  <Button
                    size="sm"
                    colorScheme="red"
                    rounded="md"
                    onClick={() => {
                      password.value = currentUser?.password ?? '';
                      editPasswordOn.value = false;
                    }}>
                    取消
                  </Button>
                )}
                <Button
                  size="sm"
                  colorScheme="blue"
                  rounded="md"
                  onClick={() => {
                    if (!editPasswordOn.value) password.value = '';
                    editPasswordOn.value = !editPasswordOn.value;
                  }}>
                  {editPasswordOn.value ? '确定' : '修改'}
                </Button>
              </div>
            </div>
            <Button
              w="full"
              onClick={() => {
                updateUser({
                  username: username.value,
                  name: name.value,
                  ...(currentUser?.role === Roles.STUDENT
                    ? { studentNumber: studentNumber.value }
                    : {}),
                  ...(password.value === currentUser?.password
                    ? {}
                    : { password: password.value }),
                });
              }}>
              保存
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PersonalInfoPage;
