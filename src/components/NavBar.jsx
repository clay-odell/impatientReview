import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

export default function NavBar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-slate-950 text-white fixed top-0 left-0 right-0 shadow-md font-dongle text-2xl z-40">
      <div className="w-full px-4 h-12 flex items-center justify-between">
        {/* Desktop links */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="text-white hover:text-slate-400 transition-colors">Home</a>
          <a href="/about" className="text-white hover:text-slate-400 transition-colors">About</a>
          <a href="/music" className="text-white hover:text-slate-400 transition-colors">Music</a>
          <a href="/writings" className="text-white hover:text-slate-400 transition-colors">Writings</a>
          <a href="/submissions" className="text-white hover:text-slate-400 transition-colors">Submissions</a>
        </div>

        {/* Logo */}
        <a href="/" className="flex items-center">
          <img src="ImpatientReviewLogo-2.png" alt="Impatient Review Logo" className="h-10 w-auto" />
        </a>

        {/* Hamburger (mobile only) */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="text-white focus:outline-none"
          >
            {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile menu positioned absolutely so it does not reflow header */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-slate-900 px-4 pb-4 space-y-2 z-50">
          <a href="/" onClick={() => setIsOpen(false)} className="block text-white hover:text-slate-400 transition-colors">Home</a>
          <a href="/about" onClick={() => setIsOpen(false)} className="block text-white hover:text-slate-400 transition-colors">About</a>
          <a href="/music" onClick={() => setIsOpen(false)} className="block text-white hover:text-slate-400 transition-colors">Music</a>
          <a href="/writings" onClick={() => setIsOpen(false)} className="block text-white hover:text-slate-400 transition-colors">Writings</a>
          <a href="/submissions" onClick={() => setIsOpen(false)} className="block text-white hover:text-slate-400 transition-colors">Submissions</a>
        </div>
      )}
    </nav>
  );
}
