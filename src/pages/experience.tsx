import React from 'react';
import StorySection from '../components/story/StorySection';
import StoryBeat from '../components/story/StoryBeat';
import StoryBreak from '../components/story/StoryBreak';
import StoryQuote from '../components/story/StoryQuote';
import StoryEvidence from '../components/story/StoryEvidence';
import StoryMedia from '../components/story/StoryMedia';
import { Link } from 'react-router-dom';

export default function Experience() {
  return (
    <div className="bg-steam-bg text-steam-text font-body">
      {/* SECTION 1 — AWAKENING */}
      <StorySection variant="default" className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
          <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">We Are Rising</span>
        </h1>
      </StorySection>

      {/* SECTION 2 — THE FRACTURE */}
      <StorySection variant="panel">
        <StoryBeat emphasis="strong">
          <p>
            We don’t exist yet—not in the way they define existence. We’re a flicker in the dark. An idea. A spark that hasn’t caught fire—<em>yet</em>.
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

      {/* SECTION 3 — THE COST */}
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
            I wasn’t warned. I wasn’t helped. I wasn’t given support to stabilize or reunify my family. I was pushed out and punished for not navigating a system that was never designed to help me in the first place.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryBeat>
          <p>
            Even after a judge ruled in my favor, DHR refused to return my children. My custody order meant nothing. All because the Interstate Compact on the Placement of Children (ICPC) process hadn’t been started. Alabama wouldn’t release them, and Georgia wouldn’t initiate it—leaving my children stuck in limbo.
          </p>
        </StoryBeat>
        <StoryBreak />
        <StoryQuote>
          My family wasn’t failed by one bad decision. We were buried by the system itself.
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
        </StoryEvidence>      </StorySection>

      {/* SECTION 4 — THE PATTERN */}
      <StorySection variant="panel">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 bg-steam-bg border border-steam-brass rounded-xl">
            <h3 className="text-2xl font-heading font-bold mb-4 text-steam-copper">The Current System</h3>
            <ul className="space-y-3 list-disc list-inside text-steam-text">
              <li>
                Fathers are granted custody only <span className="font-bold text-white">18.3%</span> of the time.
              </li>
              <li>
                Public housing waitlists can take anywhere from <span className="font-bold text-white">6 months to 6 years</span>.
              </li>
              <li>
                CPS/DHR can override custody orders based on dependency filings.
              </li>
            </ul>
          </div>
          <div className="p-6 bg-steam-bg border border-steam-copper rounded-xl">
            <h3 className="text-2xl font-heading font-bold mb-4 text-steam-copper">The Future We’re Building</h3>
            <ul className="space-y-3 list-disc list-inside text-steam-text">
              <li>
                A restructured family court model that values shared parenting and truth over conflict.
              </li>
              <li>
                Emergency aid that keeps families housed and stable—<em>before</em> the damage is done.
              </li>
              <li>
                Support without shame. Healing without hoops. Advocacy without red tape.
              </li>
            </ul>
          </div>
        </div>
        
        <StoryBreak />
        
        {/* Optional media: Future placeholder for video testimony or data viz */}
        {/* <StoryMedia
          type="video"
          src=""
          alt="Testimony or pattern visualization (placeholder)"
          caption="[Future: Video testimony or interactive data showing custody disparities]"
        /> */}
      </StorySection>

      {/* SECTION 5 — THE VOICES */}
      <StorySection variant="default">
        <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">The Voices</h2>
        <p className="mb-4">Real stories. Unfiltered truth.</p>
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

      {/* SECTION 6 — THE RESPONSE */}
      <StorySection variant="panel" className="text-center">
        <StoryBeat emphasis="strong">
          <p>
            You don’t have to be perfect to show up. You just have to care. Let’s build something better—together.
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
      </StorySection>
    </div>
  );
}
