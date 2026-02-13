# Bug: Languages not working in production

**Status:** Open
**Date:** 2026-02-12
**Priority:** High

## Description

Language switching / i18n does not work in the production build. Needs investigation.

## To Investigate

- [ ] Check if locale files are included in the static export (`out/` folder)
- [ ] Verify `next.config.ts` i18n settings are compatible with `output: "export"` (static export)
- [ ] Check if language detection/routing works with GitHub Pages (no server-side routing)
- [ ] Verify translation JSON files are loaded correctly in production
- [ ] Check browser console for 404s or errors related to locale/translation files
- [ ] Compare dev vs production behavior to isolate the difference

## Possible Causes

- Next.js built-in i18n routing (`i18n` config) does not support `output: "export"`
- Locale files not being bundled in the static build
- Client-side language switching path issues with basePath on GitHub Pages
- Missing or incorrect locale detection fallback in production
