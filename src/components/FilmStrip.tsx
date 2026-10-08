import { useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { Reveal, SectionTitle } from "./Reveal";
import { STUDIO } from "../data/photos";

/* perforations drawn once, repeated along the strip's edges */
const SPROCKETS =
  "repeating-linear-gradient(90deg, transparent 0 14px, rgba(245,240,230,0.14) 14px 26px, transparent 26px 40px)";

export default function FilmStrip() {
  const track = useRef<HTMLDivElement>(null);

  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = track.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.round(el.clientWidth * 0.7), behavior: "smooth" });
  }, []);

  return (
    <section id="recent" className="relative scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <SectionTitle
          title={
            <>
              Frames we were <em className="italic text-gold">trusted</em> with
            </>
          }
          sub="Every photograph in this strip was shot by Hulyo Trese. The quiet moments between the big ones are the ones we go looking for."
        />
        <Reveal delay={0.1} className="flex items-center gap-3 sm:pb-2">
          <button
            type="button"
            onClick={() => scrollBy(-1)}
            aria-label="Scroll frames left"
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-stone-300 transition-all duration-300 hover:border-gold/40 hover:text-gold"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => scrollBy(1)}
            aria-label="Scroll frames right"
            className="grid size-11 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-stone-300 transition-all duration-300 hover:border-gold/40 hover:text-gold"
          >
            <ArrowRight className="size-4" />
          </button>
        </Reveal>
      </div>

      {/* the strip */}
      <Reveal delay={0.15} y={40} className="mt-12">
        <div className="relative bg-black/50 py-5">
          <div aria-hidden className="absolute inset-x-0 top-0 h-5 opacity-90" style={{ background: SPROCKETS, backgroundSize: "40px 100%", backgroundPosition: "center" }} />
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-5 opacity-90" style={{ background: SPROCKETS, backgroundSize: "40px 100%", backgroundPosition: "center" }} />
          <div aria-hidden className="absolute inset-x-0 top-5 h-px bg-white/[0.07]" />
          <div aria-hidden className="absolute inset-x-0 bottom-5 h-px bg-white/[0.07]" />

          <div
            ref={track}
            className="flex snap-x snap-mandatory gap-2 overflow-x-auto overscroll-x-contain px-5 py-4 [scrollbar-width:none] sm:px-8 [&::-webkit-scrollbar]:hidden"
          >
            {STUDIO.map((p, i) => (
              <Link
                key={p.id}
                to={`/stories#${p.id}`}
                className="group/frame relative shrink-0 snap-start focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold/70"
                aria-label={`Open ${p.caption} in Stories`}
              >
                <Photo
                  photo={p}
                  priority={i < 3}
                  className="h-[300px] w-auto sm:h-[380px] lg:h-[440px]"
                  caption={
                    <span className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-lg italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                        {p.caption}
                      </span>
                      <span className="font-display text-xs tabular-nums text-stone-300">{String(i + 1).padStart(2, "0")}</span>
                    </span>
                  }
                />
              </Link>
            ))}

            {/* trailing frame: the way into the gallery */}
            <Link
              to="/stories"
              className="group/more grid h-[300px] w-[240px] shrink-0 snap-start place-items-center border border-white/[0.08] bg-white/[0.02] text-center transition-colors duration-500 hover:border-gold/40 hover:bg-gold/[0.04] sm:h-[380px] sm:w-[300px] lg:h-[440px]"
            >
              <span>
                <span className="block font-display text-2xl text-cream">All stories</span>
                <span className="mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.28em] text-gold">
                  Open the gallery
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover/more:translate-x-1.5" />
                </span>
              </span>
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
