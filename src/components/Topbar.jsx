import React from 'react';

export default function Topbar() {
  return (
    <header style={styles.topbar}>
      {/* Left: sidebar toggle + breadcrumb */}
      <div style={styles.left}>
        <button style={styles.toggleBtn}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <nav style={styles.breadcrumb}>
          <span style={styles.breadcrumbLink}>Information Center</span>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: '#9ca3af' }}>
            <path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.breadcrumbCurrent}>Rate Calculator</span>
        </nav>
      </div>

      {/* Center: search */}
      <div style={styles.center}>
        <div style={styles.searchWrap}>
          <div style={styles.awbBadge}>
            AWB
            <svg width="12" height="12" fill="none" viewBox="0 0 24 24">
              <path d="M6 9l6 6 6-6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search multiple AWBs"
            style={styles.searchInput}
          />
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: '#9ca3af', marginRight: 10 }}>
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2"/>
            <path d="M21 21l-4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>
      </div>

      {/* Right: actions */}
      <div style={styles.right}>
        {/* Quick Actions */}
        <button style={styles.quickActionsBtn}>
          <div style={styles.quickActionsIcon}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="#1a1f36"/>
            </svg>
          </div>
          <span style={styles.quickActionsText}>Quick Actions</span>
        </button>

        {/* Tasks */}
        <button style={styles.iconBtn}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
            <rect x="3" y="4" width="18" height="18" rx="2" stroke="#374151" strokeWidth="1.8"/>
            <path d="M3 9h18" stroke="#374151" strokeWidth="1.8"/>
            <path d="M8 2v4M16 2v4" stroke="#374151" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M8 14l2 2 4-4" stroke="#374151" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={styles.iconBtnLabel}>Tasks</span>
        </button>

        {/* Divider */}
        <div style={styles.divider} />

        {/* Account */}
        <button style={styles.accountBtn}>
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
            <rect x="2" y="4" width="9" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="2" y="12" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="13" y="4" width="9" height="8" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="13" y="15" width="9" height="5" rx="1" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <div style={styles.accountInfo}>
            <span style={styles.accountName}>Domestic</span>
            <span style={styles.accountSub}>7b5a98-ManojFashions-do</span>
          </div>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
            <path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        {/* Avatar */}
        <div style={styles.avatar}>Ma</div>
      </div>
    </header>
  );
}

const styles = {
  topbar: {
    height: 56,
    background: '#ffffff',
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 16,
    gap: 12,
    position: 'fixed',
    top: 0,
    left: 64,
    right: 0,
    zIndex: 90,
  },
  left: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  toggleBtn: {
    width: 28,
    height: 28,
    border: 'none',
    background: 'transparent',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },
  breadcrumb: {
    display: 'flex',
    alignItems: 'center',
    gap: 4,
  },
  breadcrumbLink: {
    fontSize: 13,
    color: '#6b7280',
    cursor: 'pointer',
  },
  breadcrumbCurrent: {
    fontSize: 13,
    color: '#1a1f36',
    fontWeight: 500,
  },
  center: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
  },
  searchWrap: {
    display: 'flex',
    alignItems: 'center',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    width: 340,
    height: 38,
    overflow: 'hidden',
  },
  awbBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    padding: '0 10px',
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    borderRight: '1px solid #e5e7eb',
    height: '100%',
    whiteSpace: 'nowrap',
    background: '#f3f4f6',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    background: 'transparent',
    padding: '0 10px',
    fontSize: 13,
    color: '#1a1f36',
    outline: 'none',
  },
  right: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    flexShrink: 0,
  },
  quickActionsBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 7,
    padding: '6px 14px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    background: '#ffffff',
    cursor: 'pointer',
    fontSize: 13,
    fontWeight: 500,
    color: '#1a1f36',
  },
  quickActionsIcon: {
    width: 26,
    height: 26,
    borderRadius: 6,
    background: '#f3f4f6',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  quickActionsText: {
    fontSize: 13,
    fontWeight: 500,
  },
  iconBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    padding: '6px 12px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    background: '#ffffff',
    cursor: 'pointer',
  },
  iconBtnLabel: {
    fontSize: 13,
    fontWeight: 500,
    color: '#374151',
  },
  divider: {
    width: 1,
    height: 28,
    background: '#e5e7eb',
    margin: '0 4px',
  },
  accountBtn: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '5px 10px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    background: '#ffffff',
    cursor: 'pointer',
  },
  accountInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  accountName: {
    fontSize: 12,
    fontWeight: 600,
    color: '#1a1f36',
    lineHeight: 1.2,
  },
  accountSub: {
    fontSize: 10,
    color: '#9ca3af',
    lineHeight: 1.2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: '50%',
    background: '#6366f1',
    color: '#ffffff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 13,
    fontWeight: 700,
    cursor: 'pointer',
    flexShrink: 0,
  },
};
