"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { HintReveal } from "../hint-reveal";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { MultipleChoiceSlideV2 } from "@/types/slide-v2";

interface McSlideV2Props {
  slide: MultipleChoiceSlideV2;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  answered?: { isCorrect: boolean; attempts: number };
}

export function McSlideV2({ slide, onAnswer, answered }: McSlideV2Props) {
  const { step } = slide;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [attempts, setAttempts] = useState(answered?.attempts ?? 0);
  const [locked, setLocked] = useState(!!answered);

  const selected = selectedIndex !== null;
  const isCorrect = selected && step.choices[selectedIndex].isCorrect;

  function handleSelect(idx: number) {
    if (locked) return;
    setSelectedIndex(idx);
    const correct = step.choices[idx].isCorrect;
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    if (correct) {
      setLocked(true);
      onAnswer(slide.stepIndex, true, newAttempts);
    } else {
      // Lock after showing feedback — user can see explanation then proceed
      setLocked(true);
      onAnswer(slide.stepIndex, false, newAttempts);
    }
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

      {!locked && step.hints && step.hints.length > 0 && (
        <HintReveal hints={step.hints} onHintUsed={() => {}} />
      )}

      <div className="flex flex-col gap-2">
        {step.choices.map((choice, idx) => {
          let variant = "border-border bg-background hover:bg-muted/50";
          if (selected) {
            if (choice.isCorrect) {
              variant = "border-green-400 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200";
            } else if (idx === selectedIndex && !choice.isCorrect) {
              variant = "border-red-400 bg-red-50 text-red-900 dark:bg-red-950 dark:text-red-200";
            } else {
              variant = "border-border bg-background opacity-60";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleSelect(idx)}
              disabled={locked}
              className={cn(
                "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                variant,
                !locked && "cursor-pointer"
              )}
            >
              <div className="flex items-center gap-2">
                <MathText content={choice.label} />
                {selected && choice.isCorrect && (
                  <Check className="h-4 w-4 text-green-600 shrink-0 ml-auto" />
                )}
                {selected && idx === selectedIndex && !choice.isCorrect && (
                  <X className="h-4 w-4 text-red-600 shrink-0 ml-auto" />
                )}
              </div>
              {selected && idx === selectedIndex && (
                <p className="text-xs mt-1 text-muted-foreground">
                  {choice.feedback}
                </p>
              )}
              {selected && choice.isCorrect && idx !== selectedIndex && (
                <p className="text-xs mt-1 text-muted-foreground">
                  {choice.feedback}
                </p>
              )}
            </button>
          );
        })}
      </div>

      {selected && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1, x: isCorrect ? 0 : [0, 6, -4, 2, 0] }}
          transition={{ duration: isCorrect ? 0.3 : 0.4 }}
          className={cn(
            "rounded-lg p-3 text-sm border",
            isCorrect
              ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
              : "bg-red-50 border-red-200 text-red-800 dark:bg-red-950 dark:border-red-800 dark:text-red-200"
          )}
        >
          <MathText content={step.explanation} />
        </motion.div>
      )}
    </motion.div>
  );
}
