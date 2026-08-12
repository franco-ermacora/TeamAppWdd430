import Link from 'next/link';

const ANNOUNCEMENTS = [
  {
    id: '1',
    title: 'New Set Release: Dawn of the Vault',
    date: 'August 15, 2026',
    category: 'Set Release',
    description: 'Get ready for the upcoming expansion featuring over 100 new cards, secret rares, and game-changing archetypes. Prepare your wishlists!',
  },
  {
    id: '2',
    title: 'Regional Championship Announcement',
    date: 'September 02, 2026',
    category: 'Tournament',
    description: 'The regional competitive season is approaching. Check your collection decklists and make sure your cards are tournament legal.',
  },
  {
    id: '3',
    title: 'Platform Update: Database Search Optimization',
    date: 'August 01, 2026',
    category: 'Update',
    description: 'We have optimized the card database search and filtering system so you can find and sort cards much faster across all your devices.',
  },
];

export default function AnnouncementsPage() {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 space-y-8 text-white">
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-extrabold text-violet-500">Announcements & News</h1>
        <p className="text-sm text-zinc-400 mt-1">
          Stay informed about official TCG events, game updates, and new card database drops.
        </p>
      </div>

      <div className="space-y-6">
        {ANNOUNCEMENTS.map((item) => (
          <article
            key={item.id}
            className="bg-zinc-900/80 border border-zinc-800 rounded-xl p-6 space-y-3 hover:border-violet-500/50 transition shadow-sm"
          >
            <div className="flex flex-wrap justify-between items-center gap-2">
              <span className="bg-violet-500/20 text-violet-300 text-xs font-semibold px-3 py-1 rounded-full border border-violet-500/30">
                {item.category}
              </span>
              <span className="text-xs text-zinc-500 font-mono">{item.date}</span>
            </div>

            <h2 className="text-xl font-bold text-white">{item.title}</h2>
            <p className="text-zinc-300 text-sm leading-relaxed">{item.description}</p>
          </article>
        ))}
      </div>

      <div className="pt-4 flex justify-center">
        <Link
          href="/database"
          className="bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold px-5 py-2.5 rounded-lg border border-zinc-700 transition"
        >
          Explore New Cards in Database
        </Link>
      </div>
    </main>
  );
}