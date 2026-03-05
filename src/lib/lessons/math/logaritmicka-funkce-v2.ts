import type { LessonV2 } from "@/types/lesson-v2";

export const logaritmickaFunkceV2Beginner: LessonV2 = {
  title: "Logaritmická funkce",
  steps: [
    {
      type: "multiple-choice",
      question: "Pokud $2^x = 8$, pak $x = \\log_2 8$. Kolik je $\\log_2 8$?",
      choices: [
        { label: "$2$", isCorrect: false, feedback: "$2^2 = 4 \\neq 8$." },
        { label: "$3$", isCorrect: true, feedback: "$2^3 = 8$, takže $\\log_2 8 = 3$ ✓" },
        { label: "$4$", isCorrect: false, feedback: "$2^4 = 16 \\neq 8$." },
      ],
      explanation: "$\\log_a b = c$ znamená $a^c = b$. Logaritmus je **inverzní operace** k umocňování.",
    },
    {
      type: "explain",
      body: "**Logaritmus** $\\log_a b$ odpovídá na otázku: na jakou mocninu musím umocnit základ $a$, abych dostal $b$?\n\n$$\\log_a b = c \\iff a^c = b$$\n\nPříklady: $\\log_{10} 100 = 2$, $\\log_3 27 = 3$, $\\log_5 1 = 0$.",
      callout: "Definice",
    },
    {
      type: "text-input",
      question: "Kolik je $\\log_3 81$?",
      expectedAnswer: "4",
      explanation: "$3^4 = 81$, tedy $\\log_3 81 = 4$.",
      hints: ["$81 = 3^?$"],
    },
    {
      type: "text-input",
      question: "Kolik je $\\log_{10} 1000$?",
      expectedAnswer: "3",
      acceptableAnswers: ["3"],
      explanation: "$10^3 = 1000$.",
    },
    {
      type: "explain",
      body: "Speciální logaritmy:\n\n- $\\log_{10} x = \\log x$ ... **dekadický** (common log)\n- $\\log_e x = \\ln x$ ... **přirozený** ($e \\approx 2{,}718$)\n\nV české matematice často píšeme $\\log$ pro dekadický logaritmus.",
      callout: "Značení",
    },
    {
      type: "explain",
      body: "**Pravidla pro logaritmy** (odpovídají pravidlům pro mocniny):\n\n- $\\log_a (xy) = \\log_a x + \\log_a y$\n- $\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$\n- $\\log_a x^n = n \\cdot \\log_a x$\n- $\\log_a 1 = 0$, $\\log_a a = 1$",
      callout: "Pravidla",
    },
    {
      type: "multiple-choice",
      question: "Zjednodušte $\\log_2 4 + \\log_2 8$.",
      choices: [
        { label: "$\\log_2 12$", isCorrect: false, feedback: "Logaritmy se nesčítají takto — sčítání log = logaritmus součinu." },
        { label: "$\\log_2 32 = 5$", isCorrect: true, feedback: "$\\log_2(4 \\cdot 8) = \\log_2 32 = 5$ ✓" },
        { label: "$5$, ale jiným postupem", isCorrect: false, feedback: "Správný výsledek, ale i postup: $\\log_2 4 + \\log_2 8 = 2 + 3 = 5 = \\log_2 32$." },
      ],
      explanation: "$\\log_a x + \\log_a y = \\log_a(xy)$. Tedy $\\log_2 4 + \\log_2 8 = \\log_2 32 = 5$.",
    },
    {
      type: "text-input",
      question: "Zjednodušte $\\log_5 50 - \\log_5 2$.",
      expectedAnswer: "2",
      explanation: "$\\log_5 \\frac{50}{2} = \\log_5 25 = 2$.",
      hints: ["Rozdíl logaritmů = logaritmus podílu."],
    },
    {
      type: "text-input",
      question: "Kolik je $\\log_2 2^7$?",
      expectedAnswer: "7",
      explanation: "$\\log_a a^n = n$. Tedy $\\log_2 2^7 = 7$.",
    },
    {
      type: "explain",
      body: "**Logaritmická rovnice**: rovnice, kde neznámá je v argumentu logaritmu.\n\nPostup: převedeme na exponenciální tvar.\n\n$$\\log_2 x = 5 \\Rightarrow x = 2^5 = 32$$\n\nNezapomeňte ověřit podmínky: argument logaritmu musí být kladný ($x > 0$).",
    },
    {
      type: "text-input",
      question: "Vyřešte $\\log_3 x = 4$.",
      expectedAnswer: "81",
      acceptableAnswers: ["x=81", "x = 81"],
      explanation: "$x = 3^4 = 81$.",
    },
    {
      type: "multiple-choice",
      question: "Vyřešte $\\log_2(x - 1) = 3$.",
      choices: [
        { label: "$x = 8$", isCorrect: false, feedback: "$\\log_2(8 - 1) = \\log_2 7 \\neq 3$." },
        { label: "$x = 9$", isCorrect: true, feedback: "$x - 1 = 2^3 = 8$, tedy $x = 9$. A $9 - 1 = 8 > 0$ ✓" },
        { label: "$x = 4$", isCorrect: false, feedback: "$x - 1 = 3$, ale $\\log_2 3 \\neq 3$." },
      ],
      explanation: "$x - 1 = 2^3 = 8 \\Rightarrow x = 9$. Podmínka: $x - 1 > 0$, tj. $x > 1$ ✓",
    },
    {
      type: "reveal",
      question: "Jak vypadá graf logaritmické funkce?",
      revealedContent: "Graf $y = \\log_a x$ je **zrcadlový obraz** grafu $y = a^x$ podle přímky $y = x$.\n\n- Prochází bodem $[1; 0]$ (protože $\\log_a 1 = 0$)\n- Definován jen pro $x > 0$\n- Pro $a > 1$: pomalu roste do nekonečna\n- Svislá asymptota v $x = 0$",
    },
    {
      type: "sort-order",
      question: "Seřaďte od nejmenší po největší hodnotu:",
      items: [
        "$\\log_2 1 = 0$",
        "$\\log_2 4 = 2$",
        "$\\log_2 32 = 5$",
        "$\\log_2 1024 = 10$",
      ],
      explanation: "Logaritmus je rostoucí funkce: větší argument = větší hodnota logaritmu.",
    },
    {
      type: "text-input",
      question: "Vyřešte $\\log x + \\log 4 = 2$ (dekadický log). Jaké je $x$?",
      expectedAnswer: "25",
      acceptableAnswers: ["x=25", "x = 25"],
      explanation: "$\\log(4x) = 2 \\Rightarrow 4x = 10^2 = 100 \\Rightarrow x = 25$.",
      hints: ["Sečtěte logaritmy: $\\log(4x) = 2$."],
    },
  ],
  summary: {
    keyTakeaways: [
      "$\\log_a b = c$ znamená $a^c = b$. Logaritmus je inverze k umocnění.",
      "Pravidla: $\\log(xy) = \\log x + \\log y$, $\\log\\frac{x}{y} = \\log x - \\log y$, $\\log x^n = n \\log x$.",
      "$\\log_a 1 = 0$ a $\\log_a a = 1$.",
      "Logaritmické rovnice převádíme na exponenciální tvar.",
      "Podmínka: argument logaritmu musí být kladný.",
    ],
  },
  nextTopicSuggestion: "goniometricke-funkce",
};
