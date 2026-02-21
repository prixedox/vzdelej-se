import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "1053a176-b98d-4951-90dd-8ea58f0e5ed7";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Kinematika — jak popsat pohyb",
    sections: [
      {
        heading: "Svět je v pohybu",
        body: `Všechno kolem nás se pohybuje — auta na silnici, míč ve vzduchu, Země kolem Slunce. **Kinematika** je část fyziky, která pohyb **popisuje** — říká nám *kde*, *jak rychle* a *jakým směrem* se těleso pohybuje.

Neptat se **proč** se něco pohybuje (to je dynamika), ale **jak**.

> [!key] Tři základní veličiny kinematiky:
> - **Dráha** $s$ — kolik metrů těleso urazilo
> - **Rychlost** $v$ — jak rychle se pohybuje
> - **Čas** $t$ — jak dlouho pohyb trvá`,
      },
      {
        heading: "Dráha, rychlost, čas — magický trojúhelník",
        body: `Tyto tři veličiny jsou propojeny jedním vzorcem:

$$\\boxed{s = v \\cdot t}$$

Z něj odvodíme i zbylé dva:

$$v = \\frac{s}{t} \\qquad t = \\frac{s}{v}$$

Pomůcka — **trojúhelník SVT**:

$$\\begin{array}{|c|}\\hline \\quad s \\quad \\\\ \\hline v \\;\\;|\\;\\; t \\\\ \\hline \\end{array}$$

Zakryjte veličinu, kterou hledáte:
- Hledáte $s$? → zbyde $v \\cdot t$
- Hledáte $v$? → zbyde $\\frac{s}{t}$
- Hledáte $t$? → zbyde $\\frac{s}{v}$

> [!tip] Jednotky: dráha v **metrech** (m), čas v **sekundách** (s), rychlost v **metrech za sekundu** (m/s). Ale v praxi často používáme km a hodiny — pak je rychlost v km/h.`,
        visual: {
          type: "graph-st",
          props: {
            points: [
              { t: 0, v: 0 },
              { t: 1, v: 90 },
              { t: 2, v: 180 },
            ],
            xLabel: "t (h)",
            yLabel: "s (km)",
            title: "Auto jedoucí 90 km/h",
          },
          caption: "Graf s(t) rovnoměrného pohybu je přímka",
        },
        examples: [
          {
            problem: "Auto jede rychlostí $90$ km/h po dobu $2$ hodin. Jakou dráhu urazí?",
            solution: `$$s = v \\cdot t = 90 \\cdot 2 = \\color{#16a34a}{180 \\text{ km}}$$`,
          },
          {
            problem: "Cyklista ujel $45$ km za $3$ hodiny. Jaká byla jeho průměrná rychlost?",
            solution: `$$v = \\frac{s}{t} = \\frac{45}{3} = \\color{#16a34a}{15 \\text{ km/h}}$$`,
          },
        ],
      },
      {
        heading: "Vyzkoušejte si to! Pošlete auto do cíle",
        body: `Nastavte rychlost a čas tak, aby auto dojelo přesně do cíle.

Vzorec je jednoduchý: $s = v \\cdot t$. Ale kolik kombinací funguje?`,
        visual: {
          type: "interactive-motion",
          props: {
            maxV: 20,
            maxT: 10,
            targetDistance: 100,
            unit: "m",
          },
          caption: "Nastavte rychlost a čas, aby auto dojelo přesně na 100 m",
        },
      },
      {
        heading: "Převod jednotek: km/h ↔ m/s",
        body: `Fyzikální vzorce pracují v metrech a sekundách, ale v životě používáme km/h. Jak převádět?

$$\\boxed{1 \\text{ km/h} = \\frac{1000 \\text{ m}}{3600 \\text{ s}} = \\frac{1}{3{,}6} \\text{ m/s}}$$

Tedy:
- **km/h → m/s**: dělíme $3{,}6$
- **m/s → km/h**: násobíme $3{,}6$

$$\\begin{array}{rcl} 90 \\text{ km/h} & = & \\frac{90}{3{,}6} = \\color{#2563eb}{25 \\text{ m/s}} \\\\[8pt] 10 \\text{ m/s} & = & 10 \\cdot 3{,}6 = \\color{#2563eb}{36 \\text{ km/h}} \\end{array}$$

> [!info] Rychlý odhad: $100$ km/h $\\approx 28$ m/s. Člověk běží asi $5$ m/s = $18$ km/h. Světlo: $300\\,000$ km/s!`,
      },
      {
        heading: "Rovnoměrný pohyb — stálá rychlost",
        body: `Nejjednodušší pohyb: těleso se pohybuje **stále stejnou rychlostí**. Říkáme mu **rovnoměrný přímočarý pohyb**.

Každou sekundu se těleso posune o stejný kousek:

$$\\begin{array}{c|cccc} t \\text{ (s)} & 0 & 1 & 2 & 3 \\\\ \\hline s \\text{ (m)} & 0 & 5 & 10 & 15 \\end{array}$$

Každou sekundu se těleso posune o $5$ m → rychlost je $v = 5$ m/s.

> [!key] U rovnoměrného pohybu: čím **strmější** přímka v grafu $s(t)$, tím **větší rychlost**.`,
        visual: {
          type: "motion-diagram",
          props: {
            positions: [0, 5, 10, 15],
            labels: ["t=0", "t=1", "t=2", "t=3"],
            velocityArrows: true,
            title: "Rovnoměrný pohyb (v = 5 m/s)",
            unit: "m",
          },
          caption: "Tečky jsou ve stejných rozestupech — rychlost je konstantní",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Vlak vyjede ze stanice A a jede rovnoměrně rychlostí $120$ km/h. Stanice B je vzdálená $210$ km.

Za jak dlouho vlak dorazí do stanice B? Výsledek vyjádřete v hodinách a minutách.`,
    steps: [
      {
        instruction: "Zapište, co znáte",
        math: "$v = 120 \\text{ km/h}, \\quad s = 210 \\text{ km}, \\quad t = \\;?$",
        explanation: "Známe rychlost a dráhu, hledáme čas.",
      },
      {
        instruction: "Vyberte správný vzorec",
        math: "$t = \\frac{s}{v}$",
        explanation: "Z trojúhelníku SVT: zakryjeme $t$, zbyde $s$ děleno $v$.",
      },
      {
        instruction: "Dosaďte hodnoty",
        math: "$t = \\frac{210}{120} = 1{,}75 \\text{ h}$",
        explanation: "Dráhu vydělíme rychlostí. Výsledek je v hodinách, protože $s$ bylo v km a $v$ v km/h.",
      },
      {
        instruction: "Převeďte na hodiny a minuty",
        math: "$1{,}75 \\text{ h} = 1 \\text{ h} + 0{,}75 \\cdot 60 \\text{ min} = 1 \\text{ h } 45 \\text{ min}$",
        explanation: "Celá část = hodiny. Desetinnou část násobíme 60, abychom dostali minuty.",
      },
      {
        instruction: "Zkouška",
        math: "$s = v \\cdot t = 120 \\cdot 1{,}75 = 210 \\text{ km} \\;\\checkmark$",
        explanation: "Zpětně: za 1,75 hodiny při 120 km/h ujedeme přesně 210 km.",
      },
    ],
    finalAnswer: "Vlak dorazí do stanice B za $1$ hodinu a $45$ minut.",
  },
  practiceProblems: [
    {
      id: "kin-z-1",
      problemStatement: "Chodec jde rychlostí $5$ km/h po dobu $3$ hodin. Jakou dráhu urazí (v km)?",
      expectedAnswer: "15",
      acceptableAnswers: ["15", "15 km"],
      hints: [
        "Použijte vzorec $s = v \\cdot t$.",
        "$s = 5 \\cdot 3 = \\;?$",
      ],
      solutionExplanation: `$$s = v \\cdot t = 5 \\cdot 3 = 15 \\text{ km}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "kin-z-2",
      problemStatement: "Sprinter zaběhl $100$ m za $10$ s. Jaká byla jeho průměrná rychlost v m/s?",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "10 m/s"],
      hints: [
        "Rychlost = dráha / čas.",
        "$v = \\frac{100}{10}$",
      ],
      solutionExplanation: `$$v = \\frac{s}{t} = \\frac{100}{10} = 10 \\text{ m/s}$$
(To je $36$ km/h — opravdu rychlý běžec!)`,
      difficulty: "easy" as const,
    },
    {
      id: "kin-z-3",
      problemStatement: "Převeďte rychlost $72$ km/h na m/s.",
      expectedAnswer: "20",
      acceptableAnswers: ["20", "20 m/s"],
      hints: [
        "km/h na m/s: dělíme $3{,}6$.",
        "$\\frac{72}{3{,}6} = \\;?$",
      ],
      solutionExplanation: `$$72 \\text{ km/h} = \\frac{72}{3{,}6} = 20 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kin-z-4",
      problemStatement: "Auto jede rychlostí $90$ km/h. Za jak dlouho ujede $60$ km? Odpověď uveďte v minutách.",
      expectedAnswer: "40",
      acceptableAnswers: ["40", "40 min", "40 minut"],
      hints: [
        "$t = \\frac{s}{v} = \\frac{60}{90}$ hodiny. Převeďte na minuty.",
        "$\\frac{60}{90} = \\frac{2}{3}$ hodiny $= \\frac{2}{3} \\cdot 60$ minut.",
      ],
      solutionExplanation: `$$t = \\frac{s}{v} = \\frac{60}{90} = \\frac{2}{3} \\text{ h} = \\frac{2}{3} \\cdot 60 = 40 \\text{ minut}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kin-z-5",
      problemStatement: "Dva kamarádi bydlí $24$ km od sebe. Vyrazí současně na kolech proti sobě — Adam jede $16$ km/h a Bára $8$ km/h. Za kolik hodin se potkají?",
      expectedAnswer: "1",
      acceptableAnswers: ["1", "1 h", "1 hodina", "1 hodinu"],
      hints: [
        "Jedou proti sobě, takže se k sobě přibližují rychlostí $16 + 8 = 24$ km/h.",
        "$t = \\frac{24}{24} = \\;?$",
      ],
      solutionExplanation: `Jedou proti sobě — vzdálenost se zmenšuje rychlostí $v_1 + v_2$:
$$t = \\frac{s}{v_1 + v_2} = \\frac{24}{16 + 8} = \\frac{24}{24} = 1 \\text{ hodina}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Kinematika popisuje pohyb pomocí **dráhy** $s$, **rychlosti** $v$ a **času** $t$.",
      "Základní vzorec: $s = v \\cdot t$, z něj plyne $v = \\frac{s}{t}$ a $t = \\frac{s}{v}$.",
      "Převod: km/h $\\div 3{,}6$ = m/s, a naopak m/s $\\times 3{,}6$ = km/h.",
      "Rovnoměrný pohyb = stálá rychlost, v grafu $s(t)$ přímka.",
    ],
    nextTopicSuggestion: "Pokračujte na středně pokročilou obtížnost, kde se naučíte o zrychlení a grafech pohybu.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Acceleration, graphs, free fall
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Kinematika — zrychlení a grafy pohybu",
    sections: [
      {
        heading: "Co je zrychlení?",
        body: `Co se stane, když auto přidá plyn? Rychlost **roste**. Veličina, která popisuje, jak rychle se mění rychlost, je **zrychlení**:

$$\\boxed{a = \\frac{\\Delta v}{\\Delta t} = \\frac{v - v_0}{t}}$$

kde $v_0$ je počáteční rychlost a $v$ je rychlost po čase $t$.

$$\\begin{array}{c|ccccc} t \\text{ (s)} & 0 & 1 & 2 & 3 & 4 \\\\ \\hline v \\text{ (m/s)} & 0 & 3 & 6 & 9 & 12 \\end{array}$$

Rychlost roste každou sekundu o $3$ m/s → zrychlení je $a = 3 \\text{ m/s}^2$.

> [!key] Jednotka zrychlení: $\\text{m/s}^2$ (metr za sekundu za sekundu). Říká, o kolik m/s se změní rychlost **každou sekundu**.

> [!info] Záporné zrychlení = **zpomalování** (brzdění). Například $a = -5 \\text{ m/s}^2$ znamená, že rychlost klesá o $5$ m/s každou sekundu.`,
        visual: {
          type: "motion-diagram",
          props: {
            positions: [0, 1.5, 6, 13.5, 24],
            labels: ["t=0", "t=1", "t=2", "t=3", "t=4"],
            velocityArrows: true,
            title: "Zrychlený pohyb (a = 3 m/s²)",
            unit: "m",
          },
          caption: "Rozestupy mezi tečkami rostou — těleso zrychluje",
        },
        examples: [
          {
            problem: "Auto zrychlí z $0$ na $100$ km/h za $8$ s. Jaké je jeho zrychlení?",
            solution: `Převedeme: $100$ km/h $= \\frac{100}{3{,}6} \\approx 27{,}8$ m/s.
$$a = \\frac{v - v_0}{t} = \\frac{27{,}8 - 0}{8} \\approx 3{,}5 \\text{ m/s}^2$$`,
          },
        ],
      },
      {
        heading: "Rovnoměrně zrychlený pohyb",
        body: `Když je zrychlení **stálé** (konstantní), říkáme pohybu **rovnoměrně zrychlený**. Platí dva klíčové vzorce:

$$\\boxed{v = v_0 + a \\cdot t}$$

$$\\boxed{s = v_0 \\cdot t + \\frac{1}{2}\\,a \\cdot t^2}$$

Když těleso startuje z klidu ($v_0 = 0$), vzorce se zjednoduší:

$$v = a \\cdot t \\qquad s = \\frac{1}{2}\\,a \\cdot t^2$$

> [!tip] Užitečný doplňkový vzorec (bez času):
> $$v^2 = v_0^2 + 2\\,a\\,s$$`,
        visual: {
          type: "velocity-graph",
          props: {
            points: [
              { t: 0, v: 0 },
              { t: 2, v: 6 },
              { t: 4, v: 12 },
              { t: 6, v: 18 },
            ],
            showArea: true,
            areaColor: "#3b82f640",
            title: "Rovnoměrně zrychlený pohyb (a = 3 m/s²)",
          },
          caption: "Rychlost roste lineárně. Plocha pod grafem = ujetá dráha.",
        },
        examples: [
          {
            problem: "Auto startuje z klidu se zrychlením $2 \\text{ m/s}^2$. Jakou dráhu ujede za $10$ s?",
            solution: `$$s = \\frac{1}{2} \\cdot 2 \\cdot 10^2 = \\frac{1}{2} \\cdot 2 \\cdot 100 = \\color{#16a34a}{100 \\text{ m}}$$`,
          },
        ],
      },
      {
        heading: "Grafy pohybu — příběh v obrázcích",
        body: `Pohyb můžeme zobrazit dvěma typy grafů:

**Graf $s(t)$ — dráha v čase:**
- Rovnoměrný pohyb: **přímka** (konstantní sklon)
- Zrychlený pohyb: **parabola** (zakřivená nahoru)
- Klid: **vodorovná čára**

**Graf $v(t)$ — rychlost v čase:**
- Rovnoměrný pohyb: **vodorovná čára**
- Rovnoměrně zrychlený: **přímka** (stoupající nebo klesající)

> [!key] Plocha pod grafem $v(t)$ = **ujetá dráha**. Sklon přímky v grafu $v(t)$ = **zrychlení**.`,
        visual: {
          type: "velocity-graph",
          props: {
            points: [
              { t: 0, v: 0 },
              { t: 4, v: 20 },
              { t: 8, v: 20 },
              { t: 12, v: 0 },
            ],
            showArea: true,
            areaColor: "#16a34a40",
            title: "Zrychlení → stálá rychlost → brzdění",
          },
          caption: "Plocha pod grafem (zelená) = celková ujetá dráha",
        },
      },
      {
        heading: "Volný pád — Galileo měl pravdu",
        body: `Všechna tělesa padají **stejně rychle** (ve vakuu). Zrychlení volného pádu na Zemi:

$$\\boxed{g \\approx 9{,}81 \\text{ m/s}^2 \\approx 10 \\text{ m/s}^2}$$

Volný pád je rovnoměrně zrychlený pohyb s $a = g$ a $v_0 = 0$:

$$v = g \\cdot t \\qquad s = \\frac{1}{2}\\,g \\cdot t^2$$

Jak rychle roste rychlost při pádu:

$$\\begin{array}{c|cccc} t \\text{ (s)} & 0 & 1 & 2 & 3 \\\\ \\hline v \\text{ (m/s)} & 0 & 10 & 20 & 30 \\\\ \\hline s \\text{ (m)} & 0 & 5 & 20 & 45 \\end{array}$$

> [!info] Za první sekundu spadne těleso jen $5$ m. Za $3$ sekundy už $45$ m — dráha roste s **druhou mocninou** času!`,
        visual: {
          type: "trajectory",
          props: {
            type: "free-fall",
            height: 45,
            g: 10,
          },
          caption: "Volný pád z výšky 45 m — tečky se postupně vzdalují (zrychlování)",
        },
        examples: [
          {
            problem: "Kámen padá ze skály. Za jak dlouho dosáhne rychlosti $30$ m/s? (Použijte $g = 10 \\text{ m/s}^2$.)",
            solution: `$$t = \\frac{v}{g} = \\frac{30}{10} = 3 \\text{ s}$$`,
          },
        ],
      },
      {
        heading: "Prozkoumejte volný pád interaktivně",
        body: `Změňte výšku a sledujte, jak se mění doba pádu a konečná rychlost.

Všimněte si: když zdvojnásobíte výšku, doba pádu se **nezvětší** dvakrát — roste pomaleji (s odmocninou).`,
        visual: {
          type: "interactive-trajectory",
          props: {
            trajectoryType: "free-fall",
            defaultHeight: 45,
            g: 10,
          },
          caption: "Změňte výšku a sledujte, jak se mění doba pádu",
        },
      },
      {
        heading: "Pohrajte si s grafem rychlosti",
        body: `Měňte počáteční rychlost a zrychlení — sledujte, jak se mění sklon přímky a plocha pod grafem (= ujetá dráha).

Co se stane, když nastavíte záporné zrychlení? Rychlost **klesá** — těleso brzdí!`,
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 0,
            defaultA: 3,
            tMax: 6,
          },
          caption: "Měňte zrychlení a počáteční rychlost — sledujte graf a dráhu",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Auto brzdí z rychlosti $72$ km/h a zastaví na dráze $40$ m. Jaké bylo brzdné zrychlení (zpomalení)?`,
    steps: [
      {
        instruction: "Převeďte jednotky",
        math: "$v_0 = 72 \\text{ km/h} = \\frac{72}{3{,}6} = 20 \\text{ m/s}$",
        explanation: "Vzorce kinematiky vyžadují m/s.",
      },
      {
        instruction: "Zapište, co víte",
        math: "$v_0 = 20 \\text{ m/s}, \\quad v = 0 \\text{ m/s}, \\quad s = 40 \\text{ m}, \\quad a = \\;?$",
        explanation: "Auto zastaví, tedy konečná rychlost je $0$. Hledáme zrychlení (záporné = brzdění).",
      },
      {
        instruction: "Vyberte vzorec bez času",
        math: "$v^2 = v_0^2 + 2\\,a\\,s$",
        explanation: "Neznáme čas, ale máme $v$, $v_0$ a $s$ — použijeme vzorec $v^2 = v_0^2 + 2as$.",
      },
      {
        instruction: "Dosaďte a vyjádřete $a$",
        math: "$0^2 = 20^2 + 2 \\cdot a \\cdot 40$",
        explanation: "Dosadíme $v = 0$, $v_0 = 20$ a $s = 40$.",
      },
      {
        instruction: "Vyřešte",
        math: "$0 = 400 + 80a \\implies 80a = -400 \\implies a = -5 \\text{ m/s}^2$",
        explanation: "Záporné znaménko dává smysl — auto **zpomaluje**.",
      },
      {
        instruction: "Interpretace",
        math: "$|a| = 5 \\text{ m/s}^2$",
        explanation: "Brzdné zpomalení je $5 \\text{ m/s}^2$. Každou sekundu klesne rychlost o $5$ m/s, takže z $20$ m/s auto zastaví za $4$ sekundy.",
        visual: {
          type: "velocity-graph",
          props: {
            points: [
              { t: 0, v: 20 },
              { t: 1, v: 15 },
              { t: 2, v: 10 },
              { t: 3, v: 5 },
              { t: 4, v: 0 },
            ],
            showArea: true,
            areaColor: "#ef444440",
            title: "Brzdění: v = 20 - 5t",
          },
          caption: "Rychlost klesá lineárně. Plocha = brzdná dráha (40 m).",
        },
      },
    ],
    finalAnswer: "Brzdné zrychlení (zpomalení) je $a = -5 \\text{ m/s}^2$.",
  },
  practiceProblems: [
    {
      id: "kin-s-1",
      problemStatement: "Auto zrychlí z $0$ na $20$ m/s za $5$ s. Jaké je jeho zrychlení (v m/s$^2$)?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 m/s2", "4 m/s^2"],
      hints: [
        "$a = \\frac{v - v_0}{t}$",
        "$a = \\frac{20 - 0}{5}$",
      ],
      solutionExplanation: `$$a = \\frac{v - v_0}{t} = \\frac{20 - 0}{5} = 4 \\text{ m/s}^2$$`,
      difficulty: "easy" as const,
    },
    {
      id: "kin-s-2",
      problemStatement: "Motocykl startuje z klidu se zrychlením $3 \\text{ m/s}^2$. Jakou dráhu ujede za $6$ s?",
      expectedAnswer: "54",
      acceptableAnswers: ["54", "54 m"],
      hints: [
        "Start z klidu: $v_0 = 0$, použijte $s = \\frac{1}{2}at^2$.",
        "$s = \\frac{1}{2} \\cdot 3 \\cdot 6^2$",
      ],
      solutionExplanation: `$$s = \\frac{1}{2} \\cdot 3 \\cdot 36 = 54 \\text{ m}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kin-s-3",
      problemStatement: "Kámen padá ze skály do propasti. Dopadne za $4$ s. Jak hluboká je propast? (Použijte $g = 10 \\text{ m/s}^2$.)",
      expectedAnswer: "80",
      acceptableAnswers: ["80", "80 m"],
      hints: [
        "Volný pád z klidu: $s = \\frac{1}{2}gt^2$.",
        "$s = \\frac{1}{2} \\cdot 10 \\cdot 16$",
      ],
      solutionExplanation: `$$s = \\frac{1}{2} \\cdot g \\cdot t^2 = \\frac{1}{2} \\cdot 10 \\cdot 4^2 = 5 \\cdot 16 = 80 \\text{ m}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kin-s-4",
      problemStatement: "Auto jede $54$ km/h a začne brzdit se zpomalením $3 \\text{ m/s}^2$. Za jak dlouho zastaví (v sekundách)?",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "5 s", "5s"],
      hints: [
        "Převeďte: $54$ km/h $= 15$ m/s.",
        "$v = v_0 + at$, kde $v = 0$: $0 = 15 + (-3) \\cdot t$.",
      ],
      solutionExplanation: `$v_0 = 54 / 3{,}6 = 15$ m/s. Auto zastaví ($v = 0$):
$$0 = 15 - 3t \\implies 3t = 15 \\implies t = 5 \\text{ s}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "kin-s-5",
      problemStatement: "Jakou rychlostí (v m/s) dopadne předmět, který padá z výšky $20$ m? (Použijte $g = 10 \\text{ m/s}^2$.)",
      expectedAnswer: "20",
      acceptableAnswers: ["20", "20 m/s"],
      hints: [
        "Použijte $v^2 = v_0^2 + 2gs$, kde $v_0 = 0$.",
        "$v^2 = 2 \\cdot 10 \\cdot 20 = 400$. Odmocněte.",
      ],
      solutionExplanation: `$$v^2 = 2gs = 2 \\cdot 10 \\cdot 20 = 400 \\implies v = \\sqrt{400} = 20 \\text{ m/s}$$
(To je $72$ km/h!)`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Zrychlení $a = \\frac{\\Delta v}{\\Delta t}$ udává, jak rychle se mění rychlost. Jednotka: $\\text{m/s}^2$.",
      "Rovnoměrně zrychlený pohyb: $v = v_0 + at$, $s = v_0 t + \\frac{1}{2}at^2$.",
      "Volný pád: $a = g \\approx 10 \\text{ m/s}^2$, dráha roste s $t^2$.",
      "Grafy: plocha pod $v(t)$ = dráha, sklon $v(t)$ = zrychlení.",
    ],
    nextTopicSuggestion: "Pokračujte na pokročilou obtížnost s vrhy a složitějšími grafy.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Projectile motion, combined problems, graphs
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Kinematika — vrhy a pokročilé úlohy",
    sections: [
      {
        heading: "Svislý vrh vzhůru",
        body: `Když hodíte míč svisle nahoru počáteční rychlostí $v_0$, míč **zpomaluje** (gravitace brzdí), zastaví se v nejvyšším bodě, a pak padá zpět.

Nahoru: $a = -g$ (brzdění), dolů: $a = +g$ (zrychlování).

$$v = v_0 - g \\cdot t$$
$$h = v_0 \\cdot t - \\frac{1}{2}\\,g \\cdot t^2$$

**Nejvyšší bod** — rychlost je nulová ($v = 0$):

$$t_{\\text{max}} = \\frac{v_0}{g} \\qquad h_{\\text{max}} = \\frac{v_0^2}{2g}$$

> [!key] Čas letu nahoru = čas letu dolů. Celková doba letu: $T = \\frac{2v_0}{g}$.

$$\\begin{array}{l} h \\uparrow \\\\ h_{\\max}|\\quad\\quad \\frown \\\\ \\quad\\;|\\;\\nearrow \\quad\\quad \\searrow \\\\ \\quad\\;|\\!\\!\\longrightarrow t \\\\ \\quad\\; 0 \\quad t_{\\max} \\quad T \\end{array}$$`,
        visual: {
          type: "trajectory",
          props: {
            type: "vertical-throw",
            v0: 20,
            g: 10,
          },
          caption: "Svislý vrh vzhůru: míč zpomaluje, zastaví, padá zpět",
        },
        examples: [
          {
            problem: "Míč je hozen svisle vzhůru rychlostí $20$ m/s. Jak vysoko vyletí? ($g = 10 \\text{ m/s}^2$)",
            solution: `$$h_{\\max} = \\frac{v_0^2}{2g} = \\frac{20^2}{2 \\cdot 10} = \\frac{400}{20} = \\color{#16a34a}{20 \\text{ m}}$$`,
          },
        ],
      },
      {
        heading: "Vodorovný vrh",
        body: `Představte si míč, který spadne ze stolu. Má vodorovnou rychlost $v_0$ a zároveň padá dolů.

Pohyb se rozloží na dvě **nezávislé** složky:

$$\\begin{array}{ll} \\textbf{Vodorovně:} & x = v_0 \\cdot t & \\text{(rovnoměrný pohyb)} \\\\ \\textbf{Svisle:} & y = \\frac{1}{2}\\,g \\cdot t^2 & \\text{(volný pád)} \\end{array}$$

Trajektorie je **parabola**:

$$\\begin{array}{l} \\circ \\rightarrow \\quad\\quad\\quad\\;\\; \\\\ \\quad \\searrow \\\\ \\quad\\quad \\searrow \\\\ \\quad\\quad\\quad \\downarrow \\end{array}$$

> [!tip] Klíčový princip: **vodorovná a svislá složka pohybu jsou na sobě nezávislé**. Vodorovná rychlost se nemění (žádné vodorovné zrychlení), svislá rychlost roste kvůli gravitaci.

Dopadová rychlost je vektorový součet:
$$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{v_0^2 + (gt)^2}$$`,
        visual: {
          type: "trajectory",
          props: {
            type: "horizontal-throw",
            v0: 10,
            height: 45,
            g: 10,
            showComponents: true,
          },
          caption: "Vodorovný vrh: parabola vzniká složením dvou nezávislých pohybů",
        },
        examples: [
          {
            problem: "Míč se kutálí ze stolu vysokého $1{,}25$ m a opustí hranu rychlostí $3$ m/s. Kde dopadne?",
            solution: `Čas pádu: $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\cdot 1{,}25}{10}} = \\sqrt{0{,}25} = 0{,}5$ s

Dolet: $x = v_0 \\cdot t = 3 \\cdot 0{,}5 = \\color{#16a34a}{1{,}5 \\text{ m}}$ od stolu.`,
          },
        ],
      },
      {
        heading: "Analýza grafů pohybu",
        body: `Pokročilé úlohy často pracují s grafy. Shrnutí vztahů:

**Z grafu $s(t)$:**
- Sklon (směrnice) tečny = **okamžitá rychlost**
- Přímka = rovnoměrný pohyb
- Parabola = zrychlený pohyb
- Vodorovná = těleso stojí

**Z grafu $v(t)$:**
- Sklon = **zrychlení**
- Plocha pod grafem = **ujetá dráha**
- Záporné hodnoty = pohyb opačným směrem

$$\\boxed{s = \\int_0^t v \\, dt = \\text{plocha pod } v(t)}$$

> [!key] Obdélník pod grafem: $s = v \\cdot t$. Trojúhelník: $s = \\frac{1}{2} v \\cdot t$.`,
      },
      {
        heading: "Relativní pohyb",
        body: `Rychlost závisí na tom, **vůči čemu** měříte. Cestující ve vlaku sedí klidně vůči vlaku, ale pohybuje se vůči kolejím.

**Skládání rychlostí:**
- Stejný směr: $v_{\\text{celk}} = v_1 + v_2$
- Opačný směr: $v_{\\text{celk}} = v_1 - v_2$

> [!info] Příklad: Plavec plave rychlostí $2$ m/s v řece s proudem $1$ m/s.
> - S proudem: $2 + 1 = 3$ m/s
> - Proti proudu: $2 - 1 = 1$ m/s`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Z okna ve výšce $45$ m nad zemí hodíte míček vodorovně rychlostí $6$ m/s.

a) Za jak dlouho dopadne na zem?
b) Jak daleko od budovy dopadne?
c) Jakou rychlostí dopadne?

(Použijte $g = 10 \\text{ m/s}^2$, odpor vzduchu zanedbejte.)`,
    steps: [
      {
        instruction: "Svislý pohyb — čas dopadu",
        math: "$h = \\frac{1}{2}gt^2 \\implies t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{2 \\cdot 45}{10}} = \\sqrt{9} = 3 \\text{ s}$",
        explanation: "Svisle jde o volný pád z výšky $45$ m. Vodorovná rychlost nehraje roli!",
        visual: {
          type: "trajectory",
          props: {
            type: "horizontal-throw",
            v0: 6,
            height: 45,
            g: 10,
            showComponents: true,
          },
          caption: "Vodorovný vrh z 45 m rychlostí 6 m/s",
        },
      },
      {
        instruction: "Vodorovný dolet",
        math: "$x = v_0 \\cdot t = 6 \\cdot 3 = 18 \\text{ m}$",
        explanation: "Vodorovně se míček pohybuje rovnoměrně po celou dobu pádu.",
      },
      {
        instruction: "Svislá složka dopadové rychlosti",
        math: "$v_y = g \\cdot t = 10 \\cdot 3 = 30 \\text{ m/s}$",
        explanation: "Svislá rychlost roste od nuly — po $3$ s je $30$ m/s.",
      },
      {
        instruction: "Celková dopadová rychlost",
        math: "$v = \\sqrt{v_x^2 + v_y^2} = \\sqrt{6^2 + 30^2} = \\sqrt{36 + 900} = \\sqrt{936} \\approx 30{,}6 \\text{ m/s}$",
        explanation: "Dopadová rychlost je vektorový součet vodorovné ($6$ m/s) a svislé ($30$ m/s) složky.",
      },
      {
        instruction: "Zkontrolujte výsledky",
        math: "$t = 3 \\text{ s}, \\quad x = 18 \\text{ m}, \\quad v \\approx 30{,}6 \\text{ m/s} \\approx 110 \\text{ km/h}$",
        explanation: "Míček letí $3$ s, dopadne $18$ m od budovy rychlostí asi $110$ km/h.",
      },
    ],
    finalAnswer: "a) Dopadne za $3$ s. b) Dopadne $18$ m od budovy. c) Dopadová rychlost je $\\approx 30{,}6$ m/s.",
  },
  practiceProblems: [
    {
      id: "kin-p-1",
      problemStatement: "Míč hozen svisle vzhůru rychlostí $30$ m/s. Jak vysoko vyletí? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "45",
      acceptableAnswers: ["45", "45 m"],
      hints: [
        "V nejvyšším bodě je $v = 0$. Použijte $h_{\\max} = \\frac{v_0^2}{2g}$.",
        "$h = \\frac{30^2}{2 \\cdot 10} = \\frac{900}{20}$",
      ],
      solutionExplanation: `$$h_{\\max} = \\frac{v_0^2}{2g} = \\frac{900}{20} = 45 \\text{ m}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "kin-p-2",
      problemStatement: "Míč hozen svisle vzhůru rychlostí $15$ m/s. Jak dlouho bude celkově ve vzduchu? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 s", "3s"],
      hints: [
        "Celková doba letu: $T = \\frac{2v_0}{g}$.",
        "$T = \\frac{2 \\cdot 15}{10}$",
      ],
      solutionExplanation: `$$T = \\frac{2v_0}{g} = \\frac{30}{10} = 3 \\text{ s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kin-p-3",
      problemStatement: "Z hrany útesu ($80$ m nad mořem) hodíte kámen vodorovně rychlostí $10$ m/s. Jak daleko od útesu dopadne do moře? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "40",
      acceptableAnswers: ["40", "40 m"],
      hints: [
        "Čas pádu: $t = \\sqrt{\\frac{2h}{g}} = \\sqrt{\\frac{160}{10}} = \\sqrt{16}$.",
        "Dolet: $x = v_0 \\cdot t = 10 \\cdot 4$.",
      ],
      solutionExplanation: `Čas pádu: $t = \\sqrt{\\frac{2 \\cdot 80}{10}} = \\sqrt{16} = 4$ s

Dolet: $x = 10 \\cdot 4 = 40$ m od útesu.`,
      difficulty: "hard" as const,
    },
    {
      id: "kin-p-4",
      problemStatement: "Loď pluje rychlostí $5$ m/s po řece s proudem $3$ m/s. Jakou rychlostí (v m/s) se loď pohybuje vůči břehu, když pluje **proti** proudu?",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2 m/s"],
      hints: [
        "Proti proudu: rychlost vůči břehu = rychlost lodi minus rychlost proudu.",
        "$v = 5 - 3$",
      ],
      solutionExplanation: `Proti proudu se rychlosti odečítají:
$$v = v_{\\text{loď}} - v_{\\text{proud}} = 5 - 3 = 2 \\text{ m/s}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "kin-p-5",
      problemStatement: "Z grafu $v(t)$: Auto jede $10$ s rychlostí $20$ m/s, pak $5$ s brzdí rovnoměrně na $0$ m/s. Jakou celkovou dráhu ujede (v metrech)?",
      expectedAnswer: "250",
      acceptableAnswers: ["250", "250 m"],
      hints: [
        "Dráha = plocha pod grafem $v(t)$. Rozdělte na obdélník + trojúhelník.",
        "Obdélník: $20 \\cdot 10 = 200$ m. Trojúhelník: $\\frac{1}{2} \\cdot 20 \\cdot 5 = 50$ m.",
      ],
      solutionExplanation: `Plocha pod grafem:

Rovnoměrný úsek (obdélník): $s_1 = 20 \\cdot 10 = 200$ m

Brzdění (trojúhelník): $s_2 = \\frac{1}{2} \\cdot 20 \\cdot 5 = 50$ m

$$s = 200 + 50 = 250 \\text{ m}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Svislý vrh vzhůru: $v = v_0 - gt$, maximální výška $h_{\\max} = \\frac{v_0^2}{2g}$, celková doba letu $T = \\frac{2v_0}{g}$.",
      "Vodorovný vrh: dva nezávislé pohyby — vodorovně rovnoměrný, svisle volný pád.",
      "Dopadová rychlost: $v = \\sqrt{v_x^2 + v_y^2}$ (Pythagorova věta pro vektory).",
      "Grafy $v(t)$: plocha = dráha, sklon = zrychlení. Umíte-li číst grafy, umíte kinematiku.",
    ],
    nextTopicSuggestion: "Skvělá práce! Pokračujte na dynamiku — tam zjistíte, co pohyb způsobuje (síly).",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Kinematika\n");

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

  console.log("\n🎉 Done! Brilliant-style Kinematika lessons seeded.\n");
}

main().catch(console.error);
