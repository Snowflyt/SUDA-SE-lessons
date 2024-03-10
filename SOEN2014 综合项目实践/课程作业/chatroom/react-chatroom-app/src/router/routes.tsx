import { createBrowserRouter, redirect } from 'react-router-dom';

import Layout from '@/components/Layout/Layout';
import ChatroomPage from '@/pages/chatroom';
import LoginPage from '@/pages/login';
import { isLoggedIn, removeToken } from '@/utils/auth';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        loader: () => {
          if (!isLoggedIn()) return redirect('/login');
          return redirect('/chatroom');
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
        path: '/chatroom',
        element: <ChatroomPage />,
        loader: () => {
          if (!isLoggedIn()) return redirect('/login');
          return null;
        },
      },
    ],
  },
]);

export default router;
