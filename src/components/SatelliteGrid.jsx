import React, { useEffect, useRef, useState } from 'react';
import { Globe, RefreshCw } from 'lucide-react';

export default function SatelliteGrid() {
  const canvasRef = useRef(null);
  const [activeSatellites, setActiveSatellites] = useState([
    { id: 'SAT-1A', name: 'AEGIS-VIGIL', type: 'RADAR_RECON', lat: 38.9, lng: -77.0, alt: '420 KM', inc: '55.3°', status: 'ONLINE' },
    { id: 'SAT-2C', name: 'ZEPHYR-UAV-LINK', type: 'DATA_UPLINK', lat: 34.0, lng: -118.2, alt: '680 KM', inc: '34.2°', status: 'ONLINE' },
    { id: 'SAT-3B', name: 'HELIOS-GUARD', type: 'DEFENSE_GRID', lat: 28.5, lng: -80.6, alt: '35,780 KM', inc: '0.1°', status: 'GEOSYNC' }
  ]);
  const [selectedSat, setSelectedSat] = useState(activeSatellites[0]);
  const [gridSpin, setGridSpin] = useState(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 240;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;

      ctx.fillStyle = '#0b0e14';
      ctx.fillRect(0, 0, w, h);

      // Draw Global wireframe coordinates
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.05)';
      ctx.lineWidth = 1;
      
      // Latitude/Longitude Grid
      const step = 30;
      for (let x = step; x < w; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = step; y < h; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Draw animated tactical defense perimeter lines (US Continental Airspace)
      ctx.strokeStyle = 'rgba(255, 159, 0, 0.2)';
      ctx.setLineDash([4, 4]);
      ctx.lineWidth = 1.5;
      
      ctx.beginPath();
      // Simple wireframe shape representing CONUS airspace
      ctx.moveTo(cx - 150, cy - 40);
      ctx.lineTo(cx + 120, cy - 50);
      ctx.lineTo(cx + 150, cy + 30);
      ctx.lineTo(cx - 100, cy + 55);
      ctx.closePath();
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(255, 159, 0, 0.1)';
      ctx.fill();

      // Label Defense Perimeter
      ctx.fillStyle = 'var(--color-amber)';
      ctx.font = '8px Share Tech Mono';
      ctx.textAlign = 'center';
      ctx.fillText("US NATIONAL AIRSPACE DEFENSE DEFENSIVE LAYER", cx + 10, cy - 65);

      // Active satellite trajectories
      activeSatellites.forEach((sat, idx) => {
        // Map satellites as orbiting trajectories across canvas
        const offset = time * 0.005 + (idx * Math.PI / 3);
        const radiusX = 140 + idx * 30;
        const radiusY = 40 + idx * 10;
        const tilt = 10 * (Math.PI / 180);

        // Calculate positions on elliptical orbits
        const satX = cx + Math.cos(offset) * radiusX;
        const satY = cy + Math.sin(offset) * radiusY;

        // Draw orbit paths
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.03)';
        ctx.beginPath();
        for (let a = 0; a < Math.PI * 2; a += 0.1) {
          const px = cx + Math.cos(a) * radiusX;
          const py = cy + Math.sin(a) * radiusY;
          if (a === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Draw active tracking beacons
        ctx.fillStyle = 'var(--color-cyan)';
        ctx.shadowBlur = 8;
        ctx.shadowColor = 'var(--color-cyan)';
        ctx.beginPath();
        ctx.arc(satX, satY, 4, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Pulse ring around satellites
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.3)';
        ctx.beginPath();
        ctx.arc(satX, satY, 8 + Math.sin(time * 0.1) * 3, 0, Math.PI * 2);
        ctx.stroke();

        // Label satellite
        ctx.fillStyle = '#fff';
        ctx.font = '8px Share Tech Mono';
        ctx.fillText(sat.id, satX, satY - 12);

        // Check if selected
        if (selectedSat && selectedSat.id === sat.id) {
          ctx.strokeStyle = 'var(--color-cyan)';
          ctx.lineWidth = 1.5;
          ctx.beginPath();
          ctx.rect(satX - 8, satY - 8, 16, 16);
          ctx.stroke();
          
          // Connect satellite to ground station coordinate
          ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
          ctx.setLineDash([2, 2]);
          ctx.beginPath();
          ctx.moveTo(satX, satY);
          ctx.lineTo(cx + (sat.lng / 180) * 100, cy + (sat.lat / 90) * 50);
          ctx.stroke();
          ctx.setLineDash([]);
        }
      });

      time++;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [activeSatellites, selectedSat]);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      {/* Visual Canvas Satellite Grid */}
      <div className="hud-panel accent-cyan corners" style={{ padding: '4px', background: 'rgba(0,0,0,0.5)' }}>
        <div className="corners-inner"></div>
        <div className="tech-font" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0, 243, 255, 0.05)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Globe size={14} className="pulse-indicator" style={{ background: 'transparent' }} />
            <span>ORBITAL_VIGIL_NETWORK // STRATOSPHERE SCAN</span>
          </div>
          <span>ACTIVE INTEL CONSOLATION</span>
        </div>
        <div style={{ position: 'relative', width: '100%', height: '240px' }}>
          <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* Satellite Selector Dossier Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '10px' }}>
        {activeSatellites.map((sat) => (
          <button
            key={sat.id}
            onClick={() => setSelectedSat(sat)}
            className={`hud-btn ${selectedSat.id === sat.id ? 'active' : ''}`}
            style={{
              padding: '12px',
              background: selectedSat.id === sat.id ? 'rgba(0,243,255,0.1)' : 'rgba(0,0,0,0.2)',
              borderColor: selectedSat.id === sat.id ? 'var(--color-cyan)' : 'rgba(0,243,255,0.1)',
              textAlign: 'left',
              display: 'flex',
              flexDirection: 'column',
              gap: '4px'
            }}
          >
            <div style={{ fontSize: '0.8rem', fontWeight: 'bold', color: selectedSat.id === sat.id ? '#fff' : 'var(--color-cyan)' }}>
              {sat.id} - {sat.name}
            </div>
            <div style={{ fontSize: '0.65rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)' }}>
              TYPE: {sat.type}
            </div>
          </button>
        ))}
      </div>

      {/* Selected Satellite Specs Log */}
      <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(20,25,35,0.6)' }}>
        <div className="corners-inner"></div>
        <h4 className="tech-font" style={{ fontSize: '0.85rem', color: 'var(--color-cyan)', borderBottom: '1px solid rgba(0,243,255,0.15)', paddingBottom: '6px', marginBottom: '10px' }}>
          SAT_LINK SPECIFICATIONS // {selectedSat.id}
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', fontFamily: 'var(--font-mono)', fontSize: '0.8rem' }}>
          <div>
            <span style={{ color: 'var(--color-text-dark)' }}>ORBITAL HEADING:</span> <span style={{ color: 'var(--color-text-main)' }}>{selectedSat.inc} INC</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dark)' }}>ORBIT ALTITUDE:</span> <span style={{ color: 'var(--color-amber)' }}>{selectedSat.alt}</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dark)' }}>GROUND TRACK:</span> <span style={{ color: 'var(--color-cyan)' }}>{selectedSat.lat.toFixed(2)}N // {selectedSat.lng.toFixed(2)}W</span>
          </div>
          <div>
            <span style={{ color: 'var(--color-text-dark)' }}>STATUS CORE:</span> <span style={{ color: 'var(--color-green)', fontWeight: 'bold' }}>{selectedSat.status}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
