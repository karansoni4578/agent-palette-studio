import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface SmartImageProps {
  src: string;
  alt: string;
  className?: string;
  /** Pass aspect ratio like 16/9, 4/3, 1 for square; default 16/9 */
  ratio?: number;
  /** If you want full height of parent instead of ratio box, set true */
  fillParent?: boolean;
  /** Loading state */
  loading?: 'lazy' | 'eager';
}

export default function SmartImage({
  src,
  alt,
  className,
  ratio = 16 / 9,
  fillParent = false,
  loading = 'lazy',
}: SmartImageProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const containerStyle = fillParent ? {} : { aspectRatio: String(ratio) };

  if (imageError) {
    return (
      <div
        className={cn(
          "relative overflow-hidden bg-muted flex items-center justify-center",
          className
        )}
        style={containerStyle}
      >
        <div className="text-muted-foreground text-sm">Image not available</div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted flex items-center justify-center",
        className
      )}
      style={containerStyle}
    >
      <img
        src={src}
        alt={alt}
        loading={loading}
        className={cn(
          "max-w-full max-h-full object-contain transition-opacity duration-300",
          imageLoaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setImageLoaded(true)}
        onError={() => setImageError(true)}
        style={{
          objectFit: 'contain',
          objectPosition: 'center',
        }}
      />
      {!imageLoaded && !imageError && (
        <div className="absolute inset-0 bg-muted animate-pulse" />
      )}
    </div>
  );
}