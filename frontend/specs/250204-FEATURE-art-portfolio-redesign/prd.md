---
feature_date: 250204
complexity: complex
branch: feature/250204-art-portfolio-redesign
created_date: 2026-02-04
---

# Feature: Art Portfolio Redesign

## Overview

Redesign the art portfolio page (`/art`) to feature a modern, Pixpa-inspired landing page with Behance-style modal project views. Projects open in an overlay without changing the URL, providing a seamless browsing experience. The redesign includes a new interactive timeline that replaces the current artistic CV timeline section.

## Goals

- Create a professional, gallery-style art portfolio that showcases work effectively
- Improve user experience with modal-based project viewing (no page navigation)
- Add an interactive timeline for chronological project exploration
- Maintain consistency with the existing theme system and i18n support
- Ensure responsive design across all device sizes

## User Stories

- As a visitor, I want to browse art projects in a clean grid layout so that I can quickly scan available work
- As a visitor, I want to filter projects by category so that I can find specific types of work
- As a visitor, I want to view project details in a modal so that I don't lose my place in the gallery
- As a visitor, I want to navigate between projects within the modal so that I can browse efficiently
- As a visitor, I want to see a timeline of projects so that I can understand the artist's creative journey
- As a visitor, I want keyboard navigation (ESC, arrows) so that I can browse efficiently

## Functional Requirements

### FR-1: Hero Section
- Display page title with gradient text animation
- Show statistics (project count, years of work, category count)
- Include category filter pills that filter the project grid

### FR-2: Project Grid
- Responsive grid layout (1 column mobile, 2 tablet, 3-4 desktop)
- Project cards with hover effects (scale, overlay with category badge)
- Lazy loading for images
- Animated appearance with staggered delays
- Filter by category (connected to hero section filters)

### FR-3: Project Modal (Behance-style)
- Full-screen overlay with backdrop blur
- Opens without URL change (state-based, not route-based)
- Image gallery with prev/next navigation arrows
- Thumbnail strip for quick image selection
- Project info section (title, category, year)
- Description with Markdown rendering support
- Related projects carousel at bottom
- Keyboard shortcuts: ESC to close, Left/Right arrows for images
- Close button and click-outside-to-close functionality
- Prev/Next project navigation within modal

### FR-4: Interactive Timeline
- Horizontal scrollable timeline
- Year markers showing project counts
- Click year marker to filter grid by that year
- Scroll-triggered animations
- Visual connection between markers (line)
- Replaces existing artistic CV timeline section

### FR-5: Data Architecture
- Extract artwork data to separate data file
- Add description field to all projects (Markdown format)
- Add relatedProjects field (array of project IDs)
- Create TypeScript types for type safety

### FR-6: Animations
- Page load: staggered grid appearance
- Modal: scale/fade open/close transitions
- Image gallery: smooth transitions between images
- Timeline: scroll-triggered marker animations
- Cards: hover micro-interactions (lift, scale)

### FR-7: Responsive Design
- Mobile: single column grid, full-screen modal, swipe gestures
- Tablet: 2 column grid
- Desktop: 3-4 column grid with hover effects
- Timeline: horizontal on desktop, simplified on mobile

## Non-Goals (Out of Scope)

- URL-based routing for individual projects (keeping modal-only approach)
- CMS integration or admin panel for managing artworks
- Image upload functionality
- Comments or social features
- Search functionality (category filter is sufficient)
- Print stylesheet
- PWA offline support for art gallery

## Technical Approach

### Components to Create
```
src/app/art/
├── page.tsx                    # Main page (refactored)
├── components/
│   ├── HeroSection.tsx         # Hero with title, stats, filters
│   ├── ProjectGrid.tsx         # Grid of project cards
│   ├── ProjectCard.tsx         # Individual project card
│   ├── ProjectModal.tsx        # Full-screen project overlay
│   ├── ImageGallery.tsx        # Image viewer within modal
│   ├── ThumbnailStrip.tsx      # Thumbnail navigation
│   ├── InteractiveTimeline.tsx # Year timeline with filtering
│   ├── CategoryFilter.tsx      # Filter pills component
│   └── RelatedProjects.tsx     # Related projects in modal
├── hooks/
│   └── useProjectModal.ts      # Modal state management
├── data/
│   └── artworks.ts             # Artwork data
└── types/
    └── artwork.ts              # TypeScript types
```

### State Management
- Local React state for modal (no Redux needed for this feature)
- Custom hook `useProjectModal` for encapsulated modal logic
- Body scroll lock when modal is open

### Markdown Rendering
- Use `react-markdown` for project descriptions
- Support: headers, bold, italic, lists, links
- Custom styling to match theme

### i18n Considerations
- Add translation keys for UI strings (filters, buttons, labels)
- Keep artwork titles/descriptions in default language (artist's choice)

### Animation Implementation
- Framer Motion for all animations
- `AnimatePresence` for modal enter/exit
- `motion.div` with `whileHover` for cards
- `motion.div` with `layout` for grid filtering
- Intersection Observer for timeline scroll animations

## Design Considerations

### Theme Compatibility
- Use CSS variables for all colors (`--color-*`)
- Support all 4 color schemes (default, warm, cool, forest)
- Respect light/dark mode toggle
- Modal backdrop uses theme-aware colors

### Responsive Breakpoints
- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: 1024px - 1280px (3 columns)
- Large: > 1280px (4 columns)

### Accessibility
- Focus management when modal opens/closes
- Keyboard navigation throughout
- Alt text for all images
- Proper heading hierarchy
- Reduced motion preference support

### Performance
- Lazy load images with Next.js Image component
- Use `sizes` prop for responsive images
- Optimize animation performance (will-change, GPU layers)
- Thumbnail strip loads on demand

## Implementation Phases

### Phase 1: Data & Types Extraction
- Extract artwork data to `data/artworks.ts`
- Create TypeScript types in `types/artwork.ts`
- Ensure all projects have proper description fields
- Add relatedProjects field to connect similar works

### Phase 2: Component Architecture
- Create `HeroSection` component
- Create `ProjectCard` component
- Create `ProjectGrid` component
- Create `CategoryFilter` component (reusable)

### Phase 3: Project Modal
- Create `useProjectModal` hook
- Create `ProjectModal` component
- Create `ImageGallery` component
- Create `ThumbnailStrip` component
- Create `RelatedProjects` component
- Install and configure `react-markdown`

### Phase 4: Interactive Timeline
- Create `InteractiveTimeline` component
- Connect timeline to grid filtering
- Remove old artistic CV timeline section

### Phase 5: Animations & Polish
- Add page load animations
- Add modal transitions
- Add hover micro-interactions
- Add timeline scroll animations

### Phase 6: Responsive & Accessibility
- Mobile optimizations
- Touch/swipe gestures for mobile modal
- Accessibility audit and fixes
- Cross-browser testing

## Dependencies

### Existing (no changes needed)
- `framer-motion` - Animations
- `next/image` - Optimized images
- `lucide-react` - Icons

### New Dependencies
- `react-markdown` - Markdown rendering for descriptions

## Success Criteria

- [ ] All 15 existing artworks display correctly in new grid
- [ ] Category filtering works for all 9 categories
- [ ] Project modal opens/closes smoothly without URL change
- [ ] Image gallery navigation works with mouse and keyboard
- [ ] Markdown descriptions render correctly in modal
- [ ] Interactive timeline shows all years with project counts
- [ ] Timeline click filters grid to selected year
- [ ] All animations run at 60fps
- [ ] Responsive layout works on mobile/tablet/desktop
- [ ] Theme toggle works correctly throughout
- [ ] No accessibility violations (a11y audit)
- [ ] Page loads in under 3 seconds on 3G

## Open Questions

1. **Related Projects Logic**: Should related projects be based on:
   - Same category (automatic)
   - Manual curation (requires data update)
   - Combination of both?

   *Recommendation: Start with same-category matching, allow manual override.*

2. **Masonry vs Grid**: Should the grid use:
   - Uniform aspect ratio (4:3) for all cards (current)
   - Masonry layout with varying heights

   *Recommendation: Keep uniform 4:3 for cleaner look.*

3. **Mobile Timeline**: Should mobile timeline be:
   - Simplified horizontal (fewer markers)
   - Vertical timeline
   - Hidden entirely

   *Recommendation: Simplified horizontal with scrollable overflow.*
