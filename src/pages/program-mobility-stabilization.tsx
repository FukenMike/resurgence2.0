import { useEffect } from 'react';
import Card from '../components/Card';
import { updatePageMeta } from '../utils/seo';

export default function ProgramMobilityStabilization() {
  useEffect(() => {
    updatePageMeta({
      title: "Mobility Stabilization Program (MSP) - The Father's Alliance",
      description:
        'Vehicle repair assistance program designed to prevent stability harm when mechanical failure threatens work, medical access, school, or caregiving.',
      path: '/programs/mobility-stabilization',
    });
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Program</p>
        <h1 className="text-4xl font-semibold text-ink">Mobility Stabilization Program (MSP)</h1>
        <p className="max-w-3xl text-lg text-muted">
          A vehicle repair assistance program framework designed to prevent stability harm when mechanical failure
          threatens work, medical access, school, or caregiving.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        <Card eyebrow="In Development" title="Status">
          <div className="space-y-2">
            <p className="font-semibold text-ink">Honest status: funding not yet secured.</p>
            <p>
              We are shaping the intake, verification, and partner stack. Launch timelines depend on confirming repair
              funding and emergency reserve policies.
            </p>
          </div>
        </Card>

        <Card title="How it will work (at launch)">
          <ul className="list-disc space-y-2 pl-5">
            <li>Rapid triage when a vehicle failure risks employment, medical care, school, or caregiving.</li>
            <li>Repair verification, quotes, and assistance requests routed to partners with proof-ready logs.</li>
            <li>Temporary mobility plan (rides, rentals, transit) to bridge the repair window.</li>
          </ul>
        </Card>

        <Card title="Coming later">
          <ul className="list-disc space-y-2 pl-5">
            <li>Preventive maintenance guidance and reminders tied to common failure points.</li>
            <li>Data-informed fund design to balance urgency, equity, and sustainability.</li>
            <li>Partner toolkit for intake forms, documentation templates, and audit-friendly reporting.</li>
          </ul>
        </Card>
      </section>
    </div>
  );
}
