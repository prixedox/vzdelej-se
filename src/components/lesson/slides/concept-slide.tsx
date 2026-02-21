"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import type { ConceptSectionSlide } from "@/types/slide";

export function ConceptSlide({ slide }: { slide: ConceptSectionSlide }) {
  const { section, sectionNumber, totalSections } = slide;

  return (
    <div className="space-y-4 py-4">
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <span className="font-medium">
          {sectionNumber} / {totalSections}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">{section.heading}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <MathText content={section.body} />

          {section.visual && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <VisualBlock visual={section.visual} animated />
            </motion.div>
          )}

          {section.examples && section.examples.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3 mt-4"
            >
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
            </motion.div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
