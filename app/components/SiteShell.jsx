'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { sections } from '../../lib/sections';

function isActive(pathname, href) {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href;
}

export default function SiteShell({ children }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <div className="site-shell">
      <header className="hero">
        <div className="hero-content container">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            aria-label="Open menu"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true" />
          </button>
          <Link href="/" className="site-title">
            Support Weald Schooling
          </Link>
        </div>
      </header>

      {menuOpen ? (
        <button className="menu-backdrop" onClick={() => setMenuOpen(false)} aria-label="Close menu" />
      ) : null}

      <aside className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-label="Website sections">
        <nav id="site-nav">
          <button
            type="button"
            className="drawer-close"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <span aria-hidden="true">✕</span>
          </button>

          <Link className={isActive(pathname, '/') ? 'nav-link active' : 'nav-link'} href="/">
            Home
          </Link>

          {sections.map((section) => {
            const href = `/${section.slug}`;
            return (
              <Link
                key={section.slug}
                className={isActive(pathname, href) ? 'nav-link active' : 'nav-link'}
                href={href}
              >
                {section.title}
              </Link>
            );
          })}
        </nav>
      </aside>

      <div className="container page-wrap">
        <main className="content" id="main-content">
          {children}
        </main>
      </div>
    </div>
  );
}
