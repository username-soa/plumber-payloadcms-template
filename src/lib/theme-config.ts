export const THEME_CONFIG = {
  // The theme to use for the website.
  // Options: 'system' (Modern), 'eco', 'high-end'
  defaultTheme: 'system',

  // Only show the theme switcher in development mode
  showSwitcher: process.env.NODE_ENV === 'development',
} as const;

export type ThemeConfig = typeof THEME_CONFIG;
