import type { LessonContent } from "@/types/lesson";

export const energieAPraceBeginner: LessonContent = {
  conceptExplanation: {
    title: "Energie a práce — co pohání svět",
    sections: [
      {
        heading: "Co je energie?",
        body: `Energie je **schopnost konat práci**. Když zvednete míč do výšky, dáváte mu energii. Když ho pustíte, ta energie se přemění v pohyb.

Energie se **neztrácí a nevzniká** — jen se mění z jedné formy na druhou:
- teplo → pohyb (motor)
- pohyb → elektřina (dynamo)
- výška → pohyb (padající míč)

> [!key] Zákon zachování energie: Celková energie v uzavřené soustavě zůstává stejná. Mění se jen její forma.`,
      },
      {
        heading: "Kinetická energie — energie pohybu",
        body: `Každé pohybující se těleso má **kinetickou energii**:

$$\\boxed{E_k = \\frac{1}{2} m v^2}$$

- $m$ je hmotnost (kg)
- $v$ je rychlost (m/s)
- $E_k$ je v **joulech** (J)

$$\\begin{array}{c|cccc} v \\text{ (m/s)} & 1 & 2 & 5 & 10 \\\\ \\hline E_k \\text{ (J, pro } m = 2 \\text{ kg)} & 1 & 4 & 25 & 100 \\end{array}$$

> [!info] Dvojnásobná rychlost = **čtyřnásobná** energie! Proto je náraz při $100$ km/h $4\\times$ ničivější než při $50$ km/h.`,
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 0,
            defaultA: 2,
            tMax: 10,
          },
          caption: "Sledujte, jak roste rychlost — energie roste s druhou mocninou!",
        },
        examples: [
          {
            problem: "Jaká je kinetická energie běžce ($70$ kg) při rychlosti $5$ m/s?",
            solution: `$$E_k = \\frac{1}{2} \\cdot 70 \\cdot 5^2 = \\frac{1}{2} \\cdot 70 \\cdot 25 = \\color{#16a34a}{875 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Potenciální energie — energie polohy",
        body: `Těleso ve výšce nad zemí má **tíhovou potenciální energii**:

$$\\boxed{E_p = m \\cdot g \\cdot h}$$

- $m$ je hmotnost (kg)
- $g \\approx 10 \\text{ m/s}^2$ je tíhové zrychlení
- $h$ je výška (m)

Čím výše těleso zvednete, tím více energie mu dodáte.

> [!key] Potenciální energie závisí na **volbě nulové hladiny** — obvykle volíme zem jako $h = 0$.`,
        examples: [
          {
            problem: "Jaká je potenciální energie knihy ($0{,}5$ kg) na polici ve výšce $2$ m?",
            solution: `$$E_p = m \\cdot g \\cdot h = 0{,}5 \\cdot 10 \\cdot 2 = \\color{#16a34a}{10 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Přeměna energie — horská dráha",
        body: `Když míč padá z výšky $h$:

1. **Nahoře**: má jen potenciální energii $E_p = mgh$
2. **Dole**: má jen kinetickou energii $E_k = \\frac{1}{2}mv^2$
3. **Cestou**: $E_p$ se mění na $E_k$

Protože se energie zachovává:
$$mgh = \\frac{1}{2}mv^2 \\quad \\Rightarrow \\quad v = \\sqrt{2gh}$$

> [!tip] Všimněte si: hmotnost $m$ se vykrátí! Rychlost dopadu nezávisí na hmotnosti — těžký i lehký míč dopadnou stejně rychle (bez odporu vzduchu).

Posuňte kuličku po horské dráze a sledujte, jak se kinetická a potenciální energie neustále přeměňují:`,
        visual: {
          type: "interactive-roller-coaster",
          props: {
            trackProfile: "hills",
            maxHeight: 40,
            showFriction: false,
          },
          caption: "Posuňte kuličku — červený sloupec = Ek, modrý = Ep, součet je vždy stejný!",
        },
      },
      {
        heading: "Práce — jak předáváme energii",
        body: `Když silou posuneme těleso, konáme **práci**:

$$\\boxed{W = F \\cdot s}$$

- $F$ je síla (N)
- $s$ je dráha (m)
- $W$ je v **joulech** (J)

Práce je **způsob přenosu energie**. Když zatáhnete za krabici silou $10$ N po dráze $5$ m, vykonáte práci $50$ J — a tuto energii předáte krabici (jako kinetickou energii, teplo z tření...).

> [!key] $1$ J $= 1$ N $\\cdot$ m. Jeden joule je práce vykonaná silou $1$ N na dráze $1$ m.`,
        visual: {
          type: "interactive-pendulum",
          props: {
            defaultLength: 1.0,
            defaultAngle: 45,
            showEnergyBars: true,
          },
          caption: "Spusťte kyvadlo — práce = přenos energie. Sledujte, jak se Ep mění na Ek a zpět!",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Míč o hmotnosti $0{,}5$ kg spadne z výšky $5$ m. Jakou rychlostí dopadne na zem? Jaká je jeho kinetická energie těsně před dopadem? ($g = 10 \\text{ m/s}^2$)`,
    steps: [
      {
        instruction: "Spočítejte potenciální energii na začátku",
        math: "$E_p = m \\cdot g \\cdot h = 0{,}5 \\cdot 10 \\cdot 5 = 25 \\text{ J}$",
        explanation: "Míč má na výšce $5$ m potenciální energii $25$ J.",
      },
      {
        instruction: "Použijte zákon zachování energie",
        math: "$E_k = E_p = 25 \\text{ J}$",
        explanation: "Veškerá potenciální energie se přemění na kinetickou (zanedbáváme odpor vzduchu).",
      },
      {
        instruction: "Vyjádřete rychlost z kinetické energie",
        math: "$E_k = \\frac{1}{2} m v^2 \\quad \\Rightarrow \\quad v = \\sqrt{\\frac{2 E_k}{m}}$",
        explanation: "Vyřešíme vzorec pro $v$.",
      },
      {
        instruction: "Dosaďte a vypočítejte",
        math: "$v = \\sqrt{\\frac{2 \\cdot 25}{0{,}5}} = \\sqrt{100} = 10 \\text{ m/s}$",
        explanation: "Míč dopadne rychlostí $10$ m/s.",
      },
    ],
    finalAnswer: "Míč dopadne rychlostí $v = 10$ m/s s kinetickou energií $E_k = 25$ J.",
  },
  practiceProblems: [
    {
      id: "en-b-1",
      problemStatement: "Jaká je kinetická energie auta ($1200$ kg) jedoucího rychlostí $10$ m/s?",
      expectedAnswer: "60000",
      acceptableAnswers: ["60000", "60000 J", "60 kJ"],
      hints: [
        "Použijte $E_k = \\frac{1}{2} m v^2$.",
        "$E_k = \\frac{1}{2} \\cdot 1200 \\cdot 10^2$",
      ],
      solutionExplanation: `$$E_k = \\frac{1}{2} \\cdot 1200 \\cdot 10^2 = \\frac{1}{2} \\cdot 1200 \\cdot 100 = 60\\,000 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-b-2",
      problemStatement: "Jaká je potenciální energie pytle cementu ($25$ kg) na lešení ve výšce $8$ m? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "2000",
      acceptableAnswers: ["2000", "2000 J", "2 kJ"],
      hints: [
        "Použijte $E_p = m \\cdot g \\cdot h$.",
        "$E_p = 25 \\cdot 10 \\cdot 8$",
      ],
      solutionExplanation: `$$E_p = m \\cdot g \\cdot h = 25 \\cdot 10 \\cdot 8 = 2000 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-b-3",
      problemStatement: "Jakou práci vykonáte, když posunete skříň silou $200$ N po dráze $3$ m?",
      expectedAnswer: "600",
      acceptableAnswers: ["600", "600 J"],
      hints: [
        "Použijte $W = F \\cdot s$.",
        "$W = 200 \\cdot 3$",
      ],
      solutionExplanation: `$$W = F \\cdot s = 200 \\cdot 3 = 600 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-b-4",
      problemStatement: "Jakou rychlostí dopadne kámen z výšky $20$ m? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "20",
      acceptableAnswers: ["20", "20 m/s"],
      hints: [
        "Použijte $v = \\sqrt{2gh}$.",
        "$v = \\sqrt{2 \\cdot 10 \\cdot 20}$",
      ],
      solutionExplanation: `Ze zachování energie: $mgh = \\frac{1}{2}mv^2$
$$v = \\sqrt{2gh} = \\sqrt{2 \\cdot 10 \\cdot 20} = \\sqrt{400} = 20 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "en-b-5",
      problemStatement: "Auto o hmotnosti $1000$ kg jede rychlostí $20$ m/s. Řidič začne brzdit a zastaví po dráze $50$ m. Jakou průměrnou brzdnou silou auto brzdilo?",
      expectedAnswer: "4000",
      acceptableAnswers: ["4000", "4000 N", "4 kN"],
      hints: [
        "Práce brzdné síly se rovná počáteční kinetické energii: $W = E_k$.",
        "$E_k = \\frac{1}{2} \\cdot 1000 \\cdot 400 = 200\\,000$ J, pak $F = W/s$.",
      ],
      solutionExplanation: `$$E_k = \\frac{1}{2} \\cdot 1000 \\cdot 20^2 = 200\\,000 \\text{ J}$$
$$W = F \\cdot s \\implies F = \\frac{W}{s} = \\frac{200\\,000}{50} = 4000 \\text{ N}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Kinetická energie**: $E_k = \\frac{1}{2}mv^2$ — energie pohybu, roste s druhou mocninou rychlosti.",
      "**Potenciální energie**: $E_p = mgh$ — energie polohy, roste s výškou.",
      "**Práce**: $W = F \\cdot s$ — způsob, jak přenášíme energii silou na dráze.",
      "**Zákon zachování energie**: Energie se nemění v množství, jen ve formě.",
      "**Rychlost dopadu**: $v = \\sqrt{2gh}$ — nezávisí na hmotnosti!",
    ],
    nextTopicSuggestion: "Výborně! Pokračujte na výkon a účinnost — zjistíte, jak rychle se energie přeměňuje.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step, graph-aware
// ═══════════════════════════════════════════════════════════════;

export const energieAPraceIntermediate: LessonContent = {
  conceptExplanation: {
    title: "Energie a práce — kvantitativní pohled",
    sections: [
      {
        heading: "Práce obecně — síla pod úhlem",
        body: `Ve skutečnosti síla nemusí působit ve směru pohybu. Obecný vzorec pro práci:

$$\\boxed{W = F \\cdot s \\cdot \\cos \\alpha}$$

kde $\\alpha$ je úhel mezi směrem síly a směrem pohybu.

Speciální případy:
- $\\alpha = 0°$: $W = Fs$ (síla ve směru pohybu — kladná práce)
- $\\alpha = 90°$: $W = 0$ (síla kolmo na pohyb — žádná práce)
- $\\alpha = 180°$: $W = -Fs$ (síla proti pohybu — záporná práce = brzdění)

> [!key] Normálová síla a tíhová síla při pohybu po vodorovné rovině konají **nulovou práci** — jsou kolmé na směr pohybu!`,
        examples: [
          {
            problem: "Táhnete kufr silou $80$ N pod úhlem $60°$ k podlaze po dráze $10$ m. Jakou práci vykonáte?",
            solution: `$$W = F \\cdot s \\cdot \\cos \\alpha = 80 \\cdot 10 \\cdot \\cos 60° = 80 \\cdot 10 \\cdot 0{,}5 = \\color{#16a34a}{400 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Výkon — jak rychle pracujeme",
        body: `Výkon udává, jak rychle se koná práce:

$$\\boxed{P = \\frac{W}{t}}$$

- $P$ je výkon ve **wattech** (W)
- $W$ je práce v joulech (J)
- $t$ je čas v sekundách (s)

Alternativní vyjádření (pro konstantní sílu a rychlost):
$$P = F \\cdot v$$

$$\\begin{array}{l|c} \\text{Zdroj} & P \\\\ \\hline \\text{Člověk (chůze)} & 75 \\text{ W} \\\\ \\text{Člověk (sprint)} & 2000 \\text{ W} \\\\ \\text{Auto} & 50{-}200 \\text{ kW} \\\\ \\text{Elektrárna} & 500{-}2000 \\text{ MW} \\end{array}$$

> [!info] $1$ koňská síla $\\approx 735$ W. Auto se $100$ kW má asi $136$ koní.`,
        visual: {
          type: "interactive-motion",
          props: {
            maxV: 20,
            maxT: 10,
            targetDistance: 100,
            unit: "m",
          },
          caption: "Stejná dráha, různý čas — různý výkon!",
        },
        examples: [
          {
            problem: "Jeřáb zvedne náklad $500$ kg do výšky $12$ m za $30$ s. Jaký je výkon jeřábu?",
            solution: `$$W = mgh = 500 \\cdot 10 \\cdot 12 = 60\\,000 \\text{ J}$$
$$P = \\frac{W}{t} = \\frac{60\\,000}{30} = \\color{#16a34a}{2000 \\text{ W} = 2 \\text{ kW}}$$`,
          },
        ],
      },
      {
        heading: "Zákon zachování mechanické energie",
        body: `V soustavě bez tření a odporu vzduchu platí:

$$\\boxed{E_k + E_p = \\text{konst.}}$$

$$\\frac{1}{2}mv_1^2 + mgh_1 = \\frac{1}{2}mv_2^2 + mgh_2$$

To znamená:
- Když těleso **stoupá**: $E_k$ klesá, $E_p$ roste
- Když těleso **klesá**: $E_p$ klesá, $E_k$ roste
- **Celková** mechanická energie zůstává stejná

> [!tip] Energetický přístup je často **jednodušší** než kinematika — nepotřebujeme znát čas ani zrychlení!`,
        visual: {
          type: "interactive-roller-coaster",
          props: {
            trackProfile: "hills-and-loop",
            maxHeight: 50,
            showFriction: true,
          },
          caption: "Zapněte tření a sledujte, jak celková energie klesá — kulička nemusí dojet!",
        },
        examples: [
          {
            problem: "Kulička se valí z kopce výšky $3$ m a dole najede na smyčku o poloměru $1$ m. Jakou rychlost má na vrcholu smyčky? (Zanedbejte tření.)",
            solution: `Na vrcholu smyčky je výška $2r = 2$ m.
$$mgh_1 = \\frac{1}{2}mv^2 + mgh_2$$
$$v = \\sqrt{2g(h_1 - h_2)} = \\sqrt{2 \\cdot 10 \\cdot (3 - 2)} = \\sqrt{20} \\approx \\color{#16a34a}{4{,}47 \\text{ m/s}}$$`,
          },
        ],
      },
      {
        heading: "Účinnost",
        body: `Žádný stroj nepřeměňuje energii se $100\\%$ účinností — část se vždy ztratí (hlavně jako teplo z tření).

$$\\boxed{\\eta = \\frac{W_{\\text{užit}}}{W_{\\text{celk}}} \\cdot 100\\%}$$

nebo ekvivalentně:
$$\\eta = \\frac{P_{\\text{užit}}}{P_{\\text{celk}}} \\cdot 100\\%$$

$$\\begin{array}{l|c} \\text{Stroj} & \\eta \\\\ \\hline \\text{Elektromotor} & 85{-}95\\% \\\\ \\text{Benzínový motor} & 25{-}35\\% \\\\ \\text{Dieselový motor} & 35{-}45\\% \\\\ \\text{Žárovka} & 5\\% \\\\ \\text{LED} & 30{-}50\\% \\end{array}$$

> [!key] Účinnost říká, jaký podíl dodané energie se přemění na **užitečnou** práci.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Auto o hmotnosti $1500$ kg jede po vodorovné silnici rychlostí $72$ km/h a začne stoupat do kopce s výškovým rozdílem $20$ m. Koeficient odporu (tření + vzduch) je $f = 0{,}05$. Délka stoupání je $400$ m. Zastaví auto před vrcholem, nebo ho překoná?`,
    steps: [
      {
        instruction: "Převeďte rychlost a spočítejte počáteční kinetickou energii",
        math: "$v_0 = \\frac{72}{3{,}6} = 20 \\text{ m/s}$\n$E_k = \\frac{1}{2} \\cdot 1500 \\cdot 20^2 = 300\\,000 \\text{ J}$",
        explanation: "Auto začíná s kinetickou energií $300$ kJ.",
      },
      {
        instruction: "Spočítejte potenciální energii na vrcholu",
        math: "$E_p = mgh = 1500 \\cdot 10 \\cdot 20 = 300\\,000 \\text{ J}$",
        explanation: "Na vrchol je potřeba dodat $300$ kJ potenciální energie.",
      },
      {
        instruction: "Spočítejte práci odporových sil (tření + vzduch)",
        math: "$W_{\\text{odpor}} = f \\cdot m \\cdot g \\cdot s = 0{,}05 \\cdot 1500 \\cdot 10 \\cdot 400 = 300\\,000 \\text{ J}$",
        explanation: "Odporové síly \"spolknou\" dalších $300$ kJ na dráze $400$ m.",
      },
      {
        instruction: "Porovnejte energii",
        math: "$E_k = 300\\,000 \\text{ J}$\n$E_p + W_{\\text{odpor}} = 300\\,000 + 300\\,000 = 600\\,000 \\text{ J}$",
        explanation: "Auto potřebuje $600$ kJ, ale má jen $300$ kJ.",
      },
      {
        instruction: "Kde auto zastaví?",
        math: "$300\\,000 = 1500 \\cdot 10 \\cdot \\frac{20}{400} \\cdot s + 0{,}05 \\cdot 1500 \\cdot 10 \\cdot s$\n$300\\,000 = 750s + 750s = 1500s$\n$s = 200 \\text{ m}$",
        explanation: "Auto zastaví po $200$ m — v polovině kopce.",
      },
    ],
    finalAnswer: "Auto zastaví v polovině kopce ($200$ m), protože jeho kinetická energie nestačí překonat stoupání a odpor.",
  },
  practiceProblems: [
    {
      id: "en-i-1",
      problemStatement: "Dělník táhne bednu silou $100$ N pod úhlem $45°$ po dráze $6$ m. Jakou práci vykoná? ($\\cos 45° = 0{,}707$)",
      expectedAnswer: "424",
      acceptableAnswers: ["424", "424 J", "424.2", "424,2"],
      numericTolerance: 2,
      hints: [
        "Použijte $W = F \\cdot s \\cdot \\cos \\alpha$.",
        "$W = 100 \\cdot 6 \\cdot 0{,}707$",
      ],
      solutionExplanation: `$$W = F \\cdot s \\cdot \\cos \\alpha = 100 \\cdot 6 \\cdot 0{,}707 = 424{,}2 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-i-2",
      problemStatement: "Výtah o výkonu $5$ kW zvedá náklad $200$ kg. Jakou rychlostí náklad stoupá? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "2.5",
      acceptableAnswers: ["2.5", "2,5", "2.5 m/s", "2,5 m/s"],
      hints: [
        "$P = F \\cdot v$ a $F = mg$.",
        "$v = P/(mg) = 5000 / (200 \\cdot 10)$",
      ],
      solutionExplanation: `$$P = F \\cdot v = mg \\cdot v$$
$$v = \\frac{P}{mg} = \\frac{5000}{200 \\cdot 10} = 2{,}5 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "en-i-3",
      problemStatement: "Lyžař ($70$ kg) sjede z kopce o výšce $30$ m. V údolí má rychlost $20$ m/s. Kolik energie se ztratilo třením? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "7000",
      acceptableAnswers: ["7000", "7000 J", "7 kJ"],
      hints: [
        "$E_p = mgh$, $E_k = \\frac{1}{2}mv^2$. Ztráty = $E_p - E_k$.",
        "$E_p = 21\\,000$ J, $E_k = 14\\,000$ J.",
      ],
      solutionExplanation: `$$E_p = 70 \\cdot 10 \\cdot 30 = 21\\,000 \\text{ J}$$
$$E_k = \\frac{1}{2} \\cdot 70 \\cdot 20^2 = 14\\,000 \\text{ J}$$
$$\\Delta E = 21\\,000 - 14\\,000 = 7000 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "en-i-4",
      problemStatement: "Motor auta má výkon $60$ kW a účinnost $30\\%$. Jaký je užitečný výkon na kolech?",
      expectedAnswer: "18",
      acceptableAnswers: ["18", "18 kW", "18000", "18000 W"],
      hints: [
        "$P_{\\text{užit}} = \\eta \\cdot P_{\\text{celk}}$",
        "$P_{\\text{užit}} = 0{,}3 \\cdot 60$",
      ],
      solutionExplanation: `$$P_{\\text{užit}} = \\eta \\cdot P_{\\text{celk}} = 0{,}3 \\cdot 60 = 18 \\text{ kW}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-i-5",
      problemStatement: "Kulička se valí z výšky $5$ m po dráze bez tření a najede na vertikální smyčku o poloměru $r = 1{,}5$ m. Jakou rychlost má na vrcholu smyčky? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "6.3",
      acceptableAnswers: ["6.3", "6,3", "6.32", "6,32"],
      numericTolerance: 0.2,
      hints: [
        "Na vrcholu smyčky je výška $2r = 3$ m. Použijte zachování energie.",
        "$v = \\sqrt{2g(h - 2r)} = \\sqrt{2 \\cdot 10 \\cdot (5 - 3)}$",
      ],
      solutionExplanation: `Na vrcholu smyčky: $h_2 = 2r = 3$ m
$$\\frac{1}{2}mv^2 = mg(h_1 - h_2)$$
$$v = \\sqrt{2g(h_1 - 2r)} = \\sqrt{2 \\cdot 10 \\cdot 2} = \\sqrt{40} \\approx 6{,}32 \\text{ m/s}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Práce pod úhlem: $W = Fs\\cos\\alpha$ — jen složka síly ve směru pohybu koná práci.",
      "Výkon: $P = W/t = Fv$ — jak rychle se koná práce (watty).",
      "Zachování mechanické energie: $E_k + E_p = \\text{konst.}$ (bez tření).",
      "S třením: $E_{k1} + E_{p1} = E_{k2} + E_{p2} + W_{\\text{tření}}$.",
      "Účinnost: $\\eta = W_{\\text{užit}} / W_{\\text{celk}}$ — vždy menší než $100\\%$.",
    ],
    nextTopicSuggestion: "Skvěle! Pokračujte na hybnost a impulz — další pohled na srážky a interakce těles.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Complex problems, energy methods, real-world
// ═══════════════════════════════════════════════════════════════;

export const energieAPraceAdvanced: LessonContent = {
  conceptExplanation: {
    title: "Energie a práce — komplexní problémy",
    sections: [
      {
        heading: "Práce proměnné síly",
        body: `Pokud síla není konstantní, práce se počítá jako **plocha pod grafem** $F(s)$:

$$\\boxed{W = \\int_0^s F(x) \\, dx}$$

Pro pružinu (Hookův zákon: $F = kx$):
$$W = \\int_0^x kx \\, dx = \\frac{1}{2}kx^2$$

Energie pružiny (elastická potenciální energie):
$$\\boxed{E_{\\text{pruž}} = \\frac{1}{2}kx^2}$$

kde $k$ je tuhost pružiny (N/m) a $x$ je prodloužení/stlačení.

> [!key] Práce pružiny od $x_1$ do $x_2$: $W = \\frac{1}{2}k(x_2^2 - x_1^2)$. Plocha pod parabolou v grafu $F(x)$.`,
        visual: {
          type: "interactive-spring-oscillator",
          props: {
            defaultK: 200,
            defaultMass: 1,
            defaultDisplacement: 5,
            showGraph: true,
            showEnergyBars: true,
            showForceArrow: true,
          },
          caption: "Spusťte pružinu — sledujte kmitání, graf x(t) a přeměnu energie",
        },
        examples: [
          {
            problem: "Pružina s tuhostí $k = 200$ N/m je stlačena o $0{,}1$ m. Jaká je její energie?",
            solution: `$$E = \\frac{1}{2}kx^2 = \\frac{1}{2} \\cdot 200 \\cdot 0{,}1^2 = \\color{#16a34a}{1 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Energetická bilance — obecná rovnice",
        body: `Obecný zákon zachování energie s třením, vnější silou a pružinou:

$$\\boxed{E_{k1} + E_{p1} + E_{\\text{pruž,1}} + W_{\\text{vnější}} = E_{k2} + E_{p2} + E_{\\text{pruž,2}} + |W_{\\text{tření}}|}$$

Tento přístup je **univerzální** — funguje na každý mechanický problém:
1. Zvolte počáteční a koncový stav
2. Napište energie v obou stavech
3. Přidejte práci vnějších sil a ztráty třením
4. Řešte jednu rovnici

> [!tip] Energetický přístup je často jednodušší než Newtonovy zákony — nemusíte znát trajektorii, čas ani zrychlení. Stačí znát **počáteční** a **koncový** stav.`,
      },
      {
        heading: "Pohyb na nakloněné rovině — energeticky",
        body: `Těleso sjíždí z výšky $h$ po nakloněné rovině délky $l$ s třením $f$:

$$mgh = \\frac{1}{2}mv^2 + f \\cdot mg\\cos\\alpha \\cdot l$$

Rychlost na konci:
$$v = \\sqrt{2g(h - fl\\cos\\alpha)} = \\sqrt{2gl(\\sin\\alpha - f\\cos\\alpha)}$$

Srovnání s volným pádem ($f = 0$, $\\alpha = 90°$): $v = \\sqrt{2gh}$
- Tření **snižuje** konečnou rychlost
- Mírnější sklon (delší dráha) = **více** ztráty třením

> [!info] Pokud $\\sin\\alpha < f\\cos\\alpha$ (tedy $\\tan\\alpha < f$), těleso sjíždět nebude — tření ho udrží.`,
        visual: {
          type: "interactive-roller-coaster",
          props: {
            trackProfile: "loop",
            maxHeight: 50,
            showFriction: false,
          },
          caption: "Nastavte výšku a najděte minimum pro průjezd smyčkou — h ≥ 2.5r",
        },
      },
      {
        heading: "Práce a energie v kruhových drahách",
        body: `Pro těleso na vrcholu vertikální smyčky o poloměru $r$ musí platit:

$$\\frac{mv^2}{r} \\geq mg \\quad \\Rightarrow \\quad v_{\\min} = \\sqrt{gr}$$

Z energetické bilance (startovní výška $h$, bez tření):
$$mgh = \\frac{1}{2}mv_{\\min}^2 + mg(2r)$$
$$h_{\\min} = \\frac{v_{\\min}^2}{2g} + 2r = \\frac{r}{2} + 2r = \\frac{5r}{2}$$

> [!key] Minimální startovní výška pro průjezd celou smyčkou: $h_{\\min} = \\frac{5}{2}r = 2{,}5r$

S třením:
$$mgh_{\\min} = \\frac{1}{2}mv_{\\min}^2 + mg(2r) + W_{\\text{tření}}$$`,
        examples: [
          {
            problem: "Jaká minimální výška je potřeba, aby kulička projela smyčkou o poloměru $r = 0{,}4$ m?",
            solution: `$$h_{\\min} = \\frac{5}{2}r = \\frac{5}{2} \\cdot 0{,}4 = \\color{#16a34a}{1 \\text{ m}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Těleso o hmotnosti $2$ kg klouže z vrchu nakloněné roviny (výška $h = 5$ m, délka $l = 10$ m, úhel $\\alpha = 30°$). Na konci roviny narazí do pružiny o tuhosti $k = 800$ N/m.

Koeficient tření je $f = 0{,}2$. O kolik se pružina stlačí? ($g = 10 \\text{ m/s}^2$, $\\cos 30° = 0{,}866$)`,
    steps: [
      {
        instruction: "Napište energetickou bilanci",
        math: "$mgh = \\frac{1}{2}kx^2 + f \\cdot mg\\cos\\alpha \\cdot (l + x)$",
        explanation: "Potenciální energie → energie pružiny + ztráty třením. Tření působí na celé dráze $l + x$ (i při stlačování pružiny).",
      },
      {
        instruction: "Dosaďte známé hodnoty",
        math: "$2 \\cdot 10 \\cdot 5 = \\frac{1}{2} \\cdot 800 \\cdot x^2 + 0{,}2 \\cdot 2 \\cdot 10 \\cdot 0{,}866 \\cdot (10 + x)$",
        explanation: "Dosadíme $m = 2$, $g = 10$, $h = 5$, $k = 800$, $f = 0{,}2$, $l = 10$.",
      },
      {
        instruction: "Zjednodušte",
        math: "$100 = 400x^2 + 3{,}464 \\cdot (10 + x)$\n$100 = 400x^2 + 34{,}64 + 3{,}464x$",
        explanation: "Upravíme do tvaru kvadratické rovnice.",
      },
      {
        instruction: "Sestavte kvadratickou rovnici",
        math: "$400x^2 + 3{,}464x - 65{,}36 = 0$",
        explanation: "$100 - 34{,}64 = 65{,}36$. Máme standardní tvar $ax^2 + bx + c = 0$.",
      },
      {
        instruction: "Řešte kvadratickou rovnici",
        math: "$x = \\frac{-3{,}464 + \\sqrt{3{,}464^2 + 4 \\cdot 400 \\cdot 65{,}36}}{2 \\cdot 400}$",
        explanation: "Použijeme vzorec $x = \\frac{-b + \\sqrt{b^2 - 4ac}}{2a}$ (bereme kladný kořen).",
      },
      {
        instruction: "Dopočítejte",
        math: "$x = \\frac{-3{,}464 + \\sqrt{12 + 104\\,576}}{800} = \\frac{-3{,}464 + 323{,}4}{800} \\approx 0{,}40 \\text{ m}$",
        explanation: "Pružina se stlačí o přibližně $40$ cm.",
      },
    ],
    finalAnswer: "Pružina se stlačí přibližně o $x \\approx 0{,}40$ m ($40$ cm).",
  },
  practiceProblems: [
    {
      id: "en-p-1",
      problemStatement: "Pružina s tuhostí $k = 500$ N/m je stlačena o $0{,}2$ m. Jakou rychlost udělí kuličce ($50$ g), když se uvolní? (Zanedbejte tření.)",
      expectedAnswer: "20",
      acceptableAnswers: ["20", "20 m/s"],
      hints: [
        "$\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2$",
        "$v = x\\sqrt{k/m} = 0{,}2 \\cdot \\sqrt{500/0{,}05}$",
      ],
      solutionExplanation: `$$\\frac{1}{2}kx^2 = \\frac{1}{2}mv^2$$
$$v = x\\sqrt{\\frac{k}{m}} = 0{,}2 \\cdot \\sqrt{\\frac{500}{0{,}05}} = 0{,}2 \\cdot 100 = 20 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "en-p-2",
      problemStatement: "Jaká je minimální výška, z které musí kulička startovat, aby projela smyčkou o poloměru $r = 0{,}6$ m? (Bez tření.)",
      expectedAnswer: "1.5",
      acceptableAnswers: ["1.5", "1,5", "1.5 m", "1,5 m"],
      hints: [
        "$h_{\\min} = \\frac{5}{2}r$",
        "$h_{\\min} = 2{,}5 \\cdot 0{,}6$",
      ],
      solutionExplanation: `$$h_{\\min} = \\frac{5}{2}r = 2{,}5 \\cdot 0{,}6 = 1{,}5 \\text{ m}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "en-p-3",
      problemStatement: "Těleso ($3$ kg) sjíždí $8$ m po nakloněné rovině ($30°$, $f = 0{,}15$). Jakou rychlostí dorazí dolů? ($g = 10$, $\\cos 30° = 0{,}866$)",
      expectedAnswer: "7.6",
      acceptableAnswers: ["7.6", "7,6", "7.58", "7,58"],
      numericTolerance: 0.2,
      hints: [
        "$v = \\sqrt{2gl(\\sin\\alpha - f\\cos\\alpha)}$",
        "$v = \\sqrt{2 \\cdot 10 \\cdot 8 \\cdot (0{,}5 - 0{,}15 \\cdot 0{,}866)}$",
      ],
      solutionExplanation: `$$v = \\sqrt{2gl(\\sin\\alpha - f\\cos\\alpha)}$$
$$= \\sqrt{2 \\cdot 10 \\cdot 8 \\cdot (0{,}5 - 0{,}130)} = \\sqrt{160 \\cdot 0{,}370} = \\sqrt{59{,}2} \\approx 7{,}6 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "en-p-4",
      problemStatement: "Auto ($1200$ kg) s motorem o výkonu $90$ kW jede do kopce (sklon $5\\%$, tj. $\\sin\\alpha = 0{,}05$). Odpor vzduchu a tření dohromady činí $600$ N. Jaká je maximální konstantní rychlost auta do kopce?",
      expectedAnswer: "75",
      acceptableAnswers: ["75", "75 m/s"],
      hints: [
        "Při konstantní rychlosti: $P = (F_{\\text{tíha}} + F_{\\text{odpor}}) \\cdot v$.",
        "$F_{\\text{tíha}} = mg\\sin\\alpha = 1200 \\cdot 10 \\cdot 0{,}05 = 600$ N. Celkový odpor $= 1200$ N.",
      ],
      solutionExplanation: `Složka tíhy proti pohybu: $F_g = mg\\sin\\alpha = 1200 \\cdot 10 \\cdot 0{,}05 = 600$ N
Celkový odpor: $F = 600 + 600 = 1200$ N
$$P = Fv \\implies v = \\frac{P}{F} = \\frac{90\\,000}{1200} = 75 \\text{ m/s}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "en-p-5",
      problemStatement: "Pružina ($k = 1000$ N/m) vystřelí těleso ($0{,}5$ kg) svisle vzhůru ze stlačení $x = 0{,}3$ m. Do jaké výšky těleso vyletí? ($g = 10 \\text{ m/s}^2$, bez tření)",
      expectedAnswer: "9",
      acceptableAnswers: ["9", "9 m"],
      hints: [
        "$\\frac{1}{2}kx^2 = mgh$",
        "$h = \\frac{kx^2}{2mg} = \\frac{1000 \\cdot 0{,}09}{2 \\cdot 0{,}5 \\cdot 10}$",
      ],
      solutionExplanation: `$$\\frac{1}{2}kx^2 = mgh$$
$$h = \\frac{kx^2}{2mg} = \\frac{1000 \\cdot 0{,}3^2}{2 \\cdot 0{,}5 \\cdot 10} = \\frac{90}{10} = 9 \\text{ m}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Energie pružiny: $E = \\frac{1}{2}kx^2$ — roste kvadraticky s deformací.",
      "Obecná energetická bilance: $E_{k1} + E_{p1} + E_{\\text{pruž}} + W_{\\text{vnější}} = E_{k2} + E_{p2} + E_{\\text{pruž}} + |W_{\\text{tření}}|$.",
      "Minimální výška pro smyčku: $h = \\frac{5}{2}r$ — z podmínky odstředivé síly na vrcholu.",
      "Práce proměnné síly = plocha pod grafem $F(x)$.",
      "Energetický přístup je univerzální — nepotřebujete čas, zrychlení, ani trajektorii.",
    ],
    nextTopicSuggestion: "Výborně! Nyní jste připraveni na hybnost a impulz — jiný zákon zachování, důležitý pro srážky.",
  },
};
