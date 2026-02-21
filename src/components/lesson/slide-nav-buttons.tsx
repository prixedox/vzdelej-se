"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";

interface SlideNavButtonsProps {
  canGoNext: boolean;
  canGoPrev: boolean;
  onNext: () => void;
  onPrev: () => void;
  isLastSlide: boolean;
  isPracticeBlocked: boolean;
}

export function SlideNavButtons({
  canGoNext,
  canGoPrev,
  onNext,
  onPrev,
  isLastSlide,
  isPracticeBlocked,
}: SlideNavButtonsProps) {
  return (
    <div className="sticky bottom-0 bg-background/95 backdrop-blur border-t px-4 py-3 flex items-center justify-between gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={onPrev}
        disabled={!canGoPrev}
        className="gap-1.5"
      >
        <ChevronLeft className="h-4 w-4" />
        <span className="hidden sm:inline">Zpět</span>
      </Button>

      {isPracticeBlocked ? (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5">
          <Lock className="h-3.5 w-3.5" />
          Odpovězte pro pokračování
        </p>
      ) : null}

      {!isLastSlide && (
        <Button
          size="sm"
          onClick={onNext}
          disabled={!canGoNext}
          className="gap-1.5"
        >
          <span className="hidden sm:inline">Další</span>
          <ChevronRight className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
