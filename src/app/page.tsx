import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Footer } from "@/components/layout/footer";
import {
  ArrowRight,
  Zap,
  Target,
  BookOpen,
} from "lucide-react";

const features = [
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
          <Link href="/topics">
            <Button size="sm">Začít se učit</Button>
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            Učte se matematiku a fyziku{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              interaktivně
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
            Interaktivní lekce s teorií, vzorovými příklady a procvičením
            s okamžitou zpětnou vazbou.
          </p>
          <Link href="/topics">
            <Button size="lg" className="gap-2 text-base">
              Začít se učit
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Proč Vzdělej.se?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
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

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Připraveni začít?
          </h2>
          <p className="text-blue-100 mb-8 text-lg">
            Vyberte si téma a začněte se učit.
          </p>
          <Link href="/topics">
            <Button
              size="lg"
              variant="secondary"
              className="gap-2 text-base"
            >
              Prohlédnout témata
              <ArrowRight className="h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
