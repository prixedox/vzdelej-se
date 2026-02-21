import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { ArrowLeft } from "lucide-react";

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 flex h-16 items-center">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Vzdělej.se
          </Link>
        </div>
      </header>

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" />
            Zpět na hlavní stránku
          </Link>

          <h1 className="text-3xl font-bold mb-8">Podmínky služby</h1>

          <div className="prose prose-neutral max-w-none space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Úvodní ustanovení</h2>
              <p className="text-muted-foreground">
                Tyto podmínky služby upravují práva a povinnosti uživatelů platformy Vzdělej.se.
                Používáním služby souhlasíte s těmito podmínkami.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Popis služby</h2>
              <p className="text-muted-foreground">
                Vzdělej.se je vzdělávací platforma využívající umělou inteligenci pro generování
                interaktivních lekcí z matematiky a fyziky. Služba je dostupná ve dvou
                variantách: bezplatné (s omezením 3 lekcí denně) a premium (s neomezeným přístupem).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Registrace a účet</h2>
              <p className="text-muted-foreground">
                Pro používání služby je nutná registrace. Uživatel je odpovědný za bezpečnost
                svého účtu a přihlašovacích údajů.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Platby a předplatné</h2>
              <p className="text-muted-foreground">
                Premium předplatné je účtováno v českých korunách (CZK) prostřednictvím
                platební brány Stripe. Předplatné se automaticky obnovuje. Zrušení je možné
                kdykoliv v nastavení účtu.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Obsah generovaný AI</h2>
              <p className="text-muted-foreground">
                Veškerý vzdělávací obsah je generován umělou inteligencí. Přestože dbáme na
                kvalitu, nemůžeme zaručit 100% přesnost. Obsah slouží jako doplněk vzdělávání,
                nikoliv jako jeho náhrada.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Ochrana osobních údajů</h2>
              <p className="text-muted-foreground">
                Zpracování osobních údajů se řídí platnými právními předpisy, zejména
                Nařízením GDPR. Shromažďujeme pouze údaje nezbytné pro provoz služby.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Kontakt</h2>
              <p className="text-muted-foreground">
                V případě dotazů nás kontaktujte na info@vzdelej.se.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
