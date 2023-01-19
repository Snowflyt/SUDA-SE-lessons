import * as React from 'react'
import { createHashRouter } from 'react-router-dom'
import AppLayout from '../components/AppLayout'
import Home, { homeLoader } from '../pages/Home'
import Login from '../pages/Login'
import Warehousing from '../pages/Warehousing'
import ProductModel from '../pages/ProductModel'
import PrintRawLabel from '../pages/PrintRawLabel'
import PrintProductLabel from '../pages/PrintProductLabel'
import ProductionPlan from '../pages/ProductionPlan'
import Trace from '../pages/Trace'
import DefectMark from '../pages/DefectMark'
import DefectReport from '../pages/DefectReport'

const router = createHashRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
        loader: homeLoader
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/warehousing',
        element: <Warehousing />
      },
      {
        path: '/product-model',
        element: <ProductModel />
      },
      {
        path: '/print-raw-label',
        element: <PrintRawLabel />
      },
      {
        path: '/print-product-label',
        element: <PrintProductLabel />
      },
      {
        path: '/production-plan',
        element: <ProductionPlan />
      },
      {
        path: '/trace',
        element: <Trace />
      },
      {
        path: '/defect-mark',
        element: <DefectMark />
      },
      {
        path: '/defect-report',
        element: <DefectReport />
      }
    ]
  }
])

export default router
