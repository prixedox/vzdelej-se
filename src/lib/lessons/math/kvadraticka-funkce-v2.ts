import type { LessonV2 } from "@/types/lesson-v2";

export const kvadratickaFunkceV2Beginner: LessonV2 = {
  title: "Kvadratická funkce",
  steps: [
    {
      type: "multiple-choice",
      question: "Míč hozený vzhůru letí po dráze, kterou popisuje $y = -x^2 + 4x$. Jaká je maximální výška?",
      choices: [
        { label: "$2$", isCorrect: false, feedback: "To je $x$-souřadnice vrcholu, ne výška." },
        { label: "$4$", isCorrect: true, feedback: "Správně! Vrchol paraboly je v $[2; 4]$." },
        { label: "$8$", isCorrect: false, feedback: "Zkus dosadit $x = 2$: $-4 + 8 = 4$." },
      ],
      explanation: "Vrchol je v $x_v = -\\frac{b}{2a} = -\\frac{4}{-2} = 2$. Pak $y_v = -4 + 8 = 4$.",
    },
    {
      type: "explain",
      body: "**Kvadratická funkce** má tvar:\n\n$$f(x) = ax^2 + bx + c, \\quad a \\neq 0$$\n\nGraf je **parabola**:\n- $a > 0$: otevřená nahoru (tvar U)\n- $a < 0$: otevřená dolů (tvar ∩)",
      callout: "Definice",
    },
    {
      type: "multiple-choice",
      question: "Parabola $f(x) = -2x^2 + 3$ je otevřená:",
      choices: [
        { label: "Nahoru", isCorrect: false, feedback: "$a = -2 < 0$, takže dolů." },
        { label: "Dolů", isCorrect: true, feedback: "Ano! Záporné $a$ = parabola otevřená dolů." },
      ],
      explanation: "Znaménko $a$ určuje orientaci: $a < 0$ → parabola otevřená dolů → má maximum.",
    },
    {
      type: "explain",
      body: "**Vrchol paraboly** $V = [x_v; y_v]$:\n\n$$x_v = -\\frac{b}{2a}, \\quad y_v = f(x_v)$$\n\nVrchol je nejnižší bod ($a > 0$) nebo nejvyšší bod ($a < 0$) paraboly.",
      callout: "Vrchol",
    },
    {
      type: "text-input",
      question: "Najděte $x$-souřadnici vrcholu paraboly $f(x) = x^2 - 6x + 5$.",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "xv=3"],
      explanation: "$x_v = -\\frac{-6}{2 \\cdot 1} = \\frac{6}{2} = 3$.",
      hints: ["$x_v = -\\frac{b}{2a}$ s $a = 1$, $b = -6$."],
    },
    {
      type: "text-input",
      question: "A jaká je $y$-souřadnice vrcholu ($y_v$)?",
      expectedAnswer: "-4",
      acceptableAnswers: ["yv=-4", "y=-4"],
      explanation: "$y_v = f(3) = 9 - 18 + 5 = -4$. Vrchol: $V = [3; -4]$.",
    },
    {
      type: "explain",
      body: "**Průsečíky s osou $x$** (kořeny) najdeme řešením $ax^2 + bx + c = 0$.\n\nPočet kořenů závisí na diskriminantu $D = b^2 - 4ac$:\n- $D > 0$: dva průsečíky\n- $D = 0$: jeden (parabola se dotýká osy)\n- $D < 0$: žádný (parabola osu neprotíná)",
    },
    {
      type: "text-input",
      question: "Kolik průsečíků s osou $x$ má $f(x) = x^2 - 6x + 5$?\n\n(Spočítejte $D$.)",
      expectedAnswer: "2",
      wrongAnswerFeedback: {
        "16": "To je hodnota $D$. Ptáme se na počet průsečíků.",
      },
      explanation: "$D = 36 - 20 = 16 > 0$ → dva průsečíky. Kořeny: $x = \\frac{6 \\pm 4}{2}$, tedy $x_1 = 1$, $x_2 = 5$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky pro načrtnutí grafu $f(x) = x^2 - 4x + 3$:",
      items: [
        "Vrchol: $x_v = 2$, $y_v = -1$, tedy $V = [2; -1]$",
        "Průsečík s osou $y$: $f(0) = 3$, bod $[0; 3]$",
        "Kořeny: $D = 4$, $x_1 = 1$, $x_2 = 3$",
        "Nakreslíme parabolu otevřenou nahoru ($a = 1 > 0$)",
      ],
      explanation: "Postup: vrchol → průsečík s $y$ → kořeny → orientace a náčrt.",
    },
    {
      type: "reveal",
      question: "Co je to **vrcholový tvar** kvadratické funkce?",
      revealedContent: "$$f(x) = a(x - x_v)^2 + y_v$$\n\nPříklad: $f(x) = (x - 2)^2 - 1$ má vrchol $[2; -1]$.\n\nVrcholový tvar přímo ukazuje posuny: $x_v$ doprava, $y_v$ nahoru.",
    },
    {
      type: "multiple-choice",
      question: "Funkce $f(x) = (x + 1)^2 - 4$ má vrchol:",
      choices: [
        { label: "$[1; -4]$", isCorrect: false, feedback: "Pozor: $(x + 1)^2 = (x - (-1))^2$, takže $x_v = -1$." },
        { label: "$[-1; -4]$", isCorrect: true, feedback: "$x_v = -1$, $y_v = -4$ ✓" },
        { label: "$[-1; 4]$", isCorrect: false, feedback: "$y_v = -4$, ne $4$." },
      ],
      explanation: "Z tvaru $a(x - x_v)^2 + y_v$: $x_v = -1$, $y_v = -4$.",
    },
    {
      type: "text-input",
      question: "Jaký je průsečík funkce $f(x) = 2x^2 + 4x - 6$ s osou $y$?",
      expectedAnswer: "-6",
      acceptableAnswers: ["y=-6", "-6"],
      explanation: "Průsečík s osou $y$: $f(0) = c = -6$. Bod: $[0; -6]$.",
    },
    {
      type: "multiple-choice",
      question: "Jak se změní graf $f(x) = x^2$, když zapíšeme $g(x) = x^2 + 3$?",
      choices: [
        { label: "Posune se o 3 doleva", isCorrect: false, feedback: "Posuv doleva by byl $(x + 3)^2$." },
        { label: "Posune se o 3 nahoru", isCorrect: true, feedback: "Přičtení konstanty posouvá graf svisle." },
        { label: "Roztáhne se 3krát", isCorrect: false, feedback: "Roztažení by bylo $3x^2$." },
      ],
      explanation: "$f(x) + c$ posouvá graf o $c$ nahoru. $f(x - c)$ posouvá o $c$ doprava.",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^2 - 8x + 12$. Jaké jsou její kořeny? (menší první, oddělte středníkem)",
      expectedAnswer: "2; 6",
      acceptableAnswers: ["2;6", "2 ; 6", "2, 6"],
      explanation: "$D = 64 - 48 = 16$. $x = \\frac{8 \\pm 4}{2}$: $x_1 = 2$, $x_2 = 6$. Rozklad: $(x-2)(x-6)$.",
      hints: ["$D = b^2 - 4ac = 64 - 48$."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Kvadratická funkce: $f(x) = ax^2 + bx + c$, graf je parabola.",
      "$a > 0$: parabola nahoru (minimum), $a < 0$: dolů (maximum).",
      "Vrchol: $x_v = -\\frac{b}{2a}$, $y_v = f(x_v)$.",
      "Kořeny: $D = b^2 - 4ac$ určuje počet průsečíků s osou $x$.",
      "Vrcholový tvar: $f(x) = a(x - x_v)^2 + y_v$.",
    ],
  },
  nextTopicSuggestion: "exponencialni-funkce",
};
