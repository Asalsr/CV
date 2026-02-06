'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

type ImageWithFallbackProps = ImageProps;

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [didError, setDidError] = useState(false);

  if (didError) {
    const { fill, className, alt } = props;

    if (fill) {
      return (
        <div
          className={`absolute inset-0 flex items-center justify-center bg-gray-800/50 ${className ?? ''}`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={ERROR_IMG_SRC}
            alt={alt || 'Error loading image'}
            className="w-16 h-16 opacity-50"
          />
        </div>
      );
    }

    return (
      <div
        className={`inline-flex items-center justify-center bg-gray-800/50 ${className ?? ''}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ERROR_IMG_SRC}
          alt={alt || 'Error loading image'}
          className="w-16 h-16 opacity-50"
        />
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setDidError(true)}
    />
  );
}
