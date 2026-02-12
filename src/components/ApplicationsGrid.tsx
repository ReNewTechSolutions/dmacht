"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

type CategoryKey = "primary" | "secondary" | "tertiary";

type CatalogItem = {
  id: string;
  slug: string;
  category_key: CategoryKey;
  sort_order: number;
  title: string;
  subtitle: string | null;
  description: string | null;
  tag: string | null;
  micro_cta: string | null;
  image_path: string | null;
  cta_label: string | null;
  cta_href: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
);

function safeHref(href: string | null | undefined) {
  if (!href) return "#contact";
  return href.startsWith("/") || href.startsWith("#") || href.startsWith("http") ? href : "#contact";
}

function Card({ item }: { item: CatalogItem }) {
  const href = safeHref(item.cta_href);
  const label = item.cta_label || "View details";

  return (
    <article className="appCard">
      <div className="appTop">
        <div className="appImageRing">
          <div className="appImageRingInner">
            {item.image_path ? (
              <Image
                src={item.image_path}
                alt={item.title}
                fill
                className="appImg"
                sizes="64px"
                priority={false}
              />
            ) : (
              <div className="appImgFallback" aria-hidden />
            )}
          </div>
        </div>

        <div className="appMeta">
          {item.tag ? <div className="appTag">{item.tag}</div> : <div className="appTag is-muted">Service</div>}
          <div className="appTitle">{item.title}</div>
          {item.subtitle ? <div className="appSub">{item.subtitle}</div> : null}
        </div>
      </div>

      {item.description ? <div className="appDesc">{item.description}</div> : null}

      <div className="appBottom">
        <a className="appMicro" href={href}>
          {item.micro_cta || "View services →"}
        </a>
        <a className="btn btn-ghost appBtn" href={href}>
          {label}
        </a>
      </div>
    </article>
  );
}

function EmptyState({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-white/70">
      <div className="text-white/90 font-semibold">{title}</div>
      <div className="mt-1 text-white/65">{sub}</div>
    </div>
  );
}

export default function ApplicationsGrid() {
  const [items, setItems] = useState<CatalogItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);

      const { data, error } = await supabase
        .from("service_catalog_items")
        .select(
          "id, slug, category_key, sort_order, title, subtitle, description, tag, micro_cta, image_path, cta_label, cta_href"
        )
        .eq("is_active", true)
        .order("category_key", { ascending: true })
        .order("sort_order", { ascending: true });

      if (!alive) return;

      if (!error && data) setItems(data as CatalogItem[]);
      setLoading(false);
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  const primary = useMemo(() => items.filter((x) => x.category_key === "primary"), [items]);
  const secondary = useMemo(() => items.filter((x) => x.category_key === "secondary"), [items]);
  const tertiary = useMemo(() => items.filter((x) => x.category_key === "tertiary"), [items]);

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10" id="applications" aria-label="Applications">
      <div className="sectionHead">
        <div className="sectionKicker">Applications</div>
        <h2 className="sectionTitle">What we support</h2>
        <p className="sectionSub">
          Our current focus is <span className="text-white/90">motherboard</span> and{" "}
          <span className="text-white/90">power supply repair</span> for{" "}
          <span className="text-white/90">Markem-Imaje, Domino, and VideoJet</span>. We also support diagnostics,
          line-side help, inks/fluids, and parts.
        </p>

        <div className="mt-4 flex flex-wrap gap-3">
          <a className="btn btn-primary" href="#contact">
            Request support
          </a>
          <Link className="btn btn-ghost" href="/maintenance">
            View maintenance packages
          </Link>
        </div>
      </div>

      <div className="appGridWrap">
        {/* Subtle PCB glow behind the grid */}
        <div className="appPcbGlow" aria-hidden />

        {loading ? (
          <div className="text-sm text-white/60 mt-6">Loading services…</div>
        ) : (
          <>
            {/* PRIMARY: repair focus */}
            {primary.length ? (
              <div className="appGrid">
                {primary.map((it) => (
                  <Card key={it.id} item={it} />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No primary services found"
                sub='Mark key items as category_key="primary" in Supabase to show them here.'
              />
            )}

            {/* SECONDARY: catalog */}
            {secondary.length ? (
              <div className="appSecondary">
                <div className="appsDivider">
                  <span />
                  <div className="appsDividerText">More services</div>
                  <span />
                </div>

                <div className="appGrid appGridSecondary">
                  {secondary.map((it) => (
                    <Card key={it.id} item={it} />
                  ))}
                </div>

                <div className="appsFoot">
                  <div className="appsFootText">
                    Need ongoing coverage?{" "}
                    <Link className="text-white/90 underline decoration-white/20" href="/maintenance">
                      Maintenance packages
                    </Link>{" "}
                    are available for recurring support.
                  </div>
                </div>
              </div>
            ) : null}

            {/* TERTIARY: separate row (Refurb + Mobile) */}
            {tertiary.length ? (
              <div className="appSecondary">
                <div className="appsDivider">
                  <span />
                  <div className="appsDividerText">Other work</div>
                  <span />
                </div>

                <div className="appGrid appGridSecondary">
                  {tertiary.map((it) => (
                    <Card key={it.id} item={it} />
                  ))}
                </div>
              </div>
            ) : null}
          </>
        )}
      </div>
    </section>
  );
}