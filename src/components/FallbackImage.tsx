'use client';

import type { ImgHTMLAttributes } from 'react';

type FallbackImageProps = Omit<ImgHTMLAttributes<HTMLImageElement>, 'onError'> & {
  fallbackSrc: string;
};

export default function FallbackImage({ fallbackSrc, ...imageProps }: FallbackImageProps) {
  return (
    <img
      {...imageProps}
      onError={(event) => {
        const image = event.currentTarget;
        if (image.dataset.fallbackApplied) return;

        image.dataset.fallbackApplied = 'true';
        image.src = fallbackSrc;
      }}
    />
  );
}
