"use client";

import { Check, X } from "lucide-react";
import { MathText } from "./math-display";
import { cn } from "@/lib/utils";

export function AnswerFeedback({
  isCorrect,
  solutionExplanation,
  show,
}: {
  isCorrect: boolean;
  solutionExplanation: string;
  show: boolean;
}) {
  if (!show) return null;

  return (
    <div
      className={cn(
        "rounded-lg p-4 mt-3 border",
        isCorrect
          ? "bg-green-50 border-green-200"
          : "bg-red-50 border-red-200"
      )}
    >
      <div className="flex items-center gap-2 mb-2">
        {isCorrect ? (
          <>
            <Check className="h-5 w-5 text-green-600" />
            <span className="font-semibold text-green-800">Správně!</span>
          </>
        ) : (
          <>
            <X className="h-5 w-5 text-red-600" />
            <span className="font-semibold text-red-800">Špatně</span>
          </>
        )}
      </div>
      <MathText
        content={solutionExplanation}
        className={cn(
          "text-sm",
          isCorrect ? "text-green-700" : "text-red-700"
        )}
      />
    </div>
  );
}
