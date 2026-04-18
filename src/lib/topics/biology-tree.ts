import type { TopicTreeData } from "@/types/topic";

export const biologyTree = {
  subject: "biology",
  subjectName: "Biologie",
  icon: "🌿",
  topics: [
    {
      slug: "general-biology",
      name: "Obecná biologie",
      description: "Buňka, dědičnost, metabolismus a základní procesy",
      icon: "🔬",
      children: [
        {
          slug: "origin-of-life",
          name: "Vznik a vývoj života",
          description: "Od neživé hmoty k prvním organismům",
          aiContext:
            "Teorie vzniku života, chemická evoluce, prvobuňka, Milleův-Ureyho pokus, biogeneze, abiogeneze",
          comingSoon: true,
        },
        {
          slug: "cell",
          name: "Buňka",
          description: "Základní jednotka života — prokaryotická a eukaryotická",
          aiContext:
            "Prokaryotická a eukaryotická buňka, buněčné organely (jádro, mitochondrie, ribozomy, endoplazmatické retikulum, Golgiho aparát), buněčná stěna, membrána",
          comingSoon: true,
        },
        {
          slug: "cell-division",
          name: "Dělení buňky",
          description: "Mitóza, meióza a buněčný cyklus",
          aiContext:
            "Buněčný cyklus (G1, S, G2, M), mitóza, meióza, crossing-over, rozdíly mezi mitózou a meiózou, rakovina",
          comingSoon: true,
        },
        {
          slug: "metabolism",
          name: "Metabolismus",
          description: "Látková výměna — anabolismus a katabolismus",
          aiContext:
            "Anabolismus, katabolismus, ATP, enzymy, glykolýza, Krebsův cyklus, oxidativní fosforylace",
          comingSoon: true,
        },
        {
          slug: "photosynthesis-and-respiration",
          name: "Fotosyntéza a dýchání",
          description: "Přeměna energie v rostlinách a živočiších",
          aiContext:
            "Fotosyntéza (světelná a temnotní fáze), chlorofyl, Calvinův cyklus, buněčné dýchání, aerobní vs. anaerobní",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "microbiology",
      name: "Mikrobiologie",
      description: "Bakterie, viry, houby",
      icon: "🦠",
      children: [
        {
          slug: "bacteria",
          name: "Bakterie",
          description: "Jednobuněčné prokaryotické organismy",
          aiContext:
            "Stavba bakterie, tvary (koky, tyčinky, spirochety), Gram-pozitivní/negativní, rozmnožování, užitek a patogenita",
          comingSoon: true,
        },
        {
          slug: "viruses",
          name: "Viry",
          description: "Nebuněční původci chorob",
          aiContext:
            "Stavba viru, kapsida, obalené/neobalené viry, životní cyklus (lytický, lyzogenní), retroviry, bakteriofágy",
          comingSoon: true,
        },
        {
          slug: "fungi",
          name: "Houby",
          description: "Eukaryotické organismy s buněčnou stěnou z chitinu",
          aiContext:
            "Stavba houby, mycelium, plodnice, rozmnožování, kvasinky, plísně, lišejníky (symbióza s řasou)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "botany",
      name: "Botanika",
      description: "Rostliny — stavba, systém, fyziologie",
      icon: "🌱",
      children: [
        {
          slug: "lower-plants",
          name: "Nižší rostliny",
          description: "Řasy, mechorosty, kapraďorosty",
          aiContext:
            "Řasy (zelené, hnědé, červené), mechorosty, kapradiny, přesličky, plavuně, rozmnožovací cyklus",
          comingSoon: true,
        },
        {
          slug: "higher-plants",
          name: "Vyšší rostliny",
          description: "Nahosemenné a krytosemenné rostliny",
          aiContext:
            "Nahosemenné (jehličnany), krytosemenné (dvouděložné, jednoděložné), plody, semena, opylování",
          comingSoon: true,
        },
        {
          slug: "plant-anatomy",
          name: "Stavba rostlin",
          description: "Kořen, stonek, list, květ",
          aiContext:
            "Pletiva (krycí, vodivá, základní), kořen, stonek, list, květ, plod — stavba a funkce",
          comingSoon: true,
        },
        {
          slug: "plant-physiology",
          name: "Fyziologie rostlin",
          description: "Výživa, dýchání, růst rostlin",
          aiContext:
            "Fotosyntéza, dýchání, transpirace, minerální výživa, fytohormony (auxiny, gibereliny), fototropismus, gravitropismus",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "zoology",
      name: "Zoologie",
      description: "Živočichové — od bezobratlých po savce",
      icon: "🐾",
      children: [
        {
          slug: "invertebrates",
          name: "Bezobratlí",
          description: "Žahavci, měkkýši, členovci a další",
          aiContext:
            "Houby, žahavci, ploštěnci, hlísti, měkkýši, kroužkovci, členovci (hmyz, korýši, pavoukovci), ostnokožci",
          comingSoon: true,
        },
        {
          slug: "fish-and-amphibians",
          name: "Ryby a obojživelníci",
          description: "První obratlovci",
          aiContext:
            "Paryby vs. ryby, stavba ryby, dýchání žábrami, obojživelníci (mlok, skokan), proměna (metamorfóza)",
          comingSoon: true,
        },
        {
          slug: "reptiles-and-birds",
          name: "Plazi a ptáci",
          description: "Suchozemští obratlovci s amniotickým vejcem",
          aiContext:
            "Plazi (ještěři, hadi, želvy, krokodýli), ptáci (stavba těla, let, peří, migrace, hnízdění)",
          comingSoon: true,
        },
        {
          slug: "mammals",
          name: "Savci",
          description: "Nejvyvinutější obratlovci",
          aiContext:
            "Stavba savce, srst, mléčné žlázy, rozmnožování, řády (hlodavci, šelmy, sudokopytníci, primáti), evoluce savců",
          comingSoon: true,
        },
        {
          slug: "ethology",
          name: "Etologie",
          description: "Chování živočichů",
          aiContext:
            "Vrozené vs. naučené chování, instinkty, imprinting, teritorialita, rozmnožovací chování, sociální struktury",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "human-biology",
      name: "Biologie člověka",
      description: "Anatomie a fyziologie lidského těla",
      icon: "🫀",
      children: [
        {
          slug: "digestive-system",
          name: "Trávicí soustava",
          description: "Zpracování potravy od úst po konečník",
          aiContext:
            "Ústa, jícen, žaludek, tenké a tlusté střevo, játra, slinivka, enzymy, peristaltika, vstřebávání živin",
          comingSoon: true,
        },
        {
          slug: "respiratory-system",
          name: "Dýchací soustava",
          description: "Výměna plynů — O₂ a CO₂",
          aiContext:
            "Dutina nosní, hrtan, průdušnice, průdušky, plíce, alveoly, difuze plynů, transport kyslíku hemoglobinem",
          comingSoon: true,
        },
        {
          slug: "circulatory-system",
          name: "Oběhová soustava",
          description: "Srdce, krev, cévy",
          aiContext:
            "Srdce (síně, komory, chlopně), tepny, žíly, vlásečnice, krevní oběh (malý, velký), krev (erytrocyty, leukocyty, trombocyty), krevní skupiny",
          comingSoon: true,
        },
        {
          slug: "excretory-system",
          name: "Vylučovací soustava",
          description: "Ledviny a odvod odpadních látek",
          aiContext:
            "Ledviny, nefron, glomerulární filtrace, močovody, močový měchýř, močová trubice, homeostáza vody a solí",
          comingSoon: true,
        },
        {
          slug: "nervous-system",
          name: "Nervová soustava",
          description: "Mozek, mícha a řízení těla",
          aiContext:
            "Neuron, synapse, akční potenciál, centrální (mozek, mícha) a periferní nervová soustava, smyslové orgány",
          comingSoon: true,
        },
        {
          slug: "immune-system",
          name: "Imunitní systém",
          description: "Obrana organismu před patogeny",
          aiContext:
            "Specifická a nespecifická imunita, protilátky, T-lymfocyty, B-lymfocyty, očkování, alergie, autoimunitní onemocnění",
          comingSoon: true,
        },
        {
          slug: "reproductive-system",
          name: "Rozmnožovací soustava",
          description: "Rozmnožování a vývoj člověka",
          aiContext:
            "Mužská a ženská pohlavní soustava, menstruační cyklus, oplození, těhotenství, porod, vývoj jedince",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "genetics-and-evolution",
      name: "Genetika a evoluce",
      description: "Dědičnost a vývoj druhů",
      icon: "🧬",
      children: [
        {
          slug: "genetics",
          name: "Genetika",
          description: "Dědičnost vlastností",
          aiContext:
            "Mendelovy zákony, alely (dominantní, recesivní), genotyp, fenotyp, kódování bílkovin, mutace, dědičné choroby",
          comingSoon: true,
        },
        {
          slug: "evolution",
          name: "Evoluce",
          description: "Vývoj druhů — Darwin a dál",
          aiContext:
            "Darwinova teorie, přirozený výběr, druhy, fylogeneze, adaptace, pohlavní výběr, koevoluce, fosilní záznam",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "ecology-and-environment",
      name: "Ekologie a životní prostředí",
      description: "Vztahy organismů a ochrana přírody",
      icon: "🌍",
      children: [
        {
          slug: "ecology",
          name: "Ekologie",
          description: "Vztahy mezi organismy a prostředím",
          aiContext:
            "Biotop, populace, společenstvo, ekosystém, biom, potravní řetězec, koloběh látek (uhlík, dusík), symbióza, parazitismus",
          comingSoon: true,
        },
        {
          slug: "conservation",
          name: "Ochrana přírody",
          description: "Ohrožené druhy a udržitelnost",
          aiContext:
            "Biodiverzita, ohrožené druhy, chráněné oblasti, národní parky, změna klimatu, znečištění, odlesňování, udržitelný rozvoj",
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

export type BiologyTopicSlug = LeafSlugOf<(typeof biologyTree.topics)[number]>;
