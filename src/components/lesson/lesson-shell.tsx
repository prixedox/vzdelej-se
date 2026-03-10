"use client";

import { useState, useCallback, useMemo } from "react";
import { SlideDeck } from "./slide-deck";
import { SlideDeckV2 } from "./slide-deck-v2";
import { LessonComplete } from "./lesson-complete";
import { buildSlides } from "@/lib/lesson/build-slides";
import { buildSlidesV2 } from "@/lib/lesson/build-slides-v2";
import { recordLessonCompletion } from "@/lib/lesson/progress-store";
import type { LessonContent } from "@/types/lesson";
import type { LessonV2 } from "@/types/lesson-v2";

interface LessonShellProps {
  content: LessonContent | LessonV2;
  topicSlug?: string;
}

function isV2(content: LessonContent | LessonV2): content is LessonV2 {
  return "steps" in content;
}

export function LessonShell({ content, topicSlug }: LessonShellProps) {
  if (isV2(content)) {
    return <LessonShellV2 content={content} topicSlug={topicSlug} />;
  }
  return <LessonShellV1 content={content} topicSlug={topicSlug} />;
}

// ── V1 (unchanged) ──

function LessonShellV1({ content }: { content: LessonContent; topicSlug?: string }) {
  const [answeredProblems, setAnsweredProblems] = useState<
    Map<number, { isCorrect: boolean; hintsUsed: number; timeSpentMs: number }>
  >(new Map());
  const [completed, setCompleted] = useState(false);

  const slides = useMemo(() => buildSlides(content), [content]);
  const totalProblems = content.practiceProblems.length;

  const handleAnswer = useCallback(
    (
      problemIndex: number,
      isCorrect: boolean,
      hintsUsed: number,
      timeSpentMs: number
    ) => {
      setAnsweredProblems((prev) => {
        const next = new Map(prev);
        next.set(problemIndex, { isCorrect, hintsUsed, timeSpentMs });

        if (next.size === totalProblems) {
          setCompleted(true);
        }

        return next;
      });
    },
    [totalProblems]
  );

  if (completed) {
    const correctAnswers = Array.from(answeredProblems.values()).filter(
      (a) => a.isCorrect
    ).length;
    const score = totalProblems > 0 ? correctAnswers / totalProblems : 0;

    return (
      <LessonComplete
        score={score}
        totalProblems={totalProblems}
        correctAnswers={correctAnswers}
        isPerfect={correctAnswers === totalProblems}
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

// ── V2 (Brilliant-style) ──

function LessonShellV2({ content, topicSlug }: { content: LessonV2; topicSlug?: string }) {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [tier, setTier] = useState<"bronze" | "silver" | "gold" | null>(null);

  const slides = useMemo(() => buildSlidesV2(content), [content]);

  const handleComplete = useCallback(
    (answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>) => {
      // Count question steps (account for narrative offset)
      const narrativeOffset = content.narrative ? 1 : 0;
      const questionStepIndices = content.steps
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

      // Record progress in localStorage
      if (topicSlug) {
        const result = recordLessonCompletion(topicSlug, {
          completedAt: Date.now(),
          score: total > 0 ? correct / total : 1,
          correctAnswers: correct,
          totalProblems: total,
        });
        setTier(result.topics[topicSlug]?.tier ?? null);
      }
    },
    [content.steps, content.narrative, topicSlug]
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
      <SlideDeckV2 slides={slides} onComplete={handleComplete} />
    </div>
  );
}
