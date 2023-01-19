/** @jsx jsx */
import { jsx, css } from '@emotion/react'
import { useState } from 'react'
import { Box, IconButton } from '@mui/material'
import { Close, Minimize, Crop75 as Maximize } from '@mui/icons-material'

export default function TopBarRight ({
  onClose = () => {},
  onMinimize = () => {},
  onMaximize = () => {}
}: {
  onClose?: () => any
  onMinimize?: () => any
  onMaximize?: () => any
}) {
  const [maximized, setMaximized] = useState(false)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
        bgcolor: 'transparent',
        color: 'white',
        padding: '0'
      }}
    >
      <div
        css={css`
          -webkit-app-region: no-drag;
        `}
      >
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
          <IconButton size='small' onClick={onMinimize}>
            <Minimize />
          </IconButton>
          <IconButton
            size='small'
            onClick={() => {
              setMaximized(!maximized)
              onMaximize()
            }}
          >
            <Maximize />
          </IconButton>
          <IconButton size='small' onClick={onClose}>
            <Close />
          </IconButton>
        </Box>
      </div>
    </Box>
  )
}
