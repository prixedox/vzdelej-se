"use client";

import { motion } from "motion/react";
import { BookOpen, Lightbulb, PenTool, CheckSquare } from "lucide-react";
import type { SectionTitleSlide as SectionTitleSlideType } from "@/types/slide";

const icons = {
  book: BookOpen,
  lightbulb: Lightbulb,
  pen: PenTool,
  check: CheckSquare,
};

const colors = {
  book: "bg-blue-100 text-blue-600",
  lightbulb: "bg-amber-100 text-amber-600",
  pen: "bg-green-100 text-green-600",
  check: "bg-purple-100 text-purple-600",
};

export function SectionTitleSlide({
  slide,
}: {
  slide: SectionTitleSlideType;
}) {
  const Icon = icons[slide.icon];
  const color = colors[slide.icon];

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className={`flex items-center justify-center h-16 w-16 rounded-2xl ${color} mb-6`}
      >
        <Icon className="h-8 w-8" />
      </motion.div>

      <motion.h2
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.15 }}
        className="text-3xl font-bold mb-2"
      >
        {slide.title}
      </motion.h2>

      <motion.p
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.25 }}
        className="text-muted-foreground"
      >
        {slide.subtitle}
      </motion.p>
    </div>
  );
}
