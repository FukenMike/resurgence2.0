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
            We are not overlooked. We are <strong>filtered out</strong> by design. We are fathers buried under bureaucracy— Flagged, disqualified, shut out of support systems not built for us.
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
            I was granted full custody of my children by a judge—but the system overruled it. Not because I was unfit. Not because of any crime. But because DHR had already filed a dependency case during my divorce. They seized control of everything—my family, my freedom, my future.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            I wasn't warned. I wasn't helped. I wasn't given support to stabilize or reunify my family. I was pushed out and punished for not navigating a system that was never designed to help me in the first place.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            Even after a judge ruled in my favor, DHR refused to return my children. My custody order meant nothing. All because the Interstate Compact on the Placement of Children (ICPC) process hadn't been started. Alabama wouldn't release them, and Georgia wouldn't initiate it—leaving my children stuck in limbo.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryQuote>
          My family wasn't failed by one bad decision. We were buried by the system itself.
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
