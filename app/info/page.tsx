import Link from 'next/link';

export default function InfoPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 space-y-10 text-white">
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-violet-500">About CardVault</h1>
        <p className="text-sm text-zinc-400">
          Your digital sanctuary for managing, organizing, and exploring trading card games.
        </p>
      </div>

      <section className="space-y-4 text-zinc-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-white">What is CardVault?</h2>
        <p>
          CardVault is a modern platform built for TCG enthusiasts, collectors, and players. Whether you are tracking your physical binder or organizing your dream collection, CardVault provides an intuitive environment to keep your cards structured and accessible.
        </p>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
          <h3 className="font-bold text-white text-base text-violet-400">Database</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Explore our master library featuring official templates, card info, sets, and rarities. Add items directly to your personal lists with a single click.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
          <h3 className="font-bold text-white text-base text-violet-400">Collection</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Manage your owned cards, adjust quantities dynamically, and filter your inventory instantly using search tools.
          </p>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-5 space-y-2">
          <h3 className="font-bold text-white text-base text-violet-400">Wishlist</h3>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Keep track of the cards you are hunting down for your decks and monitor your acquisition priorities.
          </p>
        </div>
      </div>

      <div className="pt-6 border-t border-zinc-800 flex flex-wrap gap-4 justify-between items-center">
        <span className="text-xs text-zinc-500">CardVault Ecosystem &copy; 2026</span>
        <div className="flex gap-4 text-xs font-semibold">
          <Link href="/database" className="text-violet-400 hover:underline">
            Explore Database &rarr;
          </Link>
          <Link href="/contact" className="text-zinc-300 hover:text-white">
            Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}