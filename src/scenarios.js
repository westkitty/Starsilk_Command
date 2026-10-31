/** Historical anchors are immutable. All playable vessels, crews and local incidents are provisional. */
export const SCENARIOS = Object.freeze([
  {
    id: 'blood-ring', title: 'THE UNFINISHED RING', era: 'WARTIME', year: null, type: 'rescue',
    location: 'Occupied orbital corridor', threat: 'Orbital extrusion', baseRate: 3.8,
    brief: 'A Drakken extrusion stream is raising prepared world matter into an unfinished Blood Ring. Your vessel is caught between the forming band and an evacuation barge.',
    objective: 'Recover as many civilians as possible before the orbital corridor becomes impassable.',
    cues: ['A crystalline stream cuts across the navigation solution.', 'The unfinished band thickens. Whole sections of the horizon disappear.', 'The ring approaches structural continuity. The corridor is closing.'],
    map: 'ring', resource: 'Civilians awaiting retrieval', effect: 'ring'
  },
  {
    id: 'shail-hush', title: 'THE HUSHING', era: 'WARTIME', year: null, type: 'evidence',
    location: 'Shail-9 defense annex', threat: 'Automation collapse', baseRate: 3.2,
    brief: 'The defense grid has gone from screaming music to silence. Remaining control channels disagree. The facility must be operated without trusting its automated guidance.',
    objective: 'Collect independent evidence, isolate the corrupted automation and preserve an escape route.',
    cues: ['The guidance voices repeat an impossible pressure reading.', 'A control channel transmits only a sustained note.', 'Every automated route now reports a different destination.'],
    map: 'station', resource: 'Records awaiting preservation', effect: 'hush'
  },
  {
    id: 'zuul-kai', title: 'THE DROWNING', era: 'WARTIME', year: null, type: 'rescue',
    location: 'Zuul Kai upper atmosphere', threat: 'Hydrological rewrite', baseRate: 4.1,
    brief: 'A Cloudmaw is raising an ocean over the sealed archive domes. Air routes are narrowing and survivors are gathering beneath rapidly failing shelter roofs.',
    objective: 'Extract survivors while the environment remains navigable.',
    cues: ['A seawall rises above the old cloud deck.', 'Another refuge disappears beneath the incoming water.', 'The final dry evacuation corridor is nearly submerged.'],
    map: 'flood', resource: 'Civilians awaiting retrieval', effect: 'flood'
  },
  {
    id: 'glassfall', title: 'GLASSFALL', era: 'WARTIME', year: null, type: 'rescue',
    location: 'Sector Delta-1', threat: 'Volcanic glassfield', baseRate: 3.5,
    brief: 'Obsidian Gul terraforming has deposited razor glass across the transport perimeter. Air filtration, exposed equipment and the remaining evacuation craft are failing.',
    objective: 'Recover isolated personnel before glass-laden air shuts down safe operations.',
    cues: ['Fine glass begins scoring the intake shutters.', 'The external filters fill with sharp volcanic residue.', 'The transport apron is no longer visible beneath the glassfall.'],
    map: 'glass', resource: 'Personnel awaiting retrieval', effect: 'glass'
  },
  {
    id: 'pharos', title: 'THE BROKEN OFFENSIVE', era: 'WARTIME', year: 121, type: 'evidence',
    location: 'Pharos Nebula approach', threat: 'Battlefield debris', baseRate: 3.7,
    brief: 'During the Administration assault on the Drakken forward node, your support vessel is separated from the formation. The only reliable battle record remains aboard.',
    objective: 'Verify what happened and escape with a surviving account.',
    cues: ['The forward sensor array is shredded by moving debris.', 'The fleet channel disappears behind interference.', 'The last safe departure vector is obstructed.'],
    map: 'nebula', resource: 'Records awaiting preservation', effect: 'debris'
  },
  {
    id: 'halven', title: 'THE HAL’VEN WITNESS', era: 'WARTIME', year: 170, type: 'evidence',
    location: 'Hal’Ven perimeter', threat: 'Stellar collapse front', baseRate: 5.0,
    brief: 'After the Aureal Gate catastrophe, the Shard-God begins an ordered sequence of stellar collapses. Your observation vessel cannot alter his actions. The immediate task is to get witnesses and their record clear of the affected sector.',
    objective: 'Preserve evidence and withdraw before local navigation becomes impossible.',
    cues: ['A distant star contracts into a point too dark for the instruments.', 'The next collapse erases the reference grid.', 'The observation window closes as the singularity field grows.'],
    map: 'collapse', resource: 'Records awaiting preservation', effect: 'collapse'
  },
  {
    id: 'siege-watch', title: 'SIEGE WALL WATCH', era: 'POSTWAR', year: null, type: 'evidence',
    location: 'Containment observation post', threat: 'Trajectory instability', baseRate: 3.4,
    brief: 'An observation platform close to the Siege Wall loses positional certainty. Repairs are possible, but only if the crew can distinguish genuine drift from corrupted telemetry.',
    objective: 'Reconstruct the sensor record and escape the unstable trajectory.',
    cues: ['The projected orbit no longer matches the measured one.', 'A reference beacon disappears behind gravitational distortion.', 'Every correction now consumes precious maneuvering reserve.'],
    map: 'lattice', resource: 'Records awaiting preservation', effect: 'drift'
  },
  {
    id: 'remnant-convoy', title: 'THE REMNANT CONVOY', era: 'POSTWAR', year: null, type: 'cargo',
    location: 'Remnant-world relief route', threat: 'Supply degradation', baseRate: 3.0,
    brief: 'A relief vessel carries food and medical supplies to multiple damaged settlements. Faulty refrigeration and fuel scarcity force a choice between protecting cargo and keeping the vessel operational.',
    objective: 'Deliver as much viable aid as possible without sacrificing your crew.',
    cues: ['Cargo thermometers disagree as the cooling loop struggles.', 'A container seal fails and supplies begin spoiling.', 'The final delivery window is being lost to equipment failure.'],
    map: 'convoy', resource: 'Aid units awaiting delivery', effect: 'cargo'
  },
  {
    id: 'archive', title: 'ARCHIVE OF THE DEAD', era: 'POSTWAR', year: null, type: 'archive',
    location: 'Recovery archive platform', threat: 'Record deterioration', baseRate: 3.4,
    brief: 'A damaged station holds contradictory accounts of wartime evacuations. Its failing power system is destroying records faster than the archivists can copy them.',
    objective: 'Secure verified records before the archive fails, then extract your crew.',
    cues: ['An entire record block fails its integrity check.', 'The emergency library begins shedding its oldest sectors.', 'Only the hardened storage survives the failing station.'],
    map: 'station', resource: 'Record blocks awaiting preservation', effect: 'archive'
  }
]);

export const SYSTEM_KEYS = Object.freeze(['hull', 'cooling', 'reactor', 'life', 'nav', 'comms']);
export const SYSTEM_NAMES = Object.freeze({hull:'Hull seals', cooling:'Thermal regulation', reactor:'Power core', life:'Life support', nav:'Navigation', comms:'Communications'});

export function seededRandom(seed) {
  let a = (Number(seed) >>> 0) || 1;
  return () => {
    a = (a + 0x6D2B79F5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function generateIncident(seed, scenarioId = 'random', era = 'ALL') {
  const rng = seededRandom(seed);
  const eligible = SCENARIOS.filter(s => era === 'ALL' || s.era === era);
  if (!eligible.length) throw new Error('No scenarios match the selected period');
  const scenario = scenarioId === 'random'
    ? eligible[Math.floor(rng() * eligible.length)]
    : SCENARIOS.find(s => s.id === scenarioId && eligible.includes(s));
  if (!scenario) throw new Error('Invalid scenario selection');

  const first = ['Aven', 'Sera', 'Orin', 'Kett', 'Vela', 'Renn', 'Ilya', 'Tessa', 'Nerin', 'Sovan', 'Hela', 'Doran', 'Miri', 'Taren', 'Rela'];
  const last = ['Kes', 'Vorr', 'Dane', 'Kalen', 'Senn', 'Var', 'Hesh', 'Ilven', 'Orrel', 'Tess', 'Rath', 'Marn', 'Vesh', 'Noll'];
  const used = new Set();
  const names = [];
  for (let i = 0; i < 5; i++) {
    let name;
    do { name = `${first[Math.floor(rng() * first.length)]} ${last[Math.floor(rng() * last.length)]}`; } while (used.has(name));
    used.add(name); names.push(name);
  }
  const roles = ['Engineer', 'Engineer', 'Pilot', 'Medic', 'Signals'];
  const crew = roles.map((role, i) => ({id:`c${i}`, name:names[i], role, health:86+Math.floor(rng()*15), fatigue:Math.floor(rng()*16), job:null, alive:true}));
  const systems = Object.fromEntries(SYSTEM_KEYS.map(key => [key, 62 + Math.floor(rng()*30)]));
  const vulnerable = SYSTEM_KEYS[Math.floor(rng()*SYSTEM_KEYS.length)];
  systems[vulnerable] = 36 + Math.floor(rng()*14);
  const target = scenario.type === 'rescue' ? 12 + Math.floor(rng()*8) : scenario.type === 'cargo' ? 12 : 5;
  const initial = Math.floor(rng()*9) + 13;
  return {
    version:1, seed:Number(seed)>>>0, id:scenario.id, scenario, tick:0, status:'ACTIVE', result:null,
    systems, crew, hazard:initial, temperature:17+Math.floor(rng()*13), air:90+Math.floor(rng()*10),
    supplies:{parts:6, medical:3, fuel:9, cargo: scenario.type==='cargo'?18:0},
    target, remaining:scenario.type==='rescue'?target:0, rescued:0, delivered:0, archived:0,
    evidence:0, reportSent:false, isolated:false, powerFocus:'BALANCED', ordersLeft:2,
    log:[{tick:0, tone:'info', text:`${scenario.title}: incident initialized. ${scenario.brief}`},{tick:0,tone:'info',text:`Duty roster: five crew. The available information is incomplete.`}],
    signals:[`Sector reading: ${scenario.threat.toLowerCase()} detected.`, 'Independent instruments await calibration.'],
    triggered:[], disabledAutomation:false
  };
}
