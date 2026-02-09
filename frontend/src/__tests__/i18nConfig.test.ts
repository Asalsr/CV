import { locales, defaultLocale, localeNames, isRtl } from '@/i18n/config';

describe('i18n Configuration', () => {
  describe('locales', () => {
    it('should include en, sv, and fa', () => {
      expect(locales).toContain('en');
      expect(locales).toContain('sv');
      expect(locales).toContain('fa');
    });

    it('should have exactly 3 locales', () => {
      expect(locales).toHaveLength(3);
    });
  });

  describe('defaultLocale', () => {
    it('should be English', () => {
      expect(defaultLocale).toBe('en');
    });
  });

  describe('localeNames', () => {
    it('should have names for all locales', () => {
      expect(localeNames.en).toBe('English');
      expect(localeNames.sv).toBe('Svenska');
      expect(localeNames.fa).toBe('فارسی');
    });
  });

  describe('isRtl', () => {
    it('should return true for Persian (fa)', () => {
      expect(isRtl('fa')).toBe(true);
    });

    it('should return false for English (en)', () => {
      expect(isRtl('en')).toBe(false);
    });

    it('should return false for Swedish (sv)', () => {
      expect(isRtl('sv')).toBe(false);
    });

    it('should return false for unknown locale', () => {
      expect(isRtl('de')).toBe(false);
    });
  });
});
