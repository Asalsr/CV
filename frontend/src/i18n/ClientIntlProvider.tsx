'use client';

import { useEffect, useState } from 'react';
import { NextIntlClientProvider, type AbstractIntlMessages } from 'next-intl';
import { defaultLocale, isRtl, locales, type Locale } from './config';
import enMessages from '../../messages/en.json';
import svMessages from '../../messages/sv.json';
import faMessages from '../../messages/fa.json';

const messagesByLocale: Record<Locale, AbstractIntlMessages> = {
  en: enMessages as AbstractIntlMessages,
  sv: svMessages as AbstractIntlMessages,
  fa: faMessages as AbstractIntlMessages,
};

function readLocaleFromCookie(): Locale {
  if (typeof document === 'undefined') return defaultLocale;
  const match = document.cookie.match(/(?:^|;\s*)locale=([^;]+)/);
  const raw = match?.[1];
  if (raw && (locales as readonly string[]).includes(raw)) {
    return raw as Locale;
  }
  return defaultLocale;
}

export default function ClientIntlProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [locale, setLocale] = useState<Locale>(defaultLocale);

  useEffect(() => {
    const resolved = readLocaleFromCookie();
    setLocale(resolved);
  }, []);

  useEffect(() => {
    if (typeof document === 'undefined') return;
    document.documentElement.lang = locale;
    document.documentElement.dir = isRtl(locale) ? 'rtl' : 'ltr';
  }, [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messagesByLocale[locale]}>
      {children}
    </NextIntlClientProvider>
  );
}
