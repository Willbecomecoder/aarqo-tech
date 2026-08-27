"use client";

import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 px-6 sm:px-12 py-4 backdrop-blur-xl bg-[#030712]/40 border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* LEFT: Corner Logo Image from public/logo.png (replaces text logo) */}
        <a href="#" className="flex items-center gap-3 group">
          <Image
            src="/logo.png"
            alt="Logo"
            width={140}
            height={40}
            priority
            unoptimized
            className="h-9 sm:h-10 w-auto object-contain drop-shadow-[0_0_12px_rgba(0,240,255,0.4)] group-hover:scale-105 transition-transform"
          />
        </a>

        {/* CENTER: Navigation Links */}
        <div className="hidden md:flex items-center gap-10 text-xs font-extrabold tracking-widest text-gray-300 uppercase">
          <a href="#services" className="hover:text-cyan-400 transition-colors">
            SERVICES
          </a>
          <a href="#projects" className="hover:text-cyan-400 transition-colors">
            PROJECTS
          </a>
          <a href="#contact" className="hover:text-cyan-400 transition-colors">
            CONTACT
          </a>
        </div>

        {/* RIGHT: LET'S TALK Button & Hamburger Icon */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="px-6 py-2.5 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-extrabold text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(236,72,153,0.5)] hover:shadow-[0_0_30px_rgba(236,72,153,0.8)] hover:scale-105 transition-all duration-300"
          >
            LET'S TALK
          </a>

          {/* Hamburger Menu Toggle Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
            className="text-white hover:text-cyan-400 p-2 transition-colors focus:outline-none"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

      </div>

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden pt-4 pb-6 px-6 space-y-4 bg-[#030712]/95 border-t border-white/10 mt-3 rounded-2xl backdrop-blur-2xl">
          <a
            href="#services"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-gray-200 hover:text-cyan-400 py-2 tracking-wider"
          >
            SERVICES
          </a>
          <a
            href="#projects"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-gray-200 hover:text-cyan-400 py-2 tracking-wider"
          >
            PROJECTS
          </a>
          <a
            href="#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-sm font-bold text-gray-200 hover:text-cyan-400 py-2 tracking-wider"
          >
            CONTACT
          </a>
        </div>
      )}
    </nav>
  );
}
