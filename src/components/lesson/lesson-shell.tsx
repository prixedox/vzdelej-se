"use client";

import { useState, useCallback, useMemo } from "react";
import { SlideDeck } from "./slide-deck";
import { LessonComplete } from "./lesson-complete";
import { buildSlides } from "@/lib/lesson/build-slides";
import type { LessonContent } from "@/types/lesson";

interface LessonShellProps {
  content: LessonContent;
  lessonCacheId: string;
  progressId: string;
}

export function LessonShell({
  content,
  lessonCacheId,
  progressId,
}: LessonShellProps) {
  const [answeredProblems, setAnsweredProblems] = useState<
    Map<number, { isCorrect: boolean; hintsUsed: number; timeSpentMs: number }>
  >(new Map());
  const [completionResult, setCompletionResult] = useState<{
    xpEarned: number;
    totalXP: number;
    level: number;
    streak: number;
    score: number;
    isPerfect: boolean;
  } | null>(null);

  const slides = useMemo(() => buildSlides(content), [content]);
  const totalProblems = content.practiceProblems.length;

  const handleAnswer = useCallback(
    async (
      problemIndex: number,
      isCorrect: boolean,
      hintsUsed: number,
      timeSpentMs: number
    ) => {
      setAnsweredProblems((prev) => {
        const next = new Map(prev);
        next.set(problemIndex, { isCorrect, hintsUsed, timeSpentMs });
        return next;
      });

      const updatedMap = new Map(answeredProblems);
      updatedMap.set(problemIndex, { isCorrect, hintsUsed, timeSpentMs });

      const isLastProblem = updatedMap.size === totalProblems;

      let totalCorrectAnswers = 0;
      let totalHintsUsed = 0;
      updatedMap.forEach((val) => {
        if (val.isCorrect) totalCorrectAnswers++;
        totalHintsUsed += val.hintsUsed;
      });

      try {
        const res = await fetch(`/api/lekce/${lessonCacheId}/odpoved`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            progressId,
            problemIndex,
            userAnswer: "submitted",
            isCorrect,
            hintsUsed,
            timeSpentMs,
            isLastProblem,
            totalProblems,
            correctAnswers: totalCorrectAnswers,
            totalHintsUsed,
          }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.completed) {
            setCompletionResult({
              xpEarned: data.xpEarned,
              totalXP: data.totalXP,
              level: data.level,
              streak: data.streak,
              score: data.score,
              isPerfect: data.isPerfect,
            });
          }
        }
      } catch (err) {
        console.error("Failed to submit answer:", err);
      }
    },
    [answeredProblems, lessonCacheId, progressId, totalProblems]
  );

  if (completionResult) {
    return (
      <LessonComplete
        xpEarned={completionResult.xpEarned}
        totalXP={completionResult.totalXP}
        level={completionResult.level}
        streak={completionResult.streak}
        score={completionResult.score}
        totalProblems={totalProblems}
        correctAnswers={
          Array.from(answeredProblems.values()).filter((a) => a.isCorrect)
            .length
        }
        isPerfect={completionResult.isPerfect}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SlideDeck
        slides={slides}
        onAnswer={handleAnswer}
        answeredProblems={answeredProblems}
      />
    </div>
  );
}
