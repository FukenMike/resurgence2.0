// src/pages/support.tsx

import React from 'react'

export default function Support() {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-steam-text font-body">
      <h1 className="text-4xl font-heading font-bold mb-6 text-steam-copper">
        Support the Movement
      </h1>

      <p className="mb-4">
        This isn’t a donation page. It’s an act of rebellion. A stand against a
        system that discards the very people it claims to protect. A way to say:
        “I see what’s happening—and I won’t look away.”
      </p>

      <p className="mb-4">
        Every dollar you give goes toward building something real: emergency
        aid, housing support, reunification efforts, and a network of advocacy
        that meets people where they are. No middlemen. No red tape. Just
        help—fast, direct, and human.
      </p>

      <p className="mb-4 font-semibold">
        You don’t have to give $500 to make a difference. $5 keeps someone’s
        phone on. $10 helps a parent get to court. $20 might be the difference
        between losing custody—or keeping it.
      </p>

      <p className="mb-4">
        If you believe families deserve better, here’s how you can help:
      </p>

      <ul className="list-disc list-inside mb-6 space-y-2 text-lg">
        <li>Make a one-time or recurring gift</li>
        <li>Share our story on social media</li>
        <li>Help us find volunteers or board members</li>
        <li>Spread the truth that no one else is willing to say</li>
      </ul>

      <a
        href="https://www.zeffy.com/en/donation-form/the-fathers-alliance-is-rising-join-us"
        target="_blank"
        rel="noopener noreferrer"
        className="bg-steam-brass text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-steam-copper transition block text-center my-6"
      >
        Quick Donate (opens new tab)
      </a>

      <div className="my-12">
        <h2 className="text-2xl font-heading font-bold mb-4 text-steam-copper">
          Direct Donation Form
        </h2>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '1200px',
            width: '100%',
          }}
        >
          <iframe
            title="Donation form powered by Zeffy"
            style={{
              position: 'absolute',
              border: 0,
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              width: '100%',
              height: '100%',
            }}
            src="https://www.zeffy.com/embed/donation-form/the-fathers-alliance-is-rising-join-us"
            allow="payment-request"
            allowTransparency={true}
          ></iframe>
        </div>
      </div>

      <div className="my-12 p-4 border border-steam-copper rounded-xl bg-steam-metal">
        <p className="mb-2 font-semibold">📧 PayPal (Temporary Option):</p>
        <p className="break-all">mikegriggs929@gmail.com</p>
      </div>

      <p className="mt-12 text-lg font-semibold text-steam-brass">
        You don’t have to be rich to fight the system. You just have to care
        enough to act.
      </p>
    </section>
  )
}
