"use client";

import { cn } from "@/lib/utils";

interface GridProps {
  position: number;
  onPositionMatch: () => void;
}

export function Grid({ position }: GridProps) {
  return (
    <div className="flex items-center justify-center p-4">
      <div className="grid grid-cols-3 gap-4 w-[300px] h-[300px]">
        {Array.from({ length: 9 }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "aspect-square rounded-lg border-2 transition-colors duration-300",
              position === index
                ? "border-primary bg-primary/20"
                : "border-muted bg-card hover:bg-muted/10"
            )}
          />
        ))}
      </div>
    </div>
  );
}