"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check, CreditCard, Loader2 } from "lucide-react";
import { PLANS } from "@/lib/stripe/config";

export default function SubscriptionPage() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<string | null>(null);

  const isPremium =
    session?.user?.subscriptionStatus === "active" ||
    session?.user?.subscriptionStatus === "trialing";

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

  async function handlePortal() {
    setLoading("portal");
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      console.error("Portal failed:", err);
    } finally {
      setLoading(null);
    }
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Předplatné</h1>
        <p className="text-muted-foreground mt-1">
          Spravujte své předplatné
        </p>
      </div>

      {/* Current status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Aktuální plán</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
              <div>
                <p className="font-medium">
                  {isPremium ? "Premium" : "Zdarma"}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isPremium
                    ? "Neomezený přístup ke všem lekcím"
                    : "3 lekce denně zdarma"}
                </p>
              </div>
            </div>
            <Badge variant={isPremium ? "default" : "secondary"}>
              {session?.user?.subscriptionStatus === "trialing"
                ? "Zkušební období"
                : isPremium
                ? "Aktivní"
                : "Zdarma"}
            </Badge>
          </div>

          {isPremium && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={handlePortal}
              disabled={loading === "portal"}
            >
              {loading === "portal" ? (
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
              ) : null}
              Spravovat předplatné
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Plans */}
      {!isPremium && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PLANS.map((plan) => (
            <Card
              key={plan.id}
              className={plan.popular ? "border-primary ring-1 ring-primary" : ""}
            >
              <CardContent className="pt-6">
                {plan.popular && (
                  <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mb-4 inline-block">
                    Nejlepší nabídka
                  </span>
                )}
                <h3 className="font-semibold text-lg">{plan.name}</h3>
                <div className="mt-2 mb-4">
                  <span className="text-3xl font-bold">
                    {plan.price} Kč
                  </span>
                  <span className="text-muted-foreground">
                    {" "}
                    / {plan.interval}
                  </span>
                </div>
                {plan.savings && (
                  <p className="text-sm text-green-600 font-medium mb-4">
                    {plan.savings}
                  </p>
                )}
                <ul className="space-y-2 mb-6">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="h-4 w-4 text-green-600 shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  onClick={() => handleCheckout(plan.priceId)}
                  disabled={loading !== null}
                  className="w-full"
                  variant={plan.popular ? "default" : "outline"}
                >
                  {loading === plan.priceId ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : null}
                  Zvolit {plan.name.toLowerCase()}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
