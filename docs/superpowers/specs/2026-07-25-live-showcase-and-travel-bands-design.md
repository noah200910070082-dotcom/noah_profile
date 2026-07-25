---
title: Live project showcase and compact travel bands
date: 2026-07-25
---

## Goal

Bring the current portfolio closer to the supplied reference screenshots without changing the existing site architecture. Travel chapter transitions become narrow, full-width animated bands. Project cards use real page captures with a readable editorial overlay. The “New maps, new people” card gains a real travel photograph.

## Design

- Keep the existing twelve-column card grid, typography, language switcher, and tilt interaction.
- Add responsive WebP output from local captures of the FieldGuard AI and AI Transit Station demos, plus the supplied portfolio overview capture.
- Layer project copy above image captures with a subtle dark gradient, glass metadata chip, and gentle image zoom on hover.
- Add a real Shanghai travel image to the home-page travel card while preserving its link to `/travel`.
- Compress travel landscape dividers into slim, full-bleed transition bands. Keep orbit, route marker, clouds, birds, and reduced-motion support, but reduce height and outer whitespace.

## Verification

- `npm run test:profile`
- `npm run check`
- `NAPI_RS_FORCE_WASI=1 npm run build`
- `git diff --check`
