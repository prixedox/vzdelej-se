"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MathText } from "./math-display";
import { HintReveal } from "./hint-reveal";
import { AnswerFeedback } from "./answer-feedback";
import type { MultipleChoiceProblem as MCProblemType } from "@/types/lesson";
import { cn } from "@/lib/utils";

const difficultyLabels = {
  easy: { label: "Snadný", color: "bg-green-100 text-green-800" },
  medium: { label: "Střední", color: "bg-yellow-100 text-yellow-800" },
  hard: { label: "Těžký", color: "bg-red-100 text-red-800" },
};

export function MultipleChoiceProblemCard({
  problem,
  index,
  onAnswer,
  initialSubmitted = false,
  initialCorrect = false,
}: {
  problem: MCProblemType;
  index: number;
  onAnswer: (isCorrect: boolean, hintsUsed: number, timeSpentMs: number) => void;
  initialSubmitted?: boolean;
  initialCorrect?: boolean;
}) {
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState(initialCorrect);
  const [hintsUsed, setHintsUsed] = useState(0);
  const startTime = useRef(Date.now());

  function handleSelect(choiceIdx: number) {
    if (submitted) return;

    const correct = problem.choices[choiceIdx].isCorrect;
    setSelectedIndex(choiceIdx);
    setIsCorrect(correct);
    setSubmitted(true);

    const timeSpent = Date.now() - startTime.current;
    onAnswer(correct, hintsUsed, timeSpent);
  }

  const diffInfo = difficultyLabels[problem.difficulty];

  return (
    <Card
      className={cn(
        submitted && isCorrect && "border-green-300",
        submitted && !isCorrect && "border-red-300"
      )}
    >
      <CardContent className="pt-4 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            Příklad {index + 1}
          </span>
          <Badge variant="secondary" className={diffInfo.color}>
            {diffInfo.label}
          </Badge>
        </div>

        <MathText content={problem.problemStatement} className="text-base" />

        {!submitted && (
          <HintReveal
            hints={problem.hints}
            onHintUsed={() => setHintsUsed((prev) => prev + 1)}
          />
        )}

        <div className="flex flex-col gap-2">
          {problem.choices.map((choice, idx) => {
            let variant = "border-border bg-background hover:bg-muted/50";
            if (submitted) {
              if (choice.isCorrect) {
                variant = "border-green-400 bg-green-50 text-green-900";
              } else if (idx === selectedIndex && !choice.isCorrect) {
                variant = "border-red-400 bg-red-50 text-red-900";
              } else {
                variant = "border-border bg-background opacity-60";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelect(idx)}
                disabled={submitted}
                className={cn(
                  "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                  variant,
                  !submitted && "cursor-pointer"
                )}
              >
                <MathText content={choice.label} />
              </button>
            );
          })}
        </div>

        <AnswerFeedback
          isCorrect={isCorrect}
          solutionExplanation={problem.solutionExplanation}
          show={submitted}
        />
      </CardContent>
    </Card>
  );
}
