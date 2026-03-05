import type { LessonV2 } from "@/types/lesson-v2";

export const pravdepodobnostV2Beginner: LessonV2 = {
  title: "Pravděpodobnost",
  steps: [
    {
      type: "multiple-choice",
      question: "Hodíte férovým mincí. Jaká je pravděpodobnost, že padne panna?",
      choices: [
        { label: "$\\frac{1}{2}$", isCorrect: true, feedback: "Ano! Dva stejně pravděpodobné výsledky, jeden příznivý." },
        { label: "$\\frac{1}{3}$", isCorrect: false, feedback: "Mince má jen 2 strany, ne 3." },
        { label: "$1$", isCorrect: false, feedback: "Pravděpodobnost 1 = jistota. Panna nepadne vždy." },
      ],
      explanation: "$P = \\frac{\\text{příznivé výsledky}}{\\text{všechny výsledky}} = \\frac{1}{2}$.",
    },
    {
      type: "explain",
      body: "**Klasická pravděpodobnost** (Laplace):\n\n$$P(A) = \\frac{|A|}{|\\Omega|} = \\frac{\\text{počet příznivých}}{\\text{počet všech}}$$\n\nPodmínky: konečný počet **stejně pravděpodobných** výsledků.\n\n$P \\in \\langle 0; 1 \\rangle$: $0$ = nemožný jev, $1$ = jistý jev.",
      callout: "Definice",
    },
    {
      type: "text-input",
      question: "Hodíte kostkou. Jaká je pravděpodobnost, že padne číslo větší než 4? (jako zlomek)",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6", "0,33", "0.33"],
      numericTolerance: 0.01,
      explanation: "Příznivé: $\\{5, 6\\}$ = 2 výsledky. Všechny: 6. $P = \\frac{2}{6} = \\frac{1}{3}$.",
    },
    {
      type: "explain",
      body: "**Doplněk**: $P(\\bar{A}) = 1 - P(A)$.\n\nPravděpodobnost, že jev **nenastane**, je jedna mínus pravděpodobnost, že nastane.\n\nPříklad: $P(\\text{nepadne 6}) = 1 - \\frac{1}{6} = \\frac{5}{6}$.",
      callout: "Doplněk",
    },
    {
      type: "multiple-choice",
      question: "Z balíčku 52 karet vytáhnete jednu. Jaká je pravděpodobnost, že to NENÍ srdcová?",
      choices: [
        { label: "$\\frac{1}{4}$", isCorrect: false, feedback: "To je P(srdcová), ne jejího doplňku." },
        { label: "$\\frac{3}{4}$", isCorrect: true, feedback: "$1 - \\frac{13}{52} = 1 - \\frac{1}{4} = \\frac{3}{4}$ ✓" },
        { label: "$\\frac{39}{52}$", isCorrect: false, feedback: "To je správně, ale zjednodušeně $\\frac{3}{4}$. Obě odpovědi platí!" },
      ],
      explanation: "13 srdcových z 52 karet. $P(\\text{srdce}) = \\frac{1}{4}$, $P(\\text{ne srdce}) = \\frac{3}{4}$.",
    },
    {
      type: "explain",
      body: "**Sjednocení jevů** (A NEBO B):\n\n$$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$\n\nPokud se jevy **vylučují** ($A \\cap B = \\emptyset$): $P(A \\cup B) = P(A) + P(B)$.",
    },
    {
      type: "text-input",
      question: "Na kostce: P(padne 2 nebo 5) = ? (jako zlomek)",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6"],
      explanation: "Jevy se vylučují: $P = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3}$.",
    },
    {
      type: "explain",
      body: "**Průnik** nezávislých jevů (A A ZÁROVEŇ B):\n\n$$P(A \\cap B) = P(A) \\cdot P(B)$$\n\nPlatí pro **nezávislé** jevy (výsledek jednoho neovlivňuje druhý).\n\nPříklad: dva hody kostkou, P(obě šestky) = $\\frac{1}{6} \\cdot \\frac{1}{6} = \\frac{1}{36}$.",
      callout: "Nezávislost",
    },
    {
      type: "text-input",
      question: "Hodíte dvěma mincemi. Jaká je P(obě panny)? (jako zlomek)",
      expectedAnswer: "1/4",
      acceptableAnswers: ["1/4", "0,25", "0.25"],
      explanation: "$P = \\frac{1}{2} \\cdot \\frac{1}{2} = \\frac{1}{4}$.",
    },
    {
      type: "multiple-choice",
      question: "V pytli je 5 červených a 3 modré kuliček. Vytáhnete jednu. Jaká je P(červená)?",
      choices: [
        { label: "$\\frac{5}{3}$", isCorrect: false, feedback: "Pravděpodobnost nemůže být větší než 1." },
        { label: "$\\frac{5}{8}$", isCorrect: true, feedback: "5 příznivých z 8 celkem ✓" },
        { label: "$\\frac{1}{2}$", isCorrect: false, feedback: "Kuliček není stejný počet." },
      ],
      explanation: "$P = \\frac{5}{5 + 3} = \\frac{5}{8}$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte pravděpodobnosti od nejmenší po největší:",
      items: [
        "P(6 na kostce) = $\\frac{1}{6}$",
        "P(sudé číslo na kostce) = $\\frac{1}{2}$",
        "P(číslo $\\leq 5$ na kostce) = $\\frac{5}{6}$",
        "P(číslo $\\leq 6$ na kostce) = $1$",
      ],
      explanation: "$\\frac{1}{6} < \\frac{1}{2} < \\frac{5}{6} < 1$.",
    },
    {
      type: "reveal",
      question: "Co je to podmíněná pravděpodobnost?",
      revealedContent: "$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$\n\nPravděpodobnost $A$, pokud víme, že nastalo $B$.\n\nPříklad: P(sudé | číslo $> 3$) = $\\frac{P(\\{4, 6\\})}{P(\\{4, 5, 6\\})} = \\frac{2/6}{3/6} = \\frac{2}{3}$.",
    },
    {
      type: "text-input",
      question: "Hodíte 3 mincemi. Jaká je P(alespoň jedna panna)?\n\n(Tip: spočítejte doplněk — P(žádná panna).)",
      expectedAnswer: "7/8",
      acceptableAnswers: ["7/8", "0,875", "0.875"],
      explanation: "$P(\\text{žádná}) = \\frac{1}{2^3} = \\frac{1}{8}$. $P(\\text{alespoň 1}) = 1 - \\frac{1}{8} = \\frac{7}{8}$.",
      hints: ["P(žádná panna) = P(orel, orel, orel) = ?"],
    },
  ],
  summary: {
    keyTakeaways: [
      "$P(A) = \\frac{\\text{příznivé}}{\\text{všechny}}$, $P \\in \\langle 0; 1 \\rangle$.",
      "Doplněk: $P(\\bar{A}) = 1 - P(A)$.",
      "Sjednocení: $P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$.",
      "Nezávislé jevy: $P(A \\cap B) = P(A) \\cdot P(B)$.",
      "Trik s doplňkem: P(alespoň 1) = $1 - P(\\text{žádný})$.",
    ],
  },
  nextTopicSuggestion: "limity",
};
