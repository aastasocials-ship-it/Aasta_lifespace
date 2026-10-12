import { useEffect, useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/aasta-logo.png";
import bird from "@/assets/aasta-bird.png";
import { cn } from "@/lib/utils";

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "approach", label: "Process" },
  { id: "pricing", label: "Pricing" },
  { id: "philosophy", label: "Philosophy" },
  { id: "faqs", label: "FAQs" },
  { id: "careers", label: "Careers" },
  { id: "contact", label: "Contact" },
];

const PAGES = [
  { to: "/projects", label: "All projects" },
  { to: "/blog", label: "Blog" },
];

type Props = {
  collapsed: boolean;
  onToggle: () => void;
};

export const SideRail = ({ collapsed, onToggle }: Props) => {
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    );
    NAV.forEach((n) => {
      const el = document.getElementById(n.id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    const offset = window.innerWidth >= 1024 ? 0 : 72;
    const top = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <>
      {/* Desktop side rail */}
      <aside
        className={cn(
          "hidden lg:flex fixed left-0 top-0 z-40 h-screen flex-col justify-between border-r border-ink/10 bg-ivory/80 backdrop-blur-md transition-[width,padding] duration-500 ease-out",
          collapsed ? "w-14 px-2 py-6 items-center" : "w-[260px] px-8 py-10"
        )}
      >
        {collapsed ? (
          <>
            <button onClick={() => go("home")} aria-label="Home">
              <img src={bird} alt="Aasta Lifespace" className="h-8 w-auto" />
            </button>
            <button
              onClick={onToggle}
              aria-label="Open menu"
              className="grid h-10 w-10 place-items-center rounded-full text-ink hover:bg-copper hover:text-ivory transition-colors"
            >
              <Menu size={18} />
            </button>
            <span className="text-[9px] tracking-label uppercase text-ink-soft [writing-mode:vertical-rl] rotate-180">
              Est. 1984
            </span>
          </>
        ) : (
          <>
            <div className="flex items-start justify-between">
              <button onClick={() => go("home")} className="block">
                <img src={logo} alt="Aasta Lifespace" className="h-9 w-auto" />
              </button>
              <button
                onClick={onToggle}
                aria-label="Collapse menu"
                className="-mr-2 grid h-8 w-8 place-items-center rounded-full text-ink-soft hover:bg-ink/5 hover:text-ink transition-colors"
              >
                <Menu size={16} />
              </button>
            </div>
            <nav className="flex flex-col gap-5">
              {NAV.map((item, i) => {
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => go(item.id)}
                    className={cn(
                      "group flex items-center gap-4 text-left text-sm font-sans-ui transition-colors",
                      isActive ? "text-copper" : "text-ink-soft hover:text-ink"
                    )}
                  >
                    <span className="tracking-label text-[10px] tabular-nums">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="relative">
                      {item.label}
                      <span
                        className={cn(
                          "absolute -bottom-1 left-0 h-px bg-copper transition-all duration-500",
                          isActive ? "w-full" : "w-0 group-hover:w-full"
                        )}
                      />
                    </span>
                  </button>
                );
              })}
            </nav>
            <div className="flex flex-col gap-3 border-t border-ink/10 pt-5">
              {PAGES.map((page) => (
                <Link key={page.to} to={page.to} className="inline-flex items-center gap-2 text-sm font-sans-ui text-ink-soft transition-colors hover:text-copper">
                  {page.label} <ArrowUpRight size={12} />
                </Link>
              ))}
            </div>
            <p className="text-[10px] tracking-label uppercase text-ink-soft">
              Est. 1984 · India
            </p>
          </>
        )}
      </aside>

      {/* Mobile top bar */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-40 flex items-center justify-between border-b border-ink/10 bg-ivory/90 backdrop-blur-md px-5 py-4">
        <button onClick={() => go("home")}>
          <img src={logo} alt="Aasta Lifespace" className="h-7 w-auto" />
        </button>
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-ink"
          aria-label="Toggle menu"
        >
          <Menu size={22} />
        </button>
      </header>

      {/* Mobile sheet */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-30 bg-ivory transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <nav className="flex h-full flex-col items-start justify-center gap-6 px-10">
          {NAV.map((item, i) => (
            <button
              key={item.id}
              onClick={() => go(item.id)}
              className="flex items-baseline gap-4 text-left"
            >
              <span className="tracking-label text-[10px] text-copper tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-display text-3xl text-ink">{item.label}</span>
            </button>
          ))}
          <div className="mt-4 flex gap-6 border-t border-ink/10 pt-6">
            {PAGES.map((page) => (
              <Link key={page.to} to={page.to} className="inline-flex items-center gap-2 text-[10px] tracking-label uppercase text-copper">
                {page.label} <ArrowUpRight size={12} />
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};
