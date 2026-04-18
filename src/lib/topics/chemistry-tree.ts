import type { TopicTreeData } from "@/types/topic";

export const chemistryTree = {
  subject: "chemistry",
  subjectName: "Chemie",
  icon: "🧪",
  topics: [
    {
      slug: "general-chemistry",
      name: "Obecná chemie",
      description: "Atomová stavba, vazby, reakce a výpočty",
      icon: "⚗️",
      children: [
        {
          slug: "atomic-structure",
          name: "Struktura atomu",
          description: "Proton, neutron, elektron; elektronový obal",
          aiContext:
            "Stavba atomu, protonové číslo, nukleonové číslo, izotopy, elektronová konfigurace, orbitaly, kvantová čísla",
          comingSoon: true,
        },
        {
          slug: "periodic-table",
          name: "Periodická soustava prvků",
          description: "Mendělejevova tabulka a trendy vlastností",
          aiContext:
            "Periodická soustava, skupiny, periody, trendy (elektronegativita, atomový poloměr, ionizační energie), s/p/d/f bloky",
          comingSoon: true,
        },
        {
          slug: "chemical-bonding",
          name: "Chemická vazba",
          description: "Iontová, kovalentní, kovová, vodíkové můstky",
          aiContext:
            "Iontová vazba, kovalentní vazba (polární, nepolární), kovová vazba, vodíkové můstky, VSEPR teorie, hybridizace",
          comingSoon: true,
        },
        {
          slug: "stoichiometry",
          name: "Stechiometrie",
          description: "Chemické rovnice a výpočty z nich",
          aiContext:
            "Vyčíslování rovnic, molární hmotnost, látkové množství, molární objem plynu, výpočty výtěžku a složení",
          comingSoon: true,
        },
        {
          slug: "thermochemistry",
          name: "Termochemie",
          description: "Reakční teplo, exotermní a endotermní reakce",
          aiContext:
            "Exotermní a endotermní reakce, reakční teplo (ΔH), Hessův zákon, slučovací a spalné teplo, entalpie",
          comingSoon: true,
        },
        {
          slug: "kinetics-and-equilibrium",
          name: "Chemická kinetika a rovnováha",
          description: "Rychlost reakce a chemická rovnováha",
          aiContext:
            "Rychlost reakce, aktivační energie, katalýza, rovnovážná konstanta, Le Chatelierův princip, dynamická rovnováha",
          comingSoon: true,
        },
        {
          slug: "solutions",
          name: "Roztoky",
          description: "Koncentrace, rozpustnost, koligativní vlastnosti",
          aiContext:
            "Hmotnostní zlomek, objemová koncentrace, molarita, rozpustnost, nasycené roztoky, koligativní vlastnosti (bod varu, tuhnutí)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "inorganic-chemistry",
      name: "Anorganická chemie",
      description: "Prvky, anorganické sloučeniny, acidobáze, redox",
      icon: "⚛️",
      children: [
        {
          slug: "hydrogen-and-water",
          name: "Vodík a voda",
          description: "Nejlehčí prvek a nejdůležitější rozpouštědlo",
          aiContext:
            "Vodík (izotopy, příprava, výroba, reakce), voda (struktura, vlastnosti, tvrdost, hydráty)",
          comingSoon: true,
        },
        {
          slug: "s-block",
          name: "s-prvky (alkalické kovy a kovy alkalických zemin)",
          description: "Skupiny 1 a 2 — Na, K, Ca, Mg…",
          aiContext:
            "Alkalické kovy (Li, Na, K, Rb, Cs), kovy alkalických zemin (Be, Mg, Ca, Sr, Ba), reakce s vodou, sloučeniny (oxidy, hydroxidy, soli)",
          comingSoon: true,
        },
        {
          slug: "p-block",
          name: "p-prvky (halogeny, chalkogeny, dusík, uhlík)",
          description: "Skupiny 13–17 — nejbohatší chemie",
          aiContext:
            "Halogeny (F, Cl, Br, I), chalkogeny (O, S), dusík a fosfor, uhlík a křemík; oxidy, kyseliny a soli",
          comingSoon: true,
        },
        {
          slug: "d-block",
          name: "d-prvky (přechodné kovy)",
          description: "Železo, měď, zinek a další",
          aiContext:
            "Přechodné kovy (Fe, Cu, Zn, Cr, Mn, Ni, Ag, Au), komplexní sloučeniny, koordinační čísla, barva sloučenin",
          comingSoon: true,
        },
        {
          slug: "acid-base",
          name: "Acidobazické reakce",
          description: "Kyseliny, zásady, pH a neutralizace",
          aiContext:
            "Brønstedova teorie, silné a slabé kyseliny, pH a pOH, disociační konstanty, neutralizace, pufry, hydrolýza solí",
          comingSoon: true,
        },
        {
          slug: "redox",
          name: "Redoxní reakce",
          description: "Oxidace a redukce, elektrolýza, galvanické články",
          aiContext:
            "Oxidační číslo, vyčíslování redoxních rovnic, redoxní potenciál, Nernstova rovnice, galvanické články, elektrolýza",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "organic-chemistry",
      name: "Organická chemie",
      description: "Sloučeniny uhlíku a jejich reakce",
      icon: "🧬",
      children: [
        {
          slug: "organic-intro",
          name: "Úvod do organické chemie",
          description: "Uhlík, vazebnost, izomerie, vzorce",
          aiContext:
            "Uhlíkový skelet, hybridizace uhlíku, typy vzorců (sumární, konstituční, strukturní, geometrický), izomerie",
          comingSoon: true,
        },
        {
          slug: "alkanes",
          name: "Alkany",
          description: "Nasycené uhlovodíky — metan, etan, propan…",
          aiContext:
            "Alkany, homologická řada, názvosloví, izomerie, substituce (radikálová halogenace), spalování, ropa a plyn",
          comingSoon: true,
        },
        {
          slug: "alkenes-and-alkynes",
          name: "Alkeny a alkyny",
          description: "Nenasycené uhlovodíky s dvojnou a trojnou vazbou",
          aiContext:
            "Alkeny a alkyny, adice (hydrogenace, halogenace, hydratace), Markovnikovo pravidlo, polymerace",
          comingSoon: true,
        },
        {
          slug: "aromatics",
          name: "Aromatické uhlovodíky",
          description: "Benzen a jeho deriváty",
          aiContext:
            "Benzen, aromaticita, Hückelovo pravidlo, elektrofilní substituce (nitrace, sulfonace, halogenace, alkylace), toluen, fenol",
          comingSoon: true,
        },
        {
          slug: "halogen-derivatives",
          name: "Halogenderiváty",
          description: "Uhlovodíky s halogenem (C–X)",
          aiContext:
            "Halogenderiváty, nukleofilní substituce (SN1, SN2), eliminace (E1, E2), freony a jejich problematika",
          comingSoon: true,
        },
        {
          slug: "alcohols-and-phenols",
          name: "Alkoholy a fenoly",
          description: "Sloučeniny s OH skupinou",
          aiContext:
            "Alkoholy (metanol, etanol, glykol, glycerol), fenoly, vodíkové můstky, oxidace alkoholů, esterifikace",
          comingSoon: true,
        },
        {
          slug: "carbonyl-compounds",
          name: "Aldehydy a ketony",
          description: "Sloučeniny s C=O skupinou",
          aiContext:
            "Aldehydy a ketony, karbonylová skupina, nukleofilní adice, oxidace aldehydů, Tollensovo a Fehlingovo činidlo",
          comingSoon: true,
        },
        {
          slug: "carboxylic-acids",
          name: "Karboxylové kyseliny",
          description: "Sloučeniny s COOH skupinou",
          aiContext:
            "Karboxylové kyseliny (mravenčí, octová, šťavelová), kyselost, soli, estery, amidy, mýdla",
          comingSoon: true,
        },
        {
          slug: "esters-and-lipids",
          name: "Estery a lipidy",
          description: "Reakce alkoholu s kyselinou; tuky a oleje",
          aiContext:
            "Estery, esterifikace, hydrolýza, lipidy (tuky, oleje, fosfolipidy), mýdla, transesterifikace (biodiesel)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "biochemistry",
      name: "Biochemie",
      description: "Chemie živé hmoty",
      icon: "🧫",
      children: [
        {
          slug: "carbohydrates",
          name: "Sacharidy",
          description: "Cukry, škrob, celulóza",
          aiContext:
            "Monosacharidy (glukóza, fruktóza), disacharidy (sacharóza, laktóza), polysacharidy (škrob, glykogen, celulóza)",
          comingSoon: true,
        },
        {
          slug: "lipids",
          name: "Lipidy",
          description: "Tuky, oleje, fosfolipidy, steroidy",
          aiContext:
            "Tuky a oleje, nasycené vs. nenasycené mastné kyseliny, fosfolipidy (biologické membrány), steroidy (cholesterol, hormony)",
          comingSoon: true,
        },
        {
          slug: "proteins",
          name: "Bílkoviny",
          description: "Aminokyseliny, peptidy, struktura proteinů",
          aiContext:
            "Aminokyseliny, peptidová vazba, primární/sekundární/terciární/kvartérní struktura proteinů, denaturace",
          comingSoon: true,
        },
        {
          slug: "nucleic-acids",
          name: "Nukleové kyseliny",
          description: "DNA a RNA — nositelé genetické informace",
          aiContext:
            "Nukleotidy, báze (A, T, G, C, U), DNA (dvoušroubovice), RNA, replikace, transkripce, translace",
          comingSoon: true,
        },
        {
          slug: "enzymes-and-metabolism",
          name: "Enzymy a metabolismus",
          description: "Biologické katalyzátory a základní metabolické dráhy",
          aiContext:
            "Enzymy, aktivní centrum, mechanismus účinku, glykolýza, Krebsův cyklus, dýchací řetězec, ATP",
          comingSoon: true,
        },
        {
          slug: "vitamins-and-hormones",
          name: "Vitamíny a hormony",
          description: "Regulace a nezbytné mikroživiny",
          aiContext:
            "Vitamíny rozpustné ve vodě (B, C) a v tucích (A, D, E, K), hormony (steroidní, peptidové), inzulín, adrenalin",
          comingSoon: true,
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

export type ChemistryTopicSlug = LeafSlugOf<(typeof chemistryTree.topics)[number]>;
