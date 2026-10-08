import { useId } from "react";
import { STRIP_WAVE, WORDMARK_H, WORDMARK_PATH, WORDMARK_W } from "../assets/logo-paths";

/**
 * Hulyo Trese logo, recreated as vector.
 * - `lockup`:     H monogram + film strip + script wordmark (square)
 * - `mark`:       monogram only, cropped tight
 * - `horizontal`: mark at left, wordmark at right — for navbars/footers
 *
 * `tone="brand"` uses the two brand greens; `tone="mono"` inherits `currentColor`
 * so it can sit in cream on dark surfaces (the strip drops to 72% to keep its second tone).
 */
type Props = {
  variant?: "lockup" | "mark" | "horizontal";
  tone?: "brand" | "mono";
  className?: string;
  title?: string;
};

const GREEN = "#71933D";
const DEEP = "#546E27";
const BAR = { w: 30, h: 150, y: 90, l: 150, r: 222 };

function StripMask({ id }: { id: string }) {
  return (
    <mask id={id} maskUnits="userSpaceOnUse" x="0" y="0" width="400" height="400">
      <path d={STRIP_WAVE} fill="none" stroke="#fff" strokeWidth="24" />
      <g fill="none" stroke="#000">
        <path d={STRIP_WAVE} transform="translate(0,-9)" strokeWidth="2.8" strokeDasharray="3.4 4.4" />
        <path d={STRIP_WAVE} transform="translate(0,9)" strokeWidth="2.8" strokeDasharray="3.4 4.4" />
        <path d={STRIP_WAVE} strokeWidth="11" strokeDasharray="21 2.6" strokeDashoffset="-4" />
      </g>
    </mask>
  );
}

function Mark({ id, bar, strip, stripOpacity }: { id: string; bar: string; strip: string; stripOpacity: number }) {
  return (
    <>
      <rect x={BAR.l} y={BAR.y} width={BAR.w} height={BAR.h} fill={bar} />
      <rect x={BAR.r} y={BAR.y} width={BAR.w} height={BAR.h} fill={bar} />
      <rect x="0" y="0" width="400" height="400" fill={strip} opacity={stripOpacity} mask={`url(#${id})`} />
    </>
  );
}

export default function Logo({ variant = "lockup", tone = "brand", className, title = "Hulyo Trese" }: Props) {
  const id = `ht-strip-${useId().replace(/:/g, "")}`;
  const brand = tone === "brand";
  const colors = {
    bar: brand ? GREEN : "currentColor",
    strip: brand ? DEEP : "currentColor",
    stripOpacity: brand ? 1 : 0.72,
    word: brand ? GREEN : "currentColor",
  };

  if (variant === "mark") {
    return (
      <svg viewBox="60 70 280 190" role="img" aria-label={title} className={className}>
        <defs>
          <StripMask id={id} />
        </defs>
        <Mark id={id} {...colors} />
      </svg>
    );
  }

  if (variant === "horizontal") {
    const wordScale = 118 / WORDMARK_H;
    const width = 300 + WORDMARK_W * wordScale + 10;
    return (
      <svg viewBox={`60 70 ${width - 60} 190`} role="img" aria-label={title} className={className}>
        <defs>
          <StripMask id={id} />
        </defs>
        <Mark id={id} {...colors} />
        <path transform={`translate(300 108) scale(${wordScale})`} fill={colors.word} d={WORDMARK_PATH} />
      </svg>
    );
  }

  const wordScale = 204 / WORDMARK_W;
  const wordX = (400 - WORDMARK_W * wordScale) / 2;
  return (
    <svg viewBox="0 0 400 400" role="img" aria-label={title} className={className}>
      <defs>
        <StripMask id={id} />
      </defs>
      <Mark id={id} {...colors} />
      <path transform={`translate(${wordX} 254) scale(${wordScale})`} fill={colors.word} d={WORDMARK_PATH} />
    </svg>
  );
}
