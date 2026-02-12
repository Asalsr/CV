---
feature_date: 260212
estimated_tasks: 10
complexity: medium
---

# Implementation Tasks: Art Gallery — Hide Empty Projects & Validate Images

## Overview

Introduce runtime image validation to the art portfolio page so that:
1. Deleted/missing images are excluded from gallery navigation (no black slides)
2. Projects with zero valid images are automatically hidden from the grid
3. Stats, filters, and navigation all reflect only visible/valid content

## Tasks

### Phase 1: Foundation (Types & Utilities)

- [x] T001: Add `ValidatedArtwork` type to artwork types
  - Files: `src/app/art/types/artwork.ts`
  - Details: Add a `ValidatedArtwork` interface that extends `Artwork` with two additional fields: `validImages: string[]` (only images that loaded successfully) and `validThumbnail: string` (thumbnail or first valid image as fallback). Export the new type.
  - Acceptance: `ValidatedArtwork` is exported and extends `Artwork` with `validImages` and `validThumbnail` fields. Existing `Artwork` type is unchanged.

- [x] T002: Create image probe utility
  - Files: `src/app/art/utils/validateImage.ts`
  - Details: Create a `validateImage(src: string): Promise<boolean>` function that creates an `Image()` element, sets `src`, and resolves `true` on `onload` or `false` on `onerror`. This is a pure utility with no React dependencies. Handle edge case of empty string src (return `false` immediately).
  - Acceptance: Function returns `true` for valid image URLs and `false` for broken/missing ones. Empty strings return `false`.

- [x] T003: Create `useValidatedArtworks` hook
  - Files: `src/app/art/hooks/useValidatedArtworks.ts`
  - Details: Create the core validation hook implementing this logic:
    1. Accept `rawArtworks: Artwork[]` as input
    2. On mount / when `rawArtworks` changes, set `isValidating = true`
    3. For each artwork:
       - If `type === 'video'` and `videoId` is non-empty: mark valid immediately with `validImages = []`, `validThumbnail = artwork.thumbnail`
       - Otherwise: probe `thumbnail` + all `images[]` entries in parallel using `Promise.allSettled` and `validateImage()`
       - Collect only images that resolved `true` into `validImages`
       - Set `validThumbnail` = thumbnail (if it loaded) || first entry in `validImages` || `''`
    4. Filter out artworks where `validImages.length === 0` AND `validThumbnail === ''` AND `type !== 'video'`
    5. Set `isValidating = false`, return `{ artworks: ValidatedArtwork[], isValidating: boolean }`
    6. Use `useRef` to track if the component is still mounted before setting state (avoid state updates after unmount)
  - Acceptance: Hook returns only artworks with valid content. Video projects (type `video` + `videoId`) are always included. Projects with all broken images are excluded. `isValidating` is `true` during probing and `false` after.

### Phase 2: Integration (Wire Up Validated Data)

- [x] T004: Integrate `useValidatedArtworks` into the art page
  - Files: `src/app/art/page.tsx`
  - Details:
    1. Import and call `useValidatedArtworks(artworks)` to get `{ artworks: validatedArtworks, isValidating }`
    2. Pass `validatedArtworks` (instead of raw `artworks`) to: `HeroSection`, `ProjectGrid`, `InteractiveTimeline`, and `useProjectModal`
    3. Pass `isValidating` to `ProjectGrid`
    4. No changes to filter state logic — category/year filtering still works the same, just on a smaller dataset
  - Acceptance: All child components receive validated artworks. Raw `artworks` import is only used as input to the hook. `isValidating` is passed to `ProjectGrid`.

- [x] T005: Update `useProjectModal` to work with `ValidatedArtwork`
  - Files: `src/app/art/hooks/useProjectModal.ts`
  - Details:
    1. Update the `artworks` prop type to accept `ValidatedArtwork[]`
    2. Update `currentProject` state type to `ValidatedArtwork | null`
    3. Change `nextImage` / `prevImage` to use `currentProject.validImages.length` for bounds instead of `currentProject.images.length`
    4. Update `openProject` to accept `ValidatedArtwork`
    5. Update the return type so `currentProject` is `ValidatedArtwork | null`
  - Acceptance: Image navigation (arrows, keyboard) wraps correctly within `validImages` bounds. Project navigation (shift+arrows) cycles only through validated projects.

- [x] T006: Update `ProjectModal` to pass valid images to gallery
  - Files: `src/app/art/components/ProjectModal.tsx`
  - Details:
    1. Update the `project` prop type from `Artwork` to `ValidatedArtwork`
    2. Update `allArtworks` prop type to `ValidatedArtwork[]`
    3. Change `ImageGallery` images prop from `project.images` to `project.validImages`
    4. `onSelectProject` callback type should accept `ValidatedArtwork`
  - Acceptance: `ImageGallery` receives only valid images. No black/empty slides appear when navigating. Video projects still render YouTube iframe correctly.

- [x] T007: Update `ProjectCard` to use `validThumbnail`
  - Files: `src/app/art/components/ProjectCard.tsx`
  - Details:
    1. Update the `artwork` prop type from `Artwork` to `ValidatedArtwork`
    2. Change `ImageWithFallback` src from `artwork.thumbnail` to `artwork.validThumbnail`
    3. Change the image count badge from `artwork.images.length` to `artwork.validImages.length` (show count only if `> 1`)
  - Acceptance: Cards display validated thumbnails. If original thumbnail was broken, first valid image is shown. Image count badge reflects valid image count.

- [x] T008: Update `ProjectGrid` to accept `isValidating` and show loading state
  - Files: `src/app/art/components/ProjectGrid.tsx`
  - Details:
    1. Update `artworks` prop type from `Artwork[]` to `ValidatedArtwork[]`
    2. Add `isValidating: boolean` prop
    3. When `isValidating` is `true`, render a skeleton grid instead of the project cards:
       - Use the same responsive grid classes (`grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6`)
       - Render 8 skeleton cards (placeholder count) with `aspect-[4/3]` and shimmer animation
       - Style: `bg-white/5 backdrop-blur-sm rounded-2xl animate-pulse` (matches existing glass card style)
       - Add `aria-busy="true"` to the grid container while loading
    4. When `isValidating` is `false`, render the grid normally with validated artworks
    5. Update `onProjectClick` callback type to accept `ValidatedArtwork`
  - Acceptance: Skeleton grid shows during validation. Smooth transition to real cards. No layout shift. `aria-busy` is set correctly.

### Phase 3: Downstream Components

- [x] T009: Update `HeroSection` and `InteractiveTimeline` prop types
  - Files: `src/app/art/components/HeroSection.tsx`, `src/app/art/components/InteractiveTimeline.tsx`
  - Details:
    1. **HeroSection**: Update `artworks` prop type from `Artwork[]` to `ValidatedArtwork[]`. No logic changes needed — the `useMemo` already computes stats from whatever artworks array it receives. Since empty projects are already filtered out by the hook, stats will automatically be correct.
    2. **InteractiveTimeline**: Update `artworks` prop type from `Artwork[]` to `ValidatedArtwork[]`. Same reasoning — year data is computed from the array it receives.
    3. Update the import in both files from `Artwork` to include `ValidatedArtwork`.
  - Acceptance: HeroSection project count matches visible cards. Category count excludes categories with zero visible projects. Timeline year counts match visible projects per year.

### Phase 4: i18n & Polish

- [x] T010: Add loading translation key to all language files
  - Files: `frontend/messages/en.json`, `frontend/messages/sv.json`, `frontend/messages/fa.json`
  - Details: Add a `loading` key under the existing `art.projectGrid` namespace in all three language files. This text is shown as an accessible label on the skeleton grid during validation.
  - i18n keys:
    - `art.projectGrid.loading` → EN: `"Loading projects..."` | SV: `"Laddar projekt..."` | FA: `"در حال بارگذاری پروژه‌ها..."`
  - Acceptance: Key exists in all three language files. `ProjectGrid` skeleton state uses the translated string as an `aria-label` on the grid container.

## Task Dependencies

```
T001 ──┐
T002 ──┤
       ├── T003 ── T004 ──┬── T005
       │                   ├── T006
       │                   ├── T007
       │                   ├── T008 ── T010
       │                   └── T009
```

- T003 depends on T001 (types) and T002 (utility)
- T004 depends on T003 (hook must exist)
- T005–T009 depend on T004 (validated data must flow from page)
- T010 depends on T008 (skeleton grid must exist to use the key)

## Relevant Files

| File | Status |
|---|---|
| `src/app/art/types/artwork.ts` | Modify (T001) |
| `src/app/art/utils/validateImage.ts` | **Create** (T002) |
| `src/app/art/hooks/useValidatedArtworks.ts` | **Create** (T003) |
| `src/app/art/page.tsx` | Modify (T004) |
| `src/app/art/hooks/useProjectModal.ts` | Modify (T005) |
| `src/app/art/components/ProjectModal.tsx` | Modify (T006) |
| `src/app/art/components/ProjectCard.tsx` | Modify (T007) |
| `src/app/art/components/ProjectGrid.tsx` | Modify (T008) |
| `src/app/art/components/HeroSection.tsx` | Modify (T009) |
| `src/app/art/components/InteractiveTimeline.tsx` | Modify (T009) |
| `frontend/messages/en.json` | Modify (T010) |
| `frontend/messages/sv.json` | Modify (T010) |
| `frontend/messages/fa.json` | Modify (T010) |

## Notes

- `ImageGallery.tsx` and `ThumbnailStrip.tsx` require **no changes** — they already receive `images[]` as a prop, so passing `validImages` from upstream is sufficient.
- `RelatedProjects.tsx` will need its `allArtworks` prop updated to `ValidatedArtwork[]` as part of T006 (it receives it from `ProjectModal`). It already handles empty arrays gracefully (returns `null`).
- The `Artwork` type and raw `artworks` data array remain untouched — all filtering is runtime via the hook.
- Video projects (ids 14, 15) have `images: []` by design — the hook must always pass them through as valid since they use YouTube embeds.
