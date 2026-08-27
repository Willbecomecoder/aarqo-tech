"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function RobotVisual() {
  const robotContainerRef = useRef<HTMLDivElement>(null);
  const robotImageRef = useRef<HTMLDivElement>(null);

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
        className="relative w-full max-w-[440px] sm:max-w-[520px] lg:max-w-[620px] aspect-[4/3] flex items-center justify-center"
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
      </div>
    </div>
  );
}
