import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Pravděpodobnost",
  steps: [
    {
      type: "multiple-choice",
      question: "Hodíte mincí. Jaká je pravděpodobnost, že padne panna?",
      choices: [
        { label: "$\\frac{1}{2}$", isCorrect: true, feedback: "Správně! Dva možné výsledky, jeden příznivý." },
        { label: "$\\frac{1}{3}$", isCorrect: false, feedback: "Mince má jen dvě strany, ne tři." },
        { label: "$1$", isCorrect: false, feedback: "Pravděpodobnost 1 by znamenala jistotu — panna nepadne vždy." },
      ],
      explanation: "Mince má 2 rovnocenné výsledky (panna, orel). $P(\\text{panna}) = \\frac{1}{2}$.",
    },
    {
      type: "explore",
      prompt: "Hoďte mincí 50krát a sledujte histogram. Blíží se podíl panen k očekávané hodnotě $\\frac{1}{2}$?",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "coin",
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "S rostoucím počtem hodů se relativní četnost blíží k teoretické pravděpodobnosti. Tomu se říká zákon velkých čísel.",
    },
    {
      type: "explain",
      body: "**Klasická pravděpodobnost**: Pokud jsou všechny výsledky stejně pravděpodobné:\n\n$$P(A) = \\frac{\\text{počet příznivých výsledků}}{\\text{počet všech výsledků}}$$\n\nVýsledek je vždy číslo z intervalu $\\langle 0; 1 \\rangle$.",
      callout: "Vzorec",
    },
    {
      type: "text-input",
      question: "Kolik je pravděpodobnost, že na šestistěnné kostce padne číslo větší než 4? Odpovězte zlomkem.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6"],
      explanation: "Příznivé výsledky: 5 a 6 (dva ze šesti). $P = \\frac{2}{6} = \\frac{1}{3}$.",
      hints: ["Kolik čísel na kostce je větších než 4?"],
    },
    {
      type: "explore",
      prompt: "Hoďte kostkou 100krát. Jsou výsledky přibližně rovnoměrně rozdělené? Má každé číslo zhruba $\\frac{1}{6}$ všech hodů?",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "dice",
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "Histogram by se měl postupně vyrovnávat — každé číslo má teoreticky pravděpodobnost $\\frac{1}{6} \\approx 16{,}7\\,\\%$.",
    },
    {
      type: "explain",
      body: "**Doplňkový jev**: Pravděpodobnost, že se událost A nestane:\n\n$$P(\\overline{A}) = 1 - P(A)$$\n\nČasto je jednodušší spočítat doplněk než přímo počítat původní jev.",
      callout: "Doplněk",
    },
    {
      type: "multiple-choice",
      question: "Z balíčku 52 karet táhneme jednu. Jaká je pravděpodobnost, že to NENÍ srdcová karta?",
      choices: [
        { label: "$\\frac{1}{4}$", isCorrect: false, feedback: "To je pravděpodobnost, že srdcová JE — počítáme doplněk." },
        { label: "$\\frac{3}{4}$", isCorrect: true, feedback: "Správně! $P(\\text{ne srdce}) = 1 - \\frac{13}{52} = 1 - \\frac{1}{4} = \\frac{3}{4}$." },
        { label: "$\\frac{1}{2}$", isCorrect: false, feedback: "Srdcových karet je 13 z 52, ne polovina." },
      ],
      explanation: "$P(\\text{srdce}) = \\frac{13}{52} = \\frac{1}{4}$. Doplněk: $P(\\text{ne srdce}) = 1 - \\frac{1}{4} = \\frac{3}{4}$.",
    },
    {
      type: "explore",
      prompt: "V pytli je 5 červených a 3 modré kuličky. Táhněte 50krát (s vracením) a sledujte, jestli se poměr červených blíží k $\\frac{5}{8}$.",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "marbles",
          marbleConfig: { red: 5, blue: 3 },
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "Teoretická pravděpodobnost červené kuličky je $\\frac{5}{8} = 0{,}625$. Experiment by se měl k této hodnotě postupně blížit.",
    },
    {
      type: "explain",
      body: "**Sjednocení** neslučitelných jevů: $P(A \\cup B) = P(A) + P(B)$.\n\n**Průnik** nezávislých jevů: $P(A \\cap B) = P(A) \\cdot P(B)$.\n\nSjednocení = alespoň jeden nastane. Průnik = oba nastanou současně.",
    },
    {
      type: "text-input",
      question: "Jaká je pravděpodobnost, že na kostce padne 2 nebo 5? Odpovězte zlomkem.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6"],
      explanation: "Jevy padne 2 a padne 5 se vzájemně vylučují. $P = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3}$.",
    },
    {
      type: "reveal",
      question: "Co je podmíněná pravděpodobnost a kdy ji potřebujeme?",
      revealedContent: "**Podmíněná pravděpodobnost** $P(A|B)$ je pravděpodobnost jevu $A$ za předpokladu, že nastal jev $B$:\n\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$\n\nPříklad: Z balíčku karet jste táhli červenou kartu. Jaká je pravděpodobnost, že je to srdcová? Prostor se zúžil na 26 červených karet, z nichž 13 je srdcových: $P = \\frac{13}{26} = \\frac{1}{2}$.",
    },
    {
      type: "text-input",
      question: "Hodíte třikrát mincí. Jaká je pravděpodobnost, že padne alespoň jedna panna? Odpovězte zlomkem.",
      expectedAnswer: "7/8",
      acceptableAnswers: ["7/8", "0,875", "0.875"],
      explanation: "Doplněk: $P(\\text{žádná panna}) = P(\\text{3× orel}) = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$. Tedy $P(\\text{alespoň 1 panna}) = 1 - \\frac{1}{8} = \\frac{7}{8}$.",
      hints: ["Použijte doplněk — jaká je pravděpodobnost, že panna nepadne ani jednou?"],
    },
    {
      type: "sort-order",
      question: "Seřaďte následující pravděpodobnosti od nejmenší po největší:",
      items: [
        "$P(\\text{padne 6}) = \\frac{1}{6}$",
        "$P(\\text{sudé číslo}) = \\frac{1}{2}$",
        "$P(\\text{číslo} \\leq 5) = \\frac{5}{6}$",
        "$P(\\text{číslo} \\leq 6) = 1$",
      ],
      explanation: "$\\frac{1}{6} < \\frac{1}{2} < \\frac{5}{6} < 1$. Pravděpodobnost 1 znamená jistotu — číslo na kostce je vždy nejvýše 6.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Klasická pravděpodobnost: $P(A) = \\frac{\\text{příznivé}}{\\text{všechny}}$.",
      "Doplněk: $P(\\overline{A}) = 1 - P(A)$ — často jednodušší než přímo počítat.",
      "Nezávislé jevy: $P(A \\cap B) = P(A) \\cdot P(B)$.",
      "Zákon velkých čísel: s rostoucím počtem pokusů se relativní četnost blíží k teoretické pravděpodobnosti.",
      "Pravděpodobnost je vždy číslo z intervalu $\\langle 0; 1 \\rangle$.",
    ],
  },
  nextTopicSuggestion: "kombinatorika-zaklady",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "probability",
  order: 1,
  title: "Pravděpodobnost",
  lesson,
};
