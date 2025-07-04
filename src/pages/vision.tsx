// src/pages/vision.tsx

import React from 'react';
import Layout from '../components/Layout';

export default function Vision() {
  return (
    <Layout>
      <section className="flex flex-col md:flex-row min-h-screen bg-steam-bg text-steam-text font-body">
        {/* Left Side – Current System */}
        <div className="w-full md:w-1/2 p-8 bg-steam-panel border-r border-steam-brass">
          <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">The Current System</h2>

          <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside text-steam-muted">
            <li>
              Fathers are granted custody only <span className="font-bold text-white">18.3%</span> of the time.  
              <span className="text-sm text-steam-faded block">
                Source: Legal Services Corporation
              </span>
            </li>
            <li>
              Public housing waitlists can take anywhere from <span className="font-bold text-white">6 months to 6 years</span>, depending on location.
            </li>
            <li>
              Courts often ignore children’s voices and make decisions without their input.
            </li>
            <li>
              CPS/DHR can override custody orders based on dependency filings, even if the parent was granted custody by a judge.
            </li>
            <li>
              The Adoption and Safe Families Act (ASFA) creates financial incentives for states to remove children from their homes instead of supporting reunification.
            </li>
          </ul>
        </div>

        {/* Right Side – Future We're Building */}
        <div className="w-full md:w-1/2 p-8 bg-steam-panel">
          <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">The Future We’re Building</h2>

          <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside text-steam-muted">
            <li>
              A restructured family court model that values shared parenting, accountability, and truth over conflict.
            </li>
            <li>
              Emergency rent, deposit, and transportation assistance to keep families housed and stable—<em>before</em> the damage is done.
            </li>
            <li>
              Mental health care that’s trauma-informed, accessible, and judgment-free—for both parents and children.
            </li>
            <li>
              A system that protects children <em>without</em> erasing their families.
            </li>
            <li>
              Help that shows up in real time—not 6 months from now.
            </li>
            <li>
              Support without shame. Healing without hoops. Advocacy without red tape.
            </li>
          </ul>
        </div>
      </section>
    </Layout>
  );
}
