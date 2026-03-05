import type { LessonV2 } from "@/types/lesson-v2";

export const kruznicaAKruhyV2Beginner: LessonV2 = {
  title: "Kružnice a kruhy",
  steps: [
    {
      type: "multiple-choice",
      question: "Pizza má průměr 30 cm. Jaký je její obvod? ($\\pi \\approx 3{,}14$)",
      choices: [
        { label: "$\\approx 94{,}2$ cm", isCorrect: true, feedback: "$o = \\pi d = 3{,}14 \\cdot 30 = 94{,}2$ cm ✓" },
        { label: "$\\approx 188{,}4$ cm", isCorrect: false, feedback: "To by bylo $2\\pi d$ — jednou $\\pi d$ stačí." },
        { label: "$\\approx 47{,}1$ cm", isCorrect: false, feedback: "To je obvod s poloměrem 15, pokud by $o = \\pi r$, ale vzorec je $2\\pi r$." },
      ],
      explanation: "$o = \\pi d = 2\\pi r$. Průměr $d = 30$, poloměr $r = 15$: $o = 2\\pi \\cdot 15 \\approx 94{,}2$ cm.",
    },
    {
      type: "explain",
      body: "**Kružnice** = množina bodů ve stejné vzdálenosti $r$ od středu.\n**Kruh** = kružnice + vnitřek.\n\n$$\\text{Obvod: } o = 2\\pi r = \\pi d$$\n$$\\text{Obsah: } S = \\pi r^2$$",
      callout: "Definice",
    },
    {
      type: "text-input",
      question: "Kruh má poloměr $r = 5$ cm. Jaký je jeho obsah? (zaokrouhlete na jedno desetinné místo, $\\pi \\approx 3{,}14$)",
      expectedAnswer: "78,5",
      acceptableAnswers: ["78.5", "78,5", "78,54"],
      numericTolerance: 0.6,
      explanation: "$S = \\pi \\cdot 5^2 = 25\\pi \\approx 78{,}5\\,\\text{cm}^2$.",
    },
    {
      type: "explain",
      body: "**Tečna** ke kružnici je přímka, která se kružnice dotýká v jednom bodě. V bodě dotyku je tečna **kolmá** na poloměr.\n\n**Sečna** protíná kružnici ve dvou bodech.\n**Tětiva** je úsečka spojující dva body kružnice (nejdelší tětiva = průměr).",
      callout: "Pojmy",
    },
    {
      type: "multiple-choice",
      question: "Tečna ke kružnici a poloměr v bodě dotyku svírají úhel:",
      choices: [
        { label: "$60°$", isCorrect: false, feedback: "Tečna je vždy kolmá na poloměr." },
        { label: "$90°$", isCorrect: true, feedback: "Ano! Kolmost tečny a poloměru je klíčová vlastnost." },
        { label: "Záleží na kružnici", isCorrect: false, feedback: "Ne — platí vždy $90°$." },
      ],
      explanation: "Tečna ⊥ poloměr v bodě dotyku. To je důležité pro výpočty vzdáleností.",
    },
    {
      type: "explain",
      body: "**Kruhová výseč** (koláčový kousek): úhel $\\alpha$ ze středu.\n\n$$S_{\\text{výseč}} = \\frac{\\alpha}{360°} \\cdot \\pi r^2$$\n$$\\text{Délka oblouku: } l = \\frac{\\alpha}{360°} \\cdot 2\\pi r$$",
    },
    {
      type: "text-input",
      question: "Výseč s úhlem $90°$ z kruhu o poloměru $8$ cm. Jaký je její obsah? ($\\pi \\approx 3{,}14$, zaokrouhlete.)",
      expectedAnswer: "50,2",
      acceptableAnswers: ["50.2", "50,2", "50,24", "50,3"],
      numericTolerance: 0.4,
      explanation: "$S = \\frac{90}{360} \\cdot \\pi \\cdot 64 = \\frac{1}{4} \\cdot 64\\pi \\approx 50{,}3\\,\\text{cm}^2$.",
      hints: ["$\\frac{90°}{360°} = \\frac{1}{4}$ kruhu."],
    },
    {
      type: "sort-order",
      question: "Seřaďte od nejmenšího po největší obsah ($r = 10$):",
      items: [
        "Výseč $60°$: $\\frac{1}{6}\\pi r^2 \\approx 52{,}4$",
        "Výseč $90°$: $\\frac{1}{4}\\pi r^2 \\approx 78{,}5$",
        "Půlkruh: $\\frac{1}{2}\\pi r^2 \\approx 157{,}1$",
        "Celý kruh: $\\pi r^2 \\approx 314{,}2$",
      ],
      explanation: "Obsah výseče roste lineárně s úhlem.",
    },
    {
      type: "multiple-choice",
      question: "Dvě kružnice mají poloměry $3$ a $5$ a vzdálenost středů $8$. Jaká je jejich vzájemná poloha?",
      choices: [
        { label: "Protínají se", isCorrect: false, feedback: "$|r_1 - r_2| < d < r_1 + r_2$? $2 < 8 = 8$. Ne, $d = r_1 + r_2$." },
        { label: "Vnější dotyk", isCorrect: true, feedback: "$d = r_1 + r_2 = 3 + 5 = 8$ → vnější dotyk." },
        { label: "Nemají společný bod", isCorrect: false, feedback: "To by platilo pro $d > r_1 + r_2$." },
      ],
      explanation: "Vnější dotyk: $d = r_1 + r_2$. Kružnice se dotýkají v jednom bodě zvenčí.",
    },
    {
      type: "reveal",
      question: "Proč je $\\pi$ tak důležité číslo?",
      revealedContent: "$\\pi \\approx 3{,}14159\\ldots$ je poměr obvodu libovolné kružnice k jejímu průměru. Je to **iracionální** číslo — jeho desetinný rozvoj nikdy nekončí a neopakuje se.\n\nObjevuje se všude: geometrie, fyzika, pravděpodobnost, Fourierova analýza. Archimedes ho odhadl jako $\\frac{22}{7}$.",
    },
    {
      type: "text-input",
      question: "Kolo bicyklu má poloměr $35$ cm. Kolikrát se otočí na trase $1$ km? (zaokrouhlete na celé číslo)",
      expectedAnswer: "455",
      numericTolerance: 5,
      explanation: "Obvod kola: $2\\pi \\cdot 0{,}35 \\approx 2{,}2\\,\\text{m}$. Počet otáček: $\\frac{1000}{2{,}2} \\approx 455$.",
      hints: ["Spočítejte obvod v metrech, pak vydělte 1000."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Obvod kružnice: $o = 2\\pi r$. Obsah kruhu: $S = \\pi r^2$.",
      "Tečna je kolmá na poloměr v bodě dotyku.",
      "Kruhová výseč: $S = \\frac{\\alpha}{360°} \\cdot \\pi r^2$.",
      "Vzájemná poloha kružnic závisí na $d$, $r_1$, $r_2$.",
      "$\\pi \\approx 3{,}14$ — poměr obvodu k průměru.",
    ],
  },
  nextTopicSuggestion: "analyticka-geometrie",
};
