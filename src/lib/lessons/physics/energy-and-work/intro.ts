import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Energie a práce",
  narrative:
    "Představte si, že tlačíte auto, které má prázdnou nádrž. Zpocení a unavení se ptáte: kam zmizela moje energie? Fyzici potřebovali přesný jazyk pro popis toho, co se děje, když síla působí na těleso — a tak vznikl pojem mechanická práce.",
  steps: [
    // 0 — Prediction
    {
      type: "prediction",
      scenario:
        "Dva identické míčky pustíte z klidu: míček A z výšky $10\\,\\text{m}$, míček B z výšky $20\\,\\text{m}$. Oba dopadají na měkkou podložku (bez odrazu).",
      question: "Jaký bude poměr rychlostí míčků těsně před dopadem?",
      options: [
        { label: "Míček B bude mít dvojnásobnou rychlost", isCorrect: false },
        { label: "Míček B bude mít $\\sqrt{2}$-krát větší rychlost", isCorrect: true },
        { label: "Oba dopadnou stejnou rychlostí", isCorrect: false },
      ],
      reveal:
        "Rychlost dopadu je $v = \\sqrt{2gh}$. Pro dvojnásobnou výšku tedy **neroste dvojnásobně**, ale jen $\\sqrt{2} \\approx 1{,}41$-krát. To plyne přímo ze zákona zachování energie: $mgh = \\frac{1}{2}mv^2$.",
    },

    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Míček padá z výšky $5\\,\\text{m}$. Těsně před dopadem má určitou rychlost. Odkud se vzala jeho kinetická energie?",
      choices: [
        {
          label: "Vznikla z ničeho",
          isCorrect: false,
          feedback: "Energie nikdy nevzniká z ničeho — to by porušovalo zákon zachování energie.",
        },
        {
          label: "Přeměnila se z potenciální energie",
          isCorrect: true,
          feedback: "Správně! Potenciální energie se přeměňuje na kinetickou.",
        },
        {
          label: "Dodal ji vzduch",
          isCorrect: false,
          feedback: "Vzduch naopak brzdí — odpor vzduchu energii odebírá.",
        },
      ],
      explanation:
        "Při pádu se gravitační potenciální energie $E_p = mgh$ přeměňuje na kinetickou energii $E_k = \\frac{1}{2}mv^2$.",
    },

    // 2 — Explain: mechanická práce
    {
      type: "explain",
      body: "**Mechanická práce** $W$ se koná, když síla působí na těleso a to se přemístí ve směru síly:\n\n$$W = \\color{#2980b9}{F} \\cdot \\color{#e74c3c}{s} \\cdot \\cos\\alpha$$\n\nkde $\\alpha$ je úhel mezi směrem síly a směrem pohybu. Jednotka: **joule** ($\\text{J} = \\text{N} \\cdot \\text{m}$).",
      callout: "Definice práce",
      misconception:
        "Studenti si často myslí, že když nesete těžký kufr po rovné chodbě, konáte práci proti tíze. Ve skutečnosti svislá tíhová síla je kolmá na vodorovný pohyb ($\\cos 90° = 0$), takže tíha nekoná žádnou práci.",
    },

    // 3 — MC: práce a úhel
    {
      type: "multiple-choice",
      question:
        "Nosíte kufr vodorovně po chodbě. Koná tíhová síla (svislá) práci na kufru?",
      choices: [
        {
          label: "Ano, protože kufr se pohybuje",
          isCorrect: false,
          feedback: "Pohyb sám nestačí — síla musí mít složku ve směru pohybu.",
        },
        {
          label: "Ne, protože tíhová síla je kolmá na směr pohybu",
          isCorrect: true,
          feedback: "Přesně! Když $\\alpha = 90°$, pak $\\cos 90° = 0$ a $W = 0$.",
        },
        {
          label: "Ano, ale zápornou práci",
          isCorrect: false,
          feedback: "Záporná práce nastane při $\\alpha > 90°$, ne při $\\alpha = 90°$.",
        },
      ],
      explanation:
        "Tíhová síla směřuje svisle dolů, pohyb je vodorovný — úhel je $90°$. Protože $\\cos 90° = 0$, tíhová síla nekoná žádnou práci.",
    },

    // 4 — Text input: výpočet práce
    {
      type: "text-input",
      question:
        "Táhnete bednu silou $50\\,\\text{N}$ po vodorovné podlaze na vzdálenost $4\\,\\text{m}$ ve směru síly. Jakou práci vykonáte (v joulech)?",
      expectedAnswer: "200",
      acceptableAnswers: ["200 J", "200,0"],
      explanation:
        "$W = F \\cdot s \\cdot \\cos 0° = 50 \\cdot 4 \\cdot 1 = 200\\,\\text{J}$.",
      hints: ["Síla a pohyb mají stejný směr, takže $\\alpha = 0°$ a $\\cos 0° = 1$."],
    },

    // 5 — Explain: kinetická energie
    {
      type: "explain",
      body: "**Kinetická energie** je energie pohybu:\n\n$$E_k = \\color{#27ae60}{\\frac{1}{2}} \\cdot \\color{#2980b9}{m} \\cdot \\color{#e74c3c}{v}^2$$\n\nZávisí na hmotnosti a **druhé mocnině** rychlosti. Dvojnásobná rychlost znamená čtyřnásobnou kinetickou energii!",
      callout: "Kinetická energie",
    },

    // 6 — Text input: kinetická energie
    {
      type: "text-input",
      question:
        "Auto o hmotnosti $1000\\,\\text{kg}$ jede rychlostí $20\\,\\text{m/s}$. Jaká je jeho kinetická energie (v kJ)?",
      expectedAnswer: "200",
      acceptableAnswers: ["200 kJ", "200,0"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "200000": "Správný výsledek v joulech, ale otázka je v kJ. Vydělte tisícem.",
      },
      explanation:
        "$E_k = \\frac{1}{2} \\cdot 1000 \\cdot 20^2 = \\frac{1}{2} \\cdot 1000 \\cdot 400 = 200\\,000\\,\\text{J} = 200\\,\\text{kJ}$.",
      hints: ["$E_k = \\frac{1}{2} m v^2$. Nezapomeňte převést na kJ."],
    },

    // 7 — Explain: potenciální energie
    {
      type: "explain",
      body: "**Gravitační potenciální energie** závisí na výšce tělesa nad zvolenou nulovou hladinou:\n\n$$E_p = m \\cdot g \\cdot h$$\n\nČím výš těleso zvedneme, tím větší potenciální energii má. Při pádu se přeměňuje zpět na kinetickou.",
      callout: "Potenciální energie",
    },

    // 8 — MC: porovnání energií
    {
      type: "multiple-choice",
      question:
        "Dva kameny mají stejnou hmotnost. Kámen A je ve výšce $10\\,\\text{m}$, kámen B ve výšce $20\\,\\text{m}$. Jaký je poměr jejich potenciálních energií $E_{pA} : E_{pB}$?",
      choices: [
        {
          label: "$1 : 2$",
          isCorrect: true,
          feedback: "Správně! $E_p$ je přímo úměrná výšce.",
        },
        {
          label: "$1 : 4$",
          isCorrect: false,
          feedback: "S druhou mocninou roste kinetická energie (s $v^2$), ne potenciální.",
        },
        {
          label: "$2 : 1$",
          isCorrect: false,
          feedback: "Větší výška = větší energie, ne menší.",
        },
      ],
      explanation:
        "$E_p = mgh$, takže $\\frac{E_{pA}}{E_{pB}} = \\frac{mgh_A}{mgh_B} = \\frac{h_A}{h_B} = \\frac{10}{20} = \\frac{1}{2}$.",
    },

    // 9 — Explore: horská dráha
    {
      type: "explore",
      prompt:
        "Pozorujte, jak se mění kinetická a potenciální energie vozíku na horské dráze. Všimněte si, že celková mechanická energie zůstává konstantní (pokud zanedbáme tření).",
      visual: {
        type: "interactive-roller-coaster",
        props: {
          showEnergyBars: true,
          showSpeedLabel: true,
          showHeightLabel: true,
        },
      },
      followUpQuestion:
        "Na nejvyšším bodě má vozík maximální $E_p$ a minimální $E_k$. V nejnižším bodě je to naopak — celková energie $E = E_k + E_p$ se ale nemění.",
    },

    // 10 — Explain: zákon zachování energie
    {
      type: "explain",
      body: "**Zákon zachování mechanické energie:** V izolované soustavě (bez tření) je součet kinetické a potenciální energie konstantní:\n\n$$E_k + E_p = \\text{konst.}$$\n$$\\frac{1}{2}mv_1^2 + mgh_1 = \\frac{1}{2}mv_2^2 + mgh_2$$",
      callout: "Zákon zachování energie",
    },

    // 11 — Text input: zákon zachování
    {
      type: "text-input",
      question:
        "Míček padá z klidu z výšky $20\\,\\text{m}$. Jakou rychlostí dopadne? Použijte $g = 10\\,\\text{m/s}^2$. (Zanedbejte odpor vzduchu.)",
      expectedAnswer: "20",
      acceptableAnswers: ["20 m/s", "20,0"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "200": "Pozor — pod odmocninou je $2gh$, ne $(2gh)^2$.",
      },
      explanation:
        "Ze zákona zachování energie: $mgh = \\frac{1}{2}mv^2 \\implies v = \\sqrt{2gh} = \\sqrt{2 \\cdot 10 \\cdot 20} = \\sqrt{400} = 20\\,\\text{m/s}$.",
      hints: [
        "Celá potenciální energie se přemění na kinetickou: $mgh = \\frac{1}{2}mv^2$.",
        "Hmotnost se vykrátí. Vyjádřete $v = \\sqrt{2gh}$.",
      ],
    },

    // 12 — Explain: výkon
    {
      type: "explain",
      body: "**Výkon** $P$ udává, jak rychle se koná práce:\n\n$$P = \\frac{W}{t}$$\n\nJednotka: **watt** ($\\text{W} = \\text{J/s}$). Lidské tělo vydá cca $50$–$100\\,\\text{W}$, auto má výkon řádově desítky $\\text{kW}$.",
      callout: "Výkon",
    },

    // 13 — Text input: výkon
    {
      type: "text-input",
      question:
        "Jeřáb zvedne náklad o hmotnosti $200\\,\\text{kg}$ do výšky $15\\,\\text{m}$ za $30\\,\\text{s}$. Jaký je výkon jeřábu (v $\\text{W}$)? Použijte $g = 10\\,\\text{m/s}^2$.",
      expectedAnswer: "1000",
      acceptableAnswers: ["1000 W", "1 kW", "1000,0"],
      numericTolerance: 1,
      explanation:
        "$W = mgh = 200 \\cdot 10 \\cdot 15 = 30\\,000\\,\\text{J}$. $P = \\frac{W}{t} = \\frac{30\\,000}{30} = 1\\,000\\,\\text{W}$.",
      hints: [
        "Nejdřív spočítejte práci: $W = mgh$.",
        "Pak výkon: $P = W / t$.",
      ],
    },

    // 14 — Reveal
    {
      type: "reveal",
      question:
        "Proč se auto zahřeje při brzdění?",
      revealedContent:
        "Kinetická energie auta se při brzdění přeměňuje na **teplo** (vnitřní energii) v brzdových destičkách. Celková energie se zachovává — jen se mění její forma z mechanické na tepelnou. Proto se po brzdění destičky zahřejí.",
    },

    // 15 — Sort order
    {
      type: "sort-order",
      question:
        "Seřaďte formy energie míčku hozeného svisle vzhůru — od okamžiku hodu po dosažení nejvyššího bodu:",
      items: [
        "Maximální $E_k$, minimální $E_p$",
        "$E_k$ klesá, $E_p$ roste",
        "Minimální $E_k$ (nulová), maximální $E_p$",
      ],
      explanation:
        "V okamžiku hodu má míček maximální rychlost (max $E_k$). Postupně zpomaluje — $E_k$ se přeměňuje na $E_p$. Na vrcholu se zastaví ($E_k = 0$, max $E_p$).",
    },
  ],
  summary: {
    keyTakeaways: [
      "Mechanická práce: $W = F \\cdot s \\cdot \\cos\\alpha$ (jednotka joule).",
      "Kinetická energie: $E_k = \\frac{1}{2}mv^2$ — závisí na druhé mocnině rychlosti.",
      "Potenciální energie: $E_p = mgh$ — závisí na výšce.",
      "Zákon zachování mechanické energie: $E_k + E_p = \\text{konst.}$ (bez tření).",
      "Výkon: $P = \\frac{W}{t}$ (jednotka watt).",
    ],
  },
  nextTopicSuggestion: "hybnost-a-impulz",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "energy-and-work",
  order: 1,
  title: "Energie a práce",
  lesson,
};
