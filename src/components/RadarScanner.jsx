import React, { useEffect, useRef, useState } from 'react';
import { Target, ShieldAlert, Crosshair } from 'lucide-react';

export default function RadarScanner() {
  const canvasRef = useRef(null);
  const [selectedTarget, setSelectedTarget] = useState(null);

  // Pre-configured tactical aerospace targets
  const [targets, setTargets] = useState([
    { id: 1, name: 'B-21 RAIDER', x: 0.35, y: 0.25, threat: 'FRIENDLY', speed: 'MACH 0.85', alt: '52,000 FT', heading: '085°', status: 'CLOCKED' },
    { id: 2, name: 'F-22 RAPTOR', x: 0.70, y: 0.40, threat: 'FRIENDLY', speed: 'MACH 1.82', alt: '60,000 FT', heading: '120°', status: 'INTERCEPT' },
    { id: 3, name: 'SU-57 FELON', x: 0.55, y: 0.75, threat: 'HOSTILE', speed: 'MACH 2.10', alt: '41,000 FT', heading: '340°', status: 'LOCKED' },
    { id: 4, name: 'HYPERSONIC HGV', x: 0.22, y: 0.60, threat: 'HOSTILE', speed: 'MACH 12.4', alt: '112,000 FT', heading: '190°', status: 'INTERDICT' }
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let sweepAngle = 0;

    // Handle canvas sizing
    const resizeCanvas = () => {
      const parent = canvas.parentElement;
      canvas.width = parent.clientWidth;
      canvas.height = 360; // Locked height for HUD layout
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Frame update loop
    const render = () => {
      const w = canvas.width;
      const h = canvas.height;
      const cx = w / 2;
      const cy = h / 2;
      const radius = Math.min(cx, cy) - 20;

      // 1. CLEAR FRAME
      ctx.fillStyle = 'rgba(10, 14, 20, 0.4)';
      ctx.fillRect(0, 0, w, h);

      // 2. RADAR HUD COMPASS OUTER RING
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Concentration grid rings
      for (let r = radius - 40; r > 0; r -= 40) {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.06)';
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Compass Crosshairs (X/Y Axis)
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(cx - radius - 10, cy);
      ctx.lineTo(cx + radius + 10, cy);
      ctx.moveTo(cx, cy - radius - 10);
      ctx.lineTo(cx, cy + radius + 10);
      ctx.stroke();

      // Heading ticks on Outer Ring
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.2)';
      for (let angle = 0; angle < 360; angle += 15) {
        const rad = (angle * Math.PI) / 180;
        const tickLength = angle % 45 === 0 ? 8 : 4;
        const x1 = cx + Math.cos(rad) * radius;
        const y1 = cy + Math.sin(rad) * radius;
        const x2 = cx + Math.cos(rad) * (radius - tickLength);
        const y2 = cy + Math.sin(rad) * (radius - tickLength);

        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();

        // Print headings (N, E, S, W or degrees)
        if (angle % 90 === 0) {
          ctx.fillStyle = 'rgba(0, 243, 255, 0.6)';
          ctx.font = '10px Share Tech Mono';
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          let label = angle === 0 ? '90°' : angle === 90 ? '180°' : angle === 180 ? '270°' : '000°';
          if (angle === 270) label = 'N';
          if (angle === 0) label = 'E';
          if (angle === 90) label = 'S';
          if (angle === 180) label = 'W';
          
          const lx = cx + Math.cos(rad) * (radius + 15);
          const ly = cy + Math.sin(rad) * (radius + 15);
          ctx.fillText(label, lx, ly);
        }
      }

      // 3. RADAR SCANNING SWEEP
      const sweepRad = (sweepAngle * Math.PI) / 180;
      const sweepX = cx + Math.cos(sweepRad) * radius;
      const sweepY = cy + Math.sin(sweepRad) * radius;

      // Draw the glow wedge
      const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
      gradient.addColorStop(0, 'rgba(0, 243, 255, 0.01)');
      gradient.addColorStop(1, 'rgba(0, 243, 255, 0.1)');

      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      // Sweep arc (trail of 30 degrees)
      ctx.arc(cx, cy, radius, sweepRad - 0.5, sweepRad);
      ctx.lineTo(cx, cy);
      ctx.fill();

      // Main sweep line
      ctx.strokeStyle = 'rgba(0, 243, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(sweepX, sweepY);
      ctx.stroke();

      // 4. DRAW TARGET SIGNATURES
      targets.forEach((t) => {
        // Map target values to pixel space within radar circle
        const tx = cx + (t.x - 0.5) * radius * 1.8;
        const ty = cy + (t.y - 0.5) * radius * 1.8;

        // Calculate distance from center to ensure inside radar
        const dist = Math.sqrt((tx - cx) ** 2 + (ty - cy) ** 2);
        if (dist > radius) return;

        // Calculate angle to target
        let targetAngle = Math.atan2(ty - cy, tx - cx) * (180 / Math.PI);
        if (targetAngle < 0) targetAngle += 360;

        // Calculate target brightness based on how close sweep line is
        const angleDiff = Math.abs(sweepAngle - targetAngle);
        let alpha = 0;
        
        if (angleDiff < 40) {
          alpha = 1 - angleDiff / 40;
        } else if (sweepAngle < 40 && targetAngle > 320) {
          // Wrap around check
          const wrappedDiff = Math.abs((sweepAngle + 360) - targetAngle);
          if (wrappedDiff < 40) alpha = 1 - wrappedDiff / 40;
        }

        // Base faint signature that always glows
        alpha = Math.max(alpha, 0.25);

        // Core marker based on threat level
        const isHostile = t.threat === 'HOSTILE';
        ctx.fillStyle = isHostile ? `rgba(255, 59, 48, ${alpha})` : `rgba(0, 243, 255, ${alpha})`;
        ctx.strokeStyle = isHostile ? `rgba(255, 59, 48, ${alpha})` : `rgba(0, 243, 255, ${alpha})`;

        // Target geometric indicator
        ctx.beginPath();
        if (isHostile) {
          // Hostile: Danger Triangle
          ctx.moveTo(tx, ty - 6);
          ctx.lineTo(tx + 6, ty + 4);
          ctx.lineTo(tx - 6, ty + 4);
        } else {
          // Friendly: Secure Square
          ctx.rect(tx - 4, ty - 4, 8, 8);
        }
        ctx.closePath();
        ctx.fill();

        // Draw selection lock bracket if selected
        const isSelected = selectedTarget && selectedTarget.id === t.id;
        if (isSelected) {
          ctx.strokeStyle = isHostile ? 'var(--color-red)' : 'var(--color-cyan)';
          ctx.lineWidth = 1.5;
          
          // Glowing lock circle
          ctx.beginPath();
          ctx.arc(tx, ty, 12, 0, Math.PI * 2);
          ctx.stroke();

          // Reticle dashes
          ctx.beginPath();
          ctx.moveTo(tx - 18, ty); ctx.lineTo(tx - 12, ty);
          ctx.moveTo(tx + 12, ty); ctx.lineTo(tx + 18, ty);
          ctx.moveTo(tx, ty - 18); ctx.lineTo(tx, ty - 12);
          ctx.moveTo(tx, ty + 12); ctx.lineTo(tx, ty + 18);
          ctx.stroke();

          // Selection Tag text on canvas
          ctx.fillStyle = '#fff';
          ctx.font = '9px Share Tech Mono';
          ctx.textAlign = 'left';
          ctx.fillText(`LOCK: ${t.name}`, tx + 16, ty - 4);
          ctx.fillStyle = isHostile ? 'var(--color-red)' : 'var(--color-cyan)';
          ctx.fillText(`ALT: ${t.alt}`, tx + 16, ty + 6);
        } else if (alpha > 0.4) {
          // Label for sweep highlights
          ctx.fillStyle = isHostile ? `rgba(255, 59, 48, ${alpha * 0.8})` : `rgba(0, 243, 255, ${alpha * 0.8})`;
          ctx.font = '8px Share Tech Mono';
          ctx.textAlign = 'center';
          ctx.fillText(t.name, tx, ty - 8);
        }
      });

      // Update sweep sweep rotation rate (Mach Speed Sweeper)
      sweepAngle = (sweepAngle + 2.5) % 360;
      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [targets, selectedTarget]);

  // Click on canvas to establish a secure target lock
  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(cx, cy) - 20;

    // Check if clicked close to any target
    let clickedTarget = null;
    let minDistance = 25; // Click radius limit

    targets.forEach((t) => {
      const tx = cx + (t.x - 0.5) * radius * 1.8;
      const ty = cy + (t.y - 0.5) * radius * 1.8;
      const dist = Math.sqrt((clickX - tx) ** 2 + (clickY - ty) ** 2);
      
      if (dist < minDistance) {
        minDistance = dist;
        clickedTarget = t;
      }
    });

    if (clickedTarget) {
      setSelectedTarget(clickedTarget);
    } else {
      // Add a dynamic new threat signature on the tactical grid!
      const normX = (clickX - cx) / (radius * 1.8) + 0.5;
      const normY = (clickY - cy) / (radius * 1.8) + 0.5;
      
      // Keep it within boundaries
      const distanceFraction = Math.sqrt((normX - 0.5) ** 2 + (normY - 0.5) ** 2);
      if (distanceFraction > 0.5) return; // Outside radar diameter

      const threatLevel = Math.random() > 0.4 ? 'HOSTILE' : 'FRIENDLY';
      const id = targets.length + 1;
      const newTarget = {
        id,
        name: threatLevel === 'HOSTILE' ? `TGT_TRK_${100 + id}` : `AIR_CAP_${100 + id}`,
        x: normX,
        y: normY,
        threat: threatLevel,
        speed: `MACH ${(Math.random() * 5 + 0.5).toFixed(2)}`,
        alt: `${Math.floor(Math.random() * 80 + 20)},000 FT`,
        heading: `${Math.floor(Math.random() * 360)}°`,
        status: threatLevel === 'HOSTILE' ? 'ENGAGED' : 'ESCORT'
      };

      setTargets([...targets, newTarget]);
      setSelectedTarget(newTarget);
    }
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }}>
      
      <div className="hud-panel accent-cyan corners" style={{ padding: '4px', background: 'rgba(0,0,0,0.5)', overflow: 'hidden' }}>
        <div className="corners-inner"></div>
        {/* Sub-header detailing coordinates */}
        <div className="tech-font" style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', background: 'rgba(0, 243, 255, 0.06)', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', fontSize: '0.75rem', color: 'var(--color-cyan)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Crosshair size={14} className="pulse-indicator" style={{ background: 'transparent' }} />
            <span>2D_SKY_SCANNER // ACTIVE_LOCK</span>
          </div>
          <span>GRID_SECTOR: CONUS_US_EAST</span>
        </div>
        
        <div style={{ position: 'relative', width: '100%', height: '360px', cursor: 'crosshair' }}>
          <canvas ref={canvasRef} onClick={handleCanvasClick} style={{ display: 'block', width: '100%', height: '100%' }} />
        </div>
      </div>

      {/* DETAILED WEAPONRET RETICLE LOCK SYSTEM DATA SHEET */}
      <div className="hud-panel corners" style={{ padding: '16px', background: 'rgba(20, 25, 35, 0.65)' }}>
        <div className="corners-inner"></div>
        <h3 className="tech-font" style={{ fontSize: '0.9rem', color: 'var(--color-cyan)', display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid rgba(0, 243, 255, 0.15)', paddingBottom: '8px', marginBottom: '12px' }}>
          <Target size={16} />
          {selectedTarget ? 'SELECTED TELEMETRY LOCK INTERCEPT' : 'TACTICAL ACTIVE TRANSPONDER LOGS'}
        </h3>

        {selectedTarget ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '15px', fontFamily: 'var(--font-mono)' }}>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>TARGET IDENTIFICATION</div>
              <div style={{ fontSize: '1rem', fontWeight: 'bold', color: selectedTarget.threat === 'HOSTILE' ? 'var(--color-red)' : 'var(--color-green)' }}>
                {selectedTarget.name}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>OPERATIONAL THREAT EVAL</div>
              <div className="tactical-badge" style={{ 
                background: selectedTarget.threat === 'HOSTILE' ? 'rgba(255,59,48,0.1)' : 'rgba(100,255,100,0.1)',
                borderColor: selectedTarget.threat === 'HOSTILE' ? 'var(--color-red)' : 'var(--color-green)',
                color: selectedTarget.threat === 'HOSTILE' ? 'var(--color-red)' : 'var(--color-green)'
              }}>
                {selectedTarget.threat}
              </div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>CRUISE VELOCITY</div>
              <div style={{ color: 'var(--color-amber)', fontSize: '0.9rem' }}>{selectedTarget.speed}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>FLIGHT PROFILE ALTITUDE</div>
              <div style={{ color: 'var(--color-text-main)', fontSize: '0.9rem' }}>{selectedTarget.alt}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>VECTOR HEADING</div>
              <div style={{ color: 'var(--color-cyan)', fontSize: '0.9rem' }}>{selectedTarget.heading}</div>
            </div>
            <div>
              <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>DEFENSE DIRECTIVE STATUS</div>
              <div style={{ color: selectedTarget.threat === 'HOSTILE' ? 'var(--color-red)' : '#fff', fontWeight: 'bold' }}>{selectedTarget.status}</div>
            </div>
          </div>
        ) : (
          <div style={{ fontSize: '0.8rem', color: 'var(--color-text-dim)', fontFamily: 'var(--font-mono)', textAlign: 'center', padding: '15px 0' }}>
            <div style={{ marginBottom: '6px' }}>NO EXTERNAL SIGNATURE ACQUIRED</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--color-text-dark)' }}>[ CLICK ANYWHERE ON THE ACTIVE RADAR ARRAY ABOVE TO DEPLOY LOCK VECTOR ]</div>
          </div>
        )}
      </div>

    </div>
  );
}
