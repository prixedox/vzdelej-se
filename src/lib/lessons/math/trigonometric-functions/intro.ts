import type { ChapterDefinition } from "@/types/chapter";
import type { Lesson } from "@/types/lesson";

const lesson: Lesson = {
  title: "Goniometrické funkce",
  narrative:
    "Starověcí astronomové potřebovali předpovídat pohyb hvězd a planet po obloze. Zjistili, že stačí znát poměry stran v pravoúhlém trojúhelníku — a tak se zrodily goniometrické funkce. Dnes je najdeme všude: od GPS navigace přes zvukové vlny až po počítačovou grafiku.",
  steps: [
    // 0 — Prediction
    {
      type: "prediction",
      scenario:
        "Na jednotkové kružnici se bod otáčí z úhlu $0°$ přes $90°$ až k $180°$. Sledujete jeho y-souřadnici (sinus).",
      question: "Jak se mění hodnota $\\sin \\alpha$ při přechodu přes $90°$?",
      options: [
        { label: "Stále roste až do $180°$", isCorrect: false },
        { label: "V $90°$ dosáhne maxima a pak klesá", isCorrect: true },
        { label: "V $90°$ klesne na nulu", isCorrect: false },
      ],
      reveal:
        "Sinus dosáhne maxima $\\sin 90° = 1$ a pak **klesá**. Na jednotkové kružnici je y-souřadnice nejvýš, když je bod na 'severním pólu' ($90°$). Poté se bod posouvá doleva a y-souřadnice klesá zpět k nule ($\\sin 180° = 0$).",
    },

    {
      type: "explore",
      prompt: "Táhněte bod po jednotkové kružnici. Sledujte barevné úsečky — červená je svislá, modrá vodorovná, zelená sahající k tečně. Co představují?",
      visual: {
        type: "interactive-unit-circle",
        props: {
          defaultAngleDeg: 45,
          showSin: true,
          showCos: true,
          showTan: true,
          showTriangle: true,
          showRadians: false,
        },
      },
      followUpQuestion: "Červená úsečka = sin (y-souřadnice bodu), modrá = cos (x-souřadnice), zelená = tangens.",
    },
    {
      type: "explain",
      body: "Na jednotkové kružnici (poloměr 1, střed v počátku) má bod pod úhlem $\\color{#e74c3c}{\\alpha}$ souřadnice $[\\cos \\color{#e74c3c}{\\alpha};\\, \\sin \\color{#e74c3c}{\\alpha}]$. Proto: **sinus = y-souřadnice**, **kosinus = x-souřadnice**.",
      callout: "Definice",
      misconception:
        "Studenti si často myslí, že sinus je 'protilehlá ku přeponě' jen v pravoúhlém trojúhelníku a nefunguje pro úhly větší než $90°$. Ve skutečnosti definice přes jednotkovou kružnici funguje pro jakýkoliv úhel — i záporný nebo větší než $360°$.",
    },
    {
      type: "explore",
      prompt: "Nastavte úhel postupně na 30, 45 a 60 stupňů. Zapište si hodnoty sin a cos — uvidíte je přímo na kružnici.",
      visual: {
        type: "interactive-unit-circle",
        props: {
          defaultAngleDeg: 30,
          showSin: true,
          showCos: true,
          showTan: false,
          showTriangle: true,
          showRadians: false,
        },
      },
    },
    {
      type: "text-input",
      question: "Kolik je $\\sin 30°$?",
      expectedAnswer: "1/2",
      acceptableAnswers: ["1/2", "0,5", "0.5"],
      explanation: "$\\sin 30° = \\frac{1}{2} = 0{,}5$. Na jednotkové kružnici je y-souřadnice bodu při úhlu 30 stupňů přesně $\\frac{1}{2}$.",
      hints: ["Podívejte se na y-souřadnici bodu na kružnici při 30 stupních."],
    },
    {
      type: "multiple-choice",
      question: "Ve kterém kvadrantu je $\\sin \\alpha > 0$ a zároveň $\\cos \\alpha < 0$?",
      choices: [
        { label: "I. kvadrant", isCorrect: false, feedback: "V I. kvadrantu jsou oba kladné." },
        { label: "II. kvadrant", isCorrect: true, feedback: "Správně! Bod je nad osou x (sin > 0) a vlevo od osy y (cos < 0)." },
        { label: "III. kvadrant", isCorrect: false, feedback: "Ve III. kvadrantu jsou oba záporné." },
        { label: "IV. kvadrant", isCorrect: false, feedback: "Ve IV. kvadrantu je sin < 0 a cos > 0." },
      ],
      explanation: "II. kvadrant: úhly mezi 90 a 180 stupni. Bod leží nad osou x (sin kladný) a vlevo od osy y (cos záporný).",
    },
    {
      type: "explore",
      prompt: "Sledujte graf funkce sinus. Jak se mění $\\sin x$ s rostoucím úhlem? Kolikrát se vzor zopakuje na intervalu 0 až 720 stupňů?",
      visual: {
        type: "interactive-function-graph",
        props: {
          functionType: "sine",
          showGrid: true,
          xMin: 0,
          xMax: 720,
          yMin: -1.5,
          yMax: 1.5,
        },
      },
      followUpQuestion: "Graf se opakuje dvakrát — perioda je 360 stupňů (neboli $2\\pi$ radiánů).",
    },
    {
      type: "explain",
      body: "**Perioda** je délka intervalu, po kterém se funkce opakuje. U $\\sin x$ a $\\cos x$ je perioda $2\\pi = 360°$.\n\n**Amplituda** je maximální výchylka od střední hodnoty. U základního sinu a kosinu je rovna 1.",
    },
    {
      type: "text-input",
      question: "Jaká je perioda funkce $\\sin x$ ve stupních?",
      expectedAnswer: "360",
      acceptableAnswers: ["360", "360°", "2pi", "2π"],
      explanation: "Perioda $\\sin x$ je $360°$ neboli $2\\pi$ radiánů. Po otočení o plný úhel se hodnoty opakují.",
    },
    {
      type: "reveal",
      question: "Proč platí $\\sin^2 x + \\cos^2 x = 1$ pro každý úhel?",
      revealedContent: "Bod na jednotkové kružnici má souřadnice $(\\cos x,\\, \\sin x)$ a leží na kružnici $x^2 + y^2 = 1$.\n\nDosadíme:\n\n$$\\color{#2980b9}{\\cos^2 x} + \\color{#e74c3c}{\\sin^2 x} = \\color{#27ae60}{1}$$\n\nJe to přímo **Pythagorova věta** aplikovaná na pravoúhlý trojúhelník v jednotkové kružnici.",
    },
    {
      type: "multiple-choice",
      question: "Kolik je $\\text{tg}\\,45°$?",
      choices: [
        { label: "$0$", isCorrect: false, feedback: "To je $\\text{tg}\\,0°$." },
        { label: "$1$", isCorrect: true, feedback: "Ano! $\\text{tg}\\,45° = \\frac{\\sin 45°}{\\cos 45°} = 1$." },
        { label: "$\\frac{\\sqrt{2}}{2}$", isCorrect: false, feedback: "To je $\\sin 45°$ nebo $\\cos 45°$, ne tangens." },
      ],
      explanation: "$\\text{tg}\\,45° = \\frac{\\sin 45°}{\\cos 45°} = \\frac{\\frac{\\sqrt{2}}{2}}{\\frac{\\sqrt{2}}{2}} = 1$.",
    },
    {
      type: "explore",
      prompt: "Zelená úsečka znázorňuje tangens. Pomalu posouvejte úhel směrem k 90 stupňům. Co se děje se zelenou úsečkou?",
      visual: {
        type: "interactive-unit-circle",
        props: {
          defaultAngleDeg: 70,
          showSin: false,
          showCos: false,
          showTan: true,
          showTriangle: true,
          showRadians: false,
        },
      },
      followUpQuestion: "Zelená úsečka roste nade všechny meze — tangens při 90 stupních neexistuje (dělíme nulou, protože $\\cos 90° = 0$).",
    },
    {
      type: "text-input",
      question: "Pro jaké úhly z intervalu $\\langle 0°; 360° \\rangle$ platí $\\sin x = 0$? Vypište všechny.",
      expectedAnswer: "0; 180; 360",
      acceptableAnswers: ["0, 180, 360", "0°, 180°, 360°", "k*180°", "k·180°", "0;180;360"],
      explanation: "$\\sin x = 0$ tam, kde bod na kružnici leží na ose x — to je při $0°$, $180°$ a $360°$.",
      hints: ["Kde na jednotkové kružnici má bod nulovou y-souřadnici?"],
    },
    {
      type: "text-input",
      question: "Jaká je perioda funkce $\\text{tg}\\,x$?",
      expectedAnswer: "180",
      acceptableAnswers: ["180", "180°", "pi", "π"],
      explanation: "Tangens se opakuje po $180°$ (neboli $\\pi$). Na rozdíl od sinu a kosinu, jejichž perioda je $360°$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Na jednotkové kružnici: $\\sin \\alpha$ = y-souřadnice, $\\cos \\alpha$ = x-souřadnice bodu.",
      "Základní identita: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.",
      "Perioda sinu a kosinu je $2\\pi = 360°$, perioda tangentu je $\\pi = 180°$.",
      "Důležité hodnoty: $\\sin 30° = \\frac{1}{2}$, $\\sin 45° = \\frac{\\sqrt{2}}{2}$, $\\sin 60° = \\frac{\\sqrt{3}}{2}$.",
      "Znaménka závisí na kvadrantu: II. kvadrant má sin > 0, cos < 0.",
    ],
  },
  nextTopicSuggestion: "absolutni-hodnota",
};

export const chapter: ChapterDefinition = {
  slug: "intro",
  topicSlug: "trigonometric-functions",
  order: 1,
  title: "Goniometrické funkce",
  lesson,
};
