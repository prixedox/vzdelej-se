"use client";

import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MathText } from "../math-display";
import { SortOrderInput } from "../sort-order-input";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SortOrderSlide } from "@/types/slide";

interface SortOrderSlideProps {
  slide: SortOrderSlide;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  answered?: { isCorrect: boolean; attempts: number };
}

export function SortOrderSlide({
  slide,
  onAnswer,
  answered,
}: SortOrderSlideProps) {
  const { step } = slide;
  const [submitted, setSubmitted] = useState(!!answered);
  const [isCorrect, setIsCorrect] = useState(answered?.isCorrect ?? false);
  const [attempts, setAttempts] = useState(answered?.attempts ?? 0);
  const currentOrder = useRef<string[]>([]);

  function handleSubmit() {
    if (submitted) return;

    const correct = currentOrder.current.every(
      (item, idx) => item === step.items[idx]
    );
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setIsCorrect(correct);
    setSubmitted(true);
    onAnswer(slide.stepIndex, correct, newAttempts);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      <MathText content={step.question} className="text-base font-medium" />

      <SortOrderInput
        items={step.items}
        disabled={submitted}
        result={submitted ? (isCorrect ? "correct" : "wrong") : null}
        onOrderChange={(order) => {
          currentOrder.current = order;
        }}
      />

      {!submitted && (
        <Button onClick={handleSubmit} className="gap-2">
          <Send className="h-4 w-4" />
          Zkontrolovat
        </Button>
      )}

      {submitted && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className={cn(
            "rounded-lg p-3 text-sm border",
            isCorrect
              ? "bg-green-50 border-green-200 text-green-800"
              : "bg-red-50 border-red-200 text-red-800"
          )}
        >
          <MathText content={step.explanation} />
        </motion.div>
      )}
    </motion.div>
  );
}
