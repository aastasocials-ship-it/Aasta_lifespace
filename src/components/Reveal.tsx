import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";
import { PropsWithChildren } from "react";

interface RevealProps extends PropsWithChildren {
  className?: string;
  delay?: number;
}

export const Reveal = ({ children, className, delay = 0 }: RevealProps) => {
  const { ref, inView } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={cn("reveal", inView && "in-view", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};
