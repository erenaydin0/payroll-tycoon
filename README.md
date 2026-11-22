# Payroll Tycoon v0.1
A Turkish-language, offline-first Level 1 payroll management prototype. Original geometric isometric office rendered with Phaser 4.2.1, React 19, TypeScript and Vite.

## Run
Node 22+: `npm ci`, `npm run dev`. Build: `npm run build`. Unit checks: `npm test`. Browser checks: `npx playwright install chromium`, `npm run test:e2e`.

Accept Atlas Kırtasiye, prepare three payroll steps, earn 600 once each month and advance. Every command saves locally; explicit Save/Load are also available. New game requires confirmation. Browser storage failures are shown as messages; no cloud save. Calculations are fictional, not Turkish payroll legislation.

Simulation, persistence, shared state, Phaser scene and React UI live in separate folders under src. Phaser subscribes to the same store as React. Floor tiles use a 2:1 diamond; founder and furniture sprites have ground-contact depth ordering. Geometry is drawn into original textures at startup.

The official Phaser React/Vite pattern (React effect owns the Phaser lifecycle) is used in a minimal setup; the upstream template was not copied. npm reported stable Phaser 4.2.1 on 2026-11-22. Versions are locked in package-lock.json.

See docs/VERIFICATION_REPORT.md. Electron, Capacitor, Steam, native devices and production art are outside this prototype; renderer-independent simulation leaves future packaging possible but unverified.
