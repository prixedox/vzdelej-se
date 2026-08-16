"use client";

import type { ReactNode } from "react";
import { motion, type MotionProps } from "motion/react";

interface MotionGProps {
  /**
   * Static slides render the same diagram without entrance animation. Picking the
   * tag inline (`animated ? motion.g : "g"`) produces a union element type that
   * rejects the motion-only props, so the two tags are kept apart here instead.
   */
  animated: boolean;
  initial?: MotionProps["initial"];
  animate?: MotionProps["animate"];
  transition?: MotionProps["transition"];
  style?: MotionProps["style"];
  transform?: string;
  children: ReactNode;
}

export function MotionG({
  animated,
  initial,
  animate,
  transition,
  style,
  transform,
  children,
}: MotionGProps) {
  if (!animated) {
    return <g transform={transform}>{children}</g>;
  }

  return (
    <motion.g
      initial={initial}
      animate={animate}
      transition={transition}
      style={style}
      transform={transform}
    >
      {children}
    </motion.g>
  );
}
