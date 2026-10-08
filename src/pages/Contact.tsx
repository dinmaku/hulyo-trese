import { useState, type FormEvent } from "react";
import { ArrowRight, ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import PageHeader from "../components/PageHeader";
import Photo from "../components/Photo";
import { Reveal } from "../components/Reveal";
import { photo } from "../data/photos";
import { ADDRESS, EMAIL, FACEBOOK_URL, PHONES } from "../data/site";

const EVENT_TYPES = ["Wedding", "Debut", "Birthday", "Something else"];
const COVERAGE = ["Photo + video", "Photo only", "Video only", "Not sure yet"];

const field =
  "w-full rounded-xl border border-white/12 bg-white/[0.03] px-4 py-3 text-[15px] text-cream placeholder:text-stone-500 transition-colors focus:border-gold/60 focus:bg-white/[0.05] focus:outline-none";
const label = "block text-[11px] font-bold uppercase tracking-[0.24em] text-stone-400";

export default function Contact() {
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const date = String(data.get("date") ?? "").trim();
    const venue = String(data.get("venue") ?? "").trim();
    const type = String(data.get("type") ?? "");
    const coverage = String(data.get("coverage") ?? "");
    const message = String(data.get("message") ?? "").trim();
    const contact = String(data.get("contact") ?? "").trim();

    if (!name || !contact) {
      setError("Add your name and a way to reach you so we can reply.");
      return;
    }
    setError(null);

    const subject = `${type} inquiry${date ? ` for ${date}` : ""} — ${name}`;
    const body = [
      `Name: ${name}`,
      `Reach me at: ${contact}`,
      `Event: ${type}`,
      `Date: ${date || "not set yet"}`,
      `Venue: ${venue || "not set yet"}`,
      `Coverage: ${coverage}`,
      "",
      message,
    ].join("\n");

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  };

  return (
    <>
      <PageHeader
        photo={photo("parents-embrace")}
        title={
          <>
            Let's talk about <em className="italic text-gold">your day</em>
          </>
        }
        sub="The fastest reply is a Facebook message or a call. If you'd rather write it all down, the form below opens an email to us with everything filled in."
      />

      <section className="pb-24 sm:pb-32">
        <div className="mx-auto mb-14 grid max-w-7xl grid-cols-3 gap-2 px-5 sm:gap-3 sm:px-8">
          {(["aisle-walk", "father-bride", "family-portrait"] as const).map((id, i) => (
            <Reveal key={id} y={30} delay={0.06 * i}>
              <Photo photo={photo(id)} ratio="4 / 3" locked={i === 1} />
            </Reveal>
          ))}
        </div>
        <div className="mx-auto grid max-w-7xl gap-14 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
          {/* direct lines */}
          <div className="lg:col-span-5">
            <Reveal>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-6 rounded-2xl bg-gold px-6 py-6 text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_20px_50px_-12px_rgba(233,184,78,0.6)] sm:px-8"
              >
                <span>
                  <span className="block font-display text-2xl font-medium">Message us on Facebook</span>
                  <span className="mt-1 block text-sm font-medium text-ink/70">Usually the quickest way to reach us</span>
                </span>
                <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>
            </Reveal>

            <dl className="mt-10 divide-y divide-white/[0.08] border-y border-white/[0.08]">
              <Reveal delay={0.06}>
                <div className="flex gap-5 py-6">
                  <Phone className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.8} />
                  <div>
                    <dt className={label}>Call or text</dt>
                    <dd className="mt-2 space-y-1">
                      {PHONES.map((p) => (
                        <a key={p.href} href={p.href} className="block font-display text-2xl text-cream transition-colors hover:text-gold">
                          {p.display}
                        </a>
                      ))}
                    </dd>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <div className="flex gap-5 py-6">
                  <Mail className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.8} />
                  <div>
                    <dt className={label}>Email</dt>
                    <dd className="mt-2">
                      <a href={`mailto:${EMAIL}`} className="font-display text-xl text-cream transition-colors hover:text-gold sm:text-2xl">
                        {EMAIL}
                      </a>
                    </dd>
                  </div>
                </div>
              </Reveal>
              <Reveal delay={0.14}>
                <div className="flex gap-5 py-6">
                  <MapPin className="mt-1 size-5 shrink-0 text-gold" strokeWidth={1.8} />
                  <div>
                    <dt className={label}>Find us</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-stone-300">
                      {ADDRESS.lines[0]}
                      <br />
                      {ADDRESS.lines[1]}
                      <br />
                      <span className="text-stone-500">{ADDRESS.landmark}</span>
                    </dd>
                    <a
                      href={ADDRESS.mapsLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group mt-3 inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.24em] text-gold"
                    >
                      Open in Maps
                      <ArrowUpRight className="size-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </div>
                </div>
              </Reveal>
            </dl>

            <Reveal delay={0.18} className="mt-10">
              <div className="overflow-hidden rounded-2xl border border-white/[0.08] [filter:grayscale(1)_invert(0.92)_hue-rotate(180deg)_contrast(0.9)]">
                <iframe
                  title="Map to Hulyo Trese, behind 7/11 Lugait"
                  src={ADDRESS.mapsEmbed}
                  className="block h-64 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>
            </Reveal>
          </div>

          {/* inquiry form */}
          <Reveal delay={0.1} y={40} className="lg:col-span-7">
            <form onSubmit={onSubmit} noValidate className="rounded-[2rem] border border-white/[0.08] bg-coal p-6 sm:p-10">
              <h2 className="font-display text-3xl font-medium text-cream" style={{ fontVariationSettings: '"opsz" 48' }}>
                Send an inquiry
              </h2>
              <p className="mt-2 text-[15px] text-stone-400">
                Fills in an email to {EMAIL}. Nothing is sent until you hit send in your mail app.
              </p>

              <div className="mt-8 grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={label}>
                    Your name
                  </label>
                  <input id="name" name="name" autoComplete="name" required className={`mt-2 ${field}`} placeholder="Maria & Jose" />
                </div>
                <div>
                  <label htmlFor="contact" className={label}>
                    Mobile or email
                  </label>
                  <input id="contact" name="contact" autoComplete="tel" required className={`mt-2 ${field}`} placeholder="0912 345 6789" />
                </div>
                <div>
                  <label htmlFor="type" className={label}>
                    Event
                  </label>
                  <select id="type" name="type" className={`mt-2 ${field} appearance-none`}>
                    {EVENT_TYPES.map((t) => (
                      <option key={t} className="bg-coal">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="coverage" className={label}>
                    Coverage
                  </label>
                  <select id="coverage" name="coverage" className={`mt-2 ${field} appearance-none`}>
                    {COVERAGE.map((t) => (
                      <option key={t} className="bg-coal">
                        {t}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="date" className={label}>
                    Date
                  </label>
                  <input id="date" name="date" type="date" className={`mt-2 ${field} [color-scheme:dark]`} />
                </div>
                <div>
                  <label htmlFor="venue" className={label}>
                    Venue or town
                  </label>
                  <input id="venue" name="venue" className={`mt-2 ${field}`} placeholder="Lugait, Misamis Oriental" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="message" className={label}>
                    Anything else
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`mt-2 ${field} resize-y`}
                    placeholder="How many hours, the program, moments that matter to you."
                  />
                </div>
              </div>

              {error && (
                <p role="alert" className="mt-6 rounded-xl border border-amber-400/40 bg-amber-400/10 px-4 py-3 text-sm text-amber-200">
                  {error}
                </p>
              )}
              {sent && !error && (
                <p role="status" className="mt-6 rounded-xl border border-gold/30 bg-gold/10 px-4 py-3 text-sm text-stone-200">
                  Your mail app should have opened with the inquiry filled in. If it didn't, message us on Facebook or
                  email {EMAIL} directly.
                </p>
              )}

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-gold px-8 py-4 text-sm font-bold text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-[0_20px_50px_-12px_rgba(233,184,78,0.6)]"
                >
                  Open email with inquiry
                  <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1.5" />
                </button>
                <span className="text-sm text-stone-500">We reply to every inquiry.</span>
              </div>
            </form>
          </Reveal>
        </div>
      </section>
    </>
  );
}
