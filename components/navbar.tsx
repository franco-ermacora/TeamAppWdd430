import Link from "next/link";
import { auth } from "@clerk/nextjs/server";
import { SignInButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default async function Navbar() {
  const { userId } = await auth();

  return (
    <header className="border-b border-zinc-800 bg-zinc-900/80">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-4">
        <Link href="/" className="text-xl font-bold text-violet-500">
          CardVault
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium">
          <Link href="/dashboard" className="transition hover:text-violet-400">
            Colección
          </Link>
          <Link href="/wishlist" className="transition hover:text-violet-400">
            Wishlist
          </Link>

          {!userId ? (
            <div className="flex items-center gap-3">
              <SignInButton mode="modal">
                <button className="rounded-md border border-violet-600/50 px-3 py-1.5 text-violet-300 transition hover:bg-violet-600/10">
                  Iniciar Sesión
                </button>
              </SignInButton>

              <SignUpButton mode="modal">
                <button className="rounded-md bg-violet-600 px-3 py-1.5 text-white transition hover:bg-violet-500">
                  Registrarse
                </button>
              </SignUpButton>
            </div>
          ) : (
            <UserButton />
          )}
        </nav>
      </div>
    </header>
  );
}