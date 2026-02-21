"use client";

import type { Slide } from "@/types/slide";
import { BookOpen, Lightbulb, PenTool, CheckSquare } from "lucide-react";

const sectionColors: Record<string, string> = {
  Teorie: "bg-blue-500",
  Ukázka: "bg-amber-500",
  Procvičení: "bg-green-500",
  Shrnutí: "bg-purple-500",
};

const sectionIcons: Record<string, React.ReactNode> = {
  Teorie: <BookOpen className="h-3.5 w-3.5" />,
  Ukázka: <Lightbulb className="h-3.5 w-3.5" />,
  Procvičení: <PenTool className="h-3.5 w-3.5" />,
  Shrnutí: <CheckSquare className="h-3.5 w-3.5" />,
};

export function LessonProgressBar({
  currentIndex,
  slides,
}: {
  currentIndex: number;
  slides: Slide[];
}) {
  const percent = ((currentIndex + 1) / slides.length) * 100;
  const currentSection = slides[currentIndex].sectionLabel;
  const color = sectionColors[currentSection] || "bg-primary";

  return (
    <div className="sticky top-0 z-10 bg-background/95 backdrop-blur pb-3 pt-4 px-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground mb-1.5">
        <span className="flex items-center gap-1.5 font-medium">
          {sectionIcons[currentSection]}
          {currentSection}
        </span>
        <span>
          {currentIndex + 1} / {slides.length}
        </span>
      </div>
      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-300 ease-out ${color}`}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
