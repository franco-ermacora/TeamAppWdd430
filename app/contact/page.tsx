import Link from 'next/link';

export default function ContactPage() {
  return (
    <main className="max-w-3xl mx-auto px-6 py-12 space-y-8 text-white">
      <div className="border-b border-zinc-800 pb-6 space-y-2">
        <h1 className="text-3xl font-extrabold text-violet-500">Contact Support</h1>
        <p className="text-sm text-zinc-400">
          Have questions, feedback, or need assistance with your CardVault account? Get in touch with us.
        </p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-8 space-y-6">
        <div className="space-y-1">
          <h2 className="text-lg font-bold text-white">Direct Support</h2>
          <p className="text-xs text-zinc-400">
            Our team is available to help you with database requests, account synchronization, or feature suggestions.
          </p>
        </div>

        <div className="space-y-4 text-sm">
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Support Email</span>
            <span className="font-mono text-violet-400">support@cardvault.internal</span>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
            <span className="text-zinc-400">Response Time</span>
            <span className="text-zinc-200">Within 24 hours</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-zinc-400">Platform Status</span>
            <span className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </span>
          </div>
        </div>

        <div className="pt-2">
          <a
            href="mailto:support@cardvault.internal"
            className="block w-full bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm py-3 rounded-lg text-center transition shadow-lg"
          >
            Send Us an Email
          </a>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <Link href="/" className="text-xs text-zinc-400 hover:text-white transition">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}