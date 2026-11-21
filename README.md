# RavenForge public website

Public source for [ravenforge.us](https://ravenforge.us), RavenForge software by Walker Pollitt. Walker Pollitt LLC is the business.

## Develop and validate

Use Node.js and the checked-in package lock:

```sh
npm ci
npm run test:demos
npm run build
npm run dev
```

The Vite development server uses port 3000. The Cloudflare assets configuration serves SPA routes. Build output and local credentials are ignored by Git.

## Public routes

- `/demos`: demo landing page and responsibility map; `/` redirects here.
- `/guided-demo`: six-step facility cutaway. `?chapter=1` through `?chapter=6` select a step. Evidence review, option selection and a human decision stay inside the scene; detailed calculations are in the inspection drawer.
- `/demos/military`: authorized-device offline-sharing concept, device admission, bounded work and human review.
- `/demos/council`: scripted Council review, ROOKERY task records and HEIMDALL sample health observations.
- `/platform`: dated evidence summary and development limits.
- `/audit-tour`: retained earlier inspection tour.
- `/cockpit`: fictional entertainment/navigation.

These are generated scene images with native interactive browser controls, not a real 3D engine, live telemetry, model execution, equipment control, security certification or grant endorsement. A supplied trust-failure flag is not malware detection. The current laptop proof is deferred; local placement must not be described as cross-machine acceptance.

## Release

Build and test first, then upload a version without changing production:

```sh
npm run test:demos
npm run build
npx wrangler versions upload --message "Describe the release"
```

Record the returned version ID and the current production version. Activate the exact reviewed version only with release authorization:

```sh
npx wrangler versions deploy <reviewed-version-id>@100 --yes --message "Describe the release"
```

Recheck the public routes, image loading and retry, source review, selection/invalidation, human gates, keyboard navigation, mobile layout, and normal/reduced motion. Compare deployed JS/CSS and scene bytes with the build. Preserve the prior version for rollback:

```sh
npx wrangler versions deploy <previous-version-id>@100 --yes --message "Rollback: reason"
```

The Cloudflare Worker is `ravenforgeusv11`. Operator evidence and private runtime records are kept separately from this public repository. The current release is documented in `RELEASE_2026-11-21.md`.

## Assets and tests

Scene artwork is under `public/demo-scenes`. The facility's last four scenes share a 2x2 image atlas framed by SVG; the original images are not transformed into GPU compositing layers. Keep image loading, error/retry and direct-image recovery visible.

The unsuffixed `facility.png`, `military.png` and `council.png` are intentional compatibility copies for older client bundles. Their current `-r2` counterparts have identical bytes. Retain the legacy URLs until a separate compatibility review permits removal.

`tests/cutawayModel.test.mjs` and `tests/scenarioModels.test.mjs` exercise calculations, admission, stale/unknown states, independent evidence checks, and the separation of health observations from authority. Browser verification records are maintained with the operator release evidence.
