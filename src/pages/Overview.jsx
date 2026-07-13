import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  UploadCloud, 
  Cpu, 
  UserCheck, 
  ShieldCheck, 
  AlertTriangle, 
  FileText, 
  Clock, 
  Database,
  CheckCircle,
  Eye
} from 'lucide-react';
import { 
  projectSummary, 
  assetsList, 
  reviewQueueList, 
  auditTimelineList, 
  evidenceLedger 
} from '../data/demoData';
import { 
  getPendingReviewCount, 
  getPriorityAssets, 
  getConditionDistribution, 
  getAssessmentStatus, 
  getRecentActivity 
} from '../data/selectors';

export default function Overview() {
  const navigate = useNavigate();

  // Dynamic calculations
  const pendingReviews = getPendingReviewCount();
  const priorityAssets = getPriorityAssets();
  const conditionDist = getConditionDistribution();
  const statusInfo = getAssessmentStatus();
  const recentActivities = getRecentActivity().slice(0, 5); // 5 most recent

  // Constants
  const totalEvidence = evidenceLedger.length;
  const totalSequences = projectSummary.photoSequences;
  const totalAssetsCount = assetsList.length;
  const priorityAssetsCount = assetsList.filter(a => a.priority === 'Critical' || a.priority === 'High' || a.priority === 'Action Required').length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* A. ASSESSMENT HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <span style={{ fontSize: '11px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Active Assessment Record
            </span>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', marginTop: '4px', marginBottom: '4px' }}>
              Building A Pilot Condition Assessment
            </h1>
            <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <span>Database: <strong>Sandbox dataset</strong></span>
              <span>Pipeline: <strong style={{ color: 'var(--color-green)' }}>Processing complete</strong></span>
              <span>Last evaluated: <strong>{projectSummary.lastUpdated}</strong></span>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '4px', padding: '12px 16px', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px' }}>
            <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
              Decision Status
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span className={`badge ${statusInfo.severity === 'red' ? 'badge-red' : statusInfo.severity === 'amber' ? 'badge-amber' : 'badge-green'}`}>
                {statusInfo.label}
              </span>
            </div>
            <span style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {statusInfo.description}
            </span>
          </div>
        </div>
      </section>

      {/* B. SUMMARY METRICS ROW */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <button 
          onClick={() => navigate('/evidence')} 
          className="card" 
          style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', transition: 'border-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-brand-light)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>{totalEvidence}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Evidence Records</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Raw Field Photos Ingested</div>
        </button>

        <div className="card">
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>{totalSequences}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Photo Sequences</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Temporal/Spatial Clusters</div>
        </div>

        <button 
          onClick={() => navigate('/assets')} 
          className="card" 
          style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', transition: 'border-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-brand-light)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>{totalAssetsCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Unique Assets</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Identified & Cataloged</div>
        </button>

        <div className="card">
          <div style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-red)', fontFamily: 'var(--font-mono)' }}>{priorityAssetsCount}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Priority Assets</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Critical or Poor Condition</div>
        </div>

        <button 
          onClick={() => navigate('/review-queue')} 
          className="card" 
          style={{ cursor: 'pointer', textAlign: 'left', border: '1px solid var(--border-color)', background: 'var(--bg-secondary)', transition: 'border-color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--color-brand-light)'}
          onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
        >
          <div style={{ fontSize: '28px', fontWeight: 600, color: pendingReviews > 0 ? 'var(--color-amber)' : '#fff', fontFamily: 'var(--font-mono)' }}>{pendingReviews}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Pending Reviews</div>
          <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>Awaiting Operator Action</div>
        </button>
      </section>

      {/* C. PRIORITY ATTENTION PANEL & CONDITION DISTRIBUTION */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left: What Needs Attention */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>What Needs Attention</h2>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>PRIORITY SORT</span>
            </div>
            
            <div className="table-container" style={{ border: 'none', background: 'transparent' }}>
              <table className="governance-table" style={{ fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>Asset</th>
                    <th>Condition</th>
                    <th>Confidence</th>
                    <th style={{ textAlign: 'right' }}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {priorityAssets.slice(0, 3).map(asset => {
                    const isCritical = asset.condition === 'Critical';
                    const isPoor = asset.condition === 'Poor';
                    return (
                      <tr key={asset.id}>
                        <td style={{ fontWeight: '600', color: '#fff' }}>
                          {asset.name}
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', fontWeight: 'normal' }}>
                            {asset.location}
                          </span>
                        </td>
                        <td>
                          <span className={`badge ${isCritical ? 'badge-red' : isPoor ? 'badge-amber' : 'badge-green'}`}>
                            {asset.condition}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)' }}>
                          {Math.floor(asset.confidence * 100)}%
                        </td>
                        <td style={{ textAlign: 'right' }}>
                          <button 
                            onClick={() => navigate('/assets', { state: { selectedAssetId: asset.id } })}
                            className="btn btn-secondary" 
                            style={{ padding: '4px 8px', fontSize: '11px' }}
                          >
                            Investigate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <button 
            onClick={() => navigate('/assets')} 
            className="btn btn-secondary w-full"
            style={{ marginTop: '8px' }}
          >
            Review Priority Assets
          </button>
        </div>

        {/* Right: Condition Distribution & Review Exception */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          {/* Condition distribution bar */}
          <div className="card">
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
              Asset Condition Distribution
            </h2>
            <div style={{ display: 'flex', height: '12px', borderRadius: '4px', overflow: 'hidden', marginBottom: '16px' }}>
              <div style={{ width: `${(conditionDist.Critical / totalAssetsCount) * 100}%`, backgroundColor: 'var(--color-red)' }} title="Critical" />
              <div style={{ width: `${(conditionDist.Poor / totalAssetsCount) * 100}%`, backgroundColor: 'var(--color-amber)' }} title="Poor" />
              <div style={{ width: `${(conditionDist.Fair / totalAssetsCount) * 100}%`, backgroundColor: '#38bdf8' }} title="Fair" />
              <div style={{ width: `${(conditionDist.Good / totalAssetsCount) * 100}%`, backgroundColor: 'var(--color-green)' }} title="Good" />
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', fontSize: '11px', textAlign: 'center' }}>
              <div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-red)', marginRight: '4px' }} />
                <span>Critical: <strong>{conditionDist.Critical}</strong></span>
              </div>
              <div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-amber)', marginRight: '4px' }} />
                <span>Poor: <strong>{conditionDist.Poor}</strong></span>
              </div>
              <div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#38bdf8', marginRight: '4px' }} />
                <span>Fair: <strong>{conditionDist.Fair}</strong></span>
              </div>
              <div>
                <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--color-green)', marginRight: '4px' }} />
                <span>Good: <strong>{conditionDist.Good}</strong></span>
              </div>
            </div>
          </div>

          {/* Human Review Panel */}
          <div className="card" style={{ borderLeft: '4px solid var(--color-amber)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
            <div>
              <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <UserCheck size={16} className="text-[#f59e0b]" />
                Pending Verification Tasks
              </h2>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.4' }}>
                {pendingReviews > 0 
                  ? `There are ${pendingReviews} exceptions requiring human operator review before plan confirmation.`
                  : "No decisions currently require human validation."
                }
              </p>
              {pendingReviews > 0 && (
                <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '8px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  <span>• Low-confidence serial OCR identified on Chiller 02</span>
                  <span>• Indeterminate moisture discoloration on Basement Wall</span>
                </div>
              )}
            </div>
            
            {pendingReviews > 0 && (
              <button 
                onClick={() => navigate('/review-queue')} 
                className="btn btn-amber text-xs font-bold"
                style={{ alignSelf: 'flex-start', marginTop: '12px' }}
              >
                Open Pending Reviews
              </button>
            )}
          </div>

        </div>
      </section>

      {/* E. LIVE ASSESSMENT PIPELINE */}
      <section className="card">
        <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '16px' }}>
          Live Evidence to Decision Pipeline
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
          
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <UploadCloud size={20} style={{ color: 'var(--color-brand-light)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>1. Ingestion</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>{totalEvidence} Photos</div>
            <span className="badge badge-green" style={{ fontSize: '8px', padding: '2px 6px' }}>Complete</span>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <Database size={20} style={{ color: 'var(--color-brand-light)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>2. Grouping</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>{totalSequences} Sequences</div>
            <span className="badge badge-green" style={{ fontSize: '8px', padding: '2px 6px' }}>Complete</span>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <Cpu size={20} style={{ color: 'var(--color-brand-light)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>3. Assets</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>{totalAssetsCount} Assets Mapped</div>
            <span className="badge badge-green" style={{ fontSize: '8px', padding: '2px 6px' }}>Complete</span>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <AlertTriangle size={20} style={{ color: 'var(--color-brand-light)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>4. Findings</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>3 Anomalies</div>
            <span className="badge badge-green" style={{ fontSize: '8px', padding: '2px 6px' }}>Complete</span>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <UserCheck size={20} style={{ color: pendingReviews > 0 ? 'var(--color-amber)' : 'var(--color-brand-light)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>5. Exceptions</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>{pendingReviews} Pending</div>
            <span className={`badge ${pendingReviews > 0 ? 'badge-amber' : 'badge-green'}`} style={{ fontSize: '8px', padding: '2px 6px' }}>
              {pendingReviews > 0 ? 'Review Req' : 'Complete'}
            </span>
          </div>

          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px', textAlign: 'center' }}>
            <ShieldCheck size={20} style={{ color: pendingReviews > 0 ? 'var(--text-muted)' : 'var(--color-green)', marginBottom: '8px' }} />
            <div style={{ fontSize: '11px', fontWeight: 'bold', textTransform: 'uppercase', color: 'var(--text-muted)' }}>6. Decisions</div>
            <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', margin: '4px 0' }}>
              {pendingReviews > 0 ? 'Awaiting Review' : 'Ready'}
            </div>
            <span className={`badge ${pendingReviews > 0 ? 'badge-gray' : 'badge-green'}`} style={{ fontSize: '8px', padding: '2px 6px' }}>
              {pendingReviews > 0 ? 'Blocked' : 'Approved'}
            </span>
          </div>

        </div>
      </section>

      {/* G. RECENT DECISION ACTIVITY */}
      <section className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>Recent Decision Activity</h2>
          <button 
            onClick={() => navigate('/audit-trail')} 
            className="btn btn-secondary"
            style={{ padding: '6px 12px', fontSize: '12px' }}
          >
            View Complete Audit History
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {recentActivities.map((act, index) => (
            <div 
              key={index} 
              style={{ 
                display: 'flex', 
                gap: '16px', 
                alignItems: 'flex-start',
                padding: '12px', 
                background: 'var(--bg-primary)', 
                border: '1px solid var(--border-color)', 
                borderRadius: '6px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', fontSize: '12px', fontFamily: 'var(--font-mono)', minWidth: '80px' }}>
                <Clock size={12} />
                <span>{act.timestamp}</span>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '13px', fontWeight: 600, color: '#fff' }}>
                  {act.action}
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px' }}>
                  Source: {act.evidence} &rarr; <span style={{ color: 'var(--color-green)' }}>{act.result}</span>
                </div>
              </div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                Actor: {act.actor}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CORE CTA FOOTER */}
      <section style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', padding: '16px 0' }}>
        <button onClick={() => navigate('/guided-demo')} className="btn">
          Start Product Tour
        </button>
        <button onClick={() => navigate('/how-it-works')} className="btn btn-secondary">
          How It Works
        </button>
      </section>

    </div>
  );
}
