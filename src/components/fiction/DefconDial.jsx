import React, { useState } from 'react';
import FictionBanner from './FictionBanner';

const LEVELS = [
  { level: 5, label: 'DEFCON 5', color: 'var(--color-green)' },
  { level: 4, label: 'DEFCON 4', color: 'var(--color-cyan)' },
  { level: 3, label: 'DEFCON 3', color: 'var(--color-amber)' },
  { level: 2, label: 'DEFCON 2', color: 'var(--color-red)' },
  { level: 1, label: 'DEFCON 1', color: 'var(--color-red)' },
];

// Fictional threat dial. It changes only when the viewer presses the button.
export default function DefconDial() {
  const [index, setIndex] = useState(2);
  const current = LEVELS[index];
  const next = () => setIndex((i) => (i + 1) % LEVELS.length);
  return (
    <div className="hud-panel corners" style={{ padding: '18px', background: 'rgba(0,0,0,0.4)' }}>
      <div className="corners-inner"></div>
      <FictionBanner>threat dial does not reflect any real alert status</FictionBanner>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '12px' }}>
        <div className="hud-panel" style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>STORY CONSOLE</div>
          <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>READY_A_1</div>
        </div>
        <div className="hud-panel accent-amber" style={{ padding: '10px 14px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>THREAT STATUS</div>
          <div aria-live="polite" style={{ fontSize: '1rem', fontWeight: 'bold', color: current.color, fontFamily: 'var(--font-mono)' }}>{current.label}</div>
        </div>
      </div>
      <button type="button" className="hud-btn" onClick={next} style={{ padding: '10px 14px' }}>
        Cycle story level
      </button>
    </div>
  );
}
