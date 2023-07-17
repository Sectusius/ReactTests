import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './main/main'  
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';

const rootElement = document.getElementById('root');

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
