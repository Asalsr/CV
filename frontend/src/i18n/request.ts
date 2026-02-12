import { getRequestConfig } from 'next-intl/server';
import { cookies } from 'next/headers';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async () => {
  let locale = defaultLocale;

  try {
    const cookieStore = await cookies();
    const raw = cookieStore.get('locale')?.value;
    if (raw && locales.includes(raw as typeof locales[number])) {
      locale = raw as typeof locales[number];
    }
  } catch {
    // cookies() is unavailable during static export build — use default locale
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
