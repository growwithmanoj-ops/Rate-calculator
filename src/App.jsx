import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import RateCalculatorForm from './components/RateCalculatorForm';
import RateResults from './components/RateResults';
import './index.css';

export default function App() {
  const [calculatedWeight, setCalculatedWeight] = useState(null); // null = not yet calculated

  return (
    <div style={styles.root}>
      <Sidebar />
      <div style={styles.main}>
        <Topbar />
        <div style={styles.content}>
          <h1 style={styles.pageTitle}>Rate Calculator</h1>
          <div style={styles.grid}>
            <div style={styles.formCol}>
              <RateCalculatorForm onCalculate={setCalculatedWeight} />
            </div>
            <div style={styles.resultsCol}>
              <RateResults calculatedWeight={calculatedWeight} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  root: { display: 'flex', minHeight: '100vh', background: '#f5f6fa' },
  main: { marginLeft: 64, flex: 1, display: 'flex', flexDirection: 'column', minHeight: '100vh' },
  content: { marginTop: 56, padding: '28px 32px', flex: 1 },
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#1a1f36', marginBottom: 20 },
  grid: { display: 'grid', gridTemplateColumns: '1fr 480px', gap: 24, alignItems: 'start' },
  formCol: { minWidth: 0 },
  resultsCol: { minWidth: 0 },
};
