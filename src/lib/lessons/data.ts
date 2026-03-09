import type { LessonContent } from "@/types/lesson";
import type { LessonV2 } from "@/types/lesson-v2";

// ── Math imports ──
import { linearniRovniceV2Beginner } from "./math/linearni-rovnice-v2";
import { kvadratickeRovniceV2Beginner } from "./math/kvadraticke-rovnice-v2";
import { soustavyRovnicV2Beginner } from "./math/soustavy-rovnic-v2";
import { nerovniceV2Beginner } from "./math/nerovnice-v2";
import { vyrazoveUpravyV2Beginner } from "./math/vyrazove-upravy-v2";
import { posloupnostiV2Beginner } from "./math/posloupnosti-v2";
import { linearniFunkceV2Beginner } from "./math/linearni-funkce-v2";
import { kvadratickaFunkceV2Beginner } from "./math/kvadraticka-funkce-v2";
import { exponencialniFunkceV2Beginner } from "./math/exponencialni-funkce-v2";
import { logaritmickaFunkceV2Beginner } from "./math/logaritmicka-funkce-v2";
import { goniometrickeFunkceV2Beginner } from "./math/goniometricke-funkce-v2";
import { absolutniHodnotaV2Beginner } from "./math/absolutni-hodnota-v2";
import { trojuhelnikyV2Beginner } from "./math/trojuhelniky-v2";
import { kruznicaAKruhyV2Beginner } from "./math/kruznice-a-kruhy-v2";
import { analytickaGeometrieV2Beginner } from "./math/analyticka-geometrie-v2";
import { stereometrieV2Beginner } from "./math/stereometrie-v2";
import { kombinatorikaZakladyV2Beginner } from "./math/kombinatorika-zaklady-v2";
import { pravdepodobnostV2Beginner } from "./math/pravdepodobnost-v2";
import { limityV2Beginner } from "./math/limity-v2";
import { derivaceV2Beginner } from "./math/derivace-v2";
import { integralyV2Beginner } from "./math/integraly-v2";

// ── Physics imports ──
import { kinematikaV2Beginner } from "./physics/kinematika-v2";
import { dynamikaV2Beginner } from "./physics/dynamika-v2";
import { energieAPraceV2Beginner } from "./physics/energie-a-prace-v2";
import { hybnostAImpulzV2Beginner } from "./physics/hybnost-a-impulz-v2";
import { gravitaceV2Beginner } from "./physics/gravitace-v2";
import { teplotaATeploV2Beginner } from "./physics/teplota-a-teplo-v2";
import { idealniPlynV2Beginner } from "./physics/idealni-plyn-v2";
import { zakonyTermodynamikyV2Beginner } from "./physics/zakony-termodynamiky-v2";
import { elektrickePoleV2Beginner } from "./physics/elektricke-pole-v2";
import { elektrickeObvodyV2Beginner } from "./physics/elektricke-obvody-v2";
import { magnetickePoleV2Beginner } from "./physics/magneticke-pole-v2";
import { mechanickeVlneniV2Beginner } from "./physics/mechanicke-vlneni-v2";
import { optikaV2Beginner } from "./physics/optika-v2";
import { kvantovaFyzikaV2Beginner } from "./physics/kvantova-fyzika-v2";

// Lesson content keyed by topicSlug — one lesson per topic
const lessons: Record<string, LessonContent | LessonV2> = {
  // Math
  "linearni-rovnice": linearniRovniceV2Beginner,
  "kvadraticke-rovnice": kvadratickeRovniceV2Beginner,
  "soustavy-rovnic": soustavyRovnicV2Beginner,
  "nerovnice": nerovniceV2Beginner,
  "vyrazove-upravy": vyrazoveUpravyV2Beginner,
  "posloupnosti": posloupnostiV2Beginner,
  "linearni-funkce": linearniFunkceV2Beginner,
  "kvadraticka-funkce": kvadratickaFunkceV2Beginner,
  "exponencialni-funkce": exponencialniFunkceV2Beginner,
  "logaritmicka-funkce": logaritmickaFunkceV2Beginner,
  "goniometricke-funkce": goniometrickeFunkceV2Beginner,
  "absolutni-hodnota": absolutniHodnotaV2Beginner,
  "trojuhelniky": trojuhelnikyV2Beginner,
  "kruznice-a-kruhy": kruznicaAKruhyV2Beginner,
  "analyticka-geometrie": analytickaGeometrieV2Beginner,
  "stereometrie": stereometrieV2Beginner,
  "kombinatorika-zaklady": kombinatorikaZakladyV2Beginner,
  "pravdepodobnost": pravdepodobnostV2Beginner,
  "limity": limityV2Beginner,
  "derivace": derivaceV2Beginner,
  "integraly": integralyV2Beginner,

  // Physics — Mechanics
  "kinematika": kinematikaV2Beginner,
  "dynamika": dynamikaV2Beginner,
  "energie-a-prace": energieAPraceV2Beginner,
  "hybnost-a-impulz": hybnostAImpulzV2Beginner,
  "gravitace": gravitaceV2Beginner,

  // Physics — Thermodynamics
  "teplota-a-teplo": teplotaATeploV2Beginner,
  "idealni-plyn": idealniPlynV2Beginner,
  "zakony-termodynamiky": zakonyTermodynamikyV2Beginner,

  // Physics — Electricity & Magnetism
  "elektricke-pole": elektrickePoleV2Beginner,
  "elektricke-obvody": elektrickeObvodyV2Beginner,
  "magneticke-pole": magnetickePoleV2Beginner,

  // Physics — Waves & Optics
  "mechanicke-vlneni": mechanickeVlneniV2Beginner,
  "optika": optikaV2Beginner,

  // Physics — Modern Physics
  "kvantova-fyzika": kvantovaFyzikaV2Beginner,
};

export function getLesson(
  topicSlug: string
): LessonContent | LessonV2 | null {
  return lessons[topicSlug] ?? null;
}

export function hasLesson(topicSlug: string): boolean {
  return topicSlug in lessons;
}

export { lessons };
