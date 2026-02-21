"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { MathText } from "./math-display";
import { HelpCircle } from "lucide-react";

export function HintReveal({
  hints,
  onHintUsed,
}: {
  hints: string[];
  onHintUsed: () => void;
}) {
  const [revealedCount, setRevealedCount] = useState(0);

  function revealNext() {
    setRevealedCount((prev) => {
      const next = Math.min(prev + 1, hints.length);
      if (next > prev) onHintUsed();
      return next;
    });
  }

  if (hints.length === 0) return null;

  return (
    <div className="space-y-2">
      {hints.slice(0, revealedCount).map((hint, idx) => (
        <div
          key={idx}
          className="flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-lg p-3 text-sm"
        >
          <HelpCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
          <MathText content={hint} className="text-blue-800" />
        </div>
      ))}

      {revealedCount < hints.length && (
        <Button
          variant="ghost"
          size="sm"
          onClick={revealNext}
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
        >
          <HelpCircle className="h-4 w-4 mr-1" />
          Nápověda ({revealedCount + 1}/{hints.length})
        </Button>
      )}
    </div>
  );
}
