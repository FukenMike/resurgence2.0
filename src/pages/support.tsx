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
      <h1 className="text-4xl font-bold mb-6 text-amber-400">Support the Movement</h1>

      <p className="mb-4">
        This isn’t a donation page. It’s an act of rebellion. A stand against a system that discards the very people it claims to protect.
        A way to say: “I see what’s happening—and I won’t look away.”
      </p>

      <p className="mb-4">
        Every dollar you give goes toward building something real: emergency aid, housing support, reunification efforts,
        and a network of advocacy that meets people where they are. No middlemen. No red tape. Just help—fast, direct, and human.
      </p>

      <p className="mb-4 font-semibold">
        You don’t have to give $500 to make a difference.  
        $5 keeps someone’s phone on. $10 helps a parent get to court.  
        $20 might be the difference between losing custody—or keeping it.
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

      {/* 🔶 Zeffy Donate Button */}
      <div className="my-10 flex justify-center">
        <button
          zeffy-form-link="https://www.zeffy.com/embed/donation-form/the-fathers-alliance-is-rising-join-us?modal=true"
          className="bg-amber-500 text-black px-6 py-3 rounded-md text-lg font-semibold hover:bg-amber-400 transition"
        >
          Donate via Zeffy (No Fees)
        </button>
      </div>

      {/* 🔷 GoFundMe Widget Embed */}
      <div
        className="gfm-embed my-12"
        data-url="https://www.gofundme.com/f/TheFathersAllianceProject/widget/small?sharesheet=fundraiser sidebar&attribution_id=sl:39b6cecd-9f0c-434c-85e7-0c345aab003d"
      ></div>

      {/* 🛍️ Zeffy Shop Embed */}
      <div className="my-12">
        <h2 className="text-2xl font-bold mb-4 text-amber-400">Visit Our Fundraising Shop</h2>
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            height: '500px',
            width: '100%',
            paddingTop: '500px',
          }}
        >
          <iframe
            title="Zeffy Fundraising Shop"
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
            src="https://www.zeffy.com/embed/ticketing/the-fathers-alliances-fundraising-shop"
            allow="payment-request"
            allowTransparency={true}
          ></iframe>
        </div>
      </div>

      {/* 💵 PayPal Fallback */}
      <div className="my-12 p-4 border border-amber-400 rounded-xl bg-gray-900">
        <p className="mb-2 font-semibold">📧 PayPal (Temporary Option):</p>
        <p className="break-all">mikegriggs929@gmail.com</p>
      </div>

      <p className="mt-12 text-lg font-semibold">
        You don’t have to be rich to fight the system.  
        You just have to care enough to act.
      </p>
    </section>
  );
}

