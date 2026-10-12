import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  Check,
  Quote,
  MessageCircle,
  Upload,
  Facebook,
  Instagram,
} from "lucide-react";
import { SideRail } from "@/components/SideRail";
import { Reveal } from "@/components/Reveal";
import { FloatTitle } from "@/components/FloatTitle";
import { CostEstimator, CostEstimatorHandle } from "@/components/CostEstimator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

import about2 from "@/assets/about-2.jpg";
import { ProjectsCarousel } from "@/components/ProjectsCarousel";
import logo from "@/assets/aasta-logo.png";
import { PROJECTS } from "@/data/projects";
import arte02 from "@/assets/arte-02.jpg";
import wilson03 from "@/assets/wilson-03.jpg";
import kalyan01 from "@/assets/kalyan-01.jpg";
import prestigeInt01 from "@/assets/prestige-int-01.jpg";
import hero from "@/assets/prestige-ext-02.jpg";
import philosophyImg from "@/assets/prestige-terrace-01.jpg";
import wilson13 from "@/assets/wilson-13.jpg";
import prestigeInt03 from "@/assets/prestige-int-03.jpg";
import kalyan14 from "@/assets/kalyan-14.jpg";
import { Link } from "react-router-dom";
import { StartProjectBand } from "@/components/StartProjectBand";
import { PROJECT_TYPES, sendLead } from "@/components/InquiryDialog";
import { fileToBase64, sendForm } from "@/lib/send-form";

const SectionLabel = ({
  index,
  children,
}: {
  index: string;
  children: string;
}) => (
  <div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper">
    <span className="h-px w-6 bg-copper" />
    <span>
      {index} · {children}
    </span>
  </div>
);

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  if (!el) return;
  const offset = window.innerWidth >= 1024 ? 0 : 72;
  window.scrollTo({
    top: el.getBoundingClientRect().top + window.scrollY - offset,
    behavior: "smooth",
  });
};

const Hero = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    // Parallax is desktop-only: it forces continuous repaints of a full-screen
    // image, which is the single biggest scroll-jank source on phones.
    const enabled =
      window.innerWidth >= 1024 &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!enabled) return;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrollY(window.scrollY);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      id="home"
      className="relative min-h-screen w-full overflow-hidden vignette"
    >
      <img
        src={hero}
        alt="Garden villa at Prestige Laughing Waters, built by Aasta Lifespace"
        width={1800}
        height={1200}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
        style={{ transform: `translateY(${scrollY * 0.3}px) scale(1.1)` }}
      />

      {/* Legibility scrim: dark gradient bottom-left so headline text reads cleanly */}
      <div className="absolute inset-0 bg-gradient-to-tr from-ink/85 via-ink/55 to-ink/10" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
      <div className="relative z-10 flex min-h-screen flex-col justify-end px-6 pb-20 lg:px-20 lg:pb-28">
        <Reveal>
          <p className="mb-6 text-[10px] tracking-label uppercase text-ivory/80">
            Aasta Lifespace · Est. 1984
          </p>
        </Reveal>
        <Reveal delay={150}>
          <FloatTitle
            as="h1"
            className="font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[1.02] text-ivory"
            fromX={-160}
          >
            Leading{" "}
            <span className="font-italic-serif text-copper-soft">
              Construction Company
            </span>{" "}
            in Bangalore for Homes, Villas & Commercial Projects
          </FloatTitle>
        </Reveal>
        <Reveal delay={350}>
          <p className="mt-8 max-w-2xl text-base lg:text-lg text-ivory/80 leading-relaxed">
            From architectural design and construction to complete interiors,
            Aasta Lifespace creates homes, villas, and commercial spaces that
            are thoughtfully designed, expertly built, and made to last for
            generations.
          </p>
        </Reveal>
        <Reveal delay={450}>
          <p className="mt-5 max-w-2xl text-sm lg:text-base text-ivory/60 leading-relaxed">
            40+ years of experience. End-to-end execution. One trusted team for
            Architecture, Construction, Interiors, and Project Management.
          </p>
        </Reveal>
        <Reveal delay={600}>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToId("contact")}
              className="group inline-flex items-center gap-3 bg-copper px-7 py-4 text-[10px] tracking-label uppercase text-ivory transition-all hover:bg-copper-soft hover:-translate-y-0.5"
            >
              Start Your Project
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
            <button
              onClick={() => scrollToId("projects")}
              className="group inline-flex items-center gap-3 border border-ivory/40 px-7 py-4 text-[10px] tracking-label uppercase text-ivory transition-all hover:border-copper-soft hover:text-copper-soft"
            >
              View Our Work
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </div>
        </Reveal>
        <Reveal
          delay={750}
          className="mt-12 flex items-center gap-3 text-ivory/70"
        >
          <ArrowDown size={16} className="animate-bounce" />
          <span className="text-[10px] tracking-label uppercase">Scroll</span>
        </Reveal>
      </div>
    </section>
  );
};

const ABOUT_IMAGES = [
  { image: wilson13, label: "Architecture", caption: "Designed around the site", alt: "Balconies of ARTE Homes among palm trees", span: "lg:col-span-6" },
  { image: prestigeInt03, label: "Interiors", caption: "Finished, ready to live in", alt: "Daylit living room of a villa by Aasta Lifespace", span: "lg:col-span-3" },
  { image: kalyan14, label: "Construction", caption: "Built to last", alt: "Kalyan Nagar building lit at night", span: "lg:col-span-3" },
];

const About = () => (
  <section id="about" className="relative px-6 py-20 lg:px-20 lg:py-28">
    <div className="grid gap-10 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionLabel index="01">About Us</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Four Decades of
            <br />
            <span className="font-italic-serif text-copper">
              Building Trust.
            </span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7 space-y-6 text-ink-soft text-base lg:text-[17px] leading-relaxed">
        <Reveal>
          <p>
            Since 1984, Aasta Lifespace has been creating homes and spaces that
            reflect the people who live in them.
          </p>
        </Reveal>
        <Reveal delay={120}>
          <p>
            What began as a passion for quality construction has evolved into a
            multidisciplinary practice offering Architecture, Construction,
            Interiors, and Turnkey Project Execution.
          </p>
        </Reveal>
        <Reveal delay={240}>
          <p>
            Over the last four decades, we have helped families build homes,
            businesses create workspaces, and investors develop projects that
            stand the test of time.
          </p>
        </Reveal>
        <Reveal delay={360}>
          <p>
            While materials, technologies, and design trends have changed, our
            commitment remains the same:{" "}
            <span className="text-ink">
              to build every project with integrity, attention to detail, and
              complete accountability.
            </span>
          </p>
        </Reveal>
        <Reveal delay={480}>
          <h1 className="new_text mt-4 text-xl lg:text-2xl font-medium leading-snug text-ink">
            Leading Construction Company in Bangalore for Homes, Villas &
            Commercial Projects
          </h1>
        </Reveal>
      </div>
    </div>

    <div className="mt-14 grid gap-4 lg:grid-cols-12">
      {ABOUT_IMAGES.map((item, i) => (
        <Reveal key={item.label} delay={i * 120} className={item.span}>
          <figure className="group relative h-full overflow-hidden">
            <img src={item.image} alt={item.alt} loading="lazy" className="h-full min-h-[260px] w-full object-cover transition-transform duration-[1200ms] group-hover:scale-105 lg:min-h-[340px]" />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-ivory">
              <p className="text-[10px] tracking-label uppercase text-copper-soft">{item.label}</p>
              <p className="mt-1 font-display text-xl">{item.caption}</p>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);

const Vision = () => (
  <section
    id="vision"
    className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44"
  >
    <div className="mx-auto max-w-3xl text-center">
      <Reveal>
        <div className="inline-flex items-center gap-3 text-[10px] tracking-label uppercase text-copper">
          <span className="h-px w-6 bg-copper" />
          02 · Our Vision
          <span className="h-px w-6 bg-copper" />
        </div>
      </Reveal>
      <Reveal delay={120}>
        <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
          Creating Spaces That
          <br />
          <span className="font-italic-serif text-copper">Enrich Life.</span>
        </FloatTitle>
      </Reveal>
      <Reveal delay={240}>
        <p className="mt-10 text-ink-soft text-lg leading-relaxed">
          We believe every space should be more than a structure. It should
          inspire, support, and evolve with the people who use it. Our goal is
          to create homes and environments that balance design, functionality,
          sustainability, and long-term value.
        </p>
      </Reveal>
    </div>
  </section>
);

const SERVICES = [
  {
    n: "01",
    title: "Architecture & Design",
    body: "Thoughtfully planned spaces designed around your lifestyle, site conditions, natural light, ventilation, and future needs.",
    items: [
      "Architectural Design",
      "Space Planning",
      "3D Visualization",
      "Structural Planning",
      "Authority Approvals",
    ],
    image: arte02,
  },
  {
    n: "02",
    title: "Construction",
    body: "Built with engineering precision, quality materials, and experienced supervision from foundation to handover.",
    items: [
      "Residential Construction",
      "Villas & Farmhouses",
      "Commercial Buildings",
      "Structural Engineering",
      "Quality Control",
    ],
    image: wilson03,
  },
  {
    n: "03",
    title: "Design & Build",
    body: "A single team managing your project from concept to completion. No coordination hassles. No communication gaps. No compromise between design and execution.",
    items: [],
    image: kalyan01,
  },
  {
    n: "04",
    title: "Turnkey Interiors",
    body: "Complete interior solutions delivered ready to move in.",
    items: [
      "Modular Kitchens",
      "Custom Furniture",
      "Wardrobes",
      "Lighting Design",
      "False Ceilings",
      "Soft Furnishings",
    ],
    image: prestigeInt01,
  },
];

const Services = () => (
  <section id="services" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionLabel index="03">Our Services</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Everything your project needs.
            <br />
            <span className="font-italic-serif text-copper">
              Under one roof.
            </span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="hairline mb-2" />
        {SERVICES.map((s, i) => (
          <Reveal key={s.n} delay={i * 120}>
            <div className="group grid grid-cols-12 gap-6 py-10 transition-colors">
              <div className="col-span-12 overflow-hidden md:col-span-4">
                <img src={s.image} alt={`${s.title} project work`} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="col-span-12 md:col-span-8">
                <span className="font-display text-2xl text-copper">{s.n}</span>
                <h3 className="font-display text-3xl lg:text-4xl text-ink transition-transform duration-500 group-hover:translate-x-2">
                  {s.title}
                </h3>
                <p className="mt-3 text-ink-soft leading-relaxed">{s.body}</p>
                {s.items.length > 0 && (
                  <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                    {s.items.map((it) => (
                      <li
                        key={it}
                        className="flex items-start gap-2 text-sm text-ink-soft"
                      >
                        <span className="mt-2 h-px w-3 shrink-0 bg-copper" />
                        <span>{it}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
            <div className="hairline" />
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

const WHY = [
  {
    n: "01",
    title: "40+ Years of Experience",
    body: "A legacy built on trust, quality, and long-standing client relationships.",
  },
  {
    n: "02",
    title: "End-to-End Execution",
    body: "Architecture, construction, interiors, and project management under one team.",
  },
  {
    n: "03",
    title: "Transparent Process",
    body: "Clear timelines, detailed budgets, and regular progress updates.",
  },
  {
    n: "04",
    title: "Quality First Approach",
    body: "We focus on craftsmanship, materials, and details that create lasting value.",
  },
  {
    n: "05",
    title: "Personalized Design",
    body: "Every project is tailored to the people who will live and work within it.",
  },
  {
    n: "06",
    title: "On-Time Delivery",
    body: "Structured planning and disciplined execution ensure projects stay on track.",
  },
];

const DIFFERENCE = [
  { topic: "Who you deal with", usual: "Separate architect, contractor and interior designer — you coordinate between them.", aasta: "One team and one point of contact from first sketch to handover." },
  { topic: "Design vs. site", usual: "Drawings are handed over and interpreted on site, often with changes nobody planned for.", aasta: "The people who design it also build it, so the design intent carries through to the finished space." },
  { topic: "Budget", usual: "Separate quotes that rarely add up to the real total; surprises arrive mid-way.", aasta: "An itemised estimate up front, with every change documented and agreed before work proceeds." },
  { topic: "Accountability", usual: "When something goes wrong, each party points to another.", aasta: "One firm is responsible for the whole outcome — no blame-shifting." },
  { topic: "Interiors", usual: "Planned after construction, leading to broken walls and re-routed wiring.", aasta: "Planned alongside construction, so electrical, plumbing and joinery fit first time." },
  { topic: "Progress", usual: "You visit the site to find out what is happening.", aasta: "Regular updates with site photographs at every stage." },
  { topic: "Experience", usual: "Varies from project to project.", aasta: "Four decades of building homes and spaces since 1984." },
];

const WhyChoose = () => (
  <section
    id="why"
    className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44"
  >
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Reveal>
          <SectionLabel index="04">Why Choose Aasta</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Why families choose
            <br />
            <span className="font-italic-serif text-copper">
              Aasta Lifespace.
            </span>
          </FloatTitle>
        </Reveal>
      </div>
    </div>
    <div className="mt-20 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {WHY.map((w, i) => (
        <Reveal key={w.n} delay={(i % 3) * 120}>
          <div className="border-t border-ink/15 pt-6">
            <span className="font-display text-3xl text-copper">{w.n}</span>
            <h3 className="mt-3 font-display text-2xl text-ink">{w.title}</h3>
            <p className="mt-3 text-ink-soft leading-relaxed">{w.body}</p>
          </div>
        </Reveal>
      ))}
    </div>

    <div className="mt-24">
      <Reveal>
        <h3 className="font-display text-3xl lg:text-5xl leading-tight text-ink">How Aasta is <span className="font-italic-serif text-copper">different.</span></h3>
        <p className="mt-4 max-w-2xl text-ink-soft leading-relaxed">Most projects are split between an architect, a contractor and an interior designer — and the gaps between them are where budgets slip and timelines stretch. Here is what changes when one team owns it all.</p>
      </Reveal>
      <Reveal delay={120}>
        <div className="mt-10 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr className="text-[10px] tracking-label uppercase">
                <th className="w-1/4 border-b border-ink/20 py-4 pr-6 font-normal text-ink-soft"><span className="sr-only">Topic</span></th>
                <th className="w-[37.5%] border-b border-ink/20 py-4 pr-6 font-normal text-ink-soft">The usual way</th>
                <th className="w-[37.5%] border-b border-copper bg-ivory px-5 py-4 font-normal text-copper">With Aasta</th>
              </tr>
            </thead>
            <tbody>
              {DIFFERENCE.map((row) => (
                <tr key={row.topic}>
                  <td className="border-b border-ink/10 py-5 pr-6 font-display text-lg text-ink">{row.topic}</td>
                  <td className="border-b border-ink/10 py-5 pr-6 text-ink-soft leading-relaxed">{row.usual}</td>
                  <td className="border-b border-ink/10 bg-ivory px-5 py-5 text-ink leading-relaxed"><Check size={14} className="mr-2 inline text-copper" />{row.aasta}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Reveal>
    </div>
  </section>
);

const Projects = () => (
  <section id="projects" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionLabel index="05">Projects</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Real spaces.
            <br />
            <span className="font-italic-serif text-copper">Real stories.</span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7 self-end space-y-5 text-ink-soft text-base lg:text-lg leading-relaxed">
        <Reveal delay={200}>
          <p>
            Every project we undertake reflects a unique vision, site, and
            family. Our portfolio spans residences, luxury villas, commercial
            spaces, renovations, and turnkey developments across India.
          </p>
        </Reveal>
        <Reveal delay={320}>
          <p>
            Each one built with the same commitment to quality, functionality,
            and enduring design.
          </p>
        </Reveal>
      </div>
    </div>

    <ProjectsCarousel limit={3} />
    <div className="mt-14 flex justify-center">
      <Link to="/projects" className="group inline-flex items-center gap-3 border border-ink/30 px-7 py-4 text-[10px] tracking-label uppercase text-ink transition-colors hover:border-copper hover:bg-copper hover:text-ivory">View all projects <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></Link>
    </div>
  </section>
);

const STATS = [
  { value: "40+", label: "Years of Experience" },
  { value: "125+", label: "Projects Completed" },
  { value: "16 Lakh+", label: "Sq. Ft. Delivered" },
  { value: "4+", label: "Cities Served" },
];

const Stats = () => (
  <section
    id="stats"
    className="relative bg-ink text-ivory px-6 py-24 lg:px-20 lg:py-32"
  >
    <div className="grid grid-cols-2 gap-y-12 gap-x-8 lg:grid-cols-4">
      {STATS.map((s, i) => (
        <Reveal key={s.label} delay={i * 120}>
          <div>
            <p className="font-display text-5xl lg:text-7xl text-copper-soft">
              {s.value}
            </p>
            <p className="mt-3 text-[10px] tracking-label uppercase text-ivory/60">
              {s.label}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const STEPS = [
  {
    n: "01",
    title: "Discovery",
    body: "Understanding your vision, lifestyle, budget, and site.",
  },
  {
    n: "02",
    title: "Design",
    body: "Creating architectural concepts, layouts, and detailed plans.",
  },
  {
    n: "03",
    title: "Planning",
    body: "Finalizing materials, budgets, timelines, and approvals.",
  },
  {
    n: "04",
    title: "Construction",
    body: "Executing with expert supervision and quality control.",
  },
  {
    n: "05",
    title: "Interior Completion",
    body: "Bringing spaces to life through finishes and custom details.",
  },
  {
    n: "06",
    title: "Handover",
    body: "A complete, ready-to-use space delivered with confidence.",
  },
];

const Approach = () => (
  <section
    id="approach"
    className="relative bg-ink text-ivory px-6 py-32 lg:px-20 lg:py-44"
  >
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper-soft">
            <span className="h-px w-6 bg-copper-soft" />
            06 · Process
          </div>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05]">
            Your journey
            <br />
            <span className="font-italic-serif text-copper-soft">
              with Aasta.
            </span>
          </FloatTitle>
        </Reveal>
      </div>
    </div>

    <div className="mt-20 grid gap-x-12 gap-y-16 lg:grid-cols-2">
      {STEPS.map((s, i) => (
        <Reveal
          key={s.n}
          delay={(i % 2) * 150}
          className={i % 2 === 1 ? "lg:mt-24" : ""}
        >
          <div className="border-t border-ivory/15 pt-8">
            <div className="flex items-baseline justify-between">
              <span className="text-[10px] tracking-label uppercase text-ivory/50">
                Step {s.n}
              </span>
              <span className="font-display text-7xl lg:text-8xl text-copper-soft/40">
                {s.n}
              </span>
            </div>
            <h3 className="mt-4 font-display text-3xl lg:text-4xl">
              {s.title}
            </h3>
            <p className="mt-4 max-w-md text-ivory/70 leading-relaxed">
              {s.body}
            </p>
          </div>
        </Reveal>
      ))}
    </div>
  </section>
);

const Founder = () => (
  <section id="founder" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-5">
        <div className="overflow-hidden">
          <img
            src={about2}
            alt="Founder of Aasta Lifespace"
            loading="lazy"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </Reveal>
      <div className="lg:col-span-6 lg:col-start-7 self-center">
        <Reveal>
          <SectionLabel index="07">Founder's Message</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-5xl leading-[1.05] text-ink">
            A journey that began
            <br />
            <span className="font-italic-serif text-copper">in 1984.</span>
          </FloatTitle>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 space-y-5 text-ink-soft text-base lg:text-[17px] leading-relaxed">
            <p>
              When we began Aasta Lifespace in 1984, our intent was simple: to
              build the kind of homes we would be proud to live in ourselves.
            </p>
            <p>
              Four decades on, that intent has not changed. Every wall raised,
              every detail chosen, every handover delivered carries the same
              care we placed in our very first project.
            </p>
            <p>
              We are grateful to the families and businesses who have trusted us
              across generations, and equally excited about the spaces still to
              come.
            </p>
          </div>
        </Reveal>
        <Reveal delay={360}>
          <p className="mt-8 font-italic-serif text-2xl text-copper">
            – The Founder, Aasta Lifespace
          </p>
        </Reveal>
      </div>
    </div>
  </section>
);

const TIERS = [
  {
    key: "essential",
    name: "Essential",
    tag: "Considered construction",
    price: "₹1,850",
    unit: "per sq. ft.",
    body: "A refined turnkey foundation for those seeking quiet quality without compromise.",
    features: [
      "Structural design & construction",
      "Standard premium finishes",
      "Project management",
      "12-month warranty",
      "Quarterly progress reviews",
    ],
    featured: false,
  },
  {
    key: "signature",
    name: "Signature",
    tag: "Design and build, as one",
    price: "₹2,650",
    unit: "per sq. ft.",
    body: "Our most sought-after offering: architecture, interiors, and execution moving in concert.",
    features: [
      "Bespoke architectural design",
      "Curated material palette",
      "Imported fixtures & joinery",
      "Dedicated project lead",
      "24-month warranty",
    ],
    featured: true,
  },
  {
    key: "atelier",
    name: "Atelier",
    tag: "Without compromise",
    price: "On request",
    unit: "Tailored engagement",
    body: "A fully bespoke commission for landmark residences and considered estates.",
    features: [
      "End-to-end design authorship",
      "Rare materials & custom millwork",
      "Smart-home & lighting integration",
      "Landscape & exterior design",
      "Lifetime structural assurance",
      "Concierge handover & aftercare",
    ],
    featured: false,
  },
];

const Pricing = () => {
  const estimatorRef = useRef<CostEstimatorHandle>(null);

  const choosePlan = (key: string) => {
    estimatorRef.current?.selectPlan(key);
    const el = document.getElementById("estimator");
    if (el) {
      const offset = window.innerWidth >= 1024 ? 24 : 88;
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - offset,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="pricing" className="relative px-6 py-32 lg:px-20 lg:py-44">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Reveal>
            <SectionLabel index="08">Engagements</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
              Three ways
              <br />
              <span className="font-italic-serif text-copper">to begin.</span>
            </FloatTitle>
          </Reveal>
        </div>
        <div className="lg:col-span-5 lg:col-start-8 self-end">
          <Reveal delay={200}>
            <p className="text-ink-soft leading-relaxed text-lg">
              Structured, but never rigid.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-20 grid gap-6 lg:grid-cols-3">
        {TIERS.map((t, i) => (
          <Reveal key={t.name} delay={i * 150}>
            <div
              className={`relative h-full flex flex-col p-8 lg:p-10 transition-all duration-500 ${t.featured ? "bg-ink text-ivory shadow-[var(--shadow-soft)]" : "bg-ivory-deep text-ink hover:-translate-y-1"}`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-8 bg-copper text-ivory text-[10px] tracking-label uppercase px-3 py-1.5">
                  Most chosen
                </span>
              )}
              <p
                className={`text-[10px] tracking-label uppercase ${t.featured ? "text-copper-soft" : "text-copper"}`}
              >
                {t.tag}
              </p>
              <h3 className="mt-4 font-display text-4xl">{t.name}</h3>
              <div className="mt-8">
                <p className="font-display text-5xl lg:text-6xl">{t.price}</p>
                <p
                  className={`mt-2 text-sm ${t.featured ? "text-ivory/60" : "text-ink-soft"}`}
                >
                  {t.unit}
                </p>
              </div>
              <p
                className={`mt-6 text-sm leading-relaxed ${t.featured ? "text-ivory/75" : "text-ink-soft"}`}
              >
                {t.body}
              </p>
              <ul className="mt-8 space-y-3 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <Check
                      size={14}
                      className={`mt-1 shrink-0 ${t.featured ? "text-copper-soft" : "text-copper"}`}
                    />
                    <span className={t.featured ? "text-ivory/85" : "text-ink"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => choosePlan(t.key)}
                className={`mt-10 inline-flex items-center justify-between border-t pt-5 text-sm tracking-label uppercase transition-colors ${t.featured ? "border-ivory/20 text-ivory hover:text-copper-soft" : "border-ink/15 text-ink hover:text-copper"}`}
              >
                Calculate estimate <ArrowUpRight size={16} />
              </button>
            </div>
          </Reveal>
        ))}
      </div>

      <CostEstimator ref={estimatorRef} />
    </section>
  );
};

const PILLARS = [
  {
    title: "Natural Light & Ventilation",
    body: "Creating brighter, healthier spaces that remain comfortable throughout the year.",
  },
  {
    title: "Timeless Design",
    body: "Designing homes that remain relevant and beautiful for decades.",
  },
  {
    title: "Built To Last",
    body: "Using proven construction practices and durable materials that stand the test of time.",
  },
];

const Philosophy = () => (
  <section
    id="philosophy"
    className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44"
  >
    <div className="grid gap-16 lg:grid-cols-12 lg:gap-12">
      <Reveal className="lg:col-span-5 order-2 lg:order-1">
        <div className="overflow-hidden">
          <img
            src={philosophyImg}
            alt="Planted rooftop walk at a villa by Aasta Lifespace"
            loading="lazy"
            className="aspect-[3/4] w-full object-cover"
          />
        </div>
      </Reveal>
      <div className="lg:col-span-6 lg:col-start-7 order-1 lg:order-2">
        <Reveal>
          <SectionLabel index="09">Philosophy</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Spaces carefully
            <br />
            <span className="font-italic-serif text-copper">
              brought to life.
            </span>
          </FloatTitle>
        </Reveal>
        <Reveal delay={240}>
          <div className="mt-8 space-y-5 text-ink-soft text-base lg:text-lg leading-relaxed max-w-xl">
            <p>
              At Aasta Lifespace, we believe exceptional buildings are created
              long before construction begins.
            </p>
            <p>
              Every successful project starts with thoughtful planning, careful
              material selection, intelligent design decisions, and meticulous
              execution.
            </p>
          </div>
        </Reveal>
        <div className="mt-12 space-y-8">
          {PILLARS.map((p, i) => (
            <Reveal key={p.title} delay={i * 120}>
              <div className="border-t border-ink/15 pt-6">
                <h4 className="font-display text-2xl text-ink">{p.title}</h4>
                <p className="mt-2 text-ink-soft leading-relaxed max-w-md">
                  {p.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  </section>
);

// Add a client photo with `image` (import from @/assets) — initials show until then.
const TESTIMONIALS: { quote: string; name: string; role: string; image?: string }[] = [
  {
    quote:
      "We had a clear vision for Lotus Arena, and Aasta Lifespace understood it from the very beginning. They were easy to work with, communicated well throughout the project, and delivered a space we're proud to welcome our guests to.",
    name: "Mr. Prasanna",
    role: "Lotus Arena, Doddaballapur",
  },
  {
    quote:
      "We had a very clear idea of how we wanted our farmhouse to feel, and Aasta Lifespace brought that vision to life beautifully. They understood what mattered to us and never made us feel like just another project.",
    name: "Mrs. Anuradha K",
    role: "Farmhouse, Bidadi",
  },
  {
    quote:
      "I wanted a builder who would be transparent and keep their word, and that's exactly what I experienced with Aasta Lifespace. The team was professional, approachable, and always ready to help.",
    name: "Mr. Srinivas Murthy",
    role: "Residence, Indira Nagar",
  },
];

const InstagramGrid = () => (
  <section className="mt-24 border-t border-ivory/15 pt-10">
    <div className="flex items-end justify-between gap-6">
      <div>
        <p className="text-[10px] tracking-label uppercase text-copper-soft">@aasta_lifespace</p>
        <h2 className="mt-3 font-display text-3xl text-ivory">Follow the work on Instagram.</h2>
      </div>
      <a href="https://www.instagram.com/aasta_lifespace/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[10px] tracking-label uppercase text-ivory/70 transition-colors hover:text-copper-soft">Instagram <ArrowUpRight size={13} /></a>
    </div>
    <div className="mt-8 grid grid-cols-2 gap-2 sm:grid-cols-4">
      {PROJECTS.flatMap((project) => project.galleryImages.slice(2, 4)).slice(0, 8).map((image, index) => (
        <a key={image} href="https://www.instagram.com/aasta_lifespace/" target="_blank" rel="noopener noreferrer" aria-label="View on Instagram" className="group relative block overflow-hidden">
          <img src={image} alt={`Aasta Lifespace project detail ${index + 1}`} loading="lazy" className="aspect-square w-full object-cover transition duration-700 group-hover:scale-105" />
          <span className="absolute inset-0 grid place-items-center bg-ink/0 text-ivory opacity-0 transition duration-500 group-hover:bg-ink/50 group-hover:opacity-100"><Instagram size={26} /></span>
        </a>
      ))}
    </div>
  </section>
);

const Testimonials = () => (
  <section id="testimonials" className="relative px-6 py-32 lg:px-20 lg:py-44">
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <Reveal>
          <SectionLabel index="10">Testimonials</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            In the words
            <br />
            <span className="font-italic-serif text-copper">
              of our clients.
            </span>
          </FloatTitle>
        </Reveal>
      </div>
    </div>
    <div className="mt-20 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {TESTIMONIALS.map((t, i) => (
        <Reveal key={i} delay={i * 150}>
          <figure className="h-full flex flex-col bg-ivory-deep p-8 lg:p-10 transition-transform duration-500 hover:-translate-y-1">
            <Quote size={24} className="text-copper" />
            <blockquote className="mt-6 flex-1 text-ink leading-relaxed text-[17px] font-italic-serif">
              "{t.quote}"
            </blockquote>
            <figcaption className="mt-8 border-t border-ink/15 pt-5">
              <div className="flex items-center gap-4">
                {t.image ? (
                  <img src={t.image} alt={t.name} loading="lazy" className="h-14 w-14 shrink-0 rounded-full object-cover" />
                ) : (
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-copper font-display text-lg text-ivory">
                    {t.name.replace(/^(Mr|Mrs|Ms|Dr)\.?\s+/, "").split(" ").map((part) => part[0]).slice(0, 2).join("")}
                  </span>
                )}
                <div>
                  <p className="font-display text-lg text-ink">{t.name}</p>
                  <p className="text-[10px] tracking-label uppercase text-copper mt-1">
                    {t.role}
                  </p>
                </div>
              </div>
            </figcaption>
          </figure>
        </Reveal>
      ))}
    </div>
  </section>
);

const FAQ_ITEMS = [
  {
    q: "How much does house construction cost?",
    a: "Cost depends on built-up area, specification level, and finishes. Our Essential package starts at ₹1,850/sq. ft. and Signature at ₹2,650/sq. ft. Use the cost estimator in the Pricing section for an instant indicative budget for your project.",
  },
  {
    q: "Do you provide architecture and construction together?",
    a: "Yes. Our Design & Build offering provides architecture, structural design, construction, and interiors under a single accountable team, eliminating coordination gaps between designer and contractor.",
  },
  {
    q: "How long does a villa project take?",
    a: "A typical 4,000–6,000 sq. ft. villa with interiors takes 14–20 months from groundbreaking to handover, depending on site conditions, approvals, and specification. We share a detailed schedule before construction begins.",
  },
  {
    q: "Do you undertake turnkey interiors?",
    a: "Yes. Modular kitchens, wardrobes, custom furniture, lighting, false ceilings, and soft furnishings, delivered ready to move in. We also take on interiors as standalone projects for existing homes.",
  },
  {
    q: "Which cities do you serve?",
    a: "We are headquartered in Bengaluru and undertake projects across Karnataka and select cities in South India. For projects elsewhere, please reach out; we evaluate every enquiry on merit.",
  },
];

const FAQs = () => (
  <section
    id="faqs"
    className="relative bg-ivory-deep px-6 py-32 lg:px-20 lg:py-44"
  >
    <div className="grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-5">
        <Reveal>
          <SectionLabel index="11">FAQs</SectionLabel>
        </Reveal>
        <Reveal delay={120}>
          <FloatTitle className="mt-8 font-display text-4xl lg:text-6xl leading-[1.05] text-ink">
            Questions,
            <br />
            <span className="font-italic-serif text-copper">answered.</span>
          </FloatTitle>
        </Reveal>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <Accordion type="single" collapsible className="w-full">
          {FAQ_ITEMS.map((f, i) => (
            <AccordionItem
              key={i}
              value={`faq-${i}`}
              className="border-b border-ink/15"
            >
              <AccordionTrigger className="text-left font-display text-xl lg:text-2xl text-ink hover:text-copper hover:no-underline py-6">
                {f.q}
              </AccordionTrigger>
              <AccordionContent className="text-ink-soft leading-relaxed text-base pb-6">
                {f.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  </section>
);

const MAX_RESUME_BYTES = 3 * 1024 * 1024;

const Careers = () => {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const { resume, ...fields } = Object.fromEntries(new FormData(form));
    const file = resume instanceof File && resume.size > 0 ? resume : null;
    if (file && file.size > MAX_RESUME_BYTES) {
      toast({ variant: "destructive", title: "Resume too large", description: "Please upload a file under 3 MB." });
      return;
    }
    setSending(true);
    try {
      await sendForm({
        form: "careers",
        ...(fields as Record<string, string>),
        resume: file ? { filename: file.name, content: await fileToBase64(file) } : undefined,
      });
      toast({
        title: "Application received",
        description:
          "Thank you for your interest. Our team will review and reach out.",
      });
      form.reset();
    } catch (error) {
      toast({ variant: "destructive", title: "Application not sent", description: (error as Error).message });
    } finally {
      setSending(false);
    }
  };
  return (
    <section id="careers" className="relative px-6 py-32 lg:px-20 lg:py-44">
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionLabel index="12">Careers</SectionLabel>
          </Reveal>
          <Reveal delay={120}>
            <FloatTitle className="mt-8 font-display text-5xl lg:text-6xl leading-[1.02] text-ink">
              Build with
              <br />
              <span className="font-italic-serif text-copper">
                a legacy studio.
              </span>
            </FloatTitle>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-ink-soft text-lg leading-relaxed max-w-md">
              We're always looking for architects, engineers, project managers,
              site supervisors, and craft specialists who care about the
              details. Share your story below.
            </p>
          </Reveal>
        </div>

        <Reveal delay={300} className="lg:col-span-7">
          <form onSubmit={onSubmit} className="grid gap-6 sm:grid-cols-2">
            {[
              {
                name: "name",
                label: "Full name",
                type: "text",
                full: false,
                required: true,
              },
              {
                name: "email",
                label: "Email",
                type: "email",
                full: false,
                required: true,
              },
              {
                name: "phone",
                label: "Phone",
                type: "tel",
                full: false,
                required: true,
              },
              {
                name: "role",
                label: "Role of interest",
                type: "text",
                full: false,
                required: true,
              },
              {
                name: "experience",
                label: "Years of experience",
                type: "text",
                full: false,
                required: false,
              },
              {
                name: "location",
                label: "Current location",
                type: "text",
                full: false,
                required: false,
              },
            ].map((f) => (
              <div key={f.name} className={f.full ? "sm:col-span-2" : ""}>
                <label className="text-[10px] tracking-label uppercase text-ink-soft">
                  {f.label}
                </label>
                <input
                  required={f.required}
                  type={f.type}
                  name={f.name}
                  className="mt-2 w-full bg-transparent border-b border-ink/20 py-3 text-ink focus:border-copper focus:outline-none transition-colors"
                />
              </div>
            ))}
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-label uppercase text-ink-soft">
                Cover note
              </label>
              <textarea
                name="cover"
                rows={4}
                placeholder="Tell us about the work you're proud of."
                className="mt-2 w-full bg-transparent border-b border-ink/20 py-3 text-ink placeholder:text-ink/30 focus:border-copper focus:outline-none transition-colors resize-none"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="text-[10px] tracking-label uppercase text-ink-soft flex items-center gap-2">
                <Upload size={12} /> Resume (PDF)
              </label>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                className="mt-2 w-full text-sm text-ink-soft file:mr-4 file:py-2 file:px-4 file:border-0 file:bg-ink file:text-ivory file:text-[10px] file:tracking-label file:uppercase hover:file:bg-copper file:cursor-pointer file:transition-colors"
              />
            </div>
            <div className="sm:col-span-2">
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center gap-3 bg-ink text-ivory px-8 py-4 text-[10px] tracking-label uppercase transition-all hover:bg-copper disabled:pointer-events-none disabled:opacity-60"
              >
                {sending ? "Sending…" : "Submit application"}
                <ArrowUpRight
                  size={14}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>
            </div>
          </form>
        </Reveal>
      </div>
    </section>
  );
};

const WhatsAppFloat = () => (
  <a
    href="https://wa.me/919148837834?text=Hi%20Aasta%20Lifespace%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 group flex items-center gap-2 bg-[#25D366] text-white pl-4 pr-5 py-3 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
  >
    <MessageCircle size={20} className="fill-white" />
    <span className="text-[11px] tracking-label uppercase font-medium hidden sm:inline">
      WhatsApp
    </span>
  </a>
);

const Contact = () => {
  const [sending, setSending] = useState(false);
  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;
    setSending(true);
    try {
      await sendLead(data, { source: "Contact section" });
      toast({
        title: "Thank you",
        description: "Your enquiry has been sent. We'll be in touch shortly.",
      });
      form.reset();
    } catch (error) {
      toast({ variant: "destructive", title: "Message not sent", description: (error as Error).message });
    } finally {
      setSending(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative bg-ink text-ivory px-6 py-32 lg:px-20 lg:py-44"
    >
      <div className="grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper-soft">
              <span className="h-px w-6 bg-copper-soft" />
              13 · Contact
            </div>
          </Reveal>
          <Reveal delay={120}>
            <FloatTitle className="mt-8 font-display text-5xl lg:text-7xl leading-[1.02]">
              Let's build something
              <br />
              <span className="font-italic-serif text-copper-soft">
                meaningful together.
              </span>
            </FloatTitle>
          </Reveal>
          <Reveal delay={240}>
            <p className="mt-8 text-ivory/70 text-lg leading-relaxed max-w-lg">
              Whether you're planning your dream home, a luxury villa, or a
              commercial development, our team is ready to guide you from
              concept to completion. Share your vision with us and let's explore
              how we can bring it to life.
            </p>
          </Reveal>
          <Reveal
            delay={360}
            className="mt-16 grid gap-6 sm:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-2xl text-sm"
          >
            <div className="min-w-0">
              <p className="text-[10px] tracking-label uppercase text-ivory/50">
                Studio
              </p>
              <p className="mt-2 text-ivory/85">Bengaluru, India</p>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-label uppercase text-ivory/50">
                Enquiries
              </p>
              <a
                href="mailto:studio@aastalifespace.com"
                className="mt-2 block text-ivory/85 hover:text-copper-soft transition-colors break-all"
              >
                studio@aastalifespace.com
              </a>
            </div>
            <div className="min-w-0">
              <p className="text-[10px] tracking-label uppercase text-ivory/50">
                Call
              </p>
              <a
                href="tel:+919148837834"
                className="mt-2 block text-ivory/85 hover:text-copper-soft transition-colors whitespace-nowrap"
              >
                +91 91488 37834
              </a>
            </div>
            <div>
              <p className="text-[10px] tracking-label uppercase text-ivory/50">
                Follow
              </p>
              <div className="mt-2 flex items-center gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61591378105753"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aasta Lifespace on Facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.facebook.com/profile.php?id=61591378105753",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 text-ivory/85 hover:border-copper-soft hover:text-copper-soft transition-colors"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href="https://www.instagram.com/aasta_lifespace/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Aasta Lifespace on Instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open(
                      "https://www.instagram.com/aasta_lifespace/",
                      "_blank",
                      "noopener,noreferrer",
                    );
                  }}
                  className="grid h-9 w-9 place-items-center rounded-full border border-ivory/25 text-ivory/85 hover:border-copper-soft hover:text-copper-soft transition-colors"
                >
                  <Instagram size={15} />
                </a>
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={300} className="lg:col-span-5">
          <form onSubmit={onSubmit} className="space-y-6">
            {[
              { name: "name", label: "Name", type: "text", required: true },
              { name: "phone", label: "Phone", type: "tel", required: true },
              { name: "email", label: "Email", type: "email", required: false },
              { name: "location", label: "Site location", type: "text", required: false },
            ].map((f) => (
              <div key={f.name}>
                <label className="text-[10px] tracking-label uppercase text-ivory/50">
                  {f.label}
                </label>
                <input
                  required={f.required}
                  type={f.type}
                  name={f.name}
                  className="mt-2 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:border-copper-soft focus:outline-none transition-colors"
                />
              </div>
            ))}
            <div>
              <label className="text-[10px] tracking-label uppercase text-ivory/50">
                Project type
              </label>
              <select
                required
                name="projectType"
                defaultValue=""
                className="mt-2 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory focus:border-copper-soft focus:outline-none transition-colors [&>option]:text-ink"
              >
                <option value="" disabled>Select…</option>
                {PROJECT_TYPES.map((type) => <option key={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="text-[10px] tracking-label uppercase text-ivory/50">
                Message
              </label>
              <textarea
                name="message"
                rows={4}
                className="mt-2 w-full bg-transparent border-b border-ivory/20 py-3 text-ivory placeholder:text-ivory/30 focus:border-copper-soft focus:outline-none transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className="group inline-flex items-center gap-3 border border-ivory/30 px-8 py-4 text-[10px] tracking-label uppercase transition-all hover:bg-copper hover:border-copper hover:text-ivory disabled:pointer-events-none disabled:opacity-60"
            >
              {sending ? "Sending…" : "Start Your Project Today"}
              <ArrowUpRight
                size={14}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              />
            </button>
          </form>
        </Reveal>
      </div>

      <InstagramGrid />

      <footer className="mt-32 pt-10 border-t border-ivory/15 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <img
          src={logo}
          alt="Aasta Lifespace"
          className="h-6 sm:h-7 md:h-8 w-auto max-w-[180px] sm:max-w-[220px] object-contain brightness-0 invert opacity-80"
        />
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[10px] tracking-label uppercase text-ivory/50">
          <span>© {new Date().getFullYear()} Aasta Lifespace</span>
          <a
            href="https://www.facebook.com/profile.php?id=61591378105753"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://www.facebook.com/profile.php?id=61591378105753",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="transition-colors hover:text-ivory"
          >
            Facebook
          </a>
          <a
            href="https://www.instagram.com/aasta_lifespace/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://www.instagram.com/aasta_lifespace/",
                "_blank",
                "noopener,noreferrer",
              );
            }}
            className="transition-colors hover:text-ivory"
          >
            Instagram
          </a>
          <span>Privacy</span>
        </div>
      </footer>
    </section>
  );
};

const Index = () => {
  const [collapsed, setCollapsed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem("aasta:rail") === "1";
  });
  const toggle = () => {
    setCollapsed((v) => {
      const next = !v;
      try {
        window.localStorage.setItem("aasta:rail", next ? "1" : "0");
      } catch {}
      return next;
    });
  };
  return (
    <main
      className={cn(
        "bg-background text-foreground pt-16 lg:pt-0 transition-[padding] duration-500 ease-out",
        collapsed ? "lg:pl-14" : "lg:pl-[260px]",
      )}
    >
      <SideRail collapsed={collapsed} onToggle={toggle} />
      <Hero />
      <About />
      <Vision />
      <Services />
      <StartProjectBand title="Have a site or a plan in mind?" accent="Let's talk about it." body="Tell us what you're planning — a home, a villa, a commercial building or complete interiors — and we'll walk you through the next steps." />
      <WhyChoose />
      <Projects />
      <StartProjectBand dark eyebrow="Your project next" title="Like what you see?" accent="Start your own." />
      <Stats />
      <Approach />
      <Founder />
      <Pricing />
      <Philosophy />
      <Testimonials />
      <StartProjectBand title="Ready to build with a team" accent="that's done it for 40 years?" />
      <FAQs />
      <Careers />
      <Contact />
      <WhatsAppFloat />
    </main>
  );
};

export default Index;
