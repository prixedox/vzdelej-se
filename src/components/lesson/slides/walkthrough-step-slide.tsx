"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MathText, MathDisplay } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { checkAnswer } from "@/lib/lesson/answer-evaluator";
import { cn } from "@/lib/utils";
import { Check, X, Eye, Send } from "lucide-react";
import type { WalkthroughStepSlide as WalkthroughStepSlideType } from "@/types/slide";

export function WalkthroughStepSlide({
  slide,
  onWalkthroughAttempt,
}: {
  slide: WalkthroughStepSlideType;
  onWalkthroughAttempt?: (slideId: string) => void;
}) {
  const { step, stepNumber, totalSteps } = slide;
  const hasChallenge = !!step.challenge;

  const [revealed, setRevealed] = useState(!hasChallenge);
  const [answer, setAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  function handleTextSubmit() {
    if (!answer.trim() || submitted) return;
    const challenge = step.challenge!;
    const correct = checkAnswer({
      userAnswer: answer,
      expectedAnswer: challenge.expectedAnswer,
      acceptableAnswers: challenge.acceptableAnswers ?? [],
      numericTolerance: challenge.numericTolerance,
    });
    setIsCorrect(correct);
    setSubmitted(true);
    setRevealed(true);
    onWalkthroughAttempt?.(slide.id);
  }

  function handleChoiceSelect(idx: number) {
    if (submitted) return;
    const challenge = step.challenge!;
    const correct = challenge.choices![idx].isCorrect;
    setIsCorrect(correct);
    setSubmitted(true);
    setRevealed(true);
    onWalkthroughAttempt?.(slide.id);
  }

  function handleSkip() {
    setRevealed(true);
    setSubmitted(true);
    onWalkthroughAttempt?.(slide.id);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === "Enter") handleTextSubmit();
  }

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
        <span className="font-medium">
          Krok {stepNumber} / {totalSteps}
        </span>
      </div>

      <Card>
        <CardContent className="pt-5">
          <div className="flex items-start gap-3">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
              className="flex items-center justify-center h-8 w-8 rounded-full bg-primary text-primary-foreground text-sm font-bold shrink-0"
            >
              {stepNumber}
            </motion.div>

            <div className="flex-1 space-y-3">
              <motion.p
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 }}
                className="font-medium text-lg"
              >
                {step.instruction}
              </motion.p>

              {/* Challenge UI (Phase 1) */}
              {hasChallenge && !revealed && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="space-y-3"
                >
                  <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-3">
                    <MathText
                      content={step.challenge!.prompt}
                      className="text-sm text-indigo-900"
                    />
                  </div>

                  {step.challenge!.choices ? (
                    <div className="flex flex-col gap-2">
                      {step.challenge!.choices.map((choice, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleChoiceSelect(idx)}
                          disabled={submitted}
                          className={cn(
                            "w-full text-left px-4 py-2.5 rounded-lg border transition-colors text-sm",
                            "border-border bg-background hover:bg-indigo-50/50 cursor-pointer"
                          )}
                        >
                          <MathText content={choice.label} />
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Input
                        value={answer}
                        onChange={(e) => setAnswer(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Vaše odpověď..."
                        className="flex-1"
                      />
                      <Button
                        onClick={handleTextSubmit}
                        disabled={!answer.trim()}
                        size="icon"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  )}

                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-muted-foreground"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Zobrazit řešení
                  </Button>
                </motion.div>
              )}

              {/* Feedback after challenge attempt */}
              {hasChallenge && submitted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={cn(
                    "flex items-center gap-2 text-sm rounded-lg px-3 py-2",
                    isCorrect
                      ? "bg-green-50 text-green-700 border border-green-200"
                      : "bg-amber-50 text-amber-700 border border-amber-200"
                  )}
                >
                  {isCorrect ? (
                    <>
                      <Check className="h-4 w-4" />
                      <span>Správně! Tady je kompletní řešení:</span>
                    </>
                  ) : (
                    <>
                      <X className="h-4 w-4" />
                      <span>Podívejte se na řešení:</span>
                    </>
                  )}
                </motion.div>
              )}

              {/* Full step content (Phase 2 or always if no challenge) */}
              {revealed && (
                <>
                  {step.math && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: hasChallenge ? 0.1 : 0.2 }}
                      className="bg-muted/50 rounded-lg p-4 overflow-x-auto"
                    >
                      <MathDisplay math={step.math} block />
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: hasChallenge ? 0.2 : 0.35 }}
                  >
                    <MathText
                      content={step.explanation}
                      className="text-muted-foreground"
                    />
                  </motion.div>

                  {step.visual && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: hasChallenge ? 0.3 : 0.45 }}
                    >
                      <VisualBlock visual={step.visual} animated />
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
