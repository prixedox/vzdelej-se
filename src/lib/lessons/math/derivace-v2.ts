import type { LessonV2 } from "@/types/lesson-v2";

export const derivaceV2Beginner: LessonV2 = {
  title: "Derivace",
  steps: [
    {
      type: "multiple-choice",
      question: "Auto jede po dráze $s(t) = 3t^2$ (m). Jaká je jeho rychlost v čase $t = 2$ s?",
      choices: [
        { label: "$6\\,\\text{m/s}$", isCorrect: false, feedback: "To je $s'(t) = 6t$ dosazené za $t = 1$." },
        { label: "$12\\,\\text{m/s}$", isCorrect: true, feedback: "$s'(t) = 6t$, $s'(2) = 12\\,\\text{m/s}$ ✓" },
        { label: "$3\\,\\text{m/s}$", isCorrect: false, feedback: "To je koeficient, ne derivace v bodě." },
      ],
      explanation: "Rychlost = derivace dráhy: $v = s'(t) = 6t$. V $t = 2$: $v = 12\\,\\text{m/s}$.",
    },
    {
      type: "explain",
      body: "**Derivace** $f'(x)$ udává **okamžitou rychlost změny** funkce $f(x)$.\n\nGeometricky: sklon tečny ke grafu v daném bodě.\n\nFyzikálně: derivace polohy = rychlost, derivace rychlosti = zrychlení.",
      callout: "Definice",
    },
    {
      type: "explain",
      body: "**Základní derivace**:\n\n| $f(x)$ | $f'(x)$ |\n|---|---|\n| $c$ (konstanta) | $0$ |\n| $x^n$ | $nx^{n-1}$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $e^x$ | $e^x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |",
      callout: "Tabulka",
    },
    {
      type: "text-input",
      question: "Derivujte $f(x) = x^5$. Jaká je $f'(x)$? (zapište koeficient a mocninu)",
      expectedAnswer: "5x^4",
      acceptableAnswers: ["5x^4", "5*x^4"],
      explanation: "$(x^n)' = nx^{n-1}$. Tedy $(x^5)' = 5x^4$.",
    },
    {
      type: "text-input",
      question: "Derivujte $f(x) = 3x^2 + 7x - 4$.",
      expectedAnswer: "6x + 7",
      acceptableAnswers: ["6x+7", "6x + 7"],
      explanation: "$(3x^2)' + (7x)' - (4)' = 6x + 7 - 0 = 6x + 7$.",
      hints: ["Derivujte každý člen zvlášť."],
    },
    {
      type: "explain",
      body: "**Pravidla derivování**:\n\n- Konstantní násobek: $(cf)' = cf'$\n- Součet: $(f + g)' = f' + g'$\n- Součin: $(fg)' = f'g + fg'$\n- Podíl: $\\left(\\frac{f}{g}\\right)' = \\frac{f'g - fg'}{g^2}$",
      callout: "Pravidla",
    },
    {
      type: "multiple-choice",
      question: "Derivace $f(x) = e^x$ je:",
      choices: [
        { label: "$xe^{x-1}$", isCorrect: false, feedback: "To by platilo pro $x^n$, ale $e^x$ se derivuje jinak." },
        { label: "$e^x$", isCorrect: true, feedback: "Ano! $e^x$ je jediná funkce, která je svou vlastní derivací." },
        { label: "$\\frac{1}{x}$", isCorrect: false, feedback: "To je derivace $\\ln x$." },
      ],
      explanation: "$(e^x)' = e^x$. Eulerovo číslo $e \\approx 2{,}718$ je definováno právě touto vlastností.",
    },
    {
      type: "text-input",
      question: "Derivujte $f(x) = x^3 - 4x + 1$. Jaká je $f'(2)$?",
      expectedAnswer: "8",
      explanation: "$f'(x) = 3x^2 - 4$. $f'(2) = 3 \\cdot 4 - 4 = 8$.",
    },
    {
      type: "explain",
      body: "**Extrémy** funkce: $f'(x) = 0$ v bodech, kde funkce mění směr (minimum nebo maximum).\n\n- $f'(x) > 0$ → funkce roste\n- $f'(x) < 0$ → funkce klesá\n- $f'(x) = 0$ → stacionární bod (potenciální extrém)",
      callout: "Extrémy",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^2 - 6x + 5$. V jakém $x$ má minimum? (položte $f'(x) = 0$)",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "x = 3"],
      explanation: "$f'(x) = 2x - 6 = 0 \\Rightarrow x = 3$. Je to minimum, protože $f''(3) = 2 > 0$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky: najděte lokální extrémy $f(x) = x^3 - 3x$.",
      items: [
        "Derivujeme: $f'(x) = 3x^2 - 3$",
        "Položíme $f'(x) = 0$: $3x^2 - 3 = 0$, $x = \\pm 1$",
        "Určíme typ: $f''(x) = 6x$, $f''(1) = 6 > 0$ (min), $f''(-1) = -6 < 0$ (max)",
        "Maximum v $[-1; 2]$, minimum v $[1; -2]$",
      ],
      explanation: "Postup: derivace → nulové body → druhá derivace (nebo znaménkové schéma) → typ.",
    },
    {
      type: "reveal",
      question: "Co říká rovnice tečny ke grafu?",
      revealedContent: "Tečna k $f(x)$ v bodě $[a; f(a)]$:\n\n$$y = f(a) + f'(a)(x - a)$$\n\nDerivace $f'(a)$ je sklon tečny. Příklad: $f(x) = x^2$ v $x = 3$: $y = 9 + 6(x - 3) = 6x - 9$.",
    },
    {
      type: "text-input",
      question: "Jaký je sklon tečny ke grafu $f(x) = \\ln x$ v bodě $x = 1$?",
      expectedAnswer: "1",
      explanation: "$f'(x) = \\frac{1}{x}$. $f'(1) = 1$. Tečna má sklon 1 (svírá $45°$ s osou $x$).",
    },
    {
      type: "multiple-choice",
      question: "Funkce $f(x) = -x^2 + 4x$ má maximum v:",
      choices: [
        { label: "$x = 2$, $f(2) = 4$", isCorrect: true, feedback: "$f'(x) = -2x + 4 = 0$ → $x = 2$, $f(2) = -4 + 8 = 4$ ✓" },
        { label: "$x = 4$, $f(4) = 0$", isCorrect: false, feedback: "V $x = 4$ je $f'(4) = -4 < 0$, funkce klesá." },
        { label: "$x = 0$, $f(0) = 0$", isCorrect: false, feedback: "$f'(0) = 4 > 0$, funkce tam roste." },
      ],
      explanation: "$f'(x) = -2x + 4 = 0$ → $x = 2$. $f''(x) = -2 < 0$ → maximum.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Derivace = okamžitá rychlost změny = sklon tečny.",
      "$(x^n)' = nx^{n-1}$, $(e^x)' = e^x$, $(\\ln x)' = \\frac{1}{x}$.",
      "$f'(x) = 0$ v stacionárních bodech (extrémy).",
      "$f'(x) > 0$ → roste, $f'(x) < 0$ → klesá.",
      "Tečna: $y = f(a) + f'(a)(x - a)$.",
    ],
  },
  nextTopicSuggestion: "integraly",
};
