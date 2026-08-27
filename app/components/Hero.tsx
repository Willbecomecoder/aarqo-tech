"use client";

import Navbar from "./Navbar";
import HeroContent from "./HeroContent";
import RobotVisual from "./RobotVisual";

export default function Hero() {
  return (
    <section id="home" className="relative w-full min-h-screen min-h-[100svh] bg-transparent overflow-hidden flex flex-col justify-between select-none">
      {/* Layer 1: Fixed Transparent Top Navbar */}
      <Navbar />

      {/* Layer 2: Main Hero Container Overlaying Unified Point Cloud Background */}
      <div className="relative z-10 max-w-7xl mx-auto w-full flex-1 flex flex-col justify-center pt-24 sm:pt-28 pb-12 sm:pb-16 px-6 sm:px-12 my-auto">
        
        {/* DESKTOP LAYOUT (>= 768px): 2-Column Grid (45% Left Text Column, 55% Right Robot Column) */}
        <div className="hidden md:grid md:grid-cols-12 gap-8 items-center w-full">
          {/* Left Side Text Content */}
          <div className="md:col-span-6 lg:col-span-5 w-full">
            <HeroContent />
          </div>

          {/* Right Side Waving Robot */}
          <div className="md:col-span-6 lg:col-span-7 w-full flex justify-center lg:justify-end">
            <RobotVisual />
          </div>
        </div>

        {/* MOBILE LAYOUT (< 768px): Vertical Sequence (HI MY NAME IS SHIVANI -> Robot -> Description -> Buttons) */}
        <div className="md:hidden flex flex-col items-center justify-center text-center w-full">
          <HeroContent />
        </div>

      </div>
    </section>
  );
}
