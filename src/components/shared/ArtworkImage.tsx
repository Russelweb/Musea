import React, { useState } from 'react';

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
  accentColor = '#C9A96E',
  priority = false,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#121215] ${containerClassName}`}
      style={{
        boxShadow: 'inset 0 0 0 1px rgba(244, 241, 234, 0.06)',
      }}
    >
      {!loaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#121215] animate-pulse">
          <div
            className="w-8 h-8 rounded-full border border-t-transparent animate-spin opacity-40"
            style={{ borderColor: `${accentColor} transparent ${accentColor} ${accentColor}` }}
          />
        </div>
      )}

      {error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-[#121216] border border-[#f4f1ea]/10">
          <span className="font-serif-museum italic text-lg text-[#c9a96e] mb-1">{alt}</span>
          <span className="text-xs uppercase tracking-[0.2em] text-[#a39e93]">
            Archival Plate
          </span>
        </div>
      ) : (
        <img
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
