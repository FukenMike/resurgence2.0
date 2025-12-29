import { useEffect } from 'react';
import Card from '../components/Card';
import { programsCopy } from '../content/siteCopy';

export default function Programs() {
  useEffect(() => {
    document.title = 'Our Programs | The Father’s Alliance';
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <section className="space-y-3">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-sky-600">Programs</p>
        <h1 className="text-4xl font-semibold text-slate-900">{programsCopy.headline}</h1>
        <p className="max-w-3xl text-lg text-slate-600">{programsCopy.body}</p>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {programsCopy.programs.map((program, index) => {
          // Handle detailed program object (first program)
          if (typeof program === 'object') {
            return (
              <Card key={program.title} title={`${program.title} (${program.status})`}>
                <div className="space-y-4 text-slate-600">
                  <p>{program.oneLiner}</p>
                  
                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">What We Do:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.whatWeDo.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">Deliverables:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.deliverables.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">This Might Be a Good Fit If:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.goodFit.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-slate-900 mb-2">This Is Not:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {program.notThis.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Card>
            );
          }
          
          // Handle simple string programs (remaining programs)
          return (
            <Card key={program} title={program}>
              <p className="text-slate-600">Outcome-driven support with clear milestones and repeatable checklists.</p>
            </Card>
          );
        })}
      </section>
    </div>
  );
}
