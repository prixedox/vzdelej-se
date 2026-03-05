import type { LessonContent } from "@/types/lesson";

export const elektrickePoleBeginner: LessonContent = {
  conceptExplanation: {
    title: "Elektricke pole — sila, ktera drzi atomy pohromade",
    sections: [
      {
        heading: "Elektricky naboj",
        body: `Vsechna telesa kolem nas jsou tvorena castici s **elektrickym nabojem**. Existuji dva druhy naboje:

- **Kladny naboj** ($+$) — proton
- **Zaporny naboj** ($-$) — elektron

Zakladni vlastnosti:
$$\\boxed{e = 1{,}6 \\times 10^{-19} \\text{ C}}$$

Toto je **elementarni naboj** — nejmensi naboj, ktery se v prirode vyskytuje samostatne. Kazdy naboj je jeho celociselnym nasobkem: $Q = n \\cdot e$.

$$\\begin{array}{l|c} \\text{Castice} & \\text{Naboj} \\\\ \\hline \\text{Proton} & +e = +1{,}6 \\times 10^{-19} \\text{ C} \\\\ \\text{Elektron} & -e = -1{,}6 \\times 10^{-19} \\text{ C} \\\\ \\text{Neutron} & 0 \\end{array}$$

> [!key] **Zakon zachovani naboje**: Celkovy naboj izolovanou soustavy se nemeni. Naboj nelze vytvorit ani znicet — lze ho jen presunout.

**Vodice a izolatory:**
- **Vodice** (kovy) — elektrony se mohou volne pohybovat
- **Izolatory** (plast, sklo) — elektrony jsou vazany na atomy`,
      },
      {
        heading: "Coulombuv zakon",
        body: `Dva bodove naboje na sebe pusobi silou, kterou popsal Charles-Augustin de Coulomb v roce 1785:

$$\\boxed{F = k \\cdot \\frac{|Q_1| \\cdot |Q_2|}{r^2}}$$

- $k = 8{,}99 \\times 10^9 \\text{ N} \\cdot \\text{m}^2 / \\text{C}^2$ je **Coulombova konstanta**
- $Q_1, Q_2$ jsou naboje (C)
- $r$ je vzdalenost mezi naboji (m)

$$\\begin{array}{l|c} \\text{Situace} & F \\\\ \\hline \\text{Dva protony v jadre (} r \\approx 10^{-15} \\text{ m)} & \\approx 230 \\text{ N} \\\\ \\text{Elektron-proton v atomu (} r \\approx 10^{-10} \\text{ m)} & \\approx 2{,}3 \\times 10^{-8} \\text{ N} \\\\ \\text{Dva naboje 1 C ve vzdalenosti 1 m} & 9 \\times 10^9 \\text{ N} \\end{array}$$

> [!info] Coulombova sila je strukturou stejna jako gravitacni — obe klesaji s $1/r^2$. Ale elektricka sila je asi $10^{36}$ krat silnejsi nez gravitacni!

Smery sily:
- **Souhrnne naboje** ($+$ a $+$, nebo $-$ a $-$) se **odpuzuji**
- **Opacne naboje** ($+$ a $-$) se **pritahuji**`,
        visual: {
          type: "interactive-electric-field",
          props: {
            mode: "coulomb",
            defaultQ1: 5,
            defaultQ2: -5,
            defaultDistance: 10,
            showFieldLines: false,
            showForce: true,
          },
          caption: "Mene vzdalenost a velikost naboju — sledujte, jak se meni Coulombova sila.",
        },
        examples: [
          {
            problem: "Dva naboje $Q_1 = 3 \\text{ } \\mu\\text{C}$ a $Q_2 = -5 \\text{ } \\mu\\text{C}$ jsou ve vzdalenosti $r = 0{,}2$ m. Jaka je velikost sily mezi nimi?",
            solution: `$$F = k \\frac{|Q_1||Q_2|}{r^2} = 8{,}99 \\times 10^9 \\cdot \\frac{3 \\times 10^{-6} \\cdot 5 \\times 10^{-6}}{0{,}04}$$
$$F = 8{,}99 \\times 10^9 \\cdot \\frac{1{,}5 \\times 10^{-11}}{0{,}04} = \\color{#16a34a}{3{,}37 \\text{ N}}$$
Sila je pritazliva (opacne naboje).`,
          },
        ],
      },
      {
        heading: "Elektricke pole",
        body: `Kazdy naboj kolem sebe vytvari **elektricke pole**. Pole popisujeme velicinou **intenzita elektrickeho pole** $\\vec{E}$:

$$\\boxed{E = \\frac{F}{q} = k \\cdot \\frac{Q}{r^2}}$$

- $F$ je sila na zkusebni naboj $q$ (N)
- $q$ je zkusebni (maly kladny) naboj (C)
- $Q$ je naboj, ktery pole vytvari (C)
- $r$ je vzdalenost od naboje $Q$ (m)

Jednotka: $[E] = \\text{N/C} = \\text{V/m}$

**Silocary** (pole lines):
- Vychazeji z **kladnych** naboju a smeruji do **zapornych**
- Tam, kde jsou silocary hustejsi, je pole **silnejsi**
- Silocary se nikdy nekrizi

> [!key] **Princip superpozice**: Intenzita pole vice naboju je vektorovy soucet intenzit od jednotlivych naboju: $\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + \\ldots$`,
        visual: {
          type: "interactive-electric-field",
          props: {
            mode: "field",
            defaultQ1: 8,
            defaultQ2: -3,
            showFieldLines: true,
            showForce: false,
          },
          caption: "Sledujte silocary — vychazeji z kladneho naboje a smeruji do zaporneho. Zmente naboje a pozorujte zmeny!",
        },
      },
      {
        heading: "Elektricky potencial a napeti",
        body: `**Elektricky potencial** $V$ je energie na jednotku naboje:

$$\\boxed{V = k \\cdot \\frac{Q}{r}}$$

Jednotka: $[V] = \\text{V (volt)} = \\text{J/C}$

**Napeti** (rozdil potencialu):
$$\\boxed{U = V_1 - V_2}$$

V **homogennim poli** (napr. mezi deskami kondenzatoru) plati jednoduchy vztah:
$$\\boxed{E = \\frac{U}{d}}$$

kde $d$ je vzdalenost mezi deskami.

$$\\begin{array}{l|c} \\text{Situace} & U \\\\ \\hline \\text{Baterie} & 1{,}5 \\text{ V} \\\\ \\text{Zasuvka v CR} & 230 \\text{ V} \\\\ \\text{Blesk} & \\approx 10^8 \\text{ V} \\\\ \\text{Vandegraafuv generator} & \\approx 10^5 \\text{ V} \\end{array}$$

> [!tip] Potencial je **skalerni** velicina (ne vektor) — coz vyrazne zjednodusuje vypocty. Napeti je to, co 'ctime' pri zasahu elektrickym proudem.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Dva bodove naboje $Q_1 = 4 \\text{ } \\mu\\text{C}$ a $Q_2 = -6 \\text{ } \\mu\\text{C}$ jsou ve vzdalenosti $r = 30$ cm. Vypoctete velikost elektricke sily mezi nimi.`,
    steps: [
      {
        instruction: "Zapiste Coulombuv zakon",
        math: "$F = k \\cdot \\frac{|Q_1| \\cdot |Q_2|}{r^2}$",
        explanation: "Pouzijeme vzorec pro silu mezi dvema bodovymi naboji.",
      },
      {
        instruction: "Prevedte jednotky",
        math: "$Q_1 = 4 \\times 10^{-6} \\text{ C}, \\quad Q_2 = 6 \\times 10^{-6} \\text{ C}, \\quad r = 0{,}3 \\text{ m}$",
        explanation: "Mikrocoulomby prevedeme na coulomby, centimetry na metry.",
      },
      {
        instruction: "Dosadte do vzorce",
        math: "$F = 8{,}99 \\times 10^9 \\cdot \\frac{4 \\times 10^{-6} \\cdot 6 \\times 10^{-6}}{(0{,}3)^2}$",
        explanation: "Dosadime vsechny hodnoty.",
      },
      {
        instruction: "Vypocitejte",
        math: "$F = 8{,}99 \\times 10^9 \\cdot \\frac{2{,}4 \\times 10^{-11}}{0{,}09} = 8{,}99 \\times 10^9 \\cdot 2{,}667 \\times 10^{-10} = 2{,}4 \\text{ N}$",
        explanation: "Sila je pritazliva, protoze naboje maji opacna znamenka.",
      },
    ],
    finalAnswer: "Sila mezi naboji je $F \\approx 2{,}4$ N. Protoze naboje maji opacna znamenka, jedna se o pritazlivou silu.",
  },
  practiceProblems: [
    {
      id: "ep-b-1",
      problemStatement: "Dva bodove naboje $Q_1 = Q_2 = 2 \\text{ } \\mu\\text{C}$ jsou ve vzdalenosti $r = 10$ cm. Jaka je velikost sily mezi nimi? ($k = 9 \\times 10^9$)",
      expectedAnswer: "3.6",
      acceptableAnswers: ["3.6", "3,6", "3.6 N", "3,6 N"],
      numericTolerance: 0.1,
      hints: [
        "$F = k \\cdot Q_1 Q_2 / r^2$.",
        "$F = 9 \\times 10^9 \\cdot \\frac{(2 \\times 10^{-6})^2}{(0{,}1)^2}$",
      ],
      solutionExplanation: `$$F = k \\frac{Q_1 Q_2}{r^2} = 9 \\times 10^9 \\cdot \\frac{(2 \\times 10^{-6})^2}{(0{,}1)^2} = 9 \\times 10^9 \\cdot \\frac{4 \\times 10^{-12}}{10^{-2}} = 3{,}6 \\text{ N}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ep-b-2",
      problemStatement: "Jak se zmeni Coulombova sila, kdyz zdvojnasobime vzdalenost mezi naboji?",
      expectedAnswer: "4",
      acceptableAnswers: ["4", "4x", "4-krat mensi", "ctyrikrat mensi", "klesne na ctvrtinu"],
      hints: [
        "$F \\propto 1/r^2$.",
        "Kdyz $r \\to 2r$: $F \\to F/(2^2)$",
      ],
      solutionExplanation: `$$F \\propto \\frac{1}{r^2} \\implies \\text{pri } r \\to 2r: \\quad F \\to \\frac{F}{4}$$
Coulombova sila klesne na **ctvrtinu**.`,
      difficulty: "easy" as const,
    },
    {
      id: "ep-b-3",
      problemStatement: "Jaka je intenzita elektrickeho pole ve vzdalenosti $r = 0{,}5$ m od bodoveho naboje $Q = 10 \\text{ } \\mu\\text{C}$? ($k = 9 \\times 10^9$)",
      expectedAnswer: "360000",
      acceptableAnswers: ["360000", "360 000", "360000 N/C", "360000 V/m", "3.6e5", "360 kV/m"],
      numericTolerance: 5000,
      hints: [
        "$E = k \\cdot Q / r^2$.",
        "$E = 9 \\times 10^9 \\cdot \\frac{10 \\times 10^{-6}}{0{,}25}$",
      ],
      solutionExplanation: `$$E = k \\frac{Q}{r^2} = 9 \\times 10^9 \\cdot \\frac{10 \\times 10^{-6}}{(0{,}5)^2} = 9 \\times 10^9 \\cdot \\frac{10^{-5}}{0{,}25} = 3{,}6 \\times 10^5 \\text{ N/C}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-b-4",
      problemStatement: "Jaky je elektricky potencial ve vzdalenosti $r = 0{,}2$ m od naboje $Q = 5 \\text{ } \\mu\\text{C}$? ($k = 9 \\times 10^9$)",
      expectedAnswer: "225000",
      acceptableAnswers: ["225000", "225 000", "225000 V", "225 kV", "2.25e5"],
      numericTolerance: 3000,
      hints: [
        "$V = k \\cdot Q / r$.",
        "$V = 9 \\times 10^9 \\cdot \\frac{5 \\times 10^{-6}}{0{,}2}$",
      ],
      solutionExplanation: `$$V = k \\frac{Q}{r} = 9 \\times 10^9 \\cdot \\frac{5 \\times 10^{-6}}{0{,}2} = 9 \\times 10^9 \\cdot 2{,}5 \\times 10^{-5} = 2{,}25 \\times 10^5 \\text{ V}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-b-5",
      problemStatement: "Mezi deskami kondenzatoru je napeti $U = 200$ V a vzdalenost desek je $d = 5$ mm. Jaka je intenzita homogenniho pole mezi deskami?",
      expectedAnswer: "40000",
      acceptableAnswers: ["40000", "40 000", "40000 V/m", "40 kV/m", "4e4"],
      numericTolerance: 500,
      hints: [
        "$E = U / d$.",
        "$E = 200 / 0{,}005$",
      ],
      solutionExplanation: `$$E = \\frac{U}{d} = \\frac{200}{0{,}005} = 40\\,000 \\text{ V/m} = 40 \\text{ kV/m}$$`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Elementarni naboj**: $e = 1{,}6 \\times 10^{-19}$ C — zakladni jednotka naboje.",
      "**Coulombuv zakon**: $F = k Q_1 Q_2 / r^2$ — sila mezi naboji klesa se ctvercem vzdalenosti.",
      "**Intenzita pole**: $E = F/q = kQ/r^2$ — udava silu na jednotkovy naboj.",
      "**Potencial**: $V = kQ/r$ — energie na jednotku naboje; napeti $U = V_1 - V_2$.",
      "**Homogenni pole**: $E = U/d$ — mezi deskami kondenzatoru je pole rovnomerne.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na pokrocilejsi temata — superpozici poli, kondenzatory a praci v elektrickem poli.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Superpozice, práce, kondenzátory
// ═══════════════════════════════════════════════════════════════;

export const elektrickePoleIntermediate: LessonContent = {
  conceptExplanation: {
    title: "Elektricke pole — superpozice, kondenzatory a energie",
    sections: [
      {
        heading: "Intenzita pole vice naboju",
        body: `Podle **principu superpozice** se intenzity od jednotlivych naboju scitaji vektorove:

$$\\boxed{\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + \\ldots + \\vec{E}_n}$$

**Elektricky dipol** — dva opacne naboje $+Q$ a $-Q$ ve vzdalenosti $d$:

Na ose dipolu ve velke vzdalenosti $r \\gg d$:
$$E_{\\text{osa}} \\approx \\frac{1}{4\\pi\\varepsilon_0} \\cdot \\frac{2p}{r^3}$$

kde $p = Qd$ je **dipolovy moment**.

**Homogenni pole mezi rovnobeznych deskami:**
$$\\boxed{E = \\frac{U}{d} = \\frac{\\sigma}{\\varepsilon_0}}$$

kde $\\sigma = Q/A$ je plosna hustota naboje a $\\varepsilon_0 = 8{,}854 \\times 10^{-12} \\text{ F/m}$.

> [!key] Pole mezi deskami je **homogenni** (vsude stejna velikost i smer). Proto je deskovy kondenzator zakladni soucasti elektroniky.`,
        visual: {
          type: "interactive-electric-field",
          props: {
            mode: "both",
            defaultQ1: 5,
            defaultQ2: 5,
            showFieldLines: true,
            showForce: true,
          },
          caption: "Dva kladne naboje se odpuzuji. Sledujte silocary a smer sily. Zkuste zmenit znamenko jednoho naboje!",
        },
        examples: [
          {
            problem: "Dva naboje $Q_1 = +4 \\text{ } \\mu\\text{C}$ a $Q_2 = -4 \\text{ } \\mu\\text{C}$ jsou ve vzdalenosti $d = 20$ cm. Jaka je intenzita pole v bode presne uprostred mezi nimi?",
            solution: `Vzdalenost kazdeho naboje od stredu: $r = 10$ cm $= 0{,}1$ m.
$$E_1 = k \\frac{|Q_1|}{r^2} = 9 \\times 10^9 \\cdot \\frac{4 \\times 10^{-6}}{0{,}01} = 3{,}6 \\times 10^6 \\text{ N/C}$$
Oba vektory smeruji **stejnym smerem** (od $+$ k $-$), takze:
$$E = E_1 + E_2 = 2 \\cdot 3{,}6 \\times 10^6 = \\color{#16a34a}{7{,}2 \\times 10^6 \\text{ N/C}}$$`,
          },
        ],
      },
      {
        heading: "Prace v elektrickem poli",
        body: `Kdyz se naboj $q$ pohybuje v elektrickem poli, pole na nem kona **praci**:

V homogennim poli:
$$\\boxed{W = q \\cdot U = q \\cdot E \\cdot d}$$

Obecne (pro bodove naboje):
$$\\boxed{W = q(V_1 - V_2)}$$

**Potencialni energie** dvou bodovych naboju:
$$\\boxed{E_p = k \\cdot \\frac{Q_1 \\cdot Q_2}{r}}$$

- $E_p > 0$ pro souhrnne naboje (odpudive)
- $E_p < 0$ pro opacne naboje (pritazlive)

> [!info] Kdyz pustite elektron v elektrickem poli, zrychluje smerem k vyssimu potencialu. Ziskava kineticku energii $E_k = qU$ — to je princip urychlovacu castic!`,
        examples: [
          {
            problem: "Elektron ($q = -1{,}6 \\times 10^{-19}$ C) projde napetim $U = 1000$ V. Jakou kineticku energii ziska?",
            solution: `$$E_k = |q| \\cdot U = 1{,}6 \\times 10^{-19} \\cdot 1000 = \\color{#16a34a}{1{,}6 \\times 10^{-16} \\text{ J} = 1 \\text{ keV}}$$
Toto je definice jednotky elektronvolt: $1 \\text{ eV} = 1{,}6 \\times 10^{-19}$ J.`,
          },
        ],
      },
      {
        heading: "Kondenzator",
        body: `**Kondenzator** je soucasti, ktera uklada elektricky naboj a energii.

**Kapacita** — kolik naboje pojme na dany volt:
$$\\boxed{C = \\frac{Q}{U}}$$

Jednotka: $[C] = \\text{F (farad)} = \\text{C/V}$

**Deskovy kondenzator** (dve rovnobezne desky o plose $A$, vzdalenost $d$):
$$\\boxed{C = \\varepsilon_0 \\cdot \\varepsilon_r \\cdot \\frac{A}{d}}$$

kde $\\varepsilon_r$ je **relativni permitivita** dielektrika ($\\varepsilon_r = 1$ pro vakuum, $\\approx 80$ pro vodu).

**Energie ulozena v kondenzatoru:**
$$\\boxed{E = \\frac{1}{2} C U^2 = \\frac{1}{2} Q U = \\frac{Q^2}{2C}}$$

$$\\begin{array}{l|c|c} \\text{Kondenzator} & C & E \\\\ \\hline \\text{Keramicky (elektronika)} & \\approx 100 \\text{ pF} & \\approx 10^{-8} \\text{ J} \\\\ \\text{Elektrolyticky} & \\approx 1000 \\text{ } \\mu\\text{F} & \\approx 0{,}01 \\text{ J} \\\\ \\text{Superkondenzator} & \\approx 1 \\text{ F} & \\approx 1 \\text{ J} \\end{array}$$

> [!tip] Farad je obrovska jednotka — bezne kondenzatory maji kapacitu v pikofaradech ($10^{-12}$ F) az mikrofaradech ($10^{-6}$ F).`,
      },
      {
        heading: "Spojovani kondenzatoru",
        body: `Kondenzatory lze spojit dvema zpusoby:

**Paralelni zapojeni** (soucet kapacit):
$$\\boxed{C_{\\text{celk}} = C_1 + C_2 + \\ldots + C_n}$$

Vsechny kondenzatory maji **stejne napeti**, naboje se scitaji.

**Seriove zapojeni** (soucet prevracenich hodnot):
$$\\boxed{\\frac{1}{C_{\\text{celk}}} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\ldots + \\frac{1}{C_n}}$$

Vsechny kondenzatory maji **stejny naboj**, napeti se scitaji.

Pro dva kondenzatory v serii:
$$C_{\\text{celk}} = \\frac{C_1 \\cdot C_2}{C_1 + C_2}$$

> [!key] Pozor — je to **presne naopak** nez u rezistoru! Kondenzatory v serii maji mensi kapacitu, v paralelu vetsi. U rezistoru je to naopak.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Deskovy kondenzator ma desky o plose $A = 200 \\text{ cm}^2$, vzdalenost desek $d = 2$ mm a je pripojen na napeti $U = 100$ V. Vypoctete: a) kapacitu $C$, b) naboj $Q$, c) intenzitu pole $E$, d) energii $W$.`,
    steps: [
      {
        instruction: "Vypoctete kapacitu",
        math: "$C = \\varepsilon_0 \\frac{A}{d} = 8{,}854 \\times 10^{-12} \\cdot \\frac{200 \\times 10^{-4}}{2 \\times 10^{-3}} = 8{,}854 \\times 10^{-12} \\cdot 10 = 88{,}5 \\text{ pF}$",
        explanation: "Prevedeme plochu na $\\text{m}^2$ ($200 \\text{ cm}^2 = 0{,}02 \\text{ m}^2$) a vzdalenost na m.",
      },
      {
        instruction: "Vypoctete naboj na deskach",
        math: "$Q = C \\cdot U = 88{,}5 \\times 10^{-12} \\cdot 100 = 8{,}85 \\times 10^{-9} \\text{ C} = 8{,}85 \\text{ nC}$",
        explanation: "Z definice kapacity $C = Q/U$.",
      },
      {
        instruction: "Vypoctete intenzitu pole",
        math: "$E = \\frac{U}{d} = \\frac{100}{2 \\times 10^{-3}} = 50\\,000 \\text{ V/m} = 50 \\text{ kV/m}$",
        explanation: "V homogennim poli mezi deskami plati $E = U/d$.",
      },
      {
        instruction: "Vypoctete energii",
        math: "$W = \\frac{1}{2} C U^2 = \\frac{1}{2} \\cdot 88{,}5 \\times 10^{-12} \\cdot 100^2 = 4{,}43 \\times 10^{-7} \\text{ J} = 0{,}443 \\text{ } \\mu\\text{J}$",
        explanation: "Energie ulozena v kondenzatoru.",
      },
    ],
    finalAnswer: "Kapacita $C = 88{,}5$ pF, naboj $Q = 8{,}85$ nC, intenzita $E = 50$ kV/m, energie $W = 0{,}443 \\text{ } \\mu\\text{J}$.",
  },
  practiceProblems: [
    {
      id: "ep-i-1",
      problemStatement: "Dva naboje $Q_1 = +3 \\text{ } \\mu\\text{C}$ a $Q_2 = +3 \\text{ } \\mu\\text{C}$ jsou ve vzdalenosti $d = 40$ cm. Jaka je intenzita pole v bode presne uprostred mezi nimi?",
      expectedAnswer: "0",
      acceptableAnswers: ["0", "0 N/C", "nula", "nulova"],
      hints: [
        "Oba naboje jsou stejne — intenzity v bode uprostred miri na opacne strany.",
        "Vektorovy soucet dvou stejne velkych protismernych vektoru je nula.",
      ],
      solutionExplanation: `Oba naboje jsou kladne a stejne velke. V bode uprostred miri $\\vec{E}_1$ doleva a $\\vec{E}_2$ doprava (obe od sveho naboje smerem ven). Protoze $|E_1| = |E_2|$, vysledna intenzita je **nulova**.`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-i-2",
      problemStatement: "Elektron ($m = 9{,}1 \\times 10^{-31}$ kg, $q = 1{,}6 \\times 10^{-19}$ C) je urychlen napetim $U = 500$ V. Jakou rychlost ziska? (Vychozi rychlost je nulova.)",
      expectedAnswer: "1.33e7",
      acceptableAnswers: ["1.33e7", "1,33e7", "13300000", "13 300 km/s", "1.33 * 10^7"],
      numericTolerance: 200000,
      hints: [
        "Energie: $E_k = qU = \\frac{1}{2}mv^2$.",
        "$v = \\sqrt{\\frac{2qU}{m}}$",
      ],
      solutionExplanation: `$$E_k = qU = 1{,}6 \\times 10^{-19} \\cdot 500 = 8 \\times 10^{-17} \\text{ J}$$
$$v = \\sqrt{\\frac{2E_k}{m}} = \\sqrt{\\frac{2 \\cdot 8 \\times 10^{-17}}{9{,}1 \\times 10^{-31}}} = \\sqrt{1{,}758 \\times 10^{14}} \\approx 1{,}33 \\times 10^7 \\text{ m/s}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-i-3",
      problemStatement: "Deskovy kondenzator ma kapacitu $C = 50$ pF a je pripojen na napeti $U = 200$ V. Kolik energie je v nem ulozeno?",
      expectedAnswer: "1e-6",
      acceptableAnswers: ["1e-6", "0.000001", "1 uJ", "10^-6 J", "0,000001"],
      numericTolerance: 1e-7,
      hints: [
        "$E = \\frac{1}{2}CU^2$.",
        "$E = \\frac{1}{2} \\cdot 50 \\times 10^{-12} \\cdot 200^2$",
      ],
      solutionExplanation: `$$E = \\frac{1}{2}CU^2 = \\frac{1}{2} \\cdot 50 \\times 10^{-12} \\cdot (200)^2 = \\frac{1}{2} \\cdot 50 \\times 10^{-12} \\cdot 4 \\times 10^4 = 1 \\times 10^{-6} \\text{ J} = 1 \\text{ } \\mu\\text{J}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ep-i-4",
      problemStatement: "Dva kondenzatory $C_1 = 10 \\text{ } \\mu\\text{F}$ a $C_2 = 20 \\text{ } \\mu\\text{F}$ jsou zapojeny seriove. Jaka je celkova kapacita?",
      expectedAnswer: "6.67",
      acceptableAnswers: ["6.67", "6,67", "6.67 uF", "6,67 uF", "20/3"],
      numericTolerance: 0.1,
      hints: [
        "$1/C = 1/C_1 + 1/C_2$.",
        "$C = \\frac{C_1 C_2}{C_1 + C_2} = \\frac{10 \\cdot 20}{10 + 20}$",
      ],
      solutionExplanation: `$$C = \\frac{C_1 C_2}{C_1 + C_2} = \\frac{10 \\cdot 20}{10 + 20} = \\frac{200}{30} = 6{,}67 \\text{ } \\mu\\text{F}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ep-i-5",
      problemStatement: "Deskovy kondenzator ($A = 100 \\text{ cm}^2$, $d = 1$ mm) je vyplnen dielektrikem s $\\varepsilon_r = 5$. Jaka je jeho kapacita?",
      expectedAnswer: "443",
      acceptableAnswers: ["443", "443 pF", "442.5", "442,5", "442.5 pF"],
      numericTolerance: 5,
      hints: [
        "$C = \\varepsilon_0 \\varepsilon_r \\frac{A}{d}$.",
        "$C = 8{,}854 \\times 10^{-12} \\cdot 5 \\cdot \\frac{100 \\times 10^{-4}}{10^{-3}}$",
      ],
      solutionExplanation: `$$C = \\varepsilon_0 \\varepsilon_r \\frac{A}{d} = 8{,}854 \\times 10^{-12} \\cdot 5 \\cdot \\frac{10^{-2}}{10^{-3}} = 8{,}854 \\times 10^{-12} \\cdot 50 = 4{,}43 \\times 10^{-10} \\text{ F} = 443 \\text{ pF}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Superpozice**: Intenzita pole vice naboju = vektorovy soucet $\\vec{E} = \\vec{E}_1 + \\vec{E}_2 + \\ldots$",
      "**Prace v poli**: $W = qU = qEd$ — energie, kterou naboj ziska pri pruchodu napetim.",
      "**Kapacita kondenzatoru**: $C = Q/U$; pro deskovy $C = \\varepsilon_0 \\varepsilon_r A/d$.",
      "**Energie kondenzatoru**: $E = \\frac{1}{2}CU^2$ — ulozena v elektrickem poli.",
      "**Spojovani**: Seriove $1/C = 1/C_1 + 1/C_2$; paralelni $C = C_1 + C_2$ — opak rezistoru!",
    ],
    nextTopicSuggestion: "Pokracujte na pokrocile tema — Gaussuv zakon, pole vodicu a energie elektrickeho pole.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Gaussův zákon, vodiče, dielektrika, energie pole
// ═══════════════════════════════════════════════════════════════;

export const elektrickePoleAdvanced: LessonContent = {
  conceptExplanation: {
    title: "Elektricke pole — Gaussuv zakon, vodice a energie pole",
    sections: [
      {
        heading: "Gaussuv zakon",
        body: `Gaussuv zakon je jednim ze ctyr **Maxwellovych rovnic** a umoznuje elegantne vypocitat pole symetrickych rozlozeni naboje:

$$\\boxed{\\Phi_E = \\oint \\vec{E} \\cdot d\\vec{A} = \\frac{Q_{\\text{vnitrni}}}{\\varepsilon_0}}$$

- $\\Phi_E$ je **elektricky tok** (N$\\cdot$m$^2$/C)
- $Q_{\\text{vnitrni}}$ je celkovy naboj uvnitr uzavrene plochy

**Aplikace na typicka rozlozeni:**

1. **Nabitá koule** (poloměr $R$, naboj $Q$):
   - Vne ($r > R$): $E = \\frac{Q}{4\\pi\\varepsilon_0 r^2}$ (jako bodovy naboj)
   - Uvnitr ($r < R$): $E = \\frac{Qr}{4\\pi\\varepsilon_0 R^3}$ (roste linearne)

2. **Nekonecna nabita rovina** (plosny naboj $\\sigma$):
$$E = \\frac{\\sigma}{2\\varepsilon_0}$$

3. **Nekonecny valec** (delkovy naboj $\\lambda$):
$$E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}$$

> [!key] Gaussuv zakon je ekvivalentni Coulombovu zakonu, ale je mnohem **vyhodnejsi** pro symetricke rozlozeni naboje. Klicove je spravne zvolit Gaussovu plochu!`,
        examples: [
          {
            problem: "Nabita koule o polomeru $R = 10$ cm ma celkovy naboj $Q = 2 \\text{ } \\mu\\text{C}$. Jaka je intenzita pole ve vzdalenosti $r = 30$ cm od stredu?",
            solution: `Pro $r > R$ pouzijeme Gaussuv zakon s kulovou plochou:
$$E = \\frac{Q}{4\\pi\\varepsilon_0 r^2} = \\frac{kQ}{r^2} = \\frac{9 \\times 10^9 \\cdot 2 \\times 10^{-6}}{(0{,}3)^2} = \\frac{1{,}8 \\times 10^4}{0{,}09} = \\color{#16a34a}{2 \\times 10^5 \\text{ N/C}}$$`,
          },
        ],
      },
      {
        heading: "Pole nabiteho vodice",
        body: `Vodice maji v elektrostatice zvlastni vlastnosti:

1. **Uvnitr vodice je $E = 0$** — volne elektrony se presunou tak, ze vnitrni pole uplne vyruci.

2. **Naboj je jen na povrchu** — zadny prebytecny naboj nemuze byt uvnitr vodice v rovnovaze.

3. **Povrch vodice je ekvipotencionalni** — cely vodic ma stejny potencial.

4. **Pole tesne u povrchu**:
$$\\boxed{E = \\frac{\\sigma}{\\varepsilon_0}}$$

kde $\\sigma$ je lokalni plosna hustota naboje.

5. **Naboj se hromadi na spickach** — kde je maly polomer krivosti, je vysoka $\\sigma$ a silne pole.

**Faradayova klec:**
Dute vodive teleso stini vnitrni prostor od vnejsich elektrickych poli. Princip: naboje na povrchu se prerozdi tak, ze vnitrni pole je nulove.

> [!info] Faradayova klec chrani elektroniku v letadlech behem blesku. Auto je taky 'klec' — pri zasahu bleskem jste uvnitr v bezpeci.`,
      },
      {
        heading: "Dielektrika",
        body: `**Dielektrikum** je izolacni material vlozeny do elektrickeho pole. Klicove koncepty:

**Polarizace**: Molekuly dielektrika se v poli natoci (nebo se v nich indukuje dipol):
- **Polarni dielektrika** (H$_2$O) — stale dipoly se natoci
- **Nepolarni dielektrika** (parafin) — pole indukuje dipoly

**Relativni permitivita** $\\varepsilon_r$ (> 1) oslabuje pole:
$$E_{\\text{diel}} = \\frac{E_0}{\\varepsilon_r}$$

$$\\begin{array}{l|c} \\text{Material} & \\varepsilon_r \\\\ \\hline \\text{Vakuum} & 1 \\\\ \\text{Vzduch} & 1{,}0006 \\\\ \\text{Sklo} & 5 - 10 \\\\ \\text{Voda} & 80 \\\\ \\text{Titan barnatý (BaTiO}_3\\text{)} & \\approx 1000 \\end{array}$$

**Prurazne napeti**: Pri prilis silnem poli dielektrikum ztrati izolacni vlastnosti:
- Vzduch: $\\approx 3 \\text{ kV/mm}$
- Sklo: $\\approx 10 - 40 \\text{ kV/mm}$
- Transformatorovy olej: $\\approx 15 \\text{ kV/mm}$

> [!tip] Dielektrikum v kondenzatoru zvysuje kapacitu $\\varepsilon_r$-krat, protoze castecne kompenzuje pole mezi deskami — na desky se 'vejde' vice naboje.`,
      },
      {
        heading: "Energie elektrickeho pole",
        body: `Energie neni ulozena jen 'v kondenzatoru', ale primo **v elektrickem poli**. Hustota energie:

$$\\boxed{w = \\frac{1}{2} \\varepsilon_0 E^2}$$

Jednotka: $[w] = \\text{J/m}^3$

S dielektrikem:
$$w = \\frac{1}{2} \\varepsilon_0 \\varepsilon_r E^2$$

**Overeni na deskovem kondenzatoru:**
Objem pole: $V_{\\text{objem}} = A \\cdot d$
$$W = w \\cdot V_{\\text{objem}} = \\frac{1}{2} \\varepsilon_0 \\left(\\frac{U}{d}\\right)^2 \\cdot A \\cdot d = \\frac{1}{2} \\varepsilon_0 \\frac{A}{d} U^2 = \\frac{1}{2} C U^2 \\quad \\checkmark$$

To je presne vzorec pro energii kondenzatoru — coz potvrzuje, ze energie je skutecne v poli!

**Energie v poli nabite koule** (polomer $R$, naboj $Q$):
$$W = \\int_R^{\\infty} \\frac{1}{2}\\varepsilon_0 E^2 \\cdot 4\\pi r^2 \\, dr = \\frac{Q^2}{8\\pi\\varepsilon_0 R} = \\frac{kQ^2}{2R}$$

> [!key] Pohled pres energii pole je zakladem moderni fyziky. Elektromagneticke vlny (svetlo, radio) jsou vlastne **energie putujici polem** prostorem.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Vodiva koule o polomeru $R = 5$ cm nese naboj $Q = 1 \\text{ } \\mu\\text{C}$. Pomoci Gaussova zakona urcete: a) intenzitu pole ve vzdalenosti $r = 10$ cm od stredu, b) intenzitu uvnitr koule ($r = 3$ cm), c) potencial na povrchu.`,
    steps: [
      {
        instruction: "Aplikujte Gaussuv zakon pro $r = 10$ cm (vne koule)",
        math: "$\\oint \\vec{E} \\cdot d\\vec{A} = E \\cdot 4\\pi r^2 = \\frac{Q}{\\varepsilon_0}$",
        explanation: "Gaussova plocha je koule o polomeru $r = 0{,}1$ m. Pole je vsude kolme na tuto plochu a ma vsude stejnou velikost (kulova symetrie).",
      },
      {
        instruction: "Vyjadrte $E$ vne koule",
        math: "$E = \\frac{Q}{4\\pi\\varepsilon_0 r^2} = \\frac{kQ}{r^2} = \\frac{9 \\times 10^9 \\cdot 10^{-6}}{(0{,}1)^2} = \\frac{9000}{0{,}01} = 9 \\times 10^5 \\text{ N/C}$",
        explanation: "Vne nabite koule se pole chova presne jako od bodoveho naboje ve stredu.",
      },
      {
        instruction: "Urcte $E$ uvnitr koule ($r = 3$ cm)",
        math: "$E = 0$",
        explanation: "Uvnitr vodive koule je $Q_{\\text{vnitrni}} = 0$ (veskery naboj je na povrchu). Podle Gaussova zakona: $E \\cdot 4\\pi r^2 = 0 \\implies E = 0$.",
      },
      {
        instruction: "Vypoctete potencial na povrchu",
        math: "$V = \\frac{kQ}{R} = \\frac{9 \\times 10^9 \\cdot 10^{-6}}{0{,}05} = 1{,}8 \\times 10^5 \\text{ V} = 180 \\text{ kV}$",
        explanation: "Potencial na povrchu vodive koule — vsimněte si, ze je vsude stejny (ekvipotencialni povrch).",
      },
    ],
    finalAnswer: "Vne koule ($r = 10$ cm): $E = 900$ kN/C. Uvnitr koule: $E = 0$. Potencial na povrchu: $V = 180$ kV.",
  },
  practiceProblems: [
    {
      id: "ep-a-1",
      problemStatement: "Nekonecna nabita rovina ma plosny naboj $\\sigma = 4 \\text{ } \\mu\\text{C/m}^2$. Jaka je intenzita pole? ($\\varepsilon_0 = 8{,}85 \\times 10^{-12}$)",
      expectedAnswer: "226000",
      acceptableAnswers: ["226000", "226 000", "226000 N/C", "226 kN/C", "2.26e5"],
      numericTolerance: 3000,
      hints: [
        "$E = \\sigma / (2\\varepsilon_0)$.",
        "$E = \\frac{4 \\times 10^{-6}}{2 \\cdot 8{,}85 \\times 10^{-12}}$",
      ],
      solutionExplanation: `$$E = \\frac{\\sigma}{2\\varepsilon_0} = \\frac{4 \\times 10^{-6}}{2 \\cdot 8{,}85 \\times 10^{-12}} = \\frac{4 \\times 10^{-6}}{1{,}77 \\times 10^{-11}} \\approx 2{,}26 \\times 10^5 \\text{ N/C}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-a-2",
      problemStatement: "Vodiva koule ($R = 20$ cm, $Q = 5 \\text{ } \\mu\\text{C}$). Jaka je intenzita pole na povrchu? ($k = 9 \\times 10^9$)",
      expectedAnswer: "1125000",
      acceptableAnswers: ["1125000", "1 125 000", "1125 kN/C", "1.125e6", "1,125 MN/C"],
      numericTolerance: 15000,
      hints: [
        "Na povrchu: $E = kQ/R^2$.",
        "$E = 9 \\times 10^9 \\cdot \\frac{5 \\times 10^{-6}}{(0{,}2)^2}$",
      ],
      solutionExplanation: `$$E = \\frac{kQ}{R^2} = \\frac{9 \\times 10^9 \\cdot 5 \\times 10^{-6}}{(0{,}2)^2} = \\frac{4{,}5 \\times 10^4}{0{,}04} = 1{,}125 \\times 10^6 \\text{ N/C}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-a-3",
      problemStatement: "Kondenzator ($C = 100 \\text{ } \\mu\\text{F}$, $U = 50$ V) je vyplnen dielektrikem s $\\varepsilon_r = 4$. Jaka by byla jeho kapacita bez dielektrika?",
      expectedAnswer: "25",
      acceptableAnswers: ["25", "25 uF", "25 mikrofaradu"],
      numericTolerance: 1,
      hints: [
        "Dielektrikum zvysuje kapacitu $\\varepsilon_r$-krat: $C = \\varepsilon_r C_0$.",
        "$C_0 = C / \\varepsilon_r = 100 / 4$",
      ],
      solutionExplanation: `$$C = \\varepsilon_r \\cdot C_0 \\implies C_0 = \\frac{C}{\\varepsilon_r} = \\frac{100}{4} = 25 \\text{ } \\mu\\text{F}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "ep-a-4",
      problemStatement: "Jaka je hustota energie elektrickeho pole o intenzite $E = 10^6$ V/m ve vakuu? ($\\varepsilon_0 = 8{,}85 \\times 10^{-12}$)",
      expectedAnswer: "4.43",
      acceptableAnswers: ["4.43", "4,43", "4.43 J/m^3", "4,43 J/m^3", "4.425"],
      numericTolerance: 0.05,
      hints: [
        "$w = \\frac{1}{2}\\varepsilon_0 E^2$.",
        "$w = \\frac{1}{2} \\cdot 8{,}85 \\times 10^{-12} \\cdot (10^6)^2$",
      ],
      solutionExplanation: `$$w = \\frac{1}{2}\\varepsilon_0 E^2 = \\frac{1}{2} \\cdot 8{,}85 \\times 10^{-12} \\cdot (10^6)^2 = \\frac{1}{2} \\cdot 8{,}85 \\times 10^{-12} \\cdot 10^{12} = 4{,}43 \\text{ J/m}^3$$`,
      difficulty: "medium" as const,
    },
    {
      id: "ep-a-5",
      problemStatement: "Vodiva koule o polomeru $R = 1$ cm nese naboj $Q = 0{,}1 \\text{ } \\mu\\text{C}$. Jaka je celkova energie jejiho elektrickeho pole? ($k = 9 \\times 10^9$)",
      expectedAnswer: "0.0045",
      acceptableAnswers: ["0.0045", "0,0045", "0.0045 J", "4.5 mJ", "4,5 mJ", "4.5e-3"],
      numericTolerance: 0.0005,
      hints: [
        "$W = \\frac{kQ^2}{2R}$.",
        "$W = \\frac{9 \\times 10^9 \\cdot (10^{-7})^2}{2 \\cdot 0{,}01}$",
      ],
      solutionExplanation: `$Q = 0{,}1 \\text{ } \\mu\\text{C} = 10^{-7}$ C, $R = 0{,}01$ m.
$$W = \\frac{kQ^2}{2R} = \\frac{9 \\times 10^9 \\cdot (10^{-7})^2}{2 \\cdot 0{,}01} = \\frac{9 \\times 10^{-5}}{0{,}02} = 4{,}5 \\times 10^{-3} \\text{ J} = 4{,}5 \\text{ mJ}$$`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Gaussuv zakon**: $\\Phi_E = Q_{\\text{vnitrni}}/\\varepsilon_0$ — elektricky tok uzavrenou plochou zavisi jen na naboji uvnitr.",
      "**Vodic v rovnovaze**: $E = 0$ uvnitr, naboj jen na povrchu, ekvipotencialni povrch.",
      "**Dielektrikum**: Oslabuje pole $\\varepsilon_r$-krat; zvysuje kapacitu kondenzatoru.",
      "**Hustota energie pole**: $w = \\frac{1}{2}\\varepsilon_0 E^2$ — energie je ulozena v samotnem poli.",
      "**Faradayova klec**: Dute vodive teleso stini vnitrni prostor od vnejsich poli.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste elektricke pole. Pokracujte na elektricke obvody a proudy — zjistite, jak naboj tece vodici!",
  },
};
