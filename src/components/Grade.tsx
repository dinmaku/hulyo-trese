import { cn } from "../utils/cn";

export type Grade = "cinema" | "mono" | "plain";

/**
 * Shared stills grade. Hover (when not locked) lets a little of the original
 * colour back through so a gallery can be inspected; hero, headers, and the
 * lightbox stay in the print.
 */
export function GradeLayers({
  grade,
  locked = false,
}: {
  grade: Grade;
  locked?: boolean;
}) {
  if (grade === "plain") return null;

  const fade = locked ? "" : "transition-opacity duration-700 group-hover:opacity-0";

  return (
    <>
      {/* gold midtone wash */}
      <div
        aria-hidden
        className={cn("pointer-events-none absolute inset-0 bg-gold mix-blend-color opacity-[0.32]", fade)}
      />
      {/* split tone: cool shadows, warm floor */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(16,28,36,0.35)_0%,transparent_42%,rgba(72,28,6,0.42)_100%)] mix-blend-overlay",
          fade
        )}
      />
      {/* crushed edges */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 shadow-[inset_0_0_160px_rgba(10,9,8,0.82)]",
          !locked && "transition-shadow duration-700 group-hover:shadow-[inset_0_0_56px_rgba(10,9,8,0.35)]"
        )}
      />
    </>
  );
}

export const GRADE_IMG: Record<Grade, string> = {
  cinema: "grade-cinema",
  mono: "grade-mono",
  plain: "",
};
