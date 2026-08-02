import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Diskriminant",
  stage: {
    type: "parabola-roots",
    initial: { a: 1, b: 0, c: -4 },
    readouts: ["rootCount", "rootGap", "vertexY"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Táhni parabolu nahoru a dolů. Sleduj červené body — tam, kde parabola protíná vodorovnou osu.",
      highlight: ["roots"],
    },
    {
      kind: "manipulate",
      prompt: "Posuň parabolu tak, aby se osy jen dotýkala — ani ji neprotínala, ani nad ní nevisela.",
      goal: { readout: "rootGap", target: 0, within: 0.15 },
      onReached:
        "Přesně tady. Oba průsečíky se slily do jediného bodu — parabola se osy jen dotkla.",
      nudge: "Zkoušej zvedat parabolu výše. Body se k sobě přibližují.",
      highlight: ["roots"],
    },
    {
      kind: "predict",
      prompt: "Zvedneme parabolu ještě o kus výš.",
      question: "Kolik průsečíků s osou zbude?",
      options: [
        { label: "Dva", isCorrect: false },
        { label: "Jeden", isCorrect: false },
        { label: "Žádný", isCorrect: true },
      ],
      then: { c: 2 },
      reveal:
        "Žádný. Parabola se vznáší nad osou a nedotkne se jí — rovnice nemá reálné řešení.",
    },
  ],
  naming: {
    observation:
      "Viděl jsi tři stavy: dva průsečíky, pak jediný dotyk, pak žádný. Mezi nimi je přesná hranice — okamžik dotyku.",
    formula: "D = b^2 - 4ac",
    mapping:
      "Číslo $D$ měří, jak daleko jsi od té hranice. $D > 0$ — dva průsečíky. $D = 0$ — přesně ten dotyk, který jsi našel. $D < 0$ — žádný průsečík, parabola se vznáší nad osou.",
  },
  apply: [
    {
      type: "multiple-choice",
      question: "Rovnice $x^2 + 2x + 5 = 0$ má $D = 4 - 20 = -16$. Kolik má reálných řešení?",
      choices: [
        {
          label: "Dvě",
          isCorrect: false,
          feedback: "Dvě řešení nastanou při $D > 0$. Tady je $D$ záporné.",
        },
        {
          label: "Jedno",
          isCorrect: false,
          feedback: "Jedno řešení je přesně ten dotyk, tedy $D = 0$.",
        },
        {
          label: "Žádné",
          isCorrect: true,
          feedback: "Ano — záporné $D$ znamená parabolu, která osu vůbec nepotká.",
        },
      ],
      explanation:
        "Záporný diskriminant odpovídá parabole vznášející se nad osou — přesně tomu stavu, který jsi na scéně vyrobil.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Diskriminant měří vzdálenost od okamžiku, kdy se parabola osy jen dotkne.",
      "Platí: $D > 0$ znamená dva kořeny, $D = 0$ jeden dvojnásobný kořen a $D < 0$ žádný reálný kořen.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "discriminant",
  topicSlug: "quadratic-equations",
  order: 2,
  format: "stage",
  title: "Diskriminant",
  lesson,
};
