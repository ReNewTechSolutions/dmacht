"use client";

import Image from "next/image";

type Props = {
  priority?: boolean;
  variant?: "nav" | "hero";
  /** "wide" = full wordmark, "mark" = compact square treatment */
  mode?: "wide" | "mark";
  className?: string;
};

export default function BrandLogo({
  priority = false,
  variant = "nav",
  mode = "wide",
  className = "",
}: Props) {
  const isNav = variant === "nav";

  // Sizes tuned so the logo isn't “tiny”
  const wideSize = isNav
    ? "h-8 w-[150px] md:h-9 md:w-[170px]"
    : "h-16 w-[320px] md:h-20 md:w-[420px]";

  const markSize = isNav
    ? "h-10 w-10 md:h-11 md:w-11"
    : "h-16 w-16 md:h-20 md:w-20";

  return (
    <span
      className={[
        "relative inline-flex items-center justify-center",
        mode === "wide" ? wideSize : markSize,
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
        className="object-contain"
      />
    </span>
  );
}