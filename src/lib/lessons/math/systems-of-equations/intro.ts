import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Soustavy rovnic – základy",
  steps: [
    // 1 — Hook
    {
      type: "multiple-choice",
      question:
        "Jablko a hruška stojí dohromady 10 Kč. Jablko stojí o 2 Kč víc než hruška. Kolik stojí jablko?",
      choices: [
        {
          label: "5 Kč",
          isCorrect: false,
          feedback: "Kdyby obě stály 5 Kč, nebyly by rozdílné o 2 Kč.",
        },
        {
          label: "6 Kč",
          isCorrect: true,
          feedback: "Správně! Jablko 6 Kč, hruška 4 Kč: $6 + 4 = 10$ a $6 - 4 = 2$.",
        },
        {
          label: "7 Kč",
          isCorrect: false,
          feedback: "Pak by hruška stála 3 Kč, ale $7 + 3 = 10$ a $7 - 3 = 4 \\neq 2$.",
        },
      ],
      explanation:
        "Značíme $x$ = jablko, $y$ = hruška. Dostaneme soustavu: $x + y = 10$ a $x - y = 2$. Řešením je $x = 6$, $y = 4$.",
    },

    // 2 — Explain: what is a system
    {
      type: "explain",
      body: "**Soustava rovnic** je skupina dvou (nebo více) rovnic, které musí platit **současně**. Hledáme hodnoty neznámých, které splňují všechny rovnice najednou.\n\nTypická soustava dvou rovnic o dvou neznámých:\n$$x + y = 10$$\n$$x - y = 2$$",
      callout: "Definice",
    },

    // 3 — Explain: substitution method
    {
      type: "explain",
      body: "**Dosazovací metoda**: Z jedné rovnice vyjádříme jednu neznámou a dosadíme do druhé.\n\nPříklad: Z $x - y = 2$ vyjádříme $x = y + 2$. Dosadíme do první rovnice:\n$$(y + 2) + y = 10$$\n$$2y = 8 \\Rightarrow y = 4$$\n\nPak $x = 4 + 2 = 6$.",
      callout: "Metoda 1",
    },

    // 4 — Sort order: substitution steps
    {
      type: "sort-order",
      question:
        "Seřaďte kroky dosazovací metody pro soustavu $y = 2x$ a $x + y = 9$:",
      items: [
        "Z první rovnice: $y = 2x$ (už vyjádřeno)",
        "Dosadíme do druhé: $x + 2x = 9$",
        "Zjednodušíme: $3x = 9$, tedy $x = 3$",
        "Zpětně: $y = 2 \\cdot 3 = 6$",
      ],
      explanation:
        "Dosazovací metoda: vyjádřit → dosadit → vyřešit → zpětně dosadit.",
    },

    // 5 — Text input: substitution practice
    {
      type: "text-input",
      question:
        "Vyřešte dosazovací metodou:\n$$y = x + 1$$\n$$2x + y = 7$$\n\nJaká je hodnota $x$?",
      expectedAnswer: "2",
      acceptableAnswers: ["x=2", "x = 2"],
      wrongAnswerFeedback: {
        "3": "Dosadili jste správně? $2x + (x+1) = 7$ → $3x = 6$ → $x = 2$.",
      },
      explanation:
        "Dosadíme $y = x + 1$ do druhé rovnice: $2x + (x + 1) = 7$ → $3x + 1 = 7$ → $3x = 6$ → $x = 2$. Pak $y = 3$.",
      hints: ["Dosad'te $y = x + 1$ do rovnice $2x + y = 7$."],
    },

    // 6 — Text input: find y
    {
      type: "text-input",
      question:
        "Pro soustavu výše ($y = x + 1$, $2x + y = 7$) jsme zjistili $x = 2$. Jaká je hodnota $y$?",
      expectedAnswer: "3",
      acceptableAnswers: ["y=3", "y = 3"],
      explanation: "$y = x + 1 = 2 + 1 = 3$. Zkouška: $2 \\cdot 2 + 3 = 7$ ✓",
    },

    // 7 — Explain: elimination method
    {
      type: "explain",
      body: "**Sčítací (eliminační) metoda**: Sečteme (nebo odečteme) rovnice tak, aby se jedna neznámá vyloučila.\n\nPříklad:\n$$x + y = 10$$\n$$x - y = 2$$\n\nSečteme: $2x = 12$, tedy $x = 6$.",
      callout: "Metoda 2",
    },

    // 8 — MC: which operation
    {
      type: "multiple-choice",
      question:
        "Máme soustavu:\n$$3x + 2y = 16$$\n$$3x - 2y = 8$$\n\nJakou operaci zvolíme pro eliminaci?",
      choices: [
        {
          label: "Sečteme rovnice (eliminujeme $y$)",
          isCorrect: true,
          feedback: "Ano! $+2y$ a $-2y$ se vyruší: $6x = 24$.",
        },
        {
          label: "Odečteme rovnice (eliminujeme $y$)",
          isCorrect: false,
          feedback: "Odečtením bychom dostali $4y = 8$, to eliminuje $x$ — taky funguje, ale sčítání je přímočařejší.",
        },
        {
          label: "Vynásobíme první rovnici 2",
          isCorrect: false,
          feedback: "Násobit nemusíme — koeficienty u $y$ se už liší jen znaménkem.",
        },
      ],
      explanation:
        "Sečtením: $(3x + 2y) + (3x - 2y) = 16 + 8$ → $6x = 24$ → $x = 4$. Pak $y = 2$.",
    },

    // 9 — Text input: elimination
    {
      type: "text-input",
      question:
        "Sčítací metodou vyřešte:\n$$x + y = 5$$\n$$x - y = 1$$\n\nJaká je hodnota $x$?",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "x = 3"],
      explanation:
        "Sečtením: $2x = 6$ → $x = 3$. Pak $y = 5 - 3 = 2$.",
      hints: ["Sečtěte obě rovnice — $y$ se vyruší."],
    },

    // 10 — Explain: when to multiply first
    {
      type: "explain",
      body: "Někdy koeficienty nesedí a musíme rovnici nejdřív **vynásobit**.\n\nPříklad:\n$$2x + 3y = 12$$\n$$x + y = 5$$\n\nDruhou rovnici vynásobíme $(-2)$: $-2x - 2y = -10$. Sečteme s první: $y = 2$.",
    },

    // 11 — Text input: multiply and eliminate
    {
      type: "text-input",
      question:
        "Vyřešte:\n$$3x + y = 10$$\n$$x + y = 4$$\n\nJaká je hodnota $x$? (Tip: odečtěte druhou od první.)",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "x = 3"],
      wrongAnswerFeedback: {
        "1": "To je hodnota $y$, ne $x$.",
      },
      explanation:
        "Odečteme: $(3x + y) - (x + y) = 10 - 4$ → $2x = 6$ → $x = 3$. Pak $y = 4 - 3 = 1$.",
    },

    // 12 — MC: graphical meaning
    {
      type: "multiple-choice",
      question:
        "Geometricky: co znamená řešení soustavy dvou lineárních rovnic?",
      choices: [
        {
          label: "Průsečík dvou přímek",
          isCorrect: true,
          feedback: "Přesně! Každá rovnice je přímka a řešení je bod, kde se protínají.",
        },
        {
          label: "Rovnoběžné přímky",
          isCorrect: false,
          feedback: "Rovnoběžky nemají průsečík — to by soustava neměla řešení.",
        },
        {
          label: "Obsah trojúhelníku",
          isCorrect: false,
          feedback: "Dvě přímky netvoří trojúhelník.",
        },
      ],
      explanation:
        "Každá lineární rovnice $ax + by = c$ odpovídá přímce v rovině. Řešení soustavy = průsečík přímek.",
    },

    // 13 — Reveal: special cases
    {
      type: "reveal",
      question:
        "Co se stane, když soustava nemá řešení nebo má nekonečně mnoho řešení?",
      revealedContent:
        "**Žádné řešení**: Přímky jsou rovnoběžné (stejný sklon, jiný posuv). Např. $x + y = 3$ a $x + y = 5$.\n\n**Nekonečně řešení**: Rovnice popisují tutéž přímku. Např. $x + y = 3$ a $2x + 2y = 6$.",
    },

    // 14 — Text input: word problem
    {
      type: "text-input",
      question:
        "V kině stojí lístek pro dospělého $d$ Kč a pro dítě $c$ Kč.\n\n$2d + 3c = 340$\n$d + 2c = 190$\n\nKolik stojí lístek pro dospělého?",
      expectedAnswer: "110",
      acceptableAnswers: ["110 Kč", "d=110", "d = 110"],
      explanation:
        "Z druhé: $d = 190 - 2c$. Dosadíme: $2(190 - 2c) + 3c = 340$ → $380 - 4c + 3c = 340$ → $c = 40$. Pak $d = 190 - 80 = 110$. Ověření: $2 \\cdot 110 + 3 \\cdot 40 = 340$ ✓",
    },

    // 15 — Text input: challenge
    {
      type: "text-input",
      question:
        "Vyřešte:\n$$4x - y = 5$$\n$$2x + 3y = 13$$\n\nZapište řešení ve tvaru $x; y$ (např. $2; 3$).",
      expectedAnswer: "2; 3",
      acceptableAnswers: ["2;3", "2 ; 3", "2, 3", "x=2, y=3", "x=2;y=3"],
      explanation:
        "Z první: $y = 4x - 5$. Dosadíme: $2x + 3(4x - 5) = 13$ → $2x + 12x - 15 = 13$ → $14x = 28$ → $x = 2$. Pak $y = 4 \\cdot 2 - 5 = 3$.\n\nOvěření: $2 \\cdot 2 + 3 \\cdot 3 = 4 + 9 = 13$ ✓ a $4 \\cdot 2 - 3 = 5$ ✓",
    },
  ],
  summary: {
    keyTakeaways: [
      "Soustava rovnic = více rovnic, které musí platit současně.",
      "**Dosazovací metoda**: vyjádříme jednu neznámou a dosadíme do druhé rovnice.",
      "**Sčítací metoda**: sečteme/odečteme rovnice, aby se jedna neznámá vyloučila.",
      "Geometricky: řešení = průsečík přímek.",
      "Soustava může mít jedno řešení, žádné, nebo nekonečně mnoho.",
    ],
  },
  nextTopicSuggestion: "nerovnice",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "systems-of-equations",
  order: 1,
  title: "Soustavy rovnic – základy",
  lesson,
};
