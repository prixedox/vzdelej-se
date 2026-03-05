import type { LessonContent } from "@/types/lesson";
import type { LessonV2 } from "@/types/lesson-v2";

// ── Math imports ──
import {
  linearniRovniceIntermediate,
  linearniRovniceAdvanced,
} from "./math/linearni-rovnice";

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
import {
  kinematikaIntermediate,
  kinematikaAdvanced,
} from "./physics/kinematika";

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

import {
  dynamikaIntermediate,
  dynamikaAdvanced,
} from "./physics/dynamika";

import {
  energieAPraceIntermediate,
  energieAPraceAdvanced,
} from "./physics/energie-a-prace";

import {
  hybnostAImpulzIntermediate,
  hybnostAImpulzAdvanced,
} from "./physics/hybnost-a-impulz";

import {
  gravitaceIntermediate,
  gravitaceAdvanced,
} from "./physics/gravitace";

import {
  teplotaATeploIntermediate,
  teplotaATeploAdvanced,
} from "./physics/teplota-a-teplo";

import {
  idealniPlynIntermediate,
  idealniPlynAdvanced,
} from "./physics/idealni-plyn";

import {
  zakonyTermodynamikyIntermediate,
  zakonyTermodynamikyAdvanced,
} from "./physics/zakony-termodynamiky";

import {
  elektrickePoleIntermediate,
  elektrickePoleAdvanced,
} from "./physics/elektricke-pole";

import {
  elektrickeObvodyIntermediate,
  elektrickeObvodyAdvanced,
} from "./physics/elektricke-obvody";

import {
  magnetickePoleIntermediate,
  magnetickePoleAdvanced,
} from "./physics/magneticke-pole";

import {
  mechanickeVlneniIntermediate,
  mechanickeVlneniAdvanced,
} from "./physics/mechanicke-vlneni";

import {
  optikaIntermediate,
  optikaAdvanced,
} from "./physics/optika";

import {
  kvantovaFyzikaIntermediate,
  kvantovaFyzikaAdvanced,
} from "./physics/kvantova-fyzika";

// Lesson content keyed by "${topicSlug}-${difficulty}"
const lessons: Record<string, LessonContent | LessonV2> = {
  // Math (v2)
  "linearni-rovnice-beginner": linearniRovniceV2Beginner,
  "kvadraticke-rovnice-beginner": kvadratickeRovniceV2Beginner,
  "soustavy-rovnic-beginner": soustavyRovnicV2Beginner,
  "nerovnice-beginner": nerovniceV2Beginner,
  "vyrazove-upravy-beginner": vyrazoveUpravyV2Beginner,
  "posloupnosti-beginner": posloupnostiV2Beginner,
  "linearni-funkce-beginner": linearniFunkceV2Beginner,
  "kvadraticka-funkce-beginner": kvadratickaFunkceV2Beginner,
  "exponencialni-funkce-beginner": exponencialniFunkceV2Beginner,
  "logaritmicka-funkce-beginner": logaritmickaFunkceV2Beginner,
  "goniometricke-funkce-beginner": goniometrickeFunkceV2Beginner,
  "absolutni-hodnota-beginner": absolutniHodnotaV2Beginner,
  "trojuhelniky-beginner": trojuhelnikyV2Beginner,
  "kruznice-a-kruhy-beginner": kruznicaAKruhyV2Beginner,
  "analyticka-geometrie-beginner": analytickaGeometrieV2Beginner,
  "stereometrie-beginner": stereometrieV2Beginner,
  "kombinatorika-zaklady-beginner": kombinatorikaZakladyV2Beginner,
  "pravdepodobnost-beginner": pravdepodobnostV2Beginner,
  "limity-beginner": limityV2Beginner,
  "derivace-beginner": derivaceV2Beginner,
  "integraly-beginner": integralyV2Beginner,
  // Math (v1)
  "linearni-rovnice-intermediate": linearniRovniceIntermediate,
  "linearni-rovnice-advanced": linearniRovniceAdvanced,

  // Physics — Mechanics (v2)
  "kinematika-beginner": kinematikaV2Beginner,
  "kinematika-intermediate": kinematikaIntermediate,
  "kinematika-advanced": kinematikaAdvanced,

  "dynamika-beginner": dynamikaV2Beginner,
  "dynamika-intermediate": dynamikaIntermediate,
  "dynamika-advanced": dynamikaAdvanced,

  "energie-a-prace-beginner": energieAPraceV2Beginner,
  "energie-a-prace-intermediate": energieAPraceIntermediate,
  "energie-a-prace-advanced": energieAPraceAdvanced,

  "hybnost-a-impulz-beginner": hybnostAImpulzV2Beginner,
  "hybnost-a-impulz-intermediate": hybnostAImpulzIntermediate,
  "hybnost-a-impulz-advanced": hybnostAImpulzAdvanced,

  "gravitace-beginner": gravitaceV2Beginner,
  "gravitace-intermediate": gravitaceIntermediate,
  "gravitace-advanced": gravitaceAdvanced,

  // Physics — Thermodynamics (v2)
  "teplota-a-teplo-beginner": teplotaATeploV2Beginner,
  "teplota-a-teplo-intermediate": teplotaATeploIntermediate,
  "teplota-a-teplo-advanced": teplotaATeploAdvanced,

  "idealni-plyn-beginner": idealniPlynV2Beginner,
  "idealni-plyn-intermediate": idealniPlynIntermediate,
  "idealni-plyn-advanced": idealniPlynAdvanced,

  "zakony-termodynamiky-beginner": zakonyTermodynamikyV2Beginner,
  "zakony-termodynamiky-intermediate": zakonyTermodynamikyIntermediate,
  "zakony-termodynamiky-advanced": zakonyTermodynamikyAdvanced,

  // Physics — Electricity & Magnetism (v2)
  "elektricke-pole-beginner": elektrickePoleV2Beginner,
  "elektricke-pole-intermediate": elektrickePoleIntermediate,
  "elektricke-pole-advanced": elektrickePoleAdvanced,

  "elektricke-obvody-beginner": elektrickeObvodyV2Beginner,
  "elektricke-obvody-intermediate": elektrickeObvodyIntermediate,
  "elektricke-obvody-advanced": elektrickeObvodyAdvanced,

  "magneticke-pole-beginner": magnetickePoleV2Beginner,
  "magneticke-pole-intermediate": magnetickePoleIntermediate,
  "magneticke-pole-advanced": magnetickePoleAdvanced,

  // Physics — Waves & Optics (v2)
  "mechanicke-vlneni-beginner": mechanickeVlneniV2Beginner,
  "mechanicke-vlneni-intermediate": mechanickeVlneniIntermediate,
  "mechanicke-vlneni-advanced": mechanickeVlneniAdvanced,

  "optika-beginner": optikaV2Beginner,
  "optika-intermediate": optikaIntermediate,
  "optika-advanced": optikaAdvanced,

  // Physics — Modern Physics (v2)
  "kvantova-fyzika-beginner": kvantovaFyzikaV2Beginner,
  "kvantova-fyzika-intermediate": kvantovaFyzikaIntermediate,
  "kvantova-fyzika-advanced": kvantovaFyzikaAdvanced,
};

export function getLesson(
  topicSlug: string,
  difficulty: string
): LessonContent | LessonV2 | null {
  return lessons[`${topicSlug}-${difficulty}`] ?? null;
}

export function hasLesson(topicSlug: string, difficulty: string): boolean {
  return `${topicSlug}-${difficulty}` in lessons;
}

export { lessons };
