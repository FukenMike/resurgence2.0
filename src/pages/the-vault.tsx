// src/pages/the-vault.tsx

import React from 'react';

export default function TheVault() {
  return (
    <section className="px-6 py-12 bg-black text-white text-center min-h-screen">
      {/* Author Spotlight */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-4">✍️ Author Spotlight: Iam Riven</h2>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed text-gray-300">
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
        <h2 className="text-2xl font-bold mb-2">📘 Addiction: The Untold Truth</h2>
        <h3 className="text-lg font-semibold mb-4">By Iam Riven</h3>
        <img
          src="/images/addiction-book-cover.png"
          alt="Addiction: The Untold Truth book cover"
          className="mx-auto max-w-xs rounded shadow-lg mb-6"
        />
        <p className="max-w-xl mx-auto text-lg leading-relaxed mb-6 text-gray-300">
          A raw, unfiltered descent into the real roots of addiction.
          <br />
          No clichés. No sugarcoating. Just truth, pain, and the road back.
        </p>
        <a
          href="https://amzn.to/4mNOC94"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Read it on Amazon →
        </a>
      </div>
    </section>
  );
}
