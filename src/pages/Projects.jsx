import React, { useState } from 'react';
import { Crosshair, ShieldAlert, Cpu, Terminal, Compass, Zap, Lock } from 'lucide-react';

export default function Projects() {
  const [activeTab, setActiveTab] = useState(0);

  const weaponDossiers = [
    {
      id: 0,
      code: 'PROJECT ZEPHYR',
      codename: 'ZPH_HYPERSONIC_GUIDANCE',
      status: 'OPERATIONAL',
      classification: 'SECRET / LEVEL 4',
      threatLevel: 'DEFENSIVE / TACTICAL',
      desc: 'High-altitude flight stabilization and telemetry tracking engine, designed for Mach 15+ glide vehicles. Translates active radar sweeps and thermal ionization data into real-time coordinate projections.',
      specs: [
        { label: 'CALCULATION VELOCITY', value: '0.001 MS (REALTIME)' },
        { label: 'TELEMETRY SAMPLING', value: '4800 HZ CORE FREQ' },
        { label: 'GUIDANCE DECAY LOCK', value: 'STABLE TO MACH 18.2' },
        { label: 'PLATFORM STACK', value: 'REACT / CANVAS / RUST WASM' }
      ],
      impact: 'Allows full guidance correction of ballistic and scramjet payloads inside the upper stratosphere with near-zero latency.'
    },
    {
      id: 1,
      code: 'PROJECT HELIOS',
      codename: 'HLS_DIRECTED_ENERGY_CORE',
      status: 'TESTING_DEPLOY',
      classification: 'TOP SECRET / LEVEL 5',
      threatLevel: 'STRATEGIC / STRATOSPHERE',
      desc: 'Centralized network broker to control and aim high-energy orbital defense matrices. Employs low-latency communications loops to coordinate optical mirror arrays across high altitudes.',
      specs: [
        { label: 'AIMING PRECISION', value: '0.0004° ARC SECONDS' },
        { label: 'SYNC RESPONSE', value: '4 MS ROUND-TRIP' },
        { label: 'ENERGY FLOW LIMIT', value: '400 GW RESILIENT CORE' },
        { label: 'PLATFORM STACK', value: 'GO / GRPC / WEBSOCKET ENGINES' }
      ],
      impact: 'Provides thermal beam convergence coordinates across continental defensive grids to neutralize incoming threats instantly.'
    },
    {
      id: 2,
      code: 'PROJECT AEGIS',
      codename: 'AGS_SECURE_ENCLAVE',
      status: 'COMPLETED_PRODUCTION',
      classification: 'RESTRICTED / DEFENSE CONSL',
      threatLevel: 'CYBER INTEGRITY / CODES',
      desc: 'Hardware-level secure cryptography enclave. Integrates multi-signature RSA decryption protocols and biometric handshakes to secure command channels from active interception.',
      specs: [
        { label: 'ENCRYPTION COMPASS', value: '4096-BIT RSA MATRIX' },
        { label: 'Biometrics CAPTURE', value: 'REFINED SHA-512 MATRIX' },
        { label: 'DECAY HALF-LIFE', value: '180 SEC ROTATING SHIELD' },
        { label: 'PLATFORM STACK', value: 'RUST / C / WebAssembly / SGX' }
      ],
      impact: 'Guarantees 100% cryptographic protection of satellite and missile command arrays from deep cyber intercepts.'
    },
    {
      id: 3,
      code: 'PROJECT TALON',
      codename: 'TLN_AUTONOMOUS_SWARM',
      status: 'RESEARCHING',
      classification: 'SECRET / LEVEL 4',
      threatLevel: 'TACTICAL / UAV SWARMS',
      desc: 'Highly collaborative autonomous drone swarm routing coordinator. Calculates high-density 3D spatial trajectories for up to 500 micro-drones navigating heavily contested airspace.',
      specs: [
        { label: 'SWARM COUNT CAP', value: '512 DYNAMIC NODES' },
        { label: '3D PATHFINDING', value: 'A* HEURISTIC MATRIX' },
        { label: 'COLLISION BUFFER', value: '1.2 METERS SPATIAL LOCK' },
        { label: 'PLATFORM STACK', value: 'PYTHON / C++ / THREE.JS VECTORS' }
      ],
      impact: 'Provides absolute local air dominance using lightweight autonomous aerial maneuvers that bypass radar locks.'
    }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Dossier Header */}
      <div className="hud-panel corners accent-amber" style={{ padding: '20px', background: 'rgba(255, 159, 0, 0.02)' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <ShieldAlert size={20} className="pulse-indicator indicator-amber" style={{ background: 'transparent' }} />
          <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-amber)' }}>ARSENAL DIRECTORY ACTIVE</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          ACTIVE WEAPONRY DOSSIERS
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '700px', lineHeight: '1.4', marginTop: '6px' }}>
          Review technical specifications, tactical impacts, and core deployment stacks of RavenForge Defense projects.
          Select an arsenal dossier file tab below to establish telemetry connection.
        </p>
      </div>

      {/* Selector Tabs (Cockpit Folder System) */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {weaponDossiers.map((dos) => (
          <button
            key={dos.id}
            onClick={() => setActiveTab(dos.id)}
            className={`hud-btn ${activeTab === dos.id ? 'active' : ''}`}
            style={{
              padding: '12px 18px',
              fontSize: '0.8rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: activeTab === dos.id ? 'rgba(0, 243, 255, 0.15)' : 'rgba(0,0,0,0.3)',
              borderColor: activeTab === dos.id ? 'var(--color-cyan)' : 'rgba(0, 243, 255, 0.15)'
            }}
          >
            <Terminal size={14} />
            <span>{dos.code}</span>
          </button>
        ))}
      </div>

      {/* Main Dossier File View */}
      <div className="hud-panel corners" style={{ padding: '24px', background: 'rgba(15, 20, 30, 0.85)', minHeight: '360px' }}>
        <div className="corners-inner"></div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* File Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '15px', flexWrap: 'wrap', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div className="tech-font" style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>ACTIVE FILE LOCK</div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--color-cyan)', textShadow: 'var(--glow-cyan)' }}>
                {weaponDossiers[activeTab].code}
              </h3>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--color-text-dim)' }}>
                CODENAME: <span style={{ color: '#fff' }}>{weaponDossiers[activeTab].codename}</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <span className="tactical-badge badge-amber">{weaponDossiers[activeTab].classification}</span>
              <span className="tactical-badge badge-green">{weaponDossiers[activeTab].status}</span>
            </div>
          </div>

          {/* Dossier Body */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px' }}>
            
            {/* Description & Impact */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <h4 className="tech-font" style={{ fontSize: '0.85rem', color: 'var(--color-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Compass size={14} />
                  PROJECT SPECIFICATION OVERVIEW
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-text-dim)', lineHeight: '1.5' }}>
                  {weaponDossiers[activeTab].desc}
                </p>
              </div>

              <div className="hud-panel corners accent-amber" style={{ padding: '15px', background: 'rgba(255,159,0,0.03)' }}>
                <div className="corners-inner"></div>
                <h4 className="tech-font" style={{ fontSize: '0.8rem', color: 'var(--color-amber)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Zap size={14} />
                  TACTICAL ADVANTAGE IMPACT
                </h4>
                <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', lineHeight: '1.4' }}>
                  {weaponDossiers[activeTab].impact}
                </p>
              </div>
            </div>

            {/* Spec Table */}
            <div>
              <h4 className="tech-font" style={{ fontSize: '0.85rem', color: 'var(--color-cyan)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Cpu size={14} />
                OPERATIONAL TELEMETRIC PARAMETERS
              </h4>
              
              <table className="tech-table">
                <thead>
                  <tr>
                    <th>TELEMETRY SPEC</th>
                    <th>MEASURE / VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  {weaponDossiers[activeTab].specs.map((sp, idx) => (
                    <tr key={idx}>
                      <td>{sp.label}</td>
                      <td style={{ color: 'var(--color-amber)', fontWeight: 'bold' }}>{sp.value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
