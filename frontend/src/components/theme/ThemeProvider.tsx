'use client';

import { useEffect } from 'react';
import { useAppSelector } from '@/lib/redux/hooks';
import { getThemeColors, generateCSSVariables } from '@/config/themes';

export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { colorScheme, mode } = useAppSelector((state) => state.theme);

  useEffect(() => {
    const themeColors = getThemeColors(colorScheme, mode);
    const cssVariables = generateCSSVariables(themeColors);

    // Apply CSS custom properties to :root
    const style = document.createElement('style');
    style.id = 'theme-variables';
    style.textContent = `:root { ${cssVariables} }`;

    // Remove existing theme variables
    const existingStyle = document.getElementById('theme-variables');
    if (existingStyle) {
      existingStyle.remove();
    }

    document.head.appendChild(style);

    // Apply dark class to html element
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply data attribute for color scheme
    document.documentElement.setAttribute('data-color-scheme', colorScheme);
  }, [colorScheme, mode]);

  return <>{children}</>;
}
