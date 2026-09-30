'use client';

import { useState } from 'react';

interface TeacherAvatarProps {
  src?: string | null;
  alt: string;
  className: string;
}

export default function TeacherAvatar({ src, alt, className }: TeacherAvatarProps) {
  const [imageFailed, setImageFailed] = useState(false);

  if (!src || imageFailed) {
    return (
      <div
        className={`${className} relative overflow-hidden bg-slate-200`}
        role="img"
        aria-label={alt}
      >
        <div className="absolute inset-0 animate-pulse bg-slate-300/70" />
        <div className="absolute left-1/2 top-[22%] h-[30%] w-[30%] -translate-x-1/2 rounded-full bg-slate-400/80" />
        <div className="absolute bottom-[-12%] left-1/2 h-[48%] w-[62%] -translate-x-1/2 rounded-t-full bg-slate-400/80" />
      </div>
    );
  }

  return (
    <div className={`${className} relative overflow-hidden`}>
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        onError={() => setImageFailed(true)}
      />
    </div>
  );
}
