import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Trojuhelniky",
  steps: [
    {
      type: "multiple-choice",
      question: "Trojuhelnik ma strany 3, 4 a 5. Je pravouhl?",
      choices: [
        { label: "Ano", isCorrect: true, feedback: "$3^2 + 4^2 = 9 + 16 = 25 = 5^2$ -- Pythagorova veta plati!" },
        { label: "Ne", isCorrect: false, feedback: "Zkuste dosadit do $a^2 + b^2 = c^2$ a overit." },
        { label: "Nelze urcit", isCorrect: false, feedback: "Znate vsechny tri strany -- to staci k overeni Pythagorovy vety." },
      ],
      explanation: "Pokud $a^2 + b^2 = c^2$ (kde $c$ je nejdelsi strana), trojuhelnik je pravouhl. Zde $9 + 16 = 25$.",
    },
    {
      type: "explain",
      body: "**Pythagorova veta**: V pravouhlm trojuhelniku s preponou $c$ a odvesnami $a$, $b$:\n\n$$a^2 + b^2 = c^2$$\n\nPrepona je nejdelsi strana a lezi naproti pravemu uhlu.",
      callout: "Pythagorova veta",
    },
    {
      type: "text-input",
      question: "Pravouhl trojuhelnik ma odvesny 5 a 12. Kolik meri prepona?",
      expectedAnswer: "13",
      explanation: "$c = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
      hints: ["Pouzijte $c = \\sqrt{a^2 + b^2}$."],
    },
    {
      type: "text-input",
      question: "Pravouhl trojuhelnik ma preponu 10 a jednu odvesnu 6. Jak dlouha je druha odvesna?",
      expectedAnswer: "8",
      explanation: "$a = \\sqrt{c^2 - b^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$.",
      hints: ["Upravte vzorec: $a^2 = c^2 - b^2$."],
    },
    {
      type: "explore",
      prompt: "Mente delky stran trojuhelniku a sledujte, kdy plati $a^2 + b^2 = c^2$. Zkuste najit dalsi pythagorejskou trojici krome 3-4-5.",
      visual: {
        type: "interactive-triangle",
        props: {
          mode: "pythagorean",
          showAngles: true,
        },
      },
      followUpQuestion: "Dalsi pythagorejske trojice: 5-12-13, 8-15-17, 7-24-25. Kazdy nasobek trojice 3-4-5 (napr. 6-8-10) take funguje.",
    },
    {
      type: "explain",
      body: "**Druhy trojuhelniku podle stran**:\n\n- **Rovnostranny**: vsechny 3 strany stejne ($a = b = c$), vsechny uhly $60°$\n- **Rovnoramenny**: 2 strany stejne, uhly pri zakladne jsou shodne\n- **Obecny**: vsechny strany ruzne",
    },
    {
      type: "multiple-choice",
      question: "Trojuhelnik ma strany 5, 5 a 8. O jaky typ se jedna?",
      choices: [
        { label: "Rovnostranny", isCorrect: false, feedback: "Rovnostranny ma vsechny tri strany stejne." },
        { label: "Rovnoramenny", isCorrect: true, feedback: "Dve strany jsou stejne (5 a 5) -- to je rovnoramenny trojuhelnik." },
        { label: "Obecny", isCorrect: false, feedback: "Obecny ma vsechny strany ruzne, ale zde jsou dve stejne." },
      ],
      explanation: "Rovnoramenny trojuhelnik ma alespon dve shodne strany. Zde $a = b = 5$ a zakladna $c = 8$.",
    },
    {
      type: "explain",
      body: "**Obsah trojuhelniku**:\n\n$$S = \\frac{1}{2} \\cdot z \\cdot v$$\n\ngde $z$ je zakladna a $v$ je vyska na tuto zakladnu (kolma vzdalenost k protejsimu vrcholu).",
      callout: "Obsah",
    },
    {
      type: "text-input",
      question: "Trojuhelnik ma zakladnu 10 cm a vysku 6 cm. Jaky je jeho obsah?",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30 cm2", "30 cm^2"],
      explanation: "$S = \\frac{1}{2} \\cdot 10 \\cdot 6 = 30\\,\\text{cm}^2$.",
    },
    {
      type: "explore",
      prompt: "Tahejte posuvniky zakladny a vysky. Sledujte, jak se meni obsah. Co se stane s obsahem, kdyz zdvojnasobite vysku pri stejne zakladne?",
      visual: {
        type: "interactive-triangle",
        props: {
          mode: "area",
          showHeight: true,
          showArea: true,
        },
      },
      followUpQuestion: "Kdyz zdvojnasobite vysku (pri stejne zakladne), obsah se take zdvojnasobi -- obsah je primo umerny vysce.",
    },
    {
      type: "text-input",
      question: "Trojuhelnik ma uhly $45°$ a $60°$. Kolik meri treti uhel?",
      expectedAnswer: "75",
      acceptableAnswers: ["75", "75°"],
      explanation: "Soucet uhlu v trojuhelniku je vzdy $180°$. Treti uhel: $180° - 45° - 60° = 75°$.",
      hints: ["Soucet vsech uhlu v trojuhelniku je $180°$."],
    },
    {
      type: "multiple-choice",
      question: "Kdy pouzijeme kosinovou vetu misto Pythagorovy vety?",
      choices: [
        { label: "Vzdy, kdyz trojuhelnik neni pravouhl", isCorrect: false, feedback: "Kosinovou vetu pouzijeme specificky pri znalosti dvou stran a uhlu mezi nimi." },
        { label: "Kdyz zname 2 strany a uhel mezi nimi", isCorrect: true, feedback: "Presne! Kosinova veta $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$ zobecnuje Pythagorovu vetu." },
        { label: "Kdyz zname vsechny 3 uhly", isCorrect: false, feedback: "Tri uhly samy o sobe neurci velikost trojuhelniku -- chybi alespon jedna strana." },
      ],
      explanation: "Kosinova veta: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$. Pro $\\gamma = 90°$ je $\\cos 90° = 0$ a dostaneme Pythagorovu vetu.",
    },
    {
      type: "text-input",
      question: "Zebrik dlouhy 5 m se opira o zed. Pata zebriku je 3 m od zdi. Jak vysoko sahne zebrik na zed?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 m", "4m"],
      explanation: "$v = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4\\,\\text{m}$. Klasicka pythagorejska trojice 3-4-5!",
      hints: ["Zebrik, zed a zem tvori pravouhl trojuhelnik. Zebrik je prepona."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Pythagorova veta: $a^2 + b^2 = c^2$ plati v pravouhlem trojuhelniku.",
      "Obsah trojuhelniku: $S = \\frac{1}{2} \\cdot z \\cdot v$.",
      "Soucet vnitrnich uhlu trojuhelniku je vzdy $180°$.",
      "Trojuhelniky delime na rovnostranne, rovnoramenne a obecne.",
      "Kosinova veta $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$ zobecnuje Pythagorovu vetu.",
    ],
  },
  nextTopicSuggestion: "kruznice-a-kruhy",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "triangles",
  order: 1,
  title: "Trojuhelniky",
  lesson,
};
