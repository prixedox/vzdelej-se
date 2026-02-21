import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import { Check, ArrowLeft } from "lucide-react";

const plans = [
  {
    name: "Zdarma",
    price: "0",
    interval: "",
    features: [
      "3 lekce denně",
      "Všechna témata",
      "Sledování pokroku",
      "XP a úrovně",
    ],
    cta: "Začít zdarma",
    href: "/registrace",
    popular: false,
  },
  {
    name: "Premium měsíční",
    price: "199",
    interval: "/ měsíc",
    features: [
      "Neomezené lekce",
      "Všechna témata a obtížnosti",
      "Podrobné statistiky",
      "Zrušení kdykoliv",
    ],
    cta: "Zvolit měsíční",
    href: "/registrace",
    popular: false,
  },
  {
    name: "Premium roční",
    price: "1 490",
    interval: "/ rok",
    features: [
      "Vše z měsíčního plánu",
      "7 dní zdarma na vyzkoušení",
      "Ušetříte 898 Kč (38 %)",
      "Prioritní podpora",
    ],
    cta: "Nejlepší nabídka",
    href: "/registrace",
    popular: true,
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vzdělej.se
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/prihlaseni">
              <Button variant="ghost" size="sm">Přihlásit se</Button>
            </Link>
            <Link href="/registrace">
              <Button size="sm">Registrace</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Zpět na hlavní stránku
          </Link>

          <h1 className="text-4xl font-bold text-center mb-4">Ceník</h1>
          <p className="text-center text-muted-foreground mb-12 text-lg">
            Začněte zdarma. Upgradujte kdykoliv na Premium pro neomezený přístup.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.popular
                    ? "border-primary shadow-lg ring-1 ring-primary"
                    : ""
                }
              >
                <CardContent className="pt-6">
                  {plan.popular && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mb-4 inline-block">
                      Nejlepší nabídka
                    </span>
                  )}
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-2 mb-6">
                    <span className="text-4xl font-bold">{plan.price} Kč</span>
                    <span className="text-muted-foreground">
                      {plan.interval}
                    </span>
                  </div>
                  <ul className="space-y-3 mb-6">
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
                  <Link href={plan.href}>
                    <Button
                      className="w-full"
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
