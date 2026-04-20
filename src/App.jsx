import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import RateCalculatorForm from './components/RateCalculatorForm';
import RateResults from './components/RateResults';
import './index.css';

export default function App() {
  const [calculatedWeight, setCalculatedWeight] = useState(null);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
      <div className="sidebar-desktop">
        <Sidebar />
      </div>
      <div className="app-main">
        <Topbar />
        <div className="app-content">
          <h1 style={styles.pageTitle}>Rate Calculator</h1>
          <div className="app-grid">
            <RateCalculatorForm onCalculate={setCalculatedWeight} />
            <RateResults calculatedWeight={calculatedWeight} />
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageTitle: { fontSize: 22, fontWeight: 700, color: '#1a1f36', marginBottom: 20 },
};
