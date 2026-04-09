import { useState } from "react";
import { BestiaryGenerator } from "./components/BestiaryGenerator";
import { BeastCard } from "./components/BeastCard";
import { ManualForge } from "./components/ManualForge";
import { useBestiaryCollection } from "./hooks/useBestiaryCollection";

type ForgePage = "random" | "manual";

export default function App() {
  const { collection, saveBeast, removeBeast } = useBestiaryCollection();
  const [forgePage, setForgePage] = useState<ForgePage>("random");

  return (
    <div className="min-h-screen bg-zinc-950 bg-[radial-gradient(ellipse_at_top,_#1e1b4b_0%,_transparent_55%)] text-zinc-100">
      <header className="border-b border-zinc-800/80 px-6 py-10">
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Fantastical Bestiary
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Roll mantle and beast tiers independently, pair a portrait with an elemental mantle, and save
          with a fixed seed so the same look comes back when you open your collection.
        </p>
        <nav className="mt-6 flex flex-wrap gap-2" aria-label="Forge mode">
          <button
            type="button"
            onClick={() => setForgePage("random")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              forgePage === "random"
                ? "bg-violet-600 text-white"
                : "border border-zinc-600 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Random forge
          </button>
          <button
            type="button"
            onClick={() => setForgePage("manual")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              forgePage === "manual"
                ? "bg-violet-600 text-white"
                : "border border-zinc-600 bg-zinc-900 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            Pick mantle &amp; creature
          </button>
        </nav>
      </header>

      <main className="mx-auto max-w-6xl px-6 py-12">
        <section className="mb-16">
          <h2 className="mb-6 font-serif text-2xl text-zinc-200">
            {forgePage === "random" ? "Random forge" : "Pick mantle & creature"}
          </h2>
          {forgePage === "random" ? (
            <BestiaryGenerator onSave={saveBeast} />
          ) : (
            <ManualForge onSave={saveBeast} />
          )}
        </section>

        <section>
          <h2 className="mb-6 font-serif text-2xl text-zinc-200">Your collection</h2>
          {collection.length === 0 ? (
            <p className="text-zinc-500">No beasts saved yet.</p>
          ) : (
            <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {collection.map((beast) => (
                <li key={beast.id}>
                  <BeastCard
                    beast={beast}
                    footer={
                      <button
                        type="button"
                        onClick={() => removeBeast(beast.id)}
                        className="mt-2 text-xs text-red-400/90 hover:text-red-300"
                      >
                        Remove
                      </button>
                    }
                  />
                </li>
              ))}
            </ul>
          )}
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 px-6 py-6 text-center text-xs leading-relaxed text-zinc-600">
        Default portraits: curated Commons for a small allowlist; mythic epics and most others use flat
        colors unless <code className="text-zinc-500">VITE_UNSPLASH_ACCESS_KEY</code> is set (see{" "}
        <a
          href="https://commons.wikimedia.org"
          className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 hover:text-zinc-400"
          target="_blank"
          rel="noreferrer"
        >
          Wikimedia Commons
        </a>{" "}
        /{" "}
        <a
          href="https://unsplash.com"
          className="text-zinc-500 underline decoration-zinc-700 underline-offset-2 hover:text-zinc-400"
          target="_blank"
          rel="noreferrer"
        >
          Unsplash
        </a>
        ).
      </footer>
    </div>
  );
}
