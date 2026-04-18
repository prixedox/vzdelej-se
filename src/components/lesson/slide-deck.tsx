"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlideRenderer } from "./slide-renderer";
import { LessonProgressBar } from "./lesson-progress-bar";
import { SlideNavButtons } from "./slide-nav-buttons";
import type { Slide } from "@/types/slide";

interface SlideDeckProps {
  slides: Slide[];
  onComplete: (
    answeredSteps: Map<number, { isCorrect: boolean; attempts: number }>
  ) => void;
}

const variants = {
  enter: (d: number) => ({
    x: d > 0 ? 200 : -200,
    opacity: 0,
    scale: 0.97,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (d: number) => ({
    x: d > 0 ? -200 : 200,
    opacity: 0,
    scale: 0.97,
  }),
};

// Step types that block forward navigation until answered/interacted
const BLOCKING_TYPES = new Set([
  "multiple-choice",
  "text-input",
  "sort-order",
  "prediction",
]);

export function SlideDeck({ slides, onComplete }: SlideDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [answeredSteps, setAnsweredSteps] = useState<
    Map<number, { isCorrect: boolean; attempts: number }>
  >(new Map());
  const [interactedSteps, setInteractedSteps] = useState<Set<number>>(
    new Set()
  );

  const currentSlide = slides[currentIndex];

  const handleAnswer = useCallback(
    (stepIndex: number, isCorrect: boolean, attempts: number) => {
      setAnsweredSteps((prev) => {
        const next = new Map(prev);
        next.set(stepIndex, { isCorrect, attempts });
        return next;
      });
    },
    []
  );

  const handleInteracted = useCallback((stepIndex: number) => {
    setInteractedSteps((prev) => new Set(prev).add(stepIndex));
  }, []);

  const isBlocked = useMemo(() => {
    if (BLOCKING_TYPES.has(currentSlide.type)) {
      return !answeredSteps.has(currentSlide.stepIndex);
    }
    // Explore with followUpQuestion blocks until interacted
    if (
      currentSlide.type === "explore" &&
      currentSlide.step.followUpQuestion
    ) {
      return !interactedSteps.has(currentSlide.stepIndex);
    }
    return false;
  }, [currentSlide, answeredSteps, interactedSteps]);

  const canGoNext = useMemo(() => {
    if (currentIndex >= slides.length - 1) return false;
    return !isBlocked;
  }, [currentIndex, slides.length, isBlocked]);

  const canGoPrev = currentIndex > 0;
  const isLastSlide = currentIndex === slides.length - 1;

  const goNext = useCallback(() => {
    if (!canGoNext) return;
    setDirection(1);
    setCurrentIndex((i) => i + 1);
  }, [canGoNext]);

  const goPrev = useCallback(() => {
    if (!canGoPrev) return;
    setDirection(-1);
    setCurrentIndex((i) => i - 1);
  }, [canGoPrev]);

  // Keyboard navigation
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable
      )
        return;

      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goNext, goPrev]);

  // Auto-advance 1.5s on correct answer
  useEffect(() => {
    if (
      BLOCKING_TYPES.has(currentSlide.type) &&
      answeredSteps.has(currentSlide.stepIndex)
    ) {
      const result = answeredSteps.get(currentSlide.stepIndex);
      if (result?.isCorrect && currentIndex < slides.length - 1) {
        const timer = setTimeout(() => {
          setDirection(1);
          setCurrentIndex((i) => i + 1);
        }, 1500);
        return () => clearTimeout(timer);
      }
    }
  }, [answeredSteps, currentSlide, currentIndex, slides.length]);

  // Complete when reaching complete-v2 slide
  useEffect(() => {
    if (currentSlide.type === "complete") {
      onComplete(answeredSteps);
    }
  }, [currentSlide.type, answeredSteps, onComplete]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <LessonProgressBar
        currentIndex={currentIndex}
        totalSteps={slides.length}
      />

      <div className="flex-1 overflow-hidden relative px-4">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentSlide.id}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.15}
            onDragEnd={(_, info) => {
              const swipe = info.offset.x;
              const velocity = info.velocity.x;
              if (swipe < -80 || velocity < -500) goNext();
              else if (swipe > 80 || velocity > 500) goPrev();
            }}
            className="touch-pan-y"
          >
            <SlideRenderer
              slide={currentSlide}
              onAnswer={handleAnswer}
              onInteracted={handleInteracted}
              answeredSteps={answeredSteps}
              interactedSteps={interactedSteps}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <SlideNavButtons
        canGoNext={canGoNext}
        canGoPrev={canGoPrev}
        onNext={goNext}
        onPrev={goPrev}
        isLastSlide={isLastSlide}
        isPracticeBlocked={isBlocked}
      />
    </div>
  );
}
