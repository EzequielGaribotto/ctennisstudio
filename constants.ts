export const STORAGE_KEYS = {
  LOCALE: "selected-locale",
  THEME: "selected-theme",
} as const

export const LOCALE = {
  ES: "es",
  EN: "en",
} as const

export const THEME = {
  DARK: "dark",
  LIGHT: "light",
} as const

export type ThemeType = (typeof THEME)[keyof typeof THEME]
