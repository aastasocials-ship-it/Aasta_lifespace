import { forwardRef, useImperativeHandle, useMemo, useState } from "react";
import { Minus, Plus } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { FloatTitle } from "@/components/FloatTitle";
import { formatCrLakh, formatINR } from "@/lib/format-inr";
import { EstimateDialog, FloorEntry } from "@/components/EstimateDialog";

export interface PlanOption {
  key: string;
  name: string;
  rate: number;
  custom?: boolean;
}

const PLANS: PlanOption[] = [
  { key: "essential", name: "Essential", rate: 1850 },
  { key: "signature", name: "Signature", rate: 2650 },
  { key: "atelier", name: "Atelier", rate: 3500, custom: true },
];

const ordinal = (i: number) => {
  if (i === 0) return "Ground floor";
  const n = i;
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]} floor`;
};

export interface CostEstimatorHandle {
  selectPlan: (key: string) => void;
}

export const CostEstimator = forwardRef<CostEstimatorHandle>((_, ref) => {
  const [planKey, setPlanKey] = useState("signature");
  const [customRate, setCustomRate] = useState(3500);
  const [floors, setFloors] = useState<number[]>([1500, 1500]);
  const [dialogOpen, setDialogOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    selectPlan: (key: string) => setPlanKey(key),
  }));

  const plan = PLANS.find((p) => p.key === planKey)!;
  const rate = plan.custom ? customRate : plan.rate;

  const totalArea = useMemo(() => floors.reduce((s, v) => s + (v || 0), 0), [floors]);
  const totalCost = totalArea * rate;

  const setFloorCount = (n: number) => {
    const clamped = Math.max(1, Math.min(10, n));
    setFloors((prev) => {
      if (clamped > prev.length) return [...prev, ...Array(clamped - prev.length).fill(1000)];
      return prev.slice(0, clamped);
    });
  };

  const updateFloor = (idx: number, val: number) => {
    setFloors((prev) => prev.map((v, i) => (i === idx ? Math.max(0, Math.min(100000, val || 0)) : v)));
  };

  const floorEntries: FloorEntry[] = floors.map((sqft, i) => ({ label: ordinal(i), sqft }));
  const canSubmit = totalArea > 0 && rate > 0;

  return (
    <div id="estimator" className="mt-24 bg-ivory-deep">
      <div className="grid lg:grid-cols-12 gap-0">
        {/* Left: inputs */}
        <div className="lg:col-span-7 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-ink/10">
          <Reveal>
            <div className="flex items-center gap-3 text-[10px] tracking-label uppercase text-copper">
              <span className="h-px w-6 bg-copper" />
              <span>Cost calculator</span>
            </div>
            <FloatTitle as="h3" className="mt-6 font-display text-3xl lg:text-5xl text-ink leading-tight">
              Estimate your <span className="font-italic-serif text-copper">build.</span>
            </FloatTitle>
            <p className="mt-4 text-ink-soft max-w-md">
              Choose a plan, enter the floor-wise area, and we'll prepare an indicative figure.
            </p>
          </Reveal>

          {/* Plan selector */}
          <div className="mt-10">
            <p className="text-[10px] tracking-label uppercase text-ink-soft mb-3">Plan</p>
            <div className="flex flex-wrap gap-2">
              {PLANS.map((p) => {
                const active = p.key === planKey;
                return (
                  <button
                    key={p.key}
                    onClick={() => setPlanKey(p.key)}
                    className={`px-5 py-3 text-sm border transition-all ${
                      active
                        ? "bg-ink text-ivory border-ink"
                        : "bg-transparent text-ink border-ink/20 hover:border-copper hover:text-copper"
                    }`}
                  >
                    <span className="font-display">{p.name}</span>
                    <span className={`ml-2 text-[11px] ${active ? "text-copper-soft" : "text-ink-soft"}`}>
                      {p.custom ? "from ₹3,500" : `₹${p.rate.toLocaleString("en-IN")}`}/sqft
                    </span>
                  </button>
                );
              })}
            </div>

            {plan.custom && (
              <div className="mt-4">
                <label className="text-[10px] tracking-label uppercase text-ink-soft">Custom rate (₹/sq.ft.)</label>
                <input
                  type="number"
                  min={1000}
                  value={customRate}
                  onChange={(e) => setCustomRate(Math.max(0, Number(e.target.value) || 0))}
                  className="mt-1.5 w-40 bg-transparent border-b border-ink/20 py-2 text-ink focus:border-copper focus:outline-none"
                />
              </div>
            )}
          </div>

          {/* Floor count */}
          <div className="mt-10">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-label uppercase text-ink-soft">Number of floors</p>
              <div className="flex items-center gap-3 border border-ink/20">
                <button
                  type="button"
                  onClick={() => setFloorCount(floors.length - 1)}
                  className="p-2.5 text-ink hover:bg-ink hover:text-ivory transition-colors"
                  aria-label="Remove floor"
                >
                  <Minus size={14} />
                </button>
                <span className="font-display text-lg text-ink tabular-nums w-6 text-center">{floors.length}</span>
                <button
                  type="button"
                  onClick={() => setFloorCount(floors.length + 1)}
                  className="p-2.5 text-ink hover:bg-ink hover:text-ivory transition-colors"
                  aria-label="Add floor"
                >
                  <Plus size={14} />
                </button>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              {floors.map((sqft, i) => (
                <div key={i} className="flex items-center justify-between border-b border-ink/10 pb-3">
                  <span className="font-display text-lg text-ink">{ordinal(i)}</span>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min={0}
                      max={100000}
                      value={sqft}
                      onChange={(e) => updateFloor(i, Number(e.target.value))}
                      className="w-32 bg-transparent border-b border-ink/20 py-1.5 text-right text-ink tabular-nums focus:border-copper focus:outline-none"
                    />
                    <span className="text-xs tracking-label uppercase text-ink-soft">sq.ft.</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: live total */}
        <div className="lg:col-span-5 bg-ink text-ivory p-8 lg:p-12 flex flex-col justify-between">
          <div>
            <p className="text-[10px] tracking-label uppercase text-copper-soft">Indicative total</p>
            <p className="mt-4 font-display text-5xl lg:text-7xl leading-none">{formatCrLakh(totalCost)}</p>
            <p className="mt-3 text-sm text-ivory/60">{formatINR(totalCost)}</p>

            <div className="mt-10 space-y-3 text-sm">
              <div className="flex justify-between border-b border-ivory/15 pb-2">
                <span className="text-ivory/60">Plan</span>
                <span>{plan.name}</span>
              </div>
              <div className="flex justify-between border-b border-ivory/15 pb-2">
                <span className="text-ivory/60">Rate</span>
                <span className="tabular-nums">{formatINR(rate)} /sqft</span>
              </div>
              <div className="flex justify-between border-b border-ivory/15 pb-2">
                <span className="text-ivory/60">Floors</span>
                <span className="tabular-nums">{floors.length}</span>
              </div>
              <div className="flex justify-between border-b border-ivory/15 pb-2">
                <span className="text-ivory/60">Total area</span>
                <span className="tabular-nums">{totalArea.toLocaleString("en-IN")} sq.ft.</span>
              </div>
            </div>
          </div>

          <button
            disabled={!canSubmit}
            onClick={() => setDialogOpen(true)}
            className="group mt-10 inline-flex items-center justify-between border border-ivory/30 px-7 py-4 text-[10px] tracking-label uppercase transition-all hover:bg-copper hover:border-copper disabled:opacity-40 disabled:cursor-not-allowed"
          >
            Get detailed estimate
            <span className="text-copper-soft group-hover:text-ivory">→</span>
          </button>
        </div>
      </div>

      <EstimateDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        planName={plan.name}
        rate={rate}
        floors={floorEntries}
        totalArea={totalArea}
        totalCost={totalCost}
      />
    </div>
  );
});

CostEstimator.displayName = "CostEstimator";
