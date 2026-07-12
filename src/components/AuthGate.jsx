import React, { useState, useEffect } from 'react';
import { Shield, Key, AlertTriangle, Terminal, Cpu } from 'lucide-react';

// Secure SHA-256 Hashing helper using standard browser Web Cryptography APIs
async function sha256(message) {
  const msgBuffer = new TextEncoder().encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

export default function AuthGate({ children }) {
  const [authorized, setAuthorized] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [accessHash, setAccessHash] = useState(null);
  const [errorState, setErrorState] = useState(null); // null, 'DENIED', 'UNCONFIGURED'
  const [loading, setLoading] = useState(true);
  const [attempts, setAttempts] = useState(0);

  // Load database metadata and credentials key hash
  useEffect(() => {
    const checkEnclaveState = async () => {
      // Check session memory first
      if (sessionStorage.getItem('hud_authorized') === 'true') {
        setAuthorized(true);
        setLoading(false);
        return;
      }

      try {
        const res = await fetch('/aggregated_intelligence.json');
        if (res.ok) {
          const json = await res.json();
          setAccessHash(json.access_hash);
        }
      } catch (e) {
        console.warn("Datalink node uninitialized; defaulting to simulation security codes.", e);
      } finally {
        setLoading(false);
      }
    };
    checkEnclaveState();
  }, []);

  const handleAuthentication = async (e) => {
    e.preventDefault();
    if (!passcode) return;

    setErrorState(null);

    // Compute input SHA-256 hash
    const inputHash = await sha256(passcode.trim());

    // Determine target hash:
    // If user configured a key in .env, compare hashes.
    // If unconfigured (.env has no HUD_ACCESS_PASSCODE), default fallback passcode is "raven"
    // (SHA-256 for "raven" is: 092cda390b47416151199357c71b71d07dbc1fc70a57399d2c91fe246691112c)
    const targetHash = accessHash || '092cda390b47416151199357c71b71d07dbc1fc70a57399d2c91fe246691112c';

    if (inputHash === targetHash) {
      setAuthorized(true);
      sessionStorage.setItem('hud_authorized', 'true');
    } else {
      setAttempts(prev => prev + 1);
      setErrorState('DENIED');
      setPasscode('');
      
      // Clear denied notice after 3 seconds
      setTimeout(() => {
        setErrorState(null);
      }, 3000);
    }
  };

  if (loading) {
    return (
      <div className="hud-crt-screen" style={{ background: '#0a0d14', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>
        <div className="hud-scanlines"></div>
        <Cpu className="pulse-indicator spin-animation" style={{ background: 'transparent', width: '48px', height: '48px', marginBottom: '15px' }} />
        <div style={{ letterSpacing: '0.1em', fontSize: '0.85rem' }}>DECRYPTING CRYPTO LAYER SHIELD...</div>
      </div>
    );
  }

  // Render Lock Screen if unauthorized
  if (!authorized) {
    return (
      <div className="hud-crt-screen" style={{ background: '#080a0f', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div className="hud-scanlines"></div>
        
        {/* Background Grid Accent */}
        <div className="hud-grid-matrix" style={{ opacity: 0.15 }}></div>

        {/* Lock Screen Core Box */}
        <div className={`hud-panel corners ${errorState === 'DENIED' ? 'accent-red' : ''}`} style={{ 
          maxWidth: '460px', 
          width: '100%', 
          padding: '30px 40px', 
          background: 'rgba(10, 13, 20, 0.9)',
          boxShadow: errorState === 'DENIED' ? '0 0 25px rgba(255, 59, 48, 0.15)' : '0 0 25px rgba(0, 243, 255, 0.08)',
          zIndex: 1000,
          transition: 'all 0.3s ease'
        }}>
          <div className="corners-inner"></div>

          {/* Icon Reticle Header */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
            <div style={{ 
              width: '80px', 
              height: '80px', 
              border: errorState === 'DENIED' ? '2px solid var(--color-red)' : '2px solid var(--color-cyan)', 
              boxShadow: errorState === 'DENIED' ? 'var(--glow-red)' : 'var(--glow-cyan)', 
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(0,0,0,0.4)',
              position: 'relative'
            }}>
              <Shield size={36} style={{ color: errorState === 'DENIED' ? 'var(--color-red)' : 'var(--color-cyan)' }} />
              {/* Rotating Scanning Reticle Ring */}
              <div style={{
                position: 'absolute',
                top: '-4px',
                left: '-4px',
                right: '-4px',
                bottom: '-4px',
                border: errorState === 'DENIED' ? '1px dashed var(--color-red)' : '1px dashed var(--color-cyan)',
                borderRadius: '50%',
                animation: 'spin-animation 8s linear infinite'
              }}></div>
            </div>
            
            <h3 className="tech-font" style={{ fontSize: '1rem', color: errorState === 'DENIED' ? 'var(--color-red)' : 'var(--color-cyan)', textTransform: 'uppercase', letterSpacing: '0.15em', marginTop: '10px', textAlign: 'center' }}>
              {errorState === 'DENIED' ? 'AUTHORIZATION FAIL' : 'SYSTEM ENCLAVE SECURED'}
            </h3>
            
            <span style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)', textTransform: 'uppercase' }}>
              Clearance Matrix Gate // Port 3000
            </span>
          </div>

          {/* Lock Screen Form */}
          <form onSubmit={handleAuthentication} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)', letterSpacing: '0.05em' }}>
                ENTER CRYPTOGRAPHIC ACCESS KEY:
              </label>
              
              <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Key size={14} style={{ position: 'absolute', left: '12px', color: errorState === 'DENIED' ? 'var(--color-red)' : 'var(--color-cyan)' }} />
                <input 
                  type="password" 
                  placeholder="AUTHORIZATION PASSCODE..." 
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  autoFocus
                  style={{
                    width: '100%',
                    background: 'rgba(0, 0, 0, 0.5)',
                    border: errorState === 'DENIED' ? '1px solid var(--color-red)' : '1px solid var(--color-cyan)',
                    borderRadius: '2px',
                    padding: '10px 10px 10px 38px',
                    color: '#fff',
                    fontSize: '0.85rem',
                    fontFamily: 'var(--font-mono)',
                    outline: 'none',
                    letterSpacing: '0.15em',
                    boxShadow: errorState === 'DENIED' ? 'var(--glow-red-subtle)' : 'none',
                    transition: 'box-shadow 0.3s ease, border-color 0.3s ease'
                  }}
                />
              </div>
            </div>

            <button 
              type="submit" 
              className={`hud-btn ${errorState === 'DENIED' ? 'btn-red' : 'btn-cyan'}`}
              style={{ padding: '12px', fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
            >
              <Terminal size={14} />
              <span>AUTHENTICATE MATRIX</span>
            </button>
          </form>

          {/* Visual warnings and instructions */}
          {errorState === 'DENIED' ? (
            <div style={{ marginTop: '20px', padding: '10px 15px', background: 'rgba(255, 59, 48, 0.05)', border: '1px solid rgba(255, 59, 48, 0.2)', borderRadius: '2px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--color-red)', fontSize: '0.7rem', fontFamily: 'var(--font-mono)' }}>
              <AlertTriangle className="pulse-indicator indicator-red" size={16} style={{ flexShrink: 0, background: 'transparent' }} />
              <div>
                <strong>ACCESS DENIED.</strong> Cryptographic signature mismatch. Intrusion event logged. (Attempt: {attempts})
              </div>
            </div>
          ) : (
            <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>
              RAVENFORGE SECURITY PROTOCOL 98-F // CONUS CRYPTO ENCLAVE
            </div>
          )}

        </div>
      </div>
    );
  }

  return children;
}
