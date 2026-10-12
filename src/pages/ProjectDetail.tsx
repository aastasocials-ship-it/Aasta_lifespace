import { useState } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Link, Navigate, useParams } from "react-router-dom";
import { InquiryDialog } from "@/components/InquiryDialog";
import { PROJECTS, getProject } from "@/data/projects";
import { Dialog, DialogContent } from "@/components/ui/dialog";

const Label = ({ children, light }: { children: React.ReactNode; light?: boolean }) => (
  <p className={`text-[10px] tracking-label uppercase ${light ? "text-copper-soft" : "text-copper"}`}>{children}</p>
);

const ProjectDetail = () => {
  const { slug } = useParams();
  const project = slug ? getProject(slug) : undefined;
  const [inquiryOpen, setInquiryOpen] = useState(false);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  if (!project) return <Navigate to="/projects" replace />;
  const related = PROJECTS.filter((item) => item.id !== project.id).slice(0, 2);
  const snapshot = [
    { label: "Project", value: project.name },
    { label: "Location", value: project.location },
    { label: "Type", value: project.type },
    ...(project.scope ? [{ label: "Scope", value: project.scope }] : []),
    ...project.additionalDetails,
    { label: "Status", value: project.status },
  ];
  const galleryGroups = project.gallery ?? [{ title: "Project gallery", images: project.galleryImages }];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 py-5 text-ivory lg:px-20"><Link to="/projects" className="inline-flex items-center gap-3 text-[10px] tracking-label uppercase text-ivory/80 hover:text-copper-soft"><ArrowLeft size={14} /> All projects</Link><button type="button" onClick={() => setInquiryOpen(true)} className="inline-flex items-center gap-2 border border-ivory/50 px-5 py-3 text-[10px] tracking-label uppercase text-ivory hover:border-copper-soft hover:text-copper-soft">Enquire now <ArrowUpRight size={13} /></button></header>

      {/* 1. Project overview */}
      <section className="relative flex min-h-[75vh] items-end overflow-hidden bg-ink px-6 py-16 lg:px-20 lg:py-24"><img src={project.coverImage} alt={`${project.name} in ${project.location}`} className="absolute inset-0 h-full w-full object-cover opacity-75" /><div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" /><div className="relative max-w-4xl text-ivory"><Label light>{project.location} · {project.type}</Label><h1 className="mt-6 font-display text-6xl leading-[.92] lg:text-8xl">{project.name}</h1>{project.scope && <p className="mt-6 text-sm tracking-wide text-ivory/75">{project.scope}</p>}</div></section>
      <section className="grid gap-16 px-6 py-24 lg:grid-cols-12 lg:px-20 lg:py-36"><div className="lg:col-span-7"><Label>Project overview</Label><h2 className="mt-7 font-display text-5xl leading-tight text-ink">{project.headline?.lead ?? "A space with a"} <span className="font-italic-serif text-copper">{project.headline?.accent ?? "point of view."}</span></h2><p className="mt-8 text-lg leading-relaxed text-ink-soft">{project.description}</p>{project.overview?.map((paragraph) => <p key={paragraph} className="mt-5 leading-relaxed text-ink-soft">{paragraph}</p>)}</div><dl className="lg:col-span-4 lg:col-start-9">{[{ label: "Location", value: project.location }, { label: "Project type", value: project.type }, ...(project.scope ? [{ label: "Scope", value: project.scope }] : []), ...project.additionalDetails].map((detail) => <div key={detail.label} className="flex justify-between gap-6 border-t border-ink/15 py-4 text-sm"><dt className="text-ink-soft">{detail.label}</dt><dd className="text-right text-ink">{detail.value}</dd></div>)}</dl></section>

      {/* 2–3. Vision & challenge */}
      {!!(project.vision || project.challenges?.length) && <section className="grid gap-16 border-t border-ink/10 bg-ivory-deep px-6 py-24 lg:grid-cols-2 lg:px-20 lg:py-32">
        {project.vision && <div><Label>The client's vision</Label><p className="mt-7 font-display text-3xl leading-snug text-ink lg:text-4xl">{project.vision}</p>{!!project.brief?.length && <ul className="mt-10 space-y-3">{project.brief.map((item) => <li key={item} className="flex gap-3 text-sm leading-relaxed text-ink-soft"><span className="text-copper">—</span>{item}</li>)}</ul>}</div>}
        {!!project.challenges?.length && <div><Label>The challenge</Label><ul className="mt-7 space-y-6">{project.challenges.map((challenge, index) => <li key={challenge.title} className="flex gap-5 border-t border-ink/15 pt-5"><span className="font-display text-2xl text-copper">0{index + 1}</span><div><h3 className="font-display text-xl text-ink">{challenge.title}</h3><p className="mt-2 text-sm leading-relaxed text-ink-soft">{challenge.text}</p></div></li>)}</ul></div>}
      </section>}

      {/* 4. Aasta's approach */}
      {!!project.approach?.length && <section className="px-6 py-24 lg:px-20 lg:py-32"><Label>Aasta's approach</Label><h2 className="mt-6 max-w-3xl font-display text-5xl leading-tight text-ink">How we <span className="font-italic-serif text-copper">resolved it.</span></h2>{project.approachIntro && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">{project.approachIntro}</p>}<div className="mt-14 grid gap-10 md:grid-cols-2 xl:grid-cols-3">{project.approach.map((step) => <div key={step.title} className="border-t border-ink/15 pt-6"><h3 className="font-display text-2xl text-ink">{step.title}</h3><p className="mt-3 text-sm leading-relaxed text-ink-soft">{step.text}</p></div>)}</div></section>}

      {/* 5. Highlights */}
      {!!project.highlights?.length && <section className="bg-ink px-6 py-24 text-ivory lg:px-20 lg:py-32"><Label light>Design & execution highlights</Label><h2 className="mt-6 max-w-3xl font-display text-5xl leading-tight">The decisions that <span className="font-italic-serif text-copper-soft">shaped it.</span></h2><ul className="mt-14 grid gap-x-10 gap-y-10 md:grid-cols-2 xl:grid-cols-3">{project.highlights.map((highlight) => <li key={highlight.title} className="border-t border-ivory/15 pt-6"><h3 className="font-display text-2xl text-ivory">{highlight.title}</h3><p className="mt-3 text-sm leading-relaxed text-ivory/70">{highlight.text}</p></li>)}</ul></section>}

      {/* 6. Transformation */}
      {!!project.transformation?.length && <section className="px-6 py-24 lg:px-20 lg:py-32"><Label>The transformation</Label><div className="mt-10 space-y-16">{project.transformation.map((pair) => <figure key={pair.caption}><div className="grid gap-4 md:grid-cols-2">{[pair.before, pair.after].map((image, index) => <div key={image} className="relative"><img src={image} alt={`${project.name} ${index ? "after" : "before"}`} loading="lazy" className="aspect-[4/3] w-full object-cover" /><span className="absolute left-4 top-4 bg-ivory px-3 py-1.5 text-[10px] tracking-label uppercase text-ink">{index ? pair.afterLabel ?? "After" : pair.beforeLabel ?? "Before"}</span></div>)}</div><figcaption className="mt-4 text-sm text-ink-soft">{pair.caption}</figcaption></figure>)}</div></section>}

      {/* 7–8. Outcome & client experience */}
      {!!(project.outcome?.length || project.testimonial) && <section className="grid gap-16 border-t border-ink/10 px-6 py-24 lg:grid-cols-2 lg:px-20 lg:py-32">
        {!!project.outcome?.length && <div><Label>The outcome</Label><ul className="mt-7 space-y-4">{project.outcome.map((item) => <li key={item.title} className="border-t border-ink/15 pt-4"><h3 className="font-display text-xl text-ink">{item.title}</h3><p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{item.text}</p></li>)}</ul></div>}
        {project.testimonial && <blockquote><Label>Client experience</Label><p className="mt-7 font-italic-serif text-3xl leading-snug text-ink">“{project.testimonial.quote}”</p><footer className="mt-6 text-[10px] tracking-label uppercase text-ink-soft">— {project.testimonial.author}, {project.name}</footer></blockquote>}
      </section>}

      {/* Ongoing projects: dated site progress */}
      {!!project.updates?.length && <section className="border-t border-ink/10 px-6 py-24 lg:px-20 lg:py-32"><Label>Construction progress</Label><h2 className="mt-6 font-display text-5xl leading-tight text-ink">On site, <span className="font-italic-serif text-copper">stage by stage.</span></h2><ol className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">{project.updates.map((update) => <li key={update.title}><button type="button" onClick={() => setActiveImage(update.image)} className="group block w-full overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"><img src={update.image} alt={`${project.name} — ${update.title}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></button><p className="mt-4 text-[10px] tracking-label uppercase text-copper">{update.date}</p><h3 className="mt-1 font-display text-xl text-ink">{update.title}</h3>{update.text && <p className="mt-2 text-sm leading-relaxed text-ink-soft">{update.text}</p>}</li>)}</ol></section>}

      {/* 9. Gallery */}
      {!project.updates?.length && <section className="px-6 pb-24 lg:px-20 lg:pb-36">{galleryGroups.map((group) => <div key={group.title} className="pt-16"><Label>{group.title}</Label>{group.caption && <p className="mt-4 max-w-2xl text-ink-soft">{group.caption}</p>}<div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{group.images.map((image, index) => <button key={image} type="button" onClick={() => setActiveImage(image)} className="group block overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-copper"><img src={image} alt={`${project.name} ${group.title.toLowerCase()} ${index + 1}`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></button>)}</div></div>)}</section>}

      {/* 10. Snapshot */}
      <section className="border-t border-ink/10 bg-ivory-deep px-6 py-24 lg:px-20 lg:py-32"><Label>Project snapshot</Label><dl className="mt-10 grid gap-x-12 md:grid-cols-2">{snapshot.map((detail) => <div key={detail.label} className="flex justify-between gap-6 border-t border-ink/15 py-4 text-sm"><dt className="text-ink-soft">{detail.label}</dt><dd className="text-right text-ink">{detail.value}</dd></div>)}</dl></section>

      {/* 11. Closing CTA */}
      <section className="bg-ink px-6 py-24 text-ivory lg:px-20 lg:py-32"><div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end"><div><Label light>Architecture • Construction • Interiors</Label><h2 className="mt-6 max-w-3xl font-display text-5xl lg:text-6xl">Planning a home or commercial space?</h2><p className="mt-5 text-ivory/70">Talk to Aasta Lifespace about your project.</p></div><button type="button" onClick={() => setInquiryOpen(true)} className="group inline-flex items-center gap-3 bg-copper px-7 py-4 text-[10px] tracking-label uppercase text-ivory hover:bg-copper-soft">Enquire now <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button></div></section>

      <section className="px-6 py-24 lg:px-20 lg:py-32"><Label>More from Aasta</Label><div className="mt-8 grid gap-10 md:grid-cols-2">{related.map((item) => <Link key={item.id} to={`/projects/${item.slug}`} className="group"><img src={item.coverImage} alt={item.name} className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]" /><h3 className="mt-5 font-display text-3xl text-ink">{item.name}</h3><p className="mt-2 text-[10px] tracking-label uppercase text-copper">{item.location}</p></Link>)}</div></section>
      <Dialog open={activeImage !== null} onOpenChange={(open) => !open && setActiveImage(null)}><DialogContent className="max-w-[96vw] border-0 bg-ink/95 p-0 [&>button]:bg-ivory [&>button]:text-ink">{activeImage && <img src={activeImage} alt={`${project.name} enlarged view`} className="max-h-[85vh] w-full object-contain" />}</DialogContent></Dialog>
      <InquiryDialog open={inquiryOpen} onOpenChange={setInquiryOpen} projectName={project.name} />
    </main>
  );
};

export default ProjectDetail;
