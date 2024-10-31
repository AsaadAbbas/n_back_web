"use client";

import { SOUND_URLS } from "@/lib/types";
import { useCallback, useRef } from "react";

export function useSound() {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const playSound = useCallback((letter: string) => {
    try {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }

      const url = SOUND_URLS[letter];
      if (!url) return;

      const audio = new Audio(url);
      audio.volume = 1.0;
      
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((error) => {
          console.error("Audio playback failed:", error);
        });
      }

      audioRef.current = audio;
    } catch (error) {
      console.error("Error playing sound:", error);
    }
  }, []);

  return { playSound };
}