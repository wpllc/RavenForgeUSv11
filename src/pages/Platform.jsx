import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, GitBranch, Radio, Cpu, Users, Flame, BookOpen } from 'lucide-react';
import './Platform.css';

const components = [
  { name: 'WAYFINDER + ROOKERY', title: 'Give work a clear owner.', icon: GitBranch, status: 'Bounded ownership and local placement verified', text: 'Route a task, claim it exclusively, retain its outputs, and check the result against acceptance criteria. Interrupted work keeps its evidence so recovery can avoid repeating completed execution.', next: 'The November 21 check found current Wayfinder telemetry. Broader unattended and distributed operation remain under validation.' },
  { name: 'HEIMDALL', title: 'See the incident. Keep the evidence.', icon: Radio, status: 'Bounded incident workflow verified', text: 'Connect monitoring observations to diagnosis, a scoped recovery, and verification. Keep the original finding and the recovery outcome together.', next: 'Coverage and recovery authority remain specific to each monitored service.' },
  { name: 'MUSTER', title: 'Put available compute to work.', icon: Cpu, status: 'Local placement and transport verified', text: 'The existing broker and Wayfinder adapter placed bounded work on Foundry and retained its result. Transport success is checked separately from whether the task output meets its acceptance criteria.', next: 'The current laptop proof is deferred. General cross-device and disconnected fleet operation are not established by this local result.' },
  { name: 'COUNCIL', title: 'Delegate once. Review the result.', icon: Users, status: 'Actor rollout in progress', text: 'Give actors task folders, acceptance criteria, exclusive ownership, and their own continuity. Selected actors have delivered bounded coding tasks with independent verification.', next: 'The full provider roster and general unattended coding are not yet proven.' },
  { name: 'BALEFIRE', title: 'Keep authority inside the task.', icon: Flame, status: 'Scoped controls verified', text: 'Apply bounded execution contracts and review the resulting artifacts. Preserve denied actions and failures instead of treating a completion message as evidence.', next: 'The military demo uses a supplied trust-check flag. It does not demonstrate malware detection, universal operating-system isolation or security certification.' },
  { name: 'WELL OF ME', title: 'Carry context forward.', icon: BookOpen, status: 'Local continuity verified', text: 'Retain source-backed personal context and explicit corrections through governed records. Keep personal context separate from project state and each actor’s continuity.', next: 'Automatic capture across every device, account, and conversation is not yet established.' },
];

export default function Platform() {
  return (
    <article className="platform-page" aria-labelledby="platform-title">
      <section className="platform-hero">
        <div className="platform-kicker"><ShieldCheck size={16} aria-hidden="true" /> RAVENFORGE / DEVELOPMENT PREVIEW</div>
        <h1 id="platform-title">Useful work.<br /><span>Evidence you can follow.</span></h1>
        <p className="platform-lead">RavenForge is software for coordinating tasks, actors, and owner-managed compute—with a clear record of what ran, what changed, and what passed verification.</p>
        <p className="platform-intent">The aim is straightforward: delegate once, keep the context, and review a result you can inspect.</p>
        <div className="platform-actions">
          <a className="platform-button" href="#platform-components">Explore the platform <ArrowRight size={17} aria-hidden="true" /></a>
          <Link className="platform-link" to="/demos">Choose a demonstration <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <p className="platform-attribution">Software by Walker Pollitt · Business: <a href="https://walkerpollittllc.com/">Walker Pollitt LLC</a></p>
      </section>

      <section className="platform-flow" aria-label="Governed work sequence">
        {['Define the task', 'Claim ownership', 'Execute within scope', 'Verify and retain'].map((step, i) => <div key={step}><span>{String(i + 1).padStart(2, '0')}</span>{step}</div>)}
      </section>

      <section id="platform-components" aria-labelledby="components-title">
        <div className="platform-section-heading"><p className="platform-kicker">THE PIECES</p><h2 id="components-title">One workflow, distinct responsibilities.</h2><p>Evidence summary reviewed November 21, 2026. These are bounded development results, not a live health feed or proof of every deployment and integration.</p></div>
        <div className="platform-grid">
          {components.map(({ name, title, icon: Icon, status, text, next }) => <section className="platform-card" key={name} aria-label={name}>
            <div className="platform-card-label"><Icon size={19} aria-hidden="true" /><span>{name}</span></div>
            <h3>{title}</h3><p>{text}</p><div className="platform-status">{status}</div><p className="platform-next">{next}</p>
          </section>)}
        </div>
      </section>

      <section className="platform-evidence" aria-labelledby="evidence-title">
        <div><p className="platform-kicker">WHAT COUNTS</p><h2 id="evidence-title">A result needs more than “done.”</h2></div>
        <div><p>Completed work should have delivered files, independent verification, an accepted check-in, and saved continuity. Tests of an adapter stay separate from a real actor’s execution. Blocked or unknown outcomes stay visible.</p><p>The facility cutaway, military sustainment and Council review tours are published visual scenarios with synthetic inputs and browser-only controls. The mission cockpit is fictional entertainment. These pages do not connect to private runtime services, invoke models or operate equipment.</p><Link className="platform-link" to="/demos">Explore the demo scenarios <ArrowRight size={16} aria-hidden="true" /></Link></div>
      </section>
    </article>
  );
}
