import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InquiryDialog } from "@/components/InquiryDialog";
import { PROJECTS, Project } from "@/data/projects";

const ProjectCard = ({ project, onInquiry }: { project: Project; onInquiry: (project: Project) => void }) => (
  <article className="group">
    <div className="relative aspect-[4/3] overflow-hidden bg-ink">
      <Link to={`/projects/${project.slug}`} aria-label={`View ${project.name}`}>
        <img src={project.coverImage} alt={`${project.name} in ${project.location}`} loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-105" />
      </Link>
      {/* Permanent scrim so the title and buttons stay readable on any photo */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent" />
      <div className="absolute left-5 top-5 bg-ivory/90 px-3 py-1.5 text-[9px] tracking-label uppercase text-ink">{project.type}</div>
      <div className="absolute inset-x-0 bottom-0 p-5">
        <p className="text-[10px] tracking-label uppercase text-copper-soft">{project.location}</p>
        <h3 className="mt-1.5 font-display text-2xl text-ivory lg:text-3xl">{project.name}</h3>
        <div className="mt-4 flex flex-wrap gap-2">
          <Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 bg-ivory px-4 py-2.5 text-[10px] tracking-label uppercase text-ink transition-colors hover:bg-copper hover:text-ivory">View more <ArrowUpRight size={13} /></Link>
          <button type="button" onClick={() => onInquiry(project)} className="inline-flex items-center gap-2 border border-ivory/70 px-4 py-2.5 text-[10px] tracking-label uppercase text-ivory transition-colors hover:border-copper-soft hover:bg-copper hover:text-ivory">Contact us <ArrowUpRight size={13} /></button>
        </div>
      </div>
    </div>
    <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-soft">{project.shortDescription}</p>
  </article>
);

export const ProjectsCarousel = ({ limit }: { limit?: number }) => {
  const [inquiryProject, setInquiryProject] = useState<Project | null>(null);
  const projects = limit ? PROJECTS.slice(0, limit) : PROJECTS;
  return (
    <>
      <div className="mt-20 grid gap-x-6 gap-y-14 md:grid-cols-2 xl:grid-cols-3">{projects.map((project) => <ProjectCard key={project.id} project={project} onInquiry={setInquiryProject} />)}</div>
      <InquiryDialog key={inquiryProject?.id ?? "general"} open={inquiryProject !== null} onOpenChange={(open) => !open && setInquiryProject(null)} projectName={inquiryProject?.name} />
    </>
  );
};
