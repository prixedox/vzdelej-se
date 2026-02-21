"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { MathText } from "../math-display";
import type { SummarySlide as SummarySlideType } from "@/types/slide";

export function SummarySlide({ slide }: { slide: SummarySlideType }) {
  return (
    <div className="space-y-4 py-4">
      <Card>
        <CardContent className="pt-5">
          <ul className="space-y-4">
            {slide.keyTakeaways.map((takeaway, idx) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.12 }}
                className="flex items-start gap-3"
              >
                <span className="flex items-center justify-center h-6 w-6 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <MathText content={takeaway} />
              </motion.li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {slide.nextTopicSuggestion && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="bg-muted/50">
            <CardContent className="pt-4">
              <p className="text-sm text-muted-foreground mb-1">
                Doporučené další téma:
              </p>
              <p className="font-medium">{slide.nextTopicSuggestion}</p>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </div>
  );
}
