import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Exponenciální funkce",
  steps: [
    {
      type: "explore",
      prompt:
        "Pohybujte základem $a$ v grafu $f(x) = a^x$. Začněte na $a = 2$ a postupně zvyšujte. Jak se mění rychlost růstu? Co se stane, když $a$ snížíte pod 1?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "exponential",
          defaultParams: { a: 2 },
          xRange: [-4, 6],
          yRange: [-1, 20],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Pro $a > 1$ funkce roste (čím větší $a$, tím rychleji). Pro $0 < a < 1$ funkce klesá. Všimněte si: graf vždy prochází bodem $[0; 1]$.",
    },
    {
      type: "multiple-choice",
      question:
        "Bakterie se každou hodinu zdvojnásobí. Začínáte s 1 bakterií. Kolik jich bude po 5 hodinách?",
      choices: [
        {
          label: "$10$",
          isCorrect: false,
          feedback:
            "To je lineární růst ($1 + 2 \\cdot 5$). Bakterie se zdvojnásobují — násobí se!",
        },
        {
          label: "$32$",
          isCorrect: true,
          feedback: "$2^5 = 32$. Každá hodina zdvojnásobí: $1 \\to 2 \\to 4 \\to 8 \\to 16 \\to 32$.",
        },
        {
          label: "$25$",
          isCorrect: false,
          feedback: "$5^2 = 25$ — to není zdvojnásobení, ale umocnění.",
        },
      ],
      explanation:
        "Zdvojnásobení = násobení dvěma. Po $x$ hodinách: $f(x) = 2^x$. To je exponenciální funkce.",
    },
    {
      type: "explain",
      body: "**Exponenciální funkce**: $f(x) = a^x$, kde $a > 0$, $a \\neq 1$. Pro $a > 1$ roste stále rychleji, pro $0 < a < 1$ klesá k nule.",
    },
    {
      type: "explore",
      prompt:
        "Nastavte základ na $a = 0{,}5$. Funkce $f(x) = 0{,}5^x$ popisuje třeba rozpad léku v těle — za každou hodinu zbude polovina. Sledujte, jak rychle klesá.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "exponential",
          defaultParams: { a: 0.5 },
          xRange: [-2, 8],
          yRange: [-0.5, 5],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Pro $a = 0{,}5$ vidíte **exponenciální pokles**. Za každý krok zbude polovina. Funkce se blíží nule, ale nikdy ji nedosáhne.",
    },
    {
      type: "multiple-choice",
      question: "Která z funkcí popisuje exponenciální **pokles**?",
      choices: [
        {
          label: "$f(x) = 3^x$",
          isCorrect: false,
          feedback: "$3 > 1$ → exponenciální růst.",
        },
        {
          label: "$f(x) = 0{,}8^x$",
          isCorrect: true,
          feedback: "$0 < 0{,}8 < 1$ → exponenciální pokles.",
        },
        {
          label: "$f(x) = -2^x$",
          isCorrect: false,
          feedback:
            "Záporné znaménko před celou funkcí není totéž co základ mezi 0 a 1.",
        },
      ],
      explanation:
        "Pokles nastává, když je základ $0 < a < 1$. Tehdy se hodnota s každým krokem zmenšuje.",
    },
    {
      type: "text-input",
      question: "Kolik je $2^5$?",
      expectedAnswer: "32",
      explanation:
        "$2^5 = 2 \\cdot 2 \\cdot 2 \\cdot 2 \\cdot 2 = 32$.",
    },
    {
      type: "explain",
      body: "Důležité vlastnosti: $a^0 = 1$ (proto graf prochází $[0; 1]$) a $a^{-n} = \\frac{1}{a^n}$ (záporný exponent = převrácená hodnota).",
      callout: "Klíčové",
    },
    {
      type: "text-input",
      question: "Kolik je $3^{-2}$? (Zapište jako zlomek nebo desetinné číslo.)",
      expectedAnswer: "1/9",
      acceptableAnswers: ["1/9", "0,11", "0.11"],
      numericTolerance: 0.01,
      explanation:
        "$3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}$.",
      hints: ["$a^{-n} = \\frac{1}{a^n}$."],
    },
    {
      type: "explore",
      prompt:
        "Porovnejte $2^x$ (černá) a $3^x$ (červená). Který základ roste rychleji? Kde se obě funkce protínají?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "exponential",
          defaultParams: { a: 2 },
          xRange: [-3, 5],
          yRange: [-1, 20],
          showGrid: true,
          compareFunction: { functionType: "exponential", params: { a: 3 } },
        },
      },
      followUpQuestion:
        "Obě prochází bodem $[0; 1]$ (protože $a^0 = 1$). Pro $x > 0$ je $3^x$ vždy nad $2^x$ — větší základ = rychlejší růst.",
    },
    {
      type: "reveal",
      question: "Co je to Eulerovo číslo $e$ a proč je tak důležité?",
      revealedContent:
        "$e \\approx 2{,}718$. Funkce $e^x$ má unikátní vlastnost: **její derivace je ona sama** ($\\frac{d}{dx}e^x = e^x$).\n\nProto se $e^x$ objevuje v přírodě všude — populační růst, radioaktivní rozpad, spojité úročení. Jméno má po matematikovi Leonhardu Eulerovi.",
    },
    {
      type: "multiple-choice",
      question: "Vyřešte $5^{2x} = 25$.",
      choices: [
        {
          label: "$x = 2$",
          isCorrect: false,
          feedback: "$5^{2 \\cdot 2} = 5^4 = 625 \\neq 25$.",
        },
        {
          label: "$x = 1$",
          isCorrect: true,
          feedback: "$5^{2 \\cdot 1} = 5^2 = 25$.",
        },
        {
          label: "$x = 5$",
          isCorrect: false,
          feedback: "$5^{10}$ je obrovské číslo.",
        },
      ],
      explanation:
        "$25 = 5^2$. Takže $5^{2x} = 5^2 \\Rightarrow 2x = 2 \\Rightarrow x = 1$.",
    },
    {
      type: "text-input",
      question:
        "Vyřešte $2^x = 16$. Kolik je $x$?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "x=4", "x = 4"],
      wrongAnswerFeedback: {
        "8": "$2^8 = 256$. Zkuste menší exponent.",
        "3": "$2^3 = 8 \\neq 16$. Zkuste $2^4$.",
      },
      explanation:
        "$16 = 2^4$, tedy $x = 4$.",
      hints: ["Vyjádřete 16 jako mocninu dvojky."],
    },
    {
      type: "text-input",
      question:
        "Populace bakterií se každé 2 hodiny ztrojnásobí. Na začátku je 100 bakterií. Kolik jich bude po 6 hodinách?",
      expectedAnswer: "2700",
      explanation:
        "Za 6 hodin proběhnou $6 \\div 2 = 3$ ztrojnásobení: $100 \\cdot 3^3 = 100 \\cdot 27 = 2700$.",
      hints: ["Kolikrát se ztrojnásobí za 6 hodin?"],
    },
  ],
  summary: {
    keyTakeaways: [
      "Exponenciální funkce $f(x) = a^x$: pro $a > 1$ roste, pro $0 < a < 1$ klesá.",
      "Graf vždy prochází bodem $[0; 1]$, protože $a^0 = 1$.",
      "$a^{-n} = \\frac{1}{a^n}$. Větší základ = rychlejší růst.",
      "Exponenciální rovnice řešíme převodem na stejný základ.",
      "Číslo $e \\approx 2{,}718$ je přirozený základ exponenciály.",
    ],
  },
  nextTopicSuggestion: "logaritmicka-funkce",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "exponential-functions",
  order: 1,
  title: "Exponenciální funkce",
  lesson,
};
