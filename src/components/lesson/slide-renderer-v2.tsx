"use client";

import { ExplainSlideV2 } from "./slides/explain-slide-v2";
import { McSlideV2 } from "./slides/mc-slide-v2";
import { TextInputSlideV2 } from "./slides/text-input-slide-v2";
import { ExploreSlideV2 } from "./slides/explore-slide-v2";
import { RevealSlideV2 } from "./slides/reveal-slide-v2";
import { SortOrderSlideV2 } from "./slides/sort-order-slide-v2";
import { SummarySlideV2 } from "./slides/summary-slide-v2";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import Link from "next/link";
import type { SlideV2 } from "@/types/slide-v2";

interface SlideRendererV2Props {
  slide: SlideV2;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  onInteracted: (stepIndex: number) => void;
  answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>;
  interactedSteps: Set<number>;
}

export function SlideRendererV2({
  slide,
  onAnswer,
  onInteracted,
  answeredSteps,
  interactedSteps,
}: SlideRendererV2Props) {
  switch (slide.type) {
    case "explain-v2":
      return <ExplainSlideV2 slide={slide} />;

    case "multiple-choice-v2":
      return (
        <McSlideV2
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "text-input-v2":
      return (
        <TextInputSlideV2
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "explore-v2":
      return (
        <ExploreSlideV2
          slide={slide}
          onInteracted={onInteracted}
          interacted={interactedSteps.has(slide.stepIndex)}
        />
      );

    case "reveal-v2":
      return <RevealSlideV2 slide={slide} />;

    case "sort-order-v2":
      return (
        <SortOrderSlideV2
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "summary-v2":
      return <SummarySlideV2 slide={slide} />;

    case "complete-v2":
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-center py-12 text-center space-y-4"
        >
          <Trophy className="h-16 w-16 text-yellow-500" />
          <h2 className="text-2xl font-bold">Lekce dokončena!</h2>
          <Link
            href="/topics"
            className="text-primary underline underline-offset-4 hover:text-primary/80"
          >
            Další lekce
          </Link>
        </motion.div>
      );

    default:
      return null;
  }
}
