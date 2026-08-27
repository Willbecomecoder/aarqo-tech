"use client";

const services = [
  {
    id: "chatbot",
    number: "01",
    title: "CHATBOTS & QUERY HANDLING",
    subtitle: "24/7 Automated Engagement",
    description:
      "Automated customer query handling. Instant responses 24/7, lead capture, and multilingual support.",
    iconColor: "text-cyan-400",
    borderColor: "hover:border-cyan-500/50",
    glowShadow: "hover:shadow-[0_0_35px_rgba(0,240,255,0.25)]",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: "ai-agent",
    number: "02",
    title: "AI AGENTS & CALLING BOTS",
    subtitle: "Autonomous Voice & Cold Outreach",
    description:
      "Contextual problem-solving. Autonomous voice agents for cold calling, lead qualification, and calendar booking.",
    iconColor: "text-purple-400",
    borderColor: "hover:border-purple-500/50",
    glowShadow: "hover:shadow-[0_0_35px_rgba(168,85,247,0.25)]",
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
  {
    id: "automation",
    number: "03",
    title: "WORKFLOW AUTOMATION PIPELINES",
    subtitle: "Smart Process Flows",
    description:
      "Repetitive task handling. Custom multi-step automation pipelines syncing CRM, lead routing, and operations effortlessly.",
    iconColor: "text-blue-400",
    borderColor: "hover:border-blue-500/50",
    glowShadow: "hover:shadow-[0_0_35px_rgba(59,130,246,0.25)]",
    icon: (
      <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    id: "websites",
    number: "04",
    title: "MODERN WEBSITES & UI/UX",
    subtitle: "High-Converting Digital Identity",
    description:
      "Digital identity. Fast, animated, ultra-modern landing pages designed for high conversion and maximum brand authority.",
    iconColor: "text-pink-400",
    borderColor: "hover:border-pink-500/50",
    glowShadow: "hover:shadow-[0_0_35px_rgba(236,72,153,0.25)]",
    icon: (
      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
            Capabilities & Solutions
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            SERVICES &{" "}
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 bg-clip-text text-transparent">
              AI SYSTEMS
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-300 font-medium">
            Empowering businesses with autonomous voice bots, automated workflows, and modern high-converting websites.
          </p>
        </div>

        {/* 4 Glassmorphism Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((item) => (
            <div
              key={item.id}
              className={`bg-[#0B0F19]/70 backdrop-blur-xl border border-white/10 ${item.borderColor} ${item.glowShadow} rounded-3xl p-8 sm:p-10 flex flex-col justify-between transition-all duration-500 group relative overflow-hidden`}
            >
              {/* Top Row: Icon + Number */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {item.icon}
                </div>
                <span className="font-mono text-4xl font-black text-white/20">
                  {item.number}
                </span>
              </div>

              {/* Title & Content */}
              <div className="space-y-3">
                <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-cyan-400 transition-colors">
                  {item.title}
                </h3>
                <div className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest">
                  {item.subtitle}
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-normal pt-2">
                  {item.description}
                </p>
              </div>

              {/* Bottom Action */}
              <div className="pt-8 flex items-center justify-between border-t border-white/10 mt-6">
                <a
                  href="#contact"
                  className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 group-hover:text-white flex items-center gap-2 transition-colors"
                >
                  <span>Request Demo</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
                <span className="w-2 h-2 rounded-full bg-cyan-500 opacity-50 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
