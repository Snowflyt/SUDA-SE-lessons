import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './configs/routes'

const container = document.querySelector('#root') as HTMLDivElement
createRoot(container).render(<RouterProvider router={router} />)
