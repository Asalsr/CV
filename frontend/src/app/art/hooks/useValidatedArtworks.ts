'use client';

import { useState, useEffect, useRef } from 'react';
import { Artwork, ValidatedArtwork } from '../types/artwork';
import { validateImage } from '../utils/validateImage';

interface UseValidatedArtworksReturn {
  artworks: ValidatedArtwork[];
  isValidating: boolean;
}

async function validateArtworks(
  rawArtworks: Artwork[]
): Promise<ValidatedArtwork[]> {
  const results = await Promise.all(
    rawArtworks.map(async (artwork) => {
      // Video projects are always valid if they have a videoId
      if (artwork.type === 'video' && artwork.videoId) {
        return {
          ...artwork,
          validImages: [],
          validThumbnail: artwork.thumbnail,
        } as ValidatedArtwork;
      }

      // Probe thumbnail and all images in parallel
      const [thumbnailValid, ...imageResults] = await Promise.all([
        validateImage(artwork.thumbnail),
        ...artwork.images.map((src) => validateImage(src)),
      ]);

      const validImages = artwork.images.filter((_, i) => imageResults[i]);

      const validThumbnail = thumbnailValid
        ? artwork.thumbnail
        : validImages[0] || '';

      return {
        ...artwork,
        validImages,
        validThumbnail,
      } as ValidatedArtwork;
    })
  );

  return results.filter((artwork) =>
    artwork.type === 'video' && artwork.videoId
      ? true
      : artwork.validImages.length > 0 || artwork.validThumbnail !== ''
  );
}

export function useValidatedArtworks(
  rawArtworks: Artwork[]
): UseValidatedArtworksReturn {
  const [artworks, setArtworks] = useState<ValidatedArtwork[]>([]);
  const [isValidating, setIsValidating] = useState(true);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    let cancelled = false;

    validateArtworks(rawArtworks).then((validated) => {
      if (!cancelled && mountedRef.current) {
        setArtworks(validated);
        setIsValidating(false);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [rawArtworks]);

  return { artworks, isValidating };
}
