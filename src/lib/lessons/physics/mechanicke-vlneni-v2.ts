import type { LessonV2 } from "@/types/lesson-v2";

export const mechanickeVlneniV2Beginner: LessonV2 = {
  title: "Mechanické vlnění a zvuk",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Na hladině jezera hodíte kámen. Plovoucí list se začne houpat nahoru a dolů, ale neposune se směrem od kamene. Proč?",
      choices: [
        {
          label: "Voda list tlačí ke břehu",
          isCorrect: false,
          feedback:
            "Vlna přenáší energii, ale částice vody se nepohybují s vlnou do strany.",
        },
        {
          label: "Vlnění přenáší energii, ale hmota zůstává na místě",
          isCorrect: true,
          feedback:
            "Přesně tak! Vlna nese energii, ale částice prostředí kmitají kolem rovnovážné polohy.",
        },
        {
          label: "List je příliš těžký, aby se pohnul",
          isCorrect: false,
          feedback:
            "Hmotnost listu nehraje roli — ani samotné molekuly vody se s vlnou neposouvají.",
        },
      ],
      explanation:
        "Mechanické vlnění je přenos energie prostředím **bez přenosu hmoty**. Částice prostředí kmitají kolem rovnovážné polohy, zatímco energie se šíří dál.",
    },

    // 2 — Explain: what is a wave
    {
      type: "explain",
      body: "**Mechanické vlnění** vzniká, když se kmitání jedné částice pružného prostředí přenáší na sousední částice. Vlna šíří **energii**, ale částice se nepohybují s vlnou — pouze kmitají kolem rovnovážné polohy.",
      callout: "Definice",
    },

    // 3 — Explain: transverse vs longitudinal
    {
      type: "explain",
      body: "Rozlišujeme dva základní typy vlnění:\n\n- **Příčné** (transverzální): částice kmitají **kolmo** na směr šíření vlny (např. vlna na struně).\n- **Podélné** (longitudinální): částice kmitají **ve směru** šíření vlny (např. zvuk ve vzduchu — střídání zhoustění a zředění).",
      callout: "Typy vlnění",
    },

    // 4 — MC: type identification
    {
      type: "multiple-choice",
      question:
        "Zvuková vlna ve vzduchu je příkladem jakého typu vlnění?",
      choices: [
        {
          label: "Příčného",
          isCorrect: false,
          feedback:
            "Příčné vlnění má směr kmitání kolmý na šíření — to není případ zvuku ve vzduchu.",
        },
        {
          label: "Podélného",
          isCorrect: true,
          feedback:
            "Správně! Molekuly vzduchu se zhušťují a zřeďují ve směru šíření zvuku.",
        },
        {
          label: "Příčného i podélného zároveň",
          isCorrect: false,
          feedback:
            "To platí např. pro vlny na hladině, ale ne pro zvuk v plynech.",
        },
      ],
      explanation:
        "Zvuk v plynech a kapalinách je vždy podélné vlnění — molekuly kmitají ve směru šíření. V pevných látkách se ale zvuk může šířit i příčně.",
    },

    // 5 — Explain: wavelength, frequency, speed
    {
      type: "explain",
      body: "Základní veličiny vlnění:\n\n- **Vlnová délka** $\\lambda$ — vzdálenost mezi dvěma sousedními body se stejnou fází (např. dva vrcholy). Jednotka: $\\text{m}$.\n- **Frekvence** $f$ — počet kmitů za sekundu. Jednotka: $\\text{Hz}$.\n- **Perioda** $T = \\frac{1}{f}$ — doba jednoho kmitu.\n\nRychlost šíření vlny:\n\n$$v = \\lambda f$$",
      callout: "Vzorec",
    },

    // 6 — Text input: wave speed
    {
      type: "text-input",
      question:
        "Vlna na vodní hladině má vlnovou délku $\\lambda = 2\\,\\text{m}$ a frekvenci $f = 0{,}5\\,\\text{Hz}$. Jaká je rychlost šíření vlny v $\\text{m/s}$?",
      expectedAnswer: "1",
      acceptableAnswers: ["1 m/s", "1,0", "1.0"],
      explanation:
        "$v = \\lambda f = 2 \\cdot 0{,}5 = 1\\,\\text{m/s}$.",
      hints: ["Použijte vzorec $v = \\lambda f$."],
    },

    // 7 — Explore: traveling wave
    {
      type: "explore",
      prompt:
        "Pozorujte postupnou vlnu. Změňte frekvenci a amplitudu — všimněte si, jak se mění vlnová délka při konstantní rychlosti šíření. Platí $v = \\lambda f$: vyšší frekvence → kratší vlnová délka.",
      visual: {
        type: "interactive-wave",
        props: { mode: "traveling" },
      },
      followUpQuestion:
        "Při zdvojnásobení frekvence se vlnová délka zmenší na polovinu, protože rychlost šíření zůstává stejná.",
    },

    // 8 — Explain: interference
    {
      type: "explain",
      body: "Když se dvě vlny setkají, jejich výchylky se **skládají** — princip **superpozice**:\n\n- **Konstruktivní interference**: vlny kmitají *ve fázi* → výchylky se sčítají.\n- **Destruktivní interference**: vlny kmitají *v protifázi* → výchylky se odečítají (mohou se i úplně vyrušit).",
      callout: "Interference",
    },

    // 9 — MC: interference
    {
      type: "multiple-choice",
      question:
        "Dvě vlny se stejnou amplitudou $A$ se setkají v protifázi. Jaká je výsledná amplituda?",
      choices: [
        {
          label: "$2A$",
          isCorrect: false,
          feedback: "To by platilo pro konstruktivní interferenci (ve fázi).",
        },
        {
          label: "$0$",
          isCorrect: true,
          feedback:
            "Správně — v protifázi se výchylky odečtou: $A + (-A) = 0$.",
        },
        {
          label: "$A$",
          isCorrect: false,
          feedback:
            "Při úplné destruktivní interferenci se výchylky zcela vyruší.",
        },
      ],
      explanation:
        "Při destruktivní interferenci se výchylky odečítají. Dvě vlny se stejnou amplitudou v protifázi dávají výslednou amplitudu $A - A = 0$.",
    },

    // 10 — Explore: standing wave / interference
    {
      type: "explore",
      prompt:
        "Pozorujte stojaté vlnění, které vzniká superpozicí dvou protisměrných vln. Najděte **uzly** (body s nulovou výchylkou) a **kmitny** (body s maximální výchylkou). Jaká je vzdálenost mezi dvěma sousedními uzly?",
      visual: {
        type: "interactive-wave",
        props: { mode: "standing" },
      },
      followUpQuestion:
        "Vzdálenost mezi dvěma sousedními uzly stojatého vlnění je $\\frac{\\lambda}{2}$.",
    },

    // 11 — Explain: sound
    {
      type: "explain",
      body: "**Zvuk** je podélné mechanické vlnění šířící se pružným prostředím. Rychlost zvuku ve vzduchu při $20\\,°\\text{C}$ je přibližně $340\\,\\text{m/s}$.\n\nLidské ucho vnímá frekvence přibližně $20\\,\\text{Hz}$ až $20\\,000\\,\\text{Hz}$. Pod $20\\,\\text{Hz}$ — infrazvuk, nad $20\\,\\text{kHz}$ — ultrazvuk.",
    },

    // 12 — Text input: sound wavelength
    {
      type: "text-input",
      question:
        "Komorní $a$ má frekvenci $440\\,\\text{Hz}$. Jaká je vlnová délka tohoto tónu ve vzduchu ($v_{\\text{zvuk}} = 340\\,\\text{m/s}$)? Odpovězte v metrech s přesností na setiny.",
      expectedAnswer: "0,77",
      acceptableAnswers: ["0.77", "0,773", "0.773", "0,77 m"],
      numericTolerance: 0.01,
      explanation:
        "$\\lambda = \\frac{v}{f} = \\frac{340}{440} \\approx 0{,}77\\,\\text{m}$.",
      hints: [
        "Vyjádřete vlnovou délku ze vzorce $v = \\lambda f$.",
        "$\\lambda = \\frac{v}{f}$.",
      ],
    },

    // 13 — Explain: Doppler effect
    {
      type: "explain",
      body: "**Dopplerův jev**: Pohybuje-li se zdroj zvuku **k pozorovateli**, vlnové délky se *stlačí* a pozorovatel vnímá **vyšší frekvenci**. Naopak při vzdalování vnímá **nižší frekvenci**.\n\n$$f' = f \\cdot \\frac{v_{\\text{zvuk}}}{v_{\\text{zvuk}} \\mp v_{\\text{zdroj}}}$$\n\nMínus v jmenovateli = zdroj se přibližuje, plus = vzdaluje.",
      callout: "Dopplerův jev",
    },

    // 14 — Reveal: why ambulance siren changes pitch
    {
      type: "reveal",
      question:
        "Proč slyšíme sirénu sanitky výše, když se k nám blíží, a níže, když odjíždí?",
      revealedContent:
        "Když se sanitka přibližuje, každý další hřeben zvukové vlny je vyslán z bližšího bodu — vlnové délky se zkracují a frekvence roste. Když se vzdaluje, vlnové délky se prodlužují a frekvence klesá. Toto je **Dopplerův jev**: $f' = f \\cdot \\frac{v_{\\text{zvuk}}}{v_{\\text{zvuk}} \\mp v_{\\text{zdroj}}}$.",
    },

    // 15 — Sort order: wave concepts
    {
      type: "sort-order",
      question:
        "Seřaďte kroky vzniku stojatého vlnění na struně od začátku:",
      items: [
        "Rozkmitáme strunu — vznikne postupná vlna",
        "Vlna dorazí na pevný konec a odrazí se",
        "Odražená vlna se šíří opačným směrem",
        "Superpozice obou vln vytvoří stojaté vlnění s uzly a kmitnami",
      ],
      explanation:
        "Stojaté vlnění vzniká superpozicí dvou protisměrných vln se stejnou frekvencí a amplitudou — typicky původní vlna + její odraz od pevného konce.",
    },

    // 16 — Text input: Doppler calculation
    {
      type: "text-input",
      question:
        "Sanitka s frekvencí sirény $f = 800\\,\\text{Hz}$ se blíží rychlostí $v_{\\text{zdroj}} = 20\\,\\text{m/s}$. Jakou frekvenci vnímá stojící pozorovatel? Rychlost zvuku $v = 340\\,\\text{m/s}$. Zaokrouhlete na celé $\\text{Hz}$.",
      expectedAnswer: "850",
      acceptableAnswers: ["850 Hz", "850,0"],
      numericTolerance: 1,
      wrongAnswerFeedback: {
        "756":
          "Pozor — zdroj se přibližuje, v jmenovateli je mínus, ne plus.",
      },
      explanation:
        "$f' = 800 \\cdot \\frac{340}{340 - 20} = 800 \\cdot \\frac{340}{320} = 800 \\cdot 1{,}0625 = 850\\,\\text{Hz}$.",
      hints: [
        "Při přibližování zdroje: $f' = f \\cdot \\frac{v}{v - v_{\\text{zdroj}}}$.",
      ],
    },

    // 17 — MC: final check
    {
      type: "multiple-choice",
      question:
        "Která veličina se při přechodu vlnění z jednoho prostředí do druhého **nemění**?",
      choices: [
        {
          label: "Vlnová délka $\\lambda$",
          isCorrect: false,
          feedback:
            "Vlnová délka se změní, protože se změní rychlost šíření.",
        },
        {
          label: "Rychlost šíření $v$",
          isCorrect: false,
          feedback: "Rychlost závisí na prostředí — v každém je jiná.",
        },
        {
          label: "Frekvence $f$",
          isCorrect: true,
          feedback:
            "Ano! Frekvence je dána zdrojem a při přechodu se nemění.",
        },
      ],
      explanation:
        "Frekvence vlnění je určena zdrojem a při přechodu mezi prostředími zůstává konstantní. Mění se rychlost a vlnová délka: $v = \\lambda f$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Vlnění přenáší energii bez přenosu hmoty.",
      "Příčné vlnění — kmitání kolmo na šíření; podélné — ve směru šíření.",
      "Základní vztah: $v = \\lambda f$.",
      "Interference: konstruktivní (ve fázi) a destruktivní (v protifázi).",
      "Stojaté vlnění vzniká superpozicí dvou protisměrných vln — má uzly a kmitny.",
      "Zvuk ve vzduchu: $v \\approx 340\\,\\text{m/s}$, slyšitelné frekvence $20$–$20\\,000\\,\\text{Hz}$.",
      "Dopplerův jev: přibližování zdroje → vyšší vnímaná frekvence.",
    ],
  },
  nextTopicSuggestion: "optika",
};
