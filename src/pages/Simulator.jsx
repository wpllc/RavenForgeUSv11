import React, { useState, useEffect } from 'react';
import RadarScanner from '../components/RadarScanner';
import { Shield, Eye, Database, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function Simulator() {
  const [packetRate, setPacketRate] = useState(4.25);

  useEffect(() => {
    const interval = setInterval(() => {
      setPacketRate((prev) => +(prev + (Math.random() - 0.5) * 0.15).toFixed(2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="simulator-theme">
      {/* 1024x768 Inner Box for Simulator (Optional, scrollable) */}
      <div className="hud-crt-screen" style={{ minHeight: '600px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div className="hud-scanlines"></div>
        <div className="hud-grid-matrix" style={{ opacity: 0.15 }}></div>

        {/* 1. WELCOME COMMAND MODULE */}
        <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(0, 243, 255, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px', zIndex: 10 }}>
          <div className="corners-inner"></div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className="pulse-indicator indicator-green"></span>
              <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-cyan-sim)' }}>SECURE NETWORK ONLINE</span>
            </div>
            <h2 className="tech-font" style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
              TACTICAL COMMAND DASHBOARD
            </h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim-sim)', maxWidth: '600px', lineHeight: '1.4' }}>
              Advanced Aerospace Telemetry Cockpit. This gated console tracks target vectors, transponder logs, and bio-cryptographic status metrics.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <div className="hud-panel" style={{ padding: '10px 15px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
              <div className="tech-font" style={{ fontSize: '0.65rem', color: 'var(--color-text-dark-sim)' }}>THREAT RATE</div>
              <div className="tech-font" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-cyan-sim)' }}>{packetRate} Hz</div>
            </div>
            <div className="hud-panel accent-amber" style={{ padding: '10px 15px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
              <div className="tech-font" style={{ fontSize: '0.65rem', color: 'var(--color-text-dark-sim)' }}>THREAT STATUS</div>
              <div className="tech-font" style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-amber-sim)' }}>DEFCON 3</div>
            </div>
          </div>
        </div>

        {/* 2. RADAR VIEWPORTS */}
        <div style={{ zIndex: 10 }}>
          <RadarScanner />
        </div>

        {/* 3. LOWER GRID DETAILS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px', zIndex: 10 }}>
          
          {/* Bio-cryptographic Scanner HUD */}
          <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(20, 25, 35, 0.5)' }}>
            <div className="corners-inner"></div>
            <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan-sim)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Eye size={16} />
              BIOMETRICS SIGNATURE INTEGRITY
            </h3>

            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              {/* Hologram Scanner Reticle */}
              <div style={{ 
                width: '90px', 
                height: '90px', 
                border: '2px solid var(--color-cyan-sim)', 
                boxShadow: 'var(--glow-cyan-sim)', 
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                background: 'rgba(0,243,255,0.03)',
                overflow: 'hidden'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '2px',
                  background: 'var(--color-cyan-sim)',
                  animation: 'scanline-scroll-sim 2s linear infinite'
                }}></div>
                <Shield size={36} style={{ color: 'var(--color-cyan-sim)' }} />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
                <div>
                  <span style={{ color: 'var(--color-text-dark-sim)' }}>OPERATOR:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>W. POLLITT</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-dark-sim)' }}>CLEARANCE:</span> <span style={{ color: 'var(--color-amber-sim)', fontWeight: 'bold' }}>LEVEL 5 (ULTRA)</span>
                </div>
                <div>
                  <span style={{ color: 'var(--color-text-dark-sim)' }}>AUTHENTICATION:</span> <span style={{ color: 'var(--color-green-sim)' }}>SECURED // MATCHED</span>
                </div>
              </div>
            </div>
          </div>

          {/* Warnings List */}
          <div className="hud-panel corners accent-amber" style={{ padding: '20px', background: 'rgba(20, 25, 35, 0.5)' }}>
            <div className="corners-inner"></div>
            <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber-sim)', borderBottom: '1px solid rgba(255, 159, 0, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Terminal size={16} />
              COCKPIT ALERTS & THREAT LOGS
            </h3>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-red-sim)' }}>[CRIT]</span>
                <span style={{ color: 'var(--color-text-dim-sim)' }}>Transponder lock lost in high-latitude corridor.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-cyan-sim)' }}>[INFO]</span>
                <span style={{ color: 'var(--color-text-dim-sim)' }}>Satellite tracking grid synchronized successfully.</span>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <span style={{ color: 'var(--color-amber-sim)' }}>[WARN]</span>
                <span style={{ color: 'var(--color-text-dim-sim)' }}>Atmospheric radiation fluctuations detected.</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
