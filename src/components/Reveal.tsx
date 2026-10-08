import { motion } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 30,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y, filter: "blur(8px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-70px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

export function SectionTitle({
  title,
  sub,
  align = "left",
  as: Tag = "h2",
  className,
}: {
  title: ReactNode;
  sub?: ReactNode;
  align?: "center" | "left";
  as?: "h1" | "h2";
  className?: string;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-2xl ${className ?? ""}`}>
      <Reveal>
        <Tag
          className="text-balance font-display font-medium leading-[1.04] tracking-[-0.02em] text-cream"
          style={{
            fontVariationSettings: '"opsz" 96',
            fontSize: Tag === "h1" ? "clamp(2.6rem, 6vw, 5.5rem)" : "clamp(2.1rem, 4.2vw, 3.6rem)",
          }}
        >
          {title}
        </Tag>
      </Reveal>
      {sub && (
        <Reveal delay={0.1}>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-stone-400 sm:text-lg">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}

export { EASE };
