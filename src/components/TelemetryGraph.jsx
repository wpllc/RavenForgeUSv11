import React, { useEffect, useRef, useState } from 'react';
import { Activity, Flame, Navigation, Zap } from 'lucide-react';

export default function TelemetryGraph() {
  const canvasRef = useRef(null);
  
  // Real-time flight vector telemetry
  const [speed, setSpeed] = useState(14.2); // Mach speed
  const [altitude, setAltitude] = useState(115000); // Feet
  const [temp, setTemp] = useState(2180); // Celsius nose friction
  const [throttle, setThrottle] = useState(78); // Engine Output %
  const [thermalStatus, setThermalStatus] = useState('NOMINAL');

  // History buffers for plotting (max 50 points)
  const historyRef = useRef({
    speed: Array(50).fill(14.2),
    altitude: Array(50).fill(115000),
    temp: Array(50).fill(2180)
  });

  // Dynamic simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      // 1. Telemetry Calculations based on throttle
      setSpeed((prev) => {
        const targetSpeed = 12.0 + (throttle / 100) * 4.8;
        const drift = (Math.random() - 0.5) * 0.15;
        const next = +(prev + (targetSpeed - prev) * 0.1 + drift).toFixed(2);
        return Math.max(next, 0);
      });

      setAltitude((prev) => {
        const targetAlt = 98000 + (throttle / 100) * 26000;
        const drift = Math.floor((Math.random() - 0.5) * 400);
        const next = Math.floor(prev + (targetAlt - prev) * 0.05 + drift);
        return Math.max(next, 0);
      });

      setTemp((prev) => {
        // Temperature rises exponentially with airspeed
        const frictionTemp = Math.floor(1400 + (speed ** 1.8) * 12);
        const drift = Math.floor((Math.random() - 0.5) * 10);
        const next = Math.floor(prev + (frictionTemp - prev) * 0.08 + drift);
        
        // Heat thresholds
        if (next > 2350) {
          setThermalStatus('WARNING_CRITICAL');
        } else if (next > 2100) {
          setThermalStatus('ADVISORY_HIGH');
        } else {
          setThermalStatus('NOMINAL');
        }
        return next;
      });

      // 2. Append history buffers for line charting
      const history = historyRef.current;
      history.speed.shift();
      history.speed.push(speed);
      
      history.altitude.shift();
      history.altitude.push(altitude);
      
      history.temp.shift();
      history.temp.push(temp);

      // 3. Redraw Canvas
      drawGraph();
    }, 250);

    return () => clearInterval(interval);
  }, [throttle, speed, altitude, temp]);

  // Chart Rendering Engine
  const drawGraph = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    
    // Smooth high DPI rendering
    ctx.fillStyle = '#0b0e14';
    ctx.fillRect(0, 0, w, h);

    // Draw grid coordinates background
    ctx.strokeStyle = 'rgba(0, 243, 255, 0.04)';
    ctx.lineWidth = 1;
    const gridSpacing = 40;
    for (let x = 0; x < w; x += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
    }
    for (let y = 0; y < h; y += gridSpacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const padLeft = 60;
    const padRight = 20;
    const padTop = 30;
    const padBottom = 30;
    const chartW = w - padLeft - padRight;
    const chartH = h - padTop - padBottom;

    const history = historyRef.current;

    // Helper: Plot a single telemetry vector stream
    const plotStream = (data, minVal, maxVal, strokeColor, shadowGlowColor) => {
      ctx.strokeStyle = strokeColor;
      ctx.lineWidth = 2;
      ctx.shadowBlur = 10;
      ctx.shadowColor = shadowGlowColor;
      ctx.beginPath();

      const valRange = maxVal - minVal;

      for (let i = 0; i < data.length; i++) {
        const val = data[i];
        const cx = padLeft + (i / (data.length - 1)) * chartW;
        // Invert Y axis for canvas layout (0 is at top)
        const cy = padTop + chartH - ((val - minVal) / valRange) * chartH;

        if (i === 0) {
          ctx.moveTo(cx, cy);
        } else {
          // Quadratic bezier smoothing
          const prevVal = data[i - 1];
          const px = padLeft + ((i - 1) / (data.length - 1)) * chartW;
          const py = padTop + chartH - ((prevVal - minVal) / valRange) * chartH;
          const mx = (px + cx) / 2;
          const my = (py + cy) / 2;
          ctx.quadraticCurveTo(px, py, mx, my);
        }
      }
      ctx.stroke();
      
      // Reset shadows
      ctx.shadowBlur = 0;
      ctx.shadowColor = 'transparent';
    };

    // Plot Stream 1: Airspeed (Mach 10 - 20) -> Glowing Amber
    plotStream(history.speed, 10, 20, 'var(--color-amber)', 'rgba(255, 159, 0, 0.4)');

    // Plot Stream 2: Altitude (80k - 140k FT) -> Glowing Cyan
    plotStream(history.altitude, 80000, 140000, 'var(--color-cyan)', 'rgba(0, 243, 255, 0.4)');

    // Plot Stream 3: Nose Temp (1000 - 3000 C) -> Glowing Red
    plotStream(history.temp, 1000, 3000, 'var(--color-red)', 'rgba(255, 59, 48, 0.4)');

    // Draw Axes Labels
    ctx.fillStyle = 'rgba(0, 243, 255, 0.4)';
    ctx.font = '8px Share Tech Mono';
    ctx.textAlign = 'right';
    
    // Altitude axis markers
    ctx.fillText("140k FT", padLeft - 8, padTop + 4);
    ctx.fillText("110k FT", padLeft - 8, padTop + chartH / 2 + 4);
    ctx.fillText("80k FT", padLeft - 8, padTop + chartH);

    // X Axis time divisions
    ctx.textAlign = 'center';
    ctx.fillText("T - 50S", padLeft, h - 10);
    ctx.fillText("T - 25S", padLeft + chartW / 2, h - 10);
    ctx.fillText("T - 0S", padLeft + chartW, h - 10);
  };

  // Resize canvas handler
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = 240;
      drawGraph();
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Visual Canvas Plotter */}
      <div className="hud-panel accent-amber corners" style={{ padding: '4px', background: 'rgba(0,0,0,0.5)' }}>
        <div className="corners-inner"></div>
        <div className="tech-font" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(255, 159, 0, 0.05)', borderBottom: '1px solid rgba(255, 159, 0, 0.15)', fontSize: '0.75rem', color: 'var(--color-amber)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Activity size={14} className="pulse-indicator indicator-amber" style={{ background: 'transparent' }} />
            <span>HYPERSONIC CRUISE TELEMETRY // GLIDE PROFILE</span>
          </div>
          <span>MAJESTIC INTEGRITY CORE // ENG_UPLINK</span>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '240px' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Dynamic Telemetry Specs Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
        
        {/* Airspeed Gauge */}
        <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="corners-inner"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>CRUISE VELOCITY</span>
            <Zap size={14} style={{ color: 'var(--color-amber)' }} />
          </div>
          <div className="tech-font" style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--color-amber)', textShadow: 'var(--glow-amber)' }}>
            MACH {speed}
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>
            SURFACE RELATIVE: {(speed * 767.2).toFixed(1)} MPH
          </div>
        </div>

        {/* Altitude Gauge */}
        <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="corners-inner"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>FLIGHT PROFILE ALTITUDE</span>
            <Navigation size={14} style={{ color: 'var(--color-cyan)' }} />
          </div>
          <div className="tech-font" style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--color-cyan)', textShadow: 'var(--glow-cyan)' }}>
            {altitude.toLocaleString()} FT
          </div>
          <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dark)', fontFamily: 'var(--font-mono)' }}>
            THERMAL STRATOSPHERE REACHED
          </div>
        </div>

        {/* nose cone Heat Loading Gauge */}
        <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="corners-inner"></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>NOSE CONE TEMP</span>
            <Flame size={14} style={{ color: 'var(--color-red)' }} />
          </div>
          <div className="tech-font" style={{ fontSize: '1.6rem', fontWeight: 'bold', color: 'var(--color-red)', textShadow: 'var(--glow-red)' }}>
            {temp}°C
          </div>
          <div className="tactical-badge" style={{ 
            fontSize: '0.6rem', 
            background: thermalStatus === 'NOMINAL' ? 'rgba(100,255,100,0.1)' : thermalStatus === 'ADVISORY_HIGH' ? 'rgba(255,159,0,0.1)' : 'rgba(255,59,48,0.1)',
            borderColor: thermalStatus === 'NOMINAL' ? 'var(--color-green)' : thermalStatus === 'ADVISORY_HIGH' ? 'var(--color-amber)' : 'var(--color-red)',
            color: thermalStatus === 'NOMINAL' ? 'var(--color-green)' : thermalStatus === 'ADVISORY_HIGH' ? 'var(--color-amber)' : 'var(--color-red)',
            width: 'fit-content'
          }}>
            {thermalStatus}
          </div>
        </div>

      </div>

      {/* Cockpit Intercept Throttle controls */}
      <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(20,25,35,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px' }}>
        <div className="corners-inner"></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#fff', textTransform: 'uppercase' }}>PILOT INTEGRATED COMBAT THROTTLE</h4>
          <p style={{ fontSize: '0.7rem', color: 'var(--color-text-dim)' }}>Modify simulated Scramjet engine combustion rates.</p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', fontFamily: 'var(--font-mono)' }}>
            <span style={{ fontSize: '0.6rem', color: 'var(--color-text-dark)' }}>ENGINE OUTPUT</span>
            <span style={{ fontSize: '1rem', color: 'var(--color-amber)', fontWeight: 'bold' }}>{throttle}%</span>
          </div>
          
          <input 
            type="range" 
            min="30" 
            max="100" 
            value={throttle} 
            onChange={(e) => setThrottle(Number(e.target.value))}
            style={{ 
              accentColor: 'var(--color-amber)', 
              cursor: 'pointer',
              width: '150px',
              height: '4px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '2px'
            }} 
          />

          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              onClick={() => setThrottle(100)} 
              className="hud-btn btn-red" 
              style={{ padding: '6px 12px', fontSize: '0.7rem' }}
            >
              MAX BURST
            </button>
            <button 
              onClick={() => {
                setThrottle(50);
                setTemp(1600); // Rapid venting
              }} 
              className="hud-btn btn-amber" 
              style={{ padding: '6px 12px', fontSize: '0.7rem' }}
            >
              VENT CORE
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
