import "server-only";
import { cache } from "react";
import { readJson } from "./storage";
import type { ProductSpecs } from "./catalog";

export type GradeModel = {
  name: string;
  specs: ProductSpecs;
  features: string[];
};

export type Grade = {
  slug: string;
  grade: string;
  h1: string;
  series: string;
  seoFocus: string;
  desc: string;
  technicalFeatures: string[];
  cta: string;
  developerNote: string;
  image: string;
  models: GradeModel[];
};

export const HIGH_SECURITY_GRADES = ["Grade I", "Grade II", "Grade III", "Grade IV", "Grade V"] as const;

export const getGrades = cache((): Grade[] => readJson<Grade[]>("grades.json"));

export function getGrade(slug: string): Grade | undefined {
  return getGrades().find((g) => g.slug === slug);
}

export function getGradeByLabel(label: string): Grade | undefined {
  return getGrades().find((g) => g.grade === label);
}

export function gradeForProductSub(sub: string | null): Grade | undefined {
  if (!sub) return undefined;
  return getGradeByLabel(sub);
}
