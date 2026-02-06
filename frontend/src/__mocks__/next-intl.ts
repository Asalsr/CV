/**
 * Mock for next-intl used in Jest tests.
 * useTranslations returns a function that returns the translation key,
 * with support for t.rich() and interpolation.
 */

type TranslateFunction = ((key: string, values?: Record<string, unknown>) => string) & {
  rich: (key: string, values?: Record<string, unknown>) => string;
  raw: (key: string) => string;
};

export function useTranslations(namespace?: string) {
  const t: TranslateFunction = ((key: string, values?: Record<string, unknown>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    if (values) {
      let result = fullKey;
      for (const [k, v] of Object.entries(values)) {
        result = result.replace(`{${k}}`, String(v));
      }
      return result;
    }
    return fullKey;
  }) as TranslateFunction;

  t.rich = (key: string, values?: Record<string, unknown>) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    if (values) {
      let result = fullKey;
      for (const [k, v] of Object.entries(values)) {
        if (typeof v === 'function') continue;
        result = result.replace(`{${k}}`, String(v));
      }
      return result;
    }
    return fullKey;
  };

  t.raw = (key: string) => {
    return namespace ? `${namespace}.${key}` : key;
  };

  return t;
}

export function useLocale() {
  return 'en';
}

export function useMessages() {
  return {};
}

export function useNow() {
  return new Date();
}

export function useTimeZone() {
  return 'UTC';
}

export function useFormatter() {
  return {
    number: (value: number) => String(value),
    dateTime: (value: Date) => value.toISOString(),
    relativeTime: (value: Date) => value.toISOString(),
  };
}

export function NextIntlClientProvider({ children }: { children: React.ReactNode }) {
  return children;
}
