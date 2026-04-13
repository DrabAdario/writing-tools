import { useCallback, useEffect, useState } from "react";
import type { CharacterDraft } from "../types/character";

const STORAGE_KEY = "character-workshop-collection";

function loadFromStorage(): CharacterDraft[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isPersistedCharacter);
  } catch {
    return [];
  }
}

function isPersistedCharacter(value: unknown): value is CharacterDraft {
  if (value === null || typeof value !== "object") return false;
  const o = value as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.fullName === "string" &&
    typeof o.backstory === "string" &&
    o.traits !== null &&
    typeof o.traits === "object"
  );
}

export function useCharacterWorkshopCollection() {
  const [collection, setCollection] = useState<CharacterDraft[]>(loadFromStorage);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(collection));
    } catch {
      /* quota or private mode */
    }
  }, [collection]);

  const saveCharacter = useCallback((character: CharacterDraft) => {
    setCollection((prev) => {
      if (prev.some((c) => c.id === character.id)) {
        return prev.map((c) => (c.id === character.id ? character : c));
      }
      return [character, ...prev];
    });
  }, []);

  const removeCharacter = useCallback((id: string) => {
    setCollection((prev) => prev.filter((c) => c.id !== id));
  }, []);

  return { collection, saveCharacter, removeCharacter };
}
