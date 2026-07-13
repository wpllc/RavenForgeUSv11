import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Eye, UserCheck, Image } from 'lucide-react';
import { reviewQueueList, projectSummary } from '../data/demoData';
import { getPendingReviewCount } from '../data/selectors';

export default function ReviewQueue() {
  const [items, setItems] = useState(
    reviewQueueList.map(item => ({
      ...item,
      operatorAction: null, // 'APPROVED', 'CORRECTED', 'ESCALATED', 'DEFERRED'
      operatorNotes: '',
      correctionInput: ''
    }))
  );

  const handleAction = (itemId, actionType) => {
    setItems(prevItems => 
      prevItems.map(item => {
        if (item.id === itemId) {
          let resolvedText = item.operatorNotes;
          if (actionType === 'CORRECTED') {
            resolvedText = item.correctionInput || 'Value corrected manually';
          } else if (actionType === 'APPROVED') {
            resolvedText = 'Verified as correct against raw photo.';
          } else if (actionType === 'ESCALATED') {
            resolvedText = 'Dispatched to field inspection team for physical re-check.';
          } else if (actionType === 'DEFERRED') {
            resolvedText = 'Decisional hold engaged; postponed for quarterly inspection review.';
          }
          return {
            ...item,
            operatorAction: actionType,
            operatorNotes: resolvedText
          };
        }
        return item;
      })
    );
  };

  const handleCorrectionTextChange = (itemId, text) => {
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === itemId ? { ...item, correctionInput: text } : item
      )
    );
  };

  const handleReset = (itemId) => {
    setItems(prevItems =>
      prevItems.map(item => 
        item.id === itemId 
          ? { ...item, operatorAction: null, operatorNotes: '', correctionInput: '' }
          : item
      )
    );
  };

  const pendingCount = items.filter(i => !i.operatorAction).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserCheck size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Human Review Queue
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Pending verification exceptions flagged by automated checks.
            </p>
          </div>
          <div>
            <span className="badge badge-amber" style={{ fontWeight: 'bold' }}>
              Pending Items: {pendingCount}
            </span>
          </div>
        </div>
      </section>

      {/* OPERATOR INFORMATION NOTICE */}
      <section className="card" style={{ borderLeft: '4px solid var(--color-brand)', background: 'var(--bg-secondary)', padding: '16px' }}>
        <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <AlertCircle size={16} className="text-[#38bdf8]" aria-hidden="true" />
          Review Guidelines
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
          Compare the flagged exceptions below against the original inspection photographs. Select <strong>Approve</strong> if correct, <strong>Correct</strong> to update text keys, <strong>Escalate</strong> for a physical recheck, or <strong>Defer</strong> to post-pone validation.
        </p>
      </section>

      {/* ITEMS LIST */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {items.map((item) => {
          const hasActed = item.operatorAction !== null;
          const cardBorder = hasActed 
            ? item.operatorAction === 'APPROVED' || item.operatorAction === 'CORRECTED'
              ? '1px solid var(--color-green)'
              : item.operatorAction === 'ESCALATED'
                ? '1px solid var(--color-amber)'
                : '1px solid var(--text-muted)'
            : '1px solid var(--border-color)';

          return (
            <div 
              key={item.id} 
              className="card"
              style={{ 
                border: cardBorder, 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '16px',
                transition: 'border-color 0.25s ease' 
              }}
            >
              
              {/* Item Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '12px' }}>
                <div>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                    {item.id} // {item.asset}
                  </span>
                  <h3 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginTop: '2px' }}>
                    {item.title}
                  </h3>
                </div>
                
                <div>
                  {hasActed ? (
                    <span className={`badge ${
                      item.operatorAction === 'APPROVED' || item.operatorAction === 'CORRECTED'
                        ? 'badge-green'
                        : item.operatorAction === 'ESCALATED'
                          ? 'badge-amber'
                          : 'badge-blue'
                    }`}>
                      {item.operatorAction}
                    </span>
                  ) : (
                    <span className="badge badge-amber">AWAITING OPERATOR</span>
                  )}
                </div>
              </div>

              {/* Grid: Reason & Photo Info */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', alignItems: 'center' }}>
                
                {/* Text Context */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                      Exception Trigger Reason
                    </span>
                    <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: '1.5' }}>
                      {item.reason}
                    </p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '12px' }}>
                    <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Source File
                      </span>
                      <span style={{ color: 'var(--color-brand-light)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Eye size={12} />
                        {item.evidence}
                      </span>
                    </div>
                    <div style={{ background: 'var(--bg-primary)', padding: '10px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                      <span style={{ color: 'var(--text-muted)', display: 'block', fontSize: '10px', fontWeight: 'bold', textTransform: 'uppercase' }}>
                        Confidence Index
                      </span>
                      <span style={{ color: '#fff', fontWeight: 'bold', display: 'block', marginTop: '2px', fontFamily: 'var(--font-mono)' }}>
                        {Math.floor(item.confidence * 100)}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Simulated Thumbnail Box */}
                <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', height: '112px', borderRadius: '6px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '16px' }}>
                  <Image size={24} style={{ color: 'var(--text-muted)', marginBottom: '6px' }} />
                  <span style={{ fontSize: '11px', fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 'bold' }}>{item.evidence}</span>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>[ Demo Placeholder ]</span>
                </div>

              </div>

              {/* Action Handlers Panel */}
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
                {!hasActed ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {/* Optional text correction field */}
                    {item.id === 'REV-001' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '360px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                          Manual Serial Number Entry
                        </label>
                        <input 
                          type="text" 
                          placeholder="Type corrected serial (e.g. CH-0915-B)..." 
                          value={item.correctionInput}
                          onChange={(e) => handleCorrectionTextChange(item.id, e.target.value)}
                          className="text-input"
                        />
                      </div>
                    )}
                    {item.id === 'REV-002' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxWidth: '360px' }}>
                        <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>
                          Verify Seepage Observations
                        </label>
                        <input 
                          type="text" 
                          placeholder="Type verification notes (e.g. Seepage Stained/Dry)..." 
                          value={item.correctionInput}
                          onChange={(e) => handleCorrectionTextChange(item.id, e.target.value)}
                          className="text-input"
                        />
                      </div>
                    )}

                    {/* Operational buttons */}
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginTop: '4px' }}>
                      <button 
                        onClick={() => handleAction(item.id, 'APPROVED')}
                        className="btn btn-green text-xs font-bold"
                      >
                        Approve
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'CORRECTED')}
                        className="btn btn-secondary text-xs font-bold"
                        style={{ borderColor: 'var(--color-brand-light)', color: 'var(--color-brand-light)' }}
                      >
                        Correct Text
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'ESCALATED')}
                        className="btn btn-amber text-xs font-bold"
                      >
                        Escalate
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'DEFERRED')}
                        className="btn btn-secondary text-xs font-bold"
                      >
                        Defer Decision
                      </button>
                    </div>
                  </div>
                ) : (
                  <div style={{ background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)', display: 'flex', justifySelf: 'stretch', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>
                        Audit Decision Recorded
                      </span>
                      <p style={{ fontSize: '13px', color: '#fff', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                        <CheckCircle size={14} style={{ color: 'var(--color-green)' }} />
                        {item.operatorNotes}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleReset(item.id)}
                      className="btn btn-secondary text-xs"
                      style={{ padding: '6px 12px' }}
                    >
                      Reset Decision
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
        {items.length === 0 && (
          <div className="card text-center" style={{ padding: '40px', color: 'var(--text-muted)' }}>
            No verification tasks are registered in this sandbox case.
          </div>
        )}
      </section>

    </div>
  );
}
