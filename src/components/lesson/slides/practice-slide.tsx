"use client";

import { motion } from "motion/react";
import { PracticeProblemCard } from "../practice-problem";
import { MultipleChoiceProblemCard } from "../multiple-choice-problem";
import { ConfettiBurst } from "../confetti-burst";
import type { PracticeProblemSlide } from "@/types/slide";
import type { TextInputProblem, MultipleChoiceProblem } from "@/types/lesson";

interface PracticeSlideProps {
  slide: PracticeProblemSlide;
  onAnswer: (
    problemIndex: number,
    isCorrect: boolean,
    hintsUsed: number,
    timeSpentMs: number
  ) => void;
  answered?: { isCorrect: boolean };
}

export function PracticeSlide({
  slide,
  onAnswer,
  answered,
}: PracticeSlideProps) {
  const isMultipleChoice = slide.problem.type === "multiple-choice";

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="font-medium">
          Příklad {slide.problemIndex + 1} / {slide.totalProblems}
        </span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {isMultipleChoice ? (
          <MultipleChoiceProblemCard
            problem={slide.problem as MultipleChoiceProblem}
            index={slide.problemIndex}
            onAnswer={(isCorrect, hintsUsed, timeSpentMs) => {
              onAnswer(slide.problemIndex, isCorrect, hintsUsed, timeSpentMs);
            }}
            initialSubmitted={answered ? true : false}
            initialCorrect={answered?.isCorrect ?? false}
          />
        ) : (
          <PracticeProblemCard
            problem={slide.problem as TextInputProblem}
            index={slide.problemIndex}
            onAnswer={(isCorrect, hintsUsed, timeSpentMs) => {
              onAnswer(slide.problemIndex, isCorrect, hintsUsed, timeSpentMs);
            }}
            initialSubmitted={answered ? true : false}
            initialCorrect={answered?.isCorrect ?? false}
          />
        )}
      </motion.div>

      {answered?.isCorrect && <ConfettiBurst />}
    </div>
  );
}
