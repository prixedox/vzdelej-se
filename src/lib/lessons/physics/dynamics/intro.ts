import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Dynamika – síly a pohyb",
  narrative:
    "Proč se hokejový puk po odpálení pohybuje dál, i když na něj nikdo netlačí? Aristoteles by řekl, že se musí zastavit. Newton ukázal, že se mýlil — a jeho tři zákony změnily fyziku navždy.",
  steps: [
    // 1 — Prediction: book on table
    {
      type: "prediction",
      scenario:
        "Na stole leží kniha a nepohybuje se. Zamyslete se nad silami, které na ni působí.",
      question: "Působí na klidně ležící knihu nějaká síla?",
      options: [
        { label: "Ne, žádná síla na ni nepůsobí", isCorrect: false },
        { label: "Ano, ale síly se navzájem vyruší", isCorrect: true },
        { label: "Ano, a výslednice směřuje dolů", isCorrect: false },
      ],
      reveal:
        "Na knihu působí $\\color{#e74c3c}{\\text{tíhová síla } F_G}$ dolů a $\\color{#2980b9}{\\text{normálová síla } N}$ nahoru. Protože $\\color{#e74c3c}{F_G} = \\color{#2980b9}{N}$, výslednice je nulová a kniha zůstává v klidu.",
    },

    // 2 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Na stole leží kniha a nepohybuje se. Působí na ni nějaká síla?",
      choices: [
        {
          label: "Ne, žádná síla na ni nepůsobí",
          isCorrect: false,
          feedback:
            "Gravitace na ni působí stále — jen je vykompenzovaná reakcí stolu.",
        },
        {
          label: "Ano, ale výslednice sil je nulová",
          isCorrect: true,
          feedback:
            "Přesně tak! Tíhová síla a normálová síla se navzájem vyruší.",
        },
        {
          label: "Ano, a výslednice sil směřuje dolů",
          isCorrect: false,
          feedback: "Kdyby výslednice směřovala dolů, kniha by padala.",
        },
      ],
      explanation:
        "Na knihu působí tíhová síla $F_G$ dolů a normálová síla $N$ nahoru. Protože se kniha nepohybuje, $F_G = N$ a výslednice je nulová.",
    },

    // 3 — Explain: co je síla (with misconception)
    {
      type: "explain",
      body: "**Síla** $\\color{#e74c3c}{F}$ je vektorová veličina — má velikost i směr. Měříme ji v **newtonech** ($\\text{N}$). Síla mění pohybový stav tělesa: může ho uvést do pohybu, zastavit nebo změnit směr.",
      callout: "Definice",
      misconception:
        "Běžný omyl: \"Aby se těleso pohybovalo, musí na něj stále působit síla.\" Ve skutečnosti síla mění pohyb — těleso v pohybu pokračuje i bez síly (1. Newtonův zákon).",
    },

    // 3 — Explain: 1. Newtonův zákon
    {
      type: "explain",
      body: "**1. Newtonův zákon (zákon setrvačnosti):** Těleso setrvává v klidu nebo v rovnoměrném přímočarém pohybu, pokud na něj nepůsobí žádná výsledná síla.\n\n$$\\vec{F}_{\\text{výsl}} = 0 \\implies \\vec{v} = \\text{konst.}$$",
      callout: "1. Newtonův zákon",
    },

    // 4 — MC: setrvačnost
    {
      type: "multiple-choice",
      question:
        "Cestující v autobuse se nakloní dopředu, když autobus prudce zabrzdí. Proč?",
      choices: [
        {
          label: "Protože na ně působí síla dopředu",
          isCorrect: false,
          feedback:
            "Žádná síla je dopředu netlačí — jejich tělo si jen zachovává původní rychlost.",
        },
        {
          label: "Kvůli setrvačnosti — jejich tělo si zachovává původní rychlost",
          isCorrect: true,
          feedback: "Správně! To je přesně projev 1. Newtonova zákona.",
        },
        {
          label: "Protože se autobus pohybuje příliš rychle",
          isCorrect: false,
          feedback: "Rychlost sama o sobě to nezpůsobí — rozhoduje změna rychlosti.",
        },
      ],
      explanation:
        "Podle 1. Newtonova zákona si tělo cestujícího zachovává svou rychlost. Autobus se zpomalí, ale tělo pokračuje původní rychlostí — cestující se proto nakloní dopředu.",
    },

    // 5 — Explain: 2. Newtonův zákon
    {
      type: "explain",
      body: "**2. Newtonův zákon** je nejdůležitější vzorec dynamiky:\n\n$$F = m \\cdot a$$\n\nSíla ($\\text{N}$) = hmotnost ($\\text{kg}$) × zrychlení ($\\text{m/s}^2$). Větší síla → větší zrychlení. Větší hmotnost → menší zrychlení při stejné síle.",
      callout: "2. Newtonův zákon",
    },

    // 6 — Text input: F = ma
    {
      type: "text-input",
      question:
        "Těleso o hmotnosti $5\\,\\text{kg}$ zrychluje se zrychlením $3\\,\\text{m/s}^2$. Jaká síla na něj působí (v newtonech)?",
      expectedAnswer: "15",
      acceptableAnswers: ["15 N", "15,0"],
      explanation:
        "$F = m \\cdot a = 5 \\cdot 3 = 15\\,\\text{N}$.",
      hints: ["Použijte vzorec $F = m \\cdot a$."],
    },

    // 7 — Explain: 3. Newtonův zákon
    {
      type: "explain",
      body: "**3. Newtonův zákon (zákon akce a reakce):** Každé síle (akci) odpovídá stejně velká síla opačného směru (reakce).\n\n$$\\vec{F}_{12} = -\\vec{F}_{21}$$\n\nKdyž tlačíte rukou na zeď, zeď tlačí stejně velkou silou na vás.",
      callout: "3. Newtonův zákon",
    },

    // 8 — MC: akce a reakce
    {
      type: "multiple-choice",
      question:
        "Země přitahuje Měsíc gravitační silou. Přitahuje i Měsíc Zemi?",
      choices: [
        {
          label: "Ne, Země je mnohem hmotnější",
          isCorrect: false,
          feedback: "Hmotnost nemění existenci síly — mění jen zrychlení.",
        },
        {
          label: "Ano, stejně velkou silou, ale opačného směru",
          isCorrect: true,
          feedback: "Přesně — to je 3. Newtonův zákon.",
        },
        {
          label: "Ano, ale menší silou",
          isCorrect: false,
          feedback: "Síly jsou stejně velké; liší se jen výsledné zrychlení (kvůli různé hmotnosti).",
        },
      ],
      explanation:
        "Podle 3. Newtonova zákona jsou síly akce a reakce vždy stejně velké a opačně orientované. Měsíc přitahuje Zemi stejně velkou silou, jakou Země přitahuje Měsíc.",
    },

    // 9 — Explain: tíhová síla
    {
      type: "explain",
      body: "**Tíhová síla** působí na každé těleso u povrchu Země:\n\n$$F_G = m \\cdot g$$\n\nkde $g \\approx 9{,}81\\,\\text{m/s}^2$ (často zaokrouhlujeme na $10\\,\\text{m/s}^2$). Pro těleso o hmotnosti $1\\,\\text{kg}$ je $F_G \\approx 10\\,\\text{N}$.",
      callout: "Tíhová síla",
    },

    // 10 — Text input: tíhová síla
    {
      type: "text-input",
      question:
        "Jaká je tíhová síla působící na těleso o hmotnosti $8\\,\\text{kg}$? Použijte $g = 10\\,\\text{m/s}^2$.",
      expectedAnswer: "80",
      acceptableAnswers: ["80 N", "80,0"],
      numericTolerance: 0.5,
      explanation:
        "$F_G = m \\cdot g = 8 \\cdot 10 = 80\\,\\text{N}$.",
      hints: ["$F_G = m \\cdot g$, kde $g = 10\\,\\text{m/s}^2$."],
    },

    // 11 — Explain: třecí síla
    {
      type: "explain",
      body: "**Třecí síla** $F_t$ brzdí pohyb tělesa po povrchu:\n\n$$F_t = f \\cdot N$$\n\nkde $f$ je součinitel smykového tření a $N$ je normálová síla (na vodorovné ploše $N = F_G = mg$). Třecí síla působí vždy **proti směru pohybu**.",
    },

    // 12 — Explore: nakloněná rovina
    {
      type: "explore",
      prompt:
        "Měňte úhel nakloněné roviny a pozorujte, jaké síly působí na těleso. Všimněte si, jak se mění složka tíhové síly ve směru roviny a kolmo na ni.",
      visual: {
        type: "interactive-inclined-plane",
        props: {
          showForceVectors: true,
          showAngleSlider: true,
          showFriction: true,
        },
      },
      followUpQuestion:
        "S rostoucím úhlem roste složka tíhové síly ve směru roviny ($F_G \\sin\\alpha$) a klesá normálová síla ($F_G \\cos\\alpha$). Při dostatečném úhlu těleso začne klouzat.",
    },

    // 13 — Explain: nakloněná rovina vzorce
    {
      type: "explain",
      body: "Na nakloněné rovině se tíhová síla rozkládá na dvě složky:\n\n- **Rovnoběžná** (po rovině dolů): $F_{\\parallel} = mg\\sin\\alpha$\n- **Kolmá** (do roviny): $F_{\\perp} = mg\\cos\\alpha$\n\nTěleso se rozjede, když $F_{\\parallel} > F_t = f \\cdot F_{\\perp}$.",
    },

    // 14 — Text input: nakloněná rovina výpočet
    {
      type: "text-input",
      question:
        "Na nakloněné rovině pod úhlem $30°$ leží těleso o hmotnosti $2\\,\\text{kg}$. Jaká je složka tíhové síly ve směru roviny? Použijte $g = 10\\,\\text{m/s}^2$, $\\sin 30° = 0{,}5$.",
      expectedAnswer: "10",
      acceptableAnswers: ["10 N", "10,0"],
      numericTolerance: 0.1,
      explanation:
        "$F_{\\parallel} = mg\\sin\\alpha = 2 \\cdot 10 \\cdot 0{,}5 = 10\\,\\text{N}$.",
      hints: [
        "Složka ve směru roviny je $F_{\\parallel} = mg\\sin\\alpha$.",
        "Dosaďte $m = 2$, $g = 10$, $\\sin 30° = 0{,}5$.",
      ],
    },

    // 15 — Sort order: Newtonovy zákony
    {
      type: "sort-order",
      question:
        "Seřaďte Newtonovy zákony od prvního po třetí:",
      items: [
        "Zákon setrvačnosti",
        "Zákon síly: $F = ma$",
        "Zákon akce a reakce",
      ],
      explanation:
        "1. zákon — setrvačnost, 2. zákon — síla a zrychlení ($F = ma$), 3. zákon — akce a reakce ($\\vec{F}_{12} = -\\vec{F}_{21}$).",
    },

    // 16 — Reveal
    {
      type: "reveal",
      question:
        "Proč je těžší rozjet nákupní vozík plný zboží než prázdný?",
      revealedContent:
        "Podle 2. Newtonova zákona $a = \\frac{F}{m}$. Při stejné síle má těžší vozík (větší $m$) menší zrychlení. Proto ho vnímáme jako \"těžší k rozhýbání\". Hmotnost je míra **setrvačnosti** tělesa.",
    },

    // 17 — Text input: závěrečný příklad
    {
      type: "text-input",
      question:
        "Na těleso o hmotnosti $4\\,\\text{kg}$ na vodorovné ploše působí síla $20\\,\\text{N}$. Součinitel tření je $f = 0{,}25$ a $g = 10\\,\\text{m/s}^2$. Jaké je výsledné zrychlení tělesa (v $\\text{m/s}^2$)?",
      expectedAnswer: "2,5",
      acceptableAnswers: ["2,5", "2.5", "2,5 m/s^2", "2.5 m/s^2"],
      numericTolerance: 0.1,
      wrongAnswerFeedback: {
        "5": "To by platilo bez tření. Nezapomeňte odečíst třecí sílu.",
      },
      explanation:
        "Třecí síla: $F_t = f \\cdot mg = 0{,}25 \\cdot 4 \\cdot 10 = 10\\,\\text{N}$. Výsledná síla: $F_{\\text{výsl}} = 20 - 10 = 10\\,\\text{N}$. Zrychlení: $a = \\frac{10}{4} = 2{,}5\\,\\text{m/s}^2$.",
      hints: [
        "Nejdřív spočítejte třecí sílu: $F_t = f \\cdot m \\cdot g$.",
        "Výsledná síla = působící síla − třecí síla. Pak $a = F_{\\text{výsl}} / m$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Síla je vektorová veličina měřená v newtonech ($\\text{N}$).",
      "1. Newtonův zákon: těleso setrvává v klidu nebo rovnoměrném pohybu, pokud na něj nepůsobí výsledná síla.",
      "2. Newtonův zákon: $F = m \\cdot a$ — síla = hmotnost × zrychlení.",
      "3. Newtonův zákon: každé akci odpovídá stejně velká reakce opačného směru.",
      "Tíhová síla: $F_G = mg$, třecí síla: $F_t = f \\cdot N$.",
      "Na nakloněné rovině se tíhová síla rozkládá na složky $mg\\sin\\alpha$ a $mg\\cos\\alpha$.",
    ],
  },
  nextTopicSuggestion: "energie-a-prace",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "dynamics",
  order: 1,
  title: "Dynamika – síly a pohyb",
  lesson,
};
