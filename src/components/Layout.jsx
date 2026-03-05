import { useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { sections } from '../data/sections';

function navClassName({ isActive }) {
  return isActive ? 'nav-link active' : 'nav-link';
}

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <div className="site-shell">
      <header className="hero">
        <div className="hero-overlay" />
        <div className="hero-content container">
          <button
            type="button"
            className="menu-toggle"
            aria-expanded={menuOpen}
            aria-controls="site-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="menu-icon" aria-hidden="true" />
            <span>Menu</span>
          </button>
          <p className="eyebrow">Support Weald Schooling</p>
          <h1>Inclusive Secondary Education for the Weald of Kent</h1>
          <p>
            A community campaign to establish a local, non-selective secondary school
            that works for all young people.
          </p>
        </div>
      </header>

      {menuOpen ? <button className="menu-backdrop" onClick={closeMenu} aria-label="Close menu" /> : null}

      <aside className={`mobile-drawer${menuOpen ? ' open' : ''}`} aria-label="Website sections">
        <nav id="site-nav">
          <button type="button" className="drawer-close" onClick={closeMenu} aria-label="Close menu">
            <span aria-hidden="true">✕</span>
          </button>
          <NavLink className={navClassName} to="/" onClick={closeMenu}>
            Home
          </NavLink>
          {sections.map((section) => (
            <NavLink
              key={section.slug}
              className={navClassName}
              to={`/${section.slug}`}
              onClick={closeMenu}
            >
              {section.title}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="container page-wrap">
        <main className="content" id="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
