import type { TopicTreeData } from "@/types/topic";

export const mathTree = {
  subject: "math",
  subjectName: "Matematika",
  icon: "📐",
  topics: [
    {
      slug: "algebra",
      name: "Algebra",
      description: "Základy algebraických operací a rovnic",
      icon: "🔢",
      children: [
        {
          slug: "sets-and-logic",
          name: "Množiny a výroková logika",
          description: "Sjednocení, průnik, výroky, kvantifikátory",
          aiContext:
            "Množiny (sjednocení, průnik, rozdíl, doplněk), intervaly, výroková logika, kvantifikátory, pravdivostní tabulky, důkazy",
          comingSoon: true,
        },
        {
          slug: "linear-equations",
          name: "Lineární rovnice",
          description: "Řešení rovnic prvního stupně",
          aiContext:
            "Lineární rovnice ax + b = c, úpravy, ekvivalentní úpravy, slovní úlohy vedoucí na lineární rovnice",
        },
        {
          slug: "quadratic-equations",
          name: "Kvadratické rovnice",
          description: "Řešení rovnic druhého stupně",
          aiContext:
            "Kvadratické rovnice ax² + bx + c = 0, diskriminant, Vietovy vzorce, rozklad na součin",
        },
        {
          slug: "systems-of-equations",
          name: "Soustavy rovnic",
          description: "Soustavy lineárních rovnic",
          aiContext:
            "Soustavy dvou lineárních rovnic o dvou neznámých, dosazovací a sčítací metoda, grafické řešení",
        },
        {
          slug: "inequalities",
          name: "Nerovnice",
          description: "Lineární a kvadratické nerovnice",
          aiContext:
            "Lineární nerovnice, kvadratické nerovnice, intervalový zápis, nerovnice s absolutní hodnotou",
        },
        {
          slug: "algebraic-expressions",
          name: "Výrazové úpravy",
          description: "Úpravy algebraických výrazů",
          aiContext:
            "Vytýkání, vzorce (a+b)², (a-b)², a²-b², rozklad polynomů, lomené výrazy",
        },
        {
          slug: "sequences",
          name: "Posloupnosti a řady",
          description: "Aritmetické a geometrické posloupnosti",
          aiContext:
            "Aritmetická posloupnost, geometrická posloupnost, n-tý člen, součet prvních n členů, konvergence řad",
        },
        {
          slug: "complex-numbers",
          name: "Komplexní čísla",
          description: "Čísla tvaru $a + bi$",
          aiContext:
            "Imaginární jednotka i, algebraický tvar, goniometrický tvar, Moivreova věta, rovnice v komplexních číslech, Gaussova rovina",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "functions",
      name: "Funkce",
      description: "Funkce a jejich vlastnosti",
      icon: "📈",
      children: [
        {
          slug: "linear-functions",
          name: "Lineární funkce",
          description: "Funkce f(x) = ax + b",
          aiContext:
            "Lineární funkce, graf přímky, směrnice, průsečíky s osami, rovnoběžnost a kolmost přímek",
        },
        {
          slug: "quadratic-functions",
          name: "Kvadratická funkce",
          description: "Funkce f(x) = ax² + bx + c",
          aiContext:
            "Parabola, vrchol paraboly, průsečíky s osou x, diskriminant, posuny a transformace grafu",
        },
        {
          slug: "exponential-functions",
          name: "Exponenciální funkce",
          description: "Funkce f(x) = aˣ",
          aiContext:
            "Exponenciální funkce, exponenciální rovnice, exponenciální růst a pokles, pravidla pro počítání s mocninami",
        },
        {
          slug: "logarithmic-functions",
          name: "Logaritmická funkce",
          description: "Funkce f(x) = log_a(x)",
          aiContext:
            "Logaritmus, logaritmické rovnice, vlastnosti logaritmů, přirozený logaritmus, dekadický logaritmus",
        },
        {
          slug: "trigonometric-functions",
          name: "Goniometrické funkce",
          description: "Sinus, kosinus, tangens",
          aiContext:
            "Sin, cos, tan, jednotková kružnice, perioda, amplituda, goniometrické rovnice, grafy goniometrických funkcí",
        },
        {
          slug: "absolute-value",
          name: "Funkce s absolutní hodnotou",
          description: "Grafy a rovnice s absolutní hodnotou",
          aiContext:
            "Absolutní hodnota, graf funkce s absolutní hodnotou, rovnice a nerovnice s absolutní hodnotou",
        },
      ],
    },
    {
      slug: "geometry",
      name: "Geometrie",
      description: "Planimetrie a stereometrie",
      icon: "📏",
      children: [
        {
          slug: "triangles",
          name: "Trojúhelníky",
          description: "Vlastnosti a výpočty trojúhelníků",
          aiContext:
            "Druhy trojúhelníků, Pythagorova věta, sinová a kosinová věta, obsah trojúhelníku, Eukleidovy věty",
        },
        {
          slug: "circles",
          name: "Kružnice a kruhy",
          description: "Obvod, obsah, tečny, sečny",
          aiContext:
            "Kružnice, kruh, obvod a obsah kruhu, tečna ke kružnici, vzájemná poloha kružnic, kruhové výseče a úseče",
        },
        {
          slug: "analytic-geometry",
          name: "Analytická geometrie",
          description: "Souřadnicová geometrie v rovině",
          aiContext:
            "Vzdálenost bodů, rovnice přímky, rovnice kružnice, vzájemná poloha přímek, vektory v rovině",
        },
        {
          slug: "vectors",
          name: "Vektory",
          description: "Vektorové operace, skalární a vektorový součin",
          aiContext:
            "Vektor, souřadnice vektoru, velikost, sčítání vektorů, skalární součin, vektorový součin, kolmost, rovnoběžnost, lineární kombinace",
          comingSoon: true,
        },
        {
          slug: "conics",
          name: "Kuželosečky",
          description: "Elipsa, hyperbola, parabola",
          aiContext:
            "Kružnice, elipsa (ohniska, hlavní a vedlejší osa), hyperbola (asymptoty), parabola (ohnisko, řídicí přímka), středová a obecná rovnice",
          comingSoon: true,
        },
        {
          slug: "solid-geometry",
          name: "Stereometrie",
          description: "Tělesa a prostorová geometrie",
          aiContext:
            "Hranol, jehlan, válec, kužel, koule, objem a povrch těles, řezy těles, vzájemná poloha přímek a rovin",
        },
      ],
    },
    {
      slug: "combinatorics-and-probability",
      name: "Kombinatorika a pravděpodobnost",
      description: "Kombinatorika, pravděpodobnost, statistika",
      icon: "🎲",
      children: [
        {
          slug: "combinatorics",
          name: "Základy kombinatoriky",
          description: "Variace, kombinace, permutace",
          aiContext:
            "Variace, kombinace, permutace, faktoriál, kombinační čísla, princip inkluze a exkluze",
        },
        {
          slug: "probability",
          name: "Pravděpodobnost",
          description: "Klasická a podmíněná pravděpodobnost",
          aiContext:
            "Klasická pravděpodobnost, jevy, sjednocení a průnik jevů, podmíněná pravděpodobnost, Bayesova věta",
        },
        {
          slug: "statistics",
          name: "Statistika",
          description: "Popisná statistika — průměr, medián, rozptyl",
          aiContext:
            "Aritmetický průměr, medián, modus, rozptyl, směrodatná odchylka, kvartily, histogram, korelace, normální rozdělení",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "calculus",
      name: "Základy analýzy",
      description: "Limity, derivace a integrály",
      icon: "∞",
      children: [
        {
          slug: "limits",
          name: "Limity",
          description: "Limity posloupností a funkcí",
          aiContext:
            "Limita posloupnosti, limita funkce, jednostranné limity, nevlastní limity, l'Hôpitalovo pravidlo",
        },
        {
          slug: "derivatives",
          name: "Derivace",
          description: "Derivace funkcí a jejich aplikace",
          aiContext:
            "Definice derivace, derivace elementárních funkcí, pravidla derivování, monotonie, extrémy funkce, tečna ke grafu",
        },
        {
          slug: "integrals",
          name: "Integrály",
          description: "Neurčité a určité integrály",
          aiContext:
            "Primitivní funkce, neurčitý integrál, metody integrace (per partes, substituce), určitý integrál, výpočet obsahu pod křivkou",
        },
      ],
    },
  ],
} as const satisfies TopicTreeData;

type LeafSlugOf<T> = T extends { children: readonly (infer C)[] }
  ? C extends { slug: infer S }
    ? S
    : never
  : never;

export type MathTopicSlug = LeafSlugOf<(typeof mathTree.topics)[number]>;
