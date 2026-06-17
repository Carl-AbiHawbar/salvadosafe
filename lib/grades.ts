import "server-only";
import { cache } from "react";
import { readJson } from "./storage";
export type { Grade, GradeModel } from "./grade-types";
import type { Grade } from "./grade-types";

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
