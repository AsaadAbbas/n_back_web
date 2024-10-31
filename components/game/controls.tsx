"use client";

import { Button } from "@/components/ui/button";
import { useGameStore } from "@/hooks/use-game-store";
import { Square, Volume2 } from "lucide-react";

interface ControlsProps {
  onPositionMatch: () => void;
  onSoundMatch: () => void;
}

export function Controls({ onPositionMatch, onSoundMatch }: ControlsProps) {
  const settings = useGameStore((state) => state.settings);
  const gameState = useGameStore((state) => state.gameState);

  const getAccuracy = (type: "position" | "sound") => {
    const stats = type === "position" 
      ? gameState.stats.positionStats 
      : gameState.stats.soundStats;
    
    if (stats.totalPossibleMatches === 0) return 0;
    return Math.round((stats.correctMatches / stats.totalPossibleMatches) * 100);
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-center space-x-4">
        {settings.positionEnabled && (
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-32 flex-col space-y-1"
            onClick={onPositionMatch}
          >
            <Square className="h-6 w-6" />
            <span className="text-xs">Position Match</span>
          </Button>
        )}
        {settings.soundEnabled && (
          <Button
            size="lg"
            variant="outline"
            className="h-16 w-32 flex-col space-y-1"
            onClick={onSoundMatch}
          >
            <Volume2 className="h-6 w-6" />
            <span className="text-xs">Sound Match</span>
          </Button>
        )}
      </div>
      <div className="flex justify-center space-x-8 text-sm">
        {settings.positionEnabled && (
          <div className="text-muted-foreground">
            Position: {getAccuracy("position")}% 
            <span className="text-xs ml-1">
              ({gameState.stats.positionStats.correctMatches}/
              {gameState.stats.positionStats.totalPossibleMatches})
            </span>
          </div>
        )}
        {settings.soundEnabled && (
          <div className="text-muted-foreground">
            Sound: {getAccuracy("sound")}%
            <span className="text-xs ml-1">
              ({gameState.stats.soundStats.correctMatches}/
              {gameState.stats.soundStats.totalPossibleMatches})
            </span>
          </div>
        )}
      </div>
      {gameState.streak > 0 && (
        <div className="text-center text-sm font-medium text-primary">
          Streak: {gameState.streak}
        </div>
      )}
    </div>
  );
}