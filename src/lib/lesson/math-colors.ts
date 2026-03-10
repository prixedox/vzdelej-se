/**
 * Color-coded variable tracking for LaTeX equations.
 * Use these in lesson content with \color{hex}{...} in KaTeX.
 *
 * Convention:
 * - Variables (x, y, z) → red
 * - Coefficients (a, b, c) → blue
 * - Constants (numbers) → green
 * - Operations / results → orange
 * - Secondary variables → purple
 */
export const MATH_COLORS = {
  variable: "#e74c3c",
  coefficient: "#2980b9",
  constant: "#27ae60",
  operation: "#e67e22",
  secondary: "#8e44ad",
} as const;

/** LaTeX helpers — wrap a value with \color{} */
export function colorVar(text: string): string {
  return `\\color{${MATH_COLORS.variable}}{${text}}`;
}

export function colorCoeff(text: string): string {
  return `\\color{${MATH_COLORS.coefficient}}{${text}}`;
}

export function colorConst(text: string): string {
  return `\\color{${MATH_COLORS.constant}}{${text}}`;
}

export function colorOp(text: string): string {
  return `\\color{${MATH_COLORS.operation}}{${text}}`;
}

export function colorSecondary(text: string): string {
  return `\\color{${MATH_COLORS.secondary}}{${text}}`;
}
