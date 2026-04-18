import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Hybnost a impulz síly",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Co vás víc bolí — když vás zasáhne tenisový míček ($60\\,\\text{g}$) rychlostí $50\\,\\text{m/s}$, nebo fotbalový míč ($430\\,\\text{g}$) rychlostí $5\\,\\text{m/s}$?",
      choices: [
        {
          label: "Tenisový míček — je rychlejší",
          isCorrect: true,
          feedback:
            "Správně! Hybnost tenisového míčku je $0{,}06 \\cdot 50 = 3\\,\\text{kg}\\cdot\\text{m/s}$, fotbalového míče $0{,}43 \\cdot 5 = 2{,}15\\,\\text{kg}\\cdot\\text{m/s}$.",
        },
        {
          label: "Fotbalový míč — je těžší",
          isCorrect: false,
          feedback:
            "Hmotnost není vše — rozhoduje součin hmotnosti a rychlosti. Spočítejte hybnost obou.",
        },
        {
          label: "Oba stejně",
          isCorrect: false,
          feedback:
            "Spočítejte si hybnosti: $p = mv$ pro oba případy.",
        },
      ],
      explanation:
        "Rozhodující veličinou je **hybnost** $p = mv$. Tenisový míček: $p = 0{,}06 \\cdot 50 = 3{,}0\\,\\text{kg}\\cdot\\text{m/s}$. Fotbalový míč: $p = 0{,}43 \\cdot 5 = 2{,}15\\,\\text{kg}\\cdot\\text{m/s}$.",
    },

    // 2 — Explain: hybnost
    {
      type: "explain",
      body: "**Hybnost** $\\vec{p}$ je vektorová veličina popisující \"množství pohybu\" tělesa:\n\n$$\\vec{p} = m \\cdot \\vec{v}$$\n\nJednotka: $\\text{kg} \\cdot \\text{m/s}$. Hybnost závisí na hmotnosti i rychlosti — těžké pomalé těleso může mít stejnou hybnost jako lehké rychlé.",
      callout: "Hybnost",
    },

    // 3 — Text input: výpočet hybnosti
    {
      type: "text-input",
      question:
        "Jaká je hybnost automobilu o hmotnosti $1\\,200\\,\\text{kg}$, který jede rychlostí $30\\,\\text{m/s}$ (v $\\text{kg}\\cdot\\text{m/s}$)?",
      expectedAnswer: "36000",
      acceptableAnswers: ["36000", "36 000", "36000 kg·m/s", "36000 kg*m/s"],
      numericTolerance: 1,
      explanation:
        "$p = mv = 1\\,200 \\cdot 30 = 36\\,000\\,\\text{kg}\\cdot\\text{m/s}$.",
      hints: ["$p = m \\cdot v$. Stačí vynásobit."],
    },

    // 4 — Explain: impulz síly
    {
      type: "explain",
      body: "**Impulz síly** $\\vec{I}$ je součin síly a doby jejího působení:\n\n$$\\vec{I} = \\vec{F} \\cdot \\Delta t$$\n\nImpulz síly se rovná **změně hybnosti** tělesa:\n\n$$\\vec{F} \\cdot \\Delta t = \\Delta \\vec{p} = m \\cdot \\Delta \\vec{v}$$\n\nToto je vlastně jiný tvar 2. Newtonova zákona!",
      callout: "Impulz síly",
    },

    // 5 — MC: impulz v praxi
    {
      type: "multiple-choice",
      question:
        "Proč má auto airbagy? Jaký fyzikální princip za tím stojí?",
      choices: [
        {
          label: "Zmenšují hybnost cestujícího",
          isCorrect: false,
          feedback:
            "Hybnost se musí změnit o stejnou hodnotu — airbag nemění celkovou změnu hybnosti.",
        },
        {
          label: "Prodlužují dobu zastavení, a tím zmenšují sílu",
          isCorrect: true,
          feedback:
            "Přesně! Ze vzorce $F = \\frac{\\Delta p}{\\Delta t}$ — větší $\\Delta t$ znamená menší $F$.",
        },
        {
          label: "Zvětšují hmotnost cestujícího",
          isCorrect: false,
          feedback: "Airbag nezmění hmotnost člověka.",
        },
      ],
      explanation:
        "Změna hybnosti $\\Delta p$ je při nárazu stejná. Ale $F = \\frac{\\Delta p}{\\Delta t}$ — prodloužením doby $\\Delta t$ (měkkým airbagem) se sníží síla působící na tělo.",
    },

    // 6 — Text input: impulz síly
    {
      type: "text-input",
      question:
        "Míček o hmotnosti $0{,}2\\,\\text{kg}$ letí rychlostí $10\\,\\text{m/s}$ a po odrazu od stěny letí zpět stejnou rychlostí. Jaká je velikost změny hybnosti (v $\\text{kg}\\cdot\\text{m/s}$)?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4,0", "4.0", "4 kg·m/s"],
      numericTolerance: 0.1,
      wrongAnswerFeedback: {
        "0": "Pozor — rychlost změnila směr! Z $+10$ na $-10$, takže $\\Delta v = -10 - 10 = -20$.",
        "2": "Nezapomeňte, že míček letí zpět — rychlost změnila znaménko.",
      },
      explanation:
        "$\\Delta p = m(v_2 - v_1) = 0{,}2 \\cdot ((-10) - 10) = 0{,}2 \\cdot (-20) = -4\\,\\text{kg}\\cdot\\text{m/s}$. Velikost: $|\\Delta p| = 4\\,\\text{kg}\\cdot\\text{m/s}$.",
      hints: [
        "Zvolte směr: $v_1 = +10\\,\\text{m/s}$, po odrazu $v_2 = -10\\,\\text{m/s}$.",
        "$\\Delta p = m(v_2 - v_1)$.",
      ],
    },

    // 7 — Explain: zákon zachování hybnosti
    {
      type: "explain",
      body: "**Zákon zachování hybnosti:** V izolované soustavě (bez vnějších sil) je celková hybnost konstantní:\n\n$$\\vec{p}_1 + \\vec{p}_2 = \\vec{p}_1' + \\vec{p}_2'$$\n$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$\n\nTento zákon platí vždy — při srážkách, výbuších i rozpadech.",
      callout: "Zákon zachování hybnosti",
    },

    // 8 — MC: zachování hybnosti
    {
      type: "multiple-choice",
      question:
        "Střela ($10\\,\\text{g}$) se zarazí do dřevěného špalku ($2\\,\\text{kg}$) na hladkém stole. Špalek se střelou se rozjede. Je celková hybnost před a po zásahu stejná?",
      choices: [
        {
          label: "Ano, hybnost se zachovává",
          isCorrect: true,
          feedback: "Správně! Soustava střela + špalek je (přibližně) izolovaná.",
        },
        {
          label: "Ne, část hybnosti se ztratí",
          isCorrect: false,
          feedback: "Hybnost se nikdy neztrácí — může se přeměnit kinetická energie na teplo, ale hybnost se zachovává.",
        },
        {
          label: "Ne, hybnost se zvětší",
          isCorrect: false,
          feedback: "Bez vnější síly nemůže hybnost soustavy růst.",
        },
      ],
      explanation:
        "Zákon zachování hybnosti platí: $m_{\\text{střela}} \\cdot v_{\\text{střela}} = (m_{\\text{střela}} + m_{\\text{špalek}}) \\cdot v'$. Celková hybnost se nemění.",
    },

    // 9 — Explore: srážky
    {
      type: "explore",
      prompt:
        "Nastavte hmotnosti a rychlosti dvou těles a pozorujte, co se stane při srážce. Porovnejte celkovou hybnost před a po srážce. Vyzkoušejte pružnou i nepružnou srážku.",
      visual: {
        type: "interactive-collision",
        props: {
          showMomentumBars: true,
          showVelocityLabels: true,
          allowElasticToggle: true,
        },
      },
      followUpQuestion:
        "Celková hybnost je vždy stejná před i po srážce — nezáleží na tom, zda je srážka pružná nebo nepružná. Liší se jen kinetická energie.",
    },

    // 10 — Explain: pružná vs. nepružná srážka
    {
      type: "explain",
      body: "**Pružná srážka** — zachovává se hybnost i kinetická energie. Tělesa se od sebe odrazí (např. biliárové koule).\n\n**Dokonale nepružná srážka** — tělesa se spojí a pohybují se společně. Zachovává se hybnost, ale kinetická energie se **nezachovává** (část se přemění na teplo a deformaci).",
    },

    // 11 — Text input: nepružná srážka
    {
      type: "text-input",
      question:
        "Vagón o hmotnosti $10\\,\\text{t}$ jede rychlostí $6\\,\\text{m/s}$ a narazí do stojícího vagónu o hmotnosti $20\\,\\text{t}$. Vagóny se spojí. Jakou rychlostí se pohybují po srážce (v $\\text{m/s}$)?",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2,0", "2.0", "2 m/s"],
      numericTolerance: 0.1,
      wrongAnswerFeedback: {
        "3": "To by platilo, kdyby oba vagóny měly stejnou hmotnost.",
      },
      explanation:
        "$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v'$\n\n$10 \\cdot 6 + 20 \\cdot 0 = (10 + 20) \\cdot v'$\n\n$60 = 30 v' \\implies v' = 2\\,\\text{m/s}$.",
      hints: [
        "Použijte zákon zachování hybnosti pro dokonale nepružnou srážku.",
        "$m_1 v_1 = (m_1 + m_2) v'$. Vyjádřete $v'$.",
      ],
    },

    // 12 — Reveal: ztráta energie
    {
      type: "reveal",
      question:
        "Kolik procent kinetické energie se ztratilo při srážce vagónů z předchozího příkladu?",
      revealedContent:
        "Před srážkou: $E_k = \\frac{1}{2} \\cdot 10\\,000 \\cdot 6^2 = 180\\,000\\,\\text{J}$.\n\nPo srážce: $E_k' = \\frac{1}{2} \\cdot 30\\,000 \\cdot 2^2 = 60\\,000\\,\\text{J}$.\n\nZtráta: $\\frac{180\\,000 - 60\\,000}{180\\,000} \\cdot 100\\,\\% = 66{,}7\\,\\%$.\n\nDvě třetiny kinetické energie se přeměnily na teplo a deformaci!",
    },

    // 13 — MC: pružná srážka speciální případ
    {
      type: "multiple-choice",
      question:
        "Při čelní pružné srážce dvou těles o stejné hmotnosti, kde jedno stojí, co se stane?",
      choices: [
        {
          label: "Obě tělesa se zastaví",
          isCorrect: false,
          feedback: "To by porušilo zákon zachování hybnosti — celková hybnost by klesla na nulu.",
        },
        {
          label: "První se zastaví a druhé převezme jeho rychlost",
          isCorrect: true,
          feedback: "Přesně! Jako u Newtonovy kolébky — pohybující se kulička předá svou hybnost.",
        },
        {
          label: "Obě se pohybují poloviční rychlostí",
          isCorrect: false,
          feedback: "To by platilo pro nepružnou srážku, ne pružnou.",
        },
      ],
      explanation:
        "Při pružné srážce stejně hmotných těles si vymění rychlosti. Pohybující se těleso se zastaví a stojící převezme celou rychlost — to je princip Newtonovy kolébky.",
    },

    // 14 — Sort order: typy srážek
    {
      type: "sort-order",
      question:
        "Seřaďte od největší po nejmenší ztrátu kinetické energie při srážce:",
      items: [
        "Dokonale nepružná srážka (tělesa se spojí)",
        "Částečně nepružná srážka (reálné srážky)",
        "Dokonale pružná srážka (ztráta = 0)",
      ],
      explanation:
        "Dokonale nepružná srážka ztrácí nejvíce $E_k$. Reálné srážky ztrácejí část. Dokonale pružná srážka zachovává celou kinetickou energii.",
    },

    // 15 — Text input: závěrečný příklad
    {
      type: "text-input",
      question:
        "Dělostřelecká koule ($5\\,\\text{kg}$) vystřelí rychlostí $300\\,\\text{m/s}$ z děla ($500\\,\\text{kg}$), které stojí na místě. Jakou rychlostí se dělo pohne zpět (v $\\text{m/s}$)?",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3,0", "3.0", "3 m/s"],
      numericTolerance: 0.1,
      wrongAnswerFeedback: {
        "300": "Dělo je 100× těžší — jeho rychlost musí být 100× menší.",
      },
      explanation:
        "Před výstřelem: $p = 0$. Po výstřelu: $m_k v_k + m_d v_d = 0 \\implies v_d = -\\frac{m_k v_k}{m_d} = -\\frac{5 \\cdot 300}{500} = -3\\,\\text{m/s}$. Velikost: $3\\,\\text{m/s}$.",
      hints: [
        "Celková hybnost před výstřelem je nulová a musí zůstat nulová.",
        "$m_k v_k + m_d v_d = 0$, vyjádřete $v_d$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Hybnost: $\\vec{p} = m \\vec{v}$ (jednotka $\\text{kg}\\cdot\\text{m/s}$).",
      "Impulz síly: $\\vec{I} = \\vec{F} \\cdot \\Delta t = \\Delta \\vec{p}$.",
      "Zákon zachování hybnosti: v izolované soustavě je celková hybnost konstantní.",
      "Pružná srážka zachovává hybnost i kinetickou energii. Nepružná srážka zachovává jen hybnost.",
      "Prodloužení doby působení síly (airbagy, deformační zóny) snižuje působící sílu.",
    ],
  },
  nextTopicSuggestion: "gravitace",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "momentum-and-impulse",
  order: 1,
  title: "Hybnost a impulz síly",
  lesson,
};
