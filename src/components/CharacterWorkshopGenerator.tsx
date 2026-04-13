import { useCallback, useState } from "react";
import { generateTraitsAndStory } from "../characterWorkshop/personalityAndStory";
import { fetchRandomName, type NameRegionFilter } from "../characterWorkshop/randomName";
import type { CharacterDraft } from "../types/character";

const REGION_OPTIONS: { value: NameRegionFilter; label: string }[] = [
  { value: "any", label: "Any region" },
  { value: "us", label: "United States" },
  { value: "gb", label: "United Kingdom" },
  { value: "fr", label: "France" },
  { value: "de", label: "Germany" },
  { value: "es", label: "Spain" },
  { value: "it", label: "Italy" },
  { value: "nl", label: "Netherlands" },
  { value: "br", label: "Brazil" },
  { value: "au", label: "Australia" },
  { value: "ca", label: "Canada" },
];

function formatGenderLabel(gender: string): string {
  if (gender === "male" || gender === "female") {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  }
  return gender;
}

type CharacterWorkshopGeneratorProps = {
  onSave: (character: CharacterDraft) => void;
};

export function CharacterWorkshopGenerator({ onSave }: CharacterWorkshopGeneratorProps) {
  const [region, setRegion] = useState<NameRegionFilter>("any");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<Omit<CharacterDraft, "id" | "createdAt"> | null>(null);

  const rollCharacter = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const n = await fetchRandomName(region);
      const { traits, backstory } = generateTraitsAndStory(n);
      setDraft({
        fullName: n.fullName,
        firstName: n.firstName,
        lastName: n.lastName,
        title: n.title,
        gender: n.gender,
        traits,
        backstory,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not reach the name service.");
      setDraft(null);
    } finally {
      setLoading(false);
    }
  }, [region]);

  const handleSave = useCallback(() => {
    if (!draft) return;
    onSave({
      ...draft,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    });
  }, [draft, onSave]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-end gap-4">
        <label className="flex flex-col gap-1 text-sm text-zinc-400">
          <span>Name region (syllable style)</span>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value as NameRegionFilter)}
            className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
          >
            {REGION_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </label>
        <button
          type="button"
          onClick={() => void rollCharacter()}
          disabled={loading}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Fetching…" : "Generate character"}
        </button>
        <button
          type="button"
          onClick={handleSave}
          disabled={!draft}
          className="rounded-lg border border-emerald-700/80 bg-emerald-950/80 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Save to roster
        </button>
      </div>

      {error && (
        <p className="max-w-xl text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <p className="max-w-2xl text-sm text-zinc-500">
        Names come from the{" "}
        <a
          href="https://randomuser.me/"
          className="text-violet-400/90 underline decoration-violet-700/60 underline-offset-2 hover:text-violet-300"
          target="_blank"
          rel="noreferrer"
        >
          Random User Generator
        </a>{" "}
        API (region biases how names sound). Personality and backstory are invented here in generic
        fantasy terms—no real-world places.
      </p>

      {draft && (
        <article className="overflow-hidden rounded-2xl border border-zinc-700/80 bg-zinc-900/50 shadow-xl shadow-black/20">
          <div className="p-6">
            <p className="text-xs uppercase tracking-wider text-zinc-500">
              {draft.title} · {formatGenderLabel(draft.gender)}
            </p>
            <h3 className="mt-1 font-serif text-3xl font-semibold tracking-tight text-zinc-50">
              {draft.fullName}
            </h3>
            <dl className="mt-4 grid gap-3 text-sm sm:grid-cols-2">
              <div>
                <dt className="text-zinc-500">Temperament</dt>
                <dd className="text-zinc-200">{draft.traits.temperament}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Visible virtue</dt>
                <dd className="text-zinc-200">{draft.traits.virtue}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Hidden flaw</dt>
                <dd className="text-zinc-200">{draft.traits.flaw}</dd>
              </div>
              <div>
                <dt className="text-zinc-500">Drive</dt>
                <dd className="text-zinc-200">{draft.traits.drive}</dd>
              </div>
              <div className="sm:col-span-2">
                <dt className="text-zinc-500">Bond</dt>
                <dd className="text-zinc-200">{draft.traits.bond}</dd>
              </div>
            </dl>
          </div>
          <div className="border-t border-zinc-800/90 bg-zinc-950/40 px-6 py-5">
            <h4 className="font-serif text-lg text-zinc-200">Backstory sketch</h4>
            <div className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">
              {draft.backstory}
            </div>
          </div>
        </article>
      )}

      {!draft && !loading && !error && (
        <p className="text-zinc-500">Choose a region and generate a character to begin.</p>
      )}
    </div>
  );
}
