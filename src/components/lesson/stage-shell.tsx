"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { AnimatePresence, motion, MotionConfig, useReducedMotion } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { buildBeats } from "@/lib/lesson/build-beats";
import { isGoalMet } from "@/lib/lesson/goal";
import { solveGoal } from "@/lib/lesson/solve-goal";
import { getStageModule } from "@/lib/lesson/stages/registry";
import { useAnimatedParams } from "./use-animated-params";
import { recordChapterDerived } from "@/lib/lesson/progress-store";
import { StageCanvas } from "./stages/stage-canvas";
import { BeatStrip } from "./beats/beat-strip";
import { NamingPanel } from "./beats/naming-panel";
import { StageComplete } from "./stage-complete";
import { SlideRenderer } from "./slide-renderer";
import { LessonProgressBar } from "./lesson-progress-bar";
import { MathText } from "./math-display";
import { Button } from "@/components/ui/button";
import type { StageLesson } from "@/types/stage";

interface StageShellProps {
  lesson: StageLesson;
  topicSlug: string;
  chapterSlug: string;
}

export function StageShell({ lesson, topicSlug, chapterSlug }: StageShellProps) {
  const screens = useMemo(() => buildBeats(lesson), [lesson]);
  const [index, setIndex] = useState(0);
  const { params, setNow, springTo } = useAnimatedParams(lesson.stage.initial);
  const reduceMotion = useReducedMotion();

  const screen = screens[index];
  const mod = getStageModule(lesson.stage.type);
  const readouts = useMemo(() => mod?.readouts(params) ?? {}, [mod, params]);

  // Narrowed once, up front, so every consumer below (including closures
  // passed as props) reads from this local instead of re-narrowing
  // `screen.beat` deep inside a callback.
  const beat = screen.kind === "beat" ? screen.beat : null;
  const reached =
    beat?.kind === "manipulate" ? isGoalMet(beat.goal, readouts) : false;

  // True once the current predict beat's option has been picked. Freezes the
  // canvas for the reveal travel below (see `interactive`) — the student is
  // meant to watch the outcome, not drag through it. Reset whenever the beat
  // changes by adjusting state directly during render (React's documented
  // pattern for resetting state when a prop changes) rather than in an
  // effect — an effect here would fire an extra render after the one that
  // already shows the new beat, which is both unnecessary and what the
  // set-state-in-effect lint rule flags.
  const [predictAnswered, setPredictAnswered] = useState(false);
  const [predictAnsweredBeat, setPredictAnsweredBeat] = useState(beat);
  if (beat !== predictAnsweredBeat) {
    setPredictAnsweredBeat(beat);
    setPredictAnswered(false);
  }

  // Travel to the beat's preset on entry, so the student watches the stage
  // move into position rather than finding it already there.
  useEffect(() => {
    if (beat?.preset) springTo(beat.preset);
  }, [beat, springTo]);

  // Nothing blocks. A student who is already stuck must never meet a locked door.
  const goNext = useCallback(
    () => setIndex((i) => Math.min(screens.length - 1, i + 1)),
    [screens.length]
  );
  const goPrev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const target = e.target as HTMLElement;
      if (["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) || target.isContentEditable) {
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        goNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        goPrev();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goNext, goPrev]);

  useEffect(() => {
    if (screen.kind === "complete") recordChapterDerived(topicSlug, chapterSlug);
  }, [screen.kind, topicSlug, chapterSlug]);

  function showMe() {
    if (beat?.kind !== "manipulate" || !mod) return;
    const solved = solveGoal(beat.goal, mod, params);
    // Travel there rather than teleport — the student needs to see which way
    // it moved, otherwise being shown teaches nothing.
    if (solved) springTo(solved);
  }

  if (screen.kind === "complete") {
    return <StageComplete keyTakeaways={lesson.summary.keyTakeaways} />;
  }

  return (
    <MotionConfig reducedMotion={reduceMotion ? "always" : "never"}>
      <div className="flex flex-col gap-4">
        <LessonProgressBar currentIndex={index} totalSteps={screens.length} />

        {/*
          The stage never unmounts: it is the continuity of the lesson.
          Fixed at ~45vh (per spec) so the beat strip below it — prompt,
          "Ukaž mi to" button, the green onReached box — stays on-screen
          without scrolling on a typical laptop viewport. This must be a
          definite height (not `max-h`): a flex column sized only by
          `max-height` has no free space to hand a `flex-1` child until its
          siblings' natural size already exceeds the cap, which would let the
          SVG collapse toward 0 instead of filling the box. `min-h-0` here and
          on the stage's own root lets that flex-1 SVG (see each stage
          component) shrink below its native aspect-ratio height rather than
          overflowing it; `overflow-hidden` is the last-resort guard if a
          stage's slider/text chrome alone ever exceeds the cap.
        */}
        <div className="sticky top-16 z-10 flex h-[45vh] flex-col overflow-hidden rounded-lg border bg-background p-3 shadow-sm">
          <StageCanvas
            type={lesson.stage.type}
            params={params}
            onParamsChange={setNow}
            highlight={beat?.highlight}
            // False during naming (nothing to manipulate) and, once a
            // predict beat has been answered, during its reveal travel — a
            // drag mid-travel would call setNow and cancel it, teleporting
            // the stage instead of letting the student watch the outcome.
            interactive={screen.kind === "beat" && !predictAnswered}
          />
        </div>

        <div className="min-h-[9rem]">
          <AnimatePresence mode="wait">
            <motion.div
              key={screen.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
            >
              {beat && (
                <BeatStrip
                  beat={beat}
                  reached={reached}
                  onShowMe={showMe}
                  onPredictAnswered={() => {
                    // Travel, so the predicted outcome is watched happening;
                    // freeze the canvas for the duration (see `interactive`
                    // above) so a drag cannot cancel that travel.
                    if (beat.kind === "predict") {
                      setPredictAnswered(true);
                      springTo(beat.then);
                    }
                  }}
                />
              )}
              {screen.kind === "naming" && <NamingPanel naming={screen.naming} />}
              {screen.kind === "apply" && (
                /*
                 * Answers are intentionally discarded. Deck lessons collect
                 * them to compute a score and tier; stage lessons are never
                 * scored, so there is nothing to accumulate. The slide's own
                 * inline feedback is the whole point of the practice step.
                 */
                <SlideRenderer
                  slide={screen.slide}
                  onAnswer={() => {}}
                  onInteracted={() => {}}
                  answeredSteps={new Map()}
                  interactedSteps={new Set()}
                />
              )}
              {screen.kind === "summary" && (
                <div className="space-y-2">
                  <ul className="space-y-2">
                    {screen.keyTakeaways.map((t) => (
                      <li key={t} className="rounded-lg border bg-muted/40 p-3 text-sm">
                        <MathText content={t} />
                      </li>
                    ))}
                  </ul>
                  {screen.nextTopicSuggestion && (
                    <p className="text-sm text-muted-foreground">
                      Další doporučené téma: {screen.nextTopicSuggestion}
                    </p>
                  )}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-between border-t pt-4">
          <Button variant="outline" size="sm" onClick={goPrev} disabled={index === 0}>
            <ChevronLeft className="h-4 w-4" />
            Zpět
          </Button>
          <Button size="sm" onClick={goNext}>
            Další
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </MotionConfig>
  );
}
