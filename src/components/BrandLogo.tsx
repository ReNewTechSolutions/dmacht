import Image from "next/image";

type Props = {
  /** Prefer `nav` for small icon tile, `hero` for wider logo */
  variant?: "nav" | "hero";
  priority?: boolean;
  className?: string;
};

export default function BrandLogo({
  variant = "hero",
  priority = false,
  className = "",
}: Props) {
  if (variant === "nav") {
    return (
      <span
        className={[
          "relative inline-block",
          "h-11 w-11",
          "overflow-hidden rounded-xl",
          "border border-white/10 bg-white/5",
          className,
        ].join(" ")}
        aria-hidden={false}
      >
        <Image
          src="/brand/dmacht-logo.png"
          alt="DMacht"
          fill
          priority={priority}
          sizes="44px"
          className="object-contain p-1"
        />
        <span
          className="pointer-events-none absolute inset-0 shadow-[0_0_0_1px_rgba(255,255,255,.06),0_18px_55px_-30px_rgba(59,130,246,.9)]"
          aria-hidden
        />
      </span>
    );
  }

  // Hero/wide logo
  return (
    <span
      className={[
        "relative block",
        "w-full max-w-[460px]",
        "aspect-[3/1]",
        className,
      ].join(" ")}
    >
      <Image
        src="/brand/dmacht-logo.png"
        alt="DMacht"
        fill
        priority={priority}
        sizes="(min-width: 1024px) 460px, (min-width: 768px) 420px, 70vw"
        className="object-contain"
      />
    </span>
  );
}