import type { TopicTreeData } from "@/types/topic";

export const mathTree: TopicTreeData = {
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
          slug: "linearni-rovnice",
          name: "Lineární rovnice",
          description: "Řešení rovnic prvního stupně",
          aiContext:
            "Lineární rovnice ax + b = c, úpravy, ekvivalentní úpravy, slovní úlohy vedoucí na lineární rovnice",
        },
        {
          slug: "kvadraticke-rovnice",
          name: "Kvadratické rovnice",
          description: "Řešení rovnic druhého stupně",
          aiContext:
            "Kvadratické rovnice ax² + bx + c = 0, diskriminant, Vietovy vzorce, rozklad na součin",
        },
        {
          slug: "soustavy-rovnic",
          name: "Soustavy rovnic",
          description: "Soustavy lineárních rovnic",
          aiContext:
            "Soustavy dvou lineárních rovnic o dvou neznámých, dosazovací a sčítací metoda, grafické řešení",
        },
        {
          slug: "nerovnice",
          name: "Nerovnice",
          description: "Lineární a kvadratické nerovnice",
          aiContext:
            "Lineární nerovnice, kvadratické nerovnice, intervalový zápis, nerovnice s absolutní hodnotou",
        },
        {
          slug: "vyrazove-upravy",
          name: "Výrazové úpravy",
          description: "Úpravy algebraických výrazů",
          aiContext:
            "Vytýkání, vzorce (a+b)², (a-b)², a²-b², rozklad polynomů, lomené výrazy",
        },
        {
          slug: "posloupnosti",
          name: "Posloupnosti a řady",
          description: "Aritmetické a geometrické posloupnosti",
          aiContext:
            "Aritmetická posloupnost, geometrická posloupnost, n-tý člen, součet prvních n členů, konvergence řad",
        },
      ],
    },
    {
      slug: "funkce",
      name: "Funkce",
      description: "Funkce a jejich vlastnosti",
      icon: "📈",
      children: [
        {
          slug: "linearni-funkce",
          name: "Lineární funkce",
          description: "Funkce f(x) = ax + b",
          aiContext:
            "Lineární funkce, graf přímky, směrnice, průsečíky s osami, rovnoběžnost a kolmost přímek",
        },
        {
          slug: "kvadraticka-funkce",
          name: "Kvadratická funkce",
          description: "Funkce f(x) = ax² + bx + c",
          aiContext:
            "Parabola, vrchol paraboly, průsečíky s osou x, diskriminant, posuny a transformace grafu",
        },
        {
          slug: "exponencialni-funkce",
          name: "Exponenciální funkce",
          description: "Funkce f(x) = aˣ",
          aiContext:
            "Exponenciální funkce, exponenciální rovnice, exponenciální růst a pokles, pravidla pro počítání s mocninami",
        },
        {
          slug: "logaritmicka-funkce",
          name: "Logaritmická funkce",
          description: "Funkce f(x) = log_a(x)",
          aiContext:
            "Logaritmus, logaritmické rovnice, vlastnosti logaritmů, přirozený logaritmus, dekadický logaritmus",
        },
        {
          slug: "goniometricke-funkce",
          name: "Goniometrické funkce",
          description: "Sinus, kosinus, tangens",
          aiContext:
            "Sin, cos, tan, jednotková kružnice, perioda, amplituda, goniometrické rovnice, grafy goniometrických funkcí",
        },
        {
          slug: "absolutni-hodnota",
          name: "Funkce s absolutní hodnotou",
          description: "Grafy a rovnice s absolutní hodnotou",
          aiContext:
            "Absolutní hodnota, graf funkce s absolutní hodnotou, rovnice a nerovnice s absolutní hodnotou",
        },
      ],
    },
    {
      slug: "geometrie",
      name: "Geometrie",
      description: "Planimetrie a stereometrie",
      icon: "📏",
      children: [
        {
          slug: "trojuhelniky",
          name: "Trojúhelníky",
          description: "Vlastnosti a výpočty trojúhelníků",
          aiContext:
            "Druhy trojúhelníků, Pythagorova věta, sinová a kosinová věta, obsah trojúhelníku, Eukleidovy věty",
        },
        {
          slug: "kruznice-a-kruhy",
          name: "Kružnice a kruhy",
          description: "Obvod, obsah, tečny, sečny",
          aiContext:
            "Kružnice, kruh, obvod a obsah kruhu, tečna ke kružnici, vzájemná poloha kružnic, kruhové výseče a úseče",
        },
        {
          slug: "analyticka-geometrie",
          name: "Analytická geometrie",
          description: "Souřadnicová geometrie v rovině",
          aiContext:
            "Vzdálenost bodů, rovnice přímky, rovnice kružnice, vzájemná poloha přímek, vektory v rovině",
        },
        {
          slug: "stereometrie",
          name: "Stereometrie",
          description: "Tělesa a prostorová geometrie",
          aiContext:
            "Hranol, jehlan, válec, kužel, koule, objem a povrch těles, řezy těles, vzájemná poloha přímek a rovin",
        },
      ],
    },
    {
      slug: "kombinatorika",
      name: "Kombinatorika a pravděpodobnost",
      description: "Kombinatorika, pravděpodobnost, statistika",
      icon: "🎲",
      children: [
        {
          slug: "kombinatorika-zaklady",
          name: "Základy kombinatoriky",
          description: "Variace, kombinace, permutace",
          aiContext:
            "Variace, kombinace, permutace, faktoriál, kombinační čísla, princip inkluze a exkluze",
        },
        {
          slug: "pravdepodobnost",
          name: "Pravděpodobnost",
          description: "Klasická a podmíněná pravděpodobnost",
          aiContext:
            "Klasická pravděpodobnost, jevy, sjednocení a průnik jevů, podmíněná pravděpodobnost, Bayesova věta",
        },
      ],
    },
    {
      slug: "zaklady-analyzy",
      name: "Základy analýzy",
      description: "Limity, derivace a integrály",
      icon: "∞",
      children: [
        {
          slug: "limity",
          name: "Limity",
          description: "Limity posloupností a funkcí",
          aiContext:
            "Limita posloupnosti, limita funkce, jednostranné limity, nevlastní limity, l'Hôpitalovo pravidlo",
        },
        {
          slug: "derivace",
          name: "Derivace",
          description: "Derivace funkcí a jejich aplikace",
          aiContext:
            "Definice derivace, derivace elementárních funkcí, pravidla derivování, monotonie, extrémy funkce, tečna ke grafu",
        },
        {
          slug: "integraly",
          name: "Integrály",
          description: "Neurčité a určité integrály",
          aiContext:
            "Primitivní funkce, neurčitý integrál, metody integrace (per partes, substituce), určitý integrál, výpočet obsahu pod křivkou",
        },
      ],
    },
  ],
};
