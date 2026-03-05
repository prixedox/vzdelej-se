import type { LessonV2 } from "@/types/lesson-v2";

export const linearniFunkceV2Beginner: LessonV2 = {
  title: "Lineární funkce",
  steps: [
    {
      type: "multiple-choice",
      question:
        "Taxi účtuje **30 Kč nástup** a **15 Kč za každý kilometr**. Kolik zaplatíte za jízdu dlouhou 4 km?",
      choices: [
        {
          label: "$60$ Kč",
          isCorrect: false,
          feedback:
            "To je jen $4 \\times 15$. Nezapomeňte na nástupní sazbu 30 Kč.",
        },
        {
          label: "$90$ Kč",
          isCorrect: true,
          feedback: "$30 + 15 \\cdot 4 = 90$ Kč. Přesně!",
        },
        {
          label: "$120$ Kč",
          isCorrect: false,
          feedback:
            "$30 \\cdot 4 = 120$ — ale nástupní sazba se platí jen jednou.",
        },
      ],
      explanation:
        "Cena jízdy závisí lineárně na vzdálenosti: $f(x) = 15x + 30$. Tohle je **lineární funkce**.",
    },
    {
      type: "explore",
      prompt:
        "Na grafu vidíte funkci ceny taxi $f(x) = 15x + 30$. Co znamená **sklon přímky** (směrnice $k = 15$) v kontextu jízdy? A co bod, kde přímka protíná osu $y$?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "linear",
          defaultParams: { k: 15, q: 30 },
          xRange: [0, 10],
          yRange: [0, 200],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Sklon $k = 15$ je cena za kilometr. Průsečík s osou $y$ ($q = 30$) je nástupní sazba — cena, i když nejedete nikam.",
    },
    {
      type: "explain",
      body: "**Lineární funkce** $f(x) = kx + q$: $k$ je **směrnice** (o kolik roste $f$ při zvýšení $x$ o 1) a $q$ je **absolutní člen** (hodnota $f(0)$, průsečík s osou $y$).",
      callout: "Definice",
    },
    {
      type: "text-input",
      question:
        "Jiná taxislužba účtuje 20 Kč nástup a 18 Kč/km. Jaký je předpis funkce pro cenu jízdy? Zapište směrnici $k$.",
      expectedAnswer: "18",
      acceptableAnswers: ["18", "k=18", "k = 18"],
      explanation:
        "$k = 18$ (cena za km). Předpis: $f(x) = 18x + 20$.",
      hints: ["Kolik stojí každý další kilometr?"],
    },
    {
      type: "multiple-choice",
      question:
        "Porovnejte obě taxi: $f(x) = 15x + 30$ a $g(x) = 18x + 20$. Pro krátkou jízdu (2 km) je levnější:",
      choices: [
        {
          label: "Taxi A ($f$): $15 \\cdot 2 + 30 = 60$ Kč",
          isCorrect: false,
          feedback:
            "Taxi B: $18 \\cdot 2 + 20 = 56$ Kč — levnější o 4 Kč.",
        },
        {
          label: "Taxi B ($g$): $18 \\cdot 2 + 20 = 56$ Kč",
          isCorrect: true,
          feedback:
            "Přesně! Nižší nástupní sazba vyhrává na krátkých trasách.",
        },
        {
          label: "Obě stojí stejně",
          isCorrect: false,
          feedback: "$60 \\neq 56$.",
        },
      ],
      explanation:
        "Na krátkých trasách rozhoduje $q$ (nástupní sazba). Na dlouhých trasách rozhoduje $k$ (cena za km).",
    },
    {
      type: "explore",
      prompt:
        "Představte si baterii telefonu: začíná na 100 % a za hodinu klesne o 12 %. Funkce $f(x) = -12x + 100$ popisuje stav baterie. Zkuste najít, kdy bude telefon vybitý (kde graf protíná osu $x$).",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "linear",
          defaultParams: { k: -12, q: 100 },
          xRange: [0, 10],
          yRange: [-20, 110],
          showGrid: true,
        },
      },
      followUpQuestion:
        "Záporná směrnice $k = -12$ znamená pokles. Telefon se vybije při $f(x) = 0$, tedy $x \\approx 8{,}3$ hodiny.",
    },
    {
      type: "explain",
      body: "**Průsečík s osou $x$** najdeme z $kx + q = 0$, tedy $x = -\\frac{q}{k}$. V příkladu s baterií: $x = -\\frac{100}{-12} \\approx 8{,}3$ hodiny.",
    },
    {
      type: "text-input",
      question:
        "Hladina vody v nádrži klesá podle $f(x) = -3x + 9$ (v metrech, $x$ jsou dny). Za kolik dní bude nádrž prázdná? (Zadejte $x$.)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "x=3", "x = 3"],
      explanation:
        "$-3x + 9 = 0 \\Rightarrow x = 3$. Za 3 dny hladina klesne na nulu.",
      hints: ["Kdy je $f(x) = 0$?"],
    },
    {
      type: "multiple-choice",
      question:
        "Dva vlaky jedou po rovnoběžných tratích: vlak A: $s_A(t) = 80t + 10$ km, vlak B: $s_B(t) = 80t + 50$ km. Co platí?",
      choices: [
        {
          label: "Vlaky se potkají",
          isCorrect: false,
          feedback:
            "Mají stejnou směrnici $k = 80$ — jsou rovnoběžné, nikdy se nepotkají.",
        },
        {
          label: "Jedou stejnou rychlostí, ale B je napřed",
          isCorrect: true,
          feedback:
            "Stejné $k = 80$ (rychlost). Vlak B začal o 40 km dál ($q_B - q_A = 40$).",
        },
        {
          label: "Vlak B je rychlejší",
          isCorrect: false,
          feedback: "Oba mají $k = 80$ km/h — stejná rychlost.",
        },
      ],
      explanation:
        "Rovnoběžné přímky = stejné $k$, různé $q$. V reálu: stejná rychlost, jiná počáteční pozice.",
    },
    {
      type: "explore",
      prompt:
        "Na grafu vidíte dvě přímky: $f(x) = 2x + 1$ (taxi jedoucí z centra) a $g(x) = -x + 7$ (taxi jedoucí zpět). Najděte bod, kde se protínají — to je místo setkání.",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "linear",
          defaultParams: { k: 2, q: 1 },
          xRange: [-2, 8],
          yRange: [-2, 10],
          showGrid: true,
          compareFunction: { functionType: "linear", params: { k: -1, q: 7 } },
        },
      },
      followUpQuestion:
        "Průsečík je v bodě $[2; 5]$. Algebraicky: $2x + 1 = -x + 7$, tedy $3x = 6$, $x = 2$.",
    },
    {
      type: "text-input",
      question:
        "Dva kurýři vyjeli současně: kurýr A jede $f(x) = 3x + 2$ km, kurýr B jede $g(x) = x + 10$ km ($x$ jsou hodiny). Po kolika hodinách se setkají?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "x=4", "x = 4"],
      explanation:
        "$3x + 2 = x + 10 \\Rightarrow 2x = 8 \\Rightarrow x = 4$ hodiny.",
      hints: ["Položte $f(x) = g(x)$."],
    },
    {
      type: "text-input",
      question:
        "Směrnice přímky procházející body $[1; 50]$ a $[5; 110]$ je $k = ?$ (v kontextu: jízda z bodu A do B, souřadnice jsou kilometry a koruny).",
      expectedAnswer: "15",
      acceptableAnswers: ["15", "k=15", "k = 15"],
      explanation:
        "$k = \\frac{110 - 50}{5 - 1} = \\frac{60}{4} = 15$ Kč/km.",
      hints: ["$k = \\frac{\\Delta y}{\\Delta x}$."],
    },
    {
      type: "multiple-choice",
      question:
        "Přímka kolmá na $f(x) = 2x + 1$ má směrnici:",
      choices: [
        {
          label: "$k = -2$",
          isCorrect: false,
          feedback: "$2 \\cdot (-2) = -4 \\neq -1$.",
        },
        {
          label: "$k = -\\frac{1}{2}$",
          isCorrect: true,
          feedback: "$2 \\cdot (-\\frac{1}{2}) = -1$ — podmínka kolmosti splněna.",
        },
        {
          label: "$k = \\frac{1}{2}$",
          isCorrect: false,
          feedback:
            "$2 \\cdot \\frac{1}{2} = 1 \\neq -1$.",
        },
      ],
      explanation:
        "Kolmé přímky splňují $k_1 \\cdot k_2 = -1$. Pro $k_1 = 2$: $k_2 = -\\frac{1}{2}$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Lineární funkce $f(x) = kx + q$: $k$ = směrnice (tempo změny), $q$ = počáteční hodnota.",
      "V kontextu: $k$ je cena za km, rychlost, pokles za hodinu apod.",
      "Průsečík s osou $x$: $x = -\\frac{q}{k}$. S osou $y$: bod $[0; q]$.",
      "Rovnoběžky: stejné $k$. Kolmice: $k_1 \\cdot k_2 = -1$.",
      "Průsečík dvou přímek = řešení soustavy rovnic.",
    ],
  },
  nextTopicSuggestion: "kvadraticka-funkce",
};
