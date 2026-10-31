import { SCENARIOS, SYSTEM_KEYS, SYSTEM_NAMES } from './scenarios.js';
import { generateIncident, issueOrder, advanceCycle, incidentReport, isValidSave } from './engine.js';

const $ = id => document.getElementById(id);
const STORAGE_KEY='starsilk_command_save_v1';
const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let game=null;
const nameFor={repair:'REPAIR',scan:'SCAN',rescue:'EVAC',transmit:'UPLINK',isolate:'ISOLATE',deliver:'DELIVERY',preserve:'ARCHIVE',withdraw:'DEPART',stabilize:'COURSE',treat:'TREAT'};
function readSaved(){try{const parsed=JSON.parse(localStorage.getItem(STORAGE_KEY)||'null');if(!isValidSave(parsed))return null;const real=SCENARIOS.find(s=>s.id===parsed.id);if(!real)return null;parsed.scenario=real;return parsed;}catch{return null;}}
function save(){if(!game)return;try{localStorage.setItem(STORAGE_KEY,JSON.stringify(game));}catch{feedback('Local storage unavailable. Export the report before closing this tab.',true);}}
function feedback(message,isError=false){$('command-feedback').textContent=message;$('command-feedback').classList.toggle('error',isError);}
function populateScenarios(){const era=$('era-select').value;const previous=$('scenario-select').value;$('scenario-select').innerHTML='<option value="random">Random eligible incident</option>'+SCENARIOS.filter(s=>era==='ALL'||s.era===era).map(s=>`<option value="${esc(s.id)}">${esc(s.title)} — ${esc(s.era==='WARTIME'?'War':'Aftermath')}</option>`).join('');if([...$('scenario-select').options].some(o=>o.value===previous))$('scenario-select').value=previous;}
function randomSeed(){if(window.crypto?.getRandomValues){const a=new Uint32Array(1);window.crypto.getRandomValues(a);return a[0]||1;}return Math.floor(Math.random()*4294967295)+1;}
function start(seed,scenarioId,era='ALL'){
  try{game=generateIncident(seed,scenarioId,era);}catch(e){alert(e.message);return;}
  save();showGame();feedback('Incident active. Observe the system readings before issuing orders.');
}
function showLobby(){ $('lobby').hidden=false;$('game').hidden=true;$('resume-btn').hidden=!readSaved();window.scrollTo({top:0,behavior:'instant'}); }
function showGame(){ $('lobby').hidden=true;$('game').hidden=false;render();window.scrollTo({top:0,behavior:'instant'}); }
function command(text){
  if(!game)return;
  if(/^\s*(withdraw|escape|depart|retreat|leave sector)\b/i.test(text) && !window.confirm('Withdrawal ends this incident after two simulated cycles. Unrecovered lives and evidence remain lost or unverified. Continue?'))return;
  const result=issueOrder(game,text);if(result.state)game=result.state;
  feedback(result.message,!result.ok);save();render();
}
function tick(){if(!game)return;const result=advanceCycle(game);if(result.state)game=result.state;feedback(result.message,!result.ok);save();render();}
function statCell(label,value){return `<div class="store"><span>${esc(label)}</span><strong>${esc(value)}</strong></div>`;}
function reportVal(){const r=incidentReport(game);return r?.objective||{label:'Objective',value:0,target:0};}
function render(){
  if(!game)return;const s=game;const closed=s.status==='CLOSED';const o=reportVal();
  $('scenario-era').textContent=s.scenario.year===null?`${s.scenario.era} / UNDATED INCIDENT`:`${s.scenario.era} / YEAR ${s.scenario.year}`;
  $('scenario-title').textContent=s.scenario.title;$('scenario-place').textContent=s.scenario.location;
  $('elapsed').textContent=`${String(Math.floor(s.tick/2)).padStart(2,'0')}:${s.tick%2?'30':'00'}`;
  $('orders').textContent=String(s.ordersLeft).padStart(2,'0');$('air').textContent=`${Math.round(s.air)}%`;
  $('thermal').textContent=`${Math.round(s.temperature)}%`;$('display-seed').textContent=String(s.seed).padStart(10,'0');
  $('world-view').dataset.map=s.scenario.map;
  $('map-left').textContent=s.scenario.location.toUpperCase();$('map-right').textContent=s.scenario.era==='WARTIME'?'WARTIME / SIGNAL DISTORTED':'AFTERMATH / LOCAL GRID';
  $('hazard-name').textContent=s.scenario.threat.toUpperCase();$('hazard-value').textContent=`${Math.round(s.hazard)}%`;
  $('hazard-fill').style.width=`${s.hazard}%`;$('scenario-brief').textContent=s.scenario.brief;$('scenario-objective').textContent=s.scenario.objective;
  $('objective-count').textContent=`${o.value} / ${o.target}`;$('objective-label').textContent=o.label.toUpperCase();
  $('signals').innerHTML=s.signals.slice(0,3).map(x=>`<p>${esc(x)}</p>`).join('');
  $('systems').innerHTML=SYSTEM_KEYS.map(k=>{const v=s.systems[k];const danger=v<35;return `<div class="system ${danger?'below':''}"><div class="system-head"><span class="system-label">${esc(SYSTEM_NAMES[k]).toUpperCase()}</span><strong class="system-value">${Math.round(v)}%</strong></div><div class="meter"><span style="width:${Math.max(0,Math.min(100,v))}%${danger?';background:#cb7f7c':''}"></span></div><div class="system-meta"><span>${danger?'CRITICAL':v<60?'DEGRADED':'FUNCTIONAL'}</span><button type="button" data-command="repair ${k}" ${closed||s.ordersLeft<=0||s.supplies.parts<=0||v>=96?'disabled':''} aria-label="Assign an engineer to repair ${esc(SYSTEM_NAMES[k])}">ASSIGN REPAIR ↗</button></div></div>`}).join('');
  $('stores-values').innerHTML=statCell('REPAIR KITS',s.supplies.parts)+statCell('MEDICAL KITS',s.supplies.medical)+statCell('MANEUVERING',s.supplies.fuel)+(s.scenario.type==='cargo'?statCell('VIABLE AID',s.supplies.cargo):statCell('EVIDENCE',s.evidence));
  $('power-readout').textContent=`POWER PRIORITY / ${s.powerFocus}`;
  $('crew-count').textContent=`${s.crew.filter(c=>c.alive).length} ACTIVE`;
  $('crew-list').innerHTML=s.crew.map((c,i)=>`<div class="crew-item ${c.alive?'':'dead'}"><span class="crew-index">${String(i+1).padStart(2,'0')}</span><div class="crew-main"><strong>${esc(c.name)}</strong><div class="crew-meta">${esc(c.role).toUpperCase()} · FATIGUE ${Math.round(c.fatigue)}%</div><div class="crew-job">${c.alive?c.job?`${esc(nameFor[c.job.type]||c.job.type)} / ${c.job.remaining} CYCLE(S)`:'AVAILABLE':'DECEASED — FINAL'}</div></div><span class="crew-health">${Math.round(c.health)}%</span></div>`).join('');
  const actions=[['SCAN','scan'],['COOLING','repair cooling'],['HULL','repair hull'],['COURSE','stabilize'],['UPLINK','transmit'],['TREAT','treat'],['LIFE PRIORITY','prioritize life support'],['WITHDRAW','withdraw']];
  if(s.scenario.type==='rescue') actions.splice(1,0,['RESCUE','rescue']);
  if(['archive','evidence'].includes(s.scenario.type))actions.splice(1,0,['PRESERVE','preserve']);
  if(s.scenario.type==='cargo')actions.splice(1,0,['DELIVER','deliver']);
  if(s.scenario.effect==='hush')actions.splice(1,0,['ISOLATE','isolate']);
  $('quick-orders').innerHTML=actions.map(([label,text])=>`<button type="button" data-command="${esc(text)}" ${closed||s.ordersLeft<=0?'disabled':''}>${esc(label)}</button>`).join('');
  $('advance-btn').disabled=closed;$('send-order').disabled=closed;$('command-input').disabled=closed;
  $('event-log').innerHTML=s.log.slice().reverse().map(x=>`<li class="${esc(x.tone)}"><span class="event-time">T + ${String(x.tick).padStart(2,'0')} CYCLES</span>${esc(x.text)}</li>`).join('');
  $('report-panel').hidden=!closed;
  if(closed)renderReport();
}
function renderReport(){const r=incidentReport(game);if(!r)return;
  $('report-stats').innerHTML=statCell('OUTCOME',r.outcome)+statCell('LIVING CREW',`${r.crewSurviving}/${r.crewTotal}`)+statCell(r.objective.label.toUpperCase(),`${r.objective.value}/${r.objective.target}`)+statCell('VERIFIED UPLINK',r.reportSent?'RECEIVED':'ABSENT');
  const good=r.crewSurviving>0&&r.objective.value>=r.objective.target;
  $('report-conclusion').textContent=good?'The local objective was achieved. What happened elsewhere remains beyond this vessel’s knowledge.':r.crewSurviving===0?'No crew survived to provide testimony. The event ledger records only what the instruments resolved.':'The operation has ended with incomplete objectives. The losses and unanswered signals remain in the record.';
}
function exportReport(){if(!game)return;const r=incidentReport(game);const b=new Blob([r.report],{type:'text/plain;charset=utf-8'});const url=URL.createObjectURL(b);const a=document.createElement('a');a.href=url;a.download=`starsilk-incident-${game.seed}.txt`;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function goArchive(){if(game?.status==='ACTIVE'&&!confirm('Leave this incident view? The current state is autosaved and can be resumed.'))return;showLobby();}
$('era-select').addEventListener('change',populateScenarios);
$('launch-form').addEventListener('submit',e=>{e.preventDefault();const v=$('seed-input').value.trim();if(v&&(!/^\d{1,10}$/.test(v)||Number(v)>4294967295)){alert('The seed must be an unsigned 32-bit number (0–4294967295).');return;}start(v?Number(v):randomSeed(),$('scenario-select').value,$('era-select').value);});
$('resume-btn').addEventListener('click',()=>{const saved=readSaved();if(saved){game=saved;showGame();feedback('Local operation restored.');}else alert('No valid saved incident was found.');});
$('command-form').addEventListener('submit',e=>{e.preventDefault();const v=$('command-input').value;command(v);$('command-input').value='';$('command-input').focus();});
$('game').addEventListener('click',e=>{const b=e.target.closest('[data-command]');if(b&&!b.disabled)command(b.dataset.command);});
$('advance-btn').addEventListener('click',tick);$('return-btn').addEventListener('click',goArchive);$('export-btn').addEventListener('click',exportReport);
$('replay-btn').addEventListener('click',()=>start(game.seed,game.id));$('next-btn').addEventListener('click',()=>start(randomSeed(),'random'));
populateScenarios();$('resume-btn').hidden=!readSaved();
if('serviceWorker' in navigator && (location.protocol==='https:'||location.hostname==='localhost'))navigator.serviceWorker.register('./sw.js').catch(()=>{});
