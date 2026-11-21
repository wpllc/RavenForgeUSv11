// Invented measurements, prices and outage scenarios. No live equipment.
export const VERSION = 'northstar-ups3-v1';
export const DEFAULTS = { budget: 250000, hourlyLoss: 40000 };
export const CHAPTERS = [
  ['The facility', 'First, see the whole system.', 'Northstar is a fictional data center. The equipment only tells half the story. The other half is what depends on it.', 'A small equipment problem can become a business problem.', 'Follow the power'],
  ['The dependency', 'Follow the power to the people.', 'Utility power passes through a switchboard, UPS-3 and a distribution panel before reaching 24 racks. The UPS bridges a loss of supply. Its condition matters to everything downstream.', '24 racks depend on this power path.', 'Inspect UPS-3'],
  ['The warning', 'The warning is in the trend.', 'Sample battery runtime falls from 14 to 8 minutes. The demonstration requirement is 10 minutes. That is a reason to investigate, not permission to operate equipment.', '8 minutes available. 10 minutes required.', 'Check the evidence'],
  ['The evidence', 'An answer you can trace.', 'Open the three source records. Check the battery test, the dependency drawing and the planning estimate. Each answer stays connected to its source and its limits.', 'Measurements, assumptions and decisions stay separate.', 'Compare the options'],
  ['The tradeoff', 'Make the tradeoff visible.', 'Compare maintaining, overhauling and replacing the UPS. Change the capital budget or the assumed cost of an outage. The recommendation changes with the assumptions.', 'The cheapest purchase is not always the lowest scenario cost.', 'Make the decision'],
  ['The decision', 'The final call belongs to you.', 'Review the evidence, choose a plan and record a demonstration decision. Changed assumptions or stale evidence require a fresh decision. No equipment is connected.', 'The system explains. A person decides.', 'Start again'],
];
export const SOURCES = [
  { id:'BAT-03', title:'Battery runtime test', type:'Measurement', source:'Fictional maintenance record / TEST-UPS3-017', finding:'8 minutes available at the sample test load; 10 minutes required.', detail:'Test load: 240 kW. Earlier sample results: 14, 13, 12, 11, 9 and 8 minutes. This trend cannot predict a failure date. An engineer would validate loading, temperature and test conditions.', limit:'Synthetic readings. No connection to a real sensor or maintenance system.' },
  { id:'SLD-01', title:'Power dependency drawing', type:'Topology', source:'Fictional single-line drawing / DC01-E-101, revision C', finding:'UPS-3 supplies PDU-A and 24 downstream racks.', detail:'Utility → switchboard SW-1 → UPS-3 → PDU-A → racks A01–A24. Actual redundancy, transfer operation and protection settings have not been validated.', limit:'Illustrative topology, not an engineering drawing or switching procedure.' },
  { id:'EST-09', title:'Five-year planning estimate', type:'Assumption', source:'Fictional planning worksheet / CAPEX-UPS3-009', finding:'Replacement capital: $180,000. Overhaul capital: $48,000.', detail:'Maintain: $0 capital + $30,000/year maintenance + one assumed 8-hour outage. Overhaul: $48,000 + $18,000/year + one assumed 3-hour outage. Replace: $180,000 + $6,000/year + one assumed 0.5-hour outage. Five years; no discounting or residual value.', limit:'Invented costs and outage scenarios, not vendor quotations or failure forecasts.' },
];
export const OPTIONS = [
  { id:'maintain', name:'Maintain', capital:0, annual:30000, hours:8 },
  { id:'overhaul', name:'Overhaul', capital:48000, annual:18000, hours:3 },
  { id:'replace', name:'Replace', capital:180000, annual:6000, hours:0.5 },
];
export function evaluate({budget,hourlyLoss}) {
  if (![budget,hourlyLoss].every(n=>typeof n==='number'&&Number.isFinite(n)&&n>=0)||budget>300000||hourlyLoss>100000) throw new RangeError('Outside demonstration limits');
  const options=OPTIONS.map(o=>({...o,maintenance:o.annual*5,exposure:o.hours*hourlyLoss,total:o.capital+o.annual*5+o.hours*hourlyLoss,affordable:o.capital<=budget}));
  return {options,recommendation:options.filter(o=>o.affordable).reduce((best,o)=>!best||o.total<best.total?o:best,null)};
}
export function gate(reviewed,stale,selected,options) {
  if(stale)return 'Evidence is stale. Restore current demonstration evidence and review it again.';
  if(!SOURCES.every(e=>reviewed.includes(e.id)))return 'Review and mark all three source records before recording a decision.';
  if(!options.some(o=>o.id===selected&&o.affordable))return 'Choose a plan within the capital budget.';
  return null;
}
export function chapterFromSearch(search) {
  const p=new URLSearchParams(search),raw=p.get('chapter')??p.get('step')??'1';
  return /^[1-6]$/.test(raw)?Number(raw)-1:0;
}
export const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n);
