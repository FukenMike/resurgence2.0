// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Who We Are', path: '/who-we-are' },
    { name: 'Mission', path: '/mission' },
    { name: 'Vision', path: '/vision' },
    { name: 'Founder Story', path: '/founder-story' },
    { name: 'Buried by the System', path: '/buried-by-the-system' },
    { name: 'Education Reform', path: '/education-reform' },
    { name: 'The Vault', path: '/the-vault' },
    { name: 'Wall of Truth', path: '/wall-of-truth' },
    { name: 'Support', path: '/support' },
    { name: 'Connect', path: '/connect' },
  ];

  return (
    <nav className="bg-black text-white shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-amber-500">
          The Father’s <span className="block sm:inline">Alliance</span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-6 font-semibold text-sm">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="hover:text-amber-400 transition"
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center focus:outline-none"
        >
          <svg
            className="w-6 h-6 fill-current text-white"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path
                fillRule="evenodd"
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                fillRule="evenodd"
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="lg:hidden bg-black px-6 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-sm font-semibold text-white hover:text-amber-400 transition"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}
