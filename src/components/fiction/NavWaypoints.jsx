import React, { useState } from 'react';
import FictionBanner from './FictionBanner';

const WAYPOINTS = [
  { id: 'ALPHA', bearing: '045°', range: '120 km' },
  { id: 'BRAVO', bearing: '190°', range: '340 km' },
  { id: 'CHARLIE', bearing: '270°', range: '75 km' },
];

// Fictional navigation: picks one of three story waypoints and shows its readout.
export default function NavWaypoints() {
  const [current, setCurrent] = useState(null);
  const wp = WAYPOINTS.find((w) => w.id === current);
  return (
    <div className="hud-panel corners" style={{ padding: '18px' }}>
      <div className="corners-inner"></div>
      <FictionBanner>waypoints are invented story points</FictionBanner>
      <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', margin: '0 0 12px' }}>NAVIGATION WAYPOINTS</h3>
      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        {WAYPOINTS.map((w) => (
          <button key={w.id} type="button" className={`hud-btn ${current === w.id ? 'active' : ''}`} aria-pressed={current === w.id}
            onClick={() => setCurrent(w.id)} style={{ padding: '8px 12px' }}>{w.id}</button>
        ))}
      </div>
      <div aria-live="polite" style={{ marginTop: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
        {wp ? `Heading ${wp.bearing} · range ${wp.range} (story values)` : 'Select a waypoint to show its story readout.'}
      </div>
    </div>
  );
}
