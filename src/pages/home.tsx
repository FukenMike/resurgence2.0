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

      <div className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed space-y-4">
        <p>
          Family law hasn’t evolved—but families have. Divorce. Custody.
          Support. CPS. What’s called a “system” is a maze—outdated, biased,
          and sealed off from the truth behind closed doors. It doesn’t resolve
          crisis. It manages it. It punishes pain. Profits from separation.
          And almost never reflects what’s best for the child.
        </p>

        <p>
          What started as a fight for fathers exposed something much larger.
          Mothers. Guardians. Families on the brink—we all face the fallout.
          This alliance was born from that fire. From courtrooms where voices
          are silenced, survival is criminalized, and justice feels optional
          if you can’t afford it.
        </p>

        <p>
          We rise from that silence—not to beg for reform, but to expose the
          machinery that feeds on desperation and to build what it refuses to.
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
      </div>
    </div>
  );
}