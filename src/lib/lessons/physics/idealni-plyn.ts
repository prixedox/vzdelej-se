import type { LessonContent } from "@/types/lesson";

export const idealniPlynBeginner: LessonContent = {
  conceptExplanation: {
    title: "Idealni plyn — jak se chovaji plyny kolem nas",
    sections: [
      {
        heading: "Co je idealni plyn?",
        body: `V realnem svete jsou molekuly plynu slozite -- maji objem, prirazuji se, rotoji. Pro zjednoduseni pouzivame **model idealniho plynu**:

1. Molekuly jsou **bodove castice** (nemaji objem)
2. Mezi molekulami **nepusobi sily** (zadne prirazeni ani odpuzovani)
3. Srazky molekul jsou **dokonale pruzne** (neztraci se energie)
4. Molekuly se pohybuji **nahodne** vsemi smery

$$\\begin{array}{l|c|c} \\text{Vlastnost} & \\text{Realni plyn} & \\text{Idealni plyn} \\\\ \\hline \\text{Objem molekul} & \\text{nenulovy} & 0 \\\\ \\text{Mezimol. sily} & \\text{ano} & \\text{ne} \\\\ \\text{Srazky} & \\text{nepruzne} & \\text{pruzne} \\end{array}$$

> [!key] Model idealniho plynu funguje vyborne pro **ridke plyny** pri **vysokych teplotach** a **nizkych tlacich** -- tedy pro vetsinu beznych situaci!`,
        examples: [
          {
            problem: "Ktery z nasledujicich plynu se chova nejblize idealnimu plynu pri pokojove teplote: helium, vodni para, nebo butan?",
            solution: `**Helium** -- je to jednoatomovy vzacny plyn s velmi slabymi mezimolekulovymi silami. Cim jednodussi molekula a cim slabsi interakce, tim lepe plati model idealniho plynu.`,
          },
        ],
      },
      {
        heading: "Stavove veliciny plynu",
        body: `Stav plynu popisujeme ctyrmi velicninami:

| Velicina | Symbol | Jednotka | Popis |
|---|---|---|---|
| Tlak | $p$ | Pa (pascal) | Sila na plochu |
| Objem | $V$ | m$^3$ | Prostor, ktery plyn zaujima |
| Teplota | $T$ | K (kelvin) | Mira kinetricke energie molekul |
| Latkove mnozstvi | $n$ | mol | Pocet casric ($1$ mol $= 6{,}022 \\times 10^{23}$) |

Prevod teploty:
$$T \\text{ [K]} = t \\text{ [\\degree C]} + 273{,}15$$

> [!info] **Pozor na jednotky!** Teplota musi byt vzdy v kelvinech, tlak v pascalech. $1$ atm $= 101\\,325$ Pa, $1$ litr $= 10^{-3}$ m$^3$.`,
      },
      {
        heading: "Stavova rovnice idealniho plynu",
        body: `Vsechny stavove veliciny spojuje jeden kliccovy vztah:

$$\\boxed{pV = nRT}$$

- $R = 8{,}314$ J/(mol$\\cdot$K) je **univerzalni plynova konstanta**

Alternativni tvar (pro $N$ casric):
$$\\boxed{pV = NkT}$$

- $k = 1{,}38 \\times 10^{-23}$ J/K je **Boltzmannova konstanta**
- $N = n \\cdot N_A$ kde $N_A = 6{,}022 \\times 10^{23}$ mol$^{-1}$

$$\\begin{array}{l|c|c|c} \\text{Situace} & p \\text{ (kPa)} & V \\text{ (l)} & T \\text{ (K)} \\\\ \\hline \\text{Normalni podminky} & 101{,}3 & 22{,}4 \\text{ (1 mol)} & 273 \\\\ \\text{Nahustenya pneumatika} & 250 & 30 & 300 \\\\ \\text{Vakuova banka} & 0{,}001 & 1 & 300 \\end{array}$$

> [!key] $pV = nRT$ je **nejdulezitejsi rovnice termodynamiky plynu**. Pokud znate tri veliciny, ctvrta je urcena!`,
        examples: [
          {
            problem: "Jaky objem zaujima $1$ mol idealniho plynu pri $0$ $\\degree$C a tlaku $101{,}325$ kPa?",
            solution: `$$V = \\frac{nRT}{p} = \\frac{1 \\cdot 8{,}314 \\cdot 273{,}15}{101\\,325} = \\color{#16a34a}{0{,}02241 \\text{ m}^3 = 22{,}41 \\text{ l}}$$
To je tzv. **molarni objem** za normalnich podminek.`,
          },
        ],
      },
      {
        heading: "Jednoduche termodynamicke deje",
        body: `Kdyz menime stav plynu, muzeme drzet jednu velicinu konstantni:

**Izotermicky dej** ($T = \\text{konst.}$):
$$pV = \\text{konst.} \\quad \\Rightarrow \\quad p_1 V_1 = p_2 V_2$$
Kdyz zmensite objem, tlak vzroste (pumpicka!).

**Izobaricky dej** ($p = \\text{konst.}$):
$$\\frac{V}{T} = \\text{konst.} \\quad \\Rightarrow \\quad \\frac{V_1}{T_1} = \\frac{V_2}{T_2}$$
Kdyz zahrejete plyn, roztahne se.

**Izochoricky dej** ($V = \\text{konst.}$):
$$\\frac{p}{T} = \\text{konst.} \\quad \\Rightarrow \\quad \\frac{p_1}{T_1} = \\frac{p_2}{T_2}$$
Kdyz zahrejete plyn v uzavrenei nadobe, tlak vzroste.

> [!tip] Zapamatujte si: pri izotermickem deji se **objem a tlak** meni opacne (Boyleuv zakon), pri izobarickem se **objem a teplota** meni stejne (Charlesuv zakon).`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "all",
            defaultPressure: 100,
            defaultVolume: 1,
            defaultTemperature: 300,
            showWork: false,
          },
          caption: "Prepinajte mezi izotermickym, izobarickym a izochorickym dejem -- sledujte, jak se meni p-V diagram!",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `V lahvi o objemu $2$ litry je vzduch pri teplote $20$ $\\degree$C a tlaku $100$ kPa. Lahev zahrejeme na $80$ $\\degree$C (objem se nemeni). Jaky bude tlak po zahrati?`,
    steps: [
      {
        instruction: "Identifikujte typ deje",
        math: "$V = \\text{konst.} \\Rightarrow \\text{izochoricky dej}$",
        explanation: "Lahev je tuha -- objem se nemeni, jde o izochoricky dej.",
      },
      {
        instruction: "Prevedte teploty na kelviny",
        math: "$T_1 = 20 + 273 = 293 \\text{ K}, \\quad T_2 = 80 + 273 = 353 \\text{ K}$",
        explanation: "Teploty musi byt v kelvinech!",
      },
      {
        instruction: "Zapiste vztah pro izochoricky dej",
        math: "$\\frac{p_1}{T_1} = \\frac{p_2}{T_2}$",
        explanation: "Pri konstantnim objemu je pomer tlaku a teploty konstantni.",
      },
      {
        instruction: "Vyjadrete a vypocitejte $p_2$",
        math: "$p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 100 \\cdot \\frac{353}{293} = 120{,}5 \\text{ kPa}$",
        explanation: "Tlak vzrostl o asi $20\\%$ pri zahrati o $60$ $\\degree$C.",
      },
    ],
    finalAnswer: "Tlak v lahvi po zahrati na $80$ $\\degree$C bude $p_2 \\approx 120{,}5$ kPa.",
  },
  practiceProblems: [
    {
      id: "ip-b-1",
      problemStatement: "Jaky objem zaujima $2$ moly idealniho plynu pri teplote $300$ K a tlaku $200$ kPa?",
      expectedAnswer: "0.025",
      acceptableAnswers: ["0.025", "0,025", "0.025 m^3", "0,025 m^3", "25 l", "24.9", "24,9"],
      numericTolerance: 0.002,
      hints: [
        "Pouzijte $V = nRT/p$.",
        "$V = \\frac{2 \\cdot 8{,}314 \\cdot 300}{200\\,000}$",
      ],
      solutionExplanation: `$$V = \\frac{nRT}{p} = \\frac{2 \\cdot 8{,}314 \\cdot 300}{200\\,000} = \\frac{4988{,}4}{200\\,000} = 0{,}0249 \\text{ m}^3 \\approx 24{,}9 \\text{ l}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ip-b-2",
      problemStatement: "Plyn pri tlaku $150$ kPa zaujima objem $4$ litry. Izotermicky ho stlacime na $2$ litry. Jaky bude vysledny tlak?",
      expectedAnswer: "300",
      acceptableAnswers: ["300", "300 kPa"],
      hints: [
        "Izotermicky dej: $p_1 V_1 = p_2 V_2$.",
        "$p_2 = p_1 \\cdot V_1 / V_2 = 150 \\cdot 4/2$",
      ],
      solutionExplanation: `$$p_2 = p_1 \\cdot \\frac{V_1}{V_2} = 150 \\cdot \\frac{4}{2} = 300 \\text{ kPa}$$
Zmensenui objemu na polovinu zdvojnasobi tlak.`,
      difficulty: "easy" as const,
    },
    {
      id: "ip-b-3",
      problemStatement: "Balon naplneny plynem ma pri $20$ $\\degree$C objem $3$ litry. Na jakou teplotu (v $\\degree$C) musime plyn zahrat, aby se objem zdvojnasobil na $6$ litru? (Tlak je konstantni.)",
      expectedAnswer: "313",
      acceptableAnswers: ["313", "313 °C", "313 stupnu", "586 K"],
      numericTolerance: 2,
      hints: [
        "Izobaricky dej: $V_1/T_1 = V_2/T_2$.",
        "$T_1 = 293$ K. $T_2 = T_1 \\cdot V_2/V_1 = 293 \\cdot 2$.",
        "Nezapomente prevest zpet na $\\degree$C: $t = T - 273$.",
      ],
      solutionExplanation: `$$T_2 = T_1 \\cdot \\frac{V_2}{V_1} = 293 \\cdot \\frac{6}{3} = 586 \\text{ K}$$
$$t_2 = 586 - 273 = 313 \\text{ }\\degree\\text{C}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-b-4",
      problemStatement: "V nadobe o objemu $10$ litru je $0{,}5$ molu plynu pri teplote $27$ $\\degree$C. Jaky je tlak v nadobe?",
      expectedAnswer: "124700",
      acceptableAnswers: ["124700", "124700 Pa", "124.7 kPa", "124,7 kPa", "125 kPa"],
      numericTolerance: 500,
      hints: [
        "$p = nRT/V$. Nezapomente prevest jednotky!",
        "$T = 300$ K, $V = 0{,}01$ m$^3$.",
        "$p = \\frac{0{,}5 \\cdot 8{,}314 \\cdot 300}{0{,}01}$",
      ],
      solutionExplanation: `$$p = \\frac{nRT}{V} = \\frac{0{,}5 \\cdot 8{,}314 \\cdot 300}{0{,}01} = \\frac{1247{,}1}{0{,}01} = 124\\,710 \\text{ Pa} \\approx 124{,}7 \\text{ kPa}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-b-5",
      problemStatement: "Pneumatika ma pri $15$ $\\degree$C tlak $220$ kPa. Po jizde se vzduch v pneumatice zahral na $45$ $\\degree$C. Jaky je tlak? (Objem pneumatiky se nemeni.)",
      expectedAnswer: "243",
      acceptableAnswers: ["243", "243 kPa", "242.9", "242,9", "243.0", "243,0"],
      numericTolerance: 2,
      hints: [
        "Izochoricky dej: $p_1/T_1 = p_2/T_2$.",
        "$T_1 = 288$ K, $T_2 = 318$ K.",
        "$p_2 = 220 \\cdot 318/288$",
      ],
      solutionExplanation: `$$p_2 = p_1 \\cdot \\frac{T_2}{T_1} = 220 \\cdot \\frac{318}{288} = 220 \\cdot 1{,}104 \\approx 242{,}9 \\text{ kPa}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Idealni plyn**: bodove castice bez mezimolekulovych sil s pruznymi srazkami.",
      "**Stavova rovnice**: $pV = nRT$ kde $R = 8{,}314$ J/(mol$\\cdot$K). Alternativne $pV = NkT$.",
      "**Izotermicky dej** ($T$ = konst.): $p_1V_1 = p_2V_2$ -- tlak a objem jsou nepruimo umerne.",
      "**Izobaricky dej** ($p$ = konst.): $V_1/T_1 = V_2/T_2$ -- objem je primo umerny teplote.",
      "**Izochoricky dej** ($V$ = konst.): $p_1/T_1 = p_2/T_2$ -- tlak je primo umerny teplote.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na termodynamicke deje podrobneji -- naucte se pocitat praci plynu a rozlisovat adiabaticky dej.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Prace plynu, detailni deje, adiabaticky dej
// ═══════════════════════════════════════════════════════════════;

export const idealniPlynIntermediate: LessonContent = {
  conceptExplanation: {
    title: "Idealni plyn — prace a termodynamicke deje",
    sections: [
      {
        heading: "Prace plynu pri rozpinani",
        body: `Kdyz se plyn rozpina, kona **praci** proti okolnimu tlaku. Obecne:

$$\\boxed{W = \\int_{V_1}^{V_2} p \\, dV}$$

Prace je **plocha pod krivkou** v p-V diagramu.

Pro kazdy dej ma prace jiny tvar:

$$\\begin{array}{l|c|c} \\text{Dej} & \\text{Podminka} & W \\\\ \\hline \\text{Izobaricky} & p = \\text{konst.} & p \\cdot \\Delta V \\\\ \\text{Izotermicky} & T = \\text{konst.} & nRT \\ln\\frac{V_2}{V_1} \\\\ \\text{Izochoricky} & V = \\text{konst.} & 0 \\\\ \\text{Adiabaticky} & Q = 0 & \\frac{p_1V_1 - p_2V_2}{\\gamma - 1} \\end{array}$$

> [!key] Prace plynu **zavisi na typu deje** (ceste v p-V diagramu), nejen na pocatecnim a konecnem stavu!`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "isothermal",
            defaultPressure: 200,
            defaultVolume: 1,
            defaultTemperature: 300,
            showWork: true,
          },
          caption: "Sledujte vyznacenou plochu pod krivkou -- to je prace plynu! Porovnejte izotermicky a izobaricky dej.",
        },
      },
      {
        heading: "Izotermicky dej podrobne",
        body: `Pri izotermickem deji ($T = \\text{konst.}$) plati $pV = \\text{konst.}$, tedy:

$$p = \\frac{nRT}{V}$$

Krivka v p-V diagramu je **hyperbola** (izoterma).

**Prace:**
$$\\boxed{W = nRT \\ln\\frac{V_2}{V_1} = p_1 V_1 \\ln\\frac{V_2}{V_1}}$$

- Rozpinani ($V_2 > V_1$): $W > 0$ (plyn kona praci)
- Stlacovani ($V_2 < V_1$): $W < 0$ (prace se kona na plynu)

Protoze $\\Delta T = 0$, vnitrni energie se nemeni: $\\Delta U = 0$

Z 1. zakona termodynamiky: $Q = W$ -- veskerete dodane teplo se premeni na praci.

> [!info] Izotermicke rozpinani musi probihat **pomalu**, aby se plyn stihal vymenit teplo s okolim a udrzoval konstantni teplotu.`,
      },
      {
        heading: "Izobaricky a izochoricky dej",
        body: `**Izobaricky dej** ($p = \\text{konst.}$):

Prace je jednoducha -- obdelnik v p-V diagramu:
$$\\boxed{W = p \\cdot \\Delta V = p(V_2 - V_1)}$$

Z $pV = nRT$: $V = \\frac{nRT}{p}$, takze:
$$W = nR \\Delta T = nR(T_2 - T_1)$$

**Izochoricky dej** ($V = \\text{konst.}$):

$$\\boxed{W = 0}$$

Plyn se nerozpina, nekona praci. Veskere dodane teplo zvysuje vnitrni energii:
$$Q = \\Delta U = n C_V \\Delta T$$

kde $C_V$ je molarna tepelna kapacita pri konstantnim objemu.

> [!tip] Zapamatujte si: izochoricky dej je **svisla cara** v p-V diagramu (objem se nemeni), takze plocha pod ni je nulova = zadna prace.`,
      },
      {
        heading: "Adiabaticky dej",
        body: `Pri adiabatickem deji plyn **nevymenna teplo** s okolim: $Q = 0$.

$$\\boxed{pV^\\gamma = \\text{konst.}}$$
$$\\boxed{TV^{\\gamma - 1} = \\text{konst.}}$$

kde $\\gamma = C_p / C_V$ je **Poissonova konstanta** (adiabaticky exponent):

$$\\begin{array}{l|c|c|c} \\text{Typ plynu} & C_V & C_p & \\gamma \\\\ \\hline \\text{Jednoatomovy (He, Ar)} & \\frac{3}{2}R & \\frac{5}{2}R & \\frac{5}{3} \\approx 1{,}67 \\\\ \\text{Dvouatomovy (N}_2\\text{, O}_2\\text{)} & \\frac{5}{2}R & \\frac{7}{2}R & \\frac{7}{5} = 1{,}4 \\end{array}$$

**Prace pri adiabatickem deji:**
$$\\boxed{W = \\frac{p_1V_1 - p_2V_2}{\\gamma - 1} = \\frac{nR(T_1 - T_2)}{\\gamma - 1}}$$

Protoze $Q = 0$: $W = -\\Delta U$ -- plyn kona praci na ukor sve vnitrni energie (ochlazuje se).

> [!key] Adiabata je v p-V diagramu **strmejsi nez izoterma** -- pri rozpinani klesajui tlak i teplota zaroven!`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "adiabatic",
            defaultPressure: 200,
            defaultVolume: 1,
            defaultTemperature: 300,
            showWork: true,
          },
          caption: "Porovnejte sklon adiabaty a izotermy -- adiabata klesa rychleji, protoze plyn se pri rozpinani ochlazuje!",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `$2$ moly idealniho dvouatomoveho plynu ($\\gamma = 1{,}4$) pri pocatecni teplote $300$ K a tlaku $200$ kPa se adiabaricky rozpinaji na dvojnasobny objem. Jakou praci plyn vykona a jaka bude konecna teplota?`,
    steps: [
      {
        instruction: "Urcete pocatecni objem",
        math: "$V_1 = \\frac{nRT_1}{p_1} = \\frac{2 \\cdot 8{,}314 \\cdot 300}{200\\,000} = 0{,}02494 \\text{ m}^3$",
        explanation: "Ze stavove rovnice urcime pocatecni objem.",
      },
      {
        instruction: "Urcete konecny objem",
        math: "$V_2 = 2V_1 = 0{,}04989 \\text{ m}^3$",
        explanation: "Objem se zdvojnasobil.",
      },
      {
        instruction: "Vypocitejte konecnou teplotu z adiabatickeho vztahu",
        math: "$T_2 = T_1 \\cdot \\left(\\frac{V_1}{V_2}\\right)^{\\gamma - 1} = 300 \\cdot \\left(\\frac{1}{2}\\right)^{0{,}4}$",
        explanation: "Pouzijeme vztah $TV^{\\gamma-1} = \\text{konst.}$",
      },
      {
        instruction: "Dopocitejte",
        math: "$T_2 = 300 \\cdot 0{,}5^{0{,}4} = 300 \\cdot 0{,}758 = 227{,}4 \\text{ K}$",
        explanation: "Plyn se ochladil z $300$ K na asi $227$ K -- to je pokles o $73$ K!",
      },
      {
        instruction: "Vypocitejte praci",
        math: "$W = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{2 \\cdot 8{,}314 \\cdot (300 - 227{,}4)}{0{,}4} = \\frac{2 \\cdot 8{,}314 \\cdot 72{,}6}{0{,}4} = 3017 \\text{ J}$",
        explanation: "Plyn vykonal praci $\\approx 3{,}0$ kJ na ukor sve vnitrni energie.",
      },
    ],
    finalAnswer: "Konecna teplota je $T_2 \\approx 227$ K ($-46$ $\\degree$C) a plyn vykonal praci $W \\approx 3{,}0$ kJ.",
  },
  practiceProblems: [
    {
      id: "ip-i-1",
      problemStatement: "Idealni plyn ($1$ mol, $T = 400$ K) se izotermicky rozpina z objemu $5$ l na $15$ l. Jakou praci vykona? ($\\ln 3 \\approx 1{,}099$)",
      expectedAnswer: "3653",
      acceptableAnswers: ["3653", "3653 J", "3.65 kJ", "3,65 kJ", "3650"],
      numericTolerance: 30,
      hints: [
        "$W = nRT \\ln(V_2/V_1)$.",
        "$W = 1 \\cdot 8{,}314 \\cdot 400 \\cdot \\ln 3$",
        "$W = 3325{,}6 \\cdot 1{,}099$",
      ],
      solutionExplanation: `$$W = nRT \\ln\\frac{V_2}{V_1} = 1 \\cdot 8{,}314 \\cdot 400 \\cdot \\ln 3 = 3325{,}6 \\cdot 1{,}099 \\approx 3653 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-i-2",
      problemStatement: "Plyn pri konstantnim tlaku $150$ kPa se rozpina z $2$ litru na $6$ litru. Jakou praci vykona?",
      expectedAnswer: "600",
      acceptableAnswers: ["600", "600 J", "0.6 kJ", "0,6 kJ"],
      hints: [
        "Izobaricky dej: $W = p \\Delta V$.",
        "$\\Delta V = 6 - 2 = 4$ l $= 4 \\times 10^{-3}$ m$^3$.",
        "$W = 150\\,000 \\cdot 4 \\times 10^{-3}$",
      ],
      solutionExplanation: `$$W = p \\Delta V = 150\\,000 \\cdot (6 - 2) \\times 10^{-3} = 150\\,000 \\cdot 0{,}004 = 600 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ip-i-3",
      problemStatement: "Jednoatomovy idealni plyn ($\\gamma = 5/3$) pri teplote $600$ K a tlaku $300$ kPa se adiabaticky rozpina na trojnasobny objem. Jaka je konecna teplota? ($3^{2/3} \\approx 2{,}08$)",
      expectedAnswer: "288",
      acceptableAnswers: ["288", "288 K", "289", "289 K", "15 °C"],
      numericTolerance: 5,
      hints: [
        "$TV^{\\gamma-1} = \\text{konst.}$, tedy $T_2 = T_1 (V_1/V_2)^{\\gamma-1}$.",
        "$\\gamma - 1 = 2/3$.",
        "$T_2 = 600 \\cdot (1/3)^{2/3} = 600 / 3^{2/3}$",
      ],
      solutionExplanation: `$$T_2 = T_1 \\left(\\frac{V_1}{V_2}\\right)^{\\gamma-1} = 600 \\cdot \\left(\\frac{1}{3}\\right)^{2/3} = \\frac{600}{3^{2/3}} = \\frac{600}{2{,}08} \\approx 288 \\text{ K}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "ip-i-4",
      problemStatement: "Porovnejte praci vykonanou pri izotermickem a izobarickem rozpinani $1$ molu plynu z objemu $V$ na $2V$ pri pocatecnim tlaku $p_0$ a teplote $T_0$. Ktery dej vykona vetsi praci? Uvedte pomer $W_{\\text{izob}}/W_{\\text{izot}}$. ($\\ln 2 \\approx 0{,}693$)",
      expectedAnswer: "1.44",
      acceptableAnswers: ["1.44", "1,44", "1.443", "1,443", "izobaricky"],
      numericTolerance: 0.03,
      hints: [
        "$W_{\\text{izot}} = p_0 V \\ln 2 = 0{,}693 \\cdot p_0 V$.",
        "$W_{\\text{izob}} = p_0 \\Delta V = p_0 V$.",
        "Pomer = $1 / \\ln 2$.",
      ],
      solutionExplanation: `$$W_{\\text{izot}} = nRT \\ln 2 = p_0 V \\ln 2 \\approx 0{,}693 \\cdot p_0 V$$
$$W_{\\text{izob}} = p_0 \\Delta V = p_0 V$$
$$\\frac{W_{\\text{izob}}}{W_{\\text{izot}}} = \\frac{1}{\\ln 2} \\approx 1{,}44$$
Izobaricky dej vykona vetsi praci, protoze tlak zustava vysoky po celou dobu rozpinani.`,
      difficulty: "hard" as const,
    },
    {
      id: "ip-i-5",
      problemStatement: "Dvouatomovy plyn ($\\gamma = 1{,}4$, $3$ moly) pri $500$ K se adiabaticky stlaci tak, ze se jeho teplota zvysi na $800$ K. Jakou praci jsme na plynu vykonali?",
      expectedAnswer: "-18707",
      acceptableAnswers: ["-18707", "-18707 J", "-18710", "-18700", "-18.7 kJ", "-18,7 kJ", "18707", "18707 J"],
      numericTolerance: 200,
      hints: [
        "$W = \\frac{nR(T_1 - T_2)}{\\gamma - 1}$.",
        "$W = \\frac{3 \\cdot 8{,}314 \\cdot (500 - 800)}{0{,}4}$",
        "Zaporna hodnota znamena, ze prace byla vykonana NA plynu.",
      ],
      solutionExplanation: `$$W = \\frac{nR(T_1 - T_2)}{\\gamma - 1} = \\frac{3 \\cdot 8{,}314 \\cdot (500 - 800)}{0{,}4} = \\frac{3 \\cdot 8{,}314 \\cdot (-300)}{0{,}4}$$
$$= \\frac{-7483}{0{,}4} = -18\\,707 \\text{ J} \\approx -18{,}7 \\text{ kJ}$$
Zaporna prace znamena, ze jsme praci konali na plynu (stlacovali jsme ho).`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Prace plynu** = plocha pod krivkou v p-V diagramu: $W = \\int p \\, dV$.",
      "**Izotermicka prace**: $W = nRT \\ln(V_2/V_1)$ -- logaritmicka zavislost.",
      "**Izobaricka prace**: $W = p \\Delta V$ -- nejjednodussl vypocet.",
      "**Izochoricka prace**: $W = 0$ -- plyn se nerozpina.",
      "**Adiabaticky dej**: $pV^\\gamma = \\text{konst.}$, $W = nR(T_1 - T_2)/(\\gamma - 1)$. Pro jednoatomove plyny $\\gamma = 5/3$, pro dvouatomove $\\gamma = 1{,}4$.",
    ],
    nextTopicSuggestion: "Pokracujte na cyklicke deje a Carnotuv cyklus -- zjistete, proc zadny motor nemuze byt dokonale ucinny!",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Cyklicke deje, Carnotuv cyklus, realne plyny, kineticka teorie
// ═══════════════════════════════════════════════════════════════;

export const idealniPlynAdvanced: LessonContent = {
  conceptExplanation: {
    title: "Idealni plyn — cyklicke deje, Carnot a kineticka teorie",
    sections: [
      {
        heading: "Cyklicke deje a prace",
        body: `V tepelnem motoru plyn opakuje **cyklus** -- vrati se do puvodniho stavu. V p-V diagramu je to uzavrena krivka.

**Prace za cyklus** = plocha **uvnitr** uzavrene krivky v p-V diagramu.

$$\\boxed{W_{\\text{cyklus}} = \\oint p \\, dV = \\text{plocha uzavrene krivky}}$$

- Cyklus po smeru hodinovych rucicek: $W > 0$ (motor -- plyn kona praci)
- Cyklus proti smeru: $W < 0$ (tepelne cerpadlo/chladnicka)

Za jeden cyklus se vnitrni energie nemeni ($\\Delta U = 0$), takze:
$$W = Q_{\\text{privedene}} - |Q_{\\text{odvedene}}|$$

**Ucinnost tepelneho motoru:**
$$\\boxed{\\eta = \\frac{W}{Q_{\\text{in}}} = 1 - \\frac{|Q_{\\text{out}}|}{Q_{\\text{in}}}}$$

> [!key] Zadny cyklicky motor nemuze mit ucinnost $100\\%$ -- cast tepla se vzdy musi odvest (2. zakon termodynamiky).`,
        visual: {
          type: "interactive-pv-diagram",
          props: {
            processType: "all",
            defaultPressure: 200,
            defaultVolume: 1,
            defaultTemperature: 300,
            showWork: true,
          },
          caption: "Uzavrena krivka v p-V diagramu -- plocha uvnitr je prace za cyklus!",
        },
      },
      {
        heading: "Carnotuv cyklus",
        body: `**Carnotuv cyklus** je teoreticky nejucinnejsi mozny cyklus. Sklada se ze 4 deju:

1. **Izotermicka expanze** pri $T_H$ (prijem tepla $Q_H$ z horkeho zasobniku)
2. **Adiabaticka expanze** ($T_H \\to T_C$, bez vymeny tepla)
3. **Izotermicka komprese** pri $T_C$ (odvod tepla $Q_C$ do studeneho zasobniku)
4. **Adiabaticka komprese** ($T_C \\to T_H$, bez vymeny tepla)

**Ucinnost Carnotova cyklu:**
$$\\boxed{\\eta_C = 1 - \\frac{T_C}{T_H}}$$

- $T_H$ je teplota horkeho zasobniku (K)
- $T_C$ je teplota studeneho zasobniku (K)

$$\\begin{array}{l|c|c|c} \\text{Motor} & T_H \\text{ (K)} & T_C \\text{ (K)} & \\eta_C \\\\ \\hline \\text{Parni motor} & 500 & 300 & 40\\% \\\\ \\text{Automobilovy motor} & 600 & 300 & 50\\% \\\\ \\text{Plynova turbina} & 1500 & 300 & 80\\% \\\\ \\text{Jaderna elektrarna} & 600 & 300 & 50\\% \\end{array}$$

> [!key] Carnotova ucinnost je **horni limit** -- zadny realny motor ji nemuze prekrocit. Realne motory maji ucinnost $30{-}45\\%$.`,
      },
      {
        heading: "Realne plyny a Van der Waalsova rovnice",
        body: `Realne plyny se od idealniho lisi predevsim:
1. Molekuly maji **nenulovy objem** $b$
2. Mezi molekulami pusobi **pritazlive sily** (parametr $a$)

**Van der Waalsova rovnice:**
$$\\boxed{\\left(p + \\frac{a}{V_m^2}\\right)(V_m - b) = RT}$$

kde $V_m = V/n$ je molarni objem.

Pro $n$ molu:
$$\\left(p + \\frac{n^2 a}{V^2}\\right)(V - nb) = nRT$$

| Plyn | $a$ (Pa$\\cdot$m$^6$/mol$^2$) | $b$ (m$^3$/mol) |
|---|---|---|
| He | $0{,}00346$ | $2{,}38 \\times 10^{-5}$ |
| N$_2$ | $0{,}137$ | $3{,}87 \\times 10^{-5}$ |
| CO$_2$ | $0{,}365$ | $4{,}28 \\times 10^{-5}$ |
| H$_2$O | $0{,}554$ | $3{,}05 \\times 10^{-5}$ |

> [!info] Clen $a/V_m^2$ koriguje **snizeni tlaku** (molekuly se navzajem pritahuji, takze skutecny tlak je nizsi nez u idealniho plynu), clen $b$ **zmensuje dostupny objem** (molekuly samy zabiraji misto).`,
      },
      {
        heading: "Kineticka teorie plynu",
        body: `Makroskopicke vlastnosti plynu (tlak, teplota) muzeme odvodit z pohybu molekul:

**Stredni kineticka energie jedne molekuly:**
$$\\boxed{\\frac{1}{2}m\\langle v^2 \\rangle = \\frac{3}{2}kT}$$

**Stredni kvadraticka rychlost** (RMS):
$$\\boxed{v_{\\text{rms}} = \\sqrt{\\langle v^2 \\rangle} = \\sqrt{\\frac{3kT}{m}} = \\sqrt{\\frac{3RT}{M}}}$$

kde $M$ je molarni hmotnost (kg/mol).

$$\\begin{array}{l|c|c} \\text{Plyn} & M \\text{ (g/mol)} & v_{\\text{rms}} \\text{ pri 300 K (m/s)} \\\\ \\hline \\text{H}_2 & 2 & 1930 \\\\ \\text{He} & 4 & 1370 \\\\ \\text{N}_2 & 28 & 517 \\\\ \\text{O}_2 & 32 & 484 \\\\ \\text{CO}_2 & 44 & 413 \\end{array}$$

**Maxwellovo-Boltzmannovo rozdeleni:**
Molekuly nemaji vsechny stejnou rychlost. Rozdeleni rychlosti ma charakteristicky tvar -- maximum je blizko $v_{\\text{rms}}$, ale nektere molekuly jsou vyrazne rychlejsi (chvost rozdeleni).

S rostouci teplotou se maximum posouva doprava (rychlejsi molekuly) a krivka se zplostuje.

> [!tip] Proto lehke plyny (H$_2$, He) unikaji z atmosfery Zeme -- jejich $v_{\\text{rms}}$ je srovnatelna s unikovou rychlosti!`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Carnotuv motor pracuje mezi teplotami $T_H = 500$ K a $T_C = 300$ K. Za jeden cyklus prijme z horkeho zasobniku teplo $Q_H = 10$ kJ. a) Jaka je ucinnost? b) Jakou praci vykona za cyklus? c) Kolik tepla odvede do studeneho zasobniku?`,
    steps: [
      {
        instruction: "Vypocitejte Carnotovu ucinnost",
        math: "$\\eta_C = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{500} = 1 - 0{,}6 = 0{,}4 = 40\\%$",
        explanation: "Maximalni ucinnost motoru pracujiciho mezi temito teplotami je $40\\%$.",
      },
      {
        instruction: "Vypocitejte praci za cyklus",
        math: "$W = \\eta \\cdot Q_H = 0{,}4 \\cdot 10\\,000 = 4000 \\text{ J} = 4 \\text{ kJ}$",
        explanation: "$40\\%$ privedeneho tepla se premeni na uzitecnou praci.",
      },
      {
        instruction: "Vypocitejte odvedene teplo",
        math: "$Q_C = Q_H - W = 10\\,000 - 4000 = 6000 \\text{ J} = 6 \\text{ kJ}$",
        explanation: "Zbytek tepla ($60\\%$) se odvede do studeneho zasobniku.",
      },
    ],
    finalAnswer: "a) Ucinnost $\\eta = 40\\%$, b) prace $W = 4$ kJ, c) odvedene teplo $Q_C = 6$ kJ.",
  },
  practiceProblems: [
    {
      id: "ip-a-1",
      problemStatement: "Tepelny motor pracuje mezi teplotami $800$ K a $300$ K. Jaka je maximalni mozna ucinnost?",
      expectedAnswer: "62.5",
      acceptableAnswers: ["62.5", "62,5", "62.5%", "62,5%", "0.625", "0,625"],
      numericTolerance: 0.5,
      hints: [
        "$\\eta_C = 1 - T_C/T_H$.",
        "$\\eta_C = 1 - 300/800$",
      ],
      solutionExplanation: `$$\\eta_C = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{800} = 1 - 0{,}375 = 0{,}625 = 62{,}5\\%$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ip-a-2",
      problemStatement: "Cyklicky dej v p-V diagramu ma tvar obdelniku: $p$ mezi $100$ kPa a $300$ kPa, $V$ mezi $1$ l a $3$ l. Jakou praci vykona plyn za jeden cyklus?",
      expectedAnswer: "400",
      acceptableAnswers: ["400", "400 J", "0.4 kJ", "0,4 kJ"],
      hints: [
        "Prace = plocha obdelniku v p-V diagramu.",
        "$W = \\Delta p \\cdot \\Delta V$.",
        "$W = (300 - 100) \\times 10^3 \\cdot (3 - 1) \\times 10^{-3}$",
      ],
      solutionExplanation: `$$W = \\Delta p \\cdot \\Delta V = (300\\,000 - 100\\,000) \\cdot (0{,}003 - 0{,}001)$$
$$= 200\\,000 \\cdot 0{,}002 = 400 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-a-3",
      problemStatement: "Carnotuv motor ma ucinnost $30\\%$ a teplota studeneho zasobniku je $280$ K. Jaka je teplota horkeho zasobniku?",
      expectedAnswer: "400",
      acceptableAnswers: ["400", "400 K"],
      hints: [
        "$\\eta = 1 - T_C/T_H$, tedy $T_H = T_C/(1 - \\eta)$.",
        "$T_H = 280/(1 - 0{,}3)$",
      ],
      solutionExplanation: `$$\\eta = 1 - \\frac{T_C}{T_H} \\implies T_H = \\frac{T_C}{1 - \\eta} = \\frac{280}{1 - 0{,}3} = \\frac{280}{0{,}7} = 400 \\text{ K}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-a-4",
      problemStatement: "Jaka je stredni kvadraticka rychlost ($v_{\\text{rms}}$) molekul dusiku (N$_2$, $M = 28$ g/mol) pri teplote $300$ K? ($R = 8{,}314$ J/(mol$\\cdot$K))",
      expectedAnswer: "517",
      acceptableAnswers: ["517", "517 m/s", "516", "516 m/s"],
      numericTolerance: 5,
      hints: [
        "$v_{\\text{rms}} = \\sqrt{3RT/M}$. Pozor: $M$ musi byt v kg/mol!",
        "$M = 0{,}028$ kg/mol.",
        "$v_{\\text{rms}} = \\sqrt{\\frac{3 \\cdot 8{,}314 \\cdot 300}{0{,}028}}$",
      ],
      solutionExplanation: `$$v_{\\text{rms}} = \\sqrt{\\frac{3RT}{M}} = \\sqrt{\\frac{3 \\cdot 8{,}314 \\cdot 300}{0{,}028}} = \\sqrt{\\frac{7483}{0{,}028}} = \\sqrt{267\\,250} \\approx 517 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ip-a-5",
      problemStatement: "Elektrarna s parni turbinou pracuje mezi $T_H = 800$ K a $T_C = 350$ K. Prijima teplo $Q_H = 500$ MJ za cyklus. Skutecna ucinnost je $60\\%$ Carnotovy ucinnosti. Jakou praci vykona za cyklus (v MJ)?",
      expectedAnswer: "169",
      acceptableAnswers: ["169", "169 MJ", "168.75", "168,75", "168.8", "168,8"],
      numericTolerance: 2,
      hints: [
        "Nejdriv spocitejte $\\eta_C = 1 - T_C/T_H$.",
        "$\\eta_{\\text{skut}} = 0{,}6 \\cdot \\eta_C$.",
        "$W = \\eta_{\\text{skut}} \\cdot Q_H$.",
      ],
      solutionExplanation: `$$\\eta_C = 1 - \\frac{350}{800} = 1 - 0{,}4375 = 0{,}5625$$
$$\\eta_{\\text{skut}} = 0{,}6 \\cdot 0{,}5625 = 0{,}3375$$
$$W = 0{,}3375 \\cdot 500 = 168{,}75 \\text{ MJ} \\approx 169 \\text{ MJ}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Cyklicky dej**: prace = plocha uvnitr uzavrene krivky v p-V diagramu.",
      "**Carnotuv cyklus**: 2 izotermy + 2 adiabaty, ucinnost $\\eta_C = 1 - T_C/T_H$ -- maximalni mozna ucinnost.",
      "**Van der Waalsova rovnice**: $(p + a/V_m^2)(V_m - b) = RT$ -- oprava na objem molekul a mezimolekulove sily.",
      "**Kineticka energie molekuly**: $\\frac{1}{2}m\\langle v^2 \\rangle = \\frac{3}{2}kT$ -- teplota je mira energie molekul.",
      "**RMS rychlost**: $v_{\\text{rms}} = \\sqrt{3RT/M}$ -- lehci molekuly se pohybuji rychleji.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste idealni plyn od zakladu az po Carnotuv cyklus. Pokracujte na 1. a 2. zakon termodynamiky podrobne!",
  },
};
