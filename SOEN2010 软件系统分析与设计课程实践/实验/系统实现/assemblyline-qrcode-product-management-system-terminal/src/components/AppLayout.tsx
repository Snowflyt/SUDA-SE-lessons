/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { Outlet } from 'react-router-dom'
import { ipcRenderer } from 'electron'
import NavBar from './NavBar'
import TopBarRight from './TopBarRight'
import TopBarLeft from './TopBarLeft'
import menu from '../configs/menu'

export default function AppLayout () {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        height: '100vh'
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <div
          css={css`
            -webkit-app-region: drag;
          `}
        >
          <TopBarLeft />
        </div>
        <NavBar menu={menu} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'calc(100% - 200px)',
          height: 'calc(100% - 40px)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
          css={css`
            -webkit-app-region: drag;
          `}
        >
          <TopBarRight
            onClose={() => ipcRenderer.send('window-close')}
            onMinimize={() => ipcRenderer.send('window-minimize')}
            onMaximize={() => ipcRenderer.send('window-maximize')}
          />
        </div>
        <div style={{ padding: '15px', maxWidth: '100%' }}>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
