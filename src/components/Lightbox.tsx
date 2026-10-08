import { useCallback, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { EASE } from "./Reveal";
import { credit, type Photo } from "../data/photos";

export default function Lightbox({
  photos,
  index,
  onClose,
  onIndex,
}: {
  photos: Photo[];
  index: number | null;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  const open = index !== null;
  const current = open ? photos[index] : null;

  const step = useCallback(
    (d: 1 | -1) => {
      if (index === null) return;
      onIndex((index + d + photos.length) % photos.length);
    },
    [index, onIndex, photos.length]
  );

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, step]);

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={`${current.caption}. Photo ${index! + 1} of ${photos.length}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/95 backdrop-blur-xl"
          onClick={onClose}
        >
          <div className="flex items-center justify-between px-5 py-4 sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-sm tabular-nums text-stone-400">
              <span className="text-cream">{String(index! + 1).padStart(2, "0")}</span> / {String(photos.length).padStart(2, "0")}
            </p>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close photo"
              className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.04] text-cream transition-colors hover:border-gold/40 hover:text-gold"
            >
              <X className="size-5" />
            </button>
          </div>

          <div className="relative flex flex-1 items-center justify-center px-5 pb-6 sm:px-20">
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={current.id}
                src={current.src}
                alt={current.alt}
                initial={{ opacity: 0, scale: 0.98, filter: "blur(12px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 1.01, filter: "blur(12px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                onClick={(e) => e.stopPropagation()}
                className={`max-h-[calc(100svh-180px)] max-w-full object-contain shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] grade-locked ${
                  current.mono ? "grade-mono" : "grade-cinema"
                }`}
              />
            </AnimatePresence>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(-1);
              }}
              aria-label="Previous photo"
              className="absolute left-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/70 text-cream transition-colors hover:border-gold/40 hover:text-gold sm:left-6"
            >
              <ArrowLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                step(1);
              }}
              aria-label="Next photo"
              className="absolute right-3 top-1/2 grid size-12 -translate-y-1/2 place-items-center rounded-full border border-white/10 bg-ink/70 text-cream transition-colors hover:border-gold/40 hover:text-gold sm:right-6"
            >
              <ArrowRight className="size-5" />
            </button>
          </div>

          <div className="px-5 pb-6 text-center sm:px-8" onClick={(e) => e.stopPropagation()}>
            <p className="font-display text-xl italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
              {current.caption}
            </p>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">{credit(current)}</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
