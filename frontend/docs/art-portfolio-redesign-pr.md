# Art Portfolio Redesign - Implementation Plan

## Overview

Redesign the art portfolio page (`/art`) to feature a modern, Pixpa-inspired landing page with Behance-style modal project views. Projects open in an overlay without changing the URL, providing a seamless browsing experience.

---

## Design Goals

1. **Pixpa-style Landing Page** - Clean grid layout with hero section and category filters
2. **Behance-style Project Modal** - Full project view in overlay (no URL change)
3. **Interactive Timeline** - Mid-page timeline/map for exploring projects chronologically
4. **Smooth Animations** - Framer Motion transitions throughout

---

## Page Structure

```
┌─────────────────────────────────────────────┐
│              HEADER (sticky)                │
│  Logo | Navigation | Theme Toggle | Lang    │
├─────────────────────────────────────────────┤
│                                             │
│              HERO SECTION                   │
│  "My Artistic Journey"                      │
│  Subtitle + Stats (X projects, Y years)     │
│  Category Filter Pills                      │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│           PROJECT GRID                      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐          │
│  │     │ │     │ │     │ │     │          │
│  │ IMG │ │ IMG │ │ IMG │ │ IMG │          │
│  │     │ │     │ │     │ │     │          │
│  ├─────┤ ├─────┤ ├─────┤ ├─────┤          │
│  │Title│ │Title│ │Title│ │Title│          │
│  │Year │ │Year │ │Year │ │Year │          │
│  └─────┘ └─────┘ └─────┘ └─────┘          │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│         INTERACTIVE TIMELINE                │
│  ════════●════════●════════●════════       │
│         2017     2020     2023              │
│  Scroll to explore projects by year         │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│              FOOTER                         │
│  Links | Social | Copyright                 │
│                                             │
└─────────────────────────────────────────────┘
```

---

## Project Modal (Behance-style)

When a project is clicked, a full-screen modal opens WITHOUT changing the URL:

```
┌─────────────────────────────────────────────┐
│ [X Close]                    [< Prev] [Next >]│
├─────────────────────────────────────────────┤
│                                             │
│  ┌─────────────────────────────────────┐   │
│  │                                     │   │
│  │         MAIN IMAGE                  │   │
│  │         (Large View)                │   │
│  │                                     │   │
│  │    [<]              [>]             │   │
│  │                                     │   │
│  └─────────────────────────────────────┘   │
│                                             │
│  ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐ ┌───┐     │
│  │ 1 │ │ 2 │ │ 3 │ │ 4 │ │ 5 │ │ 6 │     │
│  └───┘ └───┘ └───┘ └───┘ └───┘ └───┘     │
│          (Thumbnail Strip)                  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  PROJECT TITLE                    Year      │
│  Category                                   │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  DESCRIPTION                                │
│  Full project description with formatting   │
│  - Section headers                          │
│  - Paragraphs                               │
│  - Key highlights                           │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  RELATED PROJECTS                           │
│  ┌─────┐ ┌─────┐ ┌─────┐                   │
│  │     │ │     │ │     │                   │
│  └─────┘ └─────┘ └─────┘                   │
│                                             │
└─────────────────────────────────────────────┘
```

---

## File Structure

```
src/app/art/
├── page.tsx                    # Main landing page
├── components/
│   ├── HeroSection.tsx         # Hero with title, stats, filters
│   ├── ProjectGrid.tsx         # Masonry/grid of project cards
│   ├── ProjectCard.tsx         # Individual project card
│   ├── ProjectModal.tsx        # Full-screen project overlay
│   ├── InteractiveTimeline.tsx # Scrollable year timeline
│   ├── CategoryFilter.tsx      # Filter pills/tabs
│   └── RelatedProjects.tsx     # Related projects in modal
├── hooks/
│   └── useProjectModal.ts      # Modal state management
├── data/
│   └── artworks.ts             # Artwork data (extracted from page)
└── types/
    └── artwork.ts              # TypeScript types
```

---

## Implementation Tasks

### Phase 1: Data & Types Extraction
- [ ] Extract artwork data to `data/artworks.ts`
- [ ] Create TypeScript types in `types/artwork.ts`
- [ ] Add `description` field to all projects
- [ ] Add `relatedProjects` field (array of IDs)

### Phase 2: Component Architecture
- [ ] Create `HeroSection` component
  - Title with gradient text
  - Animated stats counters
  - Category filter pills
- [ ] Create `ProjectCard` component
  - Hover effects (scale, overlay)
  - Image lazy loading
  - Category badge
- [ ] Create `ProjectGrid` component
  - Responsive grid (1/2/3/4 columns)
  - Masonry layout option
  - Infinite scroll or pagination

### Phase 3: Project Modal
- [ ] Create `ProjectModal` component
  - Full-screen overlay with backdrop blur
  - Image gallery with navigation
  - Thumbnail strip
  - Project info section
  - Description with markdown support
  - Related projects carousel
- [ ] Create `useProjectModal` hook
  - Open/close state
  - Current project
  - Navigation between projects
  - Keyboard shortcuts (ESC, arrows)

### Phase 4: Interactive Timeline
- [ ] Create `InteractiveTimeline` component
  - Horizontal scrollable timeline
  - Year markers with project counts
  - Click to filter by year
  - Scroll-triggered animations
  - Connect to project grid filtering

### Phase 5: Animations & Polish
- [ ] Page load animations (staggered grid)
- [ ] Modal open/close transitions
- [ ] Image gallery transitions
- [ ] Timeline scroll animations
- [ ] Hover micro-interactions

### Phase 6: Responsive Design
- [ ] Mobile hero section
- [ ] Mobile project grid (1-2 columns)
- [ ] Mobile modal (full-screen, swipe gestures)
- [ ] Mobile timeline (vertical or simplified)

---

## Technical Specifications

### Modal Without URL Change
```tsx
// useProjectModal.ts
const useProjectModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProject, setCurrentProject] = useState<Artwork | null>(null);

  const openProject = (project: Artwork) => {
    setCurrentProject(project);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent scroll
  };

  const closeProject = () => {
    setIsOpen(false);
    setCurrentProject(null);
    document.body.style.overflow = 'unset';
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeProject();
      if (e.key === 'ArrowLeft') navigatePrev();
      if (e.key === 'ArrowRight') navigateNext();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentProject]);

  return { isOpen, currentProject, openProject, closeProject };
};
```

### Timeline Component
```tsx
// InteractiveTimeline.tsx
const InteractiveTimeline = ({
  projects,
  onYearSelect
}: {
  projects: Artwork[];
  onYearSelect: (year: string) => void;
}) => {
  const years = useMemo(() => {
    const yearMap = new Map<string, number>();
    projects.forEach(p => {
      const year = p.year.split('-')[0];
      yearMap.set(year, (yearMap.get(year) || 0) + 1);
    });
    return Array.from(yearMap.entries()).sort();
  }, [projects]);

  return (
    <div className="relative py-16">
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-primary-200" />
      <div className="flex justify-between max-w-4xl mx-auto">
        {years.map(([year, count]) => (
          <button
            key={year}
            onClick={() => onYearSelect(year)}
            className="relative flex flex-col items-center"
          >
            <div className="w-4 h-4 rounded-full bg-primary-500" />
            <span className="mt-2 font-bold">{year}</span>
            <span className="text-sm text-secondary">{count} projects</span>
          </button>
        ))}
      </div>
    </div>
  );
};
```

### Project Card with Hover Effect
```tsx
// ProjectCard.tsx
const ProjectCard = ({
  project,
  onClick
}: {
  project: Artwork;
  onClick: () => void;
}) => (
  <motion.div
    whileHover={{ y: -8 }}
    className="group cursor-pointer"
    onClick={onClick}
  >
    <div className="relative overflow-hidden rounded-xl aspect-[4/3]">
      <Image
        src={project.thumbnail}
        alt={project.title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent opacity-0 group-hover:opacity-100 transition-opacity">
        <div className="absolute bottom-4 left-4 right-4">
          <span className="px-2 py-1 text-xs rounded-full bg-white/20 text-white">
            {project.category}
          </span>
        </div>
      </div>
    </div>
    <div className="mt-4">
      <h3 className="font-semibold text-lg">{project.title}</h3>
      <p className="text-secondary text-sm">{project.year}</p>
    </div>
  </motion.div>
);
```

---

## Dependencies

No new dependencies required. Using existing:
- `framer-motion` - Animations
- `next/image` - Optimized images
- `lucide-react` - Icons

---

## Estimated Effort

| Phase | Tasks | Complexity |
|-------|-------|------------|
| Phase 1 | Data extraction | Low |
| Phase 2 | Components | Medium |
| Phase 3 | Modal | High |
| Phase 4 | Timeline | Medium |
| Phase 5 | Animations | Medium |
| Phase 6 | Responsive | Medium |

---

## Running This Plan

To implement this redesign, run:

```bash
# In Claude Code, say:
"Implement the art portfolio redesign from docs/art-portfolio-redesign-pr.md"
```

Or implement phase by phase:
```bash
"Implement Phase 1 of the art portfolio redesign"
"Implement Phase 2 of the art portfolio redesign"
# ... etc
```

---

## Preview Mockup

### Landing Page (Desktop)
```
╔═══════════════════════════════════════════════════════════════╗
║  🎨 Art Portfolio          [All] [Photo] [Paint] [Design]  🌙 ║
╠═══════════════════════════════════════════════════════════════╣
║                                                               ║
║                    My Artistic Journey                        ║
║           Exploring creativity through multiple mediums       ║
║                                                               ║
║              15 Projects  •  8 Years  •  6 Categories         ║
║                                                               ║
╠═══════════════════════════════════════════════════════════════╣
║2016 ────●──── 2018 ────●──── 2021 ────●──── 2023        ║
║         │              │              │                  ║
║  ╔═══════════╗  ╔═══════════╗  ╔═══════════╗  ╔═══════════╗  ║
║  ║           ║  ║           ║  ║           ║  ║           ║  ║
║  ║   HATCH   ║  ║    WAR    ║  ║ PAINTINGS ║  ║  PLASTIC  ║  ║
║  ╠═══════════╣  ╠═══════════╣  ╠═══════════╣  ╠═══════════╣  ║
║  ║ Photo '21 ║  ║ Illus '22 ║  ║Paint '18  ║  ║ Mixed '22 ║  ║
║  ╚═══════════╝  ╚═══════════╝  ╚═══════════╝  ╚═══════════╝  ║
║                                                               ║
║
║                                                               ║
╚═══════════════════════════════════════════════════════════════╝
```

---

## Notes

- Preserve existing theme system (dark/light mode)
- Preserve i18n support
- Ensure all images use optimized WebP format
- Add descriptions to all projects for modal view
- Consider adding project tags for better filtering
