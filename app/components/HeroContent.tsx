"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import RobotVisual from "./RobotVisual";

export default function HeroContent() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const robotWrapRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLHeadingElement>(null);
  const supportRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(
        headlineRef.current,
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.5, delay: 0.2 }
      )
        .fromTo(
          nameRef.current,
          { opacity: 0, scale: 0.95, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.6 },
          "-=0.2"
        )
        .fromTo(
          robotWrapRef.current,
          { opacity: 0, scale: 0.9, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.7 },
          "-=0.3"
        )
        .fromTo(
          subtitleRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.4"
        )
        .fromTo(
          supportRef.current,
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 0.4 },
          "-=0.2"
        )
        .fromTo(
          buttonsRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.5 },
          "-=0.2"
        );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex flex-col items-center md:items-start text-center md:text-left space-y-6 sm:space-y-8 z-20 w-full"
    >
      {/* ZONE 1 — INTRODUCTION (Top) */}
      <div className="space-y-1 sm:space-y-3 w-full text-center md:text-left">
        <h2
          ref={headlineRef}
          className="text-2xl sm:text-4xl lg:text-5xl font-black italic tracking-wide text-slate-100 uppercase opacity-0"
        >
          HI, MY NAME IS
        </h2>

        <h1
          ref={nameRef}
          className="text-5xl sm:text-8xl lg:text-9xl xl:text-[10rem] font-black tracking-tight uppercase bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(236,72,153,0.45)] opacity-0 leading-none inline-block whitespace-nowrap"
        >
          SHIVANI
        </h1>
      </div>

      {/* ZONE 2 — ROBOT EXPERIENCE (Center: ~55-60% Viewport Width Centerpiece) */}
      <div
        ref={robotWrapRef}
        className="md:hidden w-full max-w-[230px] sm:max-w-[280px] py-4 my-2 flex justify-center opacity-0"
      >
        <RobotVisual />
      </div>

      {/* ZONE 3 — BUSINESS MESSAGE & CTA BUTTONS (Bottom) */}
      <div className="space-y-4 max-w-2xl text-center md:text-left">
        <h3
          ref={subtitleRef}
          className="text-base sm:text-2xl lg:text-3xl font-extrabold text-gray-100 uppercase tracking-wide leading-snug opacity-0"
        >
          I BUILD AI-POWERED WEBSITES, AUTOMATIONS & INTELLIGENT DIGITAL SOLUTIONS.
        </h3>

        <p
          ref={supportRef}
          className="text-xs sm:text-base lg:text-lg text-gray-300 max-w-xl leading-relaxed font-medium opacity-0"
        >
          Helping businesses save time, automate work and grow with AI-powered systems.
        </p>

        {/* CTA Buttons (20-24px Horizontal Margin, Stacked on Mobile) */}
        <div
          ref={buttonsRef}
          className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 sm:gap-4 pt-4 w-full max-w-xs sm:max-w-none mx-auto md:mx-0 opacity-0"
        >
          {/* Primary Button */}
          <a
            href="#contact"
            className="w-full sm:w-auto text-center group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_25px_rgba(236,72,153,0.5)] hover:shadow-[0_0_40px_rgba(236,72,153,0.85)] hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>LET'S WORK TOGETHER</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>

          {/* Secondary Button */}
          <a
            href="#projects"
            className="w-full sm:w-auto text-center group relative inline-flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/5 backdrop-blur-md border border-white/20 hover:border-cyan-400/60 hover:bg-white/10 text-white font-bold text-xs sm:text-sm tracking-wider uppercase hover:-translate-y-0.5 transition-all duration-300"
          >
            <span>VIEW MY WORK</span>
            <svg
              className="w-4 h-4 text-cyan-400 group-hover:translate-x-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
