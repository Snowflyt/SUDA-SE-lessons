import * as React from 'react'
import { Button, Input } from '@mui/material'
import { useState } from 'react'

import loginApi from '../apis/login'
import { Navigate } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'

export default function Login () {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rerender, setRerender] = useState(false)

  function handleLogin () {
    loginApi
      .login({ username, password })
      .then(_ => setRerender(!rerender))
      .catch(_ => alert('Username or password is incorrect'))
  }

  if (isLoggedIn()) {
    return <Navigate to='/' />
  }

  return (
    <div
      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1>登录</h1>
      <Input
        placeholder='用户名'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <Input
        placeholder='密码'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <Button onClick={handleLogin}>登录</Button>
    </div>
  )
}
