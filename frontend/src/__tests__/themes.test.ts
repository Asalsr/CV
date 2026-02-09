import { getThemeColors, generateCSSVariables, colorSchemes } from '@/config/themes';

describe('Theme Configuration', () => {
  describe('colorSchemes', () => {
    it('should have palette-colors scheme defined', () => {
      expect(colorSchemes['palette-colors']).toBeDefined();
      expect(colorSchemes['palette-colors'].name).toBe('Persian Blue & Golden Yellow');
    });

    it('should have both light and dark modes', () => {
      const scheme = colorSchemes['palette-colors'];
      expect(scheme.light).toBeDefined();
      expect(scheme.dark).toBeDefined();
    });

    it('should have all required color fields in light mode', () => {
      const light = colorSchemes['palette-colors'].light;
      expect(light.primary).toBeDefined();
      expect(light.accent).toBeDefined();
      expect(light.background).toBeDefined();
      expect(light.surface).toBeDefined();
      expect(light.textPrimary).toBeDefined();
      expect(light.textSecondary).toBeDefined();
      expect(light.border).toBeDefined();
      expect(light.portfolio).toBeDefined();
      expect(light.glass).toBeDefined();
      expect(light.overlay).toBeDefined();
    });

    it('should have all required color fields in dark mode', () => {
      const dark = colorSchemes['palette-colors'].dark;
      expect(dark.primary).toBeDefined();
      expect(dark.accent).toBeDefined();
      expect(dark.background).toBeDefined();
      expect(dark.surface).toBeDefined();
      expect(dark.textPrimary).toBeDefined();
      expect(dark.textSecondary).toBeDefined();
      expect(dark.border).toBeDefined();
      expect(dark.portfolio).toBeDefined();
      expect(dark.glass).toBeDefined();
      expect(dark.overlay).toBeDefined();
    });

    it('should have all primary color shades (50-900)', () => {
      const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
      const light = colorSchemes['palette-colors'].light;
      for (const shade of shades) {
        expect(light.primary[shade]).toBeDefined();
        expect(light.accent[shade]).toBeDefined();
      }
    });

    it('should have all portfolio semantic colors', () => {
      const portfolio = colorSchemes['palette-colors'].light.portfolio;
      expect(portfolio.persianBlue).toBeDefined();
      expect(portfolio.persianBlueLight).toBeDefined();
      expect(portfolio.persianBlueDark).toBeDefined();
      expect(portfolio.goldenYellow).toBeDefined();
      expect(portfolio.amber).toBeDefined();
      expect(portfolio.sunsetOrange).toBeDefined();
      expect(portfolio.warmCoral).toBeDefined();
      expect(portfolio.teal).toBeDefined();
      expect(portfolio.tealLight).toBeDefined();
      expect(portfolio.navy).toBeDefined();
    });
  });

  describe('getThemeColors', () => {
    it('should return light mode colors', () => {
      const colors = getThemeColors('palette-colors', 'light');
      expect(colors).toBe(colorSchemes['palette-colors'].light);
    });

    it('should return dark mode colors', () => {
      const colors = getThemeColors('palette-colors', 'dark');
      expect(colors).toBe(colorSchemes['palette-colors'].dark);
    });

    it('should have different background colors for light vs dark', () => {
      const light = getThemeColors('palette-colors', 'light');
      const dark = getThemeColors('palette-colors', 'dark');
      expect(light.background).not.toBe(dark.background);
    });
  });

  describe('generateCSSVariables', () => {
    it('should generate CSS variables string for light mode', () => {
      const colors = getThemeColors('palette-colors', 'light');
      const css = generateCSSVariables(colors);
      expect(css).toContain('--color-primary-500');
      expect(css).toContain('--color-accent-500');
      expect(css).toContain('--color-background');
      expect(css).toContain('--color-surface');
      expect(css).toContain('--persian-blue');
      expect(css).toContain('--golden-yellow');
      expect(css).toContain('--sunset-orange');
      expect(css).toContain('--teal');
      expect(css).toContain('--navy');
    });

    it('should include the actual color values', () => {
      const colors = getThemeColors('palette-colors', 'light');
      const css = generateCSSVariables(colors);
      expect(css).toContain(colors.primary[500]);
      expect(css).toContain(colors.portfolio.persianBlue);
      expect(css).toContain(colors.portfolio.goldenYellow);
    });

    it('should generate CSS variables for dark mode', () => {
      const colors = getThemeColors('palette-colors', 'dark');
      const css = generateCSSVariables(colors);
      expect(css).toContain(colors.primary[500]);
      expect(css).toContain(colors.background);
    });
  });
});
