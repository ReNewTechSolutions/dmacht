import Image from "next/image";

type Props = {
  className?: string;
  priority?: boolean;
};

export default function BrandLogo({ className = "", priority = false }: Props) {
  return (
    <div className={className}>
      <Image
        src="/brand/dmacht-logo.png"
        alt="dmacht logo"
        width={900}
        height={300}
        priority={priority}
        className="h-auto w-full select-none"
      />
    </div>
  );
}