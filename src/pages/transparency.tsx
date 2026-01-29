import Card from '../components/Card';
import { transparencyCopy } from '../content/siteCopy';
import { useRouteMetadata } from '../routes/meta';

export default function Transparency() {
  useRouteMetadata();

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ocean">Accountability</p>
        <h1 className="text-4xl font-semibold text-ink">{transparencyCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-muted">{transparencyCopy.body}</p>
      </section>

      <section>
        <Card title="System Gaps and Structural Barriers">
          <div className="space-y-4 text-muted">
            <p>
              Family stability services in the United States are highly fragmented. Courts, families, and service providers regularly encounter systemic constraints that limit access to timely, coordinated support. Key challenges include:
            </p>

            <div className="space-y-3">
              <div>
                <p className="font-semibold text-ink">Licensure Fragmentation</p>
                <p>
                  Mental health providers must be licensed in the state where a client is physically located, even for telehealth services. While interstate compacts exist, they remain incomplete and inconsistently adopted, restricting cross state care coordination.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Provider Availability and Capacity</p>
                <p>
                  Many regions face critical shortages of family therapists, trauma informed clinicians, and child mental health specialists. Providers often maintain long waitlists and may be unable or unwilling to accept court involved cases.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Coordination Failures</p>
                <p>
                  No centralized national infrastructure exists to connect courts, families, and qualified service providers. Existing resource directories are frequently fragmented, outdated, or difficult to navigate.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Transportation and Economic Stability Gaps</p>
                <p>
                  Basic stability supports such as transportation access and vehicle repair assistance are often essential to employment, compliance, and family preservation, yet lack coordinated national delivery mechanisms.
                </p>
              </div>

              <div>
                <p className="font-semibold text-ink">Jurisdictional Silos</p>
                <p>
                  Family law, mental health, housing, and social services operate within separate administrative systems. This fragmentation increases the risk of cascading failures for households navigating multiple systems simultaneously.
                </p>
              </div>
            </div>

            <p>
              The Father's Alliance is being developed as a systems level response to these gaps and to design scalable pathways toward family stability. The programs, tools, and portals presented on this site represent phased infrastructure development and are not guarantees of direct services at this time.
            </p>

            <p>
              TFA does not replace courts, clinicians, or public agencies, but seeks to complement existing systems by improving visibility, coordination, and access pathways.
            </p>
          </div>
        </Card>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {transparencyCopy.sections.map((item) => (
          <Card key={item} title={item}>
            <p className="text-muted">Detailed reporting will be published as filings finalize.</p>
          </Card>
        ))}
      </section>
    </div>
  );
}
