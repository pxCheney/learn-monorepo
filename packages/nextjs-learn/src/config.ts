export const i18n = {
  defaultLocale: "zh",
  locales: ["zh", "en"],
} as const;

export const locales = i18n.locales;
export const defaultLocale = i18n.defaultLocale;

export type Locale = (typeof i18n)["locales"][number];
