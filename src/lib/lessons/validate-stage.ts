import type { StageChapter } from "@/types/chapter";
import type { Beat } from "@/types/stage";
import { getStageModule } from "@/lib/lesson/stages/registry";

/**
 * The formula's identifying substring, derived deterministically:
 * strip whitespace; if there is an `=`, take the longest side; else the whole string.
 *   "D = b^2 - 4ac"                 → "b^2-4ac"
 *   "\\log(ab) = \\log a + \\log b" → "\\loga+\\logb"
 */
export function formulaToken(formula: string): string {
  const stripped = formula.replace(/\s+/g, "");
  if (!stripped.includes("=")) return stripped;
  return stripped
    .split("=")
    .reduce((longest, side) => (side.length > longest.length ? side : longest), "");
}

/** Every free-text field of a beat that a student can read. */
function beatText(beat: Beat): string[] {
  const out = [beat.prompt];
  if (beat.kind === "manipulate") {
    out.push(beat.onReached);
    if (beat.nudge) out.push(beat.nudge);
  }
  if (beat.kind === "predict") {
    out.push(beat.question, beat.reveal, ...beat.options.map((o) => o.label));
  }
  return out;
}

export function validateStageChapter(key: string, chapter: StageChapter): string[] {
  const errors: string[] = [];
  const { stage, beats, naming } = chapter.lesson;

  const mod = getStageModule(stage.type);
  if (!mod) {
    errors.push(`[unknown-stage] ${key}: stage type "${stage.type}" is not in the registry`);
    return errors;
  }

  const declaredParams = new Set(mod.params);
  const declaredReadouts = new Set(mod.readouts_declared);

  for (const r of stage.readouts) {
    if (!declaredReadouts.has(r)) {
      errors.push(`[unknown-readout] ${key}: stage "${stage.type}" does not produce readout "${r}"`);
    }
  }

  const checkParams = (where: string, params: Record<string, number>) => {
    for (const p of Object.keys(params)) {
      if (!declaredParams.has(p)) {
        errors.push(`[unknown-param] ${key}: ${where} sets "${p}", not a param of "${stage.type}"`);
      }
    }
  };

  checkParams("stage.initial", stage.initial);

  const authoredReadouts = new Set(stage.readouts);
  beats.forEach((beat, i) => {
    if (beat.preset) checkParams(`beats[${i}].preset`, beat.preset);
    if (beat.kind === "predict") checkParams(`beats[${i}].then`, beat.then);
    if (beat.kind === "manipulate" && !authoredReadouts.has(beat.goal.readout)) {
      errors.push(
        `[unknown-readout] ${key}: beats[${i}].goal.readout "${beat.goal.readout}" is not in stage.readouts`
      );
    }
  });

  // The pedagogy check: the formula must appear for the first time in `naming`.
  const token = formulaToken(naming.formula);
  if (token.length > 0) {
    beats.forEach((beat, i) => {
      for (const text of beatText(beat)) {
        if (text.replace(/\s+/g, "").includes(token)) {
          errors.push(
            `[formula-leak] ${key}: beats[${i}] contains "${token}" — the formula must first appear in naming`
          );
          break;
        }
      }
    });
  }

  return errors;
}
