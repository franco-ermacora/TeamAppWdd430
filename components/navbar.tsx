'use client';

import Link from 'next/link';
import { UserButton, SignInButton, useAuth } from '@clerk/nextjs';

export function Navbar() {
  const { isSignedIn } = useAuth();

  return (
    <header className="border-b border-zinc-800 bg-zinc-950/80 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-extrabold text-violet-500 tracking-tight">
          CardVault
        </Link>

        <nav className="flex items-center gap-5 text-sm font-medium text-zinc-400">
          <Link href="/" className="hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/announcements" className="hover:text-white transition-colors">
            Announcements
          </Link>
          <Link href="/database" className="hover:text-white transition-colors">
            Database
          </Link>
          <Link href="/dashboard" className="hover:text-white transition-colors">
            Collection
          </Link>
          <Link href="/wishlist" className="hover:text-white transition-colors">
            Wishlist
          </Link>
          <Link href="/info" className="hover:text-white transition-colors">
            Info
          </Link>
          <Link href="/contact" className="hover:text-white transition-colors">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-violet-600 hover:bg-violet-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </header>
  );
}