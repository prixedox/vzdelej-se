"use client";

import { motion } from "motion/react";
import { MathText, MathDisplay } from "../math-display";
import { Badge } from "@/components/ui/badge";
import type { NamingBeat } from "@/types/stage";

export function NamingPanel({ naming }: { naming: NamingBeat }) {
  return (
    <div className="space-y-4">
      <Badge
        variant="secondary"
        className="bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-200"
      >
        Teď to má jméno
      </Badge>

      <MathText content={naming.observation} className="text-base leading-relaxed" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.25, type: "spring", stiffness: 260, damping: 22 }}
        className="rounded-lg border-2 border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-700 dark:bg-emerald-950"
      >
        <MathDisplay math={naming.formula} />
      </motion.div>

      <MathText content={naming.mapping} className="text-base leading-relaxed" />
    </div>
  );
}
