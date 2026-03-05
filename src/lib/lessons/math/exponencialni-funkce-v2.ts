import type { LessonV2 } from "@/types/lesson-v2";

export const exponencialniFunkceV2Beginner: LessonV2 = {
  title: "Exponenciální funkce",
  steps: [
    {
      type: "multiple-choice",
      question: "Na účtu máte 1000 Kč s úrokem 10 % ročně. Kolik budete mít po 2 letech (složené úročení)?",
      choices: [
        { label: "$1200$ Kč", isCorrect: false, feedback: "To je jednoduché úročení: $1000 + 2 \\cdot 100$." },
        { label: "$1210$ Kč", isCorrect: true, feedback: "Složené: $1000 \\cdot 1{,}1^2 = 1210$ Kč ✓" },
        { label: "$1100$ Kč", isCorrect: false, feedback: "To je po 1 roce." },
      ],
      explanation: "Složené úročení: $K_n = K_0 \\cdot (1 + r)^n = 1000 \\cdot 1{,}1^2 = 1210$. To je exponenciální růst.",
    },
    {
      type: "explain",
      body: "**Exponenciální funkce**:\n\n$$f(x) = a^x, \\quad a > 0, \\; a \\neq 1$$\n\n- $a > 1$: **exponenciální růst** (funkce roste stále rychleji)\n- $0 < a < 1$: **exponenciální pokles** (klesá k nule)\n\nGraf vždy prochází bodem $[0; 1]$, protože $a^0 = 1$.",
      callout: "Definice",
    },
    {
      type: "multiple-choice",
      question: "Funkce $f(x) = 0{,}5^x$ je příkladem:",
      choices: [
        { label: "Exponenciálního růstu", isCorrect: false, feedback: "$0{,}5 < 1$, takže hodnoty klesají." },
        { label: "Exponenciálního poklesu", isCorrect: true, feedback: "Ano! $0{,}5^1 = 0{,}5$, $0{,}5^2 = 0{,}25$, ..." },
        { label: "Lineárního poklesu", isCorrect: false, feedback: "Pokles není konstantní — je stále pomalejší." },
      ],
      explanation: "Pro $0 < a < 1$ funkce klesá. Např. radioaktivní rozpad: poločas rozpadu = exponenciální pokles.",
    },
    {
      type: "explain",
      body: "**Pravidla pro mocniny** (základ pro počítání s exponenciálami):\n\n- $a^m \\cdot a^n = a^{m+n}$\n- $\\frac{a^m}{a^n} = a^{m-n}$\n- $(a^m)^n = a^{m \\cdot n}$\n- $a^0 = 1$, $a^{-n} = \\frac{1}{a^n}$",
      callout: "Pravidla",
    },
    {
      type: "text-input",
      question: "Zjednodušte $2^3 \\cdot 2^4$.",
      expectedAnswer: "128",
      acceptableAnswers: ["2^7", "128"],
      explanation: "$2^3 \\cdot 2^4 = 2^{3+4} = 2^7 = 128$.",
    },
    {
      type: "text-input",
      question: "Zjednodušte $\\frac{3^5}{3^2}$.",
      expectedAnswer: "27",
      acceptableAnswers: ["3^3", "27"],
      explanation: "$\\frac{3^5}{3^2} = 3^{5-2} = 3^3 = 27$.",
    },
    {
      type: "explain",
      body: "**Exponenciální rovnice**: rovnice, kde neznámá je v exponentu.\n\nZákladní postup: převedeme obě strany na **stejný základ**.\n\n$$2^x = 16 \\Rightarrow 2^x = 2^4 \\Rightarrow x = 4$$",
      callout: "Rovnice",
    },
    {
      type: "text-input",
      question: "Vyřešte $3^x = 81$.",
      expectedAnswer: "4",
      acceptableAnswers: ["x=4", "x = 4"],
      wrongAnswerFeedback: {
        "3": "$3^3 = 27 \\neq 81$. Zkuste $3^4$.",
      },
      explanation: "$81 = 3^4$, tedy $3^x = 3^4 \\Rightarrow x = 4$.",
      hints: ["Vyjádřete 81 jako mocninu 3."],
    },
    {
      type: "multiple-choice",
      question: "Vyřešte $5^{2x} = 25$.",
      choices: [
        { label: "$x = 2$", isCorrect: false, feedback: "$5^{2 \\cdot 2} = 5^4 = 625 \\neq 25$." },
        { label: "$x = 1$", isCorrect: true, feedback: "$5^{2 \\cdot 1} = 5^2 = 25$ ✓" },
        { label: "$x = 5$", isCorrect: false, feedback: "$5^{10}$ je obrovské číslo." },
      ],
      explanation: "$25 = 5^2$. Tedy $5^{2x} = 5^2 \\Rightarrow 2x = 2 \\Rightarrow x = 1$.",
    },
    {
      type: "text-input",
      question: "Vyřešte $4^x = 8$. (Tip: $4 = 2^2$, $8 = 2^3$.)",
      expectedAnswer: "1,5",
      acceptableAnswers: ["3/2", "1.5", "1,5", "x=3/2", "x=1,5"],
      explanation: "$4^x = (2^2)^x = 2^{2x}$ a $8 = 2^3$. Tedy $2x = 3 \\Rightarrow x = \\frac{3}{2}$.",
      hints: ["Převedte obě strany na základ 2."],
    },
    {
      type: "reveal",
      question: "Proč exponenciální růst tak překvapuje?",
      revealedContent: "Lidský mozek intuitivně myslí lineárně. Ale exponenciální růst se zrychluje: $2^{10} = 1024$, $2^{20} \\approx 1\\,000\\,000$, $2^{30} \\approx 1\\,000\\,000\\,000$.\n\nKaždých 10 kroků se hodnota **ztisícinásobí**. Proto se šíření virů, úroky i růst technologií zdají tak překvapivé.",
    },
    {
      type: "sort-order",
      question: "Seřaďte od nejmenší po největší hodnotu:",
      items: [
        "$2^{-1} = 0{,}5$",
        "$2^0 = 1$",
        "$2^3 = 8$",
        "$2^{10} = 1024$",
      ],
      explanation: "Exponenciální funkce se základem $a > 1$ je rostoucí: větší exponent = větší hodnota.",
    },
    {
      type: "text-input",
      question: "Populace bakterií se každé 3 hodiny ztrojnásobí. Na začátku je 100 bakterií. Kolik jich bude po 9 hodinách?",
      expectedAnswer: "2700",
      acceptableAnswers: ["2700"],
      explanation: "Za 9 hodin proběhnou $9 \\div 3 = 3$ ztrojnásobení: $100 \\cdot 3^3 = 100 \\cdot 27 = 2700$.",
      hints: ["Kolikrát se ztrojnásobí za 9 hodin?"],
    },
  ],
  summary: {
    keyTakeaways: [
      "Exponenciální funkce: $f(x) = a^x$. Pro $a > 1$ roste, pro $0 < a < 1$ klesá.",
      "Klíčová pravidla: $a^m \\cdot a^n = a^{m+n}$, $\\frac{a^m}{a^n} = a^{m-n}$, $(a^m)^n = a^{mn}$.",
      "Exponenciální rovnice řešíme převodem na stejný základ.",
      "Graf vždy prochází bodem $[0; 1]$.",
      "Exponenciální růst je mnohem rychlejší než lineární.",
    ],
  },
  nextTopicSuggestion: "logaritmicka-funkce",
};
