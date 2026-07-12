import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, MapPin, Database, Award } from 'lucide-react';
import { findingsList, projectSummary } from '../data/demoData';

export default function Findings() {
  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <AlertTriangle size={20} className="text-amber-500" />
            Priority Findings Registry
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Condition findings flagged by evaluation models and verified by operator checks.
          </p>
        </div>
        <div className="bg-[#131c2e] border border-[#334155] rounded-md px-3 py-1 text-xs text-[#94a3b8] font-mono">
          Priority Findings: <span className="text-white font-bold">{projectSummary.priorityFindings}</span>
        </div>
      </div>

      {/* EXECUTIVE SUMMARY */}
      <section className="card bg-[#131c2e]/40 border-[#334155]/50 flex flex-col md:flex-row gap-6 justify-between items-start md:items-center">
        <div className="space-y-1">
          <h2 className="text-sm font-bold text-white uppercase tracking-wider font-mono">Actionable Risk Profile</h2>
          <p className="text-xs text-[#94a3b8] leading-relaxed max-w-xl font-sans">
            Three priority items require capital planning attention. Visual indicators detail verified physical degradation, allowing you to prioritize budgets based on verified risk.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="bg-[#0b0f19] px-4 py-2 rounded-lg border border-[#334155]/30 text-center font-mono">
            <div className="text-xs text-[#64748b] uppercase">CRITICAL</div>
            <div className="text-lg font-bold text-red-500">1</div>
          </div>
          <div className="bg-[#0b0f19] px-4 py-2 rounded-lg border border-[#334155]/30 text-center font-mono">
            <div className="text-xs text-[#64748b] uppercase">ACTION REQ</div>
            <div className="text-lg font-bold text-amber-500">2</div>
          </div>
        </div>
      </section>

      {/* FINDINGS LIST (CARDS) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {findingsList.map((finding) => {
          const isCritical = finding.severity === 'Critical';
          const Icon = isCritical ? AlertCircle : AlertTriangle;
          
          return (
            <div key={finding.id} className="card bg-[#131c2e]/60 border-[#334155]/60 hover:border-[#38bdf8]/40 transition flex flex-col justify-between">
              <div className="space-y-4">
                {/* Badge Header */}
                <div className="flex justify-between items-center pb-2 border-b border-[#334155]/30">
                  <span className="text-[10px] font-mono text-[#64748b]">{finding.id}</span>
                  <span className={`badge ${isCritical ? 'badge-red' : 'badge-amber'}`}>
                    {finding.severity}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-sm font-bold text-white flex items-start gap-2 leading-snug">
                  <Icon size={16} className={`shrink-0 ${isCritical ? 'text-red-500' : 'text-amber-500'}`} />
                  {finding.title}
                </h3>

                {/* Subdetails */}
                <div className="space-y-1.5 text-xs text-[#94a3b8]">
                  <div className="flex items-center gap-1.5">
                    <Database size={12} className="text-[#64748b]" />
                    <span>Asset: <strong className="text-white font-medium">{finding.asset}</strong></span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MapPin size={12} className="text-[#64748b]" />
                    <span>Location: {finding.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Award size={12} className="text-[#64748b]" />
                    <span>Confidence Score: <strong className="text-white font-mono">{Math.floor(finding.confidence * 100)}%</strong></span>
                  </div>
                </div>

                {/* Recommendation */}
                <div className="p-3 bg-[#0b0f19] rounded-lg border border-[#334155]/30">
                  <span className="text-[10px] font-mono text-[#64748b] block mb-1">DECISION DIRECTIVE</span>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {finding.action}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-4 pt-3 border-t border-[#334155]/30 flex justify-between items-center text-[10px] text-[#64748b] font-mono">
                <span>PHOTOS LINKED: {finding.evidenceCount}</span>
                <span className="text-emerald-400 font-bold uppercase flex items-center gap-0.5">
                  <ShieldCheck size={11} />
                  LEDGER ACTIVE
                </span>
              </div>
            </div>
          );
        })}
      </section>

    </div>
  );
}
