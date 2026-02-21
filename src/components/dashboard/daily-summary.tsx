"use client";

import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Star, Target, Flame } from "lucide-react";
import { FREE_DAILY_LESSONS } from "@/lib/utils/constants";

interface DailySummaryProps {
  lessonsToday: number;
  xpToday: number;
  streak: number;
  isPremium: boolean;
  dailyLessonsUsed: number;
}

export function DailySummary({
  lessonsToday,
  xpToday,
  streak,
  isPremium,
  dailyLessonsUsed,
}: DailySummaryProps) {
  const stats = [
    {
      label: "Lekce dnes",
      value: lessonsToday,
      icon: BookOpen,
      color: "text-blue-600",
      bg: "bg-blue-100",
      extra: !isPremium
        ? `${dailyLessonsUsed}/${FREE_DAILY_LESSONS} zdarma`
        : "neomezené",
    },
    {
      label: "XP dnes",
      value: xpToday,
      icon: Star,
      color: "text-yellow-600",
      bg: "bg-yellow-100",
    },
    {
      label: "Série",
      value: `${streak} ${streak === 1 ? "den" : streak >= 2 && streak <= 4 ? "dny" : "dní"}`,
      icon: Flame,
      color: "text-orange-600",
      bg: "bg-orange-100",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <Card key={stat.label}>
          <CardContent className="pt-5 pb-4">
            <div className="flex items-center gap-3">
              <div
                className={`flex items-center justify-center h-10 w-10 rounded-lg ${stat.bg} ${stat.color}`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                {stat.extra && (
                  <p className="text-xs text-muted-foreground">{stat.extra}</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
