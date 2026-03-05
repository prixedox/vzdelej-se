"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MathText } from "../math-display";
import { VisualBlock } from "../visuals/visual-block";
import { Eye, Telescope } from "lucide-react";
import type { ExplorationSlide as ExplorationSlideType } from "@/types/slide";

export function ExplorationSlide({
  slide,
}: {
  slide: ExplorationSlideType;
}) {
  const { exploration } = slide;
  const [revealedTasks, setRevealedTasks] = useState<Set<number>>(new Set());

  function revealTask(idx: number) {
    setRevealedTasks((prev) => new Set(prev).add(idx));
  }

  return (
    <div className="py-4">
      <div className="flex items-center gap-2 text-xs text-amber-600 mb-3">
        <Telescope className="h-4 w-4" />
        <span className="font-medium">Interaktivní průzkum</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h3 className="text-lg font-semibold mb-4">{exploration.title}</h3>

        <div className="mb-6">
          <VisualBlock visual={exploration.visual} animated />
        </div>

        <div className="space-y-3">
          {exploration.tasks.map((task, idx) => (
            <Card key={idx}>
              <CardContent className="pt-4 space-y-2">
                <MathText
                  content={`**Úkol ${idx + 1}:** ${task.prompt}`}
                  className="text-sm"
                />

                {revealedTasks.has(idx) ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="rounded-lg p-3 bg-amber-50 border border-amber-200 text-sm"
                  >
                    <MathText
                      content={task.observation}
                      className="text-amber-900"
                    />
                  </motion.div>
                ) : (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => revealTask(idx)}
                    className="text-amber-600 hover:text-amber-800 hover:bg-amber-50"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    Ukázat odpověď
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
