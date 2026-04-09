import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ALL_ANIMAL_NAMES,
  ANIMALS_BY_RARITY,
  inferAnimalRarityFromName,
} from "../bestiary/animalCatalog";
import { createBeastDraft } from "../bestiary/beastFactory";
import { randomSeed } from "../bestiary/constants";
import {
  ALL_ELEMENT_NAMES,
  ELEMENTS_BY_RARITY,
  inferMantleRarityFromName,
  RARITY_LABEL,
  RARITY_ORDER,
  type RarityTier,
} from "../bestiary/elementCatalog";
import { useAnimalPhoto } from "../hooks/useAnimalPhoto";
import type { Beast } from "../types/beast";
import { BeastCard } from "./BeastCard";

type GridForgeSelectProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  groups: { tier: RarityTier; label: string; items: readonly string[] }[];
};

function GridForgeSelect({
  label,
  value,
  onChange,
  groups,
}: GridForgeSelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative w-full max-w-md">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wider text-zinc-500">
        {label}
      </span>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-lg border border-zinc-600 bg-zinc-900/80 px-3 py-2.5 text-left text-sm text-zinc-100 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-violet-500"
      >
        <span className="font-medium">{value}</span>
        <span className="text-zinc-500" aria-hidden>
          {open ? "▴" : "▾"}
        </span>
      </button>
      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 cursor-default bg-black/40"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 z-50 mt-1 max-h-[min(70vh,28rem)] overflow-y-auto rounded-lg border border-zinc-600 bg-zinc-900 p-3 shadow-2xl">
            {groups.map((g) => (
              <div key={g.tier} className="mb-4 last:mb-0">
                <p className="mb-2 text-[11px] font-semibold uppercase tracking-widest text-zinc-500">
                  {g.label}
                </p>
                <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-3">
                  {g.items.map((item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => {
                        onChange(item);
                        setOpen(false);
                      }}
                      className={`rounded-md border px-2 py-2 text-left text-xs leading-tight transition-colors ${
                        item === value
                          ? "border-violet-500 bg-violet-950/60 text-violet-100"
                          : "border-zinc-700 bg-zinc-950/80 text-zinc-300 hover:border-zinc-500 hover:bg-zinc-800"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

type ManualForgeProps = {
  onSave: (beast: Beast) => void;
};

export function ManualForge({ onSave }: ManualForgeProps) {
  const [element, setElement] = useState(ALL_ELEMENT_NAMES[0]!);
  const [animal, setAnimal] = useState(ALL_ANIMAL_NAMES[0]!);
  const [seed, setSeed] = useState(() => randomSeed());

  useEffect(() => {
    setSeed(randomSeed());
  }, [element, animal]);

  const mantleRarity = useMemo(
    () => inferMantleRarityFromName(element),
    [element],
  );
  const animalRarity = useMemo(
    () => inferAnimalRarityFromName(animal),
    [animal],
  );

  const { imageUrl, placeholderHex, photoLoading } = useAnimalPhoto(animal, seed);

  const currentBeast = useMemo(
    () =>
      createBeastDraft({
        element,
        animal,
        rarity: mantleRarity,
        animalRarity,
        seed,
        imageUrl,
        placeholderHex,
      }),
    [element, animal, mantleRarity, animalRarity, seed, imageUrl, placeholderHex],
  );

  const mantleGroups = useMemo(
    () =>
      RARITY_ORDER.map((tier) => ({
        tier,
        label: `${RARITY_LABEL[tier]} mantle`,
        items: ELEMENTS_BY_RARITY[tier],
      })),
    [],
  );

  const beastGroups = useMemo(
    () =>
      RARITY_ORDER.map((tier) => ({
        tier,
        label: `${RARITY_LABEL[tier]} beasts`,
        items: ANIMALS_BY_RARITY[tier],
      })),
    [],
  );

  const handleSave = useCallback(() => {
    onSave({ ...currentBeast, id: crypto.randomUUID() });
  }, [currentBeast, onSave]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6 sm:flex-row sm:flex-wrap sm:items-start">
        <GridForgeSelect
          label="Mantle / element"
          value={element}
          onChange={setElement}
          groups={mantleGroups}
        />
        <GridForgeSelect
          label="Creature"
          value={animal}
          onChange={setAnimal}
          groups={beastGroups}
        />
      </div>

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg border border-emerald-700/80 bg-emerald-950/80 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Save to collection
        </button>
      </div>

      <p className="max-w-xl text-sm text-zinc-500">
        Rarity badges follow your choices (each name belongs to one tier in the catalog). Portrait
        rules match random forge: mythic epics use flat colors; the Wikimedia allowlist uses Commons
        when Unsplash is off; other beasts use Unsplash if configured, otherwise a stable color.
      </p>

      <BeastCard beast={currentBeast} previewPhotoLoading={photoLoading} />
    </div>
  );
}
