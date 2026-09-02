"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";

const MESSAGES = [
  "Hi! I'm your AI assistant.",
  "I automate work so you don't have to.",
  "Let's build something together.",
];

export default function RobotVisual() {
  const robotContainerRef = useRef<HTMLDivElement>(null);
  const robotImageRef = useRef<HTMLDivElement>(null);
  const [bubbleText, setBubbleText] = useState("");

  useEffect(() => {
    let i = 0;
    let m = 0;
    let deleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const message = MESSAGES[m];
      if (!deleting) {
        i++;
        setBubbleText(message.slice(0, i));
        if (i === message.length) {
          deleting = true;
          timeoutId = setTimeout(tick, 1500);
          return;
        }
        timeoutId = setTimeout(tick, 70);
      } else {
        i--;
        setBubbleText(message.slice(0, i));
        if (i === 0) {
          deleting = false;
          m = (m + 1) % MESSAGES.length;
          timeoutId = setTimeout(tick, 400);
          return;
        }
        timeoutId = setTimeout(tick, 35);
      }
    };

    timeoutId = setTimeout(tick, 1500);
    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial Entrance Animation
      gsap.fromTo(
        robotContainerRef.current,
        { opacity: 0, scale: 0.95, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.0,
          delay: 0.4,
          ease: "power3.out",
        }
      );

      // 2. Continuous Subtle Idle Floating & Rotation Animation
      gsap.to(robotImageRef.current, {
        y: -12,
        rotation: 0.8,
        duration: 3.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    }, robotContainerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={robotContainerRef}
      className="relative z-20 w-full flex items-center justify-center lg:justify-end opacity-0 pointer-events-auto select-none"
    >
      <div
        ref={robotImageRef}
        className="relative w-full max-w-[600px] sm:max-w-[760px] lg:max-w-[900px] aspect-[4/3] flex items-center justify-center"
      >
        {/* Soft Background Radial Glow Behind Robot */}
        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl opacity-60 animate-pulse pointer-events-none" />

        {/* Updated Waving AI Assistant Robot Asset */}
        <Image
          src="/robot-new-v2.png"
          alt="Shivani Waving AI Assistant Robot"
          width={650}
          height={650}
          priority
          unoptimized
          className="relative z-10 w-full h-auto object-contain drop-shadow-[0_0_40px_rgba(0,240,255,0.35)]"
        />

        <div
          className="absolute -top-[18%] -left-[30%] sm:-top-[10%] sm:-left-[28%] md:top-[21%] md:-left-[8%] lg:top-[22%] lg:-left-[6%] z-20 w-[170px] sm:w-[200px] md:w-[240px] rounded-2xl border border-orange-400/40 bg-white/10 backdrop-blur-md px-4 py-2.5 shadow-[0_0_25px_rgba(251,146,60,0.3)]"
        >
          <p className="font-display text-xs sm:text-sm font-medium text-white leading-snug min-h-[2.75em]">
            {bubbleText}
            <span className="animate-pulse text-orange-400 ml-0.5">|</span>
          </p>
          <div className="absolute -bottom-2 left-28 sm:left-32 md:left-32 lg:left-36 w-4 h-4 rotate-45 bg-white/10 border-b border-r border-orange-400/40 backdrop-blur-md" />
        </div>
      </div>
    </div>
  );
}
