import type { TopicTreeData } from "@/types/topic";

export const informaticsTree = {
  subject: "informatics",
  subjectName: "Informatika",
  icon: "💻",
  topics: [
    {
      slug: "fundamentals",
      name: "Základy informatiky",
      description: "Data, hardware, software, sítě",
      icon: "📦",
      children: [
        {
          slug: "information-and-data",
          name: "Informace a data",
          description: "Jak reprezentujeme informaci v počítači",
          aiContext:
            "Bit, bajt, ASCII, Unicode (UTF-8), binární/dekadická/hexadecimální soustava, kódování, komprese",
          comingSoon: true,
        },
        {
          slug: "digital-representation",
          name: "Digitální reprezentace",
          description: "Čísla, text, obraz a zvuk v počítači",
          aiContext:
            "Celá a desetinná čísla (IEEE 754), reprezentace záporných čísel (dvojkový doplněk), obraz (pixely, RGB), zvuk (sampling, bitrate)",
          comingSoon: true,
        },
        {
          slug: "computing-history",
          name: "Historie výpočetní techniky",
          description: "Od Turinga po současnost",
          aiContext:
            "Alan Turing, Turingův stroj, ENIAC, Moore's Law, generace počítačů, von Neumannova architektura, mikroprocesory",
          comingSoon: true,
        },
        {
          slug: "hardware",
          name: "Hardware",
          description: "Fyzické součásti počítače",
          aiContext:
            "CPU, RAM, ROM, pevný disk (HDD, SSD), grafická karta, základní deska, periferie (klávesnice, myš, monitor)",
          comingSoon: true,
        },
        {
          slug: "software-and-os",
          name: "Software a operační systémy",
          description: "Aplikace, OS a jejich role",
          aiContext:
            "Operační systémy (Windows, Linux, macOS), jádro, procesy a vlákna, souborové systémy, aplikační vs. systémový software",
          comingSoon: true,
        },
        {
          slug: "networks-and-internet",
          name: "Sítě a internet",
          description: "Jak fungují počítačové sítě",
          aiContext:
            "LAN, WAN, TCP/IP, HTTP/HTTPS, DNS, IP adresy, router, switch, model OSI, internetové protokoly, wi-fi",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "algorithms",
      name: "Algoritmizace",
      description: "Algoritmy, složitost, rekurze",
      icon: "🧮",
      children: [
        {
          slug: "algorithms-intro",
          name: "Úvod do algoritmů",
          description: "Co je algoritmus a jak ho zapsat",
          aiContext:
            "Definice algoritmu, vstup/výstup, determinismus, konečnost, vývojové diagramy, pseudokód",
          comingSoon: true,
        },
        {
          slug: "complexity",
          name: "Časová a paměťová složitost",
          description: "Jak rychle algoritmus běží — notace O(n)",
          aiContext:
            "Asymptotická složitost, O-notace, konstantní/lineární/kvadratická/logaritmická/exponenciální složitost, nejhorší vs. průměrný případ",
          comingSoon: true,
        },
        {
          slug: "recursion",
          name: "Rekurze",
          description: "Funkce volající sama sebe",
          aiContext:
            "Rekurze vs. iterace, zásobník volání, Fibonacciho posloupnost, Hanoiské věže, rekurzivní dělení (divide and conquer)",
          comingSoon: true,
        },
        {
          slug: "searching",
          name: "Vyhledávání",
          description: "Jak najít prvek v datech",
          aiContext:
            "Lineární vyhledávání O(n), binární vyhledávání O(log n), vyhledávání v hash tabulce O(1), podmínky pro každé",
          comingSoon: true,
        },
        {
          slug: "sorting",
          name: "Řazení",
          description: "Bubble, insertion, merge, quick sort",
          aiContext:
            "Bubble sort, insertion sort, selection sort, merge sort, quicksort, stabilita řazení, porovnání složitosti O(n²) vs. O(n log n)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "data-structures",
      name: "Datové struktury",
      description: "Pole, stromy, grafy, hash tabulky",
      icon: "🗂️",
      children: [
        {
          slug: "arrays-and-lists",
          name: "Pole a seznamy",
          description: "Lineární datové struktury",
          aiContext:
            "Pole vs. spojový seznam, jednosměrně a obousměrně vázaný seznam, zásobník (stack), fronta (queue), deque",
          comingSoon: true,
        },
        {
          slug: "trees",
          name: "Stromy",
          description: "Hierarchické struktury",
          aiContext:
            "Binární strom, binární vyhledávací strom (BST), AVL stromy, heap, průchod stromem (preorder, inorder, postorder)",
          comingSoon: true,
        },
        {
          slug: "graphs",
          name: "Grafy",
          description: "Vrcholy a hrany",
          aiContext:
            "Orientované a neorientované grafy, reprezentace (matice sousednosti, seznam sousedů), DFS, BFS, Dijkstra",
          comingSoon: true,
        },
        {
          slug: "hashing",
          name: "Hashování",
          description: "Hash tabulky a hash funkce",
          aiContext:
            "Hash funkce, hash tabulka, kolize, řetězení, otevřené adresování, kryptografické hash funkce (SHA, MD5)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "programming",
      name: "Programování",
      description: "Proměnné, řízení toku, funkce, objekty",
      icon: "⌨️",
      children: [
        {
          slug: "variables-and-expressions",
          name: "Proměnné a výrazy",
          description: "Základní stavební bloky kódu",
          aiContext:
            "Datové typy (int, float, string, bool), deklarace, přiřazení, operátory (aritmetické, logické, relační), typová konverze",
          comingSoon: true,
        },
        {
          slug: "control-flow",
          name: "Řízení toku",
          description: "If, else, smyčky, větvení",
          aiContext:
            "If/else, switch/case, while, do-while, for, break, continue, vnořené podmínky, logické operátory",
          comingSoon: true,
        },
        {
          slug: "subroutines",
          name: "Funkce a procedury",
          description: "Opakovaně použitelné bloky kódu",
          aiContext:
            "Funkce, parametry, návratová hodnota, lokální vs. globální proměnné, rekurzivní funkce, předávání hodnotou/referencí, čistota funkce",
          comingSoon: true,
        },
        {
          slug: "oop",
          name: "Objektově orientované programování",
          description: "Třídy, objekty, dědičnost",
          aiContext:
            "Třída, objekt, atributy, metody, zapouzdření, dědičnost, polymorfismus, abstrakce, konstruktor, rozhraní",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "data-and-databases",
      name: "Data a databáze",
      description: "SQL, formáty dat, datové modely",
      icon: "🗄️",
      children: [
        {
          slug: "databases",
          name: "Databáze",
          description: "Relační databáze a jejich návrh",
          aiContext:
            "Relační databáze, tabulka, primární a cizí klíč, normalizace (1NF, 2NF, 3NF), ER diagramy, NoSQL",
          comingSoon: true,
        },
        {
          slug: "sql",
          name: "SQL",
          description: "Jazyk pro práci s databázemi",
          aiContext:
            "SELECT, INSERT, UPDATE, DELETE, WHERE, JOIN (INNER, LEFT, RIGHT), GROUP BY, ORDER BY, agregační funkce (COUNT, SUM, AVG)",
          comingSoon: true,
        },
        {
          slug: "data-formats",
          name: "Datové formáty",
          description: "JSON, XML, CSV a další",
          aiContext:
            "JSON (struktura, serializace), XML, CSV, YAML, Protobuf, kdy použít který formát, validace (JSON Schema)",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "web-and-security",
      name: "Web a bezpečnost",
      description: "Webové technologie, kryptografie, bezpečnost",
      icon: "🔒",
      children: [
        {
          slug: "html-and-css",
          name: "HTML a CSS",
          description: "Struktura a styl webových stránek",
          aiContext:
            "HTML tagy, sémantika (header, main, article, section), CSS (selektory, flexbox, grid), responzivní design, media queries",
          comingSoon: true,
        },
        {
          slug: "javascript",
          name: "JavaScript",
          description: "Programovací jazyk webu",
          aiContext:
            "Syntaxe, DOM manipulace, události, asynchronní kód (callback, Promise, async/await), moderní JS (let/const, arrow functions, moduly)",
          comingSoon: true,
        },
        {
          slug: "cryptography",
          name: "Kryptografie",
          description: "Šifrování a digitální podpisy",
          aiContext:
            "Symetrická vs. asymetrická kryptografie, AES, RSA, hash funkce (SHA), digitální podpis, certifikáty, HTTPS/TLS",
          comingSoon: true,
        },
        {
          slug: "cybersecurity",
          name: "Kybernetická bezpečnost",
          description: "Hrozby a obrana",
          aiContext:
            "Phishing, malware, SQL injection, XSS, DoS/DDoS, silná hesla, vícefaktorová autentizace (2FA), zálohování, firewall",
          comingSoon: true,
        },
      ],
    },
    {
      slug: "modern-computing",
      name: "Moderní témata",
      description: "AI, strojové učení, etika",
      icon: "🤖",
      children: [
        {
          slug: "artificial-intelligence",
          name: "Umělá inteligence",
          description: "Co je AI a co dokáže",
          aiContext:
            "Slabá vs. silná AI, expertní systémy, neurální sítě, Turingův test, historie AI, současné aplikace (ChatGPT, DALL-E)",
          comingSoon: true,
        },
        {
          slug: "machine-learning",
          name: "Strojové učení",
          description: "Učení z dat",
          aiContext:
            "Supervised, unsupervised, reinforcement learning, trénovací a testovací data, overfitting, neurální sítě, deep learning, common use cases",
          comingSoon: true,
        },
        {
          slug: "it-ethics",
          name: "Etika v IT",
          description: "Ochrana soukromí, AI bias, duševní vlastnictví",
          aiContext:
            "GDPR, ochrana osobních údajů, bias v AI, autorské právo, open source, digitální stopa, pravidla na sociálních sítích",
          comingSoon: true,
        },
      ],
    },
  ],
} as const satisfies TopicTreeData;

type LeafSlugOf<T> = T extends { children: readonly (infer C)[] }
  ? C extends { slug: infer S }
    ? S
    : never
  : never;

export type InformaticsTopicSlug = LeafSlugOf<(typeof informaticsTree.topics)[number]>;
