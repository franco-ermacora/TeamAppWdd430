import { prisma } from '@/lib/prisma';
import { MASTER_CARDS } from '@/lib/masterCards';
import { auth } from '@clerk/nextjs/server';
import { SignInButton } from '@clerk/nextjs';
import Link from 'next/link';
import Form from 'next/form';
import { deleteWishlistCard } from '@/lib/actions';

export default async function WishlistPage(props: {
  searchParams?: Promise<{ query?: string }>;
}) {
  const { userId: clerkId } = await auth();

  if (!clerkId) {
    return (
      <main className="max-w-4xl mx-auto px-6 py-20 text-center text-white space-y-6">
        <h1 className="text-3xl font-extrabold text-violet-500">Authentication Required</h1>
        <p className="text-zinc-400 text-sm">
          You need to be signed in to view and manage your personal wishlist.
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

  let user = await prisma.user.findUnique({
    where: { clerkId },
  });

  if (!user) {
    try {
      user = await prisma.user.create({
        data: { clerkId, email: `${clerkId}@placeholder.com` },
      });
    } catch {
      user = await prisma.user.findUnique({ where: { clerkId } });
    }
  }

  if (!user) {
    throw new Error('No se pudo obtener o crear el usuario en la base de datos.');
  }

  const searchParams = await props.searchParams;
  const query = searchParams?.query ?? '';

  const whereClause = {
    userId: user.id,
    ...(query
      ? {
          OR: [
            { name: { contains: query, mode: 'insensitive' as const } },
            { set: { contains: query, mode: 'insensitive' as const } },
            { rarity: { contains: query, mode: 'insensitive' as const } },
          ],
        }
      : {}),
  };

  const wishlistCards = await prisma.wishlistCard.findMany({
    where: whereClause,
    orderBy: { createdAt: 'desc' },
  });

  return (
    <main className="max-w-7xl mx-auto px-6 py-12 space-y-8 text-white">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-extrabold text-violet-500">My Wishlist</h1>
          <p className="text-sm text-zinc-400 mt-1">Cards you are looking to acquire</p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <Form action="/wishlist" className="w-full sm:w-72">
            <input
              type="text"
              name="query"
              defaultValue={query}
              placeholder="Search your wishlist..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-violet-500"
            />
          </Form>
          <Link
            href="/database"
            className="w-full sm:w-auto bg-violet-600 hover:bg-violet-500 text-white font-medium px-4 py-2 rounded-lg text-sm text-center transition"
          >
            + Add Cards from Database
          </Link>
        </div>
      </div>

      {wishlistCards.length === 0 ? (
        <div className="text-center py-20 text-zinc-500 border border-dashed border-zinc-800 rounded-xl space-y-3">
          <p>No cards in your wishlist yet.</p>
          <Link href="/database" className="inline-block text-xs text-violet-400 hover:underline">
            Explore the Database to add cards &rarr;
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
          {wishlistCards.map((card) => {
            const masterMatch = MASTER_CARDS.find((m) => m.name.toLowerCase() === card.name.toLowerCase());
            const imageSrc = masterMatch ? masterMatch.image : null;
            
            const borderColor = masterMatch ? masterMatch.borderColor : 'border-amber-600 bg-amber-950/80';
            const cardValue = masterMatch ? masterMatch.cardValue : 0;

            return (
              <div
                key={card.id}
                className={`w-full max-w-[280px] border-4 rounded-xl p-3 flex flex-col justify-between shadow-2xl ${borderColor}`}
              >
                <div>
                  <div className="bg-amber-900/90 border border-amber-500/50 rounded p-1.5 mb-2 flex justify-between items-center">
                    <h3 className="font-extrabold text-xs text-amber-100 uppercase truncate">{card.name}</h3>
                    <span className="text-[10px] bg-amber-950 text-amber-400 font-bold px-1.5 py-0.5 rounded border border-amber-500/40">
                      {card.rarity}
                    </span>
                  </div>

                  <div className="relative w-full aspect-square bg-zinc-950 border-2 border-amber-700/60 rounded overflow-hidden mb-2">
                    {imageSrc ? (
                      <img src={imageSrc} alt={card.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-zinc-600 text-xs font-mono">
                        [Card Art]
                      </div>
                    )}
                  </div>

                  <div className="text-[10px] text-amber-300/80 mb-1 font-mono flex justify-between">
                    <span>SET: {card.set}</span>
                    <span className="text-emerald-400 font-bold">${cardValue} USD</span>
                  </div>

                  <div className="bg-amber-100/90 text-zinc-900 border border-amber-700 p-2 rounded text-[11px] leading-tight min-h-[50px] mb-3 italic">
                    A powerful collectible card from your wishlist tracking.
                  </div>
                </div>

                <div className="pt-2 border-t border-amber-700/50">
                  <form action={deleteWishlistCard.bind(null, card.id)}>
                    <button
                      type="submit"
                      className="w-full bg-rose-700 hover:bg-rose-600 text-white font-bold text-[10px] py-1.5 rounded transition shadow"
                    >
                      Remove
                    </button>
                  </form>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}