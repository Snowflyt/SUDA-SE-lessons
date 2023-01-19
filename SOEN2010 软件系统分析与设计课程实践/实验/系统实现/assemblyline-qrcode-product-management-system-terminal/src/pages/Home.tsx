import * as React from 'react'
import { redirect } from 'react-router-dom'
import { isLoggedIn } from '../utils/auth'

export default function Home () {
  return <h1>Home</h1>
}

export function homeLoader () {
  if (!isLoggedIn()) {
    return redirect('/login')
  }
  return redirect('/product-model')
}
