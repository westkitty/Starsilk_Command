# Operational State — Starsilk Command

Project ID: `westkitty/Starsilk_Command`
Status revision: 2
Evidence date: 2026-10-31
Current task: initial game published to GitHub Pages; live-origin browser verification and playtesting remain.

## Binding and authority

- Authorized repository only: `westkitty/Starsilk_Command`, public, default branch `main`.
- The repository was empty at preflight; there was no existing code or user working-tree state in the remote repository to overwrite.
- Project content is governed by explicit instructions in the current Starsilk Command conversation, then current canonical Starsilk sources. This document does not confer new lore authority.
- Latest explicit character lock: the Shard-God is the only individually named established canon character permitted; do not use other titles or names for him. Other characters must be new and generated.
- Time lock: events during and after the Blood Eclipse War, but not the excluded later cosmological event or its consequences.
- Gameplay lock: deterministic world state, actual simulation; no AI-created physical outcomes. No actual API calls or extra spending.

## Implemented

- Nine scenario templates with deterministic seeded generation and procedural five-person crew.
- Physical subsystems, resource costs, assignment durations, environmental escalation, casualty permanence and event log.
- Local command grammar with limited order capacity, direct feedback, refused invalid requests, and scenario-specific actions.
- Responsive game UI, local autosave, incident export and shell cache.
- GitHub Actions test and Pages workflow added to source.

## Verified locally

- `npm test`: 14/14 unit and simulation tests pass (2026-10-31).
- Chromium with inlined assets: launch, issuing `scan`, advancing cycle, mobile `deliver` action, desktop/mobile rendering and absence of reported JavaScript exceptions in these test runs.
- Chromium test viewports: 1440px and 390px; no horizontal overflow observed.
- HTTP server: `curl -I http://localhost:4173/` returned HTTP 200.

## Verified remotely

- GitHub `main` revision `bca0f0ecb0dcc779bf6572a89008df12186bba9e` was inspected directly.
- GitHub Actions run `41198217331` completed successfully on 2026-10-31: `test` job passed, and `publish` deployed its Pages artifact; deployment log recorded `Reported success!` at 11:46:49 UTC.
- Pages environment URL recorded by deployment: `https://westkitty.github.io/Starsilk_Command/`.
- Remote source blob hashes for `index.html`, `styles.css`, `src/main.js`, `src/engine.js`, `src/scenarios.js`, `tests/engine.test.mjs`, and the Pages workflow matched the locally tested content.
- `npm test` was repeated locally in the follow-up and again passed 14/14.

## Unverified or blocked

- Direct browser navigation (including `http://127.0.0.1:4173/` and `file://`) was blocked by the test environment (`ERR_BLOCKED_BY_ADMINISTRATOR`); this does not negate the GitHub deployment result. Public HTTP delivery, reload/autosave, service-worker activation and full served module interaction remain untested from a real browser origin.
- Accessibility beyond semantics, responsive visible states, and ordinary button interaction has not been independently audited with a screen reader.
- Game content, crew rules and equipment are provisional for Starsilk canon, not promoted.

## Next verification

1. Open the published URL in a supported browser and verify resource loading, launch, one action, cycle advancement and report export.
2. Refresh, resume a saved incident, and test offline fallback after first successful online load.
3. Conduct a bounded balance playtest for each scenario family and expand event-causality tests.
4. Preserve the user-locked historical, character-naming, and API-privacy boundaries.
