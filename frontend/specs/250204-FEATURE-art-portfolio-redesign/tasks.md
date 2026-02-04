---
feature_date: 250204
estimated_tasks: 24
complexity: complex
---

# Implementation Tasks: Art Portfolio Redesign

## Overview

Redesign the art portfolio page with Pixpa-inspired landing page, Behance-style modal project views, and interactive timeline. Projects open in overlay without URL change.

## Tasks

### Phase 1: Setup & Data Architecture

- [ ] T001: Create TypeScript types for artwork data
  - Files: `src/app/art/types/artwork.ts`
  - Acceptance: Types include `Artwork`, `ArtworkCategory`, all required fields (id, title, category, year, thumbnail, images, type, videoId?, description?, externalLink?, relatedProjects?)

- [ ] T002: Extract artwork data to separate file
  - Files: `src/app/art/data/artworks.ts`
  - Acceptance: All 15 artworks moved from page.tsx, exported as typed array, categories array exported separately

- [ ] T003: Add descriptions to all projects
  - Files: `src/app/art/data/artworks.ts`
  - Acceptance: All 15 projects have Markdown-formatted description field (some already exist, add placeholders for others)

- [ ] T004: Add relatedProjects field
  - Files: `src/app/art/data/artworks.ts`
  - Acceptance: Each artwork has relatedProjects array with 2-3 related project IDs based on category

- [ ] T005: Install react-markdown dependency
  - Files: `package.json`
  - Acceptance: `react-markdown` installed and importable

### Phase 2: Core Components

- [ ] T006: Create CategoryFilter component
  - Files: `src/app/art/components/CategoryFilter.tsx`
  - Acceptance: Renders filter pills, highlights active category, emits onSelect callback, supports "All" option

- [ ] T007: Create ProjectCard component
  - Files: `src/app/art/components/ProjectCard.tsx`
  - Acceptance: Displays thumbnail with hover effects, shows title/category/year, video play icon for video type, image count badge, onClick handler

- [ ] T008: Create ProjectGrid component
  - Files: `src/app/art/components/ProjectGrid.tsx`
  - Acceptance: Responsive grid (1/2/3/4 columns), renders ProjectCard for each artwork, accepts filter prop, layout animation on filter change

- [ ] T009: Create HeroSection component
  - Files: `src/app/art/components/HeroSection.tsx`
  - Acceptance: Displays title with gradient, shows stats (project count, years, categories), integrates CategoryFilter, animated counters

### Phase 3: Project Modal

- [ ] T010: Create useProjectModal hook
  - Files: `src/app/art/hooks/useProjectModal.ts`
  - Acceptance: Manages open/close state, current project, body scroll lock, keyboard handlers (ESC, arrows), prev/next project navigation

- [ ] T011: Create ThumbnailStrip component
  - Files: `src/app/art/components/ThumbnailStrip.tsx`
  - Acceptance: Horizontal scrollable strip of thumbnails, highlights current image, onClick to select image, scroll to active on change

- [ ] T012: Create ImageGallery component
  - Files: `src/app/art/components/ImageGallery.tsx`
  - Acceptance: Large image display, prev/next arrows, integrates ThumbnailStrip, smooth transition between images, supports keyboard navigation

- [ ] T013: Create RelatedProjects component
  - Files: `src/app/art/components/RelatedProjects.tsx`
  - Acceptance: Horizontal carousel of related project cards, onClick opens that project, shows 3 projects max, falls back to same-category if no relatedProjects

- [ ] T014: Create ProjectModal component
  - Files: `src/app/art/components/ProjectModal.tsx`
  - Acceptance: Full-screen overlay with backdrop blur, close button, ImageGallery, project info section, Markdown description, RelatedProjects, prev/next project buttons, video embed support

- [ ] T015: Integrate modal into page
  - Files: `src/app/art/page.tsx`
  - Acceptance: useProjectModal hook connected, modal opens on card click, closes properly, keyboard navigation works

### Phase 4: Interactive Timeline

- [ ] T016: Create InteractiveTimeline component
  - Files: `src/app/art/components/InteractiveTimeline.tsx`
  - Acceptance: Horizontal timeline with year markers, shows project count per year, click marker to filter, connecting line between markers, scroll animations

- [ ] T017: Integrate timeline into page
  - Files: `src/app/art/page.tsx`
  - Acceptance: Timeline between grid and footer, year selection syncs with category filter, "All" resets both filters

- [ ] T018: Remove old artistic CV timeline
  - Files: `src/app/art/page.tsx`
  - Acceptance: Old artisticCV data and timeline section removed, new InteractiveTimeline in place

### Phase 5: Animations & Polish

- [ ] T019: Add page load animations
  - Files: `src/app/art/page.tsx`, `src/app/art/components/HeroSection.tsx`, `src/app/art/components/ProjectGrid.tsx`
  - Acceptance: Staggered fade-in for hero elements, staggered grid appearance, smooth initial load

- [ ] T020: Add modal transitions
  - Files: `src/app/art/components/ProjectModal.tsx`, `src/app/art/components/ImageGallery.tsx`
  - Acceptance: Scale/fade open/close for modal, crossfade between images, AnimatePresence for enter/exit

- [ ] T021: Add hover micro-interactions
  - Files: `src/app/art/components/ProjectCard.tsx`, `src/app/art/components/ThumbnailStrip.tsx`
  - Acceptance: Card lifts on hover (y: -8), image scales within card, thumbnail highlights on hover

- [ ] T022: Add timeline scroll animations
  - Files: `src/app/art/components/InteractiveTimeline.tsx`
  - Acceptance: Year markers animate in on scroll (Intersection Observer or Framer Motion inView), line draws progressively

### Phase 6: Responsive & Accessibility

- [ ] T023: Mobile responsive optimizations
  - Files: All components
  - Acceptance: Single column on mobile, full-screen modal, touch-friendly buttons, simplified timeline

- [ ] T024: Accessibility audit and fixes
  - Files: All components
  - Acceptance: Focus trap in modal, focus returns on close, proper ARIA labels, heading hierarchy, reduced motion support (prefers-reduced-motion)

## Relevant Files

### Existing (to modify)
- `src/app/art/page.tsx` - Main page, will be refactored

### New Files
- `src/app/art/types/artwork.ts`
- `src/app/art/data/artworks.ts`
- `src/app/art/hooks/useProjectModal.ts`
- `src/app/art/components/CategoryFilter.tsx`
- `src/app/art/components/ProjectCard.tsx`
- `src/app/art/components/ProjectGrid.tsx`
- `src/app/art/components/HeroSection.tsx`
- `src/app/art/components/ThumbnailStrip.tsx`
- `src/app/art/components/ImageGallery.tsx`
- `src/app/art/components/RelatedProjects.tsx`
- `src/app/art/components/ProjectModal.tsx`
- `src/app/art/components/InteractiveTimeline.tsx`

## Dependencies

- `react-markdown` - Install in T005

## Notes

- All components use CSS variables (`--color-*`) for theme compatibility
- Framer Motion is already installed
- Keep mobile-first approach during development
- Test each phase before moving to next
- The modal does NOT use URL routing - purely state-based
- Related projects fallback: if `relatedProjects` array is empty, show projects from same category
