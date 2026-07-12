import React from 'react';
import { Shield, Clock, Search, ShieldAlert, Cpu, Sparkles } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="space-y-8">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Shield size={20} className="text-[#38bdf8]" />
            How RavenForge Works
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Plain-language documentation detailing our validation, revalidation, and decision-gate engines.
          </p>
        </div>
      </div>

      {/* THE 4 PILLARS GRID */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PILLAR 1: TEMPORAL AWARENESS */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Clock size={16} className="text-[#38bdf8]" />
            1. Temporal Awareness & Confidence Decay
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Decisions are only as good as the evidence they rest on. RavenForge tracks the age of every photo and observation log. As evidence ages, its confidence index decays automatically. If local weather conditions degrade or communications flicker, the decay rate increases, eventually triggering a sensor revalidation check when thresholds are crossed.
          </p>
        </div>

        {/* PILLAR 2: ENTITY DEDUPLICATION */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Search size={16} className="text-[#38bdf8]" />
            2. Entity Reconstruction & Deduplication
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Inspectors frequently capture multiple overlapping angles of the same mechanical asset, cluttering database schemas. RavenForge matches image similarity indexes and spatial metadata clusters to automatically group raw files into consolidated photo sequences, mapping them to 8 unique assets without losing details.
          </p>
        </div>

        {/* PILLAR 3: POLICY RULE ENFORCEMENT */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Cpu size={16} className="text-[#38bdf8]" />
            3. Boundary & Life-Expectancy Checks
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            The platform enforces strict physical and operational limits. For example, if a compressor install date exceeds its design service window (18 years against a 15-year limit), or a fire extinguisher tag is older than 12 months, the engine triggers policy warnings and records the anomaly details to the decision logs.
          </p>
        </div>

        {/* PILLAR 4: ADMISSIBILITY GATES */}
        <div className="card space-y-3">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldAlert size={16} className="text-amber-500" />
            4. Admissibility Gate Execution
          </h3>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Admissibility gates function as an active boundary layer between model outputs and action execution. If statistical confidence falls below limits (such as a 64% OCR match on a serial key), the gate blocks automated compilation and routes the item to human queues for manual operator sign-off.
          </p>
        </div>

      </section>

      {/* CORE LOGIC TREE EXPLANATION */}
      <section className="card bg-[#131c2e] border-[#334155]">
        <h3 className="text-xs uppercase tracking-widest text-[#64748b] font-mono font-bold mb-4">
          Decisional Gating Logic Tree
        </h3>
        
        <div className="space-y-4 text-xs font-mono text-[#94a3b8]">
          <div className="flex gap-4 p-3 bg-[#0b0f19] border border-[#334155]/20 rounded-lg">
            <div className="text-white font-bold shrink-0">STEP 1</div>
            <div>
              <strong className="text-white">Physical Validation Check</strong>
              <p className="text-[11px] mt-0.5 font-sans leading-relaxed">Does the asset exist and are coordinate logs available? (If fail: State set to IMPOSSIBLE, halts process).</p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-[#0b0f19] border border-[#334155]/20 rounded-lg">
            <div className="text-white font-bold shrink-0">STEP 2</div>
            <div>
              <strong className="text-white">Safety Policy Enforcement</strong>
              <p className="text-[11px] mt-0.5 font-sans leading-relaxed">Does the condition metric violate core fire safety or operational lifetimes? (If fail: State set to FORBIDDEN, halts process).</p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-[#0b0f19] border border-[#334155]/20 rounded-lg">
            <div className="text-white font-bold shrink-0">STEP 3</div>
            <div>
              <strong className="text-white">Confidence Validation</strong>
              <p className="text-[11px] mt-0.5 font-sans leading-relaxed">Are the raw photo similarity readings or nameplate OCR scans above 75% confidence? (If fail: State set to ESCALATED, routes to Review Queue).</p>
            </div>
          </div>

          <div className="flex gap-4 p-3 bg-[#0b0f19] border border-[#334155]/20 rounded-lg">
            <div className="text-white font-bold shrink-0">STEP 4</div>
            <div>
              <strong className="text-white">Chained Decisional Signing</strong>
              <p className="text-[11px] mt-0.5 font-sans leading-relaxed">If all check steps pass: Recommendation compiled to ledger, marked ADMISSIBLE, and signed with SHA-256 block hash key.</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
