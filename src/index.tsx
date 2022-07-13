import { LocalizationProvider } from '@mui/x-date-pickers';
import { Provider } from 'jotai';
import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import 'moment/locale/pt-br';
import { createTheme, ThemeProvider } from '@mui/material';
import {} from '@mui/material/colors';
import { App } from './app';

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: defaultTheme.palette.success,
  },
});

const container = document.getElementById('root');
if (container) {
  const root = createRoot(container);
  root.render(
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <Provider>
        <ThemeProvider theme={theme}>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </LocalizationProvider>,
  );
}
