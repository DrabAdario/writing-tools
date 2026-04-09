import { useCallback, useMemo, useState } from "react";
import { pickWeightedAnimal } from "../bestiary/animalCatalog";
import { createBeastDraft } from "../bestiary/beastFactory";
import { randomSeed } from "../bestiary/constants";
import { pickWeightedElement } from "../bestiary/elementCatalog";
import { useAnimalPhoto } from "../hooks/useAnimalPhoto";
import type { Beast } from "../types/beast";
import { BeastCard } from "./BeastCard";

type BestiaryGeneratorProps = {
  onSave: (beast: Beast) => void;
};

export function BestiaryGenerator({ onSave }: BestiaryGeneratorProps) {
  const [lockElement, setLockElement] = useState(false);
  const [lockAnimal, setLockAnimal] = useState(false);

  const [mantle, setMantle] = useState(pickWeightedElement);
  const [beastRoll, setBeastRoll] = useState(pickWeightedAnimal);
  const [seed, setSeed] = useState(() => randomSeed());

  const { imageUrl, placeholderHex, photoLoading } = useAnimalPhoto(
    beastRoll.animal,
    seed,
  );

  const currentBeast = useMemo(
    () =>
      createBeastDraft({
        element: mantle.element,
        animal: beastRoll.animal,
        rarity: mantle.rarity,
        animalRarity: beastRoll.animalRarity,
        seed,
        imageUrl,
        placeholderHex,
      }),
    [
      mantle.element,
      mantle.rarity,
      beastRoll.animal,
      beastRoll.animalRarity,
      seed,
      imageUrl,
      placeholderHex,
    ],
  );

  const rollNewBeast = useCallback(() => {
    if (!lockElement) setMantle(pickWeightedElement());
    if (!lockAnimal) setBeastRoll(pickWeightedAnimal());
    setSeed(randomSeed());
  }, [lockElement, lockAnimal]);

  const handleSave = useCallback(() => {
    onSave({ ...currentBeast, id: crypto.randomUUID() });
  }, [currentBeast, onSave]);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          onClick={rollNewBeast}
          className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400"
        >
          Summon new beast
        </button>
        <button
          type="button"
          onClick={handleSave}
          className="rounded-lg border border-emerald-700/80 bg-emerald-950/80 px-4 py-2 text-sm font-medium text-emerald-200 hover:bg-emerald-900/80 focus:outline-none focus:ring-2 focus:ring-emerald-600"
        >
          Save to collection
        </button>
      </div>

      <div className="flex flex-wrap gap-4">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={lockElement}
            onChange={(e) => setLockElement(e.target.checked)}
            className="rounded border-zinc-600"
          />
          Lock mantle &amp; mantle rarity
        </label>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-zinc-400">
          <input
            type="checkbox"
            checked={lockAnimal}
            onChange={(e) => setLockAnimal(e.target.checked)}
            className="rounded border-zinc-600"
          />
          Lock beast &amp; beast rarity
        </label>
      </div>

      <p className="max-w-xl text-sm text-zinc-500">
        Each summon rolls <span className="text-zinc-400">two</span> independent tiers (mantle and
        beast). Mythic beasts and most creatures without a dedicated photo use a flat color portrait
        unless you configure Unsplash. The allowlist (wolf, raven, bear, etc.) uses curated Commons
        images when Unsplash is off.
      </p>

      <BeastCard beast={currentBeast} previewPhotoLoading={photoLoading} />
    </div>
  );
}
