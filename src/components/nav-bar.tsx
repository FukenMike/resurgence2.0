import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/who-we-are', label: 'Who We Are' },
  { path: '/mission', label: 'Mission' },
  { path: '/vision', label: 'Vision' },
  { path: '/founder-story', label: 'Founder Story' },
  { path: '/buried-by-the-system', label: 'Buried by the System' },
  { path: '/education-reform', label: 'Education Reform' },
  { path: '/the-vault', label: 'The Vault' },
  { path: '/wall-of-truth', label: 'Wall of Truth' },
  { path: '/support', label: 'Support' },
  { path: '/connect', label: 'Connect' },
];

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="w-full bg-black text-white px-4 py-3 shadow-md fixed top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold tracking-wide text-amber-500">
          The Father’s Alliance
        </Link>
        <div className="flex gap-3 text-sm md:text-base flex-wrap justify-end">
          {navLinks.map(({ path, label }) => (
            <Link
              key={path}
              to={path}
              className={`px-3 py-1 rounded hover:text-amber-400 transition ${
                location.pathname === path ? 'text-amber-500 font-semibold' : 'text-white'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}

