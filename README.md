# Starsilk Command

A browser-first, offline-capable crisis-command game spanning the Blood Eclipse War and its aftermath. The game is a deterministic simulation, not an endless conversation. Scenarios vary by seeded crew, damage, resource state, risk and the player's decisions.

## Successor-project handoff

- [PROJECT_HANDOFF_PROMPT.md](PROJECT_HANDOFF_PROMPT.md) — the self-contained project-specific context, lore restrictions, implemented game inventory, source pointers and continuation instructions for moving to another ChatGPT Project. It includes both the [Character Dossier source repository](https://github.com/westkitty/Starsilk_Character_Dossier) and the [public Starsilk Compendium (GitHub Pages)](https://westkitty.github.io/Starsilk_Character_Dossier/), with source-of-truth rules.
- [docs/PROPOSED_IMMERSIVE_BRIDGE.md](docs/PROPOSED_IMMERSIVE_BRIDGE.md) — **PROPOSAL ONLY / NOT IMPLEMENTED**: optional seated-center bridge view, fullscreen, on-device webcam head-pose tracking, fallback controls and validation gates.

**As shipped:** Starsilk Command is still a **2D tactical command interface**. The repository currently contains **no 3D bridge, head/eye tracking, fullscreen bridge control or webcam integration**. These are future design proposals, not features you can activate in the game.

## Play

**Published game:** https://westkitty.github.io/Starsilk_Command/ — GitHub Actions reported successful Pages deployment on October 31, 2026 (run `41198217331`). Public-origin browser smoke testing remains an independent follow-up.

For local development (Node.js 22 or newer):

```sh
npm run serve
```

Open `http://localhost:4173/`. The game uses standard web modules and should be served over HTTP(S), not opened as a bare `file://` module. No npm dependencies, API keys, external services, telemetry or paid AI requests are used at runtime.

Choose a random incident or select an era and scenario. Optionally specify a numeric seed. The interface supports typed directives and quick commands. Each cycle represents 30 simulated seconds; up to two orders can be assigned before advancing. Crew jobs require real time, spare equipment and qualified available personnel. Complete local objectives and withdraw before the hazard window closes, or accept what the final event ledger establishes. Saves are stored locally in the browser; reports export to a `.txt` file.

## Playable scenarios

- **The Unfinished Ring** — Drakken orbital extrusion and evacuation logistics.
- **The Hushing** — failing automated defense systems and independent evidence.
- **The Drowning** — shrinking survivor access during radical hydrological terraforming.
- **Glassfall** — filter, hull and evacuation pressure during volcanic glass deposition.
- **The Broken Offensive** — battlefield debris and verified records at Pharos, Year 121.
- **The Hal’Ven Witness** — an observation-vessel perspective on the Shard-God's Year 170 heliocide. The player cannot affect its canonical outcome.
- **Siege Wall Watch** — postwar containment observation and trajectory instability.
- **The Remnant Convoy** — postwar relief deliveries and cargo degradation.
- **Archive of the Dead** — postwar preservation of contradictory records.

The precise dates of undated canonical incidents are intentionally left unspecified. All local crew, vessels, equipment, mission mechanics, numeric thresholds and unrecorded local incidents are **provisional game inventions**, not new canonical facts. All events are before the excluded later cosmological event; no content from that event is part of gameplay.

## Canon boundaries

The game respects these immutable boundaries:

1. Playable events occur in wartime or its aftermath before the excluded later event.
2. Historical events keep their established large-scale outcomes. The player's agency is local.
3. The only individually named established canon character allowed to appear or be referenced is **the Shard-God**, addressed by this title only.
4. All other named people are original procedural characters. Their deaths are final within a run.
5. Starsilk is a programmable cosmic substrate, not sentient. Drakken planetary transformation, Blood Rings, and the Siege Wall are not generic fantasy substitutions.
6. The generator rejects scenarios outside the chosen historical window.
7. Nothing in this repository grants permission to upload private source canon or unrestricted player text through an API.

## Controls

Typed commands include `repair cooling`, `repair hull`, `repair navigation`, `scan`, `rescue`, `preserve`, `deliver`, `isolate`, `stabilize`, `treat`, `transmit`, `prioritize life support`, and `withdraw`. Commands unsupported by the current situation are rejected without consuming a cycle or inventing an outcome. Quick-command buttons expose the same actual engine actions. Instructions such as `help` and `status` require no cycle.

## Architecture

- `src/scenarios.js`: canon-aware scenario templates, deterministic seed randomization, procedural roster and initial state.
- `src/engine.js`: pure transitions, action validation, crew jobs, environmental effects, critical failures, event history and after-action report.
- `src/main.js`: local UI, input handling, rendering, save/restore and text export.
- `index.html` + `styles.css`: semantic, responsive presentation and environmental schematic.
- `sw.js`: static-file caching for offline-capable repeat visits.
- `tests/engine.test.mjs`: deterministic simulation and constraint tests.
- `.github/workflows/pages.yml`: test and Pages deployment pipeline for the `main` branch.

No framework or runtime dependency is required. Standard browser storage holds a single latest incident. There is no cross-device syncing, server account, live AI dialogue, audio layer or multiplayer in this initial product.

## Verification

```sh
npm test
```

Engine tests cover seeded reproducibility, era boundaries, refused orders, command slots, crew job progression, rescue and cargo mechanics, record transmission, loss conditions and save shape. Browser smoke testing should additionally cover launch, quick commands, manual directives, reload resume, keyboard and mobile interaction, end-of-run reporting and the live Pages URL. A static source test alone does not establish successful publishing.

### GitHub Pages setup

The workflow publishes only the application files, not repository docs, tests, hidden metadata or raw canon sources. The repository's GitHub Actions Pages deployment was verified successful on October 31, 2026. The workflow automatically tests and publishes on pushes to `main` or manual execution. After future pushes, confirm the corresponding run succeeded before claiming that revision is live.
