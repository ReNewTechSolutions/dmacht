import Image from "next/image";
import Link from "next/link";

type PageHeroProps = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  imageAlt: string;
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

export default function PageHero({
  eyebrow,
  title,
  copy,
  image,
  imageAlt,
  primaryLabel = "Request service",
  primaryHref = "/repair-service#request",
  secondaryLabel,
  secondaryHref,
}: PageHeroProps) {
  return (
    <section className="pageHero">
      <div className="pageHeroCopy">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{copy}</p>
        <div className="buttonRow">
          <Link className="button primary" href={primaryHref}>
            {primaryLabel}
          </Link>
          {secondaryLabel && secondaryHref ? (
            <Link className="button secondary" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
      <div className="pageHeroImage">
        <Image
          src={image}
          alt={imageAlt}
          fill
          loading="eager"
          sizes="(max-width: 860px) 100vw, 52vw"
        />
      </div>
    </section>
  );
}
