import type { TopicTreeData } from "@/types/topic";

export const geographyTree = {
  subject: "geography",
  subjectName: "Zeměpis",
  icon: "🌍",
  topics: [
    {
      slug: "physical-geography",
      name: "Fyzická geografie",
      description: "Země, atmosféra, hydrosféra, litosféra",
      icon: "🏔️",
      children: [
        {
          slug: "planet-earth",
          name: "Planeta Země",
          description: "Tvar, rozměry, pohyby a časová pásma",
          aiContext:
            "Tvar a rozměry Země, rotace, oběh kolem Slunce, roční doby, časová pásma, zeměpisné souřadnice, rovník, obratníky",
          comingSoon: true,
        },
        {
          slug: "atmosphere",
          name: "Atmosféra",
          description: "Vzduch, počasí, podnebí",
          aiContext:
            "Složení atmosféry, vrstvy atmosféry, tlak, teplota, vítr, oblaka, srážky, podnebí vs. počasí, skleníkový efekt",
          comingSoon: true,
        },
        {
          slug: "hydrosphere",
          name: "Hydrosféra",
          description: "Oceány, řeky, jezera, ledovce",
          aiContext:
            "Oceány, moře, mořské proudy, koloběh vody, řeky, jezera, podzemní vody, ledovce, vodstvo ČR",
          comingSoon: true,
        },
        {
          slug: "lithosphere",
          name: "Litosféra",
          description: "Desková tektonika, sopky, zemětřesení",
          aiContext:
            "Stavba Země, desková tektonika, vulkanismus, zemětřesení, horotvorné pochody, zvětrávání, eroze, typy hornin",
          comingSoon: true,
        },
        {
          slug: "climate-zones",
          name: "Podnebné pásy",
          description: "Tropický, mírný, polární pás",
          aiContext:
            "Podnebné pásy (tropický, subtropický, mírný, subpolární, polární), Köppenova klasifikace, vegetační pásma, biomy",
          comingSoon: true,
        },
        {
          slug: "biosphere-and-soils",
          name: "Biosféra a půdy",
          description: "Živé prostředí a půdní pokryv",
          aiContext:
            "Biosféra, ekosystémy, vegetační pásma, biomy (tajga, step, savana, deštný prales), pedosféra, typy půd, úrodnost",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "human-geography",
      name: "Socioekonomická geografie",
      description: "Obyvatelstvo, hospodářství, doprava",
      icon: "👥",
      children: [
        {
          slug: "population-and-settlement",
          name: "Obyvatelstvo a sídla",
          description: "Demografie, migrace, města",
          aiContext:
            "Hustota zalidnění, demografický vývoj, porodnost, úmrtnost, migrace, urbanizace, megalopole, aglomerace, typy sídel",
          comingSoon: true,
        },
        {
          slug: "economic-geography",
          name: "Hospodářská geografie",
          description: "Zemědělství, průmysl, služby",
          aiContext:
            "Primární (zemědělství, těžba), sekundární (průmysl), terciární (služby), kvartérní (vzdělání, výzkum) sektor, HDP, světové velmoci",
          comingSoon: true,
        },
        {
          slug: "transport-and-services",
          name: "Doprava a služby",
          description: "Doprava, cestovní ruch, telekomunikace",
          aiContext:
            "Druhy dopravy (silniční, železniční, letecká, námořní), dopravní uzly, cestovní ruch, telekomunikace, informační společnost",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "regional-geography",
      name: "Regionální geografie",
      description: "ČR, kontinenty, světové regiony",
      icon: "🗺️",
      children: [
        {
          slug: "czech-republic",
          name: "Česká republika",
          description: "Poloha, kraje, hospodářství, obyvatelstvo",
          aiContext:
            "Poloha ČR, geomorfologické celky, klima ČR, řeky, kraje, obyvatelstvo, města, hospodářství, národní parky",
          comingSoon: true,
        },
        {
          slug: "europe",
          name: "Evropa",
          description: "Fyzická a politická mapa Evropy",
          aiContext:
            "Geografie Evropy, státy EU, eurozóna, Schengen, významné země (Německo, Francie, Itálie, UK), Balkán, Skandinávie, východní Evropa",
          comingSoon: true,
        },
        {
          slug: "asia",
          name: "Asie",
          description: "Nejlidnatější a nejrozlehlejší kontinent",
          aiContext:
            "Geografie Asie, Himálaj, Čína, Indie, Japonsko, JV Asie, Blízký východ, Rusko (asijská část), monzunové podnebí",
          comingSoon: true,
        },
        {
          slug: "africa",
          name: "Afrika",
          description: "Nejchudší kontinent a jeho rozmanitost",
          aiContext:
            "Geografie Afriky, Sahara, Kongo, Nil, africká savana, státy (Egypt, JAR, Nigérie), kolonialismus, současné problémy",
          comingSoon: true,
        },
        {
          slug: "americas",
          name: "Amerika",
          description: "Severní a Jižní Amerika",
          aiContext:
            "Geografie Severní a Jižní Ameriky, USA, Kanada, Mexiko, Brazílie, Andy, Amazonie, latinskoamerické země",
          comingSoon: true,
        },
        {
          slug: "australia-and-oceania",
          name: "Austrálie a Oceánie",
          description: "Nejmenší kontinent a tichomořské ostrovy",
          aiContext:
            "Austrálie (geografie, fauna, města), Oceánie (Polynésie, Mikronésie, Melanésie), Nový Zéland, Velký bariérový útes",
          comingSoon: true,
        },
        {
          slug: "polar-regions",
          name: "Polární oblasti",
          description: "Arktida a Antarktida",
          aiContext:
            "Arktida, Antarktida, polární klima, fauna (lední medvěd, tučňák), mezinárodní dohody, klimatické změny v polárních oblastech",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "maps-and-modern-issues",
      name: "Mapy a současné otázky",
      description: "Kartografie, globalizace, životní prostředí",
      icon: "📌",
      children: [
        {
          slug: "cartography",
          name: "Kartografie a mapy",
          description: "Zobrazení povrchu Země",
          aiContext:
            "Mapy, měřítko, kartografická zobrazení, legenda, topografické a tematické mapy, kartografické generalizace",
          comingSoon: true,
        },
        {
          slug: "gis-and-navigation",
          name: "GIS a navigace",
          description: "Geografické informační systémy a GPS",
          aiContext:
            "GIS, GPS, satelitní snímky, dálkový průzkum Země, digitální mapy, navigační systémy (Galileo, GLONASS)",
          comingSoon: true,
        },
        {
          slug: "globalization",
          name: "Globalizace",
          description: "Propojený svět — ekonomika, kultura, migrace",
          aiContext:
            "Globalizace, mezinárodní obchod, nadnárodní firmy, kulturní globalizace, globální problémy (chudoba, nerovnost), antiglobalizace",
          comingSoon: true,
        },
        {
          slug: "environmental-issues",
          name: "Životní prostředí",
          description: "Klimatická změna, znečištění, ochrana přírody",
          aiContext:
            "Globální oteplování, skleníkový efekt, znečištění (ovzduší, voda, půda), odlesňování, ztráta biodiverzity, udržitelný rozvoj, OZE",
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

export type GeographyTopicSlug = LeafSlugOf<(typeof geographyTree.topics)[number]>;
