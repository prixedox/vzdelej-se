"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Lock, Zap } from "lucide-react";
import { PLANS } from "@/lib/stripe/config";

export function PaywallGate({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [loading, setLoading] = useState<string | null>(null);

  async function handleCheckout(priceId: string) {
    setLoading(priceId);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ priceId }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Checkout failed:", err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center">
          <div className="flex justify-center mb-3">
            <Lock className="h-12 w-12 text-muted-foreground" />
          </div>
          <DialogTitle className="text-xl">
            Denní limit vyčerpán
          </DialogTitle>
          <DialogDescription>
            Dosáhli jste limitu 3 bezplatných lekcí denně. Odemkněte
            neomezený přístup s předplatným.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {PLANS.map((plan) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-4 ${plan.popular ? "border-primary ring-1 ring-primary" : ""}`}
            >
              <div className="flex items-center justify-between mb-2">
                <div>
                  <h3 className="font-semibold">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {plan.price} Kč / {plan.interval}
                    {plan.savings && (
                      <span className="ml-2 text-green-600 font-medium">
                        {plan.savings}
                      </span>
                    )}
                  </p>
                </div>
                {plan.popular && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                    Oblíbené
                  </span>
                )}
              </div>
              <Button
                onClick={() => handleCheckout(plan.priceId)}
                disabled={loading !== null}
                className="w-full gap-2"
                variant={plan.popular ? "default" : "outline"}
              >
                <Zap className="h-4 w-4" />
                {loading === plan.priceId
                  ? "Přesměrování..."
                  : `Zvolit ${plan.name.toLowerCase()}`}
              </Button>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
