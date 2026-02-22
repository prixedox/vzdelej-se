import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "40580cda-1589-441b-bb36-51aed73996f7";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Intuitive, visual, discovery-based
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Mechanicke vlneni a zvuk — jak se siri energie",
    sections: [
      {
        heading: "Co je vlneni?",
        body: `Predstavte si, ze hodite kamen do rybniku. Na hladine se rozbehnou kruhove vlny — ale voda se nepohybuje smerem od kamene. Pohybuje se jen **nahoru a dolu**. Co se siri, je **porucha** — tedy energie.

$$\\boxed{\\text{Vlneni = sireni poruchy (energie) prostredim. Castice prostredni kmitaji, ale necestuji.}}$$

Existuji dva zakladni typy vlneni:

| Typ | Smer kmitani | Priklad |
|-----|-------------|---------|
| **Pricne** | kolmo na smer sireni | vlny na vode, vlny na lane |
| **Podelne** | ve smeru sireni | zvuk, tlakove vlny |

> [!key] Dulezite: prostredim se nesiri hmota, ale **energie**. Castice kmitaji kolem svych rovnovaznych poloh.

Prirodni priklady:
- **Vlny na vode** — pricne vlny na hladine
- **Zvuk** — podelne vlny ve vzduchu
- **Zemtreseni** — P-vlny (podelne, rychlejsi) a S-vlny (pricne, pomalejsi)
- **Vlny na lane** — pricne vlny, snadno pozorovatelne`,
      },
      {
        heading: "Zakladni veliciny vlneni",
        body: `Kazde vlneni popisujeme pomoci nekolika velicin:

**Vlnova delka** $\\lambda$ (lambda) — vzdalenost mezi dvema sousednimi vrcholy (nebo udolimi):
$$\\text{znacka: } \\lambda, \\quad \\text{jednotka: m}$$

**Frekvence** $f$ — pocet kmitu za sekundu:
$$\\text{znacka: } f, \\quad \\text{jednotka: Hz (hertz)} = \\text{s}^{-1}$$

**Perioda** $T$ — doba jednoho kmitu:
$$\\boxed{T = \\frac{1}{f}}$$

**Amplituda** $A$ — maximalni vychylka od rovnovazne polohy.

**Rychlost sireni vlneni** $v$ — zakladni vztah:
$$\\boxed{v = f \\cdot \\lambda = \\frac{\\lambda}{T}}$$

> [!key] Rychlost vlneni zavisi na prostredni, ne na zdroji. Zvuk se siri ruzne rychle v ruznych materiealech:

$$\\begin{array}{l|c} \\text{Prostredi} & v \\text{ (m/s)} \\\\ \\hline \\text{Vzduch (20 }°\\text{C)} & 343 \\\\ \\text{Voda} & 1500 \\\\ \\text{Ocel} & 5000 \\end{array}$$`,
        visual: {
          type: "interactive-wave",
          props: {
            mode: "traveling",
            defaultAmplitude: 3,
            defaultWavelength: 8,
            defaultFrequency: 2,
            showLabels: true,
          },
          caption: "Mente amplitudu, vlnovou delku a frekvenci — sledujte, jak se meni vlna",
        },
        examples: [
          {
            problem: "Vlna na vode ma frekvenci $2$ Hz a vlnovou delku $0{,}5$ m. Jak rychle se siri?",
            solution: `$$v = f \\cdot \\lambda = 2 \\cdot 0{,}5 = \\color{#16a34a}{1 \\text{ m/s}}$$`,
          },
          {
            problem: "Perioda vlneni je $0{,}02$ s. Jaka je frekvence?",
            solution: `$$f = \\frac{1}{T} = \\frac{1}{0{,}02} = \\color{#16a34a}{50 \\text{ Hz}}$$`,
          },
        ],
      },
      {
        heading: "Zvuk",
        body: `Zvuk je **podelne mechanicke vlneni**, ktere se siri prostredim (vzduchem, vodou, pevnymi latkami). Ve vakuu se zvuk nesiri!

Lidske ucho vnima zvuk v rozsahu frekvenci:

$$\\begin{array}{l|c|l} \\text{Oblast} & \\text{Frekvence} & \\text{Priklad} \\\\ \\hline \\text{Infrazvuk} & < 20 \\text{ Hz} & \\text{zemtreseni, sloni} \\\\ \\text{Slysitelny zvuk} & 20 - 20\\,000 \\text{ Hz} & \\text{rec, hudba} \\\\ \\text{Ultrazvuk} & > 20\\,000 \\text{ Hz} & \\text{netopyri, sonar, lekarstvi} \\end{array}$$

Co urcuje vlastnosti zvuku:
- **Vyska tonu** = frekvence (vyssi frekvence → vyssi ton)
- **Hlasitost** = amplituda (vetsi amplituda → hlasitejsi zvuk)
- **Barva tonu** = tvar vlny (rozlisi klavir od kytary na stejnem tonu)

> [!info] Rychlost zvuku ve vzduchu zavisi na teplote. Priblizny vzorec:
> $$v \\approx 331{,}3 + 0{,}6 \\cdot t$$
> kde $t$ je teplota ve $°\\text{C}$. Pri $20\\,°\\text{C}$: $v \\approx 343$ m/s.`,
      },
      {
        heading: "Odraz a lom vlneni",
        body: `Kdyz vlneni narazi na prekazku nebo rozhrani dvou prostredi, muze se **odrazit** nebo **lomit**.

**Odraz vlneni:**
$$\\boxed{\\alpha = \\alpha'}$$
Uhel dopadu se rovna uhlu odrazu. Plati pro vsechny typy vlneni (zvuk, svetlo, vlny na vode).

**Lom vlneni (refrakce):**
Kdyz vlna prechazi z jednoho prostredi do druheho, meni se jeji rychlost a smer. Kvalitativne: vlna se lame **ke kolmici**, pokud vstupuje do prostredi, kde se siri pomaleji.

**Echo** — odraz zvuku od prekazky:
$$\\boxed{d = \\frac{v \\cdot t}{2}}$$
kde $d$ je vzdalenost prekazky, $v$ rychlost zvuku a $t$ cas mezi vyslanim a prijmem ozveny. Delime dvema, protoze zvuk lete tam i zpet.

> [!tip] Abychom vnimali echo jako oddeleny zvuk, musi prekazka byt alespon asi $17$ m daleko (cas $\\approx 0{,}1$ s). Bliz slysite jen "prodlouzeny" zvuk (dozvuk).`,
        examples: [
          {
            problem: "Stojite pred skalou a tleskate. Echo slysite za $1{,}4$ s. Jak daleko je skala? ($v = 340$ m/s)",
            solution: `$$d = \\frac{v \\cdot t}{2} = \\frac{340 \\cdot 1{,}4}{2} = \\color{#16a34a}{238 \\text{ m}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Ladicky vydava ton o frekvenci $440$ Hz. Rychlost zvuku ve vzduchu je $343$ m/s. Urcete vlnovou delku tohoto zvuku.`,
    steps: [
      {
        instruction: "Zapiste zname veliciny",
        math: "$f = 440 \\text{ Hz}, \\quad v = 343 \\text{ m/s}$",
        explanation: "Zname frekvenci (pocet kmitu za sekundu) a rychlost sireni zvuku ve vzduchu.",
      },
      {
        instruction: "Pouzijte zakladni vztah vlneni",
        math: "$v = f \\cdot \\lambda \\implies \\lambda = \\frac{v}{f}$",
        explanation: "Ze vztahu $v = f \\lambda$ vyjadrime vlnovou delku $\\lambda$.",
      },
      {
        instruction: "Dosadte a vypocitejte",
        math: "$\\lambda = \\frac{343}{440} \\approx 0{,}780 \\text{ m}$",
        explanation: "Vlnova delka tonu kamertonu je priblizne $78$ cm.",
      },
      {
        instruction: "Overeni — vypocitejte periodu",
        math: "$T = \\frac{1}{f} = \\frac{1}{440} \\approx 0{,}00227 \\text{ s} \\approx 2{,}27 \\text{ ms}$",
        explanation: "Jeden kmit trva necelych $2{,}3$ milisekundy.",
      },
    ],
    finalAnswer: "Vlnova delka tonu ladicky ($440$ Hz) ve vzduchu je priblizne $\\lambda \\approx 0{,}78$ m $= 78$ cm.",
  },
  practiceProblems: [
    {
      id: "mv-b-1",
      problemStatement: "Zvuk ma frekvenci $680$ Hz a siri se vzduchem rychlosti $340$ m/s. Jaka je jeho vlnova delka?",
      expectedAnswer: "0,5",
      acceptableAnswers: ["0,5", "0.5", "0,5 m", "0.5 m", "50 cm"],
      hints: [
        "Pouzijte vzorec $\\lambda = v / f$.",
        "$\\lambda = 340 / 680$",
      ],
      solutionExplanation: `$$\\lambda = \\frac{v}{f} = \\frac{340}{680} = 0{,}5 \\text{ m}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mv-b-2",
      problemStatement: "Perioda vlneni je $0{,}005$ s. Jaka je frekvence?",
      expectedAnswer: "200",
      acceptableAnswers: ["200", "200 Hz"],
      hints: [
        "$f = 1/T$",
        "$f = 1 / 0{,}005$",
      ],
      solutionExplanation: `$$f = \\frac{1}{T} = \\frac{1}{0{,}005} = 200 \\text{ Hz}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mv-b-3",
      problemStatement: "Kriknete smerem ke skale a echo uslysite za $3$ s. Jak daleko je skala? ($v = 340$ m/s)",
      expectedAnswer: "510",
      acceptableAnswers: ["510", "510 m"],
      hints: [
        "Zvuk leti ke skale a zpet, proto $d = vt/2$.",
        "$d = 340 \\cdot 3 / 2$",
      ],
      solutionExplanation: `$$d = \\frac{v \\cdot t}{2} = \\frac{340 \\cdot 3}{2} = 510 \\text{ m}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "mv-b-4",
      problemStatement: "Vlna na vode se siri rychlosti $2$ m/s a ma vlnovou delku $0{,}8$ m. Jaka je jeji frekvence a perioda?",
      expectedAnswer: "2,5",
      acceptableAnswers: ["2,5", "2.5", "2,5 Hz", "2.5 Hz"],
      hints: [
        "$f = v / \\lambda$",
        "$f = 2 / 0{,}8 = 2{,}5$ Hz, pak $T = 1/f$.",
      ],
      solutionExplanation: `$$f = \\frac{v}{\\lambda} = \\frac{2}{0{,}8} = 2{,}5 \\text{ Hz}$$
$$T = \\frac{1}{f} = \\frac{1}{2{,}5} = 0{,}4 \\text{ s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-b-5",
      problemStatement: "Zvuk se v oceli siri rychlosti $5000$ m/s. Jak dlouho trva, nez zvuk projde ocelovym nositkem dlouhym $150$ m?",
      expectedAnswer: "0,03",
      acceptableAnswers: ["0,03", "0.03", "0,03 s", "0.03 s", "30 ms"],
      hints: [
        "$t = s / v$, kde $s$ je delka a $v$ rychlost.",
        "$t = 150 / 5000$",
      ],
      solutionExplanation: `$$t = \\frac{s}{v} = \\frac{150}{5000} = 0{,}03 \\text{ s} = 30 \\text{ ms}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Vlneni** je sireni poruchy (energie) prostredim — castice kmitaji, ale necestuji.",
      "**Pricne vlneni**: kmitani kolmo na smer sireni. **Podelne vlneni**: kmitani ve smeru sireni.",
      "Zakladni vztah: $v = f \\cdot \\lambda$ — rychlost = frekvence x vlnova delka.",
      "**Zvuk** je podelne vlneni; slysitelny rozsah $20 - 20\\,000$ Hz. Rychlost ve vzduchu $\\approx 343$ m/s.",
      "**Echo**: $d = vt/2$ — vzdalenost prekazky z doby ozveny.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na stredni uroven — naucite se rovnici postupne vlny, interferenci a stojate vlneni.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Quantitative, multi-step, graph-aware
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Mechanicke vlneni a zvuk — rovnice, interference, Doppleruv jev",
    sections: [
      {
        heading: "Rovnice postupne vlny",
        body: `Postupna vlna je vlneni, ktere se siri prostorem. Matematicky ji popisujeme:

$$\\boxed{y(x, t) = A \\cdot \\sin\\!\\left(2\\pi\\left(\\frac{x}{\\lambda} - f t\\right)\\right)}$$

kde:
- $A$ je amplituda (maximalni vychylka)
- $\\lambda$ je vlnova delka
- $f$ je frekvence
- $x$ je poloha, $t$ je cas

Ekvivalentni zapis pomoci uhlove frekvence $\\omega = 2\\pi f$ a vlnoveho cisla $k = 2\\pi / \\lambda$:

$$y(x, t) = A \\cdot \\sin(kx - \\omega t)$$

> [!key] Fazova rychlost vlny: $v = \\frac{\\omega}{k} = f \\cdot \\lambda$. To je rychlost, jakou se siri "tvar" vlny prostorem.

Z rovnice muzeme v libovolnem case a miste urcit vychylku castice. Zapornamenko pred $\\omega t$ znamena, ze vlna se siri ve smeru $+x$.`,
        visual: {
          type: "interactive-wave",
          props: {
            mode: "traveling",
            defaultAmplitude: 4,
            defaultWavelength: 10,
            defaultFrequency: 3,
            showParticles: true,
          },
          caption: "Postupna vlna — sledujte pohyb jednotlivych castic i celkovy tvar vlny",
        },
        examples: [
          {
            problem: "Vlna je popsana rovnici $y = 0{,}05 \\sin(4\\pi x - 20\\pi t)$ (v metrech a sekundach). Urcete amplitudu, vlnovou delku, frekvenci a rychlost.",
            solution: `$A = 0{,}05$ m $= 5$ cm

$k = 4\\pi \\implies \\lambda = \\frac{2\\pi}{k} = \\frac{2\\pi}{4\\pi} = 0{,}5$ m

$\\omega = 20\\pi \\implies f = \\frac{\\omega}{2\\pi} = \\frac{20\\pi}{2\\pi} = 10$ Hz

$$v = f \\cdot \\lambda = 10 \\cdot 0{,}5 = \\color{#16a34a}{5 \\text{ m/s}}$$`,
          },
        ],
      },
      {
        heading: "Interference a superpozice",
        body: `Kdyz se potkaji dve vlny, jejich vychylky se **scitaji** — to je **princip superpozice**:

$$y_{\\text{celk}} = y_1 + y_2$$

**Konstruktivni interference** (vlny se zesilují):
Nastava, kdyz vlny jsou "ve fazi" — jejich drahoovy rozdil je celonasovek vlnove delky:
$$\\boxed{\\Delta l = n \\cdot \\lambda \\qquad (n = 0, 1, 2, \\ldots)}$$
Fazovy rozdil: $\\Delta \\varphi = 0, 2\\pi, 4\\pi, \\ldots$

**Destruktivni interference** (vlny se rusi):
Nastava, kdyz vlny jsou v "protifazi":
$$\\boxed{\\Delta l = \\left(n + \\frac{1}{2}\\right) \\cdot \\lambda \\qquad (n = 0, 1, 2, \\ldots)}$$
Fazovy rozdil: $\\Delta \\varphi = \\pi, 3\\pi, 5\\pi, \\ldots$

> [!info] Interference je klicovy jev pro pochopeni stojatech vln, difrakce i mnoha technologickych aplikaci (noise-cancelling sluchatka, akustika koncertnich sali).`,
        visual: {
          type: "interactive-wave",
          props: {
            mode: "interference",
            defaultAmplitude: 3,
            defaultWavelength: 8,
            defaultFrequency: 2,
          },
          caption: "Dve vlny se potkavaji — sledujte konstruktivni a destruktivni interferenci",
        },
        examples: [
          {
            problem: "Dva reproduktory vysílaji zvuk o vlnové délce $0{,}5$ m. V bode P je drahový rozdíl $1{,}5$ m. Je tam zesílení nebo zeslabení?",
            solution: `$\\Delta l = 1{,}5$ m, $\\lambda = 0{,}5$ m.
$$\\frac{\\Delta l}{\\lambda} = \\frac{1{,}5}{0{,}5} = 3 \\quad \\text{(cele cislo)}$$
Drahovy rozdil je $3\\lambda$ → **konstruktivni interference** (zesileni).`,
          },
        ],
      },
      {
        heading: "Stojate vlneni",
        body: `Stojata vlna vznika superpozici dvou postupnych vln **stejne frekvence a amplitudy**, ktere se siri **proti sobe** (napr. vlna a jeji odraz).

Na rozdil od postupne vlny se stojata vlna **nesiri** — jen kmita na miste.

**Uzly** — body, kde castice nekmitaji ($y = 0$ stale)
**Kmitny** (antiuzly) — body s maximalni vychylkou

**Rezonance na strune delky $L$ (upevnena na obou koncich):**

$$\\boxed{\\lambda_n = \\frac{2L}{n}} \\qquad \\boxed{f_n = \\frac{n \\cdot v}{2L}}$$

kde $n = 1, 2, 3, \\ldots$ je cislo harmonicke.

| $n$ | Nazev | Pocet uzlu (bez koncu) | Pocet kmiten |
|-----|-------|----------------------|-------------|
| 1 | Zakladni ton | 0 | 1 |
| 2 | 2. harmonicka | 1 | 2 |
| 3 | 3. harmonicka | 2 | 3 |

> [!key] Zakladni frekvence $f_1 = v/(2L)$ je nejnizsi mozna. Vyssi harmonicke jsou jejimi celociselnymi nasobky: $f_n = n \\cdot f_1$.`,
        visual: {
          type: "interactive-wave",
          props: {
            mode: "standing",
            defaultAmplitude: 3,
            defaultWavelength: 10,
            defaultFrequency: 2,
          },
          caption: "Stojata vlna — sledujte uzly (nehybne body) a kmitny (maximalni vychylka)",
        },
        examples: [
          {
            problem: "Struna kytary je dlouha $65$ cm a rychlost vlneni na ni je $260$ m/s. Jaka je frekvence zakladniho tonu?",
            solution: `$$f_1 = \\frac{v}{2L} = \\frac{260}{2 \\cdot 0{,}65} = \\frac{260}{1{,}3} = \\color{#16a34a}{200 \\text{ Hz}}$$`,
          },
        ],
      },
      {
        heading: "Dopplerův jev",
        body: `Kdyz se zdroj zvuku nebo pozorovatel pohybuji, vnimana frekvence se **meni**. Tomu rikame **Doppleruv jev**.

$$\\boxed{f' = f \\cdot \\frac{v \\pm v_{\\text{poz}}}{v \\mp v_{\\text{zdr}}}}$$

kde:
- $f'$ je vnimana frekvence
- $f$ je frekvence zdroje
- $v$ je rychlost zvuku
- $v_{\\text{poz}}$ je rychlost pozorovatele
- $v_{\\text{zdr}}$ je rychlost zdroje

**Pravidla znamenek:**
- Pozorovatel se **blizi** ke zdroji → $+v_{\\text{poz}}$ (v citateli)
- Zdroj se **blizi** k pozorovateli → $-v_{\\text{zdr}}$ (ve jmenovateli)

> [!tip] Jednoduse: pri **priblizovani** se frekvence **zvysuje** (vyssi ton), pri **vzdalovani** se **snizuje** (nizsi ton). Znate to ze sanitky — prijizdi vysoko, odjizdi nizko.

**Aplikace:**
- **Radar** — mereni rychlosti vozidel
- **Lekarsky ultrazvuk** — mereni prutoku krve
- **Astronomie** — rudý posuv vzdalenych hvezd`,
        examples: [
          {
            problem: "Sanitka jede rychlosti $30$ m/s smerem k vam a trubi na frekvenci $800$ Hz. Jakou frekvenci slysite? ($v = 340$ m/s)",
            solution: `Zdroj se blizi → ve jmenovateli odcitame:
$$f' = f \\cdot \\frac{v}{v - v_{\\text{zdr}}} = 800 \\cdot \\frac{340}{340 - 30} = 800 \\cdot \\frac{340}{310} \\approx \\color{#16a34a}{877 \\text{ Hz}}$$`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Kytarova struna je dlouha $L = 0{,}64$ m. Rychlost vlneni na strune je $v = 320$ m/s. Urcete frekvenci zakladniho tonu a prvnich tri harmonickych. Jaka je vlnova delka zakladniho tonu?`,
    steps: [
      {
        instruction: "Zapiste zname veliciny",
        math: "$L = 0{,}64 \\text{ m}, \\quad v = 320 \\text{ m/s}$",
        explanation: "Struna je upevnena na obou koncich, takze na koncich musi byt uzly.",
      },
      {
        instruction: "Vlnova delka zakladniho tonu ($n = 1$)",
        math: "$\\lambda_1 = \\frac{2L}{1} = 2 \\cdot 0{,}64 = 1{,}28 \\text{ m}$",
        explanation: "Na strune se vejde prave pulka vlny — na obou koncich jsou uzly, uprostred kmitna.",
      },
      {
        instruction: "Frekvence zakladniho tonu",
        math: "$f_1 = \\frac{v}{\\lambda_1} = \\frac{320}{1{,}28} = 250 \\text{ Hz}$",
        explanation: "Alternativne: $f_1 = v/(2L) = 320/(2 \\cdot 0{,}64) = 250$ Hz.",
      },
      {
        instruction: "Vyssi harmonicke",
        math: "$f_2 = 2 \\cdot f_1 = 500 \\text{ Hz}$\n$f_3 = 3 \\cdot f_1 = 750 \\text{ Hz}$\n$f_4 = 4 \\cdot f_1 = 1000 \\text{ Hz}$",
        explanation: "Vyssi harmonicke jsou celociselnymi nasobky zakladni frekvence.",
      },
    ],
    finalAnswer: "Zakladni ton: $f_1 = 250$ Hz ($\\lambda_1 = 1{,}28$ m). Harmonicke: $f_2 = 500$ Hz, $f_3 = 750$ Hz, $f_4 = 1000$ Hz.",
  },
  practiceProblems: [
    {
      id: "mv-i-1",
      problemStatement: "Vlna je popsana rovnici $y = 0{,}03 \\sin(2\\pi x - 10\\pi t)$ (SI jednotky). Urcete vlnovou delku, frekvenci a rychlost sireni.",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "5 m/s"],
      hints: [
        "Porovnejte s obecnym tvarem $y = A\\sin(kx - \\omega t)$. Urcete $k$ a $\\omega$.",
        "$k = 2\\pi \\implies \\lambda = 2\\pi/k = 1$ m. $\\omega = 10\\pi \\implies f = \\omega/(2\\pi) = 5$ Hz. Pak $v = f\\lambda$.",
      ],
      solutionExplanation: `$k = 2\\pi \\implies \\lambda = 2\\pi / 2\\pi = 1$ m

$\\omega = 10\\pi \\implies f = 10\\pi / (2\\pi) = 5$ Hz

$$v = f \\cdot \\lambda = 5 \\cdot 1 = 5 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-i-2",
      problemStatement: "Dva reproduktory vzdalene $2$ m od sebe vysílaji zvuk o frekvenci $1700$ Hz. V bode P je vzdalenost od jednoho $3{,}0$ m a od druheho $3{,}2$ m. Dojde tam ke konstruktivni nebo destruktivni interferenci? ($v = 340$ m/s)",
      expectedAnswer: "konstruktivni",
      acceptableAnswers: ["konstruktivni", "konstruktivni interference", "zesileni"],
      hints: [
        "Spocitejte vlnovou delku: $\\lambda = v/f = 340/1700 = 0{,}2$ m.",
        "Drahovy rozdil: $\\Delta l = 3{,}2 - 3{,}0 = 0{,}2$ m. Porovnejte s $\\lambda$.",
      ],
      solutionExplanation: `$$\\lambda = \\frac{v}{f} = \\frac{340}{1700} = 0{,}2 \\text{ m}$$

Drahovy rozdil: $\\Delta l = 3{,}2 - 3{,}0 = 0{,}2$ m $= 1 \\cdot \\lambda$

$\\Delta l = n\\lambda$ pro $n = 1$ → **konstruktivni interference** (zesileni).`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-i-3",
      problemStatement: "Struna dlouha $1$ m je upevnena na obou koncich. Rychlost vlneni je $200$ m/s. Jaka je frekvence 3. harmonicke?",
      expectedAnswer: "300",
      acceptableAnswers: ["300", "300 Hz"],
      hints: [
        "$f_n = nv/(2L)$ pro strunu upevnenou na obou koncich.",
        "$f_3 = 3 \\cdot 200 / (2 \\cdot 1)$",
      ],
      solutionExplanation: `$$f_3 = \\frac{3 \\cdot v}{2L} = \\frac{3 \\cdot 200}{2 \\cdot 1} = 300 \\text{ Hz}$$

(Zakladni frekvence: $f_1 = 100$ Hz, 3. harmonicka je trojnasobek.)`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-i-4",
      problemStatement: "Vlak jede rychlosti $25$ m/s smerem k vam a trubi na frekvenci $500$ Hz. Jakou frekvenci slysite? ($v = 340$ m/s)",
      expectedAnswer: "540",
      acceptableAnswers: ["540", "539.7", "539,7", "540 Hz"],
      numericTolerance: 2,
      hints: [
        "Zdroj se blizi: $f' = f \\cdot v/(v - v_{\\text{zdr}})$.",
        "$f' = 500 \\cdot 340/(340 - 25) = 500 \\cdot 340/315$",
      ],
      solutionExplanation: `$$f' = f \\cdot \\frac{v}{v - v_{\\text{zdr}}} = 500 \\cdot \\frac{340}{340 - 25} = 500 \\cdot \\frac{340}{315} \\approx 540 \\text{ Hz}$$`,
      difficulty: "hard" as const,
    },
    {
      id: "mv-i-5",
      problemStatement: "Sanitka odjizdi od vas rychlosti $20$ m/s. Sirena ma frekvenci $900$ Hz. Jakou frekvenci slysite? ($v = 340$ m/s)",
      expectedAnswer: "850",
      acceptableAnswers: ["850", "850 Hz"],
      numericTolerance: 2,
      hints: [
        "Zdroj se vzdaluje: $f' = f \\cdot v/(v + v_{\\text{zdr}})$.",
        "$f' = 900 \\cdot 340/(340 + 20) = 900 \\cdot 340/360$",
      ],
      solutionExplanation: `$$f' = f \\cdot \\frac{v}{v + v_{\\text{zdr}}} = 900 \\cdot \\frac{340}{340 + 20} = 900 \\cdot \\frac{340}{360} = 850 \\text{ Hz}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "Rovnice postupne vlny: $y(x,t) = A\\sin(kx - \\omega t)$, kde $k = 2\\pi/\\lambda$ a $\\omega = 2\\pi f$.",
      "**Konstruktivni interference**: drahovy rozdil $\\Delta l = n\\lambda$. **Destruktivni**: $\\Delta l = (n + 1/2)\\lambda$.",
      "Stojata vlna na strune: $f_n = nv/(2L)$ — harmonicke jsou celociselnymi nasobky zakladni frekvence.",
      "**Dopplerův jev**: $f' = f(v \\pm v_{\\text{poz}})/(v \\mp v_{\\text{zdr}})$ — priblizovani zvysuje frekvenci.",
    ],
    nextTopicSuggestion: "Skvele! Pokracujte na pokrocilou uroven — vlnova rovnice, decibely, difrakce a rezonance.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Complex problems, derivations, real-world
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Mechanicke vlneni a zvuk — vlnova rovnice, intenzita, difrakce, rezonance",
    sections: [
      {
        heading: "Vlnova rovnice",
        body: `Zakladni parcialni diferencialni rovnice popisujici sireni vln v jednom rozmeru:

$$\\boxed{\\frac{\\partial^2 y}{\\partial t^2} = v^2 \\cdot \\frac{\\partial^2 y}{\\partial x^2}}$$

Tato rovnice rika: druha casova derivace vychylky je umerna druhe prostorove derivaci. Koeficient umernosti je $v^2$ (ctverec rychlosti vlny).

**d'Alembertovo reseni** — obecne reseni vlnove rovnice:
$$y(x, t) = F(x - vt) + G(x + vt)$$

kde $F$ je vlna sirici se v $+x$ smeru a $G$ v $-x$ smeru. Funkce $F$ a $G$ jsou libovolne (dvakrat diferencovatelne).

> [!key] Vlnova rovnice plati pro male amplitudy (linearni priblizeni). Pro velke amplitudy (napr. tsunami, razove vlny) jsou potreba nelinearni rovnice.

**Overeni**: Pro $y = A\\sin(kx - \\omega t)$:
$$\\frac{\\partial^2 y}{\\partial t^2} = -\\omega^2 A \\sin(kx - \\omega t)$$
$$v^2 \\frac{\\partial^2 y}{\\partial x^2} = -v^2 k^2 A \\sin(kx - \\omega t)$$

Rovnost plati, pokud $\\omega^2 = v^2 k^2$, tedy $v = \\omega/k$ — to je fazova rychlost.`,
      },
      {
        heading: "Intenzita a hladina zvuku",
        body: `**Intenzita zvuku** $I$ je vykon prenaseny vlnenim na jednotku plochy:

$$\\boxed{I = \\frac{P}{4\\pi r^2}}$$

kde $P$ je akusticky vykon zdroje a $r$ vzdalenost od bodoveho zdroje. Intenzita klesa se ctvercem vzdalenosti (**zakon obraceneho ctverce**).

**Decibelova stupnice** — lidske ucho vnima zvuk logaritmicky:

$$\\boxed{L = 10 \\cdot \\log_{10}\\!\\left(\\frac{I}{I_0}\\right) \\text{ dB}}$$

kde $I_0 = 10^{-12} \\text{ W/m}^2$ je prah slysitelnosti.

$$\\begin{array}{l|c|c} \\text{Zvuk} & I \\text{ (W/m}^2\\text{)} & L \\text{ (dB)} \\\\ \\hline \\text{Prah slysitelnosti} & 10^{-12} & 0 \\\\ \\text{Sepot} & 10^{-10} & 20 \\\\ \\text{Normalni hovor} & 10^{-6} & 60 \\\\ \\text{Rockov\\'y koncert} & 10^{-2} & 100 \\\\ \\text{Prah bolesti} & 1 & 120 \\\\ \\text{Proudovy motor} & 10^2 & 140 \\end{array}$$

> [!info] Zdvojnasobeni intenzity odpovida zvyseni o $\\approx 3$ dB. Zdesaterinsobeni intenzity odpovida $+10$ dB.

**Uzitecne vztahy pro zmenu vzdalenosti:**
Pokud se vzdalenost zmeni z $r_1$ na $r_2$:
$$\\Delta L = 20 \\cdot \\log_{10}\\!\\left(\\frac{r_1}{r_2}\\right) \\text{ dB}$$`,
        examples: [
          {
            problem: "Reproduktor vykonava akusticky vykon $P = 0{,}1$ W. Jaka je intenzita zvuku ve vzdalenosti $5$ m?",
            solution: `$$I = \\frac{P}{4\\pi r^2} = \\frac{0{,}1}{4\\pi \\cdot 25} = \\frac{0{,}1}{314{,}16} \\approx \\color{#16a34a}{3{,}18 \\times 10^{-4} \\text{ W/m}^2}$$

Hladina: $L = 10\\log(3{,}18 \\times 10^{-4} / 10^{-12}) = 10\\log(3{,}18 \\times 10^{8}) \\approx 85$ dB.`,
          },
        ],
      },
      {
        heading: "Huygensův princip a difrakce",
        body: `**Huygensův princip**: Kazdy bod vlnoplochy je zdrojem sekundarnich kulovych vlnek. Nova vlnoplocha je obalkou techto vlnek.

Tento princip vysvetluje:
- **Prímočaré sireni** — v homogennim prostredi
- **Lom (refrakci)** — zmena smeru na rozhrani
- **Ohyb (difrakci)** — sireni vlny za prekazku

**Difrakce na jedne sterbine** sirky $b$:

Prvni difrakci minimum nastava pri uhlu:
$$\\boxed{\\sin \\theta = \\frac{\\lambda}{b}}$$

Pro $n$-te minimum:
$$\\sin \\theta_n = \\frac{n \\cdot \\lambda}{b} \\qquad (n = 1, 2, 3, \\ldots)$$

> [!key] Difrakce je vyrazna, kdyz je velikost prekazky/sterbiny srovnatelna s vlnovou delkou ($b \\approx \\lambda$). Proto zvuk "zataci za roh" (velke $\\lambda$), ale svetlo ne (male $\\lambda$).

**Priklady difrakce zvuku:**
- Slysite hudbu za rohem domu ($\\lambda_{\\text{zvuk}} \\sim 0{,}02 - 17$ m, srovnatelne s rozmery budov)
- Ultrazvuk se siri primocareji nez hluboke tony (kratsi $\\lambda$)`,
        examples: [
          {
            problem: "Zvuk o frekvenci $170$ Hz procazi dvermi sirokyni $1$ m. Pri jakem uhlu je prvni minimum? ($v = 340$ m/s)",
            solution: `$$\\lambda = \\frac{v}{f} = \\frac{340}{170} = 2 \\text{ m}$$
$$\\sin\\theta = \\frac{\\lambda}{b} = \\frac{2}{1} = 2$$
Vysledek $\\sin\\theta > 1$ je nemozny → **zadne minimum neexistuje**. Zvuk se siri do vsech smeru za dvermi (silna difrakce, protoze $\\lambda > b$).`,
          },
        ],
      },
      {
        heading: "Rezonance a vlastni frekvence",
        body: `**Rezonance** nastava, kdyz frekvence budici sily odpovida vlastni frekvenci soustavy. Amplituda kmitani se dramaticky zvysi.

**Vlastni frekvence struny** (upevnena na obou koncich):
$$f_n = \\frac{n \\cdot v}{2L} \\qquad (n = 1, 2, 3, \\ldots)$$

**Otevrena pist'ala** (otevrena na obou koncich):
$$\\boxed{f_n = \\frac{n \\cdot v}{2L}} \\qquad (n = 1, 2, 3, \\ldots)$$
Vsechny harmonicke (sude i liche).

**Zavrena pist'ala** (zavrena na jednom konci):
$$\\boxed{f_n = \\frac{n \\cdot v}{4L}} \\qquad (n = 1, 3, 5, \\ldots \\text{ pouze liche})$$
Pouze liche harmonicke! Na zavrenem konci je uzel, na otevrenem kmitna.

> [!info] **Rezonancni katastrofa**: slavny pripad mostu Tacoma Narrows (1940) — vitr budil vlastni frekvenci mostu, amplituda narostla az k destrukci.

**Tlumene a nucene kmity:**
- **Tlumeni** — energie se rozptyluje (trenim, odporem) → amplituda klesa exponencialne
- **Nucene kmity** — externi sila udrzuje kmitani. Rezonance = frekvence budici sily $\\approx$ vlastni frekvence
- **Cinitel jakosti** $Q$ — meri "ostrost" rezonance. Vyssi $Q$ = uzsi a vyssi rezonancni pik:

$$Q = 2\\pi \\cdot \\frac{\\text{energie v systemu}}{\\text{ztrata energie za periodu}}$$`,
        examples: [
          {
            problem: "Zavrena pist'ala je dlouha $0{,}5$ m. Jakou frekvenci ma jeji zakladni ton a dalsi dve harmonicke? ($v = 340$ m/s)",
            solution: `Zavrena pist'ala — pouze liche harmonicke:
$$f_1 = \\frac{v}{4L} = \\frac{340}{4 \\cdot 0{,}5} = \\frac{340}{2} = \\color{#16a34a}{170 \\text{ Hz}}$$
$$f_3 = 3 \\cdot f_1 = 510 \\text{ Hz}$$
$$f_5 = 5 \\cdot f_1 = 850 \\text{ Hz}$$
(Druha harmonicka $f_2 = 340$ Hz u zavrene pist'aly **nevznikne**.)`,
          },
        ],
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Reproduktor vykonava akusticky vykon $P = 0{,}5$ W. Vypocitejte intenzitu zvuku a hladinu intenzity ve vzdalenosti $r_1 = 2$ m a $r_2 = 10$ m od reproduktoru. O kolik dB se hladina snizi? ($I_0 = 10^{-12}$ W/m$^2$)`,
    steps: [
      {
        instruction: "Intenzita ve vzdalenosti $r_1 = 2$ m",
        math: "$I_1 = \\frac{P}{4\\pi r_1^2} = \\frac{0{,}5}{4\\pi \\cdot 4} = \\frac{0{,}5}{50{,}27} \\approx 9{,}95 \\times 10^{-3} \\text{ W/m}^2$",
        explanation: "Vykon se rozdeli rovnomerne na plochu koule o polomeru $2$ m.",
      },
      {
        instruction: "Hladina intenzity ve vzdalenosti $2$ m",
        math: "$L_1 = 10 \\cdot \\log_{10}\\!\\left(\\frac{9{,}95 \\times 10^{-3}}{10^{-12}}\\right) = 10 \\cdot \\log_{10}(9{,}95 \\times 10^{9}) \\approx 10 \\cdot 10{,}0 = 100{,}0 \\text{ dB}$",
        explanation: "Ve $2$ metrech je hladina priblizne $100$ dB — jako rockovy koncert.",
      },
      {
        instruction: "Intenzita ve vzdalenosti $r_2 = 10$ m",
        math: "$I_2 = \\frac{P}{4\\pi r_2^2} = \\frac{0{,}5}{4\\pi \\cdot 100} = \\frac{0{,}5}{1256{,}6} \\approx 3{,}98 \\times 10^{-4} \\text{ W/m}^2$",
        explanation: "V $10$ metrech je intenzita $25\\times$ mensi nez v $2$ metrech ($r$ je $5\\times$ vetsi, $r^2$ je $25\\times$).",
      },
      {
        instruction: "Hladina intenzity ve vzdalenosti $10$ m",
        math: "$L_2 = 10 \\cdot \\log_{10}\\!\\left(\\frac{3{,}98 \\times 10^{-4}}{10^{-12}}\\right) = 10 \\cdot \\log_{10}(3{,}98 \\times 10^{8}) \\approx 10 \\cdot 8{,}6 = 86{,}0 \\text{ dB}$",
        explanation: "V $10$ metrech je hladina priblizne $86$ dB.",
      },
      {
        instruction: "Pokles hladiny",
        math: "$\\Delta L = L_1 - L_2 = 100{,}0 - 86{,}0 = 14{,}0 \\text{ dB}$",
        explanation: "Alternativne: $\\Delta L = 20\\log(r_2/r_1) = 20\\log(10/2) = 20\\log 5 = 20 \\cdot 0{,}699 \\approx 14{,}0$ dB.",
      },
    ],
    finalAnswer: "Ve vzdalenosti $2$ m: $I_1 \\approx 10^{-2}$ W/m$^2$, $L_1 \\approx 100$ dB. Ve vzdalenosti $10$ m: $I_2 \\approx 4 \\times 10^{-4}$ W/m$^2$, $L_2 \\approx 86$ dB. Pokles: $\\Delta L \\approx 14$ dB.",
  },
  practiceProblems: [
    {
      id: "mv-a-1",
      problemStatement: "Overte, ze funkce $y(x,t) = 5\\sin(3x - 12t)$ je resenim vlnove rovnice $\\partial^2 y/\\partial t^2 = v^2 \\cdot \\partial^2 y/\\partial x^2$. Jaka je rychlost vlny?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4 m/s"],
      hints: [
        "Spocitejte $\\partial^2 y/\\partial t^2$ a $\\partial^2 y/\\partial x^2$.",
        "$\\partial^2 y/\\partial t^2 = -144 \\cdot 5\\sin(\\ldots)$ a $\\partial^2 y/\\partial x^2 = -9 \\cdot 5\\sin(\\ldots)$. Z rovnosti: $v^2 = 144/9$.",
      ],
      solutionExplanation: `$$\\frac{\\partial^2 y}{\\partial t^2} = -144 \\cdot 5\\sin(3x - 12t)$$
$$\\frac{\\partial^2 y}{\\partial x^2} = -9 \\cdot 5\\sin(3x - 12t)$$

Vlnova rovnice: $-144 = v^2 \\cdot (-9) \\implies v^2 = 16 \\implies v = 4$ m/s.

Alternativne: $v = \\omega/k = 12/3 = 4$ m/s.`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-a-2",
      problemStatement: "Hladina zvuku v bodě A je $90$ dB. V bodě B, ktery je $3\\times$ dale od zdroje nez bod A, je hladina kolik dB?",
      expectedAnswer: "80,5",
      acceptableAnswers: ["80,5", "80.5", "80", "80,5 dB", "80.5 dB"],
      numericTolerance: 1,
      hints: [
        "Pokles: $\\Delta L = 20\\log(r_2/r_1) = 20\\log 3$.",
        "$20\\log 3 \\approx 20 \\cdot 0{,}477 = 9{,}54$ dB. Tedy $L_B = 90 - 9{,}54$.",
      ],
      solutionExplanation: `$$\\Delta L = 20 \\cdot \\log_{10}\\!\\left(\\frac{r_B}{r_A}\\right) = 20 \\cdot \\log_{10} 3 \\approx 20 \\cdot 0{,}477 = 9{,}5 \\text{ dB}$$
$$L_B = 90 - 9{,}5 = 80{,}5 \\text{ dB}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-a-3",
      problemStatement: "Zvuk o frekvenci $850$ Hz prochazi sterbinou sirokou $0{,}5$ m. Pri jakem uhlu (ve stupnich) nastane prvni difrakci minimum? ($v = 340$ m/s)",
      expectedAnswer: "53,1",
      acceptableAnswers: ["53", "53,1", "53.1", "53,1 st"],
      numericTolerance: 1,
      hints: [
        "Nejdrive vlnova delka: $\\lambda = v/f = 340/850 = 0{,}4$ m.",
        "$\\sin\\theta = \\lambda/b = 0{,}4/0{,}5 = 0{,}8$. Pak $\\theta = \\arcsin(0{,}8)$.",
      ],
      solutionExplanation: `$$\\lambda = \\frac{v}{f} = \\frac{340}{850} = 0{,}4 \\text{ m}$$
$$\\sin\\theta = \\frac{\\lambda}{b} = \\frac{0{,}4}{0{,}5} = 0{,}8$$
$$\\theta = \\arcsin(0{,}8) \\approx 53{,}1°$$`,
      difficulty: "hard" as const,
    },
    {
      id: "mv-a-4",
      problemStatement: "Otevrena pist'ala ma zakladni frekvenci $262$ Hz (ton C). Jak dlouha je pist'ala? ($v = 340$ m/s)",
      expectedAnswer: "0,649",
      acceptableAnswers: ["0,649", "0.649", "0,65", "0.65", "65 cm"],
      numericTolerance: 0.01,
      hints: [
        "Otevrena pist'ala: $f_1 = v/(2L)$, tedy $L = v/(2f_1)$.",
        "$L = 340/(2 \\cdot 262)$",
      ],
      solutionExplanation: `Otevrena pist'ala: $f_1 = v/(2L)$, tedy:
$$L = \\frac{v}{2f_1} = \\frac{340}{2 \\cdot 262} = \\frac{340}{524} \\approx 0{,}649 \\text{ m} \\approx 65 \\text{ cm}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "mv-a-5",
      problemStatement: "Zavrena pist'ala ma delku $0{,}85$ m. Jaka je frekvence jejiho 3. liche harmonicke (tj. $n = 5$)? ($v = 340$ m/s)",
      expectedAnswer: "500",
      acceptableAnswers: ["500", "500 Hz"],
      hints: [
        "Zavrena pist'ala: $f_n = nv/(4L)$, kde $n$ je liche.",
        "Pro $n = 5$: $f_5 = 5 \\cdot 340 / (4 \\cdot 0{,}85)$",
      ],
      solutionExplanation: `Zavrena pist'ala — pouze liche harmonicke:
$$f_5 = \\frac{5 \\cdot v}{4L} = \\frac{5 \\cdot 340}{4 \\cdot 0{,}85} = \\frac{1700}{3{,}4} = 500 \\text{ Hz}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Vlnova rovnice**: $\\partial^2 y/\\partial t^2 = v^2 \\cdot \\partial^2 y/\\partial x^2$ — zakladni rovnice popisujici sireni vln.",
      "**Intenzita zvuku**: $I = P/(4\\pi r^2)$ klesa se ctvercem vzdalenosti. Hladina: $L = 10\\log(I/I_0)$ dB.",
      "**Huygensův princip**: difrakce na sterbine $\\sin\\theta = \\lambda/b$. Vyrazna, kdyz $\\lambda \\approx b$.",
      "**Otevrena pist'ala**: $f_n = nv/(2L)$, vsechny harmonicke. **Zavrena**: $f_n = nv/(4L)$, jen liche.",
      "**Rezonance**: amplituda roste, kdyz budici frekvence odpovida vlastni frekvenci systemu.",
    ],
    nextTopicSuggestion: "Fantasticky! Nyni mate solidni zaklad mechanickeho vlneni. Muzete pokracovat na elektromagneticke vlneni a optiku.",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Mechanicke vlneni a zvuk\n");

  for (const { label, content, variant } of difficulties) {
    const id = crypto.randomUUID();

    const existing = await client.execute({
      sql: `SELECT id FROM lesson_cache WHERE topic_id = ? AND difficulty = ? AND variant = ?`,
      args: [TOPIC_ID, label, variant],
    });

    if (existing.rows.length > 0) {
      await client.execute({
        sql: `UPDATE lesson_cache SET content = ?, model = ?, prompt_version = ? WHERE id = ?`,
        args: [JSON.stringify(content), "hand-crafted-v2", "v2-brilliant", existing.rows[0].id as string],
      });
      console.log(`  🔄 ${label} — updated`);
      continue;
    }

    await client.execute({
      sql: `INSERT INTO lesson_cache (id, topic_id, difficulty, variant, content, model, prompt_version, generated_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, datetime('now'))`,
      args: [id, TOPIC_ID, label, variant, JSON.stringify(content), "hand-crafted-v2", "v2-brilliant"],
    });

    console.log(`  ✅ ${label} (${id})`);
  }

  console.log("\n🎉 Done! Brilliant-style Mechanicke vlneni a zvuk lessons seeded.\n");
}

main().catch(console.error);
