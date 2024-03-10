import { StyledEngineProvider, ThemeProvider, createTheme } from '@mui/material/styles';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';

import router from './router/routes';

import './index.scss';

const rootElement = document.querySelector('#root') as HTMLElement;
const root = ReactDOM.createRoot(rootElement);

// Fix compatibility issue with MUI and Tailwind CSS
const theme = createTheme({
  components: {
    MuiPopover: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiPopper: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiDialog: {
      defaultProps: {
        container: rootElement,
      },
    },
    MuiModal: {
      defaultProps: {
        container: rootElement,
      },
    },
  },
});

root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </StyledEngineProvider>
  </React.StrictMode>,
);
