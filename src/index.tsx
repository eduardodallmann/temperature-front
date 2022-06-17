import {LocalizationProvider} from '@mui/x-date-pickers';
import {Provider} from 'jotai';
import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {AdapterMoment} from '@mui/x-date-pickers/AdapterMoment';
import {App} from './app';
import 'moment/locale/pt-br';

ReactDOM.render(
  <LocalizationProvider dateAdapter={AdapterMoment}>
    <Provider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </LocalizationProvider>,
  document.getElementById('root'),
);
