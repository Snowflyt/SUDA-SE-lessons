import * as React from 'react'
import { Box } from '@mui/material'

export default function TopBarLeft () {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '32px',
        width: '200px',
        bgcolor: '#f4f5f7',
        padding: '0'
      }}
    />
  )
}
