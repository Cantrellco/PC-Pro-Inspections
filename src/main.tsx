import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { init as initAnalytics } from './services/analytics';
import './index.css';

initAnalytics();

const container = document.getElementById('root');
if (!container) throw new Error('Root container not found');

// Router basename.
// - VITE_BASE set at build time (e.g. "/myrepo/") → use it.
// - VITE_BASE = "./" (portable build) → derive from this script's URL so the
//   SPA works at any host path regardless of repo-name casing.
function resolveBasename(): string {
  const buildBase = import.meta.env.BASE_URL;
  if (buildBase && buildBase !== '/' && buildBase !== './') {
    return buildBase.replace(/\/$/, '');
  }
  if (buildBase === './' && typeof document !== 'undefined') {
    // Script URL pattern: <basename>/assets/index-<hash>.js
    // Strip the last two segments to recover <basename>.
    const scripts = document.querySelectorAll<HTMLScriptElement>('script[src]');
    for (const s of scripts) {
      const src = new URL(s.src, document.baseURI).pathname;
      const m = src.match(/^(.*)\/assets\/[^/]+\.js$/);
      if (m) return m[1];
    }
  }
  return '';
}
const basename = resolveBasename();

createRoot(container).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <App />
    </BrowserRouter>
  </StrictMode>,
);
