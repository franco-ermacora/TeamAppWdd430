import { MASTER_CARDS } from '@/lib/masterCards';
import { addCollectionCard, addWishlistCard } from '@/lib/actions';
import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';

const ITEMS_PER_PAGE = 12;

export default async function DatabasePage(props: {
  searchParams?: Promise<{ query?: string; page?: string }>;
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center text-white space-y-6">
        <h1 className="text-3xl font-extrabold text-violet-500">Authentication Required</h1>
        <p className="text-zinc-400 text-sm">
          You need to be signed in to view and add cards from the master database.
        </p>
        <div>
          <SignInButton mode="modal">
            <button className="bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm px-6 py-3 rounded-lg transition shadow-lg">
              Sign In Now
            </button>
          </SignInButton>
        </div>
      </main>
    );
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query?.toLowerCase() ?? '';
  const currentPage = Number(searchParams?.page) || 1;

  const filteredCards = MASTER_CARDS.filter((card) => {
    return (
      card.name.toLowerCase().includes(query) ||
      card.set.toLowerCase().includes(query) ||
      card.rarity.toLowerCase().includes(query)
    );
  });

  const totalPages = Math.ceil(filteredCards.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCards = filteredCards.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-violet-500">Master Database</h1>
          <p className="text-sm text-zinc-400 mt-1">Explore all 120 mystical creature cards available in CardVault</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Form action="/database" className="w-full sm:w-72">
            <input
              type="text"
              name="query"
              defaultValue={searchParams?.query ?? ''}
              placeholder="Search master database..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </Form>
        </div>
      </div>

      {currentCards.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-xl space-y-3">
          <p>No cards found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {currentCards.map((card) => (
            <div
              key={card.id}
              className={`w-full max-w-[280px] border-4 rounded-xl p-3 flex flex-col justify-between shadow-2xl ${card.borderColor}`}
            >
              <div>
                <div className="bg-zinc-900/90 border border-zinc-700/50 rounded p-1.5 mb-2 flex justify-between items-center">
                  <h3 className="font-extrabold text-xs text-zinc-100 uppercase truncate">{card.name}</h3>
                  <span className="text-[10px] bg-zinc-950 text-zinc-300 font-bold px-1.5 py-0.5 rounded border border-zinc-700">
                    {card.rarity}
                  </span>
                </div>

                {/* AQUÍ ES DONDE HACEMOS LA IMAGEN CUADRADA */}
                <div className="relative w-full aspect-square bg-zinc-950 border-2 border-zinc-800 rounded overflow-hidden mb-2">
                  <img
                    src={card.image}
                    alt={card.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="text-[10px] text-zinc-400 mb-1 font-mono flex justify-between">
                  <span>SET: {card.set}</span>
                  <span className="text-emerald-400 font-bold">${card.cardValue} USD</span>
                </div>

                <div className="bg-zinc-900/80 text-zinc-300 border border-zinc-800 p-2 rounded text-[11px] leading-tight min-h-[50px] mb-3 italic">
                  {card.description}
                </div>
              </div>

              <div className="pt-2 border-t border-zinc-800 space-y-2">
                <form action={addCollectionCard}>
                  <input type="hidden" name="name" value={card.name} />
                  <input type="hidden" name="set" value={card.set} />
                  <input type="hidden" name="rarity" value={card.rarity} />
                  <input type="hidden" name="quantity" value="1" />
                  <button
                    type="submit"
                    className="w-full bg-violet-600 hover:bg-violet-500 text-white font-bold text-[10px] py-2 rounded transition shadow"
                  >
                    + Add to Collection
                  </button>
                </form>

                <form action={addWishlistCard}>
                  <input type="hidden" name="name" value={card.name} />
                  <input type="hidden" name="set" value={card.set} />
                  <input type="hidden" name="rarity" value={card.rarity} />
                  <input type="hidden" name="priority" value="1" />
                  <button
                    type="submit"
                    className="w-full bg-amber-700 hover:bg-amber-600 text-white font-bold text-[10px] py-1.5 rounded transition shadow"
                  >
                    + Add to Wishlist
                  </button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 pt-6">
          <Link
            href={`/database?page=${currentPage - 1}${query ? `&query=${query}` : ''}`}
            className={`px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm ${
              currentPage <= 1 ? 'pointer-events-none opacity-40' : 'hover:border-violet-500'
            }`}
          >
            Previous
          </Link>
          <span className="text-sm text-zinc-400">
            Page {currentPage} of {totalPages}
          </span>
          <Link
            href={`/database?page=${currentPage + 1}${query ? `&query=${query}` : ''}`}
            className={`px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm ${
              currentPage >= totalPages ? 'pointer-events-none opacity-40' : 'hover:border-violet-500'
            }`}
          >
            Next
          </Link>
        </div>
      )}
    </main>
  );
}