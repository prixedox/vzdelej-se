import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Ideální plyn",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Nafouknutý balónek necháte v autě na slunci. Co se stane a proč?",
      choices: [
        {
          label: "Balónek se zmenší, protože teplo stlačí vzduch",
          isCorrect: false,
          feedback:
            "Teplo molekuly nezpomaluje — naopak zvyšuje jejich energii.",
        },
        {
          label: "Balónek se zvětší, protože zahřátý plyn má vyšší tlak a rozpíná se",
          isCorrect: true,
          feedback:
            "Správně! Vyšší teplota → rychlejší molekuly → vyšší tlak → balónek se nafoukne víc.",
        },
        {
          label: "Nic se nestane, protože guma balónku drží objem konstantní",
          isCorrect: false,
          feedback:
            "Guma je pružná — pokud vzroste tlak uvnitř, balónek se roztáhne.",
        },
      ],
      explanation:
        "Zahřátím plynu vzroste kinetická energie molekul, tím stoupne tlak. Pružný balónek se rozpíná, dokud se tlaky nevyrovnají.",
    },

    // 2 — Explain: model ideálního plynu
    {
      type: "explain",
      body: "**Ideální plyn** je zjednodušený model, ve kterém:\n\n- Molekuly jsou bodové (zanedbáváme jejich objem)\n- Mezi molekulami nepůsobí přitažlivé síly\n- Srážky jsou dokonale pružné\n\nReálné plyny (vzduch, helium) se chovají blízko ideálnímu plynu při **nízkém tlaku** a **vysoké teplotě**.",
      callout: "Model",
    },

    // 3 — Explain: stavová rovnice
    {
      type: "explain",
      body: "Stavová rovnice ideálního plynu spojuje tlak $p$, objem $V$ a teplotu $T$:\n\n$$pV = nRT$$\n\nkde $n$ je látkové množství (v molech) a $R = 8{,}314\\,\\text{J/(mol·K)}$ je univerzální plynová konstanta. Teplota musí být v **kelvinech**!",
      callout: "Stavová rovnice",
    },

    // 4 — MC: jednotky
    {
      type: "multiple-choice",
      question:
        "Proč musíme ve stavové rovnici $pV = nRT$ dosazovat teplotu v kelvinech, a ne ve stupních Celsia?",
      choices: [
        {
          label: "Protože kelviny jsou přesnější",
          isCorrect: false,
          feedback:
            "Obě stupnice mají stejný dílek — liší se jen nulový bod.",
        },
        {
          label: "Protože při $0\\,°\\text{C}$ by rovnice dávala $pV = 0$, což není pravda",
          isCorrect: true,
          feedback:
            "Přesně tak! Při $0\\,°\\text{C}$ plyn stále existuje a má nenulový tlak i objem.",
        },
        {
          label: "Protože konstanta $R$ je definována jen pro kelviny",
          isCorrect: false,
          feedback:
            "Hodnota $R$ je univerzální — důvod je hlubší, souvisí s nulovým bodem stupnice.",
        },
      ],
      explanation:
        "Kelvinova stupnice má absolutní nulu jako počátek. Při $T = 0\\,\\text{K}$ by se plyn teoreticky zastavil ($pV = 0$). Celsiova nula je umělá — při $0\\,°\\text{C}$ ($273\\,\\text{K}$) plyn rozhodně existuje.",
    },

    // 5 — Text input: stavová rovnice
    {
      type: "text-input",
      question:
        "Jaký tlak má $1\\,\\text{mol}$ ideálního plynu v nádobě o objemu $V = 0{,}01\\,\\text{m}^3$ při teplotě $T = 300\\,\\text{K}$? ($R = 8{,}314\\,\\text{J/(mol·K)}$). Odpovězte v kPa (zaokrouhlete na celé).",
      expectedAnswer: "249",
      acceptableAnswers: ["249 kPa", "249,4", "249.4", "249kPa"],
      numericTolerance: 1,
      explanation:
        "$p = \\frac{nRT}{V} = \\frac{1 \\cdot 8{,}314 \\cdot 300}{0{,}01} = \\frac{2{\\,}494{,}2}{0{,}01} = 249{\\,}420\\,\\text{Pa} \\approx 249\\,\\text{kPa}$.",
      hints: [
        "Vyjádřete $p$ ze stavové rovnice: $p = \\frac{nRT}{V}$.",
        "Nezapomeňte převést výsledek z Pa na kPa — vydělte $1{\\,}000$.",
      ],
    },

    // 6 — Explain: izotermický děj
    {
      type: "explain",
      body: "**Izotermický děj** ($T = \\text{konst.}$): teplota se nemění. Z $pV = nRT$ plyne:\n\n$$p_1 V_1 = p_2 V_2$$\n\nToto je **Boyleův-Mariottův zákon**: zvětšíme-li objem dvakrát, tlak klesne na polovinu (a naopak). V $p$-$V$ diagramu je to **hyperbola**.",
      callout: "Izoterma",
    },

    // 7 — Explain: izobarický děj
    {
      type: "explain",
      body: "**Izobarický děj** ($p = \\text{konst.}$): tlak se nemění. Platí **Charlesův zákon**:\n\n$$\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$$\n\nPři zahřátí se plyn rozpíná — objem roste lineárně s teplotou. V $p$-$V$ diagramu je to **vodorovná úsečka**.",
      callout: "Izobara",
    },

    // 8 — Explain: izochorický děj
    {
      type: "explain",
      body: "**Izochorický děj** ($V = \\text{konst.}$): objem se nemění (plyn v uzavřené pevné nádobě). Platí:\n\n$$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$\n\nPři zahřátí roste tlak. V $p$-$V$ diagramu je to **svislá úsečka**.",
      callout: "Izochora",
    },

    // 9 — Explore: p-V diagram
    {
      type: "explore",
      prompt:
        "Prozkoumejte $p$-$V$ diagram. Vyberte různé typy dějů (izotermický, izobarický, izochorický) a sledujte, jak se mění průběh křivky. Všimněte si, že izoterma je hyperbola, izobara je vodorovná a izochora svislá.",
      visual: {
        type: "interactive-pv-diagram",
        props: {
          allowProcessSelection: true,
        },
      },
      followUpQuestion:
        "V diagramu jste viděli, že každý typ děje má charakteristický tvar křivky — to nám pomáhá rychle rozpoznat, co se s plynem děje.",
    },

    // 10 — MC: rozpoznání děje
    {
      type: "multiple-choice",
      question:
        "Plyn v uzavřené plechovce (konstantní objem) zahřejeme z $20\\,°\\text{C}$ na $100\\,°\\text{C}$. O jaký děj se jedná?",
      choices: [
        {
          label: "Izotermický",
          isCorrect: false,
          feedback: "Při izotermickém ději se teplota nemění — tady se mění.",
        },
        {
          label: "Izobarický",
          isCorrect: false,
          feedback:
            "Při izobarickém ději se nemění tlak, ale plyn se rozpíná — tady se rozpínat nemůže.",
        },
        {
          label: "Izochorický",
          isCorrect: true,
          feedback:
            "Správně! Objem plechovky se nemění, takže jde o izochorický děj.",
        },
      ],
      explanation:
        "Plechovka je pevná nádoba → objem je konstantní → izochorický děj. Při zahřátí roste pouze tlak.",
    },

    // 11 — Text input: izotermický výpočet
    {
      type: "text-input",
      question:
        "Plyn o objemu $2\\,\\text{l}$ a tlaku $200\\,\\text{kPa}$ se izotermicky rozpíná na objem $4\\,\\text{l}$. Jaký bude výsledný tlak v kPa?",
      expectedAnswer: "100",
      acceptableAnswers: ["100 kPa", "100,0", "100kPa"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "400": "Při rozpínání (zvětšení objemu) tlak klesá, ne roste.",
      },
      explanation:
        "$p_1 V_1 = p_2 V_2 \\Rightarrow p_2 = \\frac{p_1 V_1}{V_2} = \\frac{200 \\cdot 2}{4} = 100\\,\\text{kPa}$.",
      hints: ["Použijte $p_1 V_1 = p_2 V_2$ a vyjádřete $p_2$."],
    },

    // 12 — Explain: adiabatický děj
    {
      type: "explain",
      body: "**Adiabatický děj** ($Q = 0$): plyn si nevyměňuje teplo s okolím (rychlý děj nebo dobrá izolace). Platí:\n\n$$p V^\\kappa = \\text{konst.}$$\n\nkde $\\kappa = \\frac{c_p}{c_V}$ je Poissonova konstanta (pro vzduch $\\kappa \\approx 1{,}4$). Adiabata je v $p$-$V$ diagramu **strmější než izoterma**.",
      callout: "Adiabata",
    },

    // 13 — Sort order: typy dějů
    {
      type: "sort-order",
      question:
        "Seřaďte termodynamické děje podle toho, která veličina zůstává konstantní — od teploty přes tlak a objem až po teplo:",
      items: [
        "Izotermický ($T = \\text{konst.}$)",
        "Izobarický ($p = \\text{konst.}$)",
        "Izochorický ($V = \\text{konst.}$)",
        "Adiabatický ($Q = 0$)",
      ],
      explanation:
        "Izo-termický (teplota), izo-barický (tlak, z řeckého *baros*), izo-chorický (objem, z *chóra* = prostor), adiabatický (žádná výměna tepla).",
    },

    // 14 — Text input: izobarický výpočet
    {
      type: "text-input",
      question:
        "Plyn při teplotě $300\\,\\text{K}$ a objemu $6\\,\\text{l}$ se izobaricky zahřeje na $600\\,\\text{K}$. Jaký bude nový objem v litrech?",
      expectedAnswer: "12",
      acceptableAnswers: ["12 l", "12,0", "12 litrů"],
      numericTolerance: 0.1,
      explanation:
        "$\\frac{V_1}{T_1} = \\frac{V_2}{T_2} \\Rightarrow V_2 = V_1 \\cdot \\frac{T_2}{T_1} = 6 \\cdot \\frac{600}{300} = 12\\,\\text{l}$.",
      hints: ["Použijte $\\frac{V_1}{T_1} = \\frac{V_2}{T_2}$ a vyjádřete $V_2$."],
    },

    // 15 — Reveal: proč je adiabata strmější
    {
      type: "reveal",
      question:
        "Proč klesá tlak při adiabatickém rozpínání rychleji než při izotermickém?",
      revealedContent:
        "Při **izotermickém** rozpínání dodáváme plynu teplo, které kompenzuje pokles teploty — plyn si udržuje kinetickou energii molekul. Při **adiabatickém** rozpínání žádné teplo nedostává, takže koná práci na úkor své vnitřní energie. Molekuly zpomalí → teplota **i** tlak klesají rychleji.",
    },

    // 16 — MC: závěrečná otázka
    {
      type: "multiple-choice",
      question:
        "Plyn stlačíme na poloviční objem. Ve kterém případě bude výsledný tlak **nejvyšší**?",
      choices: [
        {
          label: "Izotermické stlačení",
          isCorrect: false,
          feedback:
            "Při izotermickém stlačení se tlak zdvojnásobí, ale adiabatické stlačení dá vyšší tlak.",
        },
        {
          label: "Adiabatické stlačení",
          isCorrect: true,
          feedback:
            "Správně! Při adiabatickém stlačení vzroste i teplota, takže tlak stoupne víc než při izotermě.",
        },
        {
          label: "Oba případy dají stejný tlak",
          isCorrect: false,
          feedback:
            "Při adiabatickém stlačení se navíc zvýší teplota, což přidá k nárůstu tlaku.",
        },
      ],
      explanation:
        "Při izotermickém stlačení na $V/2$ se tlak zdvojnásobí ($p_1 V_1 = p_2 V_2$). Při adiabatickém stlačení roste tlak podle $p V^\\kappa = \\text{konst.}$, kde $\\kappa > 1$, takže $p_2 = p_1 \\cdot 2^\\kappa > 2 p_1$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Stavová rovnice ideálního plynu: $pV = nRT$, kde $T$ musí být v kelvinech.",
      "Izotermický děj ($T = \\text{konst.}$): $p_1 V_1 = p_2 V_2$ — Boyleův-Mariottův zákon.",
      "Izobarický ($p = \\text{konst.}$): $V_1/T_1 = V_2/T_2$; izochorický ($V = \\text{konst.}$): $p_1/T_1 = p_2/T_2$.",
      "Adiabatický děj ($Q = 0$): $pV^\\kappa = \\text{konst.}$ — strmější průběh než izoterma v $p$-$V$ diagramu.",
    ],
  },
  nextTopicSuggestion: "zakony-termodynamiky",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "ideal-gas",
  order: 1,
  title: "Ideální plyn",
  lesson,
};
