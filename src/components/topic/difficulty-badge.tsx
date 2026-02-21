"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { DIFFICULTIES } from "@/lib/utils/constants";

export function DifficultyBadge({ difficulty }: { difficulty: string }) {
  const diff = DIFFICULTIES.find((d) => d.value === difficulty);
  if (!diff) return null;

  return (
    <Badge variant="secondary" className={cn(diff.color)}>
      {diff.label}
    </Badge>
  );
}
