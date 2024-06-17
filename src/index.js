import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import { SocketProvider } from './Panels/Conferencing/ConferencingHelpers/SocketProvider'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <SocketProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </SocketProvider>
);
