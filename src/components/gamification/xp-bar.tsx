"use client";

import { xpProgressInLevel } from "@/lib/utils/xp";
import { Progress } from "@/components/ui/progress";

export function XPBar({ xp, level }: { xp: number; level: number }) {
  const progress = xpProgressInLevel(xp);

  return (
    <div className="flex items-center gap-2">
      <LevelBadge level={level} />
      <div className="w-20 hidden sm:block">
        <Progress value={progress.percentage} className="h-2" />
      </div>
      <span className="text-xs text-muted-foreground hidden sm:block">
        {progress.current}/{progress.required} XP
      </span>
    </div>
  );
}

export function LevelBadge({ level }: { level: number }) {
  return (
    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 text-white text-xs font-bold">
      {level}
    </div>
  );
}
