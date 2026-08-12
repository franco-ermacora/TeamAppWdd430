import Link from 'next/link';

const FEATURED_CARDS = [
  { id: '1', name: 'Blue-Eyes White Dragon', set: 'LOB-001', rarity: 'Ultra Rare' },
  { id: '2', name: 'Dark Magician', set: 'LOB-005', rarity: 'Super Rare' },
  { id: '3', name: 'Exodia the Forbidden One', set: 'LOB-124', rarity: 'Secret Rare' },
  { id: '4', name: 'Red-Eyes B. Dragon', set: 'LOB-070', rarity: 'Rare' },
];

export default function HomePage() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-16 text-white">
      {/* Hero Section / Banner Promocional */}
      <section className="relative rounded-2xl bg-gradient-to-r from-violet-900/60 via-purple-900/40 to-zinc-900 border border-violet-500/30 p-8 md:p-12 overflow-hidden shadow-2xl">
        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/30">
            TCG Management Platform
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
            Build, Track & Organize Your <span className="text-violet-400">Card Vault</span>
          </h1>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            The ultimate vault to manage your trading card game collection, organize your wishlist, and explore thousands of cards in our database.
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              href="/dashboard"
              className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-5 py-2.5 rounded-lg transition shadow-lg shadow-violet-600/25"
            >
              Go to Collection
            </Link>
            <Link
              href="/wishlist"
              className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-semibold text-sm px-5 py-2.5 rounded-lg border border-zinc-700 transition"
            >
              View Wishlist
            </Link>
            <Link
              href="/database"
              className="bg-amber-600/20 hover:bg-amber-600/30 text-amber-300 font-semibold text-sm px-5 py-2.5 rounded-lg border border-amber-500/30 transition"
            >
              Explore Database
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Cards Showcase / Estilo Plantilla TCG */}
      <section className="space-y-6">
        <div className="flex justify-between items-end border-b border-zinc-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold text-white">Featured Cards</h2>
            <p className="text-xs text-zinc-400">Popular items currently trending in the database</p>
          </div>
          <Link href="/database" className="text-xs font-medium text-violet-400 hover:underline">
            View All Cards &rarr;
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 justify-items-center">
          {FEATURED_CARDS.map((card) => (
            <div
              key={card.id}
              className="w-full max-w-[260px] bg-amber-950/80 border-4 border-amber-600 rounded-xl p-3 flex flex-col justify-between shadow-xl hover:scale-[1.02] transition-transform"
            >
              {/* Header de la Carta */}
              <div className="bg-amber-900/90 border border-amber-500/50 rounded p-1.5 mb-2 flex justify-between items-center">
                <h3 className="font-extrabold text-xs text-amber-100 uppercase tracking-wider truncate">{card.name}</h3>
                <span className="text-[10px] bg-amber-950 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-amber-500/40 shrink-0">
                  {card.rarity}
                </span>
              </div>

              {/* Arte de la Carta */}
              <div className="relative w-full h-36 bg-zinc-950 border-2 border-amber-700/60 rounded flex items-center justify-center text-zinc-500 text-[10px] font-mono mb-2">
                [Card Preview Art]
              </div>

              {/* Set info */}
              <div className="text-[10px] text-amber-300/80 mb-1 font-mono flex justify-between">
                <span>SET: {card.set}</span>
                <span>[CardVault]</span>
              </div>

              {/* Descripción fija */}
              <div className="bg-amber-100/90 text-zinc-900 border border-amber-700 p-2 rounded text-[10px] leading-tight italic">
                A premier collectible card featured in the CardVault main archives.
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Quick Announcements Preview */}
      <section className="bg-zinc-900/50 border border-zinc-800/80 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Latest Announcements & Events
          </h2>
          <Link href="/announcements" className="text-xs text-zinc-400 hover:text-white transition">
            See All News
          </Link>
        </div>
        <p className="text-xs text-zinc-400 leading-relaxed">
          Stay updated with upcoming TCG tournaments, set releases, and app updates. Check the announcements page for detailed information.
        </p>
      </section>
    </main>
  );
}