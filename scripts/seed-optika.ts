import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "78ffc55c-e7f4-4103-9387-af609a5a20ea";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Svetlo, odraz, lom, tenka cocka
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Optika — svetlo a jeho chovani",
    sections: [
      {
        heading: "Svetlo a jeho sireni",
        body: `Svetlo je **elektromagneticke vlneni**, ktere se siri prostorem obrovskou rychlosti:

$$\\boxed{c = 3 \\times 10^8 \\text{ m/s}}$$

Toto je rychlost svetla ve vakuu — nejvetsi rychlost ve vesmiru.

**Viditelne spektrum** zabira jen maly rozsah vlnovych delek:
$$\\begin{array}{l|c|c} \\text{Barva} & \\lambda \\text{ (nm)} & \\text{Frekvence (THz)} \\\\ \\hline \\text{Fialova} & 380{-}450 & 670{-}790 \\\\ \\text{Modra} & 450{-}495 & 605{-}670 \\\\ \\text{Zelena} & 495{-}570 & 525{-}605 \\\\ \\text{Zluta} & 570{-}590 & 510{-}525 \\\\ \\text{Oranzova} & 590{-}620 & 485{-}510 \\\\ \\text{Cervena} & 620{-}780 & 385{-}485 \\end{array}$$

Svetlo se v **homogennim prostredi** siri **primocate** — to je zaklad geometricke optiky.

> [!key] Kdyz svetlo narazi na nepruhledne teleso, vznikne za nim **stin**. U rozsahleho zdroje svetla vznika i **polostín** — oblast casticneho zastineni.

Vlnova delka a frekvence jsou svazany vztahem:
$$\\boxed{c = \\lambda \\cdot f}$$`,
      },
      {
        heading: "Odraz svetla",
        body: `Kdyz svetlo dopadne na rozhrani dvou prostredi, cast se **odrazi**. Zakon odrazu:

$$\\boxed{\\alpha' = \\alpha}$$

- $\\alpha$ je **uhel dopadu** (mereny od kolmice k povrchu)
- $\\alpha'$ je **uhel odrazu**

Dopadajici paprsek, odrazeny paprsek a kolmice lezi v **jedne rovine**.

**Rovinne zrcadlo** vytvari:
- **zdanlivy** (virtualni) obraz
- **stejne velky** jako predmet
- **stranove prevráceny** (leva a prava ruka se zameni)
- ve **stejne vzdalenosti** za zrcadlem, jako je predmet pred nim

> [!info] Pouziti zrcadel v beznem zivote: zpetna zrcatka v aute (vypukla — vetsi zorny uhel), zrcadla v koupelne (rovinna), bezpecnostni zrcadla v obchodech (vypukla).

$$\\begin{array}{l|c|c} \\text{Typ zrcadla} & \\text{Obraz} & \\text{Pouziti} \\\\ \\hline \\text{Rovinne} & \\text{stejne velky, virtualni} & \\text{koupelna} \\\\ \\text{Vypukle} & \\text{zmenšeny, virtualni} & \\text{zpetna zrcatka} \\\\ \\text{Dute} & \\text{zavisi na poloze} & \\text{reflektor, teleskop} \\end{array}$$`,
      },
      {
        heading: "Lom svetla",
        body: `Kdyz svetlo prechazi z jednoho prostredi do druheho (napr. ze vzduchu do skla), meni smer — **lame se**. Plati **Snelluv zakon**:

$$\\boxed{n_1 \\sin \\alpha_1 = n_2 \\sin \\alpha_2}$$

kde $n$ je **index lomu** prostredi:
$$n = \\frac{c}{v}$$

- $c$ je rychlost svetla ve vakuu
- $v$ je rychlost svetla v danem prostredi

$$\\begin{array}{l|c} \\text{Prostredi} & n \\\\ \\hline \\text{Vakuum} & 1{,}000 \\\\ \\text{Vzduch} & 1{,}000\\,3 \\\\ \\text{Voda} & 1{,}333 \\\\ \\text{Sklo} & 1{,}5{-}1{,}9 \\\\ \\text{Diamant} & 2{,}417 \\end{array}$$

> [!key] Kdyz svetlo prechazi z opticky hustsiho prostredi ($n_1 > n_2$) do ridsiho, muze nastat **uplny odraz**. K tomu dojde, kdyz uhel dopadu prekroci **mezni uhel**:

$$\\boxed{\\sin \\alpha_c = \\frac{n_2}{n_1}}$$

**Prakticke vyuziti uplneho odrazu:**
- **Opticke vlakno** — svetlo se odráží uvnitr vlakna a prenasi data na obrovske vzdalenosti
- **Trpyt diamantu** — vysoke $n = 2{,}42$ znamena maly mezni uhel ($\\approx 24°$), svetlo se opakovaně odráží uvnitr`,
      },
      {
        heading: "Tenka cocka",
        body: `Cocka je pruhledne teleso, ktere lame svetlo a vytvari obrazy.

**Dva zakladni typy cocek:**
- **Spojka** (vypukla/konvexni cocka) — paprsky sbihá do **ohniska** $F$
- **Rozptylka** (vyduta/konkavni cocka) — paprsky rozbihá od virtualniho ohniska

**Cočková rovnice** (tenka cocka):
$$\\boxed{\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}}$$

- $f$ je **ohniskova vzdalenost** (kladna pro spojku, zaporna pro rozptylku)
- $a$ je vzdalenost predmetu od cocky
- $b$ je vzdalenost obrazu od cocky

**Zvetseni** cocky:
$$\\boxed{m = \\frac{b}{a} = \\frac{y'}{y}}$$

- $|m| > 1$: obraz je vetsi nez predmet
- $|m| < 1$: obraz je mensi
- $m > 0$: vzprimeny obraz
- $m < 0$: prevráceny obraz

> [!tip] **Realny obraz** ($b > 0$) lze zachytit na stinítko — paprsky se skutecne protinaji. **Virtualni obraz** ($b < 0$) nelze — paprsky se jen zdanlive protinaji za cockou.`,
        visual: {
          type: "interactive-optics",
          props: {
            element: "convex-lens",
            defaultFocalLength: 5,
            defaultObjectDistance: 12,
            defaultObjectHeight: 3,
            showRays: true,
          },
          caption: "Posunujte predmet a sledujte, jak se meni poloha a velikost obrazu. Spojka vytvari realny prevráceny obraz, kdyz je predmet za ohniskovou vzdalenosti.",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Predmet je umisten $12$ cm pred spojnou cockou s ohniskovou vzdalenosti $f = 5$ cm. Urcete polohu obrazu a zvetseni.`,
    steps: [
      {
        instruction: "Zapiste cockovou rovnici",
        math: "$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}$",
        explanation: "Zakladni rovnice tenke cocky spojujici ohniskovou vzdalenost, polohu predmetu a obrazu.",
      },
      {
        instruction: "Vyjadrete $b$",
        math: "$\\frac{1}{b} = \\frac{1}{f} - \\frac{1}{a} = \\frac{a - f}{a \\cdot f}$",
        explanation: "Prevedeme na spolecneho jmenovatele a vyjadrime $b$.",
      },
      {
        instruction: "Dosadte hodnoty",
        math: "$\\frac{1}{b} = \\frac{1}{5} - \\frac{1}{12} = \\frac{12 - 5}{60} = \\frac{7}{60}$",
        explanation: "Dosadime $f = 5$ cm a $a = 12$ cm.",
      },
      {
        instruction: "Vypoctete polohu obrazu",
        math: "$b = \\frac{60}{7} \\approx 8{,}57 \\text{ cm}$",
        explanation: "Obraz vznika $8{,}57$ cm za cockou. Kladne $b$ znamena realny obraz.",
      },
      {
        instruction: "Vypoctete zvetseni",
        math: "$m = \\frac{b}{a} = \\frac{8{,}57}{12} \\approx 0{,}71$",
        explanation: "Obraz je zmenseny na $71\\%$ velikosti predmetu. Protoze cocka vytvari realny obraz, je prevráceny ($m = -0{,}71$, ale velikost je $0{,}71$).",
      },
    ],
    finalAnswer: "Obraz vznika $b \\approx 8{,}6$ cm za cockou. Je realny, prevráceny a zmenseny — zvetseni $|m| \\approx 0{,}71$.",
  },
  practiceProblems: [
    {
      id: "op-b-1",
      problemStatement: "Svetlo dopada na rovinne zrcadlo pod uhlem $35°$ od kolmice. Jaky je uhel odrazu?",
      expectedAnswer: "35",
      acceptableAnswers: ["35", "35°", "35 stupnu"],
      hints: [
        "Zakon odrazu: uhel dopadu = uhel odrazu.",
        "$\\alpha' = \\alpha = 35°$",
      ],
      solutionExplanation: `Podle zakona odrazu:
$$\\alpha' = \\alpha = 35°$$
Uhel odrazu je **35°**.`,
      difficulty: "easy" as const,
    },
    {
      id: "op-b-2",
      problemStatement: "Svetlo prechazi ze vzduchu ($n_1 = 1$) do skla ($n_2 = 1{,}5$). Uhel dopadu je $30°$. Jaky je uhel lomu? ($\\sin 30° = 0{,}5$)",
      expectedAnswer: "19.5",
      acceptableAnswers: ["19.5", "19,5", "19.47", "19,47", "19.5°", "19,5°", "20"],
      numericTolerance: 0.5,
      hints: [
        "Pouzijte Snelluv zakon: $n_1 \\sin \\alpha_1 = n_2 \\sin \\alpha_2$.",
        "$\\sin \\alpha_2 = \\frac{n_1 \\sin \\alpha_1}{n_2} = \\frac{1 \\cdot 0{,}5}{1{,}5}$",
      ],
      solutionExplanation: `$$\\sin \\alpha_2 = \\frac{n_1 \\sin \\alpha_1}{n_2} = \\frac{1 \\cdot 0{,}5}{1{,}5} = 0{,}333$$
$$\\alpha_2 = \\arcsin(0{,}333) \\approx 19{,}5°$$`,
      difficulty: "easy" as const,
    },
    {
      id: "op-b-3",
      problemStatement: "Jaky je mezni uhel uplneho odrazu pro prechod ze skla ($n_1 = 1{,}5$) do vzduchu ($n_2 = 1$)?",
      expectedAnswer: "41.8",
      acceptableAnswers: ["41.8", "41,8", "41.81", "41,81", "42", "41.8°", "41,8°"],
      numericTolerance: 0.5,
      hints: [
        "$\\sin \\alpha_c = \\frac{n_2}{n_1}$.",
        "$\\sin \\alpha_c = \\frac{1}{1{,}5} = 0{,}667$",
      ],
      solutionExplanation: `$$\\sin \\alpha_c = \\frac{n_2}{n_1} = \\frac{1}{1{,}5} = 0{,}667$$
$$\\alpha_c = \\arcsin(0{,}667) \\approx 41{,}8°$$
Svetlo dopadajici pod uhlem vetsim nez $41{,}8°$ se uplne odrazi zpet do skla.`,
      difficulty: "medium" as const,
    },
    {
      id: "op-b-4",
      problemStatement: "Predmet je $20$ cm pred spojnou cockou s $f = 10$ cm. V jake vzdalenosti za cockou vznika obraz?",
      expectedAnswer: "20",
      acceptableAnswers: ["20", "20 cm"],
      hints: [
        "$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}$",
        "$\\frac{1}{b} = \\frac{1}{10} - \\frac{1}{20} = \\frac{2 - 1}{20}$",
      ],
      solutionExplanation: `$$\\frac{1}{b} = \\frac{1}{f} - \\frac{1}{a} = \\frac{1}{10} - \\frac{1}{20} = \\frac{2 - 1}{20} = \\frac{1}{20}$$
$$b = 20 \\text{ cm}$$
Obraz vznika ve stejne vzdalenosti jako predmet — to je pripad $a = 2f$.`,
      difficulty: "medium" as const,
    },
    {
      id: "op-b-5",
      problemStatement: "Predmet vysoke $4$ cm je $15$ cm pred cockou s $f = 10$ cm. Jake je zvetseni a jak velky je obraz?",
      expectedAnswer: "2",
      acceptableAnswers: ["2", "2x", "zvetseni 2", "8 cm"],
      hints: [
        "Nejprve najdete $b$: $\\frac{1}{b} = \\frac{1}{10} - \\frac{1}{15}$.",
        "$b = 30$ cm. Zvetseni $m = b/a = 30/15$.",
      ],
      solutionExplanation: `$$\\frac{1}{b} = \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30} \\implies b = 30 \\text{ cm}$$
$$m = \\frac{b}{a} = \\frac{30}{15} = 2$$
Obraz je **2x vetsi** nez predmet, tedy $y' = 2 \\cdot 4 = 8$ cm.`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Rychlost svetla**: $c = 3 \\times 10^8$ m/s — nejvetsi rychlost ve vesmiru.",
      "**Zakon odrazu**: uhel dopadu = uhel odrazu ($\\alpha' = \\alpha$).",
      "**Snelluv zakon**: $n_1 \\sin \\alpha_1 = n_2 \\sin \\alpha_2$ — popisuje lom svetla na rozhrani.",
      "**Uplny odraz**: nastava pri $\\alpha > \\alpha_c$, kde $\\sin \\alpha_c = n_2/n_1$ (prechod z hustsiho do ridssiho prostredi).",
      "**Cockova rovnice**: $1/f = 1/a + 1/b$ — spojuje ohniskovou vzdalenost, polohu predmetu a obrazu.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na stredne pokrociou uroven — zobrazeni cockou, kulova zrcadla a opticke pristroje.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Zobrazeni cockou, zrcadla, opticke pristroje
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Optika — zobrazovani a opticke pristroje",
    sections: [
      {
        heading: "Zobrazeni spojnou cockou — vsechny pripady",
        body: `Spojka (konvexni cocka) vytvari ruzne obrazy podle polohy predmetu $a$ vzhledem k ohniskove vzdalenosti $f$:

$$\\begin{array}{l|c|c|c} \\text{Poloha predmetu} & \\text{Obraz} & \\text{Typ} & \\text{Velikost} \\\\ \\hline a > 2f & f < b < 2f & \\text{realny, prevráceny} & \\text{zmenseny} \\\\ a = 2f & b = 2f & \\text{realny, prevráceny} & \\text{stejne velky} \\\\ f < a < 2f & b > 2f & \\text{realny, prevráceny} & \\text{zvetseny} \\\\ a = f & b \\to \\infty & \\text{—} & \\text{—} \\\\ a < f & |b| > a & \\text{virtualni, vzprimeny} & \\text{zvetseny} \\end{array}$$

> [!key] Spojka se chova jako **zvetsovaci sklo** pouze kdyz je predmet blize nez ohniskova vzdalenost ($a < f$) — tehdy vytvari zvetseny virtualni obraz.

**Rozptylka** (konkavni cocka) vytvari vzdy:
- **virtualni** obraz ($b < 0$)
- **vzprimeny**
- **zmenseny**

Ohniskova vzdalenost rozptylky je zaporna: $f < 0$.

> [!info] Rozptylka sama o sobe nikdy nevytvori realny obraz — pouziva se ke korekci vad oka (kratkozrakost) a v kombinaci s jinymi cockami.`,
        visual: {
          type: "interactive-optics",
          props: {
            element: "convex-lens",
            defaultFocalLength: 6,
            defaultObjectDistance: 18,
            showRays: true,
          },
          caption: "Posunujte predmet a sledujte vsechny pripady zobrazeni spojkou: a > 2f (zmenseny), a = 2f (stejny), f < a < 2f (zvetseny), a < f (virtualni).",
        },
      },
      {
        heading: "Kulove zrcadlo",
        body: `Kulove zrcadlo ma **polomer krivosti** $R$ a **ohniskovou vzdalenost**:

$$\\boxed{f = \\frac{R}{2}}$$

Pro zobrazeni kulovym zrcadlem plati stejna rovnice jako pro cocku:
$$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}$$

**Dute (konkavni) zrcadlo** ($f > 0$):
- Chova se podobne jako spojka
- Pro $a > f$: realny obraz
- Pro $a < f$: virtualni, zvetseny obraz (pouziti v kosmetickem zrcadle)

**Vypukle (konvexni) zrcadlo** ($f < 0$):
- Vzdy vytvari **virtualni**, **vzprimeny**, **zmenseny** obraz
- Velke zorne pole — pouziti jako zpetna zrcatka

$$\\begin{array}{l|c|c} \\text{Zrcadlo} & f & \\text{Typicky obraz} \\\\ \\hline \\text{Dute} & + (= R/2) & \\text{zavisi na poloze predmetu} \\\\ \\text{Vypukle} & - (= -R/2) & \\text{vzdy virtualni, zmenseny} \\end{array}$$

> [!tip] Reflektor svetlometu pouziva dute zrcadlo — zarovka v ohnisku vytvari rovnobezny svazek svetla.`,
        visual: {
          type: "interactive-optics",
          props: {
            element: "concave-mirror",
            defaultFocalLength: 8,
            defaultObjectDistance: 15,
            showRays: true,
          },
          caption: "Dute zrcadlo — posunujte predmet a pozorujte, jak se meni obraz. Za ohniskem je obraz realny, pred ohniskem virtualni.",
        },
      },
      {
        heading: "Opticke pristroje",
        body: `Opticke pristroje vyuzivaji cocky a zrcadla ke zvetseni obrazu nebo ke korekci zraku.

**Lidske oko:**
- Cockovy system (rohovka + cocka) lamou svetlo na sitnici
- **Akomodace** — oko meni tvar cocky a tim ohniskovou vzdalenost
- **Blizky bod**: asi $25$ cm (nejblizsi vzdalenost ostreho videni)
- **Daleci bod**: nekonecno (zdravé oko)

**Lupa (zvetsovaci sklo):**
Predmet je blize nez $f$ — cocka vytvari zvetseny virtualni obraz. Uhlove zvetseni:
$$\\boxed{M = \\frac{25 \\text{ cm}}{f}}$$

**Mikroskop:**
Kombinace dvou cocek — objektivu a okularu:
$$\\boxed{M = M_{\\text{obj}} \\times M_{\\text{ok}}}$$
kde $M_{\\text{obj}}$ je zvetseni objektivu a $M_{\\text{ok}} = 25 \\text{ cm}/f_{\\text{ok}}$.

**Dalekohled (teleskop):**
$$\\boxed{M = \\frac{f_{\\text{obj}}}{f_{\\text{ok}}}}$$

> [!info] Astronomicke dalekohledy maji velke $f_{\\text{obj}}$ (metry az desitky metru) pro maximalni zvetseni a sber svetla.

$$\\begin{array}{l|c|c} \\text{Pristroj} & \\text{Zvetseni} & \\text{Typicke M} \\\\ \\hline \\text{Lupa} & 25/f & 2{-}10\\times \\\\ \\text{Mikroskop} & M_{\\text{obj}} \\cdot M_{\\text{ok}} & 40{-}1000\\times \\\\ \\text{Dalekohled} & f_{\\text{obj}}/f_{\\text{ok}} & 10{-}200\\times \\end{array}$$`,
      },
      {
        heading: "Vady oka a jejich korekce",
        body: `Dve nejcastejsi vady zraku:

**Kratkozrakost (myopie):**
- Oko lame svetlo prilis silne — obraz vznika **pred sitnici**
- Daleci bod je v konecne vzdalenosti (ne v nekonecnu)
- Korekce: **rozptylka** (konkavni cocka) — oslabi lom svetla

**Dalekozrakost (hypermetropie):**
- Oko lame svetlo prilis slabe — obraz vznika **za sitnici**
- Blizky bod je dale nez $25$ cm
- Korekce: **spojka** (konvexni cocka) — zesili lom svetla

**Optická mohutnost (dioptrie):**
$$\\boxed{D = \\frac{1}{f \\text{ (m)}}}$$

- Jednotka: **dioptrie** (dpt, $\\text{m}^{-1}$)
- Spojka: $D > 0$
- Rozptylka: $D < 0$

$$\\begin{array}{l|c|c} \\text{Vada} & \\text{Korekce} & \\text{Typ cocky} \\\\ \\hline \\text{Kratkozrakost} & D < 0 & \\text{rozptylka} \\\\ \\text{Dalekozrakost} & D > 0 & \\text{spojka} \\end{array}$$

> [!key] Clovek s kratkozrakosti $-3$ dpt vidi ostre pouze do vzdalenosti $d = 1/|D| = 1/3$ m $\\approx 33$ cm.

Priklad: Clovek ma daleci bod $50$ cm. Jaka cocka to napravi?
$$D = -\\frac{1}{0{,}5} = -2 \\text{ dpt}$$
Potrebuje rozptylku s $D = -2$ dpt.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Predmet je umisten $15$ cm pred dutym zrcadlem s polomerem krivosti $R = 20$ cm. Urcete polohu obrazu, jeho typ (realny/virtualni) a zvetseni.`,
    steps: [
      {
        instruction: "Urcete ohniskovou vzdalenost",
        math: "$f = \\frac{R}{2} = \\frac{20}{2} = 10 \\text{ cm}$",
        explanation: "Ohniskova vzdalenost duteho zrcadla je polovina polomeru krivosti.",
      },
      {
        instruction: "Pouzijte rovnici zrcadla",
        math: "$\\frac{1}{f} = \\frac{1}{a} + \\frac{1}{b}$",
        explanation: "Stejna rovnice jako pro cocku.",
      },
      {
        instruction: "Vyjadrete a dosadte",
        math: "$\\frac{1}{b} = \\frac{1}{f} - \\frac{1}{a} = \\frac{1}{10} - \\frac{1}{15} = \\frac{3 - 2}{30} = \\frac{1}{30}$",
        explanation: "Prevedeme na spolecneho jmenovatele.",
      },
      {
        instruction: "Vypoctete polohu obrazu",
        math: "$b = 30 \\text{ cm}$",
        explanation: "Obraz vznika $30$ cm pred zrcadlem. Kladne $b$ znamena **realny obraz**.",
      },
      {
        instruction: "Vypoctete zvetseni",
        math: "$m = \\frac{b}{a} = \\frac{30}{15} = 2$",
        explanation: "Obraz je **2x vetsi** nez predmet. U realneho obrazu v dutem zrcadle je obraz **prevráceny**.",
      },
    ],
    finalAnswer: "Obraz vznika $b = 30$ cm pred zrcadlem. Je realny, prevráceny a $2\\times$ zvetseny.",
  },
  practiceProblems: [
    {
      id: "op-i-1",
      problemStatement: "Predmet je $9$ cm pred spojkou s $f = 6$ cm. Kde vznika obraz a jaky je? (realny/virtualni, zvetseny/zmenseny)",
      expectedAnswer: "18",
      acceptableAnswers: ["18", "18 cm", "realny, zvetseny"],
      hints: [
        "$\\frac{1}{b} = \\frac{1}{6} - \\frac{1}{9}$.",
        "$\\frac{1}{b} = \\frac{3 - 2}{18} = \\frac{1}{18}$",
      ],
      solutionExplanation: `$$\\frac{1}{b} = \\frac{1}{6} - \\frac{1}{9} = \\frac{3 - 2}{18} = \\frac{1}{18} \\implies b = 18 \\text{ cm}$$
Zvetseni: $m = 18/9 = 2$. Obraz je **realny** ($b > 0$), **prevráceny** a **2x zvetseny** (pripad $f < a < 2f$).`,
      difficulty: "medium" as const,
    },
    {
      id: "op-i-2",
      problemStatement: "Predmet je $12$ cm pred dutym zrcadlem s $R = 16$ cm. Kde vznika obraz?",
      expectedAnswer: "24",
      acceptableAnswers: ["24", "24 cm"],
      hints: [
        "$f = R/2 = 8$ cm.",
        "$\\frac{1}{b} = \\frac{1}{8} - \\frac{1}{12} = \\frac{3 - 2}{24}$",
      ],
      solutionExplanation: `$$f = \\frac{R}{2} = 8 \\text{ cm}$$
$$\\frac{1}{b} = \\frac{1}{8} - \\frac{1}{12} = \\frac{3 - 2}{24} = \\frac{1}{24} \\implies b = 24 \\text{ cm}$$
Obraz je realny, prevráceny a zvetseny ($m = 24/12 = 2$).`,
      difficulty: "medium" as const,
    },
    {
      id: "op-i-3",
      problemStatement: "Lupa ma ohniskovou vzdalenost $f = 5$ cm. Jake je jeji uhlove zvetseni?",
      expectedAnswer: "5",
      acceptableAnswers: ["5", "5x", "5-krat"],
      hints: [
        "$M = 25 \\text{ cm} / f$.",
        "$M = 25/5$",
      ],
      solutionExplanation: `$$M = \\frac{25 \\text{ cm}}{f} = \\frac{25}{5} = 5\\times$$
Lupa zvetsuje obraz **5-krat**.`,
      difficulty: "easy" as const,
    },
    {
      id: "op-i-4",
      problemStatement: "Kratkozvaky clovek ma daleci bod $40$ cm. Jakou optickou mohutnost (v dioptriich) musi mit jeho korekční cocka?",
      expectedAnswer: "-2.5",
      acceptableAnswers: ["-2.5", "-2,5", "-2.5 dpt", "-2,5 dpt"],
      numericTolerance: 0.1,
      hints: [
        "Korekční cocka musi vytvorit virtualni obraz nekonecne vzdalenych predmetu v dalecem bodu.",
        "$D = -\\frac{1}{d}$ kde $d$ je daleci bod v metrech.",
      ],
      solutionExplanation: `Cocka musi zobrazit nekonecno do $40$ cm:
$$D = -\\frac{1}{d} = -\\frac{1}{0{,}4} = -2{,}5 \\text{ dpt}$$
Potrebuje rozptylku s $D = -2{,}5$ dpt.`,
      difficulty: "medium" as const,
    },
    {
      id: "op-i-5",
      problemStatement: "Dalekohled ma objektiv s $f_{\\text{obj}} = 120$ cm a okular s $f_{\\text{ok}} = 4$ cm. Jake je zvetseni dalekohledu?",
      expectedAnswer: "30",
      acceptableAnswers: ["30", "30x", "30-krat"],
      hints: [
        "$M = f_{\\text{obj}} / f_{\\text{ok}}$.",
        "$M = 120 / 4$",
      ],
      solutionExplanation: `$$M = \\frac{f_{\\text{obj}}}{f_{\\text{ok}}} = \\frac{120}{4} = 30\\times$$
Dalekohled zvetsuje $30$-krat.`,
      difficulty: "easy" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Spojka**: obraz zavisi na poloze predmetu — pro $a > f$ realny, pro $a < f$ virtualni zvetseny.",
      "**Rozptylka**: vzdy virtualni, vzprimeny, zmenseny obraz.",
      "**Kulove zrcadlo**: $f = R/2$, stejna rovnice jako pro cocku.",
      "**Lupa**: $M = 25$ cm$/f$ — cim kratsi $f$, tim vetsi zvetseni.",
      "**Korekce zraku**: kratkozrakost $\\to$ rozptylka ($D < 0$), dalekozrakost $\\to$ spojka ($D > 0$).",
    ],
    nextTopicSuggestion: "Pokracujte na pokrociou uroven — vlnova optika: interference, difrakce a polarizace svetla.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Vlnova optika: interference, difrakce, polarizace
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Optika — vlnove jevy svetla",
    sections: [
      {
        heading: "Vlnova optika — interference",
        body: `Svetlo je elektromagneticke vlneni — a vlny mohou **interferovat** (skladat se). Kdyz se setkaji dve koherentni vlny:

- **Konstruktivni interference**: vlny se zesiluji (maxima)
- **Destruktivni interference**: vlny se zeslabuji (minima)

**Youngův dvoustelinovy pokus** (1801) — prvni dukaz vlnove povahy svetla:

Svetlo prochazi dvema uzkymi stelinami ve vzdalenosti $d$. Na stinítku ve vzdalenosti $L$ vznikaji svetle a tmave prouzky.

**Drahovy rozdil** ke bodu na stinítku:
$$\\Delta l = d \\cdot \\sin \\theta$$

**Svetle prouzky** (maxima) pri:
$$\\boxed{d \\cdot \\sin \\theta = m \\cdot \\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\dots}$$

**Tmave prouzky** (minima) pri:
$$d \\cdot \\sin \\theta = \\left(m + \\frac{1}{2}\\right) \\lambda$$

**Vzdalenost sousednich maxim** na stinítku:
$$\\boxed{\\Delta y = \\frac{\\lambda \\cdot L}{d}}$$

> [!key] Cim mensi je vzdalenost stelin $d$, tim sirsi jsou interference prouzky. Cim vetsi vlnova delka $\\lambda$, tim sirsi prouzky.

**Interference na tenkem filmu** (napr. mydlova bublina, olejova skvrna):

Svetlo se odráží od horni i dolni plochy filmu tloustky $t$ s indexem lomu $n$. Drahovy rozdil:
$$\\Delta = 2 n t$$

Navic se pricita fazovy posun $\\lambda/2$ pri odrazu od hustsiho prostredi. Vysledek:
- Konstruktivni: $2nt = (m + \\frac{1}{2})\\lambda$
- Destruktivni: $2nt = m\\lambda$`,
      },
      {
        heading: "Difrakce",
        body: `**Difrakce** (ohyb svetla) nastava, kdyz svetlo prochazi uzkym otvorem nebo miji prekazku. Svetlo se "ohyba" za prekazku.

**Difrakce na jedne steline** sirky $b$:

Prvni minimum (tmave misto) nastava pri:
$$\\boxed{\\sin \\theta = \\frac{\\lambda}{b}}$$

Obecne minima pri:
$$b \\cdot \\sin \\theta = m \\cdot \\lambda, \\quad m = \\pm 1, \\pm 2, \\dots$$

> [!info] Centralni maximum je **2x sirsi** nez ostatni maxima — obsahuje asi $84\\%$ celkove intenzity.

**Difrakční mrizka** — mnoho rovnobeznych stelin ve vzdalenosti $d$:

$$\\boxed{d \\cdot \\sin \\theta = m \\cdot \\lambda, \\quad m = 0, \\pm 1, \\pm 2, \\dots}$$

Stejna podminka jako pro Young, ale maxima jsou mnohem **ostrejsi** a **jasnejsi**.

**Rozlisovaci schopnost** mrizky:
$$R = \\frac{\\lambda}{\\Delta \\lambda} = m \\cdot N$$
kde $N$ je pocet stelin.

**Rayleighuv kriterium** — minimalni uhel, pod kterym lze rozlisit dva body:
$$\\boxed{\\theta_{\\min} = 1{,}22 \\frac{\\lambda}{D}}$$
kde $D$ je prumer objektivu (cocky/zrcadla). Vetsi objektiv = lepsi rozliseni.`,
      },
      {
        heading: "Polarizace",
        body: `Bezne svetlo je **nepolarizovane** — elektricke pole kmita nahodne ve vsech smerech kolmo k sireni.

**Polarizovane svetlo** kmita jen v jedne rovine.

**Zpusoby polarizace:**

1. **Absorpci (polaroid):** filtr propousti jen slozku kmitajici v jednom smeru.

2. **Odrazem (Brewsteruv uhel):** Pri urcitem uhlu dopadu je odrazene svetlo zcela polarizovane:
$$\\boxed{\\tan \\theta_B = \\frac{n_2}{n_1}}$$
Navic plati: $\\theta_B + \\theta_{\\text{lom}} = 90°$.

Pro vzduch-sklo ($n = 1{,}5$):
$$\\theta_B = \\arctan(1{,}5) \\approx 56{,}3°$$

3. **Dvojlomem:** Nektere krystaly (kalcit) rozdeluji svetlo na dva polarizovane paprsky.

**Malusuv zakon** — intenzita svetla po pruchodu polarizatorem:
$$\\boxed{I = I_0 \\cos^2 \\theta}$$

kde $\\theta$ je uhel mezi smerem polarizace svetla a osou polarizatoru.

> [!key] Dva zkrizene polarizatory ($\\theta = 90°$) svetlo zcela zablokuji: $I = I_0 \\cos^2 90° = 0$. Ale vlozeni tretiho polarizatoru pod $45°$ mezi ne **obnovI** castecny pruchod!

$$\\begin{array}{l|c} \\theta & I/I_0 \\\\ \\hline 0° & 1{,}00 \\\\ 30° & 0{,}75 \\\\ 45° & 0{,}50 \\\\ 60° & 0{,}25 \\\\ 90° & 0{,}00 \\end{array}$$`,
      },
      {
        heading: "Disperze a spektra",
        body: `**Disperze** je jev, pri kterem index lomu $n$ zavisi na vlnove delce $\\lambda$:

$$n = n(\\lambda)$$

Kratsi vlnove delky (fialova) se lamuji **vice** nez delsi (cervena). Proto hranol rozklada bile svetlo na spektrum:

$$n_{\\text{fialova}} > n_{\\text{cervena}}$$

> [!info] **Duha** je prirodni priklad disperze — kapky vody lamou a odrazeji slunecni svetlo. Primami duha: cervena nahore, fialova dole ($42°$ uhel). Sekundarni duha: obracene poradi ($51°$).

**Chromaticka aberace** — vada cocek zpusobena disperzi. Ruzne barvy se zaostri v ruznych bodech. Reseni: achromaticky dublet (kombinace spojky a rozptylky z ruznych skel).

**Druhy spekter:**
- **Emisni** (carove): zahraty plyn vysilá svetlo urcitych vlnovych delek — "otisk prstu" prvku
- **Absorpcni**: bile svetlo procházející plynem — na miste emisních car jsou tmave cary
- **Spojite**: zahraty pevny/kapalny material — vsechny vlnove delky

$$\\begin{array}{l|c} \\text{Prvek} & \\text{Vlnova delka (nm)} \\\\ \\hline \\text{Vodik } H_\\alpha & 656{,}3 \\text{ (cervena)} \\\\ \\text{Vodik } H_\\beta & 486{,}1 \\text{ (modra)} \\\\ \\text{Sodík} & 589{,}0 \\text{ (zluta)} \\\\ \\text{Helium} & 587{,}6 \\text{ (zluta)} \\end{array}$$

> [!tip] **Spektroskopie** umoznuje urcit chemicke slozeni hvezd, galaxii a vzdalenych objektu — jeden z nejvyznamnejsich nastroju astrofyziky.`,
        visual: {
          type: "interactive-optics",
          props: {
            element: "convex-lens",
            defaultFocalLength: 4,
            defaultObjectDistance: 6,
            showRays: true,
          },
          caption: "Chromaticka aberace — ruzne barvy se zaostri v ruznych bodech. V realite se koriguje kombinaci cocek z ruznych skel.",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Monochromaticke svetlo o vlnove delce $\\lambda = 600$ nm prochazi dvema stelinami ve vzdalenosti $d = 0{,}2$ mm. Stinítko je ve vzdalenosti $L = 1{,}5$ m. Urcete vzdalenost mezi sousednimi svetlymi prouzky.`,
    steps: [
      {
        instruction: "Zapiste vzorec pro vzdalenost maxim",
        math: "$\\Delta y = \\frac{\\lambda \\cdot L}{d}$",
        explanation: "Vzdalenost sousednich svetlych prouzku v Youngove pokusu.",
      },
      {
        instruction: "Prevedte jednotky",
        math: "$\\lambda = 600 \\text{ nm} = 6 \\times 10^{-7} \\text{ m}, \\quad d = 0{,}2 \\text{ mm} = 2 \\times 10^{-4} \\text{ m}$",
        explanation: "Vsechny veliciny musi byt ve stejnych jednotkach (metry).",
      },
      {
        instruction: "Dosadte",
        math: "$\\Delta y = \\frac{6 \\times 10^{-7} \\cdot 1{,}5}{2 \\times 10^{-4}}$",
        explanation: "Dosadime vsechny hodnoty.",
      },
      {
        instruction: "Vypoctete",
        math: "$\\Delta y = \\frac{9 \\times 10^{-7}}{2 \\times 10^{-4}} = 4{,}5 \\times 10^{-3} \\text{ m} = 4{,}5 \\text{ mm}$",
        explanation: "Interference prouzky jsou od sebe vzdáleny $4{,}5$ mm.",
      },
    ],
    finalAnswer: "Vzdalenost sousednich svetlych prouzku je $\\Delta y = 4{,}5$ mm.",
  },
  practiceProblems: [
    {
      id: "op-a-1",
      problemStatement: "Svetlo $\\lambda = 500$ nm prochazi dvema stelinami ($d = 0{,}1$ mm) a dopada na stinítko ve vzdalenosti $L = 2$ m. Jaka je vzdalenost sousednich maxim?",
      expectedAnswer: "10",
      acceptableAnswers: ["10", "10 mm", "1 cm", "0.01 m"],
      hints: [
        "$\\Delta y = \\lambda L / d$.",
        "$\\Delta y = \\frac{5 \\times 10^{-7} \\cdot 2}{1 \\times 10^{-4}}$",
      ],
      solutionExplanation: `$$\\Delta y = \\frac{\\lambda L}{d} = \\frac{5 \\times 10^{-7} \\cdot 2}{1 \\times 10^{-4}} = \\frac{10^{-6}}{10^{-4}} = 10^{-2} \\text{ m} = 10 \\text{ mm}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "op-a-2",
      problemStatement: "Difrakcni mrizka ma $500$ stelin na milimetr. Pod jakym uhlem se nachazi maximum 1. radu pro svetlo $\\lambda = 550$ nm?",
      expectedAnswer: "16",
      acceptableAnswers: ["16", "15.9", "15,9", "16°", "15.9°", "15,9°"],
      numericTolerance: 0.5,
      hints: [
        "Mrizkova konstanta: $d = 1/500$ mm $= 2 \\times 10^{-6}$ m.",
        "$\\sin \\theta = m\\lambda / d = 1 \\cdot 550 \\times 10^{-9} / (2 \\times 10^{-6})$",
      ],
      solutionExplanation: `Mrizkova konstanta: $d = 1/500 \\text{ mm} = 2 \\times 10^{-6}$ m.
$$\\sin \\theta = \\frac{m \\lambda}{d} = \\frac{1 \\cdot 550 \\times 10^{-9}}{2 \\times 10^{-6}} = 0{,}275$$
$$\\theta = \\arcsin(0{,}275) \\approx 16{,}0°$$`,
      difficulty: "medium" as const,
    },
    {
      id: "op-a-3",
      problemStatement: "Svetlo dopada ze vzduchu na sklo ($n = 1{,}5$). Jaky je Brewsteruv uhel?",
      expectedAnswer: "56.3",
      acceptableAnswers: ["56.3", "56,3", "56.3°", "56,3°", "56"],
      numericTolerance: 0.5,
      hints: [
        "$\\tan \\theta_B = n_2 / n_1 = 1{,}5 / 1$.",
        "$\\theta_B = \\arctan(1{,}5)$",
      ],
      solutionExplanation: `$$\\tan \\theta_B = \\frac{n_2}{n_1} = \\frac{1{,}5}{1} = 1{,}5$$
$$\\theta_B = \\arctan(1{,}5) \\approx 56{,}3°$$
Pri tomto uhlu dopadu je odrazene svetlo zcela polarizovane.`,
      difficulty: "easy" as const,
    },
    {
      id: "op-a-4",
      problemStatement: "Polarizovane svetlo prochazi polarizatorem natočenym o $60°$ vuci smeru polarizace. Jaka cast intenzity projde? ($\\cos 60° = 0{,}5$)",
      expectedAnswer: "0.25",
      acceptableAnswers: ["0.25", "0,25", "25%", "1/4", "25 %"],
      hints: [
        "Malusuv zakon: $I = I_0 \\cos^2 \\theta$.",
        "$I/I_0 = \\cos^2 60° = (0{,}5)^2$",
      ],
      solutionExplanation: `$$\\frac{I}{I_0} = \\cos^2 \\theta = \\cos^2 60° = (0{,}5)^2 = 0{,}25$$
Projde **25 %** puvodni intenzity.`,
      difficulty: "easy" as const,
    },
    {
      id: "op-a-5",
      problemStatement: "Na tenky film ($n = 1{,}4$) dopada bile svetlo kolmo. Pro jakou nejmensi tloustku filmu dojde ke konstruktivni interferenci pro svetlo $\\lambda = 560$ nm? (Pouzijte podminku $2nt = (m + 1/2)\\lambda$ s $m = 0$.)",
      expectedAnswer: "100",
      acceptableAnswers: ["100", "100 nm", "200"],
      numericTolerance: 5,
      hints: [
        "Konstruktivni: $2nt = (m + 1/2)\\lambda$, nejmensi $t$ pro $m = 0$.",
        "$t = \\frac{\\lambda}{4n} = \\frac{560}{4 \\cdot 1{,}4}$",
      ],
      solutionExplanation: `Pro $m = 0$:
$$2nt = \\frac{1}{2}\\lambda \\implies t = \\frac{\\lambda}{4n} = \\frac{560}{4 \\cdot 1{,}4} = \\frac{560}{5{,}6} = 100 \\text{ nm}$$
Nejmensi tloustka filmu pro konstruktivni interferenci je $100$ nm.`,
      difficulty: "hard" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Younguv pokus**: $\\Delta y = \\lambda L / d$ — interference dokazuje vlnovou povahu svetla.",
      "**Difrakce na steline**: prvni minimum pri $\\sin \\theta = \\lambda / b$.",
      "**Difrakcni mrizka**: $d \\sin \\theta = m\\lambda$ — ostra maxima, pouziti ve spektroskopii.",
      "**Brewsteruv uhel**: $\\tan \\theta_B = n_2/n_1$ — odrazene svetlo je zcela polarizovane.",
      "**Malusuv zakon**: $I = I_0 \\cos^2 \\theta$ — intenzita po pruchodu polarizatorem.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste celou optiku — od geometricke po vlnovou. Pokracujte na moderni fyziku: kvantovou optiku a fotony!",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Optika\n");

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

  console.log("\n🎉 Done! Brilliant-style Optika lessons seeded.\n");
}

main().catch(console.error);
