import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ArrowRight, Check, AlertTriangle, ShieldCheck, 
  HelpCircle, Eye, FileText, Database, ShieldAlert, Cpu, Layers, RefreshCw
} from 'lucide-react';
import { projectSummary } from '../data/demoData';

export default function GuidedDemo() {
  const navigate = useNavigate();
  const [activePhase, setActivePhase] = useState(1);
  const [internalsExpanded, setInternalsExpanded] = useState(true);

  const phases = [
    { id: 1, label: 'Evidence Intake', status: 'COMPLETED' },
    { id: 2, label: 'Organize and Identify', status: 'COMPLETED' },
    { id: 3, label: 'Evaluate Findings', status: 'COMPLETED' },
    { id: 4, label: 'Governance Review', status: 'AMBER' }, // Requires human review
    { id: 5, label: 'Decision and Proof', status: 'APPROVED' }
  ];

  // 10 internal events linked 1-to-1 with the audit milestones
  const internalEvents = [
    { num: 1, label: 'Evidence received', phase: 1 },
    { num: 2, label: 'Immutable audit ledger initialized', phase: 1 },
    { num: 3, label: 'Original evidence appended', phase: 1 },
    { num: 4, label: 'Evidence normalized and context preserved', phase: 2 },
    { num: 5, label: 'Asset identity and sequence correlation performed', phase: 2 },
    { num: 6, label: 'Findings and boundary rules evaluated', phase: 3 },
    { num: 7, label: 'Confidence and admissibility checked', phase: 3 },
    { num: 8, label: 'Human governance review performed', phase: 4 },
    { num: 9, label: 'Human decision appended to ledger', phase: 4 },
    { num: 10, label: 'Output package or revalidation trigger created', phase: 5 }
  ];

  // Audit rail milestones (recorded/appended language, visible throughout)
  const auditRailMilestones = [
    { id: 1, text: 'Evidence received', phase: 1, mockVal: '96 photos, Available file metadata (Demo Placeholder)' },
    { id: 2, text: 'Evidence appended', phase: 1, mockVal: 'Ledger block 0x8f2d (Demo Placeholder)' },
    { id: 3, text: 'Context recorded', phase: 1, mockVal: 'Inspection metadata aligned (Demo Placeholder)' },
    { id: 4, text: 'Asset candidate recorded', phase: 2, mockVal: '8 unique assets mapped (Demo Placeholder)' },
    { id: 5, text: 'Finding recorded', phase: 3, mockVal: '3 priority condition anomalies (Demo Placeholder)' },
    { id: 6, text: 'Gate result recorded', phase: 3, mockVal: 'Blocked: Chiller OCR at 64% (Demo Placeholder)' },
    { id: 7, text: 'Human review requested', phase: 4, mockVal: 'Escalated item: REV-001 (Demo Placeholder)' },
    { id: 8, text: 'Human decision recorded', phase: 4, mockVal: 'Operator resolved: CH-0915-B (Demo Placeholder)' },
    { id: 9, text: 'Recommendation recorded', phase: 5, mockVal: 'AHU-02 replacement cost estimate recommended (Demo Placeholder)' },
    { id: 10, text: 'Revalidation trigger retained', phase: 5, mockVal: 'Temporal decay watch activated (Demo Placeholder)' }
  ];

  const handleNext = () => {
    if (activePhase < 5) {
      setActivePhase(activePhase + 1);
    } else {
      navigate('/assets');
    }
  };

  const handlePrev = () => {
    if (activePhase > 1) setActivePhase(activePhase - 1);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. COMPACT FIVE-PHASE PROCESS SELECTOR BAR (Primary Navigation) */}
      <nav className="w-full bg-[#131c2e] border border-[#334155]/60 rounded-lg p-2 z-30 shrink-0" aria-label="Demo Phase Selector">
        <div className="flex flex-col sm:flex-row gap-1.5 sm:gap-2 justify-between items-stretch">
          {phases.map((phase) => {
            const isActive = phase.id === activePhase;
            const isCompleted = phase.id < activePhase;
            const isReview = phase.id === 4;
            
            // Custom Phase styles based on logic requirements
            let btnClass = 'text-[#64748b] hover:text-white bg-transparent border-transparent';
            let statusDot = <span className="h-2 w-2 rounded-full bg-[#64748b]" />;
            
            if (isActive) {
              if (isReview) {
                btnClass = 'bg-amber-500/10 border-amber-500 text-amber-500 font-bold';
                statusDot = <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />;
              } else {
                btnClass = 'bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8] font-bold';
                statusDot = <span className="h-2 w-2 rounded-full bg-[#38bdf8]" />;
              }
            } else if (isCompleted) {
              btnClass = 'bg-[#1e293b]/40 border-[#334155]/30 text-[#94a3b8]';
              statusDot = <Check size={12} className="text-[#94a3b8]" />;
            }

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                className={`flex-1 flex items-center justify-center sm:justify-start gap-2.5 py-2 px-3 border rounded-md text-xs transition-all uppercase font-mono tracking-wider ${btnClass}`}
              >
                {statusDot}
                <span className="text-left font-semibold">
                  {phase.id}. {phase.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* 2. TWO COLUMN SYNCHRONIZED DISPLAY PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        
        {/* LEFT COLUMN: OPERATIONAL STATE PANEL (Plain-Language & Action-Oriented) */}
        <section className="lg:col-span-6 card bg-[#131c2e]/40 border-[#334155]/60 flex flex-col justify-between p-5 space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center pb-2 border-b border-[#334155]/30">
              <h2 className="text-sm font-bold text-white uppercase tracking-wider">
                Operational State
              </h2>
              <span className="text-[10px] font-mono text-[#64748b]">HUMAN PORTAL VIEW</span>
            </div>

            {/* Case State */}
            <div className="space-y-1">
              <span className="text-[9px] font-mono text-[#64748b] uppercase block">Current Case State</span>
              <p className="text-sm text-white font-medium">
                {activePhase === 1 && "Ingesting new facility condition evidence package."}
                {activePhase === 2 && "Deduplicating photograph traces into asset sequences."}
                {activePhase === 3 && "Evaluating condition findings and safety parameters."}
                {activePhase === 4 && "Human verification required: Admissibility limits triggered."}
                {activePhase === 5 && "Audit verification completed. Recommendation recorded for planning review."}
              </p>
            </div>

            {/* Active Context */}
            <div className="space-y-1 bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/30">
              <span className="text-[9px] font-mono text-[#64748b] uppercase block mb-1">Evidence & Asset Context</span>
              <div className="text-xs text-[#94a3b8] space-y-1">
                {activePhase === 1 && (
                  <>
                    <div><span className="text-[#64748b]">Evidence Stream:</span> 96 inspection photographs</div>
                    <div><span className="text-[#64748b]">Origin:</span> Field inspection photo set</div>
                  </>
                )}
                {activePhase === 2 && (
                  <>
                    <div><span className="text-[#64748b]">Normalization Target:</span> 96 photos grouped to 13 sequences</div>
                    <div><span className="text-[#64748b]">Asset Resolution:</span> 8 unique physical assets identified</div>
                  </>
                )}
                {activePhase === 3 && (
                  <>
                    <div><span className="text-[#64748b]">Condition Anomaly:</span> Cabinet corrosion identified on AHU-02</div>
                    <div><span className="text-[#64748b]">Evaluation Rule:</span> Operating service-life limits</div>
                  </>
                )}
                {activePhase === 4 && (
                  <>
                    <div><span className="text-[#64748b]">Low-Confidence Item:</span> Chiller 02 Serial OCR at 64%</div>
                    <div><span className="text-[#64748b]">Safety Gate Block:</span> Blocked automatic decision compilation</div>
                  </>
                )}
                {activePhase === 5 && (
                  <>
                    <div><span className="text-[#64748b]">Recorded Finding:</span> AHU-02 mechanical inspection recommended</div>
                    <div><span className="text-[#64748b]">Decision Sign-off:</span> Verified by Operator 1</div>
                  </>
                )}
              </div>
            </div>

            {/* What Changed */}
            <div className="space-y-1 text-xs">
              <span className="text-[9px] font-mono text-[#64748b] uppercase block">What Changed This Phase</span>
              <p className="text-[#94a3b8] leading-relaxed">
                {activePhase === 1 && "Physical records are appended directly to the audit ledger upon entering the system, ensuring complete history. No findings or replacements have been analyzed yet."}
                {activePhase === 2 && "Redundant raw photos are grouped into 13 sequences, deduplicating records. Photos are linked directly to unique assets (such as AHU-01 and Chiller-01) for physical context."}
                {activePhase === 3 && "Asset condition values are evaluated. Anomaly models detect severe cabinet corrosion on AHU-02 and coolant leaks on Pump-02. Automation continues for nominal systems but locks on low-confidence inputs."}
                {activePhase === 4 && "The system halts processing and raises a review task. The operator compares the close-up photos to correct the serial string and verify basement water stains."}
                {activePhase === 5 && (
                  <>
                    The human operator's actions have resolved all active reviews. The replacement cost estimate recommended is ready, and a recommendation recorded for planning review has been appended. A revalidation trigger is set to monitor future evidence, retaining the ability for new field photographs to reopen the evaluation if condition decay is detected.
                  </>
                )}
              </p>
            </div>

            {/* Human Actions & Next States */}
            <div className="grid grid-cols-2 gap-4 pt-2 border-t border-[#334155]/20 text-xs">
              <div>
                <span className="text-[9px] font-mono text-[#64748b] uppercase block mb-1">Human Action Required</span>
                <div className="font-semibold">
                  {activePhase === 1 && <span className="text-[#64748b]">None (System Intake)</span>}
                  {activePhase === 2 && <span className="text-[#64748b]">None (System Sorting)</span>}
                  {activePhase === 3 && <span className="text-[#64748b]">None (System Evaluation)</span>}
                  {activePhase === 4 && <span className="text-amber-500 font-bold">Approve, Correct, Escalate, Defer</span>}
                  {activePhase === 5 && <span className="text-[#22c55e] font-bold">None (Audit Trail Recorded)</span>}
                </div>
              </div>
              <div>
                <span className="text-[9px] font-mono text-[#64748b] uppercase block mb-1">Potential Next States</span>
                <ul className="list-disc list-inside text-[#94a3b8] space-y-0.5 text-[11px]">
                  {activePhase === 1 && (
                    <>
                      <li>Evidence Accepted</li>
                      <li>Intake Rejected</li>
                    </>
                  )}
                  {activePhase === 2 && (
                    <>
                      <li>Inventory Mapped</li>
                      <li>Unidentified Asset</li>
                    </>
                  )}
                  {activePhase === 3 && (
                    <>
                      <li>Admissible Plan</li>
                      <li>Gated / Blocked</li>
                    </>
                  )}
                  {activePhase === 4 && (
                    <>
                      <li>Approved Finding</li>
                      <li>Escalated Field Check</li>
                      <li>Deferred / Dormant Pending New Evidence</li>
                    </>
                  )}
                  {activePhase === 5 && (
                    <>
                      <li>Report Preview Available</li>
                      <li>Reopened by New Field Evidence (Revalidation)</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>

          {/* STATE MAP DECISION NAVIGATOR (Static Context Indicator) */}
          <div className="bg-[#0b0f19] p-4 border border-[#334155]/40 rounded-lg space-y-3 shrink-0">
            <div className="flex justify-between items-center text-[9px] font-mono text-[#64748b]">
              <span>CONTEXT: DECISION STATE MAP</span>
              <span>PROGRESSIVE STATUS</span>
            </div>

            <div className="flex items-center justify-between gap-1 text-[10px] font-mono">
              {/* Previous state */}
              <div className="text-center flex-1 bg-[#131c2e]/60 p-1.5 rounded border border-[#334155]/30 text-[#64748b]">
                <div className="text-[8px] text-[#64748b] uppercase scale-90">PREVIOUS</div>
                <div className="truncate font-semibold mt-0.5">
                  {activePhase === 1 ? 'NONE' : phases[activePhase - 2].label}
                </div>
              </div>

              <div className="text-slate-600 font-bold">&rarr;</div>

              {/* Current state */}
              <div className={`text-center flex-1 p-1.5 rounded border font-bold ${
                activePhase === 4 
                  ? 'bg-amber-500/10 border-amber-500 text-amber-500' 
                  : activePhase === 5
                    ? 'bg-[#22c55e]/15 border-[#22c55e] text-[#22c55e]'
                    : 'bg-[#38bdf8]/10 border-[#38bdf8] text-[#38bdf8]'
              }`}>
                <div className="text-[8px] uppercase scale-90">CURRENT</div>
                <div className="truncate mt-0.5">{phases[activePhase - 1].label}</div>
              </div>

              <div className="text-slate-600 font-bold">&rarr;</div>

              {/* Next states */}
              <div className="text-center flex-1 bg-[#131c2e]/60 p-1.5 rounded border border-[#334155]/30 text-[#94a3b8]">
                <div className="text-[8px] text-[#64748b] uppercase scale-90">NEXT OPTION</div>
                <div className="truncate font-semibold mt-0.5">
                  {activePhase === 5 ? 'REOPEN ON NEW DATA' : activePhase === 3 ? 'GATED REVIEW' : phases[activePhase].label}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT COLUMN: RAVENFORGE INTERNALS PANEL */}
        <section className="lg:col-span-6 flex flex-col justify-between gap-6">
          
          {/* Main Internals Card */}
          <div className="card bg-[#131c2e]/40 border-[#334155]/60 flex-1 flex flex-col justify-between p-5 space-y-4">
            
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-[#334155]/30">
                <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu size={16} className="text-[#38bdf8]" />
                  RavenForge Internals
                </h2>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setInternalsExpanded(!internalsExpanded)}
                    className="lg:hidden text-xs text-[#38bdf8] hover:text-white px-2.5 py-1 rounded border border-[#334155]/50 bg-[#0b0f19]/30"
                  >
                    {internalsExpanded ? 'Collapse' : 'Expand'}
                  </button>
                  <span className="text-[10px] font-mono text-[#64748b] hidden sm:inline">SYSTEM LOGS VIEW</span>
                </div>
              </div>

              {/* Collapsible content wrapper */}
              <div className={internalsExpanded ? 'space-y-4 flex-1 flex flex-col justify-between' : 'hidden lg:flex lg:flex-col lg:justify-between lg:flex-1 lg:space-y-4'}>
                {/* Phase Specific Internals content */}
                <div className="space-y-3 text-xs">
                  <span className="text-[9px] font-mono text-[#64748b] uppercase block">Governed System Activity</span>
                  
                  {activePhase === 1 && (
                    <ul className="space-y-2 list-disc list-inside text-[#94a3b8]">
                      <li>Original evidence file identifiers and sequence keys generated.</li>
                      <li>Audit ledger initialized. No diagnostic recommendations generated yet.</li>
                      <li>Original photographic metadata (Available file metadata, dates) saved.</li>
                      <li>Ledger integrity checklist verified (32/32 rules initialized).</li>
                    </ul>
                  )}
                  {activePhase === 2 && (
                    <ul className="space-y-2 list-disc list-inside text-[#94a3b8]">
                      <li>Photographs evaluated. Visual similarity grouped 96 images to 13 sequences.</li>
                      <li>Asset candidate generated based on sequence-derived or inspector-provided context where present.</li>
                      <li>Mapped 8 unique assets. Duplicate files are linked under parent groups.</li>
                      <li>Audit trail updated with deduplication logs.</li>
                    </ul>
                  )}
                  {activePhase === 3 && (
                    <ul className="space-y-2 list-disc list-inside text-[#94a3b8]">
                      <li>Condition findings generated by local analysis models.</li>
                      <li>Mechanical operating lifetimes checked. Cabinet corrosion logged for AHU-02.</li>
                      <li>Confidence gate triggered. Chiller nameplate serial key confidence falls below 75%.</li>
                      <li>Automatic decision generation is blocked, routing exceptions to queue.</li>
                    </ul>
                  )}
                  {activePhase === 4 && (
                    <ul className="space-y-2 list-disc list-inside text-[#94a3b8]">
                      <li>Admissibility gate exception log created: OCR serial low confidence (64%).</li>
                      <li>Review package assembled, showing close-up photo reference.</li>
                      <li>Operator inputs received: serial corrected to CH-0915-B.</li>
                      <li>Operator's manual sign-off recorded to the decision ledger.</li>
                    </ul>
                  )}
                  {activePhase === 5 && (
                    <ul className="space-y-2 list-disc list-inside text-[#94a3b8]">
                      <li>Recommendations linked to verified physical photographs.</li>
                      <li>Chained decision ledger package completed.</li>
                      <li>Dormant asset branches and revalidation check loops initialized.</li>
                      <li>System transitions back to active monitoring state.</li>
                    </ul>
                  )}
                </div>

                {/* 10-Event Lifecycle Progress (Nested within phases) */}
                <div className="space-y-2 pt-2 border-t border-[#334155]/20">
                  <span className="text-[9px] font-mono text-[#64748b] uppercase block">System Lifecycle Events</span>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 font-mono text-[9px]">
                    {internalEvents.map((evt) => {
                      const isCurrentPhaseEvent = evt.phase === activePhase;
                      const isPassedEvent = evt.phase < activePhase;
                      let textClass = 'text-[#64748b]';
                      let dotColor = 'bg-[#131c2e]';

                      if (isCurrentPhaseEvent) {
                        textClass = 'text-[#38bdf8] font-bold';
                        dotColor = 'bg-[#38bdf8]';
                      } else if (isPassedEvent) {
                        textClass = 'text-[#94a3b8]';
                        dotColor = 'bg-[#334155]';
                      }

                      return (
                        <div key={evt.num} className={`flex items-center gap-1.5 ${textClass}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
                          <span>{evt.num}. {evt.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* EXPANDABLE DETAILS */}
                <div className="pt-2 border-t border-[#334155]/20 shrink-0">
                  <details className="expandable-details" style={{ margin: 0 }}>
                    <summary>View Demonstration Record Details</summary>
                    <div className="raw-json-block text-left mt-2">
{`{
  "phase_id": ${activePhase},
  "phase_label": "${phases[activePhase - 1].label}",
  "validation_tests_run": 32,
  "validation_status": "${activePhase === 4 ? 'GATE_HOLD' : 'PASS'}",
  "demo_ledger_hash": "0x8f2d512b${activePhase * 1010}b9c (Demo Placeholder)",
  "active_revalidation_check": ${activePhase === 5 ? 'true' : 'false'},
  "demo_placeholder_notice": "This is a demonstration mockup record."
}`}
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>

          {/* PERSISTENT AUDIT RAIL CONTAINER */}
          <div className="card bg-[#131c2e]/60 border-[#334155]/60 p-5 space-y-3 shrink-0">
            <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-wider">
              Persistent Audit Rail (Timeline)
            </div>

            {/* Audit Rail responsive wrapping grid */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 font-mono text-[9px]">
              {auditRailMilestones.map((milestone) => {
                const isCurrent = milestone.phase === activePhase;
                const isPassed = milestone.phase < activePhase;
                
                let borderStyle = 'border-[#334155] bg-[#0b0f19] text-[#64748b]';
                if (isCurrent) {
                  borderStyle = 'border-[#38bdf8] bg-[#38bdf8]/10 text-white font-bold';
                } else if (isPassed) {
                  borderStyle = 'border-[#334155] bg-[#1e293b]/30 text-[#94a3b8]';
                }

                return (
                  <div 
                    key={milestone.id} 
                    className={`p-2 rounded border leading-tight flex flex-col justify-between ${borderStyle}`}
                  >
                    <div>
                      <div className="text-[#64748b] uppercase scale-90 origin-left">
                        LOG {milestone.id}
                      </div>
                      <div className="mt-1 font-semibold">{milestone.text}</div>
                    </div>
                    <div className="text-[8px] text-[#64748b] mt-2 font-sans overflow-hidden text-ellipsis whitespace-nowrap">
                      {milestone.mockVal}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div className="text-[8px] text-[#64748b] font-mono">
              * The audit rail demonstrates that all evidence is appended to the ledger before reviews are generated and recorded.
            </div>
          </div>

        </section>

      </div>

      {/* 3. STEP BACK & CONTINUE ACTIONS FOOTER */}
      <div className="flex justify-between items-center pt-4 border-t border-[#334155]/60 font-mono text-xs z-30 shrink-0">
        <button
          onClick={handlePrev}
          disabled={activePhase === 1}
          className={`px-4 py-2 border rounded-lg font-semibold transition ${
            activePhase === 1 
              ? 'border-slate-800 text-slate-600 cursor-not-allowed' 
              : 'border-[#334155] text-[#94a3b8] hover:border-[#64748b]'
          }`}
        >
          &larr; Back
        </button>

        <div className="text-[10px] text-[#64748b]">
          DEMO MODE: SCENARIO VALIDATION
        </div>

        <button
          onClick={handleNext}
          className={`px-5 py-2.5 rounded-lg font-semibold transition flex items-center gap-1.5 shadow-md ${
            activePhase === 5 
              ? 'bg-[#22c55e] text-white hover:bg-emerald-600' 
              : 'bg-[#0284c7] hover:bg-[#38bdf8] text-white'
          }`}
        >
          <span>{activePhase === 5 ? "Go to Assets Dashboard" : "Continue"}</span>
          <ChevronRight size={14} />
        </button>
      </div>

    </div>
  );
}
