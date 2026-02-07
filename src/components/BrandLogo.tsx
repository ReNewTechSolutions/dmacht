"use client";

import Image from "next/image";

type Props = {
  priority?: boolean;
  variant?: "nav" | "hero";
  className?: string;
};

export default function BrandLogo({
  priority = false,
  variant = "nav",
  className = "",
}: Props) {
  const isNav = variant === "nav";

  return (
    <span
      className={[
        "relative inline-flex items-center",
        isNav ? "h-10 w-[140px] md:h-11 md:w-[160px]" : "h-16 w-full",
        className,
      ].join(" ")}
      aria-label="D-Macht"
    >
      <Image
        src="/brand/dmacht-logo.png"
        alt="D-Macht"
        fill
        priority={priority}
        sizes={isNav ? "160px" : "50vw"}
        className="object-contain"
      />
    </span>
  );
}