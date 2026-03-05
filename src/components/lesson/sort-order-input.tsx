"use client";

import { useState, useEffect } from "react";
import { Reorder } from "motion/react";
import { GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";
import { MathText } from "./math-display";

interface SortOrderInputProps {
  items: string[];
  disabled?: boolean;
  result?: "correct" | "wrong" | null;
  onOrderChange: (items: string[]) => void;
}

function shuffleArray(arr: string[]): string[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  // Ensure shuffled order differs from correct order
  if (shuffled.every((item, idx) => item === arr[idx]) && arr.length > 1) {
    [shuffled[0], shuffled[1]] = [shuffled[1], shuffled[0]];
  }
  return shuffled;
}

export function SortOrderInput({
  items: correctOrder,
  disabled,
  result,
  onOrderChange,
}: SortOrderInputProps) {
  const [order, setOrder] = useState<string[]>(() =>
    shuffleArray(correctOrder)
  );

  useEffect(() => {
    onOrderChange(order);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function handleReorder(newOrder: string[]) {
    if (disabled) return;
    setOrder(newOrder);
    onOrderChange(newOrder);
  }

  return (
    <Reorder.Group
      axis="y"
      values={order}
      onReorder={handleReorder}
      className="space-y-2"
    >
      {order.map((item, idx) => (
        <Reorder.Item
          key={item}
          value={item}
          dragListener={!disabled}
          className={cn(
            "flex items-center gap-3 px-4 py-3 rounded-lg border bg-background transition-colors",
            !disabled && "cursor-grab active:cursor-grabbing",
            disabled && result === "correct" && "border-green-400 bg-green-50",
            disabled && result === "wrong" && (
              item === correctOrder[idx]
                ? "border-green-400 bg-green-50"
                : "border-red-400 bg-red-50"
            )
          )}
        >
          <GripVertical className={cn(
            "h-4 w-4 shrink-0",
            disabled ? "text-muted-foreground/30" : "text-muted-foreground"
          )} />
          <span className="text-sm font-medium text-muted-foreground w-6">
            {idx + 1}.
          </span>
          <MathText content={item} className="text-sm" />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
