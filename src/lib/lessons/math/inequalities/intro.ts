import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Nerovnice -- základy",
  steps: [
    // 1 — Hook
    {
      type: "multiple-choice",
      question:
        "Máte v kapse 50 Kč a zmrzlina stojí $x$ Kč. Kdy si ji můžete koupit?\n\nZapíšeme: $x \\leq 50$. Co tato nerovnice říká?",
      choices: [
        {
          label: "Zmrzlina stojí přesně 50 Kč",
          isCorrect: false,
          feedback: "To by byla rovnice $x = 50$, ne nerovnice.",
        },
        {
          label: "Zmrzlina stojí nejvýše 50 Kč",
          isCorrect: true,
          feedback: "Správně! Znak $\\leq$ znamená menší nebo rovno.",
        },
        {
          label: "Zmrzlina stojí víc než 50 Kč",
          isCorrect: false,
          feedback: "To by bylo $x > 50$ — opačná nerovnost.",
        },
      ],
      explanation:
        "Nerovnice vyjadřuje, že jedna strana je větší (nebo menší) než druhá. Řešením je **množina** hodnot, ne jedno číslo.",
    },

    // 2 — Explain: inequality symbols
    {
      type: "explain",
      body: "**Znaky nerovnosti**:\n- $<$ ... menší než\n- $>$ ... větší než\n- $\\leq$ ... menší nebo rovno\n- $\\geq$ ... větší nebo rovno\n\nNerovnici řešíme podobně jako rovnici — smíme přičítat, odčítat, násobit, dělit. Ale pozor na jedno důležité pravidlo!",
      callout: "Základní znaky",
    },

    // 3 — MC: the critical rule
    {
      type: "multiple-choice",
      question:
        "Co se stane se znakem nerovnosti, když obě strany **vynásobíme záporným číslem**?",
      choices: [
        {
          label: "Nic, znak zůstává stejný",
          isCorrect: false,
          feedback: "Zkuste: $2 < 5$. Vynásobte $(-1)$: $-2 \\;?\\; -5$. Je $-2 < -5$?",
        },
        {
          label: "Znak se otočí (změní směr)",
          isCorrect: true,
          feedback: "Přesně! $2 < 5$ → $-2 > -5$. Při násobení/dělení záporným číslem otáčíme znak.",
        },
        {
          label: "Nerovnice přestane platit",
          isCorrect: false,
          feedback: "Nerovnice pořád platí, jen musíme otočit znak.",
        },
      ],
      explanation:
        "Klíčové pravidlo: při **násobení nebo dělení záporným číslem** se znak nerovnosti **otáčí**. To je jediný rozdíl oproti řešení rovnic.",
    },

    // 4 — Explain: solving like equations
    {
      type: "explain",
      body: "Příklad: $2x + 3 > 7$\n\n1. Odečteme 3: $2x > 4$\n2. Dělíme 2 (kladné!): $x > 2$\n\nŘešením jsou **všechna čísla větší než 2**, tedy interval $(2; +\\infty)$.",
      callout: "Postup",
    },

    // 5 — Text input: basic inequality
    {
      type: "text-input",
      question:
        "Vyřešte: $3x - 6 > 0$.\n\nZapište výsledek ve tvaru $x > ?$ (jen číslo).",
      expectedAnswer: "2",
      acceptableAnswers: ["x>2", "x > 2"],
      explanation:
        "$3x - 6 > 0$ → $3x > 6$ → $x > 2$.",
      hints: ["Přičtěte 6 k oběma stranám."],
    },

    // 6 — MC: negative multiplication
    {
      type: "multiple-choice",
      question: "Vyřešte: $-2x \\geq 6$",
      choices: [
        {
          label: "$x \\geq -3$",
          isCorrect: false,
          feedback: "Při dělení záporným číslem musíte otočit znak!",
        },
        {
          label: "$x \\leq -3$",
          isCorrect: true,
          feedback: "Správně! Dělíme $(-2)$ a otáčíme $\\geq$ na $\\leq$.",
        },
        {
          label: "$x \\leq 3$",
          isCorrect: false,
          feedback: "Pozor na znaménko: $6 \\div (-2) = -3$, ne $3$.",
        },
      ],
      explanation:
        "$-2x \\geq 6$ → dělíme $(-2)$, **otáčíme znak** → $x \\leq -3$.",
    },

    // 7 — Explain: interval notation
    {
      type: "explain",
      body: "Řešení nerovnice zapisujeme jako **interval**:\n\n| Nerovnice | Interval |\n|---|---|\n| $x > 2$ | $(2; +\\infty)$ |\n| $x \\leq 5$ | $(-\\infty; 5\\rangle$ |\n| $1 < x \\leq 4$ | $(1; 4\\rangle$ |\n\nKulatá závorka = hraniční bod **nepatří**, hranatá = **patří**.",
      callout: "Intervaly",
    },

    // 8 — MC: interval
    {
      type: "multiple-choice",
      question:
        "Řešení nerovnice $x + 3 \\leq 8$ zapíšeme jako interval:",
      choices: [
        {
          label: "$(-\\infty; 5\\rangle$",
          isCorrect: true,
          feedback: "$x \\leq 5$ — pětka patří do řešení (hranatá závorka).",
        },
        {
          label: "$(-\\infty; 5)$",
          isCorrect: false,
          feedback: "Kulatá závorka by znamenala $x < 5$, ale my máme $\\leq$.",
        },
        {
          label: "$\\langle 5; +\\infty)$",
          isCorrect: false,
          feedback: "To by bylo $x \\geq 5$ — opačný směr.",
        },
      ],
      explanation:
        "$x + 3 \\leq 8$ → $x \\leq 5$. V intervalu: $(-\\infty; 5\\rangle$.",
    },

    // 9 — Text input: solve and write interval boundary
    {
      type: "text-input",
      question:
        "Vyřešte $4x - 1 < 11$. Jaké je hraniční číslo?",
      expectedAnswer: "3",
      acceptableAnswers: ["x<3", "x < 3"],
      explanation:
        "$4x - 1 < 11$ → $4x < 12$ → $x < 3$. Interval: $(-\\infty; 3)$.",
    },

    // 10 — Explain: compound inequalities
    {
      type: "explain",
      body: "**Složená nerovnice** omezuje $x$ z obou stran:\n\n$$1 < 2x + 3 \\leq 9$$\n\nŘešíme \"na třikrát\" — odečteme 3 a dělíme 2:\n$$-2 < 2x \\leq 6$$\n$$-1 < x \\leq 3$$",
    },

    // 11 — Text input: compound
    {
      type: "text-input",
      question:
        "Vyřešte: $-3 \\leq 2x - 1 < 5$.\n\nZapište levou mez (celé číslo, $x \\geq \\;?$).",
      expectedAnswer: "-1",
      acceptableAnswers: ["-1"],
      wrongAnswerFeedback: {
        "-2": "Pozor: $-3 + 1 = -2$, ale pak ještě dělíme 2.",
      },
      explanation:
        "Přičteme 1: $-2 \\leq 2x < 6$. Dělíme 2: $-1 \\leq x < 3$.",
      hints: ["Ke všem třem částem přičtěte 1, pak vydělte 2."],
    },

    // 12 — Sort order: solving steps
    {
      type: "sort-order",
      question:
        "Seřaďte kroky řešení nerovnice $-3x + 6 > 0$:",
      items: [
        "Odečteme 6: $-3x > -6$",
        "Dělíme $(-3)$ a otočíme znak: $x < 2$",
        "Zapíšeme interval: $(-\\infty; 2)$",
      ],
      explanation:
        "Nezapomínejte otočit znak při dělení záporným číslem!",
    },

    // 13 — Reveal: why flip the sign
    {
      type: "reveal",
      question:
        "Proč se při násobení záporným číslem otáčí znak nerovnosti?",
      revealedContent:
        "Na číselné ose násobení $(-1)$ **zrcadlí** všechna čísla kolem nuly. Co bylo vlevo (menší), se ocitne vpravo (větší) a naopak.\n\nPříklad: $3 < 5$, ale $-3 > -5$.",
    },

    // 14 — Text input: with negative coefficient
    {
      type: "text-input",
      question:
        "Vyřešte: $-5x + 10 \\geq 0$. Zapište hraniční hodnotu $x$.",
      expectedAnswer: "2",
      acceptableAnswers: ["x<=2", "x ≤ 2", "x \\leq 2"],
      explanation:
        "$-5x \\geq -10$ → dělíme $(-5)$, otáčíme: $x \\leq 2$.",
    },

    // 15 — MC: word problem
    {
      type: "multiple-choice",
      question:
        "Taxi účtuje 40 Kč nástup + 20 Kč/km. Máte 200 Kč. Kolik km nejvýše ujedete?\n\n($40 + 20x \\leq 200$)",
      choices: [
        {
          label: "Nejvýše 7 km",
          isCorrect: false,
          feedback: "$40 + 20 \\cdot 7 = 180 \\leq 200$ ✓, ale zvládnete víc.",
        },
        {
          label: "Nejvýše 8 km",
          isCorrect: true,
          feedback: "$40 + 20 \\cdot 8 = 200 \\leq 200$ ✓ — přesně se vejdete.",
        },
        {
          label: "Nejvýše 10 km",
          isCorrect: false,
          feedback: "$40 + 20 \\cdot 10 = 240 > 200$ — to už nestačí.",
        },
      ],
      explanation:
        "$20x \\leq 160$ → $x \\leq 8$. Ujedete nejvýše 8 km.",
    },

    // 16 — Text input: final challenge
    {
      type: "text-input",
      question:
        "Vyřešte: $\\frac{x + 1}{2} > 3$. Jaká je dolní mez (číslo)?",
      expectedAnswer: "5",
      acceptableAnswers: ["x>5", "x > 5"],
      explanation:
        "Vynásobíme 2: $x + 1 > 6$ → $x > 5$. Interval: $(5; +\\infty)$.",
      hints: ["Vynásobte obě strany 2 (kladné, neotáčíme)."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Nerovnice řešíme stejně jako rovnice — přičítáme, odčítáme, násobíme, dělíme.",
      "Při **násobení/dělení záporným číslem** otáčíme znak nerovnosti.",
      "Řešením nerovnice je **interval** (množina čísel), ne jedno číslo.",
      "Intervaly: kulatá závorka = bod nepatří, hranatá = patří.",
      "Složené nerovnice ($a < f(x) \\leq b$) řešíme na třikrát.",
    ],
  },
  nextTopicSuggestion: "vyrazove-upravy",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "inequalities",
  order: 1,
  title: "Nerovnice -- základy",
  lesson,
};
