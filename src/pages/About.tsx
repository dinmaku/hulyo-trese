import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import Inquire from "../components/Inquire";
import { Reveal } from "../components/Reveal";
import { photo } from "../data/photos";
import { TAGLINE } from "../data/site";

const BELIEFS = [
  {
    title: "The story is already His.",
    body: "We don't manufacture moments. A wedding, a debut, a birthday is a chapter God is writing in a family, and the honest thing to do is pay attention and keep up.",
  },
  {
    title: "The quiet frames matter most.",
    body: "Everyone will remember the first dance. Fewer will remember the groomsman fixing a boutonniere, or a mother wiping a tear on her daughter's forehead. Those are the frames we hunt for.",
  },
  {
    title: "Affordable should still look like this.",
    body: "Families in Lugait and the towns around it deserve coverage that looks the way a wedding feels. We keep our rates within reach and never let that show in the work.",
  },
];

export default function About() {
  const tote = photo("tote");
  const field = photo("couple-field");

  return (
    <>
      <PageHeader
        photo={photo("worship")}
        title={
          <>
            {TAGLINE.a} <em className="italic text-gold">{TAGLINE.b}</em>
          </>
        }
        sub="Hulyo Trese is a photo and video team from Lugait, Misamis Oriental. We shoot weddings, debuts, and birthdays for families across Northern Mindanao, and we do it as an act of faith."
      />

      <section className="py-8 sm:py-16">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <Reveal>
              <p className="font-display text-2xl leading-snug text-cream sm:text-3xl" style={{ fontVariationSettings: '"opsz" 48' }}>
                We photograph families the way you'd want your own family photographed.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-prose text-base leading-relaxed text-stone-400 sm:text-lg">
                We arrive early, we stay out of the way, and we treat the day as something sacred, whether
                it's a church wedding with a cord and a veil or a lolo's eightieth birthday in a covered
                court. The cameras are how we say thank you for being let in.
              </p>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-5 max-w-prose text-base leading-relaxed text-stone-400 sm:text-lg">
                Our home base is behind the 7/11 in Lugait, Misamis Oriental, and we travel across Northern
                Mindanao for the families who book us.
              </p>
            </Reveal>
          </div>
          <div className="grid grid-cols-5 gap-3 sm:gap-4 lg:col-span-7">
            <Reveal y={40} className="col-span-3">
              <Photo photo={photo("family-portrait")} ratio="4 / 5" />
            </Reveal>
            <Reveal y={40} delay={0.1} className="col-span-2 self-end">
              <Photo
                photo={tote}
                ratio="4 / 5"
                caption={
                  <span className="font-display text-base italic text-cream" style={{ fontVariationSettings: '"opsz" 36' }}>
                    {tote.caption}
                  </span>
                }
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="border-t border-white/[0.08] bg-coal py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          <Reveal y={50} className="lg:col-span-5">
            <Photo photo={field} ratio="4 / 5" className="lg:sticky lg:top-28" />
          </Reveal>
          <div className="lg:col-span-7">
            <Reveal>
              <h2
                className="text-balance font-display font-medium leading-[1.04] tracking-[-0.02em] text-cream"
                style={{ fontSize: "clamp(2.1rem, 4.2vw, 3.6rem)", fontVariationSettings: '"opsz" 96' }}
              >
                What we <em className="italic text-gold">believe</em> about this work
              </h2>
            </Reveal>
            <dl className="mt-12 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              {BELIEFS.map((b, i) => (
                <Reveal key={b.title} delay={0.06 * i}>
                  <div className="grid gap-3 py-8 sm:grid-cols-12 sm:gap-8">
                    <dt className="font-display text-2xl font-medium leading-tight text-cream sm:col-span-5" style={{ fontVariationSettings: '"opsz" 48' }}>
                      {b.title}
                    </dt>
                    <dd className="max-w-prose text-[15px] leading-relaxed text-stone-400 sm:col-span-7">{b.body}</dd>
                  </div>
                </Reveal>
              ))}
            </dl>
          </div>
        </div>
      </section>

      <Inquire compact />
    </>
  );
}
