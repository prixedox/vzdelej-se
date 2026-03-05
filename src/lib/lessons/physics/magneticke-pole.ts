import type { LessonContent } from "@/types/lesson";

export const magnetickePoleBeginner: LessonContent = {
  conceptExplanation: {
    title: "Magneticke pole — zaklady magnetismu",
    sections: [
      {
        heading: "Co je magneticke pole",
        body: `Kazdý magnet ma dva **poly** — severní (N) a jizni (S). Magneticke pole je prostor kolem magnetu, ve kterem pusobi magneticka sila.

**Zakladni pravidla:**
- **Souhlasnne poly** (N–N, S–S) se **odpuzuji**
- **Nesouhlasne poly** (N–S) se **pritahuji**
- Magneticke silocary vychazi ze **severniho** polu a vstupuji do **jizniho**

$$\\text{N} \\xrightarrow{\\text{silocary}} \\text{S}$$

Země sama je obrovský magnet — jeji magneticke pole chrání Zemi pred slunecnim vetrem (nabitymi casticemi).

> [!key] Magneticke pole je neoddelitelne spojeno s **elektrickym proudem** — pohybujici se naboje vytvareji magneticke pole a magneticke pole pusobi silou na pohybujici se naboje.

> [!info] Na rozdil od elektrickych naboju neexistuji izolované magneticke poly (monopoly). Kazdý magnet ma vzdy N i S pol — kdyz magnet rozlomite, vzniknou dva mensi magnety, kazdy se dvema poly.`,
      },
      {
        heading: "Magneticke pole vodice s proudem",
        body: `Kdyz vodičem proteka elektricky proud, kolem vodice vznikne magneticke pole. Toto objevil Hans Christian Oersted v roce 1820.

**Přimy vodic** — silocary tvori soustrednne kruznice kolem vodice:

$$\\boxed{B = \\frac{\\mu_0 I}{2\\pi r}}$$

- $B$ — magneticka indukce (tesla, T)
- $\\mu_0 = 4\\pi \\times 10^{-7} \\text{ T}\\cdot\\text{m/A}$ — permeabilita vakua
- $I$ — proud ve vodici (A)
- $r$ — vzdalenost od vodice (m)

**Smer pole** urcime **pravidlem prave ruky**: palec ukazuje smer proudu, prsty se staceje ve smeru silocar.

**Solenoid (civka)** — uvnitr vznikne homogenni pole:

$$\\boxed{B = \\mu_0 n I}$$

kde $n = N/l$ je pocet zavitu na jednotku delky.

> [!tip] Solenoid se chova jako tycovy magnet — jeden konec je N pol, druhy S pol. Smer urcite opet pravidlem prave ruky (prsty ve smeru proudu v zavitech, palec ukazuje k N polu).`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "ohm",
            defaultVoltage: 6,
            defaultR1: 50,
            defaultR2: 0,
            showPower: false,
            showCurrent: true,
          },
          caption: "Proud tekouci vodicem vytvari magneticke pole — zvyste napeti a sledujte, jak roste proud (a tedy i magneticke pole kolem vodice).",
        },
        examples: [
          {
            problem: "Vodičem tece proud $I = 10$ A. Jaka je magneticka indukce ve vzdalenosti $r = 5$ cm od vodice?",
            solution: `$$B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{4\\pi \\times 10^{-7} \\cdot 10}{2\\pi \\cdot 0{,}05} = \\frac{4 \\times 10^{-6}}{0{,}1} = \\color{#16a34a}{4 \\times 10^{-5} \\text{ T} = 40 \\text{ }\\mu\\text{T}}$$
To je srovnatelne s magnetickym polem Zeme ($\\approx 50 \\text{ }\\mu\\text{T}$).`,
          },
        ],
      },
      {
        heading: "Sila na vodic v magnetickem poli",
        body: `Kdyz do magnetickeho pole vlozime vodic s proudem, pusobi na nej sila:

$$\\boxed{F = B I l \\sin\\alpha}$$

- $F$ — sila na vodic (N)
- $B$ — magneticka indukce (T)
- $I$ — proud ve vodici (A)
- $l$ — delka vodice v poli (m)
- $\\alpha$ — uhel mezi vodicem a smerem pole

Specialni pripady:
- $\\alpha = 90°$: $F = BIl$ (maximalni sila)
- $\\alpha = 0°$: $F = 0$ (vodic rovnobezny s polem)

**Smer sily** urcime **pravidlem leve ruky** (nebo vektorovym soucinem $\\vec{F} = I\\vec{l} \\times \\vec{B}$):
- Prsty ve smeru proudu, ohnete je ke smeru $\\vec{B}$, palec ukaze smer sily

> [!key] Toto je princip **elektromotoru** — proud v civce umistene v magnetickem poli zpusobi otaceni civky. Smer otaceni lze zmenit prepolarizovanim proudu.`,
      },
      {
        heading: "Magneticka indukce a magneticky tok",
        body: `**Magneticka indukce** $B$ (tesla) je vektorova velicina, ktera popisuje silove pusobeni magnetickeho pole:

$$\\begin{array}{l|c} \\text{Zdroj} & B \\text{ (T)} \\\\ \\hline \\text{Magneticke pole Zeme} & 5 \\times 10^{-5} \\\\ \\text{Tycovy magnet} & 0{,}01 \\\\ \\text{Reproduktor} & 1 \\\\ \\text{MRI scanner} & 1{,}5 - 3 \\\\ \\text{Nejsilnejsi laboratorni} & 45 \\end{array}$$

**Magneticky tok** $\\Phi$ (weber, Wb) je "celkovy pocet silocar" prochazejicich plochou:

$$\\boxed{\\Phi = B \\cdot A \\cdot \\cos\\alpha}$$

- $A$ — obsah plochy (m$^2$)
- $\\alpha$ — uhel mezi $\\vec{B}$ a normalou plochy

> [!info] Analogie s elektrickym polem: magneticka indukce $B$ je analogicka intenzite elektrickeho pole $E$, magneticky tok $\\Phi$ je analogicky elektrickemu toku. Silocary $B$ vsak tvori uzavrene smycky (nemaji zdroj ani svod).`,
        visual: {
          type: "interactive-electric-field",
          props: {
            defaultQ1: 5,
            defaultQ2: -5,
            defaultDistance: 3,
            showFieldLines: true,
            showForce: false,
            mode: "field",
          },
          caption: "Silocary elektrickeho pole dipolu pripominaji silocary magnetickeho pole tycoveho magnetu — N pol odpovida kladnemu naboji, S pol zapornemu.",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Solenoid ma $N = 500$ zavitu a delku $l = 25$ cm. Proteka jim proud $I = 2$ A. a) Jaka je magneticka indukce uvnitr solenoidu? b) Vodic dlouhy $10$ cm s proudem $3$ A je umisten kolmo na pole solenoidu. Jaka sila na nej pusobi?`,
    steps: [
      {
        instruction: "Spocitejte hustotu zavitu solenoidu",
        math: "$n = \\frac{N}{l} = \\frac{500}{0{,}25} = 2000 \\text{ zavitu/m}$",
        explanation: "Prevadime delku na metry: $25$ cm $= 0{,}25$ m.",
      },
      {
        instruction: "Vypocitejte magnetickou indukci uvnitr solenoidu",
        math: "$B = \\mu_0 n I = 4\\pi \\times 10^{-7} \\cdot 2000 \\cdot 2 = 4\\pi \\times 10^{-7} \\cdot 4000$",
        explanation: "Pouzijeme vzorec pro solenoid.",
      },
      {
        instruction: "Dopocitejte B",
        math: "$B = 16\\pi \\times 10^{-4} \\approx 5{,}03 \\times 10^{-3} \\text{ T} \\approx 5 \\text{ mT}$",
        explanation: "Pomerne silne pole — ekvivalent slabsiho permanentniho magnetu.",
      },
      {
        instruction: "Vypocitejte silu na vodic ($\\alpha = 90°$)",
        math: "$F = BIl\\sin 90° = 5{,}03 \\times 10^{-3} \\cdot 3 \\cdot 0{,}1 \\cdot 1 = 1{,}51 \\times 10^{-3} \\text{ N}$",
        explanation: "Pro kolmy vodic je $\\sin 90° = 1$, takze $F = BIl$.",
      },
    ],
    finalAnswer: "Magneticka indukce uvnitr solenoidu je $B \\approx 5$ mT. Sila na vodic je $F \\approx 1{,}5$ mN.",
  },
  practiceProblems: [
    {
      id: "mp-b-1",
      problemStatement: "Primym vodicem tece proud $I = 20$ A. Jaka je magneticka indukce ve vzdalenosti $r = 10$ cm od vodice? ($\\mu_0 = 4\\pi \\times 10^{-7}$)",
      expectedAnswer: "0.00004",
      acceptableAnswers: ["0.00004", "4e-5", "40 uT", "40 mikrotesla"],
      numericTolerance: 0.000005,
      hints: [
        "$B = \\frac{\\mu_0 I}{2\\pi r}$",
        "$B = \\frac{4\\pi \\times 10^{-7} \\cdot 20}{2\\pi \\cdot 0{,}1}$",
      ],
      solutionExplanation: `$$B = \\frac{\\mu_0 I}{2\\pi r} = \\frac{4\\pi \\times 10^{-7} \\cdot 20}{2\\pi \\cdot 0{,}1} = \\frac{8\\pi \\times 10^{-6}}{0{,}2\\pi} = 4 \\times 10^{-5} \\text{ T} = 40 \\text{ }\\mu\\text{T}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-b-2",
      problemStatement: "Solenoid ma $1000$ zavitu na delce $50$ cm. Proud je $I = 4$ A. Jaka je magneticka indukce uvnitr?",
      expectedAnswer: "0.01",
      acceptableAnswers: ["0.01", "0.01 T", "10 mT", "0,01", "0,01 T"],
      numericTolerance: 0.001,
      hints: [
        "$n = N/l = 1000/0{,}5 = 2000$ zavitu/m.",
        "$B = \\mu_0 n I = 4\\pi \\times 10^{-7} \\cdot 2000 \\cdot 4$",
      ],
      solutionExplanation: `$$n = \\frac{1000}{0{,}5} = 2000 \\text{ m}^{-1}$$
$$B = \\mu_0 n I = 4\\pi \\times 10^{-7} \\cdot 2000 \\cdot 4 = 32\\pi \\times 10^{-4} \\approx 0{,}01 \\text{ T} = 10 \\text{ mT}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mp-b-3",
      problemStatement: "Vodic dlouhy $l = 20$ cm s proudem $I = 5$ A je umisten kolmo na homogenni magneticke pole $B = 0{,}3$ T. Jaka sila na nej pusobi?",
      expectedAnswer: "0.3",
      acceptableAnswers: ["0.3", "0,3", "0.3 N", "0,3 N", "300 mN"],
      numericTolerance: 0.01,
      hints: [
        "$F = BIl\\sin\\alpha$, pro kolmy vodic $\\alpha = 90°$.",
        "$F = 0{,}3 \\cdot 5 \\cdot 0{,}2 \\cdot 1$",
      ],
      solutionExplanation: `$$F = BIl\\sin 90° = 0{,}3 \\cdot 5 \\cdot 0{,}2 \\cdot 1 = 0{,}3 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-b-4",
      problemStatement: "Homogenni magneticke pole $B = 0{,}5$ T prochazi plochou $A = 0{,}04$ m$^2$ pod uhlem $60°$ k normale plochy. Jaky je magneticky tok?",
      expectedAnswer: "0.01",
      acceptableAnswers: ["0.01", "0,01", "0.01 Wb", "0,01 Wb", "10 mWb"],
      numericTolerance: 0.001,
      hints: [
        "$\\Phi = BA\\cos\\alpha$",
        "$\\Phi = 0{,}5 \\cdot 0{,}04 \\cdot \\cos 60° = 0{,}5 \\cdot 0{,}04 \\cdot 0{,}5$",
      ],
      solutionExplanation: `$$\\Phi = BA\\cos\\alpha = 0{,}5 \\cdot 0{,}04 \\cdot \\cos 60° = 0{,}02 \\cdot 0{,}5 = 0{,}01 \\text{ Wb}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mp-b-5",
      problemStatement: "Jaky smer maji magneticke silocary kolem primeho vodice s proudem tekoucim nahoru (smerem od vas)?",
      expectedAnswer: "proti smeru hodinovych rucicek",
      acceptableAnswers: [
        "proti smeru hodinovych rucicek",
        "doleva",
        "counterclockwise",
        "CCW",
        "proti smeru hodinových ručiček",
      ],
      hints: [
        "Pouzijte pravidlo prave ruky.",
        "Palec prave ruky ukazuje smer proudu (nahoru), prsty se staceji ve smeru silocar.",
      ],
      solutionExplanation: `Podle **pravidla prave ruky**: palec ukazuje smer proudu (nahoru/od vas), prsty se staceji **proti smeru hodinovych rucicek** (pri pohledu zepředu). Silocary tvori kruznice kolem vodice v tomto smeru.`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Magneticke pole** vznika kolem magnetu i kolem vodice s proudem — pohybujici se naboje vytvareji magneticke pole.",
      "**Primy vodic**: $B = \\mu_0 I / (2\\pi r)$ — pole klesa se vzdalenosti, silocary jsou kruznice.",
      "**Solenoid**: $B = \\mu_0 n I$ — homogenni pole uvnitr, zvenku pripomina tycovy magnet.",
      "**Sila na vodic**: $F = BIl\\sin\\alpha$ — princip elektromotoru.",
      "**Magneticky tok**: $\\Phi = BA\\cos\\alpha$ — analogie s elektrickym tokem.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na elektromagnetickou indukci — objevte, jak zmena magnetickeho pole vytvari elektricky proud.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Faraday, Lenz, induktance, Lorentzova sila
// ═══════════════════════════════════════════════════════════════;

export const magnetickePoleIntermediate: LessonContent = {
  conceptExplanation: {
    title: "Magneticke pole — elektromagneticka indukce a Lorentzova sila",
    sections: [
      {
        heading: "Elektromagneticka indukce",
        body: `Michael Faraday v roce 1831 objevil, ze **zmena magnetickeho toku** induktuje elektromotorické napeti (EMF):

$$\\boxed{\\varepsilon = -\\frac{d\\Phi}{dt} = -N\\frac{\\Delta\\Phi}{\\Delta t}}$$

Toto je **Faradayuv zakon elektromagneticke indukce**.

- $\\varepsilon$ — indukovane napeti (V)
- $N$ — pocet zavitu civky
- $\\Delta\\Phi / \\Delta t$ — rychlost zmeny magnetickeho toku

**Lenzuv zakon** (zaporne znamenko): Indukovany proud vytvari magneticke pole, ktere **se stavi proti zmene**, ktera ho vyvolala.

Zpusoby, jak zmenit $\\Phi = BA\\cos\\alpha$:
1. Zmena $B$ (priblizeni/oddaleni magnetu)
2. Zmena $A$ (zmena plochy smycky)
3. Zmena $\\alpha$ (otaceni smycky)
4. Kombinace

> [!key] Lenzuv zakon je dusledkem zakona zachovani energie — kdyby indukovany proud zmenu zesiloval, ziskavali bychom energii z niceho!`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "ohm",
            defaultVoltage: 10,
            defaultR1: 100,
            defaultR2: 0,
            showPower: false,
            showCurrent: true,
          },
          caption: "Indukovane napeti (EMF) pohani proud obvodem — obdobne jako baterie. Hodnota napeti odpovida rychlosti zmeny magnetickeho toku.",
        },
      },
      {
        heading: "Indukovane napeti v praxi",
        body: `**Generator (alternator):** Civka s $N$ zavity a plochou $A$ se otaci v magnetickem poli $B$ uhlovou rychlosti $\\omega$:

$$\\boxed{\\varepsilon(t) = NBA\\omega \\sin(\\omega t)}$$

Maximalni napeti: $\\varepsilon_0 = NBA\\omega$

Toto je **stridavy proud (AC)** — napeti se periodicke meni podle funkce sinus. V Ceske republice: $f = 50$ Hz, $U_{\\text{ef}} = 230$ V.

**Transformator** meni napeti pomoci elektromagneticke indukce:

$$\\boxed{\\frac{U_1}{U_2} = \\frac{N_1}{N_2}}$$

- $N_1 > N_2$: **snizujici** transformator (napr. nabjecka telefonu: 230 V $\\to$ 5 V)
- $N_1 < N_2$: **zvysujici** transformator (napr. pro dalekovy prenos energie)

Pri idealnim transformatoru ($\\eta = 100\\%$):
$$P_1 = P_2 \\implies U_1 I_1 = U_2 I_2$$

> [!info] Dalekovy prenos elektricke energie pouziva vysoke napeti ($110$ kV - $400$ kV), protoze pri stejnem vykonu tece mensi proud a ztráty na vodicich ($P_{\\text{ztraty}} = RI^2$) jsou mensi.`,
        examples: [
          {
            problem: "Transformator ma $N_1 = 2000$ a $N_2 = 100$ zavitu. Na primarni civku je privedeno $U_1 = 230$ V. Jake je sekundarni napeti?",
            solution: `$$U_2 = U_1 \\cdot \\frac{N_2}{N_1} = 230 \\cdot \\frac{100}{2000} = 230 \\cdot 0{,}05 = \\color{#16a34a}{11{,}5 \\text{ V}}$$
Toto je snizujici transformator — pouziva se napr. pro napajeni elektroniky.`,
          },
        ],
      },
      {
        heading: "Vlastni indukce",
        body: `Kdyz se meni proud v civce, meni se i jeji vlastni magneticke pole a tim i magneticky tok. To induktuje napeti v civce same — **vlastni indukce (samoinduktance)**:

$$\\boxed{\\varepsilon_L = -L \\frac{dI}{dt}}$$

- $L$ — induktance (henry, H)
- $dI/dt$ — rychlost zmeny proudu

**Induktance solenoidu:**
$$\\boxed{L = \\mu_0 n^2 V = \\mu_0 \\frac{N^2}{l} A}$$

kde $V = A \\cdot l$ je objem solenoidu.

**Energie ulozena v magnetickem poli civky:**
$$\\boxed{E = \\frac{1}{2}LI^2}$$

> [!tip] Induktance brání změnám proudu — pri zapnuti obvodu proud naroste postupne (ne skokove), pri vypnuti muze indukovane napeti zpusobit jiskru. Analogie: induktance je "setrvacnost" proudu.

$$\\begin{array}{l|c} \\text{Soucastka} & L \\\\ \\hline \\text{Maly drosek} & 1 - 100 \\text{ }\\mu\\text{H} \\\\ \\text{Civka v reproduktoru} & 0{,}1 - 10 \\text{ mH} \\\\ \\text{Transformator} & 1 - 100 \\text{ H} \\end{array}$$`,
      },
      {
        heading: "Lorentzova sila",
        body: `Na nabitou castici pohybujici se v magnetickem poli pusobi **Lorentzova sila**:

$$\\boxed{\\vec{F} = q\\vec{v} \\times \\vec{B}}$$

Velikost:
$$F = qvB\\sin\\alpha$$

kde $\\alpha$ je uhel mezi $\\vec{v}$ a $\\vec{B}$.

**Klicove vlastnosti:**
- Sila je **kolma** na rychlost i na pole $\\to$ **nekona praci** (nemeni velikost rychlosti, jen smer)
- Nabita castice se pohybuje po **kruznici** (pokud $\\vec{v} \\perp \\vec{B}$)

**Polomer kruhove drahy:**
$$F_L = F_d$$
$$qvB = \\frac{mv^2}{r}$$
$$\\boxed{r = \\frac{mv}{qB}}$$

**Perioda obehu** (nezavisi na rychlosti!):
$$T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}$$

> [!key] Tohoto principu vyuziva **cyklotron** — urychluje nabite castice na kruhove draze. S rostouci energii roste polomer, ale frekvence obehu zustava stejna (dokud je castice nerelativistická).

$$\\begin{array}{l|c} \\text{Vyuziti} & \\text{Princip} \\\\ \\hline \\text{Cyklotron} & \\text{urychlování casticek} \\\\ \\text{Hmotnostni spektrometr} & \\text{separace iontu podle } m/q \\\\ \\text{TV obrazovka (CRT)} & \\text{vychyleni elektronoveho paprsku} \\\\ \\text{Polárni záře} & \\text{nabite castice v magnetosfere} \\end{array}$$`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Civka s $N = 200$ zavity a plochou $A = 50$ cm$^2$ je umistena v magnetickem poli. Indukce se rovnomerne zmeni z $B_1 = 0{,}4$ T na $B_2 = 0{,}1$ T za cas $\\Delta t = 0{,}02$ s. Jaka je velikost indukovaneho napeti?`,
    steps: [
      {
        instruction: "Vypocitejte zmenu magnetickeho toku jednim zavitem",
        math: "$\\Delta\\Phi = \\Delta B \\cdot A = (B_2 - B_1) \\cdot A = (0{,}1 - 0{,}4) \\cdot 50 \\times 10^{-4}$",
        explanation: "Plocha je kolma na pole ($\\alpha = 0°$, $\\cos 0° = 1$). Prevedeme $50$ cm$^2 = 50 \\times 10^{-4}$ m$^2$.",
      },
      {
        instruction: "Dopocitejte zmenu toku",
        math: "$\\Delta\\Phi = -0{,}3 \\cdot 5 \\times 10^{-3} = -1{,}5 \\times 10^{-3} \\text{ Wb}$",
        explanation: "Zaporne znamenko — tok se zmensil.",
      },
      {
        instruction: "Pouzijte Faradayuv zakon",
        math: "$\\varepsilon = -N \\frac{\\Delta\\Phi}{\\Delta t} = -200 \\cdot \\frac{-1{,}5 \\times 10^{-3}}{0{,}02}$",
        explanation: "Dosadime pocet zavitu a casovy interval.",
      },
      {
        instruction: "Vypocitejte indukovane napeti",
        math: "$\\varepsilon = -200 \\cdot (-0{,}075) = 15 \\text{ V}$",
        explanation: "Kladna hodnota — indukovane napeti brání poklesu toku (Lenzuv zakon).",
      },
    ],
    finalAnswer: "Indukovane napeti je $\\varepsilon = 15$ V. Indukovany proud bude tekst takovym smerem, aby se postavil proti poklesu magnetickeho toku.",
  },
  practiceProblems: [
    {
      id: "mp-i-1",
      problemStatement: "Magneticky tok civkou s $N = 100$ zavity se zmeni z $\\Phi_1 = 5 \\times 10^{-3}$ Wb na $\\Phi_2 = 2 \\times 10^{-3}$ Wb za $\\Delta t = 0{,}01$ s. Jake je indukovane napeti?",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30 V"],
      numericTolerance: 1,
      hints: [
        "$\\varepsilon = -N \\cdot \\Delta\\Phi / \\Delta t$",
        "$\\Delta\\Phi = (2 - 5) \\times 10^{-3} = -3 \\times 10^{-3}$ Wb",
      ],
      solutionExplanation: `$$\\varepsilon = -N\\frac{\\Delta\\Phi}{\\Delta t} = -100 \\cdot \\frac{-3 \\times 10^{-3}}{0{,}01} = -100 \\cdot (-0{,}3) = 30 \\text{ V}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-i-2",
      problemStatement: "Transformator ma prevod $N_1/N_2 = 20$. Primárni napeti je $U_1 = 230$ V a sekundarni proud je $I_2 = 2$ A. Jake je sekundarni napeti a primarni proud (idealní transformator)?",
      expectedAnswer: "11.5",
      acceptableAnswers: ["11.5", "11,5", "11.5 V", "11,5 V"],
      numericTolerance: 0.5,
      hints: [
        "$U_2 = U_1 / (N_1/N_2) = 230 / 20$",
        "Z $U_1 I_1 = U_2 I_2$ urcete $I_1$.",
      ],
      solutionExplanation: `$$U_2 = \\frac{U_1}{N_1/N_2} = \\frac{230}{20} = 11{,}5 \\text{ V}$$
$$I_1 = \\frac{U_2 I_2}{U_1} = \\frac{11{,}5 \\cdot 2}{230} = 0{,}1 \\text{ A}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mp-i-3",
      problemStatement: "Civka s induktanci $L = 0{,}5$ H nese proud $I = 4$ A. Jaka energie je ulozena v jejim magnetickem poli?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 J"],
      numericTolerance: 0.1,
      hints: [
        "$E = \\frac{1}{2}LI^2$",
        "$E = \\frac{1}{2} \\cdot 0{,}5 \\cdot 4^2$",
      ],
      solutionExplanation: `$$E = \\frac{1}{2}LI^2 = \\frac{1}{2} \\cdot 0{,}5 \\cdot 16 = 4 \\text{ J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-i-4",
      problemStatement: "Proton ($m = 1{,}67 \\times 10^{-27}$ kg, $q = 1{,}6 \\times 10^{-19}$ C) leti rychlosti $v = 3 \\times 10^6$ m/s kolmo na magneticke pole $B = 0{,}2$ T. Jaky je polomer jeho kruhove drahy?",
      expectedAnswer: "0.156",
      acceptableAnswers: ["0.156", "0,156", "0.16", "0,16", "15.6 cm", "15,6 cm"],
      numericTolerance: 0.005,
      hints: [
        "$r = mv / (qB)$",
        "$r = (1{,}67 \\times 10^{-27} \\cdot 3 \\times 10^6) / (1{,}6 \\times 10^{-19} \\cdot 0{,}2)$",
      ],
      solutionExplanation: `$$r = \\frac{mv}{qB} = \\frac{1{,}67 \\times 10^{-27} \\cdot 3 \\times 10^6}{1{,}6 \\times 10^{-19} \\cdot 0{,}2} = \\frac{5{,}01 \\times 10^{-21}}{3{,}2 \\times 10^{-20}} \\approx 0{,}156 \\text{ m} = 15{,}6 \\text{ cm}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "mp-i-5",
      problemStatement: "V cyklotronu s magnetickym polem $B = 1{,}5$ T obihaji protony ($m_p = 1{,}67 \\times 10^{-27}$ kg, $q = 1{,}6 \\times 10^{-19}$ C). Jaka je frekvence obehu protonu?",
      expectedAnswer: "22900000",
      acceptableAnswers: ["22900000", "2.29e7", "22.9 MHz", "22,9 MHz", "23 MHz"],
      numericTolerance: 500000,
      hints: [
        "$T = 2\\pi m / (qB)$, pak $f = 1/T$.",
        "$f = qB / (2\\pi m)$",
      ],
      solutionExplanation: `$$f = \\frac{qB}{2\\pi m} = \\frac{1{,}6 \\times 10^{-19} \\cdot 1{,}5}{2\\pi \\cdot 1{,}67 \\times 10^{-27}} = \\frac{2{,}4 \\times 10^{-19}}{1{,}049 \\times 10^{-26}} \\approx 2{,}29 \\times 10^7 \\text{ Hz} = 22{,}9 \\text{ MHz}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Faradayuv zakon**: $\\varepsilon = -N \\cdot d\\Phi/dt$ — zmena magnetickeho toku induktuje napeti.",
      "**Lenzuv zakon**: indukovany proud se stavi proti zmene, ktera ho vyvolala.",
      "**Generator**: $\\varepsilon = NBA\\omega\\sin(\\omega t)$ — otaceni civky v poli vytvari stridave napeti.",
      "**Transformator**: $U_1/U_2 = N_1/N_2$ — meni napeti pri zachovani vykonu.",
      "**Lorentzova sila**: $F = qvB\\sin\\alpha$ — nabita castice opisuje kruznici s polomerem $r = mv/(qB)$.",
    ],
    nextTopicSuggestion: "Pokracujte na pokrocile tema — Maxwellovy rovnice, elektromagneticke vlny a LC obvody.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Maxwell, EM vlny, LC obvod, magneticke vlastnosti
// ═══════════════════════════════════════════════════════════════;

export const magnetickePoleAdvanced: LessonContent = {
  conceptExplanation: {
    title: "Magneticke pole — Maxwell, elektromagneticke vlny a LC obvody",
    sections: [
      {
        heading: "Maxwellovy rovnice",
        body: `James Clerk Maxwell v 60. letech 19. stoleti shrnul veskere znalosti o elektromagnetismu do **ctyr rovnic**. Tyto rovnice jsou zakladem cele elektromagneticke teorie.

**1. Gaussuv zakon pro elektricke pole** (zdroj E pole = naboj):
$$\\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q}{\\varepsilon_0}$$

**2. Gaussuv zakon pro magneticke pole** (magneticke monopoly neexistuji):
$$\\oint \\vec{B} \\cdot d\\vec{A} = 0$$

**3. Faradayuv zakon** (zmena B pole vytvari E pole):
$$\\oint \\vec{E} \\cdot d\\vec{l} = -\\frac{d\\Phi_B}{dt}$$

**4. Amperuv-Maxwelluv zakon** (proud a zmena E pole vytvari B pole):
$$\\oint \\vec{B} \\cdot d\\vec{l} = \\mu_0 I + \\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}$$

Maxwelluv klicovy prinos: clen $\\mu_0 \\varepsilon_0 \\frac{d\\Phi_E}{dt}$ — **posuvny proud** (displacement current). Menící se elektricke pole vytvari magneticke pole, i kdyz neteče zadny skutecny proud.

> [!key] Rovnice 3 a 4 dohromady rikaji: **menicci se E pole vytvari B pole a naopak**. Tato vzajemna indukce umoznuje existenci **elektromagnetickych vln** — sebesirici se poruch E a B pole.

> [!info] Maxwellovy rovnice sjednocuji elektřinu, magnetismus a optiku. Z nich plyne, ze svetlo je elektromagneticka vlna!`,
      },
      {
        heading: "Elektromagneticke vlny",
        body: `Z Maxwellovych rovnic lze odvodit, ze elektromagneticke vlny se siri rychlosti:

$$\\boxed{c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} \\approx 3 \\times 10^8 \\text{ m/s}}$$

Toto je **rychlost svetla** — Maxwell takto predpovedel, ze svetlo je elektromagneticka vlna!

**Vlastnosti EM vln:**
- $\\vec{E}$ a $\\vec{B}$ jsou **navzajem kolme** a kolme ke smeru sireni
- $E = cB$ (pomer amplitud)
- Nepotrebuji medium — siri se i vakuem
- Prenaseji energii a hybnost

**Elektromagneticke spektrum:**

$$\\begin{array}{l|c|c} \\text{Druh zareni} & \\lambda & f \\\\ \\hline \\text{Radiove vlny} & > 1 \\text{ mm} & < 300 \\text{ GHz} \\\\ \\text{Mikrovlny} & 1 \\text{ mm} - 1 \\text{ m} & 300 \\text{ MHz} - 300 \\text{ GHz} \\\\ \\text{Infracervene (IR)} & 700 \\text{ nm} - 1 \\text{ mm} & 300 \\text{ GHz} - 430 \\text{ THz} \\\\ \\text{Viditelne svetlo} & 400 - 700 \\text{ nm} & 430 - 750 \\text{ THz} \\\\ \\text{Ultrafialove (UV)} & 10 - 400 \\text{ nm} & 750 \\text{ THz} - 30 \\text{ PHz} \\\\ \\text{Rentgenove (X)} & 0{,}01 - 10 \\text{ nm} & 30 \\text{ PHz} - 30 \\text{ EHz} \\\\ \\text{Gamma} & < 0{,}01 \\text{ nm} & > 30 \\text{ EHz} \\end{array}$$

Platí $c = \\lambda f$ pro vsechny elektromagneticke vlny.

> [!tip] Vsechny tyto druhy zareni jsou stejny fyzikalni jev — lisi se jen vlnovou delkou (a tedy energii $E = hf$). Nase oci vidi jen tiny oblast $400$ - $700$ nm!`,
      },
      {
        heading: "LC obvod a rezonance",
        body: `Obvod slozeny z civky (induktance $L$) a kondenzatoru (kapacita $C$) vytvari **elektromagneticky oscilator**:

1. Nabity kondenzator se zacne vybijet pres civku
2. Proud v civce vytvori magneticke pole (energie z $E$ do $B$)
3. Kdyz se kondenzator vybije, civka udrzuje proud (samoindukcí)
4. Proud nabiji kondenzator opacne
5. Cyklus se opakuje

**Rezonancni frekvence:**
$$\\boxed{f_0 = \\frac{1}{2\\pi\\sqrt{LC}}}$$

**Uhlova frekvence:**
$$\\omega_0 = \\frac{1}{\\sqrt{LC}}$$

**Energie osciluje** mezi kondenzatorem a civkou:
$$E_{\\text{celk}} = \\frac{1}{2}\\frac{Q^2}{C} + \\frac{1}{2}LI^2 = \\text{konst.}$$

Analogie s mechanickym oscilatorem:

$$\\begin{array}{c|c} \\text{LC obvod} & \\text{Pruzina-zavazi} \\\\ \\hline Q \\text{ (naboj)} & x \\text{ (poloha)} \\\\ I \\text{ (proud)} & v \\text{ (rychlost)} \\\\ L \\text{ (induktance)} & m \\text{ (hmotnost)} \\\\ 1/C \\text{ (prevracena kapacita)} & k \\text{ (tuhost pruziny)} \\\\ \\frac{1}{2}LI^2 \\text{ (energie v civce)} & \\frac{1}{2}mv^2 \\text{ (kineticka energie)} \\\\ \\frac{1}{2}\\frac{Q^2}{C} \\text{ (energie v kond.)} & \\frac{1}{2}kx^2 \\text{ (pot. energie pruziny)} \\end{array}$$

> [!key] LC obvod je zakladem radioveho vysilace i prijimace — ladenim $C$ (otocny kondenzator) menime rezonancni frekvenci a vybirame stanici.`,
        visual: {
          type: "interactive-circuit",
          props: {
            mode: "ohm",
            defaultVoltage: 12,
            defaultR1: 50,
            defaultR2: 0,
            showPower: false,
            showCurrent: true,
          },
          caption: "V realnem LC obvodu energie osciluje mezi civkou a kondenzatorem. Odpor R zpusobuje postupne tlumeni oscilaci.",
        },
      },
      {
        heading: "Magneticke vlastnosti latek",
        body: `Vsechny latky reagují na magneticke pole, ale ruzne:

**1. Diamagneticke latky** ($\\mu_r < 1$, typicky $\\mu_r \\approx 0{,}99999$):
- Slabe **odpuzovany** magnetem
- Vznikaji indukovane magneticke momenty proti vnejsimu poli
- Priklady: voda, med, bismut, grafit, supravodice ($\\mu_r = 0$)

**2. Paramagneticke latky** ($\\mu_r > 1$, typicky $\\mu_r \\approx 1{,}00001$):
- Slabe **pritahovany** magnetem
- Atomove magneticke momenty se casticne usporadaji ve smeru pole
- Priklady: hlinik, platina, kyslík

**3. Feromagneticke latky** ($\\mu_r \\gg 1$, az $\\mu_r \\approx 10^5$):
- Silne **pritahovany** magnetem, mohou se stat permanentnimi magnety
- Domeny (oblasti) se usporadaji ve smeru pole
- Priklady: zelezo, kobalt, nikl

**Hysterezni krivka** popisuje zavislost $B$ na $H$ (intenzite magnetickeho pole) ve feromagnetiku:
- **Remanence** $B_r$ — zbylava indukce po vypnuti pole
- **Koercitivni sila** $H_c$ — intenzita pole potrebna k odmagnetovani

**Curieova teplota** $T_C$ — nad touto teplotou feromagnetikum ztraci feromagneticke vlastnosti a stava se paramagnetickym:

$$\\begin{array}{l|c} \\text{Material} & T_C \\text{ (°C)} \\\\ \\hline \\text{Železo} & 770 \\\\ \\text{Kobalt} & 1115 \\\\ \\text{Nikl} & 358 \\end{array}$$

> [!info] Supravodice jsou "perfektni diamagnetika" ($\\mu_r = 0$) — úplne vytlacuji magneticke pole ze sveho objemu (**Meissneruv jev**). Proto mohou levitovat nad magnetem!`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `LC obvod obsahuje civku s induktanci $L = 2$ mH a kondenzator s kapacitou $C = 0{,}5$ $\\mu$F. Kondenzator je nabity na napeti $U_0 = 10$ V. a) Jaka je rezonancni frekvence? b) Jaka je maximalni energie ulozena v obvodu? c) Jaky je maximalni proud civkou?`,
    steps: [
      {
        instruction: "Vypocitejte rezonancni frekvenci",
        math: "$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{2 \\times 10^{-3} \\cdot 0{,}5 \\times 10^{-6}}}$",
        explanation: "Prevedeme jednotky: $L = 2$ mH $= 2 \\times 10^{-3}$ H, $C = 0{,}5$ $\\mu$F $= 5 \\times 10^{-7}$ F.",
      },
      {
        instruction: "Dopocitejte $f_0$",
        math: "$f_0 = \\frac{1}{2\\pi\\sqrt{10^{-9}}} = \\frac{1}{2\\pi \\cdot 3{,}162 \\times 10^{-5}} = \\frac{1}{1{,}987 \\times 10^{-4}} \\approx 5033 \\text{ Hz}$",
        explanation: "Frekvence je priblizne $5$ kHz — oblast slyšitelneho zvuku.",
      },
      {
        instruction: "Urcete maximalní energii (= pocatecni energie v kondenzatoru)",
        math: "$E = \\frac{1}{2}CU_0^2 = \\frac{1}{2} \\cdot 5 \\times 10^{-7} \\cdot 100 = 2{,}5 \\times 10^{-5} \\text{ J} = 25 \\text{ }\\mu\\text{J}$",
        explanation: "Na pocatku je veskera energie v kondenzatoru. Celkova energie se zachovava.",
      },
      {
        instruction: "Spocitejte maximalni proud (kdyz se veskera energie prenese do civky)",
        math: "$\\frac{1}{2}LI_{\\max}^2 = E \\implies I_{\\max} = \\sqrt{\\frac{2E}{L}} = \\sqrt{\\frac{2 \\cdot 2{,}5 \\times 10^{-5}}{2 \\times 10^{-3}}} = \\sqrt{0{,}025} \\approx 0{,}158 \\text{ A}$",
        explanation: "Maximalni proud nastane v okamziku, kdy je kondenzator zcela vybity a veskera energie je v magnetickem poli civky.",
      },
    ],
    finalAnswer: "Rezonancni frekvence je $f_0 \\approx 5{,}03$ kHz. Maximalni energie $E = 25$ $\\mu$J. Maximalni proud $I_{\\max} \\approx 0{,}16$ A.",
  },
  practiceProblems: [
    {
      id: "mp-a-1",
      problemStatement: "Ktery z Maxwellovych zakonu rika, ze magneticke monopoly neexistuji? Co tato rovnice formálne vyjadřuje?",
      expectedAnswer: "Gaussuv zakon pro magneticke pole",
      acceptableAnswers: [
        "Gaussuv zakon pro magneticke pole",
        "druhy Maxwelluv zakon",
        "2. Maxwellova rovnice",
        "divergence B je nula",
        "tok B plochou je nula",
      ],
      hints: [
        "Ktera rovnice obsahuje $\\oint \\vec{B} \\cdot d\\vec{A}$?",
        "Tato rovnice rika, ze celkovy magneticky tok uzavrenou plochou je nula.",
      ],
      solutionExplanation: `**Gaussuv zakon pro magneticke pole**: $\\oint \\vec{B} \\cdot d\\vec{A} = 0$. Tato rovnice rika, ze celkovy magneticky tok libovolnou uzavrenou plochou je nula — to znamena, ze magneticke silocary nemaji zacatek ani konec (tvoří uzavrene smycky), tedy neexistuji magneticke monopoly.`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-a-2",
      problemStatement: "Vypocitejte rychlost svetla z hodnot $\\mu_0 = 4\\pi \\times 10^{-7}$ T$\\cdot$m/A a $\\varepsilon_0 = 8{,}854 \\times 10^{-12}$ F/m.",
      expectedAnswer: "3e8",
      acceptableAnswers: ["3e8", "299800000", "3 * 10^8", "299792458", "3.0e8"],
      numericTolerance: 5000000,
      hints: [
        "$c = 1/\\sqrt{\\mu_0 \\varepsilon_0}$",
        "$\\mu_0 \\varepsilon_0 = 4\\pi \\times 10^{-7} \\cdot 8{,}854 \\times 10^{-12}$",
      ],
      solutionExplanation: `$$c = \\frac{1}{\\sqrt{\\mu_0 \\varepsilon_0}} = \\frac{1}{\\sqrt{4\\pi \\times 10^{-7} \\cdot 8{,}854 \\times 10^{-12}}} = \\frac{1}{\\sqrt{1{,}113 \\times 10^{-17}}}$$
$$= \\frac{1}{3{,}336 \\times 10^{-9}} \\approx 2{,}998 \\times 10^8 \\text{ m/s}$$
Toto je presne rychlost svetla — Maxwell takto dokazal, ze svetlo je EM vlna.`,
      difficulty: "medium" as const,
    },
    {
      id: "mp-a-3",
      problemStatement: "LC obvod ma $L = 10$ mH a $C = 100$ nF. Jaka je rezonancni frekvence?",
      expectedAnswer: "5033",
      acceptableAnswers: ["5033", "5033 Hz", "5.03 kHz", "5,03 kHz", "5000"],
      numericTolerance: 100,
      hints: [
        "$f_0 = 1/(2\\pi\\sqrt{LC})$",
        "$LC = 10 \\times 10^{-3} \\cdot 100 \\times 10^{-9} = 10^{-6}$",
      ],
      solutionExplanation: `$$f_0 = \\frac{1}{2\\pi\\sqrt{LC}} = \\frac{1}{2\\pi\\sqrt{10^{-2} \\cdot 10^{-7}}} = \\frac{1}{2\\pi\\sqrt{10^{-9}}} = \\frac{1}{2\\pi \\cdot 3{,}162 \\times 10^{-5}}$$
$$\\approx \\frac{1}{1{,}987 \\times 10^{-4}} \\approx 5033 \\text{ Hz} \\approx 5{,}03 \\text{ kHz}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mp-a-4",
      problemStatement: "Zelezo ma Curieovu teplotu $770$ °C. Co se stane se zelezným magnetem, kdyz ho ohrejeme na $800$ °C?",
      expectedAnswer: "ztrati feromagneticke vlastnosti",
      acceptableAnswers: [
        "ztrati feromagneticke vlastnosti",
        "stane se paramagnetickym",
        "prestane byt magneticky",
        "demagnetizuje se",
        "ztraci magnetizaci",
      ],
      hints: [
        "Co se deje nad Curieovou teplotou?",
        "Feromagnetikum se pri $T > T_C$ stava paramagnetickym.",
      ],
      solutionExplanation: `Nad Curieovou teplotou ($T_C = 770$ °C pro zelezo) se feromagneticky material stává **paramagnetickym** — magneticke domeny se rozpadaji kvuli tepelnym pohybum atomu a material ztraci schopnost byt permanentnim magnetem. Po ochlazeni pod $T_C$ se feromagneticke vlastnosti obnoví, ale predchozi magnetizace je ztracena.`,
      difficulty: "easy" as const,
    },
    {
      id: "mp-a-5",
      problemStatement: "Radiovy vysilac pracuje na frekvenci $f = 100$ MHz. Jaka je vlnova delka vysilaneho signalu? ($c = 3 \\times 10^8$ m/s)",
      expectedAnswer: "3",
      acceptableAnswers: ["3", "3 m", "3.0", "3,0"],
      numericTolerance: 0.1,
      hints: [
        "$c = \\lambda f$, tedy $\\lambda = c/f$.",
        "$\\lambda = 3 \\times 10^8 / (100 \\times 10^6)$",
      ],
      solutionExplanation: `$$\\lambda = \\frac{c}{f} = \\frac{3 \\times 10^8}{100 \\times 10^6} = \\frac{3 \\times 10^8}{10^8} = 3 \\text{ m}$$
Toto odpovida pasmu VHF (very high frequency) — pouziva se napr. pro FM radio.`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Maxwellovy rovnice** — 4 rovnice shrnujici celý elektromagnetismus. Klicovy: menící se E pole vytvari B pole a naopak.",
      "**Rychlost svetla**: $c = 1/\\sqrt{\\mu_0\\varepsilon_0} \\approx 3 \\times 10^8$ m/s — svetlo je elektromagneticka vlna.",
      "**LC obvod**: $f_0 = 1/(2\\pi\\sqrt{LC})$ — energie osciluje mezi kondenzatorem a civkou (analogie s pruzinou).",
      "**Magneticke materialy**: diamagneticke ($\\mu_r < 1$), paramagneticke ($\\mu_r > 1$), feromagneticke ($\\mu_r \\gg 1$).",
      "**Curieova teplota** — nad ni feromagnetikum ztraci sve magneticke vlastnosti.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste elektromagnetismus od zakladu az po Maxwellovy rovnice. Pokracujte na optiku — kde vyuzijete znalosti o elektromagnetickych vlnách!",
  },
};
