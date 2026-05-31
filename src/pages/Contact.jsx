import React, { useState, useEffect, useRef } from 'react';
import { Shield, Lock, Send, Terminal, Key } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', channel: '', payload: '' });
  const [statusLogs, setStatusLogs] = useState([]);
  const [isSending, setIsSending] = useState(false);
  const [sendComplete, setSendComplete] = useState(false);
  const terminalEndRef = useRef(null);

  // Auto-scroll inside tactical terminal
  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [statusLogs]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.payload) return;

    setIsSending(true);
    setStatusLogs([]);
    setSendComplete(false);

    // Dynamic high-tech secure transmission simulation logs!
    const logSteps = [
      { t: 100, text: '>> INITIALIZING TRAN-SECURE COMMUNICATIONS NETWORK...' },
      { t: 400, text: '>> SEARCHING ACTIVE SATELLITE LINKS... FOUND AEGIS-VIGIL [SAT-1A]' },
      { t: 800, text: '>> SYNCING DECRYPT SCHEMATICS... ATTACHING COMPASS VECTORS...' },
      { t: 1200, text: '>> INJECTING 4096-BIT RSA CRYPTOGRAPHIC WRAPPER...' },
      { t: 1500, text: `>> DISPATCHING ENCRYPTED COMMAND PACKAGE FOR SENDER [${formData.name.toUpperCase()}]` },
      { t: 1900, text: '>> ESTABLISHING GROUND CHANNEL HANDSHAKE... SECURED [RTT 14ms]' },
      { t: 2300, text: '>> DEPLOYING MESSAGE CORE TO ARCHITECT STORAGE... DISPATCH CONFIRMED!' },
      { t: 2600, text: '>> UPLINK COMPLETED SUCCESSFULLY // SYSTEM RETURNED 200_OK.' }
    ];

    logSteps.forEach((step) => {
      setTimeout(() => {
        setStatusLogs((prev) => [...prev, step.text]);
      }, step.t);
    });

    setTimeout(() => {
      setIsSending(false);
      setSendComplete(true);
      setFormData({ name: '', channel: '', payload: '' });
    }, 2800);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div className="hud-panel corners accent-red" style={{ padding: '20px', background: 'rgba(255, 59, 48, 0.02)' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Lock size={20} className="pulse-indicator indicator-red" style={{ background: 'transparent' }} />
          <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-red)' }}>SECURE CRYPTO CHANNEL ONLINE</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          SECURE UPLINK TERMINAL
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '700px', lineHeight: '1.4', marginTop: '6px' }}>
          Dispatch secure trans-atmospheric messages directly to the Chief Aerospace Architect. 
          All communication data packet payloads are wrapped inside 4096-bit cryptographic shields before dispatch.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>
        
        {/* SECURE INPUT CONTROLS PANEL */}
        <div className="hud-panel corners" style={{ padding: '24px', background: 'rgba(15,20,30,0.6)' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0,243,255,0.15)', paddingBottom: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Key size={16} />
            PAYLOAD DISPATCH INPUTS
          </h3>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>SENDER_CALLSIGN / IDENTIFIER</label>
              <input 
                type="text" 
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isSending}
                placeholder="e.g. SPECIAL OPERATIVE SMITH"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,243,255,0.15)',
                  borderRadius: '2px',
                  padding: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  transition: 'border 0.25s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,243,255,0.15)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>COMMUNICATION RETURN CHANNEL</label>
              <input 
                type="email" 
                value={formData.channel}
                onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                required
                disabled={isSending}
                placeholder="e.g. name@agency.gov"
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,243,255,0.15)',
                  borderRadius: '2px',
                  padding: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  transition: 'border 0.25s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,243,255,0.15)'}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <label className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>TRANSMISSION DATA PAYLOAD</label>
              <textarea 
                rows="4"
                value={formData.payload}
                onChange={(e) => setFormData({ ...formData, payload: e.target.value })}
                required
                disabled={isSending}
                placeholder="Enter tactical briefing, requirements, or vector coordinate needs..."
                style={{
                  background: 'rgba(0,0,0,0.4)',
                  border: '1px solid rgba(0,243,255,0.15)',
                  borderRadius: '2px',
                  padding: '10px',
                  color: '#fff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border 0.25s ease'
                }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-cyan)'}
                onBlur={(e) => e.target.style.borderColor = 'rgba(0,243,255,0.15)'}
              />
            </div>

            <button 
              type="submit" 
              className="hud-btn" 
              disabled={isSending}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                marginTop: '10px'
              }}
            >
              <Send size={14} />
              <span>{isSending ? 'DISPATCHING PAYLOAD...' : 'TRANSMIT ENCRYPTED CORE'}</span>
            </button>

          </form>
        </div>

        {/* SECURE TERMINAL RESPONSE LOGGER */}
        <div className="hud-panel corners accent-cyan" style={{ padding: '24px', background: '#0b0e14', display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0,243,255,0.15)', paddingBottom: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} />
            CRYPTO CHANNEL TRANSMISSION LOGS
          </h3>

          <div style={{ 
            flex: 1, 
            background: 'rgba(0,0,0,0.6)', 
            border: '1px solid rgba(0,243,255,0.08)',
            padding: '15px', 
            borderRadius: '2px',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--color-cyan)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            overflowY: 'auto',
            height: '240px'
          }}>
            {statusLogs.length === 0 ? (
              <div style={{ color: 'var(--color-text-dark)', textAlign: 'center', margin: 'auto' }}>
                [ TERMINAL DISPATCH IDLE - AWAITING PAYLOAD ]
              </div>
            ) : (
              statusLogs.map((log, idx) => (
                <div key={idx} style={{ 
                  color: log.includes('SUCCESSFULLY') ? 'var(--color-green)' : log.includes('ENCRYPTED') ? 'var(--color-amber)' : 'var(--color-cyan)',
                  lineHeight: '1.4'
                }}>
                  {log}
                </div>
              ))
            )}
            
            {isSending && (
              <div className="tech-font" style={{ color: 'var(--color-amber)', animation: 'crt-flicker 0.3s infinite' }}>
                {">> SECURING ENCLAVE VECTOR... [TRANSMITTING]"}
              </div>
            )}
            
            {sendComplete && (
              <div style={{ marginTop: '10px', padding: '10px', background: 'rgba(100,255,100,0.06)', border: '1px solid var(--color-green)', borderRadius: '2px', color: 'var(--color-green)' }}>
                UPLINK CONFIRMED: Message successfully dispatched to Chief Architect Walker Pollitt. Secure trans-atmospheric channel offline.
              </div>
            )}

            <div ref={terminalEndRef}></div>
          </div>
        </div>

      </div>

    </div>
  );
}
