# Theme System Documentation

## Overview
This portfolio website features a comprehensive theme management system built with **Redux Toolkit**, allowing users to switch between 4 different color schemes and light/dark modes.

## Features

### 🎨 Four Color Schemes
1. **Tech Teal & Creative Coral** (Default) - Modern tech meets warm creativity
2. **Deep Purple & Gold** - Creative sophistication
3. **Emerald & Rose** - Growth and passion
4. **Monochrome + Electric Blue** - Ultimate focus on content

### 🌓 Dark/Light Mode
- Automatic system preference detection
- Manual toggle with smooth transitions
- Persistent across sessions (localStorage)

### 💾 State Management
- **Redux Toolkit** for centralized theme state
- Persistent storage in localStorage
- Type-safe with TypeScript

## Architecture

### Directory Structure
```
frontend/src/
├── config/
│   └── themes.ts              # Color scheme definitions
├── lib/redux/
│   ├── store.ts               # Redux store configuration
│   ├── themeSlice.ts          # Theme state management
│   ├── hooks.ts               # Typed Redux hooks
│   └── StoreProvider.tsx      # Redux Provider component
├── components/theme/
│   ├── ThemeProvider.tsx      # Applies theme CSS variables
│   ├── ThemeModeToggle.tsx    # Dark/Light mode toggle
│   └── ColorSchemeSelector.tsx # Color scheme selector
└── app/
    ├── layout.tsx             # Root layout with providers
    ├── globals.css            # CSS variables & base styles
    └── page.tsx               # Demo page
```

## How It Works

### 1. Color Scheme Configuration
All color schemes are defined in `/config/themes.ts`:

```typescript
export type ColorScheme = 'teal-coral' | 'purple-gold' | 'emerald-rose' | 'monochrome-blue';
export type ThemeMode = 'light' | 'dark';

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  'teal-coral': {
    name: 'Tech Teal & Creative Coral',
    description: 'Modern tech meets warm creativity',
    light: { /* color definitions */ },
    dark: { /* color definitions */ },
  },
  // ... other schemes
};
```

### 2. Redux State Management
Theme state is managed in `/lib/redux/themeSlice.ts`:

```typescript
interface ThemeState {
  colorScheme: ColorScheme;
  mode: ThemeMode;
}

// Actions available:
- setColorScheme(scheme)  // Change color scheme
- setThemeMode(mode)      // Set light/dark mode
- toggleThemeMode()       // Toggle between modes
- setTheme({ scheme, mode }) // Set both at once
```

### 3. CSS Custom Properties
The `ThemeProvider` component dynamically injects CSS variables based on Redux state:

```css
:root {
  --color-primary-500: #06b6d4;
  --color-accent-500: #f97316;
  --color-background: #fafafa;
  --color-surface: #ffffff;
  --color-text-primary: #0f172a;
  --color-text-secondary: #475569;
  --color-border: #e2e8f0;
  /* ... all color shades */
}
```

### 4. Using Theme Colors in Components

**Using CSS Variables (Recommended):**
```tsx
<div style={{ backgroundColor: 'var(--color-background)' }}>
  <h1 style={{ color: 'var(--color-text-primary)' }}>
    Hello World
  </h1>
</div>
```

**Accessing Redux State:**
```tsx
import { useAppSelector } from '@/lib/redux/hooks';

function MyComponent() {
  const { colorScheme, mode } = useAppSelector((state) => state.theme);

  return <div>Current scheme: {colorScheme}</div>;
}
```

**Changing Theme:**
```tsx
import { useAppDispatch } from '@/lib/redux/hooks';
import { setColorScheme, toggleThemeMode } from '@/lib/redux/themeSlice';

function ThemeControls() {
  const dispatch = useAppDispatch();

  return (
    <>
      <button onClick={() => dispatch(setColorScheme('purple-gold'))}>
        Purple Theme
      </button>
      <button onClick={() => dispatch(toggleThemeMode())}>
        Toggle Mode
      </button>
    </>
  );
}
```

## Available CSS Variables

### Primary Colors
- `--color-primary-50` to `--color-primary-900` (10 shades)

### Accent Colors
- `--color-accent-50` to `--color-accent-900` (10 shades)

### Semantic Colors
- `--color-background` - Page background
- `--color-surface` - Card/container backgrounds
- `--color-text-primary` - Main text color
- `--color-text-secondary` - Secondary/muted text
- `--color-border` - Border colors

## Components

### ThemeModeToggle
Toggle between light and dark mode with animated icon.

```tsx
import ThemeModeToggle from '@/components/theme/ThemeModeToggle';

<ThemeModeToggle />
```

### ColorSchemeSelector
Dropdown to select from 4 color schemes with preview.

```tsx
import ColorSchemeSelector from '@/components/theme/ColorSchemeSelector';

<ColorSchemeSelector />
```

## Customization

### Adding a New Color Scheme

1. **Define colors in `/config/themes.ts`:**

```typescript
export type ColorScheme = 'teal-coral' | 'purple-gold' | 'emerald-rose' | 'monochrome-blue' | 'my-new-theme';

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  // ... existing schemes
  'my-new-theme': {
    name: 'My Custom Theme',
    description: 'My awesome theme',
    light: {
      primary: { /* 50-900 shades */ },
      accent: { /* 50-900 shades */ },
      background: '#ffffff',
      surface: '#f5f5f5',
      textPrimary: '#000000',
      textSecondary: '#666666',
      border: '#e0e0e0',
    },
    dark: {
      // dark mode colors
    },
  },
};
```

2. **Update the selector in `/components/theme/ColorSchemeSelector.tsx`:**

```typescript
const schemes: ColorScheme[] = [
  'teal-coral',
  'purple-gold',
  'emerald-rose',
  'monochrome-blue',
  'my-new-theme'  // Add your new scheme
];
```

### Modifying Existing Colors

Simply edit the color values in `/config/themes.ts`. Changes will apply immediately without restarting the dev server (hot reload).

## Persistence

Theme preferences are automatically saved to `localStorage`:
- `colorScheme` - Selected color scheme
- `themeMode` - Light or dark mode

On page load, the theme is restored from localStorage, or defaults to:
- Color scheme: `teal-coral`
- Mode: System preference (or `light` if unavailable)

## Best Practices

### 1. Always Use CSS Variables
```tsx
// ✅ Good
<div style={{ color: 'var(--color-primary-500)' }} />

// ❌ Avoid
<div style={{ color: '#06b6d4' }} />
```

### 2. Use Semantic Colors
```tsx
// ✅ Good - Adapts to theme
<div style={{ backgroundColor: 'var(--color-surface)' }} />

// ❌ Bad - Hardcoded
<div style={{ backgroundColor: '#ffffff' }} />
```

### 3. Respect Motion Preferences
The theme system includes smooth transitions, but respects `prefers-reduced-motion`.

### 4. Test All Combinations
Always test your components in:
- All 4 color schemes
- Both light and dark modes
- = 8 total theme combinations

## Performance

- CSS variables are injected once per theme change
- No re-renders of components that don't use Redux state
- LocalStorage operations are debounced
- Smooth 300ms transitions

## Accessibility

- ✅ WCAG AAA contrast ratios (7:1 for text)
- ✅ Focus visible on all interactive elements
- ✅ Screen reader friendly
- ✅ Keyboard navigable
- ✅ Respects `prefers-color-scheme`
- ✅ Respects `prefers-reduced-motion`

## Tech Stack

- **Next.js 16** - React framework
- **Redux Toolkit** - State management
- **TypeScript** - Type safety
- **Tailwind CSS 4** - Utility-first CSS
- **Framer Motion** - Animations
- **Lucide React** - Icons

## Development

### Run Development Server
```bash
cd frontend
npm run dev
```

Visit `http://localhost:3000` to see the theme demo.

### Build for Production
```bash
npm run build
npm start
```

## Troubleshooting

### Theme not applying
1. Check browser console for errors
2. Verify Redux DevTools shows correct state
3. Inspect element to see if CSS variables are present

### Colors not changing
1. Clear localStorage: `localStorage.clear()`
2. Hard refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)

### TypeScript errors
1. Ensure all imports are correct
2. Run `npm run build` to check for type errors

## Future Enhancements

- [ ] Add more color schemes
- [ ] Custom color picker for user-defined themes
- [ ] Export/import theme configurations
- [ ] Theme presets for different industries
- [ ] Gradient backgrounds
- [ ] Theme-aware image filters

---

**Built for Saeedeh's Portfolio**
Theme System v1.0 | December 2025
