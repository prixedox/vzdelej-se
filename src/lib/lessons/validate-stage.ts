import type { StageChapter } from "@/types/chapter";
import type { Beat } from "@/types/stage";
import { getStageModule } from "@/lib/lesson/stages/registry";

/**
 * The formula's identifying substring, derived deterministically:
 * strip whitespace; if there is an `=`, take the longest side; else the whole string.
 *   "D = b^2 - 4ac"                 → "b^2-4ac"
 *   "\\log(ab) = \\log a + \\log b" → "\\loga+\\logb"
 *
 * This is a deliberately simple, deterministic substring check — not a
 * semantic or LaTeX-aware comparison. Known, accepted gaps:
 *   - Unicode confusables are not normalized: "b² − 4ac" (U+00B2 superscript
 *     two, U+2212 minus sign) will NOT be recognized as the same formula as
 *     "b^2 - 4ac" (caret, hyphen-minus).
 *   - LaTeX formatting variance is not normalized: "b^{2}" or "\\,"-style
 *     thin spaces will NOT match "b^2".
 *   - Algebraic reordering is not detected: "4ac - b^2" will NOT match
 *     "b^2 - 4ac".
 *   - On an equal-length left/right side, the tie-break favors the LEFT
 *     side — the `reduce` below uses strict `>`, so a later side of equal
 *     length never replaces an earlier one.
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

/** Unicode-aware letter test — Czech text has diacritics `/\w/` doesn't cover. */
function isLetter(ch: string | undefined): boolean {
  return ch !== undefined && /\p{L}/u.test(ch);
}

/**
 * True if `token` occurs in `text` as a standalone match: not embedded inside
 * a larger word (e.g. token "ma" inside "matematice"). Whitespace inside
 * `text` is tolerated when matching — so a formula reproduced with different
 * spacing around operators (e.g. "b^2 - 4ac" vs token "b^2-4ac") is still
 * caught — but the standalone/boundary check is done against the ORIGINAL,
 * un-stripped text at the positions the whitespace-stripped match maps back
 * to. This distinguishes a token merged across a real word boundary by
 * whitespace-stripping (e.g. "je" + "ma" → "jema", still standalone because
 * a space separated them) from a token genuinely embedded in one word
 * (e.g. "matematice", never separated by whitespace).
 */
function containsStandaloneToken(text: string, token: string): boolean {
  if (token.length === 0) return false;

  // Build the whitespace-stripped string alongside a map back to each
  // character's index in the original text.
  const compactChars: string[] = [];
  const origIndex: number[] = [];
  for (let i = 0; i < text.length; i++) {
    if (/\s/.test(text[i])) continue;
    compactChars.push(text[i]);
    origIndex.push(i);
  }
  const compact = compactChars.join("");

  let from = 0;
  for (;;) {
    const idx = compact.indexOf(token, from);
    if (idx === -1) return false;
    const startOrig = origIndex[idx];
    const endOrig = origIndex[idx + token.length - 1];
    const before = startOrig > 0 ? text[startOrig - 1] : undefined;
    const after = endOrig + 1 < text.length ? text[endOrig + 1] : undefined;
    if (!isLetter(before) && !isLetter(after)) return true;
    from = idx + 1;
  }
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
        if (containsStandaloneToken(text, token)) {
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
