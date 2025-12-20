import React from 'react';
import StorySection from '../components/story/StorySection';
import StoryBeat from '../components/story/StoryBeat';
import StoryBreak from '../components/story/StoryBreak';
import StoryQuote from '../components/story/StoryQuote';
import StoryEvidence from '../components/story/StoryEvidence';
import StoryProgress from '../components/story/StoryProgress';
import ContrastPanel from '../components/story/ContrastPanel';
import WitnessFragment from '../components/story/WitnessFragment';
import QuietChoice from '../components/story/QuietChoice';
import { Link } from 'react-router-dom';

export default function Experience() {
  const sections = [
    { id: 'signal', label: 'Signal' },
    { id: 'pattern', label: 'Pattern' },
    { id: 'cost', label: 'The Cost' },
    { id: 'mission', label: 'Mission' },
    { id: 'voices', label: 'Voices' },
    { id: 'truth', label: 'Truth' },
    { id: 'next', label: 'Next' },
  ];

  return (
    <div className="bg-steam-bg text-steam-text font-body">
      <StoryProgress sections={sections} />
      {/* SIGNAL — opening note + clarity on who we are */}
      <section id="signal" data-section-id="signal">
        <StorySection variant="default" className="text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
            <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">We Are Rising</span>
          </h1>

          <div className="text-xl md:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed space-y-4">
            <p>
              Family law hasn’t evolved—but families have. Divorce. Custody. Support. CPS. What’s called a “system” is a maze—outdated, biased, and sealed off from the truth behind closed doors. It doesn’t resolve crisis. It manages it. It punishes pain. Profits from separation. And almost never reflects what’s best for the child.
            </p>

            <p>
              What started as a fight for fathers exposed something much larger. Mothers. Guardians. Families on the brink—we all face the fallout. This alliance was born from that fire. From courtrooms where voices are silenced, survival is criminalized, and justice feels optional if you can’t afford it.
            </p>

            <p>
              We rise from that silence—not to beg for reform, but to expose the machinery that feeds on desperation and to build what it refuses to.
              <br />
              <strong className="fire-ignite">We. Are. Rising.</strong>
            </p>
          </div>

          <StoryBreak />

          <StoryBeat>
            <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">Who We Are</h2>
            {/* Legacy "Who We Are" module merged here to keep the signal anchored in identity */}
            <div className="text-left max-w-3xl mx-auto space-y-4">
              <p>The Father's Alliance is an advocacy and documentation platform examining how families are filtered, stalled, and separated by systems that claim to protect children.</p>
              <p>We began by listening to fathers—not because fathers are uniquely harmed, but because they were among the first to notice a pattern no one wanted named.</p>
              <p>What emerged was not a gender issue. It was a structural one.</p>
              <p>Across jurisdictions, families experiencing poverty, instability, disability, or non-conformity are processed through systems that claim to protect children while quietly prioritizing compliance, funding incentives, and risk avoidance over preservation and support.</p>
              <p>Fathers were simply early casualties. So were mothers. So were grandparents. So were guardians, kinship caregivers, and families already stretched thin.</p>
              <p className="font-semibold text-steam-brass">What We Do</p>
              <p>We document systemic filtering and institutional incentives. We translate opaque processes into plain language. We preserve testimony before it's dismissed as anecdotal. We connect personal harm to structural design.</p>
              <p className="font-semibold text-steam-brass">What We Are Not</p>
              <p>We are not a legal service, a political party, a grievance forum, or a charity selling hope. We are an advocacy and narrative accountability platform.</p>
              <p className="font-semibold text-steam-brass">Why the Name Still Matters</p>
              <p>The name remains because fathers were the signal—not the scope. They noticed first because they were removed first.</p>
              <p className="mt-2 text-lg font-semibold text-steam-copper">The pattern is larger than any one group. The work is about all of us.</p>
            </div>
          </StoryBeat>
        </StorySection>
      </section>

      {/* PATTERN — showing how the fracture operates */}
      <section id="pattern" data-section-id="pattern">
        <StorySection variant="panel">
          <StoryBeat emphasis="strong">
            <p>We don't exist yet—not in the way they define existence. We're a flicker in the dark. An idea. A spark that hasn't caught fire—<em>yet</em>.</p>
          </StoryBeat>
          <StoryBreak />
          <StoryBeat>
            <p>We are not overlooked. We are <strong>filtered out</strong> by design. We are fathers—parents—people—buried under bureaucracy. Flagged, disqualified, shut out of support systems not built for us.</p>
          </StoryBeat>
          <StoryBreak />
          <StoryBeat>
            <p>Our mission is to break the cycle.</p>
            <p>To stand in the gap where the system fails...</p>
          </StoryBeat>

          <StoryBreak />

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

          <StoryBeat>
            <h3 className="text-2xl font-heading font-bold mb-4 text-steam-copper">How the System Undermines Parents — and Why It Keeps Working</h3>
            <p className="mb-4">When a family falls into crisis—custody disputes, housing instability, mental health strain, poverty—the system claims to intervene for protection. What actually happens is something else entirely.</p>
            <p className="mb-4">You enter a maze designed not to resolve crisis, but to manage it.</p>
            <p className="mb-6">Dependency filings, safety plans, ICPC delays, compliance checklists, and "services" stack on top of one another until survival itself becomes suspicious. The moment you need help, you are no longer treated as a parent—you become a case. A risk. A liability. And once you are labeled, escape becomes nearly impossible.</p>
            <ol className="list-decimal list-inside space-y-4 text-left text-lg leading-relaxed">
              <li><strong>The Interstate Trap (ICPC)</strong><br />Crossing state lines doesn't just complicate reunification—it can halt it entirely. One state won't release custody. The other won't approve placement. Children remain in limbo not because of danger, but because process has stalled.</li>
              <li><strong>The "Safety" Loophole</strong><br />Vague terms like "risk," "instability," and "concern" allow removals without findings, without convictions, and without timelines for return.</li>
              <li><strong>Parental Alienation by the State</strong><br />Once a child enters care, the narrative shifts. Parents are no longer presumed capable. Every delay is blamed on them. Every attempt to comply becomes evidence of prior failure.</li>
              <li><strong>Services Used as Leverage</strong><br />Counseling. Classes. Testing. Evaluations. These are presented as help—but are often used as gates, not bridges. Completion does not guarantee reunification. It only resets the clock.</li>
              <li><strong>The Funding Incentive</strong><br />States receive federal money for children in care—not for families kept intact. The longer a child remains system-involved, the more resources flow. Reunification becomes optional.</li>
              <li><strong>Rights Without Teeth</strong><br />You can have rights on paper and none in practice. Speak up and you're labeled "noncompliant." Push back and you're "resistant." Stay quiet and nothing changes.</li>
              <li><strong>This is not accidental.</strong><br />It is structural.</li>
            </ol>
            {/* Underdeveloped: add a data viz/timeline here to quantify attrition and delay once assets are ready. */}
          </StoryBeat>
        </StorySection>
      </section>

      {/* COST — the lived price of the pattern */}
      <section id="cost" data-section-id="cost">
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
              When interstate placement became necessary, the system stalled again. Because I lived in Georgia and the children were in Alabama custody, reunification required an Interstate Compact on the Placement of Children (ICPC) evaluation. Alabama DHR was responsible for initiating the process. Georgia was responsible for completing it. Neither side moved with urgency. Alabama would not release custody without ICPC approval. Georgia could not complete an evaluation without a proper initiation. The court acknowledged the process—but set no deadline and enforced no resolution. My children were trapped in the gap.
            </p>
          </StoryBeat>
          <StoryBreak />
          <StoryBeat>
            <p>
              Months passed. Custody remained with DHR by default, not by decision. Foster care became the holding pattern. One child was flagged for therapeutic foster placement. Fees were assessed. Visitation was restricted and controlled by the same agency holding custody.
            </p>
            <p>
              This is how families disappear in the system. Not through termination. Not through trial. But through overlapping jurisdictions, endless requirements, and procedural inertia that no parent can outrun—especially without money, influence, or legal leverage.
            </p>
            <p className="mt-4 text-lg font-semibold text-steam-copper">And this isn’t rare. It’s structural.</p>
          </StoryBeat>
          <StoryBreak />
          <StoryQuote>My family wasn’t destroyed by a single ruling. We were buried under process.</StoryQuote>
          {/* Transition note: consider weaving a short bridge into how this cost reverberates into the mission that follows. */}
          <StoryEvidence
            variant="stat"
            title="Interstate Compact on the Placement of Children (ICPC)"
            source="Child Welfare Information Gateway"
          >
            <p>
              The ICPC is designed to protect children moved across state lines in child welfare cases. However, delays in the process can leave children in state custody indefinitely while paperwork is processed—even when a parent has a court order for custody in the destination state.
            </p>
            <p className="text-sm italic">This structural gap affects thousands of families navigating multi-state custody disputes.</p>
          </StoryEvidence>
        </StorySection>
      </section>

      {/* MISSION — why this alliance exists */}
      <section id="mission" data-section-id="mission">
        <StorySection variant="default">
          <h2 className="text-3xl font-heading font-bold mb-6 text-steam-copper">Why The Father's Alliance Exists</h2>

          <StoryBeat>
            <p>What began as a fight for fathers exposed a much larger truth.</p>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat>
            <p>This system does not target men alone. It targets poverty, instability, and vulnerability—then punishes families for struggling inside conditions it helped create.</p>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat>
            <p>Mothers. Fathers. Guardians. Grandparents. If you lack money, leverage, or legal insulation, you are expendable.</p>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat emphasis="strong">
            <p>The Father's Alliance exists because reform from inside this system has failed.</p>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat>
            <p>We are not here to manage outcomes or negotiate favors. We are here to expose the machinery, document the damage, and build alternatives where the system refuses to change.</p>
          </StoryBeat>

          <StoryBreak />

          <h3 className="text-2xl font-heading font-bold mb-6 text-steam-brass">Our Mission</h3>

          <StoryBeat emphasis="strong">
            <p>To break the cycle—not by asking permission, but by refusing silence.</p>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat>
            <p>We exist to:</p>
            <ul className="list-disc list-inside space-y-2 mt-4 text-lg">
              <li>Document how families are captured, stalled, and erased by process</li>
              <li>Give voice to those written off as "cases" instead of people</li>
              <li>Expose structural incentives that reward separation over support</li>
              <li>Build parallel paths to stability that do not rely on punishment, compliance, or shame</li>
            </ul>
          </StoryBeat>

          <StoryBreak />

          <StoryBeat>
            <p>This is not about fatherhood alone. It is about survival in a system that mistakes control for care.</p>
            <p className="mt-4">And it is about time someone said it out loud.</p>
          </StoryBeat>
        </StorySection>
      </section>

      {/* VOICES — witness fragments + founder testimony */}
      <section id="voices" data-section-id="voices">
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

          <StoryBreak />

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

          <StoryBreak />

          <div className="space-y-4">
            <h3 className="text-2xl font-heading font-bold text-steam-brass">Founder Story</h3>
            <p>Hey. My name is Michael, and I’m the founder of The Father’s Alliance. This isn’t some corporate project. This isn’t some polished nonprofit. This came from pain—<em>real</em> pain. This came from living through the system and seeing how broken it truly is.</p>
            <p>Like a lot of fathers, I found out the hard way just how corrupt family law can be. I stood in courtrooms where no one looked me in the eye. I dealt with cold judges. Heartless caseworkers. Biased views. Not once was I truly seen—not as a father, and honestly, not even as a man.</p>
            <p>I remember sitting alone wondering: <em>Why hasn’t anyone done something about this?</em> <em>Why are we treated like second-rate citizens?</em> <em>Why don’t we even fit on the forms?</em></p>
            <p>There’s no support for fathers trying to get to work, trying to feed their kids, trying to survive a system that doesn’t see them. No help for sick days. No rides to visitation. No fallback when you’re doing everything right but still can’t catch a break.</p>
            <p>And the truth is—it’s not just fathers. It’s not just men. It’s humanity.</p>
            <p>Somewhere along the way, we lost sight of what we’re here for. We’re supposed to lift each other up. We’re supposed to carry each other when things get heavy—not fight over scraps and leave people bleeding in the cracks.</p>
            <p>The system makes things hard that don’t need to be hard. And yeah—sometimes it really does feel like it’s <em>designed</em> that way. I could show you research, policies, documents— but that’s not what this is about.</p>
            <p>I’m not here to change how you see the world. I’m here to plug the holes. I’m here to stop the bleeding. I’m here for the ones who are barely hanging on and feel like nobody sees them.</p>
            <p className="mt-4 text-lg font-semibold text-steam-brass">If you’re tired of struggling in silence— Welcome. You’re not alone anymore.</p>
            {/* Compression opportunity: if this section feels weighty once more voices are added, consider trimming one paragraph while keeping the first-person cadence. */}
          </div>
        </StorySection>
      </section>

      {/* TRUTH — evidence and the future vision */}
      <section id="truth" data-section-id="truth">
        <StorySection variant="panel">
          <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">The Truth</h2>
          <p className="mb-6">Real voices. Unfiltered pain. Stories the system tried to silence — but we’re bringing them into the light.</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-steam-metal border border-steam-brass rounded-lg p-6 space-y-4">
              <h3 className="text-2xl font-heading font-bold text-steam-brass">The Current System</h3>
              <ul className="space-y-3 text-lg leading-relaxed text-steam-muted list-disc list-inside">
                <li>Fathers are granted custody only <span className="font-bold text-white">18.3%</span> of the time. <span className="text-sm text-steam-faded block">Source: Legal Services Corporation</span></li>
                <li>Public housing waitlists can take anywhere from <span className="font-bold text-white">6 months to 6 years</span>, depending on location.</li>
                <li>Courts often ignore children’s voices and make decisions without their input.</li>
                <li>CPS/DHR can override custody orders based on dependency filings, even if the parent was granted custody by a judge.</li>
                <li>The Adoption and Safe Families Act (ASFA) creates financial incentives for states to remove children from their homes instead of supporting reunification.</li>
              </ul>
            </div>

            <div className="bg-steam-metal border border-steam-brass rounded-lg p-6 space-y-4">
              <h3 className="text-2xl font-heading font-bold text-steam-brass">The Future We’re Building</h3>
              <ul className="space-y-3 text-lg leading-relaxed text-steam-muted list-disc list-inside">
                <li>A restructured family court model that values shared parenting, accountability, and truth over conflict.</li>
                <li>Emergency rent, deposit, and transportation assistance to keep families housed and stable—<em>before</em> the damage is done.</li>
                <li>Mental health care that’s trauma-informed, accessible, and judgment-free—for both parents and children.</li>
                <li>A system that protects children <em>without</em> erasing their families.</li>
                <li>Help that shows up in real time—not 6 months from now.</li>
                <li>Support without shame. Healing without hoops. Advocacy without red tape.</li>
              </ul>
            </div>
          </div>

          <StoryBreak />

          <div className="space-y-3">
            <p className="text-lg">We archive and surface proof. We do not let truth get sealed away.</p>
            <a
              href="https://walloftruth.hashnode.dev/how-the-system-buried-my-fatherhood-the-truth-they-tried-to-seal-away"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block text-steam-copper underline hover:text-steam-brass"
            >
              Read the first Wall of Truth post →
            </a>
            <Link to="/wall-of-truth" className="inline-block text-steam-copper underline hover:text-steam-brass">
              Visit the Wall of Truth archive →
            </Link>
          </div>
          {/* Connective tissue: add a data-backed case study here to bridge from narrative voices to policy/evidence. */}
        </StorySection>
      </section>

      {/* NEXT — invite action without pressure */}
      <section id="next" data-section-id="next">
        <StorySection variant="panel" className="text-center">
          <StoryBeat emphasis="strong">
            <p>You don't have to be perfect to show up. You just have to care. Let's build something better—together.</p>
          </StoryBeat>
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Link to="/connect" className="inline-block px-6 py-3 bg-steam-copper text-black font-semibold rounded-lg hover:bg-steam-brass transition">
              Reach Out
            </Link>
            <Link to="/support" className="inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition">
              Stand With Us
            </Link>
          </div>
          <QuietChoice statement="Not every moment asks for action." subtext="It's okay to pause." />
        </StorySection>
      </section>
    </div>
  );
}
