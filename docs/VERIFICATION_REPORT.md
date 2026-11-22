# Verification — 2026-11-22

## Executed in Codex Cloud
- `npm view phaser version`: stable 4.2.1.
- `npm install`: successful, package-lock.json committed.
- `npm run build`: successful TypeScript check + Vite production build.
- `npm test`: 3 Vitest tests passed (initial values; full two-month simulation including contract/duplicate guards; malformed/version-invalid save recovery).
- `npx playwright install chromium`: successful.
- `npm run test:e2e`: 2 Chromium tests passed, 1280×720 desktop and 844×390 touch landscape.

Browser flow: accept contract → three payroll steps → 5,600 balance → completed status → next month → save → reload → 5,600 / month 2 retained → load → cancel reset preserves state → confirm reset restores 5,000. Tests assert no page JavaScript errors, canvas visible and no horizontal document overflow.

## Screenshots
- [Desktop](screenshots/desktop.png)
- [Landscape mobile](screenshots/landscape-mobile.png)

Images were visually inspected: original two-wall office, diamond floor, founder behind desk, furniture depth and readable desktop management panel. Landscape layout fits the viewport with independently scrollable job panel. All actions remain reachable through panel scrolling. Native mobile performance is not established by viewport tests.

## Corrections made during verification
Phaser 4 polygon graphics use Math.Vector2, not Geom.Point. Vitest discovery was scoped to tests/unit to avoid running Playwright suites. Playwright's step selector was corrected to follow the enabled step after its label changes. A rerun started while the earlier test server was stopping failed with connection refused; a clean sequential rerun passed. Removed external font request for offline independence.

## Limits
Vite warns about a 1.59 MB JavaScript chunk (437 KB gzip), primarily Phaser; optimization deferred until measured device performance warrants it. Browser localStorage is the only save target. Native mobile, Steam, Electron, Capacitor, real-device performance and real payroll legislation are not implemented or verified. No purchased/external game assets or backend.
