"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { MathText, MathDisplay } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import type { WalkthroughStepSlide as WalkthroughStepSlideType } from "@/types/slide";

export function WalkthroughStepSlide({
  slide,
}: {
  slide: WalkthroughStepSlideType;
}) {
  const { step, stepNumber, totalSteps } = slide;

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="font-medium">
          Krok {stepNumber} / {totalSteps}
        </span>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0"
            >
              {stepNumber}
            </motion.div>

            <div className="flex-1 space-y-3">
              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-medium text-lg"
              >
                {step.instruction}
              </motion.p>

              {step.math && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-muted/50 rounded-lg p-4 overflow-x-auto"
                >
                  <MathDisplay math={step.math} block />
                </motion.div>
              )}

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
              >
                <MathText
                  content={step.explanation}
                  className="text-muted-foreground"
                />
              </motion.div>

              {step.visual && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.45 }}
                >
                  <VisualBlock visual={step.visual} animated />
                </motion.div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
