import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import './index.css';
import { getSavedTheme, applyTheme } from './theme/applyTheme';

// Apply saved theme before rendering
applyTheme(getSavedTheme());

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found');
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
