import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { EASE, Reveal, SectionTitle } from "./Reveal";
import { FACEBOOK_URL } from "../data/site";

export type FaqItem = { q: string; a: ReactNode };

export const SERVICE_FAQS: FaqItem[] = [
  {
    q: "Do you cover events outside Lugait?",
    a: "Yes. We're based in Lugait, Misamis Oriental and regularly cover Iligan, Cagayan de Oro, and the rest of Northern Mindanao. Tell us the venue and we'll include travel in the quote.",
  },
  {
    q: "Can we book photo only, or video only?",
    a: "Either, or both together. Most couples take both so the highlight video and the photos tell the same day, but each is available on its own.",
  },
  {
    q: "How do we book a date?",
    a: (
      <>
        Message us on{" "}
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-stone-200 underline decoration-gold/50 underline-offset-4 hover:text-gold">
          Facebook
        </a>
        , call, or send the inquiry form with your date, venue, and what you'd like covered. We'll confirm availability and send a package for your day.
      </>
    ),
  },
  {
    q: "How far ahead should we reach out?",
    a: "As early as you know the date. Weekends and the December-to-May season fill first, but we'll always tell you straight away whether a date is open.",
  },
  {
    q: "Where can we see more of your work?",
    a: (
      <>
        Our{" "}
        <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="text-stone-200 underline decoration-gold/50 underline-offset-4 hover:text-gold">
          Facebook page
        </a>{" "}
        has the newest frames and full wedding highlight videos, and the Stories page here collects the ones we're proudest of.
      </>
    ),
  },
];

export default function FAQ({
  items = SERVICE_FAQS,
  title = (
    <>
      Fair <em className="italic text-gold">questions</em>, straight answers
    </>
  ),
}: {
  items?: FaqItem[];
  title?: ReactNode;
}) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionTitle align="center" title={title} />

        <div className="mt-14 space-y-3">
          {items.map((f, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={f.q} delay={0.05 * i}>
                <div
                  className={`overflow-hidden rounded-2xl border transition-colors duration-400 ${
                    isOpen ? "border-gold/25 bg-white/[0.04]" : "border-white/[0.07] bg-white/[0.02]"
                  }`}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left sm:px-8"
                  >
                    <span className="font-display text-lg font-medium text-cream sm:text-xl">{f.q}</span>
                    <span
                      className={`grid size-9 shrink-0 place-items-center rounded-full border transition-all duration-400 ${
                        isOpen ? "rotate-45 border-gold/50 bg-gold text-ink" : "border-white/15 bg-white/[0.04] text-stone-400"
                      }`}
                    >
                      <Plus className="size-4" strokeWidth={2.5} />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                      >
                        <p className="px-6 pb-6 text-[15px] leading-relaxed text-stone-400 sm:px-8 sm:pr-16">{f.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
