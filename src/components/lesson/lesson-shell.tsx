"use client";

import { useState, useCallback, useMemo } from "react";
import { SlideDeck } from "./slide-deck";
import { SlideDeckV2 } from "./slide-deck-v2";
import { LessonComplete } from "./lesson-complete";
import { buildSlides } from "@/lib/lesson/build-slides";
import { buildSlidesV2 } from "@/lib/lesson/build-slides-v2";
import type { LessonContent } from "@/types/lesson";
import type { LessonV2 } from "@/types/lesson-v2";

interface LessonShellProps {
  content: LessonContent | LessonV2;
}

function isV2(content: LessonContent | LessonV2): content is LessonV2 {
  return "steps" in content;
}

export function LessonShell({ content }: LessonShellProps) {
  if (isV2(content)) {
    return <LessonShellV2 content={content} />;
  }
  return <LessonShellV1 content={content} />;
}

// ── V1 (unchanged) ──

function LessonShellV1({ content }: { content: LessonContent }) {
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

function LessonShellV2({ content }: { content: LessonV2 }) {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState({ correct: 0, total: 0 });

  const slides = useMemo(() => buildSlidesV2(content), [content]);

  const handleComplete = useCallback(
    (answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>) => {
      // Count question steps
      const questionStepIndices = content.steps
        .map((step, i) => ({ step, i }))
        .filter(
          ({ step }) =>
            step.type === "multiple-choice" ||
            step.type === "text-input" ||
            step.type === "sort-order"
        )
        .map(({ i }) => i);

      const total = questionStepIndices.length;
      const correct = questionStepIndices.filter(
        (i) => answeredSteps.get(i)?.isCorrect
      ).length;

      setScore({ correct, total });
      setCompleted(true);
    },
    [content.steps]
  );

  if (completed) {
    const { correct, total } = score;
    return (
      <LessonComplete
        score={total > 0 ? correct / total : 0}
        totalProblems={total}
        correctAnswers={correct}
        isPerfect={correct === total}
      />
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <SlideDeckV2 slides={slides} onComplete={handleComplete} />
    </div>
  );
}
