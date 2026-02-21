"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import { SlideRenderer } from "./slide-renderer";
import { LessonProgressBar } from "./lesson-progress-bar";
import { SlideNavButtons } from "./slide-nav-buttons";
import type { Slide } from "@/types/slide";

interface SlideDeckProps {
  slides: Slide[];
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

const variants = {
  enter: (d: number) => ({
    x: d > 0 ? 300 : -300,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (d: number) => ({
    x: d > 0 ? -300 : 300,
    opacity: 0,
  }),
};

export function SlideDeck({
  slides,
  onAnswer,
  answeredProblems,
}: SlideDeckProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const currentSlide = slides[currentIndex];

  const canGoNext = useMemo(() => {
    if (currentIndex >= slides.length - 1) return false;
    if (currentSlide.type === "practice-problem") {
      return answeredProblems.has(currentSlide.problemIndex);
    }
    return true;
  }, [currentIndex, currentSlide, answeredProblems, slides.length]);

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

  // Auto-advance after answering a practice problem
  useEffect(() => {
    if (
      currentSlide.type === "practice-problem" &&
      answeredProblems.has(currentSlide.problemIndex)
    ) {
      const result = answeredProblems.get(currentSlide.problemIndex);
      if (result?.isCorrect) {
        const timer = setTimeout(() => {
          if (currentIndex < slides.length - 1) {
            setDirection(1);
            setCurrentIndex((i) => i + 1);
          }
        }, 1800);
        return () => clearTimeout(timer);
      }
    }
  }, [answeredProblems, currentSlide, currentIndex, slides.length]);

  return (
    <div className="flex flex-col min-h-[calc(100vh-8rem)]">
      <LessonProgressBar currentIndex={currentIndex} slides={slides} />

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
              onAnswer={onAnswer}
              answeredProblems={answeredProblems}
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
        isPracticeBlocked={
          currentSlide.type === "practice-problem" &&
          !answeredProblems.has(currentSlide.problemIndex)
        }
      />
    </div>
  );
}
