# Noah Profile Interactive Enhancement Design

Date: 2026-07-24

## Objective

Enhance the existing Noah profile without replacing its layout. The work should make the travel page feel as alive as the homepage, turn the skills grid into an image-led interactive section, add two GitHub projects to the portfolio, and replace the repository's minimal README with a visual introduction.

## Confirmed Scope

- Preserve the current Astro single-page homepage structure and the dedicated `/travel` page.
- Use the selected **Dynamic Landscape Layers** direction for travel transitions.
- Make `MO / IMSC` the largest skills card and include the existing IMSC delegation photo.
- Make each skills card an accessible visual entry that opens a shared image-story viewer on the homepage.
- Use the supplied personal photos for tennis, Go, violin, and music.
- Keep the travel card as a direct link to `/travel`.
- Add Jay Chou YouTube music links inside the music story.
- Add `fieldguard-ai` and `ai-transit-station` as portfolio displays only. Do not change either repository.
- Expand this repository's `README.md` with a visual project overview.
- Continue supporting English, Traditional Chinese, and Simplified Chinese.

## Homepage Skills Design

The existing six-card grid remains recognizable, but the visual hierarchy changes:

- `MO / IMSC` becomes the dominant card on desktop, spanning the largest grid area and using the IMSC photo as an edge-to-edge image with readable overlay text.
- Tennis uses the medal/tournament photos and remains a strong secondary card.
- Violin uses the formal violin portrait.
- Go uses the supplied ranking-event photo.
- Music uses the concert photo and opens a story containing several Jay Chou listening links.
- Travel keeps its blue visual identity and navigates to `/travel` instead of opening the viewer.

Skill cards use semantic buttons except for Travel, which remains an anchor. Hover and pointer movement create the existing 3D tilt, image depth, and controlled scale. Clicking a skill opens one shared modal viewer rather than adding separate pages.

The viewer contains:

- a large responsive photo;
- skill name, short multilingual story, and optional achievement metadata;
- previous/next controls where a skill has multiple photos;
- close button, backdrop close, Escape handling, and focus restoration;
- music links that open YouTube in a new tab without autoplay or embedded copyrighted media.

Initial Jay Chou selections will be `晴天`, `稻香`, `七里香`, and `青花瓷`, linked through stable YouTube search URLs so unavailable regional uploads do not break the site.

## Travel Page Design

The empty-feeling gaps between chapters are replaced with purposeful transition scenes. Each transition is a compact landscape stage, not a blank spacer.

Layers include:

- softly moving sky gradients and blurred light orbs;
- foreground and background hills with different movement speeds;
- clouds, birds, route dots, map coordinates, and a small moving travel marker;
- chapter-specific palettes that blend Abroad into Domestic and Domestic into Universities;
- large next-chapter typography and coordinates so the transition also communicates navigation.

Motion sources:

- CSS keyframes for continuous ambient movement;
- pointer-based parallax for desktop;
- scroll progress applied through CSS custom properties for depth and translation;
- the existing card tilt system for portals and photographs.

The design must respect `prefers-reduced-motion`, disable pointer parallax on coarse pointers, avoid layout-shifting transforms, and keep animation on `transform` and `opacity` for performance.

The two new United States photos are added to the Abroad gallery as Washington, D.C. entries. Existing travel image zoom and keyboard navigation remain intact.

## Projects Design

The current Projects section keeps its editorial card system and gains two linked GitHub cards:

1. **FieldGuard AI / 智护田**
   - Description: multimodal perception and AI-driven crop disease and pest prevention.
   - Visual language: agricultural green, scanning grid, crop/AI signal motif.
   - Link: `https://github.com/noah200910070082-dotcom/fieldguard-ai`.

2. **AI Transit Station**
   - Description: React, Vite, and new-api based AI API transit console.
   - Visual language: violet/indigo routing paths, connected nodes, API flow motif.
   - Link: `https://github.com/noah200910070082-dotcom/ai-transit-station`.

The cards will use lightweight CSS visualizations rather than external screenshots, keeping the section fast and stylistically consistent. External links clearly indicate GitHub and open safely in a new tab.

## README Visual Introduction

`README.md` becomes a concise project landing page containing:

- title, live website link, and short multilingual-friendly project statement;
- technology and deployment badges;
- a Mermaid project map showing homepage sections, the travel page, language system, image viewers, and linked projects;
- visual feature table for the homepage, skills stories, travel atlas, and responsive interaction;
- linked list of featured repositories including FieldGuard AI and AI Transit Station;
- project structure and local development commands;
- verification and deployment notes.

The README will describe the portfolio repository only. It will not claim that the linked repositories are part of the same codebase.

## Assets

New supplied photos will be copied into stable, descriptive paths under:

- `src/assets/skills/`
- `src/assets/travel/`

No source files will reference temporary WeChat or clipboard locations. Astro's image pipeline will generate optimized responsive formats during build.

## Accessibility and Error Handling

- All new images receive descriptive English alt text.
- Interactive cards are keyboard accessible.
- Modal state uses `aria-hidden`, an accessible dialog label, focus restoration, and body scroll locking.
- External music and project links use `rel="noreferrer"`.
- Missing images or links must not prevent the remaining page from rendering.
- All three languages remain available for new visible copy.

## Verification

- Run `npm run check` with the repository's WASI compatibility environment.
- Run `npm run build` and confirm both `/index.html` and `/travel/index.html` are generated.
- Run `git diff --check`.
- Browser-test desktop and mobile widths.
- Verify skills modal opening, closing, keyboard navigation, and focus return.
- Verify all project and music links.
- Verify travel transitions have no oversized empty gaps and no horizontal overflow.
- Verify `prefers-reduced-motion` behavior.

## Git and Deployment

- Do not add or modify the unrelated `Hongshuling/` directory.
- Commit website/README implementation as a focused change after verification.
- Push to `origin/main` and verify `https://www.noahxu.org/` and `https://www.noahxu.org/travel` after deployment.
