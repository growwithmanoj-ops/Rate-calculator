import React, { useState } from 'react';

const AirplaneIcon = () => (
  <svg width="52" height="52" fill="none" viewBox="0 0 64 64" style={{ opacity: 0.18 }}>
    <path d="M56 20c0-2.2-1.8-4-4-4s-4 1.8-4 4l-8 6-24-6-4 4 20 10-6 12 4 4 10-12 12 6c0 2.2 1.8 4 4 4s4-1.8 4-4V20z" fill="#1a1f36"/>
  </svg>
);

const TruckIcon = () => (
  <svg width="52" height="52" fill="none" viewBox="0 0 64 64" style={{ opacity: 0.18 }}>
    <rect x="4" y="16" width="38" height="26" rx="3" stroke="#1a1f36" strokeWidth="3"/>
    <path d="M42 24l12 8v10H42V24z" stroke="#1a1f36" strokeWidth="3" strokeLinejoin="round"/>
    <circle cx="14" cy="46" r="6" stroke="#1a1f36" strokeWidth="3"/>
    <circle cx="48" cy="46" r="6" stroke="#1a1f36" strokeWidth="3"/>
  </svg>
);

export default function RateResults() {
  const [activeTab, setActiveTab] = useState('forward');

  const tabs = [
    { key: 'forward', label: 'Forward' },
    { key: 'rto', label: 'RTO' },
    { key: 'reverse', label: 'Reverse' },
  ];

  return (
    <div style={styles.card}>
      {/* Toggle tabs */}
      <div style={styles.tabRow}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{
              ...styles.tab,
              ...(activeTab === tab.key ? styles.tabActive : styles.tabInactive),
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Express result */}
      <div style={styles.resultCard}>
        <div style={styles.resultLeft}>
          <div style={styles.serviceTitle}>Express</div>
          <div style={styles.priceRow}>
            <span style={styles.rupee}>₹</span>
            <span style={styles.price}>35.92</span>
            <span style={styles.deliveryText}>&nbsp;/ Delivery in 1 days</span>
          </div>
          <div style={styles.breakdown}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ color: '#9ca3af', flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={styles.breakdownText}>
              Shipping cost: ₹30.00 + GST charge: ₹5.48 + Diesel Price Hike (DPH) charge: ₹0.44
            </span>
          </div>
        </div>
        <div style={styles.resultIcon}>
          <AirplaneIcon />
        </div>
      </div>

      {/* Divider */}
      <div style={styles.divider} />

      {/* Surface result */}
      <div style={styles.resultCard}>
        <div style={styles.resultLeft}>
          <div style={styles.serviceTitle}>Surface</div>
          <div style={styles.priceRow}>
            <span style={styles.rupee}>₹</span>
            <span style={styles.price}>35.92</span>
            <span style={styles.deliveryText}>&nbsp;/ Delivery in 1 days</span>
          </div>
          <div style={styles.breakdown}>
            <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ color: '#9ca3af', flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
              <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span style={styles.breakdownText}>
              Shipping cost: ₹30.00 + GST charge: ₹5.48 + Diesel Price Hike (DPH) charge: ₹0.44
            </span>
          </div>
        </div>
        <div style={styles.resultIcon}>
          <TruckIcon />
        </div>
      </div>

      {/* View detailed rate card link */}
      <div style={styles.linkWrap}>
        <a href="#" style={styles.link}>View Detailed Rate Card</a>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    overflow: 'hidden',
  },
  tabRow: {
    display: 'flex',
    gap: 8,
    padding: '16px 20px 14px',
  },
  tab: {
    flex: 1,
    padding: '8px 0',
    border: '1.5px solid #e5e7eb',
    borderRadius: 50,
    fontSize: 14,
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.15s',
  },
  tabActive: {
    background: '#e8ebfd',
    borderColor: '#c7cffb',
    color: '#3b52d4',
  },
  tabInactive: {
    background: '#ffffff',
    color: '#6b7280',
  },
  resultCard: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '20px 24px',
  },
  resultLeft: {
    flex: 1,
  },
  serviceTitle: {
    fontSize: 17,
    fontWeight: 600,
    color: '#1a1f36',
    marginBottom: 4,
  },
  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    marginBottom: 8,
  },
  rupee: {
    fontSize: 22,
    fontWeight: 700,
    color: '#1a1f36',
    lineHeight: 1,
  },
  price: {
    fontSize: 38,
    fontWeight: 700,
    color: '#1a1f36',
    lineHeight: 1,
    letterSpacing: '-1px',
  },
  deliveryText: {
    fontSize: 13,
    color: '#6b7280',
    fontWeight: 400,
    marginLeft: 2,
  },
  breakdown: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 5,
  },
  breakdownText: {
    fontSize: 12,
    color: '#9ca3af',
    lineHeight: 1.5,
  },
  resultIcon: {
    flexShrink: 0,
    marginLeft: 12,
    marginTop: 4,
  },
  divider: {
    height: 1,
    background: '#e5e7eb',
    margin: '0 24px',
  },
  linkWrap: {
    padding: '16px 24px',
    textAlign: 'center',
  },
  link: {
    fontSize: 14,
    color: '#4f6ef7',
    fontWeight: 500,
    textDecoration: 'none',
  },
};
