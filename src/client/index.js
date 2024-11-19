import React from 'react';
import ReactDOM from 'react-dom';
import App from './pages/App';
import './styles/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// Register service worker for PWA
serviceWorkerRegistration.register();
