import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "8cbaf0c3-dc82-4ecc-8204-abcd0f5f296b";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Gravitace — síla, která drží vesmír pohromadě",
    sections: [
      {
        heading: "Newtonův gravitační zákon",
        body: `Každé dvě hmotnosti se navzájem přitahují. Tuto sílu popsal Newton:

$$\\boxed{F_g = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}}$$

- $G = 6{,}674 \\times 10^{-11} \\text{ N·m}^2/\\text{kg}^2$ je **gravitační konstanta**
- $m_1, m_2$ jsou hmotnosti obou těles (kg)
- $r$ je vzdálenost mezi středy těles (m)

$$\\begin{array}{l|c} \\text{Situace} & F_g \\\\ \\hline \\text{Dva lidé (70 kg, 1 m)} & 3{,}3 \\times 10^{-7} \\text{ N} \\\\ \\text{Člověk + Země} & 700 \\text{ N} \\\\ \\text{Země + Měsíc} & 2{,}0 \\times 10^{20} \\text{ N} \\\\ \\text{Země + Slunce} & 3{,}5 \\times 10^{22} \\text{ N} \\end{array}$$

> [!key] Gravitace je **slabá síla** — ale působí na obrovské vzdálenosti a je vždy přitažlivá. Proto ovládá vesmír!`,
        examples: [
          {
            problem: "Jakou gravitační silou se přitahují dvě koule, každá o hmotnosti $100$ kg, ve vzdálenosti $1$ m?",
            solution: `$$F_g = G \\frac{m_1 m_2}{r^2} = 6{,}674 \\times 10^{-11} \\cdot \\frac{100 \\cdot 100}{1^2} = \\color{#16a34a}{6{,}674 \\times 10^{-7} \\text{ N}}$$
To je asi hmotnost jednoho zrnka prachu — gravitace mezi běžnými tělesy je neměřitelně slabá.`,
          },
        ],
      },
      {
        heading: "Tíhové zrychlení a gravitační pole",
        body: `Každé těleso s hmotností $M$ kolem sebe vytváří **gravitační pole**. Intenzita pole (= tíhové zrychlení) ve vzdálenosti $r$ od středu:

$$\\boxed{g = G \\cdot \\frac{M}{r^2}}$$

Na povrchu Země ($R_Z = 6\\,371$ km, $M_Z = 5{,}97 \\times 10^{24}$ kg):

$$g_0 = G \\cdot \\frac{M_Z}{R_Z^2} \\approx 9{,}81 \\text{ m/s}^2$$

Jak se $g$ mění s výškou:
$$\\begin{array}{l|c|c} \\text{Místo} & r & g \\text{ (m/s²)} \\\\ \\hline \\text{Povrch Země} & R_Z & 9{,}81 \\\\ \\text{ISS (400 km)} & 1{,}06\\,R_Z & 8{,}7 \\\\ \\text{GPS (20 200 km)} & 4{,}17\\,R_Z & 0{,}56 \\\\ \\text{Měsíc (orbit)} & 60\\,R_Z & 0{,}003 \\end{array}$$

> [!info] Na ISS je $g \\approx 8{,}7$ m/s² — astronauti 'vznášejí' ne proto, že tam není gravitace, ale protože padají spolu se stanicí!`,
        visual: {
          type: "interactive-orbit",
          props: {
            defaultOrbitalRadius: 2,
            defaultCentralMass: 5,
            showForceVector: true,
            showVelocityVector: false,
            showGField: true,
            allowEscape: false,
            planetLabel: "Země",
          },
          caption: "Posuňte satelit dále od Země — sledujte, jak klesá gravitační zrychlení g(r) s druhou mocninou vzdálenosti!",
        },
      },
      {
        heading: "Proč tělesa obíhají? — Oběžná dráha",
        body: `Satelit na oběžné dráze **neustále padá** k Zemi, ale zároveň se pohybuje dopředu tak rychle, že se povrch Země 'zakřivuje pod ním'.

Gravitační síla = dostředivá síla:
$$F_g = F_d$$
$$G\\frac{Mm}{r^2} = \\frac{mv^2}{r}$$

Z toho **oběžná rychlost**:
$$\\boxed{v_1 = \\sqrt{\\frac{GM}{r}} = \\sqrt{g_0 \\cdot \\frac{R^2}{r}}}$$

Pro nízkou oběžnou dráhu ($r \\approx R_Z + 200$ km):
$$v_1 \\approx 7{,}9 \\text{ km/s} = 28\\,400 \\text{ km/h}$$

> [!key] Toto je **1. kosmická rychlost** — minimální rychlost, aby těleso obletělo Zemi a nespadlo zpět.`,
        visual: {
          type: "interactive-orbit",
          props: {
            defaultOrbitalRadius: 1.5,
            defaultCentralMass: 5,
            showForceVector: true,
            showVelocityVector: true,
            showGField: false,
            allowEscape: false,
            planetLabel: "Země",
          },
          caption: "Spusťte oběh — zelená šipka (rychlost) je kolmá na červenou (gravitace). To udržuje satelit na dráze!",
        },
      },
      {
        heading: "Úniková rychlost",
        body: `Aby těleso uniklo z gravitačního pole Země úplně, potřebuje **2. kosmickou rychlost**:

$$\\boxed{v_2 = \\sqrt{\\frac{2GM}{r}} = v_1 \\cdot \\sqrt{2}}$$

$$v_2 \\approx 11{,}2 \\text{ km/s}$$

- $v < v_1$: těleso spadne zpět
- $v_1 \\leq v < v_2$: oběžná dráha (elipsa/kruh)
- $v \\geq v_2$: únik ze Země

> [!tip] $v_2 = \\sqrt{2} \\cdot v_1$ — úniková rychlost je jen o $41\\%$ vyšší než oběžná!`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Jaké je tíhové zrychlení na povrchu Marsu? ($M_{\\text{Mars}} = 6{,}42 \\times 10^{23}$ kg, $R_{\\text{Mars}} = 3\\,390$ km, $G = 6{,}674 \\times 10^{-11}$)`,
    steps: [
      {
        instruction: "Zapište vzorec pro tíhové zrychlení",
        math: "$g = G \\cdot \\frac{M}{R^2}$",
        explanation: "Tíhové zrychlení na povrchu závisí na hmotnosti a poloměru tělesa.",
      },
      {
        instruction: "Převeďte poloměr na metry",
        math: "$R = 3\\,390 \\text{ km} = 3{,}39 \\times 10^6 \\text{ m}$",
        explanation: "Musíme počítat v metrech.",
      },
      {
        instruction: "Dosaďte",
        math: "$g = 6{,}674 \\times 10^{-11} \\cdot \\frac{6{,}42 \\times 10^{23}}{(3{,}39 \\times 10^6)^2}$",
        explanation: "Dosadíme všechny hodnoty.",
      },
      {
        instruction: "Vypočítejte",
        math: "$g = \\frac{6{,}674 \\times 10^{-11} \\cdot 6{,}42 \\times 10^{23}}{1{,}149 \\times 10^{13}} = \\frac{4{,}285 \\times 10^{13}}{1{,}149 \\times 10^{13}} = 3{,}73 \\text{ m/s}^2$",
        explanation: "Na Marsu je gravitace asi $38\\%$ pozemské.",
      },
    ],
    finalAnswer: "Tíhové zrychlení na povrchu Marsu je $g_{\\text{Mars}} \\approx 3{,}7$ m/s² — asi $38\\%$ pozemského.",
  },
  practiceProblems: [
    {
      id: "gr-b-1",
      problemStatement: "Jakou gravitační silou přitahuje Země člověka o hmotnosti $70$ kg na svém povrchu? ($g = 10$ m/s²)",
      expectedAnswer: "700",
      acceptableAnswers: ["700", "700 N"],
      hints: [
        "$F_g = m \\cdot g$.",
        "$F_g = 70 \\cdot 10$",
      ],
      solutionExplanation: `$$F_g = m \\cdot g = 70 \\cdot 10 = 700 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "gr-b-2",
      problemStatement: "Jak se změní gravitační síla, když zdvojnásobíme vzdálenost mezi dvěma tělesy?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4x", "4-krát menší", "čtyřikrát menší", "klesne na čtvrtinu"],
      hints: [
        "$F_g \\propto 1/r^2$.",
        "Když $r \\to 2r$: $F \\to F/(2^2)$",
      ],
      solutionExplanation: `$$F_g \\propto \\frac{1}{r^2} \\implies \\text{při } r \\to 2r: \\quad F \\to \\frac{F}{4}$$
Gravitační síla klesne na **čtvrtinu**.`,
      difficulty: "easy" as const,
    },
    {
      id: "gr-b-3",
      problemStatement: "Jaká je 1. kosmická rychlost pro Zemi? ($g_0 = 10$ m/s², $R_Z = 6{,}4 \\times 10^6$ m, zanedbejte výšku dráhy)",
      expectedAnswer: "8000",
      acceptableAnswers: ["8000", "8000 m/s", "8 km/s"],
      hints: [
        "$v_1 = \\sqrt{g_0 \\cdot R_Z}$.",
        "$v_1 = \\sqrt{10 \\cdot 6{,}4 \\times 10^6}$",
      ],
      solutionExplanation: `$$v_1 = \\sqrt{g_0 R} = \\sqrt{10 \\cdot 6{,}4 \\times 10^6} = \\sqrt{6{,}4 \\times 10^7} \\approx 8000 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "gr-b-4",
      problemStatement: "Jaké je tíhové zrychlení ve výšce rovné poloměru Země ($r = 2R_Z$)?",
      expectedAnswer: "2.5",
      acceptableAnswers: ["2.5", "2,5", "2.5 m/s²", "2,5 m/s²", "2.45", "2,45"],
      numericTolerance: 0.1,
      hints: [
        "$g(r) = g_0 \\cdot (R/r)^2$.",
        "$g(2R) = g_0 / 4 \\approx 10/4$",
      ],
      solutionExplanation: `$$g(2R) = g_0 \\cdot \\left(\\frac{R}{2R}\\right)^2 = \\frac{g_0}{4} \\approx \\frac{10}{4} = 2{,}5 \\text{ m/s}^2$$`,
      difficulty: "medium" as const,
    },
    {
      id: "gr-b-5",
      problemStatement: "Jaká je 2. kosmická rychlost, pokud $v_1 = 7{,}9$ km/s?",
      expectedAnswer: "11.2",
      acceptableAnswers: ["11.2", "11,2", "11.17", "11,17", "11.2 km/s"],
      numericTolerance: 0.2,
      hints: [
        "$v_2 = v_1 \\cdot \\sqrt{2}$.",
        "$v_2 = 7{,}9 \\cdot 1{,}414$",
      ],
      solutionExplanation: `$$v_2 = v_1 \\cdot \\sqrt{2} = 7{,}9 \\cdot 1{,}414 \\approx 11{,}2 \\text{ km/s}$$`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Gravitační zákon**: $F_g = G \\cdot m_1 m_2 / r^2$ — klesá se čtvercem vzdálenosti.",
      "**Tíhové zrychlení**: $g = GM/r^2$ — na povrchu Země $\\approx 9{,}81$ m/s².",
      "**1. kosmická rychlost**: $v_1 = \\sqrt{GM/r} \\approx 7{,}9$ km/s — pro oběžnou dráhu.",
      "**2. kosmická rychlost**: $v_2 = v_1\\sqrt{2} \\approx 11{,}2$ km/s — únik ze Země.",
      "Astronauti na ISS se 'vznášejí' ne kvůli nulové gravitaci, ale kvůli **volnému pádu**.",
    ],
    nextTopicSuggestion: "Výborně! Pokračujte na Keplerovy zákony — objevte pravidla, kterými se řídí pohyb planet.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Kepler, orbital mechanics
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Gravitace — Keplerovy zákony a oběžné dráhy",
    sections: [
      {
        heading: "Keplerovy zákony pohybu planet",
        body: `Johannes Kepler formuloval tři zákony, které popisují pohyb planet kolem Slunce:

**1. zákon (zákon elips):**
> Planety obíhají po **elipsách**, v jejichž ohnisku je Slunce.

**2. zákon (zákon ploch):**
> Průvodič (spojnice Slunce–planeta) opíše za **stejný čas** stejnou plochu.
> → Planeta se pohybuje **rychleji** blíže Slunci a **pomaleji** dále.

**3. zákon (zákon period):**
$$\\boxed{\\frac{T^2}{a^3} = \\text{konst.} = \\frac{4\\pi^2}{GM}}$$

- $T$ je oběžná doba
- $a$ je velká poloosa elipsy (pro kruhovou dráhu = poloměr)

Pro dvě tělesa obíhající stejnou hvězdu:
$$\\frac{T_1^2}{T_2^2} = \\frac{a_1^3}{a_2^3}$$

> [!key] Kepler odvodil tyto zákony z pozorování. Newton je pak vysvětlil gravitačním zákonem!`,
        visual: {
          type: "interactive-orbit",
          props: {
            defaultOrbitalRadius: 3,
            defaultCentralMass: 5,
            showForceVector: false,
            showVelocityVector: true,
            showGField: false,
            allowEscape: false,
            planetLabel: "Slunce",
          },
          caption: "Měňte poloměr dráhy — sledujte, jak se mění oběžná doba T (3. Keplerův zákon)!",
        },
      },
      {
        heading: "Kruhová oběžná dráha",
        body: `Pro kruhovou dráhu (speciální případ elipsy):

Gravitace = dostředivá síla:
$$G\\frac{Mm}{r^2} = \\frac{mv^2}{r} = m \\omega^2 r$$

Z toho:
$$v = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi \\sqrt{\\frac{r^3}{GM}}$$

**Geostacionární dráha** ($T = 24$ h):
$$r_{\\text{geo}} = \\sqrt[3]{\\frac{GM T^2}{4\\pi^2}} \\approx 42\\,200 \\text{ km}$$

To je $6{,}6 \\cdot R_Z$ od středu Země (asi $35\\,800$ km nad povrchem).

> [!info] Na geostacionární dráze 'visí' satelit stále nad stejným bodem Země — proto tam umisťujeme komunikační a meteorologické družice.`,
        examples: [
          {
            problem: "ISS obíhá ve výšce $400$ km. Jaká je její oběžná doba? ($R_Z = 6371$ km, $g_0 = 9{,}81$ m/s²)",
            solution: `$r = 6771$ km $= 6{,}771 \\times 10^6$ m
$$T = 2\\pi \\sqrt{\\frac{r^3}{g_0 R_Z^2}} = 2\\pi \\sqrt{\\frac{(6{,}771 \\times 10^6)^3}{9{,}81 \\cdot (6{,}371 \\times 10^6)^2}}$$
$$T \\approx 5540 \\text{ s} \\approx \\color{#16a34a}{92 \\text{ min}}$$`,
          },
        ],
      },
      {
        heading: "Gravitační potenciální energie",
        body: `V blízkosti povrchu jsme používali $E_p = mgh$. Obecně (pro velké vzdálenosti):

$$\\boxed{E_p = -G \\frac{Mm}{r}}$$

Záporné znaménko: energie je **nulová v nekonečnu** a klesá směrem k tělesu.

**Celková mechanická energie na dráze:**
$$E = E_k + E_p = \\frac{1}{2}mv^2 - G\\frac{Mm}{r}$$

Pro kruhovou dráhu ($v^2 = GM/r$):
$$\\boxed{E = -\\frac{GMm}{2r}}$$

> [!key] Těleso na dráze má **zápornou** celkovou energii — je gravitačně vázáno. Pro únik potřebuje $E \\geq 0$.`,
      },
      {
        heading: "Odvození únikové rychlosti z energie",
        body: `Na povrchu planety:
$$E_k + E_p = 0 \\quad \\text{(na hranici úniku)}$$
$$\\frac{1}{2}mv_2^2 - G\\frac{Mm}{R} = 0$$

$$v_2 = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2g_0 R}$$

$$\\begin{array}{l|c|c} \\text{Těleso} & v_1 \\text{ (km/s)} & v_2 \\text{ (km/s)} \\\\ \\hline \\text{Země} & 7{,}9 & 11{,}2 \\\\ \\text{Měsíc} & 1{,}7 & 2{,}4 \\\\ \\text{Mars} & 3{,}6 & 5{,}0 \\\\ \\text{Jupiter} & 42 & 60 \\\\ \\text{Slunce} & 437 & 618 \\end{array}$$

> [!tip] Na Měsíci je úniková rychlost jen $2{,}4$ km/s — proto tam nemůže být atmosféra (molekuly plynu uniknou).`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Země obíhá Slunce s periodou $T_Z = 1$ rok ve vzdálenosti $a_Z = 1$ AU. Mars obíhá ve vzdálenosti $a_M = 1{,}524$ AU. Jaká je oběžná doba Marsu?`,
    steps: [
      {
        instruction: "Zapište 3. Keplerův zákon",
        math: "$\\frac{T_M^2}{T_Z^2} = \\frac{a_M^3}{a_Z^3}$",
        explanation: "Pro dvě tělesa obíhající stejnou hvězdu.",
      },
      {
        instruction: "Vyjádřete $T_M$",
        math: "$T_M = T_Z \\cdot \\left(\\frac{a_M}{a_Z}\\right)^{3/2}$",
        explanation: "Odmocníme obě strany.",
      },
      {
        instruction: "Dosaďte",
        math: "$T_M = 1 \\cdot 1{,}524^{3/2} = 1{,}524^{1{,}5}$",
        explanation: "$a_Z = 1$ AU, $T_Z = 1$ rok.",
      },
      {
        instruction: "Vypočítejte",
        math: "$1{,}524^{1{,}5} = \\sqrt{1{,}524^3} = \\sqrt{3{,}540} = 1{,}881$",
        explanation: "$T_M \\approx 1{,}88$ roku $\\approx 687$ dní.",
      },
    ],
    finalAnswer: "Oběžná doba Marsu je $T_M \\approx 1{,}88$ roku ($687$ dní).",
  },
  practiceProblems: [
    {
      id: "gr-i-1",
      problemStatement: "Jaká je oběžná rychlost satelitu ve výšce $200$ km nad Zemí? ($R_Z = 6{,}371 \\times 10^6$ m, $g_0 = 9{,}81$ m/s²)",
      expectedAnswer: "7790",
      acceptableAnswers: ["7790", "7790 m/s", "7.8 km/s", "7,8 km/s", "7800"],
      numericTolerance: 50,
      hints: [
        "$v = \\sqrt{g_0 R_Z^2 / r}$, kde $r = R_Z + h$.",
        "$r = 6{,}571 \\times 10^6$ m.",
      ],
      solutionExplanation: `$$v = \\sqrt{\\frac{g_0 R_Z^2}{r}} = \\sqrt{\\frac{9{,}81 \\cdot (6{,}371 \\times 10^6)^2}{6{,}571 \\times 10^6}} \\approx 7790 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "gr-i-2",
      problemStatement: "Jupiter obíhá Slunce ve vzdálenosti $5{,}2$ AU. Jaká je jeho oběžná doba v rocích? (Země: $a = 1$ AU, $T = 1$ rok)",
      expectedAnswer: "11.9",
      acceptableAnswers: ["11.9", "11,9", "11.86", "11,86", "12"],
      numericTolerance: 0.3,
      hints: [
        "3. Keplerův zákon: $T_J = T_Z \\cdot (a_J/a_Z)^{3/2}$.",
        "$T_J = 1 \\cdot 5{,}2^{1{,}5}$",
      ],
      solutionExplanation: `$$T_J = 5{,}2^{3/2} = \\sqrt{5{,}2^3} = \\sqrt{140{,}6} \\approx 11{,}86 \\text{ let}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "gr-i-3",
      problemStatement: "Jaký je poloměr geostacionární dráhy? ($T = 86\\,400$ s, $g_0 = 9{,}81$ m/s², $R_Z = 6{,}371 \\times 10^6$ m)",
      expectedAnswer: "42200",
      acceptableAnswers: ["42200", "42200 km", "42 200 km", "42164"],
      numericTolerance: 500,
      hints: [
        "$r = \\sqrt[3]{\\frac{g_0 R_Z^2 T^2}{4\\pi^2}}$",
        "Dosaďte: $g_0 R_Z^2 = 9{,}81 \\cdot (6{,}371 \\times 10^6)^2$.",
      ],
      solutionExplanation: `$$r = \\sqrt[3]{\\frac{g_0 R_Z^2 T^2}{4\\pi^2}} = \\sqrt[3]{\\frac{9{,}81 \\cdot 4{,}059 \\times 10^{13} \\cdot 7{,}465 \\times 10^9}{39{,}48}}$$
$$\\approx \\sqrt[3]{7{,}53 \\times 10^{22}} \\approx 4{,}22 \\times 10^7 \\text{ m} = 42\\,200 \\text{ km}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "gr-i-4",
      problemStatement: "Gravitační potenciální energie satelitu ($500$ kg) na oběžné dráze ve výšce $r = 2R_Z$. Jaká je jeho celková mechanická energie? ($g_0 = 10$ m/s², $R_Z = 6{,}4 \\times 10^6$ m)",
      expectedAnswer: "-8000000000",
      acceptableAnswers: ["-8000000000", "-8 GJ", "-8e9", "-8000000000 J"],
      numericTolerance: 100000000,
      hints: [
        "Na kruhové dráze: $E = -\\frac{g_0 R_Z^2 m}{2r}$.",
        "$E = -\\frac{10 \\cdot (6{,}4 \\times 10^6)^2 \\cdot 500}{2 \\cdot 1{,}28 \\times 10^7}$",
      ],
      solutionExplanation: `$$E = -\\frac{GMm}{2r} = -\\frac{g_0 R^2 m}{2r} = -\\frac{10 \\cdot (6{,}4 \\times 10^6)^2 \\cdot 500}{2 \\cdot 1{,}28 \\times 10^7}$$
$$= -\\frac{2{,}048 \\times 10^{17}}{2{,}56 \\times 10^7} = -8 \\times 10^9 \\text{ J} = -8 \\text{ GJ}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "gr-i-5",
      problemStatement: "Jaká je úniková rychlost z povrchu Měsíce? ($g_{\\text{Měsíc}} = 1{,}62$ m/s², $R_{\\text{Měsíc}} = 1{,}737 \\times 10^6$ m)",
      expectedAnswer: "2370",
      acceptableAnswers: ["2370", "2370 m/s", "2.37 km/s", "2,37 km/s", "2400"],
      numericTolerance: 50,
      hints: [
        "$v_2 = \\sqrt{2 g R}$.",
        "$v_2 = \\sqrt{2 \\cdot 1{,}62 \\cdot 1{,}737 \\times 10^6}$",
      ],
      solutionExplanation: `$$v_2 = \\sqrt{2gR} = \\sqrt{2 \\cdot 1{,}62 \\cdot 1{,}737 \\times 10^6} = \\sqrt{5{,}628 \\times 10^6} \\approx 2370 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**1. Keplerův zákon**: Planety obíhají po elipsách s hvězdou v ohnisku.",
      "**3. Keplerův zákon**: $T^2/a^3 = \\text{konst.}$ — vzdálenější planety obíhají pomaleji.",
      "**Geostacionární dráha**: $r \\approx 42\\,200$ km, $T = 24$ h — satelit 'visí' nad jedním bodem.",
      "**Gravitační potenciální energie**: $E_p = -GMm/r$ — záporná, nulová v nekonečnu.",
      "**Celková energie na dráze**: $E = -GMm/(2r)$ — záporná = těleso je vázané.",
    ],
    nextTopicSuggestion: "Pokračujte na pokročilé téma — přelety mezi planetami (Hohmannova dráha) a gravitační manévry.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Hohmann transfer, gravitational maneuvers, Lagrange
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Gravitace — pokročilé orbitální mechaniky",
    sections: [
      {
        heading: "Energie na eliptické dráze",
        body: `Na eliptické dráze s velkou poloosou $a$:

$$\\boxed{E = -\\frac{GMm}{2a}}$$

To je shodné se vzorcem pro kruhovou dráhu ($a = r$). Rychlost na eliptické dráze ve vzdálenosti $r$:

$$\\boxed{v = \\sqrt{GM\\left(\\frac{2}{r} - \\frac{1}{a}\\right)}}$$

Toto je **vis-viva rovnice** — nejdůležitější vzorec orbitální mechaniky.

Speciální případy:
- Kruhová dráha ($r = a$): $v = \\sqrt{GM/a}$
- Perihel ($r = r_{\\min}$): $v_{\\max}$
- Aphel ($r = r_{\\max}$): $v_{\\min}$
- Úniková ($a \\to \\infty$): $v = \\sqrt{2GM/r}$

> [!key] Vis-viva rovnice spojuje rychlost, vzdálenost a tvar dráhy v jednom vzorci.`,
        visual: {
          type: "interactive-orbit",
          props: {
            defaultOrbitalRadius: 2.5,
            defaultCentralMass: 5,
            showForceVector: true,
            showVelocityVector: true,
            showGField: false,
            allowEscape: true,
            planetLabel: "Země",
          },
          caption: "Porovnejte oběžnou rychlost v₁ a únikovou v₂ na sloupcovém grafu vpravo.",
        },
      },
      {
        heading: "Hohmannova přeletová dráha",
        body: `Nejúspornější přelet mezi dvěma kruhovými drahami ($r_1$ a $r_2$) je po **elipse**, která se dotýká obou drah:

$$a_{\\text{přel}} = \\frac{r_1 + r_2}{2}$$

Potřebné změny rychlosti ($\\Delta v$):

**1. impulz** (přechod z dráhy $r_1$ na přeletovou elipsu):
$$\\Delta v_1 = \\sqrt{\\frac{GM}{r_1}} \\left(\\sqrt{\\frac{2r_2}{r_1 + r_2}} - 1\\right)$$

**2. impulz** (přechod z elipsy na dráhu $r_2$):
$$\\Delta v_2 = \\sqrt{\\frac{GM}{r_2}} \\left(1 - \\sqrt{\\frac{2r_1}{r_1 + r_2}}\\right)$$

Celková $\\Delta v = |\\Delta v_1| + |\\Delta v_2|$.

Doba přeletu:
$$t = \\frac{T_{\\text{přel}}}{2} = \\pi \\sqrt{\\frac{a^3}{GM}}$$

> [!info] Let na Mars Hohmannovou dráhou trvá asi $259$ dní. Okna pro start se otevírají každých $26$ měsíců.`,
        examples: [
          {
            problem: "Satelit chce přelétnout z nízké dráhy ($r_1 = 7\\,000$ km) na geostacionární ($r_2 = 42\\,200$ km). Jaká je poloosa přeletové elipsy?",
            solution: `$$a = \\frac{r_1 + r_2}{2} = \\frac{7\\,000 + 42\\,200}{2} = \\color{#16a34a}{24\\,600 \\text{ km}}$$`,
          },
        ],
      },
      {
        heading: "3. kosmická rychlost",
        body: `**3. kosmická rychlost** je minimální rychlost z povrchu Země potřebná k opuštění Sluneční soustavy:

$$\\boxed{v_3 \\approx 16{,}7 \\text{ km/s}}$$

Skládá se z:
1. Únik ze Země ($v_2 = 11{,}2$ km/s)
2. Únik ze Slunce z dráhy Země ($v_{\\text{esc,Sun}} \\approx 42{,}1$ km/s)
3. Mínus oběžná rychlost Země ($v_Z \\approx 29{,}8$ km/s)

Efektivní výpočet (s využitím toho, že se rychlosti sčítají vektorově):
$$v_3 = \\sqrt{(v_{\\text{esc,Sun}} - v_Z)^2 + v_{2,Z}^2} \\approx 16{,}7 \\text{ km/s}$$

> [!tip] Voyager 1 a 2 dosáhly 3. kosmické rychlosti pomocí gravitačních manévrů kolem Jupiteru a Saturnu — bez nich by to bylo nemožné!`,
      },
      {
        heading: "Gravitační manévr (prak)",
        body: `Sonda může získat rychlost 'zadarmo' průletem kolem planety — **gravitační prak** (gravity assist):

V soustavě planety sonda přilétá a odlétá se **stejnou rychlostí** (pružná 'srážka' s planetou). Ale planeta se pohybuje!

V soustavě Slunce:
$$v_{\\text{po}} \\approx v_{\\text{před}} + 2 v_{\\text{planeta}} \\cdot \\cos\\theta$$

kde $\\theta$ je úhel odklonu.

Maximální zisk rychlosti: $\\Delta v_{\\max} = 2 v_{\\text{planeta}}$

$$\\begin{array}{l|c|c} \\text{Planeta} & v_{\\text{orb}} \\text{ (km/s)} & \\Delta v_{\\max} \\text{ (km/s)} \\\\ \\hline \\text{Venuše} & 35{,}0 & 70 \\\\ \\text{Jupiter} & 13{,}1 & 26 \\\\ \\text{Saturn} & 9{,}7 & 19 \\end{array}$$

> [!key] Gravitační manévr je klíčový pro mise do vnějšího systému. Je to jako odraz míčku od jedoucího vlaku — míček získá energii na úkor planety (zanedbatelná změna).`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Sonda má přelétnout z oběžné dráhy Země ($r_1 = 1$ AU $= 1{,}496 \\times 10^{11}$ m) na dráhu Marsu ($r_2 = 1{,}524$ AU). Oběžná rychlost Země je $v_Z = 29{,}8$ km/s. Jakou $\\Delta v$ potřebuje pro první impulz? Jak dlouho trvá přelet?`,
    steps: [
      {
        instruction: "Spočítejte polosu přeletové elipsy",
        math: "$a = \\frac{r_1 + r_2}{2} = \\frac{1 + 1{,}524}{2} = 1{,}262 \\text{ AU}$",
        explanation: "Přeletová elipsa se dotýká obou drah.",
      },
      {
        instruction: "Spočítejte rychlost na přeletové elipse v bodě startu (perihel)",
        math: "$v_p = v_Z \\sqrt{\\frac{2r_2}{r_1 + r_2}} = 29{,}8 \\sqrt{\\frac{2 \\cdot 1{,}524}{2{,}524}}$",
        explanation: "Vis-viva rovnice v perihelu přeletové elipsy.",
      },
      {
        instruction: "Dopočítejte",
        math: "$v_p = 29{,}8 \\sqrt{1{,}208} = 29{,}8 \\cdot 1{,}099 = 32{,}7 \\text{ km/s}$",
        explanation: "Sonda musí letět rychleji než Země.",
      },
      {
        instruction: "Určete potřebnou $\\Delta v_1$",
        math: "$\\Delta v_1 = v_p - v_Z = 32{,}7 - 29{,}8 = 2{,}9 \\text{ km/s}$",
        explanation: "Sonda potřebuje přidat $2{,}9$ km/s ve směru pohybu Země.",
      },
      {
        instruction: "Spočítejte dobu přeletu",
        math: "$t = \\frac{T_{\\text{přel}}}{2} = \\frac{1}{2} \\cdot a^{3/2} \\text{ (v rocích)} = \\frac{1}{2} \\cdot 1{,}262^{1{,}5} = \\frac{1}{2} \\cdot 1{,}417 = 0{,}709 \\text{ roku}$",
        explanation: "Přelet trvá půl periody přeletové elipsy = $259$ dní.",
      },
    ],
    finalAnswer: "Pro přelet na Mars: $\\Delta v_1 \\approx 2{,}9$ km/s, doba přeletu $\\approx 259$ dní (asi $8{,}5$ měsíce).",
  },
  practiceProblems: [
    {
      id: "gr-p-1",
      problemStatement: "Jaká je rychlost satelitu na kruhové dráze s poloměrem $2R_Z$? ($g_0 = 10$ m/s², $R_Z = 6{,}4 \\times 10^6$ m)",
      expectedAnswer: "5660",
      acceptableAnswers: ["5660", "5660 m/s", "5.66 km/s", "5,66 km/s", "5657"],
      numericTolerance: 50,
      hints: [
        "$v = \\sqrt{g_0 R_Z^2 / r}$ kde $r = 2R_Z$.",
        "$v = \\sqrt{g_0 R_Z / 2} = R_Z \\sqrt{g_0 / (2R_Z)}$",
      ],
      solutionExplanation: `$$v = \\sqrt{\\frac{g_0 R_Z^2}{2R_Z}} = \\sqrt{\\frac{g_0 R_Z}{2}} = \\sqrt{\\frac{10 \\cdot 6{,}4 \\times 10^6}{2}} = \\sqrt{3{,}2 \\times 10^7} \\approx 5660 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "gr-p-2",
      problemStatement: "Venuše obíhá ve vzdálenosti $0{,}723$ AU. Jaká je její oběžná doba v rocích?",
      expectedAnswer: "0.615",
      acceptableAnswers: ["0.615", "0,615", "0.61", "0,61", "225 dní"],
      numericTolerance: 0.02,
      hints: [
        "$T = a^{3/2}$ (v AU a rocích).",
        "$T = 0{,}723^{1{,}5}$",
      ],
      solutionExplanation: `$$T = a^{3/2} = 0{,}723^{1{,}5} = \\sqrt{0{,}723^3} = \\sqrt{0{,}378} \\approx 0{,}615 \\text{ roku} \\approx 225 \\text{ dní}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "gr-p-3",
      problemStatement: "Poloosa přeletové dráhy ze Země na Jupiter ($r_2 = 5{,}2$ AU) je $a = (1 + 5{,}2)/2 = 3{,}1$ AU. Jak dlouho trvá přelet (v rocích)?",
      expectedAnswer: "2.73",
      acceptableAnswers: ["2.73", "2,73", "2.7", "2,7", "997 dní"],
      numericTolerance: 0.1,
      hints: [
        "$t = \\frac{1}{2} \\cdot a^{3/2}$ (v rocích).",
        "$t = \\frac{1}{2} \\cdot 3{,}1^{1{,}5}$",
      ],
      solutionExplanation: `$$t = \\frac{1}{2} a^{3/2} = \\frac{1}{2} \\cdot 3{,}1^{1{,}5} = \\frac{1}{2} \\cdot 5{,}46 \\approx 2{,}73 \\text{ roku}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "gr-p-4",
      problemStatement: "Sonda letí kolem Jupiteru ($v_{\\text{orb,Jup}} = 13{,}1$ km/s) a gravitační manévr jí změní směr o $90°$. Jaký maximální přírůstek rychlosti může získat?",
      expectedAnswer: "26.2",
      acceptableAnswers: ["26.2", "26,2", "26.2 km/s", "26,2 km/s", "26"],
      numericTolerance: 1,
      hints: [
        "Maximální $\\Delta v = 2 v_{\\text{planeta}}$.",
        "Toto nastane při otočení o $180°$, ne $90°$. Při $90°$: $\\Delta v \\approx \\sqrt{2} \\cdot v_{\\text{pla}}$.",
      ],
      solutionExplanation: `Maximální $\\Delta v = 2 v_{\\text{Jup}} = 2 \\cdot 13{,}1 = 26{,}2$ km/s (při optimálním úhlu průletu).`,
      difficulty: "easy" as const,
    },
    {
      id: "gr-p-5",
      problemStatement: "Planeta má povrchové $g = 25$ m/s² a poloměr $R = 7 \\times 10^7$ m (plynný obr). Jaká je její úniková rychlost?",
      expectedAnswer: "59200",
      acceptableAnswers: ["59200", "59200 m/s", "59.2 km/s", "59,2 km/s"],
      numericTolerance: 500,
      hints: [
        "$v_2 = \\sqrt{2gR}$.",
        "$v_2 = \\sqrt{2 \\cdot 25 \\cdot 7 \\times 10^7}$",
      ],
      solutionExplanation: `$$v_2 = \\sqrt{2gR} = \\sqrt{2 \\cdot 25 \\cdot 7 \\times 10^7} = \\sqrt{3{,}5 \\times 10^9} \\approx 59\\,200 \\text{ m/s}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Vis-viva rovnice**: $v = \\sqrt{GM(2/r - 1/a)}$ — univerzální vztah pro rychlost na dráze.",
      "**Hohmannova dráha**: nejúspornější přelet po elipse dotýkající se obou kruhových drah.",
      "**Přelet na Mars**: $\\Delta v \\approx 2{,}9$ km/s, doba přeletu $\\approx 259$ dní.",
      "**3. kosmická rychlost**: $v_3 \\approx 16{,}7$ km/s — únik ze Sluneční soustavy.",
      "**Gravitační manévr**: zisk rychlosti až $2v_{\\text{planeta}}$ průletem kolem planety — klíč k průzkumu vnějších planet.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvládli jste celou mechaniku — od kinematiky přes dynamiku, energii, hybnost až po gravitaci. Pokračujte na termodynamiku!",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Gravitace\n");

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

  console.log("\n🎉 Done! Brilliant-style Gravitace lessons seeded.\n");
}

main().catch(console.error);
