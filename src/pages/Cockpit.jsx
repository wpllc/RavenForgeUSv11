import React from 'react';
import TelemetryGraph from '../components/TelemetryGraph';
import SatelliteGrid from '../components/SatelliteGrid';
import RadarScanner from '../components/RadarScanner';
import DefconDial from '../components/fiction/DefconDial';
import MainframeFeed from '../components/fiction/MainframeFeed';
import LaunchSequence from '../components/fiction/LaunchSequence';
import NavWaypoints from '../components/fiction/NavWaypoints';
import CodePuzzle from '../components/fiction/CodePuzzle';
import Dossiers from '../components/fiction/Dossiers';
import Briefing from '../components/fiction/Briefing';
import OperatorFile from '../components/fiction/OperatorFile';
import { Activity, Globe, Compass, Radio } from 'lucide-react';

// Fictional mission-cockpit experience. Original entertainment visuals (radar,
// telemetry, orbit grid) plus story components. All values are generated on the
// client. No private data, no live feeds, no real systems or operations.
export default function Cockpit() {
  const section = { display: 'flex', flexDirection: 'column', gap: '20px', minWidth: 0 };
  const heading = { fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '8px' };
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>

      <div className="hud-panel corners" role="note" style={{ padding: '14px 20px', background: 'rgba(245, 158, 11, 0.08)', borderColor: 'rgba(245,158,11,0.4)' }}>
        <div className="corners-inner"></div>
        <p className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-amber)', margin: 0 }}>
          FICTIONAL EXPERIENCE // SIMULATED DATA ONLY
        </p>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', margin: '6px 0 0', lineHeight: 1.5 }}>
          This cockpit is an entertainment and story demo. Tracks, readings, dials, and labels are generated on this page
          and do not represent real aircraft, launches, systems, agencies, or operations. Original concept:
          Antigravity 2.0, from approximately three lines of prompt input.
        </p>
      </div>

      <div className="hud-panel corners" style={{ padding: '20px', background: 'rgba(0, 243, 255, 0.02)' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
          <Activity size={20} className="pulse-indicator" style={{ background: 'transparent' }} />
          <span className="tech-font" style={{ fontSize: '0.75rem', color: 'var(--color-cyan)' }}>SIMULATED TELEMETRY ONLINE</span>
        </div>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
          Mission Cockpit (Fiction)
        </h2>
        <p style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', maxWidth: '700px', lineHeight: '1.4', marginTop: '6px' }}>
          Watch the sky. Track the gliders, read the telemetry, cycle the story threat dial, run an intercept
          countdown, pick a waypoint, open an arsenal dossier, or solve the cipher to unlock the debrief.
        </p>
      </div>

      <Briefing />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '20px' }}>
        <DefconDial />
        <NavWaypoints />
        <OperatorFile />
      </div>

      <div className="hud-panel corners" style={{ padding: '20px' }}>
        <div className="corners-inner"></div>
        <h3 className="tech-font" style={{ ...heading, color: 'var(--color-cyan)', marginBottom: '12px' }}>
          <Radio size={16} /> SIMULATED SECTOR RADAR
        </h3>
        <RadarScanner />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))', gap: '24px' }}>
        <div style={section}>
          <h3 className="tech-font" style={{ ...heading, color: 'var(--color-amber)' }}>
            <Activity size={16} /> SIMULATED TELEMETRY CHART
          </h3>
          <div style={{ maxWidth: '100%', minWidth: 0, overflowX: 'auto' }}>
            <TelemetryGraph />
          </div>
        </div>
        <div style={section}>
          <h3 className="tech-font" style={{ ...heading, color: 'var(--color-cyan)' }}>
            <Globe size={16} /> SIMULATED ORBIT GRID
          </h3>
          <SatelliteGrid />
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
        <LaunchSequence />
        <MainframeFeed />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))', gap: '20px' }}>
        <CodePuzzle />
        <Dossiers />
      </div>

      <div className="hud-panel corners" style={{ padding: '24px', background: 'rgba(15,20,30,0.6)' }}>
        <div className="corners-inner"></div>
        <h3 className="tech-font" style={{ ...heading, color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0,243,255,0.15)', paddingBottom: '8px', marginBottom: '15px' }}>
          <Compass size={16} /> FICTIONAL CONCEPT NOTES
        </h3>
        <table className="tech-table">
          <thead>
            <tr><th>VIEW</th><th>WHAT IT DOES</th><th>DATA SOURCE</th></tr>
          </thead>
          <tbody>
            <tr><td>Threat dial</td><td>Cycles invented story levels</td><td>Local state only</td></tr>
            <tr><td>Radar</td><td>Animated contact sweep; click a contact</td><td>Random generator</td></tr>
            <tr><td>Telemetry</td><td>Throttle slider and story purge buttons</td><td>Random generator</td></tr>
            <tr><td>Orbit grid</td><td>Select an illustrative tile</td><td>Random generator</td></tr>
            <tr><td>Intercept</td><td>Countdown, abort, random story result</td><td>Local timer and Math.random</td></tr>
            <tr><td>Mainframe feed</td><td>Pause or resume synthetic lines</td><td>Fixed local list</td></tr>
            <tr><td>Cipher puzzle</td><td>Decode one fixed word</td><td>Fixed local string; not authentication</td></tr>
            <tr><td>Arsenal dossiers</td><td>Switch between invented story files</td><td>Local constants</td></tr>
            <tr><td>Satellite grid</td><td>Select a tile; scenario-grid readout</td><td>Synthetic local values</td></tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
