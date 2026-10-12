import { ReactNode, isValidElement, Children, cloneElement } from "react";
import { useReveal } from "@/hooks/use-reveal";
import { cn } from "@/lib/utils";

interface FloatTitleProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Distance to slide in from (negative = from left). */
  fromX?: number;
}

/**
 * Splits text nodes into per-word spans so each word floats in from
 * the left with a staggered delay. Preserves nested elements (e.g.
 * <span className="italic ...">).
 */
const wrapWords = (node: ReactNode, counter: { i: number }): ReactNode => {
  if (typeof node === "string") {
    const parts = node.split(/(\s+)/);
    return parts.map((p, idx) => {
      if (/^\s+$/.test(p)) return p;
      if (p === "") return null;
      const i = counter.i++;
      return (
        <span key={`w-${i}-${idx}`} className="word" style={{ ["--word-i" as any]: i }}>
          {p}
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((c, idx) => <span key={idx}>{wrapWords(c, counter)}</span>);
  }
  if (isValidElement(node)) {
    // Recurse into children, preserve element/className/styles
    const children = (node.props as any).children;
    return cloneElement(node, node.props as any, wrapWords(children, counter));
  }
  return node;
};

export const FloatTitle = ({ children, className, as: Tag = "h2", fromX = -120 }: FloatTitleProps) => {
  const { ref, inView } = useReveal<HTMLHeadingElement>(0.2);
  const counter = { i: 0 };
  const wrapped = Children.map(children, (c) => wrapWords(c, counter));

  return (
    <Tag
      ref={ref as any}
      className={cn("float-title", inView && "in-view", className)}
      style={{ ["--float-x" as any]: `${fromX}px` }}
    >
      {wrapped}
    </Tag>
  );
};
