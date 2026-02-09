---
feature_date: 260209
estimated_tasks: 13
complexity: medium
---

# Implementation Tasks: Migrate Hardcoded Colors to Theme CSS Variables

## Overview
Replace all hardcoded hex color values across 9 component files with CSS variable references so the entire site responds to theme changes consistently. Add missing CSS variables, sync `globals.css` with `themes.ts`, and remove unnecessary `dark:` prefixes.

## Tasks

### Phase 1: Setup — CSS Variables & Theme Sync

- [ ] T001: Add missing CSS variables and sync globals.css with themes.ts
  - Files: `frontend/src/app/globals.css`, `frontend/src/config/themes.ts`
  - Changes:
    1. Update `--teal` in `:root` from `#2e9ac9` to `#0EA5E9`
    2. Update `--teal` in `.dark` from `#2e9ac9` to `#38BDF8`
    3. Add `--teal-light: #38BDF8` to `:root`
    4. Add `--teal-light: #38BDF8` to `.dark`
    5. Add `--color-overlay: rgba(0,0,0,0.95)` to `:root`
    6. Add `--color-overlay: rgba(0,0,0,0.85)` to `.dark`
    7. Sync `--color-background` in `:root` from `#ffffff` to `#85A2FF` (match themes.ts)
    8. Verify `themes.ts` color scheme object matches all `globals.css` values; update if needed
  - Acceptance: All CSS variables exist in both `:root` and `.dark` blocks, `globals.css` and `themes.ts` are fully in sync, site renders without visual regressions

### Phase 2: Component Migration — Simple Files

- [ ] T002: Migrate ProjectModal.tsx — replace hardcoded overlay color
  - Files: `frontend/src/app/art/components/ProjectModal.tsx`
  - Changes:
    1. Replace any `rgba(0,0,0,0.95)` background overlay with `var(--color-overlay)`
  - Acceptance: Modal overlay uses CSS variable, no hardcoded hex/rgba values remain in file

- [ ] T003: Migrate HeroSection.tsx — replace 4 SVG/gradient hex colors
  - Files: `frontend/src/app/art/components/HeroSection.tsx`
  - Changes:
    1. Replace `#FF6B35` / `#FF8B66` → `var(--sunset-orange)`
    2. Replace `#FFB800` / `#FFC947` → `var(--golden-yellow)` / `var(--amber)`
    3. Replace `#1C39BB` / `#5B8DEF` → `var(--persian-blue)`
    4. Replace `#7BA8F5` → `var(--persian-blue-light)`
    5. Remove redundant `dark:` prefixes where CSS variable already handles switching
  - Acceptance: Zero hardcoded hex values in file, SVG strokes and text gradients use CSS variables, visual appearance unchanged in both modes

- [ ] T004: Migrate InteractiveTimeline.tsx — replace ~7 hex colors in gradients and classes
  - Files: `frontend/src/app/art/components/InteractiveTimeline.tsx`
  - Changes:
    1. Replace linear-gradient inline styles: `#5B8DEF` → `var(--persian-blue)`, `#FFB800` → `var(--golden-yellow)`, `#0EA5E9` → `var(--teal)`, `#FF6B35` → `var(--sunset-orange)`
    2. Replace Tailwind arbitrary color classes (e.g., `text-[#5B8DEF]`) → `text-[var(--persian-blue)]`
    3. Replace `#FFC947` → `var(--amber)`, `#7BA8F5` → `var(--persian-blue-light)`
    4. Remove redundant `dark:` prefixes
  - Acceptance: Zero hardcoded hex values, timeline gradient and year markers use CSS variables, both light/dark modes render correctly

### Phase 3: Component Migration — Medium Files

- [ ] T005: Migrate Footer.tsx — replace ~6 hex colors in gradients and links
  - Files: `frontend/src/components/figma/Footer.tsx`
  - Changes:
    1. Replace gradient Tailwind classes: `#1C39BB`/`#5B8DEF` → `var(--persian-blue)`, `#FFB800`/`#FFC947` → `var(--golden-yellow)`/`var(--amber)`
    2. Replace email link color: `#5B8DEF`/`#7BA8F5` → `var(--persian-blue)`/`var(--persian-blue-light)` (simplify to just `var(--persian-blue)`)
    3. Replace heart icon: `#FF6B35`/`#FF8B66` → `var(--sunset-orange)`
    4. Replace SVG circle strokes
    5. Remove redundant `dark:` prefixes
  - Acceptance: Zero hardcoded hex values in file, footer gradients and links use CSS variables

- [ ] T006: Migrate PaintStroke.tsx — replace ~12 hex colors in defaults, arrays, and SVGs
  - Files: `frontend/src/components/figma/PaintStroke.tsx`
  - Changes:
    1. Update default color parameter: `color = '#FFB800'` → `color = 'var(--golden-yellow)'`
    2. Update `colors` array entries: `#5B8DEF` → `var(--persian-blue)`, `#FFB800` → `var(--golden-yellow)`, `#FF6B35` → `var(--sunset-orange)`, `#0EA5E9` → `var(--teal)`
    3. Replace SVG `stroke` and `fill` attributes with CSS variable values
    4. Replace gradient `stopColor` values with CSS variables
  - Acceptance: Zero hardcoded hex values, paint strokes render correctly with CSS variables in both themes

- [ ] T007: Migrate Skills.tsx — replace ~33 hex colors in skill definitions and SVGs
  - Files: `frontend/src/components/figma/Skills.tsx`
  - Changes:
    1. Replace skill category color definitions (lines 16-40): convert all `bg-[#hex]`, `text-[#hex]`, `border-[#hex]` patterns to use CSS variable equivalents
    2. Map each hardcoded hex to its CSS variable per the Color Mapping Reference:
       - `#1C39BB`/`#5B8DEF` → `var(--persian-blue)`
       - `#FFB800`/`#FFC947` → `var(--golden-yellow)`/`var(--amber)`
       - `#FF6B35`/`#FF8B66` → `var(--sunset-orange)`
       - `#0EA5E9`/`#38BDF8` → `var(--teal)`/`var(--teal-light)`
       - `#85A2FF` → `var(--color-primary-300)`
       - `#ADC1FF` → `var(--color-primary-200)`
    3. Replace SVG decorative stroke/fill hex values with CSS variables
    4. Remove redundant `dark:` prefixes
  - Acceptance: Zero hardcoded hex values, all skill cards render with correct colors in both modes

### Phase 4: Component Migration — Complex Files

- [ ] T008: Migrate Hero.tsx — replace ~20 hex colors in SVG-heavy decorations
  - Files: `frontend/src/components/figma/Hero.tsx`
  - Changes:
    1. Replace SVG grid pattern `stroke` attributes: `#5B8DEF` → `var(--persian-blue)`
    2. Replace animated line strokes: `#5B8DEF`, `#FFB800`, `#0EA5E9` → corresponding CSS variables
    3. Replace radial gradient inline styles with CSS variable references
    4. Replace icon colors: `#5B8DEF` → `var(--persian-blue)`, `#FFB800` → `var(--golden-yellow)`, `#FF6B35` → `var(--sunset-orange)`
    5. Replace SVG circle fills and gradient path stopColor values
    6. Remove redundant `dark:` prefixes
  - Acceptance: Zero hardcoded hex values, hero section SVG animations and decorations render identically in both modes

- [ ] T009: Migrate ArtProjects.tsx — replace ~14 hex colors in card gradients and SVG decorations
  - Files: `frontend/src/components/figma/ArtProjects.tsx`
  - Changes:
    1. Replace project card gradient definitions with CSS variable references
    2. Replace text color classes: `text-[#hex]` → `text-[var(--variable)]`
    3. Replace sketch wave/heart/star SVG path strokes: `#FF6B35` → `var(--sunset-orange)`, `#FFB800` → `var(--golden-yellow)`, `#5B8DEF` → `var(--persian-blue)`
    4. Replace decoration SVG colors
    5. Remove redundant `dark:` prefixes
  - Acceptance: Zero hardcoded hex values, art project cards render correctly with gradients intact in both modes

- [ ] T010: Migrate Roadmap.tsx — replace ~28 hex colors (most complex file)
  - Files: `frontend/src/components/figma/Roadmap.tsx`
  - Changes:
    1. Replace `roadmapData` color gradient definitions (5 gradient sets) with CSS variable references
    2. Replace SVG `linearGradient` `stopColor` attributes (~16 occurrences)
    3. Replace SVG circle `fill` attributes: `#FFB800` → `var(--golden-yellow)`, `#5B8DEF` → `var(--persian-blue)`
    4. Replace text color and border-hover Tailwind classes
    5. Remove redundant `dark:` prefixes for colors that now auto-switch
  - Acceptance: Zero hardcoded hex values, roadmap timeline SVG renders correctly, all 5 job cards have correct gradient colors in both modes

### Phase 5: Verification

- [ ] T011: Run grep audit for remaining hardcoded hex colors
  - Files: All component files in `frontend/src/components/figma/` and `frontend/src/app/art/components/`
  - Changes:
    1. Run `grep -rn '#[0-9A-Fa-f]\{3,8\}'` across all migrated component files
    2. Verify zero matches (excluding comments, if any)
    3. Also check for any remaining `rgba(` patterns that should use CSS variables
  - Acceptance: Grep returns zero results for hardcoded color values in component files

- [ ] T012: Verify globals.css and themes.ts are fully in sync
  - Files: `frontend/src/app/globals.css`, `frontend/src/config/themes.ts`
  - Changes:
    1. Cross-reference every CSS variable in `globals.css` `:root` with `themes.ts` light mode values
    2. Cross-reference every CSS variable in `globals.css` `.dark` with `themes.ts` dark mode values
    3. Document any discrepancies and fix them
  - Acceptance: All values match between the two files, no discrepancies remain

- [ ] T013: Visual regression check — light and dark mode
  - Files: N/A (manual testing)
  - Changes:
    1. Load site in light mode — verify all sections match pre-migration appearance
    2. Toggle to dark mode — verify all sections match pre-migration appearance
    3. Test theme toggle multiple times to ensure smooth transitions
    4. Verify all SVG animations and gradients render correctly
    5. Spot-check: change one color in `globals.css`, confirm it propagates to all components
  - Acceptance: Light and dark modes look identical to pre-migration, theme toggle works smoothly, color changes propagate globally

## Relevant Files
<!-- Updated as tasks are completed -->
- `frontend/src/app/globals.css` — CSS variable definitions (light + dark)
- `frontend/src/config/themes.ts` — Theme configuration and color scheme
- `frontend/src/components/theme/ThemeProvider.tsx` — Theme application logic
- `frontend/src/components/figma/Skills.tsx` — 33 hardcoded colors
- `frontend/src/components/figma/Roadmap.tsx` — 28 hardcoded colors
- `frontend/src/components/figma/Hero.tsx` — 20 hardcoded colors
- `frontend/src/components/figma/ArtProjects.tsx` — 14 hardcoded colors
- `frontend/src/components/figma/PaintStroke.tsx` — 12 hardcoded colors
- `frontend/src/components/figma/Footer.tsx` — 6 hardcoded colors
- `frontend/src/app/art/components/InteractiveTimeline.tsx` — 7 hardcoded colors
- `frontend/src/app/art/components/HeroSection.tsx` — 4 hardcoded colors
- `frontend/src/app/art/components/ProjectModal.tsx` — overlay color

## Notes
- **No i18n tasks needed**: This migration is purely CSS/styling — no user-facing text is added or modified, so no translation changes are required.
- **No `dark:` prefix needed**: Since CSS variables already switch between `:root` and `.dark`, remove `dark:bg-[#hex]` / `dark:text-[#hex]` pairs and replace with a single `bg-[var(--variable)]` / `text-[var(--variable)]`.
- **SVG compatibility**: CSS variables work directly in SVG `fill`, `stroke`, and `stopColor` attributes when used as string values (e.g., `fill="var(--golden-yellow)"`).
- **Migration order**: Files are ordered from simplest (T002: 1 color) to most complex (T010: 28 colors) to build confidence and catch patterns early.
- **Color Mapping Reference**: See PRD section "Color Mapping Reference" for the full hex → CSS variable mapping table.
- **T001 background sync note**: Changing `--color-background` from `#ffffff` to `#85A2FF` is a significant visual change — verify this is intentional and matches the current live site (themes.ts may have been updated without syncing globals.css).
