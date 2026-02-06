import { useState } from 'react';

type MiniYouTubePlayerProps = {
  videoId: string;
  title: string;
  label?: string;
};

export default function MiniYouTubePlayer({
  videoId,
  title,
  label = 'Intro Track',
}: MiniYouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="hidden items-center lg:flex">
      {isPlaying ? (
        <div className="w-60 rounded-lg border border-border-soft bg-surface p-2 shadow-sm">
          <div className="mb-2 flex items-center justify-between text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            <span>{label}</span>
            <button
              type="button"
              onClick={() => setIsPlaying(false)}
              className="rounded-full px-2 py-1 text-muted transition hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
              aria-label="Close intro track player"
            >
              ✕
            </button>
          </div>
          <div className="overflow-hidden rounded-md border border-border-soft/60 bg-ink/80">
            <div className="aspect-video">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-muted transition hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[1px]"
          title={`Play "${title}" (YouTube)`}
          aria-label={`Play intro track: ${title}`}
        >
          <span aria-hidden>🎧</span>
          <span>{label}</span>
          <span aria-hidden>▶</span>
        </button>
      )}
    </div>
  );
}
