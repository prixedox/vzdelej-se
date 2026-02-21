"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathText } from "./math-display";
import { VisualBlock } from "./visuals/visual-block";
import type { ConceptExplanation } from "@/types/lesson";
import { BookOpen } from "lucide-react";

export function ConceptBlock({
  concept,
}: {
  concept: ConceptExplanation;
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3 mb-2">
        <div className="flex items-center justify-center h-10 w-10 rounded-lg bg-blue-100 text-blue-600">
          <BookOpen className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-2xl font-bold">{concept.title}</h2>
          <p className="text-sm text-muted-foreground">Vysvětlení konceptu</p>
        </div>
      </div>

      {concept.sections.map((section, idx) => (
        <Card key={idx}>
          <CardHeader>
            <CardTitle className="text-lg">{section.heading}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <MathText content={section.body} />

            {section.visual && <VisualBlock visual={section.visual} />}

            {section.examples && section.examples.length > 0 && (
              <div className="space-y-3 mt-4">
                <h4 className="font-semibold text-sm text-muted-foreground uppercase tracking-wide">
                  Příklady
                </h4>
                {section.examples.map((example, eIdx) => (
                  <div
                    key={eIdx}
                    className="bg-muted/50 rounded-lg p-4 space-y-2"
                  >
                    <div className="font-medium">
                      <MathText content={example.problem} />
                    </div>
                    <div className="text-muted-foreground border-t pt-2">
                      <MathText content={example.solution} />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
