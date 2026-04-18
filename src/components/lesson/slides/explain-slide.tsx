"use client";

import { motion } from "motion/react";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle } from "lucide-react";
import type { ExplainSlide } from "@/types/slide";

export function ExplainSlide({ slide }: { slide: ExplainSlide }) {
  const { step } = slide;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      {step.callout && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
          {step.callout}
        </Badge>
      )}

      {step.misconception && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15 }}
          className="rounded-lg border border-amber-300 bg-amber-50 p-4 dark:border-amber-700 dark:bg-amber-950"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5 dark:text-amber-400" />
            <div>
              <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                Častý omyl
              </p>
              <MathText
                content={step.misconception}
                className="text-sm text-amber-700 dark:text-amber-300 mt-1"
              />
            </div>
          </div>
        </motion.div>
      )}

      {step.visual && (
        <div className="w-full">
          <VisualBlock visual={step.visual} animated />
        </div>
      )}

      <MathText content={step.body} className="text-base leading-relaxed" />
    </motion.div>
  );
}
