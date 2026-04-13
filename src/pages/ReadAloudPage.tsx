import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useReadAloud } from "../hooks/useReadAloud";

const TEXT_ACCEPT = ".txt,.md,.markdown,text/plain";

function looksLikeTextFile(file: File): boolean {
  if (file.type.startsWith("text/")) return true;
  const name = file.name.toLowerCase();
  return name.endsWith(".txt") || name.endsWith(".md") || name.endsWith(".markdown");
}

/** Readable label for a BCP 47 tag (e.g. en-GB → "English (GB)"). */
function languageOptionLabel(tag: string): string {
  try {
    const dn = new Intl.DisplayNames(undefined, { type: "language" });
    const parts = tag.split(/[-_]/);
    const base = parts[0] ?? tag;
    const name = dn.of(base) ?? tag;
    const region = parts[1]?.toUpperCase();
    return region ? `${name} (${region})` : name;
  } catch {
    return tag;
  }
}

/**
 * Canonical language bucket for filtering. All US English locale variants map to `en-US`
 * so the dropdown shows one English (United States) option.
 */
function languageGroupKey(lang: string): string {
  const n = lang.trim().replace(/_/g, "-").toLowerCase();
  if (n === "en-us" || n.startsWith("en-us-")) {
    return "en-US";
  }
  return n;
}

function languageGroupLabel(groupKey: string): string {
  if (groupKey === "en-US") {
    return "English (United States)";
  }
  return languageOptionLabel(groupKey);
}

export function ReadAloudPage() {
  const fileInputId = useId();
  const [text, setText] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [voiceURI, setVoiceURI] = useState("");
  const [rate, setRate] = useState(1);
  const [fileError, setFileError] = useState<string | null>(null);

  const { supported, voices, isSpeaking, speak, stop } = useReadAloud();

  const languageGroups = useMemo(() => {
    const keys = [...new Set(voices.map((v) => languageGroupKey(v.lang)))];
    return keys.sort((a, b) => languageGroupLabel(a).localeCompare(languageGroupLabel(b)));
  }, [voices]);

  const filteredVoices = useMemo(() => {
    if (!languageFilter) return voices;
    return voices.filter((v) => languageGroupKey(v.lang) === languageFilter);
  }, [voices, languageFilter]);

  useEffect(() => {
    if (!voiceURI) return;
    const stillValid = filteredVoices.some((v) => v.voiceURI === voiceURI);
    if (!stillValid) setVoiceURI("");
  }, [languageFilter, filteredVoices, voiceURI]);

  const handleRead = useCallback(() => {
    const trimmed = text.trim();
    if (!trimmed) return;
    speak(trimmed, {
      voiceURI: voiceURI || undefined,
      rate,
    });
  }, [text, voiceURI, rate, speak]);

  const handleFileChange = useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFileError(null);
    const file = e.target.files?.[0];
    if (!file) return;

    if (!looksLikeTextFile(file)) {
      setFileError("Choose a plain text file (.txt, .md) or another text format.");
      e.target.value = "";
      return;
    }

    try {
      const contents = await file.text();
      setText(contents);
    } catch {
      setFileError("Could not read that file. Try a smaller .txt or .md file.");
    }
    e.target.value = "";
  }, []);

  const canRead = supported && text.trim().length > 0;

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
          <span className="text-zinc-400">Read aloud</span>
        </nav>
        <h1 className="font-serif text-4xl font-semibold tracking-tight text-zinc-50 md:text-5xl">
          Read aloud
        </h1>
        <p className="mt-2 max-w-2xl text-zinc-400">
          Paste or upload text. Speech uses your browser&apos;s built-in voices (no account or API
          key).
        </p>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12">
        {!supported && (
          <p className="mb-6 rounded-xl border border-amber-900/60 bg-amber-950/40 px-4 py-3 text-sm text-amber-200/90">
            This browser does not support speech synthesis, or it is disabled. Try Chrome, Edge,
            Firefox, or Safari on a recent version.
          </p>
        )}

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-zinc-400">Text</span>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="min-h-[240px] w-full resize-y rounded-xl border border-zinc-700/80 bg-zinc-900/60 px-4 py-3 text-sm leading-relaxed text-zinc-100 placeholder:text-zinc-600 focus:outline-none focus:ring-2 focus:ring-violet-500"
            placeholder="Paste your text here…"
            spellCheck
          />
        </label>

        {supported && (
          <div className="mt-6 flex flex-wrap items-end gap-4">
            <div className="flex min-w-[180px] flex-col gap-1">
              <label htmlFor="read-language" className="text-sm font-medium text-zinc-400">
                Language <span className="font-normal text-zinc-600">(optional)</span>
              </label>
              <select
                id="read-language"
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">All languages</option>
                {languageGroups.map((key) => (
                  <option key={key} value={key}>
                    {languageGroupLabel(key)}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex min-w-[200px] flex-1 flex-col gap-1">
              <label htmlFor="read-voice" className="text-sm font-medium text-zinc-400">
                Voice
              </label>
              <select
                id="read-voice"
                value={voiceURI}
                onChange={(e) => setVoiceURI(e.target.value)}
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-3 py-2 text-sm text-zinc-100 focus:outline-none focus:ring-2 focus:ring-violet-500"
              >
                <option value="">Default (system)</option>
                {filteredVoices.map((v) => (
                  <option key={v.voiceURI} value={v.voiceURI}>
                    {v.name}
                    {languageFilter ? "" : ` (${v.lang})`}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex w-full min-w-[160px] max-w-xs flex-col gap-1 sm:w-auto">
              <label htmlFor="read-rate" className="text-sm font-medium text-zinc-400">
                Rate <span className="text-zinc-500">({rate.toFixed(1)}×)</span>
              </label>
              <input
                id="read-rate"
                type="range"
                min={0.5}
                max={2}
                step={0.1}
                value={rate}
                onChange={(e) => setRate(Number(e.target.value))}
                className="accent-violet-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={handleRead}
                disabled={!canRead || isSpeaking}
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Read aloud
              </button>
              <button
                type="button"
                onClick={stop}
                disabled={!isSpeaking}
                className="rounded-lg border border-zinc-600 bg-zinc-900 px-4 py-2 text-sm font-medium text-zinc-200 hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-zinc-500 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        <div className="mt-8">
          <span className="mb-2 block text-sm font-medium text-zinc-400">Upload</span>
          <p className="mb-3 text-sm text-zinc-500">
            Load a .txt or .md file into the box above. You can also pick from Google Drive in your
            system file dialog if Drive for desktop is installed.
          </p>
          <label htmlFor={fileInputId} className="sr-only">
            Upload text file
          </label>
          <input
            id={fileInputId}
            type="file"
            accept={TEXT_ACCEPT}
            onChange={handleFileChange}
            className="block w-full max-w-lg cursor-pointer text-sm text-zinc-400 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-zinc-800 file:px-4 file:py-2 file:text-sm file:text-zinc-200 file:hover:bg-zinc-700"
          />
          {fileError && (
            <p className="mt-2 text-sm text-red-400" role="alert">
              {fileError}
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
