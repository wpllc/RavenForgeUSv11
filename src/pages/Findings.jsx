import React from 'react';
import { AlertCircle, AlertTriangle, ShieldCheck, MapPin, Database, Award } from 'lucide-react';
import { findingsList, projectSummary } from '../data/demoData';

export default function Findings() {
  const totalFindings = findingsList.length;
  const criticalCount = findingsList.filter(f => f.severity === 'Critical').length;
  const actionRequiredCount = findingsList.filter(f => f.severity === 'Action Required').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <AlertTriangle size={24} className="text-amber-500" aria-hidden="true" />
              Findings Registry
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Condition findings flagged by evaluation models and verified by operator checks.
            </p>
          </div>
          <div>
            <span className="badge badge-gray" style={{ fontWeight: 'bold' }}>
              Total Findings: {totalFindings}
            </span>
          </div>
        </div>
      </section>

      {/* EXECUTIVE SUMMARY */}
      <section className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
        <div>
          <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
            Actionable Risk Profile
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5', maxWidth: '640px' }}>
            Priority items require planning and budgeting attention. Visual indicators detail verified physical degradation, allowing you to prioritize budgets based on verified risk.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 16px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>CRITICAL</span>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-red)', fontFamily: 'var(--font-mono)' }}>{criticalCount}</div>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '8px 16px', textAlign: 'center' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>ACTION REQ</span>
            <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--color-amber)', fontFamily: 'var(--font-mono)' }}>{actionRequiredCount}</div>
          </div>
        </div>
      </section>

      {/* FINDINGS LIST (CARDS) */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
        {findingsList.map((finding) => {
          const isCritical = finding.severity === 'Critical';
          const Icon = isCritical ? AlertCircle : AlertTriangle;
          
          return (
            <div 
              key={finding.id} 
              className="card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {finding.id}
                  </span>
                  <span className={`badge ${isCritical ? 'badge-red' : 'badge-amber'}`}>
                    {finding.severity}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '15px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'flex-start', gap: '8px', lineHeight: '1.4' }}>
                  <Icon size={16} className={isCritical ? 'text-red-500' : 'text-amber-500'} style={{ marginTop: '2px', shrink: 0 }} aria-hidden="true" />
                  {finding.title}
                </h3>

                {/* Metadata details */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Database size={12} style={{ color: 'var(--text-muted)' }} />
                    <span>Asset: <strong style={{ color: '#fff' }}>{finding.asset}</strong></span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                    <span>Location: {finding.location}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Award size={12} style={{ color: 'var(--text-muted)' }} />
                    <span>Confidence Score: <strong style={{ color: '#fff', fontFamily: 'var(--font-mono)' }}>{Math.floor(finding.confidence * 100)}%</strong></span>
                  </div>
                </div>

                {/* Recommendation */}
                <div style={{ padding: '12px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '4px' }}>
                    Recommended Action
                  </span>
                  <p style={{ fontSize: '12px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                    {finding.action}
                  </p>
                </div>
              </div>

              {/* Card Footer */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
                <span>PHOTOS LINKED: {finding.evidenceCount}</span>
                <span style={{ color: 'var(--color-green)', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ShieldCheck size={12} />
                  Recorded in Audit History
                </span>
              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
