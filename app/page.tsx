import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-2xl space-y-6">
        <h1 className="text-5xl font-extrabold tracking-tight text-violet-500">
          CardVault
        </h1>
        <p className="text-xl text-zinc-400">
          Tu bóveda digital para gestionar y organizar tu colección de TCG y lista de deseos.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="rounded-lg bg-violet-600 px-5 py-3 font-medium text-white transition hover:bg-violet-500"
          >
            Ir a Mi Colección
          </Link>
          <Link
            href="/wishlist"
            className="rounded-lg border border-zinc-800 bg-zinc-900 px-5 py-3 font-medium text-zinc-300 transition hover:bg-zinc-800"
          >
            Ver Wishlist
          </Link>
        </div>
      </div>
    </main>
  );
}