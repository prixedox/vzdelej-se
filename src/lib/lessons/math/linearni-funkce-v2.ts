import type { LessonV2 } from "@/types/lesson-v2";

export const linearniFunkceV2Beginner: LessonV2 = {
  title: "Lineární funkce",
  steps: [
    {
      type: "multiple-choice",
      question:
        "Taxi účtuje 30 Kč nástup a 15 Kč za každý kilometr. Kolik zaplatíte za 4 km jízdu?",
      choices: [
        { label: "$60$ Kč", isCorrect: false, feedback: "To je jen $4 \\times 15$. Nezapomeňte na nástupní taxu." },
        { label: "$90$ Kč", isCorrect: true, feedback: "$30 + 15 \\cdot 4 = 90$ Kč ✓" },
        { label: "$120$ Kč", isCorrect: false, feedback: "$30 \\cdot 4 = 120$ — ale nástup se platí jen jednou." },
      ],
      explanation:
        "Cena závisí lineárně na vzdálenosti: $f(x) = 15x + 30$. To je lineární funkce.",
    },
    {
      type: "explain",
      body: "**Lineární funkce** má tvar:\n\n$$f(x) = kx + q$$\n\n- $k$ = **směrnice** (sklon přímky, o kolik roste $f(x)$ při zvýšení $x$ o 1)\n- $q$ = **absolutní člen** (průsečík s osou $y$, hodnota $f(0)$)",
      callout: "Definice",
    },
    {
      type: "multiple-choice",
      question: "U funkce $f(x) = -2x + 5$ je směrnice $k$ a absolutní člen $q$:",
      choices: [
        { label: "$k = -2$, $q = 5$", isCorrect: true, feedback: "Přesně — sklon je $-2$, graf protíná osu $y$ v bodě $5$." },
        { label: "$k = 5$, $q = -2$", isCorrect: false, feedback: "Směrnice je koeficient u $x$, tedy $-2$." },
        { label: "$k = 2$, $q = 5$", isCorrect: false, feedback: "Pozor na znaménko: $k = -2$." },
      ],
      explanation: "V $f(x) = kx + q$ čteme $k$ jako koeficient u $x$ a $q$ jako volný člen.",
    },
    {
      type: "explain",
      body: "**Směrnice** $k$ udává sklon:\n- $k > 0$: funkce **roste** (přímka stoupá zleva doprava)\n- $k < 0$: funkce **klesá**\n- $k = 0$: konstantní funkce (vodorovná přímka)\n\nČím větší $|k|$, tím strmější přímka.",
    },
    {
      type: "text-input",
      question:
        "Přímka prochází body $[0; 3]$ a $[2; 7]$. Jaká je směrnice $k$?",
      expectedAnswer: "2",
      acceptableAnswers: ["k=2", "k = 2"],
      explanation:
        "$k = \\frac{y_2 - y_1}{x_2 - x_1} = \\frac{7 - 3}{2 - 0} = \\frac{4}{2} = 2$.",
      hints: ["$k = \\frac{\\Delta y}{\\Delta x}$."],
    },
    {
      type: "text-input",
      question:
        "Jaký je předpis funkce, jejíž graf prochází body $[0; 3]$ a $[2; 7]$?\n\nZapište $q$ (absolutní člen).",
      expectedAnswer: "3",
      acceptableAnswers: ["q=3", "q = 3"],
      explanation:
        "Bod $[0; 3]$ leží na ose $y$, takže $q = f(0) = 3$. Předpis: $f(x) = 2x + 3$.",
    },
    {
      type: "explain",
      body: "**Průsečík s osou $x$** (nulový bod): položíme $f(x) = 0$.\n\n$$kx + q = 0 \\Rightarrow x = -\\frac{q}{k}$$\n\nPříklad: $f(x) = 2x - 6$ → nulový bod: $x = 3$, tedy bod $[3; 0]$.",
    },
    {
      type: "text-input",
      question: "Kde protíná přímka $f(x) = -3x + 9$ osu $x$? (Zadejte hodnotu $x$.)",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "x = 3"],
      explanation: "$-3x + 9 = 0 \\Rightarrow x = 3$. Průsečík s osou $x$: $[3; 0]$.",
    },
    {
      type: "multiple-choice",
      question: "Dvě přímky $f(x) = 2x + 1$ a $g(x) = 2x - 3$ jsou:",
      choices: [
        { label: "Rovnoběžné", isCorrect: true, feedback: "Ano! Stejná směrnice $k = 2$ → rovnoběžky." },
        { label: "Kolmé", isCorrect: false, feedback: "Kolmé přímky mají $k_1 \\cdot k_2 = -1$." },
        { label: "Totožné", isCorrect: false, feedback: "Mají stejné $k$, ale různé $q$ → různé přímky." },
      ],
      explanation: "Přímky se stejnou směrnicí jsou rovnoběžné. Protínají se, jen když $k_1 \\neq k_2$.",
    },
    {
      type: "explain",
      body: "**Kolmé přímky**: jejich směrnice splňují $k_1 \\cdot k_2 = -1$.\n\nPříklad: $f(x) = 2x + 1$ a $g(x) = -\\frac{1}{2}x + 3$ jsou kolmé, protože $2 \\cdot (-\\frac{1}{2}) = -1$.",
      callout: "Kolmost",
    },
    {
      type: "multiple-choice",
      question: "Která přímka je kolmá na $f(x) = 3x + 2$?",
      choices: [
        { label: "$g(x) = -3x + 1$", isCorrect: false, feedback: "$3 \\cdot (-3) = -9 \\neq -1$." },
        { label: "$g(x) = -\\frac{1}{3}x + 4$", isCorrect: true, feedback: "$3 \\cdot (-\\frac{1}{3}) = -1$ ✓" },
        { label: "$g(x) = \\frac{1}{3}x - 1$", isCorrect: false, feedback: "$3 \\cdot \\frac{1}{3} = 1 \\neq -1$." },
      ],
      explanation: "Kolmice k přímce se směrnicí $k$ má směrnici $-\\frac{1}{k}$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky: najděte předpis přímky procházející body $[1; 4]$ a $[3; 10]$.",
      items: [
        "Spočítáme $k = \\frac{10 - 4}{3 - 1} = 3$",
        "Dosadíme bod $[1; 4]$: $4 = 3 \\cdot 1 + q$",
        "Vypočítáme $q = 1$",
        "Předpis: $f(x) = 3x + 1$",
      ],
      explanation: "Postup: směrnice z dvou bodů → dosadíme jeden bod pro $q$ → zapíšeme předpis.",
    },
    {
      type: "text-input",
      question: "Najděte předpis přímky procházející body $[2; 1]$ a $[4; 5]$.\n\nZapište směrnici $k$.",
      expectedAnswer: "2",
      acceptableAnswers: ["k=2", "k = 2"],
      explanation: "$k = \\frac{5 - 1}{4 - 2} = \\frac{4}{2} = 2$.",
    },
    {
      type: "text-input",
      question: "A jaký je absolutní člen $q$ pro přímku z předchozího příkladu ($k = 2$, bod $[2; 1]$)?",
      expectedAnswer: "-3",
      acceptableAnswers: ["q=-3", "q = -3"],
      explanation: "$1 = 2 \\cdot 2 + q \\Rightarrow q = 1 - 4 = -3$. Předpis: $f(x) = 2x - 3$.",
    },
    {
      type: "reveal",
      question: "Jak souvisí lineární funkce s lineárními rovnicemi?",
      revealedContent: "Řešení rovnice $kx + q = 0$ je průsečík grafu $f(x) = kx + q$ s osou $x$.\n\nŘešení soustavy dvou lineárních rovnic je průsečík dvou přímek. Proto soustava se stejnými směrnicemi (rovnoběžky) nemá řešení.",
    },
    {
      type: "text-input",
      question: "Kde se protínají přímky $f(x) = x + 1$ a $g(x) = -x + 5$? (Zadejte $x$-ovou souřadnici.)",
      expectedAnswer: "2",
      acceptableAnswers: ["x=2", "x = 2"],
      explanation: "$x + 1 = -x + 5 \\Rightarrow 2x = 4 \\Rightarrow x = 2$. Bod: $[2; 3]$.",
      hints: ["Položte $f(x) = g(x)$ a vyřešte rovnici."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Lineární funkce: $f(x) = kx + q$, graf je přímka.",
      "Směrnice $k$ = sklon; $k > 0$ roste, $k < 0$ klesá.",
      "Průsečík s osou $y$: bod $[0; q]$. S osou $x$: $x = -q/k$.",
      "Rovnoběžné přímky: stejné $k$. Kolmé: $k_1 \\cdot k_2 = -1$.",
      "Směrnice z dvou bodů: $k = \\frac{y_2 - y_1}{x_2 - x_1}$.",
    ],
  },
  nextTopicSuggestion: "kvadraticka-funkce",
};
