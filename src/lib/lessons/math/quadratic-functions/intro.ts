import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Kvadratická funkce",
  steps: [
    {
      type: "explore",
      prompt:
        "Pohybujte parametrem $a$ v rovnici $f(x) = ax^2$. Sledujte, co se děje s tvarem paraboly, když $a$ roste, klesá, nebo se mění znaménko.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "quadratic",
          defaultParams: { a: 1, b: 0, c: 0 },
          xRange: [-6, 6],
          yRange: [-8, 10],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Všimli jste si? Kladné $a$ otevírá parabolu nahoru, záporné dolů. Čím větší $|a|$, tím užší tvar.",
    },
    {
      type: "multiple-choice",
      question:
        "Na základě toho, co jste viděli: jak vypadá parabola $f(x) = -3x^2$?",
      choices: [
        {
          label: "Úzká, otevřená nahoru",
          isCorrect: false,
          feedback: "Záporné $a$ otevírá parabolu dolů, ne nahoru.",
        },
        {
          label: "Úzká, otevřená dolů",
          isCorrect: true,
          feedback:
            "$a = -3 < 0$ → dolů, $|a| = 3 > 1$ → užší než $x^2$.",
        },
        {
          label: "Široká, otevřená dolů",
          isCorrect: false,
          feedback: "$|a| = 3$ je velké číslo → parabola je úzká, ne široká.",
        },
      ],
      explanation:
        "Znaménko $a$ určuje směr otevření, velikost $|a|$ určuje šířku paraboly.",
    },
    {
      type: "explore",
      prompt:
        "Teď měňte parametr $c$ (nechte $a = 1$, $b = 0$). Jak se posouvá parabola při změně $c$?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "quadratic",
          defaultParams: { a: 1, b: 0, c: 0 },
          xRange: [-6, 6],
          yRange: [-8, 10],
          showGrid: true,
          showVertex: true,
        },
      },
      followUpQuestion:
        "Parametr $c$ posouvá parabolu svisle — je to průsečík s osou $y$ (hodnota $f(0)$).",
    },
    {
      type: "explain",
      body: "Kvadratická funkce $f(x) = ax^2 + bx + c$ má graf — **parabolu**. Její tvar závisí na třech parametrech: $a$ (otevření), $b$ (vodorovný posun), $c$ (svislý posun).",
    },
    {
      type: "text-input",
      question:
        "Parabola $f(x) = 2x^2 + 4x - 6$ protíná osu $y$. V jakém bodě? (Zadejte $y$-ovou souřadnici.)",
      expectedAnswer: "-6",
      acceptableAnswers: ["-6", "y=-6"],
      explanation:
        "Průsečík s osou $y$: dosadíme $x = 0$ → $f(0) = c = -6$.",
      hints: ["Co je $f(0)$?"],
    },
    {
      type: "explore",
      prompt:
        "Zapněte zobrazení **vrcholu** a měňte $b$ (při $a = 1$, $c = 0$). Sledujte, jak se vrchol posouvá.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "quadratic",
          defaultParams: { a: 1, b: -4, c: 0 },
          xRange: [-6, 6],
          yRange: [-8, 10],
          showGrid: true,
          showVertex: true,
        },
      },
      followUpQuestion:
        "Vrchol se pohybuje po parabole. Jeho $x$-ová souřadnice je $x_v = -\\frac{b}{2a}$.",
    },
    {
      type: "explain",
      body: "**Vrchol paraboly** $V = [x_v; y_v]$ najdeme takto:\n\n$$x_v = -\\frac{b}{2a}, \\quad y_v = f(x_v)$$",
      callout: "Vzorec",
    },
    {
      type: "text-input",
      question:
        "Najděte $x$-souřadnici vrcholu paraboly $f(x) = x^2 - 6x + 5$.",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "x=3", "xv=3"],
      explanation:
        "$x_v = -\\frac{-6}{2 \\cdot 1} = 3$.",
      hints: ["$x_v = -\\frac{b}{2a}$, kde $a = 1$, $b = -6$."],
    },
    {
      type: "explore",
      prompt:
        "Zapněte **kořeny** (průsečíky s osou $x$). Nastavte $a = 1$, $b = -2$, $c = -3$ a ověřte, kde parabola protíná osu $x$.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "quadratic",
          defaultParams: { a: 1, b: -2, c: -3 },
          xRange: [-5, 7],
          yRange: [-6, 8],
          showGrid: true,
          showVertex: true,
          showRoots: true,
        },
      },
      followUpQuestion:
        "Kořeny vidíte v bodech $x = -1$ a $x = 3$. Počet kořenů závisí na diskriminantu $D = b^2 - 4ac$.",
    },
    {
      type: "multiple-choice",
      question:
        "Diskriminant $D = b^2 - 4ac$ funkce $f(x) = x^2 + 2x + 5$ je $D = 4 - 20 = -16$. Co to znamená pro graf?",
      choices: [
        {
          label: "Parabola protíná osu $x$ ve dvou bodech",
          isCorrect: false,
          feedback: "To by platilo pro $D > 0$.",
        },
        {
          label: "Parabola se dotýká osy $x$ v jednom bodě",
          isCorrect: false,
          feedback: "To by platilo pro $D = 0$.",
        },
        {
          label: "Parabola neprotíná osu $x$",
          isCorrect: true,
          feedback:
            "Ano! $D < 0$ → žádné reálné kořeny, parabola je celá nad osou $x$.",
        },
      ],
      explanation:
        "$D > 0$: dva kořeny. $D = 0$: jeden kořen (dotyk). $D < 0$: žádný kořen.",
    },
    {
      type: "text-input",
      question:
        "Kolik kořenů má $f(x) = x^2 - 8x + 16$? (Spočítejte $D$.)",
      expectedAnswer: "1",
      wrongAnswerFeedback: {
        "0": "To je hodnota $D$, ne počet kořenů. $D = 0$ znamená právě jeden kořen.",
        "2": "$D = 64 - 64 = 0$, tedy jeden kořen (dotyk), ne dva.",
      },
      explanation:
        "$D = 64 - 64 = 0$ → právě jeden kořen: $x = \\frac{8}{2} = 4$. Parabola se dotýká osy $x$.",
      hints: ["$D = b^2 - 4ac = (-8)^2 - 4 \\cdot 1 \\cdot 16$."],
    },
    {
      type: "explore",
      prompt:
        "Porovnejte $f(x) = x^2$ (černá) a $g(x) = (x - 2)^2 - 1$ (červená). Jak se liší pozice vrcholu?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "quadratic",
          defaultParams: { a: 1, b: -4, c: 3 },
          xRange: [-4, 8],
          yRange: [-4, 10],
          showGrid: true,
          showVertex: true,
          compareFunction: { functionType: "quadratic", params: { a: 1, b: 0, c: 0 } },
        },
      },
      followUpQuestion:
        "Vrcholový tvar $f(x) = a(x - x_v)^2 + y_v$ přímo ukazuje posuny: $x_v$ doprava, $y_v$ nahoru.",
    },
    {
      type: "text-input",
      question:
        "Jaké jsou kořeny $f(x) = x^2 - 4x - 5$? (Menší první, oddělte středníkem.)",
      expectedAnswer: "-1; 5",
      acceptableAnswers: ["-1;5", "-1 ; 5", "-1, 5"],
      explanation:
        "$D = 16 + 20 = 36$. $x = \\frac{4 \\pm 6}{2}$: $x_1 = -1$, $x_2 = 5$.",
      hints: ["$D = b^2 - 4ac = 16 - 4 \\cdot 1 \\cdot (-5)$."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Parametr $a$ určuje směr otevření a šířku paraboly.",
      "Vrchol: $x_v = -\\frac{b}{2a}$, $y_v = f(x_v)$.",
      "Diskriminant $D = b^2 - 4ac$ rozhoduje o počtu kořenů.",
      "Průsečík s osou $y$ je hodnota $c$ (dosadíme $x = 0$).",
      "Vrcholový tvar $a(x - x_v)^2 + y_v$ ukazuje posuny grafu.",
    ],
  },
  nextTopicSuggestion: "exponencialni-funkce",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "quadratic-functions",
  order: 1,
  title: "Kvadratická funkce",
  lesson,
};
