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
