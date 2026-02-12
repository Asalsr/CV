# PRD Prompt: Art Gallery — Hide Empty Projects & Validate Images Before Loading

## Problem Statement

The art portfolio page (`/art`) has two related bugs that degrade the user experience:

### Bug 1: Deleted/Missing Photos Show as Empty Black Pages
When image files are removed from `public/art/` but their paths remain in `artworks.ts`, the gallery displays empty black placeholders. The `ImageWithFallback` component catches the error and shows an SVG placeholder, but the overall experience is broken — users see black/empty slides when navigating through a project's images in the `ProjectModal > ImageGallery`.

**Current behavior:** All image paths listed in `artwork.images[]` are rendered regardless of whether the file actually exists. Deleted files result in black/empty gallery pages.

**Expected behavior:** Before displaying images, validate that each image actually exists. Only render images that successfully load. If an image fails, exclude it from the gallery entirely (don't show a placeholder slide).

### Bug 2: Projects With Zero Photos Still Appear in the Grid
Projects that have been created in `artworks.ts` but have no photos (either `images: []` or all their images have been deleted/are broken) are still shown as cards in the `ProjectGrid`. They appear as empty cards with broken thumbnails.

**Current behavior:** All projects in the `artworks` array are rendered in the grid regardless of whether they have valid images.

**Expected behavior:** A project must have at least 1 valid/loadable image (or be a video type with a valid `videoId`) to appear in the grid. Projects with zero valid images should be automatically hidden.

## Affected Components & Files

| File | Role | What Needs to Change |
|------|------|---------------------|
| `src/app/art/data/artworks.ts` | Static artwork data (16 projects, 148 image paths) | No data changes — filtering should be runtime |
| `src/app/art/components/ProjectGrid.tsx` | Filters & renders project cards | Must filter out projects with no valid images |
| `src/app/art/components/ProjectCard.tsx` | Renders individual card with thumbnail | Must handle missing thumbnail gracefully |
| `src/app/art/components/ImageGallery.tsx` | Image carousel in modal | Must only show images that exist/load successfully |
| `src/app/art/components/ThumbnailStrip.tsx` | Thumbnail selector below gallery | Must reflect only valid images |
| `src/app/art/components/ProjectModal.tsx` | Full-screen detail view | Image count and navigation must reflect valid images only |
| `src/app/art/components/HeroSection.tsx` | Displays project count stats | Stats should reflect only visible projects |
| `src/app/art/components/InteractiveTimeline.tsx` | Year-based filtering | Year counts should reflect only visible projects |
| `src/components/figma/ImageWithFallback.tsx` | Image loader with fallback | May need to expose error state or callback |
| `src/app/art/hooks/useProjectModal.ts` | Modal state & keyboard nav | Navigation bounds must use valid image count |

## Technical Approach (Suggested)

### Image Validation
- Create a custom hook (e.g., `useValidatedArtworks`) that:
  1. Takes the raw `artworks` array as input
  2. For **local images** (`/art/...`): validates existence at runtime (e.g., attempt to fetch/load and track which ones succeed)
  3. For **external images** (Behance CDN URLs): can optionally validate or trust them
  4. For **video projects** (`type: 'video'`): consider valid if they have a `videoId`, even with `images: []`
  5. Returns a filtered list of artworks where each artwork has only its valid images, and projects with zero valid images are excluded

### Project Visibility Rule
- A project is **visible** if:
  - `type === 'video'` AND has a valid `videoId`, OR
  - `type === 'image'` AND has at least 1 loadable image in `images[]`
- A project is **hidden** if:
  - `images: []` (empty array) AND not a video type
  - All images in `images[]` fail to load

### Gallery Navigation
- The `ImageGallery` component should only render successfully loaded images
- Image counter (`1 / N`) should reflect actual valid count
- Arrow navigation and keyboard shortcuts should respect valid image bounds
- `ThumbnailStrip` should only show thumbnails for valid images

## Edge Cases to Handle

1. **All images in a project are broken** → Hide the project entirely from the grid
2. **Thumbnail is broken but other images are valid** → Use the first valid image as thumbnail fallback
3. **External URLs (Behance CDN)** → These may fail due to CORS or CDN changes; handle gracefully
4. **Video projects with empty `images: []`** → These are valid (they use YouTube embed), do NOT hide them
5. **Slow-loading images** → Show a loading state while validating, don't flash empty then populate
6. **Category/year filter counts** → Must update to reflect only visible projects (e.g., if "Painting" category has 0 visible projects, either hide the filter button or show 0)

## Acceptance Criteria

- [ ] No empty/black slides appear in the image gallery when navigating a project
- [ ] Projects with zero valid images do not appear in the project grid
- [ ] Video projects with a valid `videoId` remain visible even with `images: []`
- [ ] Image counter and navigation reflect only valid (loaded) images
- [ ] HeroSection stats (project count, category count) reflect only visible projects
- [ ] InteractiveTimeline year counts reflect only visible projects
- [ ] If a project's thumbnail is broken but has other valid images, the first valid image is used as thumbnail
- [ ] Loading state is shown while images are being validated (no layout shift or flash of empty content)
- [ ] External image URLs (Behance CDN) are handled gracefully if they fail
