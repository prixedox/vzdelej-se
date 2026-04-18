import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Limity",
  steps: [
    {
      type: "multiple-choice",
      question: "Posloupnost $\\frac{1}{n}$: $1,\\; \\frac{1}{2},\\; \\frac{1}{3},\\; \\frac{1}{4},\\; \\ldots$ se blizi k cemu?",
      choices: [
        { label: "$0$", isCorrect: true, feedback: "Spravne! Cleny se blizi k nule, i kdyz ji nikdy presne nedosahnou." },
        { label: "$1$", isCorrect: false, feedback: "Prvni clen je 1, ale dal hodnoty klesaji." },
        { label: "Nema limitu", isCorrect: false, feedback: "Posloupnost se stale blizi ke konkretni hodnote -- limita existuje." },
      ],
      explanation: "$\\lim_{n \\to \\infty} \\frac{1}{n} = 0$. Hodnoty se s rostoucim $n$ neomezene blizi k nule.",
    },
    {
      type: "explain",
      body: "**Limita** je hodnota, ke ktere se vyraz neomezene blizi, i kdyz ji nemusi nikdy presne dosahnout.\n\nPiseme $\\lim_{n \\to \\infty} a_n = L$ -- to znamena, ze cleny $a_n$ se s rostoucim $n$ blizi k $L$.",
      callout: "Zakladni myslenka",
    },
    {
      type: "text-input",
      question: "Spocitejte $\\lim_{n \\to \\infty} \\frac{3n + 1}{n}$.",
      expectedAnswer: "3",
      explanation: "Rozdelime: $\\frac{3n + 1}{n} = 3 + \\frac{1}{n}$. Pro $n \\to \\infty$: $\\frac{1}{n} \\to 0$, takze limita je $3$.",
      hints: ["Vydelte citatele i jmenovatele $n$."],
    },
    {
      type: "explain",
      body: "**Pravidlo pro podil polynomu**: Pokud citel i jmenovatel maji stejny stupen, limita je podil vedoucich koeficientu:\n\n$$\\lim_{n \\to \\infty} \\frac{an^k + \\ldots}{bn^k + \\ldots} = \\frac{a}{b}$$\n\nPokud ma citatel vyssi stupen -- limita je $\\pm\\infty$. Pokud nizsi -- limita je $0$.",
      callout: "Pravidlo",
    },
    {
      type: "multiple-choice",
      question: "Kolik je $\\lim_{n \\to \\infty} \\frac{2n^2}{5n^2 - 3}$?",
      choices: [
        { label: "$\\frac{2}{5}$", isCorrect: true, feedback: "Oba polynomy maji stupen 2 -- podil vedoucich koeficientu je $\\frac{2}{5}$." },
        { label: "$0$", isCorrect: false, feedback: "Limita je 0 jen kdyz je stupen citatele nizsi nez jmenovatele." },
        { label: "$\\infty$", isCorrect: false, feedback: "Oba maji stupen 2, takze limita je konecna." },
      ],
      explanation: "Stupen citatele = stupen jmenovatele = 2. Vedouci koeficienty: $2$ a $5$. Limita $= \\frac{2}{5}$.",
    },
    {
      type: "explore",
      prompt: "Vidite graf $y = x^2$ a secnu z bodu $x = 2$. To odpovida vyrazu $\\frac{x^2 - 4}{x - 2}$ blizko $x = 2$. Posouvejte $h$ k nule -- k jake hodnote se sklon blizi?",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: true,
          showTangent: false,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Sklon secny se blizi ke 4. To znamena $\\lim_{x \\to 2} \\frac{x^2 - 4}{x - 2} = 4$. Primo dosadit nelze (vyslo by $\\frac{0}{0}$), ale limita existuje!",
    },
    {
      type: "explain",
      body: "**Neurcity vyraz** $\\frac{0}{0}$ neznamena, ze limita neexistuje -- jen ze primo dosadit nestaci. Reseni: rozlozit a zkratit.\n\nPriklad: $\\frac{x^2 - 4}{x - 2} = \\frac{(x-2)(x+2)}{x-2} = x + 2$ pro $x \\neq 2$.\n\nPak $\\lim_{x \\to 2} (x + 2) = 4$.",
      callout: "Typ 0/0",
    },
    {
      type: "text-input",
      question: "Spocitejte $\\lim_{x \\to 3} \\frac{x^2 - 9}{x - 3}$.",
      expectedAnswer: "6",
      explanation: "$x^2 - 9 = (x - 3)(x + 3)$. Po zkraceni: $\\lim_{x \\to 3} (x + 3) = 6$.",
      hints: ["Rozlozte $x^2 - 9$ jako rozdil ctvercu."],
    },
    {
      type: "multiple-choice",
      question: "Jak typicky resime limitu tvaru $\\frac{0}{0}$?",
      choices: [
        { label: "Vysledek je vzdy 0", isCorrect: false, feedback: "$\\frac{0}{0}$ je neurcity vyraz -- vysledek zavisi na konkretni funkci." },
        { label: "Rozlozime a zkratime", isCorrect: true, feedback: "Presne! Rozkladem odstranime spolecny faktor, ktery zpusobuje nuly v citateli i jmenovateli." },
        { label: "Limita neexistuje", isCorrect: false, feedback: "Neurcity vyraz neznamena neexistenci limity -- je to signal, ze musime pracovat dal." },
      ],
      explanation: "Pri $\\frac{0}{0}$ rozlozime citatele i jmenovatele, zkratime spolecny faktor a pak dosadime.",
    },
    {
      type: "text-input",
      question: "Spocitejte $\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1}$.",
      expectedAnswer: "2",
      explanation: "$x^2 - 1 = (x - 1)(x + 1)$. Po zkraceni: $\\lim_{x \\to 1} (x + 1) = 2$.",
      hints: ["Opet rozdil ctvercu: $x^2 - 1 = (x-1)(x+1)$."],
    },
    {
      type: "sort-order",
      question: "Seradte kroky reseni limity $\\lim_{x \\to 4} \\frac{x - 4}{\\sqrt{x} - 2}$:",
      items: [
        "Dosadime $x = 4$ a zjistime neurcity vyraz $\\frac{0}{0}$",
        "Rozsirime zlomek sdruzenym vyrazem $\\frac{(\\sqrt{x}+2)}{(\\sqrt{x}+2)}$",
        "Citatel zjednodusime: $(x-4) = (\\sqrt{x}-2)(\\sqrt{x}+2)$",
        "Zkratime $(\\sqrt{x}-2)$ a dosadime $x = 4$",
        "Vysledek: $\\sqrt{4} + 2 = 4$",
      ],
      explanation: "Pri odmocnine ve jmenovateli nasobime sdruzenym vyrazem, cimz se zbavime odmocniny a muzeme zkratit.",
    },
    {
      type: "reveal",
      question: "Co je L'Hospitalovo pravidlo a kdy ho pouzijeme?",
      revealedContent: "Pokud $\\lim \\frac{f(x)}{g(x)}$ dava neurcity vyraz $\\frac{0}{0}$ nebo $\\frac{\\infty}{\\infty}$, pak:\n\n$$\\lim \\frac{f(x)}{g(x)} = \\lim \\frac{f'(x)}{g'(x)}$$\n\n(pokud prava strana existuje).\n\nPriklad: $\\lim_{x \\to 0} \\frac{\\sin x}{x} = \\lim_{x \\to 0} \\frac{\\cos x}{1} = 1$.\n\nPozor: pravidlo vyzaduje znalost derivaci -- naucite se je v dalsi lekci!",
    },
    {
      type: "text-input",
      question: "Spocitejte $\\lim_{n \\to \\infty} \\frac{n + 5}{3n - 1}$.",
      expectedAnswer: "1/3",
      acceptableAnswers: ["1/3", "0,33", "0.33"],
      explanation: "Oba polynomy maji stupen 1. Vedouci koeficienty: $1$ a $3$. Limita $= \\frac{1}{3}$.",
      hints: ["Pouzijte pravidlo o podilu vedoucich koeficientu."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Limita je hodnota, ke ktere se vyraz blizi, i kdyz ji nemusi dosahnout.",
      "Podil polynomu stejneho stupne: limita = podil vedoucich koeficientu.",
      "Neurcity vyraz $\\frac{0}{0}$ resime rozkladem a zkracenim.",
      "Pri odmocninach nasobime sdruzenym vyrazem.",
      "L'Hospitalovo pravidlo: $\\lim \\frac{f}{g} = \\lim \\frac{f'}{g'}$ pro neurcite vyrazy.",
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
