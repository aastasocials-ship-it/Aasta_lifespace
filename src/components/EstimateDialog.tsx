import { useState } from "react";
import { z } from "zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { ArrowUpRight, Check } from "lucide-react";
import { formatCrLakh, formatINR } from "@/lib/format-inr";
import { toast } from "@/hooks/use-toast";

export interface FloorEntry {
  label: string;
  sqft: number;
}

interface Props {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  planName: string;
  rate: number;
  floors: FloorEntry[];
  totalArea: number;
  totalCost: number;
}

const leadSchema = z.object({
  name: z.string().trim().min(2, "Name is too short").max(80),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().regex(/^[0-9+\-\s()]{7,15}$/, "Invalid phone"),
  city: z.string().trim().min(2, "City required").max(80),
});

export const EstimateDialog = ({ open, onOpenChange, planName, rate, floors, totalArea, totalCost }: Props) => {
  const [step, setStep] = useState<"form" | "summary">("form");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [lead, setLead] = useState({ name: "", email: "", phone: "", city: "" });

  const reset = () => {
    setStep("form");
    setErrors({});
    setLead({ name: "", email: "", phone: "", city: "" });
  };

  const handleClose = (v: boolean) => {
    if (!v) reset();
    onOpenChange(v);
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = leadSchema.safeParse(lead);
    if (!result.success) {
      const errs: Record<string, string> = {};
      result.error.issues.forEach((i) => { errs[i.path[0] as string] = i.message; });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStep("summary");
    toast({ title: "Estimate ready", description: "Our team will reach out shortly." });
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-xl bg-ivory text-ink border-ink/10 p-0 overflow-hidden max-h-[90vh] overflow-y-auto">
        {step === "form" ? (
          <div className="p-8 lg:p-10">
            <DialogHeader className="text-left space-y-2">
              <p className="text-[10px] tracking-label uppercase text-copper">Almost there</p>
              <DialogTitle className="font-display text-3xl text-ink font-normal">Your details</DialogTitle>
              <DialogDescription className="text-ink-soft">
                Share a few details and we'll send your detailed estimate along with next steps.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              {([
                { k: "name", label: "Full name", type: "text" },
                { k: "email", label: "Email", type: "email" },
                { k: "phone", label: "Phone", type: "tel" },
                { k: "city", label: "City", type: "text" },
              ] as const).map((f) => (
                <div key={f.k}>
                  <label className="text-[10px] tracking-label uppercase text-ink-soft">{f.label}</label>
                  <input
                    type={f.type}
                    value={lead[f.k]}
                    onChange={(e) => setLead({ ...lead, [f.k]: e.target.value })}
                    className="mt-1.5 w-full bg-transparent border-b border-ink/20 py-2.5 text-ink focus:border-copper focus:outline-none transition-colors"
                  />
                  {errors[f.k] && <p className="mt-1 text-xs text-destructive">{errors[f.k]}</p>}
                </div>
              ))}
              <button
                type="submit"
                className="group mt-4 inline-flex items-center gap-3 bg-ink text-ivory px-7 py-3.5 text-[10px] tracking-label uppercase transition-all hover:bg-copper"
              >
                Reveal estimate <ArrowUpRight size={14} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 lg:p-10">
            <DialogHeader className="text-left space-y-2">
              <p className="text-[10px] tracking-label uppercase text-copper">Your estimate</p>
              <DialogTitle className="font-display text-3xl text-ink font-normal">
                {planName} · <span className="italic">indicative</span>
              </DialogTitle>
              <DialogDescription className="text-ink-soft">
                Prepared for {lead.name}, {lead.city}.
              </DialogDescription>
            </DialogHeader>

            <div className="mt-8 border-t border-ink/15">
              <div className="flex justify-between py-3 text-sm border-b border-ink/10">
                <span className="text-ink-soft">Rate</span>
                <span className="text-ink">{formatINR(rate)} / sq.ft.</span>
              </div>
              {floors.map((f, i) => (
                <div key={i} className="flex justify-between py-3 text-sm border-b border-ink/10">
                  <span className="text-ink-soft">{f.label}</span>
                  <span className="text-ink tabular-nums">
                    {f.sqft.toLocaleString("en-IN")} sq.ft. · {formatINR(f.sqft * rate)}
                  </span>
                </div>
              ))}
              <div className="flex justify-between py-3 text-sm border-b border-ink/10">
                <span className="text-ink-soft">Total area</span>
                <span className="text-ink tabular-nums">{totalArea.toLocaleString("en-IN")} sq.ft.</span>
              </div>
            </div>

            <div className="mt-8 bg-ink text-ivory p-6 lg:p-8">
              <p className="text-[10px] tracking-label uppercase text-copper-soft">Estimated total</p>
              <p className="mt-2 font-display text-5xl lg:text-6xl">{formatCrLakh(totalCost)}</p>
              <p className="mt-2 text-sm text-ivory/60">{formatINR(totalCost)}</p>
            </div>

            <p className="mt-6 text-xs text-ink-soft leading-relaxed">
              <Check size={12} className="inline text-copper mr-1" />
              Indicative figure. Final pricing depends on site conditions, soil, material selections, and finishes. Our team will be in touch to refine this estimate.
            </p>

            <div className="mt-8 flex items-center gap-4">
              <button onClick={() => handleClose(false)} className="bg-ink text-ivory px-6 py-3 text-[10px] tracking-label uppercase hover:bg-copper transition-colors">
                Close
              </button>
              <button onClick={reset} className="text-[10px] tracking-label uppercase text-ink-soft hover:text-copper transition-colors">
                Start over
              </button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};
