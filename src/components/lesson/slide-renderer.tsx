"use client";

import { ExplainSlide } from "./slides/explain-slide";
import { McSlide } from "./slides/mc-slide";
import { TextInputSlide } from "./slides/text-input-slide";
import { ExploreSlide } from "./slides/explore-slide";
import { RevealSlide } from "./slides/reveal-slide";
import { SortOrderSlide } from "./slides/sort-order-slide";
import { SummarySlide } from "./slides/summary-slide";
import { PredictionSlide } from "./slides/prediction-slide";
import { motion } from "motion/react";
import { Trophy } from "lucide-react";
import Link from "next/link";
import type { Slide } from "@/types/slide";

interface SlideRendererProps {
  slide: Slide;
  onAnswer: (stepIndex: number, isCorrect: boolean, attempts: number) => void;
  onInteracted: (stepIndex: number) => void;
  answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>;
  interactedSteps: Set<number>;
}

export function SlideRenderer({
  slide,
  onAnswer,
  onInteracted,
  answeredSteps,
  interactedSteps,
}: SlideRendererProps) {
  switch (slide.type) {
    case "explain":
      return <ExplainSlide slide={slide} />;

    case "multiple-choice":
      return (
        <McSlide
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "text-input":
      return (
        <TextInputSlide
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "explore":
      return (
        <ExploreSlide
          slide={slide}
          onInteracted={onInteracted}
          interacted={interactedSteps.has(slide.stepIndex)}
        />
      );

    case "reveal":
      return <RevealSlide slide={slide} />;

    case "sort-order":
      return (
        <SortOrderSlide
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "prediction":
      return (
        <PredictionSlide
          slide={slide}
          onAnswer={onAnswer}
          answered={answeredSteps.get(slide.stepIndex)}
        />
      );

    case "summary":
      return <SummarySlide slide={slide} />;

    case "complete":
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
