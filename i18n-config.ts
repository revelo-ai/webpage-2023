export const i18n = {
  defaultLocale: "en",
  locales: ["sl", "en"],
} as const;

export type Locale = (typeof i18n)["locales"][number];
