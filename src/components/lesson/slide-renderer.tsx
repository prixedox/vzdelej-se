"use client";

import type { Slide } from "@/types/slide";
import { SectionTitleSlide } from "./slides/section-title-slide";
import { ConceptSlide } from "./slides/concept-slide";
import { WalkthroughIntroSlide } from "./slides/walkthrough-intro-slide";
import { WalkthroughStepSlide } from "./slides/walkthrough-step-slide";
import { WalkthroughResultSlide } from "./slides/walkthrough-result-slide";
import { PracticeSlide } from "./slides/practice-slide";
import { SummarySlide } from "./slides/summary-slide";
import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface SlideRendererProps {
  slide: Slide;
  onAnswer: (
    problemIndex: number,
    isCorrect: boolean,
    hintsUsed: number,
    timeSpentMs: number
  ) => void;
  answeredProblems: Map<
    number,
    { isCorrect: boolean; hintsUsed: number; timeSpentMs: number }
  >;
}

export function SlideRenderer({
  slide,
  onAnswer,
  answeredProblems,
}: SlideRendererProps) {
  switch (slide.type) {
    case "section-title":
      return <SectionTitleSlide slide={slide} />;

    case "concept-section":
      return <ConceptSlide slide={slide} />;

    case "walkthrough-intro":
      return <WalkthroughIntroSlide slide={slide} />;

    case "walkthrough-step":
      return <WalkthroughStepSlide slide={slide} />;

    case "walkthrough-result":
      return <WalkthroughResultSlide slide={slide} />;

    case "practice-problem":
      return (
        <PracticeSlide
          slide={slide}
          onAnswer={onAnswer}
          answered={
            answeredProblems.has(slide.problemIndex)
              ? answeredProblems.get(slide.problemIndex)
              : undefined
          }
        />
      );

    case "summary":
      return <SummarySlide slide={slide} />;

    case "complete-prompt":
      return (
        <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="flex items-center justify-center h-16 w-16 rounded-2xl bg-yellow-100 text-yellow-600 mb-6"
          >
            <Trophy className="h-8 w-8" />
          </motion.div>
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.15 }}
            className="text-3xl font-bold mb-2"
          >
            Lekce dokončena!
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="text-muted-foreground mb-6"
          >
            Skvělá práce! Zvládli jste všechny kroky.
          </motion.p>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Button asChild>
              <Link href="/dashboard">Zpět na přehled</Link>
            </Button>
          </motion.div>
        </div>
      );

    default:
      return null;
  }
}
