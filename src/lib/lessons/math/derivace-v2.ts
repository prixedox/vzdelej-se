import type { LessonV2 } from "@/types/lesson-v2";

export const derivaceV2Beginner: LessonV2 = {
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
      question: "Auto jede po draze $s(t) = 3t^2$ (v metrech). Jaka je jeho rychlost v case $t = 2\\,\\text{s}$?",
      choices: [
        { label: "$6\\,\\text{m/s}$", isCorrect: false, feedback: "To by byla rychlost v $t = 1$. Zkuste dosadit $t = 2$." },
        { label: "$12\\,\\text{m/s}$", isCorrect: true, feedback: "Spravne! $s'(t) = 6t$, takze $s'(2) = 12\\,\\text{m/s}$." },
        { label: "$3\\,\\text{m/s}$", isCorrect: false, feedback: "To je jen koeficient ve vzorci, ne rychlost." },
      ],
      explanation: "Rychlost je derivace drahy podle casu: $v(t) = s'(t) = 6t$. Pro $t = 2$: $v = 12\\,\\text{m/s}$.",
    },
    {
      type: "explain",
      body: "Ale pozor -- rychlost znamena draha delena casem. Jenze v jedinem okamziku je casovy interval nulovy. Jak muzeme delit nulou?\n\nTrik je v tom, ze nedelime nulou primo. Misto toho sledujeme, co se deje, kdyz se casovy interval **blizi k nule**. Tomuto procesu se rika **limita** a jeho vysledek je **derivace**.",
      callout: "Zahadka",
    },
    {
      type: "explore",
      prompt: "Vidite krivku $y = x^2$ a secnu (primku pres dva body). Posouvejte $h$ smerem k nule a sledujte, co se deje se secnou.",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: true,
          showTangent: false,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Secna se postupne blizi k tecne -- primce, ktera se krivky dotyka v jedinem bode. Sklon teto tecny je okamzita rychlost zmeny, tedy derivace!",
    },
    {
      type: "explain",
      body: "**Derivace** $f'(x)$ je definovana jako limita:\n\n$$f'(\\color{#e74c3c}{x}) = \\lim_{\\color{#2980b9}{h} \\to 0} \\frac{f(\\color{#e74c3c}{x}+\\color{#2980b9}{h}) - f(\\color{#e74c3c}{x})}{\\color{#2980b9}{h}}$$\n\nTo je presne ten proces, ktery jste prave videli -- sklon secny se s $\\color{#2980b9}{h} \\to 0$ blizi ke sklonu tecny.",
      callout: "Definice",
      misconception:
        "Studenti si casto myslí, ze derivace je totéz co rozdíl $f(x+1) - f(x)$. Ve skutecnosti derivace je **limitní** hodnota podílu, kde se $h$ blízí k nule — nejde o konecný rozdíl, ale o okamzitou rychlost zmeny.",
    },
    {
      type: "explore",
      prompt: "Nyni je zobrazena tecna ke krivce $y = x^2$. Posouvejte bod po krivce a sledujte, jak se meni sklon tecny.",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^2",
          showSecant: false,
          showTangent: true,
          showDerivativeGraph: false,
        },
      },
      followUpQuestion: "Sklon roste s $x$ -- pro $x^2$ je derivace $2x$, takze v bode $x = 3$ je sklon 6.",
    },
    {
      type: "text-input",
      question: "Derivujte $f(x) = x^5$. Kolik je $f'(x)$?",
      expectedAnswer: "5x^4",
      acceptableAnswers: ["5x^4", "5*x^4", "5x⁴"],
      explanation: "Pouzijeme pravidlo $(x^n)' = nx^{n-1}$: $(x^5)' = 5x^4$.",
    },
    {
      type: "explain",
      body: "**Tabulka zakladnich derivaci**:\n\n| $f(x)$ | $f'(x)$ |\n|---|---|\n| $c$ (konstanta) | $0$ |\n| $\\color{#e74c3c}{x}^{\\color{#2980b9}{n}}$ | $\\color{#2980b9}{n}\\color{#e74c3c}{x}^{\\color{#2980b9}{n}-1}$ |\n| $\\sin x$ | $\\cos x$ |\n| $\\cos x$ | $-\\sin x$ |\n| $e^x$ | $e^x$ |\n| $\\ln x$ | $\\frac{1}{x}$ |\n\nDerivace souctu = soucet derivaci. Konstantu vytkneme: $(cf)' = c \\cdot f'$.",
      callout: "Zakladni derivace",
    },
    {
      type: "multiple-choice",
      question: "Kolik je derivace $e^x$?",
      choices: [
        { label: "$e^x$", isCorrect: true, feedback: "Spravne! Exponenciala $e^x$ je jedina funkce, ktera je svou vlastni derivaci." },
        { label: "$xe^{x-1}$", isCorrect: false, feedback: "To by platilo pro mocninnou funkci $x^n$, ale $e^x$ neni mocninna funkce v tomto smyslu." },
        { label: "$\\frac{1}{x}$", isCorrect: false, feedback: "To je derivace $\\ln x$, ne $e^x$." },
      ],
      explanation: "$e^x$ je jedina (az na nasobky) funkce, jejiz derivace je ona sama: $(e^x)' = e^x$.",
    },
    {
      type: "text-input",
      question: "Spocitejte derivaci: $f(x) = 3x^2 + 7x - 4$. Kolik je $f'(x)$?",
      expectedAnswer: "6x+7",
      acceptableAnswers: ["6x+7", "6x + 7", "6*x+7"],
      explanation: "$(3x^2)' = 6x$, $(7x)' = 7$, $(-4)' = 0$. Celkem $f'(x) = 6x + 7$.",
      hints: ["Derivujte kazdy clen zvlast. Konstanta ma derivaci 0."],
    },
    {
      type: "explore",
      prompt: "Sledujte graf $y = x^3$ (modra) a jeho derivaci (cervena). Kde je derivace nulova? Co v tom bode dela puvodni funkce?",
      visual: {
        type: "interactive-derivative",
        props: {
          functionExpr: "x^3",
          showSecant: false,
          showTangent: true,
          showDerivativeGraph: true,
        },
      },
      followUpQuestion: "Derivace $3x^2$ je nulova v $x = 0$ -- tam ma $x^3$ inflexni bod (meni se zakriveni). U jinych funkci $f'(x) = 0$ znaci maximum nebo minimum.",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^2 - 6x + 5$. V jakem bode ma minimum? (Najdete $x$, kde $f'(x) = 0$.)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "x=3", "x = 3"],
      explanation: "$f'(x) = 2x - 6 = 0 \\Rightarrow x = 3$. Protoze $f''(x) = 2 > 0$, jde skutecne o minimum.",
      hints: ["Spocitejte $f'(x)$ a polozate ji rovnu nule."],
    },
    {
      type: "reveal",
      question: "Jak sestavime rovnici tecny ke grafu funkce v danem bode?",
      revealedContent: "Tecna ke grafu $f$ v bode $a$ ma rovnici:\n\n$$y = f(a) + f'(a) \\cdot (x - a)$$\n\nPriklad: $f(x) = x^2$ v bode $a = 1$.\n- $f(1) = 1$, $f'(x) = 2x$, $f'(1) = 2$\n- Tecna: $y = 1 + 2(x - 1) = 2x - 1$",
    },
    {
      type: "text-input",
      question: "Funkce $f(x) = x^3$. Jaky je sklon tecny v bode $x = 2$? (Tj. kolik je $f'(2)$?)",
      expectedAnswer: "12",
      explanation: "$f'(x) = 3x^2$. Dosadime $x = 2$: $f'(2) = 3 \\cdot 4 = 12$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Derivace $f'(x)$ udava okamzitou rychlost zmeny funkce -- geometricky je to sklon tecny.",
      "Zakladni pravidlo: $(x^n)' = nx^{n-1}$.",
      "Derivace souctu je soucet derivaci, konstantu lze vytknout.",
      "Kde $f'(x) = 0$, tam funkce muze mit maximum, minimum nebo inflexni bod.",
      "Rovnice tecny: $y = f(a) + f'(a)(x - a)$.",
    ],
  },
  nextTopicSuggestion: "integraly",
};
