import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, Image, Clipboard, Eye, 
  ChevronRight, AlertCircle, ArrowRight, ShieldCheck, CheckSquare, Search,
  HelpCircle, Settings, CheckSquare as CheckIcon, ShieldAlert, BadgeInfo 
} from 'lucide-react';
import { DEMO_DATA_LABEL, projectSummary } from '../data/demoData';

export default function GuidedDemo() {
  const navigate = useNavigate();
  const [currentStage, setCurrentStage] = useState(1);

  const totalStages = 6;

  const handleNext = () => {
    if (currentStage < totalStages) {
      setCurrentStage(currentStage + 1);
    } else {
      navigate('/assets');
    }
  };

  const handlePrev = () => {
    if (currentStage > 1) {
      setCurrentStage(currentStage - 1);
    }
  };

  return (
    <div className="space-y-6 flex flex-col h-full justify-between">
      
      {/* HEADER PROGRESS STATUS */}
      <div className="flex flex-col gap-2 shrink-0">
        <div className="flex justify-between items-center bg-[#131c2e] border border-[#334155]/60 p-4 rounded-lg">
          <div className="font-sans text-xs">
            <span className="text-[#64748b] font-mono">PILOT CASE STUDY:</span> <span className="text-white font-bold">{projectSummary.name}</span>
          </div>
          <div className="flex items-center gap-1 font-mono text-xs">
            <span className="text-[#64748b]">NARRATIVE STEP:</span>
            <span className="text-[#38bdf8] font-bold">{currentStage} / {totalStages}</span>
          </div>
        </div>

        {/* PROGRESS INDICATOR BAR */}
        <div className="w-full bg-[#0b0f19] border border-[#334155]/40 h-2.5 rounded-full overflow-hidden flex">
          {Array.from({ length: totalStages }).map((_, idx) => (
            <div 
              key={idx} 
              className={`h-full flex-1 transition-all duration-300 border-r border-[#0b0f19] ${
                idx + 1 <= currentStage ? 'bg-[#38bdf8] shadow-[0_0_8px_rgba(56,189,248,0.4)]' : 'bg-[#131c2e]'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CORE DISPLAY (GRAPHIC + COPY + METRICS) */}
      <div className="flex-1 min-h-[360px] py-2 flex flex-col md:flex-row gap-6 items-stretch">
        
        {/* LEFT COLUMN: NARRATIVE COPY & METRICS */}
        <div className="flex-1 bg-[#131c2e]/40 border border-[#334155]/60 p-5 rounded-xl flex flex-col justify-between space-y-4">
          
          <div className="space-y-4">
            <span className="inline-block text-[10px] font-mono text-[#38bdf8] border border-[#38bdf8]/30 px-2 py-0.5 rounded bg-[#38bdf8]/5 uppercase">
              {currentStage === 1 && "Step 1: The Problem"}
              {currentStage === 2 && "Step 2: Ingesting Evidence"}
              {currentStage === 3 && "Step 3: Systematic Analysis"}
              {currentStage === 4 && "Step 4: Human Review Gate"}
              {currentStage === 5 && "Step 5: Operational Decision"}
              {currentStage === 6 && "Step 6: Defensible Proof"}
            </span>

            <h2 className="text-xl font-bold tracking-tight text-white">
              {currentStage === 1 && "Traditional Audits Lack Verifiable Decisional Lineage"}
              {currentStage === 2 && "Physical Evidence Ingested and Logged"}
              {currentStage === 3 && "Automated Entity Correlation and Deduplication"}
              {currentStage === 4 && "Escalating Low Confidence Metrics"}
              {currentStage === 5 && "Verification Actions: Human remains in Control"}
              {currentStage === 6 && "Cryptographic Decision Ledger Packages Generated"}
            </h2>

            <p className="text-xs text-[#94a3b8] leading-relaxed font-sans">
              {currentStage === 1 && (
                "Traditional facility audits are inherently unreliable. Inspectors take hundreds of redundant photos of cooling towers and air handlers, copy serial numbers with grease-smudged nameplates, and upload reports to static spreadsheets. When capital planners allocate replacement budgets, they lack an auditable connection between the final spending decision and the raw physical evidence, leaving the portfolio exposed to risk and compliance failures."
              )}
              {currentStage === 2 && (
                "RavenForge solves this by ingesting all field traces directly. In our pilot demonstration run, 96 raw photographs are loaded from inspection tablets along with metadata coordinates, timestamp registries, and site inspector logs. Nothing is edited or discarded. Every photograph is logged with its original file details, serving as the foundational physical evidence for the audit."
              )}
              {currentStage === 3 && (
                "To streamline processing, RavenForge matches coordinate bounds and image similarity hashes to consolidate the 96 raw photographs into 13 photo sequences. It automatically identifies 8 unique assets. The engine then runs localized rule checks, validating the records against installation lifetimes and condition models, calculating statistical confidence limits for each asset profile."
              )}
              {currentStage === 4 && (
                "Automated systems fail when they try to make decisions on blurred tags or ambiguous paint stains. Rather than hiding these anomalies under arbitrary averages, RavenForge identifies them and alerts inspectors. Here, nameplate readings on Chiller 02 have low OCR confidence (64%), and moisture stains near Pump 02 cannot be classified as active leaks or old stains. RavenForge blocks automatic action and escalates both to the operator queue."
              )}
              {currentStage === 5 && (
                "Human operators inspect the side-by-side evidence details in the Review Queue. They can choose to Approve (if correct), Correct (if they can resolve the OCR text directly), Escalate (for a follow-up physical inspection), or Defer (postpone decision). This ensures that humans retain full operational control over the final audit records, with every manual action recorded to the audit trail."
              )}
              {currentStage === 6 && (
                "Once all escalations are resolved, the system compiles a Chained Audit Package. Each asset finding and decision outcome is bound together with cryptographic SHA-256 block signatures. This output package links every recommendation directly to its original photos, giving asset managers, compliance officers, and regulators complete, verifiable proof of decisions."
              )}
            </p>
          </div>

          {/* TELEMETRY KEY METRICS BOX */}
          <div className="bg-[#0b0f19] p-4 border border-[#334155]/40 rounded-lg font-mono text-[10px] space-y-2.5">
            <div className="text-[#64748b] uppercase tracking-widest text-[9px]">Demo Telemetry Summary</div>
            
            <div className="grid grid-cols-2 gap-3 text-[#94a3b8]">
              {currentStage === 1 && (
                <>
                  <div><span className="text-[#64748b]">INSPECTION TRACES:</span> <span className="text-red-400 font-bold">Unverifiable</span></div>
                  <div><span className="text-[#64748b]">BUDGET DECISIONS:</span> <span className="text-red-400 font-bold">No Lineage</span></div>
                  <div><span className="text-[#64748b]">DATA STRUCTURE:</span> <span className="text-white">Static Spreadsheets</span></div>
                  <div><span className="text-[#64748b]">AUDIT STATUS:</span> <span className="text-amber-500 font-bold">EXPOSED</span></div>
                </>
              )}
              {currentStage === 2 && (
                <>
                  <div><span className="text-[#64748b]">RAW PHOTOS INGESTED:</span> <span className="text-white font-bold">96 Frames</span></div>
                  <div><span className="text-[#64748b]">GPS TAGS DETECTED:</span> <span className="text-white font-bold">13 Coordinates</span></div>
                  <div><span className="text-[#64748b]">EXIF PARSING STATE:</span> <span className="text-[#38bdf8] font-bold">COMPLETED</span></div>
                  <div><span className="text-[#64748b]">LEDGER INITIALIZED:</span> <span className="text-[#22c55e] font-bold">READY</span></div>
                </>
              )}
              {currentStage === 3 && (
                <>
                  <div><span className="text-[#64748b]">PHOTOS GROUPED:</span> <span className="text-white font-bold">96 to 13 Sequences</span></div>
                  <div><span className="text-[#64748b]">UNIQUE ASSETS:</span> <span className="text-[#38bdf8] font-bold">8 Mapped</span></div>
                  <div><span className="text-[#64748b]">DUPLICATES DISCOVERED:</span> <span className="text-white font-bold">83 Frames</span></div>
                  <div><span className="text-[#64748b]">RULE CHECKS RUN:</span> <span className="text-[#22c55e] font-bold">32 Passes</span></div>
                </>
              )}
              {currentStage === 4 && (
                <>
                  <div><span className="text-[#64748b]">RULE ANOMALIES:</span> <span className="text-amber-500 font-bold">3 Findings</span></div>
                  <div><span className="text-[#64748b]">LOW-CONFIDENCE GATES:</span> <span className="text-amber-400 font-bold">2 Escalations</span></div>
                  <div><span className="text-[#64748b]">SYSTEM AUTOMATION:</span> <span className="text-[#ef4444] font-bold">LOCKED</span></div>
                  <div><span className="text-[#64748b]">CONFIDENCE THRESHOLD:</span> <span className="text-white">75% Limit</span></div>
                </>
              )}
              {currentStage === 5 && (
                <>
                  <div><span className="text-[#64748b]">OPERATOR ACTIONS:</span> <span className="text-[#38bdf8] font-bold">Approve, Correct</span></div>
                  <div><span className="text-[#64748b]">PENDING REVIEWS:</span> <span className="text-amber-400 font-bold">2 Items</span></div>
                  <div><span className="text-[#64748b]">HUMAN OVERRIDES:</span> <span className="text-white">Logged to Ledger</span></div>
                  <div><span className="text-[#64748b]">SYSTEM ESCALATIONS:</span> <span className="text-[#22c55e] font-bold">0 Active in Pilot</span></div>
                </>
              )}
              {currentStage === 6 && (
                <>
                  <div><span className="text-[#64748b]">LEDGER HASH CHAIN:</span> <span className="text-[#22c55e] font-bold">SECURED</span></div>
                  <div><span className="text-[#64748b]">REPORTS AVAILABLE:</span> <span className="text-white">6 Demo Summaries</span></div>
                  <div><span className="text-[#64748b]">VERIFICATION CHECKS:</span> <span className="text-white font-bold">32 Passed</span></div>
                  <div><span className="text-[#64748b]">BLOCK RECORD HASH:</span> <span className="text-[#38bdf8] font-bold">0x8f2d...b9c</span></div>
                </>
              )}
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: GRAPHICS CONTAINER */}
        <div className="flex-1 bg-[#131c2e]/40 border border-[#334155]/60 p-5 rounded-xl flex flex-col justify-center items-center relative overflow-hidden min-h-[300px]">
          
          {/* STAGE 1 GRAPHIC: PROBLEM STATEMENT */}
          {currentStage === 1 && (
            <div className="w-full space-y-4 relative z-10 font-sans text-xs text-center max-w-sm">
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mx-auto mb-4 animate-bounce">
                <ShieldAlert size={24} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">Unverified Action Loop</h3>
              <p className="text-[#94a3b8] leading-relaxed">
                Decisions on multi-million dollar asset replacements are made on static reports without direct visual, spatial, or chronological tracking.
              </p>
            </div>
          )}

          {/* STAGE 2 GRAPHIC: EVIDENCE INGESTION */}
          {currentStage === 2 && (
            <div className="w-full space-y-4 relative z-10 font-mono text-[10px]">
              <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto text-center">
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded flex flex-col items-center">
                  <Image size={16} className="text-[#38bdf8] mb-1" />
                  <span className="text-white">IMG_0031.JPG</span>
                </div>
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded flex flex-col items-center">
                  <Image size={16} className="text-[#38bdf8] mb-1" />
                  <span className="text-white">IMG_0045.JPG</span>
                </div>
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded flex flex-col items-center">
                  <FileText size={16} className="text-amber-500 mb-1" />
                  <span className="text-white">GPS_LOGS</span>
                </div>
              </div>
              <div className="text-center text-[#64748b] text-[9px] max-w-xs mx-auto leading-relaxed font-sans">
                Evidence logs record coordinate coordinates and ingestion times directly from field devices, creating a traceable baseline.
              </div>
            </div>
          )}

          {/* STAGE 3 GRAPHIC: ANALYSIS */}
          {currentStage === 3 && (
            <div className="w-full space-y-4 relative z-10 font-mono text-[9px] max-w-md">
              <div className="flex justify-between items-center px-4">
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded text-center w-[75px]">
                  <Image size={14} className="mx-auto text-[#38bdf8] mb-1" />
                  <span className="text-white">96 Photos</span>
                </div>
                <div className="text-[#64748b] font-bold">&rarr;</div>
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded text-center w-[75px]">
                  <Search size={14} className="mx-auto text-[#38bdf8] mb-1" />
                  <span className="text-white">13 Seq</span>
                </div>
                <div className="text-[#64748b] font-bold">&rarr;</div>
                <div className="bg-[#0b0f19] border border-[#334155] p-2 rounded text-center w-[75px]">
                  <Settings size={14} className="mx-auto text-[#38bdf8] mb-1" />
                  <span className="text-white">8 Assets</span>
                </div>
              </div>
              <div className="text-center text-[#64748b] text-[9px] leading-relaxed font-sans max-w-xs mx-auto">
                Consolidating duplicate traces and matching records to inventory registers prevents duplicate audit records.
              </div>
            </div>
          )}

          {/* STAGE 4 GRAPHIC: HUMAN REVIEW GATE */}
          {currentStage === 4 && (
            <div className="w-full space-y-4 relative z-10 font-mono text-[9px]">
              <div className="max-w-xs mx-auto flex flex-col gap-2">
                <div className="flex items-center justify-between border border-[#334155] bg-[#0b0f19] px-3 py-1.5 rounded">
                  <span className="text-[#94a3b8]">Chiller 02 Nameplate OCR</span>
                  <span className="badge badge-amber">64% CONFIDENCE</span>
                </div>
                <div className="flex items-center justify-between border border-[#334155] bg-[#0b0f19] px-3 py-1.5 rounded">
                  <span className="text-[#94a3b8]">Pump 02 Moisture Pattern</span>
                  <span className="badge badge-amber">72% CONFIDENCE</span>
                </div>
              </div>
              <p className="text-center text-[#94a3b8] text-[9px] font-sans max-w-xs mx-auto">
                Decisions violating confidence thresholds are blocked from automatic output and sent to human operators.
              </p>
            </div>
          )}

          {/* STAGE 5 GRAPHIC: OPERATIONAL DECISION */}
          {currentStage === 5 && (
            <div className="w-full space-y-4 relative z-10 font-sans text-xs max-w-md">
              <div className="border border-[#334155] bg-[#0b0f19] p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-[#334155]/40 font-mono text-[10px]">
                  <span className="text-white font-bold">RE-LOG: CH-0915-B</span>
                  <span className="text-[#64748b]">OCR CORRECTION</span>
                </div>
                <div className="flex justify-center gap-2">
                  <span className="badge badge-green">APPROVE</span>
                  <span className="badge badge-blue">CORRECT</span>
                  <span className="badge badge-amber">ESCALATE</span>
                  <span className="badge badge-red">DEFER</span>
                </div>
                <p className="text-[10px] text-[#94a3b8] text-center">
                  Operators use physical photographs to resolve OCR text gaps and verify water seepage context.
                </p>
              </div>
            </div>
          )}

          {/* STAGE 6 GRAPHIC: DEFENSIBLE PROOF */}
          {currentStage === 6 && (
            <div className="w-full space-y-4 relative z-10 font-sans text-xs text-center max-w-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-500/10 flex items-center justify-center text-[#22c55e] mx-auto mb-4">
                <FileCheck size={24} />
              </div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Chained Decision Package</h3>
              <p className="text-[#94a3b8] leading-relaxed text-[10px]">
                Recommendations are bound in a secure cryptographic hash chain, allowing any regulator to trace decisions back to photographs.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* FOOTER ACTIONS AND STEPS */}
      <div className="flex justify-between items-center shrink-0 pt-3 border-t border-[#334155]/60 font-mono text-xs">
        <button
          onClick={handlePrev}
          disabled={currentStage === 1}
          className={`px-4 py-2 border rounded-lg font-semibold transition ${
            currentStage === 1 
              ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
              : 'border-[#334155] text-[#94a3b8] hover:border-[#64748b]'
          }`}
        >
          &larr; Back
        </button>

        <div className="text-[10px] text-[#64748b] hidden sm:block">
          DEMONSTRATION SIMULATOR
        </div>

        <button
          onClick={handleNext}
          className="bg-[#0284c7] hover:bg-[#38bdf8] text-white px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-1.5 shadow-md"
        >
          <span>{currentStage === totalStages ? "Explore Dashboard" : "Continue"}</span>
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}

// Simple internal icon for placeholder graphics
function FileCheck({ size, className }) {
  return <ShieldCheck size={size} className={className} />;
}
