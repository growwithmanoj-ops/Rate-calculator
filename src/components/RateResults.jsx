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

const InfoIcon = ({ color = '#9ca3af' }) => (
  <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ color, flexShrink: 0, marginTop: 1 }}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
    <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
  </svg>
);

const FORWARD_BREAKDOWN = [
  { label: 'Shipping cost', value: '₹30.00' },
  { label: 'GST charge', value: '₹5.48' },
  { label: 'Diesel Price Hike (DPH) charge', value: '₹0.44' },
];

const RESULTS = {
  forward: {
    express: { price: '35.92', delivery: '1', breakdown: FORWARD_BREAKDOWN },
    surface:  { price: '35.92', delivery: '1', breakdown: FORWARD_BREAKDOWN },
  },
  rto: {
    express: { price: '71.84', delivery: '1', breakdown: [{ label: 'Forward charge', value: '₹35.92' }, { label: 'RTO charge', value: '₹35.92' }] },
    surface:  { price: '71.84', delivery: '1', breakdown: [{ label: 'Forward charge', value: '₹35.92' }, { label: 'RTO charge', value: '₹35.92' }] },
  },
  reverse: {
    express: { price: '35.92', delivery: '2', breakdown: FORWARD_BREAKDOWN },
    surface:  { price: '35.92', delivery: '3', breakdown: FORWARD_BREAKDOWN },
  },
};

const MAX_DOMESTIC_KG = 500;

export default function RateResults({ calculatedWeight }) {
  const [activeTab, setActiveTab] = useState('forward');

  const tabs = [
    { key: 'forward', label: 'Forward' },
    { key: 'rto', label: 'RTO' },
    { key: 'reverse', label: 'Reverse' },
  ];

  const data = RESULTS[activeTab];
  const isOverLimit = calculatedWeight !== null && calculatedWeight > MAX_DOMESTIC_KG;
  const notCalculated = calculatedWeight === null;

  // ── Not yet calculated placeholder ──────────────────────────────────────
  if (notCalculated) {
    return (
      <div style={styles.card}>
        <div style={styles.tabRow}>
          {tabs.map(tab => (
            <button key={tab.key} style={{ ...styles.tab, ...styles.tabInactive }}>{tab.label}</button>
          ))}
        </div>
        <div style={styles.placeholder}>
          <svg width="48" height="48" fill="none" viewBox="0 0 64 64" style={{ opacity: 0.2, marginBottom: 12 }}>
            <rect x="4" y="16" width="38" height="26" rx="3" stroke="#1a1f36" strokeWidth="3"/>
            <path d="M42 24l12 8v10H42V24z" stroke="#1a1f36" strokeWidth="3" strokeLinejoin="round"/>
            <circle cx="14" cy="46" r="6" stroke="#1a1f36" strokeWidth="3"/>
            <circle cx="48" cy="46" r="6" stroke="#1a1f36" strokeWidth="3"/>
          </svg>
          <p style={styles.placeholderText}>Enter shipment details and click<br/><strong>Calculate Charges</strong> to see rates</p>
        </div>
      </div>
    );
  }

  // ── Over 500 KG error ────────────────────────────────────────────────────
  if (isOverLimit) {
    return (
      <div style={styles.card}>
        <div style={styles.tabRow}>
          {tabs.map(tab => (
            <button key={tab.key} style={{ ...styles.tab, ...styles.tabInactive }}>{tab.label}</button>
          ))}
        </div>
        <div style={styles.errorWrap}>
          {/* Icon */}
          <div style={styles.errorIconWrap}>
            <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
              <path d="M12 2L2 19h20L12 2z" stroke="#dc2626" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M12 9v5" stroke="#dc2626" strokeWidth="1.8" strokeLinecap="round"/>
              <circle cx="12" cy="17" r="0.8" fill="#dc2626"/>
            </svg>
          </div>

          <h3 style={styles.errorTitle}>Not possible in Domestic</h3>
          <p style={styles.errorBody}>
            Your chargeable weight of <strong>{calculatedWeight.toFixed(2)} KG</strong> exceeds
            the <strong>{MAX_DOMESTIC_KG} KG</strong> limit for domestic shipments.
          </p>
          <p style={styles.errorSuggestion}>
            Please try shipping via <strong>LTL</strong> or <strong>B2B Load</strong> services
            which are designed for heavy and bulk shipments.
          </p>

          <a href="#activate-ltl" style={styles.errorCta}>
            <svg width="15" height="15" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Activate LTL / B2B Load Services
          </a>

          <p style={styles.errorNote}>
            You will be redirected to activate LTL or B2B load shipping for your account.
          </p>
        </div>
      </div>
    );
  }

  // ── Normal results ───────────────────────────────────────────────────────
  return (
    <div style={styles.card}>
      <div style={styles.tabRow}>
        {tabs.map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            style={{ ...styles.tab, ...(activeTab === tab.key ? styles.tabActive : styles.tabInactive) }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === 'rto' && (
        <div style={styles.rtoNote}>
          <InfoIcon color="#b45309" />
          <span style={styles.rtoNoteText}>
            <strong>Forward + RTO charges included.</strong> This total covers both the forward
            delivery charge and the return charge in case the shipment is undelivered and returned
            to origin.
          </span>
        </div>
      )}

      {/* Express */}
      <div style={styles.resultCard}>
        <div style={styles.resultLeft}>
          <div style={styles.serviceTitle}>Express</div>
          <div style={styles.priceRow}>
            <span style={styles.rupee}>₹</span>
            <span style={styles.price}>{data.express.price}</span>
            <span style={styles.deliveryText}>&nbsp;/ Delivery in {data.express.delivery} day{data.express.delivery !== '1' ? 's' : ''}</span>
          </div>
          <div style={styles.breakdownList}>
            {data.express.breakdown.map((item, i) => (
              <div key={i} style={styles.breakdownRow}>
                <InfoIcon />
                <span style={styles.breakdownLabel}>{item.label}:</span>
                <span style={styles.breakdownValue}>{item.value}</span>
              </div>
            ))}
          </div>
          {activeTab === 'rto' && <div style={styles.rtoTag}><span style={styles.rtoTagText}>Forward + RTO</span></div>}
        </div>
        <div style={styles.resultIcon}><AirplaneIcon /></div>
      </div>

      <div style={styles.divider} />

      {/* Surface */}
      <div style={styles.resultCard}>
        <div style={styles.resultLeft}>
          <div style={styles.serviceTitle}>Surface</div>
          <div style={styles.priceRow}>
            <span style={styles.rupee}>₹</span>
            <span style={styles.price}>{data.surface.price}</span>
            <span style={styles.deliveryText}>&nbsp;/ Delivery in {data.surface.delivery} day{data.surface.delivery !== '1' ? 's' : ''}</span>
          </div>
          <div style={styles.breakdownList}>
            {data.surface.breakdown.map((item, i) => (
              <div key={i} style={styles.breakdownRow}>
                <InfoIcon />
                <span style={styles.breakdownLabel}>{item.label}:</span>
                <span style={styles.breakdownValue}>{item.value}</span>
              </div>
            ))}
          </div>
          {activeTab === 'rto' && <div style={styles.rtoTag}><span style={styles.rtoTagText}>Forward + RTO</span></div>}
        </div>
        <div style={styles.resultIcon}><TruckIcon /></div>
      </div>

      <div style={styles.linkWrap}>
        <a href="#" style={styles.link}>View Detailed Rate Card</a>
      </div>

      {/* Create Order CTA */}
      <div style={styles.ctaWrap}>
        <a href="/create-order" style={styles.ctaBtn}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
            <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="2"/>
            <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          Create Order
        </a>
        <p style={styles.ctaNote}>Rates are indicative. Final charges may vary based on actual shipment.</p>
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
    color: '#9ca3af',
    cursor: 'default',
  },
  placeholder: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '48px 24px',
    textAlign: 'center',
  },
  placeholderText: {
    fontSize: 14,
    color: '#9ca3af',
    lineHeight: 1.7,
  },
  errorWrap: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '32px 28px',
    textAlign: 'center',
  },
  errorIconWrap: {
    width: 64,
    height: 64,
    borderRadius: '50%',
    background: '#fef2f2',
    border: '1px solid #fecaca',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 18,
    fontWeight: 700,
    color: '#1a1f36',
    marginBottom: 10,
  },
  errorBody: {
    fontSize: 14,
    color: '#374151',
    lineHeight: 1.6,
    marginBottom: 10,
  },
  errorSuggestion: {
    fontSize: 14,
    color: '#6b7280',
    lineHeight: 1.6,
    marginBottom: 20,
  },
  errorCta: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    padding: '11px 22px',
    background: '#4f6ef7',
    color: '#ffffff',
    borderRadius: 10,
    fontSize: 14,
    fontWeight: 600,
    textDecoration: 'none',
    marginBottom: 14,
    transition: 'background 0.15s',
  },
  errorNote: {
    fontSize: 11,
    color: '#9ca3af',
    lineHeight: 1.5,
  },
  rtoNote: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 8,
    margin: '0 20px 12px',
    padding: '10px 14px',
    background: '#fffbeb',
    border: '1px solid #fde68a',
    borderRadius: 8,
  },
  rtoNoteText: {
    fontSize: 12,
    color: '#92400e',
    lineHeight: 1.6,
  },
  rtoTag: {
    display: 'inline-flex',
    marginTop: 8,
  },
  rtoTagText: {
    fontSize: 11,
    fontWeight: 600,
    color: '#b45309',
    background: '#fef3c7',
    border: '1px solid #fde68a',
    borderRadius: 5,
    padding: '2px 8px',
  },
  resultCard: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: '20px 24px',
  },
  resultLeft: { flex: 1 },
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
  rupee: { fontSize: 22, fontWeight: 700, color: '#1a1f36', lineHeight: 1 },
  price: { fontSize: 38, fontWeight: 700, color: '#1a1f36', lineHeight: 1, letterSpacing: '-1px' },
  deliveryText: { fontSize: 13, color: '#6b7280', fontWeight: 400, marginLeft: 2 },
  breakdownList: { display: 'flex', flexDirection: 'column', gap: 4, marginBottom: 4 },
  breakdownRow: { display: 'flex', alignItems: 'center', gap: 5 },
  breakdownLabel: { fontSize: 12, color: '#9ca3af' },
  breakdownValue: { fontSize: 12, color: '#6b7280', fontWeight: 600 },
  resultIcon: { flexShrink: 0, marginLeft: 12, marginTop: 4 },
  divider: { height: 1, background: '#e5e7eb', margin: '0 24px' },
  linkWrap: { padding: '16px 24px 0', textAlign: 'center' },
  link: { fontSize: 14, color: '#4f6ef7', fontWeight: 500, textDecoration: 'none' },
  ctaWrap: {
    padding: '14px 20px 20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    gap: 8,
  },
  ctaBtn: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 0',
    background: '#1a1f36',
    color: '#ffffff',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'background 0.15s',
  },
  ctaNote: {
    fontSize: 11,
    color: '#9ca3af',
    textAlign: 'center',
    lineHeight: 1.5,
  },
};
