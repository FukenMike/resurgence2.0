import { Link } from "react-router-dom";

export default function Home() {
  const buttonClass =
    "inline-block px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition";

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 md:px-0 pt-[120px]">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
        <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">
          We Are Rising
        </span>
      </h1>

      <p className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed whitespace-pre-line">
        Family law hasn’t evolved—but families have.

Divorce. Custody. Support. CPS. The process is broken—outdated, biased, and blind to the truth behind closed doors. It punishes pain. Profits from separation. And almost never reflects what’s best for the child.

Fathers. Mothers. Guardians—we all face the fallout. This alliance was born from that fire. From courtrooms where voices are silenced, stories ignored, and justice feels optional.

We rise from that silence—not to beg for change, but to build it.

We. Are. Rising.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
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
    </div>
  );
}
