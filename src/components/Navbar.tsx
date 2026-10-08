import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { NAV } from "../data/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.4 });

  /* the hero on the home page is full-bleed; every other page starts on ink */
  const solid = scrolled || pathname !== "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        solid ? "border-b border-white/[0.06] bg-ink/80 backdrop-blur-xl" : "border-b border-transparent bg-transparent"
      }`}
    >
      {/* scroll progress */}
      <motion.div
        style={{ scaleX: progress }}
        className="absolute inset-x-0 top-0 h-[2px] origin-left bg-gradient-to-r from-gold-deep via-gold to-amber-200"
        aria-hidden
      />
      <nav className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <Link to="/" className="group flex items-center gap-3 text-cream transition-colors duration-500 hover:text-gold">
          <Logo variant="horizontal" tone="mono" className="h-9 w-auto sm:h-10" />
          <span className="hidden text-[10px] font-semibold uppercase tracking-[0.28em] text-stone-500 md:inline">Lugait</span>
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {NAV.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                className={({ isActive }) =>
                  `group relative text-sm font-medium transition-colors duration-300 hover:text-cream ${
                    isActive ? "text-cream" : "text-stone-400"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    <span
                      className={`absolute -bottom-1.5 left-0 h-px bg-gold transition-all duration-400 group-hover:w-full ${
                        isActive ? "w-full" : "w-0"
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="group hidden items-center gap-2 rounded-full bg-gold px-5 py-2.5 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_10px_30px_-8px_rgba(233,184,78,0.6)] sm:inline-flex"
          >
            Inquire
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/5 text-cream backdrop-blur transition-colors hover:border-gold/40 lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-white/[0.06] bg-ink/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="space-y-1 px-5 py-6">
              {NAV.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -14 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                >
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      `block rounded-xl px-4 py-3 font-display text-2xl transition-colors hover:bg-white/5 hover:text-gold ${
                        isActive ? "text-gold" : "text-stone-300"
                      }`
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.4 }}
                className="pt-3"
              >
                <Link
                  to="/contact"
                  className="flex items-center justify-center gap-2 rounded-full bg-gold px-5 py-3.5 text-sm font-bold text-ink"
                >
                  Inquire about your date <ArrowRight className="size-4" />
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
