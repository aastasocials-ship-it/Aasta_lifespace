import { useState } from "react";
import { ArrowUpRight, Phone } from "lucide-react";
import { InquiryDialog } from "@/components/InquiryDialog";
import { cn } from "@/lib/utils";

type Props = { eyebrow?: string; title: string; accent: string; body?: string; dark?: boolean };

export const StartProjectBand = ({ eyebrow = "Start a new project", title, accent, body, dark }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <section className={cn("relative overflow-hidden px-6 py-16 lg:px-20 lg:py-20", dark ? "bg-ink text-ivory" : "bg-copper text-ivory")}>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl">
          <p className="text-[10px] tracking-label uppercase text-ivory/70">{eyebrow}</p>
          <h2 className="mt-4 font-display text-4xl leading-tight lg:text-5xl">{title} <span className="font-italic-serif">{accent}</span></h2>
          {body && <p className="mt-4 text-ivory/80 leading-relaxed">{body}</p>}
        </div>
        <div className="flex flex-wrap gap-3">
          <button type="button" onClick={() => setOpen(true)} className={cn("group inline-flex items-center gap-3 px-7 py-4 text-[10px] tracking-label uppercase transition-colors", dark ? "bg-copper text-ivory hover:bg-copper-soft" : "bg-ivory text-ink hover:bg-ink hover:text-ivory")}>Start a new project <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></button>
          <a href="tel:+919148837834" className="inline-flex items-center gap-3 border border-ivory/50 px-7 py-4 text-[10px] tracking-label uppercase text-ivory transition-colors hover:border-ivory hover:bg-ivory/10"><Phone size={13} /> Call us</a>
        </div>
      </div>
      <InquiryDialog open={open} onOpenChange={setOpen} title="Start a new project" />
    </section>
  );
};
