import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Integrály",
  steps: [
    {
      type: "multiple-choice",
      question: "Jaká je plocha pod grafem $f(x) = 2$ na intervalu $\\langle 0; 5 \\rangle$?",
      choices: [
        { label: "$10$", isCorrect: true, feedback: "Obdélník: $2 \\times 5 = 10$ ✓" },
        { label: "$7$", isCorrect: false, feedback: "Šířka je 5, výška je 2: $5 \\cdot 2 = 10$." },
        { label: "$2$", isCorrect: false, feedback: "To je jen výška, ne plocha." },
      ],
      explanation: "Plocha pod konstantní funkcí je obdélník. Integrál zobecňuje tento výpočet pro libovolné funkce.",
    },
    {
      type: "explain",
      body: "**Integrál** je opačná operace k derivaci (antiderivace).\n\n$$\\text{Derivace: } f(x) \\xrightarrow{\\text{derivuj}} f'(x)$$\n$$\\text{Integrál: } f'(x) \\xrightarrow{\\text{integruj}} f(x) + C$$\n\nKonstanta $C$ je potřeba, protože derivace konstanty je $0$.",
      callout: "Definice",
    },
    {
      type: "explain",
      body: "**Základní integrály**:\n\n| $f(x)$ | $\\int f(x)\\,dx$ |\n|---|---|\n| $x^n$ ($n \\neq -1$) | $\\frac{x^{n+1}}{n+1} + C$ |\n| $\\frac{1}{x}$ | $\\ln|x| + C$ |\n| $e^x$ | $e^x + C$ |\n| $\\sin x$ | $-\\cos x + C$ |\n| $\\cos x$ | $\\sin x + C$ |",
      callout: "Tabulka",
    },
    {
      type: "text-input",
      question: "Vypočítejte $\\int x^3\\,dx$. Jaký je koeficient u $x^4$? (jako zlomek)",
      expectedAnswer: "1/4",
      acceptableAnswers: ["1/4", "0,25", "0.25"],
      explanation: "$\\int x^3\\,dx = \\frac{x^4}{4} + C$. Koeficient je $\\frac{1}{4}$.",
      hints: ["$\\frac{x^{n+1}}{n+1}$ s $n = 3$."],
    },
    {
      type: "text-input",
      question: "Vypočítejte $\\int (6x^2 + 4x)\\,dx$. Zapište výsledek (bez $C$).",
      expectedAnswer: "2x^3 + 2x^2",
      acceptableAnswers: ["2x^3+2x^2", "2x^3 + 2x^2"],
      explanation: "$\\int 6x^2\\,dx + \\int 4x\\,dx = 2x^3 + 2x^2 + C$.",
    },
    {
      type: "multiple-choice",
      question: "$\\int e^x\\,dx = \\;?$",
      choices: [
        { label: "$xe^{x-1} + C$", isCorrect: false, feedback: "To je vzorec pro mocniny, ne pro $e^x$." },
        { label: "$e^x + C$", isCorrect: true, feedback: "Ano! $(e^x)' = e^x$, takže i integrál je $e^x$." },
        { label: "$\\ln x + C$", isCorrect: false, feedback: "$\\ln x$ je integrál $\\frac{1}{x}$, ne $e^x$." },
      ],
      explanation: "$e^x$ je svou vlastní derivací i integrálem (až na $+ C$).",
    },
    {
      type: "explain",
      body: "**Určitý integrál** = plocha pod grafem:\n\n$$\\int_a^b f(x)\\,dx = F(b) - F(a)$$\n\nkde $F(x)$ je primitivní funkce ($F' = f$). Toto je **Newtonův-Leibnizův vzorec**.",
      callout: "Určitý integrál",
    },
    {
      type: "text-input",
      question: "Spočítejte $\\int_0^3 2x\\,dx$.",
      expectedAnswer: "9",
      explanation: "$F(x) = x^2$. $F(3) - F(0) = 9 - 0 = 9$.",
      hints: ["Primitivní funkce k $2x$ je $x^2$."],
    },
    {
      type: "text-input",
      question: "Spočítejte $\\int_1^4 x^2\\,dx$.",
      expectedAnswer: "21",
      explanation: "$F(x) = \\frac{x^3}{3}$. $F(4) - F(1) = \\frac{64}{3} - \\frac{1}{3} = \\frac{63}{3} = 21$.",
      hints: ["$F(x) = \\frac{x^3}{3}$."],
    },
    {
      type: "sort-order",
      question: "Seřaďte kroky výpočtu $\\int_0^2 (3x^2 + 1)\\,dx$:",
      items: [
        "Primitivní funkce: $F(x) = x^3 + x$",
        "Horní mez: $F(2) = 8 + 2 = 10$",
        "Dolní mez: $F(0) = 0$",
        "Výsledek: $F(2) - F(0) = 10$",
      ],
      explanation: "Vždy: integrujeme → dosadíme meze → odečteme.",
    },
    {
      type: "explain",
      body: "**Geometrický význam**: určitý integrál počítá **obsah** plochy mezi grafem a osou $x$.\n\n- Nad osou $x$: kladný příspěvek\n- Pod osou $x$: záporný příspěvek\n\nPro celkovou plochu: $\\int_a^b |f(x)|\\,dx$.",
    },
    {
      type: "multiple-choice",
      question: "$\\int_0^{2\\pi} \\sin x\\,dx = \\;?$",
      choices: [
        { label: "$0$", isCorrect: true, feedback: "Kladná a záporná plocha se přesně vyruší." },
        { label: "$2$", isCorrect: false, feedback: "To je $\\int_0^\\pi \\sin x\\,dx$ (jen kladná část)." },
        { label: "$-2$", isCorrect: false, feedback: "Záporná část od $\\pi$ do $2\\pi$ dá $-2$, ale s kladnou se vyruší." },
      ],
      explanation: "$[-\\cos x]_0^{2\\pi} = -\\cos 2\\pi + \\cos 0 = -1 + 1 = 0$. Plochy se vyruší.",
    },
    {
      type: "reveal",
      question: "Proč integrál a derivace souvisí? (Základní věta kalkulu)",
      revealedContent: "**Základní věta kalkulu** říká, že integrování a derivování jsou inverzní operace:\n\n$$\\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)$$\n\nKumulative sčítáme a derivací měříme rychlost změny — a tyto operace se navzájem ruší. To je jeden z nejhlubších výsledků matematiky.",
    },
    {
      type: "text-input",
      question: "Plocha pod grafem $f(x) = x$ na $\\langle 0; 4 \\rangle$ je trojúhelník. Ověřte integrálem: $\\int_0^4 x\\,dx = \\;?$",
      expectedAnswer: "8",
      explanation: "$F(x) = \\frac{x^2}{2}$. $F(4) - F(0) = 8 - 0 = 8$.\n\nGeometricky: trojúhelník se základnou 4 a výškou 4: $S = \\frac{1}{2} \\cdot 4 \\cdot 4 = 8$ ✓",
    },
  ],
  summary: {
    keyTakeaways: [
      "Integrál je inverzní operace k derivaci: $\\int f'(x)\\,dx = f(x) + C$.",
      "$\\int x^n\\,dx = \\frac{x^{n+1}}{n+1} + C$ (pro $n \\neq -1$).",
      "Určitý integrál: $\\int_a^b f(x)\\,dx = F(b) - F(a)$.",
      "Geometrický význam: obsah plochy pod grafem.",
      "Integrál a derivace jsou inverzní (Základní věta kalkulu).",
    ],
  },
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "integrals",
  order: 1,
  title: "Integrály",
  lesson,
};
