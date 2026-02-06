import Image from "next/image";

type Props = {
  priority?: boolean;
  variant?: "nav" | "hero";
  className?: string;
};

export default function BrandLogo({
  priority = false,
  variant = "hero",
  className = "",
}: Props) {
  const isNav = variant === "nav";

  return (
    <span
      className={[
        "relative inline-block overflow-hidden",
        isNav ? "h-9 w-9 rounded-xl" : "h-[56px] w-[180px] rounded-2xl",
        "border border-white/10 bg-white/5",
        className,
      ].join(" ")}
    >
      <Image
        src="/brand/dmacht-logo.png"
        alt="D-Macht"
        fill
        priority={priority}
        sizes={isNav ? "36px" : "180px"}
        className="object-contain p-1"
      />
    </span>
  );
}