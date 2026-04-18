import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Logaritmická funkce",
  steps: [
    {
      type: "explore",
      prompt:
        "Na grafu vidíte exponenciální funkci $f(x) = 2^x$. Zkuste odpovědět: pokud $2^x = 8$, jaké je $x$? Najděte odpověď přímo na grafu — kde má funkce hodnotu 8?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "exponential",
          defaultParams: { a: 2 },
          xRange: [-2, 6],
          yRange: [-1, 20],
          showGrid: true,
        },
      },
      followUpQuestion:
        'Na grafu vidíte, že $f(3) = 8$. Otázka "na jaký exponent musím umocnit 2, abych dostal 8?" je přesně to, co počítá **logaritmus**: $\\log_2 8 = 3$.',
    },
    {
      type: "explain",
      body: "**Logaritmus** $\\log_a b = c$ odpovídá na otázku: $a^c = b$. Je to **inverzní operace** k umocňování — převrací exponenciálu.",
      callout: "Definice",
    },
    {
      type: "explore",
      prompt:
        "Teď se podívejte na graf logaritmické funkce $f(x) = \\log_2 x$. Porovnejte ji s exponenciálou $g(x) = 2^x$. Jsou si nějak podobné?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "logarithmic",
          defaultParams: { a: 2 },
          xRange: [-2, 10],
          yRange: [-4, 6],
          showGrid: true,
          showAsymptote: true,
          compareFunction: { functionType: "exponential", params: { a: 2 } },
        },
      },
      followUpQuestion:
        "Logaritmická funkce je **zrcadlový obraz** exponenciály podle přímky $y = x$. Prochází bodem $[1; 0]$ (protože $\\log_a 1 = 0$).",
    },
    {
      type: "text-input",
      question: "Kolik je $\\log_2 8$?",
      expectedAnswer: "3",
      acceptableAnswers: ["3"],
      explanation: "$2^3 = 8$, tedy $\\log_2 8 = 3$.",
      hints: ["$2^? = 8$."],
    },
    {
      type: "multiple-choice",
      question: "Kolik je $\\log_{10} 1000$?",
      choices: [
        {
          label: "$2$",
          isCorrect: false,
          feedback: "$10^2 = 100 \\neq 1000$.",
        },
        {
          label: "$3$",
          isCorrect: true,
          feedback: "$10^3 = 1000$, takže $\\log_{10} 1000 = 3$.",
        },
        {
          label: "$4$",
          isCorrect: false,
          feedback: "$10^4 = 10\\,000 \\neq 1000$.",
        },
      ],
      explanation:
        "$\\log_{10}$ se nazývá **dekadický logaritmus** a značí se $\\log$. V české matematice píšeme $\\log$ pro základ 10.",
    },
    {
      type: "explain",
      body: "**Pravidla pro logaritmy** (odpovídají pravidlům mocnin):\n\n- $\\log_a(xy) = \\log_a x + \\log_a y$\n- $\\log_a \\frac{x}{y} = \\log_a x - \\log_a y$\n- $\\log_a x^n = n \\cdot \\log_a x$\n- $\\log_a 1 = 0$, $\\log_a a = 1$",
      callout: "Pravidla",
    },
    {
      type: "text-input",
      question: "Kolik je $\\log_2 32$?",
      expectedAnswer: "5",
      acceptableAnswers: ["5"],
      explanation: "$2^5 = 32$, tedy $\\log_2 32 = 5$.",
      hints: ["$32 = 2^?$"],
    },
    {
      type: "explore",
      prompt:
        "Podívejte se, co se děje s grafem $\\log_2 x$ pro $x$ blížící se nule zprava. Proč je logaritmus definován jen pro $x > 0$?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "logarithmic",
          defaultParams: { a: 2 },
          xRange: [-1, 10],
          yRange: [-6, 5],
          showGrid: true,
          showAsymptote: true,
        },
      },
      followUpQuestion:
        "Graf se blíží k ose $y$ (svislá asymptota v $x = 0$), ale nikdy ji neprotne. $\\log_a 0$ neexistuje a pro $x < 0$ logaritmus není definován.",
    },
    {
      type: "reveal",
      question: "Co je **přirozený logaritmus** $\\ln$ a kde se používá?",
      revealedContent:
        "$\\ln x = \\log_e x$, kde $e \\approx 2{,}718$. Přirozený logaritmus se používá v přírodních vědách — popisuje radioaktivní rozpad, růst populací, spojité úročení.\n\nPlatí: $\\ln e = 1$ a $\\ln 1 = 0$.",
    },
    {
      type: "multiple-choice",
      question: "Zjednodušte $\\log_3 9 + \\log_3 3$.",
      choices: [
        {
          label: "$\\log_3 12$",
          isCorrect: false,
          feedback:
            "Sčítání logaritmů = logaritmus součinu, ne součtu: $\\log_3(9 \\cdot 3) = \\log_3 27$.",
        },
        {
          label: "$3$",
          isCorrect: true,
          feedback:
            "$\\log_3 9 + \\log_3 3 = 2 + 1 = 3$. Nebo: $\\log_3(9 \\cdot 3) = \\log_3 27 = 3$.",
        },
        {
          label: "$5$",
          isCorrect: false,
          feedback: "$\\log_3 9 = 2$ a $\\log_3 3 = 1$, součet je $3$.",
        },
      ],
      explanation:
        "$\\log_a x + \\log_a y = \\log_a(xy)$. Tedy $\\log_3 27 = 3$, protože $3^3 = 27$.",
    },
    {
      type: "text-input",
      question: "Vyřešte $\\log_2 x = 5$. Jaké je $x$?",
      expectedAnswer: "32",
      acceptableAnswers: ["32", "x=32", "x = 32"],
      explanation:
        "Převedeme na exponenciální tvar: $x = 2^5 = 32$.",
      hints: ["$\\log_a b = c$ znamená $a^c = b$."],
    },
    {
      type: "explore",
      prompt:
        "Porovnejte $\\log_2 x$ (černá) a $\\log_{10} x$ (červená). Který logaritmus roste rychleji?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "logarithmic",
          defaultParams: { a: 2 },
          xRange: [-1, 20],
          yRange: [-3, 6],
          showGrid: true,
          compareFunction: { functionType: "logarithmic", params: { a: 10 } },
        },
      },
      followUpQuestion:
        "Menší základ = rychlejší růst logaritmu. $\\log_2 x$ roste rychleji než $\\log_{10} x$, protože základ 2 je menší.",
    },
    {
      type: "text-input",
      question:
        "Vyřešte $\\log_3 x = 4$. Jaké je $x$?",
      expectedAnswer: "81",
      acceptableAnswers: ["81", "x=81", "x = 81"],
      explanation:
        "$x = 3^4 = 81$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "$\\log_a b = c$ znamená $a^c = b$. Logaritmus je inverze k umocnění.",
      "Graf $\\log_a x$ je zrcadlový obraz $a^x$ podle přímky $y = x$.",
      "Definováno jen pro $x > 0$. Svislá asymptota v $x = 0$.",
      "Pravidla: $\\log(xy) = \\log x + \\log y$, $\\log x^n = n \\log x$.",
      "$\\ln x = \\log_e x$ je přirozený logaritmus ($e \\approx 2{,}718$).",
    ],
  },
  nextTopicSuggestion: "goniometricke-funkce",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "logarithmic-functions",
  order: 1,
  title: "Logaritmická funkce",
  lesson,
};
