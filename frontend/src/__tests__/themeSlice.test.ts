import themeReducer, {
  setColorScheme,
  setThemeMode,
  toggleThemeMode,
  setTheme,
  hydrateTheme,
  type ThemeState,
} from '@/lib/redux/themeSlice';

describe('themeSlice', () => {
  const initialState: ThemeState = {
    colorScheme: 'palette-colors',
    mode: 'light',
    isHydrated: false,
  };

  it('should return the initial state', () => {
    expect(themeReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  describe('setColorScheme', () => {
    it('should set the color scheme', () => {
      const state = themeReducer(initialState, setColorScheme('palette-colors'));
      expect(state.colorScheme).toBe('palette-colors');
    });
  });

  describe('setThemeMode', () => {
    it('should set the theme mode to dark', () => {
      const state = themeReducer(initialState, setThemeMode('dark'));
      expect(state.mode).toBe('dark');
    });

    it('should set the theme mode to light', () => {
      const darkState = { ...initialState, mode: 'dark' as const };
      const state = themeReducer(darkState, setThemeMode('light'));
      expect(state.mode).toBe('light');
    });
  });

  describe('toggleThemeMode', () => {
    it('should toggle from light to dark', () => {
      const state = themeReducer(initialState, toggleThemeMode());
      expect(state.mode).toBe('dark');
    });

    it('should toggle from dark to light', () => {
      const darkState = { ...initialState, mode: 'dark' as const };
      const state = themeReducer(darkState, toggleThemeMode());
      expect(state.mode).toBe('light');
    });
  });

  describe('setTheme', () => {
    it('should set both color scheme and mode', () => {
      const state = themeReducer(
        initialState,
        setTheme({ colorScheme: 'palette-colors', mode: 'dark' })
      );
      expect(state.colorScheme).toBe('palette-colors');
      expect(state.mode).toBe('dark');
    });
  });

  describe('hydrateTheme', () => {
    it('should hydrate the theme and set isHydrated to true', () => {
      const state = themeReducer(
        initialState,
        hydrateTheme({ colorScheme: 'palette-colors', mode: 'dark' })
      );
      expect(state.colorScheme).toBe('palette-colors');
      expect(state.mode).toBe('dark');
      expect(state.isHydrated).toBe(true);
    });

    it('should only set isHydrated to true after hydration', () => {
      expect(initialState.isHydrated).toBe(false);
      const state = themeReducer(
        initialState,
        hydrateTheme({ colorScheme: 'palette-colors', mode: 'light' })
      );
      expect(state.isHydrated).toBe(true);
    });
  });
});
