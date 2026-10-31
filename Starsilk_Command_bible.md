# Starsilk Command — Project Bible

## 2026-10-31 — Initial playable implementation

**Repository:** `westkitty/Starsilk_Command`. **Branch:** `main`. GitHub repository existed but was empty at first inspection.

**Product purpose:** A browser-based, offline-capable crisis-command game in Starsilk's Blood Eclipse War and subsequent pre-excluded-event history. Players manage incomplete information, crew, resources, and cascading emergencies. The world simulator, not dialogue, resolves outcomes. Historical events cannot be rewritten by local player actions.

**Creator constraints:** The Shard-God is the only permitted individually named established canon character. This designation alone is used. Original crew names may be procedurally generated. The game must contain no gameplay from the excluded later cosmological event, no generic sentient Starsilk, and no invented powers or magical undo for death.

**Technical baseline:** Vanilla HTML/CSS/JS modules; Node built-in test runner; local static server for development; static GitHub Pages workflow. No runtime AI API, payments, third-party packages or external visual assets. A single browser-local save slot and downloaded incident-report text.

**Current mechanics:** Nine scenario families; seeded generation; up to two orders per 30-second cycle; job scheduling; subsystem damage; limited supplies; risk thresholds; scenario-specific hazards; withdrawal; independently observed evidence; local casualty finality. UI includes scene telemetry, subsystem meters, crew, commands, log and after-action outcome.

**Validation evidence:** 14 deterministic tests pass. Chromium DOM/screenshot interaction tests passed via an inlined mirror of the static source at 1440px desktop and 390px mobile; direct localhost navigation was blocked by browser policy. This is not proof of live Pages deployment, service worker, localStorage reload flow or full accessibility.

**Publishing status at this entry:** Source prepared. Pages activation must be verified after committing; initial repository Pages settings could not be read or written through the available GitHub connector.

**Future priorities:** Confirm deployed live page; test save/reload/offline in actual origin; adversarial scenario-balance tests; improve environment-specific control maps; optional AI parser only after separate consent and privacy-safe design.

## 2026-10-31 — Pages publication verified

- **Remote source:** `westkitty/Starsilk_Command`, `main` at `bca0f0ecb0dcc779bf6572a89008df12186bba9e` at verification. GitHub remote blobs for game source and tests matched the locally tested files.
- **CI:** GitHub Actions run `41198217331` successfully completed both the test and publish jobs. Deployment action reported success on 2026-10-31 at 11:46:49 UTC.
- **Published environment URL:** https://westkitty.github.io/Starsilk_Command/
- **Validation:** `npm test` independently repeated (14/14 passing); separate local browser navigation to HTTP, file, and data URLs was blocked by administrator policy, so live HTTP, reload/resume, service-worker offline fallback and screen-reader paths remain unverified.
- **Protected scope:** No gameplay or canon changes were made during publication follow-up. Avoid treating a successful deployment action as proof of every real-browser interaction.
- **Next:** Real-origin smoke test; saved-run refresh; offline cache re-entry; bounded scenario playtests.


## 2026-10-31 — Successor-project handoff and proposed bridge design

**Authority:** Explicit owner request to record and commit ideas, not build new bridge features.

**Documentation:** New PROJECT_HANDOFF_PROMPT.md is a portable game-context/canon prompt for a fresh ChatGPT Project without the old Starsilk Character Dossier context. New docs/PROPOSED_IMMERSIVE_BRIDGE.md records the fullscreen/fixed-seat commander's perspective and opt-in on-device head-pose tracking concept, candidate technology, fallback behavior, phases and proof requirements. README links both; OPERATIONAL_STATE.md records the distinction.

**Canon sources:** Current public authored Starsilk Character Dossier lore and machine invariants; relevant Drakken/Blood Ring sources; October 22, 2026 creator-confirmed delta; original Command brief and follow-up corrections. Source facts are summarized and marked; no broad private Drive originals, secret keys or unpublished media are copied to this public Git repository. The Dossier is a source, not this game's workspace or update target.

**Feature evidence:** **Not implemented**. No changes authorized or performed to the game engine, UI logic, camera capture, fullscreen control, renderer, save schema, tests or Pages workflow. The existing 2D game is the only shipped interface.

**Validation/delivery:** Docs-only changes should preserve 14 existing Node tests; publication status and exact SHA require readback after the commit. Future successor must re-verify current repository state, not inherit this as current forever.

**Next work:** User-directed build approval for prototype or continue game balance/real-browser QA. Do not silently start the webcam/3D project from a documentation entry.

## 2026-10-31 — successor canon locator amendment

User-required cross-project handoff locator: include **both** Character Dossier GitHub source (`https://github.com/westkitty/Starsilk_Character_Dossier`) and browsable Compendium Pages (`https://westkitty.github.io/Starsilk_Character_Dossier/`). The Dossier README states its Pages deploy from `main` / `docs`. In the successor handoff, make the correct authority distinction: authored `src/content/sections/*.body.html` and `*.title.html` are lore authority; generated Pages are browsable derivatives; `src/canon/invariants.json` contains selected machine locks, not the whole canon. The Dossier is never this game's write target. This amendment modifies documentation only; the seated immersive bridge remains **NOT IMPLEMENTED**.
