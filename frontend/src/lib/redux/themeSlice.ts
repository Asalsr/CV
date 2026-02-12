// Redux Slice for Theme Management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { colorSchemes, type ColorScheme, type ThemeMode } from '@/config/themes';

export interface ThemeState {
  colorScheme: ColorScheme;
  mode: ThemeMode;
  isHydrated: boolean;
}

// Use consistent initial state for SSR - will be updated on client after hydration
const initialState: ThemeState = {
  colorScheme: 'palette-colors',
  mode: 'light',
  isHydrated: false,
};

// Helper to load persisted state (call only on client after mount)
export const loadPersistedTheme = (): { colorScheme: ColorScheme; mode: ThemeMode } => {
  try {
    const savedColorScheme = localStorage.getItem('colorScheme');
    const savedMode = localStorage.getItem('themeMode');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    const validScheme = savedColorScheme && savedColorScheme in colorSchemes
      ? (savedColorScheme as ColorScheme)
      : 'palette-colors';
    const validMode = savedMode === 'light' || savedMode === 'dark'
      ? savedMode
      : (systemPrefersDark ? 'dark' : 'light');

    return {
      colorScheme: validScheme,
      mode: validMode,
    };
  } catch {
    return { colorScheme: 'palette-colors', mode: 'light' };
  }
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    setColorScheme: (state, action: PayloadAction<ColorScheme>) => {
      state.colorScheme = action.payload;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('colorScheme', action.payload);
      }
    },

    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.mode = action.payload;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', action.payload);
      }
    },

    toggleThemeMode: (state) => {
      state.mode = state.mode === 'light' ? 'dark' : 'light';

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('themeMode', state.mode);
      }
    },

    setTheme: (state, action: PayloadAction<{ colorScheme: ColorScheme; mode: ThemeMode }>) => {
      state.colorScheme = action.payload.colorScheme;
      state.mode = action.payload.mode;

      // Persist to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('colorScheme', action.payload.colorScheme);
        localStorage.setItem('themeMode', action.payload.mode);
      }
    },

    hydrateTheme: (state, action: PayloadAction<{ colorScheme: ColorScheme; mode: ThemeMode }>) => {
      state.colorScheme = action.payload.colorScheme;
      state.mode = action.payload.mode;
      state.isHydrated = true;
    },
  },
});

export const { setColorScheme, setThemeMode, toggleThemeMode, setTheme, hydrateTheme } = themeSlice.actions;
export default themeSlice.reducer;
