import type { ChapterDefinition } from "@/types/chapter";
import type { LessonV2 } from "@/types/lesson-v2";

const lesson: LessonV2 = {
  title: "Teplota a teplo",
  steps: [
    // 1 — Hook MC
    {
      type: "multiple-choice",
      question:
        "Kovová lžička a dřevěná vařečka leží na stole vedle sebe. Když se jich dotknete, lžička se zdá chladnější. Proč?",
      choices: [
        {
          label: "Lžička má nižší teplotu než vařečka",
          isCorrect: false,
          feedback:
            "Obě mají stejnou teplotu — jsou v tepelné rovnováze s okolím.",
        },
        {
          label: "Kov lépe vede teplo, takže rychleji odvádí teplo z ruky",
          isCorrect: true,
          feedback:
            "Správně! Oba předměty mají stejnou teplotu, ale kov odvádí teplo z prstu mnohem rychleji.",
        },
        {
          label: "Kov je těžší, proto je studenější",
          isCorrect: false,
          feedback:
            "Hmotnost nemá přímý vliv na pocitovou teplotu — rozhoduje tepelná vodivost.",
        },
      ],
      explanation:
        "Oba předměty mají stejnou teplotu okolí. Pocit chladu závisí na tom, jak rychle materiál odvádí teplo z pokožky — to určuje tepelná vodivost, ne teplota.",
    },

    // 2 — Explain: teplota
    {
      type: "explain",
      body: "**Teplota** je fyzikální veličina vyjadřující míru kinetické energie neuspořádaného pohybu částic. Čím rychleji se molekuly pohybují, tím vyšší je teplota tělesa.",
      callout: "Definice",
    },

    // 3 — Explain: teplotní stupnice
    {
      type: "explain",
      body: "Nejčastější stupnice:\n\n- **Celsiova** ($°\\text{C}$): $0\\,°\\text{C}$ = tání ledu, $100\\,°\\text{C}$ = var vody\n- **Kelvinova** ($\\text{K}$): absolutní stupnice, $0\\,\\text{K} = -273{,}15\\,°\\text{C}$\n\nPřevod: $T = t + 273{,}15$, kde $T$ je v kelvinech a $t$ ve stupních Celsia.",
      callout: "Stupnice",
    },

    // 4 — Text input: převod stupnic
    {
      type: "text-input",
      question:
        "Převeďte teplotu $25\\,°\\text{C}$ na kelviny. Odpovězte číslem v $\\text{K}$ (zaokrouhlete na celé).",
      expectedAnswer: "298",
      acceptableAnswers: ["298 K", "298,15", "298.15"],
      numericTolerance: 0.5,
      explanation:
        "$T = 25 + 273{,}15 = 298{,}15\\,\\text{K} \\approx 298\\,\\text{K}$.",
      hints: ["Přičtěte k teplotě v °C hodnotu $273{,}15$."],
    },

    // 5 — Explain: teplo
    {
      type: "explain",
      body: "**Teplo** $Q$ je energie předávaná mezi tělesy s různou teplotou. Teplo vždy samovolně přechází z teplejšího tělesa na chladnější. Jednotkou je joule ($\\text{J}$).",
      callout: "Teplo",
    },

    // 6 — Explain: měrná tepelná kapacita
    {
      type: "explain",
      body: "**Měrná tepelná kapacita** $c$ udává, kolik energie potřebujeme k ohřátí $1\\,\\text{kg}$ látky o $1\\,°\\text{C}$:\n\n$$Q = m \\cdot c \\cdot \\Delta t$$\n\nNapříklad voda má $c = 4{\\,}180\\,\\text{J/(kg·°C)}$ — proto tak dlouho chladne.",
      callout: "Vzorec",
    },

    // 7 — MC: měrná tepelná kapacita
    {
      type: "multiple-choice",
      question:
        "Voda má měrnou tepelnou kapacitu $c = 4{\\,}180\\,\\text{J/(kg·°C)}$ a železo $c = 450\\,\\text{J/(kg·°C)}$. Která látka se při stejném dodaném teple ohřeje méně?",
      choices: [
        {
          label: "Voda",
          isCorrect: true,
          feedback:
            "Správně — voda má vyšší $c$, takže na stejný ohřev potřebuje víc energie.",
        },
        {
          label: "Železo",
          isCorrect: false,
          feedback:
            "Železo má nižší $c$, takže se při stejném dodaném teple ohřeje **více**.",
        },
        {
          label: "Obě se ohřejí stejně",
          isCorrect: false,
          feedback:
            "Ohřev závisí na měrné tepelné kapacitě — ta je u obou látek různá.",
        },
      ],
      explanation:
        "Z $\\Delta t = \\frac{Q}{m \\cdot c}$ plyne, že čím větší $c$, tím menší $\\Delta t$ při stejném $Q$ a $m$.",
    },

    // 8 — Text input: kalorimetrický výpočet
    {
      type: "text-input",
      question:
        "Kolik tepla potřebujeme k ohřátí $2\\,\\text{kg}$ vody z $20\\,°\\text{C}$ na $80\\,°\\text{C}$? Měrná tepelná kapacita vody je $c = 4{\\,}180\\,\\text{J/(kg·°C)}$. Odpovězte v kJ.",
      expectedAnswer: "501,6",
      acceptableAnswers: ["501,6 kJ", "501.6", "502", "501,6kJ"],
      numericTolerance: 1,
      wrongAnswerFeedback: {
        "501600":
          "Správný výpočet, ale odpověď má být v kJ — vydělte $1{\\,}000$.",
      },
      explanation:
        "$Q = m \\cdot c \\cdot \\Delta t = 2 \\cdot 4{\\,}180 \\cdot (80 - 20) = 2 \\cdot 4{\\,}180 \\cdot 60 = 501{\\,}600\\,\\text{J} = 501{,}6\\,\\text{kJ}$.",
      hints: [
        "Použijte $Q = m \\cdot c \\cdot \\Delta t$, kde $\\Delta t = 80 - 20 = 60\\,°\\text{C}$.",
      ],
    },

    // 9 — Explain: kalorimetrická rovnice
    {
      type: "explain",
      body: "Když smícháme teplou a studenou vodu (v izolované nádobě), platí **kalorimetrická rovnice** — teplo odevzdané = teplo přijaté:\n\n$$m_1 \\cdot c \\cdot (t_1 - t) = m_2 \\cdot c \\cdot (t - t_2)$$\n\nkde $t$ je výsledná teplota směsi, $t_1 > t_2$.",
      callout: "Kalorimetrie",
    },

    // 10 — Text input: kalorimetrická rovnice
    {
      type: "text-input",
      question:
        "Smícháme $1\\,\\text{kg}$ vody o teplotě $80\\,°\\text{C}$ s $3\\,\\text{kg}$ vody o teplotě $20\\,°\\text{C}$. Jaká je výsledná teplota směsi v $°\\text{C}$?",
      expectedAnswer: "35",
      acceptableAnswers: ["35 °C", "35,0", "35°C"],
      numericTolerance: 0.5,
      wrongAnswerFeedback: {
        "50": "To by platilo, kdyby obě hmotnosti byly stejné. Zde je studenější vody třikrát víc.",
      },
      explanation:
        "$1 \\cdot (80 - t) = 3 \\cdot (t - 20)$\n\n$80 - t = 3t - 60$\n\n$140 = 4t$\n\n$t = 35\\,°\\text{C}$.",
      hints: [
        "Použijte $m_1(t_1 - t) = m_2(t - t_2)$ — kapacita $c$ se zkrátí.",
        "Vyjádřete $t$ z rovnice $1 \\cdot (80 - t) = 3 \\cdot (t - 20)$.",
      ],
    },

    // 11 — Explain: skupenské přeměny
    {
      type: "explain",
      body: "Při **skupenské přeměně** se teplota nemění, i když dodáváme teplo — energie se spotřebuje na změnu uspořádání molekul:\n\n- **Tání/tuhnutí** (led $\\leftrightarrow$ voda): $Q = m \\cdot l_t$, kde $l_t = 334\\,\\text{kJ/kg}$\n- **Var/kondenzace** (voda $\\leftrightarrow$ pára): $Q = m \\cdot l_v$, kde $l_v = 2{\\,}260\\,\\text{kJ/kg}$",
      callout: "Skupenství",
    },

    // 12 — Reveal: proč se teplota nemění
    {
      type: "reveal",
      question:
        "Proč se led při $0\\,°\\text{C}$ neroztaje okamžitě, ale postupně — i když dodáváme teplo?",
      revealedContent:
        "Dodávané teplo se nespotřebovává na zvyšování teploty, ale na **překonávání vazeb** mezi molekulami. Každý kilogram ledu potřebuje $334\\,\\text{kJ}$ energie jen na rozrušení krystalové mřížky — teprve potom se začne zvyšovat teplota kapalné vody.",
    },

    // 13 — Sort order: ohřev ledu na páru
    {
      type: "sort-order",
      question:
        "Seřaďte fáze ohřevu ledu z $-10\\,°\\text{C}$ na vodní páru o $110\\,°\\text{C}$:",
      items: [
        "Ohřev ledu z $-10\\,°\\text{C}$ na $0\\,°\\text{C}$",
        "Tání ledu při $0\\,°\\text{C}$",
        "Ohřev vody z $0\\,°\\text{C}$ na $100\\,°\\text{C}$",
        "Var vody při $100\\,°\\text{C}$",
        "Ohřev páry ze $100\\,°\\text{C}$ na $110\\,°\\text{C}$",
      ],
      explanation:
        "Nejprve ohřev pevné fáze, pak tání (bez změny teploty), ohřev kapaliny, var (bez změny teploty) a nakonec ohřev plynné fáze.",
    },

    // 14 — MC: skupenské teplo
    {
      type: "multiple-choice",
      question:
        "Kolik energie uvolní $2\\,\\text{kg}$ vodní páry při kondenzaci na vodu (při $100\\,°\\text{C}$)? Měrné skupenské teplo varu vody: $l_v = 2{\\,}260\\,\\text{kJ/kg}$.",
      choices: [
        {
          label: "$4{\\,}520\\,\\text{kJ}$",
          isCorrect: true,
          feedback:
            "Správně! $Q = m \\cdot l_v = 2 \\cdot 2{\\,}260 = 4{\\,}520\\,\\text{kJ}$.",
        },
        {
          label: "$1{\\,}130\\,\\text{kJ}$",
          isCorrect: false,
          feedback: "To by bylo $l_v / 2$ — ale my násobíme hmotností.",
        },
        {
          label: "$2{\\,}260\\,\\text{kJ}$",
          isCorrect: false,
          feedback: "To platí pro $1\\,\\text{kg}$ — tady máme $2\\,\\text{kg}$.",
        },
      ],
      explanation:
        "$Q = m \\cdot l_v = 2 \\cdot 2{\\,}260 = 4{\\,}520\\,\\text{kJ}$. Kondenzace uvolňuje stejné teplo, jaké spotřebuje var.",
    },

    // 15 — Text input: celkový výpočet
    {
      type: "text-input",
      question:
        "Kolik tepla potřebujeme na roztavení $0{,}5\\,\\text{kg}$ ledu o teplotě $0\\,°\\text{C}$ a ohřátí vzniklé vody na $40\\,°\\text{C}$? ($l_t = 334\\,\\text{kJ/kg}$, $c = 4{,}18\\,\\text{kJ/(kg·°C)}$). Odpovězte v kJ.",
      expectedAnswer: "250,6",
      acceptableAnswers: ["250,6 kJ", "250.6", "251", "250,6kJ"],
      numericTolerance: 1,
      explanation:
        "$Q_1 = m \\cdot l_t = 0{,}5 \\cdot 334 = 167\\,\\text{kJ}$\n\n$Q_2 = m \\cdot c \\cdot \\Delta t = 0{,}5 \\cdot 4{,}18 \\cdot 40 = 83{,}6\\,\\text{kJ}$\n\n$Q = Q_1 + Q_2 = 167 + 83{,}6 = 250{,}6\\,\\text{kJ}$.",
      hints: [
        "Výpočet má dvě části: teplo na tání ($Q_1 = m \\cdot l_t$) a teplo na ohřev vody ($Q_2 = m \\cdot c \\cdot \\Delta t$).",
        "Celkové teplo je $Q = Q_1 + Q_2$.",
      ],
    },
  ],
  summary: {
    keyTakeaways: [
      "Teplota vyjadřuje míru kinetické energie částic; měříme v $°\\text{C}$ nebo $\\text{K}$ ($T = t + 273{,}15$).",
      "Teplo $Q = m \\cdot c \\cdot \\Delta t$ — měrná tepelná kapacita $c$ určuje, jak snadno se látka ohřeje.",
      "Kalorimetrická rovnice: teplo odevzdané = teplo přijaté ($m_1 c (t_1 - t) = m_2 c (t - t_2)$).",
      "Při skupenských přeměnách se teplota nemění — energie jde na změnu struktury ($Q = m \\cdot l$).",
    ],
  },
  nextTopicSuggestion: "idealni-plyn",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "temperature-and-heat",
  order: 1,
  title: "Teplota a teplo",
  lesson,
};
