import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, UploadCloud, Cpu, UserCheck, ShieldCheck, FileCheck } from 'lucide-react';
import { DEMO_DATA_LABEL } from '../data/demoData';

export default function Overview() {
  const navigate = useNavigate();

  return (
    <div className="space-y-10">
      
      {/* 1. HERO SECTION */}
      <section className="text-center py-8 md:py-14 space-y-6 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1e293b] border border-[#334155] text-[#38bdf8] mb-2">
          <span>Systems Governance & Decision Ledger</span>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight font-sans">
          Turn messy field evidence into <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#38bdf8] to-[#22c55e]">
            decisions you can defend.
          </span>
        </h1>
        
        <p className="text-base md:text-lg text-[#94a3b8] leading-relaxed max-w-2xl mx-auto">
          RavenForge processes photographs, documents, observations, and system data into structured findings, prioritized risks, human review tasks, and audit-ready recommendations.
        </p>

        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <button 
            onClick={() => navigate('/guided-demo')}
            className="btn bg-[#0284c7] hover:bg-[#38bdf8] text-white px-6 py-3 rounded-lg font-semibold transition shadow-lg flex items-center gap-2"
          >
            <span>Watch Guided Demo</span>
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={() => navigate('/assets')}
            className="btn btn-secondary px-6 py-3 rounded-lg font-semibold transition"
          >
            Explore Assets
          </button>
        </div>
      </section>

      {/* 2. THE PIPELINE ARCHITECTURE (EXECUTIVE FLOW) */}
      <section className="card bg-[#131c2e] border-[#334155]">
        <div className="text-center max-w-xl mx-auto mb-8">
          <h2 className="text-xs uppercase tracking-widest text-[#64748b] font-mono font-bold mb-2">
            The Downstream Decision Pipeline
          </h2>
          <p className="text-sm text-[#94a3b8]">
            How RavenForge ingests evidence, performs automated checks, and outputs verifiable decisions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-center text-center p-4 bg-[#0b0f19] border border-[#334155]/40 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-[#38bdf8] mb-4">
              <UploadCloud size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">1. Upload Evidence</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Ingests raw photos, GPS location logs, inspector notes, and nameplate details directly.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-[#0b0f19] border border-[#334155]/40 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-sky-500/10 flex items-center justify-center text-[#38bdf8] mb-4">
              <Cpu size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">2. Analyze & Group</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Groups matching visual sequences automatically and flags anomalies against boundary policies.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-[#0b0f19] border border-[#334155]/40 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-amber-500/10 flex items-center justify-center text-[#f59e0b] mb-4">
              <UserCheck size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">3. Human Validation</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Uncertain readings or boundary overrides are routed to operators for verification.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-4 bg-[#0b0f19] border border-[#334155]/40 rounded-lg">
            <div className="h-10 w-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-[#22c55e] mb-4">
              <ShieldCheck size={20} />
            </div>
            <h3 className="text-sm font-semibold text-white mb-2">4. Cryptographic Proof</h3>
            <p className="text-xs text-[#94a3b8] leading-relaxed">
              Creates an immutable ledger mapping every decision back to physical evidence records.
            </p>
          </div>
        </div>
      </section>

      {/* 3. CORE PRINCIPLES (TRUST & RESPONSIBILITY) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded bg-[#1e293b] flex items-center justify-center text-[#38bdf8]">
              <span className="font-mono text-xs">A</span>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Human Control</h4>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Humans remain fully responsible for approving critical actions. RavenForge stops automatic processing and escalates when uncertainty thresholds are violated.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded bg-[#1e293b] flex items-center justify-center text-[#38bdf8]">
              <span className="font-mono text-xs">B</span>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Traceability</h4>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Every conclusion can be traced back to its raw source evidence. We expose uncertainty indexes transparently instead of obscuring them behind model defaults.
          </p>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-6 w-6 rounded bg-[#1e293b] flex items-center justify-center text-[#38bdf8]">
              <span className="font-mono text-xs">C</span>
            </div>
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">Actionable Outputs</h4>
          </div>
          <p className="text-xs text-[#94a3b8] leading-relaxed">
            Outputs are structured as priority findings and actionable lists for capital planners, risk managers, and auditors, not just abstract analysis reports.
          </p>
        </div>
      </section>

      {/* 4. EXPANDABLE TECHNICAL SCHEMATIC */}
      <section className="card bg-[#131c2e] border-[#334155] p-5">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <FileCheck size={16} className="text-[#38bdf8]" />
              System Architecture & Data Flows
            </h3>
            <p className="text-xs text-[#94a3b8] mt-1">
              Detailed technical blueprint of the model-agnostic governance pipeline.
            </p>
          </div>
          
          <details className="expandable-details" style={{ margin: 0 }}>
            <summary>Expose Technical Schematic</summary>
            <div className="raw-json-block mt-3 text-left">
{`    [ PHYSICAL EVIDENCE INPUTS ]
         | (Inspection Photos, Location Logs, Nameplates)
         v
    [ DATA INGESTION GATEWAY ]
         |
         +---> [ ASSET DE-DUPLICATION ] ---> [ RISK & BOUNDARY ENGINE ]
         |                                          |
         |                                          v (Evaluates Rules)
         v                                          |
    [ CONFIDENCE DRIFT CALCULATOR ] <---------------+
         | (Calculates telemetry freshness)
         |
         v
    [ ADMISSIBILITY GATES ] <---------- [ STATIC SAFETY POLICIES ]
         | (Verifies Physical Constraints)
         |
         +---> ADMISSIBLE ---> [ VERIFIED LEDGER ] (Signed & Audit-Ready)
         |
         +---> UNCERTAIN  ---> [ HUMAN REVIEW QUEUE ] (Approve, Correct, Escalate, Defer)
         |
         +---> FORBIDDEN  ---> [ SYSTEM BLOCK ] (Logs policy violations)`}
            </div>
          </details>
        </div>
      </section>

    </div>
  );
}
