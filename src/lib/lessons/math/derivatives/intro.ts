import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Derivace",
  narrative:
    "Jak rychle roste populace bakterií? Jak prudce klesá teplota kávy? Jak se mění rychlost padajícího parašutisty? Všechny tyto otázky spojuje jedno: potřebujeme měřit rychlost změny v konkrétním okamžiku. Právě k tomu slouží derivace — nástroj, který nezávisle na sobě vynalezli Newton i Leibniz v 17. století.",
  steps: [
    // 0 — Prediction
    {
      type: "prediction",
      scenario:
        "Funkce $f(x) = x^2$ má v bodě $x = 3$ hodnotu $f(3) = 9$. Nakreslíte tečnu ke grafu v tomto bodě.",
      question: "Jaký bude sklon (směrnice) této tečny?",
      options: [
        { label: "$3$ — stejný jako souřadnice $x$", isCorrect: false },
        { label: "$6$ — dvojnásobek souřadnice $x$", isCorrect: true },
        { label: "$9$ — stejný jako hodnota funkce", isCorrect: false },
      ],
      reveal:
        "Sklon tečny je derivace $f'(x) = 2x$. V bodě $x = 3$ je sklon $f'(3) = 2 \\cdot 3 = 6$. Derivace $x^2$ je $2x$ — sklon roste lineárně s $x$, ne jako funkce sama.",
    },

    {
      type: "multiple-choice",
      question: "Auto jede po dráze $s(t) = 3t^2$ (v metrech). Jaká je jeho rychlost v čase $t = 2\\,\\text{s}$?",
      choices: [
        { label: "$6\\,\\text{m/s}$", isCorrect: false, feedback: "To by byla rychlost v $t = 1$. Zkuste dosadit $t = 2$." },
        { label: "$12\\,\\text{m/s}$", isCorrect: true, feedback: "Správně! $s'(t) = 6t$, takže $s'(2) = 12\\,\\text{m/s}$." },
        { label: "$3\\,\\text{m/s}$", isCorrect: false, feedback: "To je jen koeficient ve vzorci, ne rychlost." },
      ],
      explanation: "Rychlost je derivace dráhy podle času: $v(t) = s'(t) = 6t$. Pro $t = 2$: $v = 12\\,\\text{m/s}$.",
    },
    {
      type: "explain",
      body: "Ale pozor — rychlost znamená dráha dělená časem. Jenže v jediném okamžiku je časový interval nulový. Jak můžeme dělit nulou?\n\nTrik je v tom, že nedělíme nulou přímo. Místo toho sledujeme, co se děje, když se časový interval **blíží k nule**. Tomuto procesu se říká **limita** a jeho výsledek je **derivace**.",
      callout: "Záhadka",
    },
    {
      type: "explore",
      prompt: "Vidíte křivku $y = x^2$ a sečnu (přímku přes dva body). Posouvejte $h$ směrem k nule a sledujte, co se děje se sečnou.",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: true,
          showTangent: false,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Sečna se postupně blíží k tečně — přímce, která se křivky dotýká v jediném bodě. Sklon této tečny je okamžitá rychlost změny, tedy derivace!",
    },
    {
      type: "explain",
      body: "**Derivace** $f'(x)$ je definována jako limita:\n\n$$f'(\\color{#e74c3c}{x}) = \\lim_{\\color{#2980b9}{h} \\to 0} \\frac{f(\\color{#e74c3c}{x}+\\color{#2980b9}{h}) - f(\\color{#e74c3c}{x})}{\\color{#2980b9}{h}}$$\n\nTo je přesně ten proces, který jste právě viděli — sklon sečny se s $\\color{#2980b9}{h} \\to 0$ blíží ke sklonu tečny.",
      callout: "Definice",
      misconception:
        "Studenti si často myslí, že derivace je totéž co rozdíl $f(x+1) - f(x)$. Ve skutečnosti je derivace **limitní** hodnota podílu, kde se $h$ blíží k nule — nejde o konečný rozdíl, ale o okamžitou rychlost změny.",
    },
    {
      type: "explore",
      prompt: "Nyní je zobrazena tečna ke křivce $y = x^2$. Posouvejte bod po křivce a sledujte, jak se mění sklon tečny.",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: false,
          showTangent: true,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Sklon roste s $x$ — pro $x^2$ je derivace $2x$, takže v bodě $x = 3$ je sklon 6.",
    },
    {
      type: "text-input",
      question: "Derivujte $f(x) = x^5$. Kolik je $f'(x)$?",
      expectedAnswer: "5x^4",
      acceptableAnswers: ["5x^4", "5*x^4", "5x⁴"],
      explanation: "Použijeme pravidlo $(x^n)' = nx^{n-1}$: $(x^5)' = 5x^4$.",
    },
    {
      type: "explain",
      body: "**Tabulka základních derivací**:\n\n| $f(x)$ | $f'(x)$ |\n|---|---|\n| $c$ (konstanta) | $0$ |\n| $\\color{#e74c3c}{x}^{\\color{#2980b9}{n}}$ | $\\color{#2980b9}{n}\\color{#e74c3c}{x}^{\\color{#2980b9}{n}-1}$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $e^x$ | $e^x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |\n\nDerivace součtu = součet derivací. Konstantu vytkneme: $(cf)' = c \\cdot f'$.",
      callout: "Základní derivace",
    },
    {
      type: "multiple-choice",
      question: "Kolik je derivace $e^x$?",
      choices: [
        { label: "$e^x$", isCorrect: true, feedback: "Správně! Exponenciála $e^x$ je jediná funkce, která je svou vlastní derivací." },
        { label: "$xe^{x-1}$", isCorrect: false, feedback: "To by platilo pro mocninnou funkci $x^n$, ale $e^x$ není mocninná funkce v tomto smyslu." },
        { label: "$\\frac{1}{x}$", isCorrect: false, feedback: "To je derivace $\\ln x$, ne $e^x$." },
      ],
      explanation: "$e^x$ je jediná (až na násobky) funkce, jejíž derivace je ona sama: $(e^x)' = e^x$.",
    },
    {
      type: "text-input",
      question: "Spočítejte derivaci: $f(x) = 3x^2 + 7x - 4$. Kolik je $f'(x)$?",
      expectedAnswer: "6x+7",
      acceptableAnswers: ["6x+7", "6x + 7", "6*x+7"],
      explanation: "$(3x^2)' = 6x$, $(7x)' = 7$, $(-4)' = 0$. Celkem $f'(x) = 6x + 7$.",
      hints: ["Derivujte každý člen zvlášť. Konstanta má derivaci 0."],
    },
    {
      type: "explore",
      prompt: "Sledujte graf $y = x^3$ (modrá) a jeho derivaci (červená). Kde je derivace nulová? Co v tom bodě dělá původní funkce?",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^3",
          showSecant: false,
          showTangent: true,
          showDerivativeGraph: true,
        },
      },
      followUpQuestion: "Derivace $3x^2$ je nulová v $x = 0$ — tam má $x^3$ inflexní bod (mění se zakřivení). U jiných funkcí $f'(x) = 0$ značí maximum nebo minimum.",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^2 - 6x + 5$. V jakém bodě má minimum? (Najděte $x$, kde $f'(x) = 0$.)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "x=3", "x = 3"],
      explanation: "$f'(x) = 2x - 6 = 0 \\Rightarrow x = 3$. Protože $f''(x) = 2 > 0$, jde skutečně o minimum.",
      hints: ["Spočítejte $f'(x)$ a položte ji rovnu nule."],
    },
    {
      type: "reveal",
      question: "Jak sestavíme rovnici tečny ke grafu funkce v daném bodě?",
      revealedContent: "Tečna ke grafu $f$ v bodě $a$ má rovnici:\n\n$$y = f(a) + f'(a) \\cdot (x - a)$$\n\nPříklad: $f(x) = x^2$ v bodě $a = 1$.\n- $f(1) = 1$, $f'(x) = 2x$, $f'(1) = 2$\n- Tečna: $y = 1 + 2(x - 1) = 2x - 1$",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^3$. Jaký je sklon tečny v bodě $x = 2$? (Tj. kolik je $f'(2)$?)",
      expectedAnswer: "12",
      explanation: "$f'(x) = 3x^2$. Dosadíme $x = 2$: $f'(2) = 3 \\cdot 4 = 12$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Derivace $f'(x)$ udává okamžitou rychlost změny funkce — geometricky je to sklon tečny.",
      "Základní pravidlo: $(x^n)' = nx^{n-1}$.",
      "Derivace součtu je součet derivací, konstantu lze vytknout.",
      "Kde $f'(x) = 0$, tam funkce může mít maximum, minimum nebo inflexní bod.",
      "Rovnice tečny: $y = f(a) + f'(a)(x - a)$.",
    ],
  },
  nextTopicSuggestion: "integraly",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "derivatives",
  order: 1,
  title: "Derivace",
  lesson,
};
