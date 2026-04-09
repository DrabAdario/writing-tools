import { useCallback, useEffect, useState } from "react";
import { inferAnimalRarityFromName } from "../bestiary/animalCatalog";
import { isRarityTier } from "../bestiary/elementCatalog";
import { normalizeStoredImageUrl } from "../bestiary/animalPhotoRegistry";
import { computePortraitSync } from "../bestiary/portraitResolver";
import type { Beast } from "../types/beast";

const STORAGE_KEY = "fantastical-bestiary-collection";

/** Saved JSON may use `uniqueDescription` or legacy `description`. */
type LoadedRow = Omit<Beast, "animalRarity" | "placeholderHex" | "uniqueDescription"> & {
  animalRarity?: Beast["animalRarity"];
  placeholderHex?: Beast["placeholderHex"];
  uniqueDescription?: string;
  description?: string;
};

function loadFromStorage(): Beast[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(isPersistedBeast)
      .map((b) => normalizeLoadedBeast(b as LoadedRow));
  } catch {
    return [];
  }
}

function normalizeLoadedBeast(b: LoadedRow): Beast {
  const animalRarity = isRarityTier(b.animalRarity)
    ? b.animalRarity
    : inferAnimalRarityFromName(b.animal);

  let imageUrl = normalizeStoredImageUrl(b);
  let placeholderHex = b.placeholderHex;

  if ((!imageUrl || imageUrl.length === 0) && !placeholderHex) {
    const c = computePortraitSync(b.animal, b.seed);
    imageUrl = c.imageUrl;
    placeholderHex = c.placeholderHex;
  }

  const uniqueDescription =
    typeof b.uniqueDescription === "string" && b.uniqueDescription.length > 0
      ? b.uniqueDescription
      : typeof b.description === "string"
        ? b.description
        : "";

  return {
    id: b.id,
    element: b.element,
    animal: b.animal,
    rarity: isRarityTier(b.rarity) ? b.rarity : "common",
    animalRarity,
    seed: b.seed,
    imageUrl,
    placeholderHex,
    uniqueDescription,
  };
}

function isPersistedBeast(value: unknown): value is LoadedRow {
  if (value === null || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.element === "string" &&
    typeof o.animal === "string" &&
    typeof o.seed === "number" &&
    typeof o.imageUrl === "string" &&
    (typeof o.uniqueDescription === "string" ||
      typeof o.description === "string") &&
    (o.rarity === undefined || typeof o.rarity === "string") &&
    (o.animalRarity === undefined || typeof o.animalRarity === "string") &&
    (o.placeholderHex === undefined || typeof o.placeholderHex === "string")
  );
}

export function useBestiaryCollection() {
  const [collection, setCollection] = useState<Beast[]>(loadFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    } catch {
      /* quota or private mode */
    }
  }, [collection]);

  const saveBeast = useCallback((beast: Beast) => {
    setCollection((prev) => {
      if (prev.some((b) => b.id === beast.id)) {
        return prev.map((b) => (b.id === beast.id ? beast : b));
      }
      return [beast, ...prev];
    });
  }, []);

  const removeBeast = useCallback((id: string) => {
    setCollection((prev) => prev.filter((b) => b.id !== id));
  }, []);

  return { collection, saveBeast, removeBeast };
}
