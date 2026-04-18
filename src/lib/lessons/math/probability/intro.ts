import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Pravdepodobnost",
  steps: [
    {
      type: "multiple-choice",
      question: "Hodite minci. Jaka je pravdepodobnost, ze padne panna?",
      choices: [
        { label: "$\\frac{1}{2}$", isCorrect: true, feedback: "Spravne! Dva mozne vysledky, jeden priznivy." },
        { label: "$\\frac{1}{3}$", isCorrect: false, feedback: "Mince ma jen dve strany, ne tri." },
        { label: "$1$", isCorrect: false, feedback: "Pravdepodobnost 1 by znamenala jistotu -- panna nepadne vzdy." },
      ],
      explanation: "Mince ma 2 rovnocenne vysledky (panna, orel). $P(\\text{panna}) = \\frac{1}{2}$.",
    },
    {
      type: "explore",
      prompt: "Hodte minci 50krat a sledujte histogram. Blizi se podil panen k ocekavane hodnote $\\frac{1}{2}$?",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "coin",
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "S rostoucim poctem hodu se relativni cetnost blizi k teoreticke pravdepodobnosti. Tomu se rika zakon velkych cisel.",
    },
    {
      type: "explain",
      body: "**Klasicka pravdepodobnost**: Pokud jsou vsechny vysledky stejne pravdepodobne:\n\n$$P(A) = \\frac{\\text{pocet priznivy vysledku}}{\\text{pocet vsech vysledku}}$$\n\nVysledek je vzdy cislo z intervalu $\\langle 0; 1 \\rangle$.",
      callout: "Vzorec",
    },
    {
      type: "text-input",
      question: "Kolik je pravdepodobnost, ze na sestistenne kostce padne cislo vetsi nez 4? Odpovezte zlomkem.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6"],
      explanation: "Priznive vysledky: 5 a 6 (dva z sesti). $P = \\frac{2}{6} = \\frac{1}{3}$.",
      hints: ["Kolik cisel na kostce je vetsi nez 4?"],
    },
    {
      type: "explore",
      prompt: "Hodte kostkou 100krat. Jsou vysledky priblizne rovnomerne rozdeleny? Ma kazde cislo zhruba $\\frac{1}{6}$ vsech hodu?",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "dice",
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "Histogram by se mel postupne vyrovnavat -- kazde cislo ma teoreticky pravdepodobnost $\\frac{1}{6} \\approx 16{,}7\\,\\%$.",
    },
    {
      type: "explain",
      body: "**Doplnkovy jev**: Pravdepodobnost, ze se udalost A nestane:\n\n$$P(\\overline{A}) = 1 - P(A)$$\n\nCasto je jednodussi spocitat doplnek nez primo pocitat puvodni jev.",
      callout: "Doplnek",
    },
    {
      type: "multiple-choice",
      question: "Z balicku 52 karet tahame jednu. Jaka je pravdepodobnost, ze to NENI srdcova karta?",
      choices: [
        { label: "$\\frac{1}{4}$", isCorrect: false, feedback: "To je pravdepodobnost, ze srdcova JE -- pocitame doplnek." },
        { label: "$\\frac{3}{4}$", isCorrect: true, feedback: "Spravne! $P(\\text{ne srdce}) = 1 - \\frac{13}{52} = 1 - \\frac{1}{4} = \\frac{3}{4}$." },
        { label: "$\\frac{1}{2}$", isCorrect: false, feedback: "Srdcovych karet je 13 z 52, ne polovina." },
      ],
      explanation: "$P(\\text{srdce}) = \\frac{13}{52} = \\frac{1}{4}$. Doplnek: $P(\\text{ne srdce}) = 1 - \\frac{1}{4} = \\frac{3}{4}$.",
    },
    {
      type: "explore",
      prompt: "V pytli je 5 cervenych a 3 modrych kulicek. Tahejte 50krat (s vracenim) a sledujte, jestli se pomer cervenych blizi k $\\frac{5}{8}$.",
      visual: {
        type: "interactive-probability",
        props: {
          mode: "marbles",
          marbleConfig: { red: 5, blue: 3 },
          showHistogram: true,
          showTheoreticalLine: true,
        },
      },
      followUpQuestion: "Teoreticka pravdepodobnost cervene kulicky je $\\frac{5}{8} = 0{,}625$. Experiment by se mel k teto hodnote postupne blizit.",
    },
    {
      type: "explain",
      body: "**Sjednoceni** neslucitelnych jevu: $P(A \\cup B) = P(A) + P(B)$.\n\n**Prunik** nezavislych jevu: $P(A \\cap B) = P(A) \\cdot P(B)$.\n\nSjednoceni = alespon jeden nastane. Prunik = oba nastanou soucasne.",
    },
    {
      type: "text-input",
      question: "Jaka je pravdepodobnost, ze na kostce padne 2 nebo 5? Odpovezte zlomkem.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "2/6"],
      explanation: "Jevy padne 2 a padne 5 se vzajemne vylucuji. $P = \\frac{1}{6} + \\frac{1}{6} = \\frac{2}{6} = \\frac{1}{3}$.",
    },
    {
      type: "reveal",
      question: "Co je podminena pravdepodobnost a kdy ji potrebujeme?",
      revealedContent: "**Podminena pravdepodobnost** $P(A|B)$ je pravdepodobnost jevu $A$ za predpokladu, ze nastal jev $B$:\n\n$$P(A|B) = \\frac{P(A \\cap B)}{P(B)}$$\n\nPriklad: Z balicku karet jste tahli cervenou kartu. Jaka je pravdepodobnost, ze je to srdcova? Prostor se zuzil na 26 cervenych karet, z nichz 13 je srdcovych: $P = \\frac{13}{26} = \\frac{1}{2}$.",
    },
    {
      type: "text-input",
      question: "Hodite trikrat minci. Jaka je pravdepodobnost, ze padne alespon jedna panna? Odpovezte zlomkem.",
      expectedAnswer: "7/8",
      acceptableAnswers: ["7/8", "0,875", "0.875"],
      explanation: "Doplnek: $P(\\text{zadna panna}) = P(\\text{3x orel}) = \\left(\\frac{1}{2}\\right)^3 = \\frac{1}{8}$. Tedy $P(\\text{alespon 1 panna}) = 1 - \\frac{1}{8} = \\frac{7}{8}$.",
      hints: ["Pouzijte doplnek -- jaka je pravdepodobnost, ze panna nepadne ani jednou?"],
    },
    {
      type: "sort-order",
      question: "Seradte nasledujici pravdepodobnosti od nejmensi po nejvetsi:",
      items: [
        "$P(\\text{padne 6}) = \\frac{1}{6}$",
        "$P(\\text{sude cislo}) = \\frac{1}{2}$",
        "$P(\\text{cislo} \\leq 5) = \\frac{5}{6}$",
        "$P(\\text{cislo} \\leq 6) = 1$",
      ],
      explanation: "$\\frac{1}{6} < \\frac{1}{2} < \\frac{5}{6} < 1$. Pravdepodobnost 1 znamena jistotu -- cislo na kostce je vzdy nejvyse 6.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Klasicka pravdepodobnost: $P(A) = \\frac{\\text{priznive}}{\\text{vsechny}}$.",
      "Doplnek: $P(\\overline{A}) = 1 - P(A)$ -- casto jednodussi nez primo pocitat.",
      "Nezavisle jevy: $P(A \\cap B) = P(A) \\cdot P(B)$.",
      "Zakon velkych cisel: s rostoucim poctem pokusu se relativni cetnost blizi k teoreticke pravdepodobnosti.",
      "Pravdepodobnost je vzdy cislo z intervalu $\\langle 0; 1 \\rangle$.",
    ],
  },
  nextTopicSuggestion: "kombinatorika-zaklady",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "probability",
  order: 1,
  title: "Pravdepodobnost",
  lesson,
};
