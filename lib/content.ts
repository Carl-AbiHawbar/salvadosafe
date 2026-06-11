import { cache } from "react";
import { readJson } from "./storage";

export type HeroSlide = { img: string; title: string; sub: string };
export type Review = { name: string; when: string; text: string; color: string };
export type IconPoint = { icon: string; title: string; text: string };
export type Stat = { value: string; label: string };
export type Faq = { q: string; a: string };
export type ServiceItem = {
  id: string;
  title: string;
  text: string;
  cta: string;
  icon: string;
};

export type PagesContent = {
  heroSlides: HeroSlide[];
  reviews: Review[];
  reviewsMeta: { ratingLabel: string; reviewCount: string };
  home: {
    proofStrip: string[];
    whySalvado: {
      eyebrow: string;
      title: string;
      text: string;
      points: IconPoint[];
    };
    catalogSection: { eyebrow: string; title: string; text: string };
    selectedSection: { eyebrow: string; title: string; text: string; slugs: string[] };
    servicesSection: {
      eyebrow: string;
      title: string;
      text: string;
      cards: { img: string; title: string; text: string }[];
    };
    showroom: {
      eyebrow: string;
      title: string;
      text: string;
      image: string;
      features: string[];
    };
    finalCta: { eyebrow: string; title: string; text: string; waMessage: string };
  };
  about: {
    hero: { eyebrow: string; title: string; text: string; image: string };
    stats: Stat[];
    sectors: string[];
    leadPoints: IconPoint[];
  };
  services: {
    hero: { eyebrow: string; title: string; text: string; image: string };
    overview: { eyebrow: string; title: string; text: string };
    items: ServiceItem[];
    whyPoints: { title: string; text: string }[];
    faqs: Faq[];
  };
};

export type SiteConfig = {
  name: string;
  shortName: string;
  tagline: string;
  email: string;
  location: string;
  address: string;
  hours: { weekdays: string; saturday: string };
  phones: {
    landline: { label: string; tel: string };
    whatsapp: { label: string; tel: string; wa: string };
    mobile: { label: string; tel: string };
  };
  socials: { instagram: string; facebook: string };
  maps: string;
  mapsEmbed: string;
};

export const getSiteConfig = cache((): SiteConfig => readJson<SiteConfig>("site.json"));
export const getPagesContent = cache((): PagesContent => readJson<PagesContent>("pages.json"));
