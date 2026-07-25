# Editorial Orbit Visual Polish Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Refine the existing skill stories, skills collage, and travel transitions into the approved Editorial Orbit direction while preserving all current content and interactions.

**Architecture:** Keep the existing Astro markup, story data, and client-side controllers. Add stable presentation hooks only where the dialog needs decorative elements, then implement the visual changes in the existing homepage stylesheet and travel page scoped stylesheet. Extend the existing contract script to protect the new layout and responsive constraints.

**Tech Stack:** Astro 5, TypeScript in Astro scripts, CSS Grid, CSS custom properties, Node contract tests.

---

### Task 1: Define the visual layout contracts

**Files:**
- Modify: `scripts/verify-profile.mjs`

- [ ] **Step 1: Write the failing contract assertions**

Add these tokens to the homepage and travel contract checks:

```js
[
  'story-viewer-orbit',
  'story-viewer-copy-index',
  'grid-template-areas:',
  'life-imsc-feature',
].forEach((value) => assert(homeSource.includes(value), `Missing editorial layout contract: ${value}`));

[
  'travel-orbit',
  'clamp(220px, 24vw, 300px)',
  'height: 220px',
].forEach((value) => assert(travelSource.includes(value), `Missing compact travel divider contract: ${value}`));
```

- [ ] **Step 2: Run the contract test and verify RED**

Run: `npm run test:profile`

Expected: FAIL with `Missing editorial layout contract: story-viewer-orbit`.

- [ ] **Step 3: Commit the failing contracts**

```powershell
git add -- scripts/verify-profile.mjs
git commit -m "test: define editorial orbit layout contracts"
```

### Task 2: Refine the photo-story dialog

**Files:**
- Modify: `src/pages/index.astro`
- Modify: `src/styles/global.css`
- Test: `scripts/verify-profile.mjs`

- [ ] **Step 1: Add non-interactive editorial decoration hooks**

Inside the skill-story figure caption, add:

```astro
<span class="story-viewer-orbit" aria-hidden="true"></span>
<span class="story-viewer-copy-index" aria-hidden="true">NOAH_XU · STORY</span>
```

Keep the existing meta, caption, description, and optional links after those elements.

- [ ] **Step 2: Implement the desktop editorial split**

Update `.story-viewer-dialog.is-skill-story` styles so the figure uses a `minmax(0, 1.45fr) minmax(320px, 0.78fr)` grid. Center the copy column vertically, introduce a `clamp()` gap scale, keep content above the orbital pseudo-decoration, and allow long copy to scroll inside the column.

- [ ] **Step 3: Implement tablet and phone behavior**

At the existing tablet breakpoint, keep a narrower two-column split. At the phone breakpoint, switch to one column, limit the caption to `min(40vh, 330px)`, retain internal scrolling, and scale the orbital decoration down.

- [ ] **Step 4: Run the contract test and verify the dialog contract is GREEN**

Run: `npm run test:profile`

Expected: the homepage editorial tokens pass; the travel compact-divider token remains failing until Task 4.

- [ ] **Step 5: Commit the dialog polish**

```powershell
git add -- src/pages/index.astro src/styles/global.css
git commit -m "feat: polish skill stories with editorial layout"
```

### Task 3: Align the skills collage

**Files:**
- Modify: `src/styles/global.css`
- Test: `scripts/verify-profile.mjs`

- [ ] **Step 1: Define named grid areas**

Change the desktop `.life-grid` to a 12-column layout with named areas:

```css
grid-template-areas:
  "tennis tennis tennis tennis go go go violin violin violin violin violin"
  "tennis tennis tennis tennis imsc imsc imsc imsc imsc imsc imsc imsc"
  "travel travel travel music music music imsc imsc imsc imsc imsc imsc";
```

Assign every existing card to one area and use shared border radius, caption inset, and overflow behavior.

- [ ] **Step 2: Normalize image and caption treatment**

Use a shared lower gradient, aligned label/title baselines, and consistent hover scale. Keep tennis tall and IMSC largest without leaving accidental holes.

- [ ] **Step 3: Add responsive area maps**

At tablet width, use two balanced columns with IMSC spanning both. At phone width, use one column with deliberate card heights and IMSC remaining taller than supporting cards.

- [ ] **Step 4: Run the contract test**

Run: `npm run test:profile`

Expected: the homepage contract passes and no existing card/story checks regress.

- [ ] **Step 5: Commit the collage alignment**

```powershell
git add -- src/styles/global.css
git commit -m "feat: align skills into editorial collage"
```

### Task 4: Convert travel scenes into compact orbit-route bands

**Files:**
- Modify: `src/pages/travel.astro`
- Test: `scripts/verify-profile.mjs`

- [ ] **Step 1: Add the orbit layer to both dividers**

Add this decorative layer to each `[data-landscape-divider]` section:

```astro
<span class="landscape-layer travel-orbit" data-landscape-depth="0.48" aria-hidden="true"><i></i></span>
```

- [ ] **Step 2: Reduce divider dimensions and retune the scene**

Set desktop height to `clamp(220px, 24vw, 300px)`, reduce sun/moon/cloud sizes, move the horizon lower, and scale the copy to `clamp(1.8rem, 4vw, 4.25rem)`. Style `.travel-orbit` as a subtle dashed orbital arc behind the copy.

- [ ] **Step 3: Update mobile behavior**

At `max-width: 590px`, set `.travel-landscape-divider { height: 220px; }`, keep the copy below 3rem, and hide only nonessential scene details.

- [ ] **Step 4: Verify GREEN**

Run: `npm run test:profile`

Expected: `Profile contracts verified.`

- [ ] **Step 5: Commit the compact dividers**

```powershell
git add -- src/pages/travel.astro
git commit -m "feat: compact travel transitions into orbit bands"
```

### Task 5: Full verification and browser QA

**Files:**
- Verify: `src/pages/index.astro`
- Verify: `src/pages/travel.astro`
- Verify: `src/styles/global.css`
- Verify: `scripts/verify-profile.mjs`

- [ ] **Step 1: Run automated verification**

```powershell
npm run test:profile
$env:NAPI_RS_FORCE_WASI='1'; npm run check
$env:NAPI_RS_FORCE_WASI='1'; npm run build
git diff --check
```

Expected: contracts pass, Astro reports zero project errors, two pages build, and Git diff check is clean.

- [ ] **Step 2: Verify desktop behavior in the browser**

Check the homepage and travel page at a desktop viewport. Confirm no horizontal overflow, IMSC remains the largest skill card, the modal copy is vertically balanced, four music links remain present, and both travel bands stay between 220px and 300px.

- [ ] **Step 3: Verify phone behavior in the browser**

Check at 390px width. Confirm one-column skill cards, modal viewport containment with scrollable copy, 220px travel bands, centered titles, and no horizontal overflow.

- [ ] **Step 4: Verify interaction and accessibility**

Open a skill story, confirm the image is WebP, Tab stays within the dialog, Close restores focus, language switching still updates copy, and reduced-motion removes depth transforms.

- [ ] **Step 5: Commit any verification-only adjustment**

If browser QA requires a small correction, update its contract first, verify RED, implement the correction, verify GREEN, and create a focused `fix:` commit.

### Task 6: Merge and deploy

**Files:**
- No new source files.

- [ ] **Step 1: Fast-forward the verified feature branch into `main`**

```powershell
git pull --ff-only
git merge --ff-only codex/editorial-orbit-polish
```

- [ ] **Step 2: Re-run automated verification on `main`**

Run the four commands from Task 5 Step 1.

- [ ] **Step 3: Push and confirm the remote SHA**

```powershell
git push origin main
git ls-remote origin refs/heads/main
```

- [ ] **Step 4: Verify production**

Open `https://www.noahxu.org/` and `https://www.noahxu.org/travel` with a cache-busting query, then confirm the new layout hooks, interactions, and absence of browser errors.
