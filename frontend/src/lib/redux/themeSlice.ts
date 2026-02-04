// Redux Slice for Theme Management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ColorScheme, ThemeMode } from '@/config/themes';

export interface ThemeState {
  colorScheme: ColorScheme;
  mode: ThemeMode;
  isHydrated: boolean;
}

// Use consistent initial state for SSR - will be updated on client after hydration
const initialState: ThemeState = {
  colorScheme: 'purple-gold',
  mode: 'light',
  isHydrated: false,
};

// Helper to load persisted state (call only on client after mount)
export const loadPersistedTheme = (): { colorScheme: ColorScheme; mode: ThemeMode } => {
  try {
    const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme;
    const savedMode = localStorage.getItem('themeMode') as ThemeMode;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    return {
      colorScheme: savedColorScheme || 'purple-gold',
      mode: savedMode || (systemPrefersDark ? 'dark' : 'light'),
    };
  } catch {
    return { colorScheme: 'purple-gold', mode: 'light' };
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
