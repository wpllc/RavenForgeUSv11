import React from 'react';
import { Terminal, Shield, Play, HelpCircle, Activity, Award } from 'lucide-react';
import { auditTimelineList, projectSummary } from '../data/demoData';

export default function AuditTrail() {
  return (
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Terminal size={20} className="text-[#22c55e]" />
            Chronological Decision Ledger
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Verifiable, human-readable record of system state transitions, rule evaluations, and manual overrides.
          </p>
        </div>
        <div className="bg-[#131c2e] border border-[#334155] rounded-md px-3 py-1 text-xs text-[#94a3b8] font-mono">
          Ledger Blocks: <span className="text-[#22c55e] font-bold">{auditTimelineList.length}</span>
        </div>
      </div>

      {/* CHRONOLOGICAL TIMELINE */}
      <section className="space-y-4">
        <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-wider px-1">
          Chronological Audit Stream
        </div>

        <div className="relative border-l-2 border-[#334155]/50 pl-6 ml-3 space-y-8">
          {auditTimelineList.map((event, idx) => {
            const isOperator = event.actor.startsWith('QC-');
            
            return (
              <div key={idx} className="relative">
                {/* Bullet node dot */}
                <span className={`absolute -left-[31px] top-1 h-4 w-4 rounded-full border-2 border-[#0b0f19] flex items-center justify-center ${
                  isOperator ? 'bg-amber-500' : 'bg-[#38bdf8]'
                }`} />

                <div className="space-y-2">
                  {/* Timeline Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs">
                    <span className="font-bold text-white text-sm">{event.action}</span>
                    <div className="flex gap-3 text-[10px] text-[#64748b] font-mono">
                      <span>ACTOR: {event.actor}</span>
                      <span>TIME: {event.timestamp}</span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#94a3b8] bg-[#131c2e]/40 p-3 rounded-lg border border-[#334155]/20">
                    <div>
                      <span className="text-[9px] font-mono text-[#64748b] uppercase block mb-0.5">INGESTED TRACES</span>
                      <p className="text-white font-sans">{event.evidence}</p>
                    </div>
                    <div>
                      <span className="text-[9px] font-mono text-[#64748b] uppercase block mb-0.5">SYSTEM DECISION / RESULT</span>
                      <p className="text-[#22c55e] font-semibold">{event.result}</p>
                    </div>
                  </div>

                  {/* Expandable raw machine data */}
                  <details className="expandable-details">
                    <summary>View Decisional Registry Hash</summary>
                    <div className="raw-json-block text-left mt-2">
{`{
  "sequence_index": ${idx},
  "timestamp": "2026-07-12T${event.timestamp}Z",
  "actor_node": "${event.actor}",
  "event_directive": "${event.action.toUpperCase()}",
  "evidence_payload_fingerprint": "0x8f2d512b${idx * 1111}b9c",
  "cryptographic_signatures": {
    "validation_pass": true,
    "block_signature": "SHA256_RSA_MOCK_${event.timestamp.replace(/:/g, '')}"
  }
}`}
                    </div>
                  </details>
                </div>
              </div>
            );
          })}
        </div>
      </section>

    </div>
  );
}
