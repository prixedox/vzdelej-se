import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "63c5c499-2894-4ee9-98cd-309bb14907b5";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Discovery-based, visual, Brilliant-style
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Lineární rovnice — tajemství rovnováhy",
    sections: [
      {
        heading: "Představte si váhu...",
        body: `Rovnice je jako **váha v rovnováze**. Na obou miskách je stejná hmotnost — a vaším úkolem je zjistit, kolik váží neznámý předmět.

$$\\underbrace{\\boxed{x} + \\boxed{3}}_{\\text{levá miska}} \\;=\\; \\underbrace{\\boxed{7}}_{\\text{pravá miska}}$$

Na levé misce leží záhadná krabička $x$ a závaží o hmotnosti $3$. Na pravé misce je závaží o hmotnosti $7$.

> [!key] Rovnice je tvrzení, že dvě věci jsou si **rovny**. Znak $=$ říká: „levá strana má stejnou hodnotu jako pravá strana."`,
        visual: {
          type: "balance-scale",
          props: {
            leftItems: ["x", "3"],
            rightItems: ["7"],
            balanced: true,
            highlight: "left",
          },
          caption: "Rovnice x + 3 = 7 jako váha v rovnováze",
        },
      },
      {
        heading: "Zlaté pravidlo: co uděláš jedné straně, udělej i druhé",
        body: `Aby váha zůstala v rovnováze, musíte vždy provést **stejnou operaci na obou stranách**.

$$\\begin{array}{ccc} \\boxed{x} + 3 & = & 7 \\\\ \\color{#2563eb}{-\\,3} && \\color{#2563eb}{-\\,3} \\\\ \\hline \\boxed{x} & = & 4 \\end{array}$$

Odebrali jsme $3$ z obou misek — a váha zůstala v rovnováze! Zjistili jsme, že $x = 4$.

> [!tip] Toto se nazývá **ekvivalentní úprava**. Rovnici tím neporušíte — jen ji zjednodušíte.`,
        visual: {
          type: "balance-scale",
          props: {
            leftItems: ["x", "3"],
            rightItems: ["4"],
            balanced: true,
            highlight: "both",
          },
          caption: "Po odebrání 3 z obou stran: x = 4",
        },
        examples: [
          {
            problem: "$x + 10 = 25$",
            solution: `Odečteme $10$ od obou stran:
$$\\begin{array}{ccc} x + 10 & = & 25 \\\\ \\color{#2563eb}{- 10} && \\color{#2563eb}{- 10} \\\\ \\hline x & = & 15 \\end{array}$$`,
          },
        ],
      },
      {
        heading: "Vyzkoušejte si to! Najděte rovnováhu",
        body: `Posuňte jezdcem a najděte hodnotu $x$, při které bude váha v rovnováze.

Levá miska: $x + 3$. Pravá miska: $7$.

Dokážete najít správné $x$?`,
        visual: {
          type: "interactive-balance-scale",
          props: {
            equation: { a: 1, b: 3, right: 7 },
            xRange: [0, 10],
          },
          caption: "Posuňte jezdec a najděte hodnotu x, při které je váha v rovnováze",
        },
      },
      {
        heading: "Co když je $x$ vynásobené číslem?",
        body: `Někdy neznámá $x$ není sama — je vynásobená nějakým číslem (říkáme mu **koeficient**):

$$3x = 12$$

To znamená: „$3$ krát něco je $12$." Abychom zjistili, co je to „něco", **vydělíme obě strany tím číslem**:

$$\\begin{array}{ccc} 3x & = & 12 \\\\ \\color{#2563eb}{\\div\\,3} && \\color{#2563eb}{\\div\\,3} \\\\ \\hline x & = & 4 \\end{array}$$

> [!info] Přehled operací:
> - Když chcete **zbavit sčítání** → **odečtěte**
> - Když chcete **zbavit odčítání** → **přičtěte**
> - Když chcete **zbavit násobení** → **dělte**
> - Když chcete **zbavit dělení** → **násobte**`,
        examples: [
          {
            problem: "$5x = 35$",
            solution: `Vydělíme obě strany číslem $5$:
$$x = \\frac{35}{5} = 7$$`,
          },
          {
            problem: "$\\frac{x}{4} = 3$",
            solution: `Vynásobíme obě strany číslem $4$:
$$x = 3 \\times 4 = 12$$`,
          },
        ],
      },
      {
        heading: "Dva kroky najednou",
        body: `Většina rovnic potřebuje **dva kroky** — nejdřív odstraníme sčítanec/odčítanec, pak koeficient:

$$\\begin{array}{rclr} 2x + 5 & = & 13 & \\\\ 2x + 5 \\;\\color{#dc2626}{-\\,5} & = & 13 \\;\\color{#dc2626}{-\\,5} & \\small\\text{(krok 1: zbavíme se +5)} \\\\ 2x & = & 8 & \\\\ \\frac{2x}{\\color{#2563eb}{2}} & = & \\frac{8}{\\color{#2563eb}{2}} & \\small\\text{(krok 2: zbavíme se ×2)} \\\\ x & = & 4 & \\end{array}$$

> [!key] **Postup**: nejdřív izolujte člen s $x$ (zbavte se konstant), pak izolujte samotné $x$ (zbavte se koeficientu).`,
      },
      {
        heading: "Zkouška — ověřte si výsledek!",
        body: `Vždy si můžete ověřit, zda je váš výsledek správný. Stačí **dosadit** nalezené $x$ zpět do původní rovnice:

Pro rovnici $2x + 5 = 13$ jsme našli $x = 4$:

$$\\underbrace{2 \\cdot \\color{#16a34a}{4} + 5}_{= 8 + 5 = 13} \\;=\\; 13 \\quad \\checkmark$$

Obě strany se rovnají — výsledek je správný!`,
        visual: {
          type: "number-line",
          props: {
            min: 0,
            max: 10,
            points: [
              { value: 4, label: "x = 4", color: "#16a34a" },
            ],
            highlight: { from: 0, to: 4, color: "#16a34a40" },
          },
          caption: "Řešení x = 4 na číselné ose",
        },
      },
      {
        heading: "Prozkoumejte rovnici na číselné ose",
        body: `Měňte koeficienty $a$ a $b$ v rovnici $ax + b = 0$ a sledujte, kam se posouvá řešení na číselné ose.

Jak se změní řešení, když zvětšíte $a$? A co když změníte znaménko $b$?`,
        visual: {
          type: "interactive-number-line",
          props: {
            equationType: "linear",
            defaultA: 1,
            defaultB: -4,
            range: [-10, 10],
          },
          caption: "Měňte koeficienty a sledujte, jak se posouvá řešení na ose",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: "Na váze leží na levé misce 3 stejné krabičky a závaží 6 kg. Na pravé misce je závaží 21 kg. Váha je v rovnováze. Kolik váží jedna krabička?\n\n$$\\boxed{?} + \\boxed{?} + \\boxed{?} + \\underbrace{6}_{\\text{kg}} \\;=\\; \\underbrace{21}_{\\text{kg}}$$",
    steps: [
      {
        instruction: "Zapište rovnici",
        math: "$3x + 6 = 21$",
        explanation: "Každá krabička váží $x$ kg. Tři krabičky mají hmotnost $3x$ a k tomu přidáme závaží 6 kg.",
        visual: {
          type: "balance-scale",
          props: {
            leftItems: ["x", "x", "x", "6"],
            rightItems: ["21"],
            balanced: true,
            highlight: "left",
          },
          caption: "3 krabičky + závaží 6 kg = 21 kg",
        },
      },
      {
        instruction: "Odeberte závaží 6 kg z obou misek",
        math: "$\\begin{array}{ccc} 3x + 6 & = & 21 \\\\ \\color{#dc2626}{-\\,6} && \\color{#dc2626}{-\\,6} \\\\ \\hline 3x & = & 15 \\end{array}$",
        explanation: "Odečteme 6 od obou stran — váha zůstane v rovnováze.",
        visual: {
          type: "balance-scale",
          props: {
            leftItems: ["x", "x", "x"],
            rightItems: ["15"],
            balanced: true,
            highlight: "both",
          },
          caption: "Po odebrání 6 z obou stran: 3x = 15",
        },
      },
      {
        instruction: "Na levé misce jsou 3 stejné krabičky vážící dohromady 15 kg. Kolik váží jedna?",
        math: "$\\frac{3x}{3} = \\frac{15}{3}$",
        explanation: "Rozdělíme obě strany na třetiny — vydělíme číslem 3.",
      },
      {
        instruction: "Výsledek",
        math: "$x = 5$",
        explanation: "Jedna krabička váží **5 kg**.",
        visual: {
          type: "number-line",
          props: {
            min: 0,
            max: 10,
            points: [
              { value: 5, label: "x = 5", color: "#16a34a" },
            ],
          },
          caption: "Řešení: x = 5",
        },
      },
      {
        instruction: "Zkouška — ověření",
        math: "$3 \\cdot \\color{#16a34a}{5} + 6 = 15 + 6 = 21 \\quad \\checkmark$",
        explanation: "Dosadíme $x = 5$: tři krabičky po 5 kg (= 15) plus závaží 6 kg = 21 kg. Souhlasí!",
      },
    ],
    finalAnswer: "Jedna krabička váží $5$ kg, tedy $x = 5$.",
  },
  practiceProblems: [
    {
      id: "lr-z-1",
      problemStatement: "Vyřešte rovnici:\n$$x + 9 = 14$$",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "x=5", "x = 5"],
      hints: [
        "Představte si váhu: na levé misce je $x$ a závaží $9$, na pravé závaží $14$. Co musíte odebrat z obou misek?",
        "Odečtěte $9$ od obou stran: $x = 14 - 9$",
      ],
      solutionExplanation: `Odečteme $9$ od obou stran:
$$\\begin{array}{ccc} x + 9 & = & 14 \\\\ \\color{#2563eb}{-\\,9} && \\color{#2563eb}{-\\,9} \\\\ \\hline x & = & 5 \\end{array}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "lr-z-2",
      problemStatement: "Vyřešte rovnici:\n$$4x = 28$$",
      expectedAnswer: "7",
      acceptableAnswers: ["7", "x=7", "x = 7"],
      hints: [
        "Čtyři stejné krabičky váží dohromady 28 kg. Kolik váží jedna?",
        "Vydělte obě strany číslem $4$.",
      ],
      solutionExplanation: `Vydělíme obě strany číslem $4$:
$$x = \\frac{28}{4} = 7$$`,
      difficulty: "easy" as const,
    },
    {
      id: "lr-z-3",
      problemStatement: "Vyřešte rovnici:\n$$2x + 7 = 19$$",
      expectedAnswer: "6",
      acceptableAnswers: ["6", "x=6", "x = 6"],
      hints: [
        "Krok 1: Odečtěte $7$ od obou stran, abyste izolovali člen s $x$.",
        "Krok 2: Dostanete $2x = 12$. Teď vydělte obě strany číslem $2$.",
      ],
      solutionExplanation: `$$\\begin{array}{rclr} 2x + 7 & = & 19 \\\\ 2x & = & 12 & \\small\\text{(odečteme 7)} \\\\ x & = & 6 & \\small\\text{(dělíme 2)} \\end{array}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-z-4",
      problemStatement: "Na třídní párty přispěl každý ze $x$ žáků 50 Kč. Třídní učitelka přidala 200 Kč. Celkem vybrali 950 Kč. Kolik žáků je ve třídě?\n$$50x + 200 = 950$$",
      expectedAnswer: "15",
      acceptableAnswers: ["15", "x=15", "x = 15"],
      hints: [
        "Odečtěte příspěvek učitelky (200 Kč) od obou stran.",
        "$50x = 750$. Kolik žáků musí přispět po 50 Kč, aby se vybralo 750?",
      ],
      solutionExplanation: `$$\\begin{array}{rclr} 50x + 200 & = & 950 \\\\ 50x & = & 750 & \\small\\text{(odečteme 200)} \\\\ x & = & 15 & \\small\\text{(dělíme 50)} \\end{array}$$

Ve třídě je **15 žáků**.`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-z-5",
      problemStatement: "Vyřešte rovnici:\n$$7x - 4 = 3x + 12$$\n(Nápověda: $x$ je na obou stranách!)",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "x=4", "x = 4"],
      hints: [
        "Nejdřív převeďte všechna $x$ na jednu stranu: odečtěte $3x$ od obou stran.",
        "Dostanete $4x - 4 = 12$. Pak přičtěte $4$ a dělte $4$.",
      ],
      solutionExplanation: `$$\\begin{array}{rclr} 7x - 4 & = & 3x + 12 \\\\ 4x - 4 & = & 12 & \\small\\text{(odečteme } 3x\\text{)} \\\\ 4x & = & 16 & \\small\\text{(přičteme 4)} \\\\ x & = & 4 & \\small\\text{(dělíme 4)} \\end{array}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Rovnice je jako **váha v rovnováze** — obě strany mají stejnou hodnotu.",
      "**Ekvivalentní úpravy**: co uděláte jedné straně, musíte udělat i druhé ($+$, $-$, $\\times$, $\\div$).",
      "Postup: nejdřív izolujte člen s $x$, pak izolujte samotné $x$.",
      "Výsledek si vždy **ověřte zkouškou** — dosaďte zpět do rovnice.",
    ],
    nextTopicSuggestion: "Pokračujte na středně pokročilou obtížnost, kde se naučíte pracovat se závorkami a zlomky.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Brackets, fractions, both-side unknowns
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Lineární rovnice — závorky, zlomky a neznámá všude",
    sections: [
      {
        heading: "Závorky: nejdřív rozbalit!",
        body: `Když rovnice obsahuje závorky, **roznásobíme** je:

$$\\color{#2563eb}{3} \\cdot (x + 4) = \\color{#2563eb}{3} \\cdot x + \\color{#2563eb}{3} \\cdot 4 = 3x + 12$$

Vizuálně si to představte jako obdélníky:

$$\\underbrace{\\boxed{\\;x\\;} + \\boxed{\\;4\\;}}_{\\text{obsah závorky}} \\;\\times\\; 3 \\;=\\; \\underbrace{\\boxed{3x} + \\boxed{12}}_{\\text{po roznásobení}}$$

> [!warning] Pozor na znaménka! Záporné číslo před závorkou **mění znaménka** uvnitř:
> $-2(x - 5) = -2x + 10$`,
        examples: [
          {
            problem: "$-3(2x + 1)$",
            solution: `$-3 \\cdot 2x + (-3) \\cdot 1 = \\color{#dc2626}{-6x - 3}$

Záporná trojka změní obě znaménka uvnitř závorky.`,
          },
        ],
      },
      {
        heading: "Neznámá na obou stranách",
        body: `Když je $x$ na obou stranách, musíte si vybrat stranu a $x$ z druhé strany **přesunout**:

$$\\underbrace{5x + 2}_{\\text{levá}} \\;=\\; \\underbrace{3x + 10}_{\\text{pravá}}$$

Odečteme $3x$ od obou stran — přesuneme $x$ doleva:

$$\\begin{array}{rclr} 5x + 2 & = & 3x + 10 \\\\ \\color{#dc2626}{-3x} && \\color{#dc2626}{-3x} \\\\ \\hline 2x + 2 & = & 10 \\\\ \\color{#dc2626}{-2} && \\color{#dc2626}{-2} \\\\ \\hline 2x & = & 8 \\\\ \\color{#2563eb}{\\div 2} && \\color{#2563eb}{\\div 2} \\\\ \\hline x & = & 4 \\end{array}$$

> [!key] **Přesun** členu na druhou stranu = odečtení z obou stran. Člen změní znaménko.`,
        visual: {
          type: "number-line",
          props: {
            min: 0,
            max: 8,
            points: [
              { value: 4, label: "x = 4", color: "#16a34a" },
            ],
            highlight: { from: 3, to: 5, color: "#16a34a30" },
          },
          caption: "Řešení rovnice 5x + 2 = 3x + 10 je x = 4",
        },
      },
      {
        heading: "Zlomky? Vynásobte jmenovatelem!",
        body: `Zlomky v rovnici vypadají strašidelně, ale stačí jeden trik — **vynásobte celou rovnici společným jmenovatelem**:

$$\\frac{x}{2} + \\frac{x}{3} = 10$$

Společný jmenovatel $2$ a $3$ je $\\color{#2563eb}{6}$. Vynásobíme:

$$\\color{#2563eb}{6} \\cdot \\frac{x}{2} + \\color{#2563eb}{6} \\cdot \\frac{x}{3} = \\color{#2563eb}{6} \\cdot 10$$

$$3x + 2x = 60$$

$$5x = 60 \\implies x = 12$$

> [!tip] Po vynásobení jmenovatelem zmizí všechny zlomky a zbyde jednoduchá rovnice!`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Petr říká: „Kdybych měl 3× víc peněz a přidal 200 Kč, měl bych stejně jako Eva, která má 5× víc než já, ale utrácí 100 Kč."

Kolik má Petr peněz?
$$3x + 200 = 5x - 100$$`,
    steps: [
      {
        instruction: "Převeďte všechna $x$ na jednu stranu — odečtěte $3x$ od obou stran",
        math: "$\\begin{array}{ccc} 3x + 200 & = & 5x - 100 \\\\ \\color{#dc2626}{-3x} && \\color{#dc2626}{-3x} \\\\ \\hline 200 & = & 2x - 100 \\end{array}$",
        explanation: "Na levé straně zbude jen $200$, na pravé $5x - 3x = 2x$ minus $100$.",
      },
      {
        instruction: "Převeďte konstanty na druhou stranu — přičtěte $100$",
        math: "$\\begin{array}{ccc} 200 & = & 2x - 100 \\\\ \\color{#2563eb}{+100} && \\color{#2563eb}{+100} \\\\ \\hline 300 & = & 2x \\end{array}$",
        explanation: "Přičteme $100$ k oběma stranám.",
      },
      {
        instruction: "Vydělte obě strany koeficientem u $x$",
        math: "$\\frac{300}{2} = \\frac{2x}{2} \\implies 150 = x$",
        explanation: "Vydělíme obě strany číslem $2$.",
      },
      {
        instruction: "Zkouška",
        math: "$3 \\cdot \\color{#16a34a}{150} + 200 = 650 \\quad | \\quad 5 \\cdot \\color{#16a34a}{150} - 100 = 650 \\quad \\checkmark$",
        explanation: "Obě strany se rovnají $650$ — Petr má **150 Kč**.",
      },
    ],
    finalAnswer: "Petr má $x = 150$ Kč.",
  },
  practiceProblems: [
    {
      id: "lr-s-1",
      problemStatement: "Vyřešte rovnici:\n$$2(x + 3) = 16$$",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "x=5", "x = 5"],
      hints: [
        "Roznásobte závorku: $2x + 6 = 16$.",
        "Odečtěte $6$: $2x = 10$. Pak dělte $2$.",
      ],
      solutionExplanation: `Roznásobíme: $2x + 6 = 16$
$$\\begin{array}{rclr} 2x + 6 & = & 16 \\\\ 2x & = & 10 & \\small\\text{(odečteme 6)} \\\\ x & = & 5 & \\small\\text{(dělíme 2)} \\end{array}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "lr-s-2",
      problemStatement: "Vyřešte rovnici:\n$$8x - 3 = 5x + 9$$",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "x=4", "x = 4"],
      hints: [
        "Odečtěte $5x$ od obou stran: $3x - 3 = 9$.",
        "Přičtěte $3$: $3x = 12$. Pak dělte $3$.",
      ],
      solutionExplanation: `$$\\begin{array}{rclr} 8x - 3 & = & 5x + 9 \\\\ 3x - 3 & = & 9 & \\small\\text{(odečteme } 5x\\text{)} \\\\ 3x & = & 12 & \\small\\text{(přičteme 3)} \\\\ x & = & 4 & \\small\\text{(dělíme 3)} \\end{array}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-s-3",
      problemStatement: "Vyřešte rovnici:\n$$3(x - 2) = 2(x + 1) + 3$$",
      expectedAnswer: "11",
      acceptableAnswers: ["11", "x=11", "x = 11"],
      hints: [
        "Roznásobte obě strany: $3x - 6 = 2x + 2 + 3 = 2x + 5$.",
        "Odečtěte $2x$: $x - 6 = 5$. Pak přičtěte $6$.",
      ],
      solutionExplanation: `Roznásobíme: $3x - 6 = 2x + 5$
$$\\begin{array}{rclr} 3x - 6 & = & 2x + 5 \\\\ x - 6 & = & 5 & \\small\\text{(odečteme } 2x\\text{)} \\\\ x & = & 11 & \\small\\text{(přičteme 6)} \\end{array}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-s-4",
      problemStatement: "Vyřešte rovnici:\n$$\\frac{x}{2} + \\frac{x}{5} = 7$$",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "x=10", "x = 10"],
      hints: [
        "Společný jmenovatel $2$ a $5$ je $10$. Vynásobte celou rovnici číslem $10$.",
        "$5x + 2x = 70$, tedy $7x = 70$.",
      ],
      solutionExplanation: `Vynásobíme $10$:
$$5x + 2x = 70$$
$$7x = 70 \\implies x = 10$$`,
      difficulty: "hard" as const,
    },
    {
      id: "lr-s-5",
      problemStatement: "Obdélník má obvod $52$ cm. Jeho délka je o $6$ cm větší než šířka. Jaká je šířka obdélníku? (Obvod = $2 \\times$ délka $+ \\; 2 \\times$ šířka)\n$$2(x + 6) + 2x = 52$$",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "10 cm", "x=10", "x = 10"],
      hints: [
        "Roznásobte závorku: $2x + 12 + 2x = 52$.",
        "Sečtěte $x$-y: $4x + 12 = 52$. Pak odečtěte $12$ a dělte $4$.",
      ],
      solutionExplanation: `Roznásobíme: $2x + 12 + 2x = 52$
$$\\begin{array}{rclr} 4x + 12 & = & 52 \\\\ 4x & = & 40 & \\small\\text{(odečteme 12)} \\\\ x & = & 10 & \\small\\text{(dělíme 4)} \\end{array}$$

Šířka je **10 cm**, délka je $10 + 6 = 16$ cm. Zkouška: $2 \\cdot 16 + 2 \\cdot 10 = 32 + 20 = 52$ ✓`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Závorky **roznásobte** — pozor na znaménko před závorkou!",
      "Neznámá na obou stranách: přesuňte všechna $x$ na jednu stranu (odečtením).",
      "Zlomky: vynásobte celou rovnici **společným jmenovatelem** a zlomky zmizí.",
      "Geometrické úlohy: zapište vztahy jako rovnici (obvod, obsah) a řešte standardně.",
    ],
    nextTopicSuggestion: "Zvládáte! Zkuste pokročilou obtížnost se slovními úlohami a rovnicemi s parametrem.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Word problems, parameters, absolute value
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Lineární rovnice — mistrovská úroveň",
    sections: [
      {
        heading: "Strategie pro slovní úlohy",
        body: `Slovní úlohy jsou **překlad z češtiny do matematiky**. Mají pevný postup:

1. **Přečtěte** celé zadání a zjistěte, co hledáte
2. **Zaveďte $x$** — označte to, co hledáte
3. **Zapište vztahy** z textu jako rovnici
4. **Vyřešte** rovnici
5. **Interpretujte** — odpovězte na otázku a ověřte, zda výsledek dává smysl

> [!key] Typické fráze a jejich překlad:
> - „o $5$ více" → $+ 5$
> - „o $3$ méně" → $- 3$
> - „$3$× více" → $\\cdot 3$
> - „o polovinu více" → $\\cdot 1{,}5$ nebo $x + \\frac{x}{2}$
> - „součet je $20$" → $a + b = 20$`,
        examples: [
          {
            problem: "Součet tří po sobě jdoucích celých čísel je $54$.",
            solution: `Označíme prostřední číslo $x$. Předchozí je $x-1$, následující $x+1$:
$$(x-1) + x + (x+1) = 54$$
$$3x = 54$$
$$x = 18$$
Čísla jsou $17, 18, 19$.`,
          },
        ],
      },
      {
        heading: "Úlohy o pohybu: $d = v \\cdot t$",
        body: `Tři veličiny jsou propojeny vzorcem:

$$\\boxed{\\text{vzdálenost} = \\text{rychlost} \\times \\text{čas}}$$
$$d = v \\cdot t \\qquad t = \\frac{d}{v} \\qquad v = \\frac{d}{t}$$

Typické scénáře:

**Protisměr** (dvě auta jedou proti sobě):
$$d_1 + d_2 = D_{\\text{celkem}}$$
$$v_1 \\cdot t + v_2 \\cdot t = D$$

**Stejný směr** (jedno dohání druhé):
$$d_1 = d_2$$
$$v_1 \\cdot t_1 = v_2 \\cdot t_2$$`,
        examples: [
          {
            problem: "Vlak jede 120 km/h a auto 80 km/h. Jedou proti sobě, počáteční vzdálenost je 400 km. Za jak dlouho se potkají?",
            solution: `Každou hodinu se k sobě přiblíží o $120 + 80 = 200$ km:
$$200t = 400 \\implies t = 2 \\text{ hodiny}$$`,
          },
        ],
      },
      {
        heading: "Rovnice s absolutní hodnotou",
        body: `Absolutní hodnota $|a|$ říká „vzdálenost čísla $a$ od nuly":

$$|5| = 5 \\qquad |-5| = 5 \\qquad |0| = 0$$

Rovnice $|\\text{výraz}| = c$ (kde $c \\geq 0$) má **dva případy**:

$$\\boxed{|ax + b| = c} \\;\\implies\\; \\begin{cases} ax + b = c \\\\ ax + b = -c \\end{cases}$$

Vizuálně na číselné ose — hledáme dvě čísla ve vzdálenosti $c$ od bodu $-\\frac{b}{a}$:

$$\\underset{\\longleftarrow \\; c \\; \\longrightarrow}{\\bullet} \\qquad \\underset{\\text{střed}}{\\circ} \\qquad \\underset{\\longleftarrow \\; c \\; \\longrightarrow}{\\bullet}$$

> [!warning] Pro $c < 0$ rovnice **nemá řešení** — absolutní hodnota nikdy není záporná!`,
        visual: {
          type: "number-line",
          props: {
            min: -6,
            max: 10,
            points: [
              { value: -2, label: "x = -2", color: "#ef4444" },
              { value: 2, label: "střed", color: "#6366f1" },
              { value: 6, label: "x = 6", color: "#ef4444" },
            ],
            highlight: { from: -2, to: 6, color: "#6366f130" },
          },
          caption: "|3x - 6| = 12: dvě řešení ve stejné vzdálenosti od středu",
        },
        examples: [
          {
            problem: "$|3x - 6| = 12$",
            solution: `Případ 1: $3x - 6 = 12 \\implies 3x = 18 \\implies x = 6$
Případ 2: $3x - 6 = -12 \\implies 3x = -6 \\implies x = -2$

Řešení: $x \\in \\{-2, 6\\}$`,
          },
        ],
      },
      {
        heading: "Rovnice s parametrem",
        body: `Pokud rovnice obsahuje neznámé konstanty (parametry), musíme zjistit, **pro které hodnoty parametru** má rovnice řešení:

$$ax + 3 = 2x + a$$

Přepíšeme: $(a - 2)x = a - 3$

- Pokud $a \\neq 2$: právě jedno řešení $x = \\frac{a-3}{a-2}$
- Pokud $a = 2$: rovnice $0 \\cdot x = -1$, což je $0 = -1$ — **nemá řešení**

> [!key] Klíčový moment: koeficient u $x$ je nulový → podívejte se na pravou stranu. Je-li nenulová → žádné řešení. Je-li nulová → nekonečně mnoho řešení.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: "Cyklista vyjel z města A do města B rychlostí $18$ km/h. O hodinu později vyjel stejnou trasou z A motorkář rychlostí $54$ km/h. Za jak dlouho (od svého odjezdu) motorkář dožene cyklistu?",
    steps: [
      {
        instruction: "Zaveďte neznámou",
        explanation: "Označme $t$ = čas jízdy motorkáře (v hodinách). Cyklista jede už $t + 1$ hodin (vyjel o hodinu dříve).",
      },
      {
        instruction: "Zapište vzdálenosti — v momentě dojetí ujedou oba stejnou vzdálenost",
        math: "$\\underbrace{54 \\cdot t}_{\\text{motorkář}} = \\underbrace{18 \\cdot (t + 1)}_{\\text{cyklista}}$",
        explanation: "Vzdálenost = rychlost × čas. Motorkář: $54t$ km. Cyklista: $18(t+1)$ km.",
      },
      {
        instruction: "Roznásobte závorku na pravé straně",
        math: "$54t = 18t + 18$",
        explanation: "$18 \\cdot t + 18 \\cdot 1 = 18t + 18$",
      },
      {
        instruction: "Převeďte $t$ na jednu stranu",
        math: "$54t - 18t = 18$",
        explanation: "Odečteme $18t$ od obou stran.",
      },
      {
        instruction: "Vyřešte",
        math: "$36t = 18 \\implies t = \\frac{18}{36} = \\frac{1}{2}$",
        explanation: "$t = 0{,}5$ hodiny = **30 minut**",
      },
      {
        instruction: "Zkouška a interpretace",
        math: "$54 \\cdot 0{,}5 = 27 \\text{ km} \\;|\\; 18 \\cdot 1{,}5 = 27 \\text{ km} \\quad \\checkmark$",
        explanation: "Motorkář dojede za 30 min 27 km. Cyklista jede 1,5 h a ujede také 27 km. Souhlasí!",
      },
    ],
    finalAnswer: "Motorkář dožene cyklistu za $t = \\frac{1}{2}$ hodiny, tedy za **30 minut**, ve vzdálenosti $27$ km od A.",
  },
  practiceProblems: [
    {
      id: "lr-p-1",
      problemStatement: "Vyřešte rovnici $|x - 5| = 3$.\nZapište **menší** z obou řešení.",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "x=2", "x = 2"],
      hints: [
        "Rozložte na dva případy: $x - 5 = 3$ a $x - 5 = -3$.",
        "Případ 1: $x = 8$. Případ 2: $x = 2$.",
      ],
      solutionExplanation: `Případ 1: $x - 5 = 3 \\implies x = 8$
Případ 2: $x - 5 = -3 \\implies x = 2$
Menší řešení: $x = 2$.`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-p-2",
      problemStatement: "Otec je 4× starší než syn. Za 16 let bude otec jen 2× starší. Kolik je synovi let?",
      expectedAnswer: "8",
      acceptableAnswers: ["8", "8 let"],
      hints: [
        "Syn: $x$ let, otec: $4x$ let. Za 16 let: syn $x+16$, otec $4x+16$.",
        "Rovnice: $4x + 16 = 2(x + 16)$.",
      ],
      solutionExplanation: `Označíme synův věk $x$:
$$4x + 16 = 2(x + 16)$$
$$4x + 16 = 2x + 32$$
$$2x = 16 \\implies x = 8$$
Synovi je **8 let**, otci **32 let**. Za 16 let: syn 24, otec 48. Platí $48 = 2 \\cdot 24$ ✓`,
      difficulty: "medium" as const,
    },
    {
      id: "lr-p-3",
      problemStatement: "Ze dvou měst vzdálených $280$ km vyrazili současně dva vlaky proti sobě. Rychlejší jede $90$ km/h, pomalejší $50$ km/h. Za kolik hodin se potkají?",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2 hodiny", "2 h", "t=2", "t = 2"],
      hints: [
        "Za hodinu se přiblíží o $90 + 50 = 140$ km.",
        "$140t = 280$.",
      ],
      solutionExplanation: `Za hodinu se přiblíží o $90 + 50 = 140$ km:
$$140t = 280 \\implies t = 2$$
Potkají se za **2 hodiny**.`,
      difficulty: "easy" as const,
    },
    {
      id: "lr-p-4",
      problemStatement: "Směs kávy obsahuje dražší kávu za $320$ Kč/kg a levnější za $180$ Kč/kg. Celkem máme $5$ kg směsi za $240$ Kč/kg. Kolik kg dražší kávy je ve směsi?",
      expectedAnswer: "2.14",
      acceptableAnswers: ["2.14", "2,14", "15/7"],
      numericTolerance: 0.02,
      hints: [
        "Dražší: $x$ kg, levnější: $(5-x)$ kg. Celková cena: $5 \\cdot 240 = 1200$ Kč.",
        "Rovnice: $320x + 180(5-x) = 1200$.",
      ],
      solutionExplanation: `$320x + 180(5-x) = 1200$
$320x + 900 - 180x = 1200$
$140x = 300$
$x = \\frac{300}{140} = \\frac{15}{7} \\approx 2{,}14$ kg dražší kávy.`,
      difficulty: "hard" as const,
    },
    {
      id: "lr-p-5",
      problemStatement: "Pro jakou hodnotu $a$ nemá rovnice řešení?\n$$ax - 6 = 3x + a$$\n(Zapište hodnotu parametru $a$.)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "a=3", "a = 3"],
      hints: [
        "Přepište na $(a-3)x = a + 6$.",
        "Nemá řešení, když $a - 3 = 0$ a $a + 6 \\neq 0$.",
      ],
      solutionExplanation: `$(a-3)x = a + 6$
Pro $a = 3$: $0 \\cdot x = 9$, tedy $0 = 9$ — **spor**, nemá řešení.
(Pro $a \\neq 3$: právě jedno řešení $x = \\frac{a+6}{a-3}$.)`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Slovní úlohy: **zavedení $x$** → překlad do rovnice → vyřešení → kontrola smyslu výsledku.",
      "Úlohy o pohybu: $d = v \\cdot t$. Proti sobě: sčítáme vzdálenosti. Dohánění: rovnáme vzdálenosti.",
      "Absolutní hodnota $|ax+b| = c$: dva případy ($+c$ a $-c$), pro $c < 0$ nemá řešení.",
      "Parametr: sledujte, kdy koeficient u $x$ vychází nula — rozhoduje pravá strana.",
    ],
    nextTopicSuggestion: "Výborně! Pokračujte na kvadratické rovnice nebo soustavy lineárních rovnic.",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Lineární rovnice\n");

  for (const { label, content, variant } of difficulties) {
    const id = crypto.randomUUID();

    const existing = await client.execute({
      sql: `SELECT id FROM lesson_cache WHERE topic_id = ? AND difficulty = ? AND variant = ?`,
      args: [TOPIC_ID, label, variant],
    });

    if (existing.rows.length > 0) {
      // Update existing
      await client.execute({
        sql: `UPDATE lesson_cache SET content = ?, model = ?, prompt_version = ? WHERE id = ?`,
        args: [JSON.stringify(content), "hand-crafted-v2", "v2-brilliant", existing.rows[0].id as string],
      });
      console.log(`  🔄 ${label} — updated (${existing.rows[0].id})`);
      continue;
    }

    await client.execute({
      sql: `INSERT INTO lesson_cache (id, topic_id, difficulty, variant, content, model, prompt_version, generated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      args: [id, TOPIC_ID, label, variant, JSON.stringify(content), "hand-crafted-v2", "v2-brilliant"],
    });

    console.log(`  ✅ ${label} (${id})`);
  }

  console.log("\n🎉 Done! Brilliant-style Lineární rovnice lessons seeded.\n");
}

main().catch(console.error);
