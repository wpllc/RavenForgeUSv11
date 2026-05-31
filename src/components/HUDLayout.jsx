import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { 
  Shield, 
  Terminal, 
  Settings, 
  Radio, 
  Activity, 
  Volume2, 
  VolumeX, 
  Cpu, 
  Crosshair, 
  AlertTriangle,
  Lock
} from 'lucide-react';

// Web Audio API Synth Engine for Tactical HUD Sounds
class HUDSoundEngine {
  constructor() {
    this.ctx = null;
    this.humOsc = null;
    this.humOscSub = null;
    this.humGain = null;
    this.isHumming = false;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playClick() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // High-tech digital click: short sine wave decaying instantly
      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.05);
      
      gain.gain.setValueAtTime(0.04, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.05);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.06);
    } catch (e) {
      console.warn("Audio Context blocked or failed to initialize", e);
    }
  }

  playHover() {
    try {
      this.init();
      if (!this.ctx) return;
      
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      // Cybernetic tiny click
      osc.type = 'square';
      osc.frequency.setValueAtTime(3000, now);
      
      gain.gain.setValueAtTime(0.003, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.01);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.015);
    } catch (e) {}
  }

  toggleCockpitHum() {
    try {
      this.init();
      if (!this.ctx) return false;

      if (this.isHumming) {
        this.stopCockpitHum();
        return false;
      }

      const now = this.ctx.currentTime;
      
      // Low-frequency military hum (55Hz C1 power note + 110Hz C2 harmonic)
      this.humOsc = this.ctx.createOscillator();
      this.humOscSub = this.ctx.createOscillator();
      this.humGain = this.ctx.createGain();
      
      this.humOsc.type = 'sine';
      this.humOsc.frequency.setValueAtTime(55, now);
      
      this.humOscSub.type = 'triangle';
      this.humOscSub.frequency.setValueAtTime(110, now);
      
      // Master low gain to keep it sub-audible and atmospheric
      this.humGain.gain.setValueAtTime(0.08, now);
      
      // Connect to lowpass filter to emulate heavy fuselage resonance
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      
      this.humOsc.connect(filter);
      this.humOscSub.connect(filter);
      filter.connect(this.humGain);
      this.humGain.connect(this.ctx.destination);
      
      this.humOsc.start(now);
      this.humOscSub.start(now);
      
      this.isHumming = true;
      return true;
    } catch (e) {
      console.warn("Hum initialization failed", e);
      return false;
    }
  }

  stopCockpitHum() {
    try {
      if (this.humOsc) {
        this.humOsc.stop();
        this.humOsc = null;
      }
      if (this.humOscSub) {
        this.humOscSub.stop();
        this.humOscSub = null;
      }
      this.isHumming = false;
    } catch (e) {}
  }
}

// Global audio handle
const soundEffects = new HUDSoundEngine();

export default function HUDLayout({ children }) {
  const [audioActive, setAudioActive] = useState(false);
  const [systemTime, setSystemTime] = useState('');
  const [packetRate, setPacketRate] = useState(5.4);
  const [reactorLoad, setReactorLoad] = useState(98.7);
  const [sysTemp, setSysTemp] = useState(41);
  const location = useLocation();

  // Clock telemetry simulator
  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const pad = (n) => String(n).padStart(2, '0');
      const timeStr = `${pad(d.getHours())}:${pad(d.getMinutes())}:${pad(d.getSeconds())}`;
      const dateStr = `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
      setSystemTime(`${dateStr} // SECURE_UPLINK_${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Telemetry fluctuation simulator
  useEffect(() => {
    const interval = setInterval(() => {
      setPacketRate((prev) => +(prev + (Math.random() - 0.5) * 0.4).toFixed(2));
      setReactorLoad((prev) => +(prev + (Math.random() - 0.5) * 0.1).toFixed(2));
      setSysTemp((prev) => Math.floor(prev + (Math.random() - 0.5) * 2));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  // Sound triggers on route navigation
  useEffect(() => {
    soundEffects.playClick();
  }, [location.pathname]);

  const handleAudioToggle = () => {
    const active = soundEffects.toggleCockpitHum();
    setAudioActive(active);
  };

  const handleHover = () => {
    soundEffects.playHover();
  };

  return (
    <div className="hud-crt-screen">
      <div className="hud-scanlines"></div>
      
      {/* 1. TOP HEADER (COMMMAND HUB STRIP) */}
      <header className="hud-panel corners" style={{ padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid var(--color-cyan)', zIndex: 100 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Shield size={24} style={{ color: 'var(--color-cyan)', filter: 'drop-shadow(var(--glow-cyan))' }} />
            <h1 style={{ fontSize: '1.25rem', fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.15em', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              RAVENFORGE<span style={{ color: 'var(--color-amber)' }}>US</span>
            </h1>
          </div>
          <div className="tactical-badge" style={{ fontSize: '0.65rem' }}>
            CLASSIFIED // US GOVT DEFENSE ONLY
          </div>
        </div>

        {/* Live Telemetry Info Panel */}
        <div className="tech-font" style={{ display: 'flex', alignItems: 'center', gap: '25px', fontSize: '0.8rem', color: 'var(--color-text-dim)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Radio size={14} className="pulse-indicator" style={{ background: 'transparent' }} />
            <span>SAT_LINK: <span style={{ color: 'var(--color-cyan)' }}>ACTIVE</span> ({packetRate} GB/S)</span>
          </div>
          <div>
            <span>GRID_REF: <span style={{ color: 'var(--color-amber)' }}>CONUS_TAC_4</span></span>
          </div>
          <div className="hud-desktop-only">
            <span style={{ color: 'var(--color-text-main)' }}>{systemTime}</span>
          </div>
        </div>

        {/* Audio Toggle Controls */}
        <div>
          <button 
            onClick={handleAudioToggle} 
            className={`hud-btn ${audioActive ? 'btn-amber' : ''}`}
            onMouseEnter={handleHover}
            style={{ padding: '6px 12px', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            {audioActive ? <Volume2 size={14} /> : <VolumeX size={14} />}
            <span>{audioActive ? 'COCKPIT HUM ON' : 'ACTIVATE HUM'}</span>
          </button>
        </div>
      </header>

      {/* 2. MAIN HUB INTERFACE */}
      <div style={{ display: 'flex', flex: 1, position: 'relative', overflow: 'hidden' }}>
        
        {/* LEFT NAV PANEL (STEALTH LAUNCH COCKPIT NAV) */}
        <aside className="hud-panel" style={{ width: '260px', borderRight: '1px solid hsla(182, 100%, 48%, 0.15)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px 15px', zIndex: 90 }}>
          <div className="hud-grid-matrix"></div>
          
          <div style={{ position: 'relative' }}>
            {/* Operator Authorization Brief */}
            <div style={{ padding: '10px', borderBottom: '1px solid rgba(0, 243, 255, 0.1)', marginBottom: '20px' }}>
              <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>CHIEF WEAPONRY ARCHITECT</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 'bold', color: '#fff', marginTop: '2px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <span className="pulse-indicator indicator-green"></span>
                W. POLLITT // AUTH_01
              </div>
            </div>

            {/* Tactical Navigation Buttons */}
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <NavLink 
                to="/Home.asp" 
                className={({ isActive }) => `hud-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={handleHover}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : '',
                  borderColor: isActive ? 'var(--color-cyan)' : 'hsla(182, 100%, 48%, 0.15)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  color: isActive ? '#fff' : 'var(--color-cyan)'
                })}
              >
                <Terminal size={16} />
                <span>COMMAND HUB</span>
              </NavLink>

              <NavLink 
                to="/Projects.asp" 
                className={({ isActive }) => `hud-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={handleHover}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : '',
                  borderColor: isActive ? 'var(--color-cyan)' : 'hsla(182, 100%, 48%, 0.15)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  color: isActive ? '#fff' : 'var(--color-cyan)'
                })}
              >
                <Crosshair size={16} />
                <span>ACTIVE ARSENAL</span>
              </NavLink>

              <NavLink 
                to="/Showcase.asp" 
                className={({ isActive }) => `hud-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={handleHover}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : '',
                  borderColor: isActive ? 'var(--color-cyan)' : 'hsla(182, 100%, 48%, 0.15)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  color: isActive ? '#fff' : 'var(--color-cyan)'
                })}
              >
                <Activity size={16} />
                <span>TELESPEC SHOWCASE</span>
              </NavLink>

              <NavLink 
                to="/About.asp" 
                className={({ isActive }) => `hud-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={handleHover}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : '',
                  borderColor: isActive ? 'var(--color-cyan)' : 'hsla(182, 100%, 48%, 0.15)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  color: isActive ? '#fff' : 'var(--color-cyan)'
                })}
              >
                <Shield size={16} />
                <span>OPERATIONAL INTEL</span>
              </NavLink>

              <NavLink 
                to="/Contact.asp" 
                className={({ isActive }) => `hud-btn ${isActive ? 'active' : ''}`}
                onMouseEnter={handleHover}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  textAlign: 'left',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(0, 243, 255, 0.15)' : '',
                  borderColor: isActive ? 'var(--color-cyan)' : 'hsla(182, 100%, 48%, 0.15)',
                  boxShadow: isActive ? 'var(--glow-cyan)' : 'none',
                  color: isActive ? '#fff' : 'var(--color-cyan)'
                })}
              >
                <Lock size={16} />
                <span>SECURE UPLINK</span>
              </NavLink>
            </nav>
          </div>

          {/* LOWER TELEMETRY STAT MODULES */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', position: 'relative' }}>
            
            {/* Weapon Core Temp */}
            <div className="hud-panel accent-amber corners" style={{ padding: '10px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.4)' }}>
              <div className="corners-inner"></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                <span>WEAPON_CORE_TEMP</span>
                <span style={{ color: sysTemp > 45 ? 'var(--color-amber)' : 'var(--color-cyan)' }}>{sysTemp}°C</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${(sysTemp / 80) * 100}%`, height: '100%', background: 'var(--color-amber)', boxShadow: 'var(--glow-amber)', transition: 'width 0.5s ease' }}></div>
              </div>
            </div>

            {/* Reactor Capacity */}
            <div className="hud-panel accent-red corners" style={{ padding: '10px', fontSize: '0.75rem', background: 'rgba(0,0,0,0.4)' }}>
              <div className="corners-inner"></div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', marginBottom: '5px' }}>
                <span>THERMAL_REACTOR</span>
                <span style={{ color: 'var(--color-red)' }}>{reactorLoad}%</span>
              </div>
              <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
                <div style={{ width: `${reactorLoad}%`, height: '100%', background: 'var(--color-red)', boxShadow: 'var(--glow-red)', transition: 'width 0.5s ease' }}></div>
              </div>
            </div>

            {/* Defense Readiness Banner */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255, 59, 48, 0.05)', border: '1px solid rgba(255, 59, 48, 0.2)', padding: '10px', borderRadius: '2px' }}>
              <AlertTriangle className="pulse-indicator indicator-red" style={{ flexShrink: 0, background: 'transparent' }} size={16} />
              <div style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', lineHeight: '1.2' }}>
                <div style={{ color: 'var(--color-red)', fontWeight: 'bold' }}>TACTICAL READY LEVEL 1</div>
                <div style={{ color: 'var(--color-text-dim)' }}>NUCLEAR INTEGRITY LOCKED</div>
              </div>
            </div>

          </div>
        </aside>

        {/* 3. TACTICAL CORE OUTPUT VIEW */}
        <main className="hud-panel" style={{ flex: 1, borderLeft: 'none', display: 'flex', flexDirection: 'column', overflow: 'hidden', padding: '24px', zIndex: 80 }}>
          <div className="hud-grid-matrix"></div>
          <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
            {children}
          </div>
        </main>

      </div>

      {/* 4. BOTTOM TELEMETRY FOOTER */}
      <footer className="hud-panel tech-font" style={{ padding: '6px 20px', borderTop: '1px solid hsla(182, 100%, 48%, 0.15)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: 'var(--color-text-dark)', zIndex: 100 }}>
        <div>
          <span>RAVENFORGE AEROSPACE LABS // PROJECT VERSION 4.9.2</span>
        </div>
        <div style={{ display: 'flex', gap: '20px' }}>
          <span>LATENCY: <span style={{ color: 'var(--color-cyan)' }}>0.014 MS</span></span>
          <span>DOMINANCE: <span style={{ color: 'var(--color-green)' }}>UNMATCHED</span></span>
          <span>HEMISPHERE: <span style={{ color: 'var(--color-cyan)' }}>NORTHERN_GRID</span></span>
        </div>
      </footer>
    </div>
  );
}
