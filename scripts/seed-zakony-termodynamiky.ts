import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "752ccbb7-c316-4361-b1ec-51e2027f0072";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Zakony termodynamiky — energie tepla a jejich pravidla",
    sections: [
      {
        heading: "Nulty zakon: Tepelna rovnovaha",
        body: `Kdyz dva predmety necháte dlouho vedle sebe, **vyrovnaji se jejich teploty**. Tomuto stavu rikame **tepelna rovnovaha**.

Nulty zakon termodynamiky je jednoduchý, ale zasadni:

> [!key] Pokud je teleso A v tepelne rovnovaze s telesem C a teleso B je take v rovnovaze s telesem C, pak jsou v rovnovaze i telesa A a B.

Proc je to dulezite? Prave diky tomuto zakonu funguje **teplomer**! Teplomer (C) se dostane do rovnovahy s vasim telem (A) a ukazuje stejnou teplotu — a vy vite, ze jakékoliv jiné teleso (B) se stejnou teplotou na teplomeru je v rovnovaze s vami.

- Horky caj v místnosti postupne chladne, az ma teplotu místnosti
- Kov a drevo ve stejné místnosti mají stejnou teplotu (i kdyz kov "pusobi" chladneji)`,
      },
      {
        heading: "Prvni zakon: Zachovani energie pro teplo",
        body: `Prvni zakon termodynamiky je vlastne **zakon zachovani energie** aplikovany na tepelne deje:

$$\\boxed{\\Delta U = Q - W}$$

- $\\Delta U$ je zmena **vnitrni energie** soustavy (J)
- $Q$ je **teplo** dodane soustave (J)
- $W$ je **prace** vykonana soustavou (J)

Ekvivalentni zapis:
$$Q = \\Delta U + W$$

Co to znamena v praxi:
1. **Dodame teplo** ($Q > 0$) — bud se zvysi vnitrni energie, nebo soustava vykona praci, nebo oboji
2. **Soustava kona praci** ($W > 0$) — plyn se rozpina a tlaci na pist
3. **Vnitrni energie roste** ($\\Delta U > 0$) — teplota plynu roste

> [!key] Energie se nemuze vytvaret ani nicit — teplo dodane soustave se musi "rozdelit" mezi zmenu vnitrni energie a vykonanou praci.

$$\\begin{array}{c|c|c} \\text{Dodame} & \\text{Vysledek} & \\text{Priklad} \\\\ \\hline Q = 100 \\text{ J} & \\Delta U = 60 \\text{ J}, W = 40 \\text{ J} & \\text{ohrev plynu v pistu} \\\\ Q = 100 \\text{ J} & \\Delta U = 100 \\text{ J}, W = 0 & \\text{ohrev v uzavrene nadobce} \\\\ Q = 0 & \\Delta U = -50 \\text{ J}, W = 50 \\text{ J} & \\text{adiabaticka expanze} \\end{array}$$`,
        examples: [
          {
            problem: "Plynu dodame $500$ J tepla. Plyn vykona praci $200$ J. O kolik se zmenila jeho vnitrni energie?",
            solution: `$$\\Delta U = Q - W = 500 - 200 = \\color{#16a34a}{300 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Prace plynu — plocha pod krivkou v p-V diagramu",
        body: `Kdyz se plyn rozpina, tlaci na pist a kona praci. Pro **izobaricky** dej (konstantni tlak):

$$\\boxed{W = p \\cdot \\Delta V}$$

- $p$ je tlak (Pa)
- $\\Delta V = V_2 - V_1$ je zmena objemu (m$^3$)

Obecne je prace plynu rovna **plose pod krivkou** v diagramu $p$-$V$:

> [!info] Prace plynu pri rozpinani je kladna ($W > 0$), pri stlacovani zaporna ($W < 0$). V $p$-$V$ diagramu cim vetsi plocha pod krivkou, tim vice prace.`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "isobaric",
            showWork: true,
          },
          caption: "Sledujte, jak plocha pod krivkou v p-V diagramu odpovida vykonane praci.",
        },
        examples: [
          {
            problem: "Plyn se pri konstantnim tlaku $200$ kPa rozpne z objemu $0{,}01$ m$^3$ na $0{,}03$ m$^3$. Jakou praci vykona?",
            solution: `$$W = p \\cdot \\Delta V = 200\\,000 \\cdot (0{,}03 - 0{,}01) = 200\\,000 \\cdot 0{,}02 = \\color{#16a34a}{4000 \\text{ J}}$$`,
          },
        ],
      },
      {
        heading: "Druhy zakon: Teplo tece od horkeho ke studenemu",
        body: `Druhy zakon termodynamiky urcuje **smer** deje. Existuji dve klasicke formulace:

**Clausiova formulace:**
> Teplo nemuze samovolne prechazet od studenejsiho telesa k teplejsimu.

**Kelvinova formulace:**
> Nelze sestrojit stroj, ktery by pouze odbiral teplo z jednoho zdroje a uplne je premenil v praci.

Co to znamena:
- Horky caj **sam od sebe** nevychladne a neohreje okolni vzduch na vyssi teplotu
- Motor **nemuze** mit $100\\%$ ucinnost — cast tepla se vzdy "ztrati" do studenejsiho prostredi
- Vsechny prirozene deje jdou jednim smerem — od "porádku" k "neporadku"

> [!tip] Druhy zakon nevyplyvá z prvniho! Prvni zakon rika, ze energie se zachovava. Druhy zakon rika, ze ne kazdy energeticky mozny dej se skutecne stane.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Plynu v pistu dodame $800$ J tepla. Plyn se pri konstantnim tlaku $100$ kPa rozpne o $\\Delta V = 0{,}003$ m$^3$. Jakou praci vykona plyn? O kolik se zmeni jeho vnitrni energie?`,
    steps: [
      {
        instruction: "Spocitejte praci plynu pri izobarickem deji",
        math: "$W = p \\cdot \\Delta V = 100\\,000 \\cdot 0{,}003 = 300 \\text{ J}$",
        explanation: "Pri konstantnim tlaku je prace jednoduchy soucin tlaku a zmeny objemu.",
      },
      {
        instruction: "Pouzijte prvni zakon termodynamiky",
        math: "$\\Delta U = Q - W = 800 - 300 = 500 \\text{ J}$",
        explanation: "Z dodanych $800$ J se $300$ J spotrebovalo na praci a $500$ J zvysilo vnitrni energii.",
      },
      {
        instruction: "Overeni — soucet dava smysl?",
        math: "$Q = \\Delta U + W = 500 + 300 = 800 \\text{ J}$ \\checkmark",
        explanation: "Vse souhlasi — energie se zachovava.",
      },
    ],
    finalAnswer: "Plyn vykonal praci $W = 300$ J a jeho vnitrni energie vzrostla o $\\Delta U = 500$ J.",
  },
  practiceProblems: [
    {
      id: "zt-b-1",
      problemStatement: "Plynu v uzavrene nadobce (konstantni objem) dodame $600$ J tepla. Jakou praci vykona plyn a o kolik se zmeni jeho vnitrni energie?",
      expectedAnswer: "600",
      acceptableAnswers: ["600", "600 J", "0 a 600 J"],
      hints: [
        "Pri konstantnim objemu je $\\Delta V = 0$, takze $W = p \\cdot \\Delta V = 0$.",
        "$\\Delta U = Q - W = 600 - 0$",
      ],
      solutionExplanation: `Pri konstantnim objemu plyn nekona praci: $W = 0$.
$$\\Delta U = Q - W = 600 - 0 = 600 \\text{ J}$$
Veskere teplo se premeni na vnitrni energii.`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-b-2",
      problemStatement: "Plyn vykona praci $400$ J a jeho vnitrni energie se pritom snizi o $400$ J. Kolik tepla plyn prijal od okoli?",
      expectedAnswer: "0",
      acceptableAnswers: ["0", "0 J", "zadne"],
      hints: [
        "$Q = \\Delta U + W$. Pozor: vnitrni energie se snizila, takze $\\Delta U = -400$ J.",
        "$Q = -400 + 400$",
      ],
      solutionExplanation: `$$Q = \\Delta U + W = (-400) + 400 = 0 \\text{ J}$$
Plyn neprijal zadne teplo — konal praci na ukor sve vnitrni energie (adiabaticka expanze).`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-b-3",
      problemStatement: "Plyn se pri konstantnim tlaku $150$ kPa rozpne z objemu $2$ l na $5$ l. Jakou praci vykona? (Vyjadrte v joulech.)",
      expectedAnswer: "450",
      acceptableAnswers: ["450", "450 J"],
      hints: [
        "Prevedte litry na m$^3$: $1$ l $= 0{,}001$ m$^3$.",
        "$W = p \\cdot \\Delta V = 150\\,000 \\cdot (0{,}005 - 0{,}002)$",
      ],
      solutionExplanation: `$$\\Delta V = 5 - 2 = 3 \\text{ l} = 0{,}003 \\text{ m}^3$$
$$W = p \\cdot \\Delta V = 150\\,000 \\cdot 0{,}003 = 450 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "zt-b-4",
      problemStatement: "Tepelny motor prijme z horkeho zdroje $1000$ J tepla a do studeného zdroje odevzda $700$ J. Jakou praci vykona?",
      expectedAnswer: "300",
      acceptableAnswers: ["300", "300 J"],
      hints: [
        "Prace motoru = teplo prijate - teplo odevzdane.",
        "$W = Q_{\\text{hot}} - Q_{\\text{cold}}$",
      ],
      solutionExplanation: `$$W = Q_{\\text{hot}} - Q_{\\text{cold}} = 1000 - 700 = 300 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-b-5",
      problemStatement: "Muze tepelny motor premenit veskere prijate teplo na praci, aniz by neco odevzdal do studeného zdroje? Odpovedzte \"ano\" nebo \"ne\" a vysvetlete proc.",
      expectedAnswer: "ne",
      acceptableAnswers: ["ne", "Ne", "NE", "nikoliv", "Nikoliv", "nemuze"],
      hints: [
        "Vzpomente si na Kelvinovu formulaci druheho zakona termodynamiky.",
        "Druhy zakon rika, ze nelze sestrojit stroj, ktery by teplo UPLNE premenil v praci.",
      ],
      solutionExplanation: `Ne. Podle druheho zakona termodynamiky (Kelvinova formulace) nelze sestrojit periodicke zarizeni, ktere by uplne premenilo teplo z jednoho zdroje na praci. Cast tepla se vzdy musi odvest do studeného zdroje.`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Nulty zakon**: Tepelna rovnovaha je tranzitivni — zaklad mereni teploty.",
      "**Prvni zakon**: $\\Delta U = Q - W$ — energie se zachovava i v tepelnych dejich.",
      "**Prace plynu**: $W = p \\cdot \\Delta V$ pri konstantnim tlaku, obecne plocha pod krivkou v $p$-$V$ diagramu.",
      "**Druhy zakon**: Teplo samovolne tece od horkeho ke studenemu, nikdy naopak. Motor nemuze mit $100\\%$ ucinnost.",
      "Prvni zakon urcuje **kolik** energie, druhy zakon urcuje **kam** energie tece.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na pokrocile aplikace — zjistite, jak prvni zakon funguje v ruznych typech deju (izotermicky, adiabatickyke, ...).",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step, process-specific
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Zakony termodynamiky — deje idealniho plynu a tepelne stroje",
    sections: [
      {
        heading: "Vnitrni energie idealniho plynu",
        body: `Vnitrni energie idealniho plynu zavisi **pouze na teplote**:

$$\\boxed{U = n C_V T}$$

kde $C_V$ je molarni tepelna kapacita pri konstantnim objemu. Ta zavisi na poctu **stupnu volnosti** $f$ molekul:

$$C_V = \\frac{f}{2} R, \\qquad C_p = C_V + R = \\frac{f+2}{2} R, \\qquad \\gamma = \\frac{C_p}{C_V} = \\frac{f+2}{f}$$

$$\\begin{array}{l|c|c|c|c} \\text{Typ plynu} & f & C_V & C_p & \\gamma \\\\ \\hline \\text{Jednoatomovy (He, Ar)} & 3 & \\frac{3}{2}R & \\frac{5}{2}R & \\frac{5}{3} \\approx 1{,}67 \\\\ \\text{Dvouatomovy (N}_2\\text{, O}_2\\text{)} & 5 & \\frac{5}{2}R & \\frac{7}{2}R & \\frac{7}{5} = 1{,}4 \\end{array}$$

kde $R = 8{,}314$ J/(mol$\\cdot$K).

> [!key] Zmena vnitrni energie: $\\Delta U = n C_V \\Delta T$. Plati **vzdy**, bez ohledu na typ deje!`,
        examples: [
          {
            problem: "Kolik je vnitrni energie $2$ molu jednoatomoveho idealniho plynu pri teplote $300$ K?",
            solution: `$$U = n C_V T = 2 \\cdot \\frac{3}{2} \\cdot 8{,}314 \\cdot 300 = 2 \\cdot 12{,}471 \\cdot 300 = \\color{#16a34a}{7483 \\text{ J} \\approx 7{,}5 \\text{ kJ}}$$`,
          },
        ],
      },
      {
        heading: "Prvni zakon v jednotlivych dejich",
        body: `Pro kazdy typ deje plati prvni zakon $Q = \\Delta U + W$, ale ruzne veliciny se zjednodusi:

**Izotermicky dej** ($T = \\text{konst.}$, $\\Delta T = 0$):
$$\\Delta U = 0 \\qquad \\Rightarrow \\qquad Q = W = nRT \\ln\\frac{V_2}{V_1}$$

**Izobaricky dej** ($p = \\text{konst.}$):
$$W = nR\\Delta T, \\qquad Q = nC_p \\Delta T, \\qquad \\Delta U = nC_V \\Delta T$$

**Izochoricky dej** ($V = \\text{konst.}$, $\\Delta V = 0$):
$$W = 0 \\qquad \\Rightarrow \\qquad Q = \\Delta U = nC_V \\Delta T$$

**Adiabatickyke dej** ($Q = 0$):
$$W = -\\Delta U = nC_V(T_1 - T_2)$$

> [!info] Zapamatujte si: u izotermickeho deje se veskere teplo meni na praci, u izochorickeho se veskere teplo meni na vnitrni energii, u adiabatickeho se prace bere z vnitrni energie.

$$\\begin{array}{l|c|c|c} \\text{Dej} & Q & W & \\Delta U \\\\ \\hline \\text{Izotermicky} & nRT\\ln(V_2/V_1) & nRT\\ln(V_2/V_1) & 0 \\\\ \\text{Izobaricky} & nC_p\\Delta T & nR\\Delta T & nC_V\\Delta T \\\\ \\text{Izochoricky} & nC_V\\Delta T & 0 & nC_V\\Delta T \\\\ \\text{Adiabatickyke} & 0 & nC_V(T_1 - T_2) & nC_V(T_2 - T_1) \\end{array}$$`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "all",
          },
          caption: "Porovnejte ruzne deje v p-V diagramu — plocha pod krivkou = prace.",
        },
      },
      {
        heading: "Tepelne stroje a ucinnost",
        body: `Tepelny motor pracuje v cyklu: prijima teplo $Q_H$ z horkeho zdroje, cast premeni na praci $W$ a zbytek $Q_C$ odevzda studenemu zdroji.

$$\\boxed{\\eta = \\frac{W}{Q_H} = \\frac{Q_H - Q_C}{Q_H} = 1 - \\frac{Q_C}{Q_H}}$$

- $\\eta$ je **ucinnost** motoru (bezrozmerna, casto v $\\%$)
- $Q_H$ je teplo prijate z horkeho zdroje
- $Q_C$ je teplo odevzdane studenemu zdroji
- $W = Q_H - Q_C$ je uzitecna prace

> [!key] Zadny tepelny motor nemuze mit ucinnost $100\\%$ (druhy zakon). Cast tepla se **vzdy** musi odvest do studeného zdroje.

Typicke ucinnosti:
$$\\begin{array}{l|c} \\text{Motor} & \\eta \\\\ \\hline \\text{Parni stroj} & 10{-}20\\% \\\\ \\text{Benzinovy motor} & 25{-}35\\% \\\\ \\text{Dieselovy motor} & 35{-}45\\% \\\\ \\text{Plynova turbina} & 30{-}40\\% \\end{array}$$`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `$3$ moly dvouatomoveho idealniho plynu ($C_V = \\frac{5}{2}R$) pri pocatecni teplote $300$ K projdou izobarickym ohrevem na teplotu $500$ K. Spocitejte $Q$, $W$ a $\\Delta U$. ($R = 8{,}314$ J/(mol$\\cdot$K))`,
    steps: [
      {
        instruction: "Urcete molarni tepelne kapacity",
        math: "$C_V = \\frac{5}{2}R = \\frac{5}{2} \\cdot 8{,}314 = 20{,}785 \\text{ J/(mol} \\cdot \\text{K)}$\n$C_p = C_V + R = 20{,}785 + 8{,}314 = 29{,}099 \\text{ J/(mol} \\cdot \\text{K)}$",
        explanation: "Pro dvouatomovy plyn mame $f = 5$ stupnu volnosti.",
      },
      {
        instruction: "Spocitejte zmenu teploty",
        math: "$\\Delta T = T_2 - T_1 = 500 - 300 = 200 \\text{ K}$",
        explanation: "Teplota vzrostla o $200$ K.",
      },
      {
        instruction: "Spocitejte teplo dodane pri izobarickem deji",
        math: "$Q = nC_p \\Delta T = 3 \\cdot 29{,}099 \\cdot 200 = 17\\,459 \\text{ J} \\approx 17{,}5 \\text{ kJ}$",
        explanation: "Pri konstantnim tlaku pouzivame $C_p$, protoze cast tepla jde na praci.",
      },
      {
        instruction: "Spocitejte praci",
        math: "$W = nR \\Delta T = 3 \\cdot 8{,}314 \\cdot 200 = 4988 \\text{ J} \\approx 5{,}0 \\text{ kJ}$",
        explanation: "Prace pri izobarickem deji je $W = nR\\Delta T = p\\Delta V$.",
      },
      {
        instruction: "Spocitejte zmenu vnitrni energie",
        math: "$\\Delta U = nC_V \\Delta T = 3 \\cdot 20{,}785 \\cdot 200 = 12\\,471 \\text{ J} \\approx 12{,}5 \\text{ kJ}$",
        explanation: "Overeni: $Q = \\Delta U + W = 12\\,471 + 4988 = 17\\,459$ J. Souhlasi!",
      },
    ],
    finalAnswer: "Dodane teplo $Q \\approx 17{,}5$ kJ, vykonana prace $W \\approx 5{,}0$ kJ, zmena vnitrni energie $\\Delta U \\approx 12{,}5$ kJ.",
  },
  practiceProblems: [
    {
      id: "zt-i-1",
      problemStatement: "$2$ moly jednoatomoveho idealniho plynu ($C_V = \\frac{3}{2}R$) se izochoricky ohreji z $300$ K na $600$ K. Kolik tepla musi plyn prijmout? ($R = 8{,}314$ J/(mol$\\cdot$K))",
      expectedAnswer: "7483",
      acceptableAnswers: ["7483", "7483 J", "7,5 kJ", "7.5 kJ"],
      numericTolerance: 10,
      hints: [
        "Pri izochorickem deji je $W = 0$, takze $Q = \\Delta U = nC_V \\Delta T$.",
        "$Q = 2 \\cdot \\frac{3}{2} \\cdot 8{,}314 \\cdot 300$",
      ],
      solutionExplanation: `$$Q = nC_V \\Delta T = 2 \\cdot \\frac{3}{2} \\cdot 8{,}314 \\cdot (600 - 300) = 2 \\cdot 12{,}471 \\cdot 300 = 7483 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-i-2",
      problemStatement: "$1$ mol idealniho plynu se izotermicky rozpina pri teplote $400$ K z objemu $V_1 = 10$ l na $V_2 = 30$ l. Jakou praci vykona? ($R = 8{,}314$ J/(mol$\\cdot$K), $\\ln 3 \\approx 1{,}099$)",
      expectedAnswer: "3654",
      acceptableAnswers: ["3654", "3654 J", "3,65 kJ", "3.65 kJ"],
      numericTolerance: 10,
      hints: [
        "Izotermicky: $W = nRT \\ln(V_2/V_1)$.",
        "$W = 1 \\cdot 8{,}314 \\cdot 400 \\cdot \\ln 3$",
      ],
      solutionExplanation: `$$W = nRT \\ln\\frac{V_2}{V_1} = 1 \\cdot 8{,}314 \\cdot 400 \\cdot \\ln 3 = 3326 \\cdot 1{,}099 = 3654 \\text{ J}$$
Protoze $\\Delta U = 0$ (izotermicky), plati $Q = W = 3654$ J.`,
      difficulty: "medium" as const,
    },
    {
      id: "zt-i-3",
      problemStatement: "$2$ moly dvouatomoveho plynu ($C_V = \\frac{5}{2}R$) se adiabatickyke rozpinaji a teplota klesne z $500$ K na $300$ K. Jakou praci plyn vykona? ($R = 8{,}314$ J/(mol$\\cdot$K))",
      expectedAnswer: "8314",
      acceptableAnswers: ["8314", "8314 J", "8,3 kJ", "8.3 kJ"],
      numericTolerance: 10,
      hints: [
        "Adiabatickyke: $Q = 0$, takze $W = -\\Delta U = nC_V(T_1 - T_2)$.",
        "$W = 2 \\cdot \\frac{5}{2} \\cdot 8{,}314 \\cdot (500 - 300)$",
      ],
      solutionExplanation: `$$W = nC_V(T_1 - T_2) = 2 \\cdot \\frac{5}{2} \\cdot 8{,}314 \\cdot (500 - 300) = 5 \\cdot 8{,}314 \\cdot 200 = 8314 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "zt-i-4",
      problemStatement: "Tepelny motor prijme z horkeho zdroje $10$ kJ tepla a odevzda $6$ kJ do studeného zdroje. Jaka je ucinnost motoru v procentech?",
      expectedAnswer: "40",
      acceptableAnswers: ["40", "40 %", "40%", "0.4", "0,4"],
      hints: [
        "$\\eta = 1 - Q_C / Q_H$.",
        "$\\eta = 1 - 6/10 = 1 - 0{,}6$",
      ],
      solutionExplanation: `$$\\eta = 1 - \\frac{Q_C}{Q_H} = 1 - \\frac{6}{10} = 1 - 0{,}6 = 0{,}4 = 40\\%$$`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-i-5",
      problemStatement: "$4$ moly dvouatomoveho plynu projdou izobarickym ohrevem z $250$ K na $450$ K. Spocitejte vykonanou praci $W$. ($R = 8{,}314$ J/(mol$\\cdot$K))",
      expectedAnswer: "6651",
      acceptableAnswers: ["6651", "6651 J", "6,65 kJ", "6.65 kJ"],
      numericTolerance: 10,
      hints: [
        "Izobaricky: $W = nR\\Delta T$.",
        "$W = 4 \\cdot 8{,}314 \\cdot (450 - 250)$",
      ],
      solutionExplanation: `$$W = nR \\Delta T = 4 \\cdot 8{,}314 \\cdot 200 = 6651 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Vnitrni energie idealniho plynu: $U = nC_V T$, zmena $\\Delta U = nC_V \\Delta T$ plati **vzdy**.",
      "Stupne volnosti: jednoatomovy $f=3$ ($C_V = \\frac{3}{2}R$), dvouatomovy $f=5$ ($C_V = \\frac{5}{2}R$).",
      "Izotermicky: $\\Delta U = 0$, $Q = W = nRT\\ln(V_2/V_1)$.",
      "Izobaricky: $Q = nC_p\\Delta T$, $W = nR\\Delta T$. Izochoricky: $W = 0$, $Q = nC_V\\Delta T$.",
      "Ucinnost motoru: $\\eta = W/Q_H = 1 - Q_C/Q_H$ — vzdy mensi nez $100\\%$.",
    ],
    nextTopicSuggestion: "Skvele! Pokracujte na pokrocilou uroven — Carnotuv cyklus, entropie a absolutni nula.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Carnot, entropy, free energy, 3rd law
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Zakony termodynamiky — Carnotuv cyklus, entropie a treti zakon",
    sections: [
      {
        heading: "Carnotuv cyklus — maximalni mozna ucinnost",
        body: `Carnotuv cyklus je **idealni** tepelny cyklus slozeny ze ctyr reverziblilnich deju:

1. **Izotermicka expanze** pri $T_H$ — plyn prijima teplo $Q_H$
2. **Adiabaticka expanze** — plyn se ochlazuje z $T_H$ na $T_C$
3. **Izotermicka komprese** pri $T_C$ — plyn odevzdava teplo $Q_C$
4. **Adiabaticka komprese** — plyn se ohriva z $T_C$ na $T_H$

Ucinnost Carnotova cyklu:

$$\\boxed{\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H}}$$

kde $T_C$ a $T_H$ jsou teploty v **kelvinech**.

> [!key] Carnotova ucinnost je **maximalni mozna** ucinnost pro jakykoli tepelny motor pracujici mezi teplotami $T_H$ a $T_C$. Zadny realny motor nemuze byt ucinnejsi!

$$\\begin{array}{c|c|c} T_H & T_C & \\eta_{\\text{Carnot}} \\\\ \\hline 500 \\text{ K} & 300 \\text{ K} & 40\\% \\\\ 600 \\text{ K} & 300 \\text{ K} & 50\\% \\\\ 1000 \\text{ K} & 300 \\text{ K} & 70\\% \\\\ 800 \\text{ K} & 200 \\text{ K} & 75\\% \\end{array}$$

> [!tip] Cim vetsi teplotni rozdil, tim vyssi ucinnost. Proto se snazime mit horky zdroj co nejteplejsi a studeny zdroj co nejchladnejsi.`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "all",
          },
          caption: "Carnotuv cyklus v p-V diagramu: dve izotermy a dve adiabaty. Plocha uvnitr = uzitecna prace.",
        },
        examples: [
          {
            problem: "Jaka je maximalni ucinnost tepelneho motoru pracujiciho mezi teplotami $227$ $\\degree$C a $27$ $\\degree$C?",
            solution: `Prevedeme na kelviny: $T_H = 227 + 273 = 500$ K, $T_C = 27 + 273 = 300$ K.
$$\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{500} = 1 - 0{,}6 = \\color{#16a34a}{0{,}4 = 40\\%}$$`,
          },
        ],
      },
      {
        heading: "Entropie — mira neusporadanosti",
        body: `Entropie $S$ je stavova velicina, ktera kvantifikuje "neusporadanost" systemu. Pro reverzibilni dej:

$$\\boxed{\\Delta S = \\frac{Q_{\\text{rev}}}{T}}$$

Pro obecny dej idealniho plynu:

$$\\boxed{\\Delta S = nC_V \\ln\\frac{T_2}{T_1} + nR \\ln\\frac{V_2}{V_1}}$$

Druhy zakon v reci entropie:

$$\\boxed{\\Delta S_{\\text{vesmiru}} \\geq 0}$$

- **Reverzibilni** deje: $\\Delta S_{\\text{vesmiru}} = 0$ (idealní, nedosazitelne)
- **Irreverzibilni** deje: $\\Delta S_{\\text{vesmiru}} > 0$ (vsechny realne deje)

Entropie v jednotlivych dejich:
- Izotermicky: $\\Delta S = \\frac{Q}{T} = nR \\ln\\frac{V_2}{V_1}$
- Izobaricky: $\\Delta S = nC_p \\ln\\frac{T_2}{T_1}$
- Izochoricky: $\\Delta S = nC_V \\ln\\frac{T_2}{T_1}$
- Adiabatickyke (reverzibilni): $\\Delta S = 0$ (izoentropicky dej)

> [!key] Entropie izolované soustavy nikdy neklesa. Spontanni deje vzdy zvysuji celkovou entropii vesmiru.`,
        examples: [
          {
            problem: "Jaká je zmena entropie $1$ molu idealniho plynu pri izotermicke expanzi na dvojnasobny objem pri $T = 300$ K?",
            solution: `$$\\Delta S = nR \\ln\\frac{V_2}{V_1} = 1 \\cdot 8{,}314 \\cdot \\ln 2 = 8{,}314 \\cdot 0{,}693 = \\color{#16a34a}{5{,}76 \\text{ J/K}}$$`,
          },
        ],
      },
      {
        heading: "Volna energie a Gibbsova energie",
        body: `Pro urceni spontannosti deje pri dane teplote a objemu (resp. tlaku) zavadime:

**Helmholtzova volna energie** (konstantni $T$, $V$):
$$\\boxed{F = U - TS}$$

**Gibbsova volna energie** (konstantni $T$, $p$):
$$\\boxed{G = H - TS}$$

kde $H = U + pV$ je entalpie.

Dej je spontanni, pokud:
- $\\Delta F < 0$ (pri konstantnim $T$ a $V$)
- $\\Delta G < 0$ (pri konstantnim $T$ a $p$)

> [!info] V chemii se nejcasteji pouziva Gibbsova energie, protoze vetsina reakci probiha pri konstantnim tlaku (atmosfericky tlak).

Pri konstantni teplote:
$$\\Delta G = \\Delta H - T \\Delta S$$

Dej je spontanni ($\\Delta G < 0$), kdyz:
- $\\Delta H < 0$ a $\\Delta S > 0$ (vzdy spontanni)
- $\\Delta H < 0$ a $\\Delta S < 0$ (spontanni pri nizkych teplotach)
- $\\Delta H > 0$ a $\\Delta S > 0$ (spontanni pri vysokych teplotach)`,
      },
      {
        heading: "Treti zakon a absolutni nula",
        body: `**Treti zakon termodynamiky** (Nernstuv teorem):

$$\\boxed{\\lim_{T \\to 0} S = 0}$$

Kdyz se teplota blizi absolutni nule ($0$ K $= -273{,}15$ $\\degree$C):
- Entropie dokonaleho krystalu se blizi nule
- Vsechny castice jsou v zakladnim stavu — maximalni usporadanost

Dalsni dusledek:

> [!key] **Absolutni nuly nelze dosahnout** konecnym poctem kroku. Muzeme se k ni pouze priblizovat, ale nikdy ji nedosahneme.

V praxi:
- Laboratore dosahuji teplot radove $10^{-9}$ K (nanokelviny)
- Pri velmi nizkych teplotach se objevuji kvantove jevy: supravodivost, supratekutost
- Treti zakon umoznuje urcovat **absolutni** hodnoty entropie (nejen zmeny)`,
      },
      {
        heading: "Chladnicky a tepelna cerpadla",
        body: `Chladnicka a tepelne cerpadlo jsou **obracene tepelne motory** — odbiraji teplo ze studeneho zdroje a prenaseji ho do horkeho.

**Chladnicka** — chceme odebrat teplo $Q_C$ ze studeneho prostoru:
$$\\boxed{\\text{COP}_{\\text{chladicka}} = \\frac{Q_C}{W} = \\frac{Q_C}{Q_H - Q_C}}$$

**Tepelne cerpadlo** — chceme dodat teplo $Q_H$ do horkeho prostoru:
$$\\boxed{\\text{COP}_{\\text{cerpadlo}} = \\frac{Q_H}{W} = \\frac{Q_H}{Q_H - Q_C}}$$

Maximalni (Carnotuv) COP:
$$\\text{COP}_{\\text{chladicka, max}} = \\frac{T_C}{T_H - T_C}, \\qquad \\text{COP}_{\\text{cerpadlo, max}} = \\frac{T_H}{T_H - T_C}$$

> [!tip] COP tepelného cerpadla je vzdy vetsi nez $1$ — dodavame mensí praci nez kolik tepla preneseme. Proto jsou tepelna cerpadla efektivnejsi nez prime vytapeni!

$$\\begin{array}{l|c|c} & \\text{Chladnicka} & \\text{Tepelne cerpadlo} \\\\ \\hline \\text{Cil} & \\text{odebrat } Q_C & \\text{dodat } Q_H \\\\ \\text{COP} & Q_C / W & Q_H / W \\\\ \\text{Typicky COP} & 2{-}5 & 3{-}5 \\end{array}$$`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Carnotuv motor pracuje mezi teplotami $T_H = 600$ K a $T_C = 300$ K. Z horkeho zdroje prijme $Q_H = 2000$ J tepla za jeden cyklus. Spocitejte: (a) ucinnost, (b) vykonanou praci, (c) teplo odevzdane studenemu zdroji, (d) zmenu entropie horkeho a studeného zdroje.`,
    steps: [
      {
        instruction: "Spocitejte Carnotovu ucinnost",
        math: "$\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 1 - 0{,}5 = 0{,}5 = 50\\%$",
        explanation: "Maximalni ucinnost pri techto teplotach je $50\\%$.",
      },
      {
        instruction: "Spocitejte vykonanou praci",
        math: "$W = \\eta \\cdot Q_H = 0{,}5 \\cdot 2000 = 1000 \\text{ J}$",
        explanation: "Polovina prijateho tepla se premeni na praci.",
      },
      {
        instruction: "Spocitejte teplo odevzdane studenemu zdroji",
        math: "$Q_C = Q_H - W = 2000 - 1000 = 1000 \\text{ J}$",
        explanation: "Druha polovina se odevzda studenemu zdroji.",
      },
      {
        instruction: "Spocitejte zmeny entropie",
        math: "$\\Delta S_H = -\\frac{Q_H}{T_H} = -\\frac{2000}{600} = -3{,}33 \\text{ J/K}$\n$\\Delta S_C = +\\frac{Q_C}{T_C} = +\\frac{1000}{300} = +3{,}33 \\text{ J/K}$",
        explanation: "Horky zdroj ztráci entropii (odevzdava teplo), studeny zdroj ji ziskava.",
      },
      {
        instruction: "Overeni: celkova zmena entropie",
        math: "$\\Delta S_{\\text{celk}} = \\Delta S_H + \\Delta S_C = -3{,}33 + 3{,}33 = 0 \\text{ J/K}$",
        explanation: "Carnotuv cyklus je reverzibilni, proto je celkova zmena entropie nulova. U realneho motoru by byla kladna.",
      },
    ],
    finalAnswer: "Ucinnost $\\eta = 50\\%$, prace $W = 1000$ J, teplo do studeneho zdroje $Q_C = 1000$ J, celkova zmena entropie $\\Delta S = 0$ (reverzibilni cyklus).",
  },
  practiceProblems: [
    {
      id: "zt-a-1",
      problemStatement: "Elektrarena pracuje s parou o teplote $540$ $\\degree$C a odpadni teplo odvadi do reky o teplote $27$ $\\degree$C. Jaka je maximalni (Carnotova) ucinnost teto elektrarny?",
      expectedAnswer: "63",
      acceptableAnswers: ["63", "63 %", "63%", "0.63", "0,63"],
      numericTolerance: 1,
      hints: [
        "Prevedte na kelviny: $T_H = 540 + 273 = 813$ K, $T_C = 27 + 273 = 300$ K.",
        "$\\eta = 1 - T_C/T_H = 1 - 300/813$",
      ],
      solutionExplanation: `$$T_H = 540 + 273 = 813 \\text{ K}, \\quad T_C = 27 + 273 = 300 \\text{ K}$$
$$\\eta = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{813} = 1 - 0{,}369 = 0{,}631 \\approx 63\\%$$`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-a-2",
      problemStatement: "Spocitejte zmenu entropie $2$ molu jednoatomoveho idealniho plynu ($C_V = \\frac{3}{2}R$), ktery se ohreje z $300$ K na $600$ K pri konstantnim objemu. ($R = 8{,}314$ J/(mol$\\cdot$K), $\\ln 2 \\approx 0{,}693$)",
      expectedAnswer: "17.3",
      acceptableAnswers: ["17.3", "17,3", "17.3 J/K", "17,3 J/K"],
      numericTolerance: 0.2,
      hints: [
        "Izochoricky: $\\Delta S = nC_V \\ln(T_2/T_1)$.",
        "$\\Delta S = 2 \\cdot \\frac{3}{2} \\cdot 8{,}314 \\cdot \\ln(600/300)$",
      ],
      solutionExplanation: `$$\\Delta S = nC_V \\ln\\frac{T_2}{T_1} = 2 \\cdot \\frac{3}{2} \\cdot 8{,}314 \\cdot \\ln 2 = 24{,}942 \\cdot 0{,}693 = 17{,}3 \\text{ J/K}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "zt-a-3",
      problemStatement: "Carnotuv motor s ucinnosti $40\\%$ vykona za jeden cyklus praci $800$ J. Kolik tepla prijme z horkeho zdroje a kolik odevzda studenemu zdroji?",
      expectedAnswer: "2000",
      acceptableAnswers: ["2000", "2000 J", "2000 a 1200", "Q_H = 2000 J, Q_C = 1200 J"],
      hints: [
        "$\\eta = W/Q_H$, takze $Q_H = W/\\eta$.",
        "$Q_H = 800 / 0{,}4 = 2000$ J, pak $Q_C = Q_H - W$.",
      ],
      solutionExplanation: `$$Q_H = \\frac{W}{\\eta} = \\frac{800}{0{,}4} = 2000 \\text{ J}$$
$$Q_C = Q_H - W = 2000 - 800 = 1200 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "zt-a-4",
      problemStatement: "Tepelne cerpadlo prenasi teplo z venkovniho prostredi ($T_C = -3$ $\\degree$C) do domu ($T_H = 27$ $\\degree$C). Jaky je maximalni COP tohoto tepelného cerpadla?",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "10.0", "10,0"],
      hints: [
        "Prevedte na kelviny: $T_C = 270$ K, $T_H = 300$ K.",
        "$\\text{COP}_{\\text{max}} = T_H / (T_H - T_C)$",
      ],
      solutionExplanation: `$$T_C = -3 + 273 = 270 \\text{ K}, \\quad T_H = 27 + 273 = 300 \\text{ K}$$
$$\\text{COP}_{\\text{max}} = \\frac{T_H}{T_H - T_C} = \\frac{300}{300 - 270} = \\frac{300}{30} = 10$$
To znamena, ze na kazdy $1$ J elektricke prace cerpadlo prenese $10$ J tepla do domu.`,
      difficulty: "medium" as const,
    },
    {
      id: "zt-a-5",
      problemStatement: "$1$ mol idealniho plynu ($C_V = \\frac{5}{2}R$) se rozpina z pocatecniho stavu ($T_1 = 400$ K, $V_1 = 10$ l) do koncoveho stavu ($T_2 = 300$ K, $V_2 = 30$ l). Spocitejte celkovou zmenu entropie plynu. ($R = 8{,}314$ J/(mol$\\cdot$K), $\\ln 3 \\approx 1{,}099$, $\\ln(3/4) \\approx -0{,}288$)",
      expectedAnswer: "3.14",
      acceptableAnswers: ["3.14", "3,14", "3.1", "3,1", "3.14 J/K", "3,14 J/K"],
      numericTolerance: 0.1,
      hints: [
        "$\\Delta S = nC_V \\ln(T_2/T_1) + nR \\ln(V_2/V_1)$.",
        "$\\Delta S = 1 \\cdot \\frac{5}{2} \\cdot 8{,}314 \\cdot \\ln(300/400) + 1 \\cdot 8{,}314 \\cdot \\ln(30/10)$",
      ],
      solutionExplanation: `$$\\Delta S = nC_V \\ln\\frac{T_2}{T_1} + nR \\ln\\frac{V_2}{V_1}$$
$$= 1 \\cdot \\frac{5}{2} \\cdot 8{,}314 \\cdot \\ln\\frac{3}{4} + 1 \\cdot 8{,}314 \\cdot \\ln 3$$
$$= 20{,}785 \\cdot (-0{,}288) + 8{,}314 \\cdot 1{,}099$$
$$= -5{,}986 + 9{,}137 = 3{,}15 \\text{ J/K}$$
Entropie vzrostla — dej je spontanni.`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Carnotova ucinnost**: $\\eta = 1 - T_C/T_H$ — maximalni mozna ucinnost tepelneho motoru.",
      "**Entropie**: $\\Delta S = Q_{\\text{rev}}/T$, obecne $\\Delta S = nC_V \\ln(T_2/T_1) + nR \\ln(V_2/V_1)$.",
      "**Druhy zakon** (entropicka formulace): $\\Delta S_{\\text{vesmiru}} \\geq 0$ — entropie izolované soustavy nikdy neklesa.",
      "**Treti zakon**: Pri $T \\to 0$ je $S \\to 0$. Absolutni nuly nelze dosahnout.",
      "**Tepelne cerpadlo**: COP $= Q_H/W > 1$ — prenasi vice tepla nez spotrebuje prace.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste zakony termodynamiky. Pokracujte na skupenstvi a fazove prechody, kde se entropie a Gibbsova energie uplatni v praxi.",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Zakony termodynamiky\n");

  for (const { label, content, variant } of difficulties) {
    const id = crypto.randomUUID();

    const existing = await client.execute({
      sql: `SELECT id FROM lesson_cache WHERE topic_id = ? AND difficulty = ? AND variant = ?`,
      args: [TOPIC_ID, label, variant],
    });

    if (existing.rows.length > 0) {
      await client.execute({
        sql: `UPDATE lesson_cache SET content = ?, model = ?, prompt_version = ? WHERE id = ?`,
        args: [JSON.stringify(content), "hand-crafted-v2", "v2-brilliant", existing.rows[0].id as string],
      });
      console.log(`  🔄 ${label} — updated`);
      continue;
    }

    await client.execute({
      sql: `INSERT INTO lesson_cache (id, topic_id, difficulty, variant, content, model, prompt_version, generated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      args: [id, TOPIC_ID, label, variant, JSON.stringify(content), "hand-crafted-v2", "v2-brilliant"],
    });

    console.log(`  ✅ ${label} (${id})`);
  }

  console.log("\n🎉 Done! Brilliant-style Zakony termodynamiky lessons seeded.\n");
}

main().catch(console.error);
