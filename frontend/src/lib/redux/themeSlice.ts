// Redux Slice for Theme Management
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { ColorScheme, ThemeMode } from '@/config/themes';

export interface ThemeState {
  colorScheme: ColorScheme;
  mode: ThemeMode;
}

// Load initial state from localStorage (if available)
const loadInitialState = (): ThemeState => {
  if (typeof window !== 'undefined') {
    try {
      const savedColorScheme = localStorage.getItem('colorScheme') as ColorScheme;
      const savedMode = localStorage.getItem('themeMode') as ThemeMode;

      // Check system preference if no saved mode
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

      return {
        colorScheme: savedColorScheme || 'teal-coral',
        mode: savedMode || (systemPrefersDark ? 'dark' : 'light'),
      };
    } catch (error) {
      console.error('Error loading theme from localStorage:', error);
    }
  }

  return {
    colorScheme: 'teal-coral',
    mode: 'light',
  };
};

const initialState: ThemeState = loadInitialState();

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
  },
});

export const { setColorScheme, setThemeMode, toggleThemeMode, setTheme } = themeSlice.actions;
export default themeSlice.reducer;
