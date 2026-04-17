import React, { useState } from 'react';

export default function RateCalculatorForm({ onChange }) {
  const [fromPin, setFromPin] = useState('641009');
  const [toPin, setToPin] = useState('641009');
  const [packageType, setPackageType] = useState('Plastic cover/Flyer');
  const [weight, setWeight] = useState('500');
  const [dims, setDims] = useState({ l: '1', b: '1', h: '1' });
  const [paymentMode, setPaymentMode] = useState('prepaid');

  const volWeightExpress = ((+dims.l * +dims.b * +dims.h) / 5000).toFixed(2);
  const volWeightSurface = ((+dims.l * +dims.b * +dims.h) / 5000).toFixed(2);

  return (
    <div style={styles.card}>
      {/* Tab */}
      <div style={styles.tabWrap}>
        <button style={styles.tabActive}>Domestic</button>
      </div>

      {/* Pincode section */}
      <div style={styles.section}>
        <label style={styles.label}>Pickup and delivery pincode</label>
        <div style={styles.pincodeRow}>
          {/* From */}
          <div style={styles.pincodeBox}>
            <span style={styles.dotGreen} />
            <input
              style={styles.pincodeInput}
              value={fromPin}
              onChange={e => setFromPin(e.target.value)}
              maxLength={6}
            />
            <span style={styles.stateTag}>TN</span>
          </div>

          {/* Connector line */}
          <div style={styles.connector}>
            <div style={styles.connectorLine} />
          </div>

          {/* To */}
          <div style={styles.pincodeBox}>
            <span style={styles.dotRed} />
            <input
              style={styles.pincodeInput}
              value={toPin}
              onChange={e => setToPin(e.target.value)}
              maxLength={6}
            />
            <span style={styles.stateTag}>TN</span>
          </div>
        </div>

        {/* City labels */}
        <div style={styles.cityRow}>
          <span style={styles.cityLabel}>Coimbatore, Tamil Nadu</span>
          <span style={styles.cityLabel}>Coimbatore, Tamil Nadu</span>
        </div>
      </div>

      {/* Package Type & Weight row */}
      <div style={styles.twoCol}>
        <div style={styles.fieldGroup}>
          <label style={styles.label}>Package Type</label>
          <div style={styles.selectWrap}>
            <select style={styles.select} value={packageType} onChange={e => setPackageType(e.target.value)}>
              <option>Plastic cover/Flyer</option>
              <option>Box</option>
              <option>Envelope</option>
              <option>Tube</option>
            </select>
            <div style={styles.selectArrow}>
              <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
                <path d="M6 9l6 6 6-6" stroke="#6b7280" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </div>
        </div>

        <div style={styles.fieldGroup}>
          <label style={styles.label}>Package Weight</label>
          <div style={styles.weightWrap}>
            <input
              style={styles.weightInput}
              value={weight}
              onChange={e => setWeight(e.target.value)}
              type="number"
              min="1"
            />
            <span style={styles.unitTag}>gm</span>
          </div>
          <p style={styles.helperText}>
            Package weight: sum of item's weight and weight of packaging (e.g. box)
          </p>
        </div>
      </div>

      {/* Dimensions */}
      <div style={styles.section}>
        <label style={styles.label}>Package Dimensions</label>
        <div style={styles.dimsRow}>
          {[
            { key: 'l', label: 'L' },
            { key: 'b', label: 'B' },
            { key: 'h', label: 'H' },
          ].map(({ key }) => (
            <div key={key} style={styles.dimBox}>
              <input
                style={styles.dimInput}
                type="number"
                min="1"
                value={dims[key]}
                onChange={e => setDims(d => ({ ...d, [key]: e.target.value }))}
              />
              <span style={styles.dimUnit}>cm</span>
            </div>
          ))}
        </div>
      </div>

      {/* Volumetric weight info */}
      <div style={styles.volBox}>
        <div style={styles.volHeader}>
          <svg width="14" height="14" fill="none" viewBox="0 0 24 24" style={{ color: '#6b7280', flexShrink: 0 }}>
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M12 8v4M12 16v.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <span style={styles.volTitle}>Volumetric weight calculation</span>
        </div>
        <div style={styles.volRow}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
            <path d="M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h11a2 2 0 012 2v3" stroke="currentColor" strokeWidth="1.5"/>
            <rect x="9" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span style={styles.volServiceLabel}>Express:</span>
          <span style={styles.volFormula}>
            L * B * H / Volumetric Divisor&nbsp;&nbsp;
            <span style={styles.volCalc}>
              ({dims.l} x {dims.b} x {dims.h}/5000 = {volWeightExpress} grams)
            </span>
          </span>
        </div>
        <div style={styles.volRow}>
          <svg width="16" height="16" fill="none" viewBox="0 0 24 24" style={{ color: '#6b7280' }}>
            <rect x="1" y="3" width="15" height="10" rx="1" stroke="currentColor" strokeWidth="1.5"/>
            <path d="M16 7l5 3v4h-5V7z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            <circle cx="5" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
            <circle cx="18" cy="17" r="2" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
          <span style={styles.volServiceLabel}>Surface:</span>
          <span style={styles.volFormula}>
            L * B * H / Volumetric Divisor&nbsp;&nbsp;
            <span style={styles.volCalc}>
              ({dims.l} x {dims.b} x {dims.h}/5000 = {volWeightSurface} grams)
            </span>
          </span>
        </div>
      </div>

      {/* Payment Mode */}
      <div style={styles.section}>
        <label style={styles.label}>Payment Mode</label>
        <div style={styles.radioRow}>
          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="prepaid"
              checked={paymentMode === 'prepaid'}
              onChange={() => setPaymentMode('prepaid')}
              style={{ display: 'none' }}
            />
            <span style={{ ...styles.radioCircle, ...(paymentMode === 'prepaid' ? styles.radioCircleActive : {}) }}>
              {paymentMode === 'prepaid' && <span style={styles.radioDot} />}
            </span>
            <span style={styles.radioText}>Prepaid</span>
          </label>

          <label style={styles.radioLabel}>
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={paymentMode === 'cod'}
              onChange={() => setPaymentMode('cod')}
              style={{ display: 'none' }}
            />
            <span style={{ ...styles.radioCircle, ...(paymentMode === 'cod' ? styles.radioCircleActive : {}) }}>
              {paymentMode === 'cod' && <span style={styles.radioDot} />}
            </span>
            <span style={styles.radioText}>Cash on Delivery (COD)</span>
          </label>
        </div>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: '#ffffff',
    borderRadius: 12,
    border: '1px solid #e5e7eb',
    overflow: 'hidden',
    boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
  },
  tabWrap: {
    borderBottom: '1px solid #e5e7eb',
    display: 'flex',
    paddingLeft: 24,
  },
  tabActive: {
    padding: '14px 0',
    border: 'none',
    background: 'transparent',
    color: '#4f6ef7',
    fontSize: 15,
    fontWeight: 500,
    cursor: 'pointer',
    borderBottom: '2.5px solid #4f6ef7',
    marginBottom: -1,
  },
  section: {
    padding: '20px 24px 0',
  },
  label: {
    fontSize: 13,
    fontWeight: 500,
    color: '#374151',
    marginBottom: 10,
    display: 'block',
  },
  pincodeRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 0,
  },
  pincodeBox: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    padding: '10px 12px',
    background: '#fff',
  },
  dotGreen: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: '#22c55e',
    flexShrink: 0,
  },
  dotRed: {
    width: 9,
    height: 9,
    borderRadius: '50%',
    background: '#ef4444',
    flexShrink: 0,
  },
  pincodeInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: 14,
    fontWeight: 500,
    color: '#1a1f36',
    background: 'transparent',
    width: '100%',
    minWidth: 0,
  },
  stateTag: {
    fontSize: 12,
    fontWeight: 600,
    color: '#9ca3af',
    flexShrink: 0,
  },
  connector: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 4px',
    flexShrink: 0,
  },
  connectorLine: {
    width: 32,
    height: 2,
    background: '#d1d5db',
    position: 'relative',
  },
  cityRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 6,
    paddingRight: 0,
  },
  cityLabel: {
    fontSize: 11,
    color: '#9ca3af',
    flex: 1,
    textAlign: 'center',
  },
  twoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 16,
    padding: '20px 24px 0',
  },
  fieldGroup: {
    display: 'flex',
    flexDirection: 'column',
  },
  selectWrap: {
    position: 'relative',
  },
  select: {
    width: '100%',
    padding: '10px 36px 10px 12px',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    fontSize: 14,
    color: '#1a1f36',
    background: '#fff',
    appearance: 'none',
    outline: 'none',
    cursor: 'pointer',
  },
  selectArrow: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: 'translateY(-50%)',
    pointerEvents: 'none',
  },
  weightWrap: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
  },
  weightInput: {
    flex: 1,
    padding: '10px 12px',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: '#1a1f36',
    background: 'transparent',
    minWidth: 0,
  },
  unitTag: {
    padding: '10px 12px',
    background: '#f3f4f6',
    fontSize: 13,
    color: '#6b7280',
    fontWeight: 500,
    borderLeft: '1.5px solid #e5e7eb',
    flexShrink: 0,
  },
  helperText: {
    fontSize: 11,
    color: '#9ca3af',
    marginTop: 6,
    lineHeight: 1.5,
  },
  dimsRow: {
    display: 'flex',
    gap: 10,
  },
  dimBox: {
    display: 'flex',
    alignItems: 'center',
    border: '1.5px solid #e5e7eb',
    borderRadius: 8,
    overflow: 'hidden',
    flex: 1,
  },
  dimInput: {
    flex: 1,
    padding: '10px 8px',
    border: 'none',
    outline: 'none',
    fontSize: 14,
    color: '#1a1f36',
    background: 'transparent',
    textAlign: 'center',
    width: '100%',
    minWidth: 0,
  },
  dimUnit: {
    padding: '10px 8px',
    background: '#f3f4f6',
    fontSize: 12,
    color: '#6b7280',
    borderLeft: '1.5px solid #e5e7eb',
    flexShrink: 0,
  },
  volBox: {
    margin: '20px 24px 0',
    background: '#f9fafb',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '12px 14px',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
  },
  volHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
  },
  volTitle: {
    fontSize: 12,
    fontWeight: 500,
    color: '#374151',
  },
  volRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 4,
  },
  volServiceLabel: {
    fontSize: 12,
    fontWeight: 600,
    color: '#374151',
    flexShrink: 0,
  },
  volFormula: {
    fontSize: 12,
    color: '#6b7280',
  },
  volCalc: {
    fontSize: 12,
    color: '#6b7280',
  },
  radioRow: {
    display: 'flex',
    gap: 24,
    alignItems: 'center',
    paddingBottom: 24,
    marginTop: 4,
  },
  radioLabel: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    cursor: 'pointer',
  },
  radioCircle: {
    width: 18,
    height: 18,
    borderRadius: '50%',
    border: '2px solid #d1d5db',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    transition: 'border-color 0.15s',
  },
  radioCircleActive: {
    borderColor: '#4f6ef7',
  },
  radioDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: '#4f6ef7',
  },
  radioText: {
    fontSize: 14,
    color: '#374151',
  },
};
