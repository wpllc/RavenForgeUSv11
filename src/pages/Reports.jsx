import React, { useState, useEffect, useRef } from 'react';
import { BookOpen, FileText, Download, Eye, X, AlertCircle } from 'lucide-react';
import { reportsList, projectSummary } from '../data/demoData';

export default function Reports() {
  const [previewReportId, setPreviewReportId] = useState(null);
  const closeButtonRef = useRef(null);
  const triggerRef = useRef(null);

  const handleDownload = (report) => {
    const text = getMockReportContent(report.id);
    const blob = new Blob([text], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `RavenForge_Building_A_${report.name.replace(/\s+/g, '_')}_Report.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const activePreviewReport = reportsList.find(r => r.id === previewReportId);

  // Handle modal backdrop clicks, Escape key, scroll locking, and focus restoration
  useEffect(() => {
    if (previewReportId) {
      document.body.style.overflow = 'hidden';
      // Delay focus slightly to ensure DOM is rendered
      setTimeout(() => {
        closeButtonRef.current?.focus();
      }, 50);
    } else {
      document.body.style.overflow = '';
      if (triggerRef.current) {
        triggerRef.current.focus();
      }
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && previewReportId) {
        setPreviewReportId(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [previewReportId]);

  // Generate simulated mock contents for report previews
  const getMockReportContent = (reportId) => {
    switch (reportId) {
      case 'REP-001':
        return `==========================================================
RAVENFORGE SYSTEMS - EXECUTIVE SUMMARY REPORT (SIMULATED)
==========================================================
REPORT TITLE: Executive Condition Summary
ASSESSMENT NAME: Building A Pilot Condition Assessment
RECORD DATE: July 12, 2026
INTENDED AUDIENCE: Facilities Managers, Compliance Officers
SOURCE EVIDENCE: Mapped to 96 ingested field photographs (SEQ-001 through SEQ-013)
SIMULATED NOTICE: This is a simulated demonstration report. All data, counts, locations, and costs are synthetic. No physical certifications or compliance claims are implied.
----------------------------------------------------------
TOTAL IDENTIFIED ASSETS: 8 Unique Units
HEALTH INTEGRITY SUMMARY:
- 5 Assets in Good/Fair condition (Routine monitoring)
- 2 Assets flagged with structural anomalies (Action Required)
- 1 Asset in Critical failure (Coolant leak active)

CAPITAL EXPENDITURE ESTIMATE (SIMULATED MOCK):
- Priority 1 (Immediate replacements): $12,500
- Priority 2 (12-24 month lifecycle):  $24,000
- Priority 3 (Routine Maintenance):     $6,400

VERIFICATION METRIC: 32/32 Simulated Policy Rules Checked
QC OVERRIDES LOGGED: 2 manual entries signed off in active session
==========================================================`;
      case 'REP-002':
        return `==========================================================
RAVENFORGE SYSTEMS - ASSET REGISTER LEDGER (SIMULATED)
==========================================================
REPORT TITLE: Asset Registry Inventory Ledger
ASSESSMENT NAME: Building A Pilot Condition Assessment
RECORD DATE: July 12, 2026
INTENDED AUDIENCE: Program Managers, Maintenance Planners
SOURCE EVIDENCE: Mapped to 96 ingested field photographs (SEQ-001 through SEQ-013)
SIMULATED NOTICE: This is a simulated demonstration report. All data, counts, locations, and costs are synthetic. No physical certifications or compliance claims are implied.
----------------------------------------------------------
ASSET_ID    NAME       LOCATION                       CONDITION
----------------------------------------------------------
AHU-01      AHU 01     Bldg A, Mech Room 104          Good
AHU-02      AHU 02     Bldg A, Mech Room 104          Poor
PUMP-01     Pump 01    Bldg A, Basement Utility       Fair
PUMP-02     Pump 02    Bldg A, Basement Utility       Critical
CHILLER-01  Chiller 01 Bldg B, Rooftop Deck           Good
CHILLER-02  Chiller 02 Bldg B, Rooftop Deck           Fair
FIRE-EXT-01 Ext 01     Bldg B, Corridor 201           Critical
FIRE-EXT-02 Ext 02     Bldg B, Lobby Entrance         Good

* Simulated ledger entries bound with synthetic audit trail records.
==========================================================`;
      case 'REP-003':
        return `==========================================================
RAVENFORGE SYSTEMS - PRIORITY FINDINGS DRILLDOWN (SIMULATED)
==========================================================
REPORT TITLE: Critical and Poor Condition Findings Drilldown
ASSESSMENT NAME: Building A Pilot Condition Assessment
RECORD DATE: July 12, 2026
INTENDED AUDIENCE: Risk Management Officers, Engineering Teams
SOURCE EVIDENCE: Mapped to 96 ingested field photographs (SEQ-001 through SEQ-013)
SIMULATED NOTICE: This is a simulated demonstration report. All data, counts, locations, and costs are synthetic. No physical certifications or compliance claims are implied.
----------------------------------------------------------
FINDING ID: FIND-001
ASSET: AHU 02
LOCATION: Building A, Mechanical Room 104
SEVERITY: Action Required
RECOMMENDATION: Schedule physical re-check & cabinet seal replacement.
----------------------------------------------------------
FINDING ID: FIND-002
ASSET: Pump 02
LOCATION: Building A, Basement Utility Room
SEVERITY: Critical (Coolant Leaks & Hotspots)
RECOMMENDATION: Dispatch maintenance immediately to engage backup loop.
----------------------------------------------------------
FINDING ID: FIND-003
ASSET: Fire Extinguisher 01
LOCATION: Building B, Corridor 201
SEVERITY: Action Required (Expired Inspection Tag)
RECOMMENDATION: Re-tag & re-charge pressure cylinder immediately.
==========================================================`;
      default:
        return `==========================================================
RAVENFORGE SYSTEMS - MOCK COMPLIANCE PACKAGE
==========================================================
REPORT TITLE: Simulated Verification Records Checklist
ASSESSMENT NAME: Building A Pilot Condition Assessment
RECORD DATE: July 12, 2026
INTENDED AUDIENCE: Compliance Officers, Auditors
SOURCE EVIDENCE: Mapped to 96 ingested field photographs (SEQ-001 through SEQ-013)
SIMULATED NOTICE: This is a simulated demonstration report. All data, counts, locations, and costs are synthetic. No physical certifications or compliance claims are implied.
----------------------------------------------------------
SYSTEM STATUS: Nominally Validated (Simulated Run)
EVIDENCE TRACEABILITY: Verified (Synthetic Check)
AUDIT REGISTER CHAIN: 0x8f2d512bd4588b9c... (Mock Hash)
==========================================================`;
    }
  };

  const handleOpenPreview = (reportId, e) => {
    triggerRef.current = e.currentTarget;
    setPreviewReportId(reportId);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <BookOpen size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Reports
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Generated condition registers, summaries, and compliance reports available for review.
            </p>
          </div>
          <div>
            <span className="badge badge-gray" style={{ fontWeight: 'bold' }}>
              Reports: {reportsList.length}
            </span>
          </div>
        </div>
      </section>

      {/* COMPLIANCE DISCLOSURE */}
      <section className="card" style={{ borderLeft: '4px solid var(--color-amber)', background: 'var(--bg-secondary)', padding: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={16} className="text-[#f59e0b]" aria-hidden="true" />
          Demonstration Output Deliverables
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          The outputs listed below are mock files compiled from the sandbox dataset. Click <strong>Preview</strong> to view the records inline, or click <strong>Download TXT</strong> to save the simulated report files directly to your device.
        </p>
      </section>

      {/* REPORTS LIST (CARDS) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {reportsList.map((report) => (
          <div 
            key={report.id} 
            className="card"
            style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              justifyContent: 'space-between',
              gap: '16px'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                <span>{report.id}</span>
                <span>AUDIENCE: {report.audience}</span>
              </div>
              
              <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <FileText size={16} className="text-[#38bdf8]" aria-hidden="true" />
                {report.name}
              </h3>
              
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {report.description}
              </p>
            </div>

            {/* Actions Panel */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid var(--border-color)', paddingTop: '12px', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>COMPILED: {report.lastGenerated}</span>
              
              <div style={{ display: 'flex', gap: '8px' }}>
                <button 
                  onClick={(e) => handleOpenPreview(report.id, e)}
                  className="btn btn-secondary text-xs"
                  style={{ padding: '6px 12px' }}
                >
                  <Eye size={12} style={{ marginRight: '4px' }} />
                  <span>Preview</span>
                </button>
                
                <button 
                  onClick={() => handleDownload(report)}
                  className="btn text-xs"
                  style={{ padding: '6px 12px' }}
                  aria-label={`Download ${report.name} as text file`}
                >
                  <Download size={12} style={{ marginRight: '4px' }} />
                  <span>Download TXT</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* MOCK PREVIEW MODAL */}
      {previewReportId && activePreviewReport && (
        <div 
          className="fixed inset-0 flex items-center justify-center p-4 z-[9999]"
          style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0, 0, 0, 0.75)', backdropFilter: 'blur(3px)', zIndex: 1000 }}
          onClick={() => setPreviewReportId(null)}
        >
          <div 
            className="card"
            style={{ 
              backgroundColor: 'var(--bg-secondary)', 
              border: '1px solid var(--border-color)', 
              width: '100%', 
              maxWidth: '640px', 
              borderRadius: '8px', 
              display: 'flex', 
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`Preview of ${activePreviewReport.name}`}
          >
            
            {/* Modal Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', padding: '16px 20px', borderBottom: '1px solid var(--border-color)' }}>
              <div>
                <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={16} className="text-[#38bdf8]" aria-hidden="true" />
                  Preview: {activePreviewReport.name}
                </h3>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                  {activePreviewReport.id} // Demonstration Sample
                </span>
              </div>
              <button 
                ref={closeButtonRef}
                onClick={() => setPreviewReportId(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', padding: '4px' }}
                aria-label="Close report preview"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div style={{ padding: '20px', overflowY: 'auto', maxHeight: '350px' }}>
              <pre className="raw-json-block" style={{ margin: 0, fontSize: '11px', whiteSpace: 'pre-wrap', fontFamily: 'var(--font-mono)', border: '1px solid var(--border-color)' }}>
                {getMockReportContent(activePreviewReport.id)}
              </pre>
            </div>

            {/* Modal Footer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', padding: '12px 20px', borderTop: '1px solid var(--border-color)', fontSize: '11px', color: 'var(--text-muted)' }}>
              <span>Simulated reporting output for audit validation.</span>
              <button 
                onClick={() => setPreviewReportId(null)}
                className="btn btn-secondary text-xs"
                style={{ padding: '6px 12px' }}
              >
                Close Preview
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
