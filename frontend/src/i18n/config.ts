export const locales = ['en', 'sv', 'fa'] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'en';

export const localeNames: Record<Locale, string> = {
  en: 'English',
  sv: 'Svenska',
  fa: 'فارسی',
};

export function isRtl(locale: string): boolean {
  return locale === 'fa';
}
