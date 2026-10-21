import React, { useEffect, useState } from 'react';
import FictionBanner from './FictionBanner';

const MESSAGES = [
  'Relay HELIX-2 nominal. Replay buffer 12/16.',
  'Sector CONUS-EAST packet order restored after simulated jitter.',
  'Archive index rebuilt from synthetic seed 0x2A.',
  'Story route KESTREL-9 handed to navigation desk.',
  'Scheduled ping to demo mainframe answered by local stub.',
  'Synthetic audit line appended: no external system contacted.',
];

// Synthetic message feed. Lines come from a fixed local list on a timer.
export default function MainframeFeed() {
  const [lines, setLines] = useState([]);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (paused) return undefined;
    let i = 0;
    const id = setInterval(() => {
      const stamp = String(i).padStart(3, '0');
      setLines((prev) => [...prev.slice(-7), `[${stamp}] ${MESSAGES[i % MESSAGES.length]}`]);
      i += 1;
    }, 2200);
    return () => clearInterval(id);
  }, [paused]);
  return (
    <div className="hud-panel corners" style={{ padding: '18px' }}>
      <div className="corners-inner"></div>
      <FictionBanner>mainframe lines are generated locally</FictionBanner>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', margin: 0 }}>MAINFRAME MESSAGE FEED</h3>
        <button type="button" className="hud-btn" onClick={() => setPaused((p) => !p)} style={{ padding: '6px 10px' }}>
          {paused ? 'Resume feed' : 'Pause feed'}
        </button>
      </div>
      <div role="log" aria-live="off" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', minHeight: '140px', color: 'var(--color-text-dim)', lineHeight: 1.6 }}>
        {lines.length === 0 ? <div>Feed idle. Resume to start synthetic messages.</div> : lines.map((l, idx) => <div key={idx}>{l}</div>)}
      </div>
    </div>
  );
}
