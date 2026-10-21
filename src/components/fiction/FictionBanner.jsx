import React from 'react';

// Shared label used on every fictional panel. Not a security or access notice.
export default function FictionBanner({ children }) {
  return (
    <p className="tech-font" role="note" style={{ fontSize: '0.68rem', color: 'var(--color-amber)', margin: '0 0 10px' }}>
      FICTION // {children || 'SIMULATED DATA ONLY'}
    </p>
  );
}
