import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Aperture, MousePointerClick } from "lucide-react";
import Logo from "./Logo";
import { EASE } from "./Reveal";

export type IntroPhase = "idle" | "capturing" | "developing" | "done";

/* Frame geometry — shared with the site clip-path reveal in App.tsx */
export const FRAME = {
  desktop: { top: "26%", right: "28%", bottom: "26%", left: "28%" },
  mobile: { top: "33%", right: "9%", bottom: "33%", left: "9%" },
};
export const frameClip = (mobile: boolean) => {
  const f = mobile ? FRAME.mobile : FRAME.desktop;
  return `inset(${f.top} ${f.right} ${f.bottom} ${f.left} round 28px)`;
};

const BLADES = 6;
const IRIS_OPEN = 60;
const IRIS_CLOSED = 136;

/* Tiny synthesized shutter "ka-chick" — no asset needed */
function playShutter() {
  try {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    const ctx = new Ctx();
    const click = (at: number, freq: number, dur: number, vol: number) => {
      const len = Math.floor(ctx.sampleRate * dur);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = 0.9;
      const gain = ctx.createGain();
      gain.gain.value = vol;
      src.connect(filter).connect(gain).connect(ctx.destination);
      src.start(ctx.currentTime + at);
    };
    click(0, 3400, 0.045, 0.6);
    click(0.1, 1600, 0.1, 0.5);
  } catch {
    /* audio is a nicety, never a blocker */
  }
}

function Iris({ closed }: { closed: boolean }) {
  return (
    <motion.div
      className="absolute inset-0 overflow-hidden rounded-full"
      animate={{ rotate: closed ? 28 : 0 }}
      transition={{ duration: closed ? 0.18 : 0.32, ease: closed ? "easeIn" : EASE }}
    >
      {Array.from({ length: BLADES }).map((_, i) => (
        <div key={i} className="absolute inset-0" style={{ transform: `rotate(${(360 / BLADES) * i}deg)` }}>
          <motion.div
            className="absolute rounded-full border-l border-white/15 bg-gradient-to-br from-zinc-600 via-zinc-800 to-zinc-950 shadow-[inset_0_0_14px_rgba(0,0,0,0.8)]"
            style={{
              left: "100%",
              top: "3.125%",
              width: "93.75%",
              height: "93.75%",
              transformOrigin: "0% 50%",
            }}
            animate={{ rotate: closed ? IRIS_CLOSED : IRIS_OPEN }}
            transition={{ duration: closed ? 0.18 : 0.32, ease: closed ? "easeIn" : EASE }}
          />
        </div>
      ))}
    </motion.div>
  );
}

export default function Intro({
  phase,
  onCapture,
  onDeveloped,
  onSkip,
}: {
  phase: IntroPhase;
  onCapture: () => void;
  onDeveloped: () => void;
  onSkip: () => void;
}) {
  const [irisClosed, setIrisClosed] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 70, damping: 16 });
  const sy = useSpring(my, { stiffness: 70, damping: 16 });
  const rotateY = useTransform(sx, (v) => v * 18);
  const rotateX = useTransform(sy, (v) => v * -14);
  const glowX = useTransform(sx, (v) => `${50 + v * 30}%`);
  const glowY = useTransform(sy, (v) => `${50 + v * 30}%`);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* Capture timeline */
  useEffect(() => {
    if (phase !== "capturing") return;
    setIrisClosed(true);
    const t1 = setTimeout(() => setFlash(true), 150);
    const t2 = setTimeout(() => setIrisClosed(false), 430);
    const t3 = setTimeout(onDeveloped, 820);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [phase, onDeveloped]);

  const onMouseMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  const handleCapture = () => {
    if (phase !== "idle") return;
    playShutter();
    onCapture();
  };

  const idle = phase === "idle";
  const developing = phase === "developing";
  const frame = isMobile ? FRAME.mobile : FRAME.desktop;

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      role="dialog"
      aria-label="Welcome to Hulyo Trese"
      className={`fixed inset-0 z-[100] overflow-hidden ${developing ? "pointer-events-none" : ""}`}
      initial={{ backgroundColor: "rgba(10,9,8,1)" }}
      animate={{ backgroundColor: developing ? "rgba(10,9,8,0)" : "rgba(10,9,8,1)" }}
      transition={{ duration: 0.6, delay: developing ? 1.2 : 0 }}
      exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {/* Ambient scene */}
      <motion.div
        aria-hidden
        animate={{ opacity: developing ? 0 : 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0"
      >
        <motion.div
          style={{ left: glowX, top: glowY }}
          className="absolute size-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gold/[0.12] blur-[150px]"
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_30%,rgba(0,0,0,0.75)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]" />
      </motion.div>

      {/* Viewfinder HUD */}
      <motion.div
        aria-hidden
        animate={{ opacity: developing ? 0 : 1 }}
        transition={{ duration: 0.5 }}
        className="absolute inset-0 text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-500"
      >
        <span className="absolute left-5 top-5 size-7 border-l-2 border-t-2 border-gold/60 sm:left-8 sm:top-8" />
        <span className="absolute right-5 top-5 size-7 border-r-2 border-t-2 border-gold/60 sm:right-8 sm:top-8" />
        <span className="absolute bottom-5 left-5 size-7 border-b-2 border-l-2 border-gold/60 sm:bottom-8 sm:left-8" />
        <span className="absolute bottom-5 right-5 size-7 border-b-2 border-r-2 border-gold/60 sm:bottom-8 sm:right-8" />

        <div className="absolute left-16 top-8 hidden items-center gap-2 sm:flex">
          <span className="size-2 animate-pulse rounded-full bg-red-500" /> REC · HT-13
        </div>
        <div className="absolute right-16 top-8 hidden sm:block">f/1.8 · 1/125 · ISO 400</div>
        <div className="absolute bottom-8 left-16 hidden sm:block">AF ● Locked</div>
        {/* centre focus bracket */}
        <div className="absolute left-1/2 top-1/2 size-[300px] -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-white/[0.06] sm:size-[420px]">
          <span className="absolute left-1/2 top-0 h-3 w-px -translate-x-1/2 bg-white/20" />
          <span className="absolute bottom-0 left-1/2 h-3 w-px -translate-x-1/2 bg-white/20" />
          <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
          <span className="absolute right-0 top-1/2 h-px w-3 -translate-y-1/2 bg-white/20" />
        </div>
      </motion.div>

      {/* Wordmark */}
      <motion.div
        initial={{ opacity: 0, y: -14 }}
        animate={{ opacity: developing ? 0 : 1, y: 0 }}
        transition={{ duration: 0.9, delay: developing ? 0 : 0.2, ease: EASE }}
        className="absolute left-1/2 top-16 -translate-x-1/2 text-center sm:top-20"
      >
        <Logo variant="horizontal" tone="mono" className="mx-auto h-9 w-auto text-cream sm:h-11" />
        <p className="mt-2.5 text-[10px] font-semibold uppercase tracking-[0.34em] text-stone-500">
          Photo &amp; Video · Lugait
        </p>
      </motion.div>

      {/* Camera */}
      <div className="absolute inset-0 grid place-items-center" style={{ perspective: 1400 }}>
        <motion.button
          type="button"
          onClick={handleCapture}
          aria-label="Press the shutter to enter the site"
          disabled={!idle}
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={
            developing
              ? { opacity: 0, y: 50, scale: 0.7, filter: "blur(12px)" }
              : { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
          }
          transition={{ duration: developing ? 0.6 : 1.1, delay: developing ? 0 : 0.35, ease: EASE }}
          style={{ rotateX, rotateY }}
          whileHover={idle ? { scale: 1.03 } : undefined}
          whileTap={idle ? { scale: 0.97 } : undefined}
          className="group relative cursor-pointer outline-none [transform-style:preserve-3d] focus-visible:ring-2 focus-visible:ring-gold/70 focus-visible:ring-offset-8 focus-visible:ring-offset-ink"
        >
          <div className="relative h-[200px] w-[330px] scale-[0.82] sm:scale-100">
            {/* top plate */}
            <div className="absolute -top-6 left-10 right-10 h-10 rounded-t-2xl border border-b-0 border-white/10 bg-gradient-to-b from-zinc-700 to-zinc-800" />
            {/* prism hump */}
            <div className="absolute -top-11 left-1/2 h-9 w-24 -translate-x-1/2 rounded-t-xl border border-b-0 border-white/10 bg-gradient-to-b from-zinc-700 to-zinc-800">
              <span className="absolute left-1/2 top-2 h-1 w-10 -translate-x-1/2 rounded-full bg-black/60" />
            </div>
            {/* mode dial */}
            <div className="absolute -top-9 left-14 h-5 w-11 rounded-md border border-white/10 [background:repeating-linear-gradient(90deg,#3f3f46_0_2px,#1c1c1f_2px_5px)]" />
            {/* shutter button */}
            <div className="absolute -top-10 right-14">
              <motion.span
                aria-hidden
                animate={idle ? { scale: [1, 1.9], opacity: [0.6, 0] } : { opacity: 0 }}
                transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
                className="absolute inset-0 rounded-full border-2 border-gold"
              />
              <motion.span
                animate={irisClosed ? { y: 4, scale: 0.92 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.12 }}
                className="relative grid size-8 place-items-center rounded-full bg-gradient-to-b from-amber-200 to-gold-deep shadow-[0_6px_14px_-4px_rgba(233,184,78,0.8),inset_0_-3px_6px_rgba(0,0,0,0.3)] transition-shadow group-hover:shadow-[0_0_28px_rgba(233,184,78,0.7)]"
              >
                <span className="size-2.5 rounded-full bg-ink/30" />
              </motion.span>
            </div>

            {/* body */}
            <div className="absolute inset-0 overflow-hidden rounded-[26px] border border-white/10 bg-gradient-to-b from-zinc-800 via-zinc-900 to-black shadow-[0_40px_90px_-20px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.08)]">
              {/* leatherette */}
              <div className="absolute inset-x-0 bottom-7 top-9 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.07)_1px,transparent_1px)] bg-[size:4px_4px]" />
              {/* grip */}
              <div className="absolute bottom-5 left-3 top-5 w-11 rounded-2xl border border-white/[0.06] bg-gradient-to-r from-zinc-900 to-zinc-950" />
              {/* viewfinder window */}
              <div className="absolute left-[72px] top-3.5 h-5 w-9 overflow-hidden rounded-sm border border-white/10 bg-black">
                <span className="absolute -left-2 top-0 h-full w-3 rotate-12 bg-white/10" />
              </div>
              {/* self-timer lamp */}
              <span className="absolute left-[118px] top-5 size-2.5 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.9)]" />
              {/* flash window */}
              <div className="absolute right-[76px] top-3.5 h-5 w-12 overflow-hidden rounded-sm border border-white/10 bg-gradient-to-b from-zinc-600 to-zinc-800 [background-image:repeating-linear-gradient(90deg,rgba(255,255,255,0.15)_0_2px,transparent_2px_5px)]" />
              {/* brand */}
              <span className="absolute right-6 top-3 font-display text-sm italic text-gold">Hulyo Trese</span>
              <span className="absolute bottom-3 right-6 text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                HT-13 · 35mm
              </span>
              <span className="absolute bottom-3 left-[72px] text-[9px] font-semibold uppercase tracking-[0.3em] text-stone-600">
                Est. 2013
              </span>
            </div>

            {/* lens */}
            <div className="absolute left-1/2 top-1/2 size-[168px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.9)] [background:repeating-conic-gradient(#3f3f46_0_2.5deg,#18181b_2.5deg_5deg)]">
              <div className="absolute inset-[9px] rounded-full border border-white/5 bg-gradient-to-b from-zinc-800 to-zinc-950">
                <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[7px] font-semibold uppercase tracking-[0.3em] text-stone-500">
                  50mm 1:1.8
                </span>
              </div>
              {/* glass */}
              <div className="absolute inset-[22px] overflow-hidden rounded-full bg-[radial-gradient(circle_at_35%_30%,#3b3f6b_0%,#141633_40%,#05060f_75%)] shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
                <Iris closed={irisClosed} />
                {/* reflections over glass */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_25%,rgba(255,255,255,0.35),transparent_28%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle_at_70%_75%,rgba(233,184,78,0.22),transparent_30%)]" />
                <div className="pointer-events-none absolute inset-0 rounded-full border border-white/10" />
              </div>
            </div>
          </div>
        </motion.button>
      </div>

      {/* Prompt */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: idle ? 1 : 0, y: idle ? 0 : 10 }}
        transition={{ duration: 0.7, delay: idle ? 1.1 : 0, ease: EASE }}
        className="absolute inset-x-0 bottom-24 flex flex-col items-center gap-3 text-center sm:bottom-20"
      >
        <span className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-sm font-semibold text-cream backdrop-blur">
          <MousePointerClick className="size-4 text-gold" />
          Press the shutter to begin
        </span>
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-600">
          A short capture · ~3 seconds
        </span>
      </motion.div>

      {/* Skip */}
      {!developing && (
        <button
          type="button"
          onClick={onSkip}
          className="absolute bottom-6 right-6 text-[11px] font-semibold uppercase tracking-[0.26em] text-stone-500 transition-colors hover:text-gold sm:bottom-8 sm:right-20"
        >
          Skip intro →
        </button>
      )}

      {/* Developing status */}
      {developing && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 1, 0] }}
          transition={{ duration: 1.6, times: [0, 0.2, 0.7, 1] }}
          className="absolute inset-x-0 flex items-center justify-center gap-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold"
          style={{ top: `calc(100% - ${frame.bottom} + 20px)` }}
        >
          <Aperture className="size-3.5 animate-spin-slower" /> Developing
        </motion.div>
      )}

      {/* Photo frame that expands into the site */}
      {developing && (
        <motion.div
          aria-hidden
          initial={{ ...frame, borderRadius: 28, opacity: 1 }}
          animate={{ top: "0%", right: "0%", bottom: "0%", left: "0%", borderRadius: 0, opacity: 0 }}
          transition={{ duration: 1.2, delay: 1.15, ease: EASE, opacity: { duration: 0.5, delay: 1.9 } }}
          className="absolute border-[3px] border-cream/90 shadow-[0_0_80px_-10px_rgba(233,184,78,0.45)]"
        />
      )}

      {/* Flash */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: flash ? [0, 1, 0.85, 0] : 0 }}
        transition={{ duration: 0.75, times: [0, 0.06, 0.2, 1], ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-white"
      />
    </motion.div>
  );
}
