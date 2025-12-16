import React, { useState } from 'react';

type ArtifactType = 'document' | 'image' | 'video' | 'iframe';

interface ArtifactSlotProps {
  type: ArtifactType;
  src: string;
  alt?: string;
  caption?: string;
  source?: string;
  className?: string;
}

const artifactIcons: Record<ArtifactType, string> = {
  document: '📄',
  image: '🖼️',
  video: '🎬',
  iframe: '🔗',
};

export default function ArtifactSlot({
  type,
  src,
  alt = 'Artifact',
  caption = '',
  source = '',
  className = '',
}: ArtifactSlotProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`my-8 ${className}`}>
      {/* Mobile Toggle (hidden on lg+) */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="lg:hidden w-full p-3 bg-steam-metal border border-steam-brass rounded-lg text-left text-steam-text hover:bg-steam-panel transition flex items-center justify-between"
      >
        <span className="flex items-center gap-2">
          <span className="text-lg">{artifactIcons[type]}</span>
          <span className="text-sm font-semibold">
            {type === 'document' && 'View Document'}
            {type === 'image' && 'View Image'}
            {type === 'video' && 'Play Video'}
            {type === 'iframe' && 'View Link'}
          </span>
        </span>
        <span className="text-steam-copper">{isExpanded ? '−' : '+'}</span>
      </button>

      {/* Artifact Container (hidden on mobile unless expanded, always visible on lg+) */}
      <div
        className={`
          lg:block mt-3 lg:mt-0
          ${isExpanded ? 'block' : 'hidden'}
          rounded-lg overflow-hidden border border-steam-copper bg-steam-metal
          max-h-96 lg:max-h-auto
        `}
      >
        {/* Document Embed */}
        {type === 'document' && src && (
          <iframe
            src={src}
            title={alt}
            className="w-full h-96"
            frameBorder="0"
            allowFullScreen
          />
        )}

        {/* Image */}
        {type === 'image' && src && (
          <img
            src={src}
            alt={alt}
            className="w-full h-auto object-cover"
          />
        )}

        {/* Video */}
        {type === 'video' && src && (
          <video
            src={src}
            controls
            muted
            className="w-full h-auto"
            title={alt}
          />
        )}

        {/* External Iframe (YouTube, TikTok, Vimeo, etc.) */}
        {type === 'iframe' && src && (
          <iframe
            src={src}
            title={alt}
            className="w-full h-96"
            frameBorder="0"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          />
        )}

        {/* Fallback */}
        {!src && (
          <div className="h-96 flex items-center justify-center text-steam-muted">
            <p className="text-center">[{type} artifact placeholder]</p>
          </div>
        )}
      </div>

      {/* Caption and Source */}
      {(caption || source) && (
        <div className="text-sm text-steam-muted italic mt-2 px-2">
          {caption && <p>{caption}</p>}
          {source && <p>Source: {source}</p>}
        </div>
      )}
    </div>
  );
}
