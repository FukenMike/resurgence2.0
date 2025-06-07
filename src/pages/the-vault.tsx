// src/pages/the-vault.tsx

import React from 'react';

export default function TheVault() {
  return (
    <section className="px-4 py-12 bg-black text-white text-center min-h-screen">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-8">
        The Vault
      </h1>

      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-bold mb-4">📘 Addiction: The Untold Truth</h2>
        <h3 className="text-xl font-semibold mb-2">By Iam Riven</h3>

        <div className="my-6">
          <img
            src="/images/addiction-book-cover.png"
            alt="Addiction: The Untold Truth book cover"
            className="mx-auto max-w-xs rounded shadow-lg"
          />
        </div>

        <p className="text-lg leading-relaxed mb-6">
          A raw, unfiltered descent into the real roots of addiction. <br />
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
