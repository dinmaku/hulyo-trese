import { useEffect, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import Lightbox from "../components/Lightbox";
import Inquire from "../components/Inquire";
import { EASE, Reveal } from "../components/Reveal";
import { CATEGORIES, PHOTOS, photo, type Category } from "../data/photos";
import { FACEBOOK_URL } from "../data/site";

export default function Stories() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const [open, setOpen] = useState<number | null>(null);
  const { hash } = useLocation();

  const shown = useMemo(() => (filter === "all" ? PHOTOS : PHOTOS.filter((p) => p.category === filter)), [filter]);

  /* deep links from the film strip: /stories#rings-cord */
  useEffect(() => {
    const id = hash.replace("#", "");
    if (!id) return;
    const i = shown.findIndex((p) => p.id === id);
    if (i >= 0) setOpen(i);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return (
    <>
      <PageHeader
        photo={photo("mother-bride")}
        title={
          <>
            Stories we were <em className="italic text-gold">trusted</em> with
          </>
        }
        sub="Real frames from days we were invited into, plus a few mood frames for debuts and birthdays until those families share theirs. Click any photograph to see it at full size."
      >
        <Reveal delay={0.15}>
          <div role="tablist" aria-label="Filter stories" className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((c) => {
              const active = filter === c.key;
              const count = c.key === "all" ? PHOTOS.length : PHOTOS.filter((p) => p.category === c.key).length;
              return (
                <button
                  key={c.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter(c.key)}
                  className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-300 ${
                    active
                      ? "border-gold bg-gold text-ink"
                      : "border-white/12 bg-white/[0.03] text-stone-300 hover:border-gold/40 hover:text-cream"
                  }`}
                >
                  {c.label}
                  <span className={`font-display text-xs tabular-nums ${active ? "text-ink/70" : "text-stone-500"}`}>{count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>
      </PageHeader>

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <AnimatePresence mode="wait" initial={false}>
            {shown.length > 0 ? (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
                transition={{ duration: 0.5, ease: EASE }}
                className="columns-1 gap-4 sm:columns-2 lg:columns-3"
              >
                {shown.map((p, i) => (
                  <button
                    key={p.id}
                    id={p.id}
                    type="button"
                    onClick={() => setOpen(i)}
                    aria-label={`Open ${p.caption}`}
                    className="mb-4 block w-full break-inside-avoid text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                  >
                    <Photo
                      photo={p}
                      caption={
                        <span className="flex items-baseline justify-between gap-4">
                          <span className="font-display text-lg italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                            {p.caption}
                          </span>
                          <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-300">
                            {p.stock ? "Mood" : CATEGORIES.find((c) => c.key === p.category)?.label}
                          </span>
                        </span>
                      }
                    />
                  </button>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key={`empty-${filter}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease: EASE }}
                className="mx-auto max-w-2xl border border-white/[0.08] bg-[radial-gradient(ellipse_at_top,rgba(233,184,78,0.1),transparent_60%)] px-8 py-16 text-center sm:px-12"
              >
                <p className="font-display text-2xl italic text-cream sm:text-3xl" style={{ fontVariationSettings: '"opsz" 36' }}>
                  No {CATEGORIES.find((c) => c.key === filter)?.label.toLowerCase()} on the page yet.
                </p>
                <p className="mt-4 text-[15px] leading-relaxed text-stone-400">
                  We add frames here once the families say yes to sharing them. The newest coverage always
                  lands on Facebook first.
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-8 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold"
                >
                  See the latest on Facebook
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <Lightbox photos={shown} index={open} onClose={() => setOpen(null)} onIndex={setOpen} />
      <Inquire compact />
    </>
  );
}
