import React from 'react';
import StorySection from '../components/story/StorySection';
import StoryBeat from '../components/story/StoryBeat';
import StoryBreak from '../components/story/StoryBreak';
import StoryQuote from '../components/story/StoryQuote';
import StoryEvidence from '../components/story/StoryEvidence';
import StoryMedia from '../components/story/StoryMedia';
import ArtifactSlot from '../components/story/ArtifactSlot';
import StoryArtifact from '../components/story/StoryArtifact';
import StoryProgress from '../components/story/StoryProgress';
import ContrastPanel from '../components/story/ContrastPanel';
import WitnessFragment from '../components/story/WitnessFragment';
import QuietChoice from '../components/story/QuietChoice';
import { Link } from 'react-router-dom';

export default function Experience() {
  const sections = [
    { id: 'awakening', label: 'Awakening' },
    { id: 'fracture', label: 'The Fracture' },
    { id: 'cost', label: 'The Cost' },
    { id: 'pattern', label: 'The Pattern' },
    { id: 'voices', label: 'The Voices' },
    { id: 'response', label: 'The Response' },
  ];

  return (
    <div className="bg-steam-bg text-steam-text font-body">
      <StoryProgress sections={sections} />
      {/* SECTION 1 — AWAKENING */}
      <div data-section-id="awakening">
      <StorySection variant="default" className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
          <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">We Are Rising</span>
        </h1>
        <div className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed space-y-4">
          <p>
            Family law hasn’t evolved—but families have. Divorce. Custody.
            Support. CPS. What’s called a “system” is a maze—outdated, biased,
            and sealed off from the truth behind closed doors. It doesn’t resolve
            crisis. It manages it. It punishes pain. Profits from separation.
            And almost never reflects what’s best for the child.
          </p>

          <p>
            What started as a fight for fathers exposed something much larger.
            Mothers. Guardians. Families on the brink—we all face the fallout.
            This alliance was born from that fire. From courtrooms where voices
            are silenced, survival is criminalized, and justice feels optional
            if you can’t afford it.
          </p>

          <p>
            We rise from that silence—not to beg for reform, but to expose the
            machinery that feeds on desperation and to build what it refuses to.
            <br />
            <strong className="fire-ignite">We. Are. Rising.</strong>
          </p>
        </div>
      </StorySection>
      </div>

      {/* SECTION 2 — THE FRACTURE */}
      <div data-section-id="fracture">
      <StorySection variant="panel">
        <StoryBeat emphasis="strong">
          <p>
            We don't exist yet—not in the way they define existence. We're a flicker in the dark. An idea. A spark that hasn't caught fire—<em>yet</em>.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            We are not overlooked. We are <strong>filtered out</strong> by design. We are fathers—parents—people—buried under bureaucracy. Flagged, disqualified, shut out of support systems not built for us.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            Our mission is to break the cycle.
          </p>
          <p>
            To stand in the gap where the system fails...
          </p>
        </StoryBeat>
      </StorySection>
      </div>

      {/* SECTION 3 — THE COST */}
      <div data-section-id="cost">
      <StorySection variant="default">
        <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">Buried by the System</h2>
        <StoryBeat>
          <p>
            I didn’t lose my children because I was found unfit. I lost them because the system collided with itself—and chose procedure over people. In April 2024, a divorce court granted me temporary sole legal and physical custody of my children. That order was clear. It was issued while a Department of Human Resources (DHR) investigation was still open, with the expectation that custody would stabilize once the investigation concluded. That never happened. Instead, a separate dependency process overtook the custody order entirely. Before any final determination was made, a safety plan was imposed. My children were moved out of their home—not because of an adjudicated finding, but as a precaution. First to a third party. Then to another. Within weeks, Lee County DHR sought and obtained a shelter care order. On April 27, 2024, legal and physical custody was vested in DHR. From that moment on, the custody order no longer mattered.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            No criminal conviction triggered the removal. No termination of parental rights occurred. There was no final ruling that I was incapable of parenting my children. What followed was not reunification—it was containment. DHR imposed a series of requirements: drug testing, evaluations, counseling, income verification, housing stability. I complied. The other parent complied. Individualized Service Plans were created, revised, and extended. But there was no reunification date. No clear endpoint. Only rolling compliance.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            When interstate placement became necessary, the system stalled again. Because I lived in Georgia and the children were in Alabama custody, reunification required an Interstate Compact on the Placement of Children (ICPC) evaluation. Alabama DHR was responsible for initiating the process. Georgia was responsible for completing it. Neither side moved with urgency. Alabama would not release custody without ICPC approval. Georgia could not complete an evaluation without a proper initiation. The court acknowledged the process—but set no deadline and enforced no resolution. My children were trapped in the gap. Months passed. Custody remained with DHR by default, not by decision. Foster care became the holding pattern. One child was flagged for therapeutic foster placement. Fees were assessed. Visitation was restricted and controlled by the same agency holding custody. This is how families disappear in the system. Not through termination. Not through trial. But through overlapping jurisdictions, endless requirements, and procedural inertia that no parent can outrun—especially without money, influence, or legal leverage. And this isn’t rare. It’s structural.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryQuote>
          My family wasn’t destroyed by a single ruling. We were buried under process.
        </StoryQuote>        
        {/* Optional evidence: Context for the ICPC claim */}
        <StoryEvidence
          variant="stat"
          title="Interstate Compact on the Placement of Children (ICPC)"
          source="Child Welfare Information Gateway"
        >
          <p>
            The ICPC is designed to protect children moved across state lines in child welfare cases. However, delays in the process can leave children in state custody indefinitely while paperwork is processed—even when a parent has a court order for custody in the destination state.
          </p>
          <p className="text-sm italic">
            This structural gap affects thousands of families navigating multi-state custody disputes.
          </p>
        </StoryEvidence>
        
        {/* Placeholder artifact: Real court documents, timeline visualization, or testimony video will go here */}
        {/* <StoryArtifact
          title="Case Timeline Evidence"
          description="Visual documentation of custody order vs. system delays"
          source="[Court records / DHR correspondence / Timeline visualization]"
        >
          <div className="text-center text-steam-muted py-8">
            [Future: Timeline graphic showing judge's custody order → ICPC delay → children in limbo]
            [Or: Redacted court documents / Photo evidence / Video testimony]
          </div>
        </StoryArtifact> */}
      </StorySection>
      </div>

      {/* SECTION 4 — THE PATTERN */}
      <div data-section-id="pattern">
      <StorySection variant="panel">
        <ContrastPanel
          leftTitle="What the System Claims"
          rightTitle="What Families Experience"
          leftContent={
            <>
              <p className="mb-4">
                <strong>The courts are fair.</strong> Everyone gets due process. Judges weigh both sides objectively before making decisions.
              </p>
              <p className="mb-4">
                <strong>Child support is about the child.</strong> It ensures kids are cared for, and the system is designed to help families, not punish them.
              </p>
              <p className="mb-4">
                <strong>DHR protects children.</strong> Their job is to keep families together when possible and to act in the child's best interest.
              </p>
              <p className="mb-4">
                <strong>Parents have rights.</strong> Custody orders are binding. If a judge grants custody, that decision stands—period.
              </p>
              <p className="mb-4">
                <strong>The system supports struggling parents.</strong> There are programs, resources, and caseworkers available to help parents get back on their feet.
              </p>
            </>
          }
          rightContent={
            <>
              <p className="mb-4">
                <strong>Fathers are filtered out by default.</strong> Only 18.3% of custody cases result in fathers getting primary custody. Gender bias is built into the system—not written into law, but embedded in practice.
              </p>
              <p className="mb-4">
                <strong>Child support is a trap.</strong> It stacks interest even when you're unemployed, homeless, or incarcerated. Miss a payment? You're labeled a "deadbeat," barred from licenses, jailed, and still expected to pay.
              </p>
              <p className="mb-4">
                <strong>DHR can override custody orders.</strong> Even when a judge grants custody, DHR can block reunification using dependency filings. Your court order becomes meaningless while the state decides if you're "ready."
              </p>
              <p className="mb-4">
                <strong>Custody orders can be ignored.</strong> If a dependency case is active, your custody order doesn't matter. Agencies across state lines refuse to act until bureaucratic processes—like ICPC—are complete. Your kids stay in limbo. You stay powerless.
              </p>
              <p className="mb-4">
                <strong>Support is conditional and punitive.</strong> To qualify for help, you must prove you're broken enough—but not too broken. You must have documentation, appointments, evaluations, background checks, and wait months (or years) for housing aid that may never come.
              </p>
              <p className="mb-4">
                <strong>The shame never ends.</strong> Every setback is treated as personal failure. Every delay is treated as your fault. The system doesn't help you stand—it watches you fall and then punishes you for not getting up fast enough.
              </p>
            </>
          }
        />
        
        <StoryBreak />
        
        {/* Optional artifact slot: Supports document, image, video, or iframe */}
        {/* Example stub (uncomment and fill src to activate):
        <ArtifactSlot
          type="iframe"
          src=""
          alt="Custody statistics or policy reference"
          caption="[Future: Interactive data showing custody award disparities]"
          source="[Source]"
        /> */}
      </StorySection>
      </div>

      {/* SECTION 5 — THE VOICES */}
      <div data-section-id="voices">
      <StorySection variant="default">
        <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">The Voices</h2>
        <p className="mb-4">Real stories. Unfiltered truth.</p>
        
        <div className="space-y-6 mb-8">
          <WitnessFragment
            quote="They told me I had six months to prove I could be a father. Six months to find housing, stable income, complete evaluations. But they never told me where to start or who would help me get there."
            context="Father, GA"
            tone="pain"
          />
          <WitnessFragment
            quote="I followed every rule. Showed up to every hearing. Passed every drug test. But when DHR filed their paperwork, none of it mattered. My custody order became meaningless overnight."
            context="Father, AL"
            tone="anger"
          />
          <WitnessFragment
            quote="I don't want revenge. I don't want to fight anymore. I just want my kids to know I never stopped trying to bring them home."
            context="Father, GA"
            tone="resolve"
          />
        </div>
        
        <div className="space-y-4">
          <a
            href="https://walloftruth.hashnode.dev/how-the-system-buried-my-fatherhood-the-truth-they-tried-to-seal-away"
            target="_blank"
            rel="noopener noreferrer"
            className="block p-4 border border-steam-brass rounded-lg hover:bg-steam-panel transition"
          >
            <span className="text-amber-400">How the System Buried My Fatherhood: The Truth They Tried to Seal Away</span>
            <span className="block text-sm text-steam-muted">By Michael Griggs — July 3, 2025</span>
          </a>
          <Link to="/wall-of-truth" className="text-steam-copper underline hover:text-steam-brass">
            Explore more voices on the Wall of Truth →
          </Link>
        </div>
      </StorySection>
      </div>

      {/* SECTION 6 — THE RESPONSE */}
      <div data-section-id="response">
      <StorySection variant="panel" className="text-center">
        <StoryBeat emphasis="strong">
          <p>
            You don't have to be perfect to show up. You just have to care. Let's build something better—together.
          </p>
        </StoryBeat>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <Link to="/connect" className="inline-block px-6 py-3 bg-steam-copper text-black font-semibold rounded-lg hover:bg-steam-brass transition">
            Reach Out
          </Link>
          <Link to="/support" className="inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition">
            Stand With Us
          </Link>
        </div>
        <QuietChoice
          statement="Not every moment asks for action."
          subtext="It's okay to pause."
        />
      </StorySection>
      </div>
    </div>
  );
}
