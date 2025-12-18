import React, { useState, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [exploreOpen, setExploreOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const exploreLinks = [
    { name: 'Home', path: '/home' },
    { name: 'Who We Are', path: '/who-we-are' },
    { name: 'Mission', path: '/mission' },
    { name: 'Vision', path: '/vision' },
    { name: 'Founder Story', path: '/founder-story' },
    { name: 'Buried by the System', path: '/experience#cost' },
    { name: 'Wall of Truth', path: '/wall-of-truth' },
    { name: 'Support', path: '/support' },
    { name: 'Connect', path: '/connect' },
  ]

  const handleExploreClick = (e) => {
    e.preventDefault()
    setExploreOpen(!exploreOpen)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickAway = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setExploreOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickAway)
    return () => document.removeEventListener('mousedown', handleClickAway)
  }, [])

  return (
    <nav className="bg-steam-metal border-b-2 border-steam-copper text-steam-text font-heading shadow-md fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center relative">
        {/* Logo / Title */}
        <Link to="/experience" className="text-2xl text-steam-copper tracking-wider uppercase hover:text-steam-brass transition">
          The Father's <span className="block sm:inline">Alliance</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex space-x-8 text-sm tracking-wide items-center">
          <Link
            to="/experience"
            className="inline-block px-4 py-2 bg-amber-500 text-black font-semibold rounded-md hover:bg-amber-400 transition"
          >
            Experience
          </Link>
          
          {/* Explore Dropdown */}
          <div className="relative" ref={menuRef}>
            <button
              onClick={handleExploreClick}
              className="flex items-center space-x-1 text-steam-text hover:text-steam-copper transition pb-1"
              aria-haspopup="true"
              aria-expanded={exploreOpen}
            >
              <span>Explore</span>
              <svg
                className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`}
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {exploreOpen && (
              <div className="absolute left-0 mt-0 w-48 bg-steam-panel border border-steam-copper rounded-md shadow-lg py-2 z-50">
                {exploreLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className="block px-4 py-2 text-sm text-steam-text hover:bg-steam-metal hover:text-steam-copper transition"
                    onClick={() => setExploreOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Icon */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden flex items-center focus:outline-none focus:ring-2 focus:ring-steam-copper rounded p-1"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <svg
            className="w-6 h-6 text-steam-copper"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="absolute right-0 top-16 w-56 bg-steam-panel border border-steam-copper rounded-md shadow-lg z-50">
            {/* Mobile Experience Link */}
            <Link
              to="/experience"
              className="block text-sm text-black bg-amber-500 hover:bg-amber-400 font-semibold px-4 py-3 transition border-b border-steam-copper"
              onClick={() => setIsOpen(false)}
            >
              Experience
            </Link>

            {/* Mobile Explore Section */}
            <div className="border-b border-steam-copper">
              <button
                onClick={() => setExploreOpen(!exploreOpen)}
                className="w-full text-left px-4 py-3 text-sm text-steam-text hover:bg-steam-metal transition flex items-center justify-between"
                aria-haspopup="true"
                aria-expanded={exploreOpen}
              >
                <span>Explore</span>
                <svg
                  className={`w-4 h-4 transition-transform ${exploreOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 14l-7 7m0 0l-7-7m7 7V3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Mobile Explore Links */}
              {exploreOpen && (
                <div className="bg-steam-metal">
                  {exploreLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      className="block px-6 py-2 text-sm text-steam-text hover:text-steam-copper transition"
                      onClick={() => {
                        setIsOpen(false)
                        setExploreOpen(false)
                      }}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
