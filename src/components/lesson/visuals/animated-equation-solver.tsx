"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import katex from "katex";
import { cn } from "@/lib/utils";
import { ChevronRight, RotateCcw } from "lucide-react";

interface EquationStep {
  latex: string;
  label?: string;
}

interface AnimatedEquationSolverProps {
  steps: EquationStep[];
  autoPlay?: boolean;
  delayMs?: number;
}

export function AnimatedEquationSolver(props: Record<string, unknown>) {
  const { steps, autoPlay = false, delayMs = 2000 } = props as unknown as AnimatedEquationSolverProps;
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isPlaying || currentStep >= steps.length - 1) return;
    const timer = setTimeout(() => {
      setCurrentStep((s) => {
        const next = s + 1;
        if (next >= steps.length - 1) setIsPlaying(false);
        return next;
      });
    }, delayMs);
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, steps.length, delayMs]);

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep((s) => s + 1);
    }
  }

  function handleReset() {
    setCurrentStep(0);
    setIsPlaying(false);
  }

  function renderKatex(latex: string): string {
    try {
      return katex.renderToString(latex.trim(), {
        displayMode: true,
        throwOnError: false,
        trust: true,
        strict: false,
      });
    } catch {
      return `<code>${latex}</code>`;
    }
  }

  const visibleSteps = steps.slice(0, currentStep + 1);
  const canAdvance = currentStep < steps.length - 1;

  return (
    <div
      ref={containerRef}
      className="space-y-3"
      aria-label="Animované řešení rovnice"
    >
      <div className="space-y-2">
        <AnimatePresence mode="sync">
          {visibleSteps.map((step, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                duration: 0.4,
                ease: "easeOut",
              }}
              className={cn(
                "flex items-center gap-3 rounded-lg px-4 py-3 transition-colors",
                idx === currentStep
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/50"
              )}
            >
              <span className="text-xs text-muted-foreground font-mono shrink-0 w-6 text-center">
                {idx + 1}.
              </span>
              <div
                className="flex-1 overflow-x-auto"
                dangerouslySetInnerHTML={{
                  __html: renderKatex(step.latex),
                }}
              />
              {step.label && (
                <span className="text-xs text-muted-foreground italic shrink-0 max-w-[140px] text-right">
                  {step.label}
                </span>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="flex items-center gap-2 pt-1">
        {canAdvance && (
          <button
            onClick={handleNext}
            className="flex items-center gap-1 rounded-md bg-primary px-3 py-1.5 text-sm text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Další krok
            <ChevronRight className="h-4 w-4" />
          </button>
        )}
        {currentStep > 0 && (
          <button
            onClick={handleReset}
            className="flex items-center gap-1 rounded-md border px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted transition-colors"
          >
            <RotateCcw className="h-3 w-3" />
            Znovu
          </button>
        )}
        {!canAdvance && currentStep === steps.length - 1 && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-green-600 font-medium"
          >
            Hotovo!
          </motion.span>
        )}
      </div>
    </div>
  );
}
