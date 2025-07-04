// src/pages/the-vault.tsx

import React from 'react';
import Layout from '../components/Layout';

export default function TheVault() {
  return (
    <Layout>
      <section className="px-6 py-12 bg-steam-bg text-steam-text text-center min-h-screen font-body">
        {/* Author Spotlight */}
        <div className="mb-12">
          <h2 className="text-3xl font-heading font-bold mb-4 text-steam-copper">✍️ Author Spotlight: Iam Riven</h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-steam-muted">
            <strong>Riven</strong> (adj.) — split or torn apart with force.
            <br /><br />
            Life taught him early—pain leaves marks, silence speaks louder than noise, and survival isn’t clean.
            But those scars gave him a voice—a steady whisper beneath chaos, and an unflinching gaze into truth most refuse to see.
            <br /><br />
            Iam Riven writes not from a desire to be heard, but because silence became impossible.
            Every word he chooses is deliberate, shaped by loss, resilience, and quiet rebellion against the comfort of ignorance.
            <br /><br />
            You won’t find him under bright lights. His words don’t care if you’re comfortable—they care that you’re awake.
          </p>
        </div>

        {/* Featured Book */}
        <div className="my-12">
          <h2 className="text-2xl font-heading font-bold mb-2 text-steam-copper">📘 Addiction: The Untold Truth</h2>
          <h3 className="text-lg font-semibold mb-4 text-steam-brass">By Iam Riven</h3>
          <img
            src="/images/addiction-book-cover.png"
            alt="Addiction: The Untold Truth book cover"
            className="mx-auto max-w-xs rounded shadow-lg mb-6"
          />
          <p className="max-w-xl mx-auto text-lg leading-relaxed mb-6 text-steam-muted">
            A raw, unfiltered descent into the real roots of addiction.
            <br />
            No clichés. No sugarcoating. Just truth, pain, and the road back.
          </p>
          <a
            href="https://amzn.to/4mNOC94"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-steam-copper text-black font-semibold rounded-lg hover:bg-steam-brass transition"
          >
            Read it on Amazon →
          </a>
        </div>
      </section>
    </Layout>
  );
}
