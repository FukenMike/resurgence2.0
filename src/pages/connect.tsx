// src/pages/connect.tsx

import React from 'react';

export default function Connect() {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">Let’s Connect</h1>

      <p className="mb-4">
        The Father’s Alliance is still rising—still becoming. This isn’t some polished nonprofit with a switchboard and a team of reps.
        This is one man building something real from the ground up—and inviting others to rise with me.
      </p>

      <p className="mb-4">
        If you’ve lived through what I’ve lived through—or if you care about what’s happening to families in this country—reach out.
        Whether you want to share your story, volunteer, collaborate, or just say <em>“I see you”</em>, your voice matters.
      </p>

      <div className="my-8 p-4 border border-amber-400 rounded-xl bg-gray-900">
        <p className="mb-2 font-semibold">📧 Email (Main):</p>
        <p className="mb-4 break-all">mikegriggs929@gmail.com</p>

        <p className="mb-2 font-semibold">📧 Email (Official):</p>
        <p className="break-all">thefathersalliance@proton.me</p>
      </div>

      <p className="mb-4 leading-relaxed">
        You can also message us through the site, leave a comment on the{' '}
        <a href="/wall-of-truth" className="text-amber-400 underline hover:text-amber-300">Wall of Truth</a>,  
        or follow us on TikTok at{' '}
        <span className="font-semibold break-all">@thefathersallianc</span>
        <span className="text-sm italic"> (yes, no “e” — TikTok username limit!)</span>.
      </p>

      <p className="mt-8 text-lg font-semibold">
        You don’t have to be perfect to show up.  
        You just have to care. Let’s build something better—together.
      </p>

      <div className="mt-10">
        <p className="text-lg font-semibold mb-2">📱 Follow us on TikTok:</p>
        <a
          href="https://www.tiktok.com/@thefathersallianc"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-full transition-all"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 24 24"
            className="w-5 h-5"
          >
            <path d="M12.32 2c.52 0 .94.42.94.94v11.43a2.8 2.8 0 1 1-2.8-2.8h.38a.94.94 0 0 1 .94.94v.05a.94.94 0 0 1-.94.94h-.38a.94.94 0 0 1 0-1.88h.38a.94.94 0 0 1 .94.94V3.89a.94.94 0 0 1 .94-.94zm3.42 0c.52 0 .94.42.94.94v2.4c0 .5.15.95.43 1.33.28.37.67.67 1.13.84a5.1 5.1 0 0 0 1.53.25.94.94 0 1 1 0 1.88 7.02 7.02 0 0 1-2.08-.34 4.72 4.72 0 0 1-1.88-1.35A4.66 4.66 0 0 1 15.74 5v-2.06a.94.94 0 0 1 .94-.94z" />
          </svg>
          @thefathersallianc
        </a>
      </div>
    </section>
  );
}
