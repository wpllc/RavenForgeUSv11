import React from 'react';
import FictionBanner from './FictionBanner';

// Restored mission directive copy for the fictional story world. Describes invented
// operators and invented technology. Not a statement about any real organization.
export default function Briefing() {
  return (
    <div className="hud-panel corners accent-amber" style={{ padding: '20px', background: 'rgba(25, 20, 15, 0.4)' }}>
      <div className="corners-inner"></div>
      <FictionBanner>story world mission directive</FictionBanner>
      <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber)', margin: '0 0 12px' }}>RAVENFORGE STORY DIRECTIVE</h3>
      <div style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
        <p>In this invented future, the fictional RavenForge Labs builds story-world cockpits so quick and steady that
          every in-game threat backs away. The Night Watch follows story contacts across a stylized sky, and the
          operators decide which contacts to shadow and which to let pass.</p>
        <blockquote style={{ margin: '12px 0', paddingLeft: '12px', borderLeft: '3px solid var(--color-amber)' }}>
          <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontWeight: 'bold' }}>"Power of the Gods."</span> (story slogan)
          The gliders in this story cruise the upper layers at invented speeds. Every name, number, and map is made up.
        </blockquote>
      </div>
    </div>
  );
}
