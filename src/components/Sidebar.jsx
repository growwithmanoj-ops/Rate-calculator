import React from 'react';

const icons = {
  home: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M9 21V12h6v9" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  package: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M21 8l-9-5-9 5v8l9 5 9-5V8z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 3v18M3 8l9 5 9-5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
    </svg>
  ),
  alert: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M12 2L2 19h20L12 2z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M12 9v5M12 16.5v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  wallet: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <rect x="2" y="5" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M16 12a1 1 0 100 2 1 1 0 000-2z" fill="currentColor"/>
      <path d="M2 9h20" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
  analytics: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  document: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
      <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  info: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  partners: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <circle cx="17" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M2 20c0-4 3-6 7-6s7 2 7 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
      <path d="M17 14c2.5 0 5 1.5 5 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
    </svg>
  ),
  settings: (
    <svg width="20" height="20" fill="none" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.8"/>
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" stroke="currentColor" strokeWidth="1.8"/>
    </svg>
  ),
};

export default function Sidebar() {
  const navItems = [
    { icon: 'home', active: false },
    { icon: 'package', active: false },
    { icon: 'alert', active: false, badge: true },
    { icon: 'wallet', active: false },
    { icon: 'analytics', active: false },
    { icon: 'document', active: false },
    { icon: 'info', active: true },
  ];

  const bottomItems = [
    { icon: 'partners', active: false, badge: true },
    { icon: 'settings', active: false },
  ];

  return (
    <>
    <aside style={styles.sidebar}>
      {/* Logo */}
      <div style={styles.logoWrap}>
        <div style={styles.logoIcon}>
          <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="6" fill="#e53935"/>
            <path d="M8 8h10a6 6 0 010 12H8V8z" fill="white"/>
            <circle cx="18" cy="20" r="4" fill="white"/>
          </svg>
        </div>
        <span style={styles.logoText}>ONE</span>
      </div>

      {/* Top nav */}
      <nav style={styles.nav}>
        {navItems.map((item, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <button style={{ ...styles.navBtn, ...(item.active ? styles.navBtnActive : {}) }}>
              {icons[item.icon]}
              {item.badge && <span style={styles.badge} />}
            </button>
          </div>
        ))}
      </nav>

      {/* Bottom nav */}
      <div style={styles.bottomNav}>
        {bottomItems.map((item, i) => (
          <div key={i} style={{ position: 'relative' }}>
            <button style={{ ...styles.navBtn, ...(item.active ? styles.navBtnActive : {}) }}>
              {icons[item.icon]}
              {item.badge && <span style={{ ...styles.badge, background: '#e53935' }} />}
            </button>
          </div>
        ))}
      </div>
    </aside>

    {/* Mobile bottom nav */}
    <nav style={styles.mobileNav} className="mobile-nav-show">
      {[...navItems, ...bottomItems].slice(0, 5).map((item, i) => (
        <button key={i} style={{ ...styles.mobileNavBtn, ...(item.active ? styles.mobileNavBtnActive : {}) }}>
          {icons[item.icon]}
        </button>
      ))}
    </nav>
    </>
  );
}

const styles = {
  sidebar: {
    width: 64,
    minWidth: 64,
    background: '#12172a',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 16,
    minHeight: '100vh',
    position: 'fixed',
    top: 0,
    left: 0,
    bottom: 0,
    zIndex: 100,
  },
  logoWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoIcon: {
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#ffffff',
    fontSize: 9,
    fontWeight: 700,
    letterSpacing: 1,
    marginTop: 2,
  },
  nav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
    flex: 1,
  },
  bottomNav: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 4,
  },
  navBtn: {
    width: 44,
    height: 44,
    borderRadius: 10,
    border: 'none',
    background: 'transparent',
    color: '#6b7a9e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    position: 'relative',
    transition: 'all 0.15s',
  },
  navBtnActive: {
    background: 'rgba(79,110,247,0.18)',
    color: '#4f6ef7',
  },
  badge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 7,
    height: 7,
    borderRadius: '50%',
    background: '#f97316',
    border: '1.5px solid #12172a',
  },
  mobileNav: {
    display: 'none',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    background: '#12172a',
    zIndex: 100,
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTop: '1px solid rgba(255,255,255,0.08)',
  },
  mobileNavBtn: {
    flex: 1,
    height: '100%',
    border: 'none',
    background: 'transparent',
    color: '#6b7a9e',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
  },
  mobileNavBtnActive: {
    color: '#4f6ef7',
  },
};
