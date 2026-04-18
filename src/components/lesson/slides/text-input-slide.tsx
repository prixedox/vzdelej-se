"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { HintReveal } from "../hint-reveal";
import { checkAnswer } from "@/lib/lesson/answer-evaluator";
import { Send, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { TextInputSlide } from "@/types/slide";

interface TextInputSlideProps {
  slide: TextInputSlide;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  answered?: { isCorrect: boolean; attempts: number };
}

export function TextInputSlide({
  slide,
  onAnswer,
  answered,
}: TextInputSlideProps) {
  const { step } = slide;
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(!!answered);
  const [isCorrect, setIsCorrect] = useState(answered?.isCorrect ?? false);
  const [attempts, setAttempts] = useState(answered?.attempts ?? 0);
  const [wrongFeedback, setWrongFeedback] = useState<string | null>(null);

  function handleSubmit() {
    if (!answer.trim() || submitted) return;

    const correct = checkAnswer({
      userAnswer: answer,
      expectedAnswer: step.expectedAnswer,
      acceptableAnswers: step.acceptableAnswers ?? [],
      numericTolerance: step.numericTolerance,
    });

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setIsCorrect(correct);
    setSubmitted(true);

    if (!correct && step.wrongAnswerFeedback) {
      const normalized = answer.trim().toLowerCase();
      const specific = step.wrongAnswerFeedback[normalized];
      setWrongFeedback(specific ?? null);
    }

    onAnswer(slide.stepIndex, correct, newAttempts);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleSubmit();
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      <MathText content={step.question} className="text-base font-medium" />

      {step.visual && (
        <div className="w-full">
          <VisualBlock visual={step.visual} animated />
        </div>
      )}

      {!submitted && step.hints && step.hints.length > 0 && (
        <HintReveal hints={step.hints} onHintUsed={() => {}} />
      )}

      <div className="flex gap-2">
        <Input
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zadejte odpověď..."
          disabled={submitted}
          className={cn(
            "flex-1 transition-colors",
            submitted && isCorrect && "border-green-400 ring-2 ring-green-200 dark:ring-green-800",
            submitted && !isCorrect && "border-red-400 ring-2 ring-red-200 dark:ring-red-800"
          )}
        />
        <Button
          onClick={handleSubmit}
          disabled={!answer.trim() || submitted}
          size="icon"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>

      {submitted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: isCorrect ? 0 : [0, 6, -4, 2, 0] }}
          transition={{ duration: isCorrect ? 0.3 : 0.4 }}
          className={cn(
            "rounded-lg p-4 border",
            isCorrect
              ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
              : "bg-red-50 border-red-200 dark:bg-red-950 dark:border-red-800"
          )}
        >
          <div className="flex items-center gap-2 mb-2">
            {isCorrect ? (
              <>
                <Check className="h-5 w-5 text-green-600" />
                <span className="font-semibold text-green-800">Správně!</span>
              </>
            ) : (
              <>
                <X className="h-5 w-5 text-red-600" />
                <span className="font-semibold text-red-800">Špatně</span>
              </>
            )}
          </div>
          {wrongFeedback && !isCorrect && (
            <p className="text-sm text-red-700 mb-2">{wrongFeedback}</p>
          )}
          <MathText
            content={step.explanation}
            className={cn(
              "text-sm",
              isCorrect ? "text-green-700" : "text-red-700"
            )}
          />
        </motion.div>
      )}
    </motion.div>
  );
}
