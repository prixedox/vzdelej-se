"use client";

import { motion } from "motion/react";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Badge } from "@/components/ui/badge";
import type { ExplainSlideV2 } from "@/types/slide-v2";

export function ExplainSlideV2({ slide }: { slide: ExplainSlideV2 }) {
  const { step } = slide;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      {step.callout && (
        <Badge variant="secondary" className="bg-blue-100 text-blue-800">
          {step.callout}
        </Badge>
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
