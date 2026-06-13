import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import RouteFocus from '@/components/RouteFocus';

// Home stays eager — it's the common landing/LCP route. Every other page is
// split into its own chunk fetched on navigation, so the initial bundle ships
// only what the first paint needs.
const Services = lazy(() => import('@/pages/Services'));
const About = lazy(() => import('@/pages/About'));
const Reviews = lazy(() => import('@/pages/Reviews'));
const Resources = lazy(() => import('@/pages/Resources'));
const ServiceAreas = lazy(() => import('@/pages/ServiceAreas'));
const BookNow = lazy(() => import('@/pages/BookNow'));
const Contact = lazy(() => import('@/pages/Contact'));
const Privacy = lazy(() => import('@/pages/Privacy'));
const Terms = lazy(() => import('@/pages/Terms'));
const NotFound = lazy(() => import('@/pages/NotFound'));

function AnimatedRoutes() {
  const location = useLocation();
  // Keying on pathname remounts the wrapper each navigation, which replays the
  // `.route-enter` settle animation (a soft compositor-only rise). Reduced-
  // motion users get an instant swap (handled in index.css).
  return (
    <div key={location.pathname} className="route-enter">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/about" element={<About />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/resources" element={<Resources />} />
        <Route path="/service-areas" element={<ServiceAreas />} />
        <Route path="/book" element={<BookNow />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <Layout>
      {/* RouteFocus + Layout chrome stay outside Suspense so the persistent
          nav/footer never unmount during a route chunk fetch. */}
      <RouteFocus />
      {/* A reserved-height placeholder (not null) so the focused #main-content
          is never an empty region during a lazy chunk fetch, and the footer
          doesn't jump up on slow connections. Static — reduced-motion safe. */}
      <Suspense fallback={<div className="min-h-[70vh]" aria-busy="true" aria-label="Loading page" />}>
        <AnimatedRoutes />
      </Suspense>
    </Layout>
  );
}
