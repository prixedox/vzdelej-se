import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Analytická geometrie v rovině",
  steps: [
    {
      type: "multiple-choice",
      question: "Jaká je vzdálenost bodů $A = [1; 2]$ a $B = [4; 6]$?",
      choices: [
        { label: "$5$", isCorrect: true, feedback: "$\\sqrt{(4-1)^2 + (6-2)^2} = \\sqrt{9 + 16} = 5$ ✓" },
        { label: "$7$", isCorrect: false, feedback: "To je $|\\Delta x| + |\\Delta y| = 3 + 4$, ne vzdálenost." },
        { label: "$\\sqrt{7}$", isCorrect: false, feedback: "Správně: $\\sqrt{3^2 + 4^2} = \\sqrt{25} = 5$." },
      ],
      explanation: "Vzdálenost dvou bodů: $|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$. Pythagorova věta v souřadnicích!",
    },
    {
      type: "explain",
      body: "**Analytická geometrie** řeší geometrické úlohy pomocí souřadnic a rovnic.\n\n**Vzdálenost bodů** $A = [x_1; y_1]$, $B = [x_2; y_2]$:\n\n$$|AB| = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$$",
      callout: "Základ",
    },
    {
      type: "text-input",
      question: "Vzdálenost bodů $[0; 0]$ a $[5; 12]$?",
      expectedAnswer: "13",
      explanation: "$\\sqrt{25 + 144} = \\sqrt{169} = 13$.",
    },
    {
      type: "explain",
      body: "**Střed úsečky** $AB$:\n\n$$S = \\left[\\frac{x_1 + x_2}{2}; \\frac{y_1 + y_2}{2}\\right]$$\n\nPříklad: střed $[2; 4]$ a $[6; 8]$ je $[4; 6]$.",
    },
    {
      type: "text-input",
      question: "Jaký je střed úsečky $AB$, kde $A = [1; 3]$ a $B = [5; 7]$? Zapište $x$-souřadnici.",
      expectedAnswer: "3",
      explanation: "$x_S = \\frac{1 + 5}{2} = 3$, $y_S = \\frac{3 + 7}{2} = 5$. Střed: $[3; 5]$.",
    },
    {
      type: "explain",
      body: "**Rovnice přímky** v rovině:\n\n- Směrnicový tvar: $y = kx + q$\n- Obecný tvar: $ax + by + c = 0$\n\nSměrnice $k$ = tangens úhlu, který přímka svírá s osou $x$.",
      callout: "Přímka",
    },
    {
      type: "text-input",
      question: "Napište rovnici přímky procházející body $[0; 2]$ a $[3; 8]$. Jaká je směrnice $k$?",
      expectedAnswer: "2",
      acceptableAnswers: ["k=2", "k = 2"],
      explanation: "$k = \\frac{8 - 2}{3 - 0} = \\frac{6}{3} = 2$. Rovnice: $y = 2x + 2$.",
    },
    {
      type: "explain",
      body: "**Rovnice kružnice** se středem $S = [m; n]$ a poloměrem $r$:\n\n$$(x - m)^2 + (y - n)^2 = r^2$$\n\nPříklad: $(x - 1)^2 + (y + 2)^2 = 9$ je kružnice se středem $[1; -2]$ a $r = 3$.",
      callout: "Kružnice",
    },
    {
      type: "multiple-choice",
      question: "Kružnice $(x - 3)^2 + (y - 4)^2 = 25$ má střed a poloměr:",
      choices: [
        { label: "$S = [3; 4]$, $r = 5$", isCorrect: true, feedback: "$r = \\sqrt{25} = 5$ ✓" },
        { label: "$S = [-3; -4]$, $r = 25$", isCorrect: false, feedback: "V rovnici $(x - m)^2$: $m = 3$, ne $-3$. A $r = \\sqrt{25}$." },
        { label: "$S = [3; 4]$, $r = 25$", isCorrect: false, feedback: "$r^2 = 25$, tedy $r = 5$." },
      ],
      explanation: "Z tvaru $(x - m)^2 + (y - n)^2 = r^2$ čteme $S = [m; n]$ a $r = \\sqrt{r^2}$.",
    },
    {
      type: "text-input",
      question: "Leží bod $[3; 4]$ na kružnici $x^2 + y^2 = 25$? (ano/ne)",
      expectedAnswer: "ano",
      acceptableAnswers: ["ano", "Ano", "ANO", "yes"],
      explanation: "$3^2 + 4^2 = 9 + 16 = 25$ ✓ — bod splňuje rovnici.",
    },
    {
      type: "explain",
      body: "**Vektory**: $\\vec{u} = (u_1; u_2)$. Vektor z $A$ do $B$:\n$$\\vec{AB} = (x_B - x_A; y_B - y_A)$$\n\nVelikost: $|\\vec{u}| = \\sqrt{u_1^2 + u_2^2}$.",
    },
    {
      type: "text-input",
      question: "Vektor $\\vec{AB}$ z $A = [2; 1]$ do $B = [5; 5]$. Jaká je jeho $x$-složka?",
      expectedAnswer: "3",
      explanation: "$\\vec{AB} = (5 - 2; 5 - 1) = (3; 4)$.",
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky: najděte vzdálenost bodu $P = [2; 3]$ od přímky $3x + 4y - 6 = 0$.",
      items: [
        "Dosadíme do vzorce: $d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$",
        "Čitatel: $|3 \\cdot 2 + 4 \\cdot 3 - 6| = |6 + 12 - 6| = 12$",
        "Jmenovatel: $\\sqrt{9 + 16} = 5$",
        "Vzdálenost: $d = \\frac{12}{5} = 2{,}4$",
      ],
      explanation: "Vzdálenost bodu od přímky $ax + by + c = 0$: $d = \\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.",
    },
    {
      type: "text-input",
      question: "Vzdálenost bodu $[1; 0]$ od přímky $4x - 3y + 10 = 0$?",
      expectedAnswer: "2,8",
      acceptableAnswers: ["2.8", "2,8", "14/5"],
      numericTolerance: 0.01,
      explanation: "$d = \\frac{|4 + 0 + 10|}{\\sqrt{16 + 9}} = \\frac{14}{5} = 2{,}8$.",
      hints: ["Dosaďte $x_0 = 1$, $y_0 = 0$ do vzorce."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Vzdálenost: $|AB| = \\sqrt{(\\Delta x)^2 + (\\Delta y)^2}$.",
      "Střed úsečky: průměr souřadnic.",
      "Přímka: $y = kx + q$ nebo $ax + by + c = 0$.",
      "Kružnice: $(x - m)^2 + (y - n)^2 = r^2$.",
      "Vzdálenost bodu od přímky: $\\frac{|ax_0 + by_0 + c|}{\\sqrt{a^2 + b^2}}$.",
    ],
  },
  nextTopicSuggestion: "stereometrie",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "analytic-geometry",
  order: 1,
  title: "Analytická geometrie v rovině",
  lesson,
};
