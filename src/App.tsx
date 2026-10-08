import { useCallback, useEffect, useRef, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import Intro, { frameClip, type IntroPhase } from "./components/Intro";
import { EASE } from "./components/Reveal";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Stories from "./pages/Stories";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const INTRO_KEY = "hulyo-trese:intro-seen";

function Site() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services" element={<Services />} />
        <Route path="stories" element={<Stories />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  const { pathname } = useLocation();
  /* The shutter intro plays once per visit, and only when the visit starts on the home page. */
  const [phase, setPhase] = useState<IntroPhase>(() => {
    if (typeof window === "undefined") return "done";
    const seen = window.sessionStorage.getItem(INTRO_KEY) === "1";
    return pathname === "/" && !seen ? "idle" : "done";
  });
  const [reducedMotion, setReducedMotion] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 640;

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  /* Lock scroll until the reveal finishes */
  useEffect(() => {
    if (phase === "done") {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    window.scrollTo(0, 0);
  }, [phase]);

  const finish = useCallback(() => {
    const el = wrapRef.current;
    if (el) {
      el.style.clipPath = "";
      el.style.filter = "";
      el.style.transform = "";
      el.style.willChange = "";
    }
    window.sessionStorage.setItem(INTRO_KEY, "1");
    setPhase("done");
  }, []);

  const onCapture = useCallback(() => setPhase("capturing"), []);
  const onDeveloped = useCallback(() => setPhase("developing"), []);
  const onSkip = useCallback(() => setPhase("developing"), []);

  const showSite = phase === "developing" || phase === "done";
  const fast = reducedMotion;
  /* visits that skip the intro mount the site plainly, with no reveal to play */
  const playsReveal = useRef(phase !== "done").current;

  return (
    <>
      {showSite && (
        <motion.div
          ref={wrapRef}
          initial={
            playsReveal
              ? {
                  clipPath: frameClip(isMobile),
                  filter: "brightness(0.1) saturate(0) blur(10px)",
                  scale: 0.9,
                }
              : false
          }
          animate={{
            clipPath: "inset(0% 0% 0% 0% round 0px)",
            filter: "brightness(1) saturate(1) blur(0px)",
            scale: 1,
          }}
          transition={
            fast
              ? { duration: 0.4 }
              : {
                  filter: { duration: 1.1, delay: 0.15, ease: EASE },
                  clipPath: { duration: 1.2, delay: 1.15, ease: EASE },
                  scale: { duration: 1.2, delay: 1.15, ease: EASE },
                }
          }
          onAnimationComplete={phase === "developing" ? finish : undefined}
        >
          <Site />
        </motion.div>
      )}

      <AnimatePresence>
        {phase !== "done" && (
          <Intro key="intro" phase={phase} onCapture={onCapture} onDeveloped={onDeveloped} onSkip={onSkip} />
        )}
      </AnimatePresence>
    </>
  );
}
