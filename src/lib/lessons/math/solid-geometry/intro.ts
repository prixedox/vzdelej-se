import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Stereometrie -- tělesa",
  steps: [
    {
      type: "multiple-choice",
      question: "Krychle má hranu $a = 3$ cm. Jaký je její objem?",
      choices: [
        { label: "$9\\,\\text{cm}^3$", isCorrect: false, feedback: "To je $a^2$ — obsah jedné stěny." },
        { label: "$27\\,\\text{cm}^3$", isCorrect: true, feedback: "$V = a^3 = 3^3 = 27$ ✓" },
        { label: "$18\\,\\text{cm}^3$", isCorrect: false, feedback: "To je $6a$ — šest hran? Ne, objem je $a^3$." },
      ],
      explanation: "Objem krychle: $V = a^3$. Povrch: $S = 6a^2$.",
    },
    {
      type: "explain",
      body: "**Základní tělesa a jejich objemy**:\n\n| Těleso | Objem |\n|---|---|\n| Kvádr | $V = abc$ |\n| Hranol | $V = S_{\\text{podstava}} \\cdot v$ |\n| Jehlan | $V = \\frac{1}{3} S_{\\text{podstava}} \\cdot v$ |\n| Válec | $V = \\pi r^2 v$ |\n| Kužel | $V = \\frac{1}{3} \\pi r^2 v$ |\n| Koule | $V = \\frac{4}{3} \\pi r^3$ |",
      callout: "Přehled",
    },
    {
      type: "text-input",
      question: "Válec má poloměr $r = 4$ cm a výšku $v = 10$ cm. Jaký je jeho objem? ($\\pi \\approx 3{,}14$, zaokrouhlete.)",
      expectedAnswer: "502,4",
      acceptableAnswers: ["502.4", "502,4", "502,7", "502.7"],
      numericTolerance: 2,
      explanation: "$V = \\pi \\cdot 16 \\cdot 10 = 160\\pi \\approx 502{,}7\\,\\text{cm}^3$.",
    },
    {
      type: "multiple-choice",
      question: "Jehlan a hranol mají stejnou podstavu a výšku. Jaký je poměr jejich objemů?",
      choices: [
        { label: "Jehlan má $\\frac{1}{3}$ objemu hranolu", isCorrect: true, feedback: "$V_j = \\frac{1}{3} S v$, $V_h = S v$." },
        { label: "Jehlan má $\\frac{1}{2}$ objemu hranolu", isCorrect: false, feedback: "Koeficient je $\\frac{1}{3}$, ne $\\frac{1}{2}$." },
        { label: "Mají stejný objem", isCorrect: false, feedback: "Jehlan se směrem k vrcholu zužuje." },
      ],
      explanation: "Stejný vztah platí i pro kužel vs. válec: $V_{\\text{kužel}} = \\frac{1}{3} V_{\\text{válec}}$.",
    },
    {
      type: "text-input",
      question: "Koule má poloměr $r = 3$ cm. Jaký je její objem? ($\\pi \\approx 3{,}14$, zaokrouhlete.)",
      expectedAnswer: "113,0",
      acceptableAnswers: ["113", "113.0", "113,0", "113,1", "113.04"],
      numericTolerance: 1,
      explanation: "$V = \\frac{4}{3}\\pi \\cdot 27 = 36\\pi \\approx 113{,}1\\,\\text{cm}^3$.",
      hints: ["$V = \\frac{4}{3}\\pi r^3 = \\frac{4}{3} \\cdot 3{,}14 \\cdot 27$."],
    },
    {
      type: "explain",
      body: "**Povrch** je součet ploch všech stěn:\n\n| Těleso | Povrch |\n|---|---|\n| Kvádr | $S = 2(ab + bc + ac)$ |\n| Válec | $S = 2\\pi r^2 + 2\\pi r v$ |\n| Koule | $S = 4\\pi r^2$ |",
    },
    {
      type: "text-input",
      question: "Povrch koule s $r = 5$ cm? ($\\pi \\approx 3{,}14$, zaokrouhlete.)",
      expectedAnswer: "314",
      acceptableAnswers: ["314", "314,0", "314,2"],
      numericTolerance: 2,
      explanation: "$S = 4\\pi \\cdot 25 = 100\\pi \\approx 314\\,\\text{cm}^2$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte tělesa od nejmenšího po největší objem (vše s $r = v = 5$):",
      items: [
        "Kužel: $\\frac{1}{3}\\pi \\cdot 25 \\cdot 5 \\approx 131$",
        "Válec: $\\pi \\cdot 25 \\cdot 5 \\approx 393$",
        "Koule: $\\frac{4}{3}\\pi \\cdot 125 \\approx 524$",
      ],
      explanation: "Kužel < Válec < Koule (při stejném $r$ a $v = r$).",
    },
    {
      type: "explain",
      body: "**Tělesová úhlopříčka krychle** (z rohu do protilehlého rohu):\n\n$$u = a\\sqrt{3}$$\n\n**Stěnová úhlopříčka**: $u_s = a\\sqrt{2}$ (Pythagorova věta na stěně).",
    },
    {
      type: "text-input",
      question: "Krychle má hranu $a = 4$. Jak dlouhá je tělesová úhlopříčka? (zaokrouhlete na 1 des. místo)",
      expectedAnswer: "6,9",
      acceptableAnswers: ["6.9", "6,9", "6,93"],
      numericTolerance: 0.1,
      explanation: "$u = 4\\sqrt{3} = 4 \\cdot 1{,}732 \\approx 6{,}9$.",
      hints: ["$u = a\\sqrt{3}$, $\\sqrt{3} \\approx 1{,}732$."],
    },
    {
      type: "reveal",
      question: "Proč je objem jehlanu přesně $\\frac{1}{3}$ objemu hranolu?",
      revealedContent: "Krychli lze rozřezat na 3 shodné jehlany se čtvercovou podstavou (tzv. Cavalierův princip). Každý má objem $\\frac{1}{3}a^3$.\n\nObecně se to dokazuje integrováním průřezů: řezy jehlanu se zmenšují kvadraticky s výškou, což dává faktor $\\frac{1}{3}$.",
    },
    {
      type: "multiple-choice",
      question: "Kvádr má rozměry $2 \\times 3 \\times 6$. Jaký je jeho povrch?",
      choices: [
        { label: "$36$", isCorrect: false, feedback: "To je objem: $2 \\cdot 3 \\cdot 6 = 36$." },
        { label: "$72$", isCorrect: true, feedback: "$2(6 + 18 + 12) = 2 \\cdot 36 = 72$ ✓" },
        { label: "$66$", isCorrect: false, feedback: "Zkontrolujte: $ab = 6$, $bc = 18$, $ac = 12$." },
      ],
      explanation: "$S = 2(2 \\cdot 3 + 3 \\cdot 6 + 2 \\cdot 6) = 2(6 + 18 + 12) = 72$.",
    },
    {
      type: "text-input",
      question: "Bazén ve tvaru kvádru: $10 \\times 5 \\times 2$ m. Kolik litrů vody pojme? (1 m$^3$ = 1000 l)",
      expectedAnswer: "100000",
      acceptableAnswers: ["100 000", "100000"],
      explanation: "$V = 10 \\cdot 5 \\cdot 2 = 100\\,\\text{m}^3 = 100\\,000\\,\\text{l}$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Objem hranolu/válce: $V = S_{\\text{podst.}} \\cdot v$. Jehlanu/kužele: $\\frac{1}{3}$ z toho.",
      "Koule: $V = \\frac{4}{3}\\pi r^3$, $S = 4\\pi r^2$.",
      "Povrch = součet ploch všech stěn.",
      "Tělesová úhlopříčka krychle: $u = a\\sqrt{3}$.",
      "1 m$^3$ = 1000 litrů.",
    ],
  },
  nextTopicSuggestion: "kombinatorika-zaklady",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "solid-geometry",
  order: 1,
  title: "Stereometrie -- tělesa",
  lesson,
};
