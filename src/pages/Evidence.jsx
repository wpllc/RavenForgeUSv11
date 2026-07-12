import React, { useState } from 'react';
import { Search, Image, Database, MapPin, AlertCircle, CheckCircle } from 'lucide-react';
import { evidenceLedger, projectSummary } from '../data/demoData';

export default function Evidence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Define the 13 photo sequences based on the pilot data
  const photoSequences = [
    { id: 'SEQ-001', name: 'AHU 01 Main Cabinet External', photos: '8 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '98%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-002', name: 'AHU 01 Motor & Fan Chamber', photos: '7 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '97%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-003', name: 'AHU 02 Cabinet Structural Corrosion', photos: '9 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '92%', status: 'NORMALIZED', flags: 'Action Required' },
    { id: 'SEQ-004', name: 'AHU 02 Coil and Filter Assemblies', photos: '5 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '94%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-005', name: 'Pump 02 Coolant Seals & Moisture Stain', photos: '8 Photos', location: 'Building A, Basement Utility', type: 'Visual & Infrared Multi-Spec', confidence: '88%', status: 'NORMALIZED', flags: 'Critical' },
    { id: 'SEQ-006', name: 'Pump 01 Mounting Frame & Vibration Pad', photos: '6 Photos', location: 'Building A, Basement Utility', type: 'Visual Spectrum JPEG', confidence: '94%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-007', name: 'Chiller 01 Rooftop Cabinet External', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '97%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-008', name: 'Chiller 01 Compressors & Temp Readouts', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '98%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-009', name: 'Chiller 02 Condenser Coils & Fin Matrix', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '93%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-010', name: 'Chiller 02 Obscured Serial Nameplate', photos: '4 Photos', location: 'Building B, Roof Deck', type: 'High-Contrast Macro OCR', confidence: '64%', status: 'FLAGGED_FOR_REVIEW', flags: 'Low Confidence OCR' },
    { id: 'SEQ-011', name: 'Fire Extinguisher 01 Expired Tag Closeups', photos: '4 Photos', location: 'Building B, Corridor 201', type: 'Macro Visual JPEG', confidence: '82%', status: 'NORMALIZED', flags: 'Action Required' },
    { id: 'SEQ-012', name: 'Fire Extinguisher 02 Compliance Label', photos: '4 Photos', location: 'Building B, Lobby Entrance', type: 'Macro Visual JPEG', confidence: '99%', status: 'NORMALIZED', flags: 'None' },
    { id: 'SEQ-013', name: 'General Mechanical Space Environment', photos: '23 Photos', location: 'Facility Wide', type: 'Context Wide-Angle JPEG', confidence: '95%', status: 'NORMALIZED', flags: 'None' }
  ];

  // Filtering for the 96-record ledger
  const filteredLedger = evidenceLedger.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.asset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* 1. EXECUTIVE METRICS SUMMARY */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="card text-center py-4 bg-[#131c2e] border-[#334155]">
          <div className="text-2xl font-bold text-white font-mono">{projectSummary.totalPhotos}</div>
          <div className="text-[10px] text-[#94a3b8] uppercase font-mono mt-1">Total Ingested Photos</div>
        </div>
        <div className="card text-center py-4 bg-[#131c2e] border-[#334155]">
          <div className="text-2xl font-bold text-[#38bdf8] font-mono">{projectSummary.photoSequences}</div>
          <div className="text-[10px] text-[#94a3b8] uppercase font-mono mt-1">Photo Sequences</div>
        </div>
        <div className="card text-center py-4 bg-[#131c2e] border-[#334155]">
          <div className="text-2xl font-bold text-[#22c55e] font-mono">13 / 13</div>
          <div className="text-[10px] text-[#94a3b8] uppercase font-mono mt-1">GPS Payloads Validated</div>
        </div>
        <div className="card text-center py-4 bg-[#131c2e] border-[#334155]">
          <div className="text-2xl font-bold text-white font-mono">100%</div>
          <div className="text-[10px] text-[#94a3b8] uppercase font-mono mt-1">Ingestion Integrity</div>
        </div>
      </section>

      {/* 2. PHOTO SEQUENCES (13 GROUPINGS) */}
      <section className="space-y-4">
        <div>
          <h2 className="text-base font-bold text-white">Consolidated Photo Sequences</h2>
          <p className="text-xs text-[#94a3b8] mt-0.5">
            The 96 raw inspection images are grouped into 13 coherent sequences using GPS and temporal clusters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {photoSequences.map((seq) => (
            <div key={seq.id} className="card bg-[#131c2e]/60 border-[#334155]/60 hover:border-[#38bdf8]/40 transition flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start gap-2 mb-3">
                  <span className="text-[10px] font-mono text-[#38bdf8] bg-[#38bdf8]/10 px-2 py-0.5 rounded">
                    {seq.id}
                  </span>
                  <span className={`badge ${seq.status === 'FLAGGED_FOR_REVIEW' ? 'badge-amber' : 'badge-green'}`}>
                    {seq.status}
                  </span>
                </div>
                
                <h3 className="text-xs font-bold text-white mb-2 flex items-center gap-1.5">
                  <Image size={14} className="text-[#94a3b8]" />
                  {seq.name}
                </h3>
                
                <div className="space-y-1 text-[11px] text-[#94a3b8]">
                  <div><span className="text-[#64748b]">Size:</span> {seq.photos}</div>
                  <div><span className="text-[#64748b]">Location:</span> {seq.location}</div>
                  <div><span className="text-[#64748b]">Type:</span> {seq.type}</div>
                  <div><span className="text-[#64748b]">Confidence:</span> <span className="font-mono font-bold text-white">{seq.confidence}</span></div>
                </div>
              </div>

              {seq.flags !== 'None' && (
                <div className="mt-3 pt-2 border-t border-[#334155]/30 flex items-center gap-1 text-[10px] text-amber-400 font-medium">
                  <AlertCircle size={12} />
                  <span>Flag: {seq.flags}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. FULL LEDGER COLLAPSIBLE CONTAINER */}
      <section className="card bg-[#131c2e]/20 border-[#334155]/60">
        <details className="expandable-details">
          <summary className="text-sm font-semibold text-[#38bdf8] flex items-center gap-2">
            <Database size={16} />
            View Full 96-Record Ingested Evidence Ledger
          </summary>
          
          <div className="pt-4 space-y-4">
            {/* Search and Filters inside expander */}
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <Search size={16} className="absolute left-3 top-3 text-[#64748b]" />
                <input 
                  type="text" 
                  placeholder="Search ledger by file name or asset..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-input pl-9"
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#0b0f19] border border-[#334155] rounded-md px-3 py-2 text-xs text-[#94a3b8] outline-none"
              >
                <option value="ALL">All States</option>
                <option value="NORMALIZED">Normalized Only</option>
                <option value="FLAGGED_FOR_REVIEW">Flagged for Review</option>
              </select>
            </div>

            {/* Table */}
            <div className="table-container max-h-[300px] overflow-y-auto">
              <table className="governance-table">
                <thead>
                  <tr>
                    <th>FILE NAME</th>
                    <th>ASSET MAPPING</th>
                    <th>GPS COORDINATES</th>
                    <th>STATUS</th>
                    <th>CONFIDENCE</th>
                    <th>HASH DIGEST</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedger.map((row) => (
                    <tr key={row.id}>
                      <td className="font-mono text-white text-xs">{row.id}</td>
                      <td>{row.asset}</td>
                      <td className="font-mono text-xs">{row.gps}</td>
                      <td>
                        <span className={`badge ${row.status === 'FLAGGED_FOR_REVIEW' ? 'badge-amber' : 'badge-green'}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="font-mono text-xs">{Math.floor(row.confidence * 100)}%</td>
                      <td className="font-mono text-xs text-[#64748b]">{row.digest}</td>
                    </tr>
                  ))}
                  {filteredLedger.length === 0 && (
                    <tr>
                      <td colSpan="6" className="text-center py-6 text-[#64748b]">
                        No matching evidence records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div className="text-[10px] text-[#64748b] font-mono">
              * The evidence ledger displays original file structures, hashes, and validation keys for all {evidenceLedger.length} frames.
            </div>
          </div>
        </details>
      </section>

    </div>
  );
}
