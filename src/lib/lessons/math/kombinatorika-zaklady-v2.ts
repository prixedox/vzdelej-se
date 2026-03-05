import type { LessonV2 } from "@/types/lesson-v2";

export const kombinatorikaZakladyV2Beginner: LessonV2 = {
  title: "Základy kombinatoriky",
  steps: [
    {
      type: "multiple-choice",
      question: "Kolika způsoby můžete seřadit 3 knihy na poličce?",
      choices: [
        { label: "$3$", isCorrect: false, feedback: "To je počet knih, ne uspořádání." },
        { label: "$6$", isCorrect: true, feedback: "$3! = 3 \\cdot 2 \\cdot 1 = 6$ ✓" },
        { label: "$9$", isCorrect: false, feedback: "To je $3^2$. Správně je $3! = 6$." },
      ],
      explanation: "Počet uspořádání $n$ prvků je $n!$ (faktoriál). $3! = 6$.",
    },
    {
      type: "explain",
      body: "**Faktoriál**: $n! = n \\cdot (n-1) \\cdot \\ldots \\cdot 2 \\cdot 1$\n\nPříklady: $4! = 24$, $5! = 120$, $0! = 1$ (konvence).\n\n**Permutace** = počet způsobů, jak seřadit $n$ prvků: $P(n) = n!$",
      callout: "Faktoriál a permutace",
    },
    {
      type: "text-input",
      question: "Kolik je $5!$?",
      expectedAnswer: "120",
      explanation: "$5! = 5 \\cdot 4 \\cdot 3 \\cdot 2 \\cdot 1 = 120$.",
    },
    {
      type: "explain",
      body: "**Variace** $V(n, k)$: kolik způsobů vybereme $k$ prvků z $n$ **se záleží na pořadí**.\n\n$$V(n, k) = \\frac{n!}{(n-k)!}$$\n\nPříklad: kolik dvojciferných čísel z číslic 1-5 (bez opakování)? $V(5, 2) = \\frac{5!}{3!} = 20$.",
      callout: "Variace",
    },
    {
      type: "text-input",
      question: "V závodě běží 8 závodníků. Kolika způsoby obsadí medailové pozice (1., 2., 3.)?",
      expectedAnswer: "336",
      explanation: "$V(8, 3) = 8 \\cdot 7 \\cdot 6 = 336$.",
      hints: ["$V(n, k) = n \\cdot (n-1) \\cdot \\ldots \\cdot (n-k+1)$."],
    },
    {
      type: "explain",
      body: "**Kombinace** $C(n, k) = \\binom{n}{k}$: výběr $k$ prvků z $n$, **nezáleží na pořadí**.\n\n$$\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$$\n\nPříklad: kolik trojic z 5 lidí? $\\binom{5}{3} = \\frac{5!}{3! \\cdot 2!} = 10$.",
      callout: "Kombinace",
    },
    {
      type: "multiple-choice",
      question: "V loterii vybíráte 6 čísel z 49. Na pořadí nezáleží. Jde o:",
      choices: [
        { label: "Permutaci", isCorrect: false, feedback: "Permutace řadí VŠECH $n$ prvků." },
        { label: "Variaci", isCorrect: false, feedback: "U variací záleží na pořadí." },
        { label: "Kombinaci", isCorrect: true, feedback: "Ano! Výběr bez ohledu na pořadí = kombinace." },
      ],
      explanation: "Loterie: $\\binom{49}{6} = 13\\,983\\,816$ kombinací.",
    },
    {
      type: "text-input",
      question: "Kolik je $\\binom{6}{2}$?",
      expectedAnswer: "15",
      explanation: "$\\binom{6}{2} = \\frac{6!}{2! \\cdot 4!} = \\frac{6 \\cdot 5}{2} = 15$.",
      hints: ["$\\frac{6 \\cdot 5}{2 \\cdot 1}$."],
    },
    {
      type: "sort-order",
      question: "Seřaďte pojmy od nejobecnějšího po nejspecifičtější:",
      items: [
        "Variace s opakováním: $n^k$",
        "Variace bez opakování: $\\frac{n!}{(n-k)!}$",
        "Kombinace: $\\binom{n}{k}$",
        "Permutace: $n!$ (= variace $n$ z $n$)",
      ],
      explanation: "Variace s opakováním > bez opakování > kombinace (odstraní pořadí). Permutace je speciální případ variace.",
    },
    {
      type: "reveal",
      question: "Proč je $\\binom{n}{k} = \\binom{n}{n-k}$?",
      revealedContent: "Vybrat $k$ prvků, které VEZMEME, je totéž jako vybrat $n - k$ prvků, které NECHÁME.\n\nPříklad: $\\binom{10}{3} = \\binom{10}{7} = 120$.\n\nToto je vidět i v Pascalově trojúhelníku, který je symetrický.",
    },
    {
      type: "multiple-choice",
      question: "PIN kód má 4 číslice (0-9), mohou se opakovat. Kolik PINů existuje?",
      choices: [
        { label: "$40$", isCorrect: false, feedback: "To je $4 \\cdot 10$." },
        { label: "$5040$", isCorrect: false, feedback: "To je $V(10, 4)$ bez opakování." },
        { label: "$10\\,000$", isCorrect: true, feedback: "$10^4 = 10\\,000$ — variace s opakováním." },
      ],
      explanation: "S opakováním: $n^k = 10^4 = 10\\,000$. Každá pozice má 10 možností.",
    },
    {
      type: "text-input",
      question: "Kolika způsoby si tým 10 hráčů zvolí kapitána a zástupce? (záleží na pořadí, bez opakování)",
      expectedAnswer: "90",
      explanation: "$V(10, 2) = 10 \\cdot 9 = 90$.",
    },
    {
      type: "text-input",
      question: "Z 10 hráčů vybereme 3 do výboru (nezáleží na pořadí). Kolik výborů existuje?",
      expectedAnswer: "120",
      explanation: "$\\binom{10}{3} = \\frac{10 \\cdot 9 \\cdot 8}{3!} = \\frac{720}{6} = 120$.",
      hints: ["$\\binom{10}{3} = \\frac{10!}{3! \\cdot 7!}$."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Faktoriál: $n! = n \\cdot (n-1) \\cdots 1$. Permutace $n$ prvků: $P(n) = n!$.",
      "Variace (záleží na pořadí): $V(n,k) = \\frac{n!}{(n-k)!}$.",
      "Kombinace (nezáleží na pořadí): $\\binom{n}{k} = \\frac{n!}{k!(n-k)!}$.",
      "S opakováním: $n^k$.",
      "Klíčová otázka: záleží na pořadí?",
    ],
  },
  nextTopicSuggestion: "pravdepodobnost",
};
