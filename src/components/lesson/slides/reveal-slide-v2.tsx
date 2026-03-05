"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Eye } from "lucide-react";
import type { RevealSlideV2 } from "@/types/slide-v2";

export function RevealSlideV2({ slide }: { slide: RevealSlideV2 }) {
  const { step } = slide;
  const [revealed, setRevealed] = useState(false);

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

      {!revealed ? (
        <Button
          onClick={() => setRevealed(true)}
          variant="outline"
          className="gap-2"
        >
          <Eye className="h-4 w-4" />
          Zobrazit odpověď
        </Button>
      ) : (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="rounded-lg p-4 bg-blue-50 border border-blue-200"
        >
          <MathText
            content={step.revealedContent}
            className="text-sm text-blue-900"
          />
        </motion.div>
      )}
    </motion.div>
  );
}
