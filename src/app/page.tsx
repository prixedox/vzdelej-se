import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Brain,
  Zap,
  Target,
  BookOpen,
  Star,
  Check,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI generované lekce",
    description:
      "Každá lekce je vytvořena umělou inteligencí — vysvětlení, příklady a procvičení na míru.",
  },
  {
    icon: Zap,
    title: "Interaktivní učení",
    description:
      "Teorie, vzorové řešení krok za krokem a procvičovací příklady s okamžitou zpětnou vazbou.",
  },
  {
    icon: Target,
    title: "3 úrovně obtížnosti",
    description:
      "Od začátečníka po pokročilého. Přizpůsobte si obtížnost svým potřebám.",
  },
  {
    icon: BookOpen,
    title: "Matematika a fyzika",
    description:
      "35+ témat z matematiky a fyziky. Algebra, funkce, geometrie, mechanika, elektřina a další.",
  },
  {
    icon: Star,
    title: "Gamifikace",
    description:
      "Získávejte XP, udržujte si sérii a sledujte svůj pokrok. Učení, které baví.",
  },
];

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
      "Všechna témata",
      "Všechny obtížnosti",
      "Prioritní generování",
    ],
    cta: "Vyzkoušet Premium",
    href: "/registrace",
    popular: false,
  },
  {
    name: "Premium roční",
    price: "1 490",
    interval: "/ rok",
    features: [
      "Vše z měsíčního",
      "7 dní zdarma",
      "Ušetříte 38 %",
      "Prioritní podpora",
    ],
    cta: "Nejlepší nabídka",
    href: "/registrace",
    popular: true,
  },
];

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 flex h-16 items-center justify-between">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vzdělej.se
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/cenik">
              <Button variant="ghost" size="sm">Ceník</Button>
            </Link>
            <Link href="/prihlaseni">
              <Button variant="ghost" size="sm">Přihlásit se</Button>
            </Link>
            <Link href="/registrace">
              <Button size="sm">Registrace</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Učte se matematiku a fyziku{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              s umělou inteligencí
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Interaktivní lekce generované AI. Teorie, vzorové příklady a
            procvičení s okamžitou zpětnou vazbou. Začněte zdarma.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/registrace">
              <Button size="lg" className="gap-2 text-base">
                Začít se učit zdarma
                <ArrowRight className="h-5 w-5" />
              </Button>
            </Link>
            <Link href="/cenik">
              <Button size="lg" variant="outline" className="text-base">
                Zobrazit ceník
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proč Vzdělej.se?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature) => (
              <Card key={feature.title}>
                <CardContent className="pt-6">
                  <feature.icon className="h-10 w-10 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20" id="cenik">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">Ceník</h2>
          <p className="text-center text-muted-foreground mb-12">
            Začněte zdarma, upgradujte kdykoliv.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {plans.map((plan) => (
              <Card
                key={plan.name}
                className={
                  plan.popular ? "border-primary shadow-lg ring-1 ring-primary" : ""
                }
              >
                <CardContent className="pt-6">
                  {plan.popular && (
                    <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full mb-4 inline-block">
                      Nejlepší nabídka
                    </span>
                  )}
                  <h3 className="font-semibold text-lg">{plan.name}</h3>
                  <div className="mt-2 mb-4">
                    <span className="text-3xl font-bold">{plan.price} Kč</span>
                    <span className="text-muted-foreground">
                      {plan.interval}
                    </span>
                  </div>
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
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Připraveni začít?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Zaregistrujte se a začněte se učit ještě dnes. Prvních 3 lekcí denně zdarma.
          </p>
          <Link href="/registrace">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base"
            >
              Vytvořit účet zdarma
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
