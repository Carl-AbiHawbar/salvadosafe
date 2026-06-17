import type { ProductSpecs } from "./catalog-types";

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
