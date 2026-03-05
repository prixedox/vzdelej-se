import type { LessonV2 } from "@/types/lesson-v2";

export const absolutniHodnotaV2Beginner: LessonV2 = {
  title: "Funkce s absolutní hodnotou",
  steps: [
    {
      type: "multiple-choice",
      question: "Kolik je $|-7|$?",
      choices: [
        { label: "$-7$", isCorrect: false, feedback: "Absolutní hodnota je vždy nezáporná." },
        { label: "$7$", isCorrect: true, feedback: "Správně! Absolutní hodnota udává vzdálenost od nuly." },
        { label: "$0$", isCorrect: false, feedback: "$|-7|$ je vzdálenost $-7$ od nuly, tedy $7$." },
      ],
      explanation: "$|x|$ je **vzdálenost** čísla $x$ od nuly na číselné ose. Vždy nezáporná.",
    },
    {
      type: "explain",
      body: "**Absolutní hodnota**:\n\n$$|x| = \\begin{cases} x & \\text{pro } x \\geq 0 \\\\ -x & \\text{pro } x < 0 \\end{cases}$$\n\nPříklady: $|5| = 5$, $|-3| = 3$, $|0| = 0$.",
      callout: "Definice",
    },
    {
      type: "text-input",
      question: "Kolik je $|3 - 8|$?",
      expectedAnswer: "5",
      explanation: "$3 - 8 = -5$, tedy $|-5| = 5$.",
    },
    {
      type: "explain",
      body: "Graf funkce $f(x) = |x|$ vypadá jako **písmeno V** s vrcholem v počátku.\n\n- Pro $x \\geq 0$: $f(x) = x$ (přímka se sklonem $1$)\n- Pro $x < 0$: $f(x) = -x$ (přímka se sklonem $-1$)\n\nGraf $|x - a|$ posouvá vrchol do bodu $[a; 0]$.",
    },
    {
      type: "multiple-choice",
      question: "Kde má funkce $f(x) = |x - 3|$ svůj vrchol (minimum)?",
      choices: [
        { label: "V bodě $[0; 3]$", isCorrect: false, feedback: "$f(0) = |0 - 3| = 3$, ale to není minimum." },
        { label: "V bodě $[3; 0]$", isCorrect: true, feedback: "Ano! $f(3) = |3 - 3| = 0$ — to je minimum." },
        { label: "V bodě $[-3; 0]$", isCorrect: false, feedback: "$f(-3) = |-3 - 3| = 6 \\neq 0$." },
      ],
      explanation: "$|x - a| = 0$ právě když $x = a$. Vrchol V je v bodě $[a; 0]$.",
    },
    {
      type: "explain",
      body: "**Rovnice s absolutní hodnotou**: $|x| = a$ (kde $a \\geq 0$) má dvě řešení:\n\n$$x = a \\quad \\text{nebo} \\quad x = -a$$\n\nPříklad: $|x| = 5 \\Rightarrow x = 5$ nebo $x = -5$.",
      callout: "Rovnice",
    },
    {
      type: "text-input",
      question: "Vyřešte $|x - 2| = 4$. Jaké je **větší** řešení?",
      expectedAnswer: "6",
      acceptableAnswers: ["x=6", "x = 6"],
      wrongAnswerFeedback: {
        "-2": "To je menší řešení. Ptáme se na větší.",
      },
      explanation: "$x - 2 = 4 \\Rightarrow x = 6$ nebo $x - 2 = -4 \\Rightarrow x = -2$.",
      hints: ["Rozepište na dva případy: $x - 2 = 4$ a $x - 2 = -4$."],
    },
    {
      type: "text-input",
      question: "A jaké je **menší** řešení rovnice $|x - 2| = 4$?",
      expectedAnswer: "-2",
      acceptableAnswers: ["x=-2", "x = -2"],
      explanation: "$x - 2 = -4 \\Rightarrow x = -2$.",
    },
    {
      type: "multiple-choice",
      question: "Kolik řešení má rovnice $|x| = -3$?",
      choices: [
        { label: "Dvě: $x = 3$ a $x = -3$", isCorrect: false, feedback: "Absolutní hodnota nemůže být záporná!" },
        { label: "Žádné", isCorrect: true, feedback: "Správně! $|x| \\geq 0$ vždy, takže $|x| = -3$ nemá řešení." },
        { label: "Jedno: $x = -3$", isCorrect: false, feedback: "$|-3| = 3 \\neq -3$." },
      ],
      explanation: "Absolutní hodnota je vždy $\\geq 0$. Rovnice $|x| = a$ pro $a < 0$ nemá řešení.",
    },
    {
      type: "explain",
      body: "**Nerovnice s absolutní hodnotou**:\n\n- $|x| < a$ $\\Leftrightarrow$ $-a < x < a$ (interval kolem nuly)\n- $|x| > a$ $\\Leftrightarrow$ $x < -a$ nebo $x > a$ (dvě polopřímky)\n\nPříklad: $|x| < 3$ $\\Rightarrow$ $x \\in (-3; 3)$.",
      callout: "Nerovnice",
    },
    {
      type: "multiple-choice",
      question: "Vyřešte $|x - 1| \\leq 5$.",
      choices: [
        { label: "$x \\in \\langle -4; 6 \\rangle$", isCorrect: true, feedback: "$-5 \\leq x - 1 \\leq 5$ → $-4 \\leq x \\leq 6$ ✓" },
        { label: "$x \\in (-5; 5)$", isCorrect: false, feedback: "Nezapomeňte na posuv: střed je v $x = 1$, ne v $0$." },
        { label: "$x \\in \\langle -6; 4 \\rangle$", isCorrect: false, feedback: "Pozor na znaménka: $-5 + 1 = -4$, ne $-6$." },
      ],
      explanation: "$|x - 1| \\leq 5$ → $-5 \\leq x - 1 \\leq 5$ → $-4 \\leq x \\leq 6$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky řešení $|2x + 1| = 7$:",
      items: [
        "Rozepíšeme: $2x + 1 = 7$ nebo $2x + 1 = -7$",
        "Případ 1: $2x = 6$, tedy $x = 3$",
        "Případ 2: $2x = -8$, tedy $x = -4$",
        "Řešení: $x = 3$ nebo $x = -4$",
      ],
      explanation: "Vždy rozepíšeme na dva případy (kladný a záporný obsah absolutní hodnoty).",
    },
    {
      type: "text-input",
      question: "Vyřešte $|3x - 6| = 12$. Zapište oba kořeny (menší první, středník).",
      expectedAnswer: "-2; 6",
      acceptableAnswers: ["-2;6", "-2 ; 6", "-2, 6"],
      explanation: "$3x - 6 = 12 \\Rightarrow x = 6$. $3x - 6 = -12 \\Rightarrow x = -2$.",
      hints: ["Dva případy: $3x - 6 = 12$ a $3x - 6 = -12$."],
    },
    {
      type: "reveal",
      question: "Jak vypadá graf $f(x) = |x^2 - 4|$?",
      revealedContent: "Graf $x^2 - 4$ je parabola s kořeny $x = -2$ a $x = 2$. Mezi kořeny je záporná.\n\nAbsolutní hodnota **překlopí zápornou část nahoru** — vznikne tvar s dvěma lokálními minimy v $x = \\pm 2$ (hodnota 0) a lokálním maximem v $x = 0$ (hodnota 4).",
    },
  ],
  summary: {
    keyTakeaways: [
      "$|x|$ je vzdálenost od nuly; vždy $\\geq 0$.",
      "Graf $|x|$ je V-tvar. $|x - a|$ posune vrchol do $[a; 0]$.",
      "$|f(x)| = a$ → dva případy: $f(x) = a$ nebo $f(x) = -a$.",
      "$|x| < a$ → $(-a; a)$; $|x| > a$ → $x < -a$ nebo $x > a$.",
      "Absolutní hodnota v grafu překlopí zápornou část nahoru.",
    ],
  },
  nextTopicSuggestion: "trojuhelniky",
};
