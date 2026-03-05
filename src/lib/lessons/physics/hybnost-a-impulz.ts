import type { LessonContent } from "@/types/lesson";

export const hybnostAImpulzBeginner: LessonContent = {
  conceptExplanation: {
    title: "Hybnost a impulz — proč se věci srážejí tak, jak se srážejí",
    sections: [
      {
        heading: "Co je hybnost?",
        body: `Představte si dvě auta — malé osobní a velký kamion. Obě jedou stejnou rychlostí. Které zastaví snáze?

**Hybnost** vyjadřuje, jak obtížné je těleso zastavit:

$$\\boxed{p = m \\cdot v}$$

- $m$ je hmotnost (kg)
- $v$ je rychlost (m/s)
- $p$ je hybnost v **kg·m/s**

$$\\begin{array}{l|c|c|c} \\text{Těleso} & m \\text{ (kg)} & v \\text{ (m/s)} & p \\text{ (kg·m/s)} \\\\ \\hline \\text{Tenisák} & 0{,}06 & 50 & 3 \\\\ \\text{Chodec} & 70 & 1{,}5 & 105 \\\\ \\text{Auto} & 1500 & 14 & 21\\,000 \\\\ \\text{Kamion} & 20\\,000 & 14 & 280\\,000 \\end{array}$$

> [!key] Hybnost je **vektorová veličina** — záleží na směru! Hybnost doleva a doprava se mohou navzájem rušit.`,
        examples: [
          {
            problem: "Jaká je hybnost fotbalového míče ($0{,}4$ kg) letícího rychlostí $25$ m/s?",
            solution: `$$p = m \\cdot v = 0{,}4 \\cdot 25 = \\color{#16a34a}{10 \\text{ kg·m/s}}$$`,
          },
        ],
      },
      {
        heading: "Zákon zachování hybnosti",
        body: `Při srážce dvou těles platí klíčové pravidlo:

$$\\boxed{p_{\\text{před}} = p_{\\text{po}}}$$

$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$

Celková hybnost soustavy se **nemění**, pokud na soustavu nepůsobí vnější síla.

To znamená:
- Co jeden ztratí, druhý získá
- Hybnost se **nepřeměňuje** na jiné formy (na rozdíl od energie!)
- Platí vždy — při srážkách, výbuších, odrazech...

> [!tip] Zákon zachování hybnosti je jeden z **nejzákladnějších zákonů fyziky**. Platí i v jaderné fyzice a astrofyzice!`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "elastic",
            defaultM1: 2,
            defaultM2: 2,
            defaultV1: 3,
            defaultV2: -1,
            showMomentumBars: true,
            showEnergyBars: false,
          },
          caption: "Nastavte hmotnosti a rychlosti a sledujte srážku — celková hybnost zůstává stejná!",
        },
      },
      {
        heading: "Pružná vs. nepružná srážka",
        body: `Existují dva hlavní typy srážek:

**Dokonale pružná srážka:**
- Zachovává se hybnost I energie
- Tělesa se od sebe odrazí
- Příklad: biliárové koule

**Dokonale nepružná srážka:**
- Zachovává se hybnost, ale NE energie
- Tělesa se po srážce spojí a pohybují se společně
- Část energie se přemění na teplo, deformaci...

$$\\text{Nepružná: } m_1 v_1 + m_2 v_2 = (m_1 + m_2) \\cdot v'$$

$$v' = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$$

> [!info] Většina reálných srážek je **částečně nepružných** — někde mezi pružnou a nepružnou.`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "inelastic",
            defaultM1: 3,
            defaultM2: 1,
            defaultV1: 4,
            defaultV2: 0,
            showMomentumBars: true,
            showEnergyBars: true,
          },
          caption: "Přepněte mezi pružnou a nepružnou srážkou — hybnost se zachovává vždy, energie jen u pružné!",
        },
      },
      {
        heading: "Impulz síly — jak změnit hybnost",
        body: `Aby se hybnost tělesa změnila, musí na něj působit síla po určitou dobu. Tuto kombinaci nazýváme **impulz**:

$$\\boxed{I = F \\cdot \\Delta t = \\Delta p}$$

- $F$ je síla (N)
- $\\Delta t$ je doba působení (s)
- $\\Delta p$ je změna hybnosti

**Prakticky:**
- Airbag **prodlouží dobu** nárazu → **menší síla** při stejné změně hybnosti
- Boxer uhýbá hlavou → prodlouží dobu kontaktu → menší síla úderu
- Skok do vody vs. na beton — stejná změna hybnosti, ale jiná doba!

> [!key] $F \\cdot \\Delta t = \\Delta p$ — stejnou změnu hybnosti dosáhnete buď velkou silou na krátkou dobu, nebo malou silou na dlouhou dobu.`,
        examples: [
          {
            problem: "Brankář chytí míč ($0{,}4$ kg, $v = 20$ m/s) a zastaví ho za $0{,}1$ s. Jakou silou působil na míč?",
            solution: `$$\\Delta p = m \\cdot \\Delta v = 0{,}4 \\cdot 20 = 8 \\text{ kg·m/s}$$
$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{8}{0{,}1} = \\color{#16a34a}{80 \\text{ N}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Auto ($1000$ kg) jedoucí rychlostí $10$ m/s narazí do stojícího auta ($1500$ kg). Po nárazu se obě auta spojí. Jakou rychlostí se pohybují po srážce?`,
    steps: [
      {
        instruction: "Zapište zákon zachování hybnosti pro nepružnou srážku",
        math: "$m_1 v_1 + m_2 v_2 = (m_1 + m_2) v'$",
        explanation: "Po nepružné srážce se tělesa pohybují společně rychlostí $v'$.",
      },
      {
        instruction: "Dosaďte známé hodnoty",
        math: "$1000 \\cdot 10 + 1500 \\cdot 0 = (1000 + 1500) \\cdot v'$",
        explanation: "Druhé auto stojí, takže $v_2 = 0$.",
      },
      {
        instruction: "Vypočítejte",
        math: "$10\\,000 = 2500 \\cdot v'$",
        explanation: "Celková hybnost před srážkou je $10\\,000$ kg·m/s.",
      },
      {
        instruction: "Vyjádřete $v'$",
        math: "$v' = \\frac{10\\,000}{2500} = 4 \\text{ m/s}$",
        explanation: "Spojená auta jedou rychlostí $4$ m/s.",
      },
    ],
    finalAnswer: "Po srážce se spojená auta pohybují rychlostí $v' = 4$ m/s ve směru jízdy prvního auta.",
  },
  practiceProblems: [
    {
      id: "hi-b-1",
      problemStatement: "Jaká je hybnost běžce ($80$ kg) při rychlosti $8$ m/s?",
      expectedAnswer: "640",
      acceptableAnswers: ["640", "640 kg·m/s", "640 kg.m/s"],
      hints: [
        "Použijte $p = m \\cdot v$.",
        "$p = 80 \\cdot 8$",
      ],
      solutionExplanation: `$$p = m \\cdot v = 80 \\cdot 8 = 640 \\text{ kg·m/s}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "hi-b-2",
      problemStatement: "Koule ($2$ kg, $v = 3$ m/s) narazí do stojící koule ($2$ kg). Při dokonale pružné srážce stejných hmotností se první zastaví. Jaká je rychlost druhé koule?",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 m/s"],
      hints: [
        "Zachování hybnosti: $m_1 v_1 = m_2 v_2'$ (první koule se zastaví).",
        "$2 \\cdot 3 = 2 \\cdot v_2'$",
      ],
      solutionExplanation: `Při pružné srážce stejných hmotností si koule \'vymění' rychlosti:
$$m v_1 = m v_2' \\implies v_2' = v_1 = 3 \\text{ m/s}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "hi-b-3",
      problemStatement: "Vagon ($10\\,000$ kg, $v = 2$ m/s) narazí do stojícího vagonu ($10\\,000$ kg) a spojí se. Jakou rychlostí jedou?",
      expectedAnswer: "1",
      acceptableAnswers: ["1", "1 m/s"],
      hints: [
        "$v' = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$",
        "$v' = \\frac{10\\,000 \\cdot 2}{20\\,000}$",
      ],
      solutionExplanation: `$$v' = \\frac{m_1 v_1}{m_1 + m_2} = \\frac{10\\,000 \\cdot 2}{20\\,000} = 1 \\text{ m/s}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "hi-b-4",
      problemStatement: "Míč ($0{,}5$ kg) letí rychlostí $12$ m/s a odrazí se zpět stejnou rychlostí. Jaká je změna hybnosti?",
      expectedAnswer: "12",
      acceptableAnswers: ["12", "12 kg·m/s", "12 kg.m/s"],
      hints: [
        "Hybnost před: $p_1 = 0{,}5 \\cdot 12 = 6$ kg·m/s.",
        "Hybnost po (opačný směr): $p_2 = 0{,}5 \\cdot (-12) = -6$ kg·m/s.",
        "$\\Delta p = |p_2 - p_1| = |-6 - 6|$",
      ],
      solutionExplanation: `$$\\Delta p = |p_2 - p_1| = |(-6) - 6| = |-12| = 12 \\text{ kg·m/s}$$
Při dokonalém odrazu je změna hybnosti **dvojnásobkem** počáteční hybnosti.`,
      difficulty: "medium" as const,
    },
    {
      id: "hi-b-5",
      problemStatement: "Výstřel: Puška ($4$ kg) vystřelí náboj ($10$ g) rychlostí $800$ m/s. Jaká je zpětná rychlost pušky?",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2 m/s"],
      hints: [
        "Před výstřelem: celková hybnost = 0 (vše v klidu).",
        "$0 = m_{\\text{puška}} \\cdot v_{\\text{puška}} + m_{\\text{náboj}} \\cdot v_{\\text{náboj}}$",
        "$v_{\\text{puška}} = -\\frac{0{,}01 \\cdot 800}{4}$",
      ],
      solutionExplanation: `$$0 = m_p v_p + m_n v_n$$
$$v_p = -\\frac{m_n v_n}{m_p} = -\\frac{0{,}01 \\cdot 800}{4} = -2 \\text{ m/s}$$
Puška se pohne zpět rychlostí $2$ m/s (zpětný ráz).`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Hybnost**: $p = mv$ — vyjadřuje setrvačnost pohybu, je to vektorová veličina.",
      "**Zákon zachování hybnosti**: $p_{\\text{před}} = p_{\\text{po}}$ — celková hybnost se při srážce nemění.",
      "**Impulz**: $I = F \\cdot \\Delta t = \\Delta p$ — síla × čas = změna hybnosti.",
      "**Pružná srážka**: zachovává se hybnost i energie. **Nepružná**: zachovává se jen hybnost.",
      "**Zpětný ráz**: zákon zachování hybnosti platí i při výstřelu, výbuchu, startu rakety.",
    ],
    nextTopicSuggestion: "Výborně! Pokračujte na pokročilejší srážky — dopočítejte rychlosti po srážce pomocí dvou rovnic.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step problems
// ═══════════════════════════════════════════════════════════════;

export const hybnostAImpulzIntermediate: LessonContent = {
  conceptExplanation: {
    title: "Hybnost a impulz — srážky kvantitativně",
    sections: [
      {
        heading: "Hybnost jako vektor",
        body: `Hybnost je vektorová veličina. Při srážkách musíme zachovávat hybnost v **každém směru** zvlášť:

$$\\boxed{\\vec{p} = m \\cdot \\vec{v}}$$

Ve 2D:
$$p_x = mv_x, \\quad p_y = mv_y$$

Zákon zachování hybnosti (1D):
$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2'$$

> [!key] Hybnost se zachovává **v každém směru nezávisle**. To je klíčové pro šikmé srážky (biliár!).`,
      },
      {
        heading: "Dokonale pružná srážka — úplné řešení",
        body: `Při dokonale pružné srážce se zachovává hybnost I kinetická energie:

$$m_1 v_1 + m_2 v_2 = m_1 v_1' + m_2 v_2' \\quad \\text{(hybnost)}$$
$$\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}m_1 v_1'^2 + \\frac{1}{2}m_2 v_2'^2 \\quad \\text{(energie)}$$

Řešení (po algebraických úpravách):

$$\\boxed{v_1' = \\frac{m_1 - m_2}{m_1 + m_2} v_1 + \\frac{2m_2}{m_1 + m_2} v_2}$$

$$\\boxed{v_2' = \\frac{2m_1}{m_1 + m_2} v_1 + \\frac{m_2 - m_1}{m_1 + m_2} v_2}$$

**Speciální případy ($v_2 = 0$):**
- $m_1 = m_2$: $v_1' = 0$, $v_2' = v_1$ (výměna rychlostí)
- $m_1 \\gg m_2$: $v_1' \\approx v_1$, $v_2' \\approx 2v_1$ (lehké těleso se odrazí)
- $m_1 \\ll m_2$: $v_1' \\approx -v_1$, $v_2' \\approx 0$ (míč od zdi)`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "elastic",
            defaultM1: 4,
            defaultM2: 1,
            defaultV1: 3,
            defaultV2: 0,
            showMomentumBars: true,
            showEnergyBars: true,
          },
          caption: "Měňte hmotnosti — při velké hmotnosti jednoho tělesa sledujte speciální případy!",
        },
        examples: [
          {
            problem: "Koule $A$ ($3$ kg, $v = 4$ m/s) narazí pružně do stojící koule $B$ ($1$ kg). Jaké jsou rychlosti po srážce?",
            solution: `$$v_A' = \\frac{3 - 1}{3 + 1} \\cdot 4 = \\frac{2}{4} \\cdot 4 = \\color{#16a34a}{2 \\text{ m/s}}$$
$$v_B' = \\frac{2 \\cdot 3}{3 + 1} \\cdot 4 = \\frac{6}{4} \\cdot 4 = \\color{#16a34a}{6 \\text{ m/s}}$$`,
          },
        ],
      },
      {
        heading: "Ztráta energie při nepružné srážce",
        body: `Při dokonale nepružné srážce ($v_2 = 0$):

$$v' = \\frac{m_1}{m_1 + m_2} v_1$$

Ztráta kinetické energie:
$$\\Delta E_k = \\frac{1}{2}m_1 v_1^2 - \\frac{1}{2}(m_1 + m_2) v'^2$$

Po dosazení:
$$\\boxed{\\Delta E_k = \\frac{1}{2} \\cdot \\frac{m_1 m_2}{m_1 + m_2} \\cdot v_1^2}$$

Podíl ztracené energie:
$$\\frac{\\Delta E_k}{E_{k0}} = \\frac{m_2}{m_1 + m_2}$$

> [!info] Čím těžší je cíl ve srovnání se střelou, tím větší podíl energie se ztratí. Když $m_2 \\gg m_1$, ztratí se téměř vše!`,
      },
      {
        heading: "Impulz a graf F(t)",
        body: `Impulz síly je obecně:

$$\\boxed{I = \\int_0^{\\Delta t} F(t) \\, dt = \\Delta p}$$

V praxi je to **plocha pod grafem** $F(t)$.

Pro konstantní sílu: $I = F \\cdot \\Delta t$

Pro proměnnou sílu (např. náraz):
- Síla narůstá, dosáhne maxima, klesá
- Plocha pod křivkou = impulz = změna hybnosti

$$\\begin{array}{l|c|c|c} \\text{Situace} & \\Delta t \\text{ (s)} & F_{\\text{průměr}} \\text{ (N)} & \\Delta p \\text{ (kg·m/s)} \\\\ \\hline \\text{Airbag} & 0{,}15 & 4000 & 600 \\\\ \\text{Bez airbagu} & 0{,}02 & 30\\,000 & 600 \\end{array}$$

> [!key] Stejná změna hybnosti, ale $7{,}5\\times$ menší síla díky airbagu!`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Koule A ($m_1 = 2$ kg) se pohybuje rychlostí $v_1 = 6$ m/s a narazí čelně do koule B ($m_2 = 3$ kg), která jede proti ní rychlostí $v_2 = -2$ m/s. Srážka je dokonale pružná. Jaké jsou rychlosti po srážce?`,
    steps: [
      {
        instruction: "Zapište vzorce pro pružnou srážku",
        math: "$v_1' = \\frac{m_1 - m_2}{m_1 + m_2} v_1 + \\frac{2m_2}{m_1 + m_2} v_2$\n$v_2' = \\frac{2m_1}{m_1 + m_2} v_1 + \\frac{m_2 - m_1}{m_1 + m_2} v_2$",
        explanation: "Obecné vzorce pro dokonale pružnou srážku.",
      },
      {
        instruction: "Spočítejte koeficienty",
        math: "$\\frac{m_1 - m_2}{m_1 + m_2} = \\frac{2 - 3}{5} = -\\frac{1}{5}$\n$\\frac{2m_2}{m_1 + m_2} = \\frac{6}{5}$\n$\\frac{2m_1}{m_1 + m_2} = \\frac{4}{5}$\n$\\frac{m_2 - m_1}{m_1 + m_2} = \\frac{1}{5}$",
        explanation: "Předpočítáme zlomky.",
      },
      {
        instruction: "Dosaďte rychlosti pro $v_1'$",
        math: "$v_1' = -\\frac{1}{5} \\cdot 6 + \\frac{6}{5} \\cdot (-2) = -\\frac{6}{5} - \\frac{12}{5} = -\\frac{18}{5} = -3{,}6 \\text{ m/s}$",
        explanation: "Koule A se odrazí zpět (záporné znaménko).",
      },
      {
        instruction: "Dosaďte rychlosti pro $v_2'$",
        math: "$v_2' = \\frac{4}{5} \\cdot 6 + \\frac{1}{5} \\cdot (-2) = \\frac{24}{5} - \\frac{2}{5} = \\frac{22}{5} = 4{,}4 \\text{ m/s}$",
        explanation: "Koule B se odrazí v opačném směru, než se pohybovala.",
      },
      {
        instruction: "Zkontrolujte zachování hybnosti",
        math: "$p_{\\text{před}} = 2 \\cdot 6 + 3 \\cdot (-2) = 6$\n$p_{\\text{po}} = 2 \\cdot (-3{,}6) + 3 \\cdot 4{,}4 = -7{,}2 + 13{,}2 = 6$ ✓",
        explanation: "Hybnost se zachovala — výpočet je správný.",
      },
    ],
    finalAnswer: "Po srážce: $v_A' = -3{,}6$ m/s (koule A letí zpět), $v_B' = 4{,}4$ m/s (koule B letí vpřed).",
  },
  practiceProblems: [
    {
      id: "hi-i-1",
      problemStatement: "Koule ($5$ kg, $v = 4$ m/s) narazí pružně do stojící koule ($5$ kg). Jaké jsou rychlosti po srážce?",
      expectedAnswer: "0 a 4",
      acceptableAnswers: ["0 a 4", "0 m/s a 4 m/s", "0;4", "v1=0, v2=4"],
      hints: [
        "Stejné hmotnosti → koule si \'vymění' rychlosti.",
        "$v_1' = 0$, $v_2' = 4$ m/s.",
      ],
      solutionExplanation: `Při pružné srážce stejných hmotností: $v_1' = 0$, $v_2' = v_1 = 4$ m/s.`,
      difficulty: "easy" as const,
    },
    {
      id: "hi-i-2",
      problemStatement: "Kyvadlo ($2$ kg) se rozkmitá a v nejnižším bodě narazí nepružně do stojícího kvádru ($8$ kg). Rychlost kyvadla před srážkou je $5$ m/s. Jaká je rychlost spojených těles po srážce?",
      expectedAnswer: "1",
      acceptableAnswers: ["1", "1 m/s"],
      hints: [
        "Nepružná srážka: $v' = \\frac{m_1 v_1}{m_1 + m_2}$.",
        "$v' = \\frac{2 \\cdot 5}{2 + 8}$",
      ],
      solutionExplanation: `$$v' = \\frac{m_1 v_1}{m_1 + m_2} = \\frac{2 \\cdot 5}{10} = 1 \\text{ m/s}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "hi-i-3",
      problemStatement: "Koule A ($1$ kg, $v = 8$ m/s) narazí pružně do stojící koule B ($3$ kg). Jaká je rychlost koule B po srážce?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 m/s"],
      hints: [
        "$v_B' = \\frac{2m_1}{m_1 + m_2} v_1$",
        "$v_B' = \\frac{2 \\cdot 1}{1 + 3} \\cdot 8$",
      ],
      solutionExplanation: `$$v_B' = \\frac{2m_1}{m_1 + m_2} v_1 = \\frac{2}{4} \\cdot 8 = 4 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "hi-i-4",
      problemStatement: "Při nepružné srážce auta ($1200$ kg, $v = 15$ m/s) se stojícím dodávkou ($2400$ kg) — jaká je ztráta kinetické energie?",
      expectedAnswer: "90000",
      acceptableAnswers: ["90000", "90000 J", "90 kJ"],
      hints: [
        "Nejdřív spočítejte $v'$, pak porovnejte $E_k$ před a po.",
        "$v' = \\frac{1200 \\cdot 15}{3600} = 5$ m/s.",
        "$\\Delta E_k = \\frac{1}{2} \\cdot 1200 \\cdot 15^2 - \\frac{1}{2} \\cdot 3600 \\cdot 5^2$",
      ],
      solutionExplanation: `$$v' = \\frac{1200 \\cdot 15}{3600} = 5 \\text{ m/s}$$
$$E_{k0} = \\frac{1}{2} \\cdot 1200 \\cdot 225 = 135\\,000 \\text{ J}$$
$$E_{k1} = \\frac{1}{2} \\cdot 3600 \\cdot 25 = 45\\,000 \\text{ J}$$
$$\\Delta E_k = 135\\,000 - 45\\,000 = 90\\,000 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "hi-i-5",
      problemStatement: "Auto ($1000$ kg) narazí do betonové bariéry (prakticky nekonečná hmotnost) rychlostí $20$ m/s. Deformační zóna auta se zmáčkne za $0{,}08$ s. Jaká je průměrná síla nárazu?",
      expectedAnswer: "250000",
      acceptableAnswers: ["250000", "250000 N", "250 kN"],
      hints: [
        "Auto se zastaví: $\\Delta v = 20$ m/s.",
        "$F = \\frac{\\Delta p}{\\Delta t} = \\frac{m \\cdot \\Delta v}{\\Delta t}$",
      ],
      solutionExplanation: `$$F = \\frac{\\Delta p}{\\Delta t} = \\frac{m \\cdot v}{\\Delta t} = \\frac{1000 \\cdot 20}{0{,}08} = 250\\,000 \\text{ N} = 250 \\text{ kN}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Pružná srážka: $v_1' = \\frac{m_1 - m_2}{m_1 + m_2} v_1 + \\frac{2m_2}{m_1 + m_2} v_2$ (zachovává se hybnost i energie).",
      "Nepružná srážka: $v' = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}$ (energie se ztrácí).",
      "Ztráta energie: $\\frac{\\Delta E_k}{E_{k0}} = \\frac{m_2}{m_1 + m_2}$ (čím těžší cíl, tím větší ztráta).",
      "Impulz = plocha pod grafem $F(t)$ — airbag prodlouží dobu nárazu → menší síla.",
      "Stejné hmotnosti → výměna rychlostí (Newtonovo kyvadlo!).",
    ],
    nextTopicSuggestion: "Pokračujte na pokročilé srážky a reaktivní pohyb — principy raketového pohonu!",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Complex problems, reactive motion, 2D collisions
// ═══════════════════════════════════════════════════════════════;

export const hybnostAImpulzAdvanced: LessonContent = {
  conceptExplanation: {
    title: "Hybnost a impulz — pokročilé aplikace",
    sections: [
      {
        heading: "Reaktivní pohyb — rakety a tryskáče",
        body: `Raketa se pohybuje tím, že **vyvrhuje hmotu** (plyny) opačným směrem. Zákon zachování hybnosti:

$$\\boxed{F_{\\text{tah}} = v_{\\text{plyn}} \\cdot \\frac{\\Delta m}{\\Delta t}}$$

kde $v_{\\text{plyn}}$ je rychlost výtoku plynů a $\\frac{\\Delta m}{\\Delta t}$ je hmotnostní průtok (kg/s).

**Ciolkovského rovnice** (konečná rychlost rakety):

$$\\boxed{v = v_{\\text{plyn}} \\cdot \\ln\\frac{m_0}{m}}$$

- $m_0$ je počáteční hmotnost (s palivem)
- $m$ je konečná hmotnost (bez paliva)
- $\\ln$ je přirozený logaritmus

> [!key] Aby raketa dosáhla vysoké rychlosti, potřebuje buď rychlé plyny ($v_{\\text{plyn}}$) nebo hodně paliva ($m_0/m$ velké). Proto jsou rakety většinou palivo!

Příklad:
- Falcon 9: $m_0/m \\approx 20$, $v_{\\text{plyn}} \\approx 3\\,100$ m/s
- $v = 3100 \\cdot \\ln 20 \\approx 9\\,300$ m/s (potřeba pro orbit)`,
        examples: [
          {
            problem: "Raketa ($m_0 = 500$ t) má výtokovou rychlost plynů $3\\,000$ m/s a hmotnostní průtok $2\\,000$ kg/s. Jaká je tahová síla motoru?",
            solution: `$$F = v_{\\text{plyn}} \\cdot \\frac{\\Delta m}{\\Delta t} = 3000 \\cdot 2000 = \\color{#16a34a}{6\\,000\\,000 \\text{ N} = 6 \\text{ MN}}$$`,
          },
        ],
      },
      {
        heading: "Balistické kyvadlo",
        body: `Klasický experiment: střela se zasekne do zavěšeného bloku (nepružná srážka) a kyvadlo se vychýlí.

**Krok 1 — srážka** (zachování hybnosti):
$$m_{\\text{s}} v_{\\text{s}} = (m_{\\text{s}} + m_{\\text{b}}) v'$$

**Krok 2 — kyvadlo** (zachování energie):
$$\\frac{1}{2}(m_{\\text{s}} + m_{\\text{b}}) v'^2 = (m_{\\text{s}} + m_{\\text{b}}) g h$$

Kombinací:
$$\\boxed{v_{\\text{s}} = \\frac{m_{\\text{s}} + m_{\\text{b}}}{m_{\\text{s}}} \\sqrt{2gh}}$$

> [!tip] Balistické kyvadlo umožňuje měřit rychlost střely, i když samotný náraz trvá tisícinu sekundy!`,
        visual: {
          type: "interactive-pendulum",
          props: {
            defaultLength: 2.0,
            defaultAngle: 25,
            showEnergyBars: true,
            showGSlider: false,
          },
          caption: "Představte si, že do kyvadla narazí střela — vychýlení určuje rychlost střely!",
        },
        examples: [
          {
            problem: "Střela ($10$ g) se zasekne do dřevěného bloku ($5$ kg) a kyvadlo se vychýlí do výšky $8$ cm. Jaká byla rychlost střely?",
            solution: `$$v_{\\text{s}} = \\frac{m_s + m_b}{m_s} \\sqrt{2gh} = \\frac{5{,}01}{0{,}01} \\sqrt{2 \\cdot 10 \\cdot 0{,}08}$$
$$= 501 \\cdot 1{,}265 = \\color{#16a34a}{634 \\text{ m/s}}$$`,
          },
        ],
      },
      {
        heading: "Srážky v rovině (2D)",
        body: `Při šikmé srážce (biliár) zachováváme hybnost v **obou směrech**:

$$m_1 v_{1x} + m_2 v_{2x} = m_1 v_{1x}' + m_2 v_{2x}'$$
$$m_1 v_{1y} + m_2 v_{2y} = m_1 v_{1y}' + m_2 v_{2y}'$$

Pro pružnou srážku přidáme zachování energie:
$$\\frac{1}{2}m_1 v_1^2 + \\frac{1}{2}m_2 v_2^2 = \\frac{1}{2}m_1 v_1'^2 + \\frac{1}{2}m_2 v_2'^2$$

**Důležitý výsledek:** Při pružné srážce stejných hmotností (biliár) se úhel mezi směry pohybu po srážce rovná $90°$!

> [!key] 2D srážky řešíme rozkladem do složek $x$ a $y$. V každém směru platí zákon zachování hybnosti nezávisle.`,
        visual: {
          type: "interactive-collision",
          props: {
            collisionType: "elastic",
            defaultM1: 1,
            defaultM2: 5,
            defaultV1: 5,
            defaultV2: -1,
            showMomentumBars: true,
            showEnergyBars: true,
          },
          caption: "Porovnejte lehkou a těžkou kouli — lehká se odrazí, těžká se sotva pohne.",
        },
      },
      {
        heading: "Koeficient restituce",
        body: `Reálné srážky nejsou ani dokonale pružné, ani dokonale nepružné. **Koeficient restituce** $e$ měří \'pružnost' srážky:

$$\\boxed{e = \\frac{v_2' - v_1'}{v_1 - v_2}}$$

- $e = 1$: dokonale pružná
- $0 < e < 1$: částečně nepružná (reálné srážky)
- $e = 0$: dokonale nepružná

$$\\begin{array}{l|c} \\text{Materiál} & e \\\\ \\hline \\text{Ocel na ocel} & 0{,}95 \\\\ \\text{Sklo na sklo} & 0{,}94 \\\\ \\text{Golfový míček} & 0{,}80 \\\\ \\text{Tenisový míček} & 0{,}75 \\\\ \\text{Basketbalový míč} & 0{,}60 \\\\ \\text{Plastelína} & \\approx 0 \\end{array}$$

> [!info] S koeficientem restituce máme dvě rovnice pro dvě neznámé: zachování hybnosti + $e$.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Raketa ($m_0 = 1000$ kg i s palivem) má $800$ kg paliva. Výtoková rychlost plynů je $2\\,500$ m/s. a) Jakou konečnou rychlost raketa dosáhne? b) Jaká je tahová síla, pokud palivo vyhoří za $40$ s?`,
    steps: [
      {
        instruction: "Určete hmotnostní poměr",
        math: "$\\frac{m_0}{m} = \\frac{1000}{1000 - 800} = \\frac{1000}{200} = 5$",
        explanation: "Prázdná raketa má hmotnost $200$ kg (bez paliva).",
      },
      {
        instruction: "Použijte Ciolkovského rovnici",
        math: "$v = v_{\\text{plyn}} \\cdot \\ln\\frac{m_0}{m} = 2500 \\cdot \\ln 5$",
        explanation: "$\\ln 5 \\approx 1{,}609$",
      },
      {
        instruction: "Dopočítejte konečnou rychlost",
        math: "$v = 2500 \\cdot 1{,}609 = 4023 \\text{ m/s} \\approx 4{,}0 \\text{ km/s}$",
        explanation: "Bez gravitace by raketa dosáhla $4$ km/s.",
      },
      {
        instruction: "Spočítejte hmotnostní průtok",
        math: "$\\frac{\\Delta m}{\\Delta t} = \\frac{800}{40} = 20 \\text{ kg/s}$",
        explanation: "Za sekundu se spálí $20$ kg paliva.",
      },
      {
        instruction: "Spočítejte tahovou sílu",
        math: "$F = v_{\\text{plyn}} \\cdot \\frac{\\Delta m}{\\Delta t} = 2500 \\cdot 20 = 50\\,000 \\text{ N} = 50 \\text{ kN}$",
        explanation: "Tahová síla je $50$ kN.",
      },
    ],
    finalAnswer: "a) Raketa dosáhne konečné rychlosti $v \\approx 4{,}0$ km/s. b) Tahová síla motoru je $F = 50$ kN.",
  },
  practiceProblems: [
    {
      id: "hi-p-1",
      problemStatement: "Střela ($15$ g, $v = 400$ m/s) se zasekne do zavěšeného bloku ($3$ kg). Do jaké výšky se kyvadlo vychýlí? ($g = 10$ m/s²)",
      expectedAnswer: "0.2",
      acceptableAnswers: ["0.2", "0,2", "0.2 m", "0,2 m", "20 cm"],
      numericTolerance: 0.02,
      hints: [
        "Nejdřív spočítejte $v'$ ze zachování hybnosti.",
        "$v' = \\frac{0{,}015 \\cdot 400}{3{,}015} \\approx 2$ m/s",
        "Pak $h = \\frac{v'^2}{2g}$.",
      ],
      solutionExplanation: `$$v' = \\frac{m_s v_s}{m_s + m_b} = \\frac{0{,}015 \\cdot 400}{3{,}015} \\approx 1{,}99 \\text{ m/s}$$
$$h = \\frac{v'^2}{2g} = \\frac{1{,}99^2}{20} \\approx 0{,}2 \\text{ m} = 20 \\text{ cm}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "hi-p-2",
      problemStatement: "Koule A ($2$ kg, $v = 5$ m/s) narazí do stojící koule B ($6$ kg) s koeficientem restituce $e = 0{,}5$. Jaká je rychlost koule B po srážce?",
      expectedAnswer: "1.875",
      acceptableAnswers: ["1.875", "1,875", "1.88", "1,88", "1.9", "1,9"],
      numericTolerance: 0.05,
      hints: [
        "Dvě rovnice: $m_1 v_1 = m_1 v_1' + m_2 v_2'$ a $e = (v_2' - v_1')/(v_1 - v_2)$.",
        "$v_2' - v_1' = 0{,}5 \\cdot 5 = 2{,}5$ a $2 \\cdot 5 = 2 v_1' + 6 v_2'$.",
        "Z první: $v_1' = v_2' - 2{,}5$. Dosaďte do druhé.",
      ],
      solutionExplanation: `$v_2' - v_1' = e \\cdot v_1 = 2{,}5 \\implies v_1' = v_2' - 2{,}5$
$10 = 2(v_2' - 2{,}5) + 6v_2' = 8v_2' - 5$
$v_2' = 15/8 = 1{,}875$ m/s`,
      difficulty: "hard" as const,
    },
    {
      id: "hi-p-3",
      problemStatement: "Raketa s výtokovou rychlostí plynů $3\\,000$ m/s potřebuje dosáhnout rychlosti $7\\,900$ m/s (1. kosmická). Jaký musí být poměr $m_0/m$? ($\\ln x = 2{,}63$ pro $x \\approx 14$)",
      expectedAnswer: "14",
      acceptableAnswers: ["14", "13.9", "13,9", "14.0", "14,0"],
      numericTolerance: 1,
      hints: [
        "$v = v_{\\text{plyn}} \\cdot \\ln(m_0/m)$",
        "$\\ln(m_0/m) = 7900/3000 \\approx 2{,}63$",
        "$m_0/m = e^{2{,}63}$",
      ],
      solutionExplanation: `$$\\ln\\frac{m_0}{m} = \\frac{v}{v_{\\text{plyn}}} = \\frac{7900}{3000} = 2{,}633$$
$$\\frac{m_0}{m} = e^{2{,}633} \\approx 13{,}9 \\approx 14$$
Raketa musí mít $93\\%$ hmotnosti v palivu!`,
      difficulty: "hard" as const,
    },
    {
      id: "hi-p-4",
      problemStatement: "Tenisový míček ($60$ g) dopadne na zem rychlostí $8$ m/s a odrazí se rychlostí $6$ m/s. Jaký je koeficient restituce? Kolik energie se ztratilo?",
      expectedAnswer: "0.75",
      acceptableAnswers: ["0.75", "0,75", "e=0.75", "e=0,75"],
      hints: [
        "$e = v_{\\text{po}}/v_{\\text{před}}$ (zem je nehybná → zjednodušení).",
        "$e = 6/8$",
      ],
      solutionExplanation: `$$e = \\frac{v_{\\text{po}}}{v_{\\text{před}}} = \\frac{6}{8} = 0{,}75$$
$$\\Delta E_k = \\frac{1}{2} \\cdot 0{,}06 \\cdot (8^2 - 6^2) = 0{,}03 \\cdot 28 = 0{,}84 \\text{ J}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "hi-p-5",
      problemStatement: "Astronaut ($80$ kg) se vznáší v beztíži a hodí nářadí ($5$ kg) rychlostí $4$ m/s. Jakou rychlostí se pohybuje astronaut?",
      expectedAnswer: "0.25",
      acceptableAnswers: ["0.25", "0,25", "0.25 m/s", "0,25 m/s"],
      hints: [
        "Zachování hybnosti: $0 = m_a v_a + m_n v_n$.",
        "$v_a = -\\frac{m_n v_n}{m_a} = -\\frac{5 \\cdot 4}{80}$.",
      ],
      solutionExplanation: `$$0 = m_a v_a + m_n v_n$$
$$v_a = -\\frac{5 \\cdot 4}{80} = -0{,}25 \\text{ m/s}$$
Astronaut se pohybuje opačným směrem rychlostí $0{,}25$ m/s.`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Ciolkovského rovnice**: $v = v_{\\text{plyn}} \\cdot \\ln(m_0/m)$ — konečná rychlost rakety závisí na hmotnostním poměru.",
      "**Balistické kyvadlo**: $v_s = \\frac{m_s + m_b}{m_s} \\sqrt{2gh}$ — měření rychlosti ze srážky + kyvadla.",
      "**Koeficient restituce**: $e = (v_2' - v_1')/(v_1 - v_2)$ — měří \'pružnost' srážky ($0 \\leq e \\leq 1$).",
      "**2D srážky**: zachování hybnosti v každém směru zvlášť. Stejné hmotnosti → úhel $90°$.",
      "**Tahová síla rakety**: $F = v_{\\text{plyn}} \\cdot \\dot{m}$ — závisí na rychlosti plynů a průtoku paliva.",
    ],
    nextTopicSuggestion: "Výborně! Nyní jste připraveni na gravitaci — jak Newton vysvětlil pohyb planet a kosmických lodí.",
  },
};
