import Link from "next/link";
import { notFound } from "next/navigation";
import ProjectCard from "@/app/components/ProjectCard";
import { categoryNames, projects, type ProjectCategory } from "@/lib/projects";

export function generateStaticParams() {
  return Object.keys(categoryNames).map((category) => ({ category }));
}

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const name = categoryNames[category as ProjectCategory];
  if (!name) return {};

  return {
    title: `${name} Builds | AarqoTech`,
    description: `AI automation and ${name.toLowerCase()} projects built by AarqoTech for hospitality and beauty businesses.`,
  };
}

export default async function CategoryProjectsPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const name = categoryNames[category as ProjectCategory];
  if (!name) notFound();

  const categoryProjects = projects.filter((project) => project.category === category);

  return (
    <main className="w-full bg-[#030712] text-white relative overflow-hidden">
      <section className="relative w-full py-28 px-6 sm:px-12 lg:px-20 z-10 bg-[#030712]">
        <div className="max-w-7xl mx-auto space-y-20">
          {/* Section Header */}
          <div className="text-center space-y-4 max-w-3xl mx-auto">
            <span className="px-4 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-400 font-extrabold text-xs tracking-widest uppercase backdrop-blur-md">
              Featured Systems
            </span>
            <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight uppercase">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 bg-clip-text text-transparent">
                {name}
              </span>{" "}
              BUILDS
            </h2>
            <p className="text-base sm:text-lg text-gray-400 font-medium">
              {`Every ${name.toLowerCase()} project we've shipped, in one place.`}
            </p>
          </div>

          {/* Projects Stack */}
          {categoryProjects.length > 0 ? (
            <div className="space-y-12">
              {categoryProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  ctaHref={project.liveUrl ?? "/#contact"}
                  ctaLabel={project.liveUrl ? "VISIT LIVE SITE" : "ENQUIRE ABOUT THIS BUILD"}
                  showWorkflow
                />
              ))}
            </div>
          ) : (
            <p className="text-base sm:text-lg text-gray-400 font-medium text-center">
              More builds coming soon.
            </p>
          )}

          <div className="text-center">
            <Link
              href="/#projects"
              className="text-xs font-extrabold uppercase tracking-widest text-cyan-400 hover:text-white transition-colors"
            >
              ← Back to all projects
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
