import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-black text-white border-t border-gray-700 mt-12 px-6 py-6 text-sm">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-center md:text-left">
          &copy; {new Date().getFullYear()} The Father’s Alliance. All rights reserved.
        </p>
        <nav className="flex gap-4 items-center">
          <Link to="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <a
            href="mailto:thefathersalliance@proton.me"
            className="hover:underline"
          >
            Contact
          </a>
          <a
            href="https://allianceforum.thefathersalliance.org"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-yellow-500 text-black font-semibold px-3 py-1 rounded hover:bg-yellow-400 transition"
          >
            Join Alliance Underground
          </a>
        </nav>
      </div>
    </footer>
  );
}