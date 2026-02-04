---
description: Work on the art portfolio section - add artworks, modify gallery, implement features
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion, Bash
---

# /art - Art Portfolio Management

## Goal

Manage the art portfolio section: add new artworks, modify the gallery, or implement features from the redesign plan.

## Art Portfolio Overview

The art portfolio is at `/art` and features:
- Gallery of artworks/projects
- Theme integration
- i18n support

## Commands

### Add New Artwork

To add a new artwork to the portfolio:

1. **Add image(s)** to `frontend/public/art/[project-name]/`
   - Use WebP format for best performance
   - Include thumbnail and full-size versions

2. **Update artwork data** in the page or data file
   - Title, year, category
   - Description
   - Image paths

3. **Add translations** if needed in `messages/en.json` and `messages/fa.json`

### Modify Gallery Layout

The gallery uses:
- CSS Grid or Flexbox
- Responsive breakpoints
- Framer Motion for animations

### Implement Redesign Features

Refer to `frontend/docs/art-portfolio-redesign-pr.md` for the full redesign plan:

**Phases:**
1. Data & Types Extraction
2. Component Architecture (HeroSection, ProjectCard, ProjectGrid)
3. Project Modal (Behance-style overlay)
4. Interactive Timeline
5. Animations & Polish
6. Responsive Design

To implement a phase:
```
/implement Phase [N] of art portfolio redesign
```

### Art Portfolio Files

```
frontend/src/app/art/
  page.tsx                    # Main art page
  components/                 # Art-specific components (if created)

frontend/public/art/          # Art images
  [project-name]/
    thumbnail.webp
    full.webp

frontend/docs/
  art-portfolio-redesign-pr.md  # Redesign plan
```

### Image Guidelines

- **Format**: WebP preferred, JPEG/PNG acceptable
- **Thumbnail**: ~400x300px for grid
- **Full size**: ~1920px max width
- **Optimization**: Use sharp or similar for optimization

## Request

$ARGUMENTS
