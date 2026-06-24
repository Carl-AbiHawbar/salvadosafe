import "server-only";
import { cache } from "react";
import { readJson } from "./storage";

export type ShowroomImage = { src: string; alt: string; caption?: string; fit?: "cover" | "contain"; imgClass?: string };
export type HeroSlide = { img: string; title: string; sub: string };
export type Review = { name: string; when: string; text: string; color: string };
export type InstagramPost = { image: string; caption: string; href: string; alt?: string };
export type IconPoint = { icon: string; title: string; text: string };
export type Stat = { value: string; label: string };
export type Faq = { q: string; a: string };
export type ServiceItem = {
  id: string;
  title: string;
  text: string;
  cta: string;
  icon: string;
  image?: string;
};

export type PagesContent = {
  heroSlides: HeroSlide[];
  reviews: Review[];
  reviewsMeta: { ratingLabel: string; reviewCount: string };
  instagramMeta: { handle: string; title: string; subtitle: string };
  instagramPosts: InstagramPost[];
  home: {
    proofStrip: string[];
    whySalvado: {
      eyebrow: string;
      title: string;
      text: string;
      points: IconPoint[];
    };
    catalogSection: { eyebrow: string; title: string; text: string; slugs: string[] };
    selectedSection: { eyebrow: string; title: string; text: string; slugs: string[] };
    servicesSection: {
      eyebrow: string;
      title: string;
      text: string;
      cards: { img: string; title: string; text: string; imgClass?: string }[];
    };
    showroom: {
      eyebrow: string;
      title: string;
      text: string;
      images: ShowroomImage[];
      features: string[];
    };
    finalCta: { eyebrow: string; title: string; text: string; waMessage: string };
  };
  about: {
    hero: { eyebrow: string; title: string; text: string; image: string };
    stats: Stat[];
    sectors: string[];
    leadPoints: IconPoint[];
    showroomImage: string;
    teamImage: string;
    gallery: { src: string; alt: string }[];
  };
  services: {
    hero: { eyebrow: string; title: string; text: string; image: string };
    overview: { eyebrow: string; title: string; text: string };
    items: ServiceItem[];
    installationGallery: { src: string; alt: string; caption: string }[];
    whyPoints: IconPoint[];
    faqs: Faq[];
  };
  contact: {
    heroImage: string;
    showroomImage: string;
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
