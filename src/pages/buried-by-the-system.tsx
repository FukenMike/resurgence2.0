// src/pages/buried-by-the-system.tsx

import React from 'react';
import Layout from '../components/Layout';

export default function BuriedByTheSystem() {
  return (
    <Layout>
      <section className="px-6 py-12 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-6 font-heading text-steam-copper">
          Buried by the System
        </h1>

        <p className="mb-4">
          I was granted full custody of my children by a judge—but the system overruled it.
          Not because I was unfit. Not because of any crime. But because DHR had already filed a dependency case during my divorce. 
          They seized control of everything—my family, my freedom, my future.
        </p>

        <p className="mb-4">
          I wasn’t warned. I wasn’t helped. I wasn’t given support to stabilize or reunify my family.
          I was pushed out and punished for not navigating a system that was never designed to help me in the first place.
        </p>

        <p className="mb-4">
          Even after a judge ruled in my favor, DHR refused to return my children. My custody order meant nothing.
          All because the Interstate Compact on the Placement of Children (ICPC) process hadn’t been started.
          Alabama wouldn’t release them, and Georgia wouldn’t initiate it—leaving my children stuck in limbo.
        </p>

        <p className="mb-4">
          The system that claims to protect children used paperwork and red tape to tear mine away from me.
          I’m not the only one. Fathers across the country are losing their children—not to abuse or neglect, but to bureaucracy.
          To loopholes. To agencies that operate without oversight, accountability, or urgency.
        </p>

        <p className="mb-4 font-semibold italic text-steam-brass">
          My family wasn’t failed by one bad decision.  
          We were buried by the system itself.
        </p>

        <p className="mt-8 text-lg font-semibold text-steam-copper">
          This page isn’t just my story—it’s a warning. And a call to action.  
          If it can happen to me, it can happen to anyone.  
          We need reform. We need accountability.  
          And we need it now.
        </p>
      </section>
    </Layout>
  );
}
