# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Couples, families, and celebrants in Lugait, Misamis Oriental and the wider Iligan / Northern Mindanao area booking photo and video coverage for a once-in-a-lifetime event: primarily **weddings, debuts (18th birthdays), and birthdays** (user confirmed). They are typically planning on a budget, discover suppliers through Facebook, and decide via Messenger or a phone call rather than an online checkout. Many are first-time clients of a professional photo/video team.

## Product Purpose

Hulyo Trese is a photography and videography outfit based in Lugait, Misamis Oriental, Philippines. It delivers affordable, quality **photo + video packages** for events, including wedding highlight videos (user confirmed; evidenced by the 9 Sep 2026 "Cherymie + Joey | Wedding Video Highlights" post). The landing page exists to turn Facebook-driven interest into booking inquiries. Success is an inquiry (Messenger, call, or email) for a dated event.

## Positioning

A local Lugait team offering combined photo *and* video coverage at "very affordable" rates without giving up quality (their own words on Facebook), with a faith-centered identity: "Tell His story, frame His glory." Neighbouring suppliers in Iligan/Cagayan de Oro are larger or pricier; Hulyo Trese's claim is local, personal, affordable, and done with reverence.

## Operating Context

- Discovery and conversation happen on Facebook: page "Hulyo Trese | Lugait" (https://www.facebook.com/profile.php?id=61578132836153), 314 followers, Reels with 0.7K to 7.4K views, 0 reviews yet (page is new).
- Clients message the page or call/text; the business is marked "Always open".
- Physical presence: Masilakon 2, Lugait, Misamis Oriental 9020; described in posts as "at the back of 7/11 Lugait". Map: https://maps.google.com/maps?q=8.34075000%2C124.26031000
- Works alongside local vendors on events; credits collaborators publicly (e.g., Bethel Hub - Studio Lugait for photo, HMUA, host). Hashtags used: #lugaitwedding #weddinginmindanao #weddingsupplieriligan #affordablephotographer #PhotoAndVideoPackage.
- Audience is mobile-first (Facebook / Messenger on phones).

## Capabilities and Constraints

Confirmed:
- Services: photo + video packages for events; wedding video highlights are a shipped deliverable.
- Event types to feature: weddings, debuts, birthdays (primary). Other event types are not confirmed.
- Contact: mobile 0912 921 2556 (listed on page); 0926 553 5607 (given in a post caption); email iambuilder13@gmail.com.
- Stack already in place: React 19 + Vite 7 + TypeScript + Tailwind CSS 4 + Framer Motion, single-file build (vite-plugin-singlefile).

Undecided / not yet known (do not invent):
- Package names, inclusions, and prices. The Facebook page says only "very affordable and quality". Current site prices are placeholders.
- Service area boundaries (travel radius, travel fees).
- Turnaround times for photos and video.
- Booking mechanics (deposit, contract, how far ahead).
- Team size and names, founding date.
- Whether studio portraits or studio rental are offered (not selected by user).

## Brand Commitments

- Name: **Hulyo Trese** (Filipino for "July 13"). Page title on Facebook: "Hulyo Trese | Lugait".
- Tagline, binding and to be carried openly with a visible faith-centered voice (user confirmed): **"Tell His story, frame His glory."**
- Voice in posts: warm, grateful, community-minded ("#ThankYouLord", public thanks to collaborators), plain-spoken about affordability.
- Logo: olive-green "H" monogram with a film strip woven through it and a thin script "Hulyo Trese" wordmark. Brand green `#71933D`, strip `#546E27`. Client reference at `src/images/logo-reference.jpg` (500 px JPG); recreated as vector in `src/components/Logo.tsx` (lockup / mark / horizontal; brand or mono tones) and exported to `src/assets/logo/*.svg`. The script is set in Allura (OFL) as the closest match to the reference lettering; replace with the original vector if the client has one.
- Real event photography/video stills will be supplied by the client (user confirmed). First real frame in repo: `src/images/wedding-romel-jocelyn.jpg`.

## Evidence on Hand

- Facebook page content (About, intro, one public post) as captured on 8 Oct 2026. This page is the **single source of truth** for business facts (user confirmed).
- Real deliverable: "Cherymie + Joey | Wedding Video Highlights" (5:21 video, 58 reactions) posted 9 Sep 2026.
- Real photos in `src/images/`, shot by Hulyo Trese: the original wedding set plus `wedding-aisle-walk.jpg`, `wedding-father-bride.jpg`, `wedding-ceremony-garden.jpg`, `wedding-family.jpg`, `calling-worship.jpg`, `calling-tote.jpg`.
- Debuts and birthdays still have no client frames. User asked (8 Oct 2026) to stand in with online pictures until they do. Those files live at `src/images/stock-*.jpg`, are flagged `stock: true` in `src/data/photos.ts`, and must be credited **Mood frame** — never "Shot by Hulyo Trese". Replace them the moment real debut/birthday coverage arrives.
- Reels with view counts from 698 to 7.4K.

Absences future work must not fabricate:
- **Everything currently in `src/` is placeholder** (user confirmed): the Manila "studio" framing, 13 Mabini St. address, hello@hulyotrese.studio, +63 917 013 0713, portrait/editorial/product categories, the three packages (₱3,800 / ₱7,900 / ₱18,500), all testimonials and client names, stats (12,400+ sessions, 98% rebook, 46 brand partners, 14 awards), brand-partner logos, "Est. 2013", and all Pexels stock imagery.
- No client reviews or testimonials exist yet (0 Facebook reviews). Do not invent any.
- No awards, press, or brand partnerships are known.

## Product Principles

1. **Inquiry over checkout.** Every surface should make it effortless to message on Facebook/Messenger or call; pricing conversations happen in chat.
2. **Real events, real people.** Show the client's own weddings, debuts, and birthdays; never stand in with stock once real assets arrive, and never present placeholder proof as real.
3. **Affordable does not mean cheap-looking.** Communicate value and care; the craft of the site itself is the proof of quality.
4. **Faith is part of the story.** The tagline and a reverent, grateful voice are identity, not decoration.
5. **Local and personal.** Lugait and Northern Mindanao are the home ground; name the place and the community.

## Accessibility & Inclusion

Mobile-first audience arriving from Facebook on mid-range Android phones over mobile data: keep pages light, text legible at small sizes, tap targets generous, and video/imagery lazy-loaded. Bisaya/Filipino-speaking audience; English copy should stay plain and short.
