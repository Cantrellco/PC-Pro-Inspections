import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { init as initAnalytics } from './services/analytics';
import './index.css';

initAnalytics();

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

// Strip trailing slash so BrowserRouter accepts it. Empty string when base = "/".
const basename = import.meta.env.BASE_URL.replace(/\/$/, '');

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
