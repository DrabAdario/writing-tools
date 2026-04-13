import { Link } from "react-router-dom";

export function WritingToolsPage() {
  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_transparent_55%)] text-zinc-100">
      <header className="border-b border-zinc-800/80 px-6 py-12">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Writing tools
        </h1>
        <p className="mt-3 max-w-2xl text-lg text-zinc-400">
          Pick a tool to open it in its own page. More utilities will land here over time.
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        <ul className="flex flex-col gap-4">
          <li>
            <Link
              to="/bestiary"
              className="block rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-6 py-5 transition-colors hover:border-violet-500/50 hover:bg-zinc-900"
            >
              <span className="font-serif text-xl text-zinc-100">Fantastical Bestiary</span>
              <p className="mt-2 text-sm text-zinc-500">
                Roll rarities, forge beasts with elemental mantles, and save a seeded collection.
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/character-workshop"
              className="block rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-6 py-5 transition-colors hover:border-violet-500/50 hover:bg-zinc-900"
            >
              <span className="font-serif text-xl text-zinc-100">Character workshop</span>
              <p className="mt-2 text-sm text-zinc-500">
                Optional regional name style, personality facets, and a fantasy-neutral backstory
                sketch—save a local roster.
              </p>
            </Link>
          </li>
          <li>
            <Link
              to="/read-aloud"
              className="block rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-6 py-5 transition-colors hover:border-violet-500/50 hover:bg-zinc-900"
            >
              <span className="font-serif text-xl text-zinc-100">Read aloud</span>
              <p className="mt-2 text-sm text-zinc-500">
                Paste or upload text and hear it with your browser&apos;s built-in speech (no API
                key).
              </p>
            </Link>
          </li>
        </ul>
      </main>
    </div>
  );
}
