import React from 'react';

const groups = [
  { title: 'Technology programs', items: [
    'NVIDIA Inception program participant',
    'Microsoft Learn Student Ambassador',
    'Copilot Champion — adoption and workflow enablement',
    'Azure Champion',
    'Microsoft Q&A Product Champions',
  ] },
  { title: 'Professional credentials', items: [
    'Lean Six Sigma Black Belt (LSSBB)',
    'FAA Remote Pilot Certificate — small unmanned aircraft systems',
    'Public Trust — Level 2',
  ] },
];

export default function About() {
  return <section aria-labelledby="creator-title" style={{ display: 'grid', gap: '24px', maxWidth: '1000px' }}>
    <header className="hud-panel corners" style={{ padding: '24px' }}>
      <p className="tech-font" style={{ color: 'var(--color-brand-light)' }}>RavenForge / Creator</p>
      <h1 id="creator-title" style={{ fontSize: '2rem', margin: '12px 0' }}>Walker Pollitt</h1>
      <p style={{ lineHeight: 1.7 }}>Creator of RavenForge and founder of Walker Pollitt LLC.
        My work brings systems engineering, infrastructure assessment, technical documentation,
        and AI workflow automation together around decisions that can be traced to evidence.</p>
    </header>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))', gap: '24px' }}>
      {groups.map(group => <article key={group.title} className="hud-panel corners" style={{ padding: '24px' }}>
        <h2 style={{ fontSize: '1.15rem', marginBottom: '16px' }}>{group.title}</h2>
        <ul style={{ paddingLeft: '20px', lineHeight: 1.8 }}>{group.items.map(item => <li key={item}>{item}</li>)}</ul>
      </article>)}
    </div>
    <article className="hud-panel corners" style={{ padding: '24px', lineHeight: 1.8 }}>
      <h2 style={{ fontSize: '1.15rem' }}>Professional connections</h2>
      <p>Walker Pollitt LLC · small business registered on SAM.gov for federal contract bidding.</p>
      <p><a href="https://learn.microsoft.com/training/?wt.mc_id=studentamb_521824" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'underline' }}>Explore Microsoft Learn with my Student Ambassador link</a></p>
      <p><a href="https://www.linkedin.com/in/walker-pollitt" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-brand-light)', textDecoration: 'underline' }}>Walker Pollitt on LinkedIn</a></p>
      <p><a href="https://walkerpollittllc.com/" style={{ color: 'var(--color-brand-light)', textDecoration: 'underline' }}>Business &amp; engineering portfolio — Walker Pollitt LLC</a></p>
    </article>
  </section>;
}
