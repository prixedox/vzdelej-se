"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Telescope, Check } from "lucide-react";
import type { ExploreSlideV2 } from "@/types/slide-v2";

interface ExploreSlideV2Props {
  slide: ExploreSlideV2;
  onInteracted: (stepIndex: number) => void;
  interacted?: boolean;
}

export function ExploreSlideV2({
  slide,
  onInteracted,
  interacted: initialInteracted,
}: ExploreSlideV2Props) {
  const { step } = slide;
  const [confirmed, setConfirmed] = useState(!!initialInteracted);
  const [showFollowUp, setShowFollowUp] = useState(!!initialInteracted);

  function handleConfirm() {
    setConfirmed(true);
    if (step.followUpQuestion) {
      setShowFollowUp(true);
    }
    onInteracted(slide.stepIndex);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      <div className="flex items-center gap-2 text-xs text-amber-600">
        <Telescope className="h-4 w-4" />
        <span className="font-medium">Interaktivní průzkum</span>
      </div>

      <MathText content={step.prompt} className="text-base font-medium" />

      <div className="w-full">
        <VisualBlock visual={step.visual} animated />
      </div>

      {!confirmed ? (
        <Button onClick={handleConfirm} className="gap-2">
          <Check className="h-4 w-4" />
          Hotovo
        </Button>
      ) : (
        showFollowUp &&
        step.followUpQuestion && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            className="rounded-lg p-4 bg-amber-50 border border-amber-200"
          >
            <MathText
              content={step.followUpQuestion}
              className="text-sm text-amber-900"
            />
          </motion.div>
        )
      )}
    </motion.div>
  );
}
