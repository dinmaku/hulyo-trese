import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight } from "lucide-react";
import { EASE } from "./Reveal";
import { GradeLayers } from "./Grade";
import { credit, photo } from "../data/photos";
import { ADDRESS, FACEBOOK_URL, PHONES, TAGLINE } from "../data/site";

type Slide = {
  src: string;
  alt: string;
  line1: string;
  line2: string;
  label: string;
  sub: string;
  align: "left" | "right";
  position: string;
  frame?: { width: string; left: string };
  mono?: boolean;
  stock?: boolean;
};

const SLIDES: Slide[] = [
  {
    ...photo("aisle-walk"),
    line1: "I do,",
    line2: "forever",
    label: "Weddings",
    sub: "Photo + video coverage",
    align: "left",
    position: "50% 28%",
  },
  {
    ...photo("debut-eighteen"),
    line1: "Make",
    line2: "a wish",
    label: "Debuts",
    sub: "18 roses to 18 candles",
    align: "right",
    position: "42% 40%",
  },
  {
    ...photo("birthday-candles"),
    line1: "Let there",
    line2: "be joy",
    label: "Birthdays",
    sub: "The first to the eightieth",
    align: "left",
    position: "50% 38%",
  },
  {
    ...photo("worship"),
    line1: "Every story",
    line2: "has light",
    label: "Our calling",
    sub: "Lugait, Misamis Oriental",
    align: "right",
    position: "50% 42%",
  },
];

const INTERVAL = 6500;

const textVariants = {
  initial: (dir: 1 | -1) => ({ opacity: 0, x: 70 * dir, filter: "blur(14px)" }),
  animate: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: (dir: 1 | -1) => ({ opacity: 0, x: -60 * dir, filter: "blur(12px)" }),
};

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const [reduced, setReduced] = useState(false);

  /* mouse parallax on the photo */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 45, damping: 20 });
  const sy = useSpring(my, { stiffness: 45, damping: 20 });
  const imgX = useTransform(sx, (v) => v * -22);
  const imgY = useTransform(sy, (v) => v * -16);

  const onMouseMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width - 0.5);
    my.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    /* warm the cache so slide changes never flash */
    SLIDES.forEach((s) => {
      const img = new Image();
      img.src = s.src;
    });
  }, []);

  const go = useCallback((next: number, d: 1 | -1) => {
    setDir(d);
    setIndex(((next % SLIDES.length) + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = setInterval(() => go(index + 1, 1), INTERVAL);
    return () => clearInterval(t);
  }, [index, go]);

  const slide = SLIDES[index];
  const right = slide.align === "right";

  return (
    <section
      ref={ref}
      id="top"
      onMouseMove={onMouseMove}
      className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink"
      aria-roledescription="carousel"
      aria-label="Featured work"
    >
      {/* ── Photo stack ─────────────────────────────────────── */}
      <motion.div style={{ x: imgX, y: imgY }} className="absolute -inset-6 -z-10">
        <AnimatePresence initial={false}>
          <motion.div
            key={slide.src}
            initial={{ opacity: 0, filter: "blur(22px)" }}
            animate={{
              opacity: 1,
              filter: "blur(0px)",
              transition: {
                opacity: { duration: 1.1, ease: "easeOut" },
                filter: { duration: 1.3, ease: EASE },
              },
            }}
            exit={{ opacity: 0, filter: "blur(22px)", transition: { duration: 1.1, ease: "easeIn" } }}
            className="absolute inset-0"
          >
            <motion.img
              src={slide.src}
              alt={slide.alt}
              initial={false}
              animate={{ scale: reduced ? 1 : [1.04, 1.12] }}
              transition={{ duration: reduced ? 0 : INTERVAL / 1000 + 1.5, ease: "linear" }}
              style={{
                objectPosition: slide.position,
                width: slide.frame?.width ?? "100%",
                left: slide.frame?.left ?? 0,
              }}
              className={`absolute inset-y-0 h-full max-w-none object-cover grade-locked ${slide.mono ? "grade-mono" : "grade-cinema"}`}
            />
            <GradeLayers grade={slide.mono ? "mono" : "cinema"} locked />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* ── Cinematic grading ───────────────────────────────── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-ink/35" />
      <div
        aria-hidden
        className={`pointer-events-none absolute inset-0 -z-10 transition-all duration-1000 ${
          right
            ? "bg-gradient-to-l from-ink/85 via-ink/30 to-transparent"
            : "bg-gradient-to-r from-ink/85 via-ink/30 to-transparent"
        }`}
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-48 bg-gradient-to-b from-ink/80 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-72 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{ background: "radial-gradient(ellipse at center, transparent 45%, rgba(10,9,8,0.7) 100%)" }}
      />

      {/* ── Headline ────────────────────────────────────────── */}
      <div className="mx-auto flex w-full max-w-7xl flex-1 items-center px-5 pb-52 pt-32 sm:px-8 sm:pb-56 sm:pt-36 lg:pb-48">
        <div className={`grid w-full ${right ? "lg:justify-items-end" : "lg:justify-items-start"}`}>
          <AnimatePresence mode="popLayout" custom={dir} initial={false}>
            <motion.div
              key={index}
              custom={dir}
              variants={textVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 1, ease: EASE }}
              className={`w-full max-w-4xl ${right ? "lg:text-right" : ""}`}
            >
              <h1
                className="font-display font-medium uppercase leading-[0.9] tracking-[-0.02em] text-cream drop-shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                style={{ fontVariationSettings: '"opsz" 144', fontSize: "clamp(3.4rem, 11vw, 9.5rem)" }}
              >
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 1, ease: EASE }}
                  className="block"
                >
                  {slide.line1}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.22, duration: 1, ease: EASE }}
                  className={`flex flex-wrap items-end gap-x-6 gap-y-2 ${right ? "lg:justify-end" : ""}`}
                >
                  <span className="block">{slide.line2}</span>
                  {/* italic category label */}
                  <span className="mb-[0.18em] block text-left normal-case tracking-normal [text-shadow:0_2px_18px_rgba(0,0,0,0.85)]">
                    <em
                      className="block font-display font-light italic leading-none text-gold"
                      style={{ fontSize: "clamp(1.3rem, 2.6vw, 2.2rem)", fontVariationSettings: '"opsz" 72' }}
                    >
                      {slide.label}
                    </em>
                    <span className="mt-2 block max-w-[9rem] font-sans text-[10px] font-medium leading-snug tracking-[0.04em] text-stone-200 sm:text-[11px]">
                      {slide.sub}
                      <br />
                      {credit(slide)}
                    </span>
                  </span>
                </motion.span>
              </h1>

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45, duration: 0.9, ease: EASE }}
                className={`mt-9 flex ${right ? "lg:justify-end" : ""}`}
              >
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cream transition-colors hover:text-gold"
                >
                  <span className="relative">
                    Message us on Facebook
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-left scale-x-100 bg-gold/60 transition-transform duration-500 group-hover:scale-x-0" />
                    <span className="absolute -bottom-1.5 left-0 h-px w-full origin-right scale-x-0 bg-gold transition-transform duration-500 delay-150 group-hover:scale-x-100" />
                  </span>
                  <ArrowRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────── */}
      <div className="absolute inset-x-0 bottom-0">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-6 px-5 pb-8 sm:px-8 sm:pb-10">
          {/* studio info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, ease: EASE }}
            className="max-w-sm"
          >
            <p
              className="font-display text-base italic leading-snug text-cream sm:text-lg"
              style={{ fontVariationSettings: '"opsz" 36' }}
            >
              {TAGLINE.a}
              <br />
              {TAGLINE.b}
            </p>
            <p className="mt-3 text-[10px] font-extrabold uppercase leading-relaxed tracking-[0.22em] text-cream sm:text-[11px]">
              Photo &amp; video &middot; Lugait, Misamis Oriental
            </p>
            <p className="mt-1.5 text-[11px] font-medium tracking-wide text-stone-400">
              {ADDRESS.landmark} &middot;{" "}
              <a href={PHONES[0].href} className="transition-colors hover:text-gold">
                {PHONES[0].display}
              </a>
            </p>
          </motion.div>

          {/* slide indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 1 }}
            className="hidden items-center gap-5 md:flex"
            role="tablist"
            aria-label="Slides"
          >
            <span className="font-display text-sm tabular-nums text-cream">0{index + 1}</span>
            <div className="flex items-center gap-2">
              {SLIDES.map((s, i) => (
                <button
                  key={s.src}
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Show slide ${i + 1}: ${s.label}`}
                  onClick={() => go(i, i > index ? 1 : -1)}
                  className="group relative h-6 w-10 cursor-pointer"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-white/20 transition-colors group-hover:bg-white/40" />
                  {i === index && (
                    <motion.span
                      key={`bar-${index}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: INTERVAL / 1000, ease: "linear" }}
                      className="absolute inset-x-0 top-1/2 h-px origin-left -translate-y-1/2 bg-gold"
                    />
                  )}
                </button>
              ))}
            </div>
            <span className="font-display text-sm tabular-nums text-stone-500">0{SLIDES.length}</span>
          </motion.div>

          {/* scroll button */}
          <motion.a
            href="#recent"
            aria-label="Scroll to next section"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.9, ease: EASE }}
            className="group relative grid size-14 shrink-0 place-items-center rounded-full bg-gold text-ink shadow-[0_18px_44px_-10px_rgba(233,184,78,0.6)] transition-all duration-300 hover:-translate-y-1 hover:bg-amber-300 sm:size-16"
          >
            <span className="absolute inset-0 rounded-full border border-gold/40 animate-ping [animation-duration:2.6s]" aria-hidden />
            <ArrowDown className="size-5 transition-transform duration-500 group-hover:translate-y-1" strokeWidth={2.2} />
          </motion.a>
        </div>
      </div>

      {/* film-strip edge marks, like the reference's frame */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-[72px] -z-10 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />
    </section>
  );
}
