import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  narrative:
    "Derivace neříká jen „sklon v bodě\". Řekne ti, kdy funkce roste, kde má maximum, a jak vypadá tečna. To dělá z derivace nejsilnější nástroj středoškolské matematiky.",
  steps: [
    {
      type: "explain",
      body:
        "Znaménko první derivace popisuje **monotonii**: kde $f'(\\color{#e74c3c}{x}) > 0$, tam funkce roste; kde $f'(\\color{#e74c3c}{x}) < 0$, tam klesá. V bodech, kde $f'(\\color{#e74c3c}{x}) = 0$, se může měnit chod funkce.",
      misconception:
        "Studenti si často myslí, že $f'(\\color{#e74c3c}{x}) = 0$ automaticky znamená extrém. Není to pravda — například $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^3$ má $f'(0) = 0$, ale extrém v nule nemá (je to inflexní bod s vodorovnou tečnou).",
      callout: "Monotonie",
    },
    {
      type: "multiple-choice",
      question:
        "Funkce $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^2 - 6\\color{#e74c3c}{x} + 5$ má derivaci $f'(\\color{#e74c3c}{x}) = 2\\color{#e74c3c}{x} - 6$. Na kterém intervalu funkce klesá?",
      choices: [
        {
          label: "$(-\\infty; 3)$",
          isCorrect: true,
          feedback:
            "Správně. $f'(\\color{#e74c3c}{x}) = 2\\color{#e74c3c}{x} - 6 < 0$ právě když $\\color{#e74c3c}{x} < 3$, takže funkce klesá na $(-\\infty; 3)$.",
        },
        {
          label: "$(3; +\\infty)$",
          isCorrect: false,
          feedback: "Naopak — zde $f'(\\color{#e74c3c}{x}) > 0$, tedy funkce roste.",
        },
        {
          label: "$(-\\infty; +\\infty)$ (všude)",
          isCorrect: false,
          feedback: "Parabola obrácená nahoru klesá jen do vrcholu a pak roste.",
        },
        {
          label: "Nikde neklesá",
          isCorrect: false,
          feedback: "Dosaď $\\color{#e74c3c}{x} = 0$: $f'(0) = -6 < 0$. V okolí nuly funkce klesá.",
        },
      ],
      explanation:
        "Řešíme nerovnici $2\\color{#e74c3c}{x} - 6 < 0 \\iff \\color{#e74c3c}{x} < 3$. Tedy funkce klesá pro $\\color{#e74c3c}{x} \\in (-\\infty; 3)$, v bodě $\\color{#e74c3c}{x} = 3$ má minimum a dál roste.",
    },
    {
      type: "explain",
      body:
        "**Lokální extrém** najdeš takto: (1) spočti $f'(\\color{#e74c3c}{x})$, (2) vyřeš $f'(\\color{#e74c3c}{x}) = 0$, (3) v bodech změny znaménka máš extrém. Pokud $f'$ mění z + na −, je to **maximum**; z − na +, je to **minimum**.",
      callout: "Extrémy",
    },
    {
      type: "prediction",
      scenario:
        "U funkce $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^3 - 3\\color{#e74c3c}{x}$ je $f'(\\color{#e74c3c}{x}) = 3\\color{#e74c3c}{x}^2 - 3$, tedy $f'(\\color{#e74c3c}{x}) = 0$ v bodech $\\color{#e74c3c}{x} = \\pm 1$.",
      question: "Co myslíš — jaký je extrém v bodě $\\color{#e74c3c}{x} = -1$?",
      options: [
        { label: "Lokální maximum", isCorrect: true },
        { label: "Lokální minimum", isCorrect: false },
        { label: "Žádný extrém (inflexní bod)", isCorrect: false },
      ],
      reveal:
        "Pro $\\color{#e74c3c}{x} < -1$ je $f'(\\color{#e74c3c}{x}) > 0$ (dosaď $\\color{#e74c3c}{x} = -2$: $3 \\cdot 4 - 3 = 9 > 0$), pro $\\color{#e74c3c}{x} \\in (-1; 1)$ je $f'(\\color{#e74c3c}{x}) < 0$ (dosaď $\\color{#e74c3c}{x} = 0$: $-3 < 0$). Derivace tedy mění znaménko z **+ na −** v bodě $-1$ — je to lokální **maximum**. Analogicky v bodě $\\color{#e74c3c}{x} = 1$ máme lokální minimum.",
    },
    {
      type: "text-input",
      question:
        "Najdi $\\color{#e74c3c}{x}$-ovou souřadnici lokálního minima funkce $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^2 - 8\\color{#e74c3c}{x} + 15$. (Zadej jen číslo.)",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "x=4", "x = 4"],
      numericTolerance: 0.01,
      explanation:
        "$f'(\\color{#e74c3c}{x}) = 2\\color{#e74c3c}{x} - 8 = 0 \\iff \\color{#e74c3c}{x} = 4$. V tomto bodě funkce přechází z klesání do růstu (ověř dosazením okolo), takže jde o minimum.",
      hints: [
        "Spočítej derivaci $f'(\\color{#e74c3c}{x})$ a polož ji rovnu nule.",
      ],
    },
    {
      type: "explain",
      body:
        "**Tečna ke grafu** v bodě $[\\color{#e74c3c}{x}_0; f(\\color{#e74c3c}{x}_0)]$ má rovnici $$y - f(\\color{#e74c3c}{x}_0) = f'(\\color{#e74c3c}{x}_0) \\cdot (\\color{#e74c3c}{x} - \\color{#e74c3c}{x}_0).$$ Směrnice tečny je právě $f'(\\color{#e74c3c}{x}_0)$ — derivace v bodě dotyku.",
      callout: "Tečna",
    },
    {
      type: "text-input",
      question:
        "Jakou směrnici má tečna ke grafu $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^2$ v bodě $\\color{#e74c3c}{x}_0 = 3$? (Jen číslo.)",
      expectedAnswer: "6",
      acceptableAnswers: ["6", "k=6", "k = 6"],
      numericTolerance: 0.01,
      explanation:
        "Směrnice tečny = $f'(\\color{#e74c3c}{x}_0)$. Tady $f'(\\color{#e74c3c}{x}) = 2\\color{#e74c3c}{x}$, tedy $f'(3) = 6$. Rovnice tečny pak je $y - 9 = 6(\\color{#e74c3c}{x} - 3)$, tj. $y = 6\\color{#e74c3c}{x} - 9$.",
      hints: [
        "Směrnice tečny ke grafu v bodě je hodnota derivace v tomto bodě.",
        "$f'(\\color{#e74c3c}{x}) = 2\\color{#e74c3c}{x}$, dosaď $\\color{#e74c3c}{x}_0 = 3$.",
      ],
    },
    {
      type: "sort-order",
      question:
        "Seřaď kroky hledání lokálních extrémů funkce $f$ do správného pořadí:",
      items: [
        "Spočítat derivaci $f'(\\color{#e74c3c}{x})$",
        "Vyřešit rovnici $f'(\\color{#e74c3c}{x}) = 0$ — získat kandidáty na extrém",
        "Určit znaménko $f'$ v okolí každého kandidáta",
        "Rozhodnout podle změny znaménka: + → − = maximum, − → + = minimum, beze změny = není extrém",
        "Dosadit kandidáty do $f(\\color{#e74c3c}{x})$ a získat y-ovou hodnotu extrému",
      ],
      explanation:
        "Ten poslední krok studenti často vynechají — výsledkem hledání extrému jsou obě souřadnice $[\\color{#e74c3c}{x}; f(\\color{#e74c3c}{x})]$, ne jen $\\color{#e74c3c}{x}$.",
    },
    {
      type: "multiple-choice",
      question:
        "Funkce $f(\\color{#e74c3c}{x}) = \\color{#e74c3c}{x}^3$ má $f'(\\color{#e74c3c}{x}) = 3\\color{#e74c3c}{x}^2$, tedy $f'(0) = 0$. Má funkce v bodě $\\color{#e74c3c}{x} = 0$ extrém?",
      choices: [
        {
          label: "Ano, lokální minimum",
          isCorrect: false,
          feedback: "Zkus dosadit $\\color{#e74c3c}{x} = 1$: $f(1) = 1$. A $\\color{#e74c3c}{x} = -1$: $f(-1) = -1 < 0 = f(0)$. Tedy $f(0)$ není minimum.",
        },
        {
          label: "Ano, lokální maximum",
          isCorrect: false,
          feedback: "$f(1) = 1 > 0 = f(0)$, takže $f(0)$ není maximum.",
        },
        {
          label: "Ne — derivace nemění znaménko (je $\\ge 0$ všude)",
          isCorrect: true,
          feedback:
            "Přesně. $f'(\\color{#e74c3c}{x}) = 3\\color{#e74c3c}{x}^2 \\geq 0$ pro všechna $\\color{#e74c3c}{x}$. Neexistuje bod, kde by derivace změnila znaménko — bod $0$ je inflexní bod s vodorovnou tečnou.",
        },
      ],
      explanation:
        "Klíčové: podmínka $f'(\\color{#e74c3c}{x}_0) = 0$ je **nutná**, ne postačující. Vždy musíš ověřit, že derivace skutečně mění znaménko v daném bodě.",
    },
    {
      type: "explain",
      body:
        "Aplikace derivace se neomezují na školní úlohy. **Optimalizace** — hledání minimálních nákladů, maximálního zisku, nejkratší cesty — vše je hledání extrému funkce. Pro středoškolské úlohy stačí postup výše; v praxi je to pak základ inženýrství, ekonomie a strojového učení.",
    },
  ],
  summary: {
    keyTakeaways: [
      "$f'(\\color{#e74c3c}{x}) > 0$ na intervalu = funkce tam roste. $f'(\\color{#e74c3c}{x}) < 0$ = klesá.",
      "Lokální extrém hledáme v bodech, kde $f'(\\color{#e74c3c}{x}) = 0$ A derivace mění znaménko.",
      "Změna z + na − = maximum. Z − na + = minimum. Beze změny = inflexní bod.",
      "Směrnice tečny ke grafu v bodě $\\color{#e74c3c}{x}_0$ je $f'(\\color{#e74c3c}{x}_0)$.",
      "Tečna: $y - f(\\color{#e74c3c}{x}_0) = f'(\\color{#e74c3c}{x}_0) \\cdot (\\color{#e74c3c}{x} - \\color{#e74c3c}{x}_0)$.",
    ],
  },
};

export const chapter: ChapterDefinition = {
  slug: "applications",
  topicSlug: "derivatives",
  order: 2,
  title: "Aplikace: monotonie, extrémy, tečna",
  lesson,
};
