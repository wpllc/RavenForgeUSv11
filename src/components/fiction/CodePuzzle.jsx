import React, { useState } from 'react';
import FictionBanner from './FictionBanner';

// Self-contained cipher puzzle. The ciphertext is a fixed local string (each letter
// shifted forward one place). Solving it reveals a story debrief only. It is not
// authentication, stores nothing, and does not contact any service.
const CIPHERTEXT = 'SBWFO';
const ANSWER = 'RAVEN';

export default function CodePuzzle() {
  const [guess, setGuess] = useState('');
  const [solved, setSolved] = useState(false);
  const [tried, setTried] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setTried(true);
    setSolved(guess.trim().toUpperCase() === ANSWER);
  };
  return (
    <div className="hud-panel corners" style={{ padding: '18px' }}>
      <div className="corners-inner"></div>
      <FictionBanner>puzzle only; not authentication; grants no access</FictionBanner>
      <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber)', margin: '0 0 10px' }}>STORY CIPHER PUZZLE</h3>
      <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', lineHeight: 1.5, margin: '0 0 10px' }}>
        Story note found on a fictional relay: <span style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{CIPHERTEXT}</span>.
        Hint: each letter was moved one step forward in the alphabet. Decode the word to unlock the story debrief.
      </p>
      <form onSubmit={submit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
        <label htmlFor="cipher-guess" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>Decoded word</label>
        <input id="cipher-guess" value={guess} onChange={(e) => setGuess(e.target.value)} maxLength={12} placeholder="decoded word"
          style={{ background: 'rgba(0,0,0,0.4)', color: '#fff', border: '1px solid rgba(0,243,255,0.2)', padding: '8px', fontFamily: 'var(--font-mono)' }} />
        <button type="submit" className="hud-btn" style={{ padding: '8px 12px' }}>Check word</button>
      </form>
      <div aria-live="polite" style={{ marginTop: '12px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)' }}>
        {tried && !solved && <span style={{ color: 'var(--color-text-dim)' }}>Not yet. Try shifting each letter back one place.</span>}
        {solved && (
          <span style={{ color: 'var(--color-green)' }}>
            Story debrief unlocked: the fictional relay logs a routine sweep. Nothing about this page is a real login or credential.
          </span>
        )}
      </div>
    </div>
  );
}
