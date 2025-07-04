// src/pages/privacy-policy.tsx
import React from 'react';
import Layout from '../components/Layout';

export default function PrivacyPolicy() {
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 py-16 text-steam-text bg-steam-bg min-h-screen font-body">
        <h1 className="text-3xl font-heading font-bold mb-6 text-steam-copper">Privacy Policy</h1>
        <p className="mb-4">Effective Date: June 7, 2025</p>

        <p className="mb-4">
          The Father’s Alliance (“we,” “us,” or “our”) respects your privacy. This policy outlines what personal
          information we collect, how we use it, and how we protect it.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">Information We Collect</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Name and contact information</li>
          <li>Donation details via Zeffy, PayPal, etc.</li>
          <li>Form submissions and communications</li>
          <li>Browser or device data</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">How We Use It</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Send donation receipts and acknowledgments</li>
          <li>Communicate updates or reply to messages</li>
          <li>Improve our website or services</li>
          <li>Track site analytics anonymously</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">Third-Party Tools</h2>
        <ul className="list-disc ml-6 mb-4">
          <li>Zeffy (donations)</li>
          <li>PayPal (alternative donations)</li>
          <li>ProtonMail (email)</li>
          <li>Cloudflare (site performance/security)</li>
        </ul>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">Data Security</h2>
        <p className="mb-4">
          We take reasonable steps to protect your data using encrypted services, limited access, and secure platforms.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">Contact Us</h2>
        <p className="mb-4">
          If you have questions about this policy, please email us at{' '}
          <a href="mailto:thefathersalliance@proton.me" className="text-steam-copper underline">
            thefathersalliance@proton.me
          </a>.
        </p>

        <h2 className="text-xl font-semibold mt-8 mb-2 text-steam-brass">Policy Updates</h2>
        <p>
          We may update this policy over time. When we do, we’ll update the effective date above. Please check back
          periodically.
        </p>
      </div>
    </Layout>
  );
}
