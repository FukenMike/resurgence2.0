import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 md:px-0">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight relative inline-block animate-pulse">
        <span className="text-amber-400 drop-shadow-[0_0_8px_#f59e0b]">We Are Rising</span>
      </h1>

      <p className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed">
        This isn’t just a website.  
        This is a spark.  
        A movement built from pain, purpose, and persistence.  
        We’ve been overlooked, shut out, written off.  
        But this is where the story turns.
      </p>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          to="/who-we-are"
          className="px-6 py-3 bg-amber-500 text-black font-semibold rounded-lg hover:bg-amber-400 transition"
        >
          Learn Why We Exist
        </Link>
        <Link
          to="/mission"
          className="px-6 py-3 border-2 border-amber-500 text-amber-500 font-semibold rounded-lg hover:bg-amber-500 hover:text-black transition"
        >
          Our Mission
        </Link>
      </div>
    </div>
  );
}

