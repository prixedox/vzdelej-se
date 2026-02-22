import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "856d07f1-a44e-44ad-ae92-4bdea01d29f7";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Dynamika — co pohyb způsobuje",
    sections: [
      {
        heading: "Proč se věci hýbou?",
        body: `Kinematika popisuje **jak** se těleso pohybuje. Dynamika se ptá **proč**.

Odpověď je jednoduchá: pohyb mění **síla**.

Síla je to, co:
- uvede těleso do pohybu
- zastaví pohybující se těleso
- změní směr pohybu
- změní rychlost pohybu

> [!key] Síla se značí $F$ a měří se v **newtonech** (N). Jeden newton je síla, která udělí tělesu o hmotnosti $1$ kg zrychlení $1 \\text{ m/s}^2$.`,
      },
      {
        heading: "1. Newtonův zákon — zákon setrvačnosti",
        body: `Představte si hokejový puk na hladkém ledě. Pokud do něj nikdo nestrčí, zůstane stát. A pokud se pohybuje, pojede stále stejnou rychlostí přímočaře dál.

$$\\boxed{\\text{Těleso setrvává v klidu nebo rovnoměrném přímočarém pohybu, pokud na něj nepůsobí žádná síla.}}$$

V reálném světě tělesa zastavují kvůli **tření** a **odporu vzduchu** — ale to jsou také síly!

> [!info] Setrvačnost je tendence těles bránit se změně pohybu. Proto vás v autě \"hodí\" dopředu při brzdění — vaše tělo chce pokračovat v pohybu.`,
        examples: [
          {
            problem: "Proč se kosmická sonda Voyager pohybuje vesmírem, i když už nemá palivo?",
            solution: `Ve vesmíru není vzduch ani tření. Podle 1. Newtonova zákona se sonda pohybuje rovnoměrně přímočaře, protože na ni nepůsobí žádná síla (téměř).`,
          },
        ],
      },
      {
        heading: "2. Newtonův zákon — zákon síly",
        body: `Toto je **nejdůležitější vzorec dynamiky**:

$$\\boxed{F = m \\cdot a}$$

Síla = hmotnost × zrychlení. Říká nám:
- Čím **větší síla**, tím **větší zrychlení**
- Čím **těžší těleso**, tím **menší zrychlení** (při stejné síle)

$$a = \\frac{F}{m} \\qquad m = \\frac{F}{a}$$

> [!key] Jednotky: $F$ v newtonech (N), $m$ v kilogramech (kg), $a$ v $\\text{m/s}^2$. Platí: $1 \\text{ N} = 1 \\text{ kg} \\cdot \\text{m/s}^2$.`,
        visual: {
          type: "interactive-motion",
          props: {
            maxV: 20,
            maxT: 10,
            targetDistance: 80,
            unit: "m",
          },
          caption: "Větší síla → větší zrychlení → rychleji do cíle",
        },
        examples: [
          {
            problem: "Jakou silou musíme působit na těleso o hmotnosti $5$ kg, aby zrychlilo $3 \\text{ m/s}^2$?",
            solution: `$$F = m \\cdot a = 5 \\cdot 3 = \\color{#16a34a}{15 \\text{ N}}$$`,
          },
          {
            problem: "Auto o hmotnosti $1200$ kg zrychlí silou motoru $2400$ N. Jaké je jeho zrychlení?",
            solution: `$$a = \\frac{F}{m} = \\frac{2400}{1200} = \\color{#16a34a}{2 \\text{ m/s}^2}$$`,
          },
        ],
      },
      {
        heading: "Vyzkoušejte si to! Jak síla závisí na hmotnosti?",
        body: `Měňte rychlost a čas — sledujte, jak se pohybuje auto. Představte si, že větší rychlost znamená větší sílu.

Stejná dráha, ale různé kombinace — to je podstata vzorce $F = m \\cdot a$.`,
        visual: {
          type: "interactive-motion",
          props: {
            maxV: 15,
            maxT: 8,
            targetDistance: 60,
            unit: "m",
          },
          caption: "Najděte kombinaci rychlosti a času pro dráhu 60 m",
        },
      },
      {
        heading: "3. Newtonův zákon — akce a reakce",
        body: `Každá síla má svou **dvojčata**:

$$\\boxed{F_{\\text{akce}} = -F_{\\text{reakce}}}$$

Když tlačíte na zeď, zeď tlačí stejnou silou na vás. Když Země přitahuje jablko, jablko přitahuje Zemi (jen to na Zemi nepoznáte — je moc těžká).

- Plavec se odráží od stěny bazénu → stěna \"tlačí\" plavce dopředu
- Raketa vypouští plyny dozadu → plyny tlačí raketu dopředu

> [!tip] Akce a reakce vždy působí na **různá tělesa**! Nikdy se navzájem neruší.

Vyzkoušejte si srážku dvou těles — 3. zákon v akci! Nastavte hmotnosti a rychlosti, pak klikněte Srazit:`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "choosable",
            defaultM1: 4,
            defaultM2: 2,
            defaultV1: 8,
            defaultV2: 0,
          },
          caption: "Nastavte hmotnosti a rychlosti, přepínejte pružnou/nepružnou srážku",
        },
        examples: [
          {
            problem: "Astronaut ve vesmíru hodí kamenem. Co se stane?",
            solution: `Podle 3. Newtonova zákona: astronaut působí silou na kámen (letí dopředu), kámen působí stejnou silou na astronauta (letí dozadu). Ve vesmíru bez tření se oba pohnou.`,
          },
        ],
      },
      {
        heading: "Tíhová síla — proč věci padají",
        body: `Země přitahuje všechna tělesa silou, které říkáme **tíhová síla**:

$$\\boxed{F_G = m \\cdot g}$$

kde $g \\approx 10 \\text{ m/s}^2$ je **tíhové zrychlení**.

$$\\begin{array}{c|cccc} m \\text{ (kg)} & 1 & 5 & 10 & 70 \\\\ \\hline F_G \\text{ (N)} & 10 & 50 & 100 & 700 \\end{array}$$

> [!key] Hmotnost $m$ (v kg) a tíha $F_G$ (v N) jsou různé věci! Hmotnost je vlastnost tělesa, tíha závisí na místě (na Měsíci je $g \\approx 1{,}6 \\text{ m/s}^2$).`,
        visual: {
          type: "interactive-balance-scale",
          props: {
            equation: { a: 10, b: 0, right: 50 },
            xRange: [0, 10],
          },
          caption: "Najděte hmotnost m, pro kterou platí F = m·g = 50 N (g = 10)",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Na stole leží kniha o hmotnosti $2$ kg. Zatáhnete za ni vodorovnou silou $10$ N. Koeficient tření mezi knihou a stolem je $f = 0{,}3$. Bude se kniha pohybovat? Pokud ano, jaké bude její zrychlení?`,
    steps: [
      {
        instruction: "Spočítejte tíhovou sílu knihy",
        math: "$F_G = m \\cdot g = 2 \\cdot 10 = 20 \\text{ N}$",
        explanation: "Kniha má hmotnost $2$ kg, tíhové zrychlení $g = 10 \\text{ m/s}^2$.",
      },
      {
        instruction: "Normálová síla na vodorovném povrchu",
        math: "$N = F_G = 20 \\text{ N}$",
        explanation: "Na rovném stole je normálová síla rovna tíhové síle.",
      },
      {
        instruction: "Spočítejte třecí sílu",
        math: "$F_t = f \\cdot N = 0{,}3 \\cdot 20 = 6 \\text{ N}$",
        explanation: "Tření brzdí pohyb. Koeficient tření $f = 0{,}3$ násobíme normálovou silou.",
      },
      {
        instruction: "Porovnejte tahovou a třecí sílu",
        math: "$F_{\\text{tah}} = 10 \\text{ N} > F_t = 6 \\text{ N}$",
        explanation: "Tahová síla je větší než tření → kniha se **bude** pohybovat!",
      },
      {
        instruction: "Výsledná síla",
        math: "$F_{\\text{výsl}} = F_{\\text{tah}} - F_t = 10 - 6 = 4 \\text{ N}$",
        explanation: "Výsledná síla je rozdíl tahové síly a tření.",
      },
      {
        instruction: "Zrychlení knihy",
        math: "$a = \\frac{F_{\\text{výsl}}}{m} = \\frac{4}{2} = 2 \\text{ m/s}^2$",
        explanation: "Z 2. Newtonova zákona: kniha zrychluje $2 \\text{ m/s}^2$ ve směru tahu.",
      },
    ],
    finalAnswer: "Ano, kniha se pohybuje se zrychlením $a = 2 \\text{ m/s}^2$.",
  },
  practiceProblems: [
    {
      id: "dyn-b-1",
      problemStatement: "Jakou silou musíme působit na vozík o hmotnosti $8$ kg, aby zrychlil $1{,}5 \\text{ m/s}^2$?",
      expectedAnswer: "12",
      acceptableAnswers: ["12", "12 N"],
      hints: [
        "Použijte vzorec $F = m \\cdot a$.",
        "$F = 8 \\cdot 1{,}5$",
      ],
      solutionExplanation: `$$F = m \\cdot a = 8 \\cdot 1{,}5 = 12 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "dyn-b-2",
      problemStatement: "Auto o hmotnosti $1000$ kg brzdí silou $5000$ N. Jaké je brzdné zpomalení?",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "5 m/s²", "5 m/s^2", "-5"],
      hints: [
        "Použijte $a = F/m$.",
        "$a = 5000 / 1000$",
      ],
      solutionExplanation: `$$a = \\frac{F}{m} = \\frac{5000}{1000} = 5 \\text{ m/s}^2$$
Brzdné zpomalení je $5 \\text{ m/s}^2$.`,
      difficulty: "easy" as const,
    },
    {
      id: "dyn-b-3",
      problemStatement: "Jaká je tíhová síla působící na člověka o hmotnosti $65$ kg? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "650",
      acceptableAnswers: ["650", "650 N"],
      hints: [
        "$F_G = m \\cdot g$",
        "$F_G = 65 \\cdot 10$",
      ],
      solutionExplanation: `$$F_G = m \\cdot g = 65 \\cdot 10 = 650 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "dyn-b-4",
      problemStatement: "Na těleso o hmotnosti $4$ kg působí síla $20$ N. Třecí síla je $8$ N. Jaké je zrychlení tělesa?",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 m/s²", "3 m/s^2"],
      hints: [
        "Výsledná síla = tahová síla − třecí síla.",
        "$F_{\\text{výsl}} = 20 - 8 = 12$ N, pak $a = F/m$.",
      ],
      solutionExplanation: `Výsledná síla: $F = 20 - 8 = 12$ N
$$a = \\frac{F}{m} = \\frac{12}{4} = 3 \\text{ m/s}^2$$`,
      difficulty: "medium" as const,
    },
    {
      id: "dyn-b-5",
      problemStatement: "Krabice o hmotnosti $10$ kg leží na podlaze. Koeficient tření je $f = 0{,}4$. Jakou minimální silou musíte táhnout, aby se krabice rozjela? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "40",
      acceptableAnswers: ["40", "40 N"],
      hints: [
        "Krabice se rozjede, když tahová síla překoná tření: $F > f \\cdot m \\cdot g$.",
        "$F_t = 0{,}4 \\cdot 10 \\cdot 10$",
      ],
      solutionExplanation: `Třecí síla: $F_t = f \\cdot m \\cdot g = 0{,}4 \\cdot 10 \\cdot 10 = 40$ N

Aby se krabice rozjela, potřebujeme sílu **alespoň** $40$ N.`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**1. Newtonův zákon**: Těleso setrvává v klidu nebo rovnoměrném pohybu, pokud na něj nepůsobí síla.",
      "**2. Newtonův zákon**: $F = m \\cdot a$ — síla = hmotnost × zrychlení.",
      "**3. Newtonův zákon**: Akce = reakce, vždy na různých tělesech.",
      "**Tíhová síla**: $F_G = m \\cdot g$ — Země přitahuje vše silou úměrnou hmotnosti.",
      "**Tření**: $F_t = f \\cdot N$ — brzdí pohyb, závisí na povrchu a normálové síle.",
    ],
    nextTopicSuggestion: "Výborně! Pokračujte na energii a práci — zjistíte, kam se poděje síla na dlouhé dráze.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step, graph-aware
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Dynamika — síly v akci",
    sections: [
      {
        heading: "Výslednice sil — skládání sil",
        body: `Na těleso často působí **více sil najednou**. Výsledný pohyb závisí na **výslednici** (součtu) všech sil.

**Síly ve stejném směru** se sčítají:
$$F_{\\text{výsl}} = F_1 + F_2$$

**Síly v opačném směru** se odčítají:
$$F_{\\text{výsl}} = F_1 - F_2$$

**Síly pod úhlem** — skládáme jako vektory (Pythagorova věta pro kolmé síly):
$$F_{\\text{výsl}} = \\sqrt{F_1^2 + F_2^2}$$

> [!key] Pokud je výslednice sil **nulová** ($F_{\\text{výsl}} = 0$), těleso se pohybuje rovnoměrně nebo je v klidu — to je 1. Newtonův zákon!`,
        examples: [
          {
            problem: "Na těleso působí síla $30$ N doprava a $10$ N doleva. Jaká je výslednice?",
            solution: `$$F_{\\text{výsl}} = 30 - 10 = \\color{#16a34a}{20 \\text{ N doprava}}$$`,
          },
        ],
      },
      {
        heading: "Tření — přítel i nepřítel",
        body: `Třecí síla vždy působí **proti směru pohybu** (nebo proti tendenci k pohybu).

$$\\boxed{F_t = f \\cdot N}$$

kde $f$ je **koeficient tření** (bezrozměrné číslo) a $N$ je **normálová síla** (kolmá k povrchu).

Typické hodnoty $f$:
$$\\begin{array}{l|c} \\text{Povrch} & f \\\\ \\hline \\text{guma — asfalt} & 0{,}7 \\\\ \\text{dřevo — dřevo} & 0{,}3 \\\\ \\text{led — ocel} & 0{,}02 \\end{array}$$

> [!info] Rozlišujeme **smykové tření** (těleso se pohybuje) a **klidové tření** (těleso se ještě nepohybuje). Klidové tření je obvykle o něco větší.`,
        examples: [
          {
            problem: "Bedna o hmotnosti $50$ kg stojí na podlaze ($f = 0{,}3$). Jaká je třecí síla?",
            solution: `$$N = m \\cdot g = 50 \\cdot 10 = 500 \\text{ N}$$
$$F_t = f \\cdot N = 0{,}3 \\cdot 500 = \\color{#16a34a}{150 \\text{ N}}$$`,
          },
        ],
      },
      {
        heading: "Pohyb na nakloněné rovině",
        body: `Na nakloněné rovině se tíhová síla rozkládá na dvě složky:

$$F_{\\parallel} = m \\cdot g \\cdot \\sin \\alpha \\quad \\text{(rovnoběžně se sklonem — táhne dolů)}$$

$$F_{\\perp} = m \\cdot g \\cdot \\cos \\alpha \\quad \\text{(kolmo k rovině — tlačí do podložky)}$$

Normálová síla: $N = F_{\\perp} = m \\cdot g \\cdot \\cos \\alpha$

Třecí síla: $F_t = f \\cdot m \\cdot g \\cdot \\cos \\alpha$

Těleso se rozjede, když: $F_{\\parallel} > F_t$, tj. $\\tan \\alpha > f$

> [!key] Výsledná síla po sklonu: $F = m \\cdot g \\cdot (\\sin \\alpha - f \\cdot \\cos \\alpha)$`,
        visual: {
          type: "interactive-inclined-plane",
          props: {
            maxAngle: 60,
            defaultAngle: 30,
            maxMass: 20,
            defaultMu: 0.3,
            showDecomposition: true,
          },
          caption: "Měňte úhel, hmotnost a tření — sledujte síly a zda se blok rozjede",
        },
        examples: [
          {
            problem: "Těleso sjíždí po nakloněné rovině s úhlem $30°$ bez tření. Jaké je jeho zrychlení?",
            solution: `$$a = g \\cdot \\sin 30° = 10 \\cdot 0{,}5 = \\color{#16a34a}{5 \\text{ m/s}^2}$$`,
          },
        ],
      },
      {
        heading: "Dostředivá síla — pohyb po kružnici",
        body: `Aby se těleso pohybovalo po kružnici, musí na něj působit síla **směrem ke středu**:

$$\\boxed{F_d = m \\cdot \\frac{v^2}{r} = m \\cdot \\omega^2 \\cdot r}$$

kde $v$ je rychlost, $r$ poloměr kružnice a $\\omega$ úhlová rychlost.

Příklady dostředivé síly:
- **Planeta kolem Slunce**: gravitace
- **Auto v zatáčce**: tření pneumatik
- **Koule na provázku**: tahová síla provázku

> [!tip] Dostředivá síla nemění **velikost** rychlosti, jen její **směr**. Proto je pohyb po kružnici rovnoměrný (pokud $v = \\text{const}$).`,
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 10,
            defaultA: 0,
            tMax: 6,
          },
          caption: "Při rovnoměrném pohybu po kružnici je velikost rychlosti konstantní",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Auto o hmotnosti $1200$ kg jede rychlostí $72$ km/h a začne brzdit. Koeficient tření mezi pneumatikami a vozovkou je $f = 0{,}6$. Jaká je brzdná dráha?`,
    steps: [
      {
        instruction: "Převeďte rychlost na m/s",
        math: "$v_0 = \\frac{72}{3{,}6} = 20 \\text{ m/s}$",
        explanation: "Dělíme $3{,}6$ pro převod km/h → m/s.",
      },
      {
        instruction: "Spočítejte normálovou sílu",
        math: "$N = m \\cdot g = 1200 \\cdot 10 = 12\\,000 \\text{ N}$",
        explanation: "Na rovné vozovce je normálová síla rovna tíze auta.",
      },
      {
        instruction: "Spočítejte třecí (brzdnou) sílu",
        math: "$F_t = f \\cdot N = 0{,}6 \\cdot 12\\,000 = 7200 \\text{ N}$",
        explanation: "Tření pneumatik o vozovku brzdí auto.",
      },
      {
        instruction: "Spočítejte brzdné zpomalení",
        math: "$a = \\frac{F_t}{m} = \\frac{7200}{1200} = 6 \\text{ m/s}^2$",
        explanation: "Z 2. Newtonova zákona. Zpomalení je $6 \\text{ m/s}^2$ (znaménko − v rovnicích).",
      },
      {
        instruction: "Použijte vzorec bez času pro brzdnou dráhu",
        math: "$v^2 = v_0^2 - 2 \\cdot a \\cdot s$",
        explanation: "Auto zastaví ($v = 0$), takže: $0 = v_0^2 - 2as$.",
      },
      {
        instruction: "Vypočítejte brzdnou dráhu",
        math: "$s = \\frac{v_0^2}{2a} = \\frac{20^2}{2 \\cdot 6} = \\frac{400}{12} \\approx 33{,}3 \\text{ m}$",
        explanation: "Auto zastaví po přibližně $33$ metrech.",
        visual: {
          type: "interactive-velocity-graph",
          props: {
            mode: "kinematics",
            defaultV0: 20,
            defaultA: -6,
            tMax: 4,
          },
          caption: "Brzdění: rychlost klesá, plocha pod grafem = brzdná dráha",
        },
      },
    ],
    finalAnswer: "Brzdná dráha je přibližně $33{,}3$ m (asi $33$ m).",
  },
  practiceProblems: [
    {
      id: "dyn-i-1",
      problemStatement: "Auto o hmotnosti $800$ kg zrychluje ze stoje na $20 \\text{ m/s}$ za $10$ s. Jaká síla motoru je potřeba? (Zanedbejte tření.)",
      expectedAnswer: "1600",
      acceptableAnswers: ["1600", "1600 N"],
      hints: [
        "Nejdřív spočítejte zrychlení: $a = \\frac{\\Delta v}{t}$.",
        "$a = 20/10 = 2 \\text{ m/s}^2$, pak $F = m \\cdot a$.",
      ],
      solutionExplanation: `$$a = \\frac{20}{10} = 2 \\text{ m/s}^2$$
$$F = m \\cdot a = 800 \\cdot 2 = 1600 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "dyn-i-2",
      problemStatement: "Bedna o hmotnosti $30$ kg je tažena silou $150$ N po podlaze ($f = 0{,}2$). Jaké je zrychlení bedny? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 m/s²", "3 m/s^2"],
      hints: [
        "Třecí síla: $F_t = f \\cdot m \\cdot g = 0{,}2 \\cdot 30 \\cdot 10$.",
        "$F_t = 60$ N, výsledná $F = 150 - 60 = 90$ N, pak $a = F/m$.",
      ],
      solutionExplanation: `$$F_t = f \\cdot m \\cdot g = 0{,}2 \\cdot 30 \\cdot 10 = 60 \\text{ N}$$
$$F_{\\text{výsl}} = 150 - 60 = 90 \\text{ N}$$
$$a = \\frac{90}{30} = 3 \\text{ m/s}^2$$`,
      difficulty: "medium" as const,
    },
    {
      id: "dyn-i-3",
      problemStatement: "Těleso o hmotnosti $2$ kg sjíždí po nakloněné rovině s úhlem $30°$ bez tření. Jaké je jeho zrychlení? ($g = 10 \\text{ m/s}^2$, $\\sin 30° = 0{,}5$)",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "5 m/s²", "5 m/s^2"],
      hints: [
        "Složka tíhy rovnoběžná se sklonem: $F = m \\cdot g \\cdot \\sin \\alpha$.",
        "$a = g \\cdot \\sin 30° = 10 \\cdot 0{,}5$",
      ],
      solutionExplanation: `$$a = g \\cdot \\sin \\alpha = 10 \\cdot 0{,}5 = 5 \\text{ m/s}^2$$
(Hmotnost se vykrátí — zrychlení nezávisí na hmotnosti!)`,
      difficulty: "medium" as const,
    },
    {
      id: "dyn-i-4",
      problemStatement: "Auto o hmotnosti $1000$ kg jede v zatáčce o poloměru $50$ m rychlostí $20 \\text{ m/s}$. Jaká dostředivá síla je potřeba?",
      expectedAnswer: "8000",
      acceptableAnswers: ["8000", "8000 N", "8 kN"],
      hints: [
        "$F_d = m \\cdot v^2/r$",
        "$F_d = 1000 \\cdot 400 / 50$",
      ],
      solutionExplanation: `$$F_d = m \\cdot \\frac{v^2}{r} = 1000 \\cdot \\frac{20^2}{50} = 1000 \\cdot 8 = 8000 \\text{ N}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "dyn-i-5",
      problemStatement: "Auto brzdí na mokré vozovce ($f = 0{,}4$) z rychlosti $90$ km/h. Jaká je brzdná dráha? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "78",
      acceptableAnswers: ["78", "78 m", "78.1", "78,1", "78,1 m"],
      numericTolerance: 1,
      hints: [
        "Převeďte: $v_0 = 90/3{,}6 = 25$ m/s. Zpomalení: $a = f \\cdot g = 0{,}4 \\cdot 10 = 4 \\text{ m/s}^2$.",
        "Brzdná dráha: $s = v_0^2/(2a) = 625/8$.",
      ],
      solutionExplanation: `$$v_0 = \\frac{90}{3{,}6} = 25 \\text{ m/s}$$
$$a = f \\cdot g = 0{,}4 \\cdot 10 = 4 \\text{ m/s}^2$$
$$s = \\frac{v_0^2}{2a} = \\frac{625}{8} \\approx 78 \\text{ m}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Výslednice sil: skládáme síly podle směru — sčítáme, odčítáme, nebo vektorově.",
      "Tření: $F_t = f \\cdot N$, kde $N$ je normálová síla a $f$ koeficient tření.",
      "Nakloněná rovina: síla po sklonu $F = mg\\sin\\alpha$, normála $N = mg\\cos\\alpha$.",
      "Dostředivá síla: $F_d = mv^2/r$ — drží těleso na kružnici.",
      "Brzdná dráha: $s = v_0^2/(2 \\cdot f \\cdot g)$ — závisí na rychlosti **kvadraticky**!",
    ],
    nextTopicSuggestion: "Skvěle! Pokračujte na energii a práci — zjistíte, jak síla na dráze mění energii.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Komplex problems, vectors, systems
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Dynamika — složité soustavy a síly",
    sections: [
      {
        heading: "Soustavy těles — Atwoodův stroj",
        body: `Když jsou dvě tělesa spojena lanem přes kladku, pohybují se společně. Pro Atwoodův stroj (dvě závaží na kladce):

$$\\boxed{a = \\frac{(m_1 - m_2)}{(m_1 + m_2)} \\cdot g}$$

$$\\boxed{T = \\frac{2 \\cdot m_1 \\cdot m_2}{m_1 + m_2} \\cdot g}$$

kde $T$ je tahová síla v laně.

> [!key] Pokud $m_1 = m_2$, zrychlení je nulové a soustava je v rovnováze. Tahová síla v laně je pak rovna tíze.

Postup řešení:
1. Pro každé těleso napište 2. Newtonův zákon
2. Využijte vazby: $a_1 = a_2$, $T_1 = T_2$ (nehmotné lano)
3. Řešte soustavu rovnic`,
        examples: [
          {
            problem: "Na kladce visí závaží $3$ kg a $5$ kg. Jaké je zrychlení soustavy?",
            solution: `$$a = \\frac{m_1 - m_2}{m_1 + m_2} \\cdot g = \\frac{5 - 3}{5 + 3} \\cdot 10 = \\frac{2}{8} \\cdot 10 = \\color{#16a34a}{2{,}5 \\text{ m/s}^2}$$`,
          },
        ],
      },
      {
        heading: "Nakloněná rovina s třením — úplné řešení",
        body: `Kompletní analýza pohybu po nakloněné rovině:

**Těleso sjíždí** ($F_{\\parallel} > F_t$):
$$a = g \\cdot (\\sin \\alpha - f \\cdot \\cos \\alpha)$$

**Těleso je taženo nahoru** silou $F$:
$$F - mg\\sin\\alpha - f \\cdot mg\\cos\\alpha = ma$$

**Kritický úhel** (těleso se právě rozjede):
$$\\tan \\alpha_{\\text{krit}} = f$$

> [!info] Pro $\\alpha = 30°$ a $f = 0{,}3$: $\\tan 30° = 0{,}577 > 0{,}3$ → těleso sjede.
> Pro $f = 0{,}7$: $\\tan 30° = 0{,}577 < 0{,}7$ → těleso zůstane stát.`,
        examples: [
          {
            problem: "Těleso ($5$ kg) sjíždí po rovině s úhlem $45°$ a $f = 0{,}2$. Jaké je zrychlení?",
            solution: `$$a = g(\\sin 45° - 0{,}2 \\cdot \\cos 45°) = 10(0{,}707 - 0{,}2 \\cdot 0{,}707)$$
$$= 10 \\cdot 0{,}707 \\cdot 0{,}8 = \\color{#16a34a}{5{,}66 \\text{ m/s}^2}$$`,
          },
        ],
      },
      {
        heading: "Pohyb po kružnici — podrobně",
        body: `Pro pohyb po kružnici potřebujeme znát:

**Úhlová rychlost**: $\\omega = \\frac{2\\pi}{T} = 2\\pi f$

kde $T$ je perioda (doba jednoho oběhu) a $f$ frekvence (počet oběhů za sekundu).

**Obvodová rychlost**: $v = \\omega \\cdot r = \\frac{2\\pi r}{T}$

**Dostředivé zrychlení**: $a_d = \\frac{v^2}{r} = \\omega^2 \\cdot r$

> [!key] V zatáčce musí tření poskytnout dostředivou sílu. Maximální bezpečná rychlost:
> $$v_{\\max} = \\sqrt{f \\cdot g \\cdot r}$$`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "choosable",
            defaultM1: 5,
            defaultM2: 3,
            defaultV1: 10,
            defaultV2: -5,
            showEnergyBars: true,
            showMomentumBars: true,
          },
          caption: "Porovnejte pružnou a nepružnou srážku — sledujte zachování hybnosti a ztrátu energie",
        },
      },
      {
        heading: "Gravitační síla a Newtonův gravitační zákon",
        body: `Newton zjistil, že **každá dvě tělesa** se přitahují silou:

$$\\boxed{F_G = G \\cdot \\frac{m_1 \\cdot m_2}{r^2}}$$

kde $G = 6{,}674 \\times 10^{-11} \\text{ N}\\cdot\\text{m}^2/\\text{kg}^2$ je gravitační konstanta.

Na povrchu Země ($r = R_{\\text{Země}}$):
$$F_G = mg \\quad \\Rightarrow \\quad g = \\frac{G \\cdot M_{\\text{Země}}}{R_{\\text{Země}}^2}$$

> [!tip] Gravitační síla klesá s **druhou mocninou** vzdálenosti. Ve dvojnásobné vzdálenosti je čtyřikrát menší.`,
        examples: [
          {
            problem: "Jak se změní gravitační síla, když vzdálenost mezi tělesy ztrojnásobíme?",
            solution: `Síla klesne $3^2 = 9$ krát. $F' = \\frac{F}{9}$.`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Na nakloněné rovině s úhlem $30°$ leží těleso o hmotnosti $4$ kg, spojené lanem přes kladku se závažím $3$ kg visícím svisle dolů. Koeficient tření na rovině je $f = 0{,}2$.

Určete zrychlení soustavy a tahovou sílu v laně. ($g = 10 \\text{ m/s}^2$, $\\sin 30° = 0{,}5$, $\\cos 30° = 0{,}866$)`,
    steps: [
      {
        instruction: "Rozbor: které těleso se pohne kam?",
        math: "$F_{\\text{tah dolů}} = m_2 \\cdot g = 3 \\cdot 10 = 30 \\text{ N}$",
        explanation: "Závaží ($3$ kg) tahá lano dolů silou $30$ N. Těleso na rovině ($4$ kg) se rozhodne, jestli to stačí k pohybu.",
      },
      {
        instruction: "Síly na těleso na rovině (4 kg)",
        math: "$F_{\\parallel} = m_1 g \\sin 30° = 4 \\cdot 10 \\cdot 0{,}5 = 20 \\text{ N}$",
        explanation: "Složka tíhy rovnoběžně se sklonem (dolů po rovině).",
      },
      {
        instruction: "Normálová a třecí síla na rovině",
        math: "$N = m_1 g \\cos 30° = 4 \\cdot 10 \\cdot 0{,}866 = 34{,}64 \\text{ N}$",
        explanation: "Třecí síla: $F_t = f \\cdot N = 0{,}2 \\cdot 34{,}64 = 6{,}93$ N.",
      },
      {
        instruction: "Pohybové rovnice pro obě tělesa",
        math: "$m_2 g - T = m_2 a \\quad \\text{(závaží)}$\n$T - m_1 g \\sin\\alpha - F_t = m_1 a \\quad \\text{(těleso na rovině)}$",
        explanation: "Předpokládáme, že závaží padá dolů a těleso na rovině jede nahoru (lano je napjaté).",
      },
      {
        instruction: "Sečtěte rovnice (T se vyruší)",
        math: "$m_2 g - m_1 g \\sin\\alpha - F_t = (m_1 + m_2) \\cdot a$",
        explanation: "$30 - 20 - 6{,}93 = 7 \\cdot a$, tedy $3{,}07 = 7a$.",
      },
      {
        instruction: "Vypočítejte zrychlení a tahovou sílu",
        math: "$a = \\frac{3{,}07}{7} \\approx 0{,}44 \\text{ m/s}^2$",
        explanation: "Z první rovnice: $T = m_2(g - a) = 3(10 - 0{,}44) \\approx 28{,}7$ N.",
      },
    ],
    finalAnswer: "Zrychlení soustavy je přibližně $0{,}44 \\text{ m/s}^2$ a tahová síla v laně je přibližně $28{,}7$ N.",
  },
  practiceProblems: [
    {
      id: "dyn-p-1",
      problemStatement: "Na Atwoodově stroji visí závaží $6$ kg a $4$ kg. Jaké je zrychlení soustavy? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2 m/s²", "2 m/s^2"],
      hints: [
        "$a = \\frac{m_1 - m_2}{m_1 + m_2} \\cdot g$",
        "$a = \\frac{6-4}{6+4} \\cdot 10$",
      ],
      solutionExplanation: `$$a = \\frac{6 - 4}{6 + 4} \\cdot 10 = \\frac{2}{10} \\cdot 10 = 2 \\text{ m/s}^2$$`,
      difficulty: "easy" as const,
    },
    {
      id: "dyn-p-2",
      problemStatement: "Jaká je maximální bezpečná rychlost v zatáčce o poloměru $100$ m, pokud $f = 0{,}5$ a $g = 10 \\text{ m/s}^2$?",
      expectedAnswer: "22",
      acceptableAnswers: ["22", "22.4", "22,4", "22 m/s", "22.4 m/s"],
      numericTolerance: 1,
      hints: [
        "$v_{\\max} = \\sqrt{f \\cdot g \\cdot r}$",
        "$v = \\sqrt{0{,}5 \\cdot 10 \\cdot 100} = \\sqrt{500}$",
      ],
      solutionExplanation: `$$v_{\\max} = \\sqrt{f \\cdot g \\cdot r} = \\sqrt{0{,}5 \\cdot 10 \\cdot 100} = \\sqrt{500} \\approx 22{,}4 \\text{ m/s}$$
Tj. asi $80$ km/h.`,
      difficulty: "medium" as const,
    },
    {
      id: "dyn-p-3",
      problemStatement: "Těleso ($10$ kg) je taženo nahoru po nakloněné rovině ($\\alpha = 30°$, $f = 0{,}1$) silou $80$ N rovnoběžně s rovinou. Jaké je zrychlení? ($g = 10 \\text{ m/s}^2$)",
      expectedAnswer: "2.13",
      acceptableAnswers: ["2.1", "2.13", "2,1", "2,13"],
      numericTolerance: 0.2,
      hints: [
        "$F - mg\\sin\\alpha - f \\cdot mg\\cos\\alpha = ma$",
        "$80 - 10 \\cdot 10 \\cdot 0{,}5 - 0{,}1 \\cdot 10 \\cdot 10 \\cdot 0{,}866 = 10a$",
      ],
      solutionExplanation: `$$80 - 50 - 8{,}66 = 10a$$
$$21{,}34 = 10a \\implies a \\approx 2{,}13 \\text{ m/s}^2$$`,
      difficulty: "hard" as const,
    },
    {
      id: "dyn-p-4",
      problemStatement: "Družice obíhá Zemi ve výšce, kde $g = 8 \\text{ m/s}^2$, s periodou $T = 6000$ s. Jaký je poloměr oběžné dráhy? (Použijte $a_d = g$ a $a_d = \\omega^2 r$.)",
      expectedAnswer: "7300",
      acceptableAnswers: ["7300", "7296", "7300 km", "7296 km"],
      numericTolerance: 100,
      hints: [
        "$\\omega = 2\\pi / T$ a $g = \\omega^2 r$, tedy $r = g/\\omega^2$.",
        "$\\omega = 2\\pi / 6000 \\approx 0{,}001047$ rad/s, $r = 8 / (0{,}001047)^2$",
      ],
      solutionExplanation: `$$\\omega = \\frac{2\\pi}{6000} \\approx 1{,}047 \\times 10^{-3} \\text{ rad/s}$$
$$r = \\frac{g}{\\omega^2} = \\frac{8}{(1{,}047 \\times 10^{-3})^2} \\approx 7296 \\text{ km}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "dyn-p-5",
      problemStatement: "Jak se změní gravitační síla mezi dvěma tělesy, když vzdálenost zmenšíme na polovinu a hmotnost jednoho zdvojnásobíme?",
      expectedAnswer: "8",
      acceptableAnswers: ["8", "8x", "osmkrát", "8-krát"],
      hints: [
        "$F \\sim \\frac{m_1 m_2}{r^2}$. Jak se změní čitatel a jmenovatel?",
        "Hmotnost $\\times 2$ → síla $\\times 2$. Vzdálenost $\\times 0{,}5$ → síla $\\times 4$. Celkem?",
      ],
      solutionExplanation: `$$F' = G \\frac{2m_1 \\cdot m_2}{(r/2)^2} = G \\frac{2m_1 m_2}{r^2/4} = 8 \\cdot G \\frac{m_1 m_2}{r^2} = 8F$$
Gravitační síla vzroste $8$-krát.`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Atwoodův stroj: $a = \\frac{m_1 - m_2}{m_1 + m_2} \\cdot g$ — soustavy řešíme pohybovými rovnicemi.",
      "Nakloněná rovina s třením: $a = g(\\sin\\alpha - f\\cos\\alpha)$.",
      "Dostředivá síla: $F_d = mv^2/r$ — max. bezpečná rychlost v zatáčce: $v = \\sqrt{fgr}$.",
      "Newtonův gravitační zákon: $F = Gm_1m_2/r^2$ — síla klesá s druhou mocninou vzdálenosti.",
    ],
    nextTopicSuggestion: "Výborně! Nyní jste připraveni na energii a práci — jiný pohled na stejné problémy, ale často jednodušší výpočty.",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Dynamika\n");

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

  console.log("\n🎉 Done! Brilliant-style Dynamika lessons seeded.\n");
}

main().catch(console.error);
