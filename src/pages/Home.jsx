import React from 'react';
import RadarScanner from '../components/RadarScanner';
import { Shield, Eye, Database, Terminal, ShieldAlert, Cpu } from 'lucide-react';

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* 1. WELCOME COMMAND MODULE */}
      <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(0, 243, 255, 0.02)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
        <div className="corners-inner"></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className="pulse-indicator indicator-green"></span>
            <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-cyan)' }}>SECURE NETWORK ONLINE</span>
          </div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
            TACTICAL COMMAND DASHBOARD
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '600px', lineHeight: '1.4' }}>
            Welcome to the front-end core showcase of <span style={{ color: '#fff', fontWeight: 'bold' }}>RavenForge Defense</span>. 
            This console is configured for aerospace telemetry tracking, tactical asset deployment, and secure national surveillance.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <div className="hud-panel" style={{ padding: '10px 15px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>DEFENSE CONSL</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-cyan)', fontFamily: 'var(--font-mono)' }}>READY_A_1</div>
          </div>
          <div className="hud-panel accent-amber" style={{ padding: '10px 15px', background: 'rgba(0,0,0,0.4)', borderRadius: '2px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>THREAT STATUS</div>
            <div style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-amber)', fontFamily: 'var(--font-mono)' }}>DEFCON 3</div>
          </div>
        </div>
      </div>

      {/* 2. RADAR VIEWPORTS (CANVAS GRID + DETAILS) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        <div>
          <RadarScanner />
        </div>
      </div>

      {/* 3. LOWER GRID DETAILS: SYSTEM STATUS & BIOMETRICS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Bio-cryptographic Scanner HUD */}
        <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(20, 25, 35, 0.5)' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Eye size={16} />
            BIOMETRICS SIGNATURE INTEGRITY
          </h3>

          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            {/* Hologram Scanner Reticle */}
            <div style={{ 
              width: '90px', 
              height: '90px', 
              border: '2px solid var(--color-cyan)', 
              boxShadow: 'var(--glow-cyan)', 
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
                background: 'var(--color-cyan)',
                animation: 'scanline-scroll 2s linear infinite'
              }}></div>
              <Shield size={36} style={{ color: 'var(--color-cyan)' }} />
            </div>

            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>OPERATOR IDENTITY:</span> <span style={{ color: '#fff', fontWeight: 'bold' }}>W. POLLITT</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>CLEARANCE MATRIX:</span> <span style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>LEVEL 5 (ULTRA)</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>AUTHENTICATION:</span> <span style={{ color: 'var(--color-green)' }}>SECURED // MATCHED</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>CRYPTO HANDSHAKE:</span> <span style={{ color: 'var(--color-text-dim)' }}>SHA256_RSA_LOCKED</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Defense Log Console */}
        <div className="hud-panel corners accent-amber" style={{ padding: '20px', background: 'rgba(20, 25, 35, 0.5)' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber)', borderBottom: '1px solid rgba(255, 159, 0, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Terminal size={16} />
            CONUS TELEMETRY WARNINGS
          </h3>

          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--color-red)' }}>[CRIT_14]</span>
              <span style={{ color: 'var(--color-text-dim)' }}>Hypersonic vector lock established in Sector 4.</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--color-cyan)' }}>[INFO_02]</span>
              <span style={{ color: 'var(--color-text-dim)' }}>AEGIS Satellite array synchronized with Ground Zero.</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--color-green)' }}>[SAFE_01]</span>
              <span style={{ color: 'var(--color-text-dim)' }}>Directed Energy Core stabilized at nominal thermal state.</span>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <span style={{ color: 'var(--color-amber)' }}>[WARN_09]</span>
              <span style={{ color: 'var(--color-text-dim)' }}>Ground sensor network reporting atmospheric ionization anomalies.</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
