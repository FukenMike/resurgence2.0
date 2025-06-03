import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {/* ------------ HERO SECTION ------------ */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 md:px-0">
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 tracking-tight">
          We Are Rising
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-8 leading-relaxed">
          This isn’t just a website.  
          This is a spark.  
          A movement built from pain, purpose, and persistence.  
          The system buried us. We didn’t stay dead.
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
      </main>

      {/* ------------ FOOTER ------------ */}
      <footer className="w-full bg-gray-900 py-4">
        <div className="text-center text-sm text-gray-400">
          © 2025 The Father’s Alliance · All Rights Reserved
        </div>
      </footer>
    </div>
  );
}

