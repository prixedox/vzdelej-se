"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { MathText } from "../math-display";
import { Brain, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import type { KnowledgeCheckSlide as KnowledgeCheckSlideType } from "@/types/slide";

export function KnowledgeCheckSlide({
  slide,
}: {
  slide: KnowledgeCheckSlideType;
}) {
  const { knowledgeCheck } = slide;
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selected = selectedIndex !== null;
  const isCorrect = selected && knowledgeCheck.choices[selectedIndex].isCorrect;

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-xs text-indigo-600 mb-3">
        <Brain className="h-4 w-4" />
        <span className="font-medium">Rychlá kontrola</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="border-indigo-200">
          <CardContent className="pt-5 space-y-4">
            <MathText
              content={knowledgeCheck.question}
              className="text-base font-medium"
            />

            <div className="flex flex-col gap-2">
              {knowledgeCheck.choices.map((choice, idx) => {
                const choiceFeedback = choice.feedback;
                let variant = "border-border bg-background hover:bg-indigo-50/50";
                if (selected) {
                  if (choice.isCorrect) {
                    variant = "border-green-400 bg-green-50 text-green-900";
                  } else if (idx === selectedIndex && !choice.isCorrect) {
                    variant = "border-red-400 bg-red-50 text-red-900";
                  } else {
                    variant = "border-border bg-background opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !selected && setSelectedIndex(idx)}
                    disabled={selected}
                    className={cn(
                      "w-full text-left px-4 py-3 rounded-lg border transition-colors",
                      variant,
                      !selected && "cursor-pointer"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <MathText content={choice.label} />
                      {selected && choice.isCorrect && (
                        <Check className="h-4 w-4 text-green-600 shrink-0 ml-auto" />
                      )}
                      {selected && idx === selectedIndex && !choice.isCorrect && (
                        <X className="h-4 w-4 text-red-600 shrink-0 ml-auto" />
                      )}
                    </div>
                    {selected && choiceFeedback && (
                      <p className="text-xs mt-1 text-muted-foreground">
                        {choiceFeedback}
                      </p>
                    )}
                  </button>
                );
              })}
            </div>

            {selected && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className={cn(
                  "rounded-lg p-3 text-sm border",
                  isCorrect
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                )}
              >
                <MathText content={knowledgeCheck.explanation} />
              </motion.div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
