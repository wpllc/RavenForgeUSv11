import React, { useState } from 'react';
import { Search, Image, Database, MapPin, AlertCircle, CheckCircle, Eye } from 'lucide-react';
import { evidenceLedger, projectSummary } from '../data/demoData';

export default function Evidence() {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Consolidated photo sequences from demoData
  const photoSequences = [
    { id: 'SEQ-001', name: 'AHU 01 Cabinet Exterior', photos: '8 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '98%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-002', name: 'AHU 01 Component Interior', photos: '7 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '97%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-003', name: 'AHU 02 Cabinet Oxidation', photos: '9 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '92%', status: 'PASSED', flags: 'Action Required' },
    { id: 'SEQ-004', name: 'AHU 02 Coil and Filter Assemblies', photos: '5 Photos', location: 'Building A, Room 104', type: 'Visual Spectrum JPEG', confidence: '94%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-005', name: 'Pump 02 Coolant Seals & Moisture Staining', photos: '8 Photos', location: 'Building A, Basement Utility', type: 'Visual & Infrared Multi-Spec', confidence: '88%', status: 'PASSED', flags: 'Critical' },
    { id: 'SEQ-006', name: 'Pump 01 Mounting Frame & Vibration Pad', photos: '6 Photos', location: 'Building A, Basement Utility', type: 'Visual Spectrum JPEG', confidence: '94%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-007', name: 'Chiller 01 Rooftop Cabinet External', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '97%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-008', name: 'Chiller 01 Compressors & Temp Readouts', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '98%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-009', name: 'Chiller 02 Condenser Coils & Fin Matrix', photos: '6 Photos', location: 'Building B, Roof Deck', type: 'Visual Spectrum JPEG', confidence: '93%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-010', name: 'Chiller 02 Obscured Serial Nameplate', photos: '4 Photos', location: 'Building B, Roof Deck', type: 'High-Contrast Macro OCR', confidence: '64%', status: 'FLAGGED_FOR_REVIEW', flags: 'Low Confidence OCR' },
    { id: 'SEQ-011', name: 'Fire Extinguisher 01 Expired Tag Details', photos: '4 Photos', location: 'Building B, Corridor 201', type: 'Macro Visual JPEG', confidence: '82%', status: 'PASSED', flags: 'Action Required' },
    { id: 'SEQ-012', name: 'Fire Extinguisher 02 Compliance Label', photos: '4 Photos', location: 'Building B, Lobby Entrance', type: 'Macro Visual JPEG', confidence: '99%', status: 'PASSED', flags: 'None' },
    { id: 'SEQ-013', name: 'General Mechanical Space Reference', photos: '23 Photos', location: 'Facility Wide', type: 'Context Wide-Angle JPEG', confidence: '95%', status: 'PASSED', flags: 'None' }
  ];

  // Filtering for the 96-record ledger
  const filteredLedger = evidenceLedger.filter(record => {
    const matchesSearch = record.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          record.asset.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || record.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* PAGE HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Database size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Source Evidence Ingest
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Photographs, location logs, and metadata records mapped to assets.
            </p>
          </div>
          <div>
            <span className="badge badge-gray" style={{ fontWeight: 'bold' }}>
              Total Photos: {projectSummary.totalPhotos}
            </span>
          </div>
        </div>
      </section>

      {/* 1. EXECUTIVE METRICS SUMMARY */}
      <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>{projectSummary.totalPhotos}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Ingested Photos</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-brand-light)', fontFamily: 'var(--font-mono)' }}>{projectSummary.photoSequences}</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Photo Sequences</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 600, color: 'var(--color-green)', fontFamily: 'var(--font-mono)' }}>13 / 13</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Location Records Verified</div>
        </div>
        <div className="card" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '28px', fontWeight: 600, color: '#fff', fontFamily: 'var(--font-mono)' }}>100%</div>
          <div style={{ fontSize: '12px', color: 'var(--text-secondary)', fontWeight: 500, marginTop: '4px' }}>Ingestion Integrity</div>
        </div>
      </section>

      {/* 2. PHOTO SEQUENCES (13 GROUPINGS) */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>Consolidated Photo Sequences</h2>
          <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            The 96 raw inspection images are grouped into 13 coherent sequences based on time and location metadata.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
          {photoSequences.map((seq) => (
            <div 
              key={seq.id} 
              className="card"
              style={{ 
                display: 'flex', 
                flexDirection: 'column', 
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', paddingBottom: '8px', marginBottom: '12px' }}>
                  <span style={{ fontSize: '10px', fontFamily: 'var(--font-mono)', color: 'var(--color-brand-light)' }}>
                    {seq.id}
                  </span>
                  <span className={`badge ${seq.status === 'FLAGGED_FOR_REVIEW' ? 'badge-amber' : 'badge-green'}`}>
                    {seq.status === 'FLAGGED_FOR_REVIEW' ? 'REVIEW REQUIRED' : 'PASSED'}
                  </span>
                </div>
                
                <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                  <Image size={16} style={{ color: 'var(--text-muted)' }} />
                  {seq.name}
                </h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                  <div><span style={{ color: 'var(--text-muted)' }}>Files:</span> {seq.photos}</div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Location:</span> {seq.location}</div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Source:</span> {seq.type}</div>
                  <div><span style={{ color: 'var(--text-muted)' }}>Confidence:</span> <span style={{ fontFamily: 'var(--font-mono)', color: '#fff', fontWeight: 'bold' }}>{seq.confidence}</span></div>
                </div>
              </div>

              {seq.flags !== 'None' && (
                <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px', color: 'var(--color-amber)', fontWeight: 500 }}>
                  <AlertCircle size={12} />
                  <span>Flag: {seq.flags}</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 3. FULL LEDGER COLLAPSIBLE CONTAINER */}
      <section className="card">
        <details className="expandable-details" style={{ margin: 0 }}>
          <summary style={{ fontSize: '14px', fontWeight: 600 }}>
            View Full 96-Record Evidence Ledger
          </summary>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            {/* Search and Filters inside expander */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
              <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
                <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  placeholder="Search ledger by file name or asset..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="text-input"
                  style={{ paddingLeft: '36px' }}
                />
              </div>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-input"
                style={{ width: 'auto', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff', cursor: 'pointer' }}
              >
                <option value="ALL">All States</option>
                <option value="NORMALIZED">Normalized</option>
                <option value="FLAGGED_FOR_REVIEW">Flagged for Review</option>
              </select>
            </div>

            {/* Table */}
            <div className="table-container" style={{ maxHeight: '400px', overflowY: 'auto' }}>
              <table className="governance-table" style={{ fontSize: '12px' }}>
                <thead>
                  <tr>
                    <th>FILE NAME</th>
                    <th>ASSET MAPPING</th>
                    <th>COORDINATE REFERENCE</th>
                    <th>STATUS</th>
                    <th>CONFIDENCE</th>
                    <th>AUDIT HASH</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLedger.map((row) => (
                    <tr key={row.id}>
                      <td style={{ fontFamily: 'var(--font-mono)', color: '#fff' }}>{row.id}</td>
                      <td>{row.asset}</td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{row.gps}</td>
                      <td>
                        <span className={`badge ${row.status === 'FLAGGED_FOR_REVIEW' ? 'badge-amber' : 'badge-green'}`}>
                          {row.status === 'FLAGGED_FOR_REVIEW' ? 'REVIEW REQUIRED' : 'NORMALIZED'}
                        </span>
                      </td>
                      <td style={{ fontFamily: 'var(--font-mono)' }}>{Math.floor(row.confidence * 100)}%</td>
                      <td style={{ fontFamily: 'var(--font-mono)', fontSize: '11px', color: 'var(--text-muted)' }}>{row.digest}</td>
                    </tr>
                  ))}
                  {filteredLedger.length === 0 && (
                    <tr>
                      <td colSpan="6" style={{ textAlign: 'center', py: '20px', color: 'var(--text-muted)' }}>
                        No matching evidence records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            
            <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
              * The evidence ledger displays original file structures, hashes, and validation stamps for all {evidenceLedger.length} ingested frames.
            </div>
          </div>
        </details>
      </section>

    </div>
  );
}
