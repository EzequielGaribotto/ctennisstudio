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

export const CONTACT = {
  EMAIL: 'ezequielgaribottovillanueva@gmail.com',
  GITHUB: 'https://github.com/EzequielGaribotto',
  LINKEDIN: 'https://www.linkedin.com/in/ezequiel-garibotto/',
} as const;

export const CV_FILES = {
  ES: '/cv/CV_ES_EzequielGaribotto.pdf',
  EN: '/cv/CV_EN_EzequielGaribotto.pdf',
  EN_ATS: '/cv/CV_EN_EzequielGaribotto_ATS.pdf',
  METADATA: '/cv/cv-metadata.json',
} as const;

export const IMAGE_PATHS = {
  PROFILE: '/images/profile/ezequiel-garibotto.webp',
  FALLBACK: '/images/projects/fallback.webp',
  // Add data URL fallback for critical situations
  PLACEHOLDER: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxOCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg==',
} as const;
