"use client";

import Link from "next/link";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MathText } from "./math-display";

export function StageComplete({ keyTakeaways }: { keyTakeaways: string[] }) {
  return (
    <div className="max-w-md mx-auto text-center space-y-6">
      <Sparkles className="h-16 w-16 text-emerald-500 mx-auto" />
      <h2 className="text-2xl font-bold">Máš to</h2>

      <ul className="space-y-2 text-left">
        {keyTakeaways.map((takeaway) => (
          <li key={takeaway} className="rounded-lg border bg-muted/40 p-3">
            <MathText content={takeaway} className="text-sm" />
          </li>
        ))}
      </ul>

      <Button asChild>
        <Link href="/topics">Další téma</Link>
      </Button>
    </div>
  );
}
