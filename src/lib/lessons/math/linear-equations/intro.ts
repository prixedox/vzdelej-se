import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Lineární rovnice – základy",
  narrative:
    "Pekař potřebuje rozdělit těsto na stejné díly, ale neví kolik gramů má každý kus. Zná jen celkovou váhu a počet kusů. Jak to spočítá? Přesně k tomu slouží rovnice — najít neznámou hodnotu z toho, co víme.",
  steps: [
    // 1 — Prediction: what happens when we solve
    {
      type: "prediction",
      scenario:
        "Představte si rovnici $\\color{#e74c3c}{x} + 3 = 7$. Chceme zjistit hodnotu $\\color{#e74c3c}{x}$.",
      question: "Co myslíte — jakou operaci musíme provést?",
      options: [
        { label: "Přičíst 3 k oběma stranám", isCorrect: false },
        { label: "Odečíst 3 od obou stran", isCorrect: true },
        { label: "Vydělit obě strany 3", isCorrect: false },
      ],
      reveal:
        "Odečtením 3 od obou stran izolujeme $\\color{#e74c3c}{x}$: $\\color{#e74c3c}{x} + 3 - \\color{#27ae60}{3} = 7 - \\color{#27ae60}{3}$, tedy $\\color{#e74c3c}{x} = 4$. Vždy používáme **opačnou operaci** k tomu, co obaluje neznámou.",
    },

    // 2 — Hook: question first
    {
      type: "multiple-choice",
      question:
        "Kolik bonbónů má Petr, když víme, že $\\color{#e74c3c}{x} + 3 = 7$?",
      choices: [
        {
          label: "$3$",
          isCorrect: false,
          feedback: "To je číslo, které přičítáme — ale hledáme $x$.",
        },
        {
          label: "$4$",
          isCorrect: true,
          feedback: "Správně! $4 + 3 = 7$.",
        },
        {
          label: "$7$",
          isCorrect: false,
          feedback: "To je pravá strana rovnice, ne hodnota $x$.",
        },
        {
          label: "$10$",
          isCorrect: false,
          feedback: "Zkus dosadit: $10 + 3 = 13 \\neq 7$.",
        },
      ],
      explanation:
        "Rovnici $x + 3 = 7$ vyřešíme odečtením 3 od obou stran: $x = 7 - 3 = 4$.",
    },

    // 3 — Explain what an equation is (with misconception)
    {
      type: "explain",
      body: "**Rovnice** je matematický zápis, který říká, že dvě strany mají stejnou hodnotu. Značíme ji znakem $=$. Naším cílem je najít **neznámou** (většinou $\\color{#e74c3c}{x}$), při které rovnost platí.",
      callout: "Klíčový pojem",
      misconception:
        "Mnoho studentů si myslí, že znaménko $=$ znamená \"spočítej výsledek\". Ve skutečnosti říká, že obě strany mají **stejnou hodnotu** — jako váhy v rovnováze.",
    },

    // 3 — Explain: balance metaphor
    {
      type: "explain",
      body: "Rovnici si představ jako **váhy v rovnováze**. Cokoli uděláš na jedné straně, musíš udělat i na druhé, aby váhy zůstaly vyrovnané. Sleduj $\\color{#e74c3c}{x}$ — vždy zůstává stejné.",
      visual: {
        type: "balance-scale",
        props: { leftItems: ["x", "3"], rightItems: ["7"] },
      },
    },

    // 4 — MC: which operation
    {
      type: "multiple-choice",
      question: "Máme $x + 5 = 12$. Jakou operaci provedeme, abychom zjistili $x$?",
      choices: [
        {
          label: "Přičteme 5 k oběma stranám",
          isCorrect: false,
          feedback: "Tím bychom $x$ od pětky neoddělili.",
        },
        {
          label: "Odečteme 5 od obou stran",
          isCorrect: true,
          feedback: "Ano! Opačná operace k sčítání je odčítání.",
        },
        {
          label: "Vydělíme obě strany 5",
          isCorrect: false,
          feedback: "Dělení by pomohlo u násobení, ne u sčítání.",
        },
      ],
      explanation:
        "Odečtením 5: $x + 5 - 5 = 12 - 5$, tedy $x = 7$. Vždy používáme **inverzní (opačnou) operaci**.",
    },

    // 5 — Explain: inverse operations
    {
      type: "explain",
      body: "Každá operace má svou **inverzní (opačnou) operaci**:\n- sčítání $\\leftrightarrow$ odčítání\n- násobení $\\leftrightarrow$ dělení\n\nInverzní operací rušíme to, co obaluje neznámou $x$.",
      callout: "Pravidlo",
    },

    // 6 — Text input: simple subtraction
    {
      type: "text-input",
      question: "Vyřešte rovnici $x + 9 = 15$. Jaká je hodnota $x$?",
      expectedAnswer: "6",
      acceptableAnswers: ["x=6", "x = 6"],
      wrongAnswerFeedback: {
        "24": "Pozor, sčítat nechceme — potřebujeme odečíst 9.",
        "9": "To je číslo, které odčítáme, ale výsledek je $15 - 9$.",
      },
      explanation: "$x + 9 = 15 \\Rightarrow x = 15 - 9 = 6$.",
      hints: ["Odečtěte 9 od obou stran."],
    },

    // 7 — Text input: subtraction variant
    {
      type: "text-input",
      question: "Vyřešte: $x - 4 = 10$",
      expectedAnswer: "14",
      acceptableAnswers: ["x=14", "x = 14"],
      wrongAnswerFeedback: {
        "6": "Pozor, tady potřebujeme přičíst 4, ne odečíst.",
      },
      explanation: "$x - 4 = 10 \\Rightarrow x = 10 + 4 = 14$.",
      hints: ["Inverzní operace k odčítání je sčítání."],
    },

    // 8 — Explain: multiplication
    {
      type: "explain",
      body: "Když je $x$ **násobena** číslem, např. $3x = 12$, použijeme dělení. Vydělíme obě strany tím samým číslem: $x = 12 \\div 3 = 4$.",
    },

    // 9 — MC: multiplication equation
    {
      type: "multiple-choice",
      question: "Kolik je $x$, když $5x = 35$?",
      choices: [
        {
          label: "$5$",
          isCorrect: false,
          feedback: "$5 \\cdot 5 = 25 \\neq 35$.",
        },
        {
          label: "$7$",
          isCorrect: true,
          feedback: "Správně! $35 \\div 5 = 7$.",
        },
        {
          label: "$30$",
          isCorrect: false,
          feedback: "Odčítání 5 by nebylo inverzní operace k násobení.",
        },
        {
          label: "$175$",
          isCorrect: false,
          feedback: "To je $5 \\cdot 35$ — ale my chceme dělit.",
        },
      ],
      explanation: "$5x = 35 \\Rightarrow x = \\frac{35}{5} = 7$.",
    },

    // 10 — Text input: division
    {
      type: "text-input",
      question: "Vyřešte: $4x = 28$",
      expectedAnswer: "7",
      acceptableAnswers: ["x=7", "x = 7"],
      explanation: "$4x = 28 \\Rightarrow x = \\frac{28}{4} = 7$.",
    },

    // 11 — Explain: two-step equations with animated solver
    {
      type: "explain",
      body: "Složitější rovnice vyžadují **dva kroky**. Sledujte animaci řešení $\\color{#2980b9}{2}\\color{#e74c3c}{x} + \\color{#27ae60}{3} = \\color{#27ae60}{11}$ krok po kroku:",
      callout: "Dva kroky",
      visual: {
        type: "animated-equation-solver",
        props: {
          steps: [
            {
              latex: "\\color{#2980b9}{2}\\color{#e74c3c}{x} + \\color{#27ae60}{3} = \\color{#27ae60}{11}",
              label: "Zadání",
            },
            {
              latex: "\\color{#2980b9}{2}\\color{#e74c3c}{x} + \\color{#27ae60}{3} - \\color{#27ae60}{3} = \\color{#27ae60}{11} - \\color{#27ae60}{3}",
              label: "Odečteme 3",
            },
            {
              latex: "\\color{#2980b9}{2}\\color{#e74c3c}{x} = \\color{#27ae60}{8}",
              label: "Zjednodušíme",
            },
            {
              latex: "\\frac{\\color{#2980b9}{2}\\color{#e74c3c}{x}}{\\color{#2980b9}{2}} = \\frac{\\color{#27ae60}{8}}{\\color{#2980b9}{2}}",
              label: "Vydělíme 2",
            },
            {
              latex: "\\color{#e74c3c}{x} = \\color{#27ae60}{4}",
              label: "Výsledek ✓",
            },
          ],
        },
      },
    },

    // 12 — Sort order: correct steps
    {
      type: "sort-order",
      question:
        "Seřaďte kroky řešení rovnice $3x + 6 = 21$ ve správném pořadí:",
      items: [
        "Odečteme 6 od obou stran: $3x = 15$",
        "Vydělíme obě strany 3: $x = 5$",
        "Zkouška: $3 \\cdot 5 + 6 = 21$ ✓",
      ],
      explanation:
        "Správné pořadí: nejdřív odstraníme sčítání, pak násobení, a nakonec ověříme zkouškou.",
    },

    // 13 — Text input: two-step
    {
      type: "text-input",
      question: "Vyřešte: $2x + 5 = 17$",
      expectedAnswer: "6",
      acceptableAnswers: ["x=6", "x = 6"],
      wrongAnswerFeedback: {
        "11": "Správně jsi odečetl 5, ale ještě potřebuješ vydělit 2.",
      },
      explanation:
        "$2x + 5 = 17 \\Rightarrow 2x = 12 \\Rightarrow x = 6$.",
      hints: [
        "Nejdřív odečti 5 od obou stran.",
        "Pak vyděl obě strany 2.",
      ],
    },

    // 14 — Reveal: why check the answer
    {
      type: "reveal",
      question:
        "Proč bychom měli vždy provádět **zkoušku** dosazením výsledku zpět do rovnice?",
      revealedContent:
        "Zkouška ověří, že jsme neudělali chybu v mezikrocích. Dosadíme nalezené $x$ do **původní** rovnice a zkontrolujeme, zda levá strana = pravá strana.",
    },

    // 15 — Explore: number line
    {
      type: "explore",
      prompt:
        "Pohybuj bodem na číselné ose a najdi hodnotu $x$, pro kterou platí $x + 3 = 7$.",
      visual: {
        type: "interactive-number-line",
        props: { min: -2, max: 12, target: 4, equation: "x + 3 = 7" },
      },
      followUpQuestion:
        "Všimni si: bod leží na hodnotě **4**. To odpovídá řešení $x = 7 - 3 = 4$.",
    },

    // 16 — MC: common mistake
    {
      type: "multiple-choice",
      question:
        "Student řeší $x - 8 = 3$ a napíše $x = 3 - 8 = -5$. Je to správně?",
      choices: [
        {
          label: "Ano, $x = -5$",
          isCorrect: false,
          feedback:
            "Dosadíme: $-5 - 8 = -13 \\neq 3$. Student odečetl místo přičtení.",
        },
        {
          label: "Ne, správně je $x = 11$",
          isCorrect: true,
          feedback:
            "Správně! K oběma stranám **přičteme** 8: $x = 3 + 8 = 11$.",
        },
      ],
      explanation:
        "Častá chyba: u $x - 8 = 3$ musíme přičíst 8 (inverzní operace k odčítání), ne odečíst.",
    },

    // 17 — Text input: negative coefficient
    {
      type: "text-input",
      question: "Vyřešte: $3x - 7 = 14$",
      expectedAnswer: "7",
      acceptableAnswers: ["x=7", "x = 7"],
      explanation:
        "$3x - 7 = 14 \\Rightarrow 3x = 21 \\Rightarrow x = 7$.",
      hints: ["Přičtěte 7 k oběma stranám."],
    },

    // 18 — Text input: final challenge
    {
      type: "text-input",
      question: "Vyřešte: $5x + 2 = 3x + 10$",
      expectedAnswer: "4",
      acceptableAnswers: ["x=4", "x = 4"],
      wrongAnswerFeedback: {
        "6": "Zkus znovu — nejdřív převeď $x$ na jednu stranu.",
      },
      explanation:
        "$5x + 2 = 3x + 10 \\Rightarrow 5x - 3x = 10 - 2 \\Rightarrow 2x = 8 \\Rightarrow x = 4$.",
      hints: [
        "Odečti $3x$ od obou stran.",
        "Pak odečti 2 od obou stran a vyděl.",
      ],
    },

    // 19 — MC: real-world
    {
      type: "multiple-choice",
      question:
        "V obchodě stojí 2 rohlíky a 1 houska dohromady 17 Kč. Houska stojí 5 Kč. Kolik stojí jeden rohlík?\n\n(Rovnice: $2x + 5 = 17$)",
      choices: [
        {
          label: "$4$ Kč",
          isCorrect: false,
          feedback: "$2 \\cdot 4 + 5 = 13 \\neq 17$.",
        },
        {
          label: "$6$ Kč",
          isCorrect: true,
          feedback: "Správně! $2 \\cdot 6 + 5 = 17$ ✓",
        },
        {
          label: "$8$ Kč",
          isCorrect: false,
          feedback: "$2 \\cdot 8 + 5 = 21 \\neq 17$.",
        },
      ],
      explanation:
        "$2x + 5 = 17 \\Rightarrow 2x = 12 \\Rightarrow x = 6$ Kč za rohlík.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Rovnice je rovnost dvou výrazů — cílem je najít hodnotu neznámé $x$.",
      "Používáme **inverzní operace**: sčítání ↔ odčítání, násobení ↔ dělení.",
      "Cokoliv uděláme na jedné straně, musíme udělat i na druhé.",
      "Dvoustupňové rovnice řešíme postupně: nejdřív sčítání/odčítání, pak násobení/dělení.",
      "Vždy provádíme **zkoušku** dosazením zpět do původní rovnice.",
    ],
  },
  nextTopicSuggestion: "kvadraticke-rovnice",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "linear-equations",
  order: 1,
  title: "Lineární rovnice – základy",
  lesson,
};
