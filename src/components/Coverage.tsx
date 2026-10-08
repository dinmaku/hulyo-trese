import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import Photo from "./Photo";
import { Reveal, SectionTitle } from "./Reveal";
import { photo } from "../data/photos";

export const COVERAGE = [
  {
    id: "weddings",
    title: "Weddings",
    lead: "From the first details to the last dance.",
    body: "Prep, ceremony, and reception in photo and video, including the cord, the veil, the blessing, and the people who raised you watching it all happen.",
  },
  {
    id: "debuts",
    title: "Debuts",
    lead: "Eighteen roses, eighteen candles, one night.",
    body: "The entrance, the cotillion, every rose and candle speech, and the dance floor after, told as a story rather than a list of program items.",
  },
  {
    id: "birthdays",
    title: "Birthdays",
    lead: "The first, the fiftieth, the eightieth.",
    body: "Family parties, milestone birthdays, and the small moments between: lolo on the dance floor, the cake, the prayer before the meal.",
  },
];

export default function Coverage() {
  const field = photo("couple-field");

  return (
    <section className="relative py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-7">
          <SectionTitle
            title={
              <>
                Three kinds of days we <em className="italic text-gold">live</em> for
              </>
            }
            sub="Photo and video, together or on their own. Rates are quoted per event once we know your date, venue, and how long you'd like us there."
          />

          <ul className="mt-14 divide-y divide-white/[0.08] border-y border-white/[0.08]">
            {COVERAGE.map((c, i) => (
              <li key={c.id}>
                <Reveal delay={0.06 * i}>
                  <Link
                    to={`/services#${c.id}`}
                    className="group grid gap-3 py-8 transition-colors duration-500 sm:grid-cols-12 sm:gap-8"
                  >
                    <h3
                      className="font-display font-medium leading-none text-cream transition-colors duration-500 group-hover:text-gold sm:col-span-4"
                      style={{ fontSize: "clamp(2rem, 3.4vw, 3rem)", fontVariationSettings: '"opsz" 96' }}
                    >
                      {c.title}
                    </h3>
                    <div className="sm:col-span-7">
                      <p className="font-display text-lg italic text-stone-200" style={{ fontVariationSettings: '"opsz" 36' }}>
                        {c.lead}
                      </p>
                      <p className="mt-2 max-w-prose text-[15px] leading-relaxed text-stone-400">{c.body}</p>
                    </div>
                    <span className="hidden justify-end pt-2 text-stone-500 transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold sm:col-span-1 sm:flex">
                      <ArrowUpRight className="size-5" />
                    </span>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.2} y={50} className="lg:col-span-5 lg:pl-6">
          <div className="lg:sticky lg:top-28">
            <Photo
              photo={field}
              ratio="4 / 5"
              caption={
                <span className="font-display text-lg italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                  {field.caption}
                </span>
              }
            />
            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-stone-500">
              Wedding coverage · Shot by Hulyo Trese
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
