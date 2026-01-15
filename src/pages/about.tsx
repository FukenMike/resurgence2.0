import { useEffect } from 'react';
import Card from '../components/Card';
import SectionSurface from '../components/SectionSurface';
import { aboutCopy } from '../content/siteCopy';
import { updatePageMeta } from '../utils/seo';

export default function About() {
  useEffect(() => {
    updatePageMeta({
      title: "About The Father's Alliance - Our Mission and Philosophy",
      description:
        "The Father's Alliance exists for the moments when a household is one problem away from falling behind. We focus on stabilizing families through practical, dignified support.",
      path: '/about',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">About</p>
        <h1 className="text-4xl font-semibold text-ink">{aboutCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{aboutCopy.body}</p>
      </section>

      <SectionSurface variant="default" edge="top" edgeTone="accent">
        <section className="grid gap-4 md:grid-cols-2">
          <Card title="Our philosophy">
            <p className="text-muted">{aboutCopy.philosophy}</p>
        </Card>
        <Card title="Accountability first">
          <p className="text-muted">We measure success by stability outcomes: evictions avoided, shutoffs prevented, transportation restored, and barriers removed—paired with disciplined documentation and responsible stewardship of every dollar.</p>
          </Card>
        </section>
      </SectionSurface>
    </div>
  );
}
