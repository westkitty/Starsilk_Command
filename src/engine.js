import { SYSTEM_KEYS, SYSTEM_NAMES, generateIncident } from './scenarios.js';
export { generateIncident } from './scenarios.js';

const clamp = (v,min=0,max=100) => Math.max(min,Math.min(max,v));
const round = n => Math.round(n*10)/10;
const addLog = (s, text, tone='info') => {s.log.push({tick:s.tick,text,tone}); if(s.log.length>100)s.log.splice(0,s.log.length-100);};
const crewByRole = (s,role) => s.crew.find(c=>c.alive && c.role===role && !c.job && c.health>18);
const working = (s,type) => s.crew.some(c=>c.job?.type===type && c.alive);

export function parseOrder(input) {
  const t = String(input??'').toLowerCase().trim().replace(/[^a-z0-9\s'-]/g,' ').replace(/\s+/g,' ');
  if(!t) return {type:'invalid'};
  if(/^(help|commands|instructions|what can i do)$/.test(t)) return {type:'help'};
  if(/^(status|report status|inspect|ship status)$/.test(t)) return {type:'status'};
  const repair=t.match(/(?:repair|fix|patch|restore)\s+(?:the\s+)?(hull|cooling|reactor|life support|navigation|comms|communications|power core|thermal regulation|nav)/);
  if(repair){const map={'life support':'life','navigation':'nav','comms':'comms','communications':'comms','power core':'reactor','thermal regulation':'cooling','nav':'nav'};return {type:'repair',target:map[repair[1]]||repair[1]};}
  const prioritize=t.match(/(?:prioritize|priority|route power to|focus power on)\s+(?:the\s+)?(life support|cooling|propulsion|navigation|balanced)/);
  if(prioritize) return {type:'priority',target:prioritize[1]==='life support'?'LIFE':prioritize[1]==='propulsion'||prioritize[1]==='navigation'?'NAV':prioritize[1]==='cooling'?'COOLING':'BALANCED'};
  if(/\b(isolate|disconnect|manual override|cut automation|shut down automation)\b/.test(t))return {type:'isolate'};
  if(/\b(evacuate|rescue|extract|retrieve survivors|recover civilians)\b/.test(t))return {type:'rescue'};
  if(/\b(deliver|distribute|unload|offload)\b/.test(t))return {type:'deliver'};
  if(/\b(preserve|copy archive|archive|secure records|backup records)\b/.test(t))return {type:'preserve'};
  if(/\b(scan|survey|calibrate|diagnose|check readings)\b/.test(t))return {type:'scan'};
  if(/\b(transmit|send report|send evidence|broadcast|uplink)\b/.test(t))return {type:'transmit'};
  if(/\b(stabilize|correct course|hold position|adjust course|steady trajectory)\b/.test(t))return {type:'stabilize'};
  if(/\b(treat|triage|medical care|heal)\b/.test(t))return {type:'treat'};
  if(/\b(withdraw|escape|depart|retreat|leave sector)\b/.test(t))return {type:'withdraw'};
  return {type:'unknown'};
}

function reject(state, reason){return {state,ok:false,message:reason};}
function accept(state,desc){state.ordersLeft-=1;addLog(state,desc,'order');return {state,ok:true,message:desc};}
function assign(s,role,job,desc,cost={}){
  const c=crewByRole(s,role);
  if(!c)return reject(s,`No available ${role.toLowerCase()} for that assignment. Complete the current job or preserve crew health.`);
  for(const [resource,qty] of Object.entries(cost)){
    if((s.supplies[resource]||0)<qty)return reject(s,`Insufficient ${resource} for this order.`);
  }
  for(const [resource,qty] of Object.entries(cost))s.supplies[resource]-=qty;
  c.job={...job,remaining:job.duration};
  return accept(s,`${c.name} (${role.toLowerCase()}): ${desc} · ${job.duration} cycle${job.duration===1?'':'s'}.`);
}

/** Pure state transition. No model, network, or clock can write to this state. */
export function issueOrder(current,raw){
  if(!current || current.status!=='ACTIVE')return reject(current,'There is no active incident.');
  const s=structuredClone(current);const cmd=parseOrder(raw);
  if(cmd.type==='help')return {state:s,ok:true,message:'Orders: repair [system], rescue, scan, preserve, transmit, stabilize, treat, isolate, deliver, prioritize [cooling/life support/navigation/balanced], withdraw. Assign up to two orders before advancing one cycle.'};
  if(cmd.type==='status')return {state:s,ok:true,message:`${s.scenario.threat}: ${Math.round(s.hazard)}%. Air ${Math.round(s.air)}%, temperature ${Math.round(s.temperature)}%. Crew active ${s.crew.filter(c=>c.alive).length}/5.`};
  if(/\b(do not|don't|never|avoid|cancel|stop)\s+(withdraw|escape|depart|retreat|leave|repair|rescue|evacuate|transmit|send|deliver|scan)\b/.test(String(raw).toLowerCase()))return reject(s,'Negated instructions are not executed. Issue an affirmative, single-action directive.');
  if(cmd.type==='invalid'||cmd.type==='unknown')return reject(s,'Command not recognized. Try “repair cooling”, “scan”, “rescue”, or “help”. One action per order.');
  if(/\band\b/i.test(raw)&&/(repair|rescue|evacuate|scan|preserve|deliver|transmit|stabilize|treat|withdraw)/i.test(raw))return reject(s,'One action per order. Separate compound instructions so their effects remain verifiable.');
  if(s.ordersLeft===0)return reject(s,'Command capacity used for this cycle. Advance the clock to issue more orders.');
  if(cmd.type==='repair'){
    if(!SYSTEM_KEYS.includes(cmd.target))return reject(s,'System does not exist.');
    if(s.systems[cmd.target]>=96)return reject(s,`${SYSTEM_NAMES[cmd.target]} is already near full integrity.`);
    return assign(s,'Engineer',{type:'repair',target:cmd.target,duration:2},`repair ${SYSTEM_NAMES[cmd.target].toLowerCase()}`,{parts:1});
  }
  if(cmd.type==='priority'){
    s.powerFocus=cmd.target;
    return accept(s,`Power priority set to ${cmd.target.toLowerCase().replace('_',' ')}. Other functions receive less reserve.`);
  }
  if(cmd.type==='scan')return assign(s,'Signals',{type:'scan',duration:1},'cross-check independent instrument sources');
  if(cmd.type==='preserve'){
    if(!['evidence','archive'].includes(s.scenario.type))return reject(s,'No archive-preservation objective is active here. Use scan to gather evidence.');
    return assign(s,'Signals',{type:'preserve',duration:2},'copy verified records to hardened storage');
  }
  if(cmd.type==='rescue'){
    if(s.scenario.type!=='rescue')return reject(s,'This incident has no accessible evacuation target.');
    if(s.remaining<=0)return reject(s,'No reachable civilians remain to retrieve.');
    if(s.systems.nav<30 || s.systems.hull<25)return reject(s,'Safe extraction requires navigation above 29 and hull integrity above 24.');
    return assign(s,'Pilot',{type:'rescue',duration:2},'dispatch a timed evacuation sortie',{fuel:1});
  }
  if(cmd.type==='deliver'){
    if(s.scenario.type!=='cargo')return reject(s,'No relief cargo delivery objective exists in this incident.');
    if(s.supplies.cargo<=0)return reject(s,'No viable relief cargo remains.');
    if(s.systems.nav<30)return reject(s,'Navigation is too damaged for safe delivery.');
    return assign(s,'Pilot',{type:'deliver',duration:2},'deliver relief cargo to the next settlement',{fuel:1});
  }
  if(cmd.type==='stabilize'){
    if(s.supplies.fuel<1)return reject(s,'No maneuvering reserve remains.');
    return assign(s,'Pilot',{type:'stabilize',duration:2},'execute a local trajectory correction',{fuel:1});
  }
  if(cmd.type==='transmit'){
    if(s.reportSent)return reject(s,'The verified report was already transmitted.');
    if(s.evidence<1)return reject(s,'No corroborated evidence. Scan first.');
    if(s.systems.comms<30)return reject(s,'Communications integrity is too low.');
    return assign(s,'Signals',{type:'transmit',duration:1},'transmit the corroborated incident record');
  }
  if(cmd.type==='isolate'){
    if(s.scenario.effect!=='hush')return reject(s,'No corrupted automated command network is present.');
    if(s.isolated)return reject(s,'Automated guidance is already isolated.');
    return assign(s,'Signals',{type:'isolate',duration:1},'isolate the compromised guidance network');
  }
  if(cmd.type==='treat'){
    const injured=s.crew.filter(c=>c.alive&&c.health<85);
    if(!injured.length)return reject(s,'No crew member currently requires immediate treatment.');
    return assign(s,'Medic',{type:'treat',duration:1},'stabilize the most injured crew member',{medical:1});
  }
  if(cmd.type==='withdraw'){
    if(s.systems.nav<32)return reject(s,'Navigation must be above 31 to plot withdrawal.');
    if(s.supplies.fuel<1)return reject(s,'Maneuvering reserve exhausted.');
    return assign(s,'Pilot',{type:'withdraw',duration:2},'plot immediate withdrawal and depart',{fuel:1});
  }
  return reject(s,'That action is unavailable.');
}

function completeJob(s,c){
  const job=c.job;c.job=null;
  if(!c.alive)return;
  const name=c.name;
  switch(job.type){
    case 'repair': {
      const gain=job.target==='hull'?25:27;
      s.systems[job.target]=clamp(s.systems[job.target]+gain);
      addLog(s,`${name} restored ${SYSTEM_NAMES[job.target].toLowerCase()} by ${gain} points.`,'good');break;
    }
    case 'scan':s.evidence+=1;addLog(s,`${name} corroborated one independent observation. Evidence quality increased.`,'good');break;
    case 'preserve':s.archived+=2;s.evidence+=1;addLog(s,`${name} preserved two authenticated record blocks and corroborated their source.`,'good');break;
    case 'rescue':{
      if(s.systems.nav<25||s.systems.hull<20){addLog(s,`${name} could not complete the evacuation sortie. The vessel became unsafe during the approach.`,'warning');break;}
      const count=Math.min(4,s.remaining);s.rescued+=count;s.remaining-=count;
      addLog(s,`${name} brought ${count} living civilians aboard. ${s.remaining} remain in the threatened zone.`,'good');break;
    }
    case 'deliver':{
      if(s.systems.nav<25){addLog(s,`${name} aborted the relief delivery because navigation became unsafe.`,'warning');break;}
      const count=Math.min(4,s.supplies.cargo);s.supplies.cargo-=count;s.delivered+=count;
      addLog(s,`${name} delivered ${count} units of viable aid. Delivery receipt recorded.`,'good');break;
    }
    case 'stabilize':s.systems.nav=clamp(s.systems.nav+18);s.systems.hull=clamp(s.systems.hull+4);addLog(s,`${name} stabilized the local trajectory. The external catastrophe continues unchanged.`,'good');break;
    case 'transmit':if(s.systems.comms<30){addLog(s,`${name} could not transmit. The communications path failed before the packet was sent.`,'warning');break;}s.reportSent=true;addLog(s,`${name} transmitted a corroborated incident record. Receipt verified.`,'good');break;
    case 'isolate':s.isolated=true;s.systems.comms=clamp(s.systems.comms-9);addLog(s,`${name} cut automated guidance. Manual operation restored, with degraded communications.`,'good');break;
    case 'treat':{
      const target=s.crew.filter(x=>x.alive).sort((a,b)=>a.health-b.health)[0];
      if(target){target.health=clamp(target.health+28);addLog(s,`${name} treated ${target.name}. Medical reserves expended.`,'good');}
      break;
    }
    case 'withdraw':if(s.systems.nav<32){addLog(s,`${name} could not execute withdrawal. The course solution collapsed before departure.`,'warning');break;}finish(s,'WITHDRAWAL');break;
  }
}

function degrade(s,key,amount){s.systems[key]=clamp(round(s.systems[key]-amount));}
function scenarioTick(s){
  const h=s.hazard;
  switch(s.scenario.effect){
    case 'ring':degrade(s,'hull',1.4+h*.025);degrade(s,'nav',h>55?2.4:0.7);break;
    case 'hush':if(!s.isolated){degrade(s,'comms',2.8+h*.037);if(s.tick%3===0)degrade(s,'reactor',4);}else{degrade(s,'comms',0.6);}break;
    case 'flood':{
      const lost=Math.min(s.remaining,Math.floor(h/30));
      if(lost){s.remaining-=lost;s.target-=0;addLog(s,`${lost} previously reachable civilians lost to the advancing flood.`,'danger');}
      degrade(s,'nav',1.5);break;
    }
    case 'glass':degrade(s,'life',2.1+h*.034);degrade(s,'hull',1.2);break;
    case 'debris':degrade(s,'hull',1.3+h*.027);degrade(s,'nav',1.5);break;
    case 'collapse':degrade(s,'nav',2.8+h*.044);degrade(s,'comms',1.7);break;
    case 'drift':degrade(s,'nav',2.2+h*.032);degrade(s,'hull',h>60?1.8:0.3);break;
    case 'cargo':{
      if(s.tick%3===0&&s.supplies.cargo>0){const lost=Math.min(s.supplies.cargo,s.systems.cooling<55?2:1);s.supplies.cargo-=lost;addLog(s,`${lost} units of relief cargo spoiled during transport.`,'warning');}
      degrade(s,'cooling',1.2);break;
    }
    case 'archive':if(s.tick%4===0){addLog(s,'An unpreserved archive sector has become unreadable.','warning');}degrade(s,'reactor',1.7);degrade(s,'comms',1.1);break;
  }
}
function finish(s,reason){
  if(s.status!=='ACTIVE')return;
  s.status='CLOSED';s.result=reason;s.ordersLeft=0;
  s.crew.forEach(c=>{c.job=null;});
  addLog(s,reason==='WITHDRAWAL'?'Vessel departed the operational area. Local consequences remain.':reason==='CASUALTIES'?'No living command personnel remain.':reason==='SYSTEM_FAILURE'?'Essential systems lost. The operation has ended.':'The crisis window closed before withdrawal.','danger');
}

export function advanceCycle(current){
  if(!current||current.status!=='ACTIVE')return {state:current,ok:false,message:'This incident has ended.'};
  const s=structuredClone(current);s.tick++;s.ordersLeft=2;
  for(const c of s.crew){
    if(c.alive&&c.job){c.job.remaining--;c.fatigue=clamp(c.fatigue+5);if(c.job.remaining<=0)completeJob(s,c);}
    else if(c.alive)c.fatigue=clamp(c.fatigue-2);
    if(s.status==='CLOSED')break;
  }
  if(s.status==='CLOSED')return {state:s,ok:true,message:'Withdrawal complete.'};
  s.hazard=clamp(round(s.hazard+s.scenario.baseRate+Math.floor(s.tick/7)*0.35));
  scenarioTick(s);
  const coolBenefit=s.powerFocus==='COOLING'?2.2:s.powerFocus==='LIFE'?-.5:0;
  s.temperature=clamp(round(s.temperature+Math.max(-1.5,3.7-s.systems.cooling*.045-coolBenefit)));
  const lifeBenefit=s.powerFocus==='LIFE'?1.2:s.powerFocus==='COOLING'?-.5:0;
  s.air=clamp(round(s.air-Math.max(.2,2.5-s.systems.life*.019-lifeBenefit)));
  if(s.powerFocus==='NAV')s.systems.nav=clamp(round(s.systems.nav+1.5));
  if(s.powerFocus!=='BALANCED')degrade(s,'reactor',.7);
  if(s.systems.cooling<25) s.temperature=clamp(s.temperature+2);
  if(s.temperature>82){degrade(s,'reactor',4);if(s.tick%2===0)addLog(s,'Thermal shutdown is spreading through power distribution.','warning');}
  if(s.systems.life<20)s.air=clamp(s.air-3);
  if(s.air<24 || s.temperature>88){
    for(const c of s.crew){if(!c.alive)continue;c.health=clamp(c.health-(s.air<24?10:0)-(s.temperature>88?8:0));
      if(c.health===0){c.alive=false;c.job=null;addLog(s,`${c.name} died after life-support conditions became unsurvivable.`,'danger');}}
  }
  for(const threshold of [35,60,85]){
    if(s.hazard>=threshold&&!s.triggered.includes(threshold)){
      s.triggered.push(threshold);
      const cue=s.scenario.cues[[35,60,85].indexOf(threshold)];
      addLog(s,cue,'warning');s.signals.unshift(cue);s.signals=s.signals.slice(0,4);
    }
  }
  if(s.crew.every(c=>!c.alive))finish(s,'CASUALTIES');
  else if(s.air<=0||s.temperature>=100||s.systems.hull<=0||s.systems.reactor<=0)finish(s,'SYSTEM_FAILURE');
  else if(s.hazard>=100||s.tick>=26)finish(s,'WINDOW_CLOSED');
  else if(s.tick%3===0)addLog(s,`Cycle ${String(s.tick).padStart(2,'0')}: threat ${Math.round(s.hazard)}%, thermal load ${Math.round(s.temperature)}%, breathable reserve ${Math.round(s.air)}%.`);
  return {state:s,ok:true,message:'One 30-second cycle elapsed. Orders resolved, then the environment advanced.'};
}

export function incidentReport(s){
  if(!s)return null;
  const living=s.crew.filter(c=>c.alive);
  const objective=s.scenario.type==='rescue'?{label:'Recovered civilians',value:s.rescued,target:s.target}:
    s.scenario.type==='cargo'?{label:'Aid delivered',value:s.delivered,target:s.target}:
    {label:'Authenticated records',value:s.archived+s.evidence,target:s.target};
  const outcome=s.result==='WITHDRAWAL'?'WITHDREW':s.result==='SYSTEM_FAILURE'||s.result==='CASUALTIES'?'LOST':s.status==='ACTIVE'?'IN PROGRESS':'WINDOW CLOSED';
  return {outcome,crewSurviving:living.length,crewTotal:s.crew.length,objective,reportSent:s.reportSent,unverified:s.scenario.type==='rescue'?s.remaining:0,
    observations:s.evidence,archived:s.archived,chronology:s.log.slice(),report:
    `${s.scenario.title} / SEED ${s.seed}\n${s.scenario.era} / ${s.scenario.location}\nSTATUS: ${outcome}\nCREW: ${living.length}/${s.crew.length} survived\n${objective.label.toUpperCase()}: ${objective.value}/${objective.target}\nCORROBORATED OBSERVATIONS: ${s.evidence}\nVERIFIED UPLINK: ${s.reportSent?'YES':'NO'}\nRECOVERABLE CIVILIANS REMAINING: ${s.remaining}\n\nThis report records simulated events. Unknown events are not reconstructed as fact.\n\nEVENT LOG\n`+s.log.map(e=>`[${String(e.tick).padStart(2,'0')}] ${e.text}`).join('\n')};
}

export function isValidSave(s){
  return !!(s&&s.version===1&&Number.isInteger(s.seed)&&s.scenario&&s.scenario.id===s.id&&
    ['ACTIVE','CLOSED'].includes(s.status)&&Number.isFinite(s.hazard)&&s.hazard>=0&&s.hazard<=100&&
    Array.isArray(s.crew)&&s.crew.length===5&&SYSTEM_KEYS.every(k=>Number.isFinite(s.systems?.[k]))&&
    Array.isArray(s.log)&&s.log.length<=100&&s.supplies&&Number.isInteger(s.tick)&&s.tick>=0&&s.tick<=26);
}
