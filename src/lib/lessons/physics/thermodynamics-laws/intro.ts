import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Zákony termodynamiky",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Je možné sestrojit stroj, který by veškeré přijaté teplo přeměnil na práci — bez jakýchkoli ztrát?",
      choices: [
        {
          label: "Ano, stačí dostatečně dobrá izolace",
          isCorrect: false,
          feedback:
            "I s dokonalou izolací část tepla vždy odchází — to říká druhý zákon termodynamiky.",
        },
        {
          label: "Ne, část tepla se vždy musí odvést do chladnějšího prostředí",
          isCorrect: true,
          feedback:
            "Správně! Druhý zákon termodynamiky zakazuje 100% účinnost tepelného stroje.",
        },
        {
          label: "Ano, pokud stroj pracuje dostatečně pomalu",
          isCorrect: false,
          feedback:
            "Rychlost procesu neodstraní nutnost odvádět zbytkové teplo.",
        },
      ],
      explanation:
        "Žádný tepelný stroj nemůže mít účinnost 100 %. To je důsledek druhého zákona termodynamiky — část přijatého tepla se vždy musí odvést.",
    },

    // 2 — Explain: vnitřní energie
    {
      type: "explain",
      body: "**Vnitřní energie** $U$ je celková kinetická energie neuspořádaného pohybu molekul plynu. Pro ideální plyn závisí jen na teplotě:\n\n$$U = \\frac{f}{2} n R T$$\n\nkde $f$ je počet stupňů volnosti ($f = 3$ pro jednoatomový, $f = 5$ pro dvouatomový plyn).",
      callout: "Vnitřní energie",
    },

    // 3 — Explain: první zákon termodynamiky
    {
      type: "explain",
      body: "**První zákon termodynamiky** je zákon zachování energie pro tepelné děje:\n\n$$Q = \\Delta U + W$$\n\nDodané teplo $Q$ se spotřebuje na:\n- zvýšení vnitřní energie $\\Delta U$ (ohřev plynu)\n- práci $W$ vykonanou plynem (rozpínání)",
      callout: "1. zákon",
    },

    // 4 — MC: první zákon
    {
      type: "multiple-choice",
      question:
        "Plynu v pístu dodáme $500\\,\\text{J}$ tepla. Plyn se rozpíná a vykoná práci $200\\,\\text{J}$. O kolik se změní vnitřní energie plynu?",
      choices: [
        {
          label: "$700\\,\\text{J}$",
          isCorrect: false,
          feedback: "Teplo se dělí mezi práci a vnitřní energii, nesčítá.",
        },
        {
          label: "$300\\,\\text{J}$",
          isCorrect: true,
          feedback:
            "Správně! $\\Delta U = Q - W = 500 - 200 = 300\\,\\text{J}$.",
        },
        {
          label: "$500\\,\\text{J}$",
          isCorrect: false,
          feedback: "To by platilo, jen kdyby plyn nekonal žádnou práci.",
        },
      ],
      explanation:
        "Z prvního zákona: $\\Delta U = Q - W = 500 - 200 = 300\\,\\text{J}$. Plyn se ohřál, ale ne tolik, jako kdyby nekonal práci.",
    },

    // 5 — Explain: práce plynu
    {
      type: "explain",
      body: "**Práce plynu** $W$ při rozpínání odpovídá ploše pod křivkou v $p$-$V$ diagramu:\n\n$$W = \\int_{V_1}^{V_2} p \\, dV$$\n\nPro izobarický děj ($p = \\text{konst.}$) se zjednoduší na:\n\n$$W = p \\cdot \\Delta V = p \\cdot (V_2 - V_1)$$",
      callout: "Práce plynu",
    },

    // 6 — Text input: práce plynu
    {
      type: "text-input",
      question:
        "Plyn se izobaricky rozpíná při tlaku $p = 200\\,\\text{kPa}$ z objemu $V_1 = 3\\,\\text{l}$ na $V_2 = 8\\,\\text{l}$. Jakou práci plyn vykoná? Odpovězte v joulech.",
      expectedAnswer: "1000",
      acceptableAnswers: ["1000 J", "1 000 J", "1 kJ", "1000J"],
      numericTolerance: 1,
      wrongAnswerFeedback: {
        "1000000":
          "Pozor na jednotky — převeďte litry na $\\text{m}^3$ ($1\\,\\text{l} = 0{,}001\\,\\text{m}^3$).",
      },
      explanation:
        "$W = p \\cdot \\Delta V = 200{\\,}000 \\cdot (0{,}008 - 0{,}003) = 200{\\,}000 \\cdot 0{,}005 = 1{\\,}000\\,\\text{J}$.",
      hints: [
        "Převeďte litry na $\\text{m}^3$: $\\Delta V = 8 - 3 = 5\\,\\text{l} = 0{,}005\\,\\text{m}^3$.",
        "Převeďte kPa na Pa: $200\\,\\text{kPa} = 200{\\,}000\\,\\text{Pa}$.",
      ],
    },

    // 7 — Reveal: první zákon pro speciální děje
    {
      type: "reveal",
      question:
        "Jak vypadá první zákon pro izochorický, izotermický a adiabatický děj?",
      revealedContent:
        "- **Izochorický** ($\\Delta V = 0$, tedy $W = 0$): $Q = \\Delta U$ — veškeré teplo jde na ohřev\n- **Izotermický** ($\\Delta T = 0$, tedy $\\Delta U = 0$): $Q = W$ — veškeré teplo se přemění na práci\n- **Adiabatický** ($Q = 0$): $0 = \\Delta U + W$, tedy $W = -\\Delta U$ — plyn koná práci na úkor své vnitřní energie",
    },

    // 8 — Explain: druhý zákon termodynamiky
    {
      type: "explain",
      body: "**Druhý zákon termodynamiky** říká, že teplo samovolně přechází jen z teplejšího tělesa na chladnější — nikdy naopak. Jiná formulace: nelze sestrojit periodicky pracující stroj, jehož jediným výsledkem by bylo úplné přeměnění tepla na práci.",
      callout: "2. zákon",
    },

    // 9 — Explain: entropie
    {
      type: "explain",
      body: "**Entropie** $S$ je míra neuspořádanosti systému. Druhý zákon říká, že entropie izolovaného systému nikdy neklesá:\n\n$$\\Delta S \\geq 0$$\n\nPři vratných (ideálních) dějích $\\Delta S = 0$, při nevratných $\\Delta S > 0$. Proto se rozbité vajíčko samo nesloží — to by entropie klesla.",
      callout: "Entropie",
    },

    // 10 — MC: entropie
    {
      type: "multiple-choice",
      question:
        "Kostka ledu se v teplé místnosti rozpustí. Co platí o celkové entropii systému (led + místnost)?",
      choices: [
        {
          label: "Entropie klesne, protože led je nyní uspořádanější voda",
          isCorrect: false,
          feedback:
            "Led je uspořádanější než voda — tavením entropie ledu naopak roste.",
        },
        {
          label: "Celková entropie vzroste",
          isCorrect: true,
          feedback:
            "Správně! Tání je nevratný děj — celková entropie systému vzroste.",
        },
        {
          label: "Entropie se nezmění",
          isCorrect: false,
          feedback:
            "To by platilo jen pro dokonale vratný děj — tání v teplé místnosti vratné není.",
        },
      ],
      explanation:
        "Tání ledu v teplé místnosti je nevratný proces. Entropie ledu vzroste (kapalina je méně uspořádaná než krystal) a celková entropie systému vzroste ($\\Delta S > 0$).",
    },

    // 11 — Explain: tepelné stroje
    {
      type: "explain",
      body: "**Tepelný stroj** přijímá teplo $Q_1$ od ohřívače (teplota $T_1$), část přemění na práci $W$ a zbytek $Q_2$ odvede chladiči (teplota $T_2 < T_1$). Účinnost:\n\n$$\\eta = \\frac{W}{Q_1} = 1 - \\frac{Q_2}{Q_1}$$\n\nPlatí vždy $\\eta < 1$ (neboli $\\eta < 100\\,\\%$).",
      callout: "Tepelný stroj",
    },

    // 12 — Explain: Carnotův stroj
    {
      type: "explain",
      body: "Maximální teoretickou účinnost má **Carnotův stroj** — pracuje pouze s vratnými (reverzibilními) ději:\n\n$$\\eta_C = 1 - \\frac{T_2}{T_1}$$\n\nkde $T_1$ a $T_2$ jsou teploty ohřívače a chladiče v **kelvinech**. Čím větší teplotní rozdíl, tím vyšší účinnost.",
      callout: "Carnotův cyklus",
    },

    // 13 — Text input: účinnost
    {
      type: "text-input",
      question:
        "Tepelný stroj pracuje mezi ohřívačem o teplotě $t_1 = 327\\,°\\text{C}$ a chladičem o teplotě $t_2 = 27\\,°\\text{C}$. Jaká je maximální (Carnotova) účinnost v procentech?",
      expectedAnswer: "50",
      acceptableAnswers: ["50 %", "50%", "50,0"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "92":
          "Dosadili jste teploty ve °C. Převeďte na kelviny: $T = t + 273$.",
      },
      explanation:
        "$T_1 = 327 + 273 = 600\\,\\text{K}$, $T_2 = 27 + 273 = 300\\,\\text{K}$.\n\n$\\eta_C = 1 - \\frac{T_2}{T_1} = 1 - \\frac{300}{600} = 1 - 0{,}5 = 0{,}5 = 50\\,\\%$.",
      hints: [
        "Převeďte obě teploty na kelviny: $T = t + 273$.",
        "Dosaďte do $\\eta_C = 1 - T_2/T_1$.",
      ],
    },

    // 14 — Sort order: účinnost strojů
    {
      type: "sort-order",
      question:
        "Seřaďte tepelné stroje od nejnižší po nejvyšší typickou účinnost:",
      items: [
        "Parní stroj ($\\approx 10{-}15\\,\\%$)",
        "Benzínový motor ($\\approx 25{-}30\\,\\%$)",
        "Dieselový motor ($\\approx 35{-}45\\,\\%$)",
        "Plynová turbína ($\\approx 40{-}60\\,\\%$)",
      ],
      explanation:
        "Účinnost závisí na teplotním rozdílu a typu cyklu. Dieselový motor má vyšší kompresi (a tím vyšší $T_1$) než benzínový, plynové turbíny pracují s ještě vyššími teplotami.",
    },

    // 15 — MC: aplikace zákonů
    {
      type: "multiple-choice",
      question:
        "Chladnička přenáší teplo ze studeného vnitřku do teplé místnosti. Neporušuje to druhý zákon termodynamiky?",
      choices: [
        {
          label: "Ano, porušuje — teplo nesmí přecházet ze studeného na teplé",
          isCorrect: false,
          feedback:
            "Druhý zákon zakazuje *samovolný* přenos — s dodáním práce to jde.",
        },
        {
          label: "Ne, protože chladnička k tomu spotřebovává elektrickou energii (práci)",
          isCorrect: true,
          feedback:
            'Správně! Druhý zákon zakazuje jen samovolný přenos. S dodáním práce můžeme teplo „přečerpat".',
        },
        {
          label: "Ne, protože uvnitř chladničky neplatí termodynamika",
          isCorrect: false,
          feedback: "Zákony termodynamiky platí všude — i uvnitř chladničky.",
        },
      ],
      explanation:
        "Chladnička je tepelné čerpadlo — dodáváme jí práci (elektřinu), aby přenesla teplo ze studeného prostoru do teplého. To druhý zákon nezakazuje, zakazuje jen *samovolný* přenos bez dodání práce.",
    },

    // 16 — Text input: závěrečný výpočet
    {
      type: "text-input",
      question:
        "Tepelný stroj přijme od ohřívače $Q_1 = 800\\,\\text{J}$ a vykoná práci $W = 300\\,\\text{J}$. Kolik tepla odvede chladiči? Odpovězte v joulech.",
      expectedAnswer: "500",
      acceptableAnswers: ["500 J", "500,0", "500J"],
      numericTolerance: 0.5,
      explanation:
        "Z prvního zákona: $Q_2 = Q_1 - W = 800 - 300 = 500\\,\\text{J}$.\n\nÚčinnost tohoto stroje: $\\eta = \\frac{W}{Q_1} = \\frac{300}{800} = 37{,}5\\,\\%$.",
      hints: ["Použijte $Q_1 = W + Q_2$, tedy $Q_2 = Q_1 - W$."],
    },

    // 17 — Reveal: třetí zákon
    {
      type: "reveal",
      question:
        "Existuje i třetí zákon termodynamiky. Co říká?",
      revealedContent:
        "**Třetí zákon termodynamiky** (Nernstův teorém): Entropie dokonalého krystalu při absolutní nule ($T = 0\\,\\text{K}$) je rovna nule. Praktický důsledek: **absolutní nuly nelze dosáhnout** konečným počtem kroků — můžeme se k ní jen neomezeně přibližovat.",
    },
  ],
  summary: {
    keyTakeaways: [
      "1. zákon termodynamiky (zachování energie): $Q = \\Delta U + W$ — teplo se dělí na změnu vnitřní energie a práci.",
      "Práce plynu je plocha pod křivkou v $p$-$V$ diagramu; pro izobarický děj $W = p \\cdot \\Delta V$.",
      "2. zákon: teplo samovolně přechází jen z teplejšího na chladnější; entropie izolovaného systému neklesá.",
      "Maximální účinnost tepelného stroje: $\\eta_C = 1 - T_2/T_1$ (Carnotův cyklus).",
    ],
  },
  nextTopicSuggestion: "elektricke-pole",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "thermodynamics-laws",
  order: 1,
  title: "Zákony termodynamiky",
  lesson,
};
