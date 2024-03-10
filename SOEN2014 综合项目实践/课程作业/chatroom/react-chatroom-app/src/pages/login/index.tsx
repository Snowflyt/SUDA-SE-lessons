import { Button, Input } from '@mui/material';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';

import { isLoggedIn, setToken } from '@/utils/auth';
import { mutation } from '@/utils/client';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rerender, setRerender] = useState(false);

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    void mutation('login')
      .select((output) => [output.token])
      .byInput({ username, password })
      .then(({ token }) => {
        setToken(token);
        setRerender(!rerender);
      })
      .catch(() => alert('Username or password is incorrect'));
    e.preventDefault();
  };

  if (isLoggedIn()) return <Navigate to="/" />;

  return (
    <div className="flex h-full flex-col items-center justify-center">
      <form className="flex flex-col items-center" onSubmit={handleLogin}>
        <h1>登录</h1>
        <Input
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} />
        <br />
        <Button type="submit">登录</Button>
      </form>
    </div>
  );
};

export default LoginPage;
