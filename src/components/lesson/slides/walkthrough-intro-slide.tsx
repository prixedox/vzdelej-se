"use client";

import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MathText } from "../math-display";
import type { WalkthroughIntroSlide as WalkthroughIntroSlideType } from "@/types/slide";

export function WalkthroughIntroSlide({
  slide,
}: {
  slide: WalkthroughIntroSlideType;
}) {
  return (
    <div className="py-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <Card className="border-amber-200 bg-amber-50/50">
          <CardHeader>
            <CardTitle className="text-lg">Zadání</CardTitle>
          </CardHeader>
          <CardContent>
            <MathText
              content={slide.problemStatement}
              className="text-lg"
            />
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
