import type { ReactNode } from 'react';
import Nav from './Nav';
import Footer from './Footer';
import StickyCallCTA from './StickyCallCTA';
import LocalBusinessJsonLd from './LocalBusinessJsonLd';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:border-3 focus:border-ink focus:bg-red focus:px-4 focus:py-2 focus:font-condensed focus:font-bold focus:uppercase focus:text-paper"
      >
        Skip to content
      </a>
      <LocalBusinessJsonLd />
      <Nav />
      <main
        id="main-content"
        tabIndex={-1}
        className="flex-1 pb-24 md:pb-0"
      >
        {children}
      </main>
      <Footer />
      <StickyCallCTA />
    </div>
  );
}
