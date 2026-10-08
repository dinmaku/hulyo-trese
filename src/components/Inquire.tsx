import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Reveal } from "./Reveal";
import Photo from "./Photo";
import { photo } from "../data/photos";
import { FACEBOOK_URL, PHONES } from "../data/site";

export default function Inquire({ compact = false }: { compact?: boolean }) {
  const field = photo("couple-field");

  return (
    <section className={`relative px-5 sm:px-8 ${compact ? "pb-20 pt-8" : "pb-24 sm:pb-32"}`}>
      <Reveal>
        <div className="relative mx-auto min-h-[28rem] max-w-6xl overflow-hidden rounded-[2rem] border border-gold/20 px-6 py-16 text-center sm:min-h-[32rem] sm:px-12 sm:py-24">
          <Photo photo={field} fill locked className="absolute inset-0" imgClassName="group-hover:scale-100" />
          <div aria-hidden className="absolute inset-0 bg-ink/72" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/30" />
          <div className="relative">
            <h2
              className="mx-auto max-w-3xl text-balance font-display font-medium leading-[1.04] tracking-[-0.02em] text-cream"
              style={{ fontSize: "clamp(2.4rem, 5.5vw, 4.75rem)", fontVariationSettings: '"opsz" 144' }}
            >
              Tell us the date. <em className="italic text-gold">We'll bring the cameras.</em>
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-stone-400 sm:text-lg">
              Message us with your date, venue, and whether you'd like photo, video, or both. We'll
              reply with a package built around your day.
            </p>

            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_20px_50px_-12px_rgba(233,184,78,0.6)]"
              >
                Message us on Facebook
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </a>
              <a
                href={PHONES[0].href}
                className="inline-flex items-center gap-2.5 rounded-full border border-white/12 bg-white/[0.04] px-8 py-4 text-sm font-bold text-cream backdrop-blur transition-all duration-300 hover:border-gold/40 hover:text-gold"
              >
                <Phone className="size-4 text-gold" />
                {PHONES[0].display}
              </a>
            </div>

            <p className="mt-8 text-sm text-stone-500">
              Prefer a form?{" "}
              <Link to="/contact" className="text-stone-300 underline decoration-gold/50 underline-offset-4 transition-colors hover:text-gold">
                Send an inquiry
              </Link>{" "}
              and we'll get back to you.
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
