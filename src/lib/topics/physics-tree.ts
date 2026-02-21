import type { TopicTreeData } from "@/types/topic";

export const physicsTree: TopicTreeData = {
  subject: "physics",
  subjectName: "Fyzika",
  icon: "⚛️",
  topics: [
    {
      slug: "mechanika",
      name: "Mechanika",
      description: "Pohyb, síly a energie",
      icon: "🔧",
      children: [
        {
          slug: "kinematika",
          name: "Kinematika",
          description: "Popis pohybu těles",
          aiContext:
            "Rovnoměrný a nerovnoměrný pohyb, dráha, rychlost, zrychlení, volný pád, vrhy (svislý, vodorovný, šikmý), grafy pohybu",
        },
        {
          slug: "dynamika",
          name: "Dynamika",
          description: "Newtonovy zákony a síly",
          aiContext:
            "Newtonovy pohybové zákony, síla, hmotnost, tíhová síla, třecí síla, dostředivá síla, pohyb po nakloněné rovině",
        },
        {
          slug: "energie-a-prace",
          name: "Energie a práce",
          description: "Mechanická energie, práce, výkon",
          aiContext:
            "Kinetická energie, potenciální energie, práce, výkon, zákon zachování mechanické energie, účinnost",
        },
        {
          slug: "hybnost-a-impulz",
          name: "Hybnost a impulz",
          description: "Zákon zachování hybnosti",
          aiContext:
            "Hybnost, impulz síly, zákon zachování hybnosti, srážky (dokonale pružné, nepružné), reaktivní pohyb",
        },
        {
          slug: "gravitace",
          name: "Gravitace",
          description: "Gravitační zákon a pohyb planet",
          aiContext:
            "Newtonův gravitační zákon, gravitační pole, intenzita gravitačního pole, Keplerovy zákony, kosmické rychlosti",
        },
      ],
    },
    {
      slug: "termodynamika",
      name: "Termodynamika",
      description: "Teplo, teplota a termodynamické děje",
      icon: "🌡️",
      children: [
        {
          slug: "teplota-a-teplo",
          name: "Teplota a teplo",
          description: "Základy termiky",
          aiContext:
            "Teplota, teplotní stupnice, teplo, měrná tepelná kapacita, kalorimetrická rovnice, skupenské přeměny, skupenské teplo",
        },
        {
          slug: "idealni-plyn",
          name: "Ideální plyn",
          description: "Stavová rovnice a děje v plynech",
          aiContext:
            "Stavová rovnice ideálního plynu, izotermický, izobarický, izochorický a adiabatický děj, p-V diagramy",
        },
        {
          slug: "zakony-termodynamiky",
          name: "Zákony termodynamiky",
          description: "Hlavní věty termodynamiky",
          aiContext:
            "První zákon termodynamiky, vnitřní energie, práce plynu, druhý zákon termodynamiky, entropie, tepelné stroje, účinnost",
        },
      ],
    },
    {
      slug: "elektrina-a-magnetismus",
      name: "Elektřina a magnetismus",
      description: "Elektrické pole, obvody, magnetismus",
      icon: "⚡",
      children: [
        {
          slug: "elektricke-pole",
          name: "Elektrické pole",
          description: "Coulombův zákon, potenciál",
          aiContext:
            "Elektrický náboj, Coulombův zákon, intenzita elektrického pole, elektrický potenciál a napětí, kondenzátory, kapacita",
        },
        {
          slug: "elektricke-obvody",
          name: "Elektrické obvody",
          description: "Ohmův zákon, sériové a paralelní zapojení",
          aiContext:
            "Elektrický proud, Ohmův zákon, odpor, rezistivita, sériové a paralelní zapojení, Kirchhoffovy zákony, elektrická práce a výkon",
        },
        {
          slug: "magneticke-pole",
          name: "Magnetické pole",
          description: "Magnetismus a elektromagnetická indukce",
          aiContext:
            "Magnetické pole vodiče s proudem, magnetická indukce, síla na vodič v magnetickém poli, elektromagnetická indukce, Faradayův zákon",
        },
      ],
    },
    {
      slug: "vlneni-a-optika",
      name: "Vlnění a optika",
      description: "Mechanické vlnění, zvuk, světlo",
      icon: "🌊",
      children: [
        {
          slug: "mechanicke-vlneni",
          name: "Mechanické vlnění a zvuk",
          description: "Vlny, interference, zvuk",
          aiContext:
            "Vlnění příčné a podélné, vlnová délka, frekvence, rychlost šíření, interference, stojaté vlnění, zvuk, Dopplerův jev",
        },
        {
          slug: "optika",
          name: "Optika",
          description: "Odraz, lom, čočky a zrcadla",
          aiContext:
            "Zákon odrazu, zákon lomu (Snellův), úplný odraz, rovinné a kulové zrcadlo, tenká čočka, zobrazovací rovnice, optické přístroje",
        },
      ],
    },
    {
      slug: "moderni-fyzika",
      name: "Moderní fyzika",
      description: "Kvantová fyzika a jaderná fyzika",
      icon: "🔬",
      children: [
        {
          slug: "kvantova-fyzika",
          name: "Kvantová a jaderná fyzika",
          description: "Fotoelektrický jev, radioaktivita",
          aiContext:
            "Fotoelektrický jev, foton, vlnově-částicový dualismus, de Broglieho vlnová délka, struktura atomu, radioaktivita, jaderné reakce, poločas přeměny",
        },
      ],
    },
  ],
};
