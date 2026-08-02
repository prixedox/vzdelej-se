"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, Lightbulb, Check } from "lucide-react";
import { MathText } from "../math-display";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { Beat } from "@/types/stage";

interface BeatStripProps {
  beat: Beat;
  /** True once a manipulate beat's goal holds. */
  reached: boolean;
  /** Springs the stage to the goal for a student who is stuck. */
  onShowMe: () => void;
  /** Springs the stage to `then` after a predict answer. */
  onPredictAnswered: () => void;
}

export function BeatStrip({ beat, reached, onShowMe, onPredictAnswered }: BeatStripProps) {
  const [picked, setPicked] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      <MathText content={beat.prompt} className="text-base leading-relaxed" />

      {beat.kind === "manipulate" && (
        <>
          <AnimatePresence>
            {reached && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2 rounded-lg border border-emerald-300 bg-emerald-50 p-3 dark:border-emerald-700 dark:bg-emerald-950"
              >
                <Check className="h-5 w-5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                <MathText
                  content={beat.onReached}
                  className="text-sm text-emerald-800 dark:text-emerald-200"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {!reached && (
            <div className="space-y-2">
              {beat.nudge && (
                <p className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Lightbulb className="h-4 w-4 shrink-0 mt-0.5" />
                  <span>{beat.nudge}</span>
                </p>
              )}
              {/* Never a dead end: the student can always ask to be shown. */}
              <Button variant="outline" size="sm" onClick={onShowMe} className="gap-1">
                <Eye className="h-4 w-4" />
                Ukaž mi to
              </Button>
            </div>
          )}
        </>
      )}

      {beat.kind === "predict" && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">{beat.question}</p>
          {beat.options.map((option, i) => (
            <button
              key={option.label}
              onClick={() => {
                if (picked !== null) return;
                setPicked(i);
                onPredictAnswered();
              }}
              className={cn(
                "w-full rounded-lg border p-3 text-left transition-colors",
                picked === null && "hover:bg-muted",
                picked !== null && option.isCorrect && "border-emerald-500 bg-emerald-50 dark:bg-emerald-950",
                picked === i && !option.isCorrect && "border-red-400 bg-red-50 dark:bg-red-950"
              )}
            >
              <MathText content={option.label} />
            </button>
          ))}
          {picked !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg border bg-blue-50 p-3 dark:bg-blue-950"
            >
              <MathText content={beat.reveal} className="text-sm" />
            </motion.div>
          )}
        </div>
      )}
    </div>
  );
}
