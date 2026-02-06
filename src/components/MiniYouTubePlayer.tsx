import { useEffect, useRef, useState } from 'react';

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
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setPrefersReducedMotion(event.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }

    mediaQuery.addListener(handleChange);
    return () => mediaQuery.removeListener(handleChange);
  }, []);

  useEffect(() => {
    if (isPlaying || typeof window === 'undefined') return;

    const checkOverflow = () => {
      const labelContainer = containerRef.current;
      const measureEl = measureRef.current;
      if (!labelContainer || !measureEl) return;
      const containerWidth = labelContainer.clientWidth;
      const contentWidth = measureEl.scrollWidth;
      setIsOverflowing(contentWidth - containerWidth > 1);
    };

    checkOverflow();

    const observedElements: Element[] = [];
    let resizeObserver: ResizeObserver | undefined;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        checkOverflow();
      });

      if (containerRef.current) {
        resizeObserver.observe(containerRef.current);
        observedElements.push(containerRef.current);
      }

      if (measureRef.current) {
        resizeObserver.observe(measureRef.current);
        observedElements.push(measureRef.current);
      }
    } else {
      window.addEventListener('resize', checkOverflow);
    }

    return () => {
      if (resizeObserver) {
        observedElements.forEach((element) => resizeObserver?.unobserve(element));
      } else {
        window.removeEventListener('resize', checkOverflow);
      }
    };
  }, [title, isPlaying]);

  useEffect(() => {
    if (!isPlaying) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsPlaying(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const displayTitle = title;

  return (
    <>
      <style>{`
        @keyframes mini-youtube-player-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .mini-youtube-player-marquee {
          display: flex;
          gap: 1.5rem;
          white-space: nowrap;
          animation: mini-youtube-player-marquee 12s linear infinite;
          will-change: transform;
        }

        .group:hover .mini-youtube-player-marquee {
          animation-play-state: paused;
        }
      `}</style>
      <div className="flex items-center lg:hidden">
        <button
          type="button"
          onClick={() => setIsPlaying(true)}
          className="rounded-full border border-border-soft bg-surface p-2 text-base text-muted transition hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          title={`Play "${title}" (YouTube)`}
          aria-label={`Play intro track: ${title}`}
        >
          🎧
        </button>
        {isPlaying && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center bg-ink/80 px-4 py-10"
            role="dialog"
            aria-modal="true"
            onClick={() => setIsPlaying(false)}
          >
            <div
              className="w-full max-w-sm rounded-lg border border-border-soft bg-surface p-4 shadow-xl"
              onClick={(event) => event.stopPropagation()}
            >
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
          </div>
        )}
      </div>
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
            className="group inline-flex items-center gap-2 rounded-full border border-border-soft bg-surface px-3 py-1 text-xs font-semibold text-muted transition hover:bg-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ocean focus-visible:ring-offset-2 focus-visible:ring-offset-surface active:translate-y-[1px]"
            title={`Play "${title}" (YouTube)`}
            aria-label={`Play intro track: ${title}`}
          >
            <span aria-hidden>🎧</span>
            <div ref={containerRef} className="relative w-[200px] max-w-[200px] overflow-hidden">
              <span className="sr-only">{displayTitle}</span>
              {isOverflowing && !prefersReducedMotion ? (
                <div className="flex w-full overflow-hidden" aria-hidden>
                  <div className="mini-youtube-player-marquee">
                    <span>{displayTitle}</span>
                    <span>{displayTitle}</span>
                  </div>
                </div>
              ) : (
                <span className="block truncate">{displayTitle}</span>
              )}
              <span
                ref={measureRef}
                aria-hidden
                className="pointer-events-none absolute left-0 top-0 -z-10 whitespace-nowrap opacity-0"
              >
                {displayTitle}
              </span>
            </div>
            <span aria-hidden>▶</span>
          </button>
        )}
      </div>
    </>
  );
}
