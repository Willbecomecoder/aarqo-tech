"use client";

const projects = [
  {
    id: "voice-ai",
    number: "01",
    title: "Autonomous Voice Calling Bot",
    category: "AI Voice Intelligence & Twilio Sync",
    description:
      "Contextual human-like AI voice agent designed for outbound lead qualification, appointment booking, and Google Calendar sync.",
    tags: ["Twilio Voice", "OpenAI Realtime API", "Node.js", "Python"],
    color: "from-cyan-500 to-blue-600",
    glow: "#00F0FF",
  },
  {
    id: "chatbot-engine",
    number: "02",
    title: "Enterprise AI Query Handler",
    category: "Multi-Channel AI Support & Vector DB",
    description:
      "Instant query handling chatbot system synced with vector databases to capture leads 24/7 with zero wait time.",
    tags: ["Next.js 16", "LangChain", "Pinecone", "Tailwind CSS"],
    color: "from-purple-500 to-pink-600",
    glow: "#A855F7",
  },
  {
    id: "crm-pipeline",
    number: "03",
    title: "Zero-Manual-Effort Workflow Sync",
    category: "Operations & CRM Automation",
    description:
      "Multi-step automation pipeline routing lead notifications, syncing HubSpot CRM, and triggering instant WhatsApp followups.",
    tags: ["Make.com", "Zapier", "HubSpot API", "WhatsApp Cloud API"],
    color: "from-blue-500 to-indigo-600",
    glow: "#3B82F6",
  },
  {
    id: "webgl-identity",
    number: "04",
    title: "High-Converting 3D Digital Identity",
    category: "Modern Web & WebGL Design",
    description:
      "Fast, animated, ultra-modern landing page powered by Three.js particle math and GSAP scroll interactions for high conversion.",
    tags: ["Next.js 16", "Three.js", "React Three Fiber", "GSAP"],
    color: "from-pink-500 to-orange-500",
    glow: "#EC4899",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="relative w-full py-28 px-6 sm:px-12 lg:px-20 z-10 bg-[#030712]">
      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
            Featured Systems
          </span>
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
            FEATURED{" "}
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
              PROJECTS
            </span>
          </h2>
          <p className="text-base sm:text-lg text-gray-400 font-medium">
            Cinematic showcase of autonomous voice calling bots, enterprise query handlers, and high-performance WebGL identities.
          </p>
        </div>

        {/* Large Cinematic Projects Stack */}
        <div className="space-y-12">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#0B0F19]/70 backdrop-blur-2xl border border-white/10 hover:border-purple-500/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 group shadow-2xl"
            >
              {/* Left Column: Number & Title */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-4">
                  <span className="font-mono text-sm font-black text-purple-400 tracking-widest">
                    PROJECT {project.number}
                  </span>
                  <span className="w-12 h-[1px] bg-purple-500/40" />
                  <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
                    {project.category}
                  </span>
                </div>

                <h3 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-wide group-hover:text-purple-300 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300 text-base leading-relaxed font-normal pt-2">
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-gray-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right Column: Interactive CTA */}
              <div className="lg:col-span-5 flex flex-col justify-end items-start lg:items-end space-y-4">
                <a
                  href="#contact"
                  className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
                >
                  <span>VIEW CASE STUDY</span>
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
