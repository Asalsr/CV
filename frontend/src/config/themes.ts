// Theme Configuration - Persian Blue & Yellow Palette
// Designed for Saeedeh's Portfolio

export type ColorScheme = 'persian-blue-yellow';
export type ThemeMode = 'light' | 'dark';

export interface ThemeColors {
  primary: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  accent: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
  background: string;
  surface: string;
  textPrimary: string;
  textSecondary: string;
  border: string;
}

export interface ColorSchemeConfig {
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  'persian-blue-yellow': {
    name: 'Persian Blue & Golden Yellow',
    description: 'Where art meets technology',
    light: {
      primary: {
        50: '#EBF0FF',
        100: '#D6E0FF',
        200: '#ADC1FF',
        300: '#85A2FF',
        400: '#4A7AEF',
        500: '#1C39BB',
        600: '#162E96',
        700: '#0F1E5C',
        800: '#0A1340',
        900: '#050A20',
      },
      accent: {
        50: '#FFF8E1',
        100: '#FFF0B8',
        200: '#FFE68A',
        300: '#FFD95C',
        400: '#FFC947',
        500: '#FFB800',
        600: '#E0A200',
        700: '#B88500',
        800: '#8F6800',
        900: '#664A00',
      },
      background: '#ffffff',
      surface: '#ffffff',
      textPrimary: '#0F1729',
      textSecondary: '#5A6B7D',
      border: 'rgba(28, 57, 187, 0.15)',
    },
    dark: {
      primary: {
        50: '#EBF0FF',
        100: '#D6E0FF',
        200: '#ADC1FF',
        300: '#85A2FF',
        400: '#7BA8F5',
        500: '#5B8DEF',
        600: '#3D6FD9',
        700: '#2A54B0',
        800: '#1A3A87',
        900: '#0F245E',
      },
      accent: {
        50: '#FFF8E1',
        100: '#FFF0B8',
        200: '#FFE68A',
        300: '#e3bd59',
        400: '#FFC947',
        500: '#FFC947',
        600: '#E0A200',
        700: '#B88500',
        800: '#8F6800',
        900: '#664A00',
      },
      background: '#0A0E1A',
      surface: '#0F1729',
      textPrimary: '#F0F4F8',
      textSecondary: '#94A3B8',
      border: 'rgba(91, 141, 239, 0.2)',
    },
  },
};

// Helper function to get current theme colors
export const getThemeColors = (
  colorScheme: ColorScheme,
  mode: ThemeMode
): ThemeColors => {
  return colorSchemes[colorScheme][mode];
};

// CSS custom properties generator
export const generateCSSVariables = (colors: ThemeColors): string => {
  return `
    --color-primary-50: ${colors.primary[50]};
    --color-primary-100: ${colors.primary[100]};
    --color-primary-200: ${colors.primary[200]};
    --color-primary-300: ${colors.primary[300]};
    --color-primary-400: ${colors.primary[400]};
    --color-primary-500: ${colors.primary[500]};
    --color-primary-600: ${colors.primary[600]};
    --color-primary-700: ${colors.primary[700]};
    --color-primary-800: ${colors.primary[800]};
    --color-primary-900: ${colors.primary[900]};

    --color-accent-50: ${colors.accent[50]};
    --color-accent-100: ${colors.accent[100]};
    --color-accent-200: ${colors.accent[200]};
    --color-accent-300: ${colors.accent[300]};
    --color-accent-400: ${colors.accent[400]};
    --color-accent-500: ${colors.accent[500]};
    --color-accent-600: ${colors.accent[600]};
    --color-accent-700: ${colors.accent[700]};
    --color-accent-800: ${colors.accent[800]};
    --color-accent-900: ${colors.accent[900]};

    --color-background: ${colors.background};
    --color-surface: ${colors.surface};
    --color-text-primary: ${colors.textPrimary};
    --color-text-secondary: ${colors.textSecondary};
    --color-border: ${colors.border};
  `;
};
