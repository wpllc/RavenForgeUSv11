import React, { useEffect, useRef, useState } from 'react';
import FictionBanner from './FictionBanner';

const CONTACTS = ['KESTREL-9 (fictional)', 'NIGHTJAR-4 (fictional)', 'HELIX-VOID (fictional)'];

// Fictional launch-and-intercept game step. A countdown, an abort control, and a
// random outcome. Nothing is launched and no real system is involved.
export default function LaunchSequence() {
  const [target, setTarget] = useState(CONTACTS[0]);
  const [count, setCount] = useState(null);
  const [log, setLog] = useState([]);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const tick = (n) => {
    if (n > 0) {
      setLog((l) => [...l, `T-minus ${n}`]);
      setCount(n);
      timer.current = setTimeout(() => tick(n - 1), 900);
    } else {
      const hit = Math.random() > 0.35;
      setCount(null);
      setLog((l) => [...l, hit ? `Story result: ${target} intercepted.` : `Story result: ${target} evaded. Re-plan.`]);
    }
  };

  const start = () => {
    clearTimeout(timer.current);
    setLog([`Fictional sequence armed against ${target}.`]);
    tick(5);
  };

  const abort = () => {
    clearTimeout(timer.current);
    setCount(null);
    setLog((l) => [...l, 'Sequence aborted by operator (fiction).']);
  };

  const running = count !== null;
  return (
    <div className="hud-panel corners" style={{ padding: '18px' }}>
      <div className="corners-inner"></div>
      <FictionBanner>no launch occurs; outcome is random</FictionBanner>
      <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber)', margin: '0 0 12px' }}>INTERCEPT SEQUENCE (STORY)</h3>
      <label className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)', display: 'block', marginBottom: '6px' }}>
        Story contact
        <select value={target} disabled={running} onChange={(e) => setTarget(e.target.value)}
          style={{ display: 'block', marginTop: '6px', background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(0,243,255,0.2)', padding: '8px', fontFamily: 'var(--font-mono)' }}>
          {CONTACTS.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
      </label>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', margin: '12px 0' }}>
        <button type="button" className="hud-btn btn-amber" onClick={start} disabled={running} style={{ padding: '10px 14px' }}>Arm and count down</button>
        <button type="button" className="hud-btn btn-red" onClick={abort} disabled={!running} style={{ padding: '10px 14px' }}>Abort</button>
      </div>
      <div aria-live="polite" style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--color-text-dim)', minHeight: '120px', lineHeight: 1.6 }}>
        {log.map((l, i) => <div key={i}>{l}</div>)}
      </div>
    </div>
  );
}
