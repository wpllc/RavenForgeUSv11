import React from 'react';
import TelemetryGraph from '../components/TelemetryGraph';
import SatelliteGrid from '../components/SatelliteGrid';
import { Activity, Globe, Compass, Radio } from 'lucide-react';

export default function Showcase() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Page Header */}
      <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(0, 243, 255, 0.02)' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Activity size={20} className="pulse-indicator" style={{ background: 'transparent' }} />
          <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-cyan)' }}>TELESPEC TELEMETRY ONLINE</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          HIGH-ALTITUDE TELEMETRY SHOWCASE
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '700px', lineHeight: '1.4', marginTop: '6px' }}>
          Observe real-time Scramjet propulsion charts, altitude tracking matrices, and live high-orbit satellite grids.
          Adjust integrated controls to simulate thermal purges or maximum throttle maneuvers.
        </p>
      </div>

      {/* Two Columns: Telemetry Graph & Satellite Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '24px' }}>
        
        {/* Hypersonic flight spec widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="tech-font" style={{ fontSize: '1rem', color: 'var(--color-amber)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={16} />
            SCRAMJET PROPULSION SIMULATOR
          </h3>
          <TelemetryGraph />
        </div>

        {/* Satellite Tracking widget */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <h3 className="tech-font" style={{ fontSize: '1rem', color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Globe size={16} />
            CONUS HIGH-ORBIT DEFENSE PERIMETER
          </h3>
          <SatelliteGrid />
        </div>

      </div>

      {/* Advanced Aerospace Hardware Specs table */}
      <div className="hud-panel corners" style={{ padding: '24px', background: 'rgba(15,20,30,0.6)', marginTop: '10px' }}>
        <div className="corners-inner"></div>
        <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0,243,255,0.15)', paddingBottom: '8px', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={16} />
          RAVENFORGE AEROSPACE MECHANICAL SPECIFICATIONS
        </h3>

        <table className="tech-table">
          <thead>
            <tr>
              <th>COMPONENT PROFILE</th>
              <th>MATERIAL & TECHNICAL STACK</th>
              <th>OPERATIONAL LOAD LIMITS</th>
              <th>DEFENSE COEFFICIENT</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>STEALTH SCRAMJET BODY</td>
              <td>Monolithic Titanium-Carbon Matrix</td>
              <td>Mach 18 Cruise / 140,000 FT</td>
              <td style={{ color: 'var(--color-green)' }}>EXTREME</td>
            </tr>
            <tr>
              <td>THERMAL LEADING EDGES</td>
              <td>Hafnium Carbide Ceramics (HfC)</td>
              <td>3,200°C Max Heat Dissipation</td>
              <td style={{ color: 'var(--color-green)' }}>ABSOLUTE</td>
            </tr>
            <tr>
              <td>GUIDANCE CORE COMPUTING</td>
              <td>256-Core Cryo-Cooled Neuromorphic Core</td>
              <td>4,800 FLOPS guidance loops</td>
              <td style={{ color: 'var(--color-cyan)' }}>100% RELIABLE</td>
            </tr>
            <tr>
              <td>LASER EMITTER ARRAY</td>
              <td>Geosynchronous Laser Diodes</td>
              <td>400 Gigawatts Output Limit</td>
              <td style={{ color: 'var(--color-red)' }}>DESTRUCTIVE</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  );
}
