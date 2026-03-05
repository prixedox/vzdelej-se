"use client";

import { motion } from "motion/react";
import { MathText } from "../math-display";
import { CheckCircle } from "lucide-react";
import type { SummarySlideV2 as SummarySlideV2Type } from "@/types/slide-v2";

export function SummarySlideV2({ slide }: { slide: SummarySlideV2Type }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="py-6 space-y-4"
    >
      <h3 className="text-lg font-semibold">Shrnutí</h3>

      <ul className="space-y-3">
        {slide.keyTakeaways.map((takeaway, idx) => (
          <li key={idx} className="flex items-start gap-3">
            <CheckCircle className="h-5 w-5 text-green-500 shrink-0 mt-0.5" />
            <MathText content={takeaway} className="text-sm" />
          </li>
        ))}
      </ul>

      {slide.nextTopicSuggestion && (
        <p className="text-sm text-muted-foreground">
          Další doporučené téma: {slide.nextTopicSuggestion}
        </p>
      )}
    </motion.div>
  );
}
