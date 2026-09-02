import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({
  project,
  ctaHref,
  ctaLabel,
  showWorkflow = false,
}: {
  project: Project;
  ctaHref: string;
  ctaLabel: string;
  showWorkflow?: boolean;
}) {
  const isExternal = ctaHref.startsWith("http");

  return (
    <div className="bg-[#0B0F19]/70 backdrop-blur-2xl border border-white/10 hover:border-purple-500/50 rounded-3xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center transition-all duration-500 group shadow-2xl">
      {/* Left Column: Number & Title */}
      <div className="lg:col-span-7 space-y-4">
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm font-black text-purple-400 tracking-widest">
            PROJECT {project.number}
          </span>
          <span className="w-12 h-[1px] bg-purple-500/40" />
          <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">
            {project.categoryLabel}
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
        <Link
          href={ctaHref}
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          className="px-8 py-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-extrabold text-xs sm:text-sm tracking-wider uppercase shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.8)] hover:scale-105 transition-all duration-300 flex items-center gap-3"
        >
          <span>{ctaLabel}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>

      {showWorkflow && project.workflowImage && (
        <div className="lg:col-span-12 rounded-2xl overflow-hidden border border-white/10 bg-[#030712]">
          <Image
            src={project.workflowImage}
            alt={`${project.title} automation workflow`}
            width={1660}
            height={700}
            unoptimized
            className="w-full h-auto"
          />
        </div>
      )}
    </div>
  );
}
