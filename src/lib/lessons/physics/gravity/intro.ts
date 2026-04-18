import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Gravitace",
  narrative:
    "Podle legendy Newton seděl pod jabloní a spadlo mu jablko na hlavu. Ale jeho geniální otázka nebyla 'Proč padá jablko?', nýbrž 'Padá stejnou silou i Měsíc?' Uvědomil si, že tatáž síla drží Měsíc na oběžné dráze — a formuloval zákon, který spojil nebeskou a pozemskou mechaniku.",
  steps: [
    // 0 — Prediction
    {
      type: "prediction",
      scenario:
        "Astronaut na Mezinárodní vesmírné stanici (ISS) ve výšce $400\\,\\text{km}$ nad Zemí pustí pero. ISS obíhá Zemi rychlostí $7{,}7\\,\\text{km/s}$.",
      question: "Co se stane s perem?",
      options: [
        { label: "Spadne k podlaze stanice — gravitace stále působí", isCorrect: false },
        { label: "Zůstane vznášet se — ISS i pero padají stejně rychle", isCorrect: true },
        { label: "Odletí pryč — ve vesmíru není gravitace", isCorrect: false },
      ],
      reveal:
        "Ve výšce $400\\,\\text{km}$ je gravitační zrychlení stále asi $8{,}7\\,\\text{m/s}^2$ (jen o $11\\,\\%$ méně než na povrchu!). ISS i pero **padají volným pádem** kolem Země — ale pohybují se tak rychle, že stále 'míjejí' povrch. Proto se pero vznáší — ne kvůli absenci gravitace, ale kvůli **stavu beztíže** (volný pád).",
    },

    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Na Měsíci vážíte přibližně 6× méně než na Zemi. Proč?",
      choices: [
        {
          label: "Vaše hmotnost je na Měsíci menší",
          isCorrect: false,
          feedback:
            "Hmotnost je stejná všude — je to vlastnost tělesa. Mění se tíhová síla.",
        },
        {
          label: "Měsíc má menší gravitační zrychlení",
          isCorrect: true,
          feedback:
            "Správně! Na Měsíci je $g_{\\text{M}} \\approx 1{,}6\\,\\text{m/s}^2$, tedy asi 6× méně než na Zemi.",
        },
        {
          label: "Na Měsíci není atmosféra",
          isCorrect: false,
          feedback:
            "Atmosféra nemá na tíhu téměř žádný vliv — rozhoduje hmotnost tělesa (Měsíce).",
        },
      ],
      explanation:
        "Tíhová síla $F_G = mg$ závisí na gravitačním zrychlení $g$. Na Měsíci je $g$ asi 6× menší než na Zemi, protože Měsíc má menší hmotnost a poloměr.",
    },

    // 2 — Explain: Newtonův gravitační zákon
    {
      type: "explain",
      body: "**Newtonův gravitační zákon** popisuje přitahování dvou hmotných těles:\n\n$$F_g = \\color{#27ae60}{G} \\frac{\\color{#2980b9}{m_1} \\cdot \\color{#2980b9}{m_2}}{\\color{#e74c3c}{r}^2}$$\n\nkde $\\color{#27ae60}{G} = 6{,}674 \\cdot 10^{-11}\\,\\text{N}\\cdot\\text{m}^2/\\text{kg}^2$ je gravitační konstanta, $\\color{#2980b9}{m_1}$, $\\color{#2980b9}{m_2}$ jsou hmotnosti a $\\color{#e74c3c}{r}$ je vzdálenost středů těles.",
      callout: "Gravitační zákon",
      misconception:
        "Častý omyl: 'Ve vesmíru není gravitace.' Ve skutečnosti gravitace působí všude — astronauti na ISS jsou ve stavu beztíže, protože volně padají spolu se stanicí kolem Země, ne proto, že by na ně nepůsobila gravitační síla.",
    },

    // 3 — MC: závislost na vzdálenosti
    {
      type: "multiple-choice",
      question:
        "Jak se změní gravitační síla mezi dvěma tělesy, když zdvojnásobíme jejich vzdálenost?",
      choices: [
        {
          label: "Zmenší se na polovinu",
          isCorrect: false,
          feedback:
            "Síla klesá s druhou mocninou vzdálenosti, ne lineárně.",
        },
        {
          label: "Zmenší se na čtvrtinu",
          isCorrect: true,
          feedback:
            "Přesně! $F \\propto \\frac{1}{r^2}$, takže při $2r$: $F' = \\frac{F}{2^2} = \\frac{F}{4}$.",
        },
        {
          label: "Zůstane stejná",
          isCorrect: false,
          feedback: "Gravitační síla závisí na vzdálenosti — klesá se čtvercem.",
        },
      ],
      explanation:
        "Gravitační síla klesá s druhou mocninou vzdálenosti: $F \\propto \\frac{1}{r^2}$. Dvojnásobná vzdálenost → čtyřikrát menší síla.",
    },

    // 4 — Explain: gravitační pole a intenzita
    {
      type: "explain",
      body: "Každé hmotné těleso kolem sebe vytváří **gravitační pole**. Jeho silový účinek popisuje **intenzita gravitačního pole** $\\vec{K}$:\n\n$$K = \\frac{F_g}{m} = G \\frac{M}{r^2}$$\n\nNa povrchu Země: $K = g \\approx 9{,}81\\,\\text{m/s}^2$. Intenzita klesá se vzdáleností od středu Země.",
      callout: "Intenzita gravitačního pole",
    },

    // 5 — Text input: intenzita
    {
      type: "text-input",
      question:
        "Ve výšce rovné poloměru Země ($r = R_Z$) nad povrchem je vzdálenost od středu Země $2R_Z$. Kolikrát je tam intenzita gravitačního pole menší než na povrchu?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4×", "čtyřikrát", "4x"],
      wrongAnswerFeedback: {
        "2": "Pozor — intenzita klesá s $r^2$, ne s $r$. Vzdálenost je $2R_Z$, takže $K \\propto \\frac{1}{(2R_Z)^2}$.",
      },
      explanation:
        "$K \\propto \\frac{1}{r^2}$. Na povrchu $r = R_Z$, ve výšce $R_Z$ je $r = 2R_Z$. Poměr: $\\frac{K_{\\text{povrch}}}{K_{\\text{výška}}} = \\frac{(2R_Z)^2}{R_Z^2} = 4$.",
      hints: ["$K \\propto \\frac{1}{r^2}$, přičemž $r$ je vzdálenost od **středu** Země."],
    },

    // 6 — Explain: Keplerovy zákony - úvod
    {
      type: "explain",
      body: "**Johannes Kepler** (1571–1630) formuloval tři zákony pohybu planet na základě pozorování Tychona Brahe. Tyto zákony Newton později odvodil z gravitačního zákona.\n\n**1. Keplerův zákon:** Planety obíhají kolem Slunce po **elipsách**, v jejichž jednom ohnisku je Slunce.",
      callout: "1. Keplerův zákon",
    },

    // 7 — MC: Keplerovy zákony
    {
      type: "multiple-choice",
      question:
        "Podle 2. Keplerova zákona: kde se planeta pohybuje rychleji — blíže ke Slunci, nebo dále?",
      choices: [
        {
          label: "Blíže ke Slunci",
          isCorrect: true,
          feedback:
            "Správně! Průvodič (spojnice Slunce–planeta) opíše za stejný čas stejnou plochu, takže blíž u Slunce musí být planeta rychlejší.",
        },
        {
          label: "Dále od Slunce",
          isCorrect: false,
          feedback:
            "Naopak — dále od Slunce se planeta pohybuje pomaleji.",
        },
        {
          label: "Všude stejnou rychlostí",
          isCorrect: false,
          feedback:
            "To by platilo jen pro kruhovou orbitu. Eliptická dráha má proměnnou rychlost.",
        },
      ],
      explanation:
        "**2. Keplerův zákon (zákon ploch):** Průvodič planety opíše za stejný čas stejnou plochu. Blíže ke Slunci je průvodič kratší, proto se musí planeta pohybovat rychleji.",
    },

    // 8 — Explain: 3. Keplerův zákon
    {
      type: "explain",
      body: "**3. Keplerův zákon** spojuje oběžnou dobu $T$ s poloosou dráhy $a$:\n\n$$\\frac{T_1^2}{a_1^3} = \\frac{T_2^2}{a_2^3} = \\text{konst.}$$\n\nPlanety vzdálenější od Slunce mají delší oběžnou dobu. Například Mars ($a \\approx 1{,}52\\,\\text{AU}$) obíhá za $1{,}88$ roku, ale Země ($a = 1\\,\\text{AU}$) za 1 rok.",
      callout: "3. Keplerův zákon",
    },

    // 9 — Explore: orbity
    {
      type: "explore",
      prompt:
        "Pozorujte pohyb tělesa na oběžné dráze. Zkuste měnit rychlost a polohu — všimněte si, jak se mění tvar orbity (kruh → elipsa). Sledujte, kde se těleso pohybuje rychleji a kde pomaleji.",
      visual: {
        type: "interactive-orbit",
        props: {
          showVelocityVector: true,
          showOrbitTrace: true,
          allowInitialVelocity: true,
        },
      },
      followUpQuestion:
        "Při větší rychlosti v blízkosti centrálního tělesa se orbita protahuje do elipsy. Při přesně správné rychlosti je dráha kruhová. Při příliš velké rychlosti těleso unikne.",
    },

    // 10 — Explain: kosmické rychlosti
    {
      type: "explain",
      body: "**1. kosmická rychlost** $v_1$ — minimální rychlost pro kruhovou orbitu těsně nad povrchem:\n\n$$v_1 = \\sqrt{g \\cdot R_Z} \\approx 7{,}9\\,\\text{km/s}$$\n\n**2. kosmická rychlost** $v_2$ — rychlost pro únik z gravitačního pole Země:\n\n$$v_2 = v_1 \\sqrt{2} \\approx 11{,}2\\,\\text{km/s}$$",
      callout: "Kosmické rychlosti",
    },

    // 11 — MC: kosmické rychlosti
    {
      type: "multiple-choice",
      question:
        "Raketa má při startu ze Země rychlost $8\\,\\text{km/s}$. Co se stane?",
      choices: [
        {
          label: "Unikne ze Země",
          isCorrect: false,
          feedback:
            "K úniku potřebuje $v_2 \\approx 11{,}2\\,\\text{km/s}$. To nestačí.",
        },
        {
          label: "Bude obíhat Zemi po orbitě",
          isCorrect: true,
          feedback:
            "Ano! $v_1 < 8 < v_2$, takže se dostane na oběžnou dráhu (eliptickou).",
        },
        {
          label: "Spadne zpět na Zemi",
          isCorrect: false,
          feedback:
            "$8\\,\\text{km/s} > v_1 \\approx 7{,}9\\,\\text{km/s}$, takže se na orbitu dostane.",
        },
      ],
      explanation:
        "Rychlost $8\\,\\text{km/s}$ je větší než $v_1 \\approx 7{,}9\\,\\text{km/s}$ (orbita), ale menší než $v_2 \\approx 11{,}2\\,\\text{km/s}$ (únik). Raketa se dostane na eliptickou oběžnou dráhu.",
    },

    // 12 — Text input: 1. kosmická rychlost
    {
      type: "text-input",
      question:
        "Spočítejte 1. kosmickou rychlost pro Zemi: $v_1 = \\sqrt{g \\cdot R_Z}$, kde $g = 9{,}81\\,\\text{m/s}^2$ a $R_Z = 6\\,371\\,\\text{km}$. Výsledek uveďte v $\\text{km/s}$ zaokrouhlený na jedno desetinné místo.",
      expectedAnswer: "7,9",
      acceptableAnswers: ["7,9", "7.9", "7,9 km/s", "7.9 km/s"],
      numericTolerance: 0.05,
      explanation:
        "$v_1 = \\sqrt{9{,}81 \\cdot 6\\,371\\,000} = \\sqrt{62\\,499\\,510} \\approx 7\\,906\\,\\text{m/s} \\approx 7{,}9\\,\\text{km/s}$.",
      hints: [
        "Převeďte poloměr na metry: $R_Z = 6\\,371\\,000\\,\\text{m}$.",
        "$v_1 = \\sqrt{9{,}81 \\cdot 6\\,371\\,000}$. Výsledek vydělte 1000 pro km/s.",
      ],
    },

    // 13 — Reveal: proč padá Měsíc
    {
      type: "reveal",
      question:
        "Proč Měsíc nespadne na Zem, když ho Země přitahuje gravitační silou?",
      revealedContent:
        "Měsíc vlastně neustále \"padá\" směrem k Zemi — gravitační síla ho přitahuje. Ale zároveň se pohybuje dostatečně rychle \"do strany\", takže zakřivení jeho dráhy přesně odpovídá zakřivení Země. Výsledkem je oběžná dráha — neustálý pád, který nikdy nedopadne. Newton to přesně popsal: střela vystřelená dostatečně rychle by obletěla celou Zemi.",
    },

    // 14 — Sort order: kosmické rychlosti
    {
      type: "sort-order",
      question:
        "Seřaďte kosmické rychlosti od nejmenší po největší:",
      items: [
        "1. kosmická rychlost ($\\approx 7{,}9\\,\\text{km/s}$) — orbita",
        "2. kosmická rychlost ($\\approx 11{,}2\\,\\text{km/s}$) — únik ze Země",
        "3. kosmická rychlost ($\\approx 16{,}7\\,\\text{km/s}$) — únik ze Sluneční soustavy",
      ],
      explanation:
        "1. kosmická rychlost stačí pro orbitu, 2. pro únik z gravitačního pole Země, 3. pro únik z gravitačního pole Slunce (při startu ze Země).",
    },

    // 15 — Text input: závěrečný příklad
    {
      type: "text-input",
      question:
        "Dva objekty o hmotnostech $100\\,\\text{kg}$ a $200\\,\\text{kg}$ jsou od sebe vzdáleny $2\\,\\text{m}$. Jaká je gravitační síla mezi nimi (v newtonech)? Použijte $G = 6{,}67 \\cdot 10^{-11}$. Výsledek zapište ve tvaru vědecké notace, např. $3{,}34 \\cdot 10^{-7}$.",
      expectedAnswer: "3,34·10^-7",
      acceptableAnswers: [
        "3,34·10^-7",
        "3.34e-7",
        "3,34e-7",
        "3,34*10^-7",
        "3.34*10^-7",
        "3,34 · 10^-7",
        "3.34 · 10^-7",
        "0,000000334",
      ],
      numericTolerance: 0.01e-7,
      explanation:
        "$F_g = G \\frac{m_1 m_2}{r^2} = 6{,}67 \\cdot 10^{-11} \\cdot \\frac{100 \\cdot 200}{2^2} = 6{,}67 \\cdot 10^{-11} \\cdot 5000 = 3{,}34 \\cdot 10^{-7}\\,\\text{N}$.",
      hints: [
        "Dosaďte do vzorce: $F = G \\frac{m_1 m_2}{r^2}$.",
        "$\\frac{100 \\cdot 200}{4} = 5000$. Pak $6{,}67 \\cdot 10^{-11} \\cdot 5000$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Newtonův gravitační zákon: $F_g = G \\frac{m_1 m_2}{r^2}$ — síla klesá s druhou mocninou vzdálenosti.",
      "Intenzita gravitačního pole: $K = G \\frac{M}{r^2}$; na povrchu Země $K = g \\approx 9{,}81\\,\\text{m/s}^2$.",
      "Keplerovy zákony: eliptické dráhy, zákon ploch, $T^2 \\propto a^3$.",
      "1. kosmická rychlost $\\approx 7{,}9\\,\\text{km/s}$ (orbita), 2. kosmická $\\approx 11{,}2\\,\\text{km/s}$ (únik).",
      "Oběh na orbitě = neustálý volný pád kolem centrálního tělesa.",
    ],
  },
  nextTopicSuggestion: "teplota-a-teplo",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "gravity",
  order: 1,
  title: "Gravitace",
  lesson,
};
