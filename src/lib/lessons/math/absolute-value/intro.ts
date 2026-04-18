import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Absolutní hodnota",
  steps: [
    {
      type: "multiple-choice",
      question:
        "V Praze je $-5\\,°\\text{C}$, v Brně $5\\,°\\text{C}$. Které město je dál od nuly na teploměru?",
      choices: [
        {
          label: "Praha ($-5\\,°\\text{C}$)",
          isCorrect: false,
          feedback:
            "Obě teploty jsou přesně 5 stupňů od nuly — jedna pod, druhá nad.",
        },
        {
          label: "Brno ($5\\,°\\text{C}$)",
          isCorrect: false,
          feedback:
            "Obě teploty jsou přesně 5 stupňů od nuly — jedna pod, druhá nad.",
        },
        {
          label: "Obě stejně daleko",
          isCorrect: true,
          feedback:
            "Přesně! $|-5| = |5| = 5$. Absolutní hodnota měří **vzdálenost od nuly** bez ohledu na směr.",
        },
      ],
      explanation:
        "Absolutní hodnota $|x|$ = vzdálenost čísla $x$ od nuly. Nezáleží na znaménku: $|-5| = |5| = 5$.",
    },
    {
      type: "explain",
      body: "**Absolutní hodnota** $|x|$ je vzdálenost od nuly na číselné ose — jako vzdálenost na mapě, která je vždy kladná.\n\n$$|x| = \\begin{cases} x & \\text{pro } x \\geq 0 \\\\ -x & \\text{pro } x < 0 \\end{cases}$$",
      callout: "Definice",
    },
    {
      type: "explore",
      prompt:
        "Graf funkce $f(x) = |x|$ má tvar písmene V. Posuňte parametr $a$, abyste viděli, jak se mění $f(x) = |x - a|$ — kam se posune vrchol V-tvaru?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "absolute-value",
          defaultParams: { a: 0, b: 1, c: 0 },
          xRange: [-8, 8],
          yRange: [-2, 10],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Vrchol se posouvá vodorovně: $|x - a|$ má minimum (nulu) v bodě $x = a$. Představte si: $|x - 3|$ měří vzdálenost od trojky na číselné ose.",
    },
    {
      type: "text-input",
      question:
        "Na teploměru je $-7\\,°\\text{C}$. Jaká je vzdálenost od nuly? (Kolik je $|-7|$?)",
      expectedAnswer: "7",
      explanation: "$|-7| = 7$. Záporné znaménko se odstraní.",
    },
    {
      type: "explore",
      prompt:
        "Zapněte zobrazení kořenů a podívejte se na graf $f(x) = |x - 3| - 2$. Kde graf protíná osu $x$? To jsou řešení rovnice $|x - 3| = 2$.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "absolute-value",
          defaultParams: { a: 3, b: 1, c: -2 },
          xRange: [-2, 8],
          yRange: [-3, 6],
          showGrid: true,
          showRoots: true,
        },
      },
      followUpQuestion:
        "Kořeny jsou v $x = 1$ a $x = 5$. Rovnice $|x - 3| = 2$ má dvě řešení: $x = 3 + 2 = 5$ a $x = 3 - 2 = 1$.",
    },
    {
      type: "explain",
      body: "Rovnice $|x - a| = b$ (pro $b \\geq 0$) má dvě řešení: $x = a + b$ a $x = a - b$. Geometricky: hledáme body, které jsou od $a$ vzdálené přesně $b$.",
    },
    {
      type: "text-input",
      question:
        "Vyřešte $|x - 3| = 2$. Jaké je **větší** řešení?",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "x=5", "x = 5"],
      wrongAnswerFeedback: {
        "1": "To je menší řešení. Ptáme se na větší: $3 + 2 = 5$.",
      },
      explanation:
        "$x - 3 = 2 \\Rightarrow x = 5$ nebo $x - 3 = -2 \\Rightarrow x = 1$.",
      hints: ["Dva případy: $x - 3 = 2$ a $x - 3 = -2$."],
    },
    {
      type: "multiple-choice",
      question:
        "Dlužíte kamarádovi 200 Kč (saldo $-200$) a na účtu máte 200 Kč (saldo $+200$). V obou případech je $|\\text{saldo}| = 200$. Kolik řešení má rovnice $|x| = -3$?",
      choices: [
        {
          label: "Dvě: $x = 3$ a $x = -3$",
          isCorrect: false,
          feedback:
            "Absolutní hodnota nemůže být záporná! $|3| = 3 \\neq -3$.",
        },
        {
          label: "Žádné",
          isCorrect: true,
          feedback:
            "Vzdálenost nemůže být záporná. $|x| \\geq 0$ vždy, takže $|x| = -3$ nemá řešení.",
        },
        {
          label: "Jedno: $x = 0$",
          isCorrect: false,
          feedback: "$|0| = 0 \\neq -3$.",
        },
      ],
      explanation:
        "Absolutní hodnota je vždy $\\geq 0$. Jakákoli rovnice $|\\ldots| = $ záporné číslo nemá řešení.",
    },
    {
      type: "reveal",
      question:
        "Jak řešíme **nerovnice** s absolutní hodnotou, třeba $|x| < 4$?",
      revealedContent:
        "Nerovnice $|x| < a$ ($a > 0$) znamená: vzdálenost od nuly je **menší** než $a$.\n\n$$|x| < a \\iff -a < x < a$$\n\nPříklad: $|x| < 4$ → $x \\in (-4; 4)$.\n\nNaopak $|x| > a$ → $x < -a$ nebo $x > a$ (daleko od nuly).\n\nPrakticky: teplota v lednici se drží v rozmezí $|T - 4| < 2$, tedy mezi $2\\,°\\text{C}$ a $6\\,°\\text{C}$.",
    },
    {
      type: "text-input",
      question:
        "Zapište řešení nerovnice $|x| < 4$ jako interval. (Použijte závorky a středník, např. $(-a; a)$.)",
      expectedAnswer: "(-4; 4)",
      acceptableAnswers: ["(-4;4)", "(-4; 4)", "(-4 ; 4)"],
      explanation:
        "$|x| < 4$ → $-4 < x < 4$, tedy $x \\in (-4; 4)$.",
      hints: ["$|x| < a$ znamená $-a < x < a$."],
    },
    {
      type: "explore",
      prompt:
        "Porovnejte grafy $f(x) = |x|$ (černá) a $g(x) = |x - 2|$ (červená). O kolik je červený graf posunutý a jakým směrem?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "absolute-value",
          defaultParams: { a: 0, b: 1, c: 0 },
          xRange: [-6, 8],
          yRange: [-2, 8],
          showGrid: true,
          compareFunction: { functionType: "absolute-value", params: { a: 2, b: 1, c: 0 } },
        },
      },
      followUpQuestion:
        "Graf $|x - 2|$ je posunutý o 2 doprava. Obecně: $|x - a|$ posune vrchol do bodu $[a; 0]$.",
    },
    {
      type: "text-input",
      question:
        "Vyřešte $|2x + 1| = 7$. Zapište obě řešení (menší první, oddělte středníkem).",
      expectedAnswer: "-4; 3",
      acceptableAnswers: ["-4;3", "-4 ; 3", "-4, 3"],
      explanation:
        "$2x + 1 = 7 \\Rightarrow x = 3$. $2x + 1 = -7 \\Rightarrow x = -4$.",
      hints: ["Rozepište: $2x + 1 = 7$ nebo $2x + 1 = -7$."],
    },
    {
      type: "multiple-choice",
      question:
        "Termostat udržuje teplotu v místnosti tak, aby $|T - 22| \\leq 2$ (°C). V jakém rozmezí se teplota pohybuje?",
      choices: [
        {
          label: "$20\\,°\\text{C}$ až $24\\,°\\text{C}$",
          isCorrect: true,
          feedback:
            "$|T - 22| \\leq 2$ → $20 \\leq T \\leq 24$. Teplota je maximálně 2 stupně od ideálu.",
        },
        {
          label: "$18\\,°\\text{C}$ až $26\\,°\\text{C}$",
          isCorrect: false,
          feedback: "To by odpovídalo $|T - 22| \\leq 4$.",
        },
        {
          label: "$22\\,°\\text{C}$ až $24\\,°\\text{C}$",
          isCorrect: false,
          feedback:
            "Teplota může klesnout i pod 22 °C — až na 20 °C.",
        },
      ],
      explanation:
        "$|T - 22| \\leq 2$ → $-2 \\leq T - 22 \\leq 2$ → $20 \\leq T \\leq 24$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "$|x|$ je vzdálenost od nuly — jako na teploměru nebo mapě. Vždy $\\geq 0$.",
      "Graf $|x|$ je V-tvar. $|x - a|$ posune vrchol do $[a; 0]$.",
      "$|f(x)| = a$ → dva případy: $f(x) = a$ nebo $f(x) = -a$. Pro $a < 0$ nemá řešení.",
      "$|x| < a$ → $x \\in (-a; a)$; $|x| > a$ → $x < -a$ nebo $x > a$.",
      "V praxi: tolerance výroby, teplotní rozmezí, vzdálenost od cíle.",
    ],
  },
  nextTopicSuggestion: "nerovnice",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "absolute-value",
  order: 1,
  title: "Absolutní hodnota",
  lesson,
};
