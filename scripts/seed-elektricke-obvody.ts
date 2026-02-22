import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "fd62a514-4c06-45d6-b646-70882f27a6cf";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Proud, Ohmův zákon, sériové a paralelní zapojení
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Elektricke obvody — zaklady proudu a odporu",
    sections: [
      {
        heading: "Elektricky proud",
        body: `Elektricky proud je **usporadany pohyb nabitych castic** (obvykle elektronu) vodicem. Proud tece, kdyz je obvod uzavreny a existuje zdroj napeti (baterie, zasuvka).

$$\\boxed{I = \\frac{Q}{t}}$$

- $I$ je proud v **amperech** (A)
- $Q$ je naboj v **coulombech** (C)
- $t$ je cas v **sekundach** (s)

$$\\begin{array}{l|c|c} \\text{Situace} & I \\text{ (A)} & \\text{Popis} \\\\ \\hline \\text{LED dioda} & 0{,}02 & \\text{velmi maly proud} \\\\ \\text{Zarovka} & 0{,}5 & \\text{bezny spotrebic} \\\\ \\text{Rychlovarna konvice} & 10 & \\text{velky proud} \\\\ \\text{Blesk} & 30\\,000 & \\text{extremni proud} \\end{array}$$

> [!key] **Dohodnuty smer proudu** je od kladneho polu zdroje ($+$) k zapornemu ($-$). Elektrony ve skutecnosti teco opacne, ale v rovnicich pouzivame dohodnuty smer.

> [!info] Jeden amper znamena, ze vodicem projde naboj $1$ C za $1$ sekundu. To odpovida priblizne $6{,}24 \\times 10^{18}$ elektronu!`,
        examples: [
          {
            problem: "Vodicem protecel za $5$ minut naboj $60$ C. Jaky proud tecl vodicem?",
            solution: `$$t = 5 \\text{ min} = 300 \\text{ s}$$
$$I = \\frac{Q}{t} = \\frac{60}{300} = \\color{#16a34a}{0{,}2 \\text{ A} = 200 \\text{ mA}}$$`,
          },
        ],
      },
      {
        heading: "Ohmuv zakon",
        body: `**Ohmuv zakon** je nejdulezitejsi vztah v elektrickych obvodech:

$$\\boxed{U = I \\cdot R}$$

- $U$ je **napeti** v **voltech** (V) — hnaci sila proudu
- $I$ je **proud** v **amperech** (A) — tok naboju
- $R$ je **odpor** v **ohmech** ($\\Omega$) — brzdeni proudu

Z toho plyne:
$$I = \\frac{U}{R} \\qquad R = \\frac{U}{I}$$

**Odpor vodice** zavisi na jeho geometrii a materialu:

$$\\boxed{R = \\frac{\\rho \\cdot l}{A}}$$

kde $\\rho$ je **rezistivita** (merny odpor), $l$ je delka a $A$ je prurez vodice.

$$\\begin{array}{l|c} \\text{Material} & \\rho \\text{ (}\\Omega\\text{m)} \\\\ \\hline \\text{Med} & 1{,}7 \\times 10^{-8} \\\\ \\text{Hlinik} & 2{,}7 \\times 10^{-8} \\\\ \\text{Zelezo} & 1{,}0 \\times 10^{-7} \\\\ \\text{Nichrom} & 1{,}1 \\times 10^{-6} \\end{array}$$

> [!key] Cim vetsi odpor, tim mensi proud (pri stejnem napeti). Cim delsi nebo tensi vodic, tim vetsi odpor.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "ohm",
            defaultVoltage: 12,
            defaultR1: 100,
          },
          caption: "Menjte napeti a odpor — sledujte, jak se meni proud podle Ohmova zakona",
        },
        examples: [
          {
            problem: "Zarovkou s odporem $240 \\text{ }\\Omega$ tece proud $0{,}5$ A. Jake je napeti na zarovce?",
            solution: `$$U = I \\cdot R = 0{,}5 \\cdot 240 = \\color{#16a34a}{120 \\text{ V}}$$`,
          },
          {
            problem: "K baterii $9$ V pripojime rezistor $180 \\text{ }\\Omega$. Jaky proud potece?",
            solution: `$$I = \\frac{U}{R} = \\frac{9}{180} = \\color{#16a34a}{0{,}05 \\text{ A} = 50 \\text{ mA}}$$`,
          },
        ],
      },
      {
        heading: "Seriove zapojeni",
        body: `Kdyz zapojime rezistory **za sebe** (do serie), proud prochazi pres vsechny postupne.

$$\\boxed{R = R_1 + R_2 + \\ldots + R_n}$$

V seriovem zapojeni plati:
- **Proud je vsude stejny**: $I = I_1 = I_2$
- **Napeti se deli**: $U = U_1 + U_2$

$$U_1 = I \\cdot R_1, \\quad U_2 = I \\cdot R_2$$

> [!key] Seriove zapojeni zvetsuje celkovy odpor. Dva rezistory $100 \\text{ }\\Omega$ v serii maji dohromady $200 \\text{ }\\Omega$.

> [!tip] Predstavte si serove zapojeni jako **jednu dlouhou trubku** — voda (proud) musi projit pres vsechny prekazky (rezistory) postupne.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "series",
            defaultVoltage: 12,
            defaultR1: 100,
            defaultR2: 200,
          },
          caption: "Seriove zapojeni: menjte hodnoty rezistoru a sledujte rozdeleni napeti",
        },
        examples: [
          {
            problem: "Dva rezistory $R_1 = 100 \\text{ }\\Omega$ a $R_2 = 200 \\text{ }\\Omega$ jsou zapojeny v serii na $12$ V. Jaky proud tece obvodem?",
            solution: `$$R = R_1 + R_2 = 100 + 200 = 300 \\text{ }\\Omega$$
$$I = \\frac{U}{R} = \\frac{12}{300} = \\color{#16a34a}{0{,}04 \\text{ A} = 40 \\text{ mA}}$$`,
          },
        ],
      },
      {
        heading: "Paralelni zapojeni",
        body: `Kdyz zapojime rezistory **vedle sebe** (paralelne), proud se rozdeluje do vsetvich.

$$\\boxed{\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2}}$$

Pro dva rezistory:
$$R = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$$

V paralelnim zapojeni plati:
- **Napeti je vsude stejne**: $U = U_1 = U_2$
- **Proud se deli**: $I = I_1 + I_2$

$$I_1 = \\frac{U}{R_1}, \\quad I_2 = \\frac{U}{R_2}$$

> [!key] Paralelni zapojeni **zmensuje** celkovy odpor! Vysledny odpor je vzdy mensi nez nejmensi z rezistoru. Dva rezistory $100 \\text{ }\\Omega$ paralelne maji dohromady $50 \\text{ }\\Omega$.

> [!tip] Predstavte si paralelni zapojeni jako **dve trubky vedle sebe** — voda (proud) se rozdeluje a celkovy prutok je vetsi.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "parallel",
            defaultVoltage: 12,
            defaultR1: 100,
            defaultR2: 200,
          },
          caption: "Paralelni zapojeni: menjte hodnoty rezistoru a sledujte rozdeleni proudu",
        },
        examples: [
          {
            problem: "Dva rezistory $R_1 = 100 \\text{ }\\Omega$ a $R_2 = 200 \\text{ }\\Omega$ jsou zapojeny paralelne na $12$ V. Jaky je celkovy proud?",
            solution: `$$R = \\frac{R_1 \\cdot R_2}{R_1 + R_2} = \\frac{100 \\cdot 200}{100 + 200} = \\frac{20\\,000}{300} \\approx 66{,}7 \\text{ }\\Omega$$
$$I = \\frac{U}{R} = \\frac{12}{66{,}7} = \\color{#16a34a}{0{,}18 \\text{ A} = 180 \\text{ mA}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Dva rezistory $R_1 = 150 \\text{ }\\Omega$ a $R_2 = 300 \\text{ }\\Omega$ jsou zapojeny v serii ke zdroji napeti $U = 9$ V. Urcete celkovy odpor, proud v obvodu a napeti na kazdem rezistoru.`,
    steps: [
      {
        instruction: "Spocitejte celkovy odpor serioveho zapojeni",
        math: "$R = R_1 + R_2 = 150 + 300 = 450 \\text{ }\\Omega$",
        explanation: "V seriovem zapojeni se odpory scitaji.",
      },
      {
        instruction: "Vypocitejte proud v obvodu",
        math: "$I = \\frac{U}{R} = \\frac{9}{450} = 0{,}02 \\text{ A} = 20 \\text{ mA}$",
        explanation: "Z Ohmova zakona. V serii tece vsude stejny proud.",
      },
      {
        instruction: "Urcete napeti na prvnim rezistoru",
        math: "$U_1 = I \\cdot R_1 = 0{,}02 \\cdot 150 = 3 \\text{ V}$",
        explanation: "Napeti na rezistoru je soucin proudu a odporu.",
      },
      {
        instruction: "Urcete napeti na druhem rezistoru",
        math: "$U_2 = I \\cdot R_2 = 0{,}02 \\cdot 300 = 6 \\text{ V}$",
        explanation: "Vetsi odpor ma vetsi ubytek napeti.",
      },
      {
        instruction: "Overeni: soucet napeti se musi rovnat celkovemu napeti",
        math: "$U_1 + U_2 = 3 + 6 = 9 \\text{ V} = U \\quad \\checkmark$",
        explanation: "Soucet napeti na rezistorech odpovida napeti zdroje — vse sedi!",
      },
    ],
    finalAnswer: "Celkovy odpor je $R = 450 \\text{ }\\Omega$, proud $I = 20$ mA, napeti $U_1 = 3$ V a $U_2 = 6$ V.",
  },
  practiceProblems: [
    {
      id: "eo-b-1",
      problemStatement: "Rezistorem $470 \\text{ }\\Omega$ tece proud $0{,}1$ A. Jake je napeti na rezistoru?",
      expectedAnswer: "47",
      acceptableAnswers: ["47", "47 V"],
      hints: [
        "Pouzijte Ohmuv zakon: $U = I \\cdot R$.",
        "$U = 0{,}1 \\cdot 470$",
      ],
      solutionExplanation: `$$U = I \\cdot R = 0{,}1 \\cdot 470 = 47 \\text{ V}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-b-2",
      problemStatement: "K baterii $12$ V pripojime dva rezistory $R_1 = 200 \\text{ }\\Omega$ a $R_2 = 400 \\text{ }\\Omega$ v serii. Jaky proud tece obvodem?",
      expectedAnswer: "0.02",
      acceptableAnswers: ["0.02", "0,02", "0.02 A", "0,02 A", "20 mA"],
      hints: [
        "Celkovy odpor v serii: $R = R_1 + R_2$.",
        "$R = 200 + 400 = 600 \\text{ }\\Omega$, pak $I = U/R$.",
      ],
      solutionExplanation: `$$R = R_1 + R_2 = 200 + 400 = 600 \\text{ }\\Omega$$
$$I = \\frac{U}{R} = \\frac{12}{600} = 0{,}02 \\text{ A} = 20 \\text{ mA}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-b-3",
      problemStatement: "Dva rezistory $R_1 = 300 \\text{ }\\Omega$ a $R_2 = 600 \\text{ }\\Omega$ jsou zapojeny paralelne. Jaky je celkovy odpor?",
      expectedAnswer: "200",
      acceptableAnswers: ["200", "200 Ohm", "200 Ω"],
      hints: [
        "Pro dva rezistory paralelne: $R = \\frac{R_1 \\cdot R_2}{R_1 + R_2}$.",
        "$R = \\frac{300 \\cdot 600}{300 + 600}$",
      ],
      solutionExplanation: `$$R = \\frac{R_1 \\cdot R_2}{R_1 + R_2} = \\frac{300 \\cdot 600}{300 + 600} = \\frac{180\\,000}{900} = 200 \\text{ }\\Omega$$`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-b-4",
      problemStatement: "Medeny drat ma delku $10$ m a prurez $1 \\text{ mm}^2$. Jaky je jeho odpor? ($\\rho_{\\text{Cu}} = 1{,}7 \\times 10^{-8} \\text{ }\\Omega\\text{m}$)",
      expectedAnswer: "0.17",
      acceptableAnswers: ["0.17", "0,17", "0.17 Ohm", "0,17 Ω"],
      numericTolerance: 0.01,
      hints: [
        "$R = \\rho l / A$. Pozor na jednotky: $1 \\text{ mm}^2 = 10^{-6} \\text{ m}^2$.",
        "$R = \\frac{1{,}7 \\times 10^{-8} \\cdot 10}{10^{-6}}$",
      ],
      solutionExplanation: `$$A = 1 \\text{ mm}^2 = 1 \\times 10^{-6} \\text{ m}^2$$
$$R = \\frac{\\rho \\cdot l}{A} = \\frac{1{,}7 \\times 10^{-8} \\cdot 10}{1 \\times 10^{-6}} = \\frac{1{,}7 \\times 10^{-7}}{10^{-6}} = 0{,}17 \\text{ }\\Omega$$`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-b-5",
      problemStatement: "Tri stejne zarovky s odporem $R = 60 \\text{ }\\Omega$ jsou zapojeny paralelne ke zdroji $12$ V. Jaky celkovy proud dodava zdroj?",
      expectedAnswer: "0.6",
      acceptableAnswers: ["0.6", "0,6", "0.6 A", "0,6 A", "600 mA"],
      hints: [
        "Celkovy odpor tri stejnych rezistoru paralelne: $R_{\\text{celk}} = R/3$.",
        "$R_{\\text{celk}} = 60/3 = 20 \\text{ }\\Omega$, pak $I = U/R_{\\text{celk}}$.",
      ],
      solutionExplanation: `$$\\frac{1}{R_{\\text{celk}}} = \\frac{1}{60} + \\frac{1}{60} + \\frac{1}{60} = \\frac{3}{60} \\quad \\Rightarrow \\quad R_{\\text{celk}} = 20 \\text{ }\\Omega$$
$$I = \\frac{U}{R_{\\text{celk}}} = \\frac{12}{20} = 0{,}6 \\text{ A}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Elektricky proud**: $I = Q/t$ — usporadany pohyb naboju, jednotka amper (A).",
      "**Ohmuv zakon**: $U = IR$ — napeti = proud $\\times$ odpor.",
      "**Odpor vodice**: $R = \\rho l / A$ — zavisi na materialu, delce a prurezu.",
      "**Seriove zapojeni**: $R = R_1 + R_2$, stejny proud, napeti se deli.",
      "**Paralelni zapojeni**: $1/R = 1/R_1 + 1/R_2$, stejne napeti, proud se deli.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na stredne pokrocilou uroven — naucite se Kirchhoffovy zakony a pocitat vykon v obvodech.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Kirchhoff, výkon, rezistivita, složitější obvody
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Elektricke obvody — Kirchhoff, vykon a slozitejsi zapojeni",
    sections: [
      {
        heading: "Kirchhoffovy zakony",
        body: `Kirchhoffovy zakony jsou zakladem analyzy slozitych obvodu. Umoznuji resit obvody, ktere nejsou ani ciste seriove, ani ciste paralelni.

**1. Kirchhoffuv zakon (proudovy, uzlovy)**:

$$\\boxed{\\sum I_{\\text{vstup}} = \\sum I_{\\text{vystup}}}$$

V kazdem uzlu (vetveni) se proudy **scitaji na nulu** — co pritece, to odtece. Je to zachovani naboje.

**2. Kirchhoffuv zakon (napetovy, smyckovy)**:

$$\\boxed{\\sum U = 0 \\quad \\text{(v kazde uzavrene smycce)}}$$

Soucet vsech napeti v uzavrene smycce je nulovy. Napeti na zdroji "tlaci" proud, napeti na rezistorech "brzdi".

> [!key] Postup: 1) Zvolte smery proudu v kazde vetvi. 2) Zapiste proudovou rovnici pro uzly. 3) Zapiste napetovou rovnici pro smycky. 4) Reste soustavu rovnic.

> [!info] Pokud vyjde proud zaporny, znamena to, ze ve skutecnosti tece opacnym smerem, nez jsme predpokladali — to je v poradku!`,
        examples: [
          {
            problem: "Do uzlu priteka proud $I_1 = 3$ A a $I_2 = 2$ A. Kolik proudu odteka?",
            solution: `Podle 1. Kirchhoffova zakona:
$$I_{\\text{out}} = I_1 + I_2 = 3 + 2 = \\color{#16a34a}{5 \\text{ A}}$$`,
          },
        ],
      },
      {
        heading: "Elektricka prace a vykon",
        body: `Kdyz proud prochazi rezistorem, elektricka energie se premenna na **teplo** (Joulovo teplo).

**Elektricka prace** (energie spotrebovana za cas $t$):
$$\\boxed{W = U \\cdot I \\cdot t}$$

**Elektricky vykon** (energie za sekundu):
$$\\boxed{P = U \\cdot I}$$

S pouzitim Ohmova zakona ($U = IR$) dostaneme dalsi tvary:
$$P = I^2 R = \\frac{U^2}{R}$$

$$\\begin{array}{l|c|c|c} \\text{Spotrebic} & U \\text{ (V)} & I \\text{ (A)} & P \\text{ (W)} \\\\ \\hline \\text{LED zarovka} & 230 & 0{,}04 & 10 \\\\ \\text{Notebook} & 20 & 3 & 60 \\\\ \\text{Rychlovarna konvice} & 230 & 8{,}7 & 2000 \\\\ \\text{Elektricky sporiak} & 230 & 17 & 4000 \\end{array}$$

**Kilowatthodina** (kWh) je jednotka energie pro ucty za elektrinu:
$$1 \\text{ kWh} = 1000 \\text{ W} \\cdot 3600 \\text{ s} = 3{,}6 \\times 10^6 \\text{ J} = 3{,}6 \\text{ MJ}$$

> [!key] Vykon roste s **druhou mocninou** proudu ($P = I^2 R$). Zdvojnasobeni proudu znamena ctyrnasobny vykon (a ctyrikrat vice tepla!).

> [!tip] Spotreba konvice: $2000$ W $\\times$ $0{,}05$ h (3 min) $= 0{,}1$ kWh. Pri cene $5$ Kc/kWh to je $0{,}50$ Kc.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "ohm",
            defaultVoltage: 24,
            defaultR1: 200,
            showPower: true,
          },
          caption: "Sledujte, jak se meni vykon pri zmene napeti a odporu",
        },
        examples: [
          {
            problem: "Zarovka s vyknem $60$ W je pripojena na $230$ V po dobu $5$ hodin. Kolik energie spotrebuje?",
            solution: `$$W = P \\cdot t = 60 \\cdot 5 = 300 \\text{ Wh} = \\color{#16a34a}{0{,}3 \\text{ kWh}}$$`,
          },
        ],
      },
      {
        heading: "Rezistivita a zavislost na teplote",
        body: `Odpor vodice neni konstantni — meni se s teplotou:

$$\\boxed{R(T) = R_0 \\cdot (1 + \\alpha \\cdot \\Delta T)}$$

kde:
- $R_0$ je odpor pri referencni teplote (obvykle $20$ $\\degree$C)
- $\\alpha$ je **teplotni soucinitel odporu** (K$^{-1}$)
- $\\Delta T = T - T_0$ je zmena teploty

Ekvivalentne pro rezistivitu:
$$\\rho(T) = \\rho_0 \\cdot (1 + \\alpha \\cdot \\Delta T)$$

$$\\begin{array}{l|c|c} \\text{Material} & \\rho_0 \\text{ (}\\Omega\\text{m)} & \\alpha \\text{ (K}^{-1}\\text{)} \\\\ \\hline \\text{Med} & 1{,}7 \\times 10^{-8} & 3{,}9 \\times 10^{-3} \\\\ \\text{Wolfram} & 5{,}6 \\times 10^{-8} & 4{,}5 \\times 10^{-3} \\\\ \\text{Nichrom} & 1{,}1 \\times 10^{-6} & 0{,}4 \\times 10^{-3} \\end{array}$$

> [!key] **Kovy**: odpor roste s teplotou ($\\alpha > 0$). Wolframove vlakno zarovky ma za provozu asi $10\\times$ vetsi odpor nez za studena.

> [!info] **Supravodice**: pod kritickou teplotou (obvykle blizko $0$ K) klesa odpor presne na nulu. Proud tece bez jakychkoli ztrat!`,
      },
      {
        heading: "Slozitejsi obvody",
        body: `**Napetovy delic** — zakladni zapojeni pro ziskani mensiho napeti:

$$\\boxed{U_{\\text{out}} = U \\cdot \\frac{R_2}{R_1 + R_2}}$$

Vystupni napeti je urceno pomerem rezistoru. Napriklad $R_1 = R_2$ dava $U_{\\text{out}} = U/2$.

**Wheatstoneho mustek** — presne mereni odporu:

Ctyrmi rezistory tvorici mustek. Mustek je vyvazeny, kdyz:
$$\\frac{R_1}{R_2} = \\frac{R_3}{R_4}$$

Pri vyvazenem mustku neni mezi stredy zadne napeti a neplyne jimi proud.

**Kombinovane obvody** — seriovo-paralelni zapojeni:

Postup reseni:
1. Identifikujte, ktere rezistory jsou v serii a ktere paralelne
2. Zjednoduste paralelni skupiny na jeden ekvivalentni odpor
3. Sectete seriove odpory
4. Pouzijte Ohmuv zakon pro celkovy proud a zpetne dopocitejte napeti a proudy

> [!tip] Pri reseni slozitych obvodu kreslete **postupne zjednodusene schemata** — kazdy krok nahradte skupinu jednim rezistorem.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "series",
            defaultVoltage: 18,
            defaultR1: 150,
            defaultR2: 300,
          },
          caption: "Napetovy delic: vystupni napeti se deli v pomeru rezistoru",
        },
        examples: [
          {
            problem: "Napetovy delic: $U = 12$ V, $R_1 = 1 \\text{ k}\\Omega$, $R_2 = 3 \\text{ k}\\Omega$. Jake je vystupni napeti?",
            solution: `$$U_{\\text{out}} = 12 \\cdot \\frac{3000}{1000 + 3000} = 12 \\cdot \\frac{3}{4} = \\color{#16a34a}{9 \\text{ V}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Obvod obsahuje zdroj napeti $U = 24$ V a tri rezistory: $R_1 = 200 \\text{ }\\Omega$ je v serii s paralelni kombinaci $R_2 = 300 \\text{ }\\Omega$ a $R_3 = 600 \\text{ }\\Omega$. Pouzijte Kirchhoffovy zakony k urceni proudu v kazde vetvi a napeti na kazdem rezistoru.`,
    steps: [
      {
        instruction: "Spocitejte ekvivalentni odpor paralelni kombinace $R_2$ a $R_3$",
        math: "$R_{23} = \\frac{R_2 \\cdot R_3}{R_2 + R_3} = \\frac{300 \\cdot 600}{300 + 600} = \\frac{180\\,000}{900} = 200 \\text{ }\\Omega$",
        explanation: "Paralelni kombinace dvou rezistoru — pouzijeme vzorec pro soucin/soucet.",
      },
      {
        instruction: "Spocitejte celkovy odpor obvodu",
        math: "$R_{\\text{celk}} = R_1 + R_{23} = 200 + 200 = 400 \\text{ }\\Omega$",
        explanation: "$R_1$ je v serii s paralelni kombinaci $R_{23}$.",
      },
      {
        instruction: "Urcete celkovy proud ze zdroje",
        math: "$I = \\frac{U}{R_{\\text{celk}}} = \\frac{24}{400} = 0{,}06 \\text{ A} = 60 \\text{ mA}$",
        explanation: "Toto je proud tekouci pres $R_1$ a do uzlu, kde se deli.",
      },
      {
        instruction: "Urcete napeti na $R_1$ a na paralelni kombinaci",
        math: "$U_1 = I \\cdot R_1 = 0{,}06 \\cdot 200 = 12 \\text{ V}$\n$U_{23} = I \\cdot R_{23} = 0{,}06 \\cdot 200 = 12 \\text{ V}$",
        explanation: "Napeti se deli: $U_1 + U_{23} = 12 + 12 = 24$ V = $U$. (Sedi!)",
      },
      {
        instruction: "Urcete proudy v paralelni vetvi (1. Kirchhoffuv zakon)",
        math: "$I_2 = \\frac{U_{23}}{R_2} = \\frac{12}{300} = 0{,}04 \\text{ A} = 40 \\text{ mA}$\n$I_3 = \\frac{U_{23}}{R_3} = \\frac{12}{600} = 0{,}02 \\text{ A} = 20 \\text{ mA}$",
        explanation: "Overeni: $I_2 + I_3 = 40 + 20 = 60$ mA $= I$. Proudy v uzlu se scitaji!",
      },
    ],
    finalAnswer: "Celkovy proud $I = 60$ mA, napeti $U_1 = 12$ V, $U_{23} = 12$ V. Proud pres $R_2$ je $40$ mA a pres $R_3$ je $20$ mA.",
  },
  practiceProblems: [
    {
      id: "eo-i-1",
      problemStatement: "Do uzlu priteka proud $I_1 = 2$ A a $I_2 = 3$ A. Z uzlu odteka proud $I_3 = 1{,}5$ A. Jaky je proud $I_4$ odtekajici z uzlu?",
      expectedAnswer: "3.5",
      acceptableAnswers: ["3.5", "3,5", "3.5 A", "3,5 A"],
      hints: [
        "1. Kirchhoffuv zakon: $I_1 + I_2 = I_3 + I_4$.",
        "$2 + 3 = 1{,}5 + I_4$",
      ],
      solutionExplanation: `$$I_1 + I_2 = I_3 + I_4$$
$$2 + 3 = 1{,}5 + I_4$$
$$I_4 = 5 - 1{,}5 = 3{,}5 \\text{ A}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-i-2",
      problemStatement: "Elektricky ohrivac s odporem $50 \\text{ }\\Omega$ je pripojen na $230$ V. Jaky je jeho vykon?",
      expectedAnswer: "1058",
      acceptableAnswers: ["1058", "1058 W", "1.06 kW", "1,06 kW"],
      numericTolerance: 5,
      hints: [
        "$P = U^2/R$.",
        "$P = 230^2 / 50$",
      ],
      solutionExplanation: `$$P = \\frac{U^2}{R} = \\frac{230^2}{50} = \\frac{52\\,900}{50} = 1058 \\text{ W} \\approx 1{,}06 \\text{ kW}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-i-3",
      problemStatement: "Napetovy delic: $U = 20$ V, $R_1 = 2 \\text{ k}\\Omega$, $R_2 = 3 \\text{ k}\\Omega$. Jake je vystupni napeti na $R_2$?",
      expectedAnswer: "12",
      acceptableAnswers: ["12", "12 V"],
      hints: [
        "$U_{\\text{out}} = U \\cdot R_2/(R_1 + R_2)$.",
        "$U_{\\text{out}} = 20 \\cdot 3000/5000$",
      ],
      solutionExplanation: `$$U_{\\text{out}} = U \\cdot \\frac{R_2}{R_1 + R_2} = 20 \\cdot \\frac{3000}{2000 + 3000} = 20 \\cdot 0{,}6 = 12 \\text{ V}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-i-4",
      problemStatement: "Medeny vodic ma pri $20$ $\\degree$C odpor $10 \\text{ }\\Omega$. Jaky bude jeho odpor pri $120$ $\\degree$C? ($\\alpha = 3{,}9 \\times 10^{-3}$ K$^{-1}$)",
      expectedAnswer: "13.9",
      acceptableAnswers: ["13.9", "13,9", "13.9 Ohm", "13,9 Ω"],
      numericTolerance: 0.1,
      hints: [
        "$R = R_0(1 + \\alpha \\Delta T)$.",
        "$\\Delta T = 120 - 20 = 100$ K.",
        "$R = 10 \\cdot (1 + 3{,}9 \\times 10^{-3} \\cdot 100)$",
      ],
      solutionExplanation: `$$R = R_0(1 + \\alpha \\Delta T) = 10 \\cdot (1 + 3{,}9 \\times 10^{-3} \\cdot 100)$$
$$= 10 \\cdot (1 + 0{,}39) = 10 \\cdot 1{,}39 = 13{,}9 \\text{ }\\Omega$$`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-i-5",
      problemStatement: "Obvod: zdroj $U = 30$ V, $R_1 = 100 \\text{ }\\Omega$ v serii s paralelni kombinaci $R_2 = 200 \\text{ }\\Omega$ a $R_3 = 200 \\text{ }\\Omega$. Jaky proud tece zdrojem?",
      expectedAnswer: "0.15",
      acceptableAnswers: ["0.15", "0,15", "0.15 A", "0,15 A", "150 mA"],
      hints: [
        "Paralelni kombinace dvou stejnych: $R_{23} = R/2 = 100 \\text{ }\\Omega$.",
        "$R_{\\text{celk}} = R_1 + R_{23} = 100 + 100 = 200 \\text{ }\\Omega$.",
        "$I = U/R_{\\text{celk}} = 30/200$.",
      ],
      solutionExplanation: `$$R_{23} = \\frac{200 \\cdot 200}{200 + 200} = \\frac{40\\,000}{400} = 100 \\text{ }\\Omega$$
$$R_{\\text{celk}} = 100 + 100 = 200 \\text{ }\\Omega$$
$$I = \\frac{30}{200} = 0{,}15 \\text{ A} = 150 \\text{ mA}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**1. Kirchhoffuv zakon** (uzlovy): soucet proudu do uzlu = soucet proudu z uzlu ($\\sum I = 0$).",
      "**2. Kirchhoffuv zakon** (smyckovy): soucet napeti v uzavrene smycce je nulovy ($\\sum U = 0$).",
      "**Elektricky vykon**: $P = UI = I^2R = U^2/R$. Energie: $W = Pt$, ucet v kWh.",
      "**Teplotni zavislost**: $R = R_0(1 + \\alpha \\Delta T)$ — odpor kovu roste s teplotou.",
      "**Napetovy delic**: $U_{\\text{out}} = U \\cdot R_2/(R_1 + R_2)$ — zakladni zapojeni elektroniky.",
    ],
    nextTopicSuggestion: "Skvele! Pokracujte na pokrocilou uroven — naucite se o vnitrnim odporu zdroje, RC obvodech a nelinearnich prvcich.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Vnitřní odpor, RC obvody, nelineární prvky, bezpečnost
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Elektricke obvody — pokrocile temata",
    sections: [
      {
        heading: "Vnitrni odpor zdroje",
        body: `Realy zdroj napeti (baterie, generator) neni idealni — ma **vnitrni odpor** $r$. Elektromotorucke napeti (EMF) $\\varepsilon$ je napeti naprazdno (bez zateze).

Kdyz pripolojime zatez $R$, napeti na svorkach klesa:

$$\\boxed{U = \\varepsilon - I \\cdot r}$$

kde $I$ je proud obvodem:

$$I = \\frac{\\varepsilon}{R + r}$$

**Ubytek napeti na vnitrnim odporu**: $U_r = I \\cdot r$

Pri zkratu ($R = 0$): $I_{\\text{zkrat}} = \\varepsilon / r$ — velmi velky proud (nebezpecne!).

**Veta o maximalnim prenosu vykonu**: Zatez odebira maximalni vykon, kdyz:

$$\\boxed{R_{\\text{zatez}} = r}$$

V tom pripade je vykon na zatezi:
$$P_{\\max} = \\frac{\\varepsilon^2}{4r}$$

a ucinnost prenosu je pouze $50\\%$ (druha polovina se maoi na vnitrnim odporu).

> [!key] S rostouci zatezi (rostouci $I$) klesa svorkove napeti: $U = \\varepsilon - Ir$. Pri $I = 0$ (naprazdno) je $U = \\varepsilon$.

> [!info] Autoatova baterie ma EMF $\\approx 12{,}6$ V a vnitrni odpor $\\approx 0{,}05 \\text{ }\\Omega$. Pri startovani ($I \\approx 200$ A) klesa napeti na $12{,}6 - 200 \\cdot 0{,}05 = 2{,}6$ V — proto svetla pri startovani zeslabnou!`,
        examples: [
          {
            problem: "Baterie s EMF $\\varepsilon = 9$ V a vnitrnim odporem $r = 1 \\text{ }\\Omega$ je pripojena k rezistoru $R = 8 \\text{ }\\Omega$. Jake je svorkove napeti?",
            solution: `$$I = \\frac{\\varepsilon}{R + r} = \\frac{9}{8 + 1} = 1 \\text{ A}$$
$$U = \\varepsilon - Ir = 9 - 1 \\cdot 1 = \\color{#16a34a}{8 \\text{ V}}$$`,
          },
        ],
      },
      {
        heading: "RC obvody",
        body: `Obvod s rezistorem $R$ a kondenzatorem $C$ vykazuje casove zavisle chovani.

**Nabijeni kondenzatoru** (zdroj $\\varepsilon$, odpor $R$, kapacita $C$):

$$Q(t) = C\\varepsilon\\left(1 - e^{-t/(RC)}\\right)$$

$$U_C(t) = \\varepsilon\\left(1 - e^{-t/(RC)}\\right)$$

$$I(t) = \\frac{\\varepsilon}{R} \\cdot e^{-t/(RC)}$$

**Casova konstanta**:

$$\\boxed{\\tau = R \\cdot C}$$

- Za cas $\\tau$ se kondenzator nabije na $63\\%$ maximalniho naboje
- Za $5\\tau$ je kondenzator prakticky plne nabity ($99{,}3\\%$)

$$\\begin{array}{c|cccc} t & \\tau & 2\\tau & 3\\tau & 5\\tau \\\\ \\hline Q/Q_{\\max} & 63\\% & 86\\% & 95\\% & 99{,}3\\% \\end{array}$$

**Vybijeni kondenzatoru** (bez zdroje):
$$Q(t) = Q_0 \\cdot e^{-t/(RC)}$$

**Energie ulozena v kondenzatoru:**
$$W_C = \\frac{1}{2}C\\varepsilon^2$$

**Energie disipovana v rezistoru** pri nabijeni:
$$W_R = \\frac{1}{2}C\\varepsilon^2$$

> [!key] Pri nabijeni se **presne polovina** energie ze zdroje ulozi v kondenzatoru a druha polovina se premeni na teplo v rezistoru — nezavisle na hodnote $R$!

> [!tip] Casova konstanta $\\tau = RC$: velky odpor nebo velka kapacita = pomale nabijeni. Priklad: $R = 1 \\text{ M}\\Omega$, $C = 1 \\text{ }\\mu\\text{F}$ $\\Rightarrow$ $\\tau = 1$ s.`,
        examples: [
          {
            problem: "RC obvod: $R = 10 \\text{ k}\\Omega$, $C = 47 \\text{ }\\mu\\text{F}$. Jaka je casova konstanta?",
            solution: `$$\\tau = RC = 10\\,000 \\cdot 47 \\times 10^{-6} = \\color{#16a34a}{0{,}47 \\text{ s}}$$
Kondenzator se nabije na $63\\%$ za priblizne $0{,}5$ sekundy.`,
          },
        ],
      },
      {
        heading: "Nelinearni prvky",
        body: `Ne vsechny soucastky v obvodu maji konstantni odpor. **Nelinearni prvky** maji odpor zavisy na napeti, proudu nebo vnejsich podminkach.

**Dioda** — propousti proud pouze jednim smerem:
- V propustnem smeru: po prekonani prahoveho napeti ($\\approx 0{,}6$ V pro krem. diodu) tece proud exponencialne
- V zavernem smeru: tece jen nepatrny svodovy proud
- $I = I_0\\left(e^{U/(nU_T)} - 1\\right)$, kde $U_T \\approx 26$ mV pri pokojove teplote

**LED (svetelna dioda)** — dioda, ktera pri propustnem proudu emituje svetlo:
- Prahove napeti zavisi na barve: cervena $\\approx 1{,}8$ V, modra $\\approx 3{,}0$ V
- Typicky provozni proud: $10{-}20$ mA
- Vyzaduje predradny rezistor: $R = (U_{\\text{zdroj}} - U_{\\text{LED}})/I$

**Termistor** — odpor se meni s teplotou:
- NTC (negativni teplotni koeficient): odpor **klesa** s teplotou — pouziti pro mereni teploty
- PTC (pozitivni teplotni koeficient): odpor **roste** s teplotou — pouziti jako pojistka

**Fotorezistor** — odpor klesa s intenzitou osvetleni:
- Tma: $R \\approx 1 \\text{ M}\\Omega$
- Svetlo: $R \\approx 1 \\text{ k}\\Omega$

> [!info] Voltamperova charakteristika (VA charakteristika) ukazuje zavislost $I$ na $U$. Pro linearni rezistor je to primka (Ohmuv zakon). Pro diodu je to exponencialni krivka.`,
      },
      {
        heading: "Elektricka bezpecnost",
        body: `Elektricky proud prochazejici lidskym telem muze byt **smrtelne nebezpecny**.

**Joulovo teplo** v vodicich:
$$Q = I^2 \\cdot R \\cdot t$$

Nadmerny proud vede k prehrati, taveni izoloce a pozaru.

**Pojistky** chrani obvod prerusenim pri nadproudu:
- Tavna pojistka: drat se roztavi pri prekyoceni jmenoviteho proudu
- Jistic: elektromagneticky mechanismus, lze znovu zapnout

**Uzemneni** (zem, PE vodic) chrani pred urazsm elektrickym proudem:
- Kovove casti spotrebicu jsou spojeny se zemi
- Pri poruche izolace tece proud do zeme misto pres osobu

**Odpor lidskeho tela:**
$$\\begin{array}{l|c} \\text{Podminka} & R \\text{ (}\\Omega\\text{)} \\\\ \\hline \\text{Sucha kuze} & 10\\,000{-}100\\,000 \\\\ \\text{Vlhka kuze} & 1\\,000 \\\\ \\text{Poranen kuze} & 500 \\end{array}$$

**Nebezpecne urovne proudu:**
$$\\begin{array}{l|c} \\text{Urovenn proudu} & \\text{Ucinek} \\\\ \\hline 1 \\text{ mA} & \\text{Prah vnimani} \\\\ 10 \\text{ mA} & \\text{Bolestive stahy svalu} \\\\ 30 \\text{ mA} & \\text{Nemoznost pustit vodic} \\\\ 100 \\text{ mA} & \\text{Fibrilace srdce (smrtelne!)} \\end{array}$$

> [!key] Nebezpecny je **proud**, ne napeti! Ale vysoke napeti protlaci vetsi proud pres odpor tela: $I = U/R_{\\text{telo}}$. Pri $230$ V a vlhke kuzi: $I = 230/1000 = 0{,}23$ A = $230$ mA — smrtelne nebezpecne!

> [!tip] Proudovy chranuc (FI/RCD) odpoji obvod do $30$ ms, kdyz detekuje unik proudu pres $30$ mA — chrani pred smrtelnym urazem.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `RC obvod: rezistor $R = 5 \\text{ k}\\Omega$ a kondenzator $C = 100 \\text{ }\\mu\\text{F}$ jsou pripojeny ke zdroji $\\varepsilon = 10$ V. a) Urcete casovou konstantu $\\tau$. b) Jaky je naboj na kondenzatoru v case $t = \\tau$? c) Jaka energie je ulozena v plne nabitem kondenzatoru?`,
    steps: [
      {
        instruction: "Vypocitejte casovou konstantu",
        math: "$\\tau = R \\cdot C = 5000 \\cdot 100 \\times 10^{-6} = 0{,}5 \\text{ s}$",
        explanation: "Casova konstanta urcuje rychlost nabijeni. Za $0{,}5$ s se kondenzator nabije na $63\\%$.",
      },
      {
        instruction: "Urcete maximalni naboj",
        math: "$Q_{\\max} = C \\cdot \\varepsilon = 100 \\times 10^{-6} \\cdot 10 = 1 \\times 10^{-3} \\text{ C} = 1 \\text{ mC}$",
        explanation: "Maximalni naboj je dan kapacitou a napetim zdroje.",
      },
      {
        instruction: "Vypocitejte naboj v case $t = \\tau$",
        math: "$Q(\\tau) = Q_{\\max}\\left(1 - e^{-1}\\right) = 1 \\times 10^{-3} \\cdot (1 - 0{,}368) = 0{,}632 \\times 10^{-3} \\text{ C}$",
        explanation: "Pri $t = \\tau$ je $e^{-1} \\approx 0{,}368$, takze $Q = 0{,}632 \\cdot Q_{\\max} \\approx 63\\%$ maxima.",
      },
      {
        instruction: "Vypocitejte energii ulozenou v plne nabitem kondenzatoru",
        math: "$W_C = \\frac{1}{2}C\\varepsilon^2 = \\frac{1}{2} \\cdot 100 \\times 10^{-6} \\cdot 10^2 = 5 \\times 10^{-3} \\text{ J} = 5 \\text{ mJ}$",
        explanation: "Stejne mnozstvi energie ($5$ mJ) se behem nabijeni premeni na teplo v rezistoru.",
      },
    ],
    finalAnswer: "a) $\\tau = 0{,}5$ s, b) $Q(\\tau) \\approx 0{,}63$ mC (63% maxima), c) $W_C = 5$ mJ.",
  },
  practiceProblems: [
    {
      id: "eo-a-1",
      problemStatement: "Baterie s EMF $\\varepsilon = 12$ V a vnitrnim odporem $r = 2 \\text{ }\\Omega$ je pripojena k rezistoru $R = 10 \\text{ }\\Omega$. Jake je svorkove napeti baterie?",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "10 V"],
      hints: [
        "$I = \\varepsilon / (R + r)$.",
        "$I = 12/(10 + 2) = 1$ A.",
        "$U = \\varepsilon - Ir = 12 - 1 \\cdot 2$.",
      ],
      solutionExplanation: `$$I = \\frac{\\varepsilon}{R + r} = \\frac{12}{10 + 2} = 1 \\text{ A}$$
$$U = \\varepsilon - Ir = 12 - 1 \\cdot 2 = 10 \\text{ V}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-a-2",
      problemStatement: "RC obvod: $R = 20 \\text{ k}\\Omega$, $C = 50 \\text{ }\\mu\\text{F}$. Jaka je casova konstanta $\\tau$? Za jak dlouho bude kondenzator prakticky plne nabity ($5\\tau$)?",
      expectedAnswer: "1",
      acceptableAnswers: ["1", "1 s", "1 sekunda"],
      hints: [
        "$\\tau = RC$.",
        "$\\tau = 20\\,000 \\cdot 50 \\times 10^{-6}$.",
      ],
      solutionExplanation: `$$\\tau = RC = 20\\,000 \\cdot 50 \\times 10^{-6} = 1 \\text{ s}$$
Plne nabity za $5\\tau = 5$ s.`,
      difficulty: "easy" as const,
    },
    {
      id: "eo-a-3",
      problemStatement: "Baterie s EMF $\\varepsilon = 6$ V a vnitrnim odporem $r = 0{,}5 \\text{ }\\Omega$. Jaky odpor zateze $R$ zabezpeci maximalni prenos vykonu? Jaky je tento maximalni vykon?",
      expectedAnswer: "18",
      acceptableAnswers: ["18", "18 W"],
      hints: [
        "Maximum vykonu: $R = r$.",
        "$P_{\\max} = \\varepsilon^2 / (4r)$.",
        "$P_{\\max} = 36 / 2$",
      ],
      solutionExplanation: `Maximalni prenos vykonu nastava pri $R = r = 0{,}5 \\text{ }\\Omega$.
$$P_{\\max} = \\frac{\\varepsilon^2}{4r} = \\frac{6^2}{4 \\cdot 0{,}5} = \\frac{36}{2} = 18 \\text{ W}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-a-4",
      problemStatement: "Kondenzator $C = 220 \\text{ }\\mu\\text{F}$ je nabit na napeti $25$ V a pak se vybiji pres rezistor $R = 10 \\text{ k}\\Omega$. Jaka energie se premeni na teplo v rezistoru?",
      expectedAnswer: "0.069",
      acceptableAnswers: ["0.069", "0,069", "0.069 J", "0,069 J", "69 mJ", "0.07", "0,07"],
      numericTolerance: 0.002,
      hints: [
        "Vsechna energie kondenzatoru se premeni na teplo: $W = \\frac{1}{2}CU^2$.",
        "$W = \\frac{1}{2} \\cdot 220 \\times 10^{-6} \\cdot 25^2$",
      ],
      solutionExplanation: `$$W = \\frac{1}{2}CU^2 = \\frac{1}{2} \\cdot 220 \\times 10^{-6} \\cdot 625 = 0{,}069 \\text{ J} = 69 \\text{ mJ}$$
Pri vybijeni se vsechna energie ulozena v kondenzatoru premeni na teplo v rezistoru.`,
      difficulty: "medium" as const,
    },
    {
      id: "eo-a-5",
      problemStatement: "LED dioda ma prahove napeti $U_{\\text{LED}} = 2$ V a optimalni proud $I = 15$ mA. Pripojujeme ji ke zdroji $9$ V. Jaky predradny rezistor potrebujeme?",
      expectedAnswer: "467",
      acceptableAnswers: ["467", "467 Ohm", "467 Ω", "470", "470 Ohm", "470 Ω"],
      numericTolerance: 10,
      hints: [
        "Napeti na rezistoru: $U_R = U_{\\text{zdroj}} - U_{\\text{LED}}$.",
        "$U_R = 9 - 2 = 7$ V.",
        "$R = U_R / I = 7 / 0{,}015$.",
      ],
      solutionExplanation: `$$U_R = U_{\\text{zdroj}} - U_{\\text{LED}} = 9 - 2 = 7 \\text{ V}$$
$$R = \\frac{U_R}{I} = \\frac{7}{0{,}015} = 466{,}7 \\text{ }\\Omega$$
V praxi pouzijeme nejblizsi standardni hodnotu $470 \\text{ }\\Omega$.`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Vnitrni odpor zdroje**: $U = \\varepsilon - Ir$ — svorkove napeti klesa s proudem.",
      "**Maximalni prenos vykonu**: pri $R = r$, $P_{\\max} = \\varepsilon^2/(4r)$, ucinnost $50\\%$.",
      "**RC obvody**: casova konstanta $\\tau = RC$, nabijeni: $Q(t) = C\\varepsilon(1 - e^{-t/\\tau})$.",
      "**Nelinearni prvky**: dioda (jednosmerny proud), LED, termistor, fotorezistor — odpor neni konstantni.",
      "**Bezpecnost**: proud $\\geq 100$ mA je smrtelny. Chranna: pojistky, uzemneni, proudovy chranic (FI).",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste elektricke obvody od zakladu az po pokrocila temata. Pokracujte na elektromagnetismus!",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Elektricke obvody\n");

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

  console.log("\n🎉 Done! Brilliant-style Elektricke obvody lessons seeded.\n");
}

main().catch(console.error);
