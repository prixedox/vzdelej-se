"use client";

import { useSession } from "next-auth/react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { MobileSidebar } from "./mobile-sidebar";
import { StreakCounter } from "@/components/gamification/streak-counter";
import { XPBar } from "@/components/gamification/xp-bar";

export function TopBar() {
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <MobileSidebar />
          </SheetContent>
        </Sheet>

        <div className="flex-1" />

        {session?.user && (
          <div className="flex items-center gap-4">
            {session.user.role === "admin" && (
              <span className="text-xs font-bold bg-red-500 text-white px-2 py-0.5 rounded-full">
                Admin
              </span>
            )}
            <StreakCounter streak={session.user.streak} />
            <XPBar xp={session.user.xp} level={session.user.level} />
          </div>
        )}
      </div>
    </header>
  );
}
