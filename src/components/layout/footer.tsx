import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-3">
              Vzdělej.se
            </h3>
            <p className="text-sm text-muted-foreground">
              Interaktivní vzdělávací platforma.
              Matematika a fyzika pro každého.
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Odkazy</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/topics" className="hover:text-foreground transition-colors">
                  Témata
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-foreground transition-colors">
                  Podmínky služby
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Kontakt</h4>
            <p className="text-sm text-muted-foreground">
              info@vzdelej.se
            </p>
          </div>
        </div>
        <div className="border-t mt-8 pt-6 text-center text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Vzdělej.se. Všechna práva vyhrazena.
        </div>
      </div>
    </footer>
  );
}
