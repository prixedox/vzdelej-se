import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Optika",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Vložíte lžičku do sklenice s vodou a ona vypadá *zlomená*. Proč?",
      choices: [
        {
          label: "Voda zvětšuje předměty jako lupa",
          isCorrect: false,
          feedback:
            "Lupa využívá čočku, ale zde jde o jiný jev na rozhraní dvou prostředí.",
        },
        {
          label: "Světlo se na rozhraní vzduchu a vody láme — mění směr",
          isCorrect: true,
          feedback:
            "Správně! Lom světla na rozhraní dvou prostředí s různým indexem lomu způsobí zdánlivé *zlomení*.",
        },
        {
          label: "Voda odráží světlo jako zrcadlo",
          isCorrect: false,
          feedback:
            "Odraz nastává na hladině, ale zlomený vzhled lžičky způsobuje lom, ne odraz.",
        },
      ],
      explanation:
        "Světlo se na rozhraní dvou prostředí s různou optickou hustotou láme — mění směr. Proto lžička ve vodě vypadá *zlomená*. Tento jev popisuje **Snellův zákon lomu**.",
    },

    // 2 — Explain: light as a ray
    {
      type: "explain",
      body: "V **geometrické optice** popisujeme světlo pomocí **paprsků** — přímých čar, které ukazují směr šíření. Toto zjednodušení funguje skvěle pro zrcadla, čočky a lom.\n\nRychlost světla ve vakuu: $c = 3 \\cdot 10^8\\,\\text{m/s}$.",
      callout: "Geometrická optika",
    },

    // 3 — Explain: law of reflection
    {
      type: "explain",
      body: "**Zákon odrazu**: Úhel odrazu $\\alpha'$ se rovná úhlu dopadu $\\alpha$ (oba měřeny od kolmice k povrchu):\n\n$$\\alpha' = \\alpha$$\n\nPaprsek dopadající, kolmice a paprsek odražený leží v jedné rovině.",
      callout: "Zákon odrazu",
    },

    // 4 — MC: reflection
    {
      type: "multiple-choice",
      question:
        "Světelný paprsek dopadá na rovinné zrcadlo pod úhlem $30°$ od kolmice. Pod jakým úhlem od kolmice se odrazí?",
      choices: [
        {
          label: "$60°$",
          isCorrect: false,
          feedback: "To by byl úhel od povrchu, ne od kolmice.",
        },
        {
          label: "$30°$",
          isCorrect: true,
          feedback: "Správně — úhel odrazu = úhel dopadu.",
        },
        {
          label: "$15°$",
          isCorrect: false,
          feedback: "Úhel odrazu se rovná úhlu dopadu, ne jeho polovině.",
        },
      ],
      explanation:
        "Zákon odrazu říká $\\alpha' = \\alpha$. Dopadá-li paprsek pod $30°$ od kolmice, odráží se pod $30°$ od kolmice.",
    },

    // 5 — Explain: Snell's law
    {
      type: "explain",
      body: "**Snellův zákon lomu** popisuje změnu směru paprsku na rozhraní dvou prostředí:\n\n$$n_1 \\sin \\alpha = n_2 \\sin \\beta$$\n\nkde $n_1$, $n_2$ jsou **indexy lomu** prostředí a $\\alpha$, $\\beta$ úhly od kolmice. Index lomu vakua je $1$, vzduchu $\\approx 1$, vody $\\approx 1{,}33$, skla $\\approx 1{,}5$.",
      callout: "Snellův zákon",
    },

    // 6 — Text input: Snell's law calculation
    {
      type: "text-input",
      question:
        "Paprsek dopadá ze vzduchu ($n_1 = 1$) na vodní hladinu ($n_2 = 1{,}33$) pod úhlem $\\alpha = 45°$. Vypočtěte $\\sin \\beta$ (hodnotu zaokrouhlete na dvě desetinná místa).",
      expectedAnswer: "0,53",
      acceptableAnswers: ["0.53", "0,53"],
      numericTolerance: 0.01,
      wrongAnswerFeedback: {
        "0,94":
          "Pozor — $\\sin \\beta = \\frac{n_1}{n_2} \\sin \\alpha$, ne naopak.",
      },
      explanation:
        "$\\sin \\beta = \\frac{n_1 \\sin \\alpha}{n_2} = \\frac{1 \\cdot \\sin 45°}{1{,}33} = \\frac{0{,}707}{1{,}33} \\approx 0{,}53$.",
      hints: [
        "Vyjádřete $\\sin \\beta$ ze Snellova zákona.",
        "$\\sin 45° \\approx 0{,}707$.",
      ],
    },

    // 7 — Explain: total internal reflection
    {
      type: "explain",
      body: "Když světlo přechází z opticky hustšího prostředí ($n_1 > n_2$) do řidšího, lomený paprsek se odklání od kolmice. Při **mezním úhlu** $\\alpha_m$ se lomený paprsek šíří podél rozhraní ($\\beta = 90°$):\n\n$$\\sin \\alpha_m = \\frac{n_2}{n_1}$$\n\nPro $\\alpha > \\alpha_m$ nastává **úplný odraz** — světlo se nedostane do druhého prostředí. Tohoto jevu využívají optická vlákna.",
      callout: "Úplný odraz",
    },

    // 8 — Text input: critical angle
    {
      type: "text-input",
      question:
        "Vypočtěte mezní úhel úplného odrazu pro rozhraní sklo–vzduch ($n_{\\text{sklo}} = 1{,}5$, $n_{\\text{vzduch}} = 1$). Odpovězte ve stupních, zaokrouhlete na celé stupně.",
      expectedAnswer: "42",
      acceptableAnswers: ["42°", "42 °", "41,8", "41.8"],
      numericTolerance: 1,
      explanation:
        "$\\sin \\alpha_m = \\frac{n_2}{n_1} = \\frac{1}{1{,}5} = 0{,}667$. Tedy $\\alpha_m = \\arcsin(0{,}667) \\approx 42°$.",
      hints: ["$\\sin \\alpha_m = \\frac{n_2}{n_1}$, pak použijte $\\arcsin$."],
    },

    // 9 — Explore: interactive optics
    {
      type: "explore",
      prompt:
        "Prozkoumejte lom a odraz světla na rozhraní dvou prostředí. Měňte úhel dopadu a indexy lomu. Najděte mezní úhel úplného odrazu — kdy lomený paprsek zmizí?",
      visual: {
        type: "interactive-optics",
        props: {},
      },
      followUpQuestion:
        "Úplný odraz nastává pouze při přechodu z opticky hustšího prostředí do řidšího, a to při překročení mezního úhlu.",
    },

    // 10 — Explain: spherical mirrors
    {
      type: "explain",
      body: "**Kulové zrcadlo** — duté (konkávní) nebo vypuklé (konvexní).\n\nPro dutá zrcadla platí **zobrazovací rovnice**:\n\n$$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{a'}$$\n\nkde $f$ je ohnisková vzdálenost, $a$ vzdálenost předmětu a $a'$ vzdálenost obrazu od zrcadla. Pro dutá zrcadla: $f = \\frac{r}{2}$ ($r$ je poloměr křivosti).",
      callout: "Zobrazovací rovnice",
    },

    // 11 — MC: mirror image
    {
      type: "multiple-choice",
      question:
        "Předmět je umístěn mezi ohniskem a dutým zrcadlem ($a < f$). Jaký obraz vznikne?",
      choices: [
        {
          label: "Skutečný, zmenšený, převrácený",
          isCorrect: false,
          feedback: "Skutečný převrácený obraz vzniká pro $a > 2f$.",
        },
        {
          label: "Zdánlivý, zvětšený, vzpřímený",
          isCorrect: true,
          feedback:
            "Ano! Tento princip využívají zvětšovací kosmetická zrcadla.",
        },
        {
          label: "Obraz nevznikne",
          isCorrect: false,
          feedback:
            "Obraz vznikne vždy — pro $a < f$ je zdánlivý za zrcadlem.",
        },
      ],
      explanation:
        "Pro $a < f$ u dutého zrcadla vzniká zdánlivý, vzpřímený a zvětšený obraz za zrcadlem — paprsky se po odrazu rozbíhají a obraz je průsečíkem jejich prodloužení.",
    },

    // 12 — Explain: thin lens
    {
      type: "explain",
      body: "**Tenká čočka** — spojka (konvexní, $f > 0$) nebo rozptylka (konkávní, $f < 0$).\n\nStejná zobrazovací rovnice:\n\n$$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{a'}$$\n\n**Příčné zvětšení**: $Z = -\\frac{a'}{a}$. Je-li $|Z| > 1$, obraz je zvětšený; záporné $Z$ značí převrácený obraz.",
      callout: "Tenká čočka",
    },

    // 13 — Text input: lens calculation
    {
      type: "text-input",
      question:
        "Předmět je ve vzdálenosti $a = 30\\,\\text{cm}$ od spojky s ohniskovou vzdáleností $f = 20\\,\\text{cm}$. Jaká je vzdálenost obrazu $a'$ v $\\text{cm}$?",
      expectedAnswer: "60",
      acceptableAnswers: ["60 cm", "60,0"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "12":
          "Pozor — do vzorce dosazujte $\\frac{1}{a'} = \\frac{1}{f} - \\frac{1}{a}$, neodečítejte přímo.",
      },
      explanation:
        "$\\frac{1}{a'} = \\frac{1}{f} - \\frac{1}{a} = \\frac{1}{20} - \\frac{1}{30} = \\frac{3 - 2}{60} = \\frac{1}{60}$. Tedy $a' = 60\\,\\text{cm}$.",
      hints: [
        "Vyjádřete $\\frac{1}{a'}$ ze zobrazovací rovnice.",
        "$\\frac{1}{a'} = \\frac{1}{f} - \\frac{1}{a}$.",
      ],
    },

    // 14 — Reveal: why does a diverging lens always produce virtual images?
    {
      type: "reveal",
      question:
        "Proč rozptylka vytváří vždy zdánlivý obraz?",
      revealedContent:
        "Rozptylka (konkávní čočka, $f < 0$) rozptyluje procházející paprsky. Po průchodu čočkou se paprsky rozbíhají a nikdy se neprotnou ve skutečném bodě. Obraz vzniká pouze jako průsečík **prodloužení** paprsků — proto je vždy **zdánlivý**, vzpřímený a zmenšený.",
    },

    // 15 — Sort order: optical phenomena
    {
      type: "sort-order",
      question:
        "Seřaďte optické jevy od nejjednoduššího po nejsložitější:",
      items: [
        "Přímočaré šíření světla",
        "Odraz na rovinném zrcadle",
        "Lom na rozhraní dvou prostředí",
        "Zobrazení tenkou čočkou",
      ],
      explanation:
        "Přímočaré šíření je základní předpoklad. Odraz popisuje jeden zákon. Lom vyžaduje Snellův zákon s indexy lomu. Zobrazení čočkou kombinuje dvojí lom a geometrickou konstrukci.",
    },

    // 16 — Text input: magnification
    {
      type: "text-input",
      question:
        "Spojka vytvoří obraz ve vzdálenosti $a' = 60\\,\\text{cm}$, předmět je ve vzdálenosti $a = 30\\,\\text{cm}$. Jaké je příčné zvětšení $Z$? (Odpovězte i se znaménkem.)",
      expectedAnswer: "-2",
      acceptableAnswers: ["-2,0", "-2.0"],
      numericTolerance: 0.01,
      explanation:
        "$Z = -\\frac{a'}{a} = -\\frac{60}{30} = -2$. Obraz je dvakrát zvětšený a převrácený (záporné $Z$).",
      hints: ["$Z = -\\frac{a'}{a}$."],
    },

    // 17 — MC: final check
    {
      type: "multiple-choice",
      question:
        "Optické vlákno přenáší světlo na velké vzdálenosti díky:",
      choices: [
        {
          label: "Lomu světla na vstupu do vlákna",
          isCorrect: false,
          feedback:
            "Lom nastane na vstupu, ale uvnitř vlákna udržuje světlo jiný jev.",
        },
        {
          label: "Úplnému odrazu na rozhraní jádra a pláště vlákna",
          isCorrect: true,
          feedback:
            "Přesně! Světlo se opakovaně odráží úplným odrazem a zůstává uvnitř jádra.",
        },
        {
          label: "Difrakci světla uvnitř vlákna",
          isCorrect: false,
          feedback:
            "Difrakce je ohyb vlnění, ale ve vlákně jde o úplný odraz.",
        },
      ],
      explanation:
        "Optické vlákno má jádro s vyšším indexem lomu než plášť. Světlo dopadá na rozhraní pod úhlem větším než mezní a nastává úplný odraz — paprsek se odráží sem a tam uvnitř jádra a šíří se na velké vzdálenosti s minimálními ztrátami.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Zákon odrazu: úhel odrazu = úhel dopadu ($\\alpha' = \\alpha$).",
      "Snellův zákon lomu: $n_1 \\sin \\alpha = n_2 \\sin \\beta$.",
      "Úplný odraz nastává při přechodu z hustšího do řidšího prostředí pro $\\alpha > \\alpha_m$.",
      "Zobrazovací rovnice pro zrcadla i čočky: $\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{a'}$.",
      "Příčné zvětšení: $Z = -\\frac{a'}{a}$; záporné $Z$ = převrácený obraz.",
      "Spojka ($f > 0$) může tvořit skutečný i zdánlivý obraz; rozptylka ($f < 0$) tvoří vždy zdánlivý.",
    ],
  },
  nextTopicSuggestion: "kvantova-fyzika",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "optics",
  order: 1,
  title: "Optika",
  lesson,
};
