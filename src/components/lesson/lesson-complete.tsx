"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Star, Flame, ArrowRight } from "lucide-react";
import Link from "next/link";

interface LessonCompleteProps {
  xpEarned: number;
  totalXP: number;
  level: number;
  streak: number;
  score: number;
  totalProblems: number;
  correctAnswers: number;
  isPerfect: boolean;
}

export function LessonComplete({
  xpEarned,
  streak,
  score,
  totalProblems,
  correctAnswers,
  isPerfect,
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

      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="pt-4 text-center">
            <Star className="h-6 w-6 text-yellow-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-yellow-600">+{xpEarned}</p>
            <p className="text-xs text-muted-foreground">XP získáno</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <Flame className="h-6 w-6 text-orange-500 mx-auto mb-1" />
            <p className="text-2xl font-bold text-orange-600">{streak}</p>
            <p className="text-xs text-muted-foreground">
              {streak === 1 ? "den v řadě" : "dní v řadě"}
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <Button asChild>
          <Link href="/topics" className="gap-2">
            Další lekce
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" asChild>
          <Link href="/dashboard">Přehled</Link>
        </Button>
      </div>
    </div>
  );
}
