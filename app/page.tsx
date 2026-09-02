"use client";

import dynamic from "next/dynamic";
import Hero from "./components/Hero";
import FAQSection from "./components/FAQSection";

// Lazy load below-the-fold heavy components for instant initial page load!
const MorphingParticleCanvas = dynamic(
  () => import("./components/MorphingParticleCanvas"),
  { ssr: false }
);

const ServicesExperience = dynamic(
  () => import("./components/ServicesExperience"),
  { ssr: false }
);

const ProjectsSection = dynamic(
  () => import("./components/ProjectsSection"),
  { ssr: false }
);

const ContactSection = dynamic(
  () => import("./components/ContactSection"),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="w-full bg-[#030712] text-white relative overflow-hidden select-none">
      {/* 1. Instant Above-The-Fold Hero Render */}
      <Hero />

      {/* 2. Persistent WebGL Morphing Particle Canvas (Lazy Loaded) */}
      <MorphingParticleCanvas />

      {/* 3. Services Experience (Lazy Loaded 5-Service Storytelling) */}
      <ServicesExperience />

      {/* 4. Projects Section (Lazy Loaded Showcase) */}
      <ProjectsSection />

      {/* 4.5. FAQ Section (SEO FAQPage schema) */}
      <FAQSection />

      {/* 5. Contact Section (Lazy Loaded Form & Server Email API) */}
      <ContactSection />
    </main>
  );
}