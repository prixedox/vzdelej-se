import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Posloupnosti a řady -- základy",
  steps: [
    // 1 — Hook
    {
      type: "multiple-choice",
      question:
        "Jaké číslo následuje v řadě $2, 5, 8, 11, \\ldots$ ?",
      choices: [
        {
          label: "$13$",
          isCorrect: false,
          feedback: "Zkus najít pravidelný přírůstek: $5-2=3$, $8-5=3$, ...",
        },
        {
          label: "$14$",
          isCorrect: true,
          feedback: "Správně! Přičítáme vždy 3: $11 + 3 = 14$.",
        },
        {
          label: "$15$",
          isCorrect: false,
          feedback: "Rozdíl mezi sousedními členy je 3, ne 4.",
        },
      ],
      explanation:
        "Toto je **aritmetická posloupnost** s diferenciací $d = 3$. Každý další člen vznikne přičtením konstanty.",
    },

    // 2 — Explain: what is a sequence
    {
      type: "explain",
      body: "**Posloupnost** je uspořádaná řada čísel podle určitého pravidla. Značíme $a_1, a_2, a_3, \\ldots$ nebo $(a_n)$.\n\nKaždý člen má svůj **index** $n$ (pořadové číslo) a **hodnotu** $a_n$.",
      callout: "Definice",
    },

    // 3 — Explain: arithmetic sequence
    {
      type: "explain",
      body: "**Aritmetická posloupnost** (AP): každý člen vznikne přičtením konstanty $d$ (diference):\n\n$$a_n = a_1 + (n - 1) \\cdot d$$\n\nPříklad: $3, 7, 11, 15, \\ldots$ má $a_1 = 3$, $d = 4$.",
      callout: "Aritmetická posloupnost",
    },

    // 4 — Text input: find nth term
    {
      type: "text-input",
      question:
        "AP má $a_1 = 5$ a $d = 3$. Jaký je 10. člen $a_{10}$?",
      expectedAnswer: "32",
      acceptableAnswers: ["a10=32", "a₁₀=32"],
      wrongAnswerFeedback: {
        "35": "Pozor: vzorec je $a_1 + (n-1)d$, ne $a_1 + n \\cdot d$.",
      },
      explanation:
        "$a_{10} = 5 + (10 - 1) \\cdot 3 = 5 + 27 = 32$.",
      hints: ["Dosaďte do $a_n = a_1 + (n-1)d$."],
    },

    // 5 — MC: identify d
    {
      type: "multiple-choice",
      question:
        "Posloupnost $20, 16, 12, 8, \\ldots$ je aritmetická. Jaká je diference $d$?",
      choices: [
        {
          label: "$d = 4$",
          isCorrect: false,
          feedback: "Čísla klesají, takže $d$ musí být záporné.",
        },
        {
          label: "$d = -4$",
          isCorrect: true,
          feedback: "Správně! $16 - 20 = -4$.",
        },
        {
          label: "$d = -8$",
          isCorrect: false,
          feedback: "$12 - 16 = -4$, ne $-8$.",
        },
      ],
      explanation:
        "$d = a_2 - a_1 = 16 - 20 = -4$. Záporná diference znamená klesající posloupnost.",
    },

    // 6 — Explain: sum of AP
    {
      type: "explain",
      body: "Součet prvních $n$ členů AP:\n\n$$S_n = \\frac{n}{2}(a_1 + a_n) = \\frac{n}{2}(2a_1 + (n-1)d)$$\n\nGaussův trik: sečteme první a poslední, druhý a předposlední, ... vždy dá stejný součet.",
      callout: "Vzorec",
    },

    // 7 — Reveal: Gauss story
    {
      type: "reveal",
      question:
        "Jak malý Gauss sečetl čísla 1 až 100 během pár sekund?",
      revealedContent:
        "Napsal si dvojice: $1 + 100 = 101$, $2 + 99 = 101$, ..., $50 + 51 = 101$.\n\nTo je 50 dvojic, každá se součtem 101:\n$$S = 50 \\cdot 101 = 5050$$\n\nObecně: $S_n = \\frac{n(n+1)}{2}$ pro součet $1 + 2 + \\ldots + n$.",
    },

    // 8 — Text input: sum
    {
      type: "text-input",
      question:
        "Spočítejte součet prvních 20 členů AP $2, 5, 8, 11, \\ldots$",
      expectedAnswer: "610",
      explanation:
        "$a_1 = 2$, $d = 3$. $a_{20} = 2 + 19 \\cdot 3 = 59$. $S_{20} = \\frac{20}{2}(2 + 59) = 10 \\cdot 61 = 610$.",
      hints: [
        "Nejdřív spočítejte $a_{20}$.",
        "$S_n = \\frac{n}{2}(a_1 + a_n)$.",
      ],
    },

    // 9 — Explain: geometric sequence
    {
      type: "explain",
      body: "**Geometrická posloupnost** (GP): každý člen vznikne **vynásobením** konstantou $q$ (kvocient):\n\n$$a_n = a_1 \\cdot q^{n-1}$$\n\nPříklad: $3, 6, 12, 24, \\ldots$ má $a_1 = 3$, $q = 2$.",
      callout: "Geometrická posloupnost",
    },

    // 10 — MC: AP vs GP
    {
      type: "multiple-choice",
      question:
        "Posloupnost $1, 3, 9, 27, \\ldots$ je:",
      choices: [
        {
          label: "Aritmetická s $d = 2$",
          isCorrect: false,
          feedback: "$3 - 1 = 2$, ale $9 - 3 = 6 \\neq 2$. Diference není konstantní.",
        },
        {
          label: "Geometrická s $q = 3$",
          isCorrect: true,
          feedback: "Ano! $\\frac{3}{1} = \\frac{9}{3} = \\frac{27}{9} = 3$.",
        },
        {
          label: "Ani jedno",
          isCorrect: false,
          feedback: "Podíl sousedních členů je konstantní — to je GP.",
        },
      ],
      explanation:
        "V GP je **podíl** (ne rozdíl) sousedních členů konstantní: $q = \\frac{a_{n+1}}{a_n} = 3$.",
    },

    // 11 — Text input: GP nth term
    {
      type: "text-input",
      question:
        "GP má $a_1 = 2$ a $q = 3$. Jaký je 5. člen $a_5$?",
      expectedAnswer: "162",
      acceptableAnswers: ["a5=162"],
      explanation:
        "$a_5 = 2 \\cdot 3^{5-1} = 2 \\cdot 3^4 = 2 \\cdot 81 = 162$.",
      hints: ["$a_n = a_1 \\cdot q^{n-1}$, tedy $a_5 = 2 \\cdot 3^4$."],
    },

    // 12 — Sort order: AP vs GP properties
    {
      type: "sort-order",
      question:
        "Seřaďte pojmy tak, aby odpovídaly pořadí: AP vzorec, AP součet, GP vzorec:",
      items: [
        "$a_n = a_1 + (n-1)d$",
        "$S_n = \\frac{n}{2}(a_1 + a_n)$",
        "$a_n = a_1 \\cdot q^{n-1}$",
      ],
      explanation:
        "AP se definuje přičítáním ($d$), GP násobením ($q$). Součet AP využívá průměr prvního a posledního členu.",
    },

    // 13 — Explain: sum of GP
    {
      type: "explain",
      body: "Součet prvních $n$ členů GP ($q \\neq 1$):\n\n$$S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}$$\n\nPro $|q| < 1$ a nekonečně členů: $S = \\frac{a_1}{1 - q}$ (geometrická řada konverguje).",
    },

    // 14 — Text input: GP sum
    {
      type: "text-input",
      question:
        "GP: $a_1 = 1$, $q = 2$, $n = 6$. Spočítejte $S_6$.",
      expectedAnswer: "63",
      explanation:
        "$S_6 = 1 \\cdot \\frac{2^6 - 1}{2 - 1} = \\frac{64 - 1}{1} = 63$.",
      hints: ["$S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}$. Zde $q - 1 = 1$."],
    },

    // 15 — MC: convergence
    {
      type: "multiple-choice",
      question:
        "Nekonečná geometrická řada $1 + \\frac{1}{2} + \\frac{1}{4} + \\frac{1}{8} + \\ldots$ má součet:",
      choices: [
        {
          label: "Nekonečno (diverguje)",
          isCorrect: false,
          feedback: "Řada konverguje, protože $|q| = \\frac{1}{2} < 1$.",
        },
        {
          label: "$2$",
          isCorrect: true,
          feedback: "$S = \\frac{1}{1 - \\frac{1}{2}} = \\frac{1}{\\frac{1}{2}} = 2$.",
        },
        {
          label: "$1$",
          isCorrect: false,
          feedback: "Jen první člen je 1, ale přičítáme další kladná čísla.",
        },
      ],
      explanation:
        "Pro $|q| < 1$ platí $S = \\frac{a_1}{1 - q} = \\frac{1}{1 - 0{,}5} = 2$. Řada se blíží, ale nikdy nepřekročí 2.",
    },

    // 16 — MC: real-world
    {
      type: "multiple-choice",
      question:
        "Populace bakterií se každou hodinu zdvojnásobí. Na začátku je 100 bakterií. Kolik jich bude po 5 hodinách?",
      choices: [
        {
          label: "$1000$",
          isCorrect: false,
          feedback: "To by bylo $100 \\cdot 10$, ale zdvojnásobení je $\\times 2$.",
        },
        {
          label: "$3200$",
          isCorrect: true,
          feedback: "$100 \\cdot 2^5 = 100 \\cdot 32 = 3200$ ✓",
        },
        {
          label: "$200$",
          isCorrect: false,
          feedback: "To je po 1 hodině. Po 5 hodinách: $100 \\cdot 2^5$.",
        },
      ],
      explanation:
        "GP s $a_1 = 100$ a $q = 2$: $a_6 = 100 \\cdot 2^5 = 3200$ (6. člen = stav po 5 zdvojnásobeních).",
    },

    // 17 — Text input: challenge
    {
      type: "text-input",
      question:
        "AP má $a_3 = 10$ a $a_7 = 22$. Jaká je diference $d$?",
      expectedAnswer: "3",
      acceptableAnswers: ["d=3", "d = 3"],
      explanation:
        "$a_7 - a_3 = (a_1 + 6d) - (a_1 + 2d) = 4d = 22 - 10 = 12$. Tedy $d = 3$.",
      hints: [
        "$a_7 = a_3 + 4d$ (mezi 3. a 7. členem jsou 4 kroky).",
      ],
    },

    // 18 — Text input: final
    {
      type: "text-input",
      question:
        "Jaký je součet $1 + 2 + 3 + \\ldots + 50$?",
      expectedAnswer: "1275",
      explanation:
        "AP s $a_1 = 1$, $a_{50} = 50$: $S_{50} = \\frac{50}{2}(1 + 50) = 25 \\cdot 51 = 1275$.",
      hints: ["Gaussův vzorec: $S_n = \\frac{n(n+1)}{2}$."],
    },
  ],
  summary: {
    keyTakeaways: [
      "**Aritmetická posloupnost**: $a_n = a_1 + (n-1)d$, přičítáme konstantu $d$.",
      "Součet AP: $S_n = \\frac{n}{2}(a_1 + a_n)$.",
      "**Geometrická posloupnost**: $a_n = a_1 \\cdot q^{n-1}$, násobíme konstantou $q$.",
      "Součet GP: $S_n = a_1 \\cdot \\frac{q^n - 1}{q - 1}$.",
      "Nekonečná GP konverguje pro $|q| < 1$: $S = \\frac{a_1}{1 - q}$.",
    ],
  },
  nextTopicSuggestion: "linearni-funkce",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "sequences",
  order: 1,
  title: "Posloupnosti a řady -- základy",
  lesson,
};
