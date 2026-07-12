import React, { useState } from 'react';
import { CheckCircle, AlertCircle, Eye, AlertTriangle, Play, HelpCircle, ArrowRight, UserCheck } from 'lucide-react';
import { reviewQueueList, projectSummary } from '../data/demoData';

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
    <div className="space-y-6">
      
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <UserCheck size={20} className="text-[#38bdf8]" />
            Governance Inspector
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Human Review Queue - Items flagged with low confidence score requiring manual operator verification.
          </p>
        </div>
        <div className="bg-[#131c2e] border border-[#334155] rounded-md px-3 py-1 text-xs text-[#94a3b8] font-mono">
          Pending Verification: <span className={pendingCount > 0 ? "text-amber-500 font-bold" : "text-emerald-400 font-bold"}>{pendingCount}</span>
        </div>
      </div>

      {/* OPERATOR INFORMATION NOTICE */}
      <section className="card bg-[#131c2e]/40 border-[#334155]/50 p-4">
        <h2 className="text-xs font-mono font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1">
          <AlertCircle size={14} className="text-[#38bdf8]" />
          Operator Protocol Matrix
        </h2>
        <p className="text-xs text-[#94a3b8] leading-relaxed">
          Verify the referenced inspection photo evidence. Select <strong>Approve</strong> if the system reading is correct, <strong>Correct</strong> to override OCR text data directly, <strong>Escalate</strong> to request a manual field check, or <strong>Defer</strong> to place a temporal hold.
        </p>
      </section>

      {/* ITEMS LIST */}
      <section className="space-y-6">
        {items.map((item) => {
          const hasActed = item.operatorAction !== null;
          const cardBorder = hasActed 
            ? item.operatorAction === 'APPROVED' || item.operatorAction === 'CORRECTED'
              ? 'border-[#22c55e]/50'
              : item.operatorAction === 'ESCALATED'
                ? 'border-amber-500/50'
                : 'border-slate-500/50'
            : 'border-[#334155]/80';

          return (
            <div key={item.id} className={`card bg-[#131c2e]/60 border transition-all ${cardBorder} p-5 space-y-4`}>
              
              {/* Item Header */}
              <div className="flex justify-between items-start gap-4 pb-2 border-b border-[#334155]/30">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-mono text-[#64748b]">{item.id} // {item.asset}</span>
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
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
                    <span className="badge badge-amber animate-pulse">PENDING REVIEW</span>
                  )}
                </div>
              </div>

              {/* Grid: Reason & Photo Info */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                
                {/* Text Context (7 columns) */}
                <div className="md:col-span-8 space-y-3">
                  <div className="space-y-1">
                    <span className="text-[9px] font-mono text-[#64748b] uppercase">Flag Trigger Reason</span>
                    <p className="text-xs text-[#94a3b8] leading-relaxed">
                      {item.reason}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                    <div className="bg-[#0b0f19] p-2.5 rounded border border-[#334155]/20">
                      <span className="text-[#64748b] block mb-0.5">EVIDENCE FILE</span>
                      <span className="text-[#38bdf8] flex items-center gap-1">
                        <Eye size={12} />
                        {item.evidence}
                      </span>
                    </div>
                    <div className="bg-[#0b0f19] p-2.5 rounded border border-[#334155]/20">
                      <span className="text-[#64748b] block mb-0.5">CONFIDENCE RATING</span>
                      <span className="text-white font-bold">{Math.floor(item.confidence * 100)}%</span>
                    </div>
                  </div>
                </div>

                {/* Simulated Thumbnail Box (4 columns) */}
                <div className="md:col-span-4 bg-[#0b0f19] border border-[#334155]/40 h-28 rounded-lg flex flex-col items-center justify-center text-center p-3 relative">
                  <div className="hud-grid-matrix opacity-10"></div>
                  <Image size={24} className="text-[#64748b] mb-1.5" />
                  <span className="text-[10px] font-mono text-white font-bold">{item.evidence}</span>
                  <span className="text-[8px] text-[#64748b] uppercase tracking-wider mt-0.5">[ Demo Placeholder ]</span>
                </div>

              </div>

              {/* Action Handlers Panel */}
              <div className="pt-4 border-t border-[#334155]/30">
                {!hasActed ? (
                  <div className="space-y-4">
                    {/* Optional text correction field */}
                    {item.id === 'REV-001' && (
                      <div className="space-y-1.5 max-w-sm">
                        <label className="text-[10px] font-mono text-[#64748b] uppercase">Manual Serial Key Correction</label>
                        <input 
                          type="text" 
                          placeholder="INPUT CORRECT SERIAL KEY (e.g. CH-0915-B)..." 
                          value={item.correctionInput}
                          onChange={(e) => handleCorrectionTextChange(item.id, e.target.value)}
                          className="text-input text-xs"
                        />
                      </div>
                    )}
                    {item.id === 'REV-002' && (
                      <div className="space-y-1.5 max-w-sm">
                        <label className="text-[10px] font-mono text-[#64748b] uppercase">Verify Seepage Condition Notes</label>
                        <input 
                          type="text" 
                          placeholder="INPUT VERIFICATION NOTE (e.g. Dry/Stained)..." 
                          value={item.correctionInput}
                          onChange={(e) => handleCorrectionTextChange(item.id, e.target.value)}
                          className="text-input text-xs"
                        />
                      </div>
                    )}

                    {/* Operational buttons */}
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button 
                        onClick={() => handleAction(item.id, 'APPROVED')}
                        className="btn btn-green py-2 px-4"
                      >
                        Approve
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'CORRECTED')}
                        className="btn btn-secondary py-2 px-4 border-[#38bdf8]/40 text-[#38bdf8] hover:bg-[#38bdf8]/10"
                      >
                        Correct
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'ESCALATED')}
                        className="btn btn-amber py-2 px-4"
                      >
                        Escalate
                      </button>
                      
                      <button 
                        onClick={() => handleAction(item.id, 'DEFERRED')}
                        className="btn btn-secondary py-2 px-4"
                      >
                        Defer
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20 flex justify-between items-center flex-wrap gap-3">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono text-[#64748b] uppercase">Decision Logged</span>
                      <p className="text-xs text-white font-medium flex items-center gap-1.5">
                        <CheckCircle size={14} className="text-[#22c55e]" />
                        {item.operatorNotes}
                      </p>
                    </div>
                    <button 
                      onClick={() => handleReset(item.id)}
                      className="btn btn-secondary py-1 px-3 text-xs"
                    >
                      Reset Decision
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </section>

    </div>
  );
}
