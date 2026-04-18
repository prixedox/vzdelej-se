import type { TopicTreeData } from "@/types/topic";

export const historyTree = {
  subject: "history",
  subjectName: "Dějepis",
  icon: "📜",
  topics: [
    {
      slug: "antiquity",
      name: "Pravěk a starověk",
      description: "Od prvních lidí po Řím a Řecko",
      icon: "🏛️",
      children: [
        {
          slug: "prehistory",
          name: "Pravěk",
          description: "Paleolit, neolit, doba bronzová a železná",
          aiContext:
            "Vývoj člověka, paleolit, mezolit, neolit (zemědělská revoluce), doba bronzová, doba železná, pravěká umělecká díla",
          comingSoon: true,
        },
        {
          slug: "mesopotamia-and-egypt",
          name: "Mezopotámie a Egypt",
          description: "První civilizace",
          aiContext:
            "Sumerové, Babylon, Chammurapi, Asýrie, starověký Egypt (Stará, Střední, Nová říše), pyramidy, hieroglyfy, faraoni",
          comingSoon: true,
        },
        {
          slug: "ancient-greece",
          name: "Starověké Řecko",
          description: "Polis, demokracie, filozofie",
          aiContext:
            "Mykény, archaické Řecko, Athény a Sparta, řecko-perské války, Peloponéská válka, Alexandr Veliký, helenismus, filozofie, umění",
          comingSoon: true,
        },
        {
          slug: "ancient-rome",
          name: "Římská říše",
          description: "Od republiky k impériu",
          aiContext:
            "Založení Říma, království, republika, Caesar, Augustus, principát, dominát, pax Romana, pád Západořímské říše, křesťanství",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "middle-ages",
      name: "Středověk",
      description: "Od pádu Říma po reformaci",
      icon: "⚔️",
      children: [
        {
          slug: "early-middle-ages",
          name: "Raný středověk",
          description: "Stěhování národů, Karel Veliký, Byzanc",
          aiContext:
            "Stěhování národů, Frankové, Karel Veliký, Byzantská říše, Arabská říše, islám, Vikingové, feudalismus",
          comingSoon: true,
        },
        {
          slug: "bohemian-kingdom",
          name: "České země ve středověku",
          description: "Přemyslovci, Lucemburkové, Jagellonci",
          aiContext:
            "Sámova říše, Velká Morava, Přemyslovci (Václav I., II., III.), Karel IV., husitství, Jiří z Poděbrad, Jagellonci",
          comingSoon: true,
        },
        {
          slug: "high-middle-ages",
          name: "Vrcholný středověk",
          description: "Křížové výpravy, gotika, města",
          aiContext:
            "Křížové výpravy, vznik měst, cechy, gotické umění, scholastika, univerzity, Svatá říše římská, papežství",
          comingSoon: true,
        },
        {
          slug: "late-middle-ages",
          name: "Pozdní středověk",
          description: "Stoletá válka, morové epidemie, reformace",
          aiContext:
            "Stoletá válka, černá smrt, husitské války, Johanka z Arku, konec Byzance, objev tiskařského lisu (Gutenberg)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "early-modern",
      name: "Raný novověk",
      description: "Objevy, reformace, osvícenství, revoluce",
      icon: "⛵",
      children: [
        {
          slug: "discoveries-and-renaissance",
          name: "Objevy a renesance",
          description: "Kolumbus, Leonardo, Machiavelli",
          aiContext:
            "Zámořské objevy, Kolumbus, Magellan, konkvistadoři, renesance v Itálii, humanismus, Leonardo da Vinci, Michelangelo, Machiavelli",
          comingSoon: true,
        },
        {
          slug: "reformation",
          name: "Reformace",
          description: "Luther, Kalvín, třicetiletá válka",
          aiContext:
            "Martin Luther, 95 tezí, protestantismus, Jan Kalvín, protireformace, Tridentský koncil, třicetiletá válka, bitva na Bílé hoře",
          comingSoon: true,
        },
        {
          slug: "habsburg-monarchy",
          name: "Habsburská monarchie",
          description: "Od Rudolfa II. po Marii Terezii",
          aiContext:
            "Rudolf II., Bílá hora, pobělohorské období, Marie Terezie, Josef II., osvícenské reformy, zrušení nevolnictví, toleranční patent",
          comingSoon: true,
        },
        {
          slug: "enlightenment-and-revolutions",
          name: "Osvícenství a revoluce",
          description: "Voltaire, americká a francouzská revoluce, Napoleon",
          aiContext:
            "Osvícenství, Voltaire, Rousseau, Americká revoluce, Velká francouzská revoluce, deklarace práv, Napoleon, napoleonské války, Vídeňský kongres",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "nineteenth-century",
      name: "19. století",
      description: "Národní obrození, průmyslová revoluce, imperialismus",
      icon: "🏭",
      children: [
        {
          slug: "industrial-revolution",
          name: "Průmyslová revoluce",
          description: "Parní stroj, železnice, sociální otřesy",
          aiContext:
            "Průmyslová revoluce (první, druhá), parní stroj, továrny, proletariát, urbanizace, odbory, socialismus, Marx",
          comingSoon: true,
        },
        {
          slug: "czech-national-revival",
          name: "Národní obrození",
          description: "Jungmann, Palacký, čeští buditelé",
          aiContext:
            "Josef Jungmann, František Palacký, obrozenci, rok 1848 v českých zemích, vznik moderního českého národa, Riegr",
          comingSoon: true,
        },
        {
          slug: "imperialism-and-unification",
          name: "Imperialismus a sjednocování",
          description: "Německo, Itálie, koloniální velmoci",
          aiContext:
            "Sjednocení Itálie (Garibaldi), sjednocení Německa (Bismarck), koloniální dělení Afriky a Asie, viktoriánská Británie, Rakousko-Uhersko",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "twentieth-century",
      name: "20. století",
      description: "Světové války, komunismus, studená válka",
      icon: "🌐",
      children: [
        {
          slug: "world-war-i",
          name: "První světová válka",
          description: "1914–1918",
          aiContext:
            "Příčiny první světové války, atentát v Sarajevu, bitvy (Marna, Verdun, Somma), Česká legie, Rusko v revoluci, Wilson, versailleský mír",
          comingSoon: true,
        },
        {
          slug: "interwar-period",
          name: "Meziválečné období",
          description: "První republika, Masaryk, nástup fašismu",
          aiContext:
            "Vznik Československa, T. G. Masaryk, Pittsburská dohoda, první republika, hospodářská krize 1929, nástup fašismu, Mussolini, Hitler",
          comingSoon: true,
        },
        {
          slug: "world-war-ii",
          name: "Druhá světová válka",
          description: "1939–1945, holocaust, osvobození",
          aiContext:
            "Mnichovská dohoda, okupace Československa, protektorát, atentát na Heydricha, holocaust, Stalingrad, Pearl Harbor, Hirošima, osvobození",
          comingSoon: true,
        },
        {
          slug: "cold-war",
          name: "Studená válka",
          description: "USA vs. SSSR, 1945–1991",
          aiContext:
            "Železná opona, Marshallův plán, NATO a Varšavská smlouva, korejská a vietnamská válka, kubánská krize, závody ve zbrojení, Berlínská zeď",
          comingSoon: true,
        },
        {
          slug: "communist-czechoslovakia",
          name: "Komunistické Československo",
          description: "1948–1989",
          aiContext:
            "Únor 1948, politické procesy 50. let, Pražské jaro 1968, normalizace, Charta 77, Sametová revoluce 1989, rozpad Československa",
          comingSoon: true,
        },
        {
          slug: "post-1989",
          name: "Svět po roce 1989",
          description: "Globalizace, 11. září, EU, současnost",
          aiContext:
            "Pád komunismu, rozpad Sovětského svazu, Evropská unie, rozšíření NATO, 11. září 2001, digitální revoluce, současné konflikty",
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

export type HistoryTopicSlug = LeafSlugOf<(typeof historyTree.topics)[number]>;
