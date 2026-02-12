"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

type CatalogItem = {
  id: string;
  slug: string;
  category_key: string;
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

function Card({ item }: { item: CatalogItem }) {
  const href = item.cta_href || "#contact";
  const label = item.cta_label || "View services";

  return (
    <div className="appCard">
      <div className="appTop">
        <div className="appImageRing">
          <div className="appImageRingInner">
            {item.image_path ? (
              <Image src={item.image_path} alt={item.title} fill className="appImg" />
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

  return (
    <section className="mx-auto max-w-6xl px-4 pt-10" id="applications" aria-label="Applications">
      <div className="sectionHead">
        <div className="sectionKicker">Applications</div>
        <h2 className="sectionTitle">Service catalog</h2>
        <p className="sectionSub">
          Clean, modular offerings — optimized for <span className="text-white/90">repair-first</span> conversion, with a
          natural bridge into <Link className="text-white/90 underline decoration-white/20" href="/maintenance">maintenance packages</Link>.
        </p>
      </div>

      <div className="appGridWrap">
        {/* Scroll-trigger PCB glow lines */}
        <div className="appPcbGlow" aria-hidden />

        {loading ? (
          <div className="text-sm text-white/60 mt-6">Loading catalog…</div>
        ) : (
          <>
            <div className="appGrid">
              {primary.map((it) => (
                <Card key={it.id} item={it} />
              ))}
            </div>

            {secondary.length ? (
              <div className="appSecondary">
                <div className="appSecondaryHead">Additional offerings</div>
                <div className="appGrid appGridSecondary">
                  {secondary.map((it) => (
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