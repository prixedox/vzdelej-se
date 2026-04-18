import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Výrazové úpravy -- základy",
  steps: [
    // 1 — Hook
    {
      type: "multiple-choice",
      question: "Zjednodušte výraz $3x + 5x$.",
      choices: [
        {
          label: "$8x$",
          isCorrect: true,
          feedback: "Správně! Sečteme koeficienty: $3 + 5 = 8$.",
        },
        {
          label: "$15x$",
          isCorrect: false,
          feedback: "Koeficienty sčítáme, ne násobíme.",
        },
        {
          label: "$8x^2$",
          isCorrect: false,
          feedback: "Sčítáním se mocnina nemění — zůstává $x$, ne $x^2$.",
        },
      ],
      explanation:
        "$3x + 5x = (3 + 5)x = 8x$. Sčítat můžeme jen **stejné mocniny** (tzv. podobné členy).",
    },

    // 2 — Explain: like terms
    {
      type: "explain",
      body: "**Podobné členy** mají stejnou proměnnou ve stejné mocnině. Pouze ty smíme sčítat/odčítat.\n\n- $3x$ a $5x$ → sečteme: $8x$ ✓\n- $2x^2$ a $4x^2$ → sečteme: $6x^2$ ✓\n- $3x$ a $2x^2$ → **nelze** sečíst (různé mocniny)",
      callout: "Pravidlo",
    },

    // 3 — MC: which can combine
    {
      type: "multiple-choice",
      question: "Které dva členy můžeme sečíst?",
      choices: [
        {
          label: "$4ab$ a $3a$",
          isCorrect: false,
          feedback: "$ab \\neq a$ — liší se proměnnými.",
        },
        {
          label: "$7xy$ a $-2xy$",
          isCorrect: true,
          feedback: "Ano! Oba obsahují $xy$: $7xy - 2xy = 5xy$.",
        },
        {
          label: "$5x$ a $5y$",
          isCorrect: false,
          feedback: "Různé proměnné — nelze sloučit.",
        },
      ],
      explanation:
        "Sčítat smíme jen členy se **stejnými proměnnými ve stejných mocninách**.",
    },

    // 4 — Explain: distributive law
    {
      type: "explain",
      body: "**Roznásobování** (distributivní zákon):\n\n$$a(b + c) = ab + ac$$\n\nPříklad: $3(x + 4) = 3x + 12$.\n\nOpačný postup je **vytýkání**: $6x + 9 = 3(2x + 3)$.",
      callout: "Klíčový vzorec",
    },

    // 5 — Text input: distribute
    {
      type: "text-input",
      question: "Roznásobte: $5(2x - 3) = \\;?$",
      expectedAnswer: "10x - 15",
      acceptableAnswers: ["10x-15", "10x - 15"],
      wrongAnswerFeedback: {
        "10x - 3": "Nezapomeňte vynásobit i $(-3)$: $5 \\cdot (-3) = -15$.",
      },
      explanation: "$5(2x - 3) = 5 \\cdot 2x + 5 \\cdot (-3) = 10x - 15$.",
    },

    // 6 — Text input: factor out
    {
      type: "text-input",
      question:
        "Vytýkejte: $8x + 12 = ?(? + ?)$\n\nZapište společný činitel (co se vytýká).",
      expectedAnswer: "4",
      acceptableAnswers: ["4"],
      explanation:
        "$8x + 12 = 4(2x + 3)$. Společný činitel 8 a 12 je 4.",
      hints: ["Jaký je největší společný dělitel 8 a 12?"],
    },

    // 7 — Explain: (a+b)^2 formula
    {
      type: "explain",
      body: "Důležité vzorce pro druhou mocninu:\n\n$$(a + b)^2 = a^2 + 2ab + b^2$$\n$$(a - b)^2 = a^2 - 2ab + b^2$$\n\nPříklad: $(x + 3)^2 = x^2 + 6x + 9$.",
      callout: "Vzorce",
    },

    // 8 — MC: expand square
    {
      type: "multiple-choice",
      question: "Rozviňte $(x - 5)^2$.",
      choices: [
        {
          label: "$x^2 - 25$",
          isCorrect: false,
          feedback: "Chybí prostřední člen $-2 \\cdot x \\cdot 5 = -10x$.",
        },
        {
          label: "$x^2 - 10x + 25$",
          isCorrect: true,
          feedback: "Správně! $a^2 - 2ab + b^2 = x^2 - 10x + 25$.",
        },
        {
          label: "$x^2 + 10x + 25$",
          isCorrect: false,
          feedback: "Pozor na znaménko: $(a - b)^2$ má prostřední člen $-2ab$.",
        },
      ],
      explanation:
        "$(x - 5)^2 = x^2 - 2 \\cdot x \\cdot 5 + 5^2 = x^2 - 10x + 25$.",
    },

    // 9 — Text input: expand
    {
      type: "text-input",
      question: "Rozviňte $(x + 4)^2$. Zapište prostřední člen (s $x$).",
      expectedAnswer: "8x",
      acceptableAnswers: ["+8x", "8x"],
      explanation:
        "$(x + 4)^2 = x^2 + 2 \\cdot 4 \\cdot x + 16 = x^2 + 8x + 16$. Prostřední člen je $8x$.",
    },

    // 10 — Explain: difference of squares
    {
      type: "explain",
      body: "**Rozdíl čtverců**:\n\n$$a^2 - b^2 = (a + b)(a - b)$$\n\nPříklad: $x^2 - 9 = (x + 3)(x - 3)$.\n\nTento vzorec se hodí při rozkladu i zjednodušování.",
      callout: "Vzorec",
    },

    // 11 — MC: factor difference of squares
    {
      type: "multiple-choice",
      question: "Rozložte $4x^2 - 1$ na součin.",
      choices: [
        {
          label: "$(2x + 1)(2x - 1)$",
          isCorrect: true,
          feedback: "$4x^2 = (2x)^2$ a $1 = 1^2$, takže $a^2 - b^2 = (a+b)(a-b)$.",
        },
        {
          label: "$(4x + 1)(x - 1)$",
          isCorrect: false,
          feedback: "Roznásobte: $(4x+1)(x-1) = 4x^2 - 3x - 1 \\neq 4x^2 - 1$.",
        },
        {
          label: "$4(x^2 - 1)$",
          isCorrect: false,
          feedback: "Nelze vytknout 4 z $4x^2 - 1$ — jednička se 4 nedělí.",
        },
      ],
      explanation:
        "$4x^2 - 1 = (2x)^2 - 1^2 = (2x + 1)(2x - 1)$.",
    },

    // 12 — Sort order: identify formulas
    {
      type: "sort-order",
      question:
        "Přiřaďte vzorce seřazením ve správném pořadí (od $(a+b)^2$ po $a^2 - b^2$):",
      items: [
        "$(a+b)^2 = a^2 + 2ab + b^2$",
        "$(a-b)^2 = a^2 - 2ab + b^2$",
        "$a^2 - b^2 = (a+b)(a-b)$",
      ],
      explanation:
        "Tři základní vzorce pro výrazové úpravy: dva pro druhou mocninu dvojčlenu a jeden pro rozdíl čtverců.",
    },

    // 13 — Text input: combine everything
    {
      type: "text-input",
      question:
        "Zjednodušte: $(x + 2)^2 - (x - 2)^2$.\n\nNa jaké číslo krát $x$ to vyjde? (Zapište celý výraz.)",
      expectedAnswer: "8x",
      acceptableAnswers: ["8x", "8*x"],
      wrongAnswerFeedback: {
        "0": "Výrazy nejsou stejné: $(x+2)^2 \\neq (x-2)^2$.",
      },
      explanation:
        "Rozvineme: $(x^2 + 4x + 4) - (x^2 - 4x + 4) = x^2 + 4x + 4 - x^2 + 4x - 4 = 8x$.\n\nNebo rovnou $a^2 - b^2 = (a+b)(a-b)$: s $a = (x+2)$, $b = (x-2)$: $(x+2+x-2)(x+2-x+2) = 2x \\cdot 4 = 8x$.",
      hints: [
        "Rozviňte oba čtverce zvlášť.",
        "Nebo použijte vzorec $a^2 - b^2 = (a+b)(a-b)$.",
      ],
    },

    // 14 — Explain: multiplying binomials
    {
      type: "explain",
      body: "Násobení dvou dvojčlenů:\n\n$$(a + b)(c + d) = ac + ad + bc + bd$$\n\nPříklad: $(x + 2)(x + 3) = x^2 + 3x + 2x + 6 = x^2 + 5x + 6$.\n\nKaždý člen z první závorky násobíme každým členem z druhé.",
    },

    // 15 — Text input: multiply binomials
    {
      type: "text-input",
      question:
        "Roznásobte: $(x + 1)(x - 4)$.\n\nJaký je absolutní člen (číslo bez $x$)?",
      expectedAnswer: "-4",
      acceptableAnswers: ["-4"],
      wrongAnswerFeedback: {
        "4": "Pozor na znaménko: $1 \\cdot (-4) = -4$.",
      },
      explanation:
        "$(x + 1)(x - 4) = x^2 - 4x + x - 4 = x^2 - 3x - 4$. Absolutní člen je $-4$.",
    },

    // 16 — Reveal: why formulas matter
    {
      type: "reveal",
      question: "Proč se učíme vzorce, když můžeme vždy roznásobit ručně?",
      revealedContent:
        "Vzorce šetří čas a snižují chyby. Navíc fungují i **opačným směrem** (rozklad na součin), což ručním roznásobením nedostaneme. Rozklad je klíčový pro řešení rovnic, zjednodušování zlomků a další pokročilé úpravy.",
    },

    // 17 — Text input: challenge
    {
      type: "text-input",
      question:
        "Rozložte $x^2 - 7x + 12$ na součin.\n\nZapište ve tvaru $(x - ?)(x - ?)$. Jaké jsou ta dvě čísla? (menší první, oddělte středníkem)",
      expectedAnswer: "3; 4",
      acceptableAnswers: ["3;4", "3 ; 4", "3, 4"],
      explanation:
        "Hledáme dvě čísla se součtem 7 a součinem 12: $3 + 4 = 7$ a $3 \\cdot 4 = 12$.\nTedy $x^2 - 7x + 12 = (x - 3)(x - 4)$.",
      hints: [
        "Hledáme čísla $p$ a $q$ taková, že $p + q = 7$ a $p \\cdot q = 12$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "**Podobné členy** (stejná proměnná a mocnina) smíme sčítat.",
      "**Distributivní zákon**: $a(b + c) = ab + ac$ (roznásobování i vytýkání).",
      "$(a + b)^2 = a^2 + 2ab + b^2$ a $(a - b)^2 = a^2 - 2ab + b^2$.",
      "**Rozdíl čtverců**: $a^2 - b^2 = (a + b)(a - b)$.",
      "Rozklad na součin je inverzní operace k roznásobování.",
    ],
  },
  nextTopicSuggestion: "posloupnosti",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "algebraic-expressions",
  order: 1,
  title: "Výrazové úpravy -- základy",
  lesson,
};
