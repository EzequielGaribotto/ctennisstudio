export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
} as const;

export type ThemeType = typeof THEME.LIGHT | typeof THEME.DARK;

export const LOCALE = {
  ES: 'es',
  EN: 'en',
} as const;

export type LocaleType = typeof LOCALE.ES | typeof LOCALE.EN;

export const STORAGE_KEYS = {
  THEME: 'theme',
  LOCALE: 'locale',
} as const;
