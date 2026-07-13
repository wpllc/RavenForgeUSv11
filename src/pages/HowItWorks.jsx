import React from 'react';
import { Shield, Clock, Search, ShieldAlert, Cpu } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={24} className="text-[#38bdf8]" aria-hidden="true" />
              How It Works
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Plain-language documentation detailing our validation, rules checking, and decision gate engines.
            </p>
          </div>
        </div>
      </section>

      {/* THE 4 PILLARS GRID */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        
        {/* PILLAR 1: TEMPORAL AWARENESS */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Clock size={16} className="text-[#38bdf8]" aria-hidden="true" />
            1. Temporal Confidence Decay
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Decisions are only as good as the evidence they rest on. RavenForge tracks the age of every photo and observation log. As evidence ages, its confidence index decays automatically. If local conditions degrade or inspections are delayed, the decay rate increases, eventually triggering a revalidation check.
          </p>
        </div>

        {/* PILLAR 2: ENTITY DEDUPLICATION */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Search size={16} className="text-[#38bdf8]" aria-hidden="true" />
            2. Sequence-to-Asset Mapping
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Inspectors frequently capture multiple overlapping angles of the same mechanical asset. RavenForge matches image similarity indexes and spatial metadata clusters to automatically group raw files into consolidated photo sequences, mapping them to unique assets without losing context.
          </p>
        </div>

        {/* PILLAR 3: POLICY RULE ENFORCEMENT */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Cpu size={16} className="text-[#38bdf8]" aria-hidden="true" />
            3. Safety and Decision Rules
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            The platform enforces strict physical and operational limits. For example, if a compressor install date exceeds its design service window (18 years against a 15-year limit), or a fire extinguisher tag is older than 12 months, the engine triggers rule warnings and records the anomaly details to decision logs.
          </p>
        </div>

        {/* PILLAR 4: ADMISSIBILITY GATES */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={16} className="text-amber-500" aria-hidden="true" />
            4. Admissibility and Decision Gates
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
            Admissibility gates function as an active boundary layer between model outputs and action execution. If statistical confidence falls below limits (such as a 64% OCR match on a serial key), the gate blocks automated compilation and routes the item to human queues for manual operator review.
          </p>
        </div>

      </section>

      {/* CORE LOGIC TREE EXPLANATION */}
      <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Decisional Gating Logic Tree
        </h3>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13px', fontFamily: 'var(--font-mono)' }}>
          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>STEP 1</div>
            <div>
              <strong style={{ color: '#fff' }}>Physical Validation Check</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Does the asset exist and are coordinate logs available? (If fail: State set to IMPOSSIBLE, halts process).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>STEP 2</div>
            <div>
              <strong style={{ color: '#fff' }}>Safety Policy Enforcement</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Does the condition metric violate core fire safety or operational lifetimes? (If fail: State set to FORBIDDEN, halts process).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>STEP 3</div>
            <div>
              <strong style={{ color: '#fff' }}>Confidence Validation</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                Are the raw photo similarity readings or nameplate OCR scans above 75% confidence? (If fail: State set to ESCALATED, routes to Review Queue).
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <div style={{ color: '#fff', fontWeight: 'bold' }}>STEP 4</div>
            <div>
              <strong style={{ color: '#fff' }}>Chained Decisional Signing</strong>
              <p style={{ fontSize: '12px', marginTop: '4px', fontFamily: 'var(--font-sans)', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                If all check steps pass: Recommendation compiled to ledger, marked PASSED checks, and recorded with a tamper-evident audit signature.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
