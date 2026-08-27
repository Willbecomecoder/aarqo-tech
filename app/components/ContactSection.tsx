"use client";

import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    service: "01 — CHATBOT",
    budget: "",
    details: "",
    website_hp: "", // Honeypot field for invisible spam protection
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        // Clear form after successful submission
        setFormData({
          name: "",
          email: "",
          company: "",
          service: "01 — CHATBOT",
          budget: "",
          details: "",
          website_hp: "",
        });
      } else {
        setStatus("error");
        setErrorMessage(data.error || "SOMETHING WENT WRONG. PLEASE TRY AGAIN.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("SOMETHING WENT WRONG. PLEASE TRY AGAIN.");
    }
  };

  return (
    <section id="contact" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 z-10 bg-[#030712]">
      <div className="max-w-4xl mx-auto space-y-12">
        
        {/* Section Header */}
        <div className="text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
            Direct Line
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            LET'S BUILD SOMETHING{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              EXTRAORDINARY
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-medium max-w-xl mx-auto">
            Ready to automate work, handle cold calling, or launch a high-converting digital identity? Drop a message below!
          </p>
        </div>

        {/* Minimal Futuristic Contact Form */}
        <div className="bg-[#0B0F19]/80 backdrop-blur-2xl border border-white/10 p-8 sm:p-12 rounded-3xl shadow-[0_0_50px_rgba(0,240,255,0.15)] relative z-20">
          {status === "success" ? (
            <div className="py-12 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-cyan-500/20 border border-cyan-400 text-cyan-400 flex items-center justify-center mx-auto text-2xl animate-bounce">
                ✓
              </div>
              <h3 className="text-2xl font-black text-white uppercase tracking-wider">
                MESSAGE SENT SUCCESSFULLY! ✓
              </h3>
              <p className="text-gray-300 text-sm max-w-md mx-auto">
                Thank you! I'll get back to you soon.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-4 px-6 py-2.5 rounded-full bg-white/10 text-white font-bold text-xs uppercase hover:bg-white/20 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Invisible Honeypot Field */}
              <input
                type="text"
                name="website_hp"
                value={formData.website_hp}
                onChange={(e) => setFormData({ ...formData, website_hp: e.target.value })}
                className="hidden opacity-0 w-0 h-0 pointer-events-none absolute"
                tabIndex={-1}
                aria-hidden="true"
              />

              {status === "error" && (
                <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-bold uppercase tracking-wider text-center">
                  {errorMessage}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="John Doe"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="john@company.com"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">
                    Company or Business
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="Acme Corp / Agency"
                    className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-medium"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">
                    Service Needed *
                  </label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-5 py-4 rounded-xl bg-[#0B0F19] border border-white/10 text-white focus:outline-none focus:border-cyan-400 text-sm font-medium"
                  >
                    <option value="01 — CHATBOT">01 — CHATBOT</option>
                    <option value="02 — AI AGENT">02 — AI AGENT</option>
                    <option value="03 — AI AUTOMATION">03 — AI AUTOMATION</option>
                    <option value="04 — WEBSITES">04 — WEBSITES</option>
                    <option value="05 — AI CALLING AGENT">05 — AI CALLING AGENT</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-gray-300 uppercase mb-2">
                  Project Details *
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell me about your business goals and what you'd like to build..."
                  className="w-full px-5 py-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors text-sm font-medium resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 text-white font-extrabold text-sm uppercase tracking-wider shadow-[0_0_25px_rgba(236,72,153,0.4)] hover:shadow-[0_0_35px_rgba(236,72,153,0.7)] hover:scale-[1.01] transition-all duration-300 disabled:opacity-50"
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE 🚀"}
              </button>
            </form>
          )}
        </div>

        {/* Footer Section */}
        <div className="pt-12 flex flex-col items-center justify-center space-y-4 text-center text-xs font-mono text-gray-400 uppercase tracking-widest border-t border-white/10">
          {/* Social Links Row */}
          <div className="flex items-center justify-center gap-3.5">
            {/* 1. Instagram */}
            <a
              href="https://www.instagram.com/aarqotech/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram Profile"
              className="group relative p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-pink-400 hover:border-pink-500/50 hover:bg-pink-500/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(236,72,153,0.5)] transition-all duration-300"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* 2. LinkedIn */}
            <a
              href="https://www.linkedin.com/in/shivani-singh-297104219?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="group relative p-2.5 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_20px_rgba(0,240,255,0.5)] transition-all duration-300"
            >
              <svg className="w-5 h-5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
              </svg>
            </a>
          </div>
          <p>© {new Date().getFullYear()} AARQOTECH – AI-POWERED WEBSITES, AUTOMATION & INTELLIGENT DIGITAL SOLUTIONS. ALL RIGHTS RESERVED.</p>
        </div>

      </div>
    </section>
  );
}
