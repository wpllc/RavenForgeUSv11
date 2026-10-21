import React from 'react';
import FictionBanner from './FictionBanner';

// Fictional character file. This is a story character, not a real person, and makes
// no statement about any real individual's experience, credentials, or service.
export default function OperatorFile() {
  return (
    <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(15, 20, 30, 0.6)' }}>
      <div className="corners-inner"></div>
      <FictionBanner>fictional character; not a real person</FictionBanner>
      <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '8px', marginBottom: '12px' }}>
        NIGHT WATCH OPERATOR FILE
      </h3>
      <h4 style={{ fontSize: '1.05rem', fontWeight: 'bold', color: '#fff' }}>OPERATOR NIGHTJAR-4</h4>
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '10px' }}>
        <div><span style={{ color: 'var(--color-text-dark)' }}>STORY ROLE:</span> <span style={{ color: 'var(--color-cyan)' }}>Sky watch lead (invented)</span></div>
        <div><span style={{ color: 'var(--color-text-dark)' }}>SPECIALTY:</span> <span style={{ color: 'var(--color-text-main)' }}>Story route planning, cipher puzzles</span></div>
        <div><span style={{ color: 'var(--color-text-dark)' }}>STATUS:</span> <span style={{ color: '#fff' }}>Active in the story world</span></div>
      </div>
    </div>
  );
}
