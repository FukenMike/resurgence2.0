// src/pages/founder-story.tsx

import React from 'react';
import Layout from '../components/Layout';

export default function FounderStory() {
  return (
    <Layout>
      <section className="px-6 py-12 max-w-4xl mx-auto text-white">
        <h1 className="text-4xl font-bold mb-6 font-heading text-steam-copper">Who I Am</h1>

        <p className="mb-4">
          Hey. My name is Michael, and I’m the founder of The Father’s Alliance.
          This isn’t some corporate project. This isn’t some polished nonprofit.  
          This came from pain—<em>real</em> pain.  
          This came from living through the system and seeing how broken it truly is.
        </p>

        <p className="mb-4">
          Like a lot of fathers, I found out the hard way just how corrupt family law can be.  
          I stood in courtrooms where no one looked me in the eye.  
          I dealt with cold judges. Heartless caseworkers. Biased views.  
          Not once was I truly seen—not as a father, and honestly, not even as a man.
        </p>

        <p className="mb-4">
          I remember sitting alone wondering:  
          <em>Why hasn’t anyone done something about this?</em>  
          <em>Why are we treated like second-rate citizens?</em>  
          <em>Why don’t we even fit on the forms?</em>
        </p>

        <p className="mb-4">
          There’s no support for fathers trying to get to work, trying to feed their kids, trying to survive a system that doesn’t see them.  
          No help for sick days. No rides to visitation. No fallback when you’re doing everything right but still can’t catch a break.
        </p>

        <p className="mb-4">
          And the truth is—it’s not just fathers.  
          It’s not just men.  
          It’s humanity.
        </p>

        <p className="mb-4">
          Somewhere along the way, we lost sight of what we’re here for.  
          We’re supposed to lift each other up.  
          We’re supposed to carry each other when things get heavy—not fight over scraps and leave people bleeding in the cracks.
        </p>

        <p className="mb-4">
          The system makes things hard that don’t need to be hard.  
          And yeah—sometimes it really does feel like it’s <em>designed</em> that way.  
          I could show you research, policies, documents—  
          but that’s not what this is about.
        </p>

        <p className="mb-4">
          I’m not here to change how you see the world.  
          I’m here to plug the holes.  
          I’m here to stop the bleeding.  
          I’m here for the ones who are barely hanging on and feel like nobody sees them.
        </p>

        <p className="mt-8 text-lg font-semibold text-steam-brass">
          If you’re tired of struggling in silence—  
          Welcome.  
          You’re not alone anymore.
        </p>
      </section>
    </Layout>
  );
}
