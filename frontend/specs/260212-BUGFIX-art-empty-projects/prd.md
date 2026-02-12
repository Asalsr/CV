---
feature_date: 260212
complexity: medium
branch: feature/260212-art-empty-projects
created_date: 2026-02-12
---

# Bugfix: Art Gallery — Hide Empty Projects & Validate Images

## Overview

The art portfolio page (`/art`) has two related bugs that cause a degraded user experience. First, when image files are deleted from `public/art/` but their paths remain in the `artworks.ts` data file, the gallery renders empty black slides instead of skipping them. Second, projects that have no images at all (empty `images[]` array, or all images are broken) still appear as cards in the project grid, showing broken/empty thumbnails. Both issues need to be resolved by introducing runtime image validation and project visibility filtering.

## Goals

- Eliminate empty/black slides from the image gallery
- Automatically hide projects that have no valid (loadable) images
- Keep video projects visible even with empty `images[]` (they use YouTube embeds)
- Ensure all stats, counters, and navigation reflect only valid content

## User Stories

- As a visitor, I want to only see projects that have actual content so that I don't encounter empty cards or broken thumbnails
- As a visitor, I want to browse a project gallery without seeing empty black slides so that the experience feels polished and professional
- As the site owner, I want projects to automatically hide when their images are removed so that I don't have to manually update the data file every time I delete photos

## Functional Requirements

### FR-1: Runtime Image Validation

Create a `useValidatedArtworks` hook that validates image availability at runtime:

1. Takes the raw `artworks` array as input
2. For each artwork, probes each image URL to determine if it loads
3. Returns a new artworks array where each artwork contains only its valid (loadable) images
4. Filters out artworks that end up with zero valid images (unless they are video type)
5. Caches validation results for the session to avoid repeated probing

**Validation strategy by image type:**

| Image Source | Validation Method |
|---|---|
| Local paths (`/art/...`) | `Image()` object probe — create an `Image` element, set `src`, listen for `onload`/`onerror` |
| External URLs (Behance CDN, YouTube thumbnails) | Same `Image()` probe — will work for images that allow cross-origin loading |
| Video projects (`type: 'video'`) | Valid if `videoId` is a non-empty string, regardless of `images[]` |

**Hook interface:**

```typescript
interface ValidatedArtwork extends Artwork {
  validImages: string[];       // only images that loaded successfully
  validThumbnail: string;      // thumbnail, or first valid image as fallback
}

interface UseValidatedArtworksReturn {
  artworks: ValidatedArtwork[];  // only projects with valid content
  isValidating: boolean;         // true while probing is in progress
}

function useValidatedArtworks(rawArtworks: Artwork[]): UseValidatedArtworksReturn;
```

### FR-2: Project Visibility Rules

A project is **visible** if any of the following are true:
- `type === 'video'` AND `videoId` is a non-empty string
- `type === 'image'` AND at least 1 image in `images[]` loads successfully
- The artwork's `thumbnail` loads successfully (even if `images[]` is empty)

A project is **hidden** if:
- `type === 'image'` AND `images[]` is empty AND `thumbnail` fails to load
- `type === 'image'` AND all entries in `images[]` fail to load AND `thumbnail` fails to load

### FR-3: Thumbnail Fallback

When a project's `thumbnail` fails to load but other images in `images[]` are valid:
- Use the first valid image from `validImages[]` as the thumbnail
- This is handled by the `validThumbnail` field in `ValidatedArtwork`

### FR-4: Gallery Shows Only Valid Images

Inside `ProjectModal > ImageGallery`:
- Render only validated images (from `validImages[]`), not the raw `images[]`
- Image counter (`1 / N`) reflects valid image count
- Arrow navigation wraps within valid image bounds only
- `ThumbnailStrip` renders only valid image thumbnails

### FR-5: Stats and Filters Reflect Visible Projects Only

All downstream components must use the validated artworks list:

| Component | What Changes |
|---|---|
| `HeroSection` | `stats.projectCount` = validated artworks count; `stats.categoryCount` = categories present in validated list; category filter buttons only show categories that have visible projects |
| `ProjectGrid` | Iterates over validated artworks instead of raw artworks |
| `InteractiveTimeline` | Year data computed from validated artworks only |
| `useProjectModal` | Prev/next project navigation cycles through validated artworks |

### FR-6: Loading State During Validation

While images are being validated (`isValidating === true`):
- Show a skeleton/shimmer loading state in the `ProjectGrid` area
- Do not render empty grid or flash partial content
- Once validation completes, render the grid with smooth fade-in (reuse existing Framer Motion patterns)

## Non-Goals (Out of Scope)

- Server-side image validation or build-time checks — this is runtime client-side only
- Modifying the `artworks.ts` data file to remove broken paths — the fix is purely runtime
- Adding an admin UI for managing artwork entries
- Image optimization or format conversion
- Retry logic for temporarily unavailable images (e.g., network flicker)

## Technical Approach

### New Files

| File | Purpose |
|---|---|
| `src/app/art/hooks/useValidatedArtworks.ts` | Core validation hook |
| `src/app/art/utils/validateImage.ts` | Image probe utility function |

### Modified Files

| File | Change |
|---|---|
| `src/app/art/page.tsx` | Replace raw `artworks` with `useValidatedArtworks(artworks)`. Pass `validatedArtworks` and `isValidating` to child components. |
| `src/app/art/components/ProjectGrid.tsx` | Accept `isValidating` prop. Show skeleton grid while validating. Use validated artworks. |
| `src/app/art/components/ProjectCard.tsx` | Use `validThumbnail` instead of `artwork.thumbnail`. |
| `src/app/art/components/ProjectModal.tsx` | Pass `validImages` to `ImageGallery` instead of `project.images`. |
| `src/app/art/components/ImageGallery.tsx` | No interface changes needed — it already receives `images[]` as prop. |
| `src/app/art/components/ThumbnailStrip.tsx` | No interface changes — receives filtered images from `ImageGallery`. |
| `src/app/art/components/HeroSection.tsx` | Stats computed from validated artworks. No interface change (already receives `artworks` prop). |
| `src/app/art/components/InteractiveTimeline.tsx` | Year data from validated artworks. No interface change. |
| `src/app/art/hooks/useProjectModal.ts` | Receives validated artworks. Image navigation uses `validImages.length` for bounds. |
| `src/app/art/types/artwork.ts` | Add `ValidatedArtwork` interface extending `Artwork`. |

### Image Probe Utility

```typescript
// src/app/art/utils/validateImage.ts
export function validateImage(src: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = src;
  });
}
```

### Validation Hook Logic

```typescript
// src/app/art/hooks/useValidatedArtworks.ts
// Pseudocode:
1. On mount (or when rawArtworks changes), set isValidating = true
2. For each artwork:
   a. If type === 'video' && videoId → mark as valid immediately
   b. Otherwise, probe thumbnail + all images in parallel using Promise.allSettled
   c. Collect only images that resolved successfully
   d. Set validThumbnail = thumbnail (if valid) || first valid image || null
3. Filter out artworks where validImages is empty AND validThumbnail is null AND not a video
4. Set isValidating = false, return validated list
```

### Integration in page.tsx

```typescript
// Before (current):
const artworksData = artworks; // raw static data used everywhere

// After:
const { artworks: validatedArtworks, isValidating } = useValidatedArtworks(artworks);
// Pass validatedArtworks to HeroSection, ProjectGrid, InteractiveTimeline, useProjectModal
```

## Design Considerations

### Theme Compatibility
- Skeleton loading state should use the existing `bg-white/5` and `backdrop-blur-sm` glass style used throughout the art page
- No new color tokens needed

### Responsive Design
- Skeleton grid should show the same column layout as `ProjectGrid` (1 col mobile → 4 col xl)
- No layout changes otherwise — the validated data simply has fewer items

### Accessibility
- Loading state should use `aria-busy="true"` on the grid container
- Screen readers should not announce hidden projects
- No change to keyboard navigation behavior (just fewer projects to cycle through)

### Performance
- Image probing runs in parallel using `Promise.allSettled` to avoid waterfall
- Results are cached in React state for the session (re-mount triggers re-validation)
- Typical validation for 16 projects × ~10 images each ≈ 160 probes, completing in <2s on decent connections
- Local images (`/art/...`) will be near-instant as they're served from the same origin

## i18n Considerations

Add the following translation key:

| Key | EN | FA |
|---|---|---|
| `art.projectGrid.loading` | `"Loading projects..."` | `"در حال بارگذاری پروژه‌ها..."` |

No other translation changes needed — existing `noResults` key already handles empty filtered states.

## Success Criteria

- [ ] No empty/black slides appear when navigating images in the gallery modal
- [ ] Projects with zero valid images do not appear in the project grid
- [ ] Video projects (ids 14, 15) with `images: []` remain visible and functional
- [ ] Image counter (`1 / N`) and arrow navigation reflect only valid images
- [ ] HeroSection project count matches the number of visible project cards
- [ ] HeroSection category count excludes categories with zero visible projects
- [ ] InteractiveTimeline year counts match visible projects per year
- [ ] Category filter buttons only show categories that have visible projects
- [ ] If a project's thumbnail fails but has valid images, the first valid image is used as card thumbnail
- [ ] A skeleton loading state shows while images are being validated
- [ ] No layout shift or flash of empty content during validation
- [ ] External URLs (Behance CDN) that fail to load cause the project to be hidden gracefully
- [ ] Keyboard navigation (arrows, shift+arrows) cycles only through visible projects and valid images

## Open Questions

- **Cache duration**: Should validated results persist across page navigations (e.g., via `sessionStorage`), or is re-validating on each mount acceptable? *Recommendation: re-validate on mount is fine for 160 probes.*
- **Partial loading**: Should the grid render projects as they are validated (progressive), or wait until all validation completes? *Recommendation: wait for all to avoid layout shifts.*
