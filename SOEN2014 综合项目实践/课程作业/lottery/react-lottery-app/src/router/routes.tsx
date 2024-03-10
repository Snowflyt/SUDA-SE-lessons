import { createBrowserRouter, redirect } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import LoginPage from '@/pages/login';
import LotteryPage from '@/pages/lottery';
import { isLoggedIn, removeToken } from '@/utils/auth';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        loader: () => {
          if (!isLoggedIn()) return redirect('/login');
          return redirect('/lottery');
        },
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/logout',
        loader: () => {
          removeToken();
          return redirect('/login');
        },
      },
      {
        path: '/lottery',
        element: <LotteryPage />,
      },
    ],
  },
]);

export default router;
