"use client";

import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

export function StreakCounter({ streak }: { streak: number }) {
  const isActive = streak > 0;

  return (
    <div className="flex items-center gap-1.5">
      <Flame
        className={cn(
          "h-5 w-5",
          isActive ? "text-orange-500" : "text-muted-foreground"
        )}
      />
      <span
        className={cn(
          "text-sm font-bold",
          isActive ? "text-orange-500" : "text-muted-foreground"
        )}
      >
        {streak}
      </span>
    </div>
  );
}
