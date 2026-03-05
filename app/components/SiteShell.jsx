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
          <a
            className="social-link"
            href="https://www.facebook.com/profile.php?id=61557074941190"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Visit Support Weald Schooling on Facebook"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path
                d="M24 12a12 12 0 1 0-13.88 11.85v-8.39H7.08V12h3.04V9.36c0-3 1.79-4.67 4.53-4.67 1.31 0 2.68.24 2.68.24v2.95h-1.51c-1.49 0-1.95.93-1.95 1.87V12h3.32l-.53 3.46h-2.79v8.39A12 12 0 0 0 24 12Z"
                fill="currentColor"
              />
            </svg>
          </a>
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
