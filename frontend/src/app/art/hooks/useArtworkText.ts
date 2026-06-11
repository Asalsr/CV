'use client';

import { useMessages } from 'next-intl';

type ArtworkMessages = {
  art?: {
    titles?: Record<string, string>;
    descriptions?: Record<string, string>;
  };
};

export function useArtworkText() {
  const messages = useMessages() as ArtworkMessages;
  const titles = messages?.art?.titles;
  const descriptions = messages?.art?.descriptions;

  return {
    title: (id: number, fallback: string): string =>
      titles?.[String(id)] || fallback,
    description: (id: number, fallback?: string): string | undefined =>
      descriptions?.[String(id)] || fallback,
  };
}
