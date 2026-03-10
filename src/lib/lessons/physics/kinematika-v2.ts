import type { LessonV2 } from "@/types/lesson-v2";

export const kinematikaV2Beginner: LessonV2 = {
  title: "Kinematika – popis pohybu",
  narrative:
    "Galileo Galilei stál na šikmé věži v Pise a pustil dvě koule — těžkou a lehkou. Která dopadla první? Většina lidí tipovala špatně. Pojďme zjistit, jak se tělesa skutečně pohybují.",
  steps: [
    // 1 — Prediction: falling objects
    {
      type: "prediction",
      scenario:
        "Ze střechy pustíme současně těžkou ocelovou kouli ($5\\,\\text{kg}$) a lehký tenisový míček ($0{,}06\\,\\text{kg}$). Obě padají volným pádem (bez odporu vzduchu).",
      question: "Které těleso dopadne na zem první?",
      options: [
        { label: "Těžká ocelová koule — padá rychleji", isCorrect: false },
        { label: "Dopadnou současně", isCorrect: true },
        { label: "Tenisový míček — je lehčí, má menší setrvačnost", isCorrect: false },
      ],
      reveal:
        "Bez odporu vzduchu dopadnou **současně**! Gravitační zrychlení $\\color{#27ae60}{g \\approx 9{,}81\\,\\text{m/s}^2}$ je stejné pro všechna tělesa. Hmotnost neovlivňuje rychlost volného pádu — to dokázal Galileo už v 17. století.",
    },

    // 2 — Hook: intuitive question
    {
      type: "multiple-choice",
      question:
        "Auto jede rychlostí $\\color{#2980b9}{90}\\,\\text{km/h}$. Kolik kilometrů ujede za $\\color{#27ae60}{2}$ hodiny?",
      choices: [
        {
          label: "$45\\,\\text{km}$",
          isCorrect: false,
          feedback: "To by platilo, kdyby jelo jen půl hodiny.",
        },
        {
          label: "$180\\,\\text{km}$",
          isCorrect: true,
          feedback: "Správně! $90 \\cdot 2 = 180$.",
        },
        {
          label: "$90\\,\\text{km}$",
          isCorrect: false,
          feedback: "To ujede za 1 hodinu, ne za 2.",
        },
      ],
      explanation:
        "Dráha = rychlost × čas: $s = v \\cdot t = 90 \\cdot 2 = 180\\,\\text{km}$. Toto je základní vzorec kinematiky.",
    },

    // 3 — Explain: what is kinematics (with misconception)
    {
      type: "explain",
      body: "**Kinematika** popisuje pohyb těles — kde se nacházejí, jak rychle se pohybují a jak se mění jejich rychlost. Nezajímá se o příčiny pohybu (to je dynamika).",
      callout: "Definice",
      misconception:
        "Většina studentů si myslí, že těžší předměty padají rychleji. Ve skutečnosti (bez odporu vzduchu) padají všechna tělesa stejně rychle — Galileo to dokázal experimentem.",
    },

    // 3 — Explain: trajectory and displacement
    {
      type: "explain",
      body: "**Dráha** $s$ je celková délka trajektorie (cesty), kterou těleso urazí. Měříme ji v metrech ($\\text{m}$). **Poloha** určuje, kde se těleso právě nachází na přímce.",
      visual: {
        type: "motion-diagram",
        props: {
          positions: [0, 2, 4, 6, 8],
          labels: ["0 s", "1 s", "2 s", "3 s", "4 s"],
        },
      },
    },

    // 4 — MC: units
    {
      type: "multiple-choice",
      question: "Jaká je základní SI jednotka rychlosti?",
      choices: [
        {
          label: "$\\text{km/h}$",
          isCorrect: false,
          feedback: "To je běžná jednotka, ale ne SI základní.",
        },
        {
          label: "$\\text{m/s}$",
          isCorrect: true,
          feedback: "Přesně tak — metr za sekundu.",
        },
        {
          label: "$\\text{m/min}$",
          isCorrect: false,
          feedback: "Minuta není základní SI jednotka času.",
        },
      ],
      explanation:
        "V soustavě SI měříme vzdálenost v metrech a čas v sekundách, takže rychlost je v $\\text{m/s}$.",
    },

    // 5 — Explain: speed formula
    {
      type: "explain",
      body: "Průměrná rychlost rovnoměrného pohybu:\n\n$$v = \\frac{s}{t}$$\n\nkde $s$ je dráha a $t$ je čas. Z toho plyne $s = v \\cdot t$ a $t = \\frac{s}{v}$.",
      callout: "Vzorec",
    },

    // 6 — Text input: basic calculation
    {
      type: "text-input",
      question:
        "Chodec ujde $600\\,\\text{m}$ za $5\\,\\text{min}$. Jaká je jeho průměrná rychlost v $\\text{m/s}$?",
      expectedAnswer: "2",
      acceptableAnswers: ["2 m/s", "2,0", "2.0"],
      wrongAnswerFeedback: {
        "120": "Pozor — 5 minut = 300 sekund, ne 5 sekund.",
      },
      explanation:
        "$t = 5\\,\\text{min} = 300\\,\\text{s}$. Pak $v = \\frac{600}{300} = 2\\,\\text{m/s}$.",
      hints: ["Převeďte minuty na sekundy: $5\\,\\text{min} = 300\\,\\text{s}$."],
    },

    // 7 — Explain: km/h to m/s
    {
      type: "explain",
      body: "Převod $\\text{km/h}$ na $\\text{m/s}$: dělíme **3,6** (protože $1\\,\\text{km/h} = \\frac{1000}{3600}\\,\\text{m/s}$).\n\nPříklad: $72\\,\\text{km/h} = \\frac{72}{3,6} = 20\\,\\text{m/s}$.",
      callout: "Převod",
    },

    // 8 — Text input: unit conversion
    {
      type: "text-input",
      question: "Převeďte $108\\,\\text{km/h}$ na $\\text{m/s}$.",
      expectedAnswer: "30",
      acceptableAnswers: ["30 m/s", "30,0"],
      explanation: "$\\frac{108}{3{,}6} = 30\\,\\text{m/s}$.",
      hints: ["Dělte 3,6."],
    },

    // 9 — Explore: interactive motion
    {
      type: "explore",
      prompt:
        "Nastavte rychlost a pozorujte, jak se mění ujetá dráha v čase. Zkuste zdvojnásobit rychlost — co se stane s dráhou za stejný čas?",
      visual: {
        type: "interactive-motion",
        props: {
          showVelocitySlider: true,
          showDistanceLabel: true,
          showTimeLabel: true,
        },
      },
      followUpQuestion:
        "Při dvojnásobné rychlosti ujedete za stejný čas **dvojnásobnou dráhu** — dráha je přímo úměrná rychlosti.",
    },

    // 10 — MC: graph reading
    {
      type: "multiple-choice",
      question:
        "V grafu závislosti dráhy na čase ($s$-$t$) rovnoměrného pohybu je čára přímka. Co představuje **sklon** této přímky?",
      choices: [
        {
          label: "Zrychlení",
          isCorrect: false,
          feedback: "Sklon v grafu $v$-$t$ je zrychlení, ne v grafu $s$-$t$.",
        },
        {
          label: "Rychlost",
          isCorrect: true,
          feedback: "Ano! Strmější přímka = větší rychlost.",
        },
        {
          label: "Dráhu",
          isCorrect: false,
          feedback: "Dráhu čteme na svislé ose, ne ze sklonu.",
        },
      ],
      explanation:
        "V grafu $s$-$t$ platí $s = v \\cdot t$. Sklon přímky $\\frac{\\Delta s}{\\Delta t}$ je právě rychlost $v$.",
    },

    // 11 — Explain: acceleration
    {
      type: "explain",
      body: "Když se rychlost mění, mluvíme o **zrychlení** $a$:\n\n$$a = \\frac{\\Delta v}{\\Delta t} = \\frac{v - v_0}{t}$$\n\nJednotka: $\\text{m/s}^2$. Kladné $a$ = zrychlení, záporné = brzdění.",
      callout: "Zrychlení",
    },

    // 12 — MC: acceleration concept
    {
      type: "multiple-choice",
      question:
        "Auto zrychlí z $0$ na $20\\,\\text{m/s}$ za $10\\,\\text{s}$. Jaké je jeho zrychlení?",
      choices: [
        {
          label: "$2\\,\\text{m/s}^2$",
          isCorrect: true,
          feedback: "$a = \\frac{20 - 0}{10} = 2\\,\\text{m/s}^2$ ✓",
        },
        {
          label: "$200\\,\\text{m/s}^2$",
          isCorrect: false,
          feedback: "To by bylo $20 \\cdot 10$, ale my dělíme.",
        },
        {
          label: "$0{,}5\\,\\text{m/s}^2$",
          isCorrect: false,
          feedback: "Zkus: $\\frac{20}{10} = 2$, ne $\\frac{10}{20}$.",
        },
      ],
      explanation: "$a = \\frac{v - v_0}{t} = \\frac{20 - 0}{10} = 2\\,\\text{m/s}^2$.",
    },

    // 13 — Sort order: kinematic quantities
    {
      type: "sort-order",
      question:
        "Seřaďte fyzikální veličiny od nejzákladnější po odvozenou:",
      items: [
        "Čas $t$ [s]",
        "Dráha $s$ [m]",
        "Rychlost $v$ [m/s]",
        "Zrychlení $a$ [m/s²]",
      ],
      explanation:
        "Čas a dráha jsou základní veličiny. Rychlost je podíl dráhy a času, zrychlení je změna rychlosti v čase.",
    },

    // 14 — Explain: uniformly accelerated motion
    {
      type: "explain",
      body: "Pro rovnoměrně zrychlený pohyb (z klidu, $v_0 = 0$) platí:\n\n$$s = \\frac{1}{2} a t^2 \\qquad v = a \\cdot t$$\n\nDráha roste s druhou mocninou času — proto zrychlující auto ujede v každé další sekundě víc.",
    },

    // 15 — Text input: accelerated motion
    {
      type: "text-input",
      question:
        "Auto zrychluje z klidu se zrychlením $a = 3\\,\\text{m/s}^2$. Jakou dráhu ujede za $4\\,\\text{s}$?",
      expectedAnswer: "24",
      acceptableAnswers: ["24 m", "24,0"],
      numericTolerance: 0.1,
      explanation:
        "$s = \\frac{1}{2} \\cdot 3 \\cdot 4^2 = \\frac{1}{2} \\cdot 3 \\cdot 16 = 24\\,\\text{m}$.",
      hints: ["Použijte vzorec $s = \\frac{1}{2} a t^2$."],
    },

    // 16 — Reveal: why quadratic?
    {
      type: "reveal",
      question:
        "Proč dráha při zrychleném pohybu závisí na $t^2$ a ne jen na $t$?",
      revealedContent:
        'Protože rychlost **lineárně roste** s časem ($v = at$). Dráha je součet všech okamžitých rychlostí — tedy plocha pod přímkou v grafu $v$-$t$, která je trojúhelník s plochou $\\frac{1}{2} \\cdot t \\cdot at = \\frac{1}{2}at^2$.',
    },

    // 17 — Text input: final challenge
    {
      type: "text-input",
      question:
        "Vlak jede rychlostí $72\\,\\text{km/h}$ a začne brzdit se zrychlením $a = -2\\,\\text{m/s}^2$. Za jak dlouho zastaví? (Odpovězte v sekundách.)",
      expectedAnswer: "10",
      acceptableAnswers: ["10 s", "10,0"],
      wrongAnswerFeedback: {
        "36": "Nezapomeňte převést km/h na m/s — dělte 3,6.",
      },
      explanation:
        "$v_0 = \\frac{72}{3{,}6} = 20\\,\\text{m/s}$. Z $v = v_0 + at$ a $v = 0$: $t = \\frac{-v_0}{a} = \\frac{-20}{-2} = 10\\,\\text{s}$.",
      hints: [
        "Převeďte $72\\,\\text{km/h}$ na m/s.",
        "Použijte $v = v_0 + at$ s $v = 0$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Kinematika popisuje pohyb pomocí dráhy, rychlosti a zrychlení.",
      "Základní vzorec rovnoměrného pohybu: $s = v \\cdot t$.",
      "Převod km/h → m/s: dělíme **3,6**.",
      "Zrychlení $a = \\frac{\\Delta v}{\\Delta t}$ měříme v $\\text{m/s}^2$.",
      "Pro rovnoměrně zrychlený pohyb z klidu: $s = \\frac{1}{2}at^2$.",
    ],
  },
  nextTopicSuggestion: "dynamika",
};
