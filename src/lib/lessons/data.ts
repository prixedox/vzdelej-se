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

// ── Physics imports ──
import {
  kinematikaIntermediate,
  kinematikaAdvanced,
} from "./physics/kinematika";

import { kinematikaV2Beginner } from "./physics/kinematika-v2";

import {
  dynamikaBeginner,
  dynamikaIntermediate,
  dynamikaAdvanced,
} from "./physics/dynamika";

import {
  energieAPraceBeginner,
  energieAPraceIntermediate,
  energieAPraceAdvanced,
} from "./physics/energie-a-prace";

import {
  hybnostAImpulzBeginner,
  hybnostAImpulzIntermediate,
  hybnostAImpulzAdvanced,
} from "./physics/hybnost-a-impulz";

import {
  gravitaceBeginner,
  gravitaceIntermediate,
  gravitaceAdvanced,
} from "./physics/gravitace";

import {
  teplotaATeploBeginner,
  teplotaATeploIntermediate,
  teplotaATeploAdvanced,
} from "./physics/teplota-a-teplo";

import {
  idealniPlynBeginner,
  idealniPlynIntermediate,
  idealniPlynAdvanced,
} from "./physics/idealni-plyn";

import {
  zakonyTermodynamikyBeginner,
  zakonyTermodynamikyIntermediate,
  zakonyTermodynamikyAdvanced,
} from "./physics/zakony-termodynamiky";

import {
  elektrickePoleBeginner,
  elektrickePoleIntermediate,
  elektrickePoleAdvanced,
} from "./physics/elektricke-pole";

import {
  elektrickeObvodyBeginner,
  elektrickeObvodyIntermediate,
  elektrickeObvodyAdvanced,
} from "./physics/elektricke-obvody";

import {
  magnetickePoleBeginner,
  magnetickePoleIntermediate,
  magnetickePoleAdvanced,
} from "./physics/magneticke-pole";

import {
  mechanickeVlneniBeginner,
  mechanickeVlneniIntermediate,
  mechanickeVlneniAdvanced,
} from "./physics/mechanicke-vlneni";

import {
  optikaBeginner,
  optikaIntermediate,
  optikaAdvanced,
} from "./physics/optika";

import {
  kvantovaFyzikaBeginner,
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
  // Math (v1)
  "linearni-rovnice-intermediate": linearniRovniceIntermediate,
  "linearni-rovnice-advanced": linearniRovniceAdvanced,

  // Physics — Mechanics (v2)
  "kinematika-beginner": kinematikaV2Beginner,
  "kinematika-intermediate": kinematikaIntermediate,
  "kinematika-advanced": kinematikaAdvanced,

  "dynamika-beginner": dynamikaBeginner,
  "dynamika-intermediate": dynamikaIntermediate,
  "dynamika-advanced": dynamikaAdvanced,

  "energie-a-prace-beginner": energieAPraceBeginner,
  "energie-a-prace-intermediate": energieAPraceIntermediate,
  "energie-a-prace-advanced": energieAPraceAdvanced,

  "hybnost-a-impulz-beginner": hybnostAImpulzBeginner,
  "hybnost-a-impulz-intermediate": hybnostAImpulzIntermediate,
  "hybnost-a-impulz-advanced": hybnostAImpulzAdvanced,

  "gravitace-beginner": gravitaceBeginner,
  "gravitace-intermediate": gravitaceIntermediate,
  "gravitace-advanced": gravitaceAdvanced,

  // Physics — Thermodynamics
  "teplota-a-teplo-beginner": teplotaATeploBeginner,
  "teplota-a-teplo-intermediate": teplotaATeploIntermediate,
  "teplota-a-teplo-advanced": teplotaATeploAdvanced,

  "idealni-plyn-beginner": idealniPlynBeginner,
  "idealni-plyn-intermediate": idealniPlynIntermediate,
  "idealni-plyn-advanced": idealniPlynAdvanced,

  "zakony-termodynamiky-beginner": zakonyTermodynamikyBeginner,
  "zakony-termodynamiky-intermediate": zakonyTermodynamikyIntermediate,
  "zakony-termodynamiky-advanced": zakonyTermodynamikyAdvanced,

  // Physics — Electricity & Magnetism
  "elektricke-pole-beginner": elektrickePoleBeginner,
  "elektricke-pole-intermediate": elektrickePoleIntermediate,
  "elektricke-pole-advanced": elektrickePoleAdvanced,

  "elektricke-obvody-beginner": elektrickeObvodyBeginner,
  "elektricke-obvody-intermediate": elektrickeObvodyIntermediate,
  "elektricke-obvody-advanced": elektrickeObvodyAdvanced,

  "magneticke-pole-beginner": magnetickePoleBeginner,
  "magneticke-pole-intermediate": magnetickePoleIntermediate,
  "magneticke-pole-advanced": magnetickePoleAdvanced,

  // Physics — Waves & Optics
  "mechanicke-vlneni-beginner": mechanickeVlneniBeginner,
  "mechanicke-vlneni-intermediate": mechanickeVlneniIntermediate,
  "mechanicke-vlneni-advanced": mechanickeVlneniAdvanced,

  "optika-beginner": optikaBeginner,
  "optika-intermediate": optikaIntermediate,
  "optika-advanced": optikaAdvanced,

  // Physics — Modern Physics
  "kvantova-fyzika-beginner": kvantovaFyzikaBeginner,
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
