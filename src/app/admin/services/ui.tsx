"use client";

import { useMemo, useState } from "react";
import { createClient } from "@supabase/supabase-js";

type Item = {
  id: string;
  category_key: string;
  sort_order: number;
  is_active: boolean;
  title: string;
  subtitle: string | null;
  description: string | null;
  micro_cta: string | null;
  image_path: string | null;
  cta_href: string | null;
  cta_label: string | null;
  tag: string | null;
};

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export default function AdminServicesClient({ initialItems }: { initialItems: Item[] }) {
  const [items, setItems] = useState<Item[]>(initialItems);
  const [savingId, setSavingId] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const byCategory = useMemo(() => {
    const map = new Map<string, Item[]>();
    for (const it of items) {
      const key = it.category_key ?? "primary";
      map.set(key, [...(map.get(key) ?? []), it]);
    }
    for (const [k, arr] of map.entries()) arr.sort((a, b) => a.sort_order - b.sort_order);
    return map;
  }, [items]);

  function updateLocal(id: string, patch: Partial<Item>) {
    setItems((prev) => prev.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  async function save(item: Item) {
    setSavingId(item.id);
    setMsg(null);

    const { error } = await supabase
      .from("service_catalog_items")
      .update({
        category_key: item.category_key,
        sort_order: item.sort_order,
        is_active: item.is_active,
        title: item.title,
        subtitle: item.subtitle,
        description: item.description,
        micro_cta: item.micro_cta,
        image_path: item.image_path,
        cta_href: item.cta_href,
        cta_label: item.cta_label,
        tag: item.tag,
      })
      .eq("id", item.id);

    setSavingId(null);
    setMsg(error ? error.message : "Saved ✓");
    if (!error) setTimeout(() => setMsg(null), 2500);
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 text-white">
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase tracking-[0.18em] text-white/60">Admin</div>
          <h1 className="mt-2 text-2xl font-semibold text-white/90">Service Catalog</h1>
          <p className="mt-2 text-sm text-white/60">Edit titles, order, images, and CTAs. Public sees only active items.</p>
        </div>

        {msg ? (
          <div className="rounded-full border border-white/10 bg-emerald-500/10 px-3 py-1 text-xs text-emerald-200">
            {msg}
          </div>
        ) : null}
      </div>

      {[...byCategory.entries()].map(([category, arr]) => (
        <section key={category} className="mt-8">
          <h2 className="text-lg font-semibold text-white/85 capitalize">{category}</h2>

          <div className="mt-3 grid gap-4">
            {arr.map((it) => (
              <div key={it.id} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <div>
                    <label className="mp-label">Title</label>
                    <input
                      className="mp-input"
                      value={it.title}
                      onChange={(e) => updateLocal(it.id, { title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="mp-label">Tag</label>
                    <input
                      className="mp-input"
                      value={it.tag ?? ""}
                      onChange={(e) => updateLocal(it.id, { tag: e.target.value || null })}
                    />
                  </div>

                  <div>
                    <label className="mp-label">Image path</label>
                    <input
                      className="mp-input"
                      value={it.image_path ?? ""}
                      onChange={(e) => updateLocal(it.id, { image_path: e.target.value || null })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="mp-label">Order</label>
                      <input
                        className="mp-input"
                        type="number"
                        value={it.sort_order}
                        onChange={(e) => updateLocal(it.id, { sort_order: Number(e.target.value) })}
                      />
                    </div>

                    <div className="flex items-end gap-2">
                      <label className="mp-label w-full">Active</label>
                      <input
                        type="checkbox"
                        checked={it.is_active}
                        onChange={(e) => updateLocal(it.id, { is_active: e.target.checked })}
                        className="h-5 w-5"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="mp-label">CTA href</label>
                    <input
                      className="mp-input"
                      value={it.cta_href ?? ""}
                      onChange={(e) => updateLocal(it.id, { cta_href: e.target.value || null })}
                    />
                  </div>

                  <div>
                    <label className="mp-label">CTA label</label>
                    <input
                      className="mp-input"
                      value={it.cta_label ?? ""}
                      onChange={(e) => updateLocal(it.id, { cta_label: e.target.value || null })}
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="mp-label">Description</label>
                    <textarea
                      className="mp-input mp-textarea"
                      value={it.description ?? ""}
                      onChange={(e) => updateLocal(it.id, { description: e.target.value || null })}
                    />
                  </div>
                </div>

                <div className="mt-3 flex gap-3">
                  <button className="btn btn-primary" onClick={() => save(it)} disabled={savingId === it.id}>
                    {savingId === it.id ? "Saving…" : "Save"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}