---
description: Manage theme system - add color schemes, modify themes, debug theme issues
allowed-tools: Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# /theme - Theme Management

## Goal

Manage the Redux-based theme system: add new color schemes, modify existing themes, or debug theme issues.

## Theme System Overview

This project uses:
- **Redux Toolkit** for theme state (`src/lib/redux/themeSlice.ts`)
- **CSS Variables** for theme colors (set in ThemeProvider)
- **Color Schemes** defined in `src/config/themes.ts`
- **Light/Dark modes** for each scheme

## Commands

### Add New Color Scheme

To add a new color scheme:

1. **Define colors** in `src/config/themes.ts`:
```typescript
export const colorSchemes: ColorSchemes = {
  // ... existing schemes
  myNewScheme: {
    name: 'My New Scheme',
    description: 'Description here',
    light: {
      primary: { 50: '#...', 100: '#...', /* ... */ 900: '#...' },
      accent: { 50: '#...', 100: '#...', /* ... */ 900: '#...' },
      background: '#ffffff',
      surface: '#f5f5f5',
      textPrimary: '#1a1a1a',
      textSecondary: '#666666',
      border: '#e0e0e0',
    },
    dark: {
      // ... dark mode colors
    },
  },
};
```

2. **Update TypeScript types** if needed in the same file

3. **Test** by switching to the new scheme in the UI

### Modify Existing Scheme

Edit colors in `src/config/themes.ts` - changes apply immediately on save.

### Debug Theme Issues

**Common issues:**

1. **Colors not applying:**
   - Check CSS variable names match: `var(--color-primary-500)`
   - Check ThemeProvider is setting variables correctly

2. **Hydration mismatch (flash on load):**
   - Use `isHydrated` flag from Redux state
   - Wrap dynamic content in hydration check

3. **Dark mode not working:**
   - Check `mode` state in Redux
   - Verify dark mode colors are defined

### Theme Files

```
src/config/themes.ts          # Color scheme definitions
src/lib/redux/themeSlice.ts   # Redux state & actions
src/components/theme/
  ThemeProvider.tsx           # Sets CSS variables
  ThemeModeToggle.tsx         # Light/dark toggle
  ColorSchemeSelector.tsx     # Scheme picker
```

### CSS Variable Reference

```css
/* Primary colors */
--color-primary-50 through --color-primary-900

/* Accent colors */
--color-accent-50 through --color-accent-900

/* Semantic colors */
--color-background
--color-surface
--color-text-primary
--color-text-secondary
--color-border
```

## Request

$ARGUMENTS
