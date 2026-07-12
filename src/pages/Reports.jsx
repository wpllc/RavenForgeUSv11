import React, { useState } from 'react';
import { BookOpen, FileText, Download, Eye, X, CheckSquare, Sparkles } from 'lucide-react';
import { reportsList, projectSummary } from '../data/demoData';

export default function Reports() {
  const [previewReportId, setPreviewReportId] = useState(null);

  const activePreviewReport = reportsList.find(r => r.id === previewReportId);

  // Generate simulated mock contents for report previews
  const getMockReportContent = (reportId) => {
    switch (reportId) {
      case 'REP-001':
        return `==========================================================
RAVENFORGE SYSTEMS - EXECUTIVE SUMMARY REPORT (SIMULATED)
==========================================================
PROJECT BASELINE: Facility Condition Assessment
TOTAL IDENTIFIED ASSETS: 8 Unique Units
HEALTH INTEGRITY SUMMARY:
- 5 Assets in Good/Fair condition (Routine monitoring)
- 2 Assets flagged with structural anomalies (Action Required)
- 1 Asset in Critical failure (Coolant leak active)

CAPITAL EXPENDITURE ESTIMATE (MOCK):
- Priority 1 (Immediate replacements): $12,500
- Priority 2 (12-24 month lifecycle):  $24,000
- Priority 3 (Routine Maintenance):     $6,400

VERIFICATION METRIC: 32/32 Policy Rules Verified Admissible.
QC OVERRIDES LOGGED: 2 manual entries signed off.
==========================================================`;
      case 'REP-002':
        return `==========================================================
RAVENFORGE SYSTEMS - ASSET REGISTER LEDGER (SIMULATED)
==========================================================
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

* Ledger entries bound with cryptographic parent hash registries.
==========================================================`;
      case 'REP-003':
        return `==========================================================
RAVENFORGE SYSTEMS - PRIORITY FINDINGS DRILLDOWN (SIMULATED)
==========================================================
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
SYSTEM STATUS: Nominally Validated
EVIDENCE TRACEABILITY: Verified
HASH DIGEST CHAIN: 0x8f2d512bd4588b9c...

This document represents simulated data compiled during scenario runs.
==========================================================`;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <BookOpen size={20} className="text-[#38bdf8]" />
            Reports & Output Packages
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Generated summaries, inventory registers, and compliance files available for review.
          </p>
        </div>
        <div className="bg-[#131c2e] border border-[#334155] rounded-md px-3 py-1 text-xs text-[#94a3b8] font-mono">
          Report Types: <span className="text-white font-bold">{reportsList.length}</span>
        </div>
      </div>

      {/* COMPLIANCE DISCLOSURE */}
      <section className="card bg-[#131c2e]/40 border-[#334155]/50 p-4">
        <h2 className="text-xs font-mono font-bold text-amber-500 uppercase tracking-wider mb-1 flex items-center gap-1">
          <Sparkles size={14} className="text-amber-500" />
          Simulated Deliverables Warning
        </h2>
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          The deliverables listed below are generated using simulated pilot data. Click <strong>Preview Sample</strong> to view the text summaries inline. Download links are inactive since no physical files are written to disk.
        </p>
      </section>

      {/* REPORTS LIST (CARDS) */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reportsList.map((report) => (
          <div key={report.id} className="card bg-[#131c2e]/60 border-[#334155]/60 hover:border-[#38bdf8]/40 transition flex flex-col justify-between p-5 space-y-4">
            
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono text-[#64748b]">
                <span>{report.id}</span>
                <span>AUDIENCE: {report.audience}</span>
              </div>
              
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <FileText size={16} className="text-[#38bdf8]" />
                {report.name}
              </h3>
              
              <p className="text-xs text-[#94a3b8] leading-relaxed">
                {report.description}
              </p>
            </div>

            {/* Actions Panel */}
            <div className="flex items-center justify-between pt-3 border-t border-[#334155]/30 flex-wrap gap-2 text-xs font-mono">
              <span className="text-[#64748b] text-[10px]">COMPILED: {report.lastGenerated}</span>
              
              <div className="flex gap-2">
                <button 
                  onClick={() => setPreviewReportId(report.id)}
                  className="btn btn-secondary py-1.5 px-3 text-xs flex items-center gap-1 hover:border-[#38bdf8]"
                >
                  <Eye size={12} />
                  <span>Preview Sample</span>
                </button>
                
                <button 
                  disabled 
                  className="btn bg-[#334155] text-[#64748b] cursor-not-allowed py-1.5 px-3 text-xs flex items-center gap-1"
                  title="No physical file available for download in this demo sandbox."
                >
                  <Download size={12} />
                  <span>Download Inactive</span>
                </button>
              </div>
            </div>

          </div>
        ))}
      </section>

      {/* MOCK PREVIEW MODAL */}
      {previewReportId && activePreviewReport && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-[9999]">
          <div className="bg-[#131c2e] border border-[#334155] w-full max-w-2xl rounded-lg shadow-2xl flex flex-col overflow-hidden">
            
            {/* Modal Header */}
            <div className="bg-[#0b0f19] px-5 py-4 border-b border-[#334155] flex justify-between items-center">
              <div>
                <h3 className="text-sm font-bold text-white flex items-center gap-2">
                  <FileText size={16} className="text-[#38bdf8]" />
                  Preview: {activePreviewReport.name}
                </h3>
                <span className="text-[10px] text-[#64748b] font-mono">{activePreviewReport.id} // Demonstration Sample</span>
              </div>
              <button 
                onClick={() => setPreviewReportId(null)}
                className="text-[#94a3b8] hover:text-white p-1 rounded"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-5 overflow-y-auto max-h-[350px]">
              <pre className="raw-json-block mt-0 font-mono text-xs whitespace-pre-wrap leading-relaxed">
                {getMockReportContent(activePreviewReport.id)}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="bg-[#0b0f19] px-5 py-3 border-t border-[#334155] flex justify-between items-center text-xs font-mono text-[#64748b]">
              <span>* Simulated reporting outputs are for audit review validation.</span>
              <button 
                onClick={() => setPreviewReportId(null)}
                className="btn btn-secondary py-1.5 px-3 text-xs"
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
