import type { Beat, NamingBeat, StageLesson } from "@/types/stage";
import type { Slide } from "@/types/slide";
import { stepToSlide } from "./build-slides";

interface ScreenBase {
  id: string;
  index: number;
  total: number;
}

export interface BeatScreen extends ScreenBase {
  kind: "beat";
  beat: Beat;
}

export interface NamingScreen extends ScreenBase {
  kind: "naming";
  naming: NamingBeat;
}

/** Practice reuses the deck-format slide components verbatim. */
export interface ApplyScreen extends ScreenBase {
  kind: "apply";
  slide: Slide;
}

export interface StageSummaryScreen extends ScreenBase {
  kind: "summary";
  keyTakeaways: string[];
  nextTopicSuggestion?: string;
}

export interface StageCompleteScreen extends ScreenBase {
  kind: "complete";
}

export type StageScreen =
  | BeatScreen
  | NamingScreen
  | ApplyScreen
  | StageSummaryScreen
  | StageCompleteScreen;

export function buildBeats(lesson: StageLesson): StageScreen[] {
  const screens: StageScreen[] = [];
  const push = (make: (base: ScreenBase) => StageScreen) => {
    const index = screens.length;
    // `total` is patched once the full list is known.
    screens.push(make({ id: `stage-${index}`, index, total: 0 }));
  };

  lesson.beats.forEach((beat) => push((base) => ({ ...base, kind: "beat", beat })));

  push((base) => ({ ...base, kind: "naming", naming: lesson.naming }));

  (lesson.apply ?? []).forEach((step, i) =>
    push((base) => ({
      ...base,
      kind: "apply",
      // stepIndex/totalSteps are unused by the stage shell but required by Slide.
      slide: stepToSlide(step, `${base.id}-apply-${i}`, i, lesson.apply?.length ?? 0),
    }))
  );

  push((base) => ({
    ...base,
    kind: "summary",
    keyTakeaways: lesson.summary.keyTakeaways,
    nextTopicSuggestion: lesson.nextTopicSuggestion,
  }));

  push((base) => ({ ...base, kind: "complete" }));

  const total = screens.length;
  screens.forEach((s) => {
    s.total = total;
  });

  return screens;
}
