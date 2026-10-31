import test from 'node:test';
import assert from 'node:assert/strict';
import {SCENARIOS, seededRandom} from '../src/scenarios.js';
import {generateIncident,parseOrder,issueOrder,advanceCycle,incidentReport,isValidSave} from '../src/engine.js';

const order=(s,raw)=>issueOrder(s,raw);
const cycle=s=>advanceCycle(s).state;
function progress(s,count){for(let i=0;i<count;i++)s=cycle(s);return s;}

test('scenario library has wartime and postwar distinct historical contexts',()=>{
 assert.ok(SCENARIOS.length>=7);
 assert.ok(SCENARIOS.some(s=>s.era==='WARTIME'));
 assert.ok(SCENARIOS.some(s=>s.era==='POSTWAR'));
 assert.equal(new Set(SCENARIOS.map(s=>s.id)).size,SCENARIOS.length);
 assert.ok(SCENARIOS.every(s=>s.year===null || s.era==='WARTIME'&&s.year>=0&&s.year<=170));
 assert.ok(SCENARIOS.every(s=>s.cues.length===3));
});
test('seed determinism applies to crew, systems, scenario, and event configuration',()=>{
 const a=generateIncident(881013),b=generateIncident(881013);
 assert.deepEqual(a,b);
 assert.notDeepEqual(generateIncident(881014).crew,a.crew);
});
test('historical era filter blocks incompatible selection',()=>{
 for(let i=1;i<150;i++)assert.equal(generateIncident(i,'random','POSTWAR').scenario.era,'POSTWAR');
 assert.throws(()=>generateIncident(2,'halven','POSTWAR'));
});
test('unsupported command never mutates game state or consumes time',()=>{
 const a=generateIncident(51,'blood-ring');
 const b=order(a,'make everyone immortal');
 assert.equal(b.ok,false);assert.deepEqual(b.state,a);
 assert.equal(a.tick,0);
});
test('negative or compound instructions are not silently interpreted as valid single orders',()=>{
 const a=generateIncident(31,'blood-ring');
 assert.equal(order(a,'repair cooling and rescue civilians').ok,false);
 assert.equal(order(a,"don't withdraw").ok,false);
});
test('two commands per cycle, commands assign jobs without instant repair',()=>{
 let s=generateIncident(50,'blood-ring');const old=s.systems.cooling;
 const parts=s.supplies.parts;
 const a=order(s,'repair cooling');assert.equal(a.ok,true);s=a.state;
 assert.equal(s.supplies.parts,parts-1);
 assert.equal(s.systems.cooling,old);
 assert.equal(s.crew.filter(c=>c.job?.type==='repair').length,1);
 s=order(s,'scan').state;
 assert.equal(s.ordersLeft,0);
 assert.equal(order(s,'rescue').ok,false);
 s=cycle(s);assert.equal(s.ordersLeft,2);assert.equal(s.evidence,1);
 s=cycle(s);assert.ok(s.systems.cooling>old-3);
});
test('civilian rescue takes actual time and fuel, cannot increase beyond remaining',()=>{
 let s=generateIncident(81,'blood-ring');const fuel=s.supplies.fuel;
 s=order(s,'rescue').state;
 assert.equal(s.rescued,0);assert.equal(s.supplies.fuel,fuel-1);
 s=cycle(s);assert.equal(s.rescued,0);
 s=cycle(s);assert.equal(s.rescued,4);
 assert.equal(s.remaining,s.target-4);
});
test('archive and report do not permit a fictitious transmission without evidence',()=>{
 let s=generateIncident(8,'archive');assert.equal(order(s,'transmit').ok,false);
 s=order(s,'preserve').state;
 s=progress(s,2);
 assert.ok(s.archived>=2);
 s=order(s,'transmit').state;s=cycle(s);
 assert.equal(s.reportSent,true);
});
test('hushing automated corruption can be isolated but not magically erased',()=>{
 let s=generateIncident(9,'shail-hush');
 s=order(s,'isolate automation').state;
 s=cycle(s);
 assert.equal(s.isolated,true);
 assert.ok(s.hazard>0);
 assert.ok(s.systems.comms<100);
});
test('outcome reports preserve unknown civilian counts and observed actions',()=>{
 const s=generateIncident(73,'zuul-kai');
 const r=incidentReport(s);
 assert.equal(r.outcome,'IN PROGRESS');
 assert.equal(r.unverified,s.remaining);
 assert.equal(r.reportSent,false);
 assert.match(r.report,/UNKNOWN EVENTS|Unknown events/i);
});
test('no tick mutation after closure, no crew resurrection',()=>{
 let s=generateIncident(4,'halven');s=progress(s,26);
 assert.equal(s.status,'CLOSED');
 const before=structuredClone(s);assert.deepEqual(cycle(s),before);
 assert.equal(order(s,'repair hull').ok,false);
});
test('randomized incidents remain bounded and parseable across many seeds',()=>{
 for(let i=1;i<=110;i++){
   let s=generateIncident(i);assert.equal(isValidSave(s),true);
   for(let j=0;j<26 && s.status==='ACTIVE';j++)s=cycle(s);
   assert.equal(isValidSave(s),true);
   assert.equal(s.status,'CLOSED');
   assert.ok(s.systems.hull>=0&&s.systems.hull<=100);
   assert.ok(s.hazard<=100&&s.hazard>=0);
 }
});
test('invalid saves are rejected',()=>{
 const s=generateIncident(17);
 assert.equal(isValidSave(s),true);
 assert.equal(isValidSave({...s,version:99}),false);
 assert.equal(isValidSave({...s,log:Array(500).fill({})}),false);
 assert.equal(isValidSave({...s,systems:{}}),false);
});
test('seed PRNG produces repeatable numeric samples in range',()=>{
 const a=seededRandom(3),b=seededRandom(3);
 for(let i=0;i<100;i++){const value=a();assert.equal(value,b());assert.ok(value>=0&&value<1);}
});
