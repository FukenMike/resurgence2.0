import React from 'react';

interface StoryMediaProps {
  type?: 'video' | 'iframe' | 'image';
  src?: string;
  alt?: string;
  maxHeight?: string;
  caption?: string;
  className?: string;
}

export default function StoryMedia({
  type = 'video',
  src = '',
  alt = 'Media content',
  maxHeight = 'max-h-96',
  caption = '',
  className = '',
}: StoryMediaProps) {
  return (
    <figure className={`my-8 ${className}`}>
      <div className={`rounded-lg overflow-hidden border border-steam-copper bg-steam-metal flex items-center justify-center ${maxHeight}`}>
        {type === 'video' && src && (
          <video
            src={src}
            controls
            muted
            className="w-full h-full object-cover"
            aria-label={alt}
          />
        )}
        {type === 'iframe' && src && (
          <iframe
            src={src}
            className="w-full h-full border-none"
            allowFullScreen
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            title={alt}
          />
        )}
        {type === 'image' && src && (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        )}
        {!src && (
          <div className="text-center text-steam-muted p-8">
            <p>[Media placeholder: {type}]</p>
          </div>
        )}
      </div>
      {caption && <figcaption className="text-sm text-steam-muted italic mt-2">{caption}</figcaption>}
    </figure>
  );
}
