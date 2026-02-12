// Theme Configuration - Persian Blue & Yellow Palette
// Designed for Saeedeh's Portfolio

export type ColorScheme = 'palette-colors';
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
  // Portfolio-specific semantic colors
  portfolio: {
    persianBlue: string;
    persianBlueLight: string;
    persianBlueDark: string;
    goldenYellow: string;
    amber: string;
    sunsetOrange: string;
    warmCoral: string;
    teal: string;
    tealLight: string;
    navy: string;
  };
  // Glass/card effects
  glass: {
    background: string;
    border: string;
    cardHoverShadow: string;
  };
  overlay: string;
}

export interface ColorSchemeConfig {
  name: string;
  description: string;
  light: ThemeColors;
  dark: ThemeColors;
}

export const colorSchemes: Record<ColorScheme, ColorSchemeConfig> = {
  'palette-colors': {
    name: 'Persian Blue & Golden Yellow',
    description: 'Where art meets technology',
    light: {
      primary: {
        50: '#EBF0FF',
        100: '#D6E0FF',
        200: '#ADC1FF',
        300: '#85A2FF',
        400: '#4258b9',
        500: '#6677c4',
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
        400: '#8F6800',
        500: '#B88500',
        600: '#8F6800',
        700: '#B88500',
        800: '#8F6800',
        900: '#664A00',
      },
      background: '#85A2FF',
      surface: '#ffffff',
      textPrimary: '#0F1729',
      textSecondary: '#5A6B7D',
      border: 'rgba(28, 57, 187, 0.15)',
      portfolio: {
        persianBlue: '#2b4d68',
        persianBlueLight: '#4A90E2',
        persianBlueDark: '#0F1E5C',
        goldenYellow: '#FFB800',
        amber: '#FFC947',
        sunsetOrange: '#FF6B35',
        warmCoral: '#FF8066',
        teal: '#2e9ac9',
        tealLight: '#38BDF8',
        navy: '#0F1729',
      },
      glass: {
        background: 'rgba(28, 57, 187, 0.04)',
        border: 'rgba(28, 57, 187, 0.1)',
        cardHoverShadow: 'rgba(28, 57, 187, 0.12)',
      },
      overlay: 'rgba(0, 0, 0, 0.95)',
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
      portfolio: {
        persianBlue: '#5B8DEF',
        persianBlueLight: '#7BA8F5',
        persianBlueDark: '#3D6FD9',
        goldenYellow: '#FFC947',
        amber: '#e3bd59',
        sunsetOrange: '#FF8B66',
        warmCoral: '#FF9980',
        teal: '#2e9ac9',
        tealLight: '#38BDF8',
        navy: '#0A0E1A',
      },
      glass: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: 'rgba(255, 255, 255, 0.1)',
        cardHoverShadow: 'rgba(91, 141, 239, 0.15)',
      },
      overlay: 'rgba(0, 0, 0, 0.95)',
    },
  },
};

// Helper function to get current theme colors
export const getThemeColors = (
  colorScheme: ColorScheme,
  mode: ThemeMode
): ThemeColors => {
  const scheme = colorSchemes[colorScheme] ?? colorSchemes['palette-colors'];
  return scheme[mode];
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

    --persian-blue: ${colors.portfolio.persianBlue};
    --persian-blue-light: ${colors.portfolio.persianBlueLight};
    --persian-blue-dark: ${colors.portfolio.persianBlueDark};
    --golden-yellow: ${colors.portfolio.goldenYellow};
    --amber: ${colors.portfolio.amber};
    --sunset-orange: ${colors.portfolio.sunsetOrange};
    --warm-coral: ${colors.portfolio.warmCoral};
    --teal: ${colors.portfolio.teal};
    --teal-light: ${colors.portfolio.tealLight};
    --navy: ${colors.portfolio.navy};

    --color-glass-bg: ${colors.glass.background};
    --color-glass-border: ${colors.glass.border};
    --color-card-hover-shadow: ${colors.glass.cardHoverShadow};
    --color-overlay: ${colors.overlay};
  `;
};
