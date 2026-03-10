import type { LessonV2 } from "@/types/lesson-v2";

export const goniometrickeFunkceV2Beginner: LessonV2 = {
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
      prompt: "Tahejte bod po jednotkove kruznici. Sledujte barevne usecky -- cervena je svisle, modra vodorovna, zelena sahajici k tecne. Co predstavuji?",
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
      followUpQuestion: "Cervena usecka = sin (y-souradnice bodu), modra = cos (x-souradnice), zelena = tangens.",
    },
    {
      type: "explain",
      body: "Na jednotkove kruznici (polomer 1, stred v pocatku) ma bod pod uhlem $\\color{#e74c3c}{\\alpha}$ souradnice $[\\cos \\color{#e74c3c}{\\alpha};\\, \\sin \\color{#e74c3c}{\\alpha}]$. Proto: **sinus = y-souradnice**, **kosinus = x-souradnice**.",
      callout: "Definice",
      misconception:
        "Studenti si často myslí, že sinus je 'protilehlá ku přeponě' jen v pravoúhlém trojúhelníku a nefunguje pro úhly větší než $90°$. Ve skutečnosti definice přes jednotkovou kružnici funguje pro jakýkoliv úhel — i záporný nebo větší než $360°$.",
    },
    {
      type: "explore",
      prompt: "Nastavte uhel postupne na 30, 45 a 60 stupnu. Zapiste si hodnoty sin a cos -- uvidite je primo na kruznici.",
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
      explanation: "$\\sin 30° = \\frac{1}{2} = 0{,}5$. Na jednotkove kruznici je y-souradnice bodu pri uhlu 30 stupnu presne $\\frac{1}{2}$.",
      hints: ["Podivejte se na y-souradnici bodu na kruznici pri 30 stupnich."],
    },
    {
      type: "multiple-choice",
      question: "V kterem kvadrantu je $\\sin \\alpha > 0$ a zaroven $\\cos \\alpha < 0$?",
      choices: [
        { label: "I. kvadrant", isCorrect: false, feedback: "V I. kvadrantu jsou oba kladne." },
        { label: "II. kvadrant", isCorrect: true, feedback: "Spravne! Bod je nad osou x (sin > 0) a vlevo od osy y (cos < 0)." },
        { label: "III. kvadrant", isCorrect: false, feedback: "Ve III. kvadrantu jsou oba zaporne." },
        { label: "IV. kvadrant", isCorrect: false, feedback: "Ve IV. kvadrantu je sin < 0 a cos > 0." },
      ],
      explanation: "II. kvadrant: uhly mezi 90 a 180 stupni. Bod lezi nad osou x (sin kladny) a vlevo od osy y (cos zaporny).",
    },
    {
      type: "explore",
      prompt: "Sledujte graf funkce sinus. Jak se meni $\\sin x$ s rostoucim uhlem? Kolikrat se vzor zopakuje na intervalu 0 az 720 stupnu?",
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
      followUpQuestion: "Graf se opakuje dvakrat -- perioda je 360 stupnu (neboli $2\\pi$ radianu).",
    },
    {
      type: "explain",
      body: "**Perioda** je delka intervalu, po kterem se funkce opakuje. U $\\sin x$ a $\\cos x$ je perioda $2\\pi = 360°$.\n\n**Amplituda** je maximalni vychylka od stredni hodnoty. U zakladniho sinu a kosinu je rovna 1.",
    },
    {
      type: "text-input",
      question: "Jaka je perioda funkce $\\sin x$ ve stupnich?",
      expectedAnswer: "360",
      acceptableAnswers: ["360", "360°", "2pi", "2π"],
      explanation: "Perioda $\\sin x$ je $360°$ neboli $2\\pi$ radianu. Po otoceni o plny uhel se hodnoty opakuji.",
    },
    {
      type: "reveal",
      question: "Proc plati $\\sin^2 x + \\cos^2 x = 1$ pro kazdy uhel?",
      revealedContent: "Bod na jednotkove kruznici ma souradnice $(\\cos x,\\, \\sin x)$ a lezi na kruznici $x^2 + y^2 = 1$.\n\nDosadime:\n\n$$\\color{#2980b9}{\\cos^2 x} + \\color{#e74c3c}{\\sin^2 x} = \\color{#27ae60}{1}$$\n\nJe to primo **Pythagorova veta** aplikovana na pravouhly trojuhelnik v jednotkove kruznici.",
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
      prompt: "Zelena usecka znazornuje tangens. Pomalu posouvejte uhel smerem k 90 stupnum. Co se deje se zelenou useckou?",
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
      followUpQuestion: "Zelena usecka roste nade vsechny meze -- tangens pri 90 stupnich neexistuje (delime nulou, protoze $\\cos 90° = 0$).",
    },
    {
      type: "text-input",
      question: "Pro jake uhly z intervalu $\\langle 0°; 360° \\rangle$ plati $\\sin x = 0$? Vypiste vsechny.",
      expectedAnswer: "0; 180; 360",
      acceptableAnswers: ["0, 180, 360", "0°, 180°, 360°", "k*180°", "k·180°", "0;180;360"],
      explanation: "$\\sin x = 0$ tam, kde bod na kruznici lezi na ose x -- to je pri $0°$, $180°$ a $360°$.",
      hints: ["Kde na jednotkove kruznici ma bod nulovou y-souradnici?"],
    },
    {
      type: "text-input",
      question: "Jaka je perioda funkce $\\text{tg}\\,x$?",
      expectedAnswer: "180",
      acceptableAnswers: ["180", "180°", "pi", "π"],
      explanation: "Tangens se opakuje po $180°$ (neboli $\\pi$). Na rozdil od sinu a kosinu, jejichz perioda je $360°$.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Na jednotkove kruznici: $\\sin \\alpha$ = y-souradnice, $\\cos \\alpha$ = x-souradnice bodu.",
      "Zakladni identita: $\\sin^2 \\alpha + \\cos^2 \\alpha = 1$.",
      "Perioda sinu a kosinu je $2\\pi = 360°$, perioda tangentu je $\\pi = 180°$.",
      "Dulezite hodnoty: $\\sin 30° = \\frac{1}{2}$, $\\sin 45° = \\frac{\\sqrt{2}}{2}$, $\\sin 60° = \\frac{\\sqrt{3}}{2}$.",
      "Znamenka zavisi na kvadrantu: II. kvadrant ma sin > 0, cos < 0.",
    ],
  },
  nextTopicSuggestion: "absolutni-hodnota",
};
