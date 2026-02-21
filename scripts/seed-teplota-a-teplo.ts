import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "46acd7be-8e07-4177-9ecb-a38ee15d758d";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Teplota a teplo -- zakladni pojmy",
    sections: [
      {
        heading: "Co je teplota?",
        body: `Teplota je **mira stredni kineticke energie** castic latky. Cim rychleji se castice pohybuji, tim vyssi je teplota.

Pouzivame tri hlavni teplotni stupnice:

$$\\begin{array}{l|c|c}
\\text{Stupnice} & \\text{Bod mrazu vody} & \\text{Bod varu vody} \\\\ \\hline
\\text{Celsius (\\degree C)} & 0 & 100 \\\\
\\text{Kelvin (K)} & 273{,}15 & 373{,}15 \\\\
\\text{Fahrenheit (\\degree F)} & 32 & 212
\\end{array}$$

Prevody mezi stupnicemi:

$$\\boxed{T(\\text{K}) = T(\\degree\\text{C}) + 273{,}15}$$

$$\\boxed{T(\\degree\\text{F}) = \\frac{9}{5} \\cdot T(\\degree\\text{C}) + 32}$$

> [!key] Absolutni nula ($0$ K $= -273{,}15$ $\\degree$C) je nejnizsi mozna teplota -- castice se prakticky prestaji pohybovat.`,
        visual: {
          type: "interactive-pendulum",
          props: {
            defaultLength: 1.0,
            defaultAngle: 30,
            showEnergyBars: true,
          },
          caption: "Kyvadlo ukazuje premenu energie -- analogie k tepelnemu pohybu castic, kde se kineticka energie neustale meni.",
        },
        examples: [
          {
            problem: "Prevedte $25$ $\\degree$C na kelviny.",
            solution: `$$T = 25 + 273{,}15 = \\color{#16a34a}{298{,}15 \\text{ K}}$$`,
          },
          {
            problem: "Prevedte $-40$ $\\degree$C na stupne Fahrenheita.",
            solution: `$$T = \\frac{9}{5} \\cdot (-40) + 32 = -72 + 32 = \\color{#16a34a}{-40 \\text{ \\degree F}}$$

Zajimavost: $-40$ $\\degree$C $= -40$ $\\degree$F -- jediny bod, kde se obe stupnice protnou!`,
          },
        ],
      },
      {
        heading: "Rozdil mezi teplotou a teplem",
        body: `Teplota a teplo jsou **dva ruzne pojmy**:

| | **Teplota** | **Teplo** |
|---|---|---|
| Co to je? | Stav latky (jak rychle se pohybuji castice) | Energie prenasena mezi telesy |
| Jednotka | $\\degree$C, K, $\\degree$F | joule (J) |
| Znacka | $T$ nebo $t$ | $Q$ |

**Teplo** je **energie, ktera se prenasi** z teplejsiho telesa na chladnejsi. Tece "samo od sebe" vzdy od vyssi teploty k nizsi.

> [!key] Teplo neni neco, co teleso "ma" -- je to energie **v prenosu**. Teleso ma vnitrni energii, ale teplo je proces jejího predavani.

Priklad: Horky caj ($80$ $\\degree$C) v mistnosti ($20$ $\\degree$C) predava teplo okolnimu vzduchu, dokud se teploty nevyrovnaji.`,
      },
      {
        heading: "Merna tepelna kapacita a vzorec Q = mc*Delta*T",
        body: `Kolik tepla potrebujeme na ohrati teleso? To zavisi na trech vecech:

$$\\boxed{Q = m \\cdot c \\cdot \\Delta T}$$

- $Q$ je teplo (J)
- $m$ je hmotnost (kg)
- $c$ je **merna tepelna kapacita** (J/(kg$\\cdot$K))
- $\\Delta T = T_2 - T_1$ je zmena teploty (K nebo $\\degree$C)

Tabulka mernych tepelnych kapacit:

$$\\begin{array}{l|c}
\\text{Latka} & c \\text{ [J/(kg} \\cdot \\text{K)]} \\\\ \\hline
\\text{Voda} & 4180 \\\\
\\text{Hlinik} & 900 \\\\
\\text{Zelezo} & 450 \\\\
\\text{Med} & 390 \\\\
\\text{Olovo} & 130
\\end{array}$$

> [!info] Voda ma **velmi vysokou** mernou tepelnou kapacitu -- proto se ohriva pomalu a pomalu chladne. To je duvod, proc more stabilizuje podnebne podminky na pobrezi.`,
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 0,
            defaultA: 1,
            tMax: 10,
          },
          caption: "Analogie: graf ukazuje linearni rust -- podobne jako teplota roste linearne s dodanym teplem (pri konstantni hmotnosti a kapacite).",
        },
        examples: [
          {
            problem: "Kolik tepla potrebujeme na ohrati $2$ kg vody z $20$ $\\degree$C na $80$ $\\degree$C?",
            solution: `$$Q = m \\cdot c \\cdot \\Delta T = 2 \\cdot 4180 \\cdot (80 - 20) = 2 \\cdot 4180 \\cdot 60 = \\color{#16a34a}{501\\,600 \\text{ J} \\approx 502 \\text{ kJ}}$$`,
          },
        ],
      },
      {
        heading: "Kalorimetricka rovnice -- vymena tepla",
        body: `Kdyz se dve telesa s ruznou teplotou dostanou do kontaktu, teplejsi predava teplo chladnejsimu, dokud se teploty nevyrovnaji.

V izolovanem systemu (zadne ztraty):

$$\\boxed{Q_{\\text{prijate}} = Q_{\\text{odevzdane}}}$$

$$m_1 \\cdot c_1 \\cdot (T - T_1) = m_2 \\cdot c_2 \\cdot (T_2 - T)$$

kde $T$ je vysledna (rovnovazna) teplota.

> [!tip] Pozor na znamenka! Teplejsi teleso **odevzdava** teplo ($\\Delta T < 0$), chladnejsi **prijima** ($\\Delta T > 0$). V kalorimetricke rovnici uz pocitame s absolutnimi hodnotami.

Priklad: Smichame-li horkou a studenou vodu, vysledna teplota lezi **mezi** obema pocatecnimi teplotami -- blize k te latce, ktere je vice nebo ktera ma vyssi kapacitu.`,
        examples: [
          {
            problem: "Do $0{,}5$ kg vody o teplote $20$ $\\degree$C vhodime zelezny klic ($0{,}2$ kg, $200$ $\\degree$C). Jaka bude vysledna teplota? ($c_{\\text{voda}} = 4180$, $c_{\\text{Fe}} = 450$)",
            solution: `$$m_{\\text{Fe}} \\cdot c_{\\text{Fe}} \\cdot (T_{\\text{Fe}} - T) = m_{\\text{v}} \\cdot c_{\\text{v}} \\cdot (T - T_{\\text{v}})$$
$$0{,}2 \\cdot 450 \\cdot (200 - T) = 0{,}5 \\cdot 4180 \\cdot (T - 20)$$
$$90 \\cdot (200 - T) = 2090 \\cdot (T - 20)$$
$$18\\,000 - 90T = 2090T - 41\\,800$$
$$59\\,800 = 2180T$$
$$T = \\color{#16a34a}{27{,}4 \\text{ \\degree C}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `V kalorimetru smichame $0{,}3$ kg vody o teplote $80$ $\\degree$C s $0{,}5$ kg vody o teplote $15$ $\\degree$C. Jaka bude vysledna teplota smesi? ($c_{\\text{voda}} = 4180$ J/(kg$\\cdot$K))`,
    steps: [
      {
        instruction: "Zapiste kalorimetrickou rovnici",
        math: "$m_1 \\cdot c \\cdot (T_1 - T) = m_2 \\cdot c \\cdot (T - T_2)$",
        explanation: "Teplejsi voda ($80$ $\\degree$C) odevzdava teplo chladnejsi ($15$ $\\degree$C). Protoze jde o stejnou latku, $c$ se vykrati.",
      },
      {
        instruction: "Vykratte mernou tepelnou kapacitu $c$",
        math: "$m_1 \\cdot (T_1 - T) = m_2 \\cdot (T - T_2)$",
        explanation: "Protoze je na obou stranach stejna latka (voda), $c$ odpadne.",
      },
      {
        instruction: "Dosadte hodnoty",
        math: "$0{,}3 \\cdot (80 - T) = 0{,}5 \\cdot (T - 15)$",
        explanation: "Dosadime hmotnosti a teploty.",
      },
      {
        instruction: "Roznásobte a upravte",
        math: "$24 - 0{,}3T = 0{,}5T - 7{,}5$\n$31{,}5 = 0{,}8T$",
        explanation: "Prevedeme $T$ na jednu stranu.",
      },
      {
        instruction: "Vypocitejte vyslednou teplotu",
        math: "$T = \\frac{31{,}5}{0{,}8} = 39{,}375 \\approx 39{,}4 \\text{ \\degree C}$",
        explanation: "Vysledna teplota je blize chladnejsi vode, protoze ji je vice ($0{,}5$ kg vs $0{,}3$ kg).",
      },
    ],
    finalAnswer: "Vysledna teplota smesi je priblizne $T \\approx 39{,}4$ $\\degree$C.",
  },
  practiceProblems: [
    {
      id: "tt-b-1",
      problemStatement: "Prevedte $36{,}6$ $\\degree$C (normalni telesna teplota) na kelviny.",
      expectedAnswer: "309.75",
      acceptableAnswers: ["309.75", "309,75", "309.75 K", "309,75 K"],
      hints: [
        "Pouzijte $T(\\text{K}) = T(\\degree\\text{C}) + 273{,}15$.",
        "$T = 36{,}6 + 273{,}15$",
      ],
      solutionExplanation: `$$T = 36{,}6 + 273{,}15 = 309{,}75 \\text{ K}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "tt-b-2",
      problemStatement: "Prevedte $100$ $\\degree$F na stupne Celsia. Pouzijte vzorec $T(\\degree\\text{C}) = \\frac{5}{9} \\cdot (T(\\degree\\text{F}) - 32)$.",
      expectedAnswer: "37.8",
      acceptableAnswers: ["37.8", "37,8", "37.78", "37,78"],
      numericTolerance: 0.1,
      hints: [
        "Dosadte do vzorce: $T = \\frac{5}{9} \\cdot (100 - 32)$.",
        "$T = \\frac{5}{9} \\cdot 68$",
      ],
      solutionExplanation: `$$T = \\frac{5}{9} \\cdot (100 - 32) = \\frac{5}{9} \\cdot 68 = 37{,}78 \\approx 37{,}8 \\text{ \\degree C}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "tt-b-3",
      problemStatement: "Kolik tepla je treba na ohrati $0{,}5$ kg vody z $20$ $\\degree$C na $100$ $\\degree$C? ($c_{\\text{voda}} = 4180$ J/(kg$\\cdot$K))",
      expectedAnswer: "167200",
      acceptableAnswers: ["167200", "167200 J", "167.2 kJ", "167,2 kJ"],
      hints: [
        "Pouzijte $Q = m \\cdot c \\cdot \\Delta T$.",
        "$Q = 0{,}5 \\cdot 4180 \\cdot (100 - 20)$",
      ],
      solutionExplanation: `$$Q = m \\cdot c \\cdot \\Delta T = 0{,}5 \\cdot 4180 \\cdot 80 = 167\\,200 \\text{ J} = 167{,}2 \\text{ kJ}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "tt-b-4",
      problemStatement: "Zelezny hrebik ($0{,}05$ kg) ma teplotu $250$ $\\degree$C. Kolik tepla odevzda, nez vychladne na $20$ $\\degree$C? ($c_{\\text{Fe}} = 450$ J/(kg$\\cdot$K))",
      expectedAnswer: "5175",
      acceptableAnswers: ["5175", "5175 J", "5.175 kJ", "5,175 kJ"],
      hints: [
        "Pouzijte $Q = m \\cdot c \\cdot \\Delta T$, kde $\\Delta T = 250 - 20 = 230$ $\\degree$C.",
        "$Q = 0{,}05 \\cdot 450 \\cdot 230$",
      ],
      solutionExplanation: `$$Q = m \\cdot c \\cdot \\Delta T = 0{,}05 \\cdot 450 \\cdot 230 = 5175 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-b-5",
      problemStatement: "Smichame $1$ kg vody o teplote $60$ $\\degree$C s $2$ kg vody o teplote $15$ $\\degree$C. Jaka bude vysledna teplota?",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30 C", "30 stupnu"],
      hints: [
        "Kalorimetricka rovnice: $m_1(T_1 - T) = m_2(T - T_2)$. Kapacita se vykrati.",
        "$1 \\cdot (60 - T) = 2 \\cdot (T - 15)$. Vyreseni: $60 - T = 2T - 30$.",
      ],
      solutionExplanation: `$$m_1(T_1 - T) = m_2(T - T_2)$$
$$1 \\cdot (60 - T) = 2 \\cdot (T - 15)$$
$$60 - T = 2T - 30$$
$$90 = 3T$$
$$T = 30 \\text{ \\degree C}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Teplota** = mira kineticke energie castic. Prevodovy vzorec: $T(\\text{K}) = T(\\degree\\text{C}) + 273{,}15$.",
      "**Teplo** = energie prenasena mezi telesy s ruznou teplotou. Znacka $Q$, jednotka joule (J).",
      "**Merna tepelna kapacita**: $Q = mc\\Delta T$ -- voda ma velmi vysokou kapacitu ($4180$ J/(kg$\\cdot$K)).",
      "**Kalorimetricka rovnice**: $Q_{\\text{prijate}} = Q_{\\text{odevzdane}}$ -- zakon zachovani energie pro tepelnou vymenu.",
      "Teplo vzdy prochazi z teplejsiho telesa na chladnejsi -- nikdy naopak.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na stredne pokrocilou uroven -- dozvite se o tepelne roztaznosti, skupenskych premenach a vedeni tepla.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step, graph-aware
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Teplota a teplo -- roztaznost, premeny, vedeni",
    sections: [
      {
        heading: "Tepelna roztaznost",
        body: `Vetsina latek se pri zahrivani **roztatuje**. Castice se pohybuji rychleji a zabiraji vice mista.

**Delkova roztaznost** (tyce, koleje, mosty):

$$\\boxed{\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T}$$

- $\\alpha$ je koeficient delkove roztaznosti (K$^{-1}$)
- $L_0$ je puvodni delka
- $\\Delta T$ je zmena teploty

**Objemova roztaznost** (kapaliny, plyny):

$$\\boxed{\\Delta V = \\beta \\cdot V_0 \\cdot \\Delta T}$$

Pro izotropni pevne latky plati priblizne:

$$\\boxed{\\beta \\approx 3\\alpha}$$

$$\\begin{array}{l|c}
\\text{Material} & \\alpha \\text{ [10}^{-6} \\text{K}^{-1}\\text{]} \\\\ \\hline
\\text{Ocel} & 12 \\\\
\\text{Hlinik} & 23 \\\\
\\text{Med} & 17 \\\\
\\text{Beton} & 12 \\\\
\\text{Sklo} & 9
\\end{array}$$

> [!key] Zeleznicni koleje maji dilatacni mezery -- bez nich by se pri zahrati prohnuly! Moderna bezstykova kolej vyuziva predpeti v kolejnicich.

> [!info] Voda ma anomalii: mezi $0$ a $4$ $\\degree$C se pri zahrivani **smrstuje** (hustota roste). Proto je led na hladine a ryby preziji zimu ve vode u dna ($4$ $\\degree$C).`,
        examples: [
          {
            problem: "Ocelovy most delky $100$ m se zahreje z $-20$ $\\degree$C na $40$ $\\degree$C. O kolik se prodlouzi? ($\\alpha_{\\text{ocel}} = 12 \\times 10^{-6}$ K$^{-1}$)",
            solution: `$$\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T = 12 \\times 10^{-6} \\cdot 100 \\cdot 60 = \\color{#16a34a}{0{,}072 \\text{ m} = 7{,}2 \\text{ cm}}$$`,
          },
        ],
      },
      {
        heading: "Skupenske premeny a skupenske teplo",
        body: `Pri urcitych teplotach meni latka svoje skupenstvi. Behem premeny se teplota **nemeni** -- veskera dodana energie se spotrebuje na zmenu struktury.

$$\\boxed{Q = m \\cdot L}$$

kde $L$ je **merne skupenske teplo** (J/kg):

$$\\begin{array}{l|c|c}
\\text{Latka} & L_{\\text{tani}} \\text{ (kJ/kg)} & L_{\\text{varu}} \\text{ (kJ/kg)} \\\\ \\hline
\\text{Voda/led} & 334 & 2260 \\\\
\\text{Zelezo} & 247 & 6090 \\\\
\\text{Hlinik} & 397 & 10\\,900
\\end{array}$$

**Ohrivaci krivka vody** (pri konstantnim prikonu):

1. Led se ohriva: $Q = mc_{\\text{led}} \\Delta T$
2. **Tani** pri $0$ $\\degree$C: $Q = mL_{\\text{tani}}$ (teplota stoji!)
3. Voda se ohriva: $Q = mc_{\\text{voda}} \\Delta T$
4. **Var** pri $100$ $\\degree$C: $Q = mL_{\\text{varu}}$ (teplota stoji!)
5. Para se ohriva: $Q = mc_{\\text{para}} \\Delta T$

> [!key] Plata na ohrivaci krivce odpovidaji skupenskym premenam -- veskera energie jde na rozruseni vazeb mezi casticemi, ne na zvyseni teploty.`,
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 0,
            defaultA: 0.5,
            tMax: 20,
          },
          caption: "Analogie s ohrivaci krivkou: predstavte si usek s nulovou strmosti jako fazi, kdy se latka tavi nebo vari (teplota se nemeni, i kdyz dodavame energii).",
        },
        examples: [
          {
            problem: "Kolik energie spotrebujeme na premenu $0{,}5$ kg ledu pri $0$ $\\degree$C na vodu pri $0$ $\\degree$C? ($L_{\\text{tani}} = 334$ kJ/kg)",
            solution: `$$Q = m \\cdot L = 0{,}5 \\cdot 334\\,000 = \\color{#16a34a}{167\\,000 \\text{ J} = 167 \\text{ kJ}}$$`,
          },
        ],
      },
      {
        heading: "Newtonuv zakon chladnuti",
        body: `Teleso chladne tim **rychleji**, cim vetsi je rozdil teplot mezi nim a okolim:

$$\\boxed{\\frac{dT}{dt} = -k(T - T_{\\text{okoli}})}$$

Kvalitativne to znamena:
- Horky caj ($90$ $\\degree$C) v mistnosti ($20$ $\\degree$C) chladne zpocatku **rychle**
- Jak se rozdil teplot zmensuje, chladnuti se **zpomaluje**
- Teplota se **asymptoticky** blizi teplote okoli

> [!tip] Newtonuv zakon chladnuti plati dobre, kdyz je rozdil teplot do asi $30$ $\\degree$C. Pri vetsich rozdilech zacina hrat roli zarivani a konvekce, ktere zakon zpresni.

Prakticke pouziti: Doba chladnuti kavy, forenzni odhad doby umrti, navrh chlazeni elektroniky.`,
      },
      {
        heading: "Vedeni tepla -- Fourieruv zakon",
        body: `Teplo se vede materialy ruznou rychlosti. **Fourieruv zakon** popisuje tepelny tok (vykon prenosu tepla):

$$\\boxed{P = \\frac{k \\cdot A \\cdot \\Delta T}{d}}$$

- $P$ je tepelny vykon (W)
- $k$ je **tepelna vodivost** materialu (W/(m$\\cdot$K))
- $A$ je plocha, kterou teplo prochazi (m$^2$)
- $\\Delta T$ je rozdil teplot na obou stranach (K)
- $d$ je tloustka materialu (m)

$$\\begin{array}{l|c}
\\text{Material} & k \\text{ [W/(m} \\cdot \\text{K)]} \\\\ \\hline
\\text{Med} & 400 \\\\
\\text{Hlinik} & 237 \\\\
\\text{Ocel} & 50 \\\\
\\text{Sklo} & 1{,}0 \\\\
\\text{Drevo} & 0{,}15 \\\\
\\text{Polystyren} & 0{,}033
\\end{array}$$

> [!key] Kovy vedou teplo dobre (vysoke $k$), izolanty spatne (nizke $k$). Proto se pouziva polystyren na zatepleni domu a kov na hrncich.`,
        examples: [
          {
            problem: "Stenou z cihel (tloustka $0{,}3$ m, plocha $10$ m$^2$, $k = 0{,}8$ W/(m$\\cdot$K)) unika teplo. Uvnitr $20$ $\\degree$C, venku $-5$ $\\degree$C. Jaky je tepelny tok?",
            solution: `$$P = \\frac{k \\cdot A \\cdot \\Delta T}{d} = \\frac{0{,}8 \\cdot 10 \\cdot 25}{0{,}3} = \\color{#16a34a}{667 \\text{ W}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `V kalorimetru je $0{,}2$ kg vody o teplote $25$ $\\degree$C. Pridame $0{,}05$ kg ledu o teplote $0$ $\\degree$C. Jaka bude vysledna teplota? ($c_{\\text{voda}} = 4180$ J/(kg$\\cdot$K), $L_{\\text{tani}} = 334\\,000$ J/kg)`,
    steps: [
      {
        instruction: "Spocitejte teplo potrebne na roztaveni ledu",
        math: "$Q_{\\text{tani}} = m_{\\text{led}} \\cdot L = 0{,}05 \\cdot 334\\,000 = 16\\,700 \\text{ J}$",
        explanation: "Nejprve se led musi roztavit -- to spotrebuje $16{,}7$ kJ.",
      },
      {
        instruction: "Spocitejte teplo, ktere muze voda odevzdat pri vychlazeni na $0$ $\\degree$C",
        math: "$Q_{\\text{max}} = m_{\\text{voda}} \\cdot c \\cdot \\Delta T = 0{,}2 \\cdot 4180 \\cdot 25 = 20\\,900 \\text{ J}$",
        explanation: "Voda muze odevzdat maximalne $20{,}9$ kJ, nez by vychladla na $0$ $\\degree$C.",
      },
      {
        instruction: "Porovnejte: staci teplo na roztaveni ledu?",
        math: "$Q_{\\text{max}} = 20\\,900 > Q_{\\text{tani}} = 16\\,700$",
        explanation: "Ano, voda ma dost energie na roztaveni vseho ledu. Zbyde $20\\,900 - 16\\,700 = 4200$ J na ohrev.",
      },
      {
        instruction: "Zapiste kalorimetrickou rovnici po roztaveni",
        math: "$m_{\\text{voda}} \\cdot c \\cdot (T_{\\text{voda}} - T) = m_{\\text{led}} \\cdot L + m_{\\text{led}} \\cdot c \\cdot (T - 0)$",
        explanation: "Teplo odevzdane vodou = teplo na taveni + teplo na ohrev roztaveného ledu.",
      },
      {
        instruction: "Dosadte a vypocitejte",
        math: "$0{,}2 \\cdot 4180 \\cdot (25 - T) = 16\\,700 + 0{,}05 \\cdot 4180 \\cdot T$\n$836 \\cdot (25 - T) = 16\\,700 + 209T$\n$20\\,900 - 836T = 16\\,700 + 209T$\n$4200 = 1045T$\n$T = 4{,}02 \\text{ \\degree C}$",
        explanation: "Vysledna teplota je priblizne $4$ $\\degree$C. Led spotreboval vetsinu tepla na taveni.",
      },
    ],
    finalAnswer: "Vysledna teplota smesi je priblizne $T \\approx 4{,}0$ $\\degree$C. Vsechny led se roztavi.",
  },
  practiceProblems: [
    {
      id: "tt-i-1",
      problemStatement: "Hlinikovy drat delky $50$ m se zahreje z $10$ $\\degree$C na $60$ $\\degree$C. O kolik se prodlouzi? ($\\alpha_{\\text{Al}} = 23 \\times 10^{-6}$ K$^{-1}$)",
      expectedAnswer: "0.0575",
      acceptableAnswers: ["0.0575", "0,0575", "0.058", "0,058", "5.75 cm", "5,75 cm"],
      numericTolerance: 0.001,
      hints: [
        "Pouzijte $\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T$.",
        "$\\Delta L = 23 \\times 10^{-6} \\cdot 50 \\cdot 50$",
      ],
      solutionExplanation: `$$\\Delta L = \\alpha \\cdot L_0 \\cdot \\Delta T = 23 \\times 10^{-6} \\cdot 50 \\cdot 50 = 0{,}0575 \\text{ m} = 5{,}75 \\text{ cm}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "tt-i-2",
      problemStatement: "Kolik energie je treba na premenu $2$ kg ledu pri $-10$ $\\degree$C na vodu pri $20$ $\\degree$C? ($c_{\\text{led}} = 2090$ J/(kg$\\cdot$K), $L_{\\text{tani}} = 334\\,000$ J/kg, $c_{\\text{voda}} = 4180$ J/(kg$\\cdot$K))",
      expectedAnswer: "877000",
      acceptableAnswers: ["877000", "877000 J", "877 kJ"],
      numericTolerance: 1000,
      hints: [
        "Tri kroky: ohrev ledu na $0$ $\\degree$C, taveni, ohrev vody na $20$ $\\degree$C.",
        "$Q = mc_{\\text{led}} \\cdot 10 + mL + mc_{\\text{voda}} \\cdot 20$",
      ],
      solutionExplanation: `Ohrev ledu: $Q_1 = 2 \\cdot 2090 \\cdot 10 = 41\\,800$ J

Taveni: $Q_2 = 2 \\cdot 334\\,000 = 668\\,000$ J

Ohrev vody: $Q_3 = 2 \\cdot 4180 \\cdot 20 = 167\\,200$ J

$$Q = Q_1 + Q_2 + Q_3 = 41\\,800 + 668\\,000 + 167\\,200 = 877\\,000 \\text{ J} = 877 \\text{ kJ}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-i-3",
      problemStatement: "Medena tyce ($\\alpha = 17 \\times 10^{-6}$ K$^{-1}$) ma pri $20$ $\\degree$C objem $500$ cm$^3$. Jaky bude jeji objem pri $220$ $\\degree$C? Pouzijte $\\beta \\approx 3\\alpha$.",
      expectedAnswer: "505.1",
      acceptableAnswers: ["505.1", "505,1", "505.10", "505,10"],
      numericTolerance: 0.2,
      hints: [
        "$\\beta = 3 \\cdot 17 \\times 10^{-6} = 51 \\times 10^{-6}$ K$^{-1}$.",
        "$V = V_0(1 + \\beta \\Delta T) = 500 \\cdot (1 + 51 \\times 10^{-6} \\cdot 200)$",
      ],
      solutionExplanation: `$$\\beta = 3\\alpha = 3 \\cdot 17 \\times 10^{-6} = 51 \\times 10^{-6} \\text{ K}^{-1}$$
$$V = V_0(1 + \\beta \\Delta T) = 500 \\cdot (1 + 51 \\times 10^{-6} \\cdot 200) = 500 \\cdot 1{,}0102 = 505{,}1 \\text{ cm}^3$$`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-i-4",
      problemStatement: "Stenou z polystyrenu (tloustka $10$ cm, plocha $15$ m$^2$, $k = 0{,}033$ W/(m$\\cdot$K)) unika teplo. Uvnitr je $22$ $\\degree$C, venku $-8$ $\\degree$C. Jaky je tepelny tok stenou?",
      expectedAnswer: "148.5",
      acceptableAnswers: ["148.5", "148,5", "149", "148.5 W", "148,5 W"],
      numericTolerance: 1,
      hints: [
        "Pouzijte $P = \\frac{k \\cdot A \\cdot \\Delta T}{d}$.",
        "$P = \\frac{0{,}033 \\cdot 15 \\cdot 30}{0{,}1}$",
      ],
      solutionExplanation: `$$P = \\frac{k \\cdot A \\cdot \\Delta T}{d} = \\frac{0{,}033 \\cdot 15 \\cdot 30}{0{,}1} = \\frac{14{,}85}{0{,}1} = 148{,}5 \\text{ W}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-i-5",
      problemStatement: "Kolik ledu pri $0$ $\\degree$C je treba pridat do $1$ kg vody pri $30$ $\\degree$C, aby vysledna teplota byla presne $5$ $\\degree$C? ($c_{\\text{voda}} = 4180$ J/(kg$\\cdot$K), $L_{\\text{tani}} = 334\\,000$ J/kg)",
      expectedAnswer: "0.295",
      acceptableAnswers: ["0.295", "0,295", "0.30", "0,30", "295 g"],
      numericTolerance: 0.01,
      hints: [
        "Kalorimetricka rovnice: $m_{\\text{v}} \\cdot c \\cdot (30 - 5) = m_{\\text{led}} \\cdot L + m_{\\text{led}} \\cdot c \\cdot 5$.",
        "$1 \\cdot 4180 \\cdot 25 = m_{\\text{led}} \\cdot (334\\,000 + 4180 \\cdot 5)$",
      ],
      solutionExplanation: `$$m_{\\text{v}} \\cdot c \\cdot (T_{\\text{v}} - T) = m_{\\text{led}} \\cdot (L + c \\cdot T)$$
$$1 \\cdot 4180 \\cdot 25 = m_{\\text{led}} \\cdot (334\\,000 + 4180 \\cdot 5)$$
$$104\\,500 = m_{\\text{led}} \\cdot 354\\,900$$
$$m_{\\text{led}} = \\frac{104\\,500}{354\\,900} \\approx 0{,}295 \\text{ kg} = 295 \\text{ g}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Delkova roztaznost**: $\\Delta L = \\alpha L_0 \\Delta T$ -- materaly se pri zahrivani prodluzuji.",
      "**Objemova roztaznost**: $\\Delta V = \\beta V_0 \\Delta T$, priblizne $\\beta \\approx 3\\alpha$ pro pevne latky.",
      "**Skupenske teplo**: $Q = mL$ -- energie na zmenu skupenstvi (teplota se behem premeny nemeni!).",
      "**Ohrivaci krivka**: plata na krivce = skupenske premeny (taveni, var).",
      "**Vedeni tepla**: $P = kA\\Delta T/d$ -- Fourieruv zakon, kovy vedou dobre, izolanty spatne.",
    ],
    nextTopicSuggestion: "Skvele! Pokracujte na pokrocilou uroven -- zarivani, tepelny odpor a entropie.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Complex problems, radiation, entropy
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Teplota a teplo -- zarivani, tepelny odpor, entropie",
    sections: [
      {
        heading: "Stefan-Boltzmannuv zakon a Wienuv zakon",
        body: `Kazde teleso s teplotou vyssi nez absolutni nula **vyzaruje elektromagneticke zareni**. Vykon tohoto zareni popisuje **Stefan-Boltzmannuv zakon**:

$$\\boxed{P = \\varepsilon \\sigma A T^4}$$

- $P$ je zarivý vykon (W)
- $\\varepsilon$ je emisivita ($0 \\leq \\varepsilon \\leq 1$, dokonale cerne teleso: $\\varepsilon = 1$)
- $\\sigma = 5{,}67 \\times 10^{-8}$ W/(m$^2 \\cdot$ K$^4$) je Stefan-Boltzmannova konstanta
- $A$ je plocha povrchu (m$^2$)
- $T$ je **absolutni teplota** v kelvinech

**Wienuv posunovaci zakon** urcuje, na jake vlnove delce zareni dosahuje maxima:

$$\\boxed{\\lambda_{\\max} = \\frac{b}{T}}$$

kde $b = 2{,}898 \\times 10^{-3}$ m$\\cdot$K je Wienova konstanta.

$$\\begin{array}{l|c|c}
\\text{Objekt} & T \\text{ (K)} & \\lambda_{\\max} \\\\ \\hline
\\text{Slunce} & 5778 & 502 \\text{ nm (zelena)} \\\\
\\text{Clovek} & 310 & 9{,}3 \\text{ } \\mu\\text{m (IR)} \\\\
\\text{Zarka} & 3000 & 966 \\text{ nm (IR)} \\\\
\\text{Hvezda Betelgeuse} & 3500 & 828 \\text{ nm (cervena)}
\\end{array}$$

> [!key] Vykon zareni roste se **ctvertou mocninou** teploty! Zdvojnasobeni teploty znamena $2^4 = 16\\times$ vetsi vykon zareni.

> [!info] Wienuv zakon vysvetluje, proc jsou horke predmety cervene, pak bile a nakonec modre -- maximum zareni se posouva ke kratsim vlnovým delkam.`,
        examples: [
          {
            problem: "Jakou vlnovou delku ma maximum zareni lidského tela ($37$ $\\degree$C)?",
            solution: `$$T = 37 + 273 = 310 \\text{ K}$$
$$\\lambda_{\\max} = \\frac{b}{T} = \\frac{2{,}898 \\times 10^{-3}}{310} = \\color{#16a34a}{9{,}35 \\times 10^{-6} \\text{ m} = 9{,}35 \\text{ } \\mu\\text{m}}$$

To je infracervene zareni -- proto nas vidi termokamery!`,
          },
        ],
      },
      {
        heading: "Tri mechanismy prenosu tepla",
        body: `Teplo se prenasi tremi zpusoby:

**1. Vedeni (kondukce)** -- predavani energie mezi casticemi v primem kontaktu:
$$P = \\frac{kA\\Delta T}{d}$$
Typicke pro pevne latky (kovova lzicka v horkem caji).

**2. Proudeni (konvekce)** -- prenos tepla pohybem tekutiny (kapaliny nebo plynu):
- **Prirozena konvekce**: horky vzduch stouva, studeny klesa (topeni v mistnosti)
- **Nucena konvekce**: ventilator, cerpadlo (chladic v aute)
$$P = hA(T_{\\text{povrch}} - T_{\\text{tekutina}})$$
kde $h$ je koeficient prestupu tepla (zavisi na rychlosti proudeni, geometrii...).

**3. Zarivani (radiace)** -- prenos energie elektromagnetickymi vlnami:
$$P = \\varepsilon \\sigma A T^4$$
Nevyzaduje zadne medium -- funguje i ve vakuu (Slunce $\\to$ Zeme).

> [!tip] V praxi se vsechny tri mechanismy kombinuji. Napriklad radiator: **vedeni** v kovu, **konvekce** ohrivaneho vzduchu, **zareni** z povrchu.

| Mechanismus | Medium | Rychlost | Priklad |
|---|---|---|---|
| Vedeni | Pevna latka | Pomaly | Kovova tyce |
| Proudeni | Tekutina | Stredni | Topeni, oceanske proudy |
| Zareni | Zadne (vakuum) | Svetelna rychlost | Slunecni zareni |`,
      },
      {
        heading: "Tepelny odpor -- analogie s elektrickym obvodem",
        body: `Prenos tepla stenou lze popsat analogii s elektrickym obvodem:

$$\\boxed{R = \\frac{d}{kA}}$$

kde $R$ je **tepelny odpor** (K/W), $d$ je tloustka, $k$ je vodivost, $A$ je plocha.

Pak tepelny tok: $P = \\frac{\\Delta T}{R}$ (analogie: $I = \\frac{U}{R}$).

**Seriove zapojeni** (vrstvy za sebou, napr. zed + izolace):
$$\\boxed{R_{\\text{celk}} = R_1 + R_2 + R_3 + \\cdots}$$

**Paralelni zapojeni** (vedle sebe, napr. okno + stena):
$$\\boxed{\\frac{1}{R_{\\text{celk}}} = \\frac{1}{R_1} + \\frac{1}{R_2} + \\cdots}$$

> [!key] V technicke praxi se casto pouziva **U-hodnota** (soucitel prostupu tepla): $U = 1/(R \\cdot A)$ ve W/(m$^2 \\cdot$K). Nizsi U = lepsi izolace.

Priklad: Stena $=$ omitka + cihla + izolace + omitka. Celkovy odpor je soucet odporu vsech vrstev.`,
        examples: [
          {
            problem: "Stena se sklada z cihly ($d_1 = 0{,}25$ m, $k_1 = 0{,}8$) a polystyrenu ($d_2 = 0{,}1$ m, $k_2 = 0{,}033$). Plocha $A = 10$ m$^2$. Jaky je celkovy tepelny tok, pokud je uvnitr $20$ $\\degree$C a venku $-10$ $\\degree$C?",
            solution: `$$R_1 = \\frac{d_1}{k_1 A} = \\frac{0{,}25}{0{,}8 \\cdot 10} = 0{,}03125 \\text{ K/W}$$
$$R_2 = \\frac{d_2}{k_2 A} = \\frac{0{,}1}{0{,}033 \\cdot 10} = 0{,}303 \\text{ K/W}$$
$$R_{\\text{celk}} = R_1 + R_2 = 0{,}334 \\text{ K/W}$$
$$P = \\frac{\\Delta T}{R_{\\text{celk}}} = \\frac{30}{0{,}334} = \\color{#16a34a}{89{,}8 \\text{ W}}$$

Bez izolace by to bylo $P = 30/0{,}03125 = 960$ W -- izolace snizila ztraty $10\\times$!`,
          },
        ],
      },
      {
        heading: "Uvod do entropie",
        body: `Entropie $S$ je velicina, ktera meri **neusporadanost** (chaos) v systemu. Druhy zakon termodynamiky rika, ze entropie izolovane soustavy **nikdy neklesa**.

Pro reverzibilni (idealni) dej:

$$\\boxed{\\Delta S = \\frac{Q}{T}}$$

- $\\Delta S$ je zmena entropie (J/K)
- $Q$ je predane teplo (J)
- $T$ je absolutni teplota (K)

Priklady:
- Led taje ($Q > 0$, nizka $T$) $\\to$ velky narust entropie
- Para kondenzuje ($Q < 0$) $\\to$ entropie pary klesa, ale entropie okoli roste **jeste vice**

> [!key] Druhy zakon termodynamiky: $\\Delta S_{\\text{celk}} \\geq 0$. Celkova entropie vesmiru nikdy neklesa. Procesy jdou "samy od sebe" jen smerem k vetsi entropii.

**Prakticke dusledky**:
- Teplo vzdy samovolne prechazi z teplejsiho na chladnejsi (ne naopak)
- Nelze sestavit perpetuum mobile druheho druhu
- Ucinnost tepelneho stroje je vzdy mensi nez $100\\%$: $\\eta_{\\text{max}} = 1 - \\frac{T_{\\text{studeny}}}{T_{\\text{horky}}}$ (Carnotuv cyklus)`,
        examples: [
          {
            problem: "Jaka je zmena entropie, kdyz $1$ kg ledu roztaje pri $0$ $\\degree$C? ($L = 334\\,000$ J/kg)",
            solution: `$$\\Delta S = \\frac{Q}{T} = \\frac{mL}{T} = \\frac{1 \\cdot 334\\,000}{273} = \\color{#16a34a}{1224 \\text{ J/K}}$$

Taveni vyrazne zvysuje entropii -- castice prechazi z usporadane struktury (krystal) do neusporadane (kapalina).`,
          },
        ],
      },
      {
        heading: "Realne aplikace: termoska, vymeniky tepla, klima",
        body: `**Termoska (Dewarova nadoba)**:
Termoska minimalizuje vsechny tri zpusoby prenosu tepla:
- **Vedeni**: vakuum mezi stenami (zadne medium)
- **Proudeni**: vakuum (zadna konvekce)
- **Zareni**: zrcadlovy (stribrny) povrch ($\\varepsilon \\approx 0{,}02$)

**Vymeniky tepla**:
Zarizeni pro efektivni prenos tepla mezi dvema tekutinami (bez michani):
- Protiproudý vymenik je ucinnejsi nez souproudy
- Pouziti: chlazeni motoru, klimatizace, chemicky prumysl

**Klimaticke souvislosti**:
- **Sklenikovy efekt**: CO$_2$ a H$_2$O propousti viditelne svetlo, ale zachytavaji IR zareni od povrchu Zeme
- More jako **tepelny akumulator**: vysoka $c$ vody $\\to$ stabilni podnebne podminky na pobrezi
- **Albedo**: svetle povrchy odrazeji vice zareni ($\\varepsilon$ nizka), tmave pohlcuji ($\\varepsilon$ vysoka)

> [!info] Sklenikovy efekt je prirozeny a nutny -- bez nej by prumerna teplota Zeme byla asi $-18$ $\\degree$C misto $+15$ $\\degree$C. Problem je jeho zesileni lidskou cinnosti.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Ocelova koule o polomeru $r = 0{,}1$ m a teplote $T_1 = 800$ K je umistena ve vakuu. Okolni teplota je $T_2 = 300$ K. Emisivita oceli $\\varepsilon = 0{,}3$, $\\sigma = 5{,}67 \\times 10^{-8}$ W/(m$^2 \\cdot$ K$^4$). Jaky je cisty zarivý vykon koule?`,
    steps: [
      {
        instruction: "Spocitejte povrch koule",
        math: "$A = 4\\pi r^2 = 4\\pi \\cdot 0{,}1^2 = 4\\pi \\cdot 0{,}01 = 0{,}1257 \\text{ m}^2$",
        explanation: "Povrch koule s polomerem $0{,}1$ m.",
      },
      {
        instruction: "Spocitejte vykon vyzarovany kouli",
        math: "$P_{\\text{vyz}} = \\varepsilon \\sigma A T_1^4 = 0{,}3 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}1257 \\cdot 800^4$",
        explanation: "Koule vyzaruje podle Stefan-Boltzmannova zakona.",
      },
      {
        instruction: "Vypocitejte $T_1^4$",
        math: "$800^4 = 4{,}096 \\times 10^{11}$",
        explanation: "$800^2 = 640\\,000$, $800^4 = 640\\,000^2 = 4{,}096 \\times 10^{11}$.",
      },
      {
        instruction: "Dosadte do vyzarovaneho vykonu",
        math: "$P_{\\text{vyz}} = 0{,}3 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}1257 \\cdot 4{,}096 \\times 10^{11} = 876 \\text{ W}$",
        explanation: "Koule vyzaruje priblizne $876$ W.",
      },
      {
        instruction: "Spocitejte vykon pohlcovany z okoli",
        math: "$P_{\\text{pohl}} = \\varepsilon \\sigma A T_2^4 = 0{,}3 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}1257 \\cdot 300^4$\n$300^4 = 8{,}1 \\times 10^9$\n$P_{\\text{pohl}} = 0{,}3 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}1257 \\cdot 8{,}1 \\times 10^9 = 17{,}3 \\text{ W}$",
        explanation: "Koule take pohlcuje zareni z okoli.",
      },
      {
        instruction: "Cisty zarivý vykon",
        math: "$P_{\\text{cisty}} = P_{\\text{vyz}} - P_{\\text{pohl}} = 876 - 17{,}3 = 858{,}7 \\text{ W}$",
        explanation: "Koule ztraci teplo zarivanim cisteho vykonu priblizne $859$ W.",
      },
    ],
    finalAnswer: "Cisty zarivý vykon ocelove koule je priblizne $P \\approx 859$ W.",
  },
  practiceProblems: [
    {
      id: "tt-a-1",
      problemStatement: "Povrch hvezdy ma teplotu $T = 10\\,000$ K. Na jake vlnove delce je maximum jejiho zareni? ($b = 2{,}898 \\times 10^{-3}$ m$\\cdot$K)",
      expectedAnswer: "290",
      acceptableAnswers: ["290", "290 nm", "2.898e-7", "289.8 nm"],
      numericTolerance: 2,
      hints: [
        "Pouzijte Wienuv zakon: $\\lambda_{\\max} = b/T$.",
        "$\\lambda_{\\max} = 2{,}898 \\times 10^{-3} / 10\\,000$",
      ],
      solutionExplanation: `$$\\lambda_{\\max} = \\frac{b}{T} = \\frac{2{,}898 \\times 10^{-3}}{10\\,000} = 2{,}898 \\times 10^{-7} \\text{ m} = 290 \\text{ nm}$$

To je ultrafialove zareni -- hvezda s touto teplotou by vypadala modrobila.`,
      difficulty: "easy" as const,
    },
    {
      id: "tt-a-2",
      problemStatement: "Cerne teleso o plose $0{,}5$ m$^2$ ma teplotu $500$ K. Jaky je jeho zarivý vykon? ($\\varepsilon = 1$, $\\sigma = 5{,}67 \\times 10^{-8}$ W/(m$^2 \\cdot$ K$^4$))",
      expectedAnswer: "1772",
      acceptableAnswers: ["1772", "1772 W", "1.77 kW", "1,77 kW"],
      numericTolerance: 10,
      hints: [
        "Pouzijte $P = \\varepsilon \\sigma A T^4$.",
        "$P = 1 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}5 \\cdot 500^4$. Nejprve spocitejte $500^4$.",
      ],
      solutionExplanation: `$$500^4 = 6{,}25 \\times 10^{10}$$
$$P = \\varepsilon \\sigma A T^4 = 1 \\cdot 5{,}67 \\times 10^{-8} \\cdot 0{,}5 \\cdot 6{,}25 \\times 10^{10} = 1772 \\text{ W}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-a-3",
      problemStatement: "Stena se sklada ze tri vrstev: cihla ($d_1 = 0{,}2$ m, $k_1 = 0{,}8$), polystyren ($d_2 = 0{,}15$ m, $k_2 = 0{,}033$), omitka ($d_3 = 0{,}02$ m, $k_3 = 0{,}7$). Plocha $A = 12$ m$^2$. Uvnitr $22$ $\\degree$C, venku $-10$ $\\degree$C. Jaky je tepelny tok stenou?",
      expectedAnswer: "83.5",
      acceptableAnswers: ["83.5", "83,5", "84", "83.5 W", "83,5 W"],
      numericTolerance: 2,
      hints: [
        "Seriovy odpor: $R = R_1 + R_2 + R_3$, kde $R_i = d_i/(k_i A)$.",
        "$R_1 = 0{,}2/(0{,}8 \\cdot 12) = 0{,}0208$, $R_2 = 0{,}15/(0{,}033 \\cdot 12) = 0{,}3788$, $R_3 = 0{,}02/(0{,}7 \\cdot 12) = 0{,}00238$.",
      ],
      solutionExplanation: `$$R_1 = \\frac{0{,}2}{0{,}8 \\cdot 12} = 0{,}02083 \\text{ K/W}$$
$$R_2 = \\frac{0{,}15}{0{,}033 \\cdot 12} = 0{,}3788 \\text{ K/W}$$
$$R_3 = \\frac{0{,}02}{0{,}7 \\cdot 12} = 0{,}002381 \\text{ K/W}$$
$$R_{\\text{celk}} = 0{,}02083 + 0{,}3788 + 0{,}002381 = 0{,}402 \\text{ K/W}$$
$$P = \\frac{\\Delta T}{R_{\\text{celk}}} = \\frac{32}{0{,}402} \\approx 83{,}5 \\text{ W}$$

Polystyren tvori pres $94\\%$ celkoveho odporu -- je to klicova izolacni vrstva.`,
      difficulty: "hard" as const,
    },
    {
      id: "tt-a-4",
      problemStatement: "Tepelny stroj pracuje mezi teplotami $T_H = 600$ K a $T_C = 300$ K. Jaka je maximalni (Carnotova) ucinnost? Pokud stroj prijme $Q_H = 10\\,000$ J za cyklus, kolik uzitecne prace vykona pri teto maximalni ucinnosti?",
      expectedAnswer: "5000",
      acceptableAnswers: ["5000", "5000 J", "5 kJ"],
      hints: [
        "Carnotova ucinnost: $\\eta = 1 - T_C/T_H$.",
        "$\\eta = 1 - 300/600 = 0{,}5 = 50\\%$. Pak $W = \\eta \\cdot Q_H$.",
      ],
      solutionExplanation: `$$\\eta_{\\text{Carnot}} = 1 - \\frac{T_C}{T_H} = 1 - \\frac{300}{600} = 0{,}5 = 50\\%$$
$$W = \\eta \\cdot Q_H = 0{,}5 \\cdot 10\\,000 = 5000 \\text{ J}$$

Zadny skutecny stroj nemuze mit vyssi ucinnost nez $50\\%$ pri techto teplotach.`,
      difficulty: "medium" as const,
    },
    {
      id: "tt-a-5",
      problemStatement: "Vypocitejte celkovou zmenu entropie, kdyz $1$ kg vody o teplote $80$ $\\degree$C ($353$ K) smichame s $1$ kg vody o teplote $20$ $\\degree$C ($293$ K). Vysledna teplota je $50$ $\\degree$C ($323$ K). Pouzijte $\\Delta S = mc \\ln(T_2/T_1)$, $c = 4180$ J/(kg$\\cdot$K).",
      expectedAnswer: "24.8",
      acceptableAnswers: ["24.8", "24,8", "25", "24.8 J/K", "24,8 J/K"],
      numericTolerance: 1,
      hints: [
        "Spocitejte $\\Delta S$ pro kazdou porci zvlast: $\\Delta S_1 = mc\\ln(323/353)$, $\\Delta S_2 = mc\\ln(323/293)$.",
        "$\\Delta S_1 = 4180 \\cdot \\ln(0{,}915) = 4180 \\cdot (-0{,}0888)$ a $\\Delta S_2 = 4180 \\cdot \\ln(1{,}1024) = 4180 \\cdot 0{,}0975$.",
      ],
      solutionExplanation: `Horka voda (chladne z $353$ K na $323$ K):
$$\\Delta S_1 = mc\\ln\\frac{T_f}{T_1} = 1 \\cdot 4180 \\cdot \\ln\\frac{323}{353} = 4180 \\cdot (-0{,}0888) = -371 \\text{ J/K}$$

Studena voda (ohriva se z $293$ K na $323$ K):
$$\\Delta S_2 = mc\\ln\\frac{T_f}{T_2} = 1 \\cdot 4180 \\cdot \\ln\\frac{323}{293} = 4180 \\cdot 0{,}0975 = 407{,}6 \\text{ J/K}$$

$$\\Delta S_{\\text{celk}} = \\Delta S_1 + \\Delta S_2 = -371 + 407{,}6 = 24{,}8 \\text{ J/K} > 0$$

Celkova entropie roste -- michani je nevratny proces.`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Stefan-Boltzmannuv zakon**: $P = \\varepsilon\\sigma AT^4$ -- zarivý vykon roste se ctvertou mocninou teploty.",
      "**Wienuv zakon**: $\\lambda_{\\max} = b/T$ -- horci predmety zari na kratsich vlnovych delkach.",
      "**Tepelny odpor**: $R = d/(kA)$, seriove a paralelni zapojeni analogicky k elektrickym obvodum.",
      "**Entropie**: $\\Delta S = Q/T$ (reverzibilni dej). Celkova entropie v uzavrenem systemu nikdy neklesa.",
      "**Carnotova ucinnost**: $\\eta = 1 - T_C/T_H$ -- horni mez ucinnosti tepelneho stroje.",
    ],
    nextTopicSuggestion: "Vyborne! Nyni mate komplexni prehled o teple a teplote. Pokracujte na termodynamiku -- zakony, cykly a aplikace.",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Teplota a teplo\n");

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

  console.log("\n🎉 Done! Brilliant-style Teplota a teplo lessons seeded.\n");
}

main().catch(console.error);
