import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ContextProvider } from './hook/store';
import '../node_modules/bootstrap/dist/css/bootstrap.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ContextProvider>
    <App />
  </ContextProvider>
);

