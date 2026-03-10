"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, ArrowRight, Flame } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface LessonCompleteProps {
  score: number;
  totalProblems: number;
  correctAnswers: number;
  isPerfect: boolean;
  tier?: "bronze" | "silver" | "gold" | null;
}

const TIER_LABELS: Record<string, { label: string; color: string }> = {
  bronze: { label: "Bronze", color: "text-amber-600" },
  silver: { label: "Silver", color: "text-gray-500" },
  gold: { label: "Gold", color: "text-yellow-500" },
};

export function LessonComplete({
  score,
  totalProblems,
  correctAnswers,
  isPerfect,
  tier,
}: LessonCompleteProps) {
  const percentage = Math.round(score * 100);

  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <div className="space-y-2">
        {isPerfect ? (
          <Trophy className="h-16 w-16 text-yellow-500 mx-auto" />
        ) : (
          <Star className="h-16 w-16 text-blue-500 mx-auto" />
        )}
        <h2 className="text-2xl font-bold">
          {isPerfect ? "Perfektní skóre!" : "Lekce dokončena!"}
        </h2>
        <p className="text-muted-foreground">
          {correctAnswers}/{totalProblems} správných odpovědí ({percentage} %)
        </p>
      </div>

      <Card>
        <CardContent className="pt-4 text-center">
          <p className="text-4xl font-bold text-primary">{percentage} %</p>
          <p className="text-sm text-muted-foreground mt-1">Úspěšnost</p>
          {tier && TIER_LABELS[tier] && (
            <p className={cn("text-sm font-semibold mt-2", TIER_LABELS[tier].color)}>
              <Flame className="inline h-4 w-4 mr-1" />
              {TIER_LABELS[tier].label}
            </p>
          )}
        </CardContent>
      </Card>

      <div className="flex flex-col gap-2">
        <Button asChild>
          <Link href="/topics" className="gap-2">
            Další lekce
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}
