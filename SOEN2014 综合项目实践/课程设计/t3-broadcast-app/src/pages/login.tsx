import {
  Button,
  Card,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Radio,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { signIn } from 'next-auth/react';
import { useReactiveValue } from 'react-reactive-hooks';

import { Reactive } from '@/components';
import { api } from '@/utils/api';
import { wrapAsyncCallback } from '@/utils/wrappers';

import type { NextPageWithLayout } from './_app';
import type { UserRole } from '@/@types/auth';

const LoginPage: NextPageWithLayout = () => {
  const username = useReactiveValue('');
  const password = useReactiveValue('');

  const confirmedPassword = useReactiveValue('');
  const role = useReactiveValue<UserRole>('STUDENT');

  const tabIndex = useReactiveValue(0);

  const toast = useToast();

  const { mutate: createUser } = api.user.create.useMutation();
  const { mutate: setCurrentOnline } = api.user.setCurrentOnline.useMutation();

  const login = wrapAsyncCallback(async () => {
    await signIn('credentials', {
      username: username.value,
      password: password.value,
      callbackUrl: '/',
    });
    setCurrentOnline();

    toast({
      title: '登录成功',
      status: 'success',
      duration: 2000,
    });
  });

  const register = () => {
    createUser({
      username: username.value,
      password: password.value,
      role: role.value,
    });

    username.value = '';
    password.value = '';
    confirmedPassword.value = '';
    role.value = 'STUDENT';
    tabIndex.value = 0;

    toast({
      title: '注册成功',
      status: 'success',
      duration: 2000,
    });
  };

  return (
    <div className="flex h-full items-center justify-center bg-slate-400">
      <div className="flex flex-col items-center justify-center space-y-6">
        <h1 className="text-bold text-2xl font-semibold text-white">
          在线教育直播平台
        </h1>
        <Card className="w-96 rounded border p-4">
          <Reactive.Tabs model={tabIndex}>
            <TabList>
              <Tab>登录</Tab>
              <Tab>注册</Tab>
            </TabList>

            <TabPanels>
              <TabPanel className="space-y-2">
                <div>用户名</div>
                <Reactive.Input name="username" type="text" model={username} />
                <div>密码</div>
                <Reactive.Input
                  name="password"
                  type="password"
                  model={password}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') login();
                  }}
                />
                <Button
                  type="button"
                  isDisabled={password.value === '' || username.value === ''}
                  className="w-full"
                  onClick={login}>
                  登录
                </Button>
              </TabPanel>

              <TabPanel className="space-y-2">
                <div>用户名</div>
                <Reactive.Input name="username" type="text" model={username} />
                <div>密码</div>
                <Reactive.Input
                  name="password"
                  type="password"
                  model={password}
                />
                <div>确认密码</div>
                <Reactive.Input
                  name="confirmedPassword"
                  type="password"
                  model={confirmedPassword}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') register();
                  }}
                />
                {password.value !== confirmedPassword.value && (
                  <div className="text-sm text-red-500">两次密码不一致</div>
                )}
                <div>身份</div>
                <Reactive.RadioGroup model={role}>
                  <Stack direction="row">
                    <Radio value="STUDENT">学生</Radio>
                    <Radio value="TEACHER">老师</Radio>
                  </Stack>
                </Reactive.RadioGroup>
                <Button
                  type="button"
                  isDisabled={
                    password.value !== confirmedPassword.value ||
                    password.value === '' ||
                    username.value === ''
                  }
                  className="w-full"
                  onClick={register}>
                  注册
                </Button>
              </TabPanel>
            </TabPanels>
          </Reactive.Tabs>
        </Card>
      </div>
    </div>
  );
};

LoginPage.getLayout = (page: React.ReactElement) => (
  <main className="h-screen w-screen">{page}</main>
);

export default LoginPage;
