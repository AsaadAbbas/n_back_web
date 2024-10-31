"use client";

import { ReactNode } from "react";

interface GameProviderProps {
  children: ReactNode;
}

export function GameProvider({ children }: GameProviderProps) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}