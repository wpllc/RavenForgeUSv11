import React, { useState } from 'react';
import { Shield, ShieldAlert, FileText, ChevronRight, Lock, Key } from 'lucide-react';

export default function About() {
  const [accessLevel, setAccessLevel] = useState('RESTRICTED');
  const [authKey, setAuthKey] = useState('');
  const [keyGenerating, setKeyGenerating] = useState(false);

  const generateAuthKey = () => {
    setKeyGenerating(true);
    setTimeout(() => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let key = 'RVN-';
      for (let i = 0; i < 16; i++) {
        if (i > 0 && i % 4 === 0) key += '-';
        key += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      setAuthKey(key);
      setAccessLevel('DEFCON_1_APPROVED');
      setKeyGenerating(false);
    }, 1200);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Dossier Header */}
      <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(0, 243, 255, 0.02)' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Shield size={20} className="pulse-indicator" style={{ background: 'transparent' }} />
          <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-cyan)' }}>OPERATIONAL DOSSIER // AUTH_ACCESS</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          RAVENFORGE OPERATIONAL DOSSIER
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '700px', lineHeight: '1.4', marginTop: '6px' }}>
          Defending liberty and national freedom through absolute technological dominance. 
          RavenForge Labs engineers bleeding-edge software architectures that coordinate hypersonic aerospace, directed energy platforms, and cyber-crypto enclaves.
        </p>
      </div>

      {/* Two Columns: Mission & Bio Dossier */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Mission Statement & Vision */}
        <div className="hud-panel corners accent-amber" style={{ padding: '24px', background: 'rgba(25, 20, 15, 0.4)' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-amber)', borderBottom: '1px solid rgba(255, 159, 0, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} />
            DEFENSE LABS MISSION DIRECTIVE
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', fontSize: '0.85rem', lineHeight: '1.5', color: 'var(--color-text-dim)' }}>
            <p>
              We believe that <span style={{ color: '#fff', fontWeight: 'bold' }}>American aerospace engineering</span> is the absolute peak of human ingenuity. 
              Our mission is simple: design tactical computing cores so fast and resilient that threat forces have no option but to retreat in fear.
            </p>
            
            <blockquote>
              <span style={{ color: 'var(--color-amber)', fontStyle: 'italic', fontWeight: 'bold', fontSize: '1rem', display: 'block', marginBottom: '4px' }}>"Power of the Gods."</span>
              Our software platforms govern guidance loops of scramjet aircraft cruising through the upper layers of the atmosphere at Mach 15+. 
              If you want bleeding-edge cybernetic systems that redefine defense parameters, you are locked into the right sector.
            </blockquote>
          </div>
        </div>

        {/* Biography: WALKER POLLITT Chief Architect */}
        <div className="hud-panel corners" style={{ padding: '24px', background: 'rgba(15, 20, 30, 0.6)' }}>
          <div className="corners-inner"></div>
          <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileText size={16} />
            CHIEF ARCHITECT PERSONNEL FILE
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#fff' }}>WALKER POLLITT</h4>
                <span className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>ID: WP_998_AEROSPACE</span>
              </div>
              <div className="tactical-badge badge-green" style={{ fontSize: '0.65rem' }}>ACTIVE_COMMISSION</div>
            </div>

            <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>SPECIALTIES:</span> <span style={{ color: 'var(--color-cyan)' }}>Hypersonic flight control, WebGL vectors, secure rust enclaves</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>OPERATIONAL DIRECT:</span> <span style={{ color: 'var(--color-text-main)' }}>CONUS Aerospace command center coordinator</span>
              </div>
              <div>
                <span style={{ color: 'var(--color-text-dark)' }}>OPERATOR STATUS:</span> <span style={{ color: '#fff' }}>100% COMBAT READY // ENVELOPE STABLE</span>
              </div>
            </div>

            <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', lineHeight: '1.4' }}>
              Walker Pollitt designs top-tier aerospace systems, fusing lightning-fast static frontend telemetry platforms with robust high-concurrency Go and C++ logic cores.
            </p>
          </div>
        </div>

      </div>

      {/* 3. INTERACTIVE SECURITY CLEARANCE WIDGET */}
      <div className="hud-panel corners accent-red" style={{ padding: '24px', background: 'rgba(255, 59, 48, 0.02)' }}>
        <div className="corners-inner"></div>
        <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-red)', borderBottom: '1px solid rgba(255, 59, 48, 0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Lock size={16} />
          DEFENSE LEVEL CLEARANCE KEY GENERATOR
        </h3>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span className={`pulse-indicator ${accessLevel === 'RESTRICTED' ? 'indicator-amber' : 'indicator-red'}`}></span>
              <span style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>
                CURRENT CONSOLE LEVEL: <span style={{ color: accessLevel === 'RESTRICTED' ? 'var(--color-amber)' : 'var(--color-red)' }}>{accessLevel}</span>
              </span>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
              Authorize console credentials to override global defensive security clearance values.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            {authKey && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'var(--font-mono)' }}>
                <span style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)' }}>DECRYPTED KEY</span>
                <span style={{ fontSize: '0.95rem', color: 'var(--color-red)', fontWeight: 'bold', letterSpacing: '0.08em' }}>{authKey}</span>
              </div>
            )}

            <button 
              onClick={generateAuthKey} 
              disabled={keyGenerating || accessLevel === 'DEFCON_1_APPROVED'} 
              className={`hud-btn btn-red`}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <Key size={14} />
              <span>{keyGenerating ? 'DECRYPTING SECURE MATRIX...' : accessLevel === 'DEFCON_1_APPROVED' ? 'CLEARANCE CONFIRMED' : 'AUTHORIZE DEFCON 1'}</span>
            </button>
          </div>

        </div>
      </div>

    </div>
  );
}
