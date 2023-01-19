import * as React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import { ExpandLess, ExpandMore } from '@mui/icons-material'
import produce from 'immer'

export type Menu = Array<
  | {
      name: string
      icon: React.ReactNode
      path: string
    }
  | {
      name: string
      icon: React.ReactNode
      open?: boolean
      children: Array<{
        name: string
        icon: React.ReactNode
        path: string
      }>
    }
>

const listItemButtonSx = {
  height: 40,
  fontSize: '10px'
}

const listItemTextSx = {
  fontSize: 14,
  fontFamily: 'Microsoft YaHei UI'
}

export default function NavBar ({ menu }: { menu: Menu }) {
  const [opens, setOpens] = useState(
    menu.map(item =>
      'children' in item ? (item as { open?: boolean }).open ?? false : false
    )
  )

  return (
    <List
      sx={{ width: '100%', maxWidth: 200, bgcolor: '#f4f5f7', height: '100vh' }}
    >
      {menu.map((item, index) => {
        if ('children' in item) {
          return (
            <React.Fragment key={index}>
              <ListItemButton
                onClick={() =>
                  setOpens(
                    produce(opens, draft => {
                      draft[index] = !draft[index]
                    })
                  )
                }
                sx={listItemButtonSx}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText
                  primary={item.name}
                  primaryTypographyProps={listItemTextSx}
                />
                {opens[index] ? <ExpandLess /> : <ExpandMore />}
              </ListItemButton>
              {opens[index] &&
                item.children.map((child, childIndex) => (
                  <ListItemButton
                    key={childIndex}
                    component={Link}
                    to={child.path}
                    sx={{ ...listItemButtonSx, pl: 4 }}
                  >
                    <ListItemIcon>{child.icon}</ListItemIcon>
                    <ListItemText
                      primary={child.name}
                      primaryTypographyProps={listItemTextSx}
                    />
                  </ListItemButton>
                ))}
            </React.Fragment>
          )
        } else {
          return (
            <ListItemButton
              key={index}
              component={Link}
              to={item.path}
              sx={listItemButtonSx}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.name}
                primaryTypographyProps={listItemTextSx}
              />
            </ListItemButton>
          )
        }
      })}
    </List>
  )
}
