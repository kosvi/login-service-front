import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { AppStateProvider, reducer } from './state';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AppStateProvider reducer={reducer}>
      <App />
    </AppStateProvider>
  </React.StrictMode>
);
