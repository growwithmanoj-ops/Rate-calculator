import React, { useState } from 'react';

// Pincode → state lookup by first 2 digits
const STATE_MAP = {
  '11': 'Delhi',        '12': 'Haryana',         '13': 'Haryana',
  '14': 'Punjab',       '15': 'Punjab',           '16': 'Punjab',
  '17': 'Himachal Pradesh', '18': 'Jammu & Kashmir', '19': 'Jammu & Kashmir',
  '20': 'Uttar Pradesh','21': 'Uttar Pradesh',    '22': 'Uttar Pradesh',
  '23': 'Uttar Pradesh','24': 'Uttar Pradesh',    '25': 'Uttar Pradesh',
  '26': 'Uttar Pradesh','27': 'Uttar Pradesh',    '28': 'Uttar Pradesh',
  '30': 'Rajasthan',    '31': 'Rajasthan',        '32': 'Rajasthan',
  '33': 'Rajasthan',    '34': 'Rajasthan',
  '36': 'Gujarat',      '37': 'Gujarat',          '38': 'Gujarat',      '39': 'Gujarat',
  '40': 'Maharashtra',  '41': 'Maharashtra',      '42': 'Maharashtra',
  '43': 'Maharashtra',  '44': 'Maharashtra',
  '45': 'Madhya Pradesh','46': 'Madhya Pradesh',  '47': 'Madhya Pradesh','48': 'Madhya Pradesh',
  '49': 'Chhattisgarh',
  '50': 'Telangana',    '51': 'Andhra Pradesh',   '52': 'Andhra Pradesh','53': 'Andhra Pradesh',
  '56': 'Karnataka',    '57': 'Karnataka',        '58': 'Karnataka',    '59': 'Karnataka',
  '60': 'Tamil Nadu',   '61': 'Tamil Nadu',       '62': 'Tamil Nadu',
  '63': 'Tamil Nadu',   '64': 'Tamil Nadu',
  '67': 'Kerala',       '68': 'Kerala',           '69': 'Kerala',
  '70': 'West Bengal',  '71': 'West Bengal',      '72': 'West Bengal',
  '73': 'West Bengal',  '74': 'West Bengal',
  '75': 'Odisha',       '76': 'Odisha',           '77': 'Odisha',
  '78': 'Assam',        '79': 'North East',
  '80': 'Bihar',        '81': 'Bihar',            '82': 'Bihar',
  '83': 'Jharkhand',    '84': 'Bihar',            '85': 'Bihar',
};

// Metro city pincode prefixes (first 3 digits)
const METRO_PREFIXES = new Set(['110', '400', '401', '560', '600', '601', '602', '603', '700', '500', '380', '411']);

const ZONES = {
  A: { label: 'Zone A', definition: 'Within City — same city delivery', color: '#16a34a', bg: '#dcfce7', border: '#bbf7d0' },
  B: { label: 'Zone B', definition: 'Within State — intra-state, different city', color: '#2563eb', bg: '#dbeafe', border: '#bfdbfe' },
  C: { label: 'Zone C', definition: 'Metro to Metro — between major metro cities', color: '#7c3aed', bg: '#ede9fe', border: '#ddd6fe' },
  D: { label: 'Zone D', definition: 'Rest of India — metro to non-metro or between non-metro cities', color: '#d97706', bg: '#fef3c7', border: '#fde68a' },
  E: { label: 'Zone E', definition: 'Special / Remote Areas — Andaman, North-East states', color: '#dc2626', bg: '#fee2e2', border: '#fecaca' },
};

function getZone(fromPin, toPin) {
  if (fromPin.length !== 6 || toPin.length !== 6) return null;

  // Special / remote areas
  if (fromPin.startsWith('744') || toPin.startsWith('744') ||
      fromPin.startsWith('79') || toPin.startsWith('79')) {
    return ZONES.E;
  }

  // Zone A: same first 3 digits → same city/district
  if (fromPin.substring(0, 3) === toPin.substring(0, 3)) return ZONES.A;

  const fromState = STATE_MAP[fromPin.substring(0, 2)];
  const toState   = STATE_MAP[toPin.substring(0, 2)];

  // Zone B: same state
  if (fromState && toState && fromState === toState) return ZONES.B;

  const fromMetro = METRO_PREFIXES.has(fromPin.substring(0, 3));
  const toMetro   = METRO_PREFIXES.has(toPin.substring(0, 3));

  // Zone C: metro ↔ metro
  if (fromMetro && toMetro) return ZONES.C;

  // Zone D: everything else (metro↔non-metro or non-metro↔non-metro cross-state)
  return ZONES.D;
}

export default function RateCalculatorForm({ onCalculate }) {
  const [fromPin, setFromPin] = useState('641009');
  const [toPin, setToPin] = useState('641009');
  const [packageType, setPackageType] = useState('Plastic cover/Flyer');
  const [weight, setWeight] = useState('500');
  const [dims, setDims] = useState({ l: '1', b: '1', h: '1' });
  const [paymentMode, setPaymentMode] = useState('prepaid');
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [zoneTooltip, setZoneTooltip] = useState(false);

  const zone = getZone(fromPin, toPin);

  // Volumetric weight in KG: L*B*H / 5000 (standard courier formula)
  const volWeightKg = (+dims.l * +dims.b * +dims.h) / 5000;
  // Dead weight in KG
  const deadWeightKg = +weight / 1000;
  // Applicable (charged) weight = max of the two
  const applicableWeightKg = Math.max(volWeightKg, deadWeightKg);

  const volWeightExpress = volWeightKg.toFixed(2);
  const volWeightSurface = volWeightKg.toFixed(2);

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

        {/* Zone badge */}
        {zone && (
          <div style={styles.zoneRow}>
            <div
              style={{ ...styles.zoneBadge, background: zone.bg, border: `1px solid ${zone.border}`, color: zone.color }}
              onMouseEnter={() => setZoneTooltip(true)}
              onMouseLeave={() => setZoneTooltip(false)}
            >
              <span style={styles.zoneLetter}>{zone.label}</span>
              <span style={styles.zoneSep}>·</span>
              <span style={styles.zoneDef}>{zone.definition}</span>
              <svg width="13" height="13" fill="none" viewBox="0 0 24 24" style={{ marginLeft: 4, flexShrink: 0 }}>
                <circle cx="12" cy="12" r="9" stroke={zone.color} strokeWidth="1.8"/>
                <path d="M12 8v4M12 16v.5" stroke={zone.color} strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              {zoneTooltip && (
                <div style={styles.zoneTooltip}>
                  <div style={styles.zoneTooltipTitle}>{zone.label}</div>
                  <div style={styles.zoneTooltipBody}>{zone.definition}.</div>
                  <div style={styles.zoneTooltipGrid}>
                    {Object.entries(ZONES).map(([key, z]) => (
                      <div key={key} style={{ ...styles.zoneTooltipRow, ...(key === Object.keys(ZONES).find(k => ZONES[k] === zone) ? styles.zoneTooltipRowActive : {}) }}>
                        <span style={{ ...styles.zoneTooltipBadge, background: z.bg, color: z.color, borderColor: z.border }}>{z.label}</span>
                        <span style={styles.zoneTooltipRowDef}>{z.definition.split('—')[0].trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
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

      {/* Weight pills: Volumetric Weight + Applicable Weight */}
      <div style={styles.weightPillsRow}>
        <div style={styles.weightPill}>
          <span style={styles.weightPillLabel}>Volumetric Weight :</span>
          <span style={styles.weightPillValue}>{volWeightKg.toFixed(2)} KG</span>
        </div>

        <div
          style={styles.weightPillApplicable}
          onMouseEnter={() => setTooltipVisible(true)}
          onMouseLeave={() => setTooltipVisible(false)}
        >
          <span style={styles.weightPillLabel}>Charged Weight :</span>
          <span style={styles.weightPillValueBold}>{applicableWeightKg.toFixed(2)} KG</span>
          <span style={styles.pillInfoIcon}>
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24">
              <circle cx="12" cy="12" r="9" stroke="#6b7280" strokeWidth="1.8"/>
              <path d="M12 8v4M12 16v.5" stroke="#6b7280" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
          </span>
          {tooltipVisible && (
            <div style={styles.tooltip}>
              Between the package weight and volumetric weight, the number that is higher becomes the shipment's applicable weight.
            </div>
          )}
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

      {/* Calculate button */}
      <div style={styles.calcBtnWrap}>
        <button
          style={styles.calcBtn}
          onClick={() => onCalculate && onCalculate(applicableWeightKg)}
        >
          Calculate Charges
        </button>
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
  weightPillsRow: {
    display: 'flex',
    gap: 10,
    padding: '14px 24px 0',
    flexWrap: 'wrap',
  },
  weightPill: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: '#f3f4f6',
    border: '1px solid #e5e7eb',
    borderRadius: 8,
    padding: '8px 14px',
    flex: 1,
    minWidth: 0,
  },
  weightPillApplicable: {
    display: 'flex',
    alignItems: 'center',
    gap: 5,
    background: '#eef0fd',
    border: '1px solid #c7cffb',
    borderRadius: 8,
    padding: '8px 14px',
    flex: 1,
    minWidth: 0,
    position: 'relative',
    cursor: 'default',
  },
  weightPillLabel: {
    fontSize: 12,
    color: '#6b7280',
    fontWeight: 500,
    whiteSpace: 'nowrap',
  },
  weightPillValue: {
    fontSize: 13,
    color: '#374151',
    fontWeight: 600,
    whiteSpace: 'nowrap',
  },
  weightPillValueBold: {
    fontSize: 13,
    color: '#3b52d4',
    fontWeight: 700,
    whiteSpace: 'nowrap',
  },
  pillInfoIcon: {
    display: 'flex',
    alignItems: 'center',
    marginLeft: 2,
    flexShrink: 0,
  },
  tooltip: {
    position: 'absolute',
    bottom: 'calc(100% + 8px)',
    left: '50%',
    transform: 'translateX(-50%)',
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 10,
    padding: '12px 16px',
    fontSize: 13,
    color: '#374151',
    lineHeight: 1.6,
    width: 280,
    boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
    zIndex: 50,
    pointerEvents: 'none',
  },
  zoneRow: {
    marginTop: 10,
  },
  zoneBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    borderRadius: 8,
    padding: '7px 12px',
    fontSize: 12,
    fontWeight: 500,
    cursor: 'default',
    position: 'relative',
    userSelect: 'none',
  },
  zoneLetter: {
    fontWeight: 700,
    fontSize: 12,
  },
  zoneSep: {
    opacity: 0.4,
    fontSize: 14,
  },
  zoneDef: {
    fontSize: 12,
    fontWeight: 500,
  },
  zoneTooltip: {
    position: 'absolute',
    top: 'calc(100% + 8px)',
    left: 0,
    background: '#ffffff',
    border: '1px solid #e5e7eb',
    borderRadius: 12,
    padding: '14px 16px',
    width: 320,
    boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
    zIndex: 60,
    pointerEvents: 'none',
  },
  zoneTooltipTitle: {
    fontSize: 13,
    fontWeight: 700,
    color: '#1a1f36',
    marginBottom: 4,
  },
  zoneTooltipBody: {
    fontSize: 12,
    color: '#6b7280',
    marginBottom: 12,
    lineHeight: 1.5,
  },
  zoneTooltipGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: 6,
  },
  zoneTooltipRow: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 6px',
    borderRadius: 6,
  },
  zoneTooltipRowActive: {
    background: '#f9fafb',
  },
  zoneTooltipBadge: {
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 5,
    border: '1px solid',
    flexShrink: 0,
    minWidth: 56,
    textAlign: 'center',
  },
  zoneTooltipRowDef: {
    fontSize: 12,
    color: '#374151',
  },
  calcBtnWrap: {
    padding: '16px 24px 24px',
  },
  calcBtn: {
    width: '100%',
    padding: '12px 0',
    background: '#4f6ef7',
    color: '#ffffff',
    border: 'none',
    borderRadius: 10,
    fontSize: 15,
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
};
