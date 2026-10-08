import { Link } from "react-router-dom";
import { ArrowUp, Mail, MapPin, Phone } from "lucide-react";
import Logo from "./Logo";
import { ADDRESS, EMAIL, FACEBOOK_URL, NAV, PHONES, TAGLINE } from "../data/site";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
    <path d="M15.5 3.5h-2.6a3.4 3.4 0 0 0-3.4 3.4v2.6H6.8v3.4h2.7v7.6h3.4v-7.6h2.8l.7-3.4h-3.5V7.2a1 1 0 0 1 1-1h2.6Z" />
  </svg>
);

const services = [
  { label: "Weddings", to: "/services#weddings" },
  { label: "Debuts", to: "/services#debuts" },
  { label: "Birthdays", to: "/services#birthdays" },
  { label: "Photo + video", to: "/services#how" },
];

export default function Footer() {
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="border-t border-white/[0.06] bg-black/40">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <Link to="/" className="inline-flex text-cream transition-colors duration-500 hover:text-gold">
              <Logo variant="horizontal" tone="mono" className="h-11 w-auto" />
            </Link>
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-stone-500">
              Photo and video coverage for weddings, debuts, and birthdays in Lugait, Misamis Oriental and
              across Northern Mindanao.
            </p>
            <p className="mt-4 font-display text-lg italic text-stone-300" style={{ fontVariationSettings: '"opsz" 36' }}>
              {TAGLINE.a} {TAGLINE.b}
            </p>
            <div className="mt-7 flex gap-3">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Hulyo Trese on Facebook"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-stone-400 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:text-gold"
              >
                <FacebookIcon className="size-4" />
              </a>
              <a
                href={`mailto:${EMAIL}`}
                aria-label="Email Hulyo Trese"
                className="grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-stone-400 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:text-gold"
              >
                <Mail className="size-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-stone-500">Pages</h3>
            <ul className="mt-5 space-y-3">
              {NAV.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-sm text-stone-400 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-stone-500">Coverage</h3>
            <ul className="mt-5 space-y-3">
              {services.map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-sm text-stone-400 transition-colors hover:text-gold">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="text-[11px] font-bold uppercase tracking-[0.26em] text-stone-500">Find us</h3>
            <ul className="mt-5 space-y-4 text-sm text-stone-400">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 size-4 shrink-0 text-gold/80" />
                <span>
                  {ADDRESS.lines[0]}
                  <br />
                  {ADDRESS.lines[1]}
                  <br />
                  <span className="text-stone-500">{ADDRESS.landmark}</span>
                </span>
              </li>
              {PHONES.map((p) => (
                <li key={p.href}>
                  <a href={p.href} className="flex items-center gap-3 transition-colors hover:text-gold">
                    <Phone className="size-4 shrink-0 text-gold/80" />
                    {p.display}
                  </a>
                </li>
              ))}
              <li>
                <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 transition-colors hover:text-gold">
                  <Mail className="size-4 shrink-0 text-gold/80" />
                  {EMAIL}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-5 border-t border-white/[0.06] pt-8 sm:flex-row">
          <p className="text-xs text-stone-500">© {new Date().getFullYear()} Hulyo Trese. All rights reserved.</p>
          <p className="font-display text-xs italic text-stone-500">Lugait, Misamis Oriental</p>
          <button
            type="button"
            onClick={toTop}
            aria-label="Back to top"
            className="group grid size-10 place-items-center rounded-full border border-white/10 bg-white/[0.03] text-stone-400 transition-all duration-300 hover:-translate-y-1 hover:border-gold/40 hover:text-gold"
          >
            <ArrowUp className="size-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
