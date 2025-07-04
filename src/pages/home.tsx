import { Link } from "react-router-dom";
import Layout from "../components/Layout"; // make sure the path matches your file tree

export default function Home() {
  const buttonClass =
    "inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition";

  return (
    <Layout>
      <div className="flex flex-col items-center justify-center text-center px-6 md:px-0 pt-[120px]">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
          <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">
            We Are Rising
          </span>
        </h1>

        <div className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed space-y-4">
          <p>
            Family law hasn’t evolved—but families have. Divorce. Custody.
            Support. CPS. The process is broken—outdated, biased, and blind to the
            truth behind closed doors. It punishes pain. Profits from separation.
            And almost never reflects what’s best for the child.
          </p>

          <p>
            Fathers. Mothers. Guardians—we all face the fallout. This alliance was
            born from that fire. From courtrooms where voices are silenced,
            stories ignored, and justice feels optional.
          </p>

          <p>
            We rise from that silence—not to beg for change, but to build it.
            <br />
            <strong>We. Are. Rising.</strong>
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <Link to="/who-we-are" className={buttonClass}>
            Learn Why We Exist
          </Link>
          <Link to="/mission" className={buttonClass}>
            Our Mission
          </Link>
          <a
            href="https://shop.thefathersalliance.org"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonClass}
          >
            Visit the Store
          </a>
        </div>

        {/* 🔥 New Section: We’re Just Getting Started */}
        <div className="max-w-3xl text-left bg-neutral-900 rounded-2xl shadow-lg p-6 md:p-10 border border-neutral-700 space-y-4">
          <h2 className="text-3xl font-bold text-amber-400">
            We're Just Getting Started
          </h2>
          <p className="text-lg leading-relaxed text-neutral-200">
            The Father’s Alliance isn’t a service provider—not yet.
            We’re building something bigger: a parallel system for families
            buried by broken laws, biased courts, and bureaucratic silence.
          </p>
          <p className="text-lg leading-relaxed text-neutral-300">
            What you see here is the beginning of that rebellion. No grants.
            No handouts. No paid consultants. Just lived experience, raw truth,
            and a refusal to be erased.
          </p>
          <p className="text-lg leading-relaxed text-neutral-400 italic">
            If you’ve ever been silenced, ignored, or broken by the system—this was
            built with you in mind. Not as charity. As a counterforce.
          </p>
          <p className="text-lg leading-relaxed text-neutral-300">
            We’re not waiting for permission. We’re laying the bricks. Join us.
          </p>
          <div className="mt-6">
            <Link to="/who-we-are" className={buttonClass}>
              Join the Build
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
