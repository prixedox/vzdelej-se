import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Kvadratické rovnice – základy",
  narrative:
    "Proč matematici vymysleli logaritmy? Protože potřebovali řešit rovnice s mocninami. Ale ještě předtím museli zvládnout rovnice s $\\color{#e74c3c}{x^2}$ — a ty mají překvapivou vlastnost: mohou mít dvě, jedno, nebo žádné řešení.",
  steps: [
    // 1 — Prediction: how many solutions
    {
      type: "prediction",
      scenario:
        "Máme rovnici $\\color{#e74c3c}{x}^2 = 9$. Víme, že $3^2 = 9$.",
      question: "Kolik řešení má tato rovnice?",
      options: [
        { label: "Jedno: $x = 3$", isCorrect: false },
        { label: "Dvě: $x = 3$ a $x = -3$", isCorrect: true },
        { label: "Žádné", isCorrect: false },
      ],
      reveal:
        "Rovnice má **dvě** řešení! Jak $\\color{#e74c3c}{3}^2 = 9$, tak $\\color{#e74c3c}{(-3)}^2 = 9$. Druhá mocnina \"schová\" znaménko — proto mají kvadratické rovnice často dva kořeny.",
    },

    // 2 — Hook
    {
      type: "multiple-choice",
      question:
        "Číslo $\\color{#e74c3c}{x}$ splňuje $\\color{#e74c3c}{x}^2 = 9$. Kolik má tato rovnice řešení?",
      choices: [
        {
          label: "Jedno: $x = 3$",
          isCorrect: false,
          feedback: "Co třeba $x = -3$? Vždyť $(-3)^2 = 9$ taky!",
        },
        {
          label: "Dvě: $x = 3$ a $x = -3$",
          isCorrect: true,
          feedback: "Správně! Druhá mocnina kladného i záporného čísla dává kladný výsledek.",
        },
        {
          label: "Žádné",
          isCorrect: false,
          feedback: "Zkus dosadit $x = 3$: $3^2 = 9$ ✓",
        },
      ],
      explanation:
        "Rovnice $x^2 = 9$ má dvě řešení, protože jak $3^2 = 9$, tak $(-3)^2 = 9$. To je typická vlastnost kvadratických rovnic.",
    },

    // 3 — Explain: what is a quadratic equation (with misconception)
    {
      type: "explain",
      body: "**Kvadratická rovnice** je rovnice, ve které se neznámá vyskytuje ve **druhé mocnině**. Obecný tvar:\n\n$$\\color{#2980b9}{a}\\color{#e74c3c}{x}^2 + \\color{#2980b9}{b}\\color{#e74c3c}{x} + \\color{#27ae60}{c} = 0$$\n\nkde $\\color{#2980b9}{a} \\neq 0$. Koeficienty $\\color{#2980b9}{a}$, $\\color{#2980b9}{b}$, $\\color{#27ae60}{c}$ jsou reálná čísla.",
      callout: "Definice",
      misconception:
        "Častý omyl: \"Každá rovnice s $x^2$ má dvě řešení.\" Ne vždy — záleží na diskriminantu. Rovnice $x^2 + 1 = 0$ nemá žádné reálné řešení!",
    },

    // 3 — MC: identify quadratic
    {
      type: "multiple-choice",
      question: "Která z těchto rovnic je kvadratická?",
      choices: [
        {
          label: "$3x + 7 = 0$",
          isCorrect: false,
          feedback: "Toto je lineární rovnice — $x$ je jen v první mocnině.",
        },
        {
          label: "$2x^2 - 5x + 1 = 0$",
          isCorrect: true,
          feedback: "Ano! Obsahuje $x^2$ a $a = 2 \\neq 0$.",
        },
        {
          label: "$x^3 - x = 0$",
          isCorrect: false,
          feedback: "Toto je kubická rovnice — nejvyšší mocnina je 3.",
        },
        {
          label: "$\\frac{1}{x} = 5$",
          isCorrect: false,
          feedback: "Toto není polynomiální rovnice.",
        },
      ],
      explanation:
        "Kvadratická rovnice má tvar $ax^2 + bx + c = 0$ s $a \\neq 0$. Klíčové je, že nejvyšší mocnina $x$ je právě 2.",
    },

    // 4 — Explain: discriminant
    {
      type: "explain",
      body: "Počet řešení závisí na **diskriminantu**:\n\n$$D = b^2 - 4ac$$\n\n- $D > 0$: dvě různá řešení\n- $D = 0$: jedno (dvojnásobné) řešení\n- $D < 0$: žádné reálné řešení",
      callout: "Klíčový vzorec",
    },

    // 5 — MC: discriminant meaning
    {
      type: "multiple-choice",
      question:
        "Pro rovnici $x^2 + 2x + 5 = 0$ je $D = 4 - 20 = -16$. Co to znamená?",
      choices: [
        {
          label: "Rovnice má dvě řešení",
          isCorrect: false,
          feedback: "Dvě řešení by byla při $D > 0$.",
        },
        {
          label: "Rovnice má jedno řešení",
          isCorrect: false,
          feedback: "Jedno řešení je při $D = 0$.",
        },
        {
          label: "Rovnice nemá reálné řešení",
          isCorrect: true,
          feedback: "Správně! Záporný diskriminant = žádný reálný kořen.",
        },
      ],
      explanation:
        "Když $D < 0$, neexistuje reálné číslo, jehož druhá mocnina by dala zápornou hodnotu — odmocnina ze záporného čísla v reálných číslech neexistuje.",
    },

    // 6 — Explain: formula
    {
      type: "explain",
      body: "Když $D \\geq 0$, kořeny spočítáme vzorcem:\n\n$$x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$$\n\nPři $D = 0$ vyjde $x_1 = x_2 = \\frac{-b}{2a}$.",
      callout: "Vzorec",
    },

    // 7 — Animated solve: x^2 - 6x + 5 = 0
    {
      type: "explain",
      body: "Podívejme se na řešení rovnice $\\color{#e74c3c}{x}^2 - 6\\color{#e74c3c}{x} + 5 = 0$ krok po kroku:",
      visual: {
        type: "animated-equation-solver",
        props: {
          steps: [
            {
              latex: "\\color{#e74c3c}{x}^2 - 6\\color{#e74c3c}{x} + 5 = 0",
              label: "Zadání",
            },
            {
              latex: "\\color{#2980b9}{a} = 1,\\; \\color{#2980b9}{b} = -6,\\; \\color{#27ae60}{c} = 5",
              label: "Koeficienty",
            },
            {
              latex: "D = (-6)^2 - 4 \\cdot 1 \\cdot 5 = 36 - 20 = \\color{#e67e22}{16}",
              label: "Diskriminant",
            },
            {
              latex: "\\color{#e74c3c}{x} = \\frac{6 \\pm \\sqrt{\\color{#e67e22}{16}}}{2} = \\frac{6 \\pm 4}{2}",
              label: "Vzorec",
            },
            {
              latex: "\\color{#e74c3c}{x_1} = \\frac{6 + 4}{2} = \\color{#27ae60}{5}, \\quad \\color{#e74c3c}{x_2} = \\frac{6 - 4}{2} = \\color{#27ae60}{1}",
              label: "Kořeny ✓",
            },
          ],
        },
      },
    },

    // 8 — Sort order: solving steps
    {
      type: "sort-order",
      question:
        "Seřaďte kroky řešení rovnice $x^2 - 6x + 5 = 0$ ve správném pořadí:",
      items: [
        "Určíme koeficienty: $a = 1$, $b = -6$, $c = 5$",
        "Spočítáme diskriminant: $D = 36 - 20 = 16$",
        "Dosadíme do vzorce: $x = \\frac{6 \\pm 4}{2}$",
        "Zapíšeme kořeny: $x_1 = 5$, $x_2 = 1$",
      ],
      explanation:
        "Vždy postupujeme: koeficienty → diskriminant → vzorec → kořeny.",
    },

    // 8 — Text input: compute discriminant
    {
      type: "text-input",
      question:
        "Spočítejte diskriminant rovnice $x^2 + 4x + 4 = 0$.\n\n$D = b^2 - 4ac = \\;?$",
      expectedAnswer: "0",
      wrongAnswerFeedback: {
        "32": "Pozor: $b^2 = 16$, ale $4ac = 4 \\cdot 1 \\cdot 4 = 16$. Takže $D = 16 - 16 = 0$.",
        "16": "To je jen $b^2$. Ještě musíme odečíst $4ac = 16$.",
      },
      explanation:
        "$D = 4^2 - 4 \\cdot 1 \\cdot 4 = 16 - 16 = 0$. Rovnice má jeden dvojnásobný kořen.",
      hints: ["$b = 4$, $a = 1$, $c = 4$."],
    },

    // 9 — Text input: find the double root
    {
      type: "text-input",
      question:
        "Pro $x^2 + 4x + 4 = 0$ s $D = 0$ vypočítejte kořen: $x = \\frac{-b}{2a}$.",
      expectedAnswer: "-2",
      acceptableAnswers: ["x=-2", "x = -2"],
      explanation:
        "$x = \\frac{-4}{2 \\cdot 1} = \\frac{-4}{2} = -2$. Zkouška: $(-2)^2 + 4 \\cdot (-2) + 4 = 4 - 8 + 4 = 0$ ✓",
    },

    // 10 — Explain: factored form
    {
      type: "explain",
      body: "Všimněte si: $x^2 + 4x + 4 = (x + 2)^2$. Když umíme rovnici **rozložit na součin**, nemusíme počítat diskriminant. Stačí najít, kdy je každý činitel nulový.",
    },

    // 11 — Text input: full solve
    {
      type: "text-input",
      question:
        "Vyřešte $x^2 - 5x + 6 = 0$. Zapište **větší** kořen.",
      expectedAnswer: "3",
      acceptableAnswers: ["x=3", "x = 3", "x1=3", "x₁=3"],
      wrongAnswerFeedback: {
        "2": "To je menší kořen. Ptáme se na ten větší.",
        "-3": "Pozor na znaménka! $b = -5$, takže $-b = 5$.",
      },
      explanation:
        "$D = 25 - 24 = 1$. $x = \\frac{5 \\pm 1}{2}$, tedy $x_1 = 3$ a $x_2 = 2$. Větší je $x_1 = 3$.",
      hints: [
        "Koeficienty: $a = 1$, $b = -5$, $c = 6$.",
        "$D = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1$.",
      ],
    },

    // 12 — Text input: smaller root
    {
      type: "text-input",
      question: "A jaký je **menší** kořen rovnice $x^2 - 5x + 6 = 0$?",
      expectedAnswer: "2",
      acceptableAnswers: ["x=2", "x = 2"],
      explanation:
        "$x_2 = \\frac{5 - 1}{2} = 2$. Rozkladem: $(x - 3)(x - 2) = 0$.",
    },

    // 13 — Reveal: Vieta's formulas
    {
      type: "reveal",
      question:
        "U rovnice $x^2 - 5x + 6 = 0$ s kořeny 3 a 2: jaký je součet a součin kořenů?",
      revealedContent:
        "Součet: $3 + 2 = 5 = -\\frac{b}{a}$\n\nSoučin: $3 \\cdot 2 = 6 = \\frac{c}{a}$\n\nToto jsou **Vietovy vzorce**: $x_1 + x_2 = -\\frac{b}{a}$ a $x_1 \\cdot x_2 = \\frac{c}{a}$.",
    },

    // 14 — MC: Vieta application
    {
      type: "multiple-choice",
      question:
        "Kvadratická rovnice $x^2 + px + 12 = 0$ má kořeny 3 a 4. Jaká je hodnota $p$?",
      choices: [
        {
          label: "$p = 7$",
          isCorrect: false,
          feedback: "Podle Vieta: $x_1 + x_2 = -p$, tedy $p = -(3+4)$.",
        },
        {
          label: "$p = -7$",
          isCorrect: true,
          feedback: "Správně! $x_1 + x_2 = 7 = -p$, takže $p = -7$.",
        },
        {
          label: "$p = 12$",
          isCorrect: false,
          feedback: "12 je součin kořenů ($c/a$), ne součet.",
        },
      ],
      explanation:
        "Z Vietových vzorců: $x_1 + x_2 = -\\frac{b}{a} = -p$. Tedy $3 + 4 = -p$, $p = -7$.",
    },

    // 15 — Text input: with negative coefficient
    {
      type: "text-input",
      question:
        "Vyřešte $2x^2 - 8x = 0$. Zapište **nenulový** kořen.",
      expectedAnswer: "4",
      acceptableAnswers: ["x=4", "x = 4"],
      wrongAnswerFeedback: {
        "0": "To je ten nulový kořen. Hledáme ten druhý.",
      },
      explanation:
        "Vytkneme $2x$: $2x(x - 4) = 0$. Tedy $x_1 = 0$ nebo $x_2 = 4$.",
      hints: ["Zkuste vytknout $x$ (nebo $2x$) před závorku."],
    },

    // 16 — Explain: incomplete quadratics
    {
      type: "explain",
      body: "Některé kvadratické rovnice mají jednodušší tvar:\n\n- **Bez $c$**: $ax^2 + bx = 0$ → vytkneme $x$\n- **Bez $b$**: $ax^2 + c = 0$ → převedeme a odmocníme\n\nNemusíme vždy počítat diskriminant!",
    },

    // 17 — MC: word problem
    {
      type: "multiple-choice",
      question:
        "Obdélníková zahrada má obvod $20\\,\\text{m}$ a obsah $24\\,\\text{m}^2$. Jaké jsou její rozměry?\n\n(Strany $a$ a $b$ splňují $a + b = 10$ a $ab = 24$.)",
      choices: [
        {
          label: "$4\\,\\text{m}$ a $6\\,\\text{m}$",
          isCorrect: true,
          feedback: "$4 + 6 = 10$ ✓ a $4 \\cdot 6 = 24$ ✓",
        },
        {
          label: "$3\\,\\text{m}$ a $8\\,\\text{m}$",
          isCorrect: false,
          feedback: "$3 \\cdot 8 = 24$ ✓, ale $3 + 8 = 11 \\neq 10$.",
        },
        {
          label: "$5\\,\\text{m}$ a $5\\,\\text{m}$",
          isCorrect: false,
          feedback: "$5 \\cdot 5 = 25 \\neq 24$.",
        },
      ],
      explanation:
        "Dosadíme $b = 10 - a$ do $ab = 24$: $a(10 - a) = 24$ → $a^2 - 10a + 24 = 0$ → $D = 4$ → $a = 6$ nebo $a = 4$.",
    },

    // 18 — Text input: final challenge
    {
      type: "text-input",
      question:
        "Vyřešte $x^2 - 2x - 15 = 0$. Zapište oba kořeny oddělené středníkem (menší první), např. $-1; 5$.",
      expectedAnswer: "-3; 5",
      acceptableAnswers: ["-3;5", "-3 ; 5", "-3, 5", "x=-3, x=5"],
      explanation:
        "$D = 4 + 60 = 64$. $x = \\frac{2 \\pm 8}{2}$: $x_1 = -3$, $x_2 = 5$.\n\nRozkladem: $(x - 5)(x + 3) = 0$.",
      hints: [
        "$a = 1$, $b = -2$, $c = -15$.",
        "$D = (-2)^2 - 4 \\cdot 1 \\cdot (-15) = 4 + 60 = 64$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Kvadratická rovnice má tvar $ax^2 + bx + c = 0$, kde $a \\neq 0$.",
      "Diskriminant $D = b^2 - 4ac$ určuje počet řešení.",
      "Kořeny: $x_{1,2} = \\frac{-b \\pm \\sqrt{D}}{2a}$.",
      "Vietovy vzorce: $x_1 + x_2 = -\\frac{b}{a}$, $x_1 \\cdot x_2 = \\frac{c}{a}$.",
      "Neúplné rovnice (bez $b$ nebo $c$) řešíme jednodušeji vytýkáním nebo odmocninou.",
    ],
  },
  nextTopicSuggestion: "soustavy-rovnic",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "quadratic-equations",
  order: 1,
  title: "Kvadratické rovnice – základy",
  lesson,
};
