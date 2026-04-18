"use client";

import { useState, useCallback, useMemo } from "react";
import { SlideDeck } from "./slide-deck";
import { LessonComplete } from "./lesson-complete";
import { buildSlides } from "@/lib/lesson/build-slides";
import { recordChapterCompletion } from "@/lib/lesson/progress-store";
import type { Lesson } from "@/types/lesson";

interface LessonShellProps {
  lesson: Lesson;
  topicSlug: string;
  chapterSlug: string;
}

export function LessonShell({ lesson, topicSlug, chapterSlug }: LessonShellProps) {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [tier, setTier] = useState<"bronze" | "silver" | "gold" | null>(null);

  const slides = useMemo(() => buildSlides(lesson), [lesson]);

  const handleComplete = useCallback(
    (answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>) => {
      const narrativeOffset = lesson.narrative ? 1 : 0;
      const questionStepIndices = lesson.steps
        .map((step, i) => ({ step, i: i + narrativeOffset }))
        .filter(
          ({ step }) =>
            step.type === "multiple-choice" ||
            step.type === "text-input" ||
            step.type === "sort-order" ||
            step.type === "prediction"
        )
        .map(({ i }) => i);

      const total = questionStepIndices.length;
      const correct = questionStepIndices.filter(
        (i) => answeredSteps.get(i)?.isCorrect
      ).length;

      setScore({ correct, total });
      setCompleted(true);

      const result = recordChapterCompletion(topicSlug, chapterSlug, {
        completedAt: Date.now(),
        score: total > 0 ? correct / total : 1,
        correctAnswers: correct,
        totalProblems: total,
      });
      setTier(result.chapters[`${topicSlug}/${chapterSlug}`]?.tier ?? null);
    },
    [lesson.steps, lesson.narrative, topicSlug, chapterSlug]
  );

  if (completed) {
    const { correct, total } = score;
    return (
      <LessonComplete
        score={total > 0 ? correct / total : 0}
        totalProblems={total}
        correctAnswers={correct}
        isPerfect={correct === total}
        tier={tier}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SlideDeck slides={slides} onComplete={handleComplete} />
    </div>
  );
}
