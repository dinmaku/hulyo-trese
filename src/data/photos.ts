import romelJocelyn from "../images/wedding-romel-jocelyn.jpg";
import cordHands from "../images/wedding-cord-hands.jpg";
import ringsCord from "../images/wedding-rings-cord.jpg";
import cross from "../images/wedding-cross.jpg";
import groomPrep from "../images/wedding-groom-prep-mono.jpg";
import blessing from "../images/wedding-blessing.jpg";
import parentsEmbrace from "../images/wedding-parents-embrace.jpg";
import motherBride from "../images/wedding-mother-bride-mono.jpg";
import coupleField from "../images/wedding-couple-field.jpg";
import loloDance from "../images/wedding-lolo-dance.jpg";
import aisleWalk from "../images/wedding-aisle-walk.jpg";
import fatherBride from "../images/wedding-father-bride.jpg";
import ceremonyGarden from "../images/wedding-ceremony-garden.jpg";
import familyPortrait from "../images/wedding-family.jpg";
import worship from "../images/calling-worship.jpg";
import tote from "../images/calling-tote.jpg";
import debutRoses from "../images/stock-debut-roses.jpg";
import debutGown from "../images/stock-debut-gown.jpg";
import debutEighteen from "../images/stock-debut-eighteen.jpg";
import birthdayFamily from "../images/stock-birthday-family.jpg";
import birthdayCandles from "../images/stock-birthday-candles.jpg";
import birthdayCake from "../images/stock-birthday-cake.jpg";

export type Category = "weddings" | "debuts" | "birthdays" | "faith";

export type Photo = {
  id: string;
  src: string;
  alt: string;
  caption: string;
  category: Category;
  w: number;
  h: number;
  mono?: boolean;
  focus?: string;
  /* Pexels stand-in until the family shares real coverage. Never credit as ours. */
  stock?: boolean;
};

export const credit = (p: Pick<Photo, "stock">) => (p.stock ? "Mood frame" : "Shot by Hulyo Trese");

export const PHOTOS: Photo[] = [
  {
    id: "cord-hands",
    src: cordHands,
    alt: "Hands tying a twisted purple, yellow and white wedding cord over the bride's veil",
    caption: "The cord",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "55% 50%",
  },
  {
    id: "rings-cord",
    src: ringsCord,
    alt: "Two wedding rings on a dark floor inside a loop of white cord, orchids above and the couple's shoes below",
    caption: "Two rings",
    category: "weddings",
    w: 2048,
    h: 1365,
  },
  {
    id: "cross",
    src: cross,
    alt: "A wooden cross draped in white cloth with a crown of thorns, beside an arch of green and white balloons",
    caption: "Before anything else",
    category: "faith",
    w: 2048,
    h: 1365,
    focus: "30% 50%",
  },
  {
    id: "groom-prep",
    src: groomPrep,
    alt: "A groomsman fastens the groom's boutonniere while the groom bows his head, in black and white",
    caption: "Last details",
    category: "weddings",
    w: 2048,
    h: 1365,
    mono: true,
    focus: "60% 50%",
  },
  {
    id: "blessing",
    src: blessing,
    alt: "An officiant raises both hands in blessing over a bowed groom and a veiled bride holding white roses",
    caption: "The blessing",
    category: "weddings",
    w: 2048,
    h: 1365,
  },
  {
    id: "parents-embrace",
    src: parentsEmbrace,
    alt: "The bride's parents hold her in a long embrace as a bridesmaid in sage green looks on",
    caption: "Her parents",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 40%",
  },
  {
    id: "mother-bride",
    src: motherBride,
    alt: "A mother wipes a tear with her forehead pressed to her daughter's, the bride smiling with her bouquet, in black and white",
    caption: "Mother and daughter",
    category: "weddings",
    w: 2048,
    h: 1365,
    mono: true,
    focus: "55% 45%",
  },
  {
    id: "romel-jocelyn",
    src: romelJocelyn,
    alt: "Romel and Jocelyn on stage at their wedding reception, the bride speaking into a microphone beneath a white floral arch",
    caption: "Romel & Jocelyn",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 20%",
  },
  {
    id: "couple-field",
    src: coupleField,
    alt: "A laughing bride carries her groom on her back through a field of white wildflowers",
    caption: "After the vows",
    category: "weddings",
    w: 1365,
    h: 2048,
    focus: "50% 35%",
  },
  {
    id: "lolo-dance",
    src: loloDance,
    alt: "An elderly man in an embroidered barong dances with his arms raised while family cheers behind him",
    caption: "Lolo takes the floor",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 30%",
  },
  {
    id: "aisle-walk",
    src: aisleWalk,
    alt: "A groom in a barong and a bride in a lace veil walk the aisle with heads bowed, her bouquet of blue flowers between them",
    caption: "Walking in",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 35%",
  },
  {
    id: "father-bride",
    src: fatherBride,
    alt: "A father in a light blue shirt holds his daughter in a long embrace under a white floral arch",
    caption: "Her father",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "48% 40%",
  },
  {
    id: "ceremony-garden",
    src: ceremonyGarden,
    alt: "A garden ceremony under a white tent, the couple seated before the officiant, a camera on a tripod at the aisle",
    caption: "The vows",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 55%",
  },
  {
    id: "family-portrait",
    src: familyPortrait,
    alt: "The couple with both families, smiling under a white floral arch, the bride holding a bouquet of blue flowers",
    caption: "The family",
    category: "weddings",
    w: 2048,
    h: 1365,
    focus: "50% 40%",
  },
  {
    id: "worship",
    src: worship,
    alt: "A speaker on stage before a crowd, a cross on the screen behind him, blue stage lights above",
    caption: "A night of worship",
    category: "faith",
    w: 2048,
    h: 1365,
    focus: "50% 40%",
  },
  {
    id: "tote",
    src: tote,
    alt: "A canvas tote bag printed Ask me about Jesus hanging at a night market stall",
    caption: "Ask me about Jesus",
    category: "faith",
    w: 2048,
    h: 1365,
    focus: "55% 45%",
  },
  {
    id: "debut-roses",
    src: debutRoses,
    alt: "A young woman in a tiara holding a bouquet of pink and white roses",
    caption: "The roses",
    category: "debuts",
    w: 1920,
    h: 1278,
    focus: "40% 40%",
    stock: true,
  },
  {
    id: "debut-gown",
    src: debutGown,
    alt: "A young woman in a pink ball gown and tiara looking back over her shoulder outdoors",
    caption: "The gown",
    category: "debuts",
    w: 1920,
    h: 2880,
    focus: "50% 28%",
    stock: true,
  },
  {
    id: "debut-eighteen",
    src: debutEighteen,
    alt: "A young woman in a gold gown and tiara sitting on a giant lighted number 1 beside a number 8, under a balloon arch",
    caption: "Eighteen",
    category: "debuts",
    w: 1920,
    h: 2085,
    focus: "40% 45%",
    stock: true,
  },
  {
    id: "birthday-family",
    src: birthdayFamily,
    alt: "A family gathered around a small birthday cake with lit candles in a dim dining room",
    caption: "Make a wish",
    category: "birthdays",
    w: 1920,
    h: 1280,
    focus: "50% 55%",
    stock: true,
  },
  {
    id: "birthday-candles",
    src: birthdayCandles,
    alt: "Three generations around a table as a child blows out a number 5 candle on a birthday cake",
    caption: "Three generations",
    category: "birthdays",
    w: 1920,
    h: 1920,
    focus: "50% 40%",
    stock: true,
  },
  {
    id: "birthday-cake",
    src: birthdayCake,
    alt: "A hand lighting the last candle on a chocolate drip birthday cake",
    caption: "The cake",
    category: "birthdays",
    w: 1920,
    h: 1280,
    focus: "50% 50%",
    stock: true,
  },
];

export const photo = (id: string): Photo => {
  const p = PHOTOS.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown photo "${id}"`);
  return p;
};

export const STUDIO = PHOTOS.filter((p) => !p.stock);

export const CATEGORIES: { key: Category | "all"; label: string }[] = [
  { key: "all", label: "All" },
  { key: "weddings", label: "Weddings" },
  { key: "debuts", label: "Debuts" },
  { key: "birthdays", label: "Birthdays" },
  { key: "faith", label: "Faith" },
];
