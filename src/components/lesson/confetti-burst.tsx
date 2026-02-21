"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

const COLORS = ["#22c55e", "#3b82f6", "#f59e0b", "#ef4444", "#8b5cf6", "#ec4899"];

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  angle: number;
  distance: number;
}

export function ConfettiBurst() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const p: Particle[] = [];
    for (let i = 0; i < 12; i++) {
      p.push({
        id: i,
        x: 0,
        y: 0,
        color: COLORS[i % COLORS.length],
        angle: (i / 12) * 360,
        distance: 60 + Math.random() * 40,
      });
    }
    setParticles(p);
  }, []);

  if (particles.length === 0) return null;

  return (
    <div className="pointer-events-none fixed inset-0 flex items-center justify-center z-50">
      {particles.map((p) => {
        const rad = (p.angle * Math.PI) / 180;
        const tx = Math.cos(rad) * p.distance;
        const ty = Math.sin(rad) * p.distance;
        return (
          <motion.div
            key={p.id}
            initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
            animate={{
              x: tx,
              y: ty,
              scale: [0, 1.2, 0],
              opacity: [1, 1, 0],
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="absolute rounded-full"
            style={{
              width: 8 + Math.random() * 6,
              height: 8 + Math.random() * 6,
              backgroundColor: p.color,
            }}
          />
        );
      })}
    </div>
  );
}
