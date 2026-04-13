import { useCallback, useEffect, useState } from "react";

function getSynth(): SpeechSynthesis | null {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) return null;
  return window.speechSynthesis;
}

export function isSpeechSynthesisSupported(): boolean {
  return getSynth() !== null;
}

export function useReadAloud() {
  const supported = isSpeechSynthesisSupported();
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const synth = getSynth();
    if (!synth) return;

    const loadVoices = () => {
      const list = synth.getVoices();
      setVoices([...list].sort((a, b) => a.name.localeCompare(b.name)));
    };

    loadVoices();
    synth.addEventListener("voiceschanged", loadVoices);
    return () => synth.removeEventListener("voiceschanged", loadVoices);
  }, [supported]);

  const stop = useCallback(() => {
    const synth = getSynth();
    if (!synth) return;
    synth.cancel();
    setIsSpeaking(false);
  }, []);

  const speak = useCallback(
    (text: string, opts?: { voiceURI?: string; rate?: number; pitch?: number }) => {
      const synth = getSynth();
      if (!synth || !text.trim()) return;

      synth.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = opts?.rate ?? 1;
      utterance.pitch = opts?.pitch ?? 1;

      if (opts?.voiceURI) {
        const v = synth.getVoices().find((voice) => voice.voiceURI === opts.voiceURI);
        if (v) utterance.voice = v;
      }

      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      setIsSpeaking(true);
      synth.speak(utterance);
    },
    [],
  );

  useEffect(() => {
    return () => {
      getSynth()?.cancel();
    };
  }, []);

  return { supported, voices, isSpeaking, speak, stop };
}
