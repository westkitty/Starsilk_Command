# PROPOSED IMMERSIVE BRIDGE — FULLSCREEN + SEATED HEAD TRACKING

> **STATUS: DESIGN PROPOSAL ONLY — NOT IMPLEMENTED.**  
> Nothing in this document changes the present game or constitutes authorization to install a renderer, access the webcam, alter the simulation, deploy or spend money.

**Related master handoff:** ../PROJECT_HANDOFF_PROMPT.md  
**Owner/game:** westkitty/Starsilk_Command  
**Baseline:** A responsive 2D HTML/CSS/JS tactical interface with an SVG incident schematic. No fullscreen or webcam/3D bridge control has been added as of 2026-10-31.

## 1. Experience goal

Build an optional immersive ship-bridge mode where the player inhabits the exact **seated eye position of the commander in the center of the bridge**. They can turn their viewpoint left/right/up/down and subtly lean from that seat. They cannot walk, translate freely across the room, teleport, or operate a free-fly camera. It should feel like the monitor opens into a coherent built environment rather than a rotating wallpaper.

- **Ahead:** forward bridge glazing / exterior historical threat at credible scale.
- **Left:** crew workstations and operational assignments.
- **Right:** engineering, life support and damaged-system consoles.
- **Above:** navigational, strategic and reference displays.
- **Below:** command input and order/confirmation interface.
- **Seated physical motion:** limited head rotation plus small positional parallax; the commander remains anchored in the chair.

This placement is a **proposed bridge design**, not an existing canonical spaceship floor plan. The game has no locked vessel model or approved bridge art. Do not assert that it does.

## 2. Non-negotiable preservation

- Keep the entire existing 2D tactical game available, working and accessible.
- One authoritative simulation engine (src/engine.js); renderers and tracking must not mutate game state directly.
- Only a validated player action can issue an order; looking at a console does not silently repair, fire, transmit or move assets.
- All crew, damage, cooling, fuel, hazards, deaths, evidence, commands and outcomes derive from existing game state and documented transitions.
- Historical catastrophe is not reversible. Rare Shard-God appearances obey the name and action locks in PROJECT_HANDOFF_PROMPT.md.
- No new camera capture or audio capture on initial page load. Opt-in must be explicit and reversible.
- No raw camera video, facial images, face embeddings, biometric identifiers or audio stored, uploaded, logged or passed to the server/API.
- No cost, telemetry, external service or dependency addition without the next explicit implementation authorization.
- Current Pages remains static; offline 2D gameplay must not fail because a proposed 3D feature cannot load.

## 3. Candidate architecture — NOT INSTALLED

**A. Fullscreen shell:** the standard browser Fullscreen API, invoked from an obvious "Enter Bridge" user gesture. Handle request rejection, ESC exit, browser fullscreen changes, focus and wake behavior. Fullscreen is not supported identically on every browser/mobile surface; a dedicated immersive viewport fallback must remain.

**B. 3D bridge layer:** a lightweight Three.js scene with fixed seat transform, modest cockpit geometry, distance-correct external representation, and a separate DOM overlay for accessible controls/status. Renderer is a candidate; compatibility, bundle, license, budget and lifecycle must be verified before adoption. Preserve 2D UI and independent game engine.

**C. Local webcam head-pose layer:** MediaPipe Face Landmarker or another evaluated on-device tracker may estimate head position/orientation; this is NOT eye tracking. Browser getUserMedia requires permission and a secure context. Camera stream stops when disabled, denied, inactive, or leaving the immersive mode. Offline operation of tracker/model weights requires deliberate bundling and licensing. Never silently fetch opaque tracking code from a third-party CDN on a privacy-first game.

**D. Input abstraction:** head tracking, mouse drag, keyboard arrows, pointer/touch and recenter actions should feed a single controlled view-orientation interface. No game state is decided by face recognition or model output.

**E. Canonically differentiated exterior:** each mission's scene is driven from the current scenario and engine state; no fake orbital ring completion, no glowing physical Siege Wall lattice, no invented celestial exposure, no magical reversals. When station/planetary operations cannot logically occur on a ship bridge, use an appropriate fixed command post or revert to 2D.

## 4. Camera/comfort contract

- Fixed seat/world-space anchor; yaw/pitch/roll limited. Roll should be tiny or zero unless a real comfort study justifies it.
- On entering mode, neutral pose is calibrated. Include "Recenter View" and adjustable, persisted look sensitivity.
- Use smooth filtering with bounded latency; the camera must not jitter or overshoot on ordinary face motion.
- Approximate starting **experiment**, not established measurement: 15 degrees of real yaw may map to ~30–35 degrees in-game. Limit per-axis movement and measure comfort before locking sensitivity.
- Small lean offsets produce parallax, with strict travel bounds inside the seat; nearby panels move more than exterior objects.
- If face detection is lost, hold briefly then ease toward neutral; never jump or keep moving unpredictably.
- Head tracking must not force the player to turn so far that they cannot see the actual screen.
- Gaze tracking is a **future experiment** and should not be advertised as accurate on a commodity webcam.
- All rendered change remains cosmetic until an actual click/keyboard/typed action or explicit gaze-confirm mechanism is implemented and tested. Do not implement involuntary gaze activation.

## 5. UI / states / privacy details

Proposed actions: Enter Bridge, Exit Bridge, Enable Camera Tracking, Disable Camera Tracking, Calibrate Neutral, Recenter, Sensitivity, Pause Tracking, Restore Manual View.

States to support explicitly: initial 2D, fullscreen requested, immersive active without camera, webcam permission prompt, permitted and calibrating, tracking active, face not found, temporarily paused, device unplugged, permission denied, model unavailable, browser unsupported, WebGL lost, reduced motion, fullscreen exited, and 2D restored.

- Provide camera-active visual indicator (not camera footage) and straightforward explanation that processing stays on-device.
- No auto-start on load or resume. Camera permission never becomes mandatory for game progression.
- Screen-reader/keyboard controls for every command; do not hide important events behind a 3D-only surface.
- Touch/mobile manual pan must remain usable if mobile cameras or orientation tracking are unavailable.
- Maintain legible contrast for system warnings and separate in-game damage lighting from actionable status labels.
- Consent for face tracking and eventual optional AI are independent permissions; do not conflate them.

## 6. Three bounded engineering phases — ALL PROPOSED

### Phase 1 — Fixed-seat bridge and fullscreen, manually controlled

Implement the smallest 3D scene that makes a seated view credible: chair anchor, forward glazing, left/right consoles, navigation panels, stable pointer/keyboard look. Keep original engine and 2D mode. Verify incident launch, status, one real command, advance cycle, report, exit fullscreen and return to ordinary play. **No webcam required yet.**

### Phase 2 — Privacy-first webcam head-pose prototype

Add explicit opt-in, local tracking, neutral calibration, adjustable gain and smoothing, head-loss recovery, webcam shutdown, and manual fallback. Benchmark actual runtime on a typical supported device; do not claim performance without measurements. Choose tracker and model based on accuracy, licensing and offline packaging. Preserve the engine as sole source of outcome truth.

### Phase 3 — Fully responsive living bridge

Drive console indicators, crew display states, external conditions, alarms and lighting from the same deterministic simulation. Add subtle parallax only after stability proof, then investigate scenario-specific environments, responsive touch usability and reduced-motion parity.

No phase or subfeature is considered implemented just because it is described here.

## 7. Acceptance tests for a future explicitly authorized build

1. On a supported desktop browser, click "Enter Bridge"; fullscreen request succeeds or emits a recoverable failure without affecting gameplay.
2. Camera origin stays physically at the command chair while look controls turn toward left/right/upper/lower surfaces. No walking/free flight.
3. Left crew station and right engineering readouts reflect real engine data. An actual order changes the system only via the engine and takes proper in-game time.
4. When camera access is denied, the same mission can still be played from mouse/keyboard/touch or 2D.
5. When tracking is active, 10 consecutive ordinary turns do not produce major jumps; recenter resets to neutral; losing the face causes bounded recovery.
6. Stopping tracking and exiting the bridge stops MediaStream tracks; no video pixels, face images or biometric data leave the device or persist in localStorage.
7. ESC/fullscreenchange, WebGL context loss, resize, visibility changes, device unplug and permission-revocation cases have defined recovery.
8. Scenario exterior is canon-consistent and reflects relevant simulation state; physical space never displays a glowing Siege Wall grid or a finished Blood Ring without an actual matching incident state.
9. Existing 2D commands, saves, report export, replay and all deterministic Node tests still pass.
10. Desktop/mobile UI, keyboard focus and reduced-motion mode retain a complete user path. No dependency or new billing has been installed without explicit authority.
11. Benchmark startup, face-estimation latency, frame-time and memory on representative hardware; assign measured labels, not aspirational performance claims.
12. After any approved deployment, verify the exact published commit and real-origin load and restoration rather than assuming GitHub Actions success equals full UX proof.

## 8. Risks and rejected shortcuts

- **False gaze claim:** head pose does not establish exact retinal gaze; never market it as accurate eye tracking.
- **Wrong camera illusion:** screen-relative off-axis parallax and large virtual head rotation are distinct methods. They may be combined carefully; test both rather than stacking gains blindly.
- **Motion sickness / eye strain:** default to low gain, calibration, sensible limits and manual options.
- **Performance and model fetch:** webcam processing plus WebGL can be expensive, especially on low-memory laptops and mobile devices. No performance claim without real measurement.
- **External dependency/privacy:** do not introduce a CDN that sends camera frames or loads tracking code without a documented privacy review and approval.
- **Bad game architecture:** no duplicate simulation inside the 3D renderer; no generic asset replacement of authored 2D UI.
- **Lore leakage:** do not upload private canon or use another project's unapproved source images.
- **Overreach:** do not insert 3D bridge controls into the live interface in a documentation-only task.

## 9. Next decision

The owner has approved **recording this design**, not deploying it. A future decision may separately authorize Phase 1. Until then, the repository's 2D tactical view is the real product, and this document remains **unimplemented proposal**.
