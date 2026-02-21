"use client";

import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { MathText } from "../math-display";
import { Check } from "lucide-react";
import type { WalkthroughResultSlide as WalkthroughResultSlideType } from "@/types/slide";

export function WalkthroughResultSlide({
  slide,
}: {
  slide: WalkthroughResultSlideType;
}) {
  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-5">
            <div className="flex items-center gap-2 mb-3">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.2,
                  type: "spring",
                  stiffness: 300,
                }}
              >
                <Check className="h-6 w-6 text-green-600" />
              </motion.div>
              <span className="font-semibold text-lg text-green-800">
                Výsledek
              </span>
            </div>
            <MathText
              content={slide.finalAnswer}
              className="text-green-800 font-medium text-lg"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
