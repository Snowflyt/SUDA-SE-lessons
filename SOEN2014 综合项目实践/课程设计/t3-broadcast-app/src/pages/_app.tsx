import { ChakraProvider } from '@chakra-ui/react';
import { SessionProvider } from 'next-auth/react';
import { ReactiveProvider } from 'react-reactive-hooks';

import { Layout as DefaultLayout } from '@/components';
import globalStore from '@/store/global';
import { api } from '@/utils/api';

import type { NextPage } from 'next';
import type { AppType } from 'next/app';
import type { Session } from 'next-auth';

import '@/styles/globals.css';

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

const App: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  const getLayout =
    (Component as NextPageWithLayout).getLayout ??
    ((page) => <DefaultLayout>{page}</DefaultLayout>);

  return (
    <SessionProvider session={session}>
      <ChakraProvider>
        <ReactiveProvider store={globalStore}>
          <div />
          {getLayout(<Component {...pageProps} />)}
        </ReactiveProvider>
      </ChakraProvider>
    </SessionProvider>
  );
};

export default api.withTRPC(App);
