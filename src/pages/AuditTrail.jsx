import React from 'react';
import { Terminal, Shield, Play, HelpCircle, Activity, Award, Clock } from 'lucide-react';
import { auditTimelineList, projectSummary } from '../data/demoData';

export default function AuditTrail() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Terminal size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Audit History
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Verifiable, human-readable record of system state transitions, rule evaluations, and manual overrides.
            </p>
          </div>
          <div>
            <span className="badge badge-gray" style={{ fontWeight: 'bold' }}>
              Logs Recorded: {auditTimelineList.length}
            </span>
          </div>
        </div>
      </section>

      {/* CHRONOLOGICAL TIMELINE */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', tracking: '0.05em' }}>
          Chronological Audit Stream
        </div>

        <div style={{ position: 'relative', borderLeft: '2px solid var(--border-color)', paddingLeft: '24px', marginLeft: '12px', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {auditTimelineList.map((event, idx) => {
            const isOperator = event.actor.startsWith('QC-');
            
            return (
              <div key={idx} style={{ position: 'relative' }}>
                {/* Bullet node dot */}
                <span 
                  style={{ 
                    position: 'absolute', 
                    left: '-33px', 
                    top: '4px', 
                    height: '16px', 
                    width: '16px', 
                    borderRadius: '50%', 
                    border: '3px solid var(--bg-primary)', 
                    backgroundColor: isOperator ? 'var(--color-amber)' : 'var(--color-brand-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }} 
                  aria-hidden="true"
                />

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {/* Timeline Header */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontWeight: 600, color: '#fff', fontSize: '15px' }}>{event.action}</span>
                    <div style={{ display: 'flex', gap: '12px', fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      <span>ACTOR: {event.actor}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <Clock size={12} />
                        {event.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Body details */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '12px', fontSize: '13px', background: 'var(--bg-secondary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>INGESTED TRACES</span>
                      <p style={{ color: 'var(--text-secondary)' }}>{event.evidence}</p>
                    </div>
                    <div>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '2px' }}>SYSTEM DECISION / RESULT</span>
                      <p style={{ color: 'var(--color-green)', fontWeight: 600 }}>{event.result}</p>
                    </div>
                  </div>

                  {/* Expandable raw machine data */}
                  <details className="expandable-details" style={{ margin: 0 }}>
                    <summary>View Decision Record</summary>
                    <div className="raw-json-block text-left mt-2">
{`{
  "sequence_index": ${idx},
  "timestamp": "2026-07-12T${event.timestamp}Z",
  "actor_node": "${event.actor}",
  "event_directive": "${event.action.toUpperCase()}",
  "evidence_payload_fingerprint": "0x8f2d512b${idx * 1111}b9c (Simulated fingerprint)",
  "tamper_evident_signatures": {
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
