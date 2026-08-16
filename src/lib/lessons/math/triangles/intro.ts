import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Trojúhelníky",
  steps: [
    {
      type: "multiple-choice",
      question: "Trojúhelník má strany 3, 4 a 5. Je pravoúhlý?",
      choices: [
        { label: "Ano", isCorrect: true, feedback: "$3^2 + 4^2 = 9 + 16 = 25 = 5^2$ — Pythagorova věta platí!" },
        { label: "Ne", isCorrect: false, feedback: "Zkuste dosadit do $a^2 + b^2 = c^2$ a ověřit." },
        { label: "Nelze určit", isCorrect: false, feedback: "Znáte všechny tři strany — to stačí k ověření Pythagorovy věty." },
      ],
      explanation: "Pokud $a^2 + b^2 = c^2$ (kde $c$ je nejdelší strana), trojúhelník je pravoúhlý. Zde $9 + 16 = 25$.",
    },
    {
      type: "explain",
      body: "**Pythagorova věta**: V pravoúhlém trojúhelníku s přeponou $c$ a odvěsnami $a$, $b$:\n\n$$a^2 + b^2 = c^2$$\n\nPřepona je nejdelší strana a leží naproti pravému úhlu.",
      callout: "Pythagorova věta",
    },
    {
      type: "text-input",
      question: "Pravoúhlý trojúhelník má odvěsny 5 a 12. Kolik měří přepona?",
      expectedAnswer: "13",
      explanation: "$c = \\sqrt{5^2 + 12^2} = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
      hints: ["Použijte $c = \\sqrt{a^2 + b^2}$."],
    },
    {
      type: "text-input",
      question: "Pravoúhlý trojúhelník má přeponu 10 a jednu odvěsnu 6. Jak dlouhá je druhá odvěsna?",
      expectedAnswer: "8",
      explanation: "$a = \\sqrt{c^2 - b^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$.",
      hints: ["Upravte vzorec: $a^2 = c^2 - b^2$."],
    },
    {
      type: "explore",
      prompt: "Měňte délky stran trojúhelníku a sledujte, kdy platí $a^2 + b^2 = c^2$. Zkuste najít další pythagorejskou trojici kromě 3-4-5.",
      visual: {
        type: "interactive-triangle",
        props: {
          mode: "pythagorean",
          showAngles: true,
        },
      },
      followUpQuestion: "Další pythagorejské trojice: 5-12-13, 8-15-17, 7-24-25. Každý násobek trojice 3-4-5 (např. 6-8-10) také funguje.",
    },
    {
      type: "explain",
      body: "**Druhy trojúhelníků podle stran**:\n\n- **Rovnostranný**: všechny 3 strany stejné ($a = b = c$), všechny úhly $60°$\n- **Rovnoramenný**: 2 strany stejné, úhly při základně jsou shodné\n- **Obecný**: všechny strany různé",
    },
    {
      type: "multiple-choice",
      question: "Trojúhelník má strany 5, 5 a 8. O jaký typ se jedná?",
      choices: [
        { label: "Rovnostranný", isCorrect: false, feedback: "Rovnostranný má všechny tři strany stejné." },
        { label: "Rovnoramenný", isCorrect: true, feedback: "Dvě strany jsou stejné (5 a 5) — to je rovnoramenný trojúhelník." },
        { label: "Obecný", isCorrect: false, feedback: "Obecný má všechny strany různé, ale zde jsou dvě stejné." },
      ],
      explanation: "Rovnoramenný trojúhelník má alespoň dvě shodné strany. Zde $a = b = 5$ a základna $c = 8$.",
    },
    {
      type: "explain",
      body: "**Obsah trojúhelníku**:\n\n$$S = \\frac{1}{2} \\cdot z \\cdot v$$\n\nkde $z$ je základna a $v$ je výška na tuto základnu (kolmá vzdálenost k protějšímu vrcholu).",
      callout: "Obsah",
    },
    {
      type: "text-input",
      question: "Trojúhelník má základnu 10 cm a výšku 6 cm. Jaký je jeho obsah?",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30 cm2", "30 cm^2"],
      explanation: "$S = \\frac{1}{2} \\cdot 10 \\cdot 6 = 30\\,\\text{cm}^2$.",
    },
    {
      type: "explore",
      prompt: "Táhněte posuvníky základny a výšky. Sledujte, jak se mění obsah. Co se stane s obsahem, když zdvojnásobíte výšku při stejné základně?",
      visual: {
        type: "interactive-triangle",
        props: {
          mode: "area",
          showHeight: true,
          showArea: true,
        },
      },
      followUpQuestion: "Když zdvojnásobíte výšku (při stejné základně), obsah se také zdvojnásobí — obsah je přímo úměrný výšce.",
    },
    {
      type: "text-input",
      question: "Trojúhelník má úhly $45°$ a $60°$. Kolik měří třetí úhel?",
      expectedAnswer: "75",
      acceptableAnswers: ["75", "75°"],
      explanation: "Součet úhlů v trojúhelníku je vždy $180°$. Třetí úhel: $180° - 45° - 60° = 75°$.",
      hints: ["Součet všech úhlů v trojúhelníku je $180°$."],
    },
    {
      type: "multiple-choice",
      question: "Kdy použijeme kosinovou větu místo Pythagorovy věty?",
      choices: [
        { label: "Vždy, když trojúhelník není pravoúhlý", isCorrect: false, feedback: "Kosinovou větu použijeme specificky při znalosti dvou stran a úhlu mezi nimi." },
        { label: "Když známe 2 strany a úhel mezi nimi", isCorrect: true, feedback: "Přesně! Kosinová věta $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$ zobecňuje Pythagorovu větu." },
        { label: "Když známe všechny 3 úhly", isCorrect: false, feedback: "Tři úhly samy o sobě neurčí velikost trojúhelníku — chybí alespoň jedna strana." },
      ],
      explanation: "Kosinová věta: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$. Pro $\\gamma = 90°$ je $\\cos 90° = 0$ a dostaneme Pythagorovu větu.",
    },
    {
      type: "text-input",
      question: "Žebřík dlouhý 5 m se opírá o zeď. Pata žebříku je 3 m od zdi. Jak vysoko sahá žebřík na zeď?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 m", "4m"],
      explanation: "$v = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4\\,\\text{m}$. Klasická pythagorejská trojice 3-4-5!",
      hints: ["Žebřík, zeď a zem tvoří pravoúhlý trojúhelník. Žebřík je přepona."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Pythagorova věta: $a^2 + b^2 = c^2$ platí v pravoúhlém trojúhelníku.",
      "Obsah trojúhelníku: $S = \\frac{1}{2} \\cdot z \\cdot v$.",
      "Součet vnitřních úhlů trojúhelníku je vždy $180°$.",
      "Trojúhelníky dělíme na rovnostranné, rovnoramenné a obecné.",
      "Kosinová věta $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$ zobecňuje Pythagorovu větu.",
    ],
  },
  nextTopicSuggestion: "kruznice-a-kruhy",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "triangles",
  order: 1,
  title: "Trojúhelníky",
  lesson,
};
