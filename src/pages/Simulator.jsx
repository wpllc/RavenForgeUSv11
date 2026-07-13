import React, { useState, useEffect } from 'react';
import { Shield, Play, HelpCircle, FileText, CheckCircle, AlertTriangle, RefreshCw } from 'lucide-react';
import { evaluateAssetRules } from '../data/selectors';

export default function Simulator() {
  // Preset scenarios definitions
  const scenarios = {
    ocr_mismatch: {
      name: 'Scenario 1: Low-Confidence Chiller OCR',
      assetType: 'Chiller',
      condition: 'Fair',
      confidence: 64,
      criticality: 'Standard Facility',
      evidenceCompleteness: 'Incomplete/Indeterminate Metadata',
      description: 'Chiller nameplate serial key OCR confidence falls below the 75% standard admissibility threshold.'
    },
    expired_tag: {
      name: 'Scenario 2: Fire Extinguisher Expired Tag',
      assetType: 'Fire Extinguisher',
      condition: 'Poor',
      confidence: 99,
      criticality: 'Mission Critical / Life Safety',
      evidenceCompleteness: 'Complete Photo Set',
      description: 'Extinguisher tag exceeds the 12-month boundary safety rules checked in the database.'
    },
    fluid_leak: {
      name: 'Scenario 3: Active Fluid Leak',
      assetType: 'Pump',
      condition: 'Critical',
      confidence: 88,
      criticality: 'Mission Critical / Life Safety',
      evidenceCompleteness: 'Complete Photo Set',
      description: 'A pump seal has failed with active moisture staining, triggering critical response rules.'
    },
    end_of_life: {
      name: 'Scenario 4: AHU Near End of Life Cycle',
      assetType: 'AHU',
      condition: 'Poor',
      confidence: 92,
      criticality: 'Standard Facility',
      evidenceCompleteness: 'Complete Photo Set',
      description: 'AHU operating lifetime exceeds 15-year lifecycle parameters.'
    },
    nominal: {
      name: 'Scenario 5: Nominal Check',
      assetType: 'AHU',
      condition: 'Good',
      confidence: 98,
      criticality: 'Standard Facility',
      evidenceCompleteness: 'Complete Photo Set',
      description: 'Nominal operational status with full evidence logs.'
    }
  };

  const [activeScenarioKey, setActiveScenarioKey] = useState('ocr_mismatch');
  
  // Simulation parameters
  const [assetType, setAssetType] = useState('Chiller');
  const [condition, setCondition] = useState('Fair');
  const [confidence, setConfidence] = useState(64);
  const [criticality, setCriticality] = useState('Standard Facility');
  const [evidenceCompleteness, setEvidenceCompleteness] = useState('Incomplete/Indeterminate Metadata');

  // Sync state when active scenario changes
  useEffect(() => {
    const sc = scenarios[activeScenarioKey];
    if (sc) {
      setAssetType(sc.assetType);
      setCondition(sc.condition);
      setConfidence(sc.confidence);
      setCriticality(sc.criticality);
      setEvidenceCompleteness(sc.evidenceCompleteness);
    }
  }, [activeScenarioKey]);

  // Run evaluations using the centralized rules engine
  const baselineScenario = scenarios[activeScenarioKey];
  const beforeResult = evaluateAssetRules({
    assetType: baselineScenario.assetType,
    condition: baselineScenario.condition,
    confidence: baselineScenario.confidence,
    criticality: baselineScenario.criticality,
    evidenceCompleteness: baselineScenario.evidenceCompleteness
  });

  const afterResult = evaluateAssetRules({
    assetType,
    condition,
    confidence,
    criticality,
    evidenceCompleteness
  });

  // Calculate plain-English explanation
  const getExplanation = () => {
    const baselineText = baselineScenario.name;
    let text = `Currently testing adjustments against the baseline configuration of "${baselineText}". `;
    
    if (criticality !== baselineScenario.criticality && criticality === 'Mission Critical / Life Safety') {
      text += 'Upgrading the asset to Mission Critical status enforces a higher confidence threshold (90% instead of 75%), which triggers validation exception gates. ';
    }
    if (confidence !== baselineScenario.confidence && confidence < baselineScenario.confidence) {
      text += `Lowering the OCR confidence to ${confidence}% violated admissibility thresholds, shifting the decision status to manual verification. `;
    }
    if (condition !== baselineScenario.condition) {
      text += `Modifying the condition health to "${condition}" changed the recommended planning action directly to "${afterResult.actionRecommended}". `;
    }
    if (afterResult.decisionStatus !== beforeResult.decisionStatus) {
      text += `This adjustment moved the decision status from "${beforeResult.decisionStatus}" to "${afterResult.decisionStatus}".`;
    } else {
      text += 'The changes did not alter the macro-level decision status, but updated the specific triggered rules.';
    }
    return text;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* HEADER */}
      <section className="card" style={{ padding: '20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: 600, color: '#fff', display: 'flex', alignItems: 'center', gap: 8 }}>
              <Shield size={24} className="text-[#38bdf8]" aria-hidden="true" />
              Decision Scenario Simulator
            </h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Simulate decision rules, confidence ratings, and safety thresholds to test how RavenForge handles asset validation scenarios.
            </p>
          </div>
        </div>
      </section>

      {/* CORE INPUT GRID */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
        
        {/* Left Column: Preset Selector and Custom Controls */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff', marginBottom: '8px' }}>
              1. Choose Scenario Baseline
            </h2>
            <select
              value={activeScenarioKey}
              onChange={(e) => setActiveScenarioKey(e.target.value)}
              className="text-input"
              style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', color: '#fff', cursor: 'pointer' }}
              aria-label="Select Scenario Baseline"
            >
              {Object.keys(scenarios).map(key => (
                <option key={key} value={key}>{scenarios[key].name}</option>
              ))}
            </select>
            <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '6px', lineHeight: '1.4' }}>
              Baseline: {scenarios[activeScenarioKey].description}
            </p>
          </div>

          <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              2. Adjust Simulation Inputs
            </h2>

            {/* Asset Type */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Asset Type</label>
              <select
                value={assetType}
                onChange={(e) => setAssetType(e.target.value)}
                className="text-input"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }}
              >
                <option value="Chiller">Chiller</option>
                <option value="Pump">Pump</option>
                <option value="AHU">AHU</option>
                <option value="Fire Extinguisher">Fire Extinguisher</option>
              </select>
            </div>

            {/* Condition Severity */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Condition Health</label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="text-input"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }}
              >
                <option value="Good">Good (Nominal)</option>
                <option value="Fair">Fair (Monitor)</option>
                <option value="Poor">Poor (Action Required)</option>
                <option value="Critical">Critical (Immediate Hazard)</option>
              </select>
            </div>

            {/* Confidence Slider */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold' }}>
                <span>CONFIDENCE INDEX</span>
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-brand-light)' }}>{confidence}%</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={confidence}
                onChange={(e) => setConfidence(parseInt(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--color-brand-light)', cursor: 'pointer' }}
                aria-label="Confidence Rating"
              />
            </div>

            {/* Safety Criticality */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Safety Criticality</label>
              <select
                value={criticality}
                onChange={(e) => setCriticality(e.target.value)}
                className="text-input"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }}
              >
                <option value="Standard Facility">Standard Facility Asset</option>
                <option value="Mission Critical / Life Safety">Mission Critical / Life Safety</option>
              </select>
            </div>

            {/* Evidence Completeness */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <label style={{ fontSize: '11px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase' }}>Evidence Metadata Completeness</label>
              <select
                value={evidenceCompleteness}
                onChange={(e) => setEvidenceCompleteness(e.target.value)}
                className="text-input"
                style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', color: '#fff' }}
              >
                <option value="Complete Photo Set">Complete Photo Set & Logs</option>
                <option value="Incomplete/Indeterminate Metadata">Indeterminate/Missing Metadata</option>
              </select>
            </div>

          </div>
        </div>

        {/* Right Column: Comparative Outputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div className="card" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <h2 style={{ fontSize: '16px', fontWeight: 600, color: '#fff' }}>
              3. Comparative Outcomes
            </h2>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              
              {/* Baseline (Before) */}
              <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '16px' }}>
                <span style={{ fontSize: '10px', color: 'var(--text-muted)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Scenario Baseline
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>DECISION STATUS</span>
                    <span className={`badge ${beforeResult.decisionStatus === 'Passed checks' ? 'badge-green' : 'badge-amber'}`} style={{ display: 'block', marginTop: '2px', width: 'fit-content' }}>
                      {beforeResult.decisionStatus}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>RISK LEVEL</span>
                    <span className={`badge ${beforeResult.riskLevel === 'High' ? 'badge-red' : beforeResult.riskLevel === 'Medium' ? 'badge-amber' : 'badge-green'}`} style={{ display: 'block', marginTop: '2px', width: 'fit-content' }}>
                      {beforeResult.riskLevel}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>HUMAN REVIEW REQUIRED</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: beforeResult.reviewRequired === 'Yes' ? 'var(--color-amber)' : '#fff', display: 'block', marginTop: '2px' }}>
                      {beforeResult.reviewRequired}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>RECOMMENDED ACTION</span>
                    <p style={{ fontSize: '12px', color: 'var(--text-secondary)', marginTop: '2px', lineHeight: '1.3' }}>
                      {beforeResult.actionRecommended}
                    </p>
                  </div>
                </div>
              </div>

              {/* Active Simulation (After) */}
              <div style={{ background: 'rgba(2, 132, 199, 0.03)', border: '1px solid var(--color-brand)', borderRadius: '6px', padding: '16px' }}>
                <span style={{ fontSize: '10px', color: 'var(--color-brand-light)', fontWeight: 'bold', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                  Active Simulation
                </span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>DECISION STATUS</span>
                    <span className={`badge ${afterResult.decisionStatus === 'Passed checks' ? 'badge-green' : 'badge-amber'}`} style={{ display: 'block', marginTop: '2px', width: 'fit-content' }}>
                      {afterResult.decisionStatus}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>RISK LEVEL</span>
                    <span className={`badge ${afterResult.riskLevel === 'High' ? 'badge-red' : afterResult.riskLevel === 'Medium' ? 'badge-amber' : 'badge-green'}`} style={{ display: 'block', marginTop: '2px', width: 'fit-content' }}>
                      {afterResult.riskLevel}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>HUMAN REVIEW REQUIRED</span>
                    <span style={{ fontSize: '13px', fontWeight: 'bold', color: afterResult.reviewRequired === 'Yes' ? 'var(--color-amber)' : '#fff', display: 'block', marginTop: '2px' }}>
                      {afterResult.reviewRequired}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '9px', color: 'var(--text-muted)', block: 'true' }}>RECOMMENDED ACTION</span>
                    <p style={{ fontSize: '12px', color: '#fff', fontWeight: 500, marginTop: '2px', lineHeight: '1.3' }}>
                      {afterResult.actionRecommended}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Explanation Impact card */}
          <div className="card" style={{ borderLeft: '4px solid var(--color-brand-light)', padding: '16px' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '4px' }}>
              Decisional Impact Explanation
            </h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', lineHeight: '1.5' }}>
              {getExplanation()}
            </p>
          </div>

        </div>

      </div>

      {/* D. LOGIC DETAILS AND LEDGER PREVIEW */}
      <section className="card">
        <h3 style={{ fontSize: '14px', fontWeight: 600, color: '#fff', marginBottom: '12px' }}>
          Simulated Admissibility Rules Checked
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '12px', fontSize: '12px' }}>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Confidence Gate (Standard)</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Flags any serial scan, photograph matching sequence, or inspector tag reading below 75% confidence limit.</span>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Life-Safety Criticality Rule</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Enforces a stricter 90% confidence threshold and blocks processing immediately on critical/poor conditions.</span>
          </div>
          <div style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '12px' }}>
            <strong style={{ color: '#fff', display: 'block', marginBottom: '4px' }}>Completeness Policy check</strong>
            <span style={{ color: 'var(--text-secondary)' }}>Triggers warnings if camera, location, or inspector timestamp metadata is missing or indeterminate.</span>
          </div>
        </div>

        {/* Collapsible Decisional manifest */}
        <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', marginTop: '16px' }}>
          <details className="expandable-details" style={{ margin: 0 }}>
            <summary>View Simulated Decision Record</summary>
            <div className="raw-json-block mt-3 text-left">
{`{
  "simulation_run": {
    "baseline_scenario": "${activeScenarioKey}",
    "timestamp_est": "2026-07-12T16:34:12Z",
    "inputs": {
      "asset_type": "${assetType}",
      "condition_health": "${condition}",
      "confidence_score": ${confidence},
      "enforced_criticality": "${criticality}",
      "metadata_validation": "${evidenceCompleteness}"
    },
    "outputs": {
      "risk_classification": "${afterResult.riskLevel}",
      "manual_review_triggered": ${afterResult.reviewRequired === 'Yes' ? 'true' : 'false'},
      "decision_status": "${afterResult.decisionStatus}",
      "triggered_enforcements": ${JSON.stringify(afterResult.rulesTriggered)},
      "recommended_action_actionable": "${afterResult.actionRecommended}"
    }
  }
}`}
            </div>
          </details>
        </div>
      </section>

    </div>
  );
}
