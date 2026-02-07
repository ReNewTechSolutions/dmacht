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

  const wideSize = isNav
    ? "h-8 w-[160px] md:h-9 md:w-[190px]"
    : "h-16 w-[320px] md:h-20 md:w-[420px]";

  const markSize = isNav
    ? "h-10 w-10 md:h-11 md:w-11"
    : "h-16 w-16 md:h-20 md:w-20";

  const src =
    mode === "wide"
      ? "/brand/dmacht-wordmark.svg"
      : "/brand/dmacht-mark.svg";

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