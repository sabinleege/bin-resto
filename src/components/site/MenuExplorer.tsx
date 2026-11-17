import { useMemo, useState } from "react";
import { Plus, Coffee } from "lucide-react";
import { categories, menuItems, availabilityLabel, tagLabel, type MenuItem, type Group } from "@/config/menuData";
import { formatPrice } from "@/config/siteConfig";
import { useCart } from "@/lib/cart";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function priceText(m: MenuItem) {
  return m.priceLabel ?? (m.price === null ? "Ask for price" : formatPrice(m.price));
}

function useAdd() {
  const { add } = useCart();
  return (m: MenuItem) => {
    if (m.price === null) return;
    add({ id: m.id, name: m.name, price: m.price });
    toast.success(`${m.name} added to your order`);
  };
}

function ItemDialog({ item, onClose }: { item: MenuItem | null; onClose: () => void }) {
  const addItem = useAdd();
  return (
    <Dialog open={!!item} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg overflow-hidden p-0">
        {item && (
          <>
            
            <div className="space-y-3 p-6">
              <p className="eyebrow text-gold">{categories.find((c) => c.id === item.category)?.name}</p>
              <DialogTitle className="font-display text-3xl font-medium">{item.name}</DialogTitle>
              <DialogDescription>{item.description || "Ask our team for details."}</DialogDescription>
              <p className="text-xs text-forest">{availabilityLabel[item.availability]}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="font-display text-2xl">{priceText(item)}</span>
                <Button disabled={item.price === null} onClick={() => { addItem(item); onClose(); }}>Add to order</Button>
              </div>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}

/** Homepage preview: featured dishes as image cards. */
export function MenuHighlights({ limit = 6 }: { limit?: number }) {
  const [detail, setDetail] = useState<MenuItem | null>(null);
  const [group, setGroup] = useState<Group>("food");
  const addItem = useAdd();
  const items = menuItems.filter((m) => m.featured && m.image && categories.find((c) => c.id === m.category)?.group === group).slice(0, limit);
  return (
    <div>
      <GroupSwitch value={group} onChange={(g) => setGroup(g as Group)} options={[["food", "Food"], ["drinks", "Drinks"]]} className="mx-auto" />
      <ul key={group} className="mt-10 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((m, i) => (
          <li key={m.id} className="group animate-in fade-in slide-in-from-bottom-6 fill-mode-both duration-700" style={{ animationDelay: `${i * 80}ms` }}>
            <button onClick={() => setDetail(m)} className="relative block w-full overflow-hidden" aria-label={`View ${m.name}`}>
              <img src={m.image} alt={m.name} width={600} height={450} loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-110" />
              <span className="absolute inset-0 bg-espresso/0 transition-colors duration-500 group-hover:bg-espresso/20" />
              {m.tags?.[0] && <span className="eyebrow absolute left-3 top-3 bg-ivory/95 px-2.5 py-1 text-[0.6rem] text-burgundy">{tagLabel[m.tags[0]]}</span>}
            </button>
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <h3 className="text-2xl leading-tight">{m.name}</h3>
                {m.description && <p className="mt-1 line-clamp-2 text-sm text-muted-foreground">{m.description}</p>}
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="font-medium tabular-nums">{priceText(m)}</span>
                <AddButton m={m} onAdd={addItem} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <ItemDialog item={detail} onClose={() => setDetail(null)} />
    </div>
  );
}

function AddButton({ m, onAdd }: { m: MenuItem; onAdd: (m: MenuItem) => void }) {
  return (
    <button disabled={m.price === null} onClick={(e) => { e.stopPropagation(); onAdd(m); }} aria-label={`Add ${m.name}`}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-burgundy text-burgundy transition-all duration-300 hover:rotate-90 hover:bg-burgundy hover:text-primary-foreground active:scale-90 disabled:opacity-30">
      <Plus className="size-4" />
    </button>
  );
}

function GroupSwitch({ value, onChange, options, className }: { value: string; onChange: (v: string) => void; options: [string, string][]; className?: string }) {
  const idx = Math.max(0, options.findIndex(([v]) => v === value));
  return (
    <div role="tablist" className={cn("relative grid w-fit rounded-full border bg-card p-1", className)} style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
      <span aria-hidden className="absolute inset-y-1 left-1 rounded-full bg-espresso transition-transform duration-500 ease-[cubic-bezier(.6,.05,.2,1)]"
        style={{ width: `calc((100% - 0.5rem) / ${options.length})`, transform: `translateX(${idx * 100}%)` }} />
      {options.map(([v, label]) => (
        <button key={v} role="tab" aria-selected={value === v} onClick={() => onChange(v)}
          className={cn("eyebrow relative z-10 px-6 py-2.5 transition-colors duration-500", value === v ? "text-ivory" : "text-muted-foreground hover:text-foreground")}>
          {label}
        </button>
      ))}
    </div>
  );
}

/** Full menu: a printed-menu style book with grouped sections. */
export function MenuExplorer() {
  const [group, setGroup] = useState<"all" | Group>("all");
  const [cat, setCat] = useState("all");
  const [detail, setDetail] = useState<MenuItem | null>(null);
  const addItem = useAdd();

  const visibleCats = categories.filter((c) => group === "all" || c.group === group);
  const sections = useMemo(() => {
    return visibleCats
      .filter((c) => cat === "all" || c.id === cat)
      .map((c) => ({ ...c, items: menuItems.filter((m) => m.category === c.id) }))
      .filter((c) => c.items.length);
  }, [group, cat]);

  return (
    <div>
      <div className="sticky top-0 z-20 -mx-5 space-y-4 border-b bg-background/95 px-5 py-4 backdrop-blur md:-mx-8 md:px-8">
        <div className="flex items-center gap-4">
          <GroupSwitch value={group} onChange={(v) => { setGroup(v as typeof group); setCat("all"); }} options={[["all", "All"], ["food", "Food"], ["drinks", "Drinks"]]} />
        </div>
        <div className="-mx-5 flex gap-2 overflow-x-auto px-5 pb-1 md:mx-0 md:px-0" role="tablist" aria-label="Menu categories">
          {[{ id: "all", name: "Everything" }, ...visibleCats].map((c) => (
            <button key={c.id} role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)}
              className={cn("shrink-0 rounded-full border px-4 py-1.5 text-sm transition-all duration-300", cat === c.id ? "border-burgundy bg-burgundy text-primary-foreground shadow-soft" : "hover:border-gold hover:text-burgundy")}>
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {sections.length === 0 ? (
        <div className="py-24 text-center animate-in fade-in">
          <p className="font-display text-3xl text-muted-foreground">Nothing here yet.</p>
          <Button variant="outline" className="mt-6" onClick={() => { setCat("all"); setGroup("all"); }}>Show the full menu</Button>
        </div>
      ) : (
        <div key={`${group}-${cat}`} className="mt-12 space-y-20">
          {sections.map((s, si) => (
            <section key={s.id} aria-labelledby={`cat-${s.id}`} className="animate-in fade-in slide-in-from-bottom-8 fill-mode-both duration-700" style={{ animationDelay: `${Math.min(si, 4) * 90}ms` }}>
              <header>
                <div>
                  <p className="eyebrow text-gold">{s.group === "drinks" ? "Drinks" : "Kitchen"} · {s.items.length} {s.items.length === 1 ? "item" : "items"}</p>
                  <h2 id={`cat-${s.id}`} className="mt-2 text-5xl md:text-6xl">{s.name}</h2>
                  {s.note && <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-forest px-3 py-1 text-xs text-ivory"><Coffee className="size-3.5" /> {s.note}</p>}
                  <div className="mt-5 h-px origin-left animate-[rule_1.2s_ease-out_both] bg-gold" style={{ animationDelay: `${Math.min(si, 4) * 90 + 200}ms` }} />
                </div>
              </header>
              <ul className="mt-8 grid gap-x-14 md:grid-cols-2">
                {s.items.map((m, i) => (
                  <li key={m.id} className="animate-in fade-in slide-in-from-bottom-3 fill-mode-both duration-500" style={{ animationDelay: `${Math.min(si, 4) * 90 + 150 + Math.min(i, 14) * 35}ms` }}>
                    <div role="button" tabIndex={0} onClick={() => setDetail(m)} onKeyDown={(e) => e.key === "Enter" && setDetail(m)}
                      className="group flex cursor-pointer items-center gap-4 border-b border-border/70 py-4 transition-colors duration-300 hover:border-gold">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-3">
                          <h3 className="font-display text-xl leading-tight transition-colors duration-300 group-hover:text-burgundy md:text-2xl">{m.name}</h3>
                          {m.tags?.[0] && <span className="eyebrow shrink-0 text-[0.55rem] text-gold">{tagLabel[m.tags[0]]}</span>}
                          <span aria-hidden className="mb-1 hidden flex-1 border-b border-dotted border-muted-foreground/40 sm:block" />
                          <span className="ml-auto shrink-0 text-sm font-medium tabular-nums sm:ml-0">{priceText(m)}</span>
                        </div>
                        {m.description && <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>}
                      </div>
                      <AddButton m={m} onAdd={addItem} />
                    </div>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      )}
      <p className="mt-16 text-center text-xs text-muted-foreground">Prices in Rwandan francs. Availability may vary — please ask our team.</p>
      <ItemDialog item={detail} onClose={() => setDetail(null)} />
    </div>
  );
}
