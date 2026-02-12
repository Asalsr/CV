'use client';

import { useState } from 'react';
import Image, { type ImageProps } from 'next/image';

const ERROR_IMG_SRC =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiBoZWlnaHQ9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';

type ImageWithFallbackProps = ImageProps;

function FallbackPlaceholder({ fill, className, alt }: { fill?: boolean; className?: string; alt: string }) {
  if (fill) {
    return (
      <div
        className={`absolute inset-0 flex items-center justify-center bg-gray-800/50 ${className ?? ''}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={ERROR_IMG_SRC}
          alt={alt}
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
        alt={alt}
        className="w-16 h-16 opacity-50"
      />
    </div>
  );
}

export default function ImageWithFallback(props: ImageWithFallbackProps) {
  const [status, setStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

  if (status === 'error') {
    return (
      <FallbackPlaceholder
        fill={props.fill}
        className={typeof props.className === 'string' ? props.className : undefined}
        alt={(props.alt as string) || 'Error loading image'}
      />
    );
  }

  return (
    <>
      {status === 'loading' && (
        <FallbackPlaceholder
          fill={props.fill}
          className={typeof props.className === 'string' ? props.className : undefined}
          alt={(props.alt as string) || 'Loading image'}
        />
      )}
      <Image
        {...props}
        onLoad={() => setStatus('loaded')}
        onError={() => setStatus('error')}
        style={{
          ...((typeof props.style === 'object' && props.style) || {}),
          opacity: status === 'loaded' ? 1 : 0,
        }}
      />
    </>
  );
}
