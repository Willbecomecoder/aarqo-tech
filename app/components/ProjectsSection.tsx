"use client";

import { projects } from "@/lib/projects";
import ProjectCard from "./ProjectCard";

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
          {projects.filter((project) => project.featured).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              ctaHref={`/projects/${project.category}`}
              ctaLabel="SEE THE BUILD"
            />
          ))}
        </div>

      </div>
    </section>
  );
}
