"use client";

import { useEffect, useRef, useState } from "react";
import { Grid } from "@/components/game/grid";
import { Controls } from "@/components/game/controls";
import { useGameStore } from "@/hooks/use-game-store";
import { SOUND_URLS } from "@/lib/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pause, Play, RotateCcw } from "lucide-react";
import { useSound } from "@/hooks/use-sound";

export function GameBoard() {
  const [isReady, setIsReady] = useState(false);
  const timerRef = useRef<NodeJS.Timeout>();
  const { playSound } = useSound();
  
  const settings = useGameStore((state) => state.settings);
  const gameState = useGameStore((state) => state.gameState);
  const startGame = useGameStore((state) => state.startGame);
  const pauseGame = useGameStore((state) => state.pauseGame);
  const resumeGame = useGameStore((state) => state.resumeGame);
  const endGame = useGameStore((state) => state.endGame);
  const generateNextStep = useGameStore((state) => state.generateNextStep);
  const addStep = useGameStore((state) => state.addStep);
  const checkMatch = useGameStore((state) => state.checkMatch);

  const currentStep = gameState.sequence[gameState.sequence.length - 1];

  useEffect(() => {
    setIsReady(true);
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    const playNextStep = () => {
      if (gameState.currentRound >= settings.totalRounds) {
        endGame();
        return;
      }

      const step = generateNextStep();
      addStep(step);

      // Play sound immediately when step is generated
      if (settings.soundEnabled) {
        playSound(step.sound);
      }

      // Schedule the next step
      timerRef.current = setTimeout(() => {
        if (!gameState.isPaused && gameState.isPlaying) {
          if (settings.positionEnabled) {
            checkMatch("position", false);
          }
          if (settings.soundEnabled) {
            checkMatch("sound", false);
          }
          playNextStep();
        }
      }, settings.roundDuration);
    };

    if (gameState.isPlaying && !gameState.isPaused) {
      playNextStep();
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [gameState.isPlaying, gameState.isPaused, isReady]);

  const handlePositionMatch = () => {
    if (currentStep && gameState.isPlaying && !gameState.isPaused) {
      checkMatch("position", true);
    }
  };

  const handleSoundMatch = () => {
    if (currentStep && gameState.isPlaying && !gameState.isPaused) {
      checkMatch("sound", true);
    }
  };

  return (
    <div className="container max-w-2xl mx-auto">
      <Card className="p-6 space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">N-Back Game (Level {settings.nBack})</h1>
          <div className="space-x-2">
            {!gameState.isPlaying ? (
              <Button onClick={startGame}>
                <Play className="h-4 w-4 mr-2" />
                Start Game
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={gameState.isPaused ? resumeGame : pauseGame}
                >
                  {gameState.isPaused ? (
                    <Play className="h-4 w-4" />
                  ) : (
                    <Pause className="h-4 w-4" />
                  )}
                </Button>
                <Button variant="outline" onClick={endGame}>
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-card rounded-lg p-4">
            <Grid
              position={currentStep?.position ?? 4}
              onPositionMatch={handlePositionMatch}
            />
          </div>
          <Controls
            onPositionMatch={handlePositionMatch}
            onSoundMatch={handleSoundMatch}
          />
        </div>

        <div className="text-center text-sm text-muted-foreground">
          Round: {gameState.currentRound}/{settings.totalRounds}
        </div>
      </Card>
    </div>
  );
}