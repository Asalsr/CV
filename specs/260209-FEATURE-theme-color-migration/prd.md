---
feature_date: 260209
complexity: medium
branch: feature/260209-theme-color-migration
created_date: 2026-02-09
---

# Feature: Migrate Hardcoded Colors to Theme CSS Variables

## Overview

The portfolio has a theme system (`themes.ts` + `globals.css` + `ThemeProvider`) that defines all colors as CSS custom properties for light/dark mode. However, 9 component files bypass this system by using hardcoded hex values directly in Tailwind classes, SVG attributes, and inline styles. This means theme changes (like the recent background update to `#85A2FF`) don't propagate to these components. This migration will replace all hardcoded colors with CSS variable references so the entire site responds to theme changes consistently.

## Goals

- Eliminate all hardcoded color hex values from component files
- Make every component respond to light/dark mode via CSS variables
- Sync `globals.css` with `themes.ts` (fix background desync)
- Add any missing CSS variables needed for full coverage

## User Stories

- As a developer, I want to change a color in one place (`themes.ts` / `globals.css`) and have it update everywhere
- As a visitor, I want consistent colors when switching between light and dark mode

## Functional Requirements

### FR-1: Add Missing CSS Variables

Some hardcoded colors don't have a corresponding CSS variable yet. Add these to both `globals.css` and `themes.ts`:

| Color | Light Value | Dark Value | Variable Name |
|-------|-------------|------------|---------------|
| Teal | `#0EA5E9` | `#38BDF8` | `--teal` (already `#2e9ac9`, needs update to `#0EA5E9`) |
| Teal light | `#38BDF8` | `#38BDF8` | `--teal-light` (new) |

### FR-2: Sync `globals.css` with `themes.ts`

Update the `:root` block in `globals.css` to match current `themes.ts` light mode values:

| Variable | Current (globals.css) | Correct (themes.ts) |
|----------|-----------------------|---------------------|
| `--color-background` | `#ffffff` | `#85A2FF` |

### FR-3: Replace Hardcoded Colors in Tailwind Classes

Convert arbitrary Tailwind color values to CSS variable references.

**Pattern:**
```
<!-- Before -->
bg-[#1C39BB] dark:bg-[#5B8DEF]

<!-- After -->
bg-[var(--persian-blue)]
```

Since the CSS variables already switch values between light/dark via `:root` and `.dark`, the `dark:` prefix is no longer needed for these colors.

**Affected files:**
1. `components/figma/Skills.tsx` — skill color properties (lines 16-40)
2. `components/figma/Footer.tsx` — gradient classes (lines 20-31)
3. `components/figma/Roadmap.tsx` — category colors, gradients (lines 29-71, 186)
4. `components/figma/ArtProjects.tsx` — category colors, gradients (lines 28-75, 160-221)
5. `app/art/components/InteractiveTimeline.tsx` — timeline colors (lines 62, 141-156)

### FR-4: Replace Hardcoded Colors in SVG Attributes

Convert `fill`, `stroke`, and `stopColor` attributes to use CSS variables via inline `style` prop or by referencing `currentColor`.

**Pattern:**
```tsx
// Before
<circle stroke="#5B8DEF" fill="#FFB800" />

// After
<circle stroke="var(--persian-blue)" fill="var(--golden-yellow)" />
```

**Affected files:**
1. `components/figma/Hero.tsx` — decorative SVG strokes, radial gradients, gradient stops
2. `components/figma/Roadmap.tsx` — timeline SVG, gradient defs, decorative elements
3. `components/figma/ArtProjects.tsx` — card SVG decorations, gradient defs
4. `components/figma/Skills.tsx` — decorative SVG strokes and fills
5. `components/figma/PaintStroke.tsx` — paint stroke SVG fills and strokes
6. `app/art/components/HeroSection.tsx` — hero SVG strokes

### FR-5: Replace Hardcoded Colors in Inline Styles

Convert inline style objects with hardcoded hex/rgba values.

**Pattern:**
```tsx
// Before
style={{ background: 'linear-gradient(to right, #5B8DEF, #FFB800)' }}

// After
style={{ background: 'linear-gradient(to right, var(--persian-blue), var(--golden-yellow))' }}
```

**Affected files:**
1. `app/art/components/InteractiveTimeline.tsx` — gradient backgrounds, box shadows
2. `app/art/components/ProjectModal.tsx` — background overlay

### FR-6: Replace Hardcoded Default Parameters

Some components accept color as a prop with a hardcoded default value.

**Pattern:**
```tsx
// Before
function PaintStroke({ color = '#FFB800' })

// After — keep default but document that it won't be theme-reactive
// OR pass CSS variable string as default
function PaintStroke({ color = 'var(--golden-yellow)' })
```

**Affected file:**
- `components/figma/PaintStroke.tsx` — default color parameters and colors arrays

## Color Mapping Reference

### Primary Colors
| Hardcoded | CSS Variable | Context |
|-----------|-------------|---------|
| `#1C39BB` | `var(--persian-blue)` | Primary blue (auto-switches in dark) |
| `#5B8DEF` | `var(--persian-blue)` | Same var, dark mode value |
| `#4A7AEF` | `var(--color-primary-400)` | Primary 400 |
| `#4A90E2` | `var(--persian-blue-light)` | Light blue |
| `#7BA8F5` | `var(--persian-blue-light)` | Same var, dark mode value |
| `#85A2FF` | `var(--color-primary-300)` | Primary 300 |
| `#ADC1FF` | `var(--color-primary-200)` | Primary 200 |
| `#0F1E5C` | `var(--persian-blue-dark)` | Dark blue |
| `#0F1729` | `var(--navy)` | Navy / text primary |

### Accent Colors
| Hardcoded | CSS Variable | Context |
|-----------|-------------|---------|
| `#FFB800` | `var(--golden-yellow)` | Golden yellow (auto-switches) |
| `#FFC947` | `var(--amber)` | Amber (auto-switches) |
| `#FF6B35` | `var(--sunset-orange)` | Sunset orange (auto-switches) |
| `#FF8B66` | `var(--sunset-orange)` | Same var, dark mode value |
| `#FF8066` / `#FF9980` | `var(--warm-coral)` | Warm coral (auto-switches) |

### Utility Colors
| Hardcoded | CSS Variable | Context |
|-----------|-------------|---------|
| `#0EA5E9` | `var(--teal)` | Teal (needs update in globals.css) |
| `#38BDF8` | `var(--teal-light)` | Teal light (new variable needed) |
| `rgba(0,0,0,0.95)` | `var(--color-overlay)` | Modal overlay (new variable needed) |

## Non-Goals (Out of Scope)

- Redesigning the color palette itself
- Changing any visual appearance — colors must look identical after migration
- Adding new color scheme support (e.g., additional themes)
- Refactoring component architecture or structure
- Modifying the ThemeProvider or Redux theme slice logic

## Technical Approach

### Step 1: Add Missing CSS Variables
- Add `--teal-light` and `--color-overlay` to both `:root` and `.dark` in `globals.css`
- Update `--teal` value from `#2e9ac9` to `#0EA5E9` in `:root` (light) and to `#38BDF8` in `.dark`
- Sync `--color-background` in `globals.css` to `#85A2FF`
- Update `themes.ts` to match if needed

### Step 2: Migrate Files (one at a time, test after each)
Order by complexity (simplest first):
1. `ProjectModal.tsx` — 1 hardcoded value
2. `HeroSection.tsx` — ~4 SVG strokes
3. `InteractiveTimeline.tsx` — ~15 mixed (Tailwind + inline)
4. `Footer.tsx` — ~20 Tailwind gradient classes
5. `Skills.tsx` — ~30 Tailwind classes + SVG
6. `PaintStroke.tsx` — ~20 SVG + defaults
7. `Hero.tsx` — ~25 SVG heavy
8. `ArtProjects.tsx` — ~30 mixed
9. `Roadmap.tsx` — ~35 most complex

### Step 3: Verify
- Toggle light/dark mode — all sections should switch correctly
- Compare screenshots before/after to confirm no visual changes
- Check for any remaining hardcoded hex values via grep

## Design Considerations

- **Theme compatibility**: This is the entire point — all colors will respond to light/dark toggle
- **Tailwind 4 compatibility**: `bg-[var(--persian-blue)]` works in Tailwind 4 with arbitrary values
- **SVG compatibility**: CSS variables work in SVG `fill`/`stroke` attributes when used as inline values
- **No dark: prefix needed**: Since CSS variables already switch values between `:root` and `.dark`, most `dark:` overrides become unnecessary and should be removed

## Success Criteria

- [ ] Zero hardcoded hex color values in any component file (verified by grep)
- [ ] `globals.css` and `themes.ts` are fully in sync
- [ ] Light mode looks identical to current light mode
- [ ] Dark mode looks identical to current dark mode
- [ ] Changing a color in `themes.ts`/`globals.css` updates all components

## Open Questions

- Should `--teal` be updated from `#2e9ac9` to `#0EA5E9`, or should a separate variable be created? (Recommend: update it, since `#0EA5E9` is what's actually used in components)
- For `PaintStroke.tsx` default parameters that accept color strings — should they use CSS variables as defaults, or receive colors from parent components via props?
