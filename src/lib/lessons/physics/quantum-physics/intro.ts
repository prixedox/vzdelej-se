import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Kvantová a jaderná fyzika",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Posvítíte ultrafialovým světlem na kovovou destičku a z ní se uvolní elektrony. Posvítíte slabým červeným světlem — neuvolní se žádné, i když svítíte déle. Proč?",
      choices: [
        {
          label: "Červené světlo nemá dost energie v jednom fotonu",
          isCorrect: true,
          feedback:
            "Přesně! Fotoelektrický jev závisí na frekvenci (energii fotonu), ne na intenzitě.",
        },
        {
          label: "Červené světlo se od kovu odráží",
          isCorrect: false,
          feedback:
            "Barva světla souvisí s vlnovou délkou, ale klíčová je energie fotonu.",
        },
        {
          label: "Červené světlo je příliš slabé",
          isCorrect: false,
          feedback:
            "Ani silnější červené světlo elektrony neuvolní — záleží na frekvenci, ne intenzitě.",
        },
      ],
      explanation:
        "**Fotoelektrický jev** ukazuje, že světlo se chová jako proud částic — **fotonů**. Každý foton nese energii $E = hf$. Pokud je frekvence pod prahovou hodnotou, foton nemá dost energie k uvolnění elektronu, bez ohledu na počet fotonů.",
    },

    // 2 — Explain: photon and Planck
    {
      type: "explain",
      body: "**Foton** je kvantum elektromagnetického záření. Jeho energie závisí na frekvenci:\n\n$$E = hf = \\frac{hc}{\\lambda}$$\n\nkde $h = 6{,}63 \\cdot 10^{-34}\\,\\text{J·s}$ je **Planckova konstanta** a $c = 3 \\cdot 10^8\\,\\text{m/s}$ rychlost světla.",
      callout: "Energie fotonu",
    },

    // 3 — Text input: photon energy
    {
      type: "text-input",
      question:
        "Vypočtěte energii fotonu zelného světla o vlnové délce $\\lambda = 500\\,\\text{nm}$ ($= 5 \\cdot 10^{-7}\\,\\text{m}$). Vyjádřete v jednotkách $10^{-19}\\,\\text{J}$ (napište jen číslo, zaokrouhlete na jednu desetinu).",
      expectedAnswer: "4,0",
      acceptableAnswers: ["4.0", "4", "3,98", "3.98", "3,9", "3.9"],
      numericTolerance: 0.1,
      explanation:
        "$E = \\frac{hc}{\\lambda} = \\frac{6{,}63 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8}{5 \\cdot 10^{-7}} = \\frac{19{,}89 \\cdot 10^{-26}}{5 \\cdot 10^{-7}} \\approx 3{,}98 \\cdot 10^{-19}\\,\\text{J} \\approx 4{,}0 \\cdot 10^{-19}\\,\\text{J}$.",
      hints: [
        "Použijte $E = \\frac{hc}{\\lambda}$.",
        "$h \\cdot c = 6{,}63 \\cdot 10^{-34} \\cdot 3 \\cdot 10^8 = 19{,}89 \\cdot 10^{-26}\\,\\text{J·m}$.",
      ],
    },

    // 4 — Explain: photoelectric effect equation
    {
      type: "explain",
      body: "**Einsteinova rovnice fotoelektrického jevu**:\n\n$$hf = W + E_k$$\n\nkde $W$ je **výstupní práce** kovu (minimální energie k uvolnění elektronu) a $E_k = \\frac{1}{2}mv^2$ kinetická energie uvolněného elektronu.\n\nPokud $hf < W$, fotoefekt nenastane — žádný elektron se neuvolní.",
      callout: "Fotoelektrický jev",
    },

    // 5 — MC: photoelectric threshold
    {
      type: "multiple-choice",
      question:
        "Výstupní práce sodíku je $W = 3{,}6 \\cdot 10^{-19}\\,\\text{J}$. Foton o energii $3{,}0 \\cdot 10^{-19}\\,\\text{J}$ dopadá na sodíkový povrch. Co se stane?",
      choices: [
        {
          label: "Elektron se uvolní s malou kinetickou energií",
          isCorrect: false,
          feedback:
            "Energie fotonu je menší než výstupní práce — nestačí k uvolnění.",
        },
        {
          label: "Fotoefekt nenastane — energie fotonu je menší než $W$",
          isCorrect: true,
          feedback:
            "Správně! $3{,}0 \\cdot 10^{-19} < 3{,}6 \\cdot 10^{-19}\\,\\text{J}$.",
        },
        {
          label: "Je potřeba počkat, až se nahromadí dostatek fotonů",
          isCorrect: false,
          feedback:
            "Fotoefekt je kvantový jev — záleží na energii jednoho fotonu, ne na jejich počtu.",
        },
      ],
      explanation:
        "Energie fotonu ($3{,}0 \\cdot 10^{-19}\\,\\text{J}$) je menší než výstupní práce sodíku ($3{,}6 \\cdot 10^{-19}\\,\\text{J}$), takže fotoefekt nenastane.",
    },

    // 6 — Explain: wave-particle duality
    {
      type: "explain",
      body: "Světlo se někdy chová jako **vlna** (interference, difrakce) a někdy jako **proud částic** (fotoefekt). Toto je **vlnově-částicový dualismus**.\n\nPlatí to i naopak: **hmotné částice** (elektrony, protony) mají vlnové vlastnosti!",
      callout: "Dualismus",
    },

    // 7 — Explain: de Broglie wavelength
    {
      type: "explain",
      body: "**De Broglieho vlnová délka** přiřazuje každé částici s hybností $p$ vlnovou délku:\n\n$$\\lambda = \\frac{h}{p} = \\frac{h}{mv}$$\n\nPro makroskopické tělesa je $\\lambda$ neměřitelně malá, ale pro elektrony je srovnatelná s meziatomovými vzdálenostmi — proto pozorujeme difrakci elektronů.",
      callout: "De Broglie",
    },

    // 8 — Text input: de Broglie
    {
      type: "text-input",
      question:
        "Elektron ($m = 9{,}1 \\cdot 10^{-31}\\,\\text{kg}$) se pohybuje rychlostí $v = 10^6\\,\\text{m/s}$. Jaká je jeho de Broglieho vlnová délka? Vyjádřete v nanometrech (zaokrouhlete na dvě desetinná místa).",
      expectedAnswer: "0,73",
      acceptableAnswers: ["0.73", "0,73", "0,73 nm"],
      numericTolerance: 0.02,
      explanation:
        "$\\lambda = \\frac{h}{mv} = \\frac{6{,}63 \\cdot 10^{-34}}{9{,}1 \\cdot 10^{-31} \\cdot 10^6} = \\frac{6{,}63 \\cdot 10^{-34}}{9{,}1 \\cdot 10^{-25}} \\approx 7{,}3 \\cdot 10^{-10}\\,\\text{m} = 0{,}73\\,\\text{nm}$.",
      hints: [
        "Použijte $\\lambda = \\frac{h}{mv}$.",
        "Nezapomeňte převést výsledek z metrů na nanometry: $1\\,\\text{nm} = 10^{-9}\\,\\text{m}$.",
      ],
    },

    // 9 — Explain: atom structure
    {
      type: "explain",
      body: "**Atom** se skládá z **jádra** (protony + neutrony) a **elektronového obalu**. Protony nesou kladný náboj, neutrony jsou elektricky neutrální, elektrony nesou záporný náboj.\n\n- **Protonové číslo** $Z$ = počet protonů (určuje prvek).\n- **Nukleonové číslo** $A$ = počet protonů + neutronů.\n- Zápis: ${}^A_Z X$ (např. ${}^{12}_{\\phantom{0}6}\\text{C}$ — uhlík).",
    },

    // 10 — Explore: interactive atom
    {
      type: "explore",
      prompt:
        "Prozkoumejte model atomu. Pozorujte energetické hladiny elektronů. Všimněte si, že elektrony mohou přecházet mezi hladinami — při přechodu na nižší hladinu vyzáří foton s energií rovnou rozdílu hladin.",
      visual: {
        type: "interactive-atom",
        props: {},
      },
      followUpQuestion:
        "Energie vyzářeného fotonu odpovídá rozdílu energií hladin: $E_{\\text{foton}} = E_n - E_m$. Proto atomy vyzařují jen určité vlnové délky — čárové spektrum.",
    },

    // 11 — Explain: radioactivity
    {
      type: "explain",
      body: "**Radioaktivita** — samovolná přeměna nestabilních jader. Tři základní typy:\n\n- **Alfa** ($\\alpha$): jádro vyzáří ${}^4_2\\text{He}$ → $Z$ klesne o 2, $A$ o 4.\n- **Beta** ($\\beta^-$): neutron → proton + elektron + antineutrino → $Z$ stoupne o 1.\n- **Gama** ($\\gamma$): jádro vyzáří vysokoenergetický foton → $Z$ a $A$ se nemění.",
      callout: "Radioaktivní přeměny",
    },

    // 12 — MC: radioactive decay
    {
      type: "multiple-choice",
      question:
        "Jádro ${}^{238}_{\\phantom{0}92}\\text{U}$ podstoupí alfa rozpad. Jaké jádro vznikne?",
      choices: [
        {
          label: "${}^{234}_{\\phantom{0}90}\\text{Th}$ (thorium)",
          isCorrect: true,
          feedback:
            "Správně! $Z: 92 - 2 = 90$, $A: 238 - 4 = 234$.",
        },
        {
          label: "${}^{234}_{\\phantom{0}91}\\text{Pa}$ (protaktinium)",
          isCorrect: false,
          feedback:
            "Při alfa rozpadu klesne $Z$ o 2 (ne o 1). $Z = 91$ by odpovídalo beta rozpadu.",
        },
        {
          label: "${}^{238}_{\\phantom{0}90}\\text{Th}$ (thorium)",
          isCorrect: false,
          feedback:
            "Při alfa rozpadu klesne i nukleonové číslo o 4: $A = 238 - 4 = 234$.",
        },
      ],
      explanation:
        "Alfa částice je ${}^4_2\\text{He}$: protonové číslo klesne o 2 ($92 \\to 90$) a nukleonové o 4 ($238 \\to 234$). Vzniká ${}^{234}_{\\phantom{0}90}\\text{Th}$.",
    },

    // 13 — Explain: half-life
    {
      type: "explain",
      body: "**Poločas přeměny** $T_{1/2}$ je doba, za kterou se rozpadne polovina přítomných jader. Po $n$ poločasech zbývá:\n\n$$N = N_0 \\cdot \\left(\\frac{1}{2}\\right)^n = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T_{1/2}}$$\n\nRozpadová křivka je exponenciální — nikdy nedosáhne nuly.",
      callout: "Poločas přeměny",
    },

    // 14 — Text input: half-life
    {
      type: "text-input",
      question:
        "Radioaktivní vzorek má $N_0 = 1000$ jader a poločas přeměny $T_{1/2} = 5\\,\\text{dní}$. Kolik jader zbyde po $15\\,\\text{dnech}$?",
      expectedAnswer: "125",
      acceptableAnswers: ["125 jader"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "500": "To je po jednom poločasu (5 dní). Za 15 dní proběhnou 3 poločasy.",
        "250": "To je po dvou poločasech (10 dní). Za 15 dní proběhnou 3 poločasy.",
      },
      explanation:
        "$n = \\frac{t}{T_{1/2}} = \\frac{15}{5} = 3$ poločasy. $N = 1000 \\cdot \\left(\\frac{1}{2}\\right)^3 = 1000 \\cdot \\frac{1}{8} = 125$ jader.",
      hints: [
        "Kolik poločasů se vejde do 15 dní?",
        "Po každém poločasu zbude polovina: $1000 \\to 500 \\to 250 \\to \\,?$",
      ],
    },

    // 15 — Sort order: electromagnetic spectrum by energy
    {
      type: "sort-order",
      question:
        "Seřaďte druhy elektromagnetického záření od nejmenší energie fotonu po největší:",
      items: [
        "Rádiové vlny",
        "Infračervené záření",
        "Viditelné světlo",
        "Ultrafialové záření",
        "Rentgenové záření",
        "Gama záření",
      ],
      explanation:
        "Energie fotonu roste s frekvencí ($E = hf$): rádiové vlny mají nejnižší frekvenci, gama záření nejvyšší.",
    },

    // 16 — Reveal: nuclear reactions
    {
      type: "reveal",
      question:
        "Jaký je rozdíl mezi jaderným štěpením a jadernou syntézou?",
      revealedContent:
        "**Štěpení** (fission): těžké jádro (např. ${}^{235}\\text{U}$) se rozpadne na dvě lehčí jádra + neutrony + energie. Využívají ho jaderné elektrárny.\n\n**Syntéza** (fusion): dvě lehká jádra (např. deuterium + tritium) se spojí ve těžší jádro + uvolní obrovskou energii. Probíhá ve hvězdách.\n\nOba procesy uvolňují energii díky **hmotnostnímu úbytku**: $E = \\Delta m \\cdot c^2$.",
    },

    // 17 — MC: final check
    {
      type: "multiple-choice",
      question:
        "Která z následujících vlastností je společná fotonům i elektronům?",
      choices: [
        {
          label: "Mají klidovou hmotnost",
          isCorrect: false,
          feedback:
            "Fotony nemají klidovou hmotnost ($m_0 = 0$), elektrony ano.",
        },
        {
          label: "Mají vlnové vlastnosti — lze pozorovat difrakci",
          isCorrect: true,
          feedback:
            "Správně! Vlnově-částicový dualismus platí pro všechny kvantové objekty.",
        },
        {
          label: "Pohybují se vždy rychlostí světla",
          isCorrect: false,
          feedback:
            "Rychlostí $c$ se pohybují jen fotony. Elektrony mají hmotnost a pohybují se pomaleji.",
        },
      ],
      explanation:
        "Vlnově-částicový dualismus je univerzální: fotony i hmotné částice (elektrony, protony, neutrony) vykazují vlnové vlastnosti — interferenci a difrakci. To potvrdil Davissonův a Germerův experiment s difrakcí elektronů.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Energie fotonu: $E = hf = \\frac{hc}{\\lambda}$, kde $h = 6{,}63 \\cdot 10^{-34}\\,\\text{J·s}$.",
      "Fotoelektrický jev: $hf = W + E_k$ — závisí na frekvenci, ne intenzitě.",
      "De Broglieho vlnová délka: $\\lambda = \\frac{h}{mv}$ — i hmotné částice mají vlnové vlastnosti.",
      "Radioaktivní přeměny: $\\alpha$ ($Z-2$, $A-4$), $\\beta^-$ ($Z+1$), $\\gamma$ (beze změny $Z$, $A$).",
      "Poločas přeměny: $N = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T_{1/2}}$.",
      "Jaderné reakce: štěpení (těžká → lehčí jádra) i syntéza (lehká → těžší) uvolňují energii ($E = \\Delta m c^2$).",
    ],
  },
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "quantum-physics",
  order: 1,
  title: "Kvantová a jaderná fyzika",
  lesson,
};
