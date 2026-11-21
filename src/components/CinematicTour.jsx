import React,{useEffect,useState} from 'react';
import {ArrowLeft,ArrowRight,RotateCcw} from 'lucide-react';
import './CinematicTour.css';

function cropFor(kind,current){
 if(current.frame)return current.frame.join(' ');
 const base=kind==='military'?{y:250,h:550}:kind==='council'?{y:185,h:620}:{y:240,h:560};
 const zoom=current.zoom||1,[ox,oy]=(current.origin||'50% 50%').split(' ').map(Number.parseFloat),w=1672/zoom,h=base.h/zoom;
 return `${(1672-w)*ox/100} ${base.y+(base.h-h)*oy/100} ${w} ${h}`;
}
export default function CinematicTour({kind,title,subtitle,image,alt,steps,inspectId,stepIndex,onStepChange,sceneContent,sceneControls,visualId,onInspect}){
 const [localStep,setLocalStep]=useState(0),[loadedSrc,setLoadedSrc]=useState(null),[failedSrc,setFailedSrc]=useState(null),[attempt,setAttempt]=useState(0);
 useEffect(()=>{setLocalStep(0);setAttempt(0);},[image]);
 const step=stepIndex??localStep,setStep=onStepChange||setLocalStep,current=steps[step]||steps[0],sceneImage=current.image||image,src=attempt?`${sceneImage}?retry=${attempt}`:sceneImage,imageState=loadedSrc===src?'loaded':failedSrc===src?'error':'loading';
 const inspect=()=>{if(onInspect){onInspect();return;}const panel=document.getElementById(inspectId);if(panel){panel.open=true;panel.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'});}};
 return <section className={'ct-tour ct-'+kind} aria-label={title+' guided scene'}>
  <header className="ct-title"><p>RAVENFORGE / GUIDED SCENARIO</p><h1>{title}</h1><span>{subtitle}</span></header>
  <div id={visualId} className={'ct-scene'+(sceneContent?' ct-live-scene':'')+(current.frame?' ct-story-scene':'')} aria-label={sceneContent?current.title:alt} role={sceneContent||sceneControls?'region':'img'}>
   {sceneContent?<div className="ct-live-content">{sceneContent}</div>:<>
    <img className="ct-image-check" src={src} alt="" onLoad={()=>setLoadedSrc(src)} onError={()=>setFailedSrc(src)} fetchPriority="high"/>
    <svg className="ct-art" viewBox={cropFor(kind,current)} preserveAspectRatio="xMidYMid slice" aria-hidden="true"><image href={src} x="0" y="0" width="1672" height="941"/></svg>
    {imageState==='loading'&&<p className="ct-image-message" role="status">Loading the scene…</p>}
    {imageState==='error'&&<div className="ct-image-message" role="alert"><p>The scene image could not load.</p><button type="button" onClick={()=>{setAttempt(n=>n+1);}}>Retry image</button><a href={sceneImage} target="_blank" rel="noreferrer">Open the image directly</a></div>}
    <span className="ct-scene-label">ILLUSTRATIVE SCENE · {kind==='military'?'AUTHORIZED DEVICES':kind==='facility'?'SYNTHETIC FACILITY':'SCRIPTED REVIEW'}</span>
    {!current.frame&&<div className="ct-focus" style={{left:current.x||'50%',top:current.y||'50%'}}><span>{String(step+1).padStart(2,'0')}</span><i/></div>}
    {sceneControls}
    <span className="ct-counter">{String(step+1).padStart(2,'0')} / {String(steps.length).padStart(2,'0')}</span>
   </>}
  </div>
  <nav className="ct-steps" aria-label="Scene steps">{steps.map((s,i)=><button type="button" key={s.label} onClick={()=>setStep(i)} aria-current={step===i?'step':undefined}><span>{i+1}</span>{s.label}</button>)}</nav>
  <div className="ct-story" aria-live="polite"><div><p className="ct-system">{current.system}</p><h2>{current.title}</h2><p>{current.text}</p>{current.action&&<button className="ct-experiment" type="button" onClick={()=>{current.action();inspect();}}>{current.actionLabel}<ArrowRight size={16}/></button>}</div><div className="ct-navigation"><button className="ct-next" type="button" onClick={()=>step===steps.length-1?inspect():setStep(step+1)}>{step===steps.length-1?'Try it yourself':current.next||'Show me the next step'}<ArrowRight size={18}/></button><div><button type="button" aria-label="Previous scene step" disabled={step===0} onClick={()=>setStep(step-1)}><ArrowLeft size={17}/></button><button type="button" onClick={()=>setStep(0)}><RotateCcw size={14}/>Start again</button><button type="button" onClick={inspect}>{kind==='facility'?'Inspect the evidence':'Open the controls'}</button></div></div></div>
 </section>;
}
