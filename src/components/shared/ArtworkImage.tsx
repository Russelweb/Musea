import React, { useEffect, useRef, useState } from 'react';
import { MuseaLoader } from './MuseaLoader';

interface ArtworkImageProps {
  src: string;
  alt: string;
  className?: string;
  containerClassName?: string;
  accentColor?: string;
  priority?: boolean;
}

export const ArtworkImage: React.FC<ArtworkImageProps> = ({
  src,
  alt,
  className = '',
  containerClassName = '',
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    setError(false);
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth > 0) {
      setLoaded(true);
    } else {
      setLoaded(false);
    }
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden bg-[#121215] ${containerClassName}`}
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(244, 241, 234, 0.06)',
      }}
    >
      {!loaded && !error && <MuseaLoader variant="compact" />}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#121216] border border-[#f4f1ea]/10">
          <span className="font-art-script text-2xl text-[#e5b85b] mb-1">{alt}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#a39e93]">
            Archival Plate
          </span>
        </div>
      ) : (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          className={`transition-all duration-700 ease-out ${
            loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
          } ${className}`}
        />
      )}
    </div>
  );
};
