import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Magnetické pole",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Kompas ukazuje na sever. Co vlastně způsobuje, že se střelka natáčí?",
      choices: [
        {
          label: "Gravitační síla Země",
          isCorrect: false,
          feedback: "Gravitace působí dolů, ne vodorovně směrem k severu.",
        },
        {
          label: "Magnetické pole Země",
          isCorrect: true,
          feedback:
            "Správně! Střelka kompasu je malý magnet, který se natáčí podle magnetického pole Země.",
        },
        {
          label: "Elektrické pole atmosféry",
          isCorrect: false,
          feedback:
            "Elektrické pole atmosféry existuje, ale kompas na něj nereaguje.",
        },
      ],
      explanation:
        "Země má magnetické pole (dipól), které natáčí magnetickou střelku kompasu. Geografický sever je blízko magnetickému jihu — proto tam míří severní pól střelky.",
    },

    // 2 — Explain: magnetické pole
    {
      type: "explain",
      body: "**Magnetické pole** je silové pole vytvářené pohybujícími se náboji (elektrickým proudem) nebo permanentními magnety. Na rozdíl od elektrického pole neexistují magnetické monopóly — každý magnet má vždy **severní (N)** i **jižní (S)** pól.",
      callout: "Definice",
    },

    // 3 — Explain: magnetická indukce
    {
      type: "explain",
      body: "**Magnetická indukce** $B$ je vektorová veličina popisující intenzitu magnetického pole:\n\n$$[B] = \\text{T (tesla)}$$\n\nMagnetická indukce Země: $B \\approx 5 \\cdot 10^{-5}\\,\\text{T}$. MRI přístroj: $B \\approx 1{,}5\\,\\text{T}$. Neodymový magnet: $B \\approx 1\\,\\text{T}$.",
      callout: "Magnetická indukce",
    },

    // 4 — MC: indukční čáry
    {
      type: "multiple-choice",
      question: "Jak jsou orientovány magnetické indukční čáry tyčového magnetu?",
      choices: [
        {
          label: "Od jižního pólu k severnímu (vně magnetu)",
          isCorrect: false,
          feedback: "Vně magnetu míří čáry opačným směrem.",
        },
        {
          label: "Od severního pólu k jižnímu (vně magnetu)",
          isCorrect: true,
          feedback: "Správně! Vně magnetu jdou od N k S, uvnitř od S k N — tvoří uzavřené smyčky.",
        },
        {
          label: "Rovnoběžně s osou magnetu, jedním směrem",
          isCorrect: false,
          feedback: "Indukční čáry tvoří uzavřené smyčky, ne rovnoběžky.",
        },
      ],
      explanation:
        "Magnetické indukční čáry jsou vždy uzavřené křivky. Vně magnetu směřují od severního (N) k jižnímu (S) pólu, uvnitř magnetu naopak.",
    },

    // 5 — Explain: pole přímého vodiče
    {
      type: "explain",
      body: "Dlouhý přímý vodič, kterým prochází proud $I$, vytváří kolem sebe kruhové magnetické pole. Velikost indukce ve vzdálenosti $r$:\n\n$$B = \\frac{\\mu_0 I}{2\\pi r}$$\n\nkde $\\mu_0 = 4\\pi \\cdot 10^{-7}\\,\\text{T\\cdot m/A}$ je permeabilita vakua. Směr určíme **pravidlem pravé ruky**: palec ve směru proudu, prsty ukazují směr $B$.",
      callout: "Pole vodiče s proudem",
    },

    // 6 — Text input: pole vodiče
    {
      type: "text-input",
      question:
        "Vodičem prochází proud $I = 10\\,\\text{A}$. Jaká je magnetická indukce ve vzdálenosti $r = 0{,}05\\,\\text{m}$ od vodiče? Odpovězte v $\\mu\\text{T}$ (zaokrouhlete na celé číslo).",
      expectedAnswer: "40",
      acceptableAnswers: ["40 µT", "40 uT"],
      numericTolerance: 1,
      explanation:
        "$B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{4\\pi \\cdot 10^{-7} \\cdot 10}{2\\pi \\cdot 0{,}05} = \\frac{4 \\cdot 10^{-6}}{0{,}1} = 4 \\cdot 10^{-5}\\,\\text{T} = 40\\,\\mu\\text{T}$.",
      hints: [
        "Dosaďte do vzorce $B = \\frac{\\mu_0 I}{2\\pi r}$.",
        "Zjednodušte: $\\frac{4\\pi \\cdot 10^{-7}}{2\\pi} = 2 \\cdot 10^{-7}$.",
      ],
    },

    // 7 — Reveal: pravidlo pravé ruky
    {
      type: "reveal",
      question:
        "Jak pomocí pravé ruky určíte směr magnetického pole kolem vodiče?",
      revealedContent:
        "Uchopte pomyslně vodič pravou rukou tak, aby palec ukazoval ve **směru proudu** (od + k −). Prsty se obtáčejí kolem vodiče ve **směru magnetických indukčních čar** (ve směru $\\vec{B}$).",
    },

    // 8 — Explain: síla na vodič
    {
      type: "explain",
      body: "Na vodič délky $l$ s proudem $I$ v magnetickém poli $B$ působí **Ampérova síla**:\n\n$$F = B \\cdot I \\cdot l \\cdot \\sin \\alpha$$\n\nkde $\\alpha$ je úhel mezi směrem proudu a směrem $\\vec{B}$. Maximální síla je při $\\alpha = 90°$ (vodič kolmý na pole).",
      callout: "Ampérova síla",
    },

    // 9 — Text input: síla na vodič
    {
      type: "text-input",
      question:
        "Vodič délky $l = 0{,}5\\,\\text{m}$ s proudem $I = 4\\,\\text{A}$ je umístěn kolmo na magnetické pole $B = 0{,}2\\,\\text{T}$. Jaká síla na něj působí v newtonech?",
      expectedAnswer: "0,4",
      acceptableAnswers: ["0.4", "0,4 N"],
      numericTolerance: 0.01,
      explanation:
        "$F = B \\cdot I \\cdot l \\cdot \\sin 90° = 0{,}2 \\cdot 4 \\cdot 0{,}5 \\cdot 1 = 0{,}4\\,\\text{N}$.",
      hints: ["Kolmo na pole: $\\sin 90° = 1$, takže $F = B \\cdot I \\cdot l$."],
    },

    // 10 — MC: Lorentzova síla
    {
      type: "multiple-choice",
      question:
        "Na nabitou částici pohybující se v magnetickém poli působí Lorentzova síla. Jakým směrem?",
      choices: [
        {
          label: "Ve směru magnetického pole",
          isCorrect: false,
          feedback: "Lorentzova síla je kolmá na magnetické pole i na rychlost částice.",
        },
        {
          label: "Kolmo na rychlost částice i na magnetické pole",
          isCorrect: true,
          feedback: "Správně! Proto se nabitá částice pohybuje po kružnici.",
        },
        {
          label: "Proti směru pohybu částice",
          isCorrect: false,
          feedback: "To by částici brzdilo — ale Lorentzova síla mění směr, ne velikost rychlosti.",
        },
      ],
      explanation:
        "Lorentzova síla $F = qvB\\sin\\alpha$ je vždy kolmá na rychlost i na pole. Proto nemění kinetickou energii částice, jen zakřivuje její trajektorii (kružnice, spirála).",
    },

    // 11 — Explain: elektromagnetická indukce
    {
      type: "explain",
      body: "**Elektromagnetická indukce** (Faraday, 1831): změna magnetického toku smyčkou indukuje elektrické napětí.\n\n$$\\mathcal{E} = -\\frac{\\Delta \\Phi}{\\Delta t}$$\n\nkde **magnetický tok** $\\Phi = B \\cdot S \\cdot \\cos\\alpha$ [$\\text{Wb — weber}$]. Záporné znaménko odpovídá **Lenzovu zákonu** — indukovaný proud působí proti změně, která ho vyvolala.",
      callout: "Faradayův zákon",
    },

    // 12 — MC: Lenzův zákon
    {
      type: "multiple-choice",
      question:
        "Zasouvání magnetu do cívky indukuje proud. Cívka se chová jako:",
      choices: [
        {
          label: "Magnet, který přitahuje zasouvání",
          isCorrect: false,
          feedback: "To by porušovalo zákon zachování energie — indukovaný proud by urychloval magnetu.",
        },
        {
          label: "Magnet, který odpuzuje zasouvání",
          isCorrect: true,
          feedback: "Ano! Lenzův zákon: indukovaný proud brání změně toku — cívka zasouvání odpuzuje.",
        },
        {
          label: "Nemá žádný magnetický účinek",
          isCorrect: false,
          feedback: "Indukovaný proud vytváří vlastní magnetické pole.",
        },
      ],
      explanation:
        "Lenzův zákon říká, že indukovaný proud má takový směr, aby svým magnetickým polem bránil změně toku, která ho vyvolala. Při zasouvání magnetu cívka odpuzuje, při vytahování přitahuje.",
    },

    // 13 — Text input: indukované napětí
    {
      type: "text-input",
      question:
        "Cívka o $N = 100$ závitech má plochu $S = 0{,}02\\,\\text{m}^2$. Magnetická indukce se změní z $0$ na $0{,}5\\,\\text{T}$ za $\\Delta t = 0{,}1\\,\\text{s}$ (pole kolmé na cívku). Jaké je indukované napětí v $\\text{V}$?",
      expectedAnswer: "100",
      acceptableAnswers: ["100 V", "100,0"],
      numericTolerance: 1,
      explanation:
        "$\\mathcal{E} = N \\cdot \\frac{\\Delta \\Phi}{\\Delta t} = N \\cdot \\frac{B \\cdot S}{\\Delta t} = 100 \\cdot \\frac{0{,}5 \\cdot 0{,}02}{0{,}1} = 100 \\cdot \\frac{0{,}01}{0{,}1} = 100\\,\\text{V}$.",
      hints: [
        "Tok: $\\Delta\\Phi = B \\cdot S \\cdot \\cos 0° = B \\cdot S$.",
        "Pro $N$ závitů: $\\mathcal{E} = N \\cdot \\frac{\\Delta\\Phi}{\\Delta t}$.",
      ],
    },

    // 14 — Sort order: elektromagnetické jevy
    {
      type: "sort-order",
      question:
        "Seřaďte historická objevy od nejstaršího po nejnovější:",
      items: [
        "Kompas v Číně (cca 200 př. n. l.)",
        "Oersted: proud vytváří magnetické pole (1820)",
        "Faraday: elektromagnetická indukce (1831)",
        "Maxwell: rovnice elektromagnetického pole (1865)",
      ],
      explanation:
        "Od prvního využití magnetismu (kompas) přes objev souvislosti elektřiny a magnetismu (Oersted, Faraday) až po úplný teoretický popis (Maxwell).",
    },

    // 15 — Reveal: praktické využití indukce
    {
      type: "reveal",
      question:
        "Kde všude se v praxi využívá elektromagnetická indukce?",
      revealedContent:
        "Elektromagnetická indukce je základem:\n\n- **Generátorů a elektráren** — rotující cívka v magnetickém poli vyrábí střídavý proud\n- **Transformátorů** — mění napětí střídavého proudu\n- **Indukčních varných desek** — střídavé pole indukuje vířivé proudy v hrnci\n- **Bezdrátového nabíjení** — přenos energie bez kabelů\n- **Elektrických kytar** — kmitající struna mění tok v snímači",
    },

    // 16 — MC: závěrečná
    {
      type: "multiple-choice",
      question:
        "Transformátor má na primární cívce 200 závitů a na sekundární 1000 závitů. Vstupní napětí je $230\\,\\text{V}$. Jaké je výstupní napětí?",
      choices: [
        {
          label: "$46\\,\\text{V}$",
          isCorrect: false,
          feedback: "To by platilo, kdyby sekundár měl méně závitů.",
        },
        {
          label: "$1150\\,\\text{V}$",
          isCorrect: true,
          feedback:
            "Správně! $U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 230 \\cdot \\frac{1000}{200} = 1150\\,\\text{V}$.",
        },
        {
          label: "$230\\,\\text{V}$",
          isCorrect: false,
          feedback: "Napětí by bylo stejné, jen kdyby obě cívky měly stejný počet závitů.",
        },
      ],
      explanation:
        "Pro ideální transformátor platí: $\\frac{U_2}{U_1} = \\frac{N_2}{N_1}$. Zde $U_2 = 230 \\cdot \\frac{1000}{200} = 1150\\,\\text{V}$. Jde o zvyšovací transformátor.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Magnetické pole vytvářejí pohybující se náboje (proudy) a permanentní magnety.",
      "Pole vodiče s proudem: $B = \\frac{\\mu_0 I}{2\\pi r}$, kde $\\mu_0 = 4\\pi \\cdot 10^{-7}\\,\\text{T\\cdot m/A}$.",
      "Ampérova síla na vodič: $F = BIl\\sin\\alpha$.",
      "Faradayův zákon: $\\mathcal{E} = -\\frac{\\Delta\\Phi}{\\Delta t}$; Lenzův zákon říká, že indukovaný proud brání změně.",
      "Transformátor: $\\frac{U_2}{U_1} = \\frac{N_2}{N_1}$.",
    ],
  },
  nextTopicSuggestion: "mechanicke-vlneni",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "magnetic-field",
  order: 1,
  title: "Magnetické pole",
  lesson,
};
