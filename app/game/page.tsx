"use client";

import { GameBoard } from "@/components/game/board";
import { GameProvider } from "@/components/game/provider";

export default function GamePage() {
  return (
    <GameProvider>
      <div className="container mx-auto px-4 py-8">
        <GameBoard />
      </div>
    </GameProvider>
  );
}