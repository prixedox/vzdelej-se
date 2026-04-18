import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  narrative:
    "Galileo kdysi dávno pustil z Pisánské věže dva předměty různé hmotnosti — dopadly současně. Tento jeden pokus odstartoval moderní fyziku. Klíč byl: **pohyb jde rozložit** na svislou a vodorovnou složku, a ty spolu nesouvisejí.",
  steps: [
    {
      type: "explain",
      body:
        "Základní myšlenka všech vrhů: **složky pohybu jsou nezávislé**. Vodorovný pohyb probíhá konstantní rychlostí (bez odporu vzduchu), svislý pohyb probíhá se zrychlením $g = 9{,}81\\,\\text{m/s}^2$ (volný pád). Sečtením obou složek získáš trajektorii.",
      misconception:
        "Studenti často tvrdí, že když hodíš kámen vodorovně, „letí vodorovně, pak spadne\". Ve skutečnosti začíná padat okamžitě — vodorovná rychlost jen určuje, KAM dopadne, ne KDY.",
      callout: "Princip nezávislosti",
    },
    {
      type: "prediction",
      scenario:
        "Stojíš na útesu a ve stejný okamžik pustíš jeden kámen svisle dolů, a druhý kámen hodíš dopředu vodorovně rychlostí $10\\,\\text{m/s}$. Oba začnou ve stejné výšce.",
      question: "Co se stane?",
      options: [
        { label: "První dopadne dřív (padá rovně, bez oklik)", isCorrect: false },
        { label: "Druhý dopadne dřív (má počáteční rychlost)", isCorrect: false },
        {
          label: "Oba dopadnou ve **stejný okamžik** — jen druhý dál od útesu",
          isCorrect: true,
        },
      ],
      reveal:
        "Oba dopadnou současně. Důvod: **svislá složka pohybu je v obou případech stejná** — volný pád s nulovou počáteční svislou rychlostí. Vodorovná rychlost druhého kamene mění jen MÍSTO dopadu, ne ČAS. Galilei by byl hrdý.",
    },
    {
      type: "explain",
      body:
        "**Svislý vrh (volný pád) z výšky $h$**: doba pádu je $t = \\sqrt{\\dfrac{2h}{g}}$, dopadová rychlost $v = \\sqrt{2gh}$. Zrychlení $\\color{#e74c3c}{g}$ míří dolů a je konstantní.",
      callout: "Volný pád",
    },
    {
      type: "text-input",
      question:
        "Kámen padá volně z výšky $h = 45\\,\\text{m}$. Za jak dlouho dopadne? Použij $g = 10\\,\\text{m/s}^2$ pro zjednodušení. (Výsledek v sekundách, jen číslo.)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 s", "3s"],
      numericTolerance: 0.05,
      explanation:
        "Z $h = \\frac{1}{2}gt^2$ plyne $t = \\sqrt{\\dfrac{2h}{g}} = \\sqrt{\\dfrac{2 \\cdot 45}{10}} = \\sqrt{9} = 3\\,\\text{s}$.",
      hints: [
        "Ze vzorce $h = \\frac{1}{2}gt^2$ vyjádři $t$.",
      ],
    },
    {
      type: "explain",
      body:
        "**Vodorovný vrh** z výšky $h$ s počáteční rychlostí $\\color{#e74c3c}{v_0}$: doba letu stejná jako u volného pádu, $t = \\sqrt{2h/g}$. **Dolet** (vodorovná vzdálenost) je $d = \\color{#e74c3c}{v_0} \\cdot t$. Trajektorie = **parabola**.",
      callout: "Vodorovný vrh",
    },
    {
      type: "text-input",
      question:
        "Z útesu vysokého $20\\,\\text{m}$ letí kámen vodorovnou rychlostí $15\\,\\text{m/s}$. Jak daleko od paty útesu dopadne? Použij $g = 10\\,\\text{m/s}^2$. (Výsledek v metrech, jen číslo.)",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30 m"],
      numericTolerance: 0.5,
      explanation:
        "Nejprve doba pádu: $t = \\sqrt{2h/g} = \\sqrt{2 \\cdot 20 / 10} = 2\\,\\text{s}$. Potom dolet: $d = \\color{#e74c3c}{v_0} \\cdot t = 15 \\cdot 2 = 30\\,\\text{m}$.",
      hints: [
        "Nejdřív spočítej dobu pádu (jakoby byl volný pád).",
        "Pak násobíš vodorovnou rychlost dobou letu.",
      ],
    },
    {
      type: "explain",
      body:
        "**Šikmý vrh** s počáteční rychlostí $\\color{#e74c3c}{v_0}$ pod úhlem $\\alpha$: vodorovná složka $\\color{#e74c3c}{v_0} \\cos\\alpha$, svislá $\\color{#e74c3c}{v_0} \\sin\\alpha$. Maximální dolet na vodorovné rovině nastává pro $\\alpha = 45°$ a je $d_{max} = \\dfrac{\\color{#e74c3c}{v_0}^2}{g}$.",
      callout: "Šikmý vrh",
    },
    {
      type: "prediction",
      scenario:
        "Stejnou rychlostí vystřelíš míč postupně pod úhly $30°$, $45°$, a $60°$ nad vodorovnou rovinou. Zanedbáváme odpor vzduchu.",
      question: "Který úhel dá NEJDELŠÍ dolet?",
      options: [
        { label: "$30°$ — nízká dráha, rychlý dolet", isCorrect: false },
        { label: "$45°$ — perfektní kompromis", isCorrect: true },
        { label: "$60°$ — vysoký let dá delší čas ve vzduchu", isCorrect: false },
      ],
      reveal:
        "Úhel $45°$ je optimum na rovné zemi. Dolet je $d = \\dfrac{\\color{#e74c3c}{v_0}^2 \\sin(2\\alpha)}{g}$, a $\\sin(2\\alpha)$ má maximum pro $2\\alpha = 90°$, tedy $\\alpha = 45°$. Úhly $30°$ a $60°$ dají stejný (kratší) dolet — jsou navzájem „doplňkové\" přes $45°$.",
    },
    {
      type: "multiple-choice",
      question:
        "Co zůstává konstantní v průběhu celého vodorovného vrhu (bez odporu vzduchu)?",
      choices: [
        {
          label: "Vodorovná složka rychlosti",
          isCorrect: true,
          feedback:
            "Přesně. Ve vodorovném směru nepůsobí žádná síla (zanedbáváme odpor), takže $v_x = \\color{#e74c3c}{v_0}$ je konstantní.",
        },
        {
          label: "Svislá složka rychlosti",
          isCorrect: false,
          feedback: "Svislá rychlost roste: $v_y = g \\cdot t$.",
        },
        {
          label: "Celková rychlost ($|\\vec{v}|$)",
          isCorrect: false,
          feedback:
            "Velikost celkové rychlosti roste, protože svislá složka roste. $|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}$.",
        },
        {
          label: "Zrychlení je nulové",
          isCorrect: false,
          feedback: "Tíhové zrychlení $g$ působí celou dobu. Jen ve vodorovném směru není.",
        },
      ],
      explanation:
        "Ve vodorovném vrhu působí jen tíha — směr dolů. Vodorovný pohyb tedy probíhá beze změny rychlosti, svislý se konstantně zrychluje. To je podstata principu nezávislosti.",
    },
    {
      type: "sort-order",
      question: "Seřaď obecný postup řešení úlohy o šikmém vrhu:",
      items: [
        "Rozložit počáteční rychlost na složky: $v_x = \\color{#e74c3c}{v_0}\\cos\\alpha$, $v_y = \\color{#e74c3c}{v_0}\\sin\\alpha$",
        "Napsat pohybové rovnice pro obě osy (vodorovná: rovnoměrná, svislá: se zrychlením $-g$)",
        "Najít dobu letu z podmínky, kdy svislá souřadnice dosáhne požadované hodnoty",
        "Dosadit dobu letu do vodorovné rovnice a získat dolet",
      ],
      explanation:
        "Strategie „rozlož a spočítej\" funguje pro libovolný vrh. Klíč je vždy v prvním kroku — bez rozkladu nevíš, co dosazovat.",
    },
    {
      type: "explain",
      body:
        "V reálném světě nejsou vrhy tak čisté — **odpor vzduchu** zkracuje dolety, optimální úhel klesá pod $45°$. Ale pro středoškolské úlohy (a pro první aproximaci u dělostřelectva nebo NASA) stačí princip nezávislosti. Je to malý model, ale pro obrovský počet situací přesně funguje.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Pohyb se rozkládá na nezávislé složky: vodorovnou (rovnoměrnou) a svislou (zrychlenou tíží).",
      "Doba volného pádu z výšky $h$: $t = \\sqrt{2h/g}$.",
      "Vodorovná rychlost zůstává konstantní; svislá roste lineárně: $v_y = g \\cdot t$.",
      "Při šikmém vrhu na rovné zemi je maximální dolet pro $\\alpha = 45°$.",
      "Vrh zanedbává odpor vzduchu — v praxi je optimální úhel menší, ale princip rozkladu zůstává stejný.",
    ],
  },
};

export const chapter: ChapterDefinition = {
  slug: "projectile-motion",
  topicSlug: "kinematics",
  order: 2,
  title: "Vrhy a volný pád",
  lesson,
};
