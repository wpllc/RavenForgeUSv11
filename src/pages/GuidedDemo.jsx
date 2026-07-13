import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, ArrowRight, Check, AlertTriangle, ShieldCheck, 
  Eye, FileText, Database, ShieldAlert, Cpu, Layers, RefreshCw, ChevronLeft
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
    { id: 4, label: 'Human Review', status: 'AMBER' }, 
    { id: 5, label: 'Decision & Audit', status: 'APPROVED' }
  ];

  // System events synchronized with milestones
  const internalEvents = [
    { num: 1, label: 'Evidence received', phase: 1 },
    { num: 2, label: 'Immutable audit ledger initialized', phase: 1 },
    { num: 3, label: 'Original evidence appended', phase: 1 },
    { num: 4, label: 'Evidence normalized and context preserved', phase: 2 },
    { num: 5, label: 'Asset identity and sequence correlation performed', phase: 2 },
    { num: 6, label: 'Findings and boundary rules evaluated', phase: 3 },
    { num: 7, label: 'Confidence and admissibility checked / Review requested', phase: 3 },
    { num: 8, label: 'Human governance review performed', phase: 4 },
    { num: 9, label: 'Human decision appended to ledger', phase: 4 },
    { num: 10, label: 'Output package or revalidation trigger created', phase: 5 }
  ];

  // Audit milestones with realistic simulated values (no placeholder tags)
  const auditRailMilestones = [
    { id: 1, text: 'Evidence received', phase: 1, val: '96 photos, Simulated EXIF and camera metadata' },
    { id: 2, text: 'Evidence appended', phase: 1, val: 'Simulated Audit Block: 0x8f2d-96a4' },
    { id: 3, text: 'Context recorded', phase: 1, val: 'Simulated time logs: 2026-07-12' },
    { id: 4, text: 'Asset candidate recorded', phase: 2, val: '8 unique simulated asset profiles' },
    { id: 5, text: 'Finding recorded', phase: 3, val: '3 simulated condition anomalies' },
    { id: 6, text: 'Gate result recorded', phase: 3, val: 'Simulated Review Block: Chiller OCR 64%' },
    { id: 7, text: 'Human review requested', phase: 4, val: 'Simulated review task REV-001' },
    { id: 8, text: 'Human decision recorded', phase: 4, val: 'Operator verified simulated serial CH-0915-B' },
    { id: 9, text: 'Recommendation recorded', phase: 5, val: 'Simulated planning recommendation AHU-02' },
    { id: 10, text: 'Revalidation trigger retained', phase: 5, val: 'Simulated decay monitoring activated' }
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

  // Stepper state styles
  const getStepStyle = (stepId) => {
    const isActive = stepId === activePhase;
    const isCompleted = stepId < activePhase;
    
    if (isActive) {
      return {
        background: 'rgba(2, 132, 199, 0.1)',
        borderColor: 'var(--color-brand-light)',
        color: '#fff',
        fontWeight: 'bold'
      };
    }
    if (isCompleted) {
      return {
        background: 'rgba(16, 185, 129, 0.05)',
        borderColor: 'rgba(16, 185, 129, 0.3)',
        color: 'var(--text-secondary)'
      };
    }
    return {
      background: 'var(--bg-secondary)',
      borderColor: 'var(--border-color)',
      color: 'var(--text-muted)'
    };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
          <Activity size={24} className="text-[#38bdf8]" aria-hidden="true" />
          Product Tour
        </h1>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
          Follow this guided tour to trace how RavenForge handles data ingestion, processes checks, gates anomalies, and locks in audited decisions.
        </p>
      </section>

      {/* A. REDESIGNED STEPPER PROCESS BAR */}
      <nav aria-label="Product Tour Stepper">
        <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '4px' }} className="desktop-nav-ribbon">
          {phases.map((phase) => {
            const isActive = phase.id === activePhase;
            const isCompleted = phase.id < activePhase;
            const stepStyles = getStepStyle(phase.id);

            return (
              <button
                key={phase.id}
                onClick={() => setActivePhase(phase.id)}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '12px 16px',
                  border: '1px solid',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.15s ease',
                  fontSize: '13px',
                  ...stepStyles
                }}
                aria-current={isActive ? 'step' : undefined}
              >
                <div style={{ 
                  width: '24px', 
                  height: '24px', 
                  borderRadius: '50%', 
                  background: isCompleted ? 'var(--color-green)' : isActive ? 'var(--color-brand)' : 'var(--border-color)',
                  color: '#fff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '11px',
                  fontWeight: 'bold',
                  flexShrink: 0
                }}>
                  {isCompleted ? <Check size={14} /> : phase.id}
                </div>
                <span style={{ whiteSpace: 'nowrap' }}>{phase.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* B. TWO COLUMN SYNCHRONIZED DISPLAY PANEL */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'stretch' }}>
        
        {/* LEFT COLUMN: OPERATIONAL STATE PANEL (User-Centered) */}
        <section className="card" style={{ display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', gap: '20px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
                Operational State
              </h2>
              <span className="badge badge-gray">HUMAN WORKFLOW</span>
            </div>

            {/* WHAT IS HAPPENING */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>What is happening?</span>
              <p style={{ fontSize: '14px', color: '#fff', fontWeight: 500, lineHeight: '1.4' }}>
                {activePhase === 1 && "RavenForge received 96 field photographs and location logs from a pilot facility assessment."}
                {activePhase === 2 && "The system aggregates raw visual observations into consolidated photo sequences and links them to unique assets."}
                {activePhase === 3 && "RavenForge checks asset condition parameters against safety codes and service-life limits."}
                {activePhase === 4 && "The system blocks automatic decision signing because an OCR nameplate reading falls below safety confidence limits."}
                {activePhase === 5 && "All anomalies have been resolved by the operator. Final recommendations are locked to the ledger and decay tracking is initialized."}
              </p>
            </div>

            {/* WHY IT MATTERS */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Why does it matter?</span>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {activePhase === 1 && "Recording raw data immediately to the tamper-evident history register creates an audited chain of custody, ensuring all downstream decisions can be traced back to original evidence."}
                {activePhase === 2 && "Deduplicating overlapping photos prevents registry clutter and compiles a single source of truth for each mechanical asset, mapping physical photographs directly to inventory IDs."}
                {activePhase === 3 && "Automated checks instantly separate compliant assets from priority issues (like AHU cabinet rust or pressure warnings), focusing engineer attention where it is needed."}
                {activePhase === 4 && "Human validation overrides prevent automated models from writing incorrect entries (such as mismatched serial numbers) to the permanent facility record."}
                {activePhase === 5 && "Decisions are recorded and traceable. The system monitors asset ages and condition data dynamically, ready to trigger a revalidation request when new photographs are uploaded."}
              </p>
            </div>

            {/* WHAT SHOULD HAPPEN NEXT */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', background: 'rgba(2, 132, 199, 0.05)', padding: '12px', borderRadius: '6px', border: '1px solid rgba(2, 132, 199, 0.2)' }}>
              <span style={{ fontSize: '10px', color: 'var(--color-brand-light)', fontWeight: 'bold', textTransform: 'uppercase' }}>What happens next?</span>
              <p style={{ fontSize: '13px', color: '#fff', lineHeight: '1.4' }}>
                {activePhase === 1 && "Continue to Step 2 to see how redundant raw images are grouped into organized sequences."}
                {activePhase === 2 && "Continue to Step 3 to see how safety policy rules are evaluated."}
                {activePhase === 3 && "Continue to Step 4 to examine the human exception review console."}
                {activePhase === 4 && "Continue to Step 5 to review the compiled audit records."}
                {activePhase === 5 && "Finish the tour to explore the live Assets registry and active reviews."}
              </p>
            </div>

            {/* Simulated Evidence Image / Representative Visual Card */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', background: 'var(--bg-primary)', padding: '16px', borderRadius: '6px', border: '1px solid var(--border-color)', textAlign: 'center', alignItems: 'center' }}>
              {activePhase === 1 && (
                <>
                  <Database size={28} style={{ color: 'var(--color-brand-light)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Simulated Ingest: 96 Photos</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Registered in Ingest Ledger</span>
                </>
              )}
              {activePhase === 2 && (
                <>
                  <Layers size={28} style={{ color: 'var(--color-brand-light)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>Traces Deduplicated: 13 Sequences</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Mapped to 8 Unique Assets</span>
                </>
              )}
              {activePhase === 3 && (
                <>
                  <AlertTriangle size={28} style={{ color: 'var(--color-amber)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#fff' }}>3 Condition Anomalies Flagged</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Admissibility Checks: Active</span>
                </>
              )}
              {activePhase === 4 && (
                <>
                  <Cpu size={28} style={{ color: 'var(--color-amber)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-amber)' }}>Gate Hold: Low Confidence OCR</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Chiller 02 Serial Key at 64%</span>
                </>
              )}
              {activePhase === 5 && (
                <>
                  <ShieldCheck size={28} style={{ color: 'var(--color-green)', marginBottom: '4px' }} />
                  <span style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-green)' }}>Tamper-Evident Ledger Updated</span>
                  <span style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>Decisions Recorded & Locked</span>
                </>
              )}
              <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>[ Simulated Demonstration Evidence ]</span>
            </div>

            {/* Static Decision Context Indicator (Technical details) */}
            <details className="expandable-details" style={{ margin: 0 }}>
              <summary>View Technical State Details</summary>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '12px', marginTop: '12px' }}>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Active State Route</span>
                  <span style={{ color: '#fff', fontWeight: 600 }}>{phases[activePhase - 1].label}</span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Human Actions Available</span>
                  <span style={{ color: 'var(--color-brand-light)' }}>
                    {activePhase === 4 ? "Approve, Correct, Escalate, Defer" : "Read-only"}
                  </span>
                </div>
                <div>
                  <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>Next State Path</span>
                  <span style={{ color: 'var(--text-secondary)' }}>
                    {activePhase === 5 ? "Reopened by New Evidence" : phases[activePhase].label}
                  </span>
                </div>
              </div>
            </details>
          </div>
        </section>

        {/* RIGHT COLUMN: SYSTEM INTERNALS PANEL */}
        <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Main Internals Card */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', justifySelf: 'stretch', justifyContent: 'space-between', gap: '16px', flex: 1 }}>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Cpu size={16} className="text-[#38bdf8]" aria-hidden="true" />
                  System Internals
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button 
                    onClick={() => setInternalsExpanded(!internalsExpanded)}
                    className="btn btn-secondary text-xs"
                    style={{ padding: '4px 8px' }}
                  >
                    {internalsExpanded ? 'Collapse Logs' : 'Expand Logs'}
                  </button>
                </div>
              </div>

              {/* Collapsible log view content */}
              {internalsExpanded && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '6px' }}>
                      Governed System Activity
                    </span>
                    <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      {activePhase === 1 && (
                        <>
                          <li>• Ingested 96 raw visual frames into sandbox database storage.</li>
                          <li>• Generated evidence identifiers and time sequence index keys.</li>
                          <li>• Initialized ledger record with active evaluation safety rules.</li>
                        </>
                      )}
                      {activePhase === 2 && (
                        <>
                          <li>• Grouped 96 images into 13 coherent sequences using GPS and timestamps.</li>
                          <li>• Mapped candidate sequences to 8 unique physical mechanical assets.</li>
                          <li>• Linked overlapping photographs under single asset records.</li>
                        </>
                      )}
                      {activePhase === 3 && (
                        <>
                          <li>• Checked conditions against safety codes and design lifetime intervals.</li>
                          <li>• Identified cabinet oxidation on AHU-02 and active moisture stains on Pump-02.</li>
                          <li>• Blocked automatic compilation due to chiller OCR falling below 75% threshold.</li>
                        </>
                      )}
                      {activePhase === 4 && (
                        <>
                          <li>• Created manual verification request package for Chiller 02 OCR exception.</li>
                          <li>• Displayed photo details and serial keys to operator console.</li>
                          <li>• Logged operator decision overrides and notes to the audit history.</li>
                        </>
                      )}
                      {activePhase === 5 && (
                        <>
                          <li>• Linked approved operator recommendations to physical visual evidence.</li>
                          <li>• Compiled tamper-evident audit record ledger.</li>
                          <li>• Configured active revalidation decay tracking loops for ongoing monitoring.</li>
                        </>
                      )}
                    </ul>
                  </div>

                  {/* 10-Event Lifecycle Progress (Logical progress indicator) */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                      System Lifecycle Events
                    </span>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '6px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
                      {internalEvents.map((evt) => {
                        const isCurrentPhaseEvent = evt.phase === activePhase;
                        const isPassedEvent = evt.phase < activePhase;
                        let textClass = 'var(--text-muted)';
                        let dotColor = 'var(--border-color)';

                        if (isCurrentPhaseEvent) {
                          textClass = 'var(--color-brand-light)';
                          dotColor = 'var(--color-brand-light)';
                        } else if (isPassedEvent) {
                          textClass = 'var(--text-secondary)';
                          dotColor = 'var(--color-green)';
                        }

                        return (
                          <div key={evt.num} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: textClass }}>
                            <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: dotColor }} />
                            <span>{evt.num}. {evt.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Disclosure preview */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                    <details className="expandable-details" style={{ margin: 0 }}>
                      <summary>View Technical Details</summary>
                      <div className="raw-json-block text-left mt-2">
{`{
  "phase_id": ${activePhase},
  "phase_label": "${phases[activePhase - 1].label}",
  "validation_rules_checked": 32,
  "validation_status": "${activePhase === 4 ? 'REVIEW_REQUIRED' : 'PASSED'}",
  "audit_ledger_stamp": "0x8f2d512b${activePhase * 1010}b9c",
  "active_revalidation_check": ${activePhase === 5 ? 'true' : 'false'},
  "validation_notice": "Simulated evaluation run for validation sandbox."
}`}
                      </div>
                    </details>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* PERSISTENT AUDIT RAIL CONTAINER */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', tracking: '0.05em' }}>
              Persistent Audit Rail (Timeline)
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)' }}>
              {auditRailMilestones.map((milestone) => {
                const isCurrent = milestone.phase === activePhase;
                const isPassed = milestone.phase < activePhase;
                
                let borderStyle = '1px solid var(--border-color)';
                let bgStyle = 'var(--bg-primary)';
                let colorStyle = 'var(--text-muted)';
                
                if (isCurrent) {
                  borderStyle = '1px solid var(--color-brand-light)';
                  bgStyle = 'rgba(2, 132, 199, 0.05)';
                  colorStyle = '#fff';
                } else if (isPassed) {
                  borderStyle = '1px solid rgba(16, 185, 129, 0.2)';
                  bgStyle = 'rgba(16, 185, 129, 0.03)';
                  colorStyle = 'var(--text-secondary)';
                }

                return (
                  <div 
                    key={milestone.id} 
                    style={{ 
                      padding: '8px', 
                      borderRadius: '6px', 
                      border: borderStyle,
                      background: bgStyle,
                      color: colorStyle,
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '4px',
                      justifyContent: 'space-between',
                      height: '80px'
                    }}
                  >
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)' }}>LOG 0{milestone.id}</div>
                      <div style={{ fontWeight: 'bold', marginTop: '2px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{milestone.text}</div>
                    </div>
                    <div style={{ fontSize: '8px', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {milestone.val}
                    </div>
                  </div>
                );
              })}
            </div>
            
            <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
              * The audit rail records each milestone in history before recommendations are locked.
            </div>
          </div>

        </section>

      </div>

      {/* C. REDESIGNED STEP FOOTER CONTROLS */}
      <footer className="card" style={{ padding: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
        <button
          onClick={handlePrev}
          disabled={activePhase === 1}
          className="btn btn-secondary text-xs font-bold"
          style={{ 
            padding: '10px 20px', 
            cursor: activePhase === 1 ? 'not-allowed' : 'pointer',
            opacity: activePhase === 1 ? 0.4 : 1
          }}
        >
          <ChevronLeft size={16} style={{ marginRight: '6px' }} />
          Previous: {activePhase === 1 ? 'None' : phases[activePhase - 2].label}
        </button>

        <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: 500, fontFamily: 'var(--font-mono)' }}>
          Step {activePhase} of 5
        </div>

        <button
          onClick={handleNext}
          className={`btn ${activePhase === 5 ? 'btn-green' : ''}`}
          style={{ padding: '10px 20px', fontSize: '12px', fontWeight: 'bold' }}
        >
          <span>{activePhase === 5 ? "Finish Product Tour" : `Continue to ${phases[activePhase].label}`}</span>
          <ChevronRight size={16} style={{ marginLeft: '6px' }} />
        </button>
      </footer>

    </div>
  );
}
