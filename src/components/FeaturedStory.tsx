import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Photo from "./Photo";
import { Reveal, SectionTitle } from "./Reveal";
import { photo } from "../data/photos";

/* One wedding told in its own frames: the client hasn't named the couple publicly, so neither do we. */
export default function FeaturedStory() {
  const ceremony = photo("ceremony-garden");
  const aisle = photo("aisle-walk");
  const father = photo("father-bride");
  const family = photo("family-portrait");

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionTitle
            title={
              <>
                One day, <em className="italic text-gold">start to finish</em>
              </>
            }
            sub="A garden wedding as we saw it: walking in with heads bowed, the vows under a white tent, a father who held on, and the family around them after."
          />
          <Reveal delay={0.1}>
            <Link
              to="/stories"
              className="group inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cream transition-colors hover:text-gold lg:pb-2"
            >
              <span className="relative">
                See the full story
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold/60 transition-colors group-hover:bg-gold" />
              </span>
              <ArrowRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-3 sm:grid-cols-12 sm:gap-4">
          <Reveal y={40} className="sm:col-span-8">
            <Photo
              photo={ceremony}
              ratio="3 / 2"
              caption={
                <span className="font-display text-lg italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                  {ceremony.caption}
                </span>
              }
            />
          </Reveal>
          <div className="grid grid-cols-2 gap-3 sm:col-span-4 sm:grid-cols-1 sm:gap-4">
            <Reveal y={40} delay={0.08}>
              <Photo photo={aisle} ratio="4 / 3" />
            </Reveal>
            <Reveal y={40} delay={0.14}>
              <Photo photo={father} ratio="4 / 3" />
            </Reveal>
          </div>
          <Reveal y={40} delay={0.2} className="sm:col-span-12">
            <Photo
              photo={family}
              ratio="21 / 9"
              caption={
                <span className="font-display text-lg italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                  {family.caption}
                </span>
              }
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
