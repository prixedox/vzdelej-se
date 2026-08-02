import type { StageChapter } from "@/types/chapter";
import type { StageLesson } from "@/types/stage";

const lesson: StageLesson = {
  title: "Rychlost jako sklon",
  stage: {
    type: "motion-timeline",
    initial: { t: 2, h: 1.5, v0: 0, a: 2 },
    readouts: ["position", "instantVelocity", "secantSlope", "gapToInstant"],
  },
  beats: [
    {
      kind: "observe",
      prompt:
        "Modrá křivka ukazuje, jakou dráhu auto urazilo za daný čas. Oranžová úsečka spojuje dva okamžiky — zelený a oranžový bod.",
    },
    {
      kind: "observe",
      prompt:
        "Posouvej zelený bod pomocí $t$. Všimni si, že čím dál vpravo jsi, tím strmější ta oranžová úsečka je — auto zrychluje.",
    },
    {
      kind: "manipulate",
      prompt:
        "Teď zmenšuj $h$, tedy vzdálenost mezi oběma body. Sleduj obě čísla pod obrázkem a zastav, až budou prakticky stejná.",
      goal: { readout: "gapToInstant", target: 0, within: 0.06 },
      onReached:
        "Přesně tak. Když se body k sobě přiblíží, sklon úsečky přestane být průměrem za nějaký úsek a stane se rychlostí v jediném okamžiku.",
      nudge: "Táhni posuvník $h$ doleva, k co nejmenší hodnotě.",
    },
  ],
  naming: {
    observation:
      "Průměrná rychlost je sklon úsečky mezi dvěma okamžiky. Když ty okamžiky splynou, zbude sklon v jediném bodě — a to je okamžitá rychlost.",
    formula: "v = \\frac{\\Delta s}{\\Delta t}",
    mapping:
      "$\\Delta s$ je svislý rozdíl mezi body, $\\Delta t$ vodorovný — přesně ty dvě vzdálenosti, které jsi zmenšoval. Rychlost je jejich poměr, tedy sklon křivky dráhy.",
  },
  apply: [
    {
      type: "multiple-choice",
      question:
        "Na grafu dráhy je úsek, kde je křivka vodorovná. Co v tu chvíli auto dělá?",
      choices: [
        {
          label: "Stojí",
          isCorrect: true,
          feedback: "Ano — nulový sklon znamená nulovou rychlost.",
        },
        {
          label: "Jede rovnoměrně",
          isCorrect: false,
          feedback: "Rovnoměrná jízda by byla šikmá přímka, ne vodorovná.",
        },
        {
          label: "Zrychluje",
          isCorrect: false,
          feedback: "Zrychlování by křivku ohýbalo vzhůru, sklon by rostl.",
        },
      ],
      explanation:
        "Vodorovná dráha znamená, že se dráha s časem nemění — sklon je nula, tedy rychlost je nula.",
    },
  ],
  summary: {
    keyTakeaways: [
      "Rychlost je sklon grafu dráhy, ne hodnota na něm.",
      "Zmenšením časového úseku přejde průměrná rychlost v okamžitou.",
    ],
  },
};

export const chapter: StageChapter = {
  slug: "velocity-as-slope",
  topicSlug: "kinematics",
  order: 3,
  format: "stage",
  title: "Rychlost jako sklon",
  lesson,
};
