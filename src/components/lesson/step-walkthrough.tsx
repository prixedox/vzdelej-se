"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MathText, MathDisplay } from "./math-display";
import { VisualBlock } from "./visuals/visual-block";
import type { WalkthroughProblem } from "@/types/lesson";
import { Lightbulb, ChevronRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepWalkthrough({
  walkthrough,
}: {
  walkthrough: WalkthroughProblem;
}) {
  const [revealedSteps, setRevealedSteps] = useState(0);
  const totalSteps = walkthrough.steps.length;

  function revealNext() {
    setRevealedSteps((prev) => Math.min(prev + 1, totalSteps));
  }

  function revealAll() {
    setRevealedSteps(totalSteps);
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-amber-100 text-amber-600">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">Vzorový příklad</h2>
          <p className="text-sm text-muted-foreground">
            Krok za krokem k řešení
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Zadání</CardTitle>
        </CardHeader>
        <CardContent>
          <MathText
            content={walkthrough.problemStatement}
            className="text-lg"
          />
        </CardContent>
      </Card>

      <div className="space-y-3">
        {walkthrough.steps.map((step, idx) => {
          const isRevealed = idx < revealedSteps;
          return (
            <div
              key={idx}
              className={cn(
                "transition-all duration-300",
                isRevealed ? "opacity-100" : "opacity-0 h-0 overflow-hidden"
              )}
            >
              <Card>
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center h-7 w-7 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div className="flex-1 space-y-2">
                      <p className="font-medium">{step.instruction}</p>
                      {step.math && (
                        <div className="bg-muted/50 rounded-lg p-3 overflow-x-auto">
                          <MathDisplay math={step.math} block />
                        </div>
                      )}
                      <p className="text-sm text-muted-foreground">
                        {step.explanation}
                      </p>
                      {step.visual && <VisualBlock visual={step.visual} />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          );
        })}
      </div>

      {revealedSteps < totalSteps ? (
        <div className="flex gap-2">
          <Button onClick={revealNext} className="gap-2">
            <ChevronRight className="h-4 w-4" />
            Další krok ({revealedSteps + 1}/{totalSteps})
          </Button>
          <Button variant="outline" onClick={revealAll}>
            Zobrazit vše
          </Button>
        </div>
      ) : (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Výsledek</span>
            </div>
            <MathText
              content={walkthrough.finalAnswer}
              className="text-green-800 font-medium"
            />
          </CardContent>
        </Card>
      )}
    </div>
  );
}
