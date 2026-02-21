// Client-side answer checking for MVP
// No AI evaluation — exact match + numeric tolerance

export function checkAnswer(params: {
  userAnswer: string;
  expectedAnswer: string;
  acceptableAnswers: string[];
  numericTolerance?: number;
}): boolean {
  const { userAnswer, expectedAnswer, acceptableAnswers, numericTolerance } =
    params;

  const normalized = normalizeAnswer(userAnswer);

  // Check exact match with expected answer
  if (normalized === normalizeAnswer(expectedAnswer)) {
    return true;
  }

  // Check against acceptable answers
  for (const acceptable of acceptableAnswers) {
    if (normalized === normalizeAnswer(acceptable)) {
      return true;
    }
  }

  // Numeric tolerance check
  if (numericTolerance !== undefined) {
    const userNum = parseNumber(normalized);
    const expectedNum = parseNumber(normalizeAnswer(expectedAnswer));

    if (
      userNum !== null &&
      expectedNum !== null &&
      Math.abs(userNum - expectedNum) <= numericTolerance
    ) {
      return true;
    }

    // Also check against acceptable answers numerically
    for (const acceptable of acceptableAnswers) {
      const acceptNum = parseNumber(normalizeAnswer(acceptable));
      if (
        userNum !== null &&
        acceptNum !== null &&
        Math.abs(userNum - acceptNum) <= numericTolerance
      ) {
        return true;
      }
    }
  }

  return false;
}

function normalizeAnswer(answer: string): string {
  return answer
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ")
    .replace(/,/g, ".") // Czech decimal comma → dot for comparison
    .replace(/\$/g, "") // Remove LaTeX delimiters
    .replace(/\\,/g, "") // Remove LaTeX thin spaces
    .replace(/\\text\{[^}]*\}/g, "") // Remove \text{} wrappers
    .replace(/\s*°\s*/g, "°") // Normalize degree symbol
    .trim();
}

function parseNumber(str: string): number | null {
  // Remove units and spaces
  const cleaned = str.replace(/[a-zA-Zčďěíňóřšťúůýž°%]+/g, "").trim();
  const num = parseFloat(cleaned);
  return isNaN(num) ? null : num;
}
