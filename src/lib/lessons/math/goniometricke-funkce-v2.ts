import type { LessonV2 } from "@/types/lesson-v2";

export const goniometrickeFunkceV2Beginner: LessonV2 = {
  title: "Goniometrické funkce",
  steps: [
    {
      type: "multiple-choice",
      question: "V pravoúhlém trojúhelníku s přeponou $c = 10$ a protilehlou odvěsnou $a = 6$. Kolik je $\\sin \\alpha$?",
      choices: [
        { label: "$0{,}6$", isCorrect: true, feedback: "$\\sin \\alpha = \\frac{\\text{protilehlá}}{\\text{přepona}} = \\frac{6}{10} = 0{,}6$ ✓" },
        { label: "$0{,}8$", isCorrect: false, feedback: "To by byl kosinus (přilehlá/přepona), pokud přilehlá = 8." },
        { label: "$1{,}67$", isCorrect: false, feedback: "Sinus je vždy mezi $-1$ a $1$." },
      ],
      explanation: "V pravoúhlém trojúhelníku: $\\sin \\alpha = \\frac{\\text{protilehlá odvěsna}}{\\text{přepona}}$.",
    },
    {
      type: "explain",
      body: "**Goniometrické funkce** v pravoúhlém trojúhelníku:\n\n$$\\sin \\alpha = \\frac{\\text{protilehlá}}{\\text{přepona}}, \\quad \\cos \\alpha = \\frac{\\text{přilehlá}}{\\text{přepona}}, \\quad \\text{tg}\\,\\alpha = \\frac{\\text{protilehlá}}{\\text{přilehlá}}$$\n\nPro libovolné úhly definujeme funkce pomocí **jednotkové kružnice**.",
      callout: "Definice",
    },
    {
      type: "explain",
      body: "**Jednotková kružnice**: kružnice se středem v počátku a poloměrem 1.\n\nBod na kružnici pod úhlem $\\alpha$ má souřadnice $[\\cos \\alpha; \\sin \\alpha]$.\n\n- $\\sin 0° = 0$, $\\cos 0° = 1$\n- $\\sin 90° = 1$, $\\cos 90° = 0$\n- $\\sin 180° = 0$, $\\cos 180° = -1$",
      callout: "Jednotková kružnice",
    },
    {
      type: "sort-order",
      question: "Seřaďte hodnoty $\\sin \\alpha$ od nejmenší po největší:",
      items: [
        "$\\sin 0° = 0$",
        "$\\sin 30° = 0{,}5$",
        "$\\sin 60° = \\frac{\\sqrt{3}}{2} \\approx 0{,}87$",
        "$\\sin 90° = 1$",
      ],
      explanation: "Sinus roste od $0°$ do $90°$ z hodnoty 0 na 1.",
    },
    {
      type: "text-input",
      question: "Kolik je $\\sin 30°$?",
      expectedAnswer: "0,5",
      acceptableAnswers: ["0.5", "0,5", "1/2"],
      explanation: "$\\sin 30° = \\frac{1}{2} = 0{,}5$. Toto je jedna ze základních hodnot.",
    },
    {
      type: "multiple-choice",
      question: "Kolik je $\\cos 60°$?",
      choices: [
        { label: "$\\frac{1}{2}$", isCorrect: true, feedback: "Ano! $\\cos 60° = \\frac{1}{2}$." },
        { label: "$\\frac{\\sqrt{3}}{2}$", isCorrect: false, feedback: "To je $\\cos 30°$." },
        { label: "$0$", isCorrect: false, feedback: "To je $\\cos 90°$." },
      ],
      explanation: "$\\cos 60° = \\sin 30° = \\frac{1}{2}$. Platí vztah $\\cos \\alpha = \\sin(90° - \\alpha)$.",
    },
    {
      type: "explain",
      body: "Důležitý vztah:\n\n$$\\sin^2 \\alpha + \\cos^2 \\alpha = 1$$\n\nTo plyne z Pythagorovy věty na jednotkové kružnici: $x^2 + y^2 = 1$.",
      callout: "Základní identita",
    },
    {
      type: "text-input",
      question: "Víte, že $\\sin \\alpha = 0{,}6$ a $\\alpha$ je ostrý. Kolik je $\\cos \\alpha$?",
      expectedAnswer: "0,8",
      acceptableAnswers: ["0.8", "0,8", "4/5"],
      explanation: "$\\cos^2 \\alpha = 1 - \\sin^2 \\alpha = 1 - 0{,}36 = 0{,}64$. $\\cos \\alpha = 0{,}8$ (kladný, protože ostrý úhel).",
      hints: ["Použijte $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$."],
    },
    {
      type: "explain",
      body: "**Grafy**: $\\sin x$ i $\\cos x$ jsou periodické s periodou $2\\pi$ ($360°$).\n\n- **Perioda**: po kolika se vzor opakuje\n- **Amplituda**: maximální výchylka (u $\\sin$ a $\\cos$ je to 1)\n\nFunkce $\\text{tg}\\,x = \\frac{\\sin x}{\\cos x}$ má periodu $\\pi$ ($180°$).",
    },
    {
      type: "multiple-choice",
      question: "Jaká je perioda funkce $\\sin x$?",
      choices: [
        { label: "$\\pi$", isCorrect: false, feedback: "To je perioda tangenty." },
        { label: "$2\\pi$", isCorrect: true, feedback: "Ano! $\\sin(x + 2\\pi) = \\sin x$." },
        { label: "$4\\pi$", isCorrect: false, feedback: "Funkce se opakuje už po $2\\pi$." },
      ],
      explanation: "Sinus a kosinus mají periodu $2\\pi = 360°$.",
    },
    {
      type: "reveal",
      question: "Jak se změní graf $\\sin x$ u funkce $2\\sin(3x)$?",
      revealedContent: "- Koeficient **2** před $\\sin$ mění **amplitudu**: výchylka je $2$ místo $1$.\n- Koeficient **3** u $x$ mění **periodu**: $T = \\frac{2\\pi}{3}$ (třikrát rychlejší kmitání).\n\nObecně: $A\\sin(Bx)$ má amplitudu $|A|$ a periodu $\\frac{2\\pi}{|B|}$.",
    },
    {
      type: "text-input",
      question: "Kolik je $\\text{tg}\\,45°$?",
      expectedAnswer: "1",
      explanation: "$\\text{tg}\\,45° = \\frac{\\sin 45°}{\\cos 45°} = \\frac{\\frac{\\sqrt{2}}{2}}{\\frac{\\sqrt{2}}{2}} = 1$.",
    },
    {
      type: "multiple-choice",
      question: "V jakém kvadrantu je $\\sin \\alpha > 0$ a $\\cos \\alpha < 0$?",
      choices: [
        { label: "I. kvadrant", isCorrect: false, feedback: "V I. kvadrantu jsou oba kladné." },
        { label: "II. kvadrant", isCorrect: true, feedback: "Správně! $\\sin > 0$ (nad osou $x$), $\\cos < 0$ (vlevo od osy $y$)." },
        { label: "III. kvadrant", isCorrect: false, feedback: "V III. jsou oba záporné." },
      ],
      explanation: "II. kvadrant: úhly $90°$--$180°$. $\\sin$ kladný, $\\cos$ záporný.",
    },
    {
      type: "text-input",
      question: "Vyřešte $\\sin x = 0$ pro $x \\in \\langle 0°; 360° \\rangle$. Kolik řešení existuje?",
      expectedAnswer: "3",
      wrongAnswerFeedback: {
        "2": "Nezapomeňte na $x = 360° = 0°$ — ale pozor, pokud interval zahrnuje oba konce, jsou to $0°$, $180°$, $360°$.",
      },
      explanation: "$\\sin x = 0$ pro $x = 0°, 180°, 360°$ — celkem 3 řešení v uzavřeném intervalu.",
    },
  ],
  summary: {
    keyTakeaways: [
      "$\\sin$, $\\cos$, $\\text{tg}$ definujeme pomocí pravoúhlého trojúhelníku nebo jednotkové kružnice.",
      "Základní identita: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.",
      "Sinus a kosinus mají periodu $2\\pi$, tangenta $\\pi$.",
      "Důležité hodnoty: $\\sin 30° = \\frac{1}{2}$, $\\sin 45° = \\frac{\\sqrt{2}}{2}$, $\\sin 60° = \\frac{\\sqrt{3}}{2}$.",
      "Znaménka závisí na kvadrantu jednotkové kružnice.",
    ],
  },
  nextTopicSuggestion: "absolutni-hodnota",
};
