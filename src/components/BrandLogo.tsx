"use client";

import Image from "next/image";

type Props = {
  priority?: boolean;
  variant?: "nav" | "hero";
  /** "wide" = full wordmark, "mark" = compact square treatment */
  mode?: "wide" | "mark";
  className?: string;

  /**
   * If your PNG has extra padding, this zoom makes the visible mark larger.
   * Defaults are tuned for your current dmacht-logo.png padding.
   */
  zoom?: number;
};

export default function BrandLogo({
  priority = false,
  variant = "nav",
  mode = "wide",
  className = "",
  zoom,
}: Props) {
  const isNav = variant === "nav";

  // Layout boxes (your sizing is good)
  const wideSize = isNav
    ? "h-8 w-[150px] md:h-9 md:w-[170px]"
    : "h-16 w-[320px] md:h-20 md:w-[420px]";

  const markSize = isNav
    ? "h-10 w-10 md:h-11 md:w-11"
    : "h-16 w-16 md:h-20 md:w-20";

  // Default zoom tuned to compensate for transparent padding in the PNG
  const z =
    zoom ??
    (mode === "wide"
      ? isNav
        ? 2.6
        : 2.3
      : isNav
        ? 2.2
        : 2.0);

  const frame =
    mode === "mark"
      ? "rounded-2xl bg-white/5 ring-1 ring-white/12 shadow-[0_0_0_1px_rgba(255,255,255,0.06)_inset]"
      : "";

  return (
    <span
      className={[
        "relative inline-flex items-center justify-center overflow-hidden",
        mode === "wide" ? wideSize : markSize,
        frame,
        className,
      ].join(" ")}
      aria-label="D-Macht"
    >
      <Image
        src="/brand/dmacht-logo.png"
        alt="D-Macht"
        fill
        priority={priority}
        sizes={
          mode === "wide"
            ? isNav
              ? "170px"
              : "420px"
            : isNav
              ? "44px"
              : "80px"
        }
        // Key change: scale the image inside the box to overcome PNG padding
        className="object-contain origin-center"
        style={{ transform: `scale(${z})` }}
      />
    </span>
  );
}