import React, { useState } from 'react';
import FictionBanner from './FictionBanner';

// Restored story dossiers. Codenames, classifications, and specs are invented for the
// fictional RavenForge story world. They are not real programs, products, or capabilities.
const DOSSIERS = [
  {
    code: 'PROJECT ZEPHYR', codename: 'ZPH_HYPERSONIC_GUIDANCE', status: 'OPERATIONAL', classification: 'STORY CLASS / LEVEL 4', threat: 'STORY / HIGH ALTITUDE',
    desc: 'Fictional high-altitude stabilization engine for story glide vehicles. Turns invented radar sweeps into invented coordinate projections.',
    specs: [['CALCULATION VELOCITY', '0.001 MS (STORY REALTIME)'], ['TELEMETRY SAMPLING', '4800 HZ STORY CLOCK'], ['GUIDANCE DECAY LOCK', 'STABLE TO MACH 18.2 (INVENTED)'], ['PLATFORM STACK', 'FICTIONAL PROP ENGINE']],
    impact: 'Story effect: keeps the fictional glider on its route through the upper sky.',
  },
  {
    code: 'PROJECT HELIOS', codename: 'HLS_DIRECTED_ENERGY_CORE', status: 'STORY TESTING', classification: 'STORY CLASS / LEVEL 5', threat: 'STORY / STRATOSPHERE',
    desc: 'Fictional network broker that coordinates an invented mirror array over the story sector.',
    specs: [['AIMING PRECISION', 'INVENTED ARC SECONDS'], ['SYNC RESPONSE', '4 MS STORY ROUND-TRIP'], ['ENERGY FLOW LIMIT', '400 GW STORY CORE'], ['PLATFORM STACK', 'FICTIONAL RELAY ENGINE']],
    impact: 'Story effect: lights up waypoints for the Night Watch operators.',
  },
  {
    code: 'PROJECT AEGIS', codename: 'AGS_SECURE_ENCLAVE', status: 'STORY COMPLETE', classification: 'STORY CLASS / LEVEL 3', threat: 'STORY / CODES',
    desc: 'Fictional story vault. Its lock is a word puzzle, not a real security mechanism.',
    specs: [['ENCRYPTION COMPASS', 'STORY CIPHER (ONE SHIFT)'], ['LOCK CHECK', 'WORD PUZZLE'], ['DECAY HALF-LIFE', '180 STORY SECONDS'], ['PLATFORM STACK', 'FICTIONAL ARCHIVE ENGINE']],
    impact: 'Story effect: opens the archive debrief once the puzzle is solved.',
  },
  {
    code: 'PROJECT TALON', codename: 'TLN_AUTONOMOUS_SWARM', status: 'STORY RESEARCH', classification: 'STORY CLASS / LEVEL 4', threat: 'STORY / SWARMS',
    desc: 'Fictional swarm coordinator for invented drones that fly through the story sky.',
    specs: [['SWARM COUNT CAP', '512 STORY NODES'], ['3D PATHFINDING', 'INVENTED HEURISTIC'], ['COLLISION BUFFER', '1.2 STORY METERS'], ['PLATFORM STACK', 'FICTIONAL SWARM ENGINE']],
    impact: 'Story effect: gives the Night Watch a way to shadow contacts from the sky.',
  },
];

export default function Dossiers() {
  const [active, setActive] = useState(0);
  const d = DOSSIERS[active];
  return (
    <div className="hud-panel corners accent-amber" style={{ padding: '20px', background: 'rgba(15, 20, 30, 0.85)' }}>
      <div className="corners-inner"></div>
      <FictionBanner>arsenal dossiers are invented story documents</FictionBanner>
      <div role="tablist" aria-label="Story dossiers" style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '14px' }}>
        {DOSSIERS.map((x, i) => (
          <button key={x.code} role="tab" aria-selected={i === active} type="button" className={`hud-btn ${i === active ? 'active' : ''}`}
            onClick={() => setActive(i)} style={{ padding: '10px 14px', fontSize: '0.75rem' }}>{x.code}</button>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '12px', marginBottom: '14px' }}>
        <div>
          <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>ACTIVE STORY FILE</div>
          <h3 style={{ fontSize: '1.4rem', fontWeight: 'bold', color: 'var(--color-cyan)' }}>{d.code}</h3>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>CODENAME: <span style={{ color: '#fff' }}>{d.codename}</span></div>
        </div>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          <span className="tactical-badge badge-amber">{d.classification}</span>
          <span className="tactical-badge badge-green">{d.status}</span>
        </div>
      </div>
      <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: 1.5 }}>{d.desc}</p>
      <table className="tech-table" style={{ marginTop: '10px' }}>
        <tbody>
          {d.specs.map(([k, v]) => <tr key={k}><td>{k}</td><td>{v}</td></tr>)}
        </tbody>
      </table>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', marginTop: '12px' }}>{d.impact}</p>
    </div>
  );
}
