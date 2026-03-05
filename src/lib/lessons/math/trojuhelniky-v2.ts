import type { LessonV2 } from "@/types/lesson-v2";

export const trojuhelnikyV2Beginner: LessonV2 = {
  title: "Trojúhelníky",
  steps: [
    {
      type: "multiple-choice",
      question: "Pravoúhlý trojúhelník má odvěsny $3$ a $4$. Jak dlouhá je přepona?",
      choices: [
        { label: "$5$", isCorrect: true, feedback: "$3^2 + 4^2 = 9 + 16 = 25 = 5^2$ ✓" },
        { label: "$7$", isCorrect: false, feedback: "$3 + 4 = 7$, ale přepona se nepočítá sčítáním." },
        { label: "$\\sqrt{7}$", isCorrect: false, feedback: "Pythagorova věta: $c^2 = a^2 + b^2$." },
      ],
      explanation: "Pythagorova věta: $c = \\sqrt{a^2 + b^2} = \\sqrt{9 + 16} = 5$. Trojka $(3, 4, 5)$ je slavná pythagorejská trojice.",
    },
    {
      type: "explain",
      body: "**Pythagorova věta** (pro pravoúhlý trojúhelník):\n\n$$c^2 = a^2 + b^2$$\n\nkde $c$ je přepona (nejdelší strana, naproti pravému úhlu) a $a$, $b$ jsou odvěsny.",
      callout: "Pythagorova věta",
    },
    {
      type: "text-input",
      question: "Trojúhelník má odvěsny $5$ a $12$. Jak dlouhá je přepona?",
      expectedAnswer: "13",
      explanation: "$c = \\sqrt{25 + 144} = \\sqrt{169} = 13$.",
      hints: ["$c^2 = 5^2 + 12^2 = 25 + 144$."],
    },
    {
      type: "text-input",
      question: "Přepona je $10$ a jedna odvěsna $6$. Jak dlouhá je druhá odvěsna?",
      expectedAnswer: "8",
      explanation: "$b = \\sqrt{c^2 - a^2} = \\sqrt{100 - 36} = \\sqrt{64} = 8$.",
      hints: ["$b^2 = c^2 - a^2$."],
    },
    {
      type: "explain",
      body: "**Druhy trojúhelníků** podle stran:\n- **Rovnostranný**: $a = b = c$, všechny úhly $60°$\n- **Rovnoramenný**: dvě strany stejné\n- **Obecný**: všechny strany různé\n\nPodle úhlů: ostrý (vše $< 90°$), pravoúhlý ($= 90°$), tupý ($> 90°$).",
    },
    {
      type: "multiple-choice",
      question: "Trojúhelník se stranami $5$, $5$, $8$ je:",
      choices: [
        { label: "Rovnostranný", isCorrect: false, feedback: "Rovnostranný má všechny strany stejné." },
        { label: "Rovnoramenný", isCorrect: true, feedback: "Ano! Dvě strany ($a = b = 5$) jsou shodné." },
        { label: "Pravoúhlý", isCorrect: false, feedback: "$5^2 + 5^2 = 50 \\neq 64 = 8^2$." },
      ],
      explanation: "Dvě stejné strany = rovnoramenný trojúhelník.",
    },
    {
      type: "explain",
      body: "**Obsah trojúhelníku**:\n\n$$S = \\frac{1}{2} \\cdot z \\cdot v_z$$\n\nkde $z$ je základna a $v_z$ je výška na tuto základnu.\n\nPro trojúhelník s danými stranami a úhlem: $S = \\frac{1}{2}ab \\sin \\gamma$.",
      callout: "Obsah",
    },
    {
      type: "text-input",
      question: "Trojúhelník má základnu $10$ cm a výšku $6$ cm. Jaký je jeho obsah (v cm$^2$)?",
      expectedAnswer: "30",
      acceptableAnswers: ["30 cm2", "30 cm^2"],
      explanation: "$S = \\frac{1}{2} \\cdot 10 \\cdot 6 = 30\\,\\text{cm}^2$.",
    },
    {
      type: "explain",
      body: "**Součet vnitřních úhlů** trojúhelníku je vždy $180°$:\n\n$$\\alpha + \\beta + \\gamma = 180°$$",
      callout: "Pravidlo",
    },
    {
      type: "text-input",
      question: "Trojúhelník má úhly $45°$ a $60°$. Jak velký je třetí úhel?",
      expectedAnswer: "75",
      acceptableAnswers: ["75°", "75 stupnu"],
      explanation: "$\\gamma = 180° - 45° - 60° = 75°$.",
    },
    {
      type: "explain",
      body: "**Sinová věta** (pro libovolný trojúhelník):\n\n$$\\frac{a}{\\sin \\alpha} = \\frac{b}{\\sin \\beta} = \\frac{c}{\\sin \\gamma}$$\n\nPoužíváme, když známe stranu a protilehlý úhel.",
    },
    {
      type: "explain",
      body: "**Kosinová věta** (zobecnění Pythagorovy):\n\n$$c^2 = a^2 + b^2 - 2ab\\cos \\gamma$$\n\nPro $\\gamma = 90°$: $\\cos 90° = 0$ a dostaneme Pythagorovu větu.",
    },
    {
      type: "multiple-choice",
      question: "Kdy použijete kosinovou větu místo sinové?",
      choices: [
        { label: "Když znám 2 strany a úhel mezi nimi", isCorrect: true, feedback: "Správně! Kosinová věta pracuje se sevřeným úhlem (SUS)." },
        { label: "Když znám stranu a 2 úhly", isCorrect: false, feedback: "To je případ pro sinovou větu." },
        { label: "Vždy — kosinová je lepší", isCorrect: false, feedback: "Obě mají své místo." },
      ],
      explanation: "Kosinová: SUS (strana-úhel-strana) nebo SSS. Sinová: strana + protilehlý úhel.",
    },
    {
      type: "reveal",
      question: "Kdo byl Pythagoras a proč je jeho věta tak slavná?",
      revealedContent: "Pythagoras z Samu (6. stol. př. n. l.) vedl matematicko-filozofickou školu. Věta $a^2 + b^2 = c^2$ byla pravděpodobně známa i dříve (Babyloňané), ale pythagorejci ji jako první dokázali.\n\nExistuje přes 400 různých důkazů! Věta je základem trigonometrie, navigace i GPS.",
    },
    {
      type: "text-input",
      question: "Žebřík dlouhý $5$ m je opřený o zeď. Pata žebříku je $3$ m od zdi. Jak vysoko sahá žebřík?",
      expectedAnswer: "4",
      acceptableAnswers: ["4 m", "4m"],
      explanation: "Pravoúhlý trojúhelník: $v = \\sqrt{5^2 - 3^2} = \\sqrt{25 - 9} = \\sqrt{16} = 4\\,\\text{m}$.",
      hints: ["Přepona = žebřík, odvěsna = vzdálenost od zdi."],
    },
  ],
  summary: {
    keyTakeaways: [
      "Pythagorova věta: $c^2 = a^2 + b^2$ (pravoúhlý trojúhelník).",
      "Součet vnitřních úhlů: $\\alpha + \\beta + \\gamma = 180°$.",
      "Obsah: $S = \\frac{1}{2} \\cdot z \\cdot v_z$.",
      "Sinová věta: $\\frac{a}{\\sin\\alpha} = \\frac{b}{\\sin\\beta} = \\frac{c}{\\sin\\gamma}$.",
      "Kosinová věta: $c^2 = a^2 + b^2 - 2ab\\cos\\gamma$.",
    ],
  },
  nextTopicSuggestion: "kruznice-a-kruhy",
};
