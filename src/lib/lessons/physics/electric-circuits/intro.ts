import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Elektrické obvody",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Máte baterku a dvě stejné žárovky. Jak je zapojíte, aby svítily jasněji — sériově, nebo paralelně?",
      choices: [
        {
          label: "Sériově — proud projde oběma a zesílí se",
          isCorrect: false,
          feedback:
            "V sériovém zapojení se napětí baterie rozdělí mezi obě žárovky, takže každá dostane méně.",
        },
        {
          label: "Paralelně — každá žárovka dostane plné napětí baterie",
          isCorrect: true,
          feedback:
            "Správně! V paralelním zapojení je na každé žárovce celé napětí zdroje.",
        },
        {
          label: "Nezáleží na zapojení, svítí stejně",
          isCorrect: false,
          feedback:
            "Záleží — v sériovém zapojení se napětí dělí, v paralelním ne.",
        },
      ],
      explanation:
        "Při paralelním zapojení je na každé žárovce plné napětí baterie, takže obě svítí naplno. Při sériovém zapojení se napětí rozdělí.",
    },

    // 2 — Explain: elektrický proud
    {
      type: "explain",
      body: "**Elektrický proud** $I$ je uspořádaný pohyb nabitých částic (v kovech elektronů). Definujeme ho jako náboj prošlý průřezem vodiče za jednotku času:\n\n$$I = \\frac{Q}{t} \\qquad [\\text{A — ampér}]$$\n\nDohodnutý směr proudu je od kladného pólu ke zápornému (opačně než skutečný pohyb elektronů).",
      callout: "Definice",
    },

    // 3 — Explain: Ohmův zákon
    {
      type: "explain",
      body: "**Ohmův zákon** je nejdůležitější vztah v elektrotechnice:\n\n$$U = R \\cdot I \\qquad \\text{neboli} \\qquad I = \\frac{U}{R}$$\n\nkde $U$ je napětí [$\\text{V}$], $I$ je proud [$\\text{A}$] a $R$ je odpor [$\\Omega$ — ohm].",
      callout: "Ohmův zákon",
    },

    // 4 — Text input: Ohmův zákon
    {
      type: "text-input",
      question:
        "Rezistorem o odporu $R = 50\\,\\Omega$ prochází proud $I = 0{,}4\\,\\text{A}$. Jaké je napětí na rezistoru v $\\text{V}$?",
      expectedAnswer: "20",
      acceptableAnswers: ["20 V", "20,0"],
      wrongAnswerFeedback: {
        "125": "Pozor — počítáme $U = R \\cdot I$, ne $U = R / I$.",
      },
      explanation:
        "$U = R \\cdot I = 50 \\cdot 0{,}4 = 20\\,\\text{V}$.",
      hints: ["Použijte Ohmův zákon: $U = R \\cdot I$."],
    },

    // 5 — Explain: odpor a rezistivita
    {
      type: "explain",
      body: "**Odpor** vodiče závisí na materiálu, délce a průřezu:\n\n$$R = \\rho \\cdot \\frac{l}{S}$$\n\nkde $\\rho$ je **rezistivita** (měrný odpor) materiálu [$\\Omega \\cdot \\text{m}$], $l$ je délka vodiče a $S$ je průřez. Měď: $\\rho \\approx 1{,}7 \\cdot 10^{-8}\\,\\Omega\\cdot\\text{m}$.",
      callout: "Odpor vodiče",
    },

    // 6 — MC: vliv na odpor
    {
      type: "multiple-choice",
      question:
        "Vodič prodloužíme na dvojnásobnou délku (při stejném průřezu). Jak se změní jeho odpor?",
      choices: [
        {
          label: "Klesne na polovinu",
          isCorrect: false,
          feedback: "Odpor je přímo úměrný délce, ne nepřímo.",
        },
        {
          label: "Zdvojnásobí se",
          isCorrect: true,
          feedback: "Správně! $R = \\rho \\cdot \\frac{l}{S}$, takže $R \\sim l$.",
        },
        {
          label: "Zůstane stejný",
          isCorrect: false,
          feedback: "Delší vodič klade větší odpor.",
        },
      ],
      explanation:
        "Ze vzorce $R = \\rho \\cdot \\frac{l}{S}$ plyne, že odpor je přímo úměrný délce vodiče.",
    },

    // 7 — Explain: sériové zapojení
    {
      type: "explain",
      body: "V **sériovém zapojení** prochází všemi rezistory stejný proud. Celkový odpor je součet:\n\n$$R_\\text{celk} = R_1 + R_2 + \\ldots + R_n$$\n\nNapětí se dělí: $U = U_1 + U_2 + \\ldots + U_n$.",
      callout: "Sériové zapojení",
    },

    // 8 — Explain: paralelní zapojení
    {
      type: "explain",
      body: "V **paralelním zapojení** je na všech rezistorech stejné napětí. Pro celkový odpor platí:\n\n$$\\frac{1}{R_\\text{celk}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\ldots + \\frac{1}{R_n}$$\n\nProud se dělí: $I = I_1 + I_2 + \\ldots + I_n$. Celkový odpor je vždy menší než nejmenší z jednotlivých odporů.",
      callout: "Paralelní zapojení",
    },

    // 9 — Text input: paralelní odpor
    {
      type: "text-input",
      question:
        "Dva rezistory $R_1 = 60\\,\\Omega$ a $R_2 = 30\\,\\Omega$ jsou zapojeny paralelně. Jaký je celkový odpor v ohmech?",
      expectedAnswer: "20",
      acceptableAnswers: ["20 ohm", "20 Ω"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "90": "To je součet — to platí pro sériové zapojení, ne paralelní.",
      },
      explanation:
        "$\\frac{1}{R} = \\frac{1}{60} + \\frac{1}{30} = \\frac{1}{60} + \\frac{2}{60} = \\frac{3}{60} = \\frac{1}{20}$, tedy $R = 20\\,\\Omega$.",
      hints: [
        "Použijte vzorec $\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2}$.",
        "Najděte společný jmenovatel a sečtěte zlomky.",
      ],
    },

    // 10 — Explore: interactive circuit
    {
      type: "explore",
      prompt:
        "Prozkoumejte obvod se sériovým a paralelním zapojením rezistorů. Sledujte, jak se mění proud a napětí na jednotlivých prvcích. Zkuste měnit odpor a pozorujte vliv na celý obvod.",
      visual: {
        type: "interactive-circuit",
        props: {
          showCurrent: true,
          showVoltage: true,
        },
      },
      followUpQuestion:
        "V sériovém zapojení je proud všude stejný a napětí se dělí. V paralelním zapojení je napětí stejné a proud se dělí.",
    },

    // 11 — Explain: Kirchhoffovy zákony
    {
      type: "explain",
      body: "**1. Kirchhoffův zákon** (pro uzly): součet proudů vtékajících do uzlu se rovná součtu proudů vytékajících: $\\sum I_\\text{vstup} = \\sum I_\\text{výstup}$.\n\n**2. Kirchhoffův zákon** (pro smyčky): součet napětí podél uzavřené smyčky je nulový: $\\sum U = 0$.",
      callout: "Kirchhoffovy zákony",
    },

    // 12 — Reveal: proč součet napětí ve smyčce = 0
    {
      type: "reveal",
      question:
        "Proč je součet napětí v uzavřené smyčce roven nule?",
      revealedContent:
        "Napětí je rozdíl potenciálů. Když obejdeme celou smyčku a vrátíme se do výchozího bodu, potenciál musí být stejný jako na začátku. Proto součet všech nárůstů a poklesů napětí musí být **nula** — energie se zachovává.",
    },

    // 13 — Sort order: řešení obvodu
    {
      type: "sort-order",
      question:
        "Seřaďte kroky při řešení elektrického obvodu:",
      items: [
        "Nakreslit schéma obvodu a označit veličiny",
        "Zjednodušit sériové a paralelní kombinace",
        "Aplikovat Ohmův zákon pro celkový proud",
        "Vypočítat napětí a proudy na jednotlivých prvcích",
      ],
      explanation:
        "Systematický postup: nejprve schéma, pak zjednodušení, celkový proud, a nakonec zpětný rozbor na jednotlivé prvky.",
    },

    // 14 — Explain: elektrický výkon
    {
      type: "explain",
      body: "**Elektrický výkon** je energie přeměněná za jednotku času:\n\n$$P = U \\cdot I = R \\cdot I^2 = \\frac{U^2}{R} \\qquad [\\text{W — watt}]$$\n\nPraktická jednotka energie: $1\\,\\text{kWh} = 3{,}6 \\cdot 10^6\\,\\text{J}$.",
      callout: "Výkon",
    },

    // 15 — Text input: výkon
    {
      type: "text-input",
      question:
        "Žárovkou o odporu $R = 240\\,\\Omega$ prochází proud $I = 0{,}5\\,\\text{A}$. Jaký je její příkon v $\\text{W}$?",
      expectedAnswer: "60",
      acceptableAnswers: ["60 W", "60,0"],
      wrongAnswerFeedback: {
        "120": "Použijte vzorec $P = R \\cdot I^2$, ne $P = R \\cdot I$.",
      },
      explanation:
        "$P = R \\cdot I^2 = 240 \\cdot 0{,}5^2 = 240 \\cdot 0{,}25 = 60\\,\\text{W}$.",
      hints: [
        "Použijte $P = R \\cdot I^2$.",
        "Nezapomeňte umocnit proud: $0{,}5^2 = 0{,}25$.",
      ],
    },

    // 16 — MC: bezpečnost
    {
      type: "multiple-choice",
      question:
        "Proč je při zásahu elektrickým proudem nebezpečnější střídavý proud ze zásuvky ($230\\,\\text{V}$) než baterie ($9\\,\\text{V}$)?",
      choices: [
        {
          label: "Protože střídavý proud má vyšší frekvenci",
          isCorrect: false,
          feedback: "Frekvence hraje roli, ale hlavní faktor je napětí a tím proud procházející tělem.",
        },
        {
          label: "Protože vyšší napětí protlačí tělem větší proud",
          isCorrect: true,
          feedback:
            "Ano! Podle Ohmova zákona $I = U/R$ — vyšší napětí = větší proud při stejném odporu těla.",
        },
        {
          label: "Protože baterie má menší kapacitu",
          isCorrect: false,
          feedback: "Kapacita baterie neurčuje nebezpečnost — rozhoduje napětí a proud.",
        },
      ],
      explanation:
        "Lidské tělo má odpor cca $1000\\,\\Omega$. Při $230\\,\\text{V}$ by proud dosáhl $I = 230/1000 = 0{,}23\\,\\text{A}$, což je smrtelně nebezpečné. Při $9\\,\\text{V}$ pouze $0{,}009\\,\\text{A}$.",
    },

    // 17 — Text input: závěrečná úloha
    {
      type: "text-input",
      question:
        "Obvod: zdroj $U = 12\\,\\text{V}$, dva rezistory v sérii $R_1 = 4\\,\\Omega$ a $R_2 = 8\\,\\Omega$. Jaké napětí je na rezistoru $R_2$? (V $\\text{V}$.)",
      expectedAnswer: "8",
      acceptableAnswers: ["8 V", "8,0"],
      numericTolerance: 0.1,
      explanation:
        "$R_\\text{celk} = 4 + 8 = 12\\,\\Omega$. Proud: $I = \\frac{U}{R_\\text{celk}} = \\frac{12}{12} = 1\\,\\text{A}$. Napětí na $R_2$: $U_2 = R_2 \\cdot I = 8 \\cdot 1 = 8\\,\\text{V}$.",
      hints: [
        "Nejprve spočítejte celkový odpor a proud.",
        "Pak napětí na $R_2$ z Ohmova zákona: $U_2 = R_2 \\cdot I$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Elektrický proud: $I = \\frac{Q}{t}$ [$\\text{A}$].",
      "Ohmův zákon: $U = R \\cdot I$.",
      "Odpor vodiče: $R = \\rho \\cdot \\frac{l}{S}$.",
      "Sériově: $R_\\text{celk} = R_1 + R_2$, stejný proud. Paralelně: $\\frac{1}{R_\\text{celk}} = \\frac{1}{R_1} + \\frac{1}{R_2}$, stejné napětí.",
      "Kirchhoffovy zákony: zachování proudu v uzlech a napětí ve smyčkách.",
      "Výkon: $P = UI = RI^2 = \\frac{U^2}{R}$ [$\\text{W}$].",
    ],
  },
  nextTopicSuggestion: "magneticke-pole",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "electric-circuits",
  order: 1,
  title: "Elektrické obvody",
  lesson,
};
