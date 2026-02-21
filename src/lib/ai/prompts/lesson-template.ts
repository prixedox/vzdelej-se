export function getLessonPrompt(params: {
  topicName: string;
  subject: string;
  difficulty: string;
  aiContext: string;
  variant: number;
}): string {
  const { topicName, subject, difficulty, aiContext, variant } = params;

  return `Vytvoř interaktivní lekci na téma "${topicName}" z předmětu ${subject}.

ÚROVEŇ OBTÍŽNOSTI: ${difficulty}
KONTEXT TÉMATU: ${aiContext}
VARIANTA: ${variant} (použij odlišné příklady a čísla od ostatních variant)

Vrať JSON objekt s touto přesnou strukturou:

{
  "conceptExplanation": {
    "title": "Název lekce",
    "sections": [
      {
        "heading": "Název sekce",
        "body": "Vysvětlení konceptu v markdown s LaTeX vzorci ($...$). Buď jasný a stručný.",
        "examples": [
          {
            "problem": "Příklad zadání",
            "solution": "Řešení příkladu s vysvětlením"
          }
        ]
      }
    ]
  },
  "walkthroughProblem": {
    "problemStatement": "Zadání vzorového příkladu k řešení krok za krokem",
    "steps": [
      {
        "instruction": "Co v tomto kroku děláme",
        "math": "$LaTeX výraz$",
        "explanation": "Vysvětlení proč"
      }
    ],
    "finalAnswer": "Výsledek s jednotkami"
  },
  "practiceProblems": [
    {
      "id": "p1",
      "problemStatement": "Zadání příkladu k procvičení",
      "expectedAnswer": "správná odpověď (text nebo číslo)",
      "acceptableAnswers": ["varianta1", "varianta2"],
      "numericTolerance": 0.01,
      "hints": [
        "Obecná nápověda — jak k problému přistoupit",
        "Konkrétnější nápověda — jaký vzorec nebo postup použít",
        "Velmi konkrétní nápověda — téměř celý postup"
      ],
      "solutionExplanation": "Kompletní řešení s vysvětlením",
      "difficulty": "easy"
    }
  ],
  "summary": {
    "keyTakeaways": [
      "Klíčový poznatek 1",
      "Klíčový poznatek 2",
      "Klíčový poznatek 3"
    ],
    "nextTopicSuggestion": "Doporučené navazující téma"
  }
}

POŽADAVKY:
- Sekce conceptExplanation: 2-4 sekce, každá jasná a vzdělávací
- Walkthrough: 3-6 kroků, jasný postup
- Practice problems: 3-5 příkladů s rostoucí obtížností (easy, medium, hard)
- Každý problém musí mít 3 nápovědy
- acceptableAnswers musí obsahovat expectedAnswer + všechny rozumné varianty (s/bez jednotek, čárka/tečka, zlomek/desetinné číslo)
- Pro obtížnost "${difficulty}":
  ${difficulty === "začátečník" ? "- Jednoduché příklady, základní koncepty, hodně vysvětlování" : ""}
  ${difficulty === "středně pokročilý" ? "- Střední obtížnost, kombinace konceptů, méně vedení" : ""}
  ${difficulty === "pokročilý" ? "- Náročné příklady, aplikace, minimální vedení, komplexní problémy" : ""}

Vrať POUZE validní JSON bez jakéhokoliv jiného textu.`;
}
