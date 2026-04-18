import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  narrative:
    "Slovní úlohy nejsou o počítání — jsou o překladu. Kdo umí převést česky psaný problém na rovnici, má vyhráno. Zbytek už je jen technika, kterou znáš z předchozí kapitoly.",
  steps: [
    {
      type: "explain",
      body:
        "Při slovní úloze je nejdůležitější **nejdřív přečíst, pak psát rovnici, a až potom počítat**. Řešení má vždy tři kroky: označit neznámou, sestavit rovnici, rovnici vyřešit.",
      misconception:
        "Mnozí studenti začnou ihned kombinovat čísla ze zadání. Bez jasně pojmenované neznámé ale nevíš, co vlastně počítáš.",
      callout: "Tři kroky",
    },
    {
      type: "prediction",
      scenario:
        "Matka je $4\\times$ starší než její dcera. Dohromady mají $50$ let. Kolik je každé z nich?",
      question: "Jaký je správný první krok?",
      options: [
        { label: "Napsat $50 \\div 4 = 12{,}5$", isCorrect: false },
        {
          label: "Označit: $\\color{#e74c3c}{x}$ = věk dcery, pak $4\\color{#e74c3c}{x}$ = věk matky",
          isCorrect: true,
        },
        { label: "Odhadnout věk dcery a zkusit dosadit", isCorrect: false },
      ],
      reveal:
        "Vždy nejprve pojmenujeme neznámou. Tady je logické volit $\\color{#e74c3c}{x}$ = věk dcery, protože věk matky se z něj snadno vyjádří jako $4\\color{#e74c3c}{x}$. Rovnice pak je $\\color{#e74c3c}{x} + 4\\color{#e74c3c}{x} = 50$, odkud $\\color{#e74c3c}{x} = 10$ (dcera) a matka $40$.",
    },
    {
      type: "multiple-choice",
      question:
        "Jana má o $3$ bonbóny víc než Petr. Dohromady mají $15$ bonbónů. Která rovnice popisuje situaci, pokud $\\color{#e74c3c}{x}$ značí počet Petrových bonbónů?",
      choices: [
        {
          label: "$\\color{#e74c3c}{x} + 3 = 15$",
          isCorrect: false,
          feedback: "Tato rovnice říká, že jen Petrovy bonbóny plus 3 dají 15. Musíš sečíst oba — Petra i Janu.",
        },
        {
          label: "$\\color{#e74c3c}{x} + (\\color{#e74c3c}{x} + 3) = 15$",
          isCorrect: true,
          feedback:
            "Správně. Petrovy bonbóny $\\color{#e74c3c}{x}$ + Janiny bonbóny $(\\color{#e74c3c}{x} + 3)$ = 15.",
        },
        {
          label: "$\\color{#e74c3c}{x} \\cdot 3 = 15$",
          isCorrect: false,
          feedback: "„O 3 víc\" znamená přičíst 3, ne násobit 3.",
        },
        {
          label: "$\\color{#e74c3c}{x} - 3 = 15$",
          isCorrect: false,
          feedback:
            "To by znamenalo, že Petr má o 3 víc než Jana. Zadání říká opak — Jana má o 3 víc.",
        },
      ],
      explanation:
        "Klíč je v překladu: „Jana má o 3 víc\" = Janin počet je $\\color{#e74c3c}{x} + 3$. „Dohromady\" = sčítáme. Výsledná rovnice má řešení $\\color{#e74c3c}{x} = 6$: Petr má 6, Jana 9.",
    },
    {
      type: "explain",
      body:
        "Druhá past slovních úloh: **jednotky musí sedět**. Pokud rovnice obsahuje metry a kilometry zároveň, výsledek bude chybný. Vždy na začátku převeď vše na jednu jednotku.",
      callout: "Jednotky",
    },
    {
      type: "text-input",
      question:
        "Auto jede z Prahy do Brna rychlostí $80\\,\\text{km/h}$. Cesta trvá $3$ hodiny. Kolik kilometrů má trasa? Výsledek uveď v $\\text{km}$ (jen číslo).",
      expectedAnswer: "240",
      acceptableAnswers: ["240", "240 km"],
      numericTolerance: 0.01,
      explanation:
        "Použijeme vztah $s = v \\cdot t$. Tedy $s = 80 \\cdot 3 = 240\\,\\text{km}$.",
      hints: ["Vztah mezi dráhou, rychlostí a časem: $s = v \\cdot t$."],
    },
    {
      type: "multiple-choice",
      question:
        "Za kolik let bude otci $3\\times$ tolik let, kolik bude synovi? Otci je dnes $42$ let, synovi $10$.",
      choices: [
        {
          label: "Za $6$ let — otci bude $48$, synovi $16$, a $48 = 3 \\cdot 16$",
          isCorrect: true,
          feedback:
            "Správně. Rovnice: $42 + \\color{#e74c3c}{x} = 3(10 + \\color{#e74c3c}{x})$, odkud $42 + \\color{#e74c3c}{x} = 30 + 3\\color{#e74c3c}{x}$, tedy $12 = 2\\color{#e74c3c}{x}$ a $\\color{#e74c3c}{x} = 6$.",
        },
        {
          label: "Za $4$ roky",
          isCorrect: false,
          feedback:
            "Dosaď: otci by bylo 46, synovi 14. $46 \\ne 3 \\cdot 14 = 42$. Nesedí.",
        },
        {
          label: "Už teď — vždyť $42 = 3 \\cdot 14$",
          isCorrect: false,
          feedback: "$3 \\cdot 14 = 42$, ale synovi je $10$, ne $14$.",
        },
        {
          label: "Za $12$ let",
          isCorrect: false,
          feedback:
            "Otci by bylo 54, synovi 22. $3 \\cdot 22 = 66 \\ne 54$. Pamatuj: syn stárne taky.",
        },
      ],
      explanation:
        "Typická past věkových úloh: oba stárnou najednou. Pokud $\\color{#e74c3c}{x}$ je počet let, které uplynou, rovnice je $42 + \\color{#e74c3c}{x} = 3(10 + \\color{#e74c3c}{x})$. Vyřeš: $\\color{#e74c3c}{x} = 6$.",
    },
    {
      type: "explain",
      body:
        "Poslední a nejčastěji opomíjený krok: **ověření výsledku v zadání**. Dosaď zpátky do původního textu — dává výsledek smysl? Nemůžeš mít záporný věk, zlomkový počet lidí, ani auto rychlejší než světlo.",
      callout: "Ověření",
    },
    {
      type: "sort-order",
      question: "Seřaď kroky řešení slovní úlohy do správného pořadí:",
      items: [
        "Přečíst úlohu a označit neznámou písmenem",
        "Sestavit rovnici podle vztahů ze zadání",
        "Vyřešit rovnici",
        "Ověřit výsledek dosazením zpět do zadání",
        "Odpovědět slovní větou",
      ],
      explanation:
        "Pořadí je klíčové: bez pojmenované neznámé nedáš dohromady rovnici, bez ověření nezjistíš, zda je výsledek reálný, a bez slovní odpovědi zákazník (nebo učitel) neví, co jsi vlastně spočítal.",
    },
    {
      type: "text-input",
      question:
        "V obchodě je bunda po $25\\,\\%$ slevě za $1\\,200\\,\\text{Kč}$. Jaká byla **původní cena** bundy (v $\\text{Kč}$)?",
      expectedAnswer: "1600",
      acceptableAnswers: ["1600", "1 600", "1600 Kč", "1 600 Kč"],
      numericTolerance: 1,
      explanation:
        "Po $25\\,\\%$ slevě platí zákazník $75\\,\\%$ původní ceny. Označíme $\\color{#e74c3c}{x}$ = původní cena. Pak $0{,}75 \\cdot \\color{#e74c3c}{x} = 1\\,200$, odkud $\\color{#e74c3c}{x} = 1\\,200 / 0{,}75 = 1\\,600\\,\\text{Kč}$.",
      hints: [
        "Po slevě zbývá $100\\,\\% - 25\\,\\% = 75\\,\\%$ = $0{,}75$ původní ceny.",
        "Tedy $0{,}75 \\cdot \\color{#e74c3c}{x} = 1200$.",
      ],
    },
    {
      type: "explain",
      body:
        "Slovní úlohy se nikdy neřeší „intuicí\". Vždy: **pojmenuj, přelož, vyřeš, ověř**. Pokud to uděláš disciplinovaně, je jedno, jestli je úloha o matkách, autech, nebo slevách — rovnice má vždy stejný tvar.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Slovní úloha = překlad textu na rovnici. Vzorec je sekundární.",
      "Vždy označ neznámou písmenem, než začneš psát rovnici.",
      "Sjednoť jednotky na začátku (km nebo m, hodiny nebo sekundy).",
      "„O 3 víc\" = $+3$; „3× víc\" = $\\times 3$; „o 25 % méně\" = $\\cdot 0{,}75$.",
      "Vždy ověř výsledek dosazením do zadání a odpověz slovní větou.",
    ],
  },
};

export const chapter: ChapterDefinition = {
  slug: "word-problems",
  topicSlug: "linear-equations",
  order: 2,
  title: "Slovní úlohy",
  lesson,
};
