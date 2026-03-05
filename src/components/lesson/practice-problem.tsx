"use client";

import { useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MathText } from "./math-display";
import { HintReveal } from "./hint-reveal";
import { AnswerFeedback } from "./answer-feedback";
import { checkAnswer } from "@/lib/lesson/answer-evaluator";
import type { PracticeProblem as PracticeProblemType } from "@/types/lesson";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";

const difficultyLabels = {
  easy: { label: "Snadný", color: "bg-green-100 text-green-800" },
  medium: { label: "Střední", color: "bg-yellow-100 text-yellow-800" },
  hard: { label: "Těžký", color: "bg-red-100 text-red-800" },
};

export function PracticeProblemCard({
  problem,
  index,
  onAnswer,
  initialSubmitted = false,
  initialCorrect = false,
}: {
  problem: PracticeProblemType;
  index: number;
  onAnswer: (isCorrect: boolean, hintsUsed: number, timeSpentMs: number) => void;
  initialSubmitted?: boolean;
  initialCorrect?: boolean;
}) {
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(initialSubmitted);
  const [isCorrect, setIsCorrect] = useState(initialCorrect);
  const [hintsUsed, setHintsUsed] = useState(0);
  const startTime = useRef(Date.now());

  function handleSubmit() {
    if (!answer.trim() || submitted) return;

    const correct = checkAnswer({
      userAnswer: answer,
      expectedAnswer: problem.expectedAnswer,
      acceptableAnswers: problem.acceptableAnswers,
      numericTolerance: problem.numericTolerance,
    });

    setIsCorrect(correct);
    setSubmitted(true);

    const timeSpent = Date.now() - startTime.current;
    onAnswer(correct, hintsUsed, timeSpent);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") {
      handleSubmit();
    }
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

        <div className="flex gap-2">
          <Input
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Zadejte odpověď..."
            disabled={submitted}
            className="flex-1"
          />
          <Button
            onClick={handleSubmit}
            disabled={!answer.trim() || submitted}
            size="icon"
          >
            <Send className="h-4 w-4" />
          </Button>
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
