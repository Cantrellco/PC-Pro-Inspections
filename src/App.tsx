import { Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Reviews from '@/pages/Reviews';
import Resources from '@/pages/Resources';
import ServiceAreas from '@/pages/ServiceAreas';
import Contact from '@/pages/Contact';
import Privacy from '@/pages/Privacy';
import Terms from '@/pages/Terms';
import Services from '@/pages/Services';
import BookNow from '@/pages/BookNow';
import NotFound from '@/pages/NotFound';
import RouteFocus from '@/components/RouteFocus';

export default function App() {
  return (
    <Layout>
      <RouteFocus />
      <Routes>
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
    </Layout>
  );
}
