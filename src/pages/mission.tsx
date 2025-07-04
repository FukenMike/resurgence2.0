// src/pages/mission.tsx

import React from 'react';
import Layout from '../components/Layout';

export default function Mission() {
  return (
    <Layout>
      <section className="px-6 py-12 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-6">Our Mission</h1>

        <div className="bg-black text-white p-6 md:p-8 mb-10 rounded-xl shadow-lg border border-amber-500">
          <h2 className="text-3xl md:text-4xl font-bold text-amber-400 mb-4">
            How the System Undermines Parents: What They Don’t Tell You
          </h2>

          <p className="mb-4">
            When your child is taken—especially across state lines—you enter a maze built to wear you down...
          </p>

          <ol className="list-decimal list-inside space-y-6 text-left text-lg leading-relaxed">
            <li>
              <strong>The Interstate Trap (ICPC):</strong><br />
              The ICPC causes massive delays...
            </li>
            <li>
              <strong>The "Safety" Loophole:</strong><br />
              Agencies throw around vague terms...
            </li>
            <li>
              <strong>Parental Alienation by the State:</strong><br />
              Once your child is in care, the system rewrites the story...
            </li>
            <li>
              <strong>Services Used Against You:</strong><br />
              Every step you take to get better becomes ammo...
            </li>
            <li>
              <strong>The Funding Incentive:</strong><br />
              States get paid to keep your child in care...
            </li>
            <li>
              <strong>Your Rights? Optional.</strong><br />
              You’re no longer presumed innocent...
            </li>
            <li>
              <strong>No Voice, No Recourse:</strong><br />
              Speak up and you're “noncompliant.”...
            </li>
          </ol>

          <p className="mt-6 text-xl font-semibold text-center text-amber-300">
            This is not just your story—it’s ours.
          </p>
          <p className="mt-2">
            We’re building The Father’s Alliance because this system doesn’t protect kids—it breaks families...
          </p>
        </div>

        <p className="mb-4 font-bold text-xl text-amber-400 tracking-wide uppercase">
          Our mission is to break the cycle.
        </p>

        <p className="mb-4">
          To stand in the gap where the system fails...
        </p>

        <p className="mb-4">
          We believe families are the foundation...
        </p>

        <p className="mb-4">
          The Father’s Alliance exists to change the narrative...
        </p>

        <p className="mb-4">
          We fight for equal treatment in family law...
        </p>

        <p className="mb-4">
          We fight for the right to survive with <em>grace</em>—not just barely hang on.
        </p>

        <p className="mt-8 text-lg font-semibold">
          This is about more than fatherhood.<br />
          This is about people.<br />
          And it’s about time they had someone in their corner.
        </p>
      </section>
    </Layout>
  );
}
