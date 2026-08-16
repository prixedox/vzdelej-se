import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Limity",
  steps: [
    {
      type: "multiple-choice",
      question: "Posloupnost $\\frac{1}{n}$: $1,\\; \\frac{1}{2},\\; \\frac{1}{3},\\; \\frac{1}{4},\\; \\ldots$ se blíží k čemu?",
      choices: [
        { label: "$0$", isCorrect: true, feedback: "Správně! Členy se blíží k nule, i když jí nikdy přesně nedosáhnou." },
        { label: "$1$", isCorrect: false, feedback: "První člen je 1, ale dál hodnoty klesají." },
        { label: "Nemá limitu", isCorrect: false, feedback: "Posloupnost se stále blíží ke konkrétní hodnotě — limita existuje." },
      ],
      explanation: "$\\lim_{n \\to \\infty} \\frac{1}{n} = 0$. Hodnoty se s rostoucím $n$ neomezeně blíží k nule.",
    },
    {
      type: "explain",
      body: "**Limita** je hodnota, ke které se výraz neomezeně blíží, i když jí nemusí nikdy přesně dosáhnout.\n\nPíšeme $\\lim_{n \\to \\infty} a_n = L$ — to znamená, že členy $a_n$ se s rostoucím $n$ blíží k $L$.",
      callout: "Základní myšlenka",
    },
    {
      type: "text-input",
      question: "Spočítejte $\\lim_{n \\to \\infty} \\frac{3n + 1}{n}$.",
      expectedAnswer: "3",
      explanation: "Rozdělíme: $\\frac{3n + 1}{n} = 3 + \\frac{1}{n}$. Pro $n \\to \\infty$: $\\frac{1}{n} \\to 0$, takže limita je $3$.",
      hints: ["Vydělte čitatele i jmenovatele $n$."],
    },
    {
      type: "explain",
      body: "**Pravidlo pro podíl polynomů**: Pokud čitatel i jmenovatel mají stejný stupeň, limita je podíl vedoucích koeficientů:\n\n$$\\lim_{n \\to \\infty} \\frac{an^k + \\ldots}{bn^k + \\ldots} = \\frac{a}{b}$$\n\nPokud má čitatel vyšší stupeň — limita je $\\pm\\infty$. Pokud nižší — limita je $0$.",
      callout: "Pravidlo",
    },
    {
      type: "multiple-choice",
      question: "Kolik je $\\lim_{n \\to \\infty} \\frac{2n^2}{5n^2 - 3}$?",
      choices: [
        { label: "$\\frac{2}{5}$", isCorrect: true, feedback: "Oba polynomy mají stupeň 2 — podíl vedoucích koeficientů je $\\frac{2}{5}$." },
        { label: "$0$", isCorrect: false, feedback: "Limita je 0 jen když je stupeň čitatele nižší než stupeň jmenovatele." },
        { label: "$\\infty$", isCorrect: false, feedback: "Oba mají stupeň 2, takže limita je konečná." },
      ],
      explanation: "Stupeň čitatele = stupeň jmenovatele = 2. Vedoucí koeficienty: $2$ a $5$. Limita $= \\frac{2}{5}$.",
    },
    {
      type: "explore",
      prompt: "Vidíte graf $y = x^2$ a sečnu z bodu $x = 2$. To odpovídá výrazu $\\frac{x^2 - 4}{x - 2}$ blízko $x = 2$. Posouvejte $h$ k nule — k jaké hodnotě se sklon blíží?",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: true,
          showTangent: false,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Sklon sečny se blíží ke 4. To znamená $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$. Přímo dosadit nelze (vyšlo by $\\frac{0}{0}$), ale limita existuje!",
    },
    {
      type: "explain",
      body: "**Neurčitý výraz** $\\frac{0}{0}$ neznamená, že limita neexistuje — jen že přímo dosadit nestačí. Řešení: rozložit a zkrátit.\n\nPříklad: $\\frac{x^2 - 4}{x - 2} = \\frac{(x-2)(x+2)}{x-2} = x + 2$ pro $x \\neq 2$.\n\nPak $\\lim_{x \\to 2} (x + 2) = 4$.",
      callout: "Typ 0/0",
    },
    {
      type: "text-input",
      question: "Spočítejte $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
      expectedAnswer: "6",
      explanation: "$x^2 - 9 = (x - 3)(x + 3)$. Po zkrácení: $\\lim_{x \\to 3} (x + 3) = 6$.",
      hints: ["Rozložte $x^2 - 9$ jako rozdíl čtverců."],
    },
    {
      type: "multiple-choice",
      question: "Jak typicky řešíme limitu tvaru $\\frac{0}{0}$?",
      choices: [
        { label: "Výsledek je vždy 0", isCorrect: false, feedback: "$\\frac{0}{0}$ je neurčitý výraz — výsledek závisí na konkrétní funkci." },
        { label: "Rozložíme a zkrátíme", isCorrect: true, feedback: "Přesně! Rozkladem odstraníme společný faktor, který způsobuje nuly v čitateli i jmenovateli." },
        { label: "Limita neexistuje", isCorrect: false, feedback: "Neurčitý výraz neznamená neexistenci limity — je to signál, že musíme pracovat dál." },
      ],
      explanation: "Při $\\frac{0}{0}$ rozložíme čitatele i jmenovatele, zkrátíme společný faktor a pak dosadíme.",
    },
    {
      type: "text-input",
      question: "Spočítejte $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$.",
      expectedAnswer: "2",
      explanation: "$x^2 - 1 = (x - 1)(x + 1)$. Po zkrácení: $\\lim_{x \\to 1} (x + 1) = 2$.",
      hints: ["Opět rozdíl čtverců: $x^2 - 1 = (x-1)(x+1)$."],
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky řešení limity $\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}$:",
      items: [
        "Dosadíme $x = 4$ a zjistíme neurčitý výraz $\\frac{0}{0}$",
        "Rozšíříme zlomek sdruženým výrazem $\\frac{(\\sqrt{x}+2)}{(\\sqrt{x}+2)}$",
        "Čitatel zjednodušíme: $(x-4) = (\\sqrt{x}-2)(\\sqrt{x}+2)$",
        "Zkrátíme $(\\sqrt{x}-2)$ a dosadíme $x = 4$",
        "Výsledek: $\\sqrt{4} + 2 = 4$",
      ],
      explanation: "Při odmocnině ve jmenovateli násobíme sdruženým výrazem, čímž se zbavíme odmocniny a můžeme zkrátit.",
    },
    {
      type: "reveal",
      question: "Co je L'Hospitalovo pravidlo a kdy ho použijeme?",
      revealedContent: "Pokud $\\lim \\frac{f(x)}{g(x)}$ dává neurčitý výraz $\\frac{0}{0}$ nebo $\\frac{\\infty}{\\infty}$, pak:\n\n$$\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$$\n\n(pokud pravá strana existuje).\n\nPříklad: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$.\n\nPozor: pravidlo vyžaduje znalost derivací — naučíte se je v další lekci!",
    },
    {
      type: "text-input",
      question: "Spočítejte $\\lim_{n \\to \\infty} \\frac{n + 5}{3n - 1}$.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "0,33", "0.33"],
      explanation: "Oba polynomy mají stupeň 1. Vedoucí koeficienty: $1$ a $3$. Limita $= \\frac{1}{3}$.",
      hints: ["Použijte pravidlo o podílu vedoucích koeficientů."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Limita je hodnota, ke které se výraz blíží, i když jí nemusí dosáhnout.",
      "Podíl polynomů stejného stupně: limita = podíl vedoucích koeficientů.",
      "Neurčitý výraz $\\frac{0}{0}$ řešíme rozkladem a zkrácením.",
      "Při odmocninách násobíme sdruženým výrazem.",
      "L'Hospitalovo pravidlo: $\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}$ pro neurčité výrazy.",
    ],
  },
  nextTopicSuggestion: "derivace",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "limits",
  order: 1,
  title: "Limity",
  lesson,
};
