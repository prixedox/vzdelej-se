"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Eye } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PredictionSlideV2 } from "@/types/slide-v2";

interface PredictionSlideV2Props {
  slide: PredictionSlideV2;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  answered?: { isCorrect: boolean; attempts: number };
}

export function PredictionSlideV2({
  slide,
  onAnswer,
  answered,
}: PredictionSlideV2Props) {
  const { step } = slide;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(!!answered);
  const [locked, setLocked] = useState(!!answered);

  function handleSelect(idx: number) {
    if (locked) return;
    setSelectedIndex(idx);
  }

  function handleReveal() {
    if (selectedIndex === null || locked) return;
    setLocked(true);
    setRevealed(true);
    const correct = step.options[selectedIndex].isCorrect;
    onAnswer(slide.stepIndex, correct, 1);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      <Badge
        variant="secondary"
        className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
      >
        <Lightbulb className="h-3 w-3 mr-1" />
        Predikce
      </Badge>

      <MathText
        content={step.scenario}
        className="text-base leading-relaxed"
      />

      {step.visual && (
        <div className="w-full">
          <VisualBlock visual={step.visual} animated />
        </div>
      )}

      <p className="text-sm font-medium text-muted-foreground">
        {step.question}
      </p>

      <div className="flex flex-col gap-2">
        {step.options.map((option, idx) => {
          let variant = "border-border bg-background hover:bg-muted/50";
          if (selectedIndex === idx && !revealed) {
            variant =
              "border-purple-400 bg-purple-50 dark:bg-purple-950 dark:border-purple-600";
          }
          if (revealed) {
            if (option.isCorrect) {
              variant = "border-green-400 bg-green-50 text-green-900 dark:bg-green-950 dark:text-green-200";
            } else if (idx === selectedIndex && !option.isCorrect) {
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
              <MathText content={option.label} />
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && !revealed && (
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          onClick={handleReveal}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors"
        >
          <Eye className="h-4 w-4" />
          Odhalit odpověď
        </motion.button>
      )}

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={cn(
              "rounded-lg p-4 text-sm border",
              selectedIndex !== null &&
                step.options[selectedIndex].isCorrect
                ? "bg-green-50 border-green-200 text-green-800 dark:bg-green-950 dark:border-green-800 dark:text-green-200"
                : "bg-blue-50 border-blue-200 text-blue-800 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-200"
            )}
          >
            <MathText content={step.reveal} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
