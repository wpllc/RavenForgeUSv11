import React, { useState } from 'react';
import { Cpu, MapPin, ShieldAlert, Award, FileJson, CheckSquare, Eye, AlertCircle, FileText, Lock } from 'lucide-react';
import { assetsList, projectSummary } from '../data/demoData';

export default function Assets() {
  const [selectedAssetId, setSelectedAssetId] = useState('AHU-02');
  const [activeTab, setActiveTab] = useState('executive');

  const selectedAsset = assetsList.find(a => a.id === selectedAssetId) || assetsList[0];

  return (
    <div className="space-y-6">
      
      {/* PAGE HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#334155]/40 pb-4">
        <div>
          <h1 className="text-xl font-bold text-white flex items-center gap-2">
            <Cpu size={20} className="text-[#38bdf8]" />
            Unique Asset Portfolio
          </h1>
          <p className="text-xs text-[#94a3b8]">
            Directory of the 8 unique assets evaluated during the pilot condition assessment.
          </p>
        </div>
        <div className="bg-[#131c2e] border border-[#334155] rounded-md px-3 py-1 text-xs text-[#94a3b8] font-mono">
          Total Assets: <span className="text-white font-bold">{projectSummary.uniqueAssets}</span>
        </div>
      </div>

      {/* TWO COLUMNS: ASSETS DIRECTORY & DETAIL PANEL */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* LEFT COLUMN: ASSETS LIST (5 columns wide) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-[10px] text-[#64748b] font-mono uppercase tracking-wider px-1">
            Asset Inventory
          </div>
          
          <div className="space-y-2">
            {assetsList.map((asset) => {
              const isSelected = asset.id === selectedAssetId;
              const isCritical = asset.priority === 'Critical';
              const isWarning = asset.priority === 'High' || asset.priority === 'Action Required';
              
              return (
                <button
                  key={asset.id}
                  onClick={() => {
                    setSelectedAssetId(asset.id);
                    setActiveTab('executive'); // Reset tab to executive on change
                  }}
                  className={`w-full text-left p-3.5 rounded-lg border transition-all flex justify-between items-center ${
                    isSelected 
                      ? 'bg-[#131c2e] border-[#38bdf8] shadow-[0_0_12px_rgba(56,189,248,0.1)]' 
                      : 'bg-[#131c2e]/40 border-[#334155]/50 hover:border-[#334155] hover:bg-[#131c2e]/60'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="text-xs font-bold text-white flex items-center gap-1.5">
                      {asset.name}
                      <span className="text-[9px] text-[#64748b] font-mono">({asset.id})</span>
                    </div>
                    <div className="flex items-center gap-1 text-[11px] text-[#94a3b8]">
                      <MapPin size={11} className="text-[#64748b]" />
                      <span>{asset.location}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <span className={`badge ${
                      isCritical ? 'badge-red' : isWarning ? 'badge-amber' : 'badge-green'
                    }`}>
                      {asset.condition}
                    </span>
                    <span className="text-[9px] text-[#64748b] font-mono">
                      Conf: {Math.floor(asset.confidence * 100)}%
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: DETAIL EXPLORER (7 columns wide) */}
        <div className="lg:col-span-7 card bg-[#131c2e]/30 border-[#334155]/60 p-5 space-y-5">
          
          {/* Header Details */}
          <div className="flex justify-between items-start gap-4 pb-4 border-b border-[#334155]/40">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                {selectedAsset.name} 
                <span className="text-xs text-[#64748b] font-mono">({selectedAsset.id})</span>
              </h2>
              <p className="text-xs text-[#94a3b8] mt-1 flex items-center gap-1">
                <MapPin size={12} className="text-[#64748b]" />
                {selectedAsset.location}
              </p>
            </div>
            
            <div className="text-right">
              <span className="text-[9px] text-[#64748b] font-mono uppercase block">REVALIDATION STATE</span>
              <span className={`badge mt-1 ${
                selectedAsset.technicalFields.revalidationStatus === 'ESCALATED' ? 'badge-amber' : 'badge-green'
              }`}>
                {selectedAsset.technicalFields.revalidationStatus}
              </span>
            </div>
          </div>

          {/* TAB CONTROLS */}
          <div className="flex border-b border-[#334155]/30 text-xs">
            <button
              onClick={() => setActiveTab('executive')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition ${
                activeTab === 'executive' 
                  ? 'border-[#38bdf8] text-white' 
                  : 'border-transparent text-[#64748b] hover:text-white'
              }`}
            >
              Executive Summary
            </button>
            <button
              onClick={() => setActiveTab('technical')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition ${
                activeTab === 'technical' 
                  ? 'border-[#38bdf8] text-white' 
                  : 'border-transparent text-[#64748b] hover:text-white'
              }`}
            >
              Technical Data
            </button>
            <button
              onClick={() => setActiveTab('evidence')}
              className={`pb-2.5 px-4 font-semibold border-b-2 transition ${
                activeTab === 'evidence' 
                  ? 'border-[#38bdf8] text-white' 
                  : 'border-transparent text-[#64748b] hover:text-white'
              }`}
            >
              Evidence Logs
            </button>
          </div>

          {/* TAB CONTENTS */}
          <div className="space-y-4 min-h-[160px]">
            
            {/* EXECUTIVE VIEW */}
            {activeTab === 'executive' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#38bdf8]">Priority Condition Finding</h4>
                  <p className="text-xs text-[#94a3b8] leading-relaxed">
                    {selectedAsset.findings}
                  </p>
                </div>

                <div className="p-3.5 bg-amber-500/5 border border-amber-500/20 rounded-lg">
                  <h4 className="text-xs font-bold text-amber-500 flex items-center gap-1.5 mb-1.5">
                    <ShieldAlert size={14} />
                    RECOMMENDED PLAN OF ACTION
                  </h4>
                  <p className="text-xs text-white leading-relaxed font-medium">
                    {selectedAsset.recommendation}
                  </p>
                </div>
              </div>
            )}

            {/* TECHNICAL DETAILS */}
            {activeTab === 'technical' && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                  <div className="bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20">
                    <span className="text-[#64748b] block mb-1">SERIAL NUMBER</span>
                    <span className="text-white font-bold">{selectedAsset.technicalFields.serialNumber}</span>
                  </div>
                  <div className="bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20">
                    <span className="text-[#64748b] block mb-1">MANUFACTURER</span>
                    <span className="text-white font-bold">{selectedAsset.technicalFields.manufacturer}</span>
                  </div>
                  <div className="bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20">
                    <span className="text-[#64748b] block mb-1">INSTALLATION YEAR</span>
                    <span className="text-white font-bold">{selectedAsset.technicalFields.installYear}</span>
                  </div>
                  <div className="bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20">
                    <span className="text-[#64748b] block mb-1">DESIGN LIFE INTERVAL</span>
                    <span className="text-white font-bold">{selectedAsset.technicalFields.designLifeYears} Years</span>
                  </div>
                </div>

                {/* Rules Checked list */}
                <div className="space-y-2">
                  <h4 className="text-xs font-mono uppercase text-[#38bdf8] px-1">Enforced Policy Check Results</h4>
                  <div className="space-y-1.5">
                    {selectedAsset.technicalFields.ruleChecks.length > 0 ? (
                      selectedAsset.technicalFields.ruleChecks.map((rule, idx) => (
                        <div key={idx} className="flex justify-between items-center bg-[#0b0f19] p-2.5 rounded border border-[#334155]/30 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <span className={`h-2.5 w-2.5 rounded-full ${
                              rule.status === 'PASS' ? 'bg-[#22c55e]' : rule.status === 'TRIGGERED' ? 'bg-amber-500' : 'bg-red-500'
                            }`} />
                            <span className="text-white">{rule.rule}</span>
                          </div>
                          <span className={rule.status === 'PASS' ? 'text-[#22c55e]' : 'text-amber-500'}>{rule.detail}</span>
                        </div>
                      ))
                    ) : (
                      <div className="text-xs text-[#64748b] font-mono py-2 text-center">
                        No policy rule violations logged for this asset.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* EVIDENCE LOGS */}
            {activeTab === 'evidence' && (
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase text-[#38bdf8] px-1">Linked Physical Evidence Logs</h4>
                <ul className="space-y-2 text-xs">
                  {selectedAsset.evidenceDetails.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 bg-[#0b0f19] p-3 rounded-lg border border-[#334155]/20">
                      <div className="h-5 w-5 rounded bg-[#131c2e] border border-[#334155] flex items-center justify-center text-[#38bdf8] shrink-0 font-mono text-[10px]">
                        {idx + 1}
                      </div>
                      <p className="text-[#94a3b8] leading-relaxed">{detail}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* EXPANDABLE RAW MACHINE DATA */}
          <div className="pt-4 border-t border-[#334155]/40">
            <details className="expandable-details">
              <summary>Expose Raw Decisional Manifest</summary>
              <div className="raw-json-block mt-3 text-left">
{`{
  "asset_id": "${selectedAsset.id}",
  "confidence_rating": ${selectedAsset.confidence},
  "revalidation_state": "${selectedAsset.technicalFields.revalidationStatus}",
  "telemetry": {
    "photos_ingested": ${selectedAsset.photoCount},
    "gps_cluster": "${selectedAsset.location}",
    "sha256_evidence_block": "0x8f2d512bd45${selectedAssetId === 'AHU-02' ? '88' : '12'}b9c"
  }
}`}
              </div>
            </details>
          </div>

        </div>

      </div>

    </div>
  );
}
