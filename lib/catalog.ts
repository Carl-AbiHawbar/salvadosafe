import productsData from "@/app/data/products.json";

export type Product = {
  slug: string;
  name: string;
  desc: string;
  image: string;
  category: string;
  categories: string[];
  sub: string | null;
};

export const products: Product[] = productsData as Product[];

export type Category = {
  slug: string;
  name: string;
  short: string; // one-line for cards
  intro: string; // category hero paragraph
  protect: string; // "choose what to protect" angle
  image?: string; // explicit override
  subs: string[];
  featured: boolean; // appears in the premium top-6 grid
  buyingGuide: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
};

export const categories: Category[] = [
  {
    slug: "high-security-safes",
    name: "High-Security Safes",
    short: "Certified burglary protection for serious security needs.",
    intro:
      "Grade-certified high-security safes engineered for maximum burglary resistance — ideal for homes, businesses, jewelers, institutions, and private offices that demand certified protection.",
    protect: "For serious protection needs in homes, businesses, jewelers, institutions, and private offices.",
    subs: ["Grade I", "Grade II", "Grade III", "Grade IV", "Grade V"],
    featured: true,
    buyingGuide: [
      { title: "Understand the grade", body: "Security grades (I–V) indicate the certified level of burglary resistance. Higher grades suit higher-value contents and stricter insurance requirements." },
      { title: "Match the contents", body: "Choose a grade based on the value of what you store, your environment, and any insurance or institutional requirements." },
      { title: "Plan installation", body: "High-grade safes are heavy and benefit from professional anchoring and placement. Our team handles delivery and European-standard installation." },
    ],
    faqs: [
      { q: "What does the security grade mean?", a: "Each grade reflects a certified level of burglary resistance. Higher grades offer stronger protection and are often required for higher insurance cover." },
      { q: "Do you install high-security safes?", a: "Yes. Salvado provides professional delivery, placement, and anchoring according to product specifications and site conditions." },
      { q: "Can you help me choose the right grade?", a: "Absolutely. Contact us with your intended use and contents and our team will recommend a suitable grade." },
    ],
  },
  {
    slug: "fire-resistant-safes",
    name: "Fire-Resistant Safes",
    short: "Fire-rated protection for documents, cash, and records.",
    intro:
      "Fire-resistant safes that protect documents, contracts, passports, cash, and important records against fire — available across our S, SLX, 1600, and 2600 series.",
    protect: "For contracts, passports, records, cash, and important documents requiring fire protection.",
    subs: ["S Series", "SLX Series", "1600 Series", "2600 Series", "SSTD Series"],
    featured: true,
    buyingGuide: [
      { title: "Check the fire rating", body: "Fire ratings indicate how long contents stay protected during a fire. Longer ratings suit irreplaceable documents and media." },
      { title: "Pick the right size", body: "Allow space for documents, folders, and valuables. We can advise on internal capacity for your needs." },
      { title: "Consider the lock", body: "Choose between key, mechanical, or electronic locking based on convenience and usage." },
    ],
    faqs: [
      { q: "What can a fire-resistant safe protect?", a: "Documents, contracts, passports, cash, and important records, depending on the model's fire rating." },
      { q: "How long is the fire protection?", a: "Fire ratings vary by model. Contact us for the exact rating of a specific safe." },
      { q: "Are these also burglary resistant?", a: "Many models combine fire protection with secure locking. Ask us for the right balance for your needs." },
    ],
  },
  {
    slug: "vault-doors-vault-rooms",
    name: "Vault Doors & Vault Rooms",
    short: "Bank-level vault doors and complete secure rooms.",
    intro:
      "High-security vault doors and complete vault room systems for villas, jewelers, institutions, banks, and private projects — engineered and installed to demanding security standards.",
    protect: "For vault doors, private rooms, institutional storage, and high-security projects.",
    subs: ["Vault Doors", "Vault Rooms", "Prefabricated Vault Rooms"],
    featured: true,
    buyingGuide: [
      { title: "Define the project", body: "Vault projects are tailored to the space, security level, and intended use. Share your requirements for a precise recommendation." },
      { title: "Site assessment", body: "Our team can assess the location, access, and structural conditions before specifying the right solution." },
      { title: "Installation", body: "Vault doors and rooms are installed by our trained technical team according to specification and site conditions." },
    ],
    faqs: [
      { q: "Do you build complete vault rooms?", a: "Yes. Salvado supplies and installs vault doors and complete vault room systems, including prefabricated solutions." },
      { q: "Is a site visit required?", a: "For most vault projects we recommend a site assessment to confirm access, structure, and requirements." },
      { q: "Who is this suitable for?", a: "Villas, jewelers, banks, institutions, offices, and private high-security projects." },
    ],
  },
  {
    slug: "cash-handling-solutions",
    name: "Cash Handling Solutions",
    short: "Drop safes and money counters for cash operations.",
    intro:
      "Practical cash-handling solutions for retailers, offices, exchange businesses, and companies that manage cash — including deposit drop safes and reliable money counters.",
    protect: "For retailers, offices, exchange businesses, and companies handling cash.",
    subs: ["Drop Safes", "Money Counters"],
    featured: false,
    buyingGuide: [
      { title: "Match your workflow", body: "Drop safes suit businesses needing quick, secure cash deposits. Money counters speed up daily cash operations." },
      { title: "Volume matters", body: "Consider your daily cash volume to choose the right capacity and speed." },
      { title: "Security level", body: "We can advise on the right balance of convenience and security for your operation." },
    ],
    faqs: [
      { q: "What is a drop safe?", a: "A drop safe lets staff deposit cash securely without opening the main compartment, reducing risk during the day." },
      { q: "Do you supply money counters?", a: "Yes. We offer accurate, efficient money counters for businesses and cash-handling operations." },
      { q: "Can you recommend a solution?", a: "Share your daily volume and workflow and we'll recommend a suitable setup." },
    ],
  },
  {
    slug: "concealed-camouflage-safes",
    name: "Concealed & Camouflage Safes",
    short: "Discreet wall, underfloor, and camouflage safes.",
    intro:
      "Discreet storage solutions for homes, offices, and private spaces — including wall safes, underfloor safes, and camouflage safes designed to stay out of sight.",
    protect: "For concealed storage in homes, offices, and private spaces.",
    subs: ["Wall & Underfloor Safes", "Camouflage Safes"],
    featured: true,
    buyingGuide: [
      { title: "Choose the placement", body: "Wall and underfloor safes integrate into the structure, while camouflage safes blend into everyday objects." },
      { title: "Plan ahead", body: "Built-in concealed safes are best planned with installation in mind. Our team can advise on placement." },
      { title: "Balance access & secrecy", body: "Consider how often you'll access the safe versus how hidden it needs to be." },
    ],
    faqs: [
      { q: "What is a camouflage safe?", a: "A discreet safe designed to blend into its surroundings, keeping valuables out of plain sight." },
      { q: "Can you install wall and underfloor safes?", a: "Yes. We provide professional installation suited to the placement and site conditions." },
      { q: "Are concealed safes secure?", a: "Concealment adds a layer of protection on top of the safe's locking and build quality." },
    ],
  },
  {
    slug: "luxury-safes-watch-storage",
    name: "Luxury Safes & Watch Storage",
    short: "Premium safes, watch winders, and collector storage.",
    intro:
      "Premium storage for watches, jewelry, collectibles, and private valuables — from custom luxury safes to watch winders that keep automatic timepieces ready to wear.",
    protect: "For watches, jewelry, collectibles, and private valuables.",
    subs: ["Watch Winders", "Bezel Series", "Boxy Series", "Rotor Series", "Masterbox Series", "Startbox Series", "Valigetta & Viaggio", "Custom Luxury Safes"],
    featured: true,
    buyingGuide: [
      { title: "Plan your collection", body: "Count your watches and valuables now and allow room to grow. Watch winders keep automatics wound and ready." },
      { title: "Finishes & interiors", body: "Luxury safes offer premium interiors and finishes. We can advise on the right configuration." },
      { title: "Discretion & security", body: "Combine secure locking with refined presentation for a true collector's piece." },
    ],
    faqs: [
      { q: "What is a watch winder?", a: "A watch winder gently rotates automatic watches so they stay wound and ready to wear." },
      { q: "Do you offer custom luxury safes?", a: "Yes. We can guide you on premium configurations for watches, jewelry, and collectibles." },
      { q: "How many watches can a winder hold?", a: "Capacity varies by series. Contact us for the right model for your collection." },
    ],
  },
  {
    slug: "home-safes",
    name: "Home Safes",
    short: "Reliable everyday safes for the home.",
    intro:
      "Dependable home safes for cash, documents, jewelry, and everyday valuables — available across our SL, SA, and SE series to suit different homes and budgets.",
    protect: "For everyday valuables, cash, documents, and jewelry at home.",
    subs: ["SL Series", "SA Series", "SE Series"],
    featured: false,
    buyingGuide: [
      { title: "Size for your needs", body: "Pick a capacity that fits your documents and valuables with a little room to spare." },
      { title: "Lock type", body: "Choose between key and electronic locking for everyday convenience." },
      { title: "Placement", body: "We can advise on discreet, accessible placement and anchoring at home." },
    ],
    faqs: [
      { q: "Which home safe is right for me?", a: "It depends on what you store and where. Tell us your needs and we'll recommend a model." },
      { q: "Do home safes resist fire?", a: "Some models offer fire protection. Ask us for fire-rated options." },
      { q: "Can you deliver and install at home?", a: "Yes. We provide delivery and professional installation for home safes." },
    ],
  },
  {
    slug: "smart-safes",
    name: "Smart Safes",
    short: "Electronic and connected safe solutions.",
    intro:
      "Modern smart safes with electronic locking and convenient access for homes and businesses that want a contemporary security solution.",
    protect: "For modern homes and businesses wanting electronic, convenient access.",
    subs: [],
    featured: false,
    buyingGuide: [
      { title: "Convenience", body: "Smart safes offer quick electronic access while keeping contents secure." },
      { title: "Reliability", body: "We can advise on dependable models with backup access options." },
      { title: "Use case", body: "Tell us how you'll use the safe and we'll suggest the right smart model." },
    ],
    faqs: [
      { q: "What makes a safe 'smart'?", a: "Smart safes use electronic locking and convenient access features for modern usage." },
      { q: "What if the battery dies?", a: "Reputable models include backup access. Ask us about specific models." },
      { q: "Are smart safes secure?", a: "Yes, when combined with quality build and proper installation." },
    ],
  },
  {
    slug: "hotel-safes",
    name: "Hotel Safes",
    short: "Compact in-room safes for hospitality.",
    intro:
      "Compact, easy-to-use hotel safes designed for guest rooms and hospitality environments, balancing convenience and security.",
    protect: "For hotels and hospitality businesses securing guest valuables.",
    subs: [],
    featured: false,
    buyingGuide: [
      { title: "Guest convenience", body: "Hotel safes are designed for simple guest use with secure locking." },
      { title: "Fit the room", body: "Choose a size that fits in-room placement such as wardrobes or drawers." },
      { title: "Volume orders", body: "We can support hospitality projects with multiple units. Contact us for guidance." },
    ],
    faqs: [
      { q: "Do you supply safes for hotels?", a: "Yes. We provide compact in-room hotel safes suitable for hospitality." },
      { q: "Can you handle volume orders?", a: "Yes. Contact us with your project requirements for a recommendation." },
      { q: "Are they easy for guests to use?", a: "Hotel safes are designed for simple, secure guest operation." },
    ],
  },
  {
    slug: "responsible-firearm-storage",
    name: "Responsible Firearm Storage",
    short: "Secure rifle and pistol storage solutions.",
    intro:
      "Responsible firearm storage solutions — rifle safes and pistol safes designed to keep firearms securely stored and away from unauthorized access.",
    protect: "For responsible, secure storage of rifles and pistols.",
    subs: ["Rifle Safes", "Pistol Safes"],
    featured: false,
    buyingGuide: [
      { title: "Capacity", body: "Choose between pistol safes for handguns and rifle safes for long firearms based on your needs." },
      { title: "Quick access", body: "Some models offer quick yet secure access. Ask us about the right balance." },
      { title: "Safe storage", body: "We can advise on secure, responsible placement and installation." },
    ],
    faqs: [
      { q: "What's the difference between rifle and pistol safes?", a: "Rifle safes store long firearms; pistol safes are compact for handguns." },
      { q: "Do these offer quick access?", a: "Some models do. Tell us your needs and we'll recommend a model." },
      { q: "Can you install firearm safes?", a: "Yes. We provide delivery and professional installation." },
    ],
  },
  {
    slug: "cash-boxes-key-cabinets",
    name: "Cash Boxes & Key Cabinets",
    short: "Cash boxes, key boxes, and key cabinets.",
    intro:
      "Everyday cash boxes, key boxes, and key cabinets for homes, offices, and businesses that need simple, organized, secure storage.",
    protect: "For simple cash storage and organized key management.",
    subs: ["Cash Boxes", "Key Boxes", "Key Cabinets", "Accessories"],
    featured: false,
    buyingGuide: [
      { title: "Pick the type", body: "Cash boxes secure petty cash; key boxes and cabinets organize and protect keys." },
      { title: "Capacity", body: "Choose a key cabinet sized for the number of keys you manage." },
      { title: "Placement", body: "Wall-mounted key cabinets keep keys organized and accessible." },
    ],
    faqs: [
      { q: "Do you sell key cabinets?", a: "Yes. We offer key boxes and wall-mounted key cabinets in various capacities." },
      { q: "Are cash boxes secure?", a: "Cash boxes provide convenient, lockable storage for petty cash and small valuables." },
      { q: "Which size do I need?", a: "Tell us how many keys or how much cash you manage and we'll advise." },
    ],
  },
];

const categoryBySlug = new Map(categories.map((c) => [c.slug, c]));

export function getCategory(slug: string): Category | undefined {
  return categoryBySlug.get(slug);
}

export function productsInCategory(slug: string): Product[] {
  return products.filter((p) => p.categories.includes(slug) || p.category === slug);
}

export function categoryImage(c: Category): string {
  if (c.image) return c.image;
  const first = products.find((p) => p.category === c.slug && p.image)?.image;
  return first || "/images/brand/frontimg.webp";
}

export function categoryCount(slug: string): number {
  return productsInCategory(slug).length;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function similarProducts(p: Product, limit = 6): Product[] {
  return products
    .filter((x) => x.slug !== p.slug && x.category === p.category)
    .slice(0, limit);
}

export const featuredCategories = categories.filter((c) => c.featured);
export const secondaryCategories = categories.filter((c) => !c.featured);

export const totalProducts = products.length;
