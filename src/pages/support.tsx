// src/pages/support.tsx

import React, { useEffect } from 'react';

export default function Support() {
  useEffect(() => {
    // Load Zeffy script
    const zeffyScript = document.createElement("script");
    zeffyScript.src = "https://zeffy-scripts.s3.ca-central-1.amazonaws.com/embed-form-script.min.js";
    zeffyScript.async = true;
    document.body.appendChild(zeffyScript);

    // Load GoFundMe script
    const gofundmeScript = document.createElement("script");
    gofundmeScript.src = "https://www.gofundme.com/static/js/embed.js";
    gofundmeScript.defer = true;
    document.body.appendChild(gofundmeScript);

    return () => {
      document.body.removeChild(zeffyScript);
      document.body.removeChild(gofundmeScript);
    };
  }, []);

  return (
    <section className="px-6 py-12 max-w-4xl mx-auto text-white">
      <h1 className="text-4xl font-bold mb-6">Support the Movement</h1>

      <p className="mb-4">
        This isn’t a donation page. It’s an act of rebellion.
        A stand against a system that discards the very people it claims to protect.
        A way to say: “I see what’s happening—and I won’t look away.”
      </p>

      <p className="mb-4">
        Every dollar you give goes toward building something real:
        emergency aid, housing support, reunification efforts, and a network of advocacy that meets people where they are.
        No middlemen. No red tape. Just help—fast, direct, and human.
      </p>

      <p className="mb-4 font-semibold">
        You don’t have to give $500 to make a difference.  
        $5 keeps someone’s phone on. $10 helps a parent get to court.  
        $20 might be the difference between losing custody—or keeping it.
      </p>

      <p className="mb-4">
        If you believe families deserve better, here’s how you can help:
      </p>

      <ul className="list-disc list-inside mb-4 space-y-2 text-lg">
        <li>Make a one-time or recurring gift</li>
        <li>Share our story on social media</li>
        <li>Help us find volunteers or board members</li>
        <li>Spread the truth that no one else is willing to say</li>
      </ul>

      {/* 🔶 Zeffy Donate Button */}
      <div
        className="my-8 flex justify-center"
        zeffy-form-link="https://www.zeffy.com/embed/donation-form/the-fathers-alliance-is-rising-join-us?modal=true"
      ></div>

      {/* 🔷 GoFundMe Widget Embed */}
      <div
        className="gfm-embed my-8"
        data-url="https://www.gofundme.com/f/TheFathersAllianceProject/widget/small?sharesheet=fundraiser sidebar&attribution_id=sl:39b6cecd-9f0c-434c-85e7-0c345aab003d"
      ></div>

      {/* 💵 PayPal Fallback */}
      <div className="my-8 p-4 border border-amber-400 rounded-xl bg-gray-900">
        <p className="mb-2 font-semibold">📧 PayPal Donations (Temp):</p>
        <p className="break-all">mikegriggs929@gmail.com</p>
      </div>

      <p className="mt-8 text-lg font-semibold">
        You don’t have to be rich to fight the system.  
        You just have to care enough to act.
      </p>
    </section>
  );
}
