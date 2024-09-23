import React from 'react';
import ReactDOM from 'react-dom/client'; // Use ReactDOM.createRoot for React 18
import { BrowserRouter } from 'react-router-dom'; // Only use BrowserRouter here
import App from './App';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
