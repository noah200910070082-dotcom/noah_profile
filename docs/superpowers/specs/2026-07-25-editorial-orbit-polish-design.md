# Editorial Orbit Visual Polish Design

## Goal

Polish the existing Noah Xu portfolio without replacing its established layout or multilingual behavior. The work focuses on three surfaces: photo-story dialogs, the homepage skills collage, and the animated travel chapter dividers.

## Chosen Direction

Use the **Editorial Orbit** direction selected by the user. It keeps the current playful editorial identity while improving hierarchy, spacing, and rhythm with restrained orbital decoration.

## Photo-story Dialog

- Keep the existing dialog data, image optimization, keyboard navigation, focus containment, and language switching.
- On desktop, use a roughly 60/40 image-to-copy split. The image remains the primary visual while the copy column vertically centers its metadata, title, description, and optional links.
- Add low-contrast orbital rings, a small chapter index, and a short accent rule inside the copy column. Decorations must remain behind content and must not reduce readability.
- Use consistent gaps between metadata, title, description, and action pills. Music links remain compact pills and wrap naturally.
- On tablets, keep a two-column layout with a narrower copy column and smaller type.
- On phones, stack image above copy, cap the copy region, and allow internal scrolling so the dialog always fits the viewport.
- Generic gallery images continue using the simpler caption strip; the new editorial treatment applies only to skill stories.

## Skills Collage

- Preserve all six existing skill entries, their labels, destination behavior, and the enlarged IMSC emphasis.
- Replace ad-hoc card heights with a deliberate 12-column editorial grid and consistent gaps, borders, corner radii, and caption insets.
- Tennis remains the tall anchor card. Go and violin form an aligned top row. IMSC spans the main lower area. Travel and music occupy compact supporting positions without awkward gaps.
- Apply the same image shade and caption baseline to every photographic card so labels remain readable and visually aligned.
- Preserve strong hover tilt, but prevent the hovered card from colliding with neighbors.
- Collapse to two columns on tablets and a single readable column on phones while keeping IMSC visually prominent.

## Travel Chapter Dividers

- Keep two animated dividers and their current pointer/scroll depth implementation.
- Reduce desktop height from the current large scene to a compact `clamp(220px, 24vw, 300px)` chapter band; use approximately 220px on phones.
- Change the visual theme from broad landscape poster to an **orbit-route travel band**: smaller sun/moon, layered horizon ribbons, moving route marker, drifting clouds, birds, and subtle orbital arcs.
- Keep chapter copy centered, reduce title scale, and restrict its maximum width so it never dominates adjacent galleries.
- Maintain distinct palettes: warm sunset for World → Home and cool twilight for Home → Future.
- Respect `prefers-reduced-motion` by removing transforms and animations while keeping the scene readable.

## Accessibility and Responsive Behavior

- Keep semantic dialog and button roles, focus containment, Escape close behavior, and restored trigger focus.
- Decorations use non-interactive elements and remain hidden from assistive technology through existing structure.
- Ensure text contrast remains readable over dark or colored panels.
- Avoid horizontal overflow at desktop, tablet, and 390px phone widths.

## Verification

- Extend the profile contract script before implementation so it fails until the new layout hooks and compact divider tokens exist.
- Run `npm run test:profile`, `npm run check`, `npm run build`, and `git diff --check`.
- Verify in a browser at desktop and phone widths: skill grid alignment, IMSC emphasis, modal layout and focus behavior, music links, divider height, animations, reduced-motion fallback, and horizontal overflow.
- Push `main` only after the merged result passes verification, then confirm the live homepage and travel page.
