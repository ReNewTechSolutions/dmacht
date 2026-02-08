"use client";

type Props = {
  priority?: boolean; // kept for API compatibility
  variant?: "nav" | "hero";
  mode?: "wide" | "mark";
  className?: string;
};

export default function BrandLogo({
  variant = "nav",
  mode = "wide",
  className = "",
}: Props) {
  const isNav = variant === "nav";

  // ✅ HERO was too big — cap width + use responsive clamp-like tailwind sizes
  const wideSize = isNav
    ? "h-8 w-[150px] md:h-9 md:w-[185px]"
    : "h-10 w-[220px] sm:h-12 sm:w-[260px] md:h-14 md:w-[320px]";

  const markSize = isNav
    ? "h-10 w-10 md:h-11 md:w-11"
    : "h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16";

  const src = mode === "wide" ? "/brand/dmacht-wordmark.svg" : "/brand/dmacht-mark.svg";

  return (
    <span
      className={[
        "inline-flex items-center justify-center",
        mode === "wide" ? wideSize : markSize,
        className,
      ].join(" ")}
      aria-label="D-Macht"
    >
      <img
        src={src}
        alt="D-Macht"
        className="h-full w-full object-contain select-none"
        draggable={false}
      />
    </span>
  );
}