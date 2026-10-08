import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { Reveal } from "./Reveal";
import { photo } from "../data/photos";
import { TAGLINE } from "../data/site";

export default function Calling() {
  const worship = photo("worship");

  return (
    <section className="relative overflow-hidden bg-coal py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Reveal y={50} className="lg:col-span-6">
          <Photo photo={worship} ratio="5 / 4" />
        </Reveal>

        <div className="lg:col-span-6">
          <Reveal>
            <p
              className="font-display italic leading-[1.05] text-cream"
              style={{ fontSize: "clamp(2.4rem, 5vw, 4.5rem)", fontVariationSettings: '"opsz" 144' }}
            >
              {TAGLINE.a}
              <br />
              <span className="text-gold">{TAGLINE.b}</span>
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 max-w-prose text-base leading-relaxed text-stone-300 sm:text-lg">
              That line is the whole brief. We believe every wedding, every debut, every birthday is a
              chapter in a story God is already telling, and our job is to pay attention to it: the
              cord and the rings, the parents who can't let go, the prayer before the dance floor opens.
            </p>
          </Reveal>
          <Reveal delay={0.18}>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-stone-400">
              We're based in Lugait, Misamis Oriental, and we travel across Northern Mindanao for the
              families who invite us in.
            </p>
          </Reveal>
          <Reveal delay={0.26}>
            <Link
              to="/about"
              className="group mt-10 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cream transition-colors hover:text-gold"
            >
              <span className="relative">
                Why we shoot
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold/60 transition-colors group-hover:bg-gold" />
              </span>
              <ArrowRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
