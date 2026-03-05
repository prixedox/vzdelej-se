import type { LessonContent } from "@/types/lesson";
import type { Slide } from "@/types/slide";

export function buildSlides(content: LessonContent): Slide[] {
  const slides: Slide[] = [];
  let id = 0;

  // ── Teorie ──
  slides.push({
    id: `s-${id++}`,
    type: "section-title",
    sectionLabel: "Teorie",
    sectionIndex: 0,
    title: content.conceptExplanation.title,
    subtitle: "Vysvětlení konceptu",
    icon: "book",
  });

  content.conceptExplanation.sections.forEach((section, i) => {
    slides.push({
      id: `s-${id++}`,
      type: "concept-section",
      sectionLabel: "Teorie",
      sectionIndex: 0,
      section,
      sectionNumber: i + 1,
      totalSections: content.conceptExplanation.sections.length,
    });

    if (section.knowledgeCheck) {
      slides.push({
        id: `s-${id++}`,
        type: "knowledge-check",
        sectionLabel: "Teorie",
        sectionIndex: 0,
        knowledgeCheck: section.knowledgeCheck,
      });
    }
  });

  // ── Explorations (between theory and walkthrough) ──
  if (content.explorations && content.explorations.length > 0) {
    slides.push({
      id: `s-${id++}`,
      type: "section-title",
      sectionLabel: "Průzkum",
      sectionIndex: 0,
      title: "Prozkoumejte",
      subtitle: "Interaktivní experimenty",
      icon: "lightbulb",
    });

    content.explorations.forEach((exploration) => {
      slides.push({
        id: `s-${id++}`,
        type: "exploration",
        sectionLabel: "Průzkum",
        sectionIndex: 0,
        exploration,
      });
    });
  }

  // ── Ukázka ──
  slides.push({
    id: `s-${id++}`,
    type: "section-title",
    sectionLabel: "Ukázka",
    sectionIndex: 1,
    title: "Vzorový příklad",
    subtitle: "Krok za krokem k řešení",
    icon: "lightbulb",
  });

  slides.push({
    id: `s-${id++}`,
    type: "walkthrough-intro",
    sectionLabel: "Ukázka",
    sectionIndex: 1,
    problemStatement: content.walkthroughProblem.problemStatement,
  });

  content.walkthroughProblem.steps.forEach((step, i) => {
    slides.push({
      id: `s-${id++}`,
      type: "walkthrough-step",
      sectionLabel: "Ukázka",
      sectionIndex: 1,
      step,
      stepNumber: i + 1,
      totalSteps: content.walkthroughProblem.steps.length,
    });
  });

  slides.push({
    id: `s-${id++}`,
    type: "walkthrough-result",
    sectionLabel: "Ukázka",
    sectionIndex: 1,
    finalAnswer: content.walkthroughProblem.finalAnswer,
  });

  // ── Procvičení ──
  slides.push({
    id: `s-${id++}`,
    type: "section-title",
    sectionLabel: "Procvičení",
    sectionIndex: 2,
    title: "Procvičení",
    subtitle: `${content.practiceProblems.length} příkladů k vyřešení`,
    icon: "pen",
  });

  content.practiceProblems.forEach((problem, i) => {
    slides.push({
      id: `s-${id++}`,
      type: "practice-problem",
      sectionLabel: "Procvičení",
      sectionIndex: 2,
      problem,
      problemIndex: i,
      totalProblems: content.practiceProblems.length,
    });
  });

  // ── Shrnutí ──
  slides.push({
    id: `s-${id++}`,
    type: "summary",
    sectionLabel: "Shrnutí",
    sectionIndex: 3,
    keyTakeaways: content.summary.keyTakeaways,
    nextTopicSuggestion: content.summary.nextTopicSuggestion,
  });

  slides.push({
    id: `s-${id++}`,
    type: "complete-prompt",
    sectionLabel: "Shrnutí",
    sectionIndex: 3,
  });

  return slides;
}
