import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Cpu, MapPin, Award, Eye, FileText, Search, Filter, ShieldCheck, HelpCircle } from 'lucide-react';
import { assetsList, projectSummary } from '../data/demoData';
import { getPriorityAssets } from '../data/selectors';

export default function Assets() {
  const location = useLocation();
  const navigate = useNavigate();

  // Search, filter and sorting states
  const [searchTerm, setSearchTerm] = useState('');
  const [conditionFilter, setConditionFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Selected asset state, pre-selecting if redirected from the dashboard
  const initialAssetId = location.state?.selectedAssetId || 'AHU-02';
  const [selectedAssetId, setSelectedAssetId] = useState(initialAssetId);

  // Re-sync if state changes externally
  useEffect(() => {
    if (location.state?.selectedAssetId) {
      setSelectedAssetId(location.state.selectedAssetId);
    }
  }, [location.state]);

  const priorityAssets = getPriorityAssets();

  // Filtered list
  const filteredAssets = priorityAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          asset.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCondition = conditionFilter === 'ALL' || asset.condition === conditionFilter;
    const matchesStatus = statusFilter === 'ALL' || asset.technicalFields.revalidationStatus === statusFilter;
    return matchesSearch && matchesCondition && matchesStatus;
  });

  const selectedAsset = assetsList.find(a => a.id === selectedAssetId) || filteredAssets[0] || assetsList[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* PAGE HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Cpu size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Asset Register
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Registered mechanical equipment inventory, status records, and recommended actions.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', fontSize: '12px', color: 'var(--text-secondary)' }}>
            <span className="badge badge-gray" style={{ textTransform: 'none', fontWeight: 'bold' }}>
              Total Unique Assets: {projectSummary.uniqueAssets}
            </span>
          </div>
        </div>
      </section>

      {/* FILTER & SEARCH BAR */}
      <section className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
          
          {/* Search Box */}
          <div style={{ position: 'relative', flex: 1, minWidth: '240px' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '11px', color: 'var(--text-muted)' }} />
            <input 
              type="text" 
              placeholder="Search assets by name, ID, or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="text-input"
              style={{ paddingLeft: '36px' }}
              aria-label="Search assets"
            />
          </div>

          {/* Condition Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <Filter size={14} />
            <span>Condition:</span>
            <select
              value={conditionFilter}
              onChange={(e) => setConditionFilter(e.target.value)}
              className="text-input"
              style={{ width: 'auto', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
              aria-label="Filter by Condition"
            >
              <option value="ALL">All Conditions</option>
              <option value="Critical">Critical</option>
              <option value="Poor">Poor</option>
              <option value="Fair">Fair</option>
              <option value="Good">Good</option>
            </select>
          </div>

          {/* Governance Status Filter */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            <span>Decision:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-input"
              style={{ width: 'auto', background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
              aria-label="Filter by Governance status"
            >
              <option value="ALL">All Decision States</option>
              <option value="ADMISSIBLE">Passed checks</option>
              <option value="ESCALATED">Requires Review</option>
            </select>
          </div>

        </div>
      </section>

      {/* TWO COLUMNS: REGISTER TABLE/CARDS & DETAILS VIEW */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '24px' }}>
        
        {/* Row/Grid Container (12-column layout on large screens) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', alignItems: 'start' }}>
          
          {/* LEFT PANEL: ASSET DIRECTORY REGISTER */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 600, color: '#fff' }}>Asset Directory</h2>
            
            {/* Desktop Table View */}
            <div className="table-container">
              <table className="governance-table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Location</th>
                    <th>Condition</th>
                    <th>Confidence</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map(asset => {
                    const isSelected = asset.id === selectedAssetId;
                    const isCritical = asset.condition === 'Critical';
                    const isPoor = asset.condition === 'Poor';
                    return (
                      <tr 
                        key={asset.id} 
                        onClick={() => setSelectedAssetId(asset.id)}
                        style={{ cursor: 'pointer', backgroundColor: isSelected ? 'var(--bg-tertiary)' : 'transparent' }}
                      >
                        <td style={{ fontWeight: '600', color: isSelected ? 'var(--color-brand-light)' : '#fff' }}>
                          {asset.name}
                          <span style={{ fontSize: '10px', color: 'var(--text-muted)', display: 'block', fontWeight: 'normal' }}>
                            {asset.id}
                          </span>
                        </td>
                        <td style={{ fontSize: '12px' }}>{asset.location}</td>
                        <td>
                          <span className={`badge ${isCritical ? 'badge-red' : isPoor ? 'badge-amber' : 'badge-green'}`}>
                            {asset.condition}
                          </span>
                        </td>
                        <td style={{ fontFamily: 'var(--font-mono)', fontSize: '12px' }}>
                          {Math.floor(asset.confidence * 100)}%
                        </td>
                      </tr>
                    );
                  })}
                  {filteredAssets.length === 0 && (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center', py: '20px', color: 'var(--text-muted)' }}>
                        No assets match the search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT PANEL: SELECTED ASSET DETAIL */}
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Header Details */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid var(--border-color)', paddingBottom: '16px' }}>
              <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#fff' }}>
                  {selectedAsset.name}
                </h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                  <MapPin size={12} style={{ color: 'var(--text-muted)' }} />
                  <span>{selectedAsset.location}</span>
                </div>
              </div>
              <span className="badge badge-gray" style={{ fontFamily: 'var(--font-mono)' }}>
                {selectedAsset.id}
              </span>
            </div>

            {/* Condition & status block */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>
                  Condition Health
                </span>
                <span className={`badge ${selectedAsset.condition === 'Critical' ? 'badge-red' : selectedAsset.condition === 'Poor' ? 'badge-amber' : 'badge-green'}`} style={{ marginTop: '4px' }}>
                  {selectedAsset.condition}
                </span>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>
                  System Confidence
                </span>
                <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#fff', display: 'block', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
                  {Math.floor(selectedAsset.confidence * 100)}%
                </span>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '12px', borderRadius: '6px', border: '1px solid var(--border-color)' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block' }}>
                  Decision Status
                </span>
                <span style={{ fontSize: '13px', fontWeight: 600, color: '#fff', display: 'block', marginTop: '4px' }}>
                  {selectedAsset.technicalFields.revalidationStatus === 'ADMISSIBLE' 
                    ? 'Passed checks'
                    : 'Requires Review'
                  }
                </span>
              </div>
            </div>

            {/* Primary Finding */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Primary Finding
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
                {selectedAsset.findings}
              </p>
            </div>

            {/* Recommended Action */}
            <div style={{ padding: '16px', background: 'rgba(2, 132, 199, 0.05)', border: '1px solid rgba(2, 132, 199, 0.2)', borderRadius: '6px' }}>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--color-brand-light)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Recommended Action
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--text-primary)', fontWeight: 500, lineHeight: '1.5' }}>
                {selectedAsset.recommendation}
              </p>
            </div>

            {/* Evidence Logs */}
            <div>
              <h3 style={{ fontSize: '12px', fontWeight: 'bold', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '6px' }}>
                Linked Source Evidence
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedAsset.evidenceDetails.map((detail, idx) => (
                  <li 
                    key={idx} 
                    style={{ 
                      display: 'flex', 
                      alignItems: 'flex-start', 
                      gap: '8px', 
                      fontSize: '12px', 
                      color: 'var(--text-secondary)',
                      background: 'var(--bg-primary)',
                      padding: '8px 12px',
                      borderRadius: '4px',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    <span style={{ fontWeight: 'bold', color: 'var(--color-brand-light)', minWidth: '16px' }}>{idx + 1}.</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Action Triggers */}
            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', borderTop: '1px solid var(--border-color)', paddingTop: '16px' }}>
              <button 
                onClick={() => navigate('/evidence')} 
                className="btn btn-secondary" 
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                View Source Evidence
              </button>
              <button 
                onClick={() => navigate('/audit-trail')} 
                className="btn btn-secondary" 
                style={{ fontSize: '12px', padding: '6px 12px' }}
              >
                Trace Decision
              </button>
            </div>

            {/* Advanced Decision Record Disclosure */}
            <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '12px' }}>
              <details className="expandable-details" style={{ margin: 0 }}>
                <summary>View Decision Record</summary>
                <div className="raw-json-block mt-3 text-left">
{`{
  "asset_id": "${selectedAsset.id}",
  "confidence_rating": ${selectedAsset.confidence},
  "revalidation_state": "${selectedAsset.technicalFields.revalidationStatus}",
  "telemetry": {
    "photos_ingested": ${selectedAsset.photoCount},
    "gps_cluster": "${selectedAsset.location}",
    "sha256_evidence_block": "0x8f2d512bd45${selectedAsset.id === 'AHU-02' ? '88' : '12'}b9c (Demo Placeholder)"
  },
  "demo_placeholder_notice": "This record contains mock values for scenario demonstration purposes only."
}`}
                </div>
              </details>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
