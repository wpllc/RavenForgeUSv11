// RavenForge Demo Dataset (Clearly labeled simulated/demonstration data)

export const DEMO_DATA_LABEL = "DEMONSTRATION DATASET (SIMULATED FOR AUDIT PROOF)";

export const projectSummary = {
  name: "Facility Condition Assessment",
  totalPhotos: 96,
  photoSequences: 13,
  uniqueAssets: 8,
  priorityFindings: 3,
  reviewQueueItems: 2,
  validationTestsPassed: 32,
  status: "COMPLETE",
  lastUpdated: "2026-07-12 09:30:12"
};

export const assetsList = [
  {
    id: "AHU-02",
    name: "AHU 02",
    location: "Building A, Mechanical Room 104",
    condition: "Poor",
    confidence: 0.92,
    priority: "High",
    findings: "Visible corrosion and accumulated moisture were detected near the lower cabinet. The equipment nameplate indicates that the unit may be beyond its expected service period.",
    recommendation: "Schedule a mechanical inspection and develop a replacement cost estimate during the current planning cycle.",
    evidenceDetails: [
      "Corrosion visible in photographs IMG_0031.JPG through IMG_0034.JPG",
      "Equipment age derived from nameplate information",
      "Condition pattern consistent across four photographs",
      "Location confirmed through inspection sequence metadata"
    ],
    photoCount: 14,
    technicalFields: {
      serialNumber: "AHU-90214-X",
      manufacturer: "Trane",
      installYear: 2008,
      calculatedAge: 18,
      designLifeYears: 15,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: [
        { rule: "RULE-LIFE-EXPECTANCY", status: "VIOLATED", detail: "Calculated age (18 yrs) exceeds design life (15 yrs)" },
        { rule: "RULE-CORROSION-LIMIT", status: "TRIGGERED", detail: "Corrosion coverage > 15% estimated on cabinet floor" }
      ]
    }
  },
  {
    id: "AHU-01",
    name: "AHU 01",
    location: "Building A, Mechanical Room 104",
    condition: "Good",
    confidence: 0.98,
    priority: "Routine",
    findings: "Cabinet is clean, dry, and free of visible corrosion. Vibration dampening mounts are in good condition. Maintenance log records consistent service history.",
    recommendation: "Continue regular quarterly filter replacements and motor checks as scheduled.",
    evidenceDetails: [
      "No anomalies flagged in photographs IMG_0010.JPG through IMG_0024.JPG",
      "Serial matching active log database registries"
    ],
    photoCount: 15,
    technicalFields: {
      serialNumber: "AHU-90213-X",
      manufacturer: "Trane",
      installYear: 2021,
      calculatedAge: 5,
      designLifeYears: 15,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: [
        { rule: "RULE-LIFE-EXPECTANCY", status: "PASS", detail: "Age within boundaries" }
      ]
    }
  },
  {
    id: "PUMP-02",
    name: "Pump 02",
    location: "Building A, Basement Utility Room",
    condition: "Critical",
    confidence: 0.88,
    priority: "Critical",
    findings: "Main cooling loop Pump 02 shows active coolant leakage and abnormal thermal signature in infrared frames. Bearing noise reported by field inspector.",
    recommendation: "Dispatch maintenance immediately to repair seals and engage secondary backup loop.",
    evidenceDetails: [
      "Moisture pool identified in IMG_0045.JPG",
      "Thermal hotspot verified in IR_0012.JPG",
      "Inspector voice report: 'Severe bearing screech detected during operation'"
    ],
    photoCount: 8,
    technicalFields: {
      serialNumber: "PUMP-402-A",
      manufacturer: "Bell & Gossett",
      installYear: 2012,
      calculatedAge: 14,
      designLifeYears: 20,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: [
        { rule: "RULE-COOLANT-INTEGRITY", status: "VIOLATED", detail: "Fluid leak identified on floor mount" }
      ]
    }
  },
  {
    id: "PUMP-01",
    name: "Pump 01",
    location: "Building A, Basement Utility Room",
    condition: "Fair",
    confidence: 0.94,
    priority: "Monitor",
    findings: "Minor paint chipping and surface rusting on support frame. No signs of fluid leakage or mechanical anomalies. Performance outputs are stable.",
    recommendation: "Apply rust-inhibiting coating to the support frame during next maintenance round.",
    evidenceDetails: [
      "Minor rust visible in photographs IMG_0041.JPG through IMG_0043.JPG"
    ],
    photoCount: 6,
    technicalFields: {
      serialNumber: "PUMP-401-A",
      manufacturer: "Bell & Gossett",
      installYear: 2012,
      calculatedAge: 14,
      designLifeYears: 20,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: [
        { rule: "RULE-COOLANT-INTEGRITY", status: "PASS", detail: "No leaks detected" }
      ]
    }
  },
  {
    id: "CHILLER-01",
    name: "Chiller 01",
    location: "Building B, Rooftop Chiller Deck",
    condition: "Good",
    confidence: 0.97,
    priority: "Routine",
    findings: "Compressors and condenser coils show nominal operation temperatures. No refrigerant leaks detected by sniffing sensors. Frame mounts intact.",
    recommendation: "Maintain monthly compressor diagnostic tracking logs.",
    evidenceDetails: [
      "Coil scan photos show clear fins: IMG_0055.JPG through IMG_0062.JPG"
    ],
    photoCount: 12,
    technicalFields: {
      serialNumber: "CH-0914-A",
      manufacturer: "York",
      installYear: 2019,
      calculatedAge: 7,
      designLifeYears: 25,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: []
    }
  },
  {
    id: "CHILLER-02",
    name: "Chiller 02",
    location: "Building B, Rooftop Chiller Deck",
    condition: "Fair",
    confidence: 0.91,
    priority: "Monitor",
    findings: "Compressor 2 shows minor thermal drift. Nameplate serial number is obscured by dirt and grease, resulting in low OCR confidence (64%).",
    recommendation: "Confirm equipment serial number manually and wipe nameplate clean.",
    evidenceDetails: [
      "OCR failure flagged in nameplate photo IMG_0068.JPG"
    ],
    photoCount: 10,
    technicalFields: {
      serialNumber: "CH-0915-[UNCERTAIN]",
      manufacturer: "York",
      installYear: 2019,
      calculatedAge: 7,
      designLifeYears: 25,
      revalidationStatus: "ESCALATED",
      ruleChecks: [
        { rule: "RULE-DATA-COMPLETENESS", status: "FAILED", detail: "Serial number confidence is below admissibility limit (75%)" }
      ]
    }
  },
  {
    id: "FIRE-EXT-01",
    name: "Fire Extinguisher 01",
    location: "Building B, Corridor 201",
    condition: "Critical",
    confidence: 0.82,
    priority: "Action Required",
    findings: "Inspection tag has expired (last inspection dated October 2024). Pressure gauge is in the warning zone (low charge).",
    recommendation: "Re-inspect, re-charge, and re-tag extinguisher immediately to maintain building code compliance.",
    evidenceDetails: [
      "Expired inspection tag visible in IMG_0082.JPG",
      "Pressure gauge reading low in close-up photo IMG_0083.JPG"
    ],
    photoCount: 4,
    technicalFields: {
      serialNumber: "FE-8814",
      manufacturer: "Kidde",
      installYear: 2020,
      calculatedAge: 6,
      designLifeYears: 10,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: [
        { rule: "RULE-FIRE-COMPLIANCE", status: "VIOLATED", detail: "Inspection interval (12 months) exceeded" }
      ]
    }
  },
  {
    id: "FIRE-EXT-02",
    name: "Fire Extinguisher 02",
    location: "Building B, Lobby",
    condition: "Good",
    confidence: 0.99,
    priority: "Routine",
    findings: "Extinguisher is properly mounted, pressure gauge is in the green zone, and inspection tag is active (current through December 2026).",
    recommendation: "Continue standard monthly physical compliance checks.",
    evidenceDetails: [
      "Tag details clear in photo IMG_0088.JPG"
    ],
    photoCount: 4,
    technicalFields: {
      serialNumber: "FE-8815",
      manufacturer: "Kidde",
      installYear: 2022,
      calculatedAge: 4,
      designLifeYears: 10,
      revalidationStatus: "ADMISSIBLE",
      ruleChecks: []
    }
  }
];

export const findingsList = [
  {
    id: "FIND-001",
    title: "Cabinet Corrosion and Moisture Accumulation",
    asset: "AHU 02",
    location: "Building A, Mechanical Room 104",
    severity: "Action Required",
    confidence: 0.92,
    action: "Schedule a mechanical inspection and develop a replacement cost estimate during the current planning cycle.",
    evidenceCount: 4,
    humanReviewStatus: "COMPLETED",
    decisionStatus: "ADMISSIBLE"
  },
  {
    id: "FIND-002",
    title: "Coolant Leakage and Hotspot Bearings",
    asset: "Pump 02",
    location: "Building A, Basement Utility Room",
    severity: "Critical",
    confidence: 0.88,
    action: "Dispatch maintenance immediately to repair seals and engage secondary backup loop.",
    evidenceCount: 3,
    humanReviewStatus: "COMPLETED",
    decisionStatus: "ADMISSIBLE"
  },
  {
    id: "FIND-003",
    title: "Expired Inspection Tag and Low Pressure",
    asset: "Fire Extinguisher 01",
    location: "Building B, Corridor 201",
    severity: "Action Required",
    confidence: 0.82,
    action: "Re-inspect, re-charge, and re-tag extinguisher immediately to maintain safety code compliance.",
    evidenceCount: 2,
    humanReviewStatus: "COMPLETED",
    decisionStatus: "ADMISSIBLE"
  }
];

export const reviewQueueList = [
  {
    id: "REV-001",
    title: "Confirm Equipment Serial Number",
    reason: "OCR text recognition returned low confidence (64%) due to grease and direct lighting reflections on the tag surface.",
    asset: "Chiller 02",
    evidence: "IMG_0068.JPG (Rooftop Chiller nameplate close-up)",
    confidence: 0.64,
    suggestedAction: "Read close-up photo and input corrected text key, or dispatch field check to wipe nameplate and re-photograph.",
    status: "PENDING"
  },
  {
    id: "REV-002",
    title: "Verify Active Water Intrusion",
    reason: "Pixel analysis detected moisture discoloration patterns on basement concrete base, but cannot distinguish if actively leaking or old staining.",
    asset: "Basement Wall",
    evidence: "IMG_0048.JPG (Pump 02 floor mounting close-up)",
    confidence: 0.72,
    suggestedAction: "Review inspector observations log or direct inspection team to verify active seepage prior to seal repair schedule.",
    status: "PENDING"
  }
];

export const reportsList = [
  {
    id: "REP-001",
    name: "Executive Summary Report",
    audience: "C-Suite & Portfolio Managers",
    description: "High-level overview of facility health, prioritized replacement budgets, and overall risk levels.",
    lastGenerated: "10 minutes ago"
  },
  {
    id: "REP-002",
    name: "Asset Register Ledger",
    audience: "Facilities Maintenance & Operations",
    description: "Detailed inventory spreadsheet mapping all 8 unique assets, serial numbers, locations, and conditions.",
    lastGenerated: "5 minutes ago"
  },
  {
    id: "REP-003",
    name: "Priority Findings Report",
    audience: "Risk Managers & Capital Planners",
    description: "Drilldown of the 3 critical action items, photo evidence references, and estimated cost of deficiencies.",
    lastGenerated: "8 minutes ago"
  },
  {
    id: "REP-004",
    name: "Evidence Ledger Package",
    audience: "Auditors & Compliance Officers",
    description: "Exportable package linking all 96 raw photographs, EXIF GPS timestamps, and ingestion hashes.",
    lastGenerated: "3 minutes ago"
  },
  {
    id: "REP-005",
    name: "Human Review Action Log",
    audience: "Quality Control Supervisors",
    description: "Traceable log of all manual overrides, serial corrections, and user approval confirmations.",
    lastGenerated: "12 minutes ago"
  },
  {
    id: "REP-006",
    name: "Chained Audit Package",
    audience: "External Regulators & Auditors",
    description: "Irrevocable record of all system decisions, rule triggers, and revalidation ticks with proof digests.",
    lastGenerated: "1 minute ago"
  }
];

export const auditTimelineList = [
  { timestamp: "09:00:15", actor: "FIELD-INSPECTOR-APP", action: "Evidence Received", evidence: "96 raw photos, GPS metadata payload", result: "Ingested into intake queue" },
  { timestamp: "09:00:22", actor: "RAVENFORGE-NORMALIZER", action: "Asset Candidate Created", evidence: "Nameplate extraction OCR rules", result: "Extracted York and Trane nameplate fields" },
  { timestamp: "09:00:45", actor: "RAVENFORGE-ANALYZER", action: "Duplicate Photographs Grouped", evidence: "Visual similarity hashes", result: "96 photos consolidated into 13 sequences" },
  { timestamp: "09:01:10", actor: "RAVENFORGE-MATCH-ENGINE", action: "Asset Identity Confirmed", evidence: "Prior inventory registration database", result: "8 unique assets mapped to structural records" },
  { timestamp: "09:01:30", actor: "RAVENFORGE-RULE-SYSTEM", action: "Condition Finding Generated", evidence: "Corrosion and thermal leakage classifiers", result: "3 priority findings flagged in system register" },
  { timestamp: "09:01:45", actor: "RAVENFORGE-GOVERNANCE", action: "Human Review Requested", evidence: "Confidence threshold checks (<75%)", result: "2 review cards queued for manual verification" },
  { timestamp: "09:02:15", actor: "QC-OPERATOR-1", action: "Recommendation Approved", evidence: "Override confirmation details", result: "Chiller 02 serial resolved to CH-0915-B" },
  { timestamp: "09:02:40", actor: "SYSTEM-REPORT-ENGINE", action: "Report Exported", evidence: "SHA256 signature chain digest", result: "Chained Audit Package compiled and signed" }
];

// Generate 96 photo evidence ledger list for search / display
export const evidenceLedger = Array.from({ length: 96 }, (_, i) => {
  const imgNum = String(i + 1).padStart(4, '0');
  let assetName = "General Environment";
  let confidence = 0.95;
  if (i < 15) { assetName = "AHU 01"; confidence = 0.98; }
  else if (i < 29) { assetName = "AHU 02"; confidence = 0.92; }
  else if (i < 37) { assetName = "Pump 02"; confidence = 0.88; }
  else if (i < 43) { assetName = "Pump 01"; confidence = 0.94; }
  else if (i < 55) { assetName = "Chiller 01"; confidence = 0.97; }
  else if (i < 65) { assetName = "Chiller 02"; confidence = 0.91; }
  else if (i < 69) { assetName = "Fire Extinguisher 01"; confidence = 0.82; }
  else if (i < 73) { assetName = "Fire Extinguisher 02"; confidence = 0.99; }

  return {
    id: `IMG_${imgNum}.JPG`,
    source: "Field Inspection iOS Client",
    timestamp: "2026-07-11 14:24:05",
    gps: `34.7214° N, 118.4092° W`,
    asset: assetName,
    confidence: confidence,
    status: confidence < 0.85 ? "FLAGGED_FOR_REVIEW" : "NORMALIZED",
    digest: `0x8f2d${Math.floor(Math.random() * 9000 + 1000)}b9c`
  };
});
