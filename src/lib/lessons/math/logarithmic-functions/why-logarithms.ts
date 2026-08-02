import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Proč logaritmy",
  stage: {
    type: "log-slide-rule",
    initial: { offset: 0 },
    readouts: ["alignedValue", "offsetLog"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Tahle pravítka mají divné dělení. Podívej se, kde leží 1, 2, 4 a 8 — mezery mezi nimi jsou stejně velké, i když čísla rostou dvakrát rychleji.",
    },
    {
      kind: "manipulate",
      prompt: "Posuň horní pravítko doprava tak, aby jeho jednička stála přesně nad dolní trojkou.",
      goal: { readout: "alignedValue", target: 3, within: 0.08 },
      onReached:
        "Dobře. A teď to hlavní: podívej se, jaké číslo dolního pravítka leží pod horní čtyřkou. Je to 12 — tedy 3 krát 4.",
      nudge: "Posouvej pomalu doprava. Červená čára ukazuje, na kterém čísle dole horní jednička stojí.",
      highlight: ["aligned"],
    },
    {
      kind: "predict",
      prompt: "Posuneme pravítko dál, až horní jednička stane nad dolní pětkou.",
      question: "Jaké číslo bude ležet pod horní šestkou?",
      options: [
        { label: "11", isCorrect: false },
        { label: "30", isCorrect: true },
        { label: "56", isCorrect: false },
      ],
      then: { offset: 0.69897 },
      reveal:
        "30, tedy 5 krát 6. Posunutí o kus doprava nesčítá čísla — násobí je. Sčítají se vzdálenosti.",
    },
  ],
  naming: {
    observation:
      "Vzdálenost čísla od jedničky je to, co se sčítá, když se čísla násobí. Právě tuhle vzdálenost jsi celou dobu posouval.",
    formula: "\\log(ab) = \\log a + \\log b",
    mapping:
      "Logaritmus **je** ta vzdálenost. Proto se násobení na pravítku dělá sčítáním — a proto se s logaritmy počítalo dřív, než existovaly kalkulačky.",
  },
  apply: [
    {
      type: "multiple-choice",
      question: "Kolik je $\\log(2 \\cdot 50)$, když víš, že $\\log 2 \\doteq 0{,}30$ a $\\log 50 \\doteq 1{,}70$?",
      choices: [
        {
          label: "$0{,}51$",
          isCorrect: false,
          feedback: "To by byl součin logaritmů. Na pravítku se ale vzdálenosti sčítají.",
        },
        {
          label: "$2{,}00$",
          isCorrect: true,
          feedback: "Ano — vzdálenosti se sečtou: $0{,}30 + 1{,}70 = 2{,}00$, a opravdu $2 \\cdot 50 = 100$.",
        },
        {
          label: "$1{,}40$",
          isCorrect: false,
          feedback: "To je rozdíl, který by odpovídal dělení, ne násobení.",
        },
      ],
      explanation:
        "Součin uvnitř logaritmu se venku mění na součet — přesně to posouvání pravítka, které jsi dělal.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Logaritmus je vzdálenost čísla od jedničky na násobící stupnici.",
      "Násobení čísel odpovídá sčítání jejich logaritmů.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "why-logarithms",
  topicSlug: "logarithmic-functions",
  order: 2,
  format: "stage",
  title: "Proč logaritmy",
  lesson,
};
