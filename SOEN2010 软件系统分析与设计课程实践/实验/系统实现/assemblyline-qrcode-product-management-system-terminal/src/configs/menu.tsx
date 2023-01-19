import * as React from 'react'
import {
  PrecisionManufacturing,
  Warehouse,
  QrCode,
  QrCode2,
  Category,
  Sort,
  QrCodeScanner,
  PlaylistAddCheck,
  PlaylistRemove,
  Summarize,
  Texture
} from '@mui/icons-material'
import { Menu } from '../components/NavBar'

const menu: Menu = [
  {
    name: '入库',
    icon: <Warehouse />,
    open: true,
    children: [
      {
        name: '原料入库',
        icon: <Category />,
        path: '/warehousing'
      },
      {
        name: '打印标签',
        icon: <QrCode />,
        path: '/print-raw-label'
      }
    ]
  },
  {
    name: '生产',
    icon: <PrecisionManufacturing />,
    open: true,
    children: [
      // {
      //   name: '产线',
      //   icon: <ViewColumn />,
      //   path: '/'
      // },
      {
        name: '生产计划',
        icon: <Sort />,
        path: '/production-plan'
      },
      {
        name: '打印标签',
        icon: <QrCode2 />,
        path: '/print-product-label'
      },
      {
        name: '产品追溯',
        icon: <QrCodeScanner />,
        path: '/trace'
      }
    ]
  },
  {
    name: '质检',
    icon: <PlaylistAddCheck />,
    open: true,
    children: [
      {
        name: '缺陷标记',
        icon: <PlaylistRemove />,
        path: '/defect-mark'
      },
      {
        name: '缺陷报告',
        icon: <Summarize />,
        path: '/defect-report'
      }
    ]
  },
  {
    name: '产品模板',
    icon: <Texture />,
    path: '/product-model'
  }
]

export default menu
