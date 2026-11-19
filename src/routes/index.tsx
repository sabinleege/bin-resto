import { createFileRoute, Link } from "@tanstack/react-router";
import coffee from "@/assets/coffee.jpg";
import mains from "@/assets/mains.jpg";
import africanCup from "@/assets/african-coffee-cup.jpg";
import chickenWrap from "@/assets/chicken-wrap.jpg";
import africanCoffee from "@/assets/african-coffee.jpg";
import passionJuice from "@/assets/passion-juice.png";
import beefSteak from "@/assets/beef-steak.jpg";
import interior from "@/assets/interior.png";
import breakfast from "@/assets/breakfast.jpg";
import sandwich from "@/assets/sandwich.jpg";
import samosa from "@/assets/samosa.jpg";
import { Button } from "@/components/ui/button";
import { HangingFrames } from "@/components/site/HangingFrames";
import { Reveal } from "@/components/site/Reveal";
import venue from "@/assets/venue-night.jpg";
import { MenuHighlights, priceText } from "@/components/site/MenuExplorer";
import { MenuQrSection } from "@/components/site/MenuQrSection";
import { menuItems, type MenuItem } from "@/config/menuData";
import { siteConfig } from "@/config/siteConfig";
import { Coffee } from "lucide-react";
import { useCart } from "@/lib/cart";
import { toast } from "sonner";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stafford Brewers — Exceptional Taste. Beautiful Moments." },
      { name: "description", content: "Carefully brewed coffee, fresh juices and generous plates at Stafford Brewers, Musambira, Kamonyi. Open 05:00–23:00." },
      { property: "og:title", content: "Stafford Brewers — Exceptional Taste. Beautiful Moments." },
      { property: "og:description", content: "Coffee, Grab & Go, fresh juices and generous plates in Musambira, Kamonyi." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Home,
});

function Home() {

  const pickItem = (name: string, image: string, label?: string) => {
    const m = menuItems.find((x) => x.name === name) as MenuItem;
    return { ...m, image, label };
  };
  const specials = [
    pickItem("Cappuccino", coffee, "Barista's pick"),
    pickItem("African Coffee", africanCup, "Grab & Go"),
    pickItem("Beef Steak", beefSteak, "House special"),
  ];
  const best = [
    pickItem("African Coffee", africanCoffee),
    pickItem("Passion Juice", passionJuice),
    pickItem("Rolex", breakfast),
    pickItem("Chicken Club Sandwich", sandwich),
    pickItem("Snacks Platter", samosa),
    pickItem("Chicken Wrap Plain", chickenWrap),
  ];
  const { add } = useCart();

  return (
    <>
      {/* HERO */}
      <section className="terrace-hero section-dark relative flex items-end overflow-hidden">
        <img src={venue} alt="The Stafford Brewers terrace lit up at night" width={689} height={532} fetchPriority="high" className="terrace-photo absolute inset-0 size-full object-cover animate-in fade-in duration-1000" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-espresso/20" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-20 pt-32 md:px-8 md:pb-28">
          <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 text-gold duration-700">{siteConfig.businessName} · {siteConfig.location}</p>
          <h1 className="terrace-title mt-5 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Exceptional Taste.<br /><em className="text-gold-soft">Beautiful Moments.</em>
          </h1>
          <p className="mt-6 max-w-md text-lg text-ivory/85 animate-in fade-in duration-1000 [animation-delay:300ms] fill-mode-both">
            Carefully brewed coffee, fresh juices and generous plates — served with warmth, made to be remembered.
          </p>
          <div className="mt-9 flex flex-wrap gap-3 animate-in fade-in slide-in-from-bottom-2 duration-1000 [animation-delay:500ms] fill-mode-both">
            <Button asChild size="lg" variant="gold"><Link to="/menu">Explore our menu</Link></Button>
            <Button asChild size="lg" variant="ivory"><Link to="/reserve">Book a table</Link></Button>
          </div>
        </div>
      </section>

      {/* SERVICES STRIP */}
      <section className="border-b bg-cream/60">
        <ul className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-3 px-5 py-5">
          {siteConfig.services.map((sv) => (
            <li key={sv} className="eyebrow flex items-center gap-2 text-espresso"><Coffee className="size-4 text-gold" /> {sv}</li>
          ))}
        </ul>
      </section>

      {/* SIGNATURE HANGING GALLERY */}
      <section className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 md:grid-cols-[1fr_1.2fr] md:px-8">
        <Reveal>
          <p className="eyebrow text-gold">Grab &amp; Go</p>
          <h2 className="mt-3 text-5xl leading-tight">Your coffee, ready when you are.</h2>
          <p className="mt-4 max-w-md text-muted-foreground">On your way to work? Grab a creamy cappuccino — every coffee on our menu is available as Grab &amp; Go — brewed fresh, handed over with a smile.</p>
          <Button asChild className="mt-8"><Link to="/menu">See the coffee menu</Link></Button>
        </Reveal>
        <HangingFrames />
      </section>

      {/* SPECIAL MENU TODAY */}
      <section className="section-dark relative overflow-hidden py-24 md:py-32">
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 size-[28rem] rounded-full bg-gold/10 blur-3xl" />
        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="grid gap-6 md:grid-cols-[1fr_auto] md:items-end">
            <div>
              <p className="eyebrow flex items-center gap-3 text-gold"><span className="h-px w-10 bg-gold" /> Today's discovery</p>
              <h2 className="mt-4 text-5xl leading-[0.95] md:text-7xl">Find our special<br /><em className="text-gold-soft">menu today.</em></h2>
            </div>
            <Button asChild variant="gold" size="lg"><Link to="/menu">See the full menu</Link></Button>
          </Reveal>
          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {specials.map((m, i) => (
              <Reveal key={m.id} delay={i * 140}>
                <article className="group relative overflow-hidden rounded-2xl ring-1 ring-ivory/10 transition-all duration-700 hover:-translate-y-2 hover:ring-gold/60">
                  <div className="relative">
                    {i === 0 && [0, 1, 2].map((k) => <span key={k} className="steam z-10" style={{ left: `${42 + k * 7}%`, bottom: "45%", animationDelay: `${k * 0.8}s` }} />)}
                    <img src={m.image} alt={m.name} loading="lazy" width={600} height={750} className="aspect-[4/5] w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-110" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/30 to-transparent" />
                  <span className="eyebrow absolute left-5 top-5 rounded-full border border-gold/50 bg-espresso/50 px-3 py-1 text-[0.6rem] text-gold backdrop-blur">{m.label}</span>
                  <div className="absolute inset-x-0 bottom-0 p-6">
                    <div className="flex items-end justify-between gap-4">
                      <h3 className="text-3xl leading-tight">{m.name}</h3>
                      <span className="shrink-0 font-medium text-gold tabular-nums">{priceText(m)}</span>
                    </div>
                    <button onClick={() => { if (m.price !== null) { add({ id: m.id, name: m.name, price: m.price }); toast.success(`${m.name} added`); } }}
                      className="eyebrow mt-5 inline-flex items-center gap-2 rounded-full bg-ivory/10 px-4 py-2 text-ivory backdrop-blur transition-colors hover:bg-gold hover:text-espresso">Add to order +</button>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
          <p className="mt-14 text-center text-xs text-ivory/50">Availability may vary — please ask our team.</p>
        </div>
      </section>

      {/* BESTSELLERS — numbered list */}
      <section className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal><p className="eyebrow text-gold">Hand-picked</p><h2 className="mt-3 text-5xl">House favourites</h2></Reveal>
        <ol className="mt-12 divide-y border-y">
          {best.map((m, i) => (
            <Reveal as="li" key={m.id} delay={i * 80}>
              <div className="group flex items-center gap-5 py-5">
                <span className="w-10 font-display text-3xl italic text-gold">0{i + 1}</span>
                <img src={m.image} alt="" loading="lazy" width={80} height={80} className="size-16 rounded-full object-cover transition-transform duration-500 group-hover:scale-110 md:size-20" />
                <div className="flex-1"><h3 className="text-2xl md:text-3xl">{m.name}</h3><p className="hidden text-sm text-muted-foreground md:block">{m.description}</p></div>
                <span className="text-sm tabular-nums">{priceText(m)}</span>
              </div>
            </Reveal>
          ))}
        </ol>
      </section>

      {/* MENU PREVIEW */}
      <section className="bg-cream/50 py-24">
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <Reveal className="mb-10 text-center"><p className="eyebrow text-gold">The menu</p><h2 className="mt-3 text-5xl">Taste your way through</h2></Reveal>
          <MenuHighlights />
          <div className="mt-6 text-center"><Button asChild><Link to="/menu">View full menu</Link></Button></div>
        </div>
      </section>

      {/* STORY */}
      <section className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:grid-cols-2 md:px-8">
        <Reveal className="relative">
          <img src={coffee} alt="Cappuccino and espresso" loading="lazy" width={816} height={816} className="aspect-[4/5] w-4/5 object-cover shadow-frame" />
          <img src={mains} alt="Chicken curry and grilled tilapia" loading="lazy" width={816} height={816} className="absolute -bottom-8 right-0 w-1/2 border-8 border-ivory object-cover shadow-frame" />
          <img src={interior} alt="Inside Stafford Brewers — brick arches and long dining tables" loading="lazy" width={1316} height={1195} className="mt-16 aspect-[16/10] w-full object-cover shadow-frame" />
        </Reveal>
        <Reveal delay={150}>
          <p className="eyebrow text-gold">Our story</p>
          <h2 className="mt-3 text-5xl">Rooted in welcome.</h2>
          <p className="mt-6 text-muted-foreground">Under warm brick arches, we pour carefully brewed Rwandan coffee and serve honest, generous plates — from a morning Rolex to a slow evening curry. Everyone is welcome at our table.</p>
          
        </Reveal>
      </section>

      <MenuQrSection />
    </>
  );
}
