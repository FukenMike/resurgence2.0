// src/pages/vision.tsx

import React from 'react';

export default function Vision() {
  return (
    <section className="flex flex-col md:flex-row min-h-screen bg-black text-white">
      {/* Left Side – Current System */}
      <div className="w-full md:w-1/2 p-8 bg-gray-900">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">The Current System</h2>

        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li>
            Fathers are granted custody only <span className="font-bold text-white">18.3%</span> of the time.  
            <span className="text-sm text-gray-400 block">
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
      <div className="w-full md:w-1/2 p-8 bg-gray-800">
        <h2 className="text-3xl font-bold mb-4 text-amber-500">The Future We’re Building</h2>

        <ul className="space-y-4 text-lg leading-relaxed list-disc list-inside">
          <li>
            A restructured family court model that values shared parenting, accountability, and truth over conflict.
          </li>
          <li>
            Emergency rent, deposit, and transportation assistance to keep families housed and stable—*before* the damage is done.
          </li>
          <li>
            Mental health care that’s trauma-informed, accessible, and judgment-free—for both parents and children.
          </li>
          <li>
            A system that protects children *without* erasing their families.
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
  );
}
