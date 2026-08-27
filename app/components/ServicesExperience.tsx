"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const servicesList = [
  {
    id: "01",
    num: "01",
    title: "CHATBOTS",
    description:
      "AI-powered chat systems that answer customer questions, capture leads and provide instant support.",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
      </svg>
    ),
  },
  {
    id: "02",
    num: "02",
    title: "AI AGENTS",
    description:
      "Intelligent AI agents that understand conversations, handle tasks and assist customers automatically.",
    icon: (
      <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
      </svg>
    ),
  },
  {
    id: "03",
    num: "03",
    title: "AI AUTOMATION",
    description:
      "Automated workflows that connect your business tools, eliminate repetitive work and save time.",
    icon: (
      <svg className="w-8 h-8 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
    ),
  },
  {
    id: "04",
    num: "04",
    title: "WEBSITES",
    description:
      "Modern, high-converting websites designed to create a strong digital presence and generate leads.",
    icon: (
      <svg className="w-8 h-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
  {
    id: "05",
    num: "05",
    title: "AI CALLING AGENTS",
    description:
      "AI voice agents that can handle customer calls, qualify leads, answer questions and automate conversations.",
    icon: (
      <svg className="w-8 h-8 text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
    ),
  },
];

export default function ServicesExperience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const cards = containerRef.current?.querySelectorAll(".service-glass-card");
    if (!cards) return;

    cards.forEach((card, idx) => {
      ScrollTrigger.create({
        trigger: card,
        start: "top center+=120",
        end: "bottom center-=120",
        onEnter: () => setActiveIndex(idx),
        onEnterBack: () => setActiveIndex(idx),
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section id="services" ref={containerRef} className="relative w-full z-10 py-24 sm:py-32 px-6 sm:px-12 lg:px-20 bg-[#030712] border-t border-white/5">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center space-y-4 pb-16">
        <span className="px-4 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
          MY SERVICES
        </span>
        <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
          AI SERVICES &{" "}
          <span className="bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
            SOLUTIONS
          </span>
        </h2>
        <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto font-medium leading-relaxed">
          AI-powered solutions designed to automate, connect and grow your business.
        </p>
      </div>

      {/* 5 Service Glass Cards */}
      <div className="max-w-4xl mx-auto space-y-16 sm:space-y-20">
        {servicesList.map((service, index) => {
          const isActive = activeIndex === index;

          return (
            <div
              key={service.id}
              className={`service-glass-card transition-all duration-500 relative rounded-3xl p-8 sm:p-10 border border-cyan-400/30 backdrop-blur-2xl bg-[#070b14]/80 shadow-[0_0_35px_rgba(0,240,255,0.12)] group ${
                isActive
                  ? "opacity-100 scale-100 border-cyan-400/60 shadow-[0_0_55px_rgba(0,240,255,0.25)]"
                  : "opacity-60 scale-98 hover:opacity-90"
              }`}
            >
              {/* Corner Frame Details */}
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/80 rounded-tr-3xl pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/80 rounded-bl-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-3 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm font-black text-cyan-400 tracking-widest">
                      {service.num}
                    </span>
                    <span className="w-8 h-[1px] bg-cyan-400/40" />
                  </div>

                  <h3 className="text-2xl sm:text-4xl font-black text-white tracking-wider uppercase">
                    {service.title}
                  </h3>

                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed font-medium">
                    {service.description}
                  </p>
                </div>

                {/* Minimal Icon Container */}
                <div className="shrink-0 w-14 h-14 rounded-2xl bg-white/5 border border-cyan-400/30 flex items-center justify-center shadow-[0_0_20px_rgba(0,240,255,0.15)] group-hover:scale-105 group-hover:border-cyan-400 transition-all duration-300">
                  {service.icon}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
