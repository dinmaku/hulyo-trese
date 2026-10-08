import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { EASE } from "./Reveal";

const TITLES: Record<string, string> = {
  "/": "Hulyo Trese — Wedding, Debut & Birthday Photo and Video, Lugait",
  "/services": "Services — Hulyo Trese",
  "/stories": "Stories — Hulyo Trese",
  "/about": "About — Hulyo Trese",
  "/contact": "Contact — Hulyo Trese",
};

/* Scroll restoration the way a multi-page site behaves: top on a new page, to the anchor when there is one. */
function useScrollOnNavigate() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    document.title = TITLES[pathname] ?? "Hulyo Trese";
    if (hash) {
      const id = hash.slice(1);
      /* give the new page a frame to mount before looking for the anchor */
      const t = window.setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 60);
      return () => window.clearTimeout(t);
    }
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [pathname, hash]);
}

export default function Layout() {
  const { pathname } = useLocation();
  useScrollOnNavigate();

  return (
    <div className="relative min-h-screen overflow-x-clip bg-ink text-stone-300">
      <div className="grain-overlay" aria-hidden />
      <Navbar />
      <AnimatePresence mode="wait" initial={false}>
        <motion.main
          key={pathname}
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(10px)", transition: { duration: 0.3 } }}
          transition={{ duration: 0.7, ease: EASE }}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </div>
  );
}
