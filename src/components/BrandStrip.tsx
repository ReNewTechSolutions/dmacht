const BRANDS = [
    "Markem-Imaje",
    "Domino",
    "Videojet",
    "Linx",
    "Hitachi",
    "Citronix",
    "Alphajet",
  ];
  
  export default function BrandStrip() {
    const loop = [...BRANDS, ...BRANDS];
  
    return (
      <section aria-label="Brands supported" className="mt-8 md:mt-10">
        <div className="glass trace relative overflow-hidden rounded-3xl px-4 py-4 md:px-6">
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
  
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="shrink-0">
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/60">
                Brands supported
              </div>
              <div className="mt-1 text-sm text-white/75">
                Industrial coding &amp; marking printers
              </div>
            </div>
  
            <div className="relative w-full overflow-hidden">
              <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-black/45 to-transparent" />
              <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-black/45 to-transparent" />
  
              <div className="brand-marquee">
                <div className="brand-track">
                  {loop.map((b, i) => (
                    <span key={`${b}-${i}`} className="brand-pill" title={b}>
                      {b}
                    </span>
                  ))}
                </div>
              </div>
  
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-400/25 to-transparent" />
            </div>
          </div>
        </div>
      </section>
    );
  }