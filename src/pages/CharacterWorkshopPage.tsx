import { Link } from "react-router-dom";
import { CharacterWorkshopGenerator } from "../components/CharacterWorkshopGenerator";
import { useCharacterWorkshopCollection } from "../hooks/useCharacterWorkshopCollection";

export function CharacterWorkshopPage() {
  const { collection, saveCharacter, removeCharacter } = useCharacterWorkshopCollection();

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_transparent_55%)] text-zinc-100">
      <header className="border-b border-zinc-800/80 px-6 py-6">
        <nav className="mb-6 text-sm" aria-label="Site">
          <Link
            to="/"
            className="text-violet-400/90 underline decoration-violet-600/60 underline-offset-2 hover:text-violet-300"
          >
            Writing tools
          </Link>
          <span className="text-zinc-600" aria-hidden="true">
            {" "}
            /{" "}
          </span>
          <span className="text-zinc-400">Character workshop</span>
        </nav>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Character workshop
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Pull a random name (optionally biased by region for sound), layer temperament, virtue,
          flaw, drive, and bond, then read a fantasy-neutral backstory sketch you can save to a
          local roster.
        </p>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl text-zinc-200">Forge</h2>
          <CharacterWorkshopGenerator onSave={saveCharacter} />
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl text-zinc-200">Saved roster</h2>
          {collection.length === 0 ? (
            <p className="text-zinc-500">No characters saved yet.</p>
          ) : (
            <ul className="grid gap-6 lg:grid-cols-2">
              {collection.map((c) => (
                <li key={c.id}>
                  <article className="rounded-xl border border-zinc-700/80 bg-zinc-900/40 p-5">
                    <div className="min-w-0">
                      <h3 className="font-serif text-xl text-zinc-100">{c.fullName}</h3>
                      <p className="text-xs text-zinc-500">
                        {c.title} ·{" "}
                        {c.gender === "male" || c.gender === "female"
                          ? c.gender.charAt(0).toUpperCase() + c.gender.slice(1)
                          : c.gender}
                      </p>
                    </div>
                    <p className="mt-3 line-clamp-3 text-sm text-zinc-500">{c.backstory}</p>
                    <button
                      type="button"
                      onClick={() => removeCharacter(c.id)}
                      className="mt-3 text-xs text-red-400/90 hover:text-red-300"
                    >
                      Remove
                    </button>
                  </article>
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 px-6 py-6 text-center text-xs leading-relaxed text-zinc-600">
        Saved characters stay in this browser only.
      </footer>
    </div>
  );
}
