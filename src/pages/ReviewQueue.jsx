import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, AlertCircle, Eye, UserCheck, Image, ArrowRight } from 'lucide-react';
import { reviewQueueList } from '../data/demoData';

export default function ReviewQueue() {
  const navigate = useNavigate();
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
  const resolvedItems = items.filter(i => i.operatorAction);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <UserCheck size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Reviews
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Human validation console for resolving automated gate exceptions.
            </p>
          </div>
          <div>
            <span className={`badge ${pendingCount > 0 ? 'badge-amber' : 'badge-green'}`} style={{ fontWeight: 'bold' }}>
              {pendingCount > 0 ? `Pending Reviews: ${pendingCount}` : 'No Reviews Pending'}
            </span>
          </div>
        </div>
      </section>

      {/* EMPTY STATE OR LIST */}
      {pendingCount === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* Empty State Card */}
          <section className="card text-center" style={{ padding: '48px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
            <CheckCircle size={48} className="text-[#10b981]" aria-hidden="true" />
            <h2 style={{ fontSize: '20px', color: '#fff', fontWeight: 600 }}>No Reviews Pending</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', maxWidth: '480px', margin: '0 auto', lineHeight: '1.5' }}>
              All detected exceptions and anomalies have been resolved. No findings currently require human validation.
            </p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '8px', flexWrap: 'wrap' }}>
              <button onClick={() => navigate('/overview')} className="btn text-xs font-bold">
                Go to Overview
              </button>
              <button onClick={() => navigate('/audit-trail')} className="btn btn-secondary text-xs font-bold">
                View Audit History
              </button>
            </div>
          </section>

          {/* Resolved Items List (For reset accessibility) */}
          {resolvedItems.length > 0 && (
            <section className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px' }}>
                Resolved Decisions (Active Session)
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {resolvedItems.map(item => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-primary)', padding: '12px 16px', borderRadius: '6px', border: '1px solid var(--border-color)', flexWrap: 'wrap', gap: '12px' }}>
                    <div>
                      <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>{item.id} // {item.asset}</span>
                      <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#fff', marginTop: '2px' }}>{item.title}</h4>
                      <p style={{ fontSize: '12px', color: 'var(--color-green)', fontWeight: 500, marginTop: '2px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <CheckCircle size={12} />
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
                ))}
              </div>
            </section>
          )}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {/* OPERATOR INFORMATION NOTICE */}
          <section className="card" style={{ borderLeft: '4px solid var(--color-brand)', background: 'var(--bg-secondary)', padding: '16px' }}>
            <h2 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <AlertCircle size={16} className="text-[#38bdf8]" aria-hidden="true" />
              Human Review Guidelines
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              Compare the flagged exceptions below against the original inspection photographs. Select <strong>Approve</strong> if correct, <strong>Correct</strong> to update text keys, <strong>Escalate</strong> for a physical recheck, or <strong>Defer</strong> to post-pone validation.
            </p>
          </section>

          {/* ITEMS LIST */}
          <section style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {items.map((item) => {
              const hasActed = item.operatorAction !== null;
              if (hasActed) return null; // Only show active items in the pending stream

              return (
                <div 
                  key={item.id} 
                  className="card"
                  style={{ 
                    border: '1px solid var(--border-color)', 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: '16px'
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
                      <span className="badge badge-amber">AWAITING OPERATOR</span>
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
                      <span style={{ fontSize: '9px', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '2px' }}>[ Simulated Evidence Record ]</span>
                    </div>

                  </div>

                  {/* Action Handlers Panel */}
                  <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
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
                  </div>

                </div>
              );
            })}
          </section>
        </div>
      )}

    </div>
  );
}
