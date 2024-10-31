"use client";

import { create } from "zustand";
import { GameSettings, GameState, GameStep, MatchStats, SOUNDS } from "@/lib/types";
import { toast } from "sonner";

interface GameStore {
  settings: GameSettings;
  gameState: GameState;
  updateSettings: (settings: Partial<GameSettings>) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  endGame: () => void;
  checkMatch: (type: "position" | "sound", userClaimsMatch: boolean) => void;
  generateNextStep: () => GameStep;
  addStep: (step: GameStep) => void;
}

const initialSettings: GameSettings = {
  nBack: 2,
  soundEnabled: true,
  positionEnabled: true,
  roundDuration: 3000,
  totalRounds: 20,
};

const initialMatchStats: MatchStats = {
  correctMatches: 0,
  incorrectMatches: 0,
  missedMatches: 0,
  totalPossibleMatches: 0,
  totalAttempts: 0,
};

const initialGameState: GameState = {
  currentRound: 0,
  sequence: [],
  isPlaying: false,
  isPaused: false,
  streak: 0,
  stats: {
    positionStats: { ...initialMatchStats },
    soundStats: { ...initialMatchStats },
  },
};

export const useGameStore = create<GameStore>((set, get) => ({
  settings: initialSettings,
  gameState: initialGameState,

  updateSettings: (newSettings) =>
    set((state) => ({
      settings: { ...state.settings, ...newSettings },
    })),

  startGame: () => {
    const firstStep = get().generateNextStep();
    set({
      gameState: {
        ...initialGameState,
        isPlaying: true,
        sequence: [firstStep],
        currentRound: 1,
      },
    });
  },

  pauseGame: () =>
    set((state) => ({
      gameState: { ...state.gameState, isPaused: true },
    })),

  resumeGame: () =>
    set((state) => ({
      gameState: { ...state.gameState, isPaused: false },
    })),

  endGame: () =>
    set((state) => ({
      gameState: { ...state.gameState, isPlaying: false },
    })),

  checkMatch: (type: "position" | "sound", userClaimsMatch: boolean) =>
    set((state) => {
      const { sequence } = state.gameState;
      const { nBack } = state.settings;
      const currentIndex = sequence.length - 1;
      const compareIndex = currentIndex - nBack;

      if (compareIndex < 0) {
        if (userClaimsMatch) {
          toast.error("No matches possible yet!");
          const statsKey = type === "position" ? "positionStats" : "soundStats";
          const stats = { ...state.gameState.stats[statsKey] };
          stats.incorrectMatches++;
          stats.totalAttempts++;
          return {
            gameState: {
              ...state.gameState,
              streak: 0,
              stats: {
                ...state.gameState.stats,
                [statsKey]: stats,
              },
            },
          };
        }
        return state;
      }

      const currentStep = sequence[currentIndex];
      const compareStep = sequence[compareIndex];
      const isActualMatch = type === "position" 
        ? currentStep.position === compareStep.position
        : currentStep.sound === compareStep.sound;

      const statsKey = type === "position" ? "positionStats" : "soundStats";
      const stats = { ...state.gameState.stats[statsKey] };
      let newStreak = state.gameState.streak;

      if (isActualMatch) {
        stats.totalPossibleMatches++;
      }

      if (userClaimsMatch && isActualMatch) {
        stats.correctMatches++;
        newStreak++;
        if (newStreak > 0 && newStreak % 5 === 0) {
          toast.success(`${newStreak} correct matches in a row!`);
        }
      } else if (userClaimsMatch && !isActualMatch) {
        stats.incorrectMatches++;
        newStreak = 0;
        toast.error("Incorrect match!");
      } else if (!userClaimsMatch && isActualMatch) {
        stats.missedMatches++;
        newStreak = 0;
        toast.error("Missed match!");
      }
      stats.totalAttempts++;

      return {
        gameState: {
          ...state.gameState,
          streak: newStreak,
          stats: {
            ...state.gameState.stats,
            [statsKey]: stats,
          },
        },
      };
    }),

  generateNextStep: () => {
    const state = get();
    const { sequence } = state.gameState;
    const { nBack } = state.settings;
    const currentIndex = sequence.length;

    // 33% chance of match for both position and sound
    const shouldMatchPosition = Math.random() < 0.33;
    const shouldMatchSound = Math.random() < 0.33;

    let position: number;
    let sound: string;

    if (shouldMatchPosition && currentIndex >= nBack) {
      position = sequence[currentIndex - nBack].position;
    } else {
      position = Math.floor(Math.random() * 9);
    }

    if (shouldMatchSound && currentIndex >= nBack) {
      sound = sequence[currentIndex - nBack].sound;
    } else {
      sound = SOUNDS[Math.floor(Math.random() * SOUNDS.length)];
    }

    return {
      position,
      sound,
      timestamp: Date.now(),
      isPositionMatch: shouldMatchPosition && currentIndex >= nBack,
      isSoundMatch: shouldMatchSound && currentIndex >= nBack,
    };
  },

  addStep: (step: GameStep) =>
    set((state) => ({
      gameState: {
        ...state.gameState,
        currentRound: state.gameState.currentRound + 1,
        sequence: [...state.gameState.sequence, step],
      },
    })),
}));