# STARSILK COMMAND — SUCCESSOR PROJECT HANDOFF PROMPT

**Artifact:** Self-contained project continuation prompt and game-relevant canon context.  
**Prepared:** 2026-10-31.  
**Target repository:** https://github.com/westkitty/Starsilk_Command  
**Live site reported by GitHub Pages:** https://westkitty.github.io/Starsilk_Command/  
**Authoritative public Starsilk Character Dossier source repository:** https://github.com/westkitty/Starsilk_Character_Dossier  
**Published Character Dossier / Starsilk Compendium (GitHub Pages):** https://westkitty.github.io/Starsilk_Character_Dossier/  
**Status:** Project handoff documentation. **Not** a new feature, canon amendment, test report, or authorization for implementation.  
**Public boundary:** This Markdown is committed to a PUBLIC GitHub repository. It deliberately summarizes relevant lore rather than rehosting private source documents, credentials, personal information, or unapproved media.

---

## 0. START HERE — INSTRUCTIONS TO THE NEXT PROJECT / AI

You are inheriting **Starsilk Command**, an existing, playable, browser-first, deterministic crisis-command game set in the Starsilk universe. The previous ChatGPT Project was called **Starsilk Character Dossier**, but the new project does **not** inherit that project's uploaded sources, chat history, or memory. Treat this handoff as a self-contained working brief, not as proof that you can access old private attachments.

**Your job:** Continue the established Starsilk Command game without restarting, flattening its distinctive canon, or claiming planned features already exist. Use this file for project intent and curated canon, then inspect the CURRENT repository state before proposing or applying changes. Work only on the exact repository authorized by the current request.

**Default when the owner says "continue", "go on", or "next":**
1. Inspect the current Starsilk Command repository's default branch, latest commit, README, OPERATIONAL_STATE.md, Starsilk_Command_bible.md, this file, and applicable proposals.
2. Establish what is actually implemented, deployed, tested, broken, unknown, and merely proposed. Do not trust stale SHAs or earlier completion claims over current GitHub and runtime evidence.
3. Determine the next coherent work unit from the latest user instruction and repository reality. Do not substitute another Starsilk repository.
4. Protect all existing functioning gameplay and the restrictions below. For significant state-changing work, verify exact repository identity and read-only baseline first. Do not assume an unrelated local workspace is authorized.
5. Build only what the current instruction authorizes, validate changes against the original game contract, and report actual evidence. Commit/push/deploy only when specifically authorized for that task; historical permission is not permanent permission.

**If the new AI has no GitHub access:** use this file as the contract, say which current-state claims cannot be verified, and request or use an approved repository snapshot. Do not assert the game is currently deployed merely because a historic deployment succeeded.

**Never reinterpret "proposed" as "implemented".** The fixed-seat fullscreen bridge, webcam face/head tracking, Three.js bridge, eye-gaze tracking, multirun operation chain, and expanded 16-family anthology are **NOT IMPLEMENTED** as of this handoff.

---

## 1. PROJECT IDENTITY AND STRICT REPOSITORY BOUNDARY

- **Command/game repository:** westkitty/Starsilk_Command. Its authoritative editable code and game-local state are here, not in the Dossier repository.
- **Command/game publication:** GitHub Pages at https://westkitty.github.io/Starsilk_Command/ . The current Pages release must always be checked against a concrete GitHub Actions deployment run and branch SHA.
- **Separate public Character Dossier canon repository:** https://github.com/westkitty/Starsilk_Character_Dossier . **Public Pages / browsable Starsilk Compendium:** https://westkitty.github.io/Starsilk_Character_Dossier/ . The Dossier's own README confirms Pages is served from `main` / `docs`. Use the published site for navigation and context, but the authored sections in the repository for source-level lore authority. This is a **read-only source reference**, not the target repository for this game. Do not edit, stage, push, or deploy it unless the owner independently authorizes those actions.
- **Underlying project type:** Stinky Weasel Productions / Starsilk; independent fictional universe and proprietary creative IP. Public source availability does not equal an open-content license.
- **Existing runtime:** static HTML, CSS, browser JavaScript ES modules; Node 22+ only for the local dev/test workflow. No server application, API key, live model, backend, required dependency, external CDN, or paid service is part of the current playable game.
- **Operational identity:** GitHub repository and branch must be established from live evidence each session. The last verified head *before the current documentation update* was 329fc0d6953dea23898ce6508f22cd63b70b532d on main (2026-10-31). This is historical evidence, not a permanently current SHA.
- **Public content boundary:** Never paste private Drive documents wholesale into this public repository, expose unpublished source art, copy credentials, infer permission to relicense the author's creative IP, or publish privacy-sensitive account data. Summarize only relevant verified canon and identify public authority paths.

**Standalone Dossier locator (no previous project access required):**
- Public browse/read link: https://westkitty.github.io/Starsilk_Character_Dossier/
- Public editable-source reference (read-only for this game): https://github.com/westkitty/Starsilk_Character_Dossier
- Authored lore section directory: https://github.com/westkitty/Starsilk_Character_Dossier/tree/main/src/content/sections
- Canon authority contract: https://github.com/westkitty/Starsilk_Character_Dossier/blob/main/src/canon/AUTHORITY.md
- Registered subset of machine-enforced canon locks: https://github.com/westkitty/Starsilk_Character_Dossier/blob/main/src/canon/invariants.json
- If the website and authored repository disagree, inspect authorship/generation timestamps; the Dossier documents its `docs` Pages output as generated from `src/content`. Do not treat a generated page or a partial machine-lock registry as stronger authority than authored source.

**Governing order for work:** latest explicit user instruction > Starsilk Command project-local OPERATIONAL_STATE.md and explicit accepted decisions > this handoff's protected requirements > current public Dossier authored canon for lore facts > its machine-enforced canon locks (the registered subset only) > source-grounded game specifications > verified current code/test/deployment evidence > inferred recommendations. If two governing sources actually conflict, surface it; do not silently average.

The public Dossier's source authority is different from this game's gameplay authority. The Dossier explicitly says:
- Authored lore: src/content/sections/*.title.html and *.body.html, with src/content/sections.json as stable identity metadata.
- Machine invariants: src/canon/invariants.json. They are **not** a complete lore database.
- Generated docs/ pages and machine indexes are derivatives, not authoring sources.
- The Dossier's own MUSEUM_AI_ROADMAP.md and its phase program belong to that separate project and must **not** be applied to Starsilk Command.
- References and drawings are not proof of extra powers; approvals, design annotations, and names must not invent canon.

### Source provenance for this handoff

These were used for the bounded game-relevant synthesis:
1. **Current authored public Dossier**: src/content/sections/world.body.html, chronology.body.html, shard-god.body.html, starsilk-material.body.html, gorevault.body.html, ringthroat.body.html, blood-rings.body.html, drakken-registry.body.html, ontology-horror.body.html, artifacts-factions.body.html, and the authored canon-ledger; see the dossier repository above. Their prose is canonical within their stated scope.
2. **Public Dossier machine law**: src/canon/AUTHORITY.md and src/canon/invariants.json. The 170-year war duration and selected identity/material locks are enforced there.
3. **Creator-confirmed later canon**: the October 22, 2026 Starsilk Canon Delta was consulted for later chronology and ontological limits. Its **private Drive original was not republished** here.
4. **Earlier canonical reference material**: Blood Rings expanded source, Drakken Terraforming Compendium and canon-boundaries source were consulted for formation stages and the distinctions between canon functions and simulated coefficients. Private original documents were not copied here.
5. **Project's original design handoff**: a user-provided Derelict Command → Starsilk brief from October 31, 2026, plus subsequent explicit corrections and game expansions.
6. **Actual Command code**: src/scenarios.js, src/engine.js, src/main.js, index.html, styles.css, README.md, tests/engine.test.mjs, sw.js, manifest.webmanifest, and .github/workflows/pages.yml.
7. **Development history**: Starsilk_Command_bible.md and OPERATIONAL_STATE.md.

**Coverage statement:** This is an extensive **Starsilk Command-specific canon primer**, NOT a complete transcription of every character, faction, cosmic epoch, reference image, or creative draft in the broader Starsilk universe. The broader canon has deliberate unknowns and withheld information. A future AI must not invent those gaps. An inaccessible private source remains inaccessible unless the owner supplies or authorizes it.

---

## 2. THE GAME'S TRUE PURPOSE

**Working title:** STARSILK COMMAND.  
**Original design-era title/concept:** STARSILK: NON-ACTIONABLE, adapted from the starting idea "Derelict Command." Do not silently rename the shipped product.

**Genre:** Procedural crisis command / spaceship and station survival / institutional catastrophe simulator.

**Thesis:** The player is an ordinary commander with limited authority in a universe undergoing fixed historical catastrophes. The job is to interrogate incomplete evidence, direct ordinary crew, repair or prioritize failing equipment, preserve lives and records where possible, and accept irreversible outcomes. The player's choices matter *locally* without rewriting canon history.

**Emotional design:** Awe comes from lawful, indifferent enormity contrasted with intimate accountability. A single survivor or authenticated record can matter even when a sector is irretrievably lost. The player should feel inside a functioning institution with troubling reporting categories, not inside a generic sci-fi action adventure.

**Do not turn this into:** an endless AI chat, a heroic rescue of the whole universe, an RPG boss fight against the Shard-God, a conventional starship dogfight, a generic holographic dashboard, a lore website, an omniscient morality narrator, or a scripted movie passing for a game.

**Key tension:** mechanical necessity, unequal information, institutional classification, consent, survival, testimony, and the possibility that an efficient order can still be abhorrent.

### Permanent creator restrictions for this game

1. **Time window:** only incidents DURING the Blood Eclipse War and its AFTERMATH **before Starbinding**. No scenario, interaction, ending, visual, or after-action event occurs during or after Starbinding. It cannot be a late-game unlock or simulated epilogue.
2. **Named established canon characters:** **the Shard-God is the sole permitted individually named established canon character** who may appear or be referenced in game-facing text, dialogue, art, logs, cast, or narration. In-game he is called ONLY **"the Shard-God"**. NEVER call him by a personal name or alternate title, including when borrowing text from the Dossier.
3. Every other depicted/named individual (officers, refugees, command personnel, witnesses, engineers, medics, pilots, antagonists) must be an **original or procedurally generated character**, not a renamed cameo from established lore.
4. Established faction, strain, event and location names may appear as **noncharacter world context** when historically appropriate. A named Drakken strain is not a license to add an established named character.
5. Do not make the Shard-God a normal enemy, chase target, playable avatar, negotiable boss, or defeatable adversary. His appearance or remote influence must be rare, controlled, grave and canon-compatible. Most incidents should not include him.
6. Historical major events are immutable. Local player outcome may vary; the canonical disaster does not become preventable by a clever command.
7. Death is final. Neither a save mechanic nor an archive is in-world resurrection, conscious afterlife, or moral absolution. Replays are game sessions, not canonical time travel.
8. No spiders, spider-like creatures, motifs or substitutes in generated content unless the owner specifically overrides this rule for the task.
9. Character/personnel names in the generator must not collide with the established canon cast. Review procedural name lists as canon sources expand; the current implementation has no complete automated name blacklist.
10. Keep all invented vessels, bridge equipment, quantitative simulation coefficients, local missions, crew identities and unheard-of institutions labeled **PROVISIONAL GAME INVENTIONS** unless canon sources and owner approvals explicitly lock them.

---

## 3. COSMOLOGY / MATERIAL LAWS RELEVANT TO GAMEPLAY

### The Notebook Program and time

Reality is rendered through the Notebook Program and recursive memory/execution. **Time travel is structurally impossible**. Macros and archived records can alter structure or preserve evidence; they are not a loophole to rewind historical catastrophes. Never treat memory-based effects as permission for undoing causality.

### Starsilk and Macros

Starsilk is literal programmable cosmological substrate/filament threaded through stellar centers. It is not generic glowing rope, psychic energy, magic cloth, an autonomous moral agent, a sentient ship AI, or a consciousness trapped in light. A Macro is a repeatable executable action-loop in reality, with meaningful path, trigger, execution and effect. Starsilk may show cyan/azure illuminated edges around dark blue internal structure, fine coded striations, weightless flowing ribbon behavior. This is a material/ontological design law, not permission to invent uncontrolled player abilities.

**Star-core extraction law:** If Starsilk is actually pulled/severed from a star, the star immediately collapses into a black hole and its system is destroyed. A "star dive" successfully extracting filament becomes a star knife. No safe mining minigame or reversible reactor fix should negate that rule.

**Known safe contact paths in the full canon:** native Shard-God immunity, a Syrin-blood glitch that renders Starsilk inert, and one exceptional vapor-delivery method. These are background canon facts, **NOT** starting ship inventory, playable crew powers, or automatic access to the exceptional users. Do not add such a method to the game without explicit source proof and approval.

**Death and memory:** a data trace, archival residue, or mnemonic imprint is not the conscious dead. Ethical conflicts around preserving testimony should not imply spiritual rescue.

### Technology and knowledge

The Administration and its agents can execute powerful reality programs without possessing complete knowledge of Starsilk's origin or purpose. Ordinary crew are not omniscient Macros experts. Sensor readings are conditioned by equipment, line-of-sight, calibration, corruption and observed evidence.

Wordstreaming is a living reality-code/communication practice named for an earlier deceased deity, but **that deity and all other established named people are excluded from the game's character roster**. Do not casually introduce universal translators, telepathy or unrestricted language-to-reality shortcuts.

The current game primarily simulates mechanical systems. Its exact subsystem percentages, repair gains, fuel costs and cycle timings are **game model coefficients**, not canonical physical constants.

---

## 4. THE BLOOD ECLIPSE WAR — IMMUTABLE HISTORICAL ANCHORS

**Canonical duration: one hundred seventy (170) years**, rather than older conflicting "17-year" summaries. The 170-year duration is locked in the current public Dossier machine invariants.

| Historical window | Confirmed macro-scale event | Permitted player scale |
| --- | --- | --- |
| Year 0 | Fringe-colony strikes and Drakken lightning terraforming trigger Administration counter-Macros. | Local diagnostics, withdrawals, first-contact evacuation pressure. |
| Year 3 | First Blood Rings appear around Fallenstar Prime. | Pre-closure orbital response, survivor logistics, archive recovery without undoing the canonical construction. |
| Years 7–120 | Widespread attrition, Drakken campaigns, small temporary Administration victories. | Many isolated rescue, evidence, communication, frontier and supply incidents. |
| Year 121 | Administration offensive against a Drakken forward node in the Pharos Nebula, the Siege of the Ruby Eclipse. | Stranded support craft, casualty accounting, independent battle records. |
| Year 170 | Breaking point at Aureal Gate: Drakken weaponize Starsilk against divine authority. The Shard-God carries out the Hal'Ven stellar-collapse containment operation. | The player witnesses a small edge of the catastrophe, preserving testimony or attempting escape. Cannot reverse it. |
| Postwar, still before Starbinding | Drakken are contained behind the Siege Wall; remnant worlds, aid routes, environmental scars and damaged archives persist. | Observation platform, relief convoy, investigations, local stabilization and recovery. |

Undated specific wartime disasters must remain **undated** unless an authoritative timeline fixes their year. "Some time during the war" is better than a fabricated year.

### Drakken

The Drakken are elemental/techno-organic **planetary terraforming entities**, not generic aliens with guns. The Notebook Program creates them via Eggs; older forms can configure later generations with Macros. The Blood Eclipse War's traditional taxonomy records 1 Egg, 35 strains across five archetypes (seven each), and 1 Mother = **37 entries**. The public character Dossier also contains a broader set of authored entries and later-world material; do not mistake the gallery count for the war-era 37-entry taxonomy.

Their conquest is ecological and infrastructural: world chemistry, geology, biosphere, atmosphere, cognition, and settlements become executable transformation surfaces. They discover Starsilk during war-era stellar terraforming and eventually weaponize it at Aureal Gate. This is not available to them as publicly known technology during every earlier mission.

Named strains and historically recorded atrocity sites are **world forces, not player-character cameos**.

### Blood Ring physical / production law

A Blood Ring is an enduring Drakken-built orbital atrocity structure, not a clean Saturn ring or attractive crystal jewelry. Civilian populations and biospheres are turned into crimson glass-state composite; composition may include bone ash, blood residue, ocean fats, organic and mineral matter, with suspended clots, ash, fracture scars, variable thickness and scarred semi-translucency.

The general sequence:
1. World consumption, population and biosphere converted into a material inventory.
2. **Gorevault** collection/rendering/separation/storage: industrial biomass/feedstock logistics.
3. Vitrification/prepared composite slurry.
4. **Ringthroat** pressure-driven atmospheric-to-orbital extrusion of prepared matter.
5. Broken arcs, streams, partial band shaping and angular alignment.
6. Cooling, macro-stabilization and possible continuity closure.

**Causality rule:** do not permit ring formation with no material source; no closed ring based solely on elapsed time; visual completion follows physical state. Existing Starsilk Command "Unfinished Ring" is a local crisis *near* this pipeline, **not** a full physical planetary material-balance simulator. Do not falsely claim the entire pipeline is implemented.

A Blood Ring is also propaganda, territorial marker, orbital shackle, memory of industrial massacre and enduring recovery scar. Some instances may be fortified; not all must be.

### Specific documented wartime incidents (canon background)

- **The Singing Crack of Tholus Fort:** Fault-Tongue's seismic splitting of the fort.
- **Glassfall / Sector Delta-1:** Obsidian Gul strains create razor volcanic-glass terrain and contamination.
- **The Shiverdog Hunts / Gransh IV:** Tremorhound-driven terrain and tunnel catastrophe.
- **Drowning of Zuul Kai:** Cloudmaw radically raises oceans above sealed domes.
- **Airwars of Sector Te:** Vortenbray distorts sky architecture and vacuum pathways.
- **Hushing of Shail-9:** Lyriboris resonance drives planetary automated defense systems into screaming music and then silence.
- **Threshing of Hadran's Ring:** Terragullet's post-atrocity soil transformation.
- **Burning of Triune Crown:** Solnexus affects multiple stars.

Use source-specific mechanics and causal hazards. Do not reduce these to interchangeable "damage events." A macro-scale atrocity may remain fixed while local survivors, crew, and evidence outcomes vary. Provisional details of what the local player sees must not contradict the event's published outcome.

### Siege Wall physical appearance and postwar status

The Siege Wall is a permanent **black-hole containment architecture** created by the Shard-God's catastrophic heliocide. It quarantines Drakken domain at tremendous moral cost; it was not a clean rescue. **In physical space its appearance is an irregular, vast, starless black absence — not a glowing fence, literal wireframe grid or geometrically visible lattice.** A tactical display may diagram the invisible structure; do not confuse such a schematic with what the bridge windows show.

Postwar scarcity, damaged worlds, legal prohibitions on repeating the heliocide, compromised records, evacuation inheritance and ecological scars all remain playable. Do not assume a happy universal restoration.

---

## 5. THE SHARD-GOD — THE ONE PERMITTED ESTABLISHED CANON CHARACTER

**In-game naming lock:** "the Shard-God" only. The Dossier's own historical names, aliases and project labels do not override this game's explicit naming restriction.

**Agency/personality:** a controlled, intelligent, strategic, pragmatic divine actor. His cruelty is ordered optimization, systemic domination, and an absence of moral hesitation, not enraged or random theatrical chaos. His intervention against the Drakken at the war's end is **effective containment** and catastrophic heliocide simultaneously. Never portray it as a uncomplicated heroic salvation.

**Historical action relevant to Command:** after Aureal Gate demonstrates divine vulnerability, he systematically collapses stars in the Hal'Ven Cluster and constructs the black-hole containment boundary. Thousands of suns and trillions of lives are lost. The player may witness gravitational, navigational, communicative and social consequences but cannot bargain him into stopping, alter the known outcome, or personally outfight him.

**Visual canon if he ever appears (rare):** imposing predatory humanoid digitigrade silhouette, **one long tail only**, at most approximately nine feet under current visual lock; obsidian-black skin/scales, cyan/azure luminous fissures, crystalline dorsal mane/spines, cold glowing cyan eyes without ordinary visible pupils, deliberate posture, **no cape**. Use an approved actual image reference if visual fidelity is required; descriptions alone are not proof of canonical-reference approval. Do not invent extra anatomy, powers, character affiliations or off-canon affection.

**Witness doctrine:** his cruelty can preserve witnesses as a mechanism of meaning and domination, but no generic sentient supernatural torment persists after death. He should remain rare enough that his appearance recontextualizes an entire incident.

**No other established named character appears in the game.** The broader Dossier contains a large principal cast and future arcs; they are **reference lore for consistency, not an invitation to import characters**. In particular, do not introduce the other listed principal characters as command officers, radio voices, lore-log signatories, crew names, portraits or easter eggs.

### Later lore exclusion / spoiler boundary for designers

- The later cosmological event **Starbinding** ends the stars and every living person in the entire known universe. The October 22, 2026 delta explicitly supersedes any weaker "many stars/billions of dives with large casualties" account. This is a **future exclusion boundary**, not an incident, ending, mission, foreshadowing display, playable ability or sequel campaign for Starsilk Command.
- The later **Partition** brings new worlds; it **does not resurrect** those destroyed. Do not import it.
- **Shardlings** originate from the Shard-God's later failed attempt to exercise creation authority; the Aureal Gate bodily fracture is an exit point, not the cause. They do **not** exist as an earlier-war enemy type. Do not add them to current game scenarios without a separate authorized canon/era review.
- Divine origin backstory concerning other gods remains deliberately partially withheld. Never "complete" it for exposition or gameplay convenience.

---

## 6. ADMINISTRATION / RECORDS / ETHICAL GAMEPLAY

The Administration can classify lives, allocate resources, execute counter-Macros, censor or prioritize transmission, and operationalize atrocity through bureaucracy. Its effective strategic actions can carry deep moral costs. Civilian deaths cannot be made morally insignificant by a clean dashboard metric.

**"Non-actionable"** is the original proposal's institutional motif: distress reports and people may be declared outside authorized response, even when observed as alive. This is a game narrative premise, not a claim that a particular generated classification or ship manifest is a locked canonical record.

**Distinct evidence layers:** observable sensors, eyewitness testimony, command labels, and the final simulator-resolved log are not the same thing. A character knows only what their instruments or experience support. The game must not write an omniscient report about rooms, victims or causes that nobody observed.

Possible local choices: preserve independent testimony vs use capacity for evacuation; send a truthful report vs protect crew from retaliation; follow authorized procedure vs accept operational risk to help civilians; repair the instrument that proves something vs the system that keeps the ship alive. Do not award simplistic good/evil points.

**Original people matter:** the crew should have jobs, fatigue, health, bounded knowledge, possible relationships and personal limits. Refusal/dissent may be a future mechanic but currently the five-person roster has straightforward task-role constraints, not a rich psychology model.

---

## 7. ACTUAL GAME V1 — IMPLEMENTED ON THE PUBLIC REPOSITORY

**Code authority is current repository state; below is the verified design/build baseline from October 31, 2026, not a guarantee against later changes.**

| Layer | Existing file | Implemented behavior |
| --- | --- | --- |
| Incident templates, crew and seed RNG | src/scenarios.js | Nine scenario families, wartime/postwar gates, seeded procedural five-person crew and starting damage/resources. |
| Deterministic transition engine | src/engine.js | Validated orders, assignment slots/time, systems, supplies, hazards, casualties, failure/window closure, event log, report. |
| DOM/UI controller | src/main.js | Incident launch, local command parsing, quick actions, rendering, local autosave/resume, downloadable report text. |
| Interface and schematic | index.html, styles.css | Responsive 2D tactical layout and SVG environmental schematic; **NOT** a 3D cockpit. |
| Offline-capable static shell | sw.js, manifest.webmanifest | Static caching and installable standalone metadata; true offline re-entry was not yet live-origin verified. |
| Test & local server | tests/engine.test.mjs, tools/serve.mjs, package.json | Built-in Node test runner, dependency-free local HTTP server. |
| GitHub Pages delivery | .github/workflows/pages.yml | Tests and publishes only selected static game files on main. Markdown source docs are visible in GitHub but **not** included in the built Pages site. |

### Current game loop

1. Select era, one of nine scenario families or a random eligible incident; optionally enter an unsigned 32-bit seed.
2. Inspect subsystem integrity, risk, local environmental schematic, crew status, command options and recorded signals.
3. Issue up to **two orders per cycle**, using typed commands or quick buttons.
4. Advance one **30-second simulated cycle**. Assigned crew execute over one or more cycles; environment degrades independently.
5. Manage hull, cooling, reactor, life support, navigation, communications, fuel, parts, medical kits, cargo, evidence, injuries and imminent crisis closure.
6. Attempt rescue, delivery, observation, archive preservation, isolation, trajectory correction, repair, treatment, transmission and withdrawal as appropriate.
7. End with a report distinguishing measured/local event state from unresolved uncertainty. Export a text incident record or replay a seed.
8. Local browser storage currently holds **one latest incident**, with no account or cross-device syncing.

### Existing playable scenario families (exactly nine)

| ID | Scenario | Era | Primary mechanical focus |
| --- | --- | --- | --- |
| blood-ring | THE UNFINISHED RING | War (undated) | Evacuation near Drakken orbital extrusion. |
| shail-hush | THE HUSHING | War (undated) | Isolation of unreliable automated guidance; evidence. |
| zuul-kai | THE DROWNING | War (undated) | Evacuation during hydrological transformation. |
| glassfall | GLASSFALL | War (undated) | Filters, hull and rescue amid volcanic glass. |
| pharos | THE BROKEN OFFENSIVE | War, Year 121 | Record verification and exit through battle debris. |
| halven | THE HAL'VEN WITNESS | War, Year 170 | Witness/survive a fixed stellar-collapse operation. |
| siege-watch | SIEGE WALL WATCH | Postwar (undated) | Containment telemetry, positional uncertainty and escape. |
| remnant-convoy | THE REMNANT CONVOY | Postwar (undated) | Cooling, fuel, finite relief deliveries. |
| archive | ARCHIVE OF THE DEAD | Postwar (undated) | Preserve contradictory records on a failing platform. |

### Actual validation status at this handoff

- Node simulation tests were reported as **14/14 passed** locally in the initial build; GitHub Actions also passed and deployed the initial game successfully.
- Separate stress/play simulations were reported as 720 incidents, 8,571 accepted orders, zero engine exceptions. Treat those as bounded development evidence, not player balance/fun proof.
- Initial browser interaction checks at desktop/mobile viewports passed in an inlined mirror; the test environment blocked direct navigation to the HTTP localhost/public origin.
- GitHub Actions run 41198985773 previously completed with **test and publish success** on 2026-10-31. The Pages deployment recorded an environment URL. Recheck any newer revision rather than inheriting this as current.
- Still unverified at the original checkpoint: actual public-origin reload/resume, service-worker offline round-trip, broad screen-reader UX, long-session mobile performance, scenario-specific player balance, and personal-device webcam interaction.

**Important:** The current 2D game contains neither a commander's 3D chair, a rendered ship bridge, fullscreen request button, head tracker, camera pose model, eye tracking, spatial console interaction, nor VR. Do not credit it with these.

---

## 8. GAMEPLAY EXPANSION IDEAS — ALL PROPOSED / NOT IMPLEMENTED

The earlier expanded design envisages **16 total** distinct scenario families and additional game systems. This is a **design backlog**, not shipped functionality or a numeric promise. Seven or more additional scenario types, including new historical rescue/containment/repair operations, need distinct mechanical contracts and era validation before addition. The nine shipped scenarios already overlap several proposed concepts; do not double-count them.

**Proposed modes, not implemented:**
- **Random Incident** (approximately 15–25 minute ideal target): independently seeded crises with differentiated mechanical challenges.
- **Operation Chain** (approximately 45–90 minute ideal target): 3–5 linked incidents where crew injuries, scarce supplies, reputations and damaged equipment persist.
- **Historical Window** (variable): conditional incidents within historical anchors, with immutable macro-scale outcomes.

**Proposed systems, not implemented:**
- Causal event dependency graph instead of arbitrary random timers.
- Crew autonomous delegation, disagreement, exhaustion behaviors, limited knowledge and lasting relationships.
- Operational debt: emergency bypasses that work now and hurt later.
- Multi-source evidence provenance and separate official-versus-recovered after-action views.
- Additional environment-specific management maps and hazards.
- Richer player-command interpretation, always validated by the deterministic engine.
- Optional AI contextual language layer, with privacy, cost, backend and consent gates.
- Optional immersive fixed-seat fullscreen bridge with local webcam head tracking — see docs/PROPOSED_IMMERSIVE_BRIDGE.md.

Nothing in this file authorizes immediate implementation of the backlog. Prioritize based on the next explicit instruction and observed game weaknesses, not feature count.

---

## 9. IMMERSIVE BRIDGE — APPROVED FOR DOCUMENTATION, NOT IMPLEMENTED

The owner asked for a **proposal** in which fullscreen play and optional webcam face/head tracking move the camera from the fixed perspective of a commander seated **at the center of the ship's bridge**. The later explicit instruction authorizes **documenting** these ideas and this handoff, not coding the bridge.

Full implementation specification: **docs/PROPOSED_IMMERSIVE_BRIDGE.md**.

Protected concept:
- The player's **world position remains locked to the commander's chair**. No free roaming or walking. Rotation and subtle seated lean/parallax only, within comfortable limits.
- Fullscreen entry is an explicit user gesture via the browser Fullscreen API; rejecting or exiting fullscreen does not stop the game.
- Webcam is permission-based, opt-in and local-only. Use camera frames for pose estimation, not identity; never store, upload, record or transmit them.
- **Head pose**, not eye-gaze, is the first candidate control. A normal webcam cannot guarantee reliable point-of-gaze estimation. Gain mapping should let modest head rotation turn the virtual view without the player having to look away from their screen.
- Possible renderer: Three.js for a small, optimized bridge. Possible face tracker: on-device MediaPipe Face Landmarker. These are **evaluated candidates, not installed dependencies**.
- Visual layout concept: forward windows/exterior; crew to the left; engineering/system consoles to the right; navigation above; order console below. The chair/eye origin is fixed. Objects shift through proper 3D parallax.
- Separate look controls: calibration/recenter, sensitivity, pause camera, tracking lost, manual mouse/keyboard/touch alternative, reduced-motion/accessibility.
- Existing engine remains authoritative for simulation, save data, casualties, repairs, evidence and canon. 3D bridge is a **view/controller** of the same state, not a second simulation.
- Not every scenario occurs on a ship. Where it is a platform or ground operation, either use a canon-plausible fixed command post or retain the current tactical view. Never invent a ship where the documented scene requires a different context.
- No raw camera data may traverse an API or third-party upload. If using model weights, decide on a reproducible locally served/bundled artifact and license before implementation. No new spending.
- Test a fullscreen manual-look bridge before adding webcam tracking; then validate stable calibration, latency, loss-of-face, shutdown/privacy, action usability, perf and fallbacks.
- Published GitHub Pages remains static. Introducing a library or large 3D asset pipeline would be a new implementation decision requiring evidence, not implicit approval.

### Why this matters dramatically

The bridge itself can become the instrument panel through which the player's experience of historical scale is revealed: the forward vista darkens as instrument references fail; a glance right reveals critical thermal damage; a glance left reveals the crew still at work. The chair does not move. Meaning comes from causal coherence, not unrelated particles or cosmetic spectacle.

---

## 10. FUTURE AI INTEGRATION — ZERO-SPEND / PRIVACY CONTRACT

The original project arose inside a separate OpenAI API exploration. **No live API integration is implemented or authorized here.** The deployed game's deterministic local parser does not call a model or external service.

The historical user constraint for optional later API tests was to use only an existing API project named **"Andrew's Nonsense"**, not create another, with **$0 additional spending authorized**. Account entitlements, credit grants and quotas are volatile, must be checked in the actual authorized account at time of a test, and are NOT included as public facts or guarantees here. The user reported that optional API input/output sharing was **enabled** for that project. Therefore treat it as **ineligible for private Starsilk source canon or unrestricted player text** unless there is a separate, informed privacy decision and verified project configuration.

Permitted first proof if later explicitly authorized: tiny synthetic, non-Starsilk test input for natural-language command interpretation with a strict action schema; log model/endpoint, approximate and posted token use, latency and billing classification. No consuming test is authorized merely by receiving this handoff.

If eventually considering hybrid live calls:
- Keep the deterministic engine sole authority on world state and outcomes.
- Interpret input into strict structured commands; validate legality, target, role, resources, timing and canon before state mutation.
- Never embed API credentials into browser JavaScript or Pages.
- Use a controlled backend/gateway, auth/rate limits/abuse cap/metering and an emergency stop; do not assume free backend hosting.
- Offline fallback must preserve the game even if the API fails, costs change, quota runs out, or connectivity is absent.
- Do not send private canon, personal information, secrets, or players' free text through a sharing-enabled API without explicit informed authorization.

The game must be worth playing with **zero model calls**.

---

## 11. UX, VISUAL, AUDIO AND QUALITY LAW

- **Tone:** mythic scale, precise physical causes, restrained institutional coldness, grief without sentimentality. No generic sci-fi mysticism, melodramatic evil monologues, neon decoration for its own sake, or cheerful "success" messaging over deaths.
- **Current design:** 2D dark editorial instrumentation, azure/cyan displays, amber warnings, crimson reserved for Blood Ring reality, legible typography and measured motion.
- **Future 3D bridge:** preserve hierarchy, readable actionable controls, causal external views, realistic distance/scale, subdued effects and perceptible differences between damaged and healthy systems.
- **Public copy:** no ChatGPT/AI-generation credits, prompt debris, "regenerated" notices or change-log copy in player-facing fiction.
- **Accessibility:** keyboard-usable commands, no color-only status, responsive mobile input, focus visibility, reduced-motion alternative and manual controls when camera/3D unavailable.
- **Performance:** measure on realistic devices. Do not claim 60fps, webcam parity or offline readiness without actual measurements. Keep a viable 2D mode for low-end hardware.
- **Audio:** ambient ship-system feedback may add meaning but is not implemented. It must not be the only source of critical information.
- **Identity:** no spiders anywhere in creative output. No accidental crossovers with unrelated pets, real-life people, other project universes or installed developer tools.

### Original quality-uplift contract distilled

For meaningful implementation: establish baseline, preserve working behavior, choose changes that improve experience/engineering rather than file count, verify real end-to-end paths and the diff, run relevant tests, inspect actual visual/runtime behavior, make a bounded repair, and report the weakest truthful evidence state. Do not confuse compile success, file existence, CI status, deployed URL, and full user-journey verification.

---

## 12. IMPLEMENTATION / VALIDATION CHECKLIST FOR THE SUCCESSOR

**Inspect before acting:** README.md, OPERATIONAL_STATE.md, Starsilk_Command_bible.md, PROJECT_HANDOFF_PROMPT.md, the relevant docs/ proposal, code files affected, test code, workflow and current GitHub run. If a change needs current canon, consult the Dossier authored source and its current invariants, but **do not copy its build/phase instructions into this game**.

**Protected baseline checks:**
1. Determine exact current branch, revision, remotes/target, dirty changes and permissions.
2. Run npm test when Node is present; confirm deterministic seeded runs and no changed game behavior when editing documentation only.
3. Verify nine currently existing scenarios unless a later authorized change expanded them.
4. Verify both era filters; undated incidents stay undated; no gameplay from the excluded cosmological event.
5. Verify the character whitelist (only the Shard-God as individually named established canonical figure, with the required name only).
6. Verify actual crew/job/resource/time/closure state still comes from the engine, not display code.
7. Preserve save version and known command syntax unless changes are explicitly planned/migrated.
8. Check keyboard/mobile flows, exit/return, export and any changed interaction states.
9. For visual changes, inspect real browser render; for camera features, prove actual permission lifecycle and no network video transmission.
10. For GitHub publication, commit only intended files, push only with explicit authority, verify Actions outcome and deployed SHA. Do not call a newly triggered run "success" while it is still pending.

**If the task is docs-only:** do not edit index.html, styles.css, src/*, tests/*, sw.js, manifest.webmanifest, package.json or the Pages workflow merely to make the docs "look implemented."

### Known open questions / unknowns

- What, if any, historical dates should be locked for the canon incidents currently marked undated?
- Which proposed scenario families deserve mechanically distinct new prototypes, rather than reskins?
- Which display hardware and webcam/headtracking workload gives acceptable comfort and framerate?
- How can a seated controller handle station/ground scenarios without imposing an unearned spacecraft?
- How will accessible interaction work in an immersive mode when head tracking is disabled?
- Should future AI calls exist at all given public player text and opted-in input/output sharing?
- How will future saves migrate when operation chains, rich crew psychology or new camera settings are added?
- What is still unverified about live reload/resume, offline service worker and real-device performance?
- Is there an approved public visual reference for any rare in-game appearance of the Shard-God?

**Do not fill unknowns with familiar science-fiction conventions.** Identify which source or approval would resolve each one.

---

## 13. NEXT-CHAT / NEXT-PROJECT RESUMPTION SCRIPT

You are the continuity-preserving developer and canon custodian for **Starsilk Command**, repository westkitty/Starsilk_Command, public Pages https://westkitty.github.io/Starsilk_Command/.

Read and apply the entire PROJECT_HANDOFF_PROMPT.md. Inspect the current repository files and verified CI/deployment evidence before changing anything. Keep existing playable deterministic gameplay intact. Treat docs/PROPOSED_IMMERSIVE_BRIDGE.md as explicitly **NOT IMPLEMENTED**, along with every other proposal in the handoff.

The game is set **during and after the 170-year Blood Eclipse War, strictly before Starbinding**. Preserve irrevocable canonical events and the finality of death. The **Shard-God is the only permitted individually named established canon character**, and game-facing language must use only "the Shard-God". All other personnel are new and original. Starsilk is executable material, Drakken are planetary terraformers, Blood Rings are atrocity-structures, and the Siege Wall's real exterior is a starless absence.

Use the current public [Character Dossier / Starsilk Compendium](https://westkitty.github.io/Starsilk_Character_Dossier/) for navigation, and its [GitHub source repository](https://github.com/westkitty/Starsilk_Character_Dossier) for source-authoritative lore; the separate Dossier repository is **read-only for this task**. Keep nonpublic source/credentials out of the public game repository. No live AI requests or additional spending without new approval.

When the user gives a new task, translate it into a bounded implementation or documentation contract; verify scope and requirements; change only authorized files; validate; and provide a concise, evidence-backed report with exact changed files, actual test outcomes and Git/deployment status. Do not claim that future ideas are shipped. Stop on wrong-project identity or missing authority, not on mere lack of prior-chat memory.

**End of handoff.**
