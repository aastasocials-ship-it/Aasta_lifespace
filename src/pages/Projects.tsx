import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { InquiryDialog } from "@/components/InquiryDialog";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import { StartProjectBand } from "@/components/StartProjectBand";
import { ONGOING_PROJECTS } from "@/data/projects";

const Projects = () => {
  const [inquiryOpen, setInquiryOpen] = useState(false);
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5 lg:px-20"><Link to="/" className="inline-flex items-center gap-3 text-[10px] tracking-label uppercase text-ink-soft hover:text-copper"><ArrowLeft size={14} /> Back to Aasta</Link><nav className="flex items-center gap-6"><Link to="/blog" className="hidden text-[10px] tracking-label uppercase text-ink-soft hover:text-copper sm:inline">Blog</Link><button type="button" onClick={() => setInquiryOpen(true)} className="inline-flex items-center gap-2 bg-ink px-5 py-3 text-[10px] tracking-label uppercase text-ivory hover:bg-copper">Contact us <ArrowUpRight size={13} /></button></nav></header>
      <section className="px-6 py-24 lg:px-20 lg:py-36"><p className="text-[10px] tracking-label uppercase text-copper">Aasta Lifespace · 05</p><h1 className="mt-8 max-w-4xl font-display text-6xl leading-[.95] text-ink lg:text-8xl">Places made with <span className="font-italic-serif text-copper">purpose.</span></h1><p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft">A selection of residences and spaces shaped by careful planning, considered materials, and the everyday lives they hold.</p><ProjectsCarousel /></section>
      <section className="border-t border-ink/10 bg-ivory-deep px-6 py-24 lg:px-20 lg:py-32"><p className="text-[10px] tracking-label uppercase text-copper">Live work</p><div className="mt-6 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h2 className="max-w-2xl font-display text-5xl leading-tight text-ink">Ongoing <span className="font-italic-serif text-copper">projects.</span></h2><p className="max-w-sm text-sm leading-relaxed text-ink-soft">Projects currently on site, with dated construction photographs at every stage.</p></div>{ONGOING_PROJECTS.length > 0 && <div className="mt-14 grid gap-8 md:grid-cols-2">{ONGOING_PROJECTS.map((project) => <div key={project.id} className="bg-background p-5"><img src={project.coverImage} alt={project.name} className="aspect-[4/3] w-full object-cover" /><h3 className="mt-5 font-display text-2xl text-ink">{project.name}</h3><p className="mt-2 text-sm text-ink-soft">{project.location} · {project.type}</p><p className="mt-4 text-xs uppercase tracking-label text-copper">{project.status}</p>{project.progress && <p className="mt-3 text-sm text-ink-soft">{project.progress}</p>}<div className="mt-6 flex flex-wrap gap-3"><Link to={`/projects/${project.slug}`} className="inline-flex items-center gap-2 bg-ink px-4 py-3 text-[10px] tracking-label uppercase text-ivory hover:bg-copper">View progress <ArrowUpRight size={13} /></Link><button type="button" onClick={() => setInquiryOpen(true)} className="inline-flex items-center gap-2 border border-ink/30 px-4 py-3 text-[10px] tracking-label uppercase text-ink hover:border-copper hover:text-copper">Enquire now <ArrowUpRight size={13} /></button></div></div>)}</div>}</section>
      <StartProjectBand title="Planning a home or commercial space?" accent="Start a new project with us." />
      <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} />
    </main>
  );
};

export default Projects;
