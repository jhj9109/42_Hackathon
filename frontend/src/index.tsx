import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { Reset } from 'styled-reset';
import router from './router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);
root.render(
  <React.StrictMode>
    <RecoilRoot>
      <Reset />
      <RouterProvider router={router} />
    </RecoilRoot>
  </React.StrictMode>,
);
