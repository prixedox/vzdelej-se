import "dotenv/config";
import { createClient } from "@libsql/client";

const client = createClient({ url: "file:./sqlite.db" });

const TOPIC_ID = "10fbbde0-c87f-4390-9693-345b9d0f245a";

// ═══════════════════════════════════════════════════════════════
// ZAČÁTEČNÍK — Struktura atomu, fotoelektricky jev, foton, radioaktivita
// ═══════════════════════════════════════════════════════════════
const beginner = {
  conceptExplanation: {
    title: "Kvantova a jaderna fyzika — zaklady",
    sections: [
      {
        heading: "Struktura atomu",
        body: `Atom se sklada ze tri zakladnich castic:

$$\\begin{array}{l|c|c|c} \\text{Castica} & \\text{Znacka} & \\text{Naboj} & \\text{Hmotnost (u)} \\\\ \\hline \\text{Proton} & p & +e & 1{,}007 \\\\ \\text{Neutron} & n & 0 & 1{,}009 \\\\ \\text{Elektron} & e^- & -e & 0{,}000\\,55 \\end{array}$$

**Atomove jadro** obsahuje protony a neutrony (spolecne nazyvane **nukleony**). Elektrony obihaji jadro v **elektronovem obalu**.

**Zakladni veliciny:**
- **Protonove cislo** $Z$ — pocet protonu v jadre (urcuje chemicky prvek)
- **Nukleonove cislo** $A$ — celkovy pocet nukleonu ($A = Z + N$, kde $N$ je pocet neutronu)
- **Neutronove cislo** $N = A - Z$

**Znaceni izotopu:**
$$\\boxed{^{A}_{Z}X}$$

Napriklad: $^{1}_{1}H$ (vodik), $^{2}_{1}H$ (deuterium), $^{3}_{1}H$ (tritium) — tri **izotopy** vodiku. Maji stejne $Z$, ale ruzne $N$.

> [!key] **Izotopy** jsou atomy stejneho prvku (stejne $Z$), ktere se lisi poctem neutronu ($N$). Maji stejne chemicke vlastnosti, ale ruznou hmotnost.

**Bohruv model atomu** (1913):
- Elektrony obihaji jadro na **diskretních (povolených) drahach**
- Kazda draha odpovida urcite **energii**
- Elektron na nizsi draze ma **mensi energii** a je stabilnejsi
- Pri prechodu mezi drahami atom **vyza nebo pohlti foton**`,
        visual: {
          type: "interactive-atom",
          props: {
            mode: "bohr",
            defaultZ: 1,
            defaultN: 2,
          },
          caption: "Bohruv model atomu — elektrony obihaji jadro na povolených drahach. Zmente protonove cislo a pozorujte strukturu ruznych atomu.",
        },
      },
      {
        heading: "Fotoelektricky jev",
        body: `V roce 1905 Albert Einstein vysvetlil **fotoelektricky jev** — za coz pozdeji ziskal **Nobelovu cenu** (1921).

**Podstata:** Kdyz na kovovy povrch dopada svetlo dostatecne vysoke frekvence, z povrchu se uvolnuji elektrony.

**Klicovy objev:** Fotoelektricky jev nelze vysvetlit klasickou vlnovou teoriI svetla. Einstein ukazal, ze svetlo se chova jako proud castic — **fotonu**.

Energie jednoho fotonu:
$$\\boxed{E = h \\cdot f}$$

kde:
- $h = 6{,}63 \\times 10^{-34}$ J$\\cdot$s je **Planckova konstanta**
- $f$ je frekvence svetla

**Einsteinova rovnice fotoefektu:**
$$\\boxed{E_k = h \\cdot f - W_0}$$

- $W_0$ je **vystupni prace** — minimalni energie potrebna k uvolneni elektronu z kovu
- $E_k$ je kineticka energie uvolneneho elektronu

> [!key] Fotoelektricky jev nastane pouze kdyz $hf > W_0$, tedy kdyz je energie fotonu vetsi nez vystupni prace. Zvyseni intenzity svetla (vice fotonu) uvolni vice elektronu, ale **nezvysi jejich energii**.

$$\\begin{array}{l|c} \\text{Kov} & W_0 \\text{ (eV)} \\\\ \\hline \\text{Cesium} & 2{,}1 \\\\ \\text{Draslík} & 2{,}3 \\\\ \\text{Sodík} & 2{,}4 \\\\ \\text{Zinek} & 4{,}3 \\\\ \\text{Platina} & 5{,}6 \\end{array}$$

> [!info] **1 elektronvolt** (eV) je energie, kterou ziska elektron pri urychleni napetim 1 V: $1 \\text{ eV} = 1{,}6 \\times 10^{-19}$ J.`,
        visual: {
          type: "interactive-atom",
          props: {
            mode: "photoelectric",
            defaultPhotonEnergy: 5,
          },
          caption: "Fotoelektricky jev — nastavte energii fotonu a pozorujte, zda se uvolni elektron. Kdyz je energie fotonu mensi nez vystupni prace, nic se nestane.",
        },
      },
      {
        heading: "Foton a vlnove-casticovy dualismus",
        body: `Svetlo ma **dvojí povahu** — chova se jako **vlneni** (interference, difrakce) i jako **proud castic** (fotoelektricky jev).

**Energie fotonu:**
$$\\boxed{E = h \\cdot f = \\frac{h \\cdot c}{\\lambda}}$$

kde $c = 3 \\times 10^8$ m/s je rychlost svetla.

Tato dvojí povaha neni vlastnosti pouze svetla! V roce 1924 Louis de Broglie predpovedel, ze i **hmotne castice** maji vlnove vlastnosti.

**De Broglieho vlnova delka:**
$$\\boxed{\\lambda = \\frac{h}{m \\cdot v} = \\frac{h}{p}}$$

kde $p = m \\cdot v$ je hybnost castice.

> [!tip] **Proc vlnove vlastnosti nepozorujeme u velkych teles?** Protoze Planckova konstanta $h$ je extremne mala. Napriklad pro mic o hmotnosti $0{,}1$ kg letici rychlosti $10$ m/s:
> $$\\lambda = \\frac{6{,}63 \\times 10^{-34}}{0{,}1 \\cdot 10} = 6{,}63 \\times 10^{-34} \\text{ m}$$
> To je tak mala vlnova delka, ze ji nelze nijak zmerit. Ale pro elektron letici rychlosti $10^6$ m/s:
> $$\\lambda = \\frac{6{,}63 \\times 10^{-34}}{9{,}1 \\times 10^{-31} \\cdot 10^6} \\approx 0{,}73 \\text{ nm}$$
> To je srovnatelne s meziatomovymi vzdalenostmi — proto elektrony vytvari difrakcni obrazce!

**Vlnove-casticovy dualismus** je jednim ze zakladních pilíru kvantove fyziky: kazdy objekt ma vlnove i casticove vlastnosti, ale u makroskopickych teles jsou vlnove vlastnosti nepozorovatelne.`,
      },
      {
        heading: "Radioaktivita — zaklady",
        body: `**Radioaktivita** je samovolna premena nestabilnich atomovych jader, pri ktere se uvolnuje zareni.

Objevila ji Henri Becquerel (1896), dale ji zkoumali Marie a Pierre Curie.

**Tri zakladni druhy radioaktivniho zareni:**

$$\\begin{array}{l|c|c|c} \\text{Typ} & \\text{Castica} & \\text{Naboj} & \\text{Pronikavost} \\\\ \\hline \\alpha & ^{4}_{2}He & +2e & \\text{mala (papir)} \\\\ \\beta^- & e^- & -e & \\text{stredni (hlinik)} \\\\ \\gamma & \\text{foton} & 0 & \\text{velka (olovo, beton)} \\end{array}$$

**Rozpad alfa** ($\\alpha$): jadro vyslí castici $^{4}_{2}He$
$$^{A}_{Z}X \\to ^{A-4}_{Z-2}Y + ^{4}_{2}He$$

**Rozpad beta** ($\\beta^-$): neutron se premeni na proton a elektron
$$^{A}_{Z}X \\to ^{A}_{Z+1}Y + e^- + \\bar{\\nu}_e$$

**Zareni gama** ($\\gamma$): jadro vyza vysoce energeticky foton (bez zmeny $Z$ a $A$)

> [!key] **Polocas rozpadu** $T_{1/2}$ je doba, za kterou se rozpadne polovina puvodnich jader. Napriklad: $T_{1/2}$ uhliku-14 je priblizne $5\\,730$ let, $T_{1/2}$ radia-226 je $1\\,600$ let.

**Zakon radioaktivniho rozpadu:**
$$\\boxed{N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T_{1/2}}}$$

Po jednom polocasu zustane $50\\%$ jader, po dvou $25\\%$, po trech $12{,}5\\%$ atd.

> [!info] **Prirodni vs. umela radioaktivita:** Prirodni radioaktivni prvky existuji v Zemi od jejiho vzniku (uran, thorium, radon). Umela radioaktivita vznikla umelym ozarenim stabilnich jader (napriklad v urychlovacich castic).`,
        visual: {
          type: "interactive-atom",
          props: {
            mode: "decay",
            defaultHalfLife: 10,
          },
          caption: "Radioaktivni rozpad — sledujte, jak se pocet nerozpadlych jader snizuje s casem. Po kazdem polocasu zustane polovina.",
        },
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Foton ultrafialoveho zareni ma frekvenci $f = 1{,}5 \\times 10^{15}$ Hz. Vypoctete jeho energii a rozhodnete, zda muze zpusobit fotoelektricky jev na sodikovem povrchu ($W_0 = 2{,}4$ eV). Pokud ano, urcete kinetickou energii uvolneneho elektronu.`,
    steps: [
      {
        instruction: "Vypoctete energii fotonu",
        math: "$E = h \\cdot f = 6{,}63 \\times 10^{-34} \\cdot 1{,}5 \\times 10^{15} = 9{,}945 \\times 10^{-19} \\text{ J}$",
        explanation: "Pouzijeme zakladni vztah pro energii fotonu $E = hf$.",
      },
      {
        instruction: "Prevedte energii na elektronvolty",
        math: "$E = \\frac{9{,}945 \\times 10^{-19}}{1{,}6 \\times 10^{-19}} \\approx 6{,}22 \\text{ eV}$",
        explanation: "Delime energii v joulech hodnotou $1 \\text{ eV} = 1{,}6 \\times 10^{-19}$ J.",
      },
      {
        instruction: "Porovnejte s vystupni praci",
        math: "$E = 6{,}22 \\text{ eV} > W_0 = 2{,}4 \\text{ eV}$",
        explanation: "Energie fotonu je vetsi nez vystupni prace — fotoelektricky jev **nastane**.",
      },
      {
        instruction: "Vypoctete kinetickou energii elektronu",
        math: "$E_k = h \\cdot f - W_0 = 6{,}22 - 2{,}4 = 3{,}82 \\text{ eV}$",
        explanation: "Kineticka energie je rozdil mezi energii fotonu a vystupni praci.",
      },
    ],
    finalAnswer: "Energie fotonu je $E \\approx 6{,}22$ eV. Protoze $E > W_0 = 2{,}4$ eV, fotoelektricky jev nastane. Kineticka energie uvolneneho elektronu je $E_k \\approx 3{,}8$ eV.",
  },
  practiceProblems: [
    {
      id: "kf-b-1",
      problemStatement: "Vypoctete energii fotonu cerveneho svetla o frekvenci $f = 4{,}3 \\times 10^{14}$ Hz. ($h = 6{,}63 \\times 10^{-34}$ J$\\cdot$s)",
      expectedAnswer: "2.85e-19",
      acceptableAnswers: ["2.85e-19", "2,85e-19", "2.85 * 10^-19", "2,85 * 10^-19", "2.85"],
      numericTolerance: 0.05e-19,
      hints: [
        "Pouzijte vzorec $E = h \\cdot f$.",
        "$E = 6{,}63 \\times 10^{-34} \\cdot 4{,}3 \\times 10^{14}$",
      ],
      solutionExplanation: `$$E = h \\cdot f = 6{,}63 \\times 10^{-34} \\cdot 4{,}3 \\times 10^{14} = 2{,}85 \\times 10^{-19} \\text{ J}$$
V elektronvoltech: $E = 2{,}85 \\times 10^{-19} / 1{,}6 \\times 10^{-19} \\approx 1{,}78$ eV.`,
      difficulty: "easy" as const,
    },
    {
      id: "kf-b-2",
      problemStatement: "Foton ma energii $E = 4{,}0$ eV. Vystupni prace kovu je $W_0 = 2{,}3$ eV. Jaka je maximalni kineticka energie uvolneneho elektronu?",
      expectedAnswer: "1.7",
      acceptableAnswers: ["1.7", "1,7", "1.7 eV", "1,7 eV"],
      numericTolerance: 0.1,
      hints: [
        "Pouzijte Einsteinovu rovnici: $E_k = hf - W_0$.",
        "$E_k = 4{,}0 - 2{,}3$",
      ],
      solutionExplanation: `$$E_k = E - W_0 = 4{,}0 - 2{,}3 = 1{,}7 \\text{ eV}$$
Uvolneny elektron ma maximalni kinetickou energii $1{,}7$ eV.`,
      difficulty: "easy" as const,
    },
    {
      id: "kf-b-3",
      problemStatement: "Elektron se pohybuje rychlosti $v = 2 \\times 10^{6}$ m/s. Jaka je jeho de Broglieho vlnova delka? ($m_e = 9{,}1 \\times 10^{-31}$ kg, $h = 6{,}63 \\times 10^{-34}$ J$\\cdot$s)",
      expectedAnswer: "0.36",
      acceptableAnswers: ["0.36", "0,36", "0.36 nm", "0,36 nm", "3.6e-10", "3,6e-10"],
      numericTolerance: 0.02,
      hints: [
        "$\\lambda = h / (m \\cdot v)$.",
        "$\\lambda = 6{,}63 \\times 10^{-34} / (9{,}1 \\times 10^{-31} \\cdot 2 \\times 10^{6})$",
      ],
      solutionExplanation: `$$\\lambda = \\frac{h}{m_e \\cdot v} = \\frac{6{,}63 \\times 10^{-34}}{9{,}1 \\times 10^{-31} \\cdot 2 \\times 10^{6}} = \\frac{6{,}63 \\times 10^{-34}}{1{,}82 \\times 10^{-24}} \\approx 3{,}64 \\times 10^{-10} \\text{ m} \\approx 0{,}36 \\text{ nm}$$`,
      difficulty: "medium" as const,
    },
    {
      id: "kf-b-4",
      problemStatement: "Izotop ma 6 protonu a 8 neutronu. Jaky je jeho zapis $^{A}_{Z}X$ a o jaky prvek se jedna?",
      expectedAnswer: "14C",
      acceptableAnswers: ["14C", "C-14", "uhlik-14", "uhlik 14", "^14_6 C"],
      hints: [
        "$Z$ je pocet protonu, $A = Z + N$.",
        "$Z = 6$ (uhlik), $A = 6 + 8 = 14$.",
      ],
      solutionExplanation: `$Z = 6$ (prvek s 6 protony je **uhlik** C), $N = 8$, $A = Z + N = 6 + 8 = 14$.
Zapis: $^{14}_{6}C$ — uhlik-14. Jde o radioaktivni izotop uhliku pouzivany pro datovani (radiokarbonova metoda).`,
      difficulty: "easy" as const,
    },
    {
      id: "kf-b-5",
      problemStatement: "Radioaktivni vzorek obsahuje $N_0 = 8\\,000$ jader s polocasem rozpadu $T_{1/2} = 3$ hodiny. Kolik jader zustane po $9$ hodinach?",
      expectedAnswer: "1000",
      acceptableAnswers: ["1000", "1 000", "1000 jader"],
      hints: [
        "Za 9 hodin ubehnou $9/3 = 3$ polocasy.",
        "$N = N_0 \\cdot (1/2)^3 = 8000 \\cdot 1/8$",
      ],
      solutionExplanation: `Pocet polocasu: $t / T_{1/2} = 9 / 3 = 3$.
$$N = N_0 \\cdot \\left(\\frac{1}{2}\\right)^3 = 8\\,000 \\cdot \\frac{1}{8} = 1\\,000 \\text{ jader}$$
Po 9 hodinach zustane $1\\,000$ nerozpadlych jader.`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Atom**: jadro ($Z$ protonu + $N$ neutronu) a elektronovy obal. Izotopy maji stejne $Z$, ruzne $N$.",
      "**Fotoelektricky jev**: $E_k = hf - W_0$ — elektron se uvolni pouze kdyz $hf > W_0$.",
      "**Energie fotonu**: $E = hf = hc/\\lambda$ — svetlo se chova jako proud castic.",
      "**De Broglieho vlnova delka**: $\\lambda = h/(mv)$ — i hmotne castice maji vlnove vlastnosti.",
      "**Radioaktivita**: alfa, beta, gama zareni. Polocas rozpadu: $N(t) = N_0 \\cdot (1/2)^{t/T_{1/2}}$.",
    ],
    nextTopicSuggestion: "Vyborne! Pokracujte na stredne pokrociou uroven — Bohruv model vodiku, jaderne reakce a zakon radioaktivniho rozpadu.",
  },
};

// ═══════════════════════════════════════════════════════════════
// STŘEDNĚ POKROČILÝ — Bohruv model, jaderne reakce, rozpad, hmotnostni ubytek
// ═══════════════════════════════════════════════════════════════
const intermediate = {
  conceptExplanation: {
    title: "Kvantova a jaderna fyzika — jaderne reakce a Bohruv model",
    sections: [
      {
        heading: "Bohruv model vodiku",
        body: `Niels Bohr (1913) vytvoril model atomu vodiku, ktery vysvetlil jeho **carove spektrum**.

**Energeticke hladiny vodiku:**
$$\\boxed{E_n = -\\frac{13{,}6}{n^2} \\text{ eV}, \\quad n = 1, 2, 3, \\dots}$$

- $n = 1$: **zakladni stav** ($E_1 = -13{,}6$ eV)
- $n = 2$: prvni excitovany stav ($E_2 = -3{,}4$ eV)
- $n = \\infty$: ionizace ($E = 0$ eV)

$$\\begin{array}{c|c} n & E_n \\text{ (eV)} \\\\ \\hline 1 & -13{,}600 \\\\ 2 & -3{,}400 \\\\ 3 & -1{,}511 \\\\ 4 & -0{,}850 \\\\ 5 & -0{,}544 \\\\ \\infty & 0 \\end{array}$$

**Prechod mezi hladinami:** Pri prechodu z vyssi hladiny $n_i$ na nizsi $n_f$ atom **vyzari foton** s energii:
$$\\boxed{E_{\\text{foton}} = E_{n_i} - E_{n_f} = 13{,}6 \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right) \\text{ eV}}$$

**Spektralni serie:**
$$\\begin{array}{l|c|c} \\text{Serie} & n_f & \\text{Oblast spektra} \\\\ \\hline \\text{Lymanova} & 1 & \\text{ultrafialova (UV)} \\\\ \\text{Balmerova} & 2 & \\text{viditelna} \\\\ \\text{Paschenova} & 3 & \\text{infracervena (IR)} \\end{array}$$

**Rydberguv vzorec:**
$$\\boxed{\\frac{1}{\\lambda} = R \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)}$$
kde $R = 1{,}097 \\times 10^7 \\text{ m}^{-1}$ je Rydbergova konstanta.

> [!key] Zaporna energie znamena, ze elektron je **vazany** v atomu. K ionizaci vodiku ze zakladniho stavu je potreba dodat $13{,}6$ eV — to je **ionizacni energie vodiku**.`,
        visual: {
          type: "interactive-atom",
          props: {
            mode: "energy-levels",
            defaultN: 4,
          },
          caption: "Energeticke hladiny vodiku — kliknete na prechod a sledujte, jaky foton se vyzari. Vyssi prechody odpovidaji fotonu s vetsi energii (kratsi vlnova delka).",
        },
      },
      {
        heading: "Jaderne reakce",
        body: `Jaderna reakce je premena atomovych jader, pri ktere se meni jejich slozeni. Plati **zakon zachovani**:
- **naboje** (celkovy pocet protonu)
- **nukleonoveho cisla** (celkovy pocet nukleonu)
- **energie** (vcetne klidove energie $E = mc^2$)

**Jaderne stepen (fise):**

Teske jadro se rozstepí na dve mensi jadra a uvolni neutrony:

$$^{235}_{92}U + ^{1}_{0}n \\to ^{141}_{56}Ba + ^{92}_{36}Kr + 3\\,^{1}_{0}n + \\text{energie}$$

> [!key] Kazde stepen uranu-235 uvolni priblizne **200 MeV** energie. Uvolnene neutrony mohou zpusobit dalsi stepen — vzniká **retezvá reakce**. K jejimu udrzeni je potreba **kriticke mnozstvi** stepivy materiálu.

**Jaderna synteza (fuze):**

Lehka jadra se spoji a vytvori tezsi jadro:

$$^{2}_{1}H + ^{3}_{1}H \\to ^{4}_{2}He + ^{1}_{0}n + 17{,}6 \\text{ MeV}$$

> [!info] Fuze je zdrojem energie hvezd. Ve Slunci probiha proton-protonovy retezec, pri kterem se vodik meni na helium. Na Zemi se snazime realizovat rizenou fuzi v zarizeni zvanem **tokamak**.

**Vazebna energie na nukleon:**

$$\\begin{array}{l|c} \\text{Jadro} & E_{\\text{vaz}}/A \\text{ (MeV)} \\\\ \\hline ^{2}_{1}H & 1{,}1 \\\\ ^{4}_{2}He & 7{,}1 \\\\ ^{56}_{26}Fe & 8{,}8 \\text{ (maximum)} \\\\ ^{235}_{92}U & 7{,}6 \\end{array}$$

Jadra uprostred periodicke tabulky (kolem zeleza) maji **nejvyssi** vazebnou energii na nukleon — jsou nejstabilnejsi.`,
      },
      {
        heading: "Zakon radioaktivniho rozpadu",
        body: `Radioaktivni rozpad je **statisticky proces** — nemuzeme predpovedet, kdy se rozpadne konkretni jadro, ale muzeme presne popsat chovani velkeho poctu jader.

**Pocet nerozpadlych jader:**
$$\\boxed{N(t) = N_0 \\cdot \\left(\\frac{1}{2}\\right)^{t/T_{1/2}}}$$

**Rozpadova konstanta:**
$$\\boxed{\\lambda = \\frac{\\ln 2}{T_{1/2}} = \\frac{0{,}693}{T_{1/2}}}$$

**Aktivita** (pocet rozpadu za sekundu):
$$\\boxed{A = \\lambda \\cdot N = \\frac{\\ln 2}{T_{1/2}} \\cdot N}$$

Jednotka aktivity: **becquerel** (Bq) = 1 rozpad za sekundu.

> [!tip] **Radiokarbonova metoda (C-14):** Zivy organismus prijima $^{14}C$ z atmosfery. Po smrti se $^{14}C$ rozklada s $T_{1/2} = 5\\,730$ let. Merenim zbyvajiciho podilu $^{14}C$ lze urcit stari organickeho materialu az do $\\sim 50\\,000$ let.

Priklad casoveho vyvoje:

$$\\begin{array}{c|c|c} \\text{Cas} & N/N_0 & \\text{Procent} \\\\ \\hline 0 & 1 & 100\\% \\\\ T_{1/2} & 1/2 & 50\\% \\\\ 2T_{1/2} & 1/4 & 25\\% \\\\ 3T_{1/2} & 1/8 & 12{,}5\\% \\\\ 4T_{1/2} & 1/16 & 6{,}25\\% \\end{array}$$`,
        visual: {
          type: "interactive-atom",
          props: {
            mode: "decay",
            defaultHalfLife: 15,
          },
          caption: "Zakon radioaktivniho rozpadu — menite polocas a sledujte exponencialni pokles poctu jader. Vsimnete si, ze za kazdy polocas se pocet snizi na polovinu.",
        },
      },
      {
        heading: "Hmotnostni ubytek a energie",
        body: `Einsteinuv slavny vztah mezi hmotnosti a energii:
$$\\boxed{E = m \\cdot c^2}$$

**Hmotnostni ubytek** (hmotnostni defekt) $\\Delta m$:

Hmotnost jadra je vzdy **mensi** nez soucet hmotnosti jednotlivych nukleonu:
$$\\boxed{\\Delta m = Z \\cdot m_p + N \\cdot m_n - m_{\\text{jadro}}}$$

Tento "chybejici" hmotnostni rozdil odpovida **vazebne energii** jadra:
$$\\boxed{E_{\\text{vaz}} = \\Delta m \\cdot c^2}$$

> [!key] Vazebna energie je energie, ktera by se musela dodat k rozlozeni jadra na jednotlive nukleony. Cim vetsi $E_{\\text{vaz}}/A$ (na nukleon), tim je jadro stabilnejsi.

**Prakticka jednotka:**
$$1 \\text{ u} = 1{,}66 \\times 10^{-27} \\text{ kg} = 931{,}5 \\text{ MeV}/c^2$$

**Energie uvolnena pri reakcich:**
- **Stepen U-235**: $\\sim 200$ MeV na jadro
- **Fuze D-T**: $\\sim 17{,}6$ MeV na reakci

Pro porovnani: spaleni jednoho atomu uhliku uvolni asi $4$ eV — jaderne reakce jsou priblizne **milionkrat energeticky vydatnejsi** nez chemicke.

> [!info] Jeden kilogram uranu-235 pri uplnem stepen uvolni energii ekvivalentni spaleni priblizne $2\\,500$ tun uhli.`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `Atom vodiku se nachazi ve stavu $n_i = 3$ a preskoci na hladinu $n_f = 2$ (Balmerova serie, cara $H_\\alpha$). Vypoctete vlnovou delku vyzareneho fotonu.`,
    steps: [
      {
        instruction: "Zapiste Rydberguv vzorec",
        math: "$\\frac{1}{\\lambda} = R \\left(\\frac{1}{n_f^2} - \\frac{1}{n_i^2}\\right)$",
        explanation: "Rydberguv vzorec dava prevraceny vztah pro vlnovou delku vyzareneho fotonu.",
      },
      {
        instruction: "Dosadte $n_f = 2$ a $n_i = 3$",
        math: "$\\frac{1}{\\lambda} = 1{,}097 \\times 10^7 \\left(\\frac{1}{2^2} - \\frac{1}{3^2}\\right) = 1{,}097 \\times 10^7 \\left(\\frac{1}{4} - \\frac{1}{9}\\right)$",
        explanation: "Dosadime hodnoty kvantovych cisel a Rydbergovu konstantu $R = 1{,}097 \\times 10^7 \\text{ m}^{-1}$.",
      },
      {
        instruction: "Vypoctete vyraz v zavorce",
        math: "$\\frac{1}{4} - \\frac{1}{9} = \\frac{9 - 4}{36} = \\frac{5}{36}$",
        explanation: "Prevedeme na spolecneho jmenovatele.",
      },
      {
        instruction: "Dopoctete $1/\\lambda$",
        math: "$\\frac{1}{\\lambda} = 1{,}097 \\times 10^7 \\cdot \\frac{5}{36} = 1{,}524 \\times 10^6 \\text{ m}^{-1}$",
        explanation: "Vynasobime Rydbergovu konstantu zlomkem.",
      },
      {
        instruction: "Vypoctete vlnovou delku",
        math: "$\\lambda = \\frac{1}{1{,}524 \\times 10^6} = 6{,}56 \\times 10^{-7} \\text{ m} = 656 \\text{ nm}$",
        explanation: "Prevrátíme zlomek a dostaneme vlnovou delku. Hodnota $656$ nm odpovida cervene barvě — slavna vodikova cara $H_\\alpha$.",
      },
    ],
    finalAnswer: "Vlnova delka fotonu vyzareneho pri prechodu $n = 3 \\to n = 2$ je $\\lambda \\approx 656$ nm — cervene svetlo (vodikova cara $H_\\alpha$ Balmerovy serie).",
  },
  practiceProblems: [
    {
      id: "kf-i-1",
      problemStatement: "Atom vodiku preskoci z hladiny $n = 4$ na hladinu $n = 2$. Jakou energii ma vyzareny foton? ($E_n = -13{,}6/n^2$ eV)",
      expectedAnswer: "2.55",
      acceptableAnswers: ["2.55", "2,55", "2.55 eV", "2,55 eV"],
      numericTolerance: 0.05,
      hints: [
        "$E_{\\text{foton}} = E_4 - E_2$, pricemz energie hladin jsou zaporne.",
        "$E_4 = -13{,}6/16 = -0{,}85$ eV, $E_2 = -13{,}6/4 = -3{,}4$ eV",
      ],
      solutionExplanation: `$$E_4 = -\\frac{13{,}6}{4^2} = -\\frac{13{,}6}{16} = -0{,}85 \\text{ eV}$$
$$E_2 = -\\frac{13{,}6}{2^2} = -\\frac{13{,}6}{4} = -3{,}40 \\text{ eV}$$
$$E_{\\text{foton}} = E_4 - E_2 = -0{,}85 - (-3{,}40) = 2{,}55 \\text{ eV}$$
Foton ma energii $2{,}55$ eV — to odpovida viditelnemu svetlu (modrozelena barva, Balmerova serie $H_\\beta$).`,
      difficulty: "medium" as const,
    },
    {
      id: "kf-i-2",
      problemStatement: "Radioaktivni vzorek ma pocatecni aktivitu $A_0 = 800$ Bq a polocas rozpadu $T_{1/2} = 6$ hodin. Jaka bude aktivita po $18$ hodinach?",
      expectedAnswer: "100",
      acceptableAnswers: ["100", "100 Bq"],
      hints: [
        "Aktivita klesa stejne jako pocet jader: $A(t) = A_0 \\cdot (1/2)^{t/T_{1/2}}$.",
        "Pocet polocasu: $18/6 = 3$. Tedy $A = 800 \\cdot (1/2)^3$.",
      ],
      solutionExplanation: `Pocet polocasu: $t/T_{1/2} = 18/6 = 3$.
$$A = A_0 \\cdot \\left(\\frac{1}{2}\\right)^3 = 800 \\cdot \\frac{1}{8} = 100 \\text{ Bq}$$`,
      difficulty: "easy" as const,
    },
    {
      id: "kf-i-3",
      problemStatement: "Hmotnost jadra helia-4 je $m_{He} = 4{,}0026$ u. Hmotnosti protonu a neutronu jsou $m_p = 1{,}0073$ u a $m_n = 1{,}0087$ u. Vypoctete hmotnostni ubytek $\\Delta m$ (v jednotkach u).",
      expectedAnswer: "0.0294",
      acceptableAnswers: ["0.0294", "0,0294", "0.030", "0,030", "0.029"],
      numericTolerance: 0.001,
      hints: [
        "Helium-4 ma $Z = 2$ protony a $N = 2$ neutrony.",
        "$\\Delta m = 2 \\cdot m_p + 2 \\cdot m_n - m_{He}$",
      ],
      solutionExplanation: `$$\\Delta m = 2 \\cdot 1{,}0073 + 2 \\cdot 1{,}0087 - 4{,}0026 = 2{,}0146 + 2{,}0174 - 4{,}0026 = 0{,}0294 \\text{ u}$$
Vazebna energie: $E_{\\text{vaz}} = 0{,}0294 \\cdot 931{,}5 \\approx 27{,}4$ MeV, tedy $\\approx 6{,}9$ MeV na nukleon.`,
      difficulty: "medium" as const,
    },
    {
      id: "kf-i-4",
      problemStatement: "Pri stepen jadra uranu-235 se uvolni priblizne $200$ MeV. Kolik energie (v MeV) se uvolni pri stepen $1\\,000$ jader?",
      expectedAnswer: "200000",
      acceptableAnswers: ["200000", "200 000", "200000 MeV", "200 000 MeV", "2e5"],
      hints: [
        "Celkova energie = pocet jader $\\times$ energie na jedno stepen.",
        "$E = 1\\,000 \\cdot 200$ MeV",
      ],
      solutionExplanation: `$$E = 1\\,000 \\cdot 200 = 200\\,000 \\text{ MeV} = 2 \\times 10^5 \\text{ MeV}$$
To je $200\\,000 \\cdot 1{,}6 \\times 10^{-13} = 3{,}2 \\times 10^{-8}$ J. I maly pocet stepen uvolni meritelnou energii.`,
      difficulty: "easy" as const,
    },
    {
      id: "kf-i-5",
      problemStatement: "Radioaktivni izotop ma rozpadovou konstantu $\\lambda = 2{,}31 \\times 10^{-4}$ s$^{-1}$. Jaky je jeho polocas rozpadu (v sekundach)? ($\\ln 2 \\approx 0{,}693$)",
      expectedAnswer: "3000",
      acceptableAnswers: ["3000", "3 000", "3000 s", "3 000 s", "50 min"],
      numericTolerance: 50,
      hints: [
        "$T_{1/2} = \\ln 2 / \\lambda$.",
        "$T_{1/2} = 0{,}693 / (2{,}31 \\times 10^{-4})$",
      ],
      solutionExplanation: `$$T_{1/2} = \\frac{\\ln 2}{\\lambda} = \\frac{0{,}693}{2{,}31 \\times 10^{-4}} = 3\\,000 \\text{ s} = 50 \\text{ min}$$`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Bohruv model vodiku**: $E_n = -13{,}6/n^2$ eV. Prechody mezi hladinami odpovidaji emisi/absorpci fotonu.",
      "**Rydberguv vzorec**: $1/\\lambda = R(1/n_f^2 - 1/n_i^2)$ — predpovida vlnove delky vodikovych car.",
      "**Jaderne stepen**: teske jadro se rozstepí ($\\sim 200$ MeV). Retezova reakce vyzaduje kriticke mnozstvi.",
      "**Jaderna fuze**: lehka jadra se spoji ($\\sim 17{,}6$ MeV pro D-T). Zdroj energie hvezd.",
      "**Hmotnostni ubytek**: $\\Delta m = Z \\cdot m_p + N \\cdot m_n - m_{\\text{jadro}}$, $E_{\\text{vaz}} = \\Delta m \\cdot c^2$.",
    ],
    nextTopicSuggestion: "Pokracujte na pokrociou uroven — zaklady kvantove mechaniky, tunelovy jev, jaderna energetika a dozimetrie.",
  },
};

// ═══════════════════════════════════════════════════════════════
// POKROČILÝ — Kvantova mechanika, tunelovy jev, jaderna energetika, dozimetrie
// ═══════════════════════════════════════════════════════════════
const advanced = {
  conceptExplanation: {
    title: "Kvantova a jaderna fyzika — pokrocile koncepty",
    sections: [
      {
        heading: "Kvantova mechanika — zaklady",
        body: `Kvantova mechanika je fundamentalni teorie popisujici chovani castic na atomarni a subatomarni urovni.

**Vlnova funkce** $\\psi(x, t)$:
- Castica je popsana vlnovou funkci $\\psi$
- **Pravdepodobnost** nalezeni castice v miste $x$ je umerna $|\\psi(x)|^2$
- Vlnova funkce musi byt **normovana**: $\\int |\\psi|^2 \\, dx = 1$

**Heisenberguv princip neurcitosti:**
$$\\boxed{\\Delta x \\cdot \\Delta p \\geq \\frac{\\hbar}{2}}$$

kde $\\hbar = h/(2\\pi) = 1{,}055 \\times 10^{-34}$ J$\\cdot$s.

> [!key] Nelze **soucasne** presne zmerit polohu a hybnost castice. Cim presneji zname polohu ($\\Delta x$ male), tim mene presne zname hybnost ($\\Delta p$ velke) — a naopak. **Toto neni omezeni mericiho pristroje, ale fundamentalni vlastnost prirody.**

Existuje i energeticko-casova varianta:
$$\\Delta E \\cdot \\Delta t \\geq \\frac{\\hbar}{2}$$

**Schrodingerova rovnice** (casove nezavisla, 1D):
$$-\\frac{\\hbar^2}{2m} \\frac{d^2 \\psi}{dx^2} + V(x) \\psi = E \\psi$$

Tato rovnice urcuje mozne energeticke stavy castice v potencialu $V(x)$.

**Kvantova cisla** (pro atom vodiku):
$$\\begin{array}{l|c|c} \\text{Kvantove cislo} & \\text{Znacka} & \\text{Hodnoty} \\\\ \\hline \\text{Hlavni} & n & 1, 2, 3, \\dots \\\\ \\text{Vedlejsi (orbitalni)} & l & 0, 1, \\dots, n-1 \\\\ \\text{Magneticke} & m_l & -l, \\dots, 0, \\dots, +l \\\\ \\text{Spinove} & m_s & +1/2, -1/2 \\end{array}$$

**Tvary orbitalu:**
- $l = 0$ (orbital **s**): kulovy tvar
- $l = 1$ (orbital **p**): tvar cinky (3 orientace)
- $l = 2$ (orbital **d**): 5 orientaci
- $l = 3$ (orbital **f**): 7 orientaci

> [!info] Pauliho vylucovaci princip: V jednom atomu nemohou existovat dva elektrony se stejnou sadou vsech ctyr kvantovych cisel. To urcuje maximalni obsazenost slupek a tvar periodicke tabulky.`,
      },
      {
        heading: "Tunelovy jev",
        body: `V klasicke fyzice castica s energii $E$ nemuze projit pres potencialovou barieru s vyskou $V_0 > E$. V kvantove mechanice to ale **mozne je**!

**Tunelovy jev**: castice ma nenulovou pravdepodobnost projit potencialovou barierou, i kdyz jeji energie je mensi nez vyska bariery.

Pravdepodobnost tunelování klesa **exponencialne** se sirkou bariery $d$:
$$\\boxed{T \\approx e^{-2\\kappa d}}$$

kde:
$$\\kappa = \\frac{\\sqrt{2m(V_0 - E)}}{\\hbar}$$

> [!key] Cim je bariera **sirsi** nebo **vyssi**, tim je pravdepodobnost tunelování **mensi**. Cim je castica **tezsi**, tim je tunelování mene pravdepodobne. Proto tunelový jev pozorujeme predevsim u lehkych castic (elektronu, protonu) a na velmi kratkych vzdalenostech.

**Aplikace tuneloveho jevu:**

1. **Rozpad alfa**: $\\alpha$-castica ($^{4}_{2}He$) je v jadre "uvěznena" potencialovou barierou jaderne sily. S malou pravdepodobnosti tuneluje ven — to je mechanismus alfa-rozpadu. Vysvetluje obrovske rozdily v polocasech.

2. **Tunelovaci dioda**: elektronicky prvek vyuzivajici tunelování elektronu pres tenkou barieru. Rychla odezva — pouziti v mikrovlnne technice.

3. **Rastorvaci tunelovaci mikroskop (STM)**: mezi vodivym hrotem a povrchem teče tunelovy proud. Mapovanim proudu lze zobrazit povrch s atomarnim rozlisenim.

> [!tip] STM bylo vynalezeno v roce 1981 (Nobelova cena 1986). Umoznuje nejen "videt" jednotlive atomy, ale i s nimi manipulovat — napriklad poskládat napis z atomu.

4. **Fuze v hvezdach**: protony v jadru Slunce nemaji dostatek energie k prekonani elektrostaticke odpudive bariery klasicky, ale mohou ji tunelovat. Bez tuneloveho jevu by hvezdy nezarily!`,
      },
      {
        heading: "Jaderna energetika",
        body: `Jaderna energie vyuziva obrovske mnozstvi energie skryte v atomovych jadrech.

**Jaderna elektrarna (stepen):**

Hlavni casti jaderneho reaktoru:
$$\\begin{array}{l|l} \\text{Cast} & \\text{Funkce} \\\\ \\hline \\text{Palivo} & ^{235}U \\text{ (obohaceny uran, 3-5\\%)} \\\\ \\text{Moderator} & \\text{zpomaluje neutrony (voda, grafit)} \\\\ \\text{Ridicí tyče} & \\text{absorbují neutrony (Cd, B) — rizeni reakce} \\\\ \\text{Chladivo} & \\text{odvadi teplo (voda, CO}_2\\text{)} \\\\ \\text{Biologicky stit} & \\text{ochrana pred zarenim (beton, ocel)} \\end{array}$$

> [!key] **Ridici tyce** jsou klicove pro bezpecnost: jejich zasunuti pohlti vice neutronu a **zpomalí** retezovou reakci, vytazeni ji **zrychli**. V nouzi se tyce automaticky zasunou (SCRAM).

**Jaderna fuze — budoucnost energetiky:**

$$^{2}_{1}H + ^{3}_{1}H \\to ^{4}_{2}He + ^{1}_{0}n + 17{,}6 \\text{ MeV}$$

Fuze vyzaduje teplotu $\\sim 10^8$ K, aby castice prekonaly elektrostatickou odpudivost (Coulombova bariera). Plasma se udrzi pomoci **magnetickeho pole** v zarizeni zvanem **tokamak**.

> [!info] **ITER** (Mezinarodni termonuklearni experimentalni reaktor) je momentalne nejvetsi projekt rizene fuze. Nachazi se v jihovychodni Francii a ma demonstrovat, ze fuze muze byt zdrojem energie.

**Porovnani zdroju energie:**
$$\\begin{array}{l|c|c} \\text{Zdroj} & \\text{Energie/kg} & \\text{CO}_2 \\\\ \\hline \\text{Uhli} & 30 \\text{ MJ} & \\text{vysoke} \\\\ \\text{Zemni plyn} & 55 \\text{ MJ} & \\text{stredni} \\\\ \\text{Stepen U-235} & 8{,}2 \\times 10^7 \\text{ MJ} & \\text{zadne*} \\\\ \\text{Fuze D-T} & 3{,}4 \\times 10^8 \\text{ MJ} & \\text{zadne} \\end{array}$$

*Primy provoz bez CO$_2$; neprime emise z tezby a stavby.

**Jaderny odpad** je hlavni nevyhodou stepen — vysoce radioaktivni odpad vyzaduje bezpecne ulozeni na tisice let.`,
      },
      {
        heading: "Dozimetrie a ochrana pred zarenim",
        body: `**Dozimetricke veliciny:**

$$\\begin{array}{l|c|c} \\text{Velicina} & \\text{Znacka} & \\text{Jednotka} \\\\ \\hline \\text{Absorbovana davka} & D & \\text{Gy (gray) = J/kg} \\\\ \\text{Ekvivalentni davka} & H & \\text{Sv (sievert)} \\\\ \\text{Efektivni davka} & E & \\text{Sv} \\end{array}$$

**Ekvivalentni davka** zahrnuje typ zareni:
$$\\boxed{H = D \\cdot w_R}$$

kde $w_R$ je **radiacni vahovaci faktor**:
$$\\begin{array}{l|c} \\text{Zareni} & w_R \\\\ \\hline \\gamma, \\beta & 1 \\\\ \\text{neutrony} & 5{-}20 \\\\ \\alpha & 20 \\end{array}$$

> [!key] Alfa zareni je pri vnejsim ozareni nejmene nebezpecne (zachyti ho i papir). Ale pri **vnitřním ozařeni** (vdechnuti, spolknuti) je $20\\times$ nebezpecnejsi nez gama — proto vysoke $w_R$.

**Prirodni pozadi:**
Prumerna rocni davka od prirodnich zdroju je priblizne $2{,}4$ mSv:
- Radon (vdechovani): $\\sim 1{,}2$ mSv
- Kosmicke zareni: $\\sim 0{,}4$ mSv
- Zemska kura: $\\sim 0{,}5$ mSv
- Potrava: $\\sim 0{,}3$ mSv

**Biologicke ucinky:**
$$\\begin{array}{l|l} \\text{Davka} & \\text{Ucinek} \\\\ \\hline < 100 \\text{ mSv} & \\text{zadne pozorovane akutni ucinky} \\\\ 250 \\text{ mSv} & \\text{zmeny v krevnim obrazu} \\\\ 1 \\text{ Sv} & \\text{nemoc z ozareni} \\\\ 4 \\text{ Sv} & \\text{smrtelne pro 50\\% osob (bez lecby)} \\end{array}$$

**Ochrana pred zarenim — tri principy:**
1. **Cas**: minimalizovat dobu v blizkosti zdroje
2. **Vzdalenost**: intenzita klesa se ctvercem vzdalenosti ($I \\propto 1/r^2$)
3. **Stineni**: papir ($\\alpha$), hlinik ($\\beta$), olovo/beton ($\\gamma$)

> [!info] **Vyuziti v medicine:**
> - **PET** (pozitronova emisni tomografie): vyuziva rozpad $\\beta^+$ (pozitronova emise) k zobrazeni metabolickych procesu
> - **Radioterapie**: cilene ozareni nadoru vysokoenergetickym zarenim
> - **Radiokarbonova metoda**: datovani archeologickych nalezu pomoci $^{14}C$ ($T_{1/2} = 5\\,730$ let)`,
      },
    ],
  },
  walkthroughProblem: {
    problemStatement: `a) Urcete minimalni energii fotonu potrebnou k ionizaci atomu vodiku ze zakladniho stavu. b) Foton o energii $20$ eV ionizuje atom vodiku. Vypoctete de Broglieho vlnovou delku uvolneneho elektronu. ($m_e = 9{,}1 \\times 10^{-31}$ kg)`,
    steps: [
      {
        instruction: "Urcete ionizacni energii vodiku",
        math: "$E_{\\text{ion}} = |E_1| = 13{,}6 \\text{ eV}$",
        explanation: "Ionizace ze zakladniho stavu ($n = 1$) vyzaduje energii rovnou absolutni hodnote energie zakladniho stavu: $|E_1| = |-13{,}6| = 13{,}6$ eV.",
      },
      {
        instruction: "Urcete kinetickou energii uvolneneho elektronu",
        math: "$E_k = E_{\\text{foton}} - E_{\\text{ion}} = 20 - 13{,}6 = 6{,}4 \\text{ eV}$",
        explanation: "Prebytecna energie fotonu (nad ionizacni energii) se premeni na kinetickou energii elektronu — analogie s fotoefektem.",
      },
      {
        instruction: "Prevedte kinetickou energii na jouly",
        math: "$E_k = 6{,}4 \\cdot 1{,}6 \\times 10^{-19} = 1{,}024 \\times 10^{-18} \\text{ J}$",
        explanation: "Pro vypocet v SI jednotkach potrebujeme energii v joulech.",
      },
      {
        instruction: "Vypoctete rychlost elektronu z $E_k = \\frac{1}{2}mv^2$",
        math: "$v = \\sqrt{\\frac{2 E_k}{m_e}} = \\sqrt{\\frac{2 \\cdot 1{,}024 \\times 10^{-18}}{9{,}1 \\times 10^{-31}}} = \\sqrt{2{,}25 \\times 10^{12}} \\approx 1{,}50 \\times 10^6 \\text{ m/s}$",
        explanation: "Hybnost muzeme urcit z rychlosti, nebo pouzit primo vzorec $p = \\sqrt{2m_e E_k}$.",
      },
      {
        instruction: "Vypoctete de Broglieho vlnovou delku",
        math: "$\\lambda = \\frac{h}{m_e v} = \\frac{6{,}63 \\times 10^{-34}}{9{,}1 \\times 10^{-31} \\cdot 1{,}50 \\times 10^6} = \\frac{6{,}63 \\times 10^{-34}}{1{,}365 \\times 10^{-24}} \\approx 4{,}86 \\times 10^{-10} \\text{ m} \\approx 0{,}49 \\text{ nm}$",
        explanation: "Vlnova delka elektronu je srovnatelna s meziatomovymi vzdalenostmi — takovy elektron by vytvarel difrakcni obrazec na krystalu.",
      },
    ],
    finalAnswer: "a) Minimalni energie fotonu pro ionizaci vodiku je $13{,}6$ eV. b) Elektron uvolneny fotonem o energii $20$ eV ma kinetickou energii $6{,}4$ eV a de Broglieho vlnovou delku $\\lambda \\approx 0{,}49$ nm.",
  },
  practiceProblems: [
    {
      id: "kf-a-1",
      problemStatement: "Elektron je lokalizovan s presnosti $\\Delta x = 1 \\times 10^{-10}$ m (priblizne velikost atomu). Jaka je minimalni neurcitost jeho hybnosti? ($\\hbar = 1{,}055 \\times 10^{-34}$ J$\\cdot$s)",
      expectedAnswer: "5.28e-25",
      acceptableAnswers: ["5.28e-25", "5,28e-25", "5.3e-25", "5,3e-25"],
      numericTolerance: 0.1e-25,
      hints: [
        "Pouzijte Heisenberguv princip: $\\Delta x \\cdot \\Delta p \\geq \\hbar/2$.",
        "$\\Delta p_{\\min} = \\hbar / (2 \\Delta x) = 1{,}055 \\times 10^{-34} / (2 \\times 10^{-10})$",
      ],
      solutionExplanation: `$$\\Delta p \\geq \\frac{\\hbar}{2 \\Delta x} = \\frac{1{,}055 \\times 10^{-34}}{2 \\times 1 \\times 10^{-10}} = 5{,}28 \\times 10^{-25} \\text{ kg} \\cdot \\text{m/s}$$
Odpovidajici minimalni neurcitost rychlosti: $\\Delta v = \\Delta p / m_e \\approx 5{,}8 \\times 10^5$ m/s — znacna neurcitost, coz ukazuje, ze na atomarni urovni je poloha i hybnost neurčita.`,
      difficulty: "medium" as const,
    },
    {
      id: "kf-a-2",
      problemStatement: "Elektron s energii $E = 3$ eV narazi na potencialovou barieru vysky $V_0 = 5$ eV a sirky $d = 0{,}2$ nm. Bude tunelový jev významný? (Odpovedete kvalitativne a zduvodnete.)",
      expectedAnswer: "ano",
      acceptableAnswers: ["ano", "Ano", "ano, tunelovy jev je vyznamny", "pravdepodobnost je nenulova"],
      hints: [
        "Spoctete $\\kappa = \\sqrt{2m(V_0 - E)}/\\hbar$ a pak $2\\kappa d$.",
        "$V_0 - E = 2$ eV $= 3{,}2 \\times 10^{-19}$ J. $\\kappa \\approx 7{,}2 \\times 10^9$ m$^{-1}$. $2\\kappa d \\approx 2{,}9$.",
      ],
      solutionExplanation: `$$\\kappa = \\frac{\\sqrt{2 \\cdot 9{,}1 \\times 10^{-31} \\cdot 3{,}2 \\times 10^{-19}}}{1{,}055 \\times 10^{-34}} = \\frac{\\sqrt{5{,}82 \\times 10^{-49}}}{1{,}055 \\times 10^{-34}} \\approx \\frac{7{,}63 \\times 10^{-25}}{1{,}055 \\times 10^{-34}} \\approx 7{,}2 \\times 10^9 \\text{ m}^{-1}$$
$$2\\kappa d = 2 \\cdot 7{,}2 \\times 10^9 \\cdot 2 \\times 10^{-10} = 2{,}88$$
$$T \\approx e^{-2{,}88} \\approx 0{,}056 \\approx 5{,}6\\%$$
**Ano**, tunelovy jev je vyznamny — existuje priblizne $5{,}6\\%$ pravdepodobnost, ze elektron projde. Pro subatomarni castice a tenke bariery je tunelování podstatne.`,
      difficulty: "hard" as const,
    },
    {
      id: "kf-a-3",
      problemStatement: "Jadro $^{56}_{26}Fe$ ma hmotnost $55{,}922$ u. Vypoctete vazebnou energii na nukleon (v MeV). ($m_p = 1{,}0073$ u, $m_n = 1{,}0087$ u, $1$ u $= 931{,}5$ MeV/$c^2$)",
      expectedAnswer: "8.8",
      acceptableAnswers: ["8.8", "8,8", "8.79", "8,79", "8.80", "8,80", "8.8 MeV"],
      numericTolerance: 0.1,
      hints: [
        "$\\Delta m = 26 \\cdot m_p + 30 \\cdot m_n - 55{,}922$.",
        "$\\Delta m = 26 \\cdot 1{,}0073 + 30 \\cdot 1{,}0087 - 55{,}922$.",
      ],
      solutionExplanation: `$$\\Delta m = 26 \\cdot 1{,}0073 + 30 \\cdot 1{,}0087 - 55{,}922$$
$$= 26{,}1898 + 30{,}2610 - 55{,}922 = 0{,}5288 \\text{ u}$$
$$E_{\\text{vaz}} = 0{,}5288 \\cdot 931{,}5 = 492{,}6 \\text{ MeV}$$
$$E_{\\text{vaz}}/A = 492{,}6 / 56 \\approx 8{,}80 \\text{ MeV/nukleon}$$
Zelezo-56 ma jednu z nejvyssich vazebnych energii na nukleon — patri mezi nejstabilnejsi jadra.`,
      difficulty: "hard" as const,
    },
    {
      id: "kf-a-4",
      problemStatement: "Pracovnik v jaderne elektrarne obdrzi absorbovanou davku $D = 5$ mGy gama zareni ($w_R = 1$) a $0{,}2$ mGy alfa zareni ($w_R = 20$). Jaka je jeho celkova ekvivalentni davka (v mSv)?",
      expectedAnswer: "9",
      acceptableAnswers: ["9", "9 mSv", "9,0", "9,0 mSv"],
      hints: [
        "$H = D \\cdot w_R$ pro kazdy typ zareni zvlast, pak secist.",
        "$H_{\\gamma} = 5 \\cdot 1 = 5$ mSv, $H_{\\alpha} = 0{,}2 \\cdot 20 = 4$ mSv.",
      ],
      solutionExplanation: `$$H_{\\gamma} = D_{\\gamma} \\cdot w_R = 5 \\cdot 1 = 5 \\text{ mSv}$$
$$H_{\\alpha} = D_{\\alpha} \\cdot w_R = 0{,}2 \\cdot 20 = 4 \\text{ mSv}$$
$$H_{\\text{celk}} = 5 + 4 = 9 \\text{ mSv}$$
I mala absorbovana davka alfa zareni prispiva znacne k ekvivalentni davce kvuli vysokemu $w_R$.`,
      difficulty: "medium" as const,
    },
    {
      id: "kf-a-5",
      problemStatement: "Doplnte jadernou reakci: $^{14}_{7}N + ^{4}_{2}He \\to \\,? + ^{1}_{1}H$. Jaky prvek vznika?",
      expectedAnswer: "17O",
      acceptableAnswers: ["17O", "O-17", "kyslik-17", "kyslik 17", "^17_8 O"],
      hints: [
        "Zachovani protonoveho cisla: $7 + 2 = Z + 1$, tedy $Z = 8$.",
        "Zachovani nukleonoveho cisla: $14 + 4 = A + 1$, tedy $A = 17$.",
      ],
      solutionExplanation: `Zachovani naboje (protonove cislo): $7 + 2 = Z + 1 \\implies Z = 8$ (kyslik).
Zachovani nukleonoveho cisla: $14 + 4 = A + 1 \\implies A = 17$.
$$^{14}_{7}N + ^{4}_{2}He \\to ^{17}_{8}O + ^{1}_{1}H$$
Vznika kyslik-17. Tato reakce byla prvni umele vyvolanou jadernou reakci — provedl ji Ernest Rutherford v roce 1919.`,
      difficulty: "medium" as const,
    },
  ],
  summary: {
    keyTakeaways: [
      "**Heisenberguv princip neurcitosti**: $\\Delta x \\cdot \\Delta p \\geq \\hbar/2$ — fundamentalni omezeni presnosti mereni.",
      "**Tunelovy jev**: castica muze projit barierou s $E < V_0$. Pravdepodobnost $T \\approx e^{-2\\kappa d}$. Klicovy pro alfa-rozpad, STM, fuzi v hvezdach.",
      "**Jaderna elektrarna**: ridici tyce reguluji retezovou reakci stepen U-235. Moderator zpomaluje neutrony.",
      "**Fuze**: D-T reakce uvolni $17{,}6$ MeV. Vyzaduje $\\sim 10^8$ K. Tokamak = magneticke udrzeni plazmatu.",
      "**Dozimetrie**: $H = D \\cdot w_R$. Alfa zareni ma $w_R = 20$. Ochrana: cas, vzdalenost, stineni.",
    ],
    nextTopicSuggestion: "Gratuluji! Zvladli jste celou kvantovou a jadernou fyziku — od zakladni struktury atomu po pokrocile koncepty. Zkuste si zopakovat predchozi temata nebo se podivejte na dalsI oblasti fyziky!",
  },
};

async function main() {
  const difficulties = [
    { label: "beginner", content: beginner, variant: 1 },
    { label: "intermediate", content: intermediate, variant: 1 },
    { label: "advanced", content: advanced, variant: 1 },
  ];

  console.log("\n📝 Seeding Brilliant-style lessons for: Kvantova a jaderna fyzika\n");

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

  console.log("\n🎉 Done! Brilliant-style Kvantova a jaderna fyzika lessons seeded.\n");
}

main().catch(console.error);
