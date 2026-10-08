import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import FAQ from "../components/FAQ";
import Inquire from "../components/Inquire";
import { Reveal } from "../components/Reveal";
import { photo } from "../data/photos";
import { FACEBOOK_URL } from "../data/site";

const STEPS = [
  {
    title: "Tell us about the day",
    body: "Date, venue, how many hours, and whether you want photo, video, or both. Facebook message, call, or the form on the contact page all work.",
  },
  {
    title: "We build the package",
    body: "No fixed menu. We quote around your schedule and your venue, so you're not paying for coverage you won't use.",
  },
  {
    title: "Coverage day",
    body: "We arrive before the first detail is set and stay through the moments you asked for, working quietly and staying out of the way.",
  },
  {
    title: "Your story, delivered",
    body: "Edited photographs, and for video coverage a highlight film that tells the day in a few minutes, like the wedding films on our Facebook page.",
  },
];

function Block({
  id,
  title,
  lead,
  body,
  moments,
  photos,
  flip = false,
}: {
  id: string;
  title: string;
  lead: string;
  body: string;
  moments: string[];
  photos: { id: string; ratio: string }[];
  flip?: boolean;
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-white/[0.08] py-20 sm:py-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <div className={`lg:col-span-5 ${flip ? "lg:order-2" : ""}`}>
          <Reveal>
            <h2
              className="font-display font-medium leading-none text-cream"
              style={{ fontSize: "clamp(2.6rem, 5vw, 4.5rem)", fontVariationSettings: '"opsz" 144' }}
            >
              {title}
            </h2>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="mt-6 font-display text-xl italic text-gold sm:text-2xl" style={{ fontVariationSettings: '"opsz" 36' }}>
              {lead}
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="mt-5 max-w-prose text-base leading-relaxed text-stone-400 sm:text-lg">{body}</p>
          </Reveal>
          <Reveal delay={0.2}>
            <h3 className="mt-10 text-[11px] font-bold uppercase tracking-[0.26em] text-stone-500">What we look for</h3>
            <ul className="mt-4 grid gap-x-8 gap-y-2.5 sm:grid-cols-2">
              {moments.map((m) => (
                <li key={m} className="flex items-baseline gap-3 text-[15px] text-stone-300">
                  <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gold" />
                  {m}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.26}>
            <Link
              to="/contact"
              className="group mt-10 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-cream transition-colors hover:text-gold"
            >
              <span className="relative">
                Ask about {title.toLowerCase()}
                <span className="absolute -bottom-1.5 left-0 h-px w-full bg-gold/60 transition-colors group-hover:bg-gold" />
              </span>
              <ArrowRight className="size-4 text-gold transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </Reveal>
        </div>

        <div className={`lg:col-span-7 ${flip ? "lg:order-1" : ""}`}>
          {photos.length > 0 ? (
            <div className="grid grid-cols-6 gap-3 sm:gap-4">
              {photos.map((p, i) => {
                const data = photo(p.id);
                const span = i === 0 ? "col-span-6" : "col-span-3";
                return (
                  <Reveal key={p.id} y={40} delay={0.08 * i} className={span}>
                    <Photo
                      photo={data}
                      ratio={p.ratio}
                      caption={
                        <span className="flex items-baseline justify-between gap-3">
                          <span className="font-display text-base italic text-cream sm:text-lg" style={{ fontVariationSettings: '"opsz" 36' }}>
                            {data.caption}
                          </span>
                          {data.stock && (
                            <span className="text-[10px] font-semibold uppercase tracking-[0.24em] text-stone-400">Mood</span>
                          )}
                        </span>
                      }
                    />
                  </Reveal>
                );
              })}
            </div>
          ) : (
            <Reveal y={40}>
              <div className="flex aspect-[5/4] flex-col justify-end border border-white/[0.08] bg-[radial-gradient(ellipse_at_top_left,rgba(233,184,78,0.1),transparent_60%)] p-8 sm:aspect-[3/2] sm:p-10">
                <p className="font-display text-2xl italic text-cream sm:text-3xl" style={{ fontVariationSettings: '"opsz" 36' }}>
                  Frames from our {title.toLowerCase()} coverage are on the way.
                </p>
                <p className="mt-4 max-w-prose text-[15px] leading-relaxed text-stone-400">
                  We're adding them to this page as families give us the go-ahead to share. Until then the
                  newest ones are on Facebook.
                </p>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group mt-6 inline-flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.28em] text-gold"
                >
                  See the latest on Facebook
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </a>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

export default function Services() {
  return (
    <>
      <PageHeader
        photo={photo("blessing")}
        title={
          <>
            Photo and video for the days <em className="italic text-gold">worth keeping</em>
          </>
        }
        sub="Weddings, debuts, and birthdays across Lugait and Northern Mindanao. Choose photo, video, or both, and we'll quote a package around your day rather than a menu."
      />

      <Block
        id="weddings"
        title="Weddings"
        lead="From the first details to the last dance."
        body="Full-day coverage in photo and video: preparations, the ceremony, and the reception. We shoot the program, but we're really there for the moments nobody plans."
        moments={["The cord, veil, and rings", "Parents during the vows", "The blessing", "First dance and the floor after", "Quiet minutes between events", "Guests who travelled far"]}
        photos={[
          { id: "ceremony-garden", ratio: "16 / 9" },
          { id: "aisle-walk", ratio: "3 / 2" },
          { id: "father-bride", ratio: "3 / 2" },
        ]}
      />

      <Block
        id="debuts"
        title="Debuts"
        lead="Eighteen roses, eighteen candles, one night."
        body="A debut is a family telling an eighteen-year-old who she is. We cover the entrance, the cotillion, every rose and candle speech, and the dancing after, in photo and video."
        moments={["The grand entrance", "Eighteen roses", "Eighteen candles and the speeches", "Father-and-daughter dance", "The cotillion", "Friends on the dance floor"]}
        photos={[
          { id: "debut-eighteen", ratio: "4 / 5" },
          { id: "debut-gown", ratio: "3 / 4" },
        ]}
        flip
      />

      <Block
        id="birthdays"
        title="Birthdays"
        lead="The first, the fiftieth, the eightieth."
        body="Milestone birthdays and family parties. The prayer before the meal, the cake, three generations in one frame, and whoever ends up leading the dancing."
        moments={["Grace before the meal", "The cake and the candles", "Grandparents with grandchildren", "Toasts and tributes", "Games and the dance floor", "The whole family, once"]}
        photos={[
          { id: "birthday-candles", ratio: "1 / 1" },
          { id: "birthday-family", ratio: "3 / 2" },
        ]}
      />

      {/* how it works */}
      <section id="how" className="scroll-mt-28 border-t border-white/[0.08] bg-coal py-20 sm:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <Reveal>
            <h2
              className="max-w-2xl text-balance font-display font-medium leading-[1.04] tracking-[-0.02em] text-cream"
              style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.6rem)", fontVariationSettings: '"opsz" 96' }}
            >
              How coverage <em className="italic text-gold">works</em>
            </h2>
          </Reveal>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.06] sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((s, i) => (
              <li key={s.title} className="bg-coal p-7 sm:p-8">
                <Reveal delay={0.06 * i}>
                  <h3 className="font-display text-xl font-medium text-cream sm:text-2xl">{s.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-stone-400">{s.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <FAQ />
      <Inquire compact />
    </>
  );
}
