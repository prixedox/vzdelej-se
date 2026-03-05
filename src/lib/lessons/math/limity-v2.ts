import type { LessonV2 } from "@/types/lesson-v2";

export const limityV2Beginner: LessonV2 = {
  title: "Limity",
  steps: [
    {
      type: "multiple-choice",
      question: "Posloupnost $a_n = \\frac{1}{n}$: $1, \\frac{1}{2}, \\frac{1}{3}, \\frac{1}{4}, \\ldots$ se blíží k:",
      choices: [
        { label: "$1$", isCorrect: false, feedback: "To je jen první člen." },
        { label: "$0$", isCorrect: true, feedback: "Správně! Čím větší $n$, tím blíže k nule." },
        { label: "$\\infty$", isCorrect: false, feedback: "Naopak — členy se zmenšují." },
      ],
      explanation: "$\\lim_{n \\to \\infty} \\frac{1}{n} = 0$. Posloupnost se blíží k nule, ale nikdy ji nedosáhne.",
    },
    {
      type: "explain",
      body: "**Limita posloupnosti**: hodnota, ke které se členy posloupnosti přibližují pro $n \\to \\infty$.\n\n$$\\lim_{n \\to \\infty} a_n = L$$\n\nPokud taková $L$ existuje, říkáme, že posloupnost **konverguje**. Jinak **diverguje**.",
      callout: "Definice",
    },
    {
      type: "text-input",
      question: "Jaká je $\\lim_{n \\to \\infty} \\frac{3n + 1}{n}$?",
      expectedAnswer: "3",
      explanation: "$\\frac{3n + 1}{n} = 3 + \\frac{1}{n} \\to 3 + 0 = 3$.",
      hints: ["Vydělte čitatel i jmenovatel $n$."],
    },
    {
      type: "explain",
      body: "**Limita podílu polynomů** $\\frac{a_n x^n + \\ldots}{b_m x^m + \\ldots}$ pro $x \\to \\infty$:\n\n- Stejný stupeň ($n = m$): limita = $\\frac{a_n}{b_m}$\n- Čitatel vyššího stupně ($n > m$): $\\pm \\infty$\n- Jmenovatel vyššího stupně ($n < m$): $0$",
      callout: "Pravidlo",
    },
    {
      type: "multiple-choice",
      question: "$\\lim_{n \\to \\infty} \\frac{2n^2 + 1}{5n^2 - 3} = \\;?$",
      choices: [
        { label: "$\\frac{2}{5}$", isCorrect: true, feedback: "Stejný stupeň → poměr vedoucích koeficientů." },
        { label: "$0$", isCorrect: false, feedback: "Nula vyjde, jen když je jmenovatel vyššího stupně." },
        { label: "$\\infty$", isCorrect: false, feedback: "Oba polynomy jsou 2. stupně → limita je konečná." },
      ],
      explanation: "Oba stupně 2. $\\lim = \\frac{2}{5}$.",
    },
    {
      type: "explain",
      body: "**Limita funkce** v bodě $a$:\n\n$$\\lim_{x \\to a} f(x) = L$$\n\nHodnota, ke které se $f(x)$ blíží, když $x$ se blíží k $a$ (ale nemusí být v $a$ definována!).\n\nPříklad: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = 1$ (i když zlomek není definován v $x = 0$).",
    },
    {
      type: "text-input",
      question: "$\\lim_{x \\to 2} (x^2 - 1) = \\;?$",
      expectedAnswer: "3",
      explanation: "Funkce je spojitá, stačí dosadit: $2^2 - 1 = 3$.",
    },
    {
      type: "explain",
      body: "**Neurčité výrazy** — nelze přímo dosadit, výsledek vypadá jako:\n\n$\\frac{0}{0}$, $\\frac{\\infty}{\\infty}$, $0 \\cdot \\infty$, $\\infty - \\infty$, ...\n\nŘešení: algebraická úprava (zkrácení, rozklad) nebo l'Hospitalovo pravidlo.",
      callout: "Neurčité výrazy",
    },
    {
      type: "multiple-choice",
      question: "$\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$ dává po dosazení $\\frac{0}{0}$. Jak to vyřešíme?",
      choices: [
        { label: "Rozložíme $x^2 - 9 = (x-3)(x+3)$ a zkrátíme", isCorrect: true, feedback: "Ano! Po zkrácení: $\\lim_{x \\to 3} (x + 3) = 6$." },
        { label: "Limita neexistuje", isCorrect: false, feedback: "$\\frac{0}{0}$ neznamená, že limita neexistuje!" },
        { label: "Výsledek je $0$", isCorrect: false, feedback: "Po úpravě dostaneme $6$, ne $0$." },
      ],
      explanation: "$\\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3$ pro $x \\neq 3$. Limita: $3 + 3 = 6$.",
    },
    {
      type: "text-input",
      question: "$\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = \\;?$",
      expectedAnswer: "2",
      explanation: "$\\frac{(x-1)(x+1)}{x-1} = x + 1 \\to 2$.",
      hints: ["Rozložte $x^2 - 1$ na součin."],
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky řešení $\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}$:",
      items: [
        "Dosadíme: $\\frac{0}{0}$ — neurčitý výraz",
        "Rozšíříme $(\\sqrt{x} + 2)$: čitatel $= (\\sqrt{x}-2)(\\sqrt{x}+2) = x - 4$",
        "Zkrátíme: $\\frac{x-4}{\\sqrt{x}-2} \\cdot \\frac{1}{1} = \\sqrt{x} + 2$",
        "Limita: $\\sqrt{4} + 2 = 4$",
      ],
      explanation: "Trik se sdruženým výrazem: rozšíříme $\\frac{\\sqrt{x}+2}{\\sqrt{x}+2}$.",
    },
    {
      type: "reveal",
      question: "Co je l'Hospitalovo pravidlo?",
      revealedContent: "Pro neurčité výrazy $\\frac{0}{0}$ nebo $\\frac{\\infty}{\\infty}$:\n\n$$\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$$\n\nDerivujeme čitatele a jmenovatele **zvlášť** (ne jako zlomek!). Potřebujeme znát derivace — to je téma další lekce.",
    },
    {
      type: "text-input",
      question: "$\\lim_{n \\to \\infty} \\frac{n + 5}{3n - 1} = \\;?$ (jako zlomek)",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3"],
      explanation: "Vydělíme $n$: $\\frac{1 + 5/n}{3 - 1/n} \\to \\frac{1}{3}$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Limita = hodnota, ke které se výraz blíží.",
      "Podíl polynomů stejného stupně → poměr vedoucích koeficientů.",
      "Neurčité výrazy ($\\frac{0}{0}$, ...) řešíme úpravou (rozklad, zkrácení, rozšíření).",
      "Spojitou funkci stačí dosadit.",
      "L'Hospitalovo pravidlo: derivujeme čitatele a jmenovatele zvlášť.",
    ],
  },
  nextTopicSuggestion: "derivace",
};
