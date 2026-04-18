import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Elektrické pole",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Když si v zimě sundáte svetr a přiblížíte ruku ke kovovému klíči, praští vás. Proč?",
      choices: [
        {
          label: "Klíč je nabitý z výroby",
          isCorrect: false,
          feedback: "Klíč sám o sobě nabitý není — náboj vzniká třením.",
        },
        {
          label: "Třením se na těle nahromadil elektrický náboj, který se vybije jiskrou",
          isCorrect: true,
          feedback: "Správně! Třením se přesouvají elektrony a vzniká přebytek náboje.",
        },
        {
          label: "Je to způsobeno magnetickým polem Země",
          isCorrect: false,
          feedback: "Magnetické pole Země s elektrostatickým výbojem nesouvisí.",
        },
      ],
      explanation:
        "Třením (svetr o kůži) se přesouvají elektrony z jednoho materiálu na druhý. Nahromaděný náboj se pak vybije jiskrou — to je elektrostatický výboj.",
    },

    // 2 — Explain: elektrický náboj
    {
      type: "explain",
      body: "**Elektrický náboj** $Q$ je základní vlastnost hmoty. Existují dva druhy: **kladný** (proton) a **záporný** (elektron). Stejné náboje se odpuzují, opačné se přitahují.\n\nElementární náboj: $e = 1{,}6 \\cdot 10^{-19}\\,\\text{C}$. Náboj je vždy celistvým násobkem $e$.",
      callout: "Definice",
    },

    // 3 — MC: vlastnosti náboje
    {
      type: "multiple-choice",
      question: "Co platí o elektrickém náboji izolované soustavy?",
      choices: [
        {
          label: "Může se vytvořit z ničeho",
          isCorrect: false,
          feedback: "Náboj nelze vytvořit ani zničit — lze ho jen přesunout.",
        },
        {
          label: "Celkový náboj soustavy se zachovává",
          isCorrect: true,
          feedback: "Ano! Zákon zachování náboje je jedním ze základních zákonů fyziky.",
        },
        {
          label: "Kladný náboj je vždy větší než záporný",
          isCorrect: false,
          feedback: "Oba druhy náboje se mohou vyskytovat v libovolné velikosti.",
        },
      ],
      explanation:
        "**Zákon zachování elektrického náboje**: celkový náboj izolované soustavy se nemění. Náboj se může přesouvat, ale nikdy nevzniká ani nezaniká.",
    },

    // 4 — Explain: Coulombův zákon
    {
      type: "explain",
      body: "**Coulombův zákon** popisuje sílu mezi dvěma bodovými náboji $Q_1$ a $Q_2$ ve vzdálenosti $r$:\n\n$$F = k \\cdot \\frac{|Q_1 \\cdot Q_2|}{r^2}$$\n\nkde $k = 9 \\cdot 10^9\\,\\text{N\\cdot m}^2/\\text{C}^2$. Síla klesá s druhou mocninou vzdálenosti.",
      callout: "Coulombův zákon",
    },

    // 5 — Text input: Coulombova síla
    {
      type: "text-input",
      question:
        "Dva bodové náboje $Q_1 = 2\\,\\mu\\text{C}$ a $Q_2 = 3\\,\\mu\\text{C}$ jsou ve vzdálenosti $r = 0{,}3\\,\\text{m}$. Jaká je velikost Coulombovy síly v newtonech? (Zaokrouhlete na 1 desetinné místo.)",
      expectedAnswer: "0,6",
      acceptableAnswers: ["0.6", "0,6 N"],
      numericTolerance: 0.05,
      wrongAnswerFeedback: {
        "600": "Pozor — $\\mu\\text{C} = 10^{-6}\\,\\text{C}$, nezapomeňte převést.",
      },
      explanation:
        "$F = 9 \\cdot 10^9 \\cdot \\frac{2 \\cdot 10^{-6} \\cdot 3 \\cdot 10^{-6}}{0{,}3^2} = 9 \\cdot 10^9 \\cdot \\frac{6 \\cdot 10^{-12}}{0{,}09} = 9 \\cdot 10^9 \\cdot 6{,}67 \\cdot 10^{-11} = 0{,}6\\,\\text{N}$.",
      hints: [
        "Převeďte $\\mu\\text{C}$ na $\\text{C}$: $1\\,\\mu\\text{C} = 10^{-6}\\,\\text{C}$.",
        "Dosad'te do vzorce $F = k \\cdot \\frac{Q_1 Q_2}{r^2}$.",
      ],
    },

    // 6 — Explain: intenzita elektrického pole
    {
      type: "explain",
      body: "**Intenzita elektrického pole** $E$ je vektorová veličina, která popisuje silové působení pole na zkušební náboj $q$:\n\n$$E = \\frac{F}{q} \\qquad [\\text{N/C} = \\text{V/m}]$$\n\nPro bodový náboj $Q$ ve vzdálenosti $r$: $E = k \\cdot \\frac{|Q|}{r^2}$.",
      callout: "Intenzita pole",
    },

    // 7 — Explore: interactive electric field
    {
      type: "explore",
      prompt:
        "Umístěte kladný a záporný náboj a pozorujte silokřivky elektrického pole. Zkuste přiblížit náboje k sobě — jak se změní hustota siločar?",
      visual: {
        type: "interactive-electric-field",
        props: {
          showFieldLines: true,
          showForceVectors: true,
          allowCharges: true,
        },
      },
      followUpQuestion:
        "Čím blíže jsou náboje, tím hustší jsou siločáry — to odpovídá silnějšímu poli a větší Coulombově síle.",
    },

    // 8 — MC: siločáry
    {
      type: "multiple-choice",
      question: "Odkud kam míří siločáry elektrického pole?",
      choices: [
        {
          label: "Od záporného náboje ke kladnému",
          isCorrect: false,
          feedback: "Je to přesně naopak — siločáry směřují od plus k mínus.",
        },
        {
          label: "Od kladného náboje k zápornému",
          isCorrect: true,
          feedback: "Správně! Siločáry vycházejí z kladného a končí v záporném náboji.",
        },
        {
          label: "Vždy kolmo k povrchu vodiče",
          isCorrect: false,
          feedback:
            "To platí na povrchu vodiče, ale obecný směr je od kladného k zápornému.",
        },
      ],
      explanation:
        "Dohodou je směr siločar od kladného náboje k zápornému. Hustota siločar odpovídá velikosti intenzity pole.",
    },

    // 9 — Explain: potenciál a napětí
    {
      type: "explain",
      body: "**Elektrický potenciál** $\\varphi$ je energie na jednotku náboje:\n\n$$\\varphi = k \\cdot \\frac{Q}{r} \\qquad [\\text{V}]$$\n\n**Napětí** $U$ je rozdíl potenciálů mezi dvěma body: $U = \\varphi_1 - \\varphi_2$. Napětí udává, kolik energie získá (nebo ztratí) náboj $1\\,\\text{C}$ při přesunutí mezi těmito body.",
      callout: "Potenciál a napětí",
    },

    // 10 — Reveal: práce elektrického pole
    {
      type: "reveal",
      question:
        "Jakou práci vykoná elektrické pole při přesunutí náboje $q$ mezi body s napětím $U$?",
      revealedContent:
        "$$W = q \\cdot U$$\n\nNapříklad při přesunutí náboje $q = 2\\,\\text{C}$ napětím $U = 5\\,\\text{V}$ pole vykoná práci $W = 2 \\cdot 5 = 10\\,\\text{J}$.",
    },

    // 11 — Text input: napětí a práce
    {
      type: "text-input",
      question:
        "Elektron ($e = 1{,}6 \\cdot 10^{-19}\\,\\text{C}$) projde napětím $U = 100\\,\\text{V}$. Jakou kinetickou energii získá? Odpovězte v elektronvoltech ($\\text{eV}$).",
      expectedAnswer: "100",
      acceptableAnswers: ["100 eV", "100,0"],
      explanation:
        "$W = e \\cdot U = 1{,}6 \\cdot 10^{-19} \\cdot 100 = 1{,}6 \\cdot 10^{-17}\\,\\text{J}$. Protože $1\\,\\text{eV} = 1{,}6 \\cdot 10^{-19}\\,\\text{J}$, je to přesně $100\\,\\text{eV}$.",
      hints: [
        "Definice elektronvoltu: $1\\,\\text{eV}$ je energie, kterou elektron získá průchodem napětím $1\\,\\text{V}$.",
      ],
    },

    // 12 — Explain: kondenzátor
    {
      type: "explain",
      body: "**Kondenzátor** je součástka, která uchovává elektrický náboj. Deskový kondenzátor: dvě vodivé desky oddělené izolantem (dielektrikem).\n\n$$C = \\frac{Q}{U} \\qquad [\\text{F — farad}]$$\n\nKapacita deskového kondenzátoru: $C = \\varepsilon_0 \\varepsilon_r \\cdot \\frac{S}{d}$, kde $S$ je plocha desky a $d$ vzdálenost desek.",
      callout: "Kondenzátor",
    },

    // 13 — MC: kondenzátor
    {
      type: "multiple-choice",
      question:
        "Co se stane s kapacitou deskového kondenzátoru, když zdvojnásobíme vzdálenost mezi deskami?",
      choices: [
        {
          label: "Kapacita se zdvojnásobí",
          isCorrect: false,
          feedback: "Kapacita je nepřímo úměrná vzdálenosti, ne přímo.",
        },
        {
          label: "Kapacita klesne na polovinu",
          isCorrect: true,
          feedback: "Správně! Z $C = \\varepsilon_0 \\varepsilon_r \\cdot \\frac{S}{d}$ vidíme, že $C \\sim \\frac{1}{d}$.",
        },
        {
          label: "Kapacita se nezmění",
          isCorrect: false,
          feedback: "Kapacita závisí na vzdálenosti desek.",
        },
      ],
      explanation:
        "Ze vzorce $C = \\varepsilon_0 \\varepsilon_r \\cdot \\frac{S}{d}$ plyne, že kapacita je nepřímo úměrná vzdálenosti $d$. Dvojnásobná vzdálenost = poloviční kapacita.",
    },

    // 14 — Text input: energie kondenzátoru
    {
      type: "text-input",
      question:
        "Kondenzátor o kapacitě $C = 10\\,\\mu\\text{F}$ je nabitý na napětí $U = 200\\,\\text{V}$. Jaká je energie uložená v kondenzátoru v joulech? (Zaokrouhlete na 1 desetinné místo.)",
      expectedAnswer: "0,2",
      acceptableAnswers: ["0.2", "0,2 J"],
      numericTolerance: 0.01,
      explanation:
        "$E = \\frac{1}{2} C U^2 = \\frac{1}{2} \\cdot 10 \\cdot 10^{-6} \\cdot 200^2 = \\frac{1}{2} \\cdot 10^{-5} \\cdot 40000 = 0{,}2\\,\\text{J}$.",
      hints: [
        "Vzorec pro energii kondenzátoru: $E = \\frac{1}{2} C U^2$.",
        "Převeďte $\\mu\\text{F}$ na $\\text{F}$: $10\\,\\mu\\text{F} = 10 \\cdot 10^{-6}\\,\\text{F}$.",
      ],
    },

    // 15 — Sort order: veličiny a jednotky
    {
      type: "sort-order",
      question:
        "Seřaďte od nejmenší po největší: elektrické napětí v různých situacích.",
      items: [
        "Nervový impulz: $\\approx 0{,}07\\,\\text{V}$",
        "Tužková baterie: $1{,}5\\,\\text{V}$",
        "Zásuvka v ČR: $230\\,\\text{V}$",
        "Blesk: $\\approx 10^8\\,\\text{V}$",
      ],
      explanation:
        "Napětí se v přírodě a technice vyskytuje v obrovském rozsahu — od milivoltů v nervech po stamiliony voltů při blesku.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Elektrický náboj je kvantovaný ($e = 1{,}6 \\cdot 10^{-19}\\,\\text{C}$) a zachovává se.",
      "Coulombův zákon: $F = k \\cdot \\frac{|Q_1 Q_2|}{r^2}$, kde $k = 9 \\cdot 10^9\\,\\text{N\\cdot m}^2/\\text{C}^2$.",
      "Intenzita pole: $E = \\frac{F}{q} = k \\cdot \\frac{|Q|}{r^2}$ [$\\text{V/m}$].",
      "Napětí $U = \\varphi_1 - \\varphi_2$ udává práci na jednotku náboje: $W = qU$.",
      "Kapacita kondenzátoru: $C = \\frac{Q}{U}$; energie: $E = \\frac{1}{2}CU^2$.",
    ],
  },
  nextTopicSuggestion: "elektricke-obvody",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "electric-field",
  order: 1,
  title: "Elektrické pole",
  lesson,
};
